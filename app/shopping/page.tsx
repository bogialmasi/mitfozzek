'use client'
import { title } from "@/components/primitives";
import { MyShoppingList } from "@/components/shopping/card_shoppinglist";
import { Shopping, ShoppingIngredient } from "@/types";
import { button as buttonStyles } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import { HeroSearch } from "@/components/icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function ShoppingPage() {
  const [shopping, setShopping] = useState<Shopping[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchShopping = async () => {
    try {
      console.log(document.cookie);
      setLoading(true)
      const response = await fetch('/api/shopping', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Hiba történt a beváráslólisták betöltésekor');
      }
      const data = await response.json();
      if (data) {
        const formattedShopping = data.map((shopping: Shopping) => ({
          ...shopping,
          ingredients: (shopping.ingredients as ShoppingIngredient[])?.map((ingredient: ShoppingIngredient) => ({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
            ingredient_quantity: ingredient.ingredient_quantity,
            ingredient_measurement: ingredient.ingredient_measurement,
            bought: ingredient.bought
          })) || []
        }));
        setShopping(formattedShopping);
      } else {
        setError('Nincs találat');
      }
    } catch (error) {
      setError('Hiba történt a receptek betöltésekor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/authcheck', {
          method: 'GET',
          credentials: 'include', 
        });
        const data = await res.json();
        if (!data.success) {
          setError('Bejelentkezés szükséges');
          setLoading(false);
          return;
        }

        fetchShopping();
      } catch (err) {
        setError('Bejelentkezés szükséges');
        setLoading(false);
      }
    };
    checkLogin();
  }, []);



  const handleDelete = async (shoppingId: number) => {
    setShopping((prevLists) => {
      if (!prevLists) return [];
      const newLists = prevLists.filter((shopping) => shopping.shopping_id !== shoppingId);
      return newLists;
    });
    await fetchShopping();
  };

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  return (
    <div>
      <h1 className={title()}>Bevásárlólistáim</h1>
      <div>
        {shopping && shopping.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 py-10 px-8 lg:px-32">
            {shopping.map((list, index) => (
              <li key={index}>
                <MyShoppingList shoppingList={list} onDelete={handleDelete} />
              </li>
            ))}
          </ul>

        ) : (
          <div className="py-4">
            <p>Nincsenek bevásárlólisták</p>
            <div className="flex flex-col justify-center items-center gap-4 py-6">
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.links.search}
              >
                Receptek keresése <HeroSearch />
              </Link>
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.links.profile}
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
