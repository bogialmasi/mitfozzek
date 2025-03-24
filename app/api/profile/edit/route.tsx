import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import argon2 from 'argon2';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;


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

        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { username, email, description, password, newPassword } = await req.json();

        con.beginTransaction();
        let query = `UPDATE users SET `;
        const conditions = [];
        const params = [];

        if (newPassword) {
            const [result] = await con.query<RowDataPacket[]>(`SELECT password FROM users WHERE user_id = ?`, [userId]);
            if (result.length === 0) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            const hashedOldPassword = result[0].password; // already hashed, from db
            const verifyOldPassword = await argon2.verify(hashedOldPassword, password); // old password
            if (!verifyOldPassword) {
                return NextResponse.json({ success: false, message: 'Old password is incorrect' }, { status: 401 });
            } else {
                const hashedNewPassword = await argon2.hash(newPassword); // only happens if old password is correct
                conditions.push('password = ?');
                params.push(hashedNewPassword);
            }
        }

        if (username) {
            conditions.push('username = ?');
            params.push(username);
        }

        if (email) {
            conditions.push('email = ?');
            params.push(email);
        }

        if (description) {
            conditions.push('user_desc = ?');
            params.push(description);
        }

        if (conditions.length === 0) {
            return NextResponse.json({ success: false, message: 'No data to update' }, { status: 400 });
        }

        query += conditions.join(', ') + " WHERE user_id = ?"
        params.push(userId);

        await con.commit();
        const [result] = await con.query<ResultSetHeader[]>(query, params);

        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Profile edit failed' }, { status: 404 });
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
        console.error('Error editing profile:', error);
        return NextResponse.json({ message: 'Editing profile failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}