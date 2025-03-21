import pool from "@/lib/db";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// TODO check that userId is adminId!

export async function GET(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const { searchParams } = req.nextUrl;
        /**
         * Get recipe by id
         */
        const id = searchParams.get('id');
        if (id) {
            const recipeId = Number(id);
            const [recipes] = await con.query<RowDataPacket[]>(
                `SELECT recipes.*, users.username, con_recipe_status.status FROM recipes 
                 LEFT JOIN users ON recipes.source_user_id = users.user_id 
                 JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
                WHERE recipes.recipe_id = ? `, [recipeId]);

            if (recipes.length === 0) {
                return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
            }

            // Ingredients of the recipe
            const [ingredientsData] = await con.query<RowDataPacket[]>(
                `SELECT ingredients.ingredient_id, ingredients.ingredient_name,
                 con_recipe_ingredients.ingredient_quantity, 
                ingredients.ingredient_measurement
                FROM ingredients
                JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
                WHERE con_recipe_ingredients.recipe_id = ?`,
                [recipeId]
            );

            const fullRecipe = {
                ...recipes[0],
                ingredients: ingredientsData.map((ingredient) => ({
                    ingredient_id: ingredient.ingredient_id,
                    ingredient_name: ingredient.ingredient_name,
                    ingredient_quantity: ingredient.ingredient_quantity,
                    ingredient_measurement: ingredient.ingredient_measurement
                })),
            };
            return NextResponse.json(fullRecipe);
        }


        /**
         * Get all recipes of certain status
         */
        const status = searchParams.get('status');
        if (status) {
            const [recipes] = await con.query<RowDataPacket[]>(
                `SELECT recipes.*, users.username, con_recipe_status.status 
                 FROM recipes 
                 LEFT JOIN users ON recipes.source_user_id = users.user_id 
                 JOIN con_recipe_status ON recipes.recipe_id = con_recipe_status.recipe_id
                 WHERE con_recipe_status.status = ?`,
                [status]
            );

            if (recipes.length === 0) {
                return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
            }

            const fullRecipe = await Promise.all(
                recipes.map(async (recipe) => {
                    const [ingredientsData] = await con.query<RowDataPacket[]>(
                        `SELECT ingredients.ingredient_id, ingredients.ingredient_name, ingredients.ingredient_measurement,
                                con_recipe_ingredients.ingredient_quantity
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
                            ingredient_quantity: ingredient.ingredient_quantity,
                            ingredient_measurement: ingredient.ingredient_measurement
                        })),
                    };
                })
            );

            return NextResponse.json(fullRecipe);
        }
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


export async function PATCH(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });

        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { recipe_id, status } = await req.json();
        
        if (!recipe_id || !status) {
            return NextResponse.json({ success: false, message: 'Missing recipe_id or status' }, { status: 400 });
        }
        
        con.beginTransaction();

        const [result] = await con.query<ResultSetHeader[]>(`UPDATE con_recipe_status SET status = ? WHERE recipe_id = ?`,
            [status, recipe_id]
        );
        await con.commit();
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Status edit failed' }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });

    } catch (error) {
        if (con) {
            await con.rollback();
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error editing status:', error);
        return NextResponse.json({ message: 'Editing status failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}
