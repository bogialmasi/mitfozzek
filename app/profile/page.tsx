'use client'
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { MyPantryTable } from "@/components/pantry/table_pantry";
import { HeroFilledHeart, HeroPlus, HeroSettings, HeroShoppingCart, HeroUser } from "@/components/icons";
import { Spinner } from "@heroui/spinner";
import { User } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<any[]>([]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        setError(`Hiba: ${response.statusText} (${response.status})`);
        return;
      }

      const data = await response.json();

      if (data.success && data.user_id && data.username) {
        setProfile({
          userId: data.user_id,
          username: data.username,
          userDescription: data.user_desc || 'Nincs megadva leírás.',
          email: data.email,
        });
      } else {
        setError(data.message || 'Az adatok betöltése sikertelen.');
      }

      const pantryResponse = await fetch('/api/pantry', {
        method: 'GET',
        credentials: 'include'
      });

      if (!pantryResponse.ok) {
        setError(`Error fetching pantry items: ${pantryResponse.statusText}`);
        return;
      }

      const pantryData = await pantryResponse.json();
      setPantryItems(pantryData.pantry_items || []);
    } catch (err) {
      console.error('Hiba a spájz feltöltése közben:', err);
      setError('Something went wrong.');
    }
    finally {
      setLoading(false);
    }
  };


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
                  href={siteConfig.profileMenuItems.myRecipes}
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
              <MyPantryTable pantryIngredients={pantryItems} />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};