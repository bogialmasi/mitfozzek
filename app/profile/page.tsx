'use client'
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { MyPantry } from "@/components/profile/pantry";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const userId = 1;
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'user_id': userId.toString() // Sending user_id as header
        }
      });
      const data = await response.json();
      setProfile(data);
    };

    fetchProfileData();
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }
  return (
    <div>

      <section className="flex flex-col gap-4">
          <div className="grid grid-flow-col auto-cols-max md:auto-cols-min grid-cols-1">
            <section className="flex flex-col gap-6 py-8 md:py-10">
              <div className="justify-right gap-6"><h1 className={title()}>Profilom</h1></div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  isExternal
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.addRecipe}
                >
                  Recept hozzáadása
                </Link>
                <Link
                  isExternal
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.myRecipes}
                >
                  Receptjeim
                </Link>
                <Link
                  isExternal
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.favRecipes}
                >
                  Kedvenc receptjeim
                </Link>
                <div className={subtitle({ class: "mt-4" })}>
                  <h3>Itt jelenik meg a felhasználó által írt bemutatkozás</h3>
                </div>
                <Link
                  isExternal
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  href={siteConfig.profileMenuItems.modifyProfile}
                >
                  Profilom módosítása
                </Link>
                <div className={subtitle({ class: "mt-4" })}>
                  <h3>Keresési feltéteim: <br /> <Link> Módosítás </Link></h3>
                </div>
              </div>
            </section>
          </div>
          <MyPantry userId={profile.user_id}/>
      </section>
    </div>
  );
}
