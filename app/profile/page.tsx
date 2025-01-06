'use client'
import { title, subtitle } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";

export default function ProfilePage() {
  return (
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
          <h3>Hello, i am XY ZX, i am 30 years old and i have found my passion in cooking. I am eager to try any new and fun recipes, as long as they are vegan</h3>
        </div>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.profileMenuItems.modifyProfile}
        >
          Profilom módosítása
        </Link>
        <div className={subtitle({ class: "mt-4" })}>
        <h3>Keresési feltéteim: <br/> <Link> Módosítás </Link></h3>
      </div>
      </div>
    </section>
  );
}
