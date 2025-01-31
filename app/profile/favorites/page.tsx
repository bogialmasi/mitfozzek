'use client'
import { title, subtitle } from "@/components/primitives";
import { MyFavRecipe } from "@/components/profile/card_favrecipe";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import { Ingredient, Recipe } from "@/types";

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // get data from /api/favrecipes
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token missing. Please login again.');
        setLoading(false);
        return;
      }
      const response = await fetch('/api/favrecipes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Hiba történt a receptek betöltésekor1');
      }
      const data = await response.json();
      if (data && Array.isArray(data)) {
        // format response to fit into MyFavRecipe
        const formattedRecipe = data.map((recipe: any) => ({
          ...recipe,
          ingredients: (recipe.ingredients as any[])?.map((ingredient: any) => ({
            id: ingredient.ingredient_id,
            name: ingredient.ingredient_name
          })) || []
        }));
        setFavorites(formattedRecipe);
      } else {
        setError('Nincs találat');
      }
    } catch (error) {
      setError('Hiba történt a receptek betöltésekor2');
    } finally {
      setLoading(false);
    }
  };

  // Remove the deleted recipe from the list
  const handleDelete = (recipeId: number) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites) return []; // Ensure the return of an empty array if prevFavorites is null
      const newFavorites = prevFavorites.filter((recipe) => recipe.recipe_id !== recipeId);
      console.log("DELETED. After delete:", newFavorites);
      return newFavorites;
    });
  };

  // Fetch the favorite recipes data
  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  return (
    <div>
      <h1 className={title()}>Kedvenc receptjeim</h1>
      <div>
        {favorites && favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite) => (
              <MyFavRecipe key={favorite.recipe_id} recipe={favorite} onDelete={handleDelete} />
            ))}
          </ul>
        ) : (
          <p>A kedvenc receptek listája üres</p>
        )}
      </div>
    </div>
  );
}
