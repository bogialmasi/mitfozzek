'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { subtitle, title } from '@/components/primitives';
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { HeartFilledIcon, HeroEmptyHeart, HeroSearch, HeroShoppingCart, SearchIcon } from '@/components/icons';
import { MyHeadcountCounter } from '@/components/recipe/recipe_headcount';
import { MyIngredientsTable } from '@/components/recipe/ingredients_table';
import { Button, useDisclosure } from '@heroui/react';
import { useAuthentication } from '../context/authenticationContext';
import { MySavedAlert } from '@/components/recipe/alert_recipesaved';
import { PressEvent } from '@react-types/shared';
import { MyLoginModal } from '@/components/login_check/modal_login';

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
  const { user } = useAuthentication();
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", description: "", color: "success" }); // default is success, fail is danger color

  const router = useRouter();
  const query = router;

  /* TODO handle exception if saving fails, show red alert! */
  const handlePress = (e: PressEvent) => {
    const buttonId = e.target.id;
    if (!user) {
      onOpen(); // Trigger modal if the user is not logged in
    } else {
      // Update alert content based on button id
      if (buttonId === "shopping") {
        setAlertContent({
          title: "Hozzáadva",
          description: "A recept összetevői bekerültek a bevásárlólistába",
          color: "success",
        });
      }
      /* exception handling needed! */
      setAlertVisible(true); // Show the alert
    }
  };

  const userId = user?.userId;
  const recipeId = resultRecipe?.recipe_id

  const handleFavorites = async () => {
    if (!userId) {
      console.error('Hiányzó userId');
      return;
    }
    if (!recipeId) {
      console.error('Hiányzó recipeId');
      return;
    }
    try {
      const response = await fetch('/api/favrecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // sending userId in headers
        },
        body: JSON.stringify({
          userId,
          recipeId,
        }),
      });
      const result = await response.json();
      console.log('Response:', result);
      if (response.ok) {
        // Success
        setAlertContent({
          title: "Sikeres mentés",
          description: "Recept elmentve a kedvencek közé",
          color: "success",
        });
      } else {
        // Something went wrong
        setAlertContent({
          title: "Sikertelen mentés",
          description: "A recept mentése sikertelen. Próbálja újra",
          color: "danger",
        });
      }
      setAlertVisible(true); // Show the alert
    } catch (error) {
      console.error('Favorites mentés hiba:', error);
      setAlertContent({
        title: "Sikertelen mentés",
        description: "A recept mentése sikertelen. Próbálja újra",
        color: "danger",
      });
      setAlertVisible(true); // Show the alert
    }
  }


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
    return (
      <div>
        <p>Ez a recept nem létezik.</p>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={`/search`}
        >
          Új recept keresése <HeroSearch />
        </Link>
      </div>
    )
  }


  return (
    <div className="h-screen">
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

            <Button
              id='favorites'
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={`/`}
              onPress={handleFavorites}
            >
              <HeroEmptyHeart />Recept elmentése a kedvencek közé
              {/* If succesful save -> HeroFilledHeart*/}
            </Button>

            <Button
              id='shopping'
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={`/`}
              onPress={handlePress}
            >
              <HeroShoppingCart />Bevásárlólista készítése
            </Button>
            {alertVisible && (
              <MySavedAlert
                title={alertContent.title}
                description={alertContent.description}
                color="success"
              />
            )}
          </div>
          <div className="justify-center py-8">
            <p className={subtitle({ class: "mt-2" })}>{resultRecipe.recipe_description}</p>
          </div>
          <div className="justify-center py-8">
            <Link
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={`/search`}
            >
              Új recept keresése <HeroSearch />
            </Link>
            <MyLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
        </div>
      </section>
    </div>
  )
};