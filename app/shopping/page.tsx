import { title, subtitle } from "@/components/primitives";

export default function ShoppingPage() {
  return (
    <div>
      <h1 className={title()}>Bevásárlólistáim</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Beváráslólisták
      </div>
    </div>
  );
}
