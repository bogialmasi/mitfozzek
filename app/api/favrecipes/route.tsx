import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET!;

// GET method gives back the FULL favorite recipe of the user including ingredients
export async function GET(req: NextRequest) {
    try {
        //Get the token from the Authorization header
        console.log(req.headers);
        console.log('Authorization header:', req.headers.get('Authorization'));
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });

        }

        //Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token
        console.log("userId:", userId);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Get the user's favorite recipes (user_fav_recipes)
        const [user_fav_recipes] = await pool.query('SELECT * FROM user_fav_recipes WHERE user_id = ?', [userId]);
        const favoriteRecipes = (user_fav_recipes as RowDataPacket[]);

        // Store detailed recipes with ingredients
        const fullRecipe = [];

        // Loop through favorite recipes and get detailed data
        for (const fav of favoriteRecipes) {
            // Get the recipe details (recipes) for each favorite recipe
            const [recipes] = await pool.query('SELECT * FROM recipes WHERE recipe_id = ?', [fav.recipe_id]);
            const recipe = (recipes as RowDataPacket[])[0];  // Assuming only one recipe per query

            // Get the ingredients for this recipe (con_recipe_ingredients)
            const [con_recipe_ingredients] = await pool.query('SELECT * FROM con_recipe_ingredients WHERE recipe_id = ?', [recipe.recipe_id]);
            const conIngredients = (con_recipe_ingredients as RowDataPacket[]);

            // Store ingredient details
            const ingredients = [];

            // Loop through the con_recipe_ingredients table to get the ingredients
            for (const con of conIngredients) {
                const [ingredient] = await pool.query('SELECT * FROM ingredients WHERE ingredient_id = ?', [con.ingredient_id]);
                ingredients.push((ingredient as RowDataPacket[])[0]);  // Assuming only one ingredient per query
            }

            // Combine recipe data with its ingredients and add to the result
            fullRecipe.push({
                ...recipe,  // Recipe data
                ingredients: ingredients,  // Ingredients for this recipe
            });
        }

        // Return the detailed recipe data
        return NextResponse.json(fullRecipe);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ success: false, message: 'Fetching failed' }, { status: 500 });

    }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        // Get the token from the Authorization header
        console.log(req.headers);
        console.log('Authorization header:', req.headers.get('Authorization'));
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });

        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token
        console.log("userId:", userId);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Get itemId from the request body
        const { recipeId } = await req.json();
        if (!recipeId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        //Insert into the database
        const result = await pool.query(
            'INSERT INTO user_fav_recipes (user_id, recipe_id) VALUES (?, ?)',
            [userId, recipeId]
        );
        return NextResponse.json({ message: 'Item added to favorites', recipeId: recipeId, result }, { status: 200 });
    } catch (error) {
        console.error('Error adding favorite item:', error);
        return NextResponse.json({ message: 'Adding to favorites failed' }, { status: 500 });

    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Get the token from the Authorization header
        console.log(req.headers);
        console.log('Authorization header:', req.headers.get('Authorization'));
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing (Possibly expired)' }, { status: 404 });

        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token
        console.log("userId:", userId);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        //Get itemId from the request body
        const { recipeId } = await req.json();
        if (!recipeId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        /* Delete the recipe from user_fav_recipes
        [result] is extracting the first element of the array (ResultSetHeader), where affectedRows is located.
        using _ indicated that fieldPacket[] is used but unintentional. Query returns multiple values but i only need one 
        _ : convention in programming languages to sign an unused variable*/
        const [result, _] = await pool.query(
            'DELETE FROM user_fav_recipes WHERE user_id = ? AND recipe_id = ?',
            [userId, recipeId]
        );

        // Explicitly cast resul to ResultSetHeader. that's where affectedRows is
        const affectedRows = (result as ResultSetHeader).affectedRows;

        // If no rows were affected
        if (affectedRows === 0) {
            return NextResponse.json({ success: false, message: 'Recipe not found in favorites' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipe removed from favorites', recipeId }, { status: 200 });

    } catch (error) {
        console.error('Error deleting favorite item:', error);
        return NextResponse.json({ message: 'Deleting from favorites failed' }, { status: 500 });
    }
}