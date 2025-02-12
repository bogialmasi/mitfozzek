import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Ingredient {
  id: number;
  name: string;
}

export interface Measurement {
  id: number;
  name: string;
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