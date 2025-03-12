'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { HeroMinus, HeroPlus } from "../icons";
import { useState } from "react";
import { Recipe } from "@/types";
import { MyPantryIngredientComparator } from "./ingredient_comparator";

interface MyIngredientsTableProps {
  recipe: Recipe;
  headcount: number;
  setHeadcount: React.Dispatch<React.SetStateAction<number>>;
}

interface MyHeadcountCounterProps {
  headcount: number;
  setHeadcount: React.Dispatch<React.SetStateAction<number>>;
}
export const MyHeadcountCounter: React.FC<MyHeadcountCounterProps> = ({ headcount, setHeadcount }) => {
  const increment = () => setHeadcount((prev) => Math.min(15, prev + 1)); // Max headcount = 15
  const decrement = () => setHeadcount((prev) => Math.max(1, prev - 1)); // Min headcount = 1


  return (
    <div className="py-4 flex items-center justify-between w-32 h-10 border rounded-md py-6">
      <button
        className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
        onClick={decrement}
      >
        <HeroMinus />
      </button>
      <div className="flex-1 text-center text-lg font-semibold">
        {headcount}
      </div>
      <button
        className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
        onClick={increment}
      >
        <HeroPlus />
      </button>
    </div>
  );
};
export const MyIngredientsTable: React.FC<MyIngredientsTableProps> = ({ recipe, headcount, setHeadcount }) => {
  const increment = () => setHeadcount((prev) => Math.min(15, prev + 1)); // Max headcount = 15
  const decrement = () => setHeadcount((prev) => Math.max(1, prev - 1)); // Min headcount = 1

  const formatNumber = (num: number): number => {
    return num % 1 === 0 ? num : parseFloat(num.toFixed(2));
  };

  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    ingredient_quantity: formatNumber((ingredient.ingredient_quantity / recipe.recipe_headcount) * headcount),
  }));

  return (
    <div className="max-w-full">
      <div className="py-4 flex items-center justify-center">
        {/* Control the headcount changes */}
        <div className="py-4 flex items-center justify-between w-32 h-10 border rounded-md py-6">
          <button
            className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
            onClick={decrement}
          >
            <HeroMinus />
          </button>
          <div className="flex-1 text-center text-lg font-semibold">{headcount}</div>
          <button
            className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
            onClick={increment}
          >
            <HeroPlus />
          </button>
        </div>
      </div>

      <Table aria-label="Recept hozzávalói">
        <TableHeader>
          <TableColumn>Összetevők</TableColumn>
          <TableColumn>Mennyiség</TableColumn>
          <TableColumn>Spájzom</TableColumn>
        </TableHeader>
        <TableBody items={scaledIngredients}>
          {(ingredient) => (
            <TableRow key={ingredient.ingredient_id}>
              <TableCell>{ingredient.ingredient_name}</TableCell>
              <TableCell>
                {ingredient.ingredient_quantity} {ingredient.measurement_name}
              </TableCell>
              <TableCell>
                <MyPantryIngredientComparator ingredient={ingredient} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};