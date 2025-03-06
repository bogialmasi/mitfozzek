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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchShopping = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token missing. Please login again.');
        setLoading(false);
        return;
      }
      const response = await fetch('/api/shopping', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Hiba történt a beváráslólisták betöltésekor');
      }
      const data = await response.json();
      if (data) {
        // format response to fit into MyShoppingList
        const formattedShopping = data.map((shopping: Shopping) => ({
          ...shopping,
          ingredients: (shopping.ingredients as ShoppingIngredient[])?.map((ingredient: ShoppingIngredient) => ({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
            ingredient_quantity: ingredient.ingredient_quantity,
            measurement_name: ingredient.measurement_name,
            measurement_id: ingredient.measurement_id,
            bought: ingredient.bought,
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
    fetchShopping();
  }, []);

  useEffect(() => {
    console.log("shopping lists: ", shopping);
  }, [shopping])

  // Remove the deleted shoppinglist
  const handleDelete = async (shoppingId: number) => {
    setShopping((prevLists) => {
      if (!prevLists) return []; // Ensure the return of an empty array if prevLists is null
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
          <ul className="flex flex-row justify-center items-center gap-4 py-6">
            {shopping.map((list, index) => (
              <li key={index} className="flex-shrink-0">
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
