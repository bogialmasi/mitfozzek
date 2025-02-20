'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { HeroMinus, HeroPlus } from "../icons";
import { useEffect, useState } from "react";
import { PantryItem, Recipe } from "@/types";
import { MyPantryIngredientComparator } from "./ingredient_comparator";

interface MyIngredientsTableProps {
  recipe: Recipe;
}

export const MyHeadcountCounter: React.FC = () => {
  const [headcount, setHeadcount] = useState(1);
  const increment = () => setHeadcount((prev) => Math.min(15, prev + 1)); // Max headcount = 15
  const decrement = () => setHeadcount((prev) => Math.max(1, prev - 1)); // Min headcount = 1


  return (
    <div className="py-4 flex items-center justify-between w-32 h-10 border rounded-md py-6">
      <button
        onClick={decrement}
        className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
      >
        <HeroMinus />
      </button>
      <div className="flex-1 text-center text-lg font-semibold">
        {headcount}
      </div>
      <button
        onClick={increment}
        className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
      >
        <HeroPlus />
      </button>
    </div>
  );
};

export const MyIngredientsTable: React.FC<MyIngredientsTableProps> = ({ recipe }) => {


  return (
    <div className="max-w-full">
      <div className="py-4 flex items-center justify-center">
        <MyHeadcountCounter />
      </div>
      <Table aria-label="Recept hozzávalói">
        <TableHeader>
          <TableColumn>Összetevők</TableColumn>
          <TableColumn>Mennyiség</TableColumn>
          <TableColumn>Spájzom</TableColumn>
        </TableHeader>
        <TableBody items={recipe.ingredients}>
          {(ingredient) => (
            <TableRow key={ingredient.ingredient_id}>
              <TableCell>{ingredient.ingredient_name}</TableCell>
              <TableCell>{ingredient.ingredient_quantity} {ingredient.measurement_name}</TableCell>
              <TableCell>
                <MyPantryIngredientComparator ingredient={ingredient} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}