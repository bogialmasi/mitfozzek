'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { subtitle, title } from '@/components/primitives';
import { Link } from '@nextui-org/link';
import { button as buttonStyles } from "@nextui-org/theme";
import { HeartFilledIcon, SearchIcon } from '@/components/icons';
import { MyHeadcountCounter } from '@/components/recipe/recipe_headcount';
import { MyIngredientsTable } from '@/components/recipe/ingredients_table';

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


  return (<div className="h-screen">
    <div className="justify-end gap-4 mx-6 my:mx-4 py-4">
      <h1 className={title()}>{resultRecipe.recipe_name}</h1>
    </div>
    <section className="grid grid-cols-12 h-[calc(100%-4rem)] gap-4 px-4">
      {/* Left Side: 40% */}
      <div className="col-span-12 md:col-span-5 flex flex-col gap-4 py-6">
        <div className={subtitle({ class: "mt-2" })}>
          <h3>Hány főre?:</h3>
          <div className="flex justify-center">
            <MyHeadcountCounter />
          </div>
        </div>
        <div className={subtitle({ class: "mt-2" })}>
          <h3>Hozzávalók:</h3>
          <MyIngredientsTable recipe={resultRecipe} />
        </div>
      </div>

      {/* Right Side: 60% */}
      <div className="col-span-12 md:col-span-7 flex flex-col gap-2 py-12">
        <div className="flex gap-2 justify-center">
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={`/`}
          >
            Recept elmentése a kedvencek közé <HeartFilledIcon />
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={`/`}
          >
            Bevásárlólista készítése
          </Link>
        </div>
        <div className="justify-center py-8">
          <p className={subtitle({ class: "mt-2" })}>{resultRecipe.recipe_description}</p>
        </div>
        <div className="justify-center py-8">
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={`/search`}
          >
            Új recept keresése <SearchIcon />
          </Link>
        </div>
      </div>
    </section>
  </div>
  )
};