import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';
import { generateToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Minden mező kitöltése kötelező' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    const user = (rows as any[])[0];

    if (!user) {
      return NextResponse.json({ success: false, message: 'Hibás adatok' }, { status: 401 });
    }

    const validPassword = await argon2.verify(user.password, password);

    if (validPassword) {
      // Generate a JWT and send it to the client
      const token = generateToken({ id: user.id, username: user.username });

      return NextResponse.json({
        success: true,
        token,
        message: 'Sikeres bejelentkezés'
      });
    } else {
      return NextResponse.json({ success: false, message: 'Hibás adatok' }, { status: 401 });
    }
  } catch (error) {
    console.error('Hiba a bejelentkezés során:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
