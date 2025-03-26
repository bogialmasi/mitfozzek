import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;
async function getIngredients(con: PoolConnection, recipeId: number) {
  const [ingredientsData] = await con.query<RowDataPacket[]>(`
        SELECT ingredients.*,
               con_recipe_ingredients.ingredient_quantity
        FROM ingredients
        JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
        WHERE con_recipe_ingredients.recipe_id = ?
    `, [recipeId]);

  return ingredientsData.map(ingredient => ({
    ingredient_id: ingredient.ingredient_id,
    ingredient_name: ingredient.ingredient_name,
    ingredient_quantity: ingredient.ingredient_quantity,
    ingredient_measurement: ingredient.ingredient_measurement
  }));
}

export async function GET(req: NextRequest) {
  let con: PoolConnection | undefined;
  con = await pool.getConnection();
  if (!con) {
    return NextResponse.json({ error: 'No database connection' }, { status: 500 });
  }
  try {
    const { searchParams } = req.nextUrl;

    const searchQuery = searchParams.get('searchQuery') || null;
    const selectedIngredients = searchParams.getAll('ingredients').map(Number);
    const selectedDishType = searchParams.getAll('dishType').map(Number);
    const selectedDietCategory = searchParams.getAll('dietCategory').map(Number);
    const selectedCuisine = searchParams.getAll('dishCuisine').map(Number);
    const pantryIngredientsOnly = searchParams.get('pantryIngredientsOnly');
    const id = searchParams.get('id');
    const user = searchParams.get('user');

    /*
    //
    // One recipe based on ID
    // */
    if (id) {
      const recipeId = Number(id);
      const [recipes] = await con.query<RowDataPacket[]>(
        `SELECT recipes.*, users.username FROM recipes 
        LEFT JOIN users ON recipes.source_user_id = users.user_id 
        JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
        WHERE recipes.recipe_id = ? AND con_recipe_status.status = "approved"`, [recipeId]);

      if (recipes.length === 0) {
        return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
      }


      const fullRecipe = await Promise.all(
        recipes.map(async (recipe) => ({
          ...recipe,
          ingredients: await getIngredients(con, recipe.recipe_id),
        }))
      );
      return NextResponse.json(fullRecipe[0]); //only one recipe is returned
    }



    /*
    //
    // Recipes that only contain pantry ingredients, with filters
    // */

    if (pantryIngredientsOnly === 'true') {
      const token = req.cookies.get('token')?.value;
      if (!token) {
        return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });
      }
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;

      let query = `
      SELECT DISTINCT recipes.recipe_id, recipes.recipe_name, recipes.recipe_description, recipes.recipe_time, recipes.recipe_headcount
      FROM recipes
      LEFT JOIN con_recipe_ingredients ON con_recipe_ingredients.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_dish_type ON con_recipe_dish_type.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_diet_category ON con_recipe_diet_category.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_cuisine ON con_recipe_cuisine.recipe_id = recipes.recipe_id
      LEFT JOIN pantry ON pantry.ingredient_id = con_recipe_ingredients.ingredient_id
      JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
      WHERE con_recipe_status.status = "approved" 
      AND NOT EXISTS (
            SELECT 1 FROM con_recipe_ingredients
            WHERE con_recipe_ingredients.recipe_id = recipes.recipe_id
            AND con_recipe_ingredients.ingredient_id NOT IN (
            SELECT ingredient_id FROM pantry WHERE pantry.pantry_id = ?
            ))`;

      const filters = [];
      const params = [userId]; // userId is the first parameter

      // Filters
      if (searchQuery) {
        filters.push('LOWER(recipes.recipe_name) LIKE LOWER(?)');
        params.push(`%${searchQuery}%`);
      }
      if (selectedDishType.length > 0) {
        filters.push(`con_recipe_dish_type.dishtype_id IN (${selectedDishType.map(() => '?').join(',')})`);
        params.push(...selectedDishType);
      }
      if (selectedDietCategory.length > 0) {
        filters.push(`con_recipe_diet_category.category_id IN (${selectedDietCategory.map(() => '?').join(',')})`);
        params.push(...selectedDietCategory);
      }
      if (selectedCuisine.length > 0) {
        filters.push(`con_recipe_cuisine.cuisine_id IN (${selectedCuisine.map(() => '?').join(',')})`);
        params.push(...selectedCuisine);
      }
      if (filters.length > 0) {
        query += ' AND ' + filters.join(' AND ');
      }

      const [recipes] = await con.query<RowDataPacket[]>(query, params);

      if (recipes.length === 0) {
        return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
      }

      const fullRecipe = await Promise.all(
        recipes.map(async (recipe) => ({
          ...recipe,
          ingredients: await getIngredients(con, recipe.recipe_id),
        }))
      );
      return NextResponse.json(fullRecipe);
    }

    /**
     * Recipes of a user
     */

    if (user) {
      const userId = Number(user);
      if (isNaN(userId)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
      }
      const [recipes] = await con.query<RowDataPacket[]>(
        `SELECT recipes.*, users.username FROM recipes 
        LEFT JOIN users ON recipes.source_user_id = users.user_id 
        JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
        WHERE recipes.source_user_id = ? AND con_recipe_status.status = "approved"`, [userId]);

      if (recipes.length === 0) {
        return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
      }

      const username = recipes[0]?.username
      const fullRecipe = await Promise.all(
        recipes.map(async (recipe) => ({
          ...recipe,
          ingredients: await getIngredients(con, recipe.recipe_id),
        }))
      );
      return NextResponse.json({fullRecipe, username});
    }


    /*
    //
    // Multiple recipes based on filters
    // */
    let query = `
      SELECT DISTINCT recipes.recipe_id, recipes.recipe_name, recipes.recipe_description, recipes.recipe_time, recipes.recipe_headcount
      FROM recipes
      LEFT JOIN con_recipe_ingredients ON con_recipe_ingredients.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_dish_type ON con_recipe_dish_type.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_diet_category ON con_recipe_diet_category.recipe_id = recipes.recipe_id
      LEFT JOIN con_recipe_cuisine ON con_recipe_cuisine.recipe_id = recipes.recipe_id
      JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
      WHERE con_recipe_status.status = "approved"
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
    if (selectedDietCategory.length > 0) {
      filters.push(`con_recipe_diet_category.category_id IN (${selectedDietCategory.map(() => '?').join(',')})`);
      params.push(...selectedDietCategory);
    }
    if (selectedCuisine.length > 0) {
      filters.push(`con_recipe_cuisine.cuisine_id IN (${selectedCuisine.map(() => '?').join(',')})`);
      params.push(...selectedCuisine);
    }
    if (filters.length > 0) {
      query += ' AND ' + filters.join(' AND ');
    }

    const [recipes] = await con.query<RowDataPacket[]>(query, params);

    if (recipes.length === 0) {
      return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
    }

    const fullRecipe = await Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        ingredients: await getIngredients(con, recipe.recipe_id),
      }))
    );
    return NextResponse.json(fullRecipe);

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
  finally {
    if (con) {
      con.release();
    }
  }
}