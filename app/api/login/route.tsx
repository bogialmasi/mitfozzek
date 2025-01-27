import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';
import { generateToken } from '@/lib/jwt';

interface User {
  user_id: number;
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Minden mező kitöltése kötelező' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT user_id, username, password FROM users WHERE username = ?',
      [username]
    );

    const user = (rows as User[])[0];

    if (!user) {
      return NextResponse.json({ success: false, message: 'Hibás adatok' }, { status: 401 });
    }

    // argon2 verification
    const validPassword = await argon2.verify(user.password, password);
    if(!validPassword){
      return NextResponse.json({ success: false, message: 'Hibás jelszó' }, { status: 401 });
    }

    if (validPassword) {
      // Generate a JWT and send it to the client
      // generateToken comes from /lib/jwt's function, is a 'sign'
      const token = generateToken({ userId: user.user_id, username: user.username });

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
