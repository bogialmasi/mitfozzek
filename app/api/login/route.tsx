'use server'
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';
import { generateToken } from '@/lib/jwt';
import { PoolConnection } from 'mysql2/promise';

const ADMIN_USER_ID = ['1'];

interface User {
  user_id: number;
  username: string;
  password: string;
  inactive: number;
}

export async function POST(req: NextRequest) {
  let con: PoolConnection | undefined;
  con = await pool.getConnection();
  if (!con) {
    return NextResponse.json({ error: 'No database connection' }, { status: 500 });
  }
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Felhasználónév és jelszó megadása kötelező' }, { status: 400 });
    }

    const [result] = await con.query(
      'SELECT user_id, username, password, inactive FROM users WHERE username = ?',
      [username]
    );

    const user = (result as User[])[0];

    if (!user) {
      return NextResponse.json({ success: false, message: 'Nincs ilyen felhasználó' }, { status: 401 });
    }

    if (user.inactive === 1) {
      return NextResponse.json({ success: false, message: 'Felhasználó deaktiválva' }, { status: 403 });
    }


    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
        return NextResponse.json({ success: false, message: 'Helytelen jelszó' }, { status: 401 });
    }

    if (validPassword) {
      // Generate a JWT and send it to the client
      // generateToken comes from /lib/jwt's function, is a 'sign'
      const isAdmin = ADMIN_USER_ID.includes(user.user_id.toString());

      const token = generateToken({ userId: user.user_id, username: user.username, isAdmin: isAdmin });

      const response = NextResponse.json({ success: true, message: 'Sikeres bejelentkezés' });

      response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
        sameSite: 'lax', // Ensures it works across subdomains
      });
      console.log("Setting token cookie:", token);

      return response;
    } else {
      return NextResponse.json({ success: false, message: 'Sikertelen bejelentkezés' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
  finally {
    if (con) {
      con.release();
    }
  }
}
