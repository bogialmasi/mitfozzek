'use client'
import { title, subtitle } from "@/components/primitives";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";


interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
}

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_time: string;
  recipe_headcount: number;
  source_user_id: number;
  ingredients: Ingredient[];
}

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the favorite recipes data
  useEffect(() => {
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
          setFavorites(data);
        } else {
          setError('Nincs találat');
        }
      } catch (error) {
        setError('Hiba történt a receptek betöltésekor2');
      } finally {
        setLoading(false);
      }
    };

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
      <div className={subtitle({ class: "mt-4" })}>
        Kedvenc receptek kilistázása, lista módosítása
      </div>
      <div>
        {favorites && favorites.length > 0 ? (
          <ul>
            {favorites.map((recipe) => (
              <li key={recipe.recipe_id}>
                <h2>{recipe.recipe_name}</h2>
                <p>{recipe.recipe_description}</p>
                <p><strong>Cooking Time:</strong> {recipe.recipe_time}</p>
                <p><strong>Serving Size:</strong> {recipe.recipe_headcount}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.ingredient_id}>
                      {ingredient.ingredient_name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>A kedvenc receptek listája üres</p>
        )}
      </div>
    </div>
  );
}
