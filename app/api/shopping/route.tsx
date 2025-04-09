'use server'
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;
export async function GET(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
    }

    try {
        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Fetch all shopping lists for the user
        const [shoppingLists] = await con.query<RowDataPacket[]>(
            `SELECT shopping.shopping_id, shopping.shopping_name, shopping.recipe_id, recipes.recipe_name
            FROM shopping
            LEFT JOIN recipes ON shopping.recipe_id = recipes.recipe_id
            JOIN con_user_shopping ON shopping.shopping_id = con_user_shopping.shopping_id
            WHERE con_user_shopping.user_id = ?`,
            [userId]
        );

        // Iterate through each shopping list and fetch the ingredients
        const shoppingListWithIngredients = [];

        for (const shoppingList of shoppingLists) {
            const shoppingId = shoppingList.shopping_id;

            // Get the ingredients for this shopping list
            const [ingredients] = await con.query<RowDataPacket[]>(
                `SELECT ingredients.ingredient_id, ingredients.ingredient_name, 
                    con_shopping_ingredients.ingredient_quantity, ingredients.ingredient_measurement, 
                    bought
                FROM con_shopping_ingredients
                JOIN ingredients ON con_shopping_ingredients.ingredient_id = ingredients.ingredient_id
                WHERE con_shopping_ingredients.shopping_id = ?`,
                [shoppingId]
            );

            // Add the shopping list info along with its ingredients to the response
            shoppingListWithIngredients.push({
                shopping_id: shoppingList.shopping_id,
                shopping_name: shoppingList.shopping_name,
                recipe_id: shoppingList.recipe_id || null,
                recipe_name: shoppingList.recipe_name || null,
                ingredients: ingredients.map((ingredient) => ({
                    ingredient_id: ingredient.ingredient_id,
                    ingredient_name: ingredient.ingredient_name,
                    ingredient_quantity: ingredient.ingredient_quantity,
                    ingredient_measurement: ingredient.ingredient_measurement,
                    bought: !!ingredient.bought // check if 1 or 0
                }))
            });
        }

        return NextResponse.json(shoppingListWithIngredients);
    } catch (error) {
        console.error("Error fetching shopping lists:", error);
        return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}


export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
    }

    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { recipe_id, shopping_name, add_all, headcount } = await req.json();

        // Validate required fields
        if (!shopping_name || !headcount) {
            return NextResponse.json({ success: false, message: 'Missing shopping name or head conut' }, { status: 400 });
        }

        // Initialize ingredients array
        let ingredientsList: any[] = [];

        // If recipe_id is provided, fetch ingredients for that recipe
        if (recipe_id) {

            const [recipeHeadcount] = await pool.query<RowDataPacket[]>(`
                SELECT recipe_headcount
                FROM recipes
                WHERE recipe_id = ?`, [recipe_id]
            );

            if (recipeHeadcount.length === 0) {
                return NextResponse.json({ success: false, message: "No recipe found" }, { status: 400 });
            }

            const recipe_headcount = recipeHeadcount[0].recipe_headcount;

            const [recipeIngredients] = await pool.query<RowDataPacket[]>(
                `SELECT ingredients.ingredient_id, ingredient_quantity, ingredient_measurement
                FROM con_recipe_ingredients
                JOIN ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
                WHERE recipe_id = ?`,
                [recipe_id]
            );

            if (recipeIngredients.length === 0) {
                return NextResponse.json({ success: false, message: "No ingredients found for this recipe, or recipe doens't exist" }, { status: 400 });
            }


            // Map the fetched ingredients into the required format
            ingredientsList = recipeIngredients.map((ingredient) => ({
                ingredient_id: ingredient.ingredient_id,
                ingredient_quantity: (ingredient.ingredient_quantity * headcount / recipe_headcount),
                ingredient_measurement: ingredient.ingredient_measurement
            }));

            if (add_all === "false") {
                // filter out the ingredients already in the pantry
                const missingIngredients = [];
                for (const ingredient of recipeIngredients) {
                    const { ingredient_id } = ingredient;

                    // check if the ingredient is already in the pantry
                    const [pantryItem] = await con.query<RowDataPacket[]>(`
                        SELECT * FROM pantry 
                        WHERE pantry_id = ? AND ingredient_id = ?`,
                        [userId, ingredient_id]
                    );

                    // if the ingredient is not in pantry
                    if (pantryItem.length === 0) {
                        missingIngredients.push(ingredient);
                    }
                }

                // all ingredients are in pantry
                if (missingIngredients.length === 0) {
                    return NextResponse.json({ success: false, message: 'All ingredients are already in the pantry' }, { status: 400 });
                }

                // ingredientsList stores only the missing ings
                ingredientsList = missingIngredients;
            }


            con.beginTransaction();
            // Insert into shopping table
            const [shoppingResult] = await con.query<ResultSetHeader>(
                `INSERT INTO shopping (shopping_name, recipe_id) VALUES (?, ?)`,
                [shopping_name, recipe_id || null]
            );

            const shoppingId = shoppingResult.insertId;

            // Insert into con_user_shopping table
            await con.query(
                `INSERT INTO con_user_shopping (user_id, shopping_id) VALUES (?, ?)`,
                [userId, shoppingId]
            );

            // Insert ingredients
            for (const ingredient of ingredientsList) {
                const { ingredient_id, ingredient_quantity } = ingredient;

                const [existingIngredient] = await con.query<RowDataPacket[]>(
                    `SELECT * FROM ingredients WHERE ingredient_id = ?`,
                    [ingredient_id]
                );

                if (existingIngredient.length === 0) {
                    await con.rollback();
                    return NextResponse.json({ success: false, message: 'Invalid ingredient' }, { status: 400 });
                }

                // Insert the ingredients
                await con.query(
                    `INSERT INTO con_shopping_ingredients (shopping_id, ingredient_id, ingredient_quantity) 
                VALUES (?, ?, ?)`,
                    [shoppingId, ingredient_id, ingredient_quantity]
                );
            }
        } else {
            return NextResponse.json({ success: false, message: 'No recipe ID' }, { status: 400 });
        }
        await con.commit();
        return NextResponse.json({ success: true });
    } catch (error) {
        if (con) {
            await con.rollback();
        }
        console.error("Error inserting shopping list:", error);
        return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}

export async function PATCH(req: NextRequest) {
    let con;
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
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decoded.userId; if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { ingredient_id, bought } = await req.json();

        if (!ingredient_id || bought === undefined) {
            return NextResponse.json({ success: false, message: 'Missing ingredient_id or bought' }, { status: 400 });
        }

        const { searchParams } = req.nextUrl;
        const id = searchParams.get('shoppingId') || null;
        if (!id) {
            return NextResponse.json({ success: false, message: 'No shoppingId provided' }, { status: 400 });
        }
        const shoppingId = Number(id);
        if (isNaN(shoppingId)) {
            return NextResponse.json({ success: false, message: 'Invalid shoppingId' }, { status: 400 });
        }

        const [shoppingList] = await con.query<RowDataPacket[]>(
            'SELECT * FROM con_user_shopping WHERE shopping_id = ? AND user_id = ?',
            [shoppingId, userId]);

        if (shoppingList.length === 0) {
            return NextResponse.json({ success: false, message: 'Shopping list not found' }, { status: 404 });
        }

        await con.beginTransaction();

        const [result] = await con.query<ResultSetHeader[]>(
            `UPDATE con_shopping_ingredients SET bought = ? WHERE ingredient_id = ? AND shopping_id = ?`,
            [bought, ingredient_id, shoppingId]
        );

        if (result.length === 0) {
            await con.rollback()
            return NextResponse.json({ success: false, message: `Failed to update ingredient bought: ${ingredient_id}` }, { status: 500 });
        }

        await con.commit();
        return NextResponse.json({ success: true }, { status: 200 });
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
        console.error('Error updating shopping list item:', error);
        return NextResponse.json({ message: 'Shoppign list item update failed' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}

export async function DELETE(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing (Possibly expired)' }, { status: 404 });

        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token
        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        //Get shoppingId from the request URL
        const { searchParams } = req.nextUrl;
        const id = searchParams.get('shoppingId') || null;
        if (!id) {
            return NextResponse.json({ success: false, message: 'No shoppingId provided' }, { status: 400 });
        }
        const shoppingId = Number(id);
        if (isNaN(shoppingId)) {
            return NextResponse.json({ success: false, message: 'Invalid shoppingId' }, { status: 400 });
        }

        con.beginTransaction();
        // TODO delete from all with one constraint
        const [conUserShopping] = await con.query<ResultSetHeader[]>(
            'DELETE FROM con_user_shopping WHERE user_id = ? AND shopping_id = ?',
            [userId, shoppingId]
        );
        const [conShoppingIngredients] = await con.query<ResultSetHeader[]>(
            'DELETE FROM con_shopping_ingredients WHERE shopping_id = ?',
            [shoppingId]
        );
        const [shopping] = await con.query<ResultSetHeader[]>(
            'DELETE FROM shopping WHERE shopping_id = ?',
            [shoppingId]
        );

        await con.commit();
        if (conUserShopping.length === 0 || conShoppingIngredients.length === 0 || shopping.length === 0) {
            return NextResponse.json({ success: false, message: 'Shopping list not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Shopping list deleted', recipeId: shoppingId }, { status: 200 });
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
        console.error('Error deleting favorite item:', error);
        return NextResponse.json({ message: 'Deleting from favorites failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}