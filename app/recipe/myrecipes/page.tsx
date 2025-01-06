import { title, subtitle } from "@/components/primitives";

export default function MyRecipesPage() {
  return (
    <div>
      <h1 className={title()}>Saját receptjeim</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Saját receptek kilistázása, módosítási lehetőséggel
      </div>
    </div>
  );
}
