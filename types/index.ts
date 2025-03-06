import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_quantity: number;
  measurement_id: number;
  measurement_name: string;
}

export interface Measurement {
  measurement_id: number;
  measurement_name: string;
}


export interface PantryItem {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_quantity: number;
  measurement_id: number;
  measurement_name: string;
}

export interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_time: string;
  recipe_headcount: number;
  source_user_id: number;
  ingredients: Ingredient[];
}


export interface User {
  userId: number;
  username: string;
  userDescription: string | null;
  email: string;
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