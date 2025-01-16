'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { title } from '@/components/primitives';

// Recipe interface
interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_time: string;
  recipe_headcount: number;
  source_user_id: number;
  ingredients: Ingredient[];
}

interface Ingredient {
  id: number;
  name: string;
}

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [resultRecipe, setResultRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      const id = searchParams.get('id');
      console.log('Query Parameter ID:', id);

      if (!id) {
        setError('No ID provided in the query parameters');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/search?id=${id}`); // Fetch using the query parameter
        if (!response.ok) {
          throw new Error('Recept lekérése sikertelen');
        }
        const data = await response.json();
        console.log('Recept:', data);
        setResultRecipe(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) return <p>Recept betöltése...</p>;
  if (error) return <p>Hiba: {error}</p>;
  if (!resultRecipe) {
    return <p>No recipe matches the search criteria :(</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xl text-center justify-center overflow-visible">
        <h1 className={title()}>{resultRecipe.recipe_name}</h1>
        <p>{resultRecipe.recipe_description}</p>
        <p>Idő: {resultRecipe.recipe_time || 'Nincs időtartam'}</p>
      </div>
    </section>
  );
}