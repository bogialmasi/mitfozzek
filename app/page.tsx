import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "violet" })}>Mit főzzek?&nbsp;</span>
        <br />
        <span className={title()}>
          Alkoss listát az otthoni összetevőidből, és
          keress recepteket ezek alapján!
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.register}
        >
          Regisztráció
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.login}
        >
          Bejelentkezés
        </Link>
      </div>

      <div className="mt-3">
        <Link
        className={buttonStyles({variant: "bordered", radius: "full"})}
        href={siteConfig.links.search}
        >
          Receptkeresés bejelentkezés nélkül
        </Link>
      </div>
    </section>
  );
}
