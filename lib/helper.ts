import { NextRequest } from "next/server";
import * as jwt from 'jsonwebtoken';
import { RowDataPacket } from "mysql2";
import { PoolConnection } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserId = async (req: NextRequest): Promise<number | null> => {
    try {
        const token = req.cookies.get('token')?.value; // Get token from cookies
        if (token === null || token === undefined) {
            return null;
        }
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded.userId || null;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export async function isAdmin(req: NextRequest): Promise<boolean> {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return false;
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded.isAdmin === true;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}


export async function getIngredients(con: PoolConnection, recipeId: number) {
    const [ingredientsData] = await con.query<RowDataPacket[]>(`
          SELECT ingredients.*,
                 con_recipe_ingredients.ingredient_quantity
          FROM ingredients
          JOIN con_recipe_ingredients ON con_recipe_ingredients.ingredient_id = ingredients.ingredient_id
          WHERE con_recipe_ingredients.recipe_id = ?
      `, [recipeId]);

    return ingredientsData.map(ingredient => ({
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        ingredient_quantity: ingredient.ingredient_quantity,
        ingredient_measurement: ingredient.ingredient_measurement
    }));
}

export const validatePassword = (password: string) => {
    const minlength = 8;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const numbers = /\d/.test(password);
    if (password.length < minlength) {
        return `A jelszónak legalább ${minlength} karakter hosszúnak kell lennie.`;
    }
    if (!upperCase || !lowerCase || !numbers) {
        return 'A jelszónak tartalmaznia kell legalább egy nagybetűt, legalább egy kisbetűt és legalább egy számot';
    }
    return ''; // No error
};