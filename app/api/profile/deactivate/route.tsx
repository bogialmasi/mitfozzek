import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(req: NextRequest) {
    try {
        // Get the token from the Authorization header
        const authorization = req.headers.get('Authorization');
        const token = authorization?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 404 });
        }

        // Verify and decode the token
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Get userId from the decoded token

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }
        const [userInactive] = await pool.query<RowDataPacket[]>('SELECT inactive FROM users WHERE user_id = ?', [userId]);
        if (userInactive.length === 0) {
            return NextResponse.json({ success: false, message: 'Nincs ilyen felhasználó' }, { status: 404 });
        }
        const user = userInactive[0];

        if (user.inactive === 1) {
            return NextResponse.json({ success: false, message: 'Deaktivált felhasználó' }, { status: 403 });
        }


        const [result] = await pool.query<ResultSetHeader[]>(`UPDATE users SET inactive = 1 WHERE user_id = ?`, [userId]);

        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Deactivating profile failed' }, { status: 400 });
        }

        return NextResponse.json({ status: 200 });


    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error deactivating profile:', error);
        return NextResponse.json({ message: 'Deactivating profile failed' }, { status: 500 });

    }
}
