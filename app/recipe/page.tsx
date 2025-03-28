'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { subtitle, title } from '@/components/primitives';
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { HeroSearch } from '@/components/icons';
import { MyIngredientsTable } from '@/components/recipe/table_ingredients';
import { Spinner, useDisclosure } from '@heroui/react';
import { MySuccessAlert } from '@/components/alert/alert_success';
import { MyLoginModal } from '@/components/login_check/modal_login';
import { Recipe } from '@/types';
import { MyDangerAlert } from '@/components/alert/alert_danger';
import { MyAddToFavoritesButton } from '@/components/recipe/button_addtofavorites';
import { MyAddToShoppingButton } from '@/components/recipe/button_addtoshoppinglist';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [resultRecipe, setResultRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control

  const [headcount, setHeadcount] = useState(1);
  const [username, setUsername] = useState<string | null>(null);

  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

  const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
  const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');

      const id = searchParams.get('id');
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
        setResultRecipe(data);
        setHeadcount(data.recipe_headcount);
        setUsername(data.username);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);
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
        <div className="col-span-12 md:col-span-5 flex flex-col items-center gap-4 py-6 ">
          <div className={subtitle({ class: "mt-2" })}>
            <MyIngredientsTable recipe={resultRecipe} headcount={headcount} setHeadcount={setHeadcount} />
          </div>
        </div>

        {/* Right Side: 60% */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-2 py-12">
          <div className="flex gap-2 justify-center">

            <MyAddToFavoritesButton recipeId={resultRecipe.recipe_id} />
            <MyAddToShoppingButton recipe={resultRecipe} headcount={headcount} />
            {successAlertVisible && (
              <MySuccessAlert
                title={successAlertContent.title}
                description={successAlertContent.description}
              />
            )}
            {dangerAlertVisible && (
              <MyDangerAlert
                title={dangerAlertContent.title}
                description={dangerAlertContent.description}
              />
            )}
          </div>
          <div className="justify-center py-8">
            <p className='text-md'>Elkészítési idő: {resultRecipe.recipe_time} perc</p>
            <p className={subtitle({ class: "mt-2" })}>{resultRecipe.recipe_description}</p>
            {username &&
              <p>
                Feltöltötte: <Link href={`user/${resultRecipe.source_user_id}`}>{username}</Link>
              </p>}
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