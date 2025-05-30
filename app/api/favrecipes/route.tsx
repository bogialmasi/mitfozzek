'use server'
import pool from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; 

    if (userId === null || userId === undefined) {
        return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
    }

    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const [user_fav_recipes] = await con.query<RowDataPacket[]>(
            'SELECT * FROM user_fav_recipes WHERE user_id = ?',
            [userId]
        );

        const fullRecipePromises = user_fav_recipes.map(async (fav) => {
            const [recipes] = await con.query<RowDataPacket[]>(
                'SELECT * FROM recipes WHERE recipe_id = ?',
                [fav.recipe_id]
            );
            const recipe = recipes[0]; 

            const [con_recipe_ingredients] = await con.query<RowDataPacket[]>(
                'SELECT * FROM con_recipe_ingredients WHERE recipe_id = ?',
                [recipe.recipe_id]
            );

            const ingredients = await Promise.all(
                con_recipe_ingredients.map(async (c) => {
                    const [ingredient] = await con.query<RowDataPacket[]>(
                        'SELECT * FROM ingredients WHERE ingredient_id = ?',
                        [c.ingredient_id]
                    );
                    return ingredient[0] as RowDataPacket; 
                })
            );

            return {
                ...recipe,
                ingredients,
            };
        });

        const fullRecipes = await Promise.all(fullRecipePromises);
        return NextResponse.json(fullRecipes);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
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

export async function POST(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });

        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; 

        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { recipeId } = await req.json();
        if (!recipeId) {
            return NextResponse.json({ success: false, message: 'No recipeId' }, { status: 401 });
        }

        const duplicate = await con.query<RowDataPacket[]>(
            'SELECT recipe_id from user_fav_recipes WHERE user_id = ? and recipe_id = ?',
            [userId, recipeId],
        )

        if (duplicate[0].length > 0) {
            return NextResponse.json({ success: false, message: 'Item already in favorites' }, { status: 400 });
        }
        await con.beginTransaction();
        const result = await con.query<ResultSetHeader[]>(
            'INSERT INTO user_fav_recipes (user_id, recipe_id) VALUES (?, ?)',
            [userId, recipeId]
        );
        await con.commit();
        return NextResponse.json({ message: 'Item added to favorites', recipeId: recipeId, result }, { status: 200 });
    } catch (error) {
        if (con) {
            con.rollback();
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error adding favorite item:', error);
        return NextResponse.json({ message: 'Adding to favorites failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}

export async function DELETE(req: NextRequest) {
    let con: PoolConnection | undefined;
    con = await pool.getConnection();
    if (!con) {
        return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Authorization token missing (Possibly expired)' }, { status: 404 });

        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; 

        if (userId === null || userId === undefined) {
            return NextResponse.json({ success: false, message: 'No userId' }, { status: 401 });
        }

        const { searchParams } = req.nextUrl;
        const id = searchParams.get('recipeId') || null;
        if (!id) {
            return NextResponse.json({ success: false, message: 'No recipeId provided' }, { status: 400 });
        }
        const recipeId = Number(id);
        if (isNaN(recipeId)) {
            return NextResponse.json({ success: false, message: 'Invalid recipeId' }, { status: 400 });
        }

        await con.beginTransaction();

        const [result] = await con.query<RowDataPacket[]>(
            'DELETE FROM user_fav_recipes WHERE user_id = ? AND recipe_id = ?',
            [userId, recipeId]
        );
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: 'Recipe not found in favorites' }, { status: 404 });
        }
        await con.commit();
        return NextResponse.json({ message: 'Recipe removed from favorites', recipeId }, { status: 200 });

    } catch (error) {
        if (con) {
            con.rollback();
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        console.error('Error deleting favorite item:', error);
        return NextResponse.json({ message: 'Deleting from favorites failed' }, { status: 500 });
    }
    finally {
        if (con) {
            con.release();
        }
    }
}