import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';
export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if ((existingUser as any[]).length > 0) {
      return NextResponse.json({ success: false, message: 'Username taken' }, { status: 400 });
    }
    /*
      // Hash the password using Argon2
        const hashPassword = async (password: string) => {
          try {
            // Hash the password using Argon2 (this automatically salts the password)
            const hashedPassword = await argon2.hash(password);
            console.log(hashedPassword);
            return hashedPassword;
          } catch (err) {
            console.error("Error hashing password:", err);
            throw new Error("Password hashing failed");
          }
        };
    */
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2i, // Argon2i - provides resistance to side-channel attacks
      memoryCost: 2 ** 16, // Memory cost: how much memory to use for hashing (higher is more secure)
      timeCost: 4, // Time cost: number of iterations (higher is more secure)
      parallelism: 1, // Parallelism: how many threads to use (higher increases security)
    });
    // Insert new user into the database
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    if ((result as any).affectedRows) {
      return NextResponse.json({ success: true, message: 'Registration successful' });
    } else {
      return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Registration failed:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
