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

export async function getDishTypes(con: PoolConnection, recipeId: number) {
    const [dishTypesData] = await con.query<RowDataPacket[]>(`
        SELECT dish_type.dishtype_name
        FROM con_recipe_dish_type
        JOIN dish_type ON con_recipe_dish_type.dishtype_id = dish_type.dishtype_id
        WHERE con_recipe_dish_type.recipe_id = ?
    `, [recipeId]);

    return dishTypesData.map(dish => dish.dishtype_name);
}

export async function getCuisines(con: PoolConnection, recipeId: number) {
    const [cuisineData] = await con.query<RowDataPacket[]>(`
        SELECT dish_cuisine.cuisine_name
        FROM con_recipe_cuisine
        JOIN dish_cuisine ON con_recipe_cuisine.cuisine_id = dish_cuisine.cuisine_id
        WHERE con_recipe_cuisine.recipe_id = ?
    `, [recipeId]);

    return cuisineData.map(cuisine => cuisine.cuisine_name);
}

export async function getDietCategories(con: PoolConnection, recipeId: number) {
    const [dietCategoryData] = await con.query<RowDataPacket[]>(`
        SELECT diet_category.category_name
        FROM con_recipe_diet_category
        JOIN diet_category ON con_recipe_diet_category.category_id = diet_category.category_id
        WHERE con_recipe_diet_category.recipe_id = ?
    `, [recipeId]);

    return dietCategoryData.map(category => category.category_name);
}