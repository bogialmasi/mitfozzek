import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

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
    const id = searchParams.get('id');

    // One recipe based on ID
    if (id) {
      const recipeId = Number(id);
      const [recipes] = await pool.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);
      const recipeResults = recipes as RowDataPacket[];

      if (recipeResults.length === 0) {
        return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
      }

      // Ingredients of the recipe
      const [ingredientsData] = await pool.query<RowDataPacket[]>(
        `SELECT ingredients.ingredient_id, ingredients.ingredient_name
         FROM ingredients
         JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
         WHERE con_recipe_ingredients.recipe_id = ?`,
        [recipeId]
      );

      const fullRecipe = {
        ...recipeResults[0],
        ingredients: ingredientsData.map((ingredient) => ({
          id: ingredient.ingredient_id,
          name: ingredient.ingredient_name,
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
    `;

    const filters = [];
    const params = [];

    // Dynamic adding filters
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

    // Append conditions to query
    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }
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
            id: ingredient.ingredient_id,
            name: ingredient.ingredient_name,
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