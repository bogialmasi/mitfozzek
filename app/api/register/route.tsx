import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
export async function POST(req: NextRequest) {
  let con: PoolConnection | undefined;
  con = await pool.getConnection();
  if (!con) {
    return NextResponse.json({ error: 'No database connection' }, { status: 500 });
  }
  try {
 
    const { username, password, email } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const [existingUser] = await con.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if ((existingUser as any[]).length > 0) {
      return NextResponse.json({ success: false, message: 'Username taken' }, { status: 400 });
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2i, // Argon2i - provides resistance to side-channel attacks
      memoryCost: 2 ** 16, // Memory cost: how much memory to use for hashing (higher is more secure)
      timeCost: 4, // Time cost: number of iterations (higher is more secure)
      parallelism: 1, // Parallelism: how many threads to use (higher increases security)
    });
    // Insert new user into the database
    
    await con.beginTransaction();
    const [result] = await con.query<ResultSetHeader>(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    const resultId = result.insertId
    if (result.insertId != null) {
      const [resultPantry] = await con.query<ResultSetHeader>(
        'INSERT INTO con_user_pantry (user_id, pantry_id) VALUES (?, ?)',
        [resultId, resultId] // Both user_id and pantry_id match
      )
    }

    await con.commit();
    if ((result as any).affectedRows) {
      return NextResponse.json({ success: true, message: 'Registration successful' });
    } else {
      return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
    }
  } catch (error) {
    if (con) {
      await con.rollback();
    }
    console.error('Registration failed:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
  finally {
    if (con) {
      con.release();
    }
  }
}
