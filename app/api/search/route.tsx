import { Examples } from '@/config/example';
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ success: false}, { status: 405 });
  }

  try {
    const { ingredients: selectedIngredients,
      dishType: selectedDishType,
      dishCategory: selectedDishCategory,
      searchQuery } = await req.json();

    // If there are no filters, return all recipes (if filters are empty)
    if (!selectedIngredients && !selectedDishType && !selectedDishCategory && !searchQuery) {
      return NextResponse.json(Examples.recipes);
    }


    const searchResults = Examples.recipes.filter((recipe) => {
      // Search by recipe name (case-insensitive)
      const matchesSearchQuery = searchQuery
        ? recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Check if the recipe contains all selected ingredients
      const matchesIngredients = selectedIngredients?.length
        ? selectedIngredients.every((ingredientId: number) => Examples.con_recipe_ingredients.some((relation) => relation.recipe_id === recipe.recipe_id && relation.ingredient_id === ingredientId))
        : true;

      // Check if the recipe belongs to any of the selected categories
      const matchesCategories = selectedDishCategory?.length
        ? selectedDishCategory.some((categoryId: number) => Examples.con_recipe_category.some((relation) => relation.recipe_id === recipe.recipe_id && relation.category_id === categoryId))
        : true;

        // Check if the recipe belongs to any of the selected categories
      const matchesDishType = selectedDishType?.length
      ? selectedDishType.some((categoryId: number) => Examples.con_recipe_dishtype.some((relation) => relation.recipe_id === recipe.recipe_id && relation.dishtype_id === categoryId))
      : true;

      // If all conditions match, include the recipe
      return matchesSearchQuery && matchesIngredients && matchesCategories;
    });
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Hiba a keresés során:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

/*
POSTMAN test JSON BODY:
leave out any, but body can't be empty
{
  "ingredients": [1],
  "dishType": [1],
  "dishCategory": [1],
  "searchQuery": "Szeletelt alma"
}

*/