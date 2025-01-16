import { Examples } from '@/config/example';
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ success: false }, { status: 405 });
  }

  try {
    const { searchParams } = req.nextUrl;

    // searchParams returns string arrays but i convert them to numbers
    const searchQuery = searchParams.get('searchQuery') || null;
    const selectedIngredients: number[] = searchParams.getAll('ingredients').map((value) => Number(value)) || null;
    const selectedDishType: number[] = searchParams.getAll('dishType').map((value) => Number(value)) || null;
    const selectedDishCategory: number[] = searchParams.getAll('dishCategory').map((value) => Number(value)) || null;

    // Gives back only one recipe that matches the id
    const id = searchParams.get('id') || null;


    if (id) {
      const recipeId = Number(id);
      const recipe = Examples.recipes.find((r) => r.recipe_id === recipeId);

      if (!recipe) {
        return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
      }

      // Attach related ingredients to the recipe
      const ingredientIds = Examples.con_recipe_ingredients
        .filter((relation) => relation.recipe_id === recipe.recipe_id)
        .map((relation) => relation.ingredient_id);

      const recipeIngredients = Examples.ingredients.filter((ingredient) =>
        ingredientIds.includes(ingredient.ingredient_id)
      );

      const fullRecipe = {
        ...recipe,
        ingredients: recipeIngredients.map((ingredient) => ({
          id: ingredient.ingredient_id,
          name: ingredient.ingredient_name,
        })),
      };

      return NextResponse.json(fullRecipe);
    }

    // If there are no filters, return all recipes (if filters are empty)
    if (!selectedIngredients && !selectedDishType && !selectedDishCategory && !searchQuery) {
      return NextResponse.json(Examples.recipes);
    }

    // Gives back multiple results based on filters
    const searchResults = Examples.recipes.filter((recipe) => {

      // Recipe name
      const matchesSearchQuery = searchQuery
        ? recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Every selected ingredient
      const matchesIngredients = selectedIngredients?.length
        ? selectedIngredients.every((ingredientId: number) =>
          Examples.con_recipe_ingredients.some((relation) =>
            relation.recipe_id === recipe.recipe_id &&
            relation.ingredient_id === ingredientId))
        : true;
      // Any of the selected categories
      const matchesCategories = selectedDishCategory?.length
        ? selectedDishCategory.some((categoryId: number) =>
          Examples.con_recipe_category.some((relation) =>
            relation.recipe_id === recipe.recipe_id &&
            relation.category_id === categoryId))
        : true;

      // Any of the selected categories
      const matchesDishType = selectedDishType?.length
        ? selectedDishType.some((categoryId: number) =>
          Examples.con_recipe_dishtype.some((relation) =>
            relation.recipe_id === recipe.recipe_id &&
            relation.dishtype_id === categoryId))
        : true;


      // If all conditions match, include the recipe
      return matchesSearchQuery && matchesIngredients && matchesCategories && matchesDishType;
    }).map((recipe) => {
      // Attach related ingredients to each recipe
      const ingredientIds = Examples.con_recipe_ingredients
        .filter((relation) => relation.recipe_id === recipe.recipe_id)
        .map((relation) => relation.ingredient_id);

      const recipeIngredients = Examples.ingredients.filter((ingredient) =>
        ingredientIds.includes(ingredient.ingredient_id)
      );
      return {
        ...recipe,
        ingredients: recipeIngredients.map((ingredient) => ({
          id: ingredient.ingredient_id,
          name: ingredient.ingredient_name,
        })),
      };
    });
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Hiba a keresés során:', error);
    return NextResponse.json({ success: false, message: 'Szerver oldali hiba' }, { status: 500 });
  }
}