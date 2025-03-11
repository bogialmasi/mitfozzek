import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserId = (req: NextRequest): number | null => {
  try {
    const token = req.cookies.get('token')?.value; // Get token from cookies
    if (!token) {
      return null;
    }
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type'); // the value of the type parameter from the URL
  if (!type) {
    return NextResponse.json({ error: 'Hiányzó type paraméter' }, { status: 400 });
  }
  // SQL query based on the type parameter
  let query = '';
  let params: any[] = [];
  switch (type) {
    case 'ingredients':
      query = 'SELECT ingredient_id AS "key", ingredient_name AS "value" FROM ingredients;';
      break;
    case 'dish_type':
      query = 'SELECT dishtype_id AS "key", dishtype_name AS "value" FROM dish_type;';
      break;
    case 'dish_category':
      query = 'SELECT category_id AS "key", category_name AS "value" FROM dish_category;';
      break;
    case 'dish_cuisine':
      query = 'SELECT cuisine_id AS "key", cuisine_name AS "value" FROM dish_cuisine;';
      break;
    case 'measurement':
      query = 'SELECT measurement_id AS "key", measurement_name AS "value" FROM measurements;';
      break;
    case 'user_pantry':
      const userId = getUserId(req);
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      query = `SELECT ingredients.ingredient_id AS "key", ingredients.ingredient_name AS "value"
             FROM ingredients 
             JOIN pantry ON ingredients.ingredient_id = pantry.ingredient_id 
             WHERE pantry.pantry_id = ?`;
      params = [userId];
      break;
    default:
      return NextResponse.json(
        { error: 'Érvénytelen paraméter' },
        { status: 400 }
      );
  }

  let con: PoolConnection | undefined;
  con = await pool.getConnection();
  if (!con) {
    return NextResponse.json({ error: 'No database connection' }, { status: 500 });
  }
  try {
    const [result] = await con.query<RowDataPacket[]>(query, params);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  } finally {
    if (con) {
      con.release();
    }
  }
}