'use client'
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { MyPantry } from "@/components/profile/pantry";
import { HeroFilledHeart, HeroSettings } from "@/components/icons";
import { Spinner } from "@heroui/spinner";

interface User {
  userId: number;
  username: string;
  userDescription: string | null;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      setError('Bejelentkezés szükséges');
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError(`Hiba: ${response.statusText} (${response.status})`);
          return;
        }

        const data = await response.json();
        console.log('Profile data:', data);

        if (data.success && data.user_id && data.username) {
          setProfile({
            userId: data.user_id,
            username: data.username,
            userDescription: data.user_description || 'Nincs megadva leírás.',
            email: data.email,
          });
          setLoading(false);
        } else {
          setError(data.message || 'Az adatok betöltése sikertelen.');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      <section className="flex flex-col gap-4">
        <div className="grid grid-flow-col auto-cols-max md:auto-cols-min grid-cols-1">
          <section className="flex flex-col gap-6 py-8 md:py-10">
            <div className="justify-right gap-6"><h1 className={title()}>{profile?.username}</h1></div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.profileMenuItems.addRecipe}
              >
                Recept hozzáadása
              </Link>
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.profileMenuItems.myRecipes}
              >
                Receptjeim
              </Link>
              <Link
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.profileMenuItems.favRecipes}
              >
                Kedvenc receptjeim <HeroFilledHeart/>
              </Link>
              <div className={subtitle({ class: "mt-4" })}>
                <h3>{profile?.userDescription}</h3>
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
          </section>
        </div>
        {profile && <MyPantry userId={profile.userId} />}
      </section>
    </div>
  );
};