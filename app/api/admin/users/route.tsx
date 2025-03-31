import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
//import { isAdmin } from '@/middleware/admin';
import { PoolConnection } from 'mysql2/promise';
import { isAdmin } from '../route';

export async function GET(req: NextRequest) {
    const adminCheck = await isAdmin(req);

    if (!adminCheck) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
    }
    try {

        const [users] = await con.query<RowDataPacket[]>(
            'SELECT user_id, username, email, inactive FROM users'
        );

        if (users.length === 0) {
            return NextResponse.json({ success: false, message: 'No users found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, users });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}

export async function PATCH(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
        }

        const [user] = await con.query<RowDataPacket[]>('SELECT inactive FROM users WHERE user_id = ?', [id]);

        if (user.length === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const currentStatus = user[0].inactive;

        // toggle inactive status
        const newStatus = currentStatus === 0 ? 1 : 0;

        await con.query('UPDATE users SET inactive = ? WHERE user_id = ?', [newStatus, id]);

        return NextResponse.json({
            success: true,
            message: `User inactive status updated to ${newStatus}`,
        });

    } catch (error) {
        console.error('Error updating user status:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }
}