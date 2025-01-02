import { title, subtitle } from "@/components/primitives";

export default function PantryPage() {
  return (
    <div>
      <h1 className={title()}>Spájzom</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Itt lesz egy spájz lista, ahova hozzáadni és ahonnan kitörölni lehet az összetevőket amik otthon vannak
      </div>
    </div>
  );
}
