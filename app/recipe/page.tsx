import { title, subtitle } from "@/components/primitives";

export default function RecipePage() {
  return (
    <div>
      <h1 className={title()}>Recept</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Egy adott recept leírása, összetevőinek listája, lépések leírása
        Shopping list nyomtatása, kedvencekhez hozzáadás, 
        Spájzban lévő összetevők összehasonlítása, hogy van-e (tuti külön komponens)
      </div>
    </div>
  );
}
