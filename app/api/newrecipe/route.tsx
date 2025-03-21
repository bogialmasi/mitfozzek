import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import { Ingredient } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const token = req.cookies.get('token')?.value;
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
        const { newRecipe, selectedFilters, acceptTerms, addUserId } = await req.json();

        if (!acceptTerms) {
            return NextResponse.json({ error: 'You must accept the terms' }, { status: 400 });
        }

        if (!newRecipe.recipe_name || !newRecipe.recipe_description || !newRecipe.ingredients || newRecipe.ingredients.length === 0) {
            return NextResponse.json({ error: "Missing recipe data" }, { status: 400 });
        }

        await con.beginTransaction();


        const recipeUserId = addUserId ? userId : null; 

        //Insert into the database
        const [result] = await con.query<ResultSetHeader>(
            'INSERT INTO recipes (recipe_name, recipe_description, recipe_time, recipe_headcount, source_user_id) VALUES (?, ?, ?, ?, ?)',
            [newRecipe.recipe_name, newRecipe.recipe_description, newRecipe.recipe_time, newRecipe.recipe_headcount, recipeUserId]
        );

        const resultId = result.insertId;

        // ingredients
        if (resultId != null) {
            // first only add to pending, admin will approve of it
            await con.query(`INSERT INTO con_recipe_status (recipe_id, status, changed) VALUES (?, "pending", NOW())`, [resultId]);


            const ingredients = newRecipe.ingredients as Ingredient[]
            if (Array.isArray(ingredients) && newRecipe.ingredients.length > 0) {
                const recipeIngredients = ingredients.map(({ ingredient_id, ingredient_quantity}) =>
                    con.query(
                        `INSERT INTO con_recipe_ingredients (recipe_id, ingredient_id, ingredient_quantity) 
                         VALUES (?, ?, ?)`,
                        [resultId, ingredient_id, ingredient_quantity]
                    )
                );
                await Promise.all(recipeIngredients);
            }


            const { dishType, dishCuisine, dietCategory } = selectedFilters;
            const filters: Promise<any>[] = [];

            // dish cuisine
            if (dishCuisine && dishCuisine.length > 0) {
                dishCuisine.forEach((key: number) => {
                    filters.push(
                        con.query(
                            'INSERT INTO con_recipe_cuisine (recipe_id, cuisine_id) VALUES (?, ?)',
                            [resultId, key]
                        )
                    );
                });
            }

            // dish type
            if (dishType && dishType.length > 0) {
                dishType.forEach((key: number) => {
                    filters.push(
                        con.query(
                            'INSERT INTO con_recipe_dish_type (recipe_id, dishtype_id) VALUES (?, ?)',
                            [resultId, key]
                        )
                    );
                });
            }

            // diet category
            if (dietCategory && dietCategory.length > 0) {
                dietCategory.forEach((key: number) => {
                    filters.push(
                        con.query(
                            'INSERT INTO con_recipe_diet_category (recipe_id, category_id) VALUES (?, ?)',
                            [resultId, key]
                        )
                    );
                });
            }
            if (filters.length > 0) {
                // only if there are any filters
                await Promise.all(filters);
            }
        }
        await con.commit();
        return NextResponse.json({ message: 'Recipe posted' }, { status: 200 });
    } catch (error) {
        if (con) {
            con.rollback();
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error posting recipe:', error);
        return NextResponse.json({ message: 'Posting recipe failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}
