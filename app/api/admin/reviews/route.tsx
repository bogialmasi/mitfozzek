'use server'
import pool from "@/lib/db";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken';
import { getCuisines, getDietCategories, getDishTypes, getIngredients, isAdmin } from "@/lib/helper";


export async function GET(req: NextRequest) {
    const adminCheck = await isAdmin(req);

    if (!adminCheck) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }
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
            const reviewId = Number(id);
            const [reviews] = await con.query<RowDataPacket[]>(
                `SELECT DISTINCT recipes.*, users.username, recipe_status.status, 
                    dish_type.dishtype_name, dish_cuisine.cuisine_name, diet_category.category_name
                    FROM recipes 
                 LEFT JOIN users ON recipes.source_user_id = users.user_id 
                 LEFT JOIN con_recipe_dish_type ON recipes.recipe_id = con_recipe_dish_type.recipe_id
                 LEFT JOIN dish_type ON con_recipe_dish_type.dishtype_id = dish_type.dishtype_id
                 LEFT JOIN con_recipe_cuisine ON recipes.recipe_id = con_recipe_cuisine.recipe_id
                 LEFT JOIN dish_cuisine ON dish_cuisine.cuisine_id = con_recipe_cuisine.cuisine_id
                 LEFT JOIN con_recipe_diet_category on recipes.recipe_id = con_recipe_diet_category.category_id 
                LEFT JOIN diet_category ON diet_category.category_id = con_recipe_diet_category.category_id
                 JOIN recipe_status ON recipes.recipe_id = recipe_status.recipe_id
                WHERE recipes.recipe_id = ? `, [reviewId]);

            if (reviews.length === 0) {
                return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
            }

            const fullRecipe = await Promise.all(
                reviews.map(async (recipe) => {
                    const [ingredients, dishTypes, cuisines, dietCategories] = await Promise.all([
                        getIngredients(con, recipe.recipe_id),
                        getDishTypes(con, recipe.recipe_id),
                        getCuisines(con, recipe.recipe_id),
                        getDietCategories(con, recipe.recipe_id)
                    ]);

                    return {
                        ...recipe,
                        ingredients,
                        dishtype_name: dishTypes,
                        cuisine_name: cuisines,
                        category_name: dietCategories
                    };
                })
            );

            return NextResponse.json(fullRecipe);
        }


        /**
         * Get all recipes of certain status
         */
        const status = searchParams.get('status');
        if (status) {
            const [reviews] = await con.query<RowDataPacket[]>(
                `SELECT DISTINCT recipes.*, users.username, recipe_status.status, 
                dish_type.dishtype_name, dish_cuisine.cuisine_name, diet_category.category_name 
                FROM recipes 
                LEFT JOIN users ON recipes.source_user_id = users.user_id 
                LEFT JOIN con_recipe_dish_type ON recipes.recipe_id = con_recipe_dish_type.recipe_id 
                LEFT JOIN dish_type ON con_recipe_dish_type.dishtype_id = dish_type.dishtype_id 
                LEFT JOIN con_recipe_cuisine ON recipes.recipe_id = con_recipe_cuisine.recipe_id 
                LEFT JOIN dish_cuisine ON dish_cuisine.cuisine_id = con_recipe_cuisine.cuisine_id 
                LEFT JOIN con_recipe_diet_category on recipes.recipe_id = con_recipe_diet_category.category_id 
                LEFT JOIN diet_category ON diet_category.category_id = con_recipe_diet_category.category_id 
                JOIN recipe_status ON recipes.recipe_id = recipe_status.recipe_id
                 WHERE recipe_status.status = ?`,
                [status]
            );

            if (reviews.length === 0) {
                return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
            }

            const fullRecipe = await Promise.all(
                reviews.map(async (recipe) => {
                    const [ingredients, dishTypes, cuisines, dietCategories] = await Promise.all([
                        getIngredients(con, recipe.recipe_id),
                        getDishTypes(con, recipe.recipe_id),
                        getCuisines(con, recipe.recipe_id),
                        getDietCategories(con, recipe.recipe_id)
                    ]);

                    return {
                        ...recipe,
                        ingredients,
                        dishtype_name: dishTypes,
                        cuisine_name: cuisines,
                        category_name: dietCategories
                    };
                })
            );


            return NextResponse.json(fullRecipe);
        }
        const [allRecipes] = await con.query<RowDataPacket[]>(`
            SELECT DISTINCT recipes.*, users.username, recipe_status.status, 
                dish_type.dishtype_name, dish_cuisine.cuisine_name, diet_category.category_name 
                FROM recipes 
                LEFT JOIN users ON recipes.source_user_id = users.user_id 
                LEFT JOIN con_recipe_dish_type ON recipes.recipe_id = con_recipe_dish_type.recipe_id 
                LEFT JOIN dish_type ON con_recipe_dish_type.dishtype_id = dish_type.dishtype_id 
                LEFT JOIN con_recipe_cuisine ON recipes.recipe_id = con_recipe_cuisine.recipe_id 
                LEFT JOIN dish_cuisine ON dish_cuisine.cuisine_id = con_recipe_cuisine.cuisine_id 
                LEFT JOIN con_recipe_diet_category on recipes.recipe_id = con_recipe_diet_category.category_id 
                LEFT JOIN diet_category ON diet_category.category_id = con_recipe_diet_category.category_id 
                JOIN recipe_status ON recipes.recipe_id = recipe_status.recipe_id`);

        if (allRecipes.length === 0) {
            return NextResponse.json({ success: false, message: 'No recipes found' }, { status: 404 });
        }

        const fullRecipes = await Promise.all(
            allRecipes.map(async (recipe) => {
                const [ingredients, dishTypes, cuisines, dietCategories] = await Promise.all([
                    getIngredients(con, recipe.recipe_id),
                    getDishTypes(con, recipe.recipe_id),
                    getCuisines(con, recipe.recipe_id),
                    getDietCategories(con, recipe.recipe_id)
                ]);

                return {
                    ...recipe,
                    ingredients,
                    dishtype_name: dishTypes,
                    cuisine_name: cuisines,
                    category_name: dietCategories
                };
            })
        );


        return NextResponse.json(fullRecipes);

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}

export async function PATCH(req: NextRequest) {
    const adminCheck = await isAdmin(req);

    if (!adminCheck) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }

    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const { review_id, status } = await req.json();

        if (!review_id || !status) {
            return NextResponse.json({ success: false, message: 'Missing review_id or status' }, { status: 400 });
        }

        con.beginTransaction();

        const [result] = await con.query<ResultSetHeader[]>(`UPDATE recipe_status SET status = ? WHERE recipe_id = ?`,
            [status, review_id]
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
