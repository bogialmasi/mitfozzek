import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        //Get the token from the Authorization header
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });

        }

        //Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });

        }

        // Use the userId to query the database for user-specific data, not including the password
        const [result] = await con.query<RowDataPacket[]>(
            'SELECT user_id, username, user_desc, email FROM users WHERE user_id = ?',
            [userId]
        );


        if (result.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Nincs ilyen felhasználó' },
                { status: 404 }
            );
        }

        const user = result[0]; // The first row
        if (user.inactive === 1) {
            return NextResponse.json({ success: false, message: 'Felhasználó deaktiválva' }, { status: 403 });
        }
        return NextResponse.json({
            success: true,
            user_id: user.user_id,
            username: user.username,
            user_desc: user.user_desc,
            email: user.email,
        });
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