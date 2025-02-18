import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { Recipe, Ingredient } from '@/types';

interface MyListItemProps {
  recipe: Recipe;
}

export const MyListItem: React.FC<MyListItemProps> = ({ recipe }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className='py-4'>
      <Card className="max-w-xl overflow-visible">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <Link
              href={`/recipe/?id=${recipe.recipe_id}`}
              className="text-md font-semibold"
            >
              {recipe.recipe_name}
            </Link>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div>
            <p className="text-sm font-semibold">Hozzávalók:</p>
            <ul className="flex space-x-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient.id} className="text-sm text-default-500">
                  {ingredient.name}
                  {index < recipe.ingredients.length - 1 && ','}
                </li>
              ))}
            </ul>
            <Divider className="my-3" />
            <p className="text-sm">
              {showFullDescription
                ? recipe.recipe_description
                : `${recipe.recipe_description.slice(0, 100)}...`}
              {recipe.recipe_description.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary text-sm ml-1 underline"
                >
                  {showFullDescription ? 'Mutass kevesebbet' : 'Mutass többet'}
                </button>
              )}
            </p>
            <p className="text-sm">Recept elkészítési ideje: {recipe.recipe_time}</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            href={`/recipe/?id=${recipe.recipe_id}`}
          >
            Tovább a teljes receptre
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
