import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_quantity: number;
  ingredient_measurement: string;
}


export interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_time: number;
  recipe_headcount: number;
  source_user_id: number | null;
  ingredients: Ingredient[];
}


export interface User {
  userId: number;
  username: string;
  userDescription: string | null;
  email: string;
}

export interface ActivityUser extends User {
  inactive: number;
}

export interface ShoppingIngredient extends Ingredient{
  bought: boolean;
}

export interface Shopping {
  shopping_id: number;
  shopping_name: string;
  recipe_id: number | null;
  recipe_name: string | null;
  ingredients: ShoppingIngredient[]
}