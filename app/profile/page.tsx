import { title, subtitle } from "@/components/primitives";

export default function ProfilePage() {
  return (
    <div>
      <h1 className={title()}>Profilom</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Ide kerül profilleírás, adatok, settings,
        Kedvenc receptek listája, 
        Innen lehet menni spájzom-ba
        Bevásárlólistákat itt lehet megtalálni, azokat akár kinyomtatni, törölni
      </div>
    </div>
  );
}
