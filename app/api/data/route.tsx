import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type'); // the value of the type parameter from the URL

  if (!type) {
    return NextResponse.json(
      { error: 'Missing the paraméter' },
      { status: 400 }
    );
  }

  // SQL query based on the type parameter
  let query = '';
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
      case 'measurement':
      query = 'SELECT measurement_id AS "key", measurement_name AS "value" FROM measurements;';
      break;
    default:
      return NextResponse.json(
        { error: 'Érvénytelen paraméter' },
        { status: 400 }
      );
    }

  try{
    const [result] = await pool.query<RowDataPacket[]>(query);
    return NextResponse.json(result); // fetched data is returned
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }
}