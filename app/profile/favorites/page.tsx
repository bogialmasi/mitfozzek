import { title, subtitle } from "@/components/primitives";

export default function FavoritesPage() {
  return (
    <div>
      <h1 className={title()}>Kedvenc receptjeim</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Kedvenc receptek kilistázása, lista módosítása
      </div>
    </div>
  );
}
