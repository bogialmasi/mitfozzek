import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>Mit főzzek?</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Oldal leírása
      </div>
    </div>
  );
}
