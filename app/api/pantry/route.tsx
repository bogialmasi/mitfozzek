import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET!;

// Gives back a list of pantry items based on the user token
export async function GET(req: NextRequest) {
    try {
        //Get the token from the Authorization header
        console.log('Authorization header:', req.headers.get('Authorization'));
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });
        }

        //Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Check if the user has a pantry
        const [pantry] = await pool.query<RowDataPacket[]>(
            'SELECT pantry_id FROM con_user_pantry WHERE user_id = ?',
            [userId]
        );

        // If user doesn't have a pantry, return an empty response
        if (pantry.length === 0) {
            return NextResponse.json({ success: true, pantry_items: [] });
        }

        const pantryId = pantry[0].pantry_id;

        // Query to get pantry items for the user
        const [pantryItems] = await pool.query<RowDataPacket[]>(
            `SELECT 
                pantry.ingredient_id,
                ingredients.ingredient_name AS ingredient_name,
                pantry.ingredient_quantity,
                measurements.measurement_name AS measurement_name
            FROM pantry
            JOIN ingredients ON pantry.ingredient_id = ingredients.ingredient_id
            JOIN measurements ON pantry.measurement_id = measurements.measurement_id
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
            measurement_name: item.measurement_name
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
}

export async function POST(req: NextRequest) {
    //Get the token from the Authorization header
    console.log('Authorization header:', req.headers.get('Authorization'));
    const authorization = req.headers.get('Authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });
    }

    //Verify and decode the token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the decoded token

    if (!userId) {
        return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
    }

    try {
        const { ingredient_id, ingredient_quantity, measurement_id } = await req.json();

        // cannot insert without all three fields being filled in
        if (!ingredient_id || !ingredient_quantity || !measurement_id) {
            return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
        }

        await pool.query(
            "INSERT INTO pantry (pantry_id, ingredient_id, ingredient_quantity, measurement_id) VALUES (?, ?, ?, ?)",
            [userId, ingredient_id, ingredient_quantity, measurement_id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error inserting pantry item:", error);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }
}