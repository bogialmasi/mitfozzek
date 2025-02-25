import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { user } from '@heroui/theme';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ success: false }, { status: 405 });
  }

  try {
    const { searchParams } = req.nextUrl;

    const searchQuery = searchParams.get('searchQuery') || null;
    const selectedIngredients = searchParams.getAll('ingredients').map(Number);
    const selectedDishType = searchParams.getAll('dishType').map(Number);
    const selectedDishCategory = searchParams.getAll('dishCategory').map(Number);
    const selectedUserDishCategory = searchParams.getAll('userDishCategory').map(Number);
    const id = searchParams.get('id');

    // One recipe based on ID
    if (id) {
      const recipeId = Number(id);
      const [recipes] = await pool.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);
      const recipeResults = recipes as RowDataPacket[];

      if (recipeResults.length === 0) {
        return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
      }

      // Ingredients of the recipe, with measurements
      const [ingredientsData] = await pool.query<RowDataPacket[]>(
        `SELECT ingredients.ingredient_id, ingredients.ingredient_name,
         con_recipe_ingredients.ingredient_quantity, 
         measurements.measurement_id, measurements.measurement_name
         FROM ingredients
         JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
         JOIN measurements ON con_recipe_ingredients.measurement_id = measurements.measurement_id
         WHERE con_recipe_ingredients.recipe_id = ?`,
        [recipeId]
      );

      const fullRecipe = {
        ...recipeResults[0],
        ingredients: ingredientsData.map((ingredient) => ({
          ingredient_id: ingredient.ingredient_id,
          ingredient_name: ingredient.ingredient_name,
          ingredient_quantity: ingredient.ingredient_quantity,
          measurement_id: ingredient.measurement_id,
          measurement_name: ingredient.measurement_name,
        })),
      };

      return NextResponse.json(fullRecipe);
    }

    // Multiple recipes based on filters
    let query = `
      SELECT DISTINCT recipes.recipe_id, recipes.recipe_name, recipes.recipe_description, recipes.recipe_time, recipes.recipe_headcount
      FROM recipes
      LEFT JOIN con_recipe_ingredients ON con_recipe_ingredients.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_dish_type ON con_recipe_dish_type.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_category ON con_recipe_category.recipe_id = recipes.recipe_id
      LEFT JOIN dish_category ON dish_category.category_id = con_recipe_category.category_id
    `;

    const filters = [];
    const params = [];

    // Filters
    if (searchQuery) {
      filters.push('LOWER(recipes.recipe_name) LIKE LOWER(?)');
      params.push(`%${searchQuery}%`);
    }
    if (selectedIngredients.length > 0) {
      filters.push(`con_recipe_ingredients.ingredient_id IN (${selectedIngredients.map(() => '?').join(',')})`);
      params.push(...selectedIngredients);
    }
    if (selectedDishType.length > 0) {
      filters.push(`con_recipe_dish_type.dishtype_id IN (${selectedDishType.map(() => '?').join(',')})`);
      params.push(...selectedDishType);
    }
    if (selectedDishCategory.length > 0) {
      filters.push(`con_recipe_category.category_id IN (${selectedDishCategory.map(() => '?').join(',')})`);
      params.push(...selectedDishCategory);
    }
    if (selectedUserDishCategory.length > 0) {
      const authorization = req.headers.get('Authorization');
      const token = authorization?.split(' ')[1];
      if (!token) {
        selectedUserDishCategory.length = 0;
        console.log('NO TOKEN -----')
        console.log("Authorization:", req.headers.get('Authorization'));
        console.log("Token:", token);
        console.log("Selected User Dish Category:", selectedUserDishCategory);
      } else {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        console.log(userId);
        if (userId) {
          console.log('YES TOKEN -----')
          console.log("Authorization:", req.headers.get('Authorization'));
          console.log("Token:", token);
          console.log("Selected User Dish Category:", selectedUserDishCategory);
          query += ` LEFT JOIN user_dish_category ON user_dish_category.category_id = dish_category.category_id `;
          filters.push(`user_dish_category.category_id IN (${selectedUserDishCategory.map(() => '?').join(',')})`);
          filters.push(`user_dish_category.user_id = ?`);
          params.push(...selectedUserDishCategory, userId);
        }
      }
    }

    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    console.log('----------------------------------------------------------------')
    console.log("Final SQL Query:", query);
    console.log("Filters:", filters)
    console.log("Final Query Params:", params);
    const [recipes] = await pool.query<RowDataPacket[]>(query, params);

    if (recipes.length === 0) {
      return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
    }

    // Ingredients of the recipes
    const recipesWithIngredients = await Promise.all(
      recipes.map(async (recipe) => {
        const [ingredientsData] = await pool.query<RowDataPacket[]>(
          `SELECT ingredients.ingredient_id, ingredients.ingredient_name
           FROM ingredients
           JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
           WHERE con_recipe_ingredients.recipe_id = ?`,
          [recipe.recipe_id]
        );
        return {
          ...recipe,
          ingredients: ingredientsData.map((ingredient) => ({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
          })),
        };
      })
    );

    return NextResponse.json(recipesWithIngredients);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}