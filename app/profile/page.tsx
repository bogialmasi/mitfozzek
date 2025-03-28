'use client'
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { MyPantryTable } from "@/components/pantry/table_pantry";
import { HeroFilledHeart, HeroPlus, HeroSettings, HeroShoppingCart, HeroUser } from "@/components/icons";
import { Spinner } from "@heroui/spinner";
import { Ingredient, User } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pantryItems, setPantryItems] = useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([])


  const fetchProfile = async () => {
    setLoading(true);
    try {
      const [profileRes, pantryRes, ingredientsRes] = await Promise.all([
        fetch('/api/profile', { method: 'GET', credentials: 'include' }),
        fetch('/api/pantry', { method: 'GET', credentials: 'include' }),
        fetch('/api/data?type=pantry_ingredients', { method: 'GET' })
      ]);

      if (!profileRes.ok || !pantryRes.ok || !ingredientsRes.ok) {
        setError('Az adatok betöltése sikertelen');
        return;
      }

      const profileData = await profileRes.json();
      const pantryData = await pantryRes.json();
      const ingredientsData = await ingredientsRes.json();

      if (profileData.success) {
        setProfile({
          userId: profileData.user_id,
          username: profileData.username,
          userDescription: profileData.user_desc || '',
          email: profileData.email,
        });
      } else {
        setError('Az adatok betöltése sikertelen');
      }

      setPantryItems(pantryData.pantry_items || []);

      setIngredients(ingredientsData.map((ingredient: Ingredient) => ({
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        ingredient_measurement: ingredient.ingredient_measurement,
      })));

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Az adatok betöltése sikertelen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ingredientsRes = await fetch('/api/data?type=pantry_ingredients');
        const ingredients = await ingredientsRes.json();

        const mappedIngredients = ingredients.map((ingredient: Ingredient) => ({
          ingredient_id: ingredient.ingredient_id,
          ingredient_name: ingredient.ingredient_name,
          ingredient_measurement: ingredient.ingredient_measurement,
        }));

        setIngredients(mappedIngredients);
      } catch (error) {
        console.error('Dropdown adatok betöltése sikertelen:', error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/authcheck', {
          method: 'GET',
          credentials: 'include', // Use cookies for authentication
        });
        const data = await res.json();
        if (!data.success) {
          setError('Bejelentkezés szükséges');
          setLoading(false);
          return;
        }
        fetchProfile(); // Fetch favorites if the user is logged in
      } catch (err) {
        setError('Bejelentkezés szükséges');
        setLoading(false);
      }
    };
    checkLogin();
  }, [])

  useEffect(() => {
    console.log("Pantry item:", pantryItems[0]);
    console.log("Ingredient:", ingredients[0]);
  }, [pantryItems, ingredients])


  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="grid grid-flow-col auto-cols-max md:auto-cols-min grid-cols-1">
        <section className="flex flex-col gap-6 py-8 md:py-10">
          <section className="grid grid-cols-12 h-[calc(100%-4rem)] gap-4 px-4">
            {/* Left Side */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2 py-12 max-w-full">
              <div className="justify-center gap-6 py-6 flex">
                <HeroUser /><h1 className={`${title()} flex items-center`}>{profile?.username}</h1>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.addRecipe}
                >
                  <HeroPlus /> Recept hozzáadása
                </Link>
                <Link
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={`user/${profile?.userId}`}
                >
                  Receptjeim
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.favRecipes}
                >
                  Kedvenc receptjeim <HeroFilledHeart />
                </Link>
                <Link
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.shoppingLists}
                >
                  Bevásárlólistáim <HeroShoppingCart />
                </Link>
              </div>
              <div>
                <div className={subtitle({ class: "mt-4" })}>
                  <p>{profile?.userDescription}</p>
                </div>
                <Link
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.modifyProfile}
                >
                  <HeroSettings /> Profilom módosítása
                </Link>
                <div className={subtitle({ class: "mt-4" })}>
                  <h3>Keresési feltéteim: <br /> <Link><HeroSettings />Módosítás</Link></h3>
                </div>
              </div>
            </div>
            {/* Right Side*/}
            <div className=" col-span-12 md:col-span-6 flex flex-col gap-4 py-6">
              <MyPantryTable pantryIngredients={pantryItems} allIngredients={ingredients} />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};