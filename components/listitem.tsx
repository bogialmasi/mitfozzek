import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

interface Ingredient {
  id: number;
  name: string;
}

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_time: string;
  recipe_headcount: number;
  source_user_id: number;
  ingredients: Ingredient[]; // array of ingredients
}

interface MyListItemProps {
  recipe: Recipe;
}

export const MyListItem: React.FC<MyListItemProps> = ({ recipe }) => {

  return (
    <div className='py-4'>
    <Card className="max-w-xl overflow-visible">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
        <Link
          isExternal
          href={`/recipe/${recipe.recipe_id}`}
          className="text-md font-semibold"
        >
          {recipe.recipe_name}
        </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          {/* Ingredients List */}
          <p className="text-sm font-semibold">Hozzávalók:</p>
          <ul className="flex space-x-4">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="text-sm text-default-500">
                {ingredient.name}
              </li>
            ))}
          </ul>
          <Divider className="my-3" />
          {/* Description */}
          <p className="text-sm">
            {recipe.recipe_description.length > 100
              ? `${recipe.recipe_description.slice(0, 100)}...`
              : recipe.recipe_description}
            {recipe.recipe_description.length > 100 && (
              <Link href={`/recipe/${recipe.recipe_id}`} className="text-primary text-sm">
                Mutass többet...
              </Link>
            )}
          </p>
          <p className="text-sm">Recept elkészítési ideje: {recipe.recipe_time}</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          href={`/recipe/${recipe.recipe_id}`}
        >
          Tovább a teljes receptre
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
};
