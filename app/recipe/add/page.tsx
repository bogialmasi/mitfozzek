import { title, subtitle } from "@/components/primitives";

export default function AddRecipePage() {
  return (
    <div>
      <h1 className={title()}>Recept hozzáadása</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Új recept létrehozása
      </div>
    </div>
  );
}
