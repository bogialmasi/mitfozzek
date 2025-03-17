'use client'
import { title } from "@/components/primitives";
import { MyFavRecipe } from "@/components/profile/card_favrecipe";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import { Ingredient, Recipe } from "@/types";
import { button as buttonStyles } from "@heroui/theme";
import { HeroSearch } from "@/components/icons";
import Link from "next/link";

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // get data from /api/favrecipes
  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/favrecipes', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Hiba történt a receptek betöltésekor');
      }
      const data = await response.json();
      if (data) {
        // format response to fit into MyFavRecipe
        const formattedRecipe = data.map((recipe: Recipe) => ({
          ...recipe,
          ingredients: (recipe.ingredients as Ingredient[])?.map((ingredient: Ingredient) => ({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
          })) || []
        }));
        setFavorites(formattedRecipe);
      } else {
        setError('Nincs találat');
      }
    } catch (error) {
      setError('Hiba történt a receptek betöltésekor');
    } finally {
      setLoading(false);
    }
  };

  // Remove the deleted recipe from the list
  const handleDelete = async (recipeId: number) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites) return []; // Ensure the return of an empty array if prevFavorites is null
      const newFavorites = prevFavorites.filter((recipe) => recipe.recipe_id !== recipeId);
      return newFavorites;
    });
    await fetchFavorites();
  };

  // Fetch the favorite recipes data whenever the list changes
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/authcheck', {
          method: 'GET',
          credentials: 'include', // Use cookies
        });
        const data = await res.json();
        if (!data.success) {
          setError('Bejelentkezés szükséges');
          setLoading(false);
          return;
        }

        fetchFavorites();
      } catch (err) {
        setError('Bejelentkezés szükséges');
        setLoading(false);
      }
    };
    checkLogin();
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
          <div className="py-4">
            <p>A kedvenc receptek listája üres</p>
            <div className="flex flex-col gap-4 py-4">
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={`/search`}
              >
                Keresés a receptek között <HeroSearch />
              </Link>
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={`/profile`}
              >
                Vissza a profilomra
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
