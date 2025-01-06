import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { username, password, email, birthdate } = await req.json();

    console.log("Front end-től kapott adatok: ", {username: username, password: password, email: email})

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if ((existingUser as any[]).length > 0) {
      return NextResponse.json({ success: false, message: 'Felhasználónév foglalt' }, { status: 400 });
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Insert new user into the database
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    if ((result as any).affectedRows) {
      return NextResponse.json({ success: true, message: 'Sikeres regisztráció' });
    } else {
      return NextResponse.json({ success: false, message: 'Sikertelen regisztráció' }, { status: 500 });
    }
  } catch (error) {
    console.error('Hiba a regisztráció során:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
