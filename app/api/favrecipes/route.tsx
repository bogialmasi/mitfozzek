import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
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

        //Use the userId to query the database for user-specific data
        const [result] = await pool.query('SELECT * FROM user_fav_recipes WHERE user_id = ?', [userId]);

        // Return the results
        console.log('Rows from query:', result);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ success: false, message: 'Fetching failed' }, { status: 500 });

    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Step 1: Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });
        }

        // Step 2: Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Step 3: Extract itemId from the request body (assume it's sent as JSON)
        const { recipeId: recipeId } = req.body;
        if (!recipeId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        // Step 4: Insert the new favorite item into the database
        const result = await pool.query(
            'INSERT INTO user_fav_recipe (user_id, recipe_id) VALUES (?, ?)',
            [userId, recipeId]
        );
        return NextResponse.json({ message: 'Item added to favorites', recipeId: recipeId }, { status: 200 });
    } catch (error) {
        console.error('Error adding favorite item:', error);
        return NextResponse.json({ message: 'Adding to favorites failed' }, { status: 500 });

    }
}