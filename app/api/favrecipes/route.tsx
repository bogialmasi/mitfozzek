import { NextApiResponse } from 'next';
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET!;

// GET method gives back the FULL favorite recipe of the user including ingredients
export async function GET(req: NextRequest) {
    try {
        //Get the token from the Authorization header
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
        }

        //Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Get the user's favorite recipes (user_fav_recipes)
        const [user_fav_recipes] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM user_fav_recipes WHERE user_id = ?',
            [userId]
        );

        const fullRecipePromises = user_fav_recipes.map(async (fav) => {
            // Get the recipe details for each favorite recipe
            const [recipes] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM recipes WHERE recipe_id = ?',
                [fav.recipe_id]
            );
            const recipe = recipes[0];  // Assuming one recipe per query

            // Get the ingredients for the recipe (con_recipe_ingredients)
            const [con_recipe_ingredients] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM con_recipe_ingredients WHERE recipe_id = ?',
                [recipe.recipe_id]
            );

            // Get the ingredient details for each ingredient in the recipe
            const ingredients = await Promise.all(
                con_recipe_ingredients.map(async (con) => {
                    const [ingredient] = await pool.query<RowDataPacket[]>(
                        'SELECT * FROM ingredients WHERE ingredient_id = ?',
                        [con.ingredient_id]
                    );
                    return ingredient[0] as RowDataPacket;  // Assuming one ingredient per query
                })
            );

            return {
                ...recipe,
                ingredients,
            };
        });

        const fullRecipes = await Promise.all(fullRecipePromises);
        return NextResponse.json(fullRecipes);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ success: false, message: 'Fetching failed' }, { status: 500 });

    }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        // Get the token from the Authorization header
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });

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
            return NextResponse.json({ success: false, message: 'No recipeId' }, { status: 401 });
        }

        // check if recipe is already favorited
        const duplicate = await pool.query<RowDataPacket[]>(
            'SELECT recipe_id from user_fav_recipes WHERE user_id = ? and recipe_id = ?',
            [userId, recipeId],
        )
        console.log("duplicate : ", duplicate);

        if (duplicate[0].length > 0) {
            return NextResponse.json({ success: false, message: 'Item already in favorites' }, { status: 400 });
        }
        //Insert into the database
        const result = await pool.query<ResultSetHeader[]>(
            'INSERT INTO user_fav_recipes (user_id, recipe_id) VALUES (?, ?)',
            [userId, recipeId]
        );
        return NextResponse.json({ message: 'Item added to favorites', recipeId: recipeId, result }, { status: 200 });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
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

        //Get recipeId from the request URL
        const { searchParams } = req.nextUrl;
        const id = searchParams.get('recipeId') || null;
        if (!id) {
            return NextResponse.json({ success: false, message: 'No recipeId provided' }, { status: 400 });
        }
        const recipeId = Number(id);
        if (isNaN(recipeId)) {
            return NextResponse.json({ success: false, message: 'Invalid recipeId' }, { status: 400 });
        }

        const [result] = await pool.query<RowDataPacket[]>(
            'DELETE FROM user_fav_recipes WHERE user_id = ? AND recipe_id = ?',
            [userId, recipeId]
        );
        // If no rows were affected
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Recipe not found in favorites' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipe removed from favorites', recipeId }, { status: 200 });

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error deleting favorite item:', error);
        return NextResponse.json({ message: 'Deleting from favorites failed' }, { status: 500 });
    }
}