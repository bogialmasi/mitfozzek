'use server'
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;

// Gives back a list of pantry items based on the user token
export async function GET(req: NextRequest) {
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

        //Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token

        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Check if the user has a pantry
        const [pantry] = await con.query<RowDataPacket[]>(
            'SELECT pantry_id FROM con_user_pantry WHERE user_id = ?',
            [userId]
        );

        // If user doesn't have a pantry, return an empty response
        if (pantry.length === 0) {
            return NextResponse.json({ success: true, pantry_items: [] });
        }

        const pantryId = pantry[0].pantry_id;

        /**
         * 
         * ONE ingredient based on ID
         * 
         */
        const { searchParams } = req.nextUrl;
        const id = searchParams.get('id');
        if (id) {
            const ingreidentId = Number(id);

            const [ingredient] = await con.query<RowDataPacket[]>(
                `SELECT 
                    pantry.ingredient_id,
                    ingredients.ingredient_name AS ingredient_name,
                    pantry.ingredient_quantity,
                    ingredients.ingredient_measurement
                FROM pantry
                JOIN ingredients ON pantry.ingredient_id = ingredients.ingredient_id
                WHERE pantry.pantry_id = ? AND pantry.ingredient_id = ?`,
                [pantryId, ingreidentId]
            );


            // If no pantry items found, return an empty array
            if (ingredient.length === 0) {
                return NextResponse.json({ success: false, message: 'Ingredient not found in pantry' }, { status: 404 });
            }

            // Format and return pantry items
            const formattedIngredient = ingredient.map((item) => ({
                ingredient_id: item.ingredient_id,
                ingredient_name: item.ingredient_name,
                ingredient_quantity: item.ingredient_quantity,
                ingredient_measurement: item.ingredient_measurement
            }));

            return NextResponse.json(formattedIngredient[0]); // only one ingredient
        }

        /*
        //
        // ALL ingredients of the user
        //
        */

        // Query to get pantry items for the user
        const [pantryItems] = await con.query<RowDataPacket[]>(
            `SELECT 
                pantry.ingredient_id,
                ingredients.ingredient_name AS ingredient_name,
                pantry.ingredient_quantity,
                ingredients.ingredient_measurement
            FROM pantry
            JOIN ingredients ON pantry.ingredient_id = ingredients.ingredient_id
            WHERE pantry.pantry_id = ?`,
            [pantryId]
        );

        // If no pantry items found, return an empty array
        if (pantryItems.length === 0) {
            return NextResponse.json({ success: true, pantry_items: [] });
        }

        // Format and return pantry items
        const formattedPantryItems = pantryItems.map((item) => ({
            ingredient_id: item.ingredient_id,
            ingredient_name: item.ingredient_name,
            ingredient_quantity: item.ingredient_quantity,
            ingredient_measurement: item.ingredient_measurement
        }));

        return NextResponse.json({ pantry_items: formattedPantryItems });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error fetching user data:', error);
        return NextResponse.json({ success: false, message: 'Fetching failed' }, { status: 500 });
    }
    finally {
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

    //Verify and decode the token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the decoded token

    if (userId === null || userId === undefined) {
        return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
    }

    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {

        const { ingredient_id, ingredient_quantity } = await req.json();
        // cannot insert without all three fields being filled in
        if (!ingredient_id || !ingredient_quantity) {
            return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
        }

        const [existingItem] = await con.query<RowDataPacket[]>(
            "SELECT * FROM pantry WHERE pantry_id = ? AND ingredient_id = ?",
            [userId, ingredient_id]
        );

        if (existingItem.length > 0) {
            return NextResponse.json({ success: false, message: 'Item already exists in pantry' }, { status: 400 });
        }

        await con.beginTransaction();

        await con.query<ResultSetHeader[]>(
            "INSERT INTO pantry (pantry_id, ingredient_id, ingredient_quantity) VALUES (?, ?, ?)",
            [userId, ingredient_id, ingredient_quantity]
        );

        await con.commit();
        return NextResponse.json({ success: true });
    } catch (error) {
        if (con) {
            await con.rollback();
        }
        console.error("Error inserting pantry item:", error);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
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
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });

        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token
        console.log("userId:", userId);

        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { ingredient_id, ingredient_quantity } = await req.json();

        await con.beginTransaction();
        let result;
        if (ingredient_id !== undefined && ingredient_quantity !== undefined) {
            const [queryResult] = await con.query<ResultSetHeader[]>(`UPDATE pantry SET ingredient_quantity = ? WHERE pantry_id = ? AND ingredient_id = ?`, [ingredient_quantity, userId, ingredient_id]);
            result = queryResult;
        } else {
            return NextResponse.json({ success: false, message: 'Invalid query' }, { status: 400 });
        }

        await con.commit();
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Pantry edit failed' }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
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
        console.error('Error editing pantry:', error);
        return NextResponse.json({ message: 'Editing pantry failed' }, { status: 500 });
    }
    finally {
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
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
        }
        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token
        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }
        const { ingredient_id } = await req.json();
        if (!ingredient_id) {
            return NextResponse.json({ success: false, message: 'No ingredient_id found' }, { status: 400 });
        }

        await con.beginTransaction();

        const [result] = await con.query<ResultSetHeader[]>(
            "DELETE FROM pantry WHERE pantry_id = ? AND ingredient_id = ?",
            [userId, ingredient_id]
        );
        await con.commit();
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Error deleting item' }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
    }
    catch (error) {
        if (con) {
            con.rollback();
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error editing profile:', error);
        return NextResponse.json({ message: 'Editing profile failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}
