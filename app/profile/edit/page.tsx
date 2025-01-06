import { title, subtitle } from "@/components/primitives";

export default function EditProfilePage() {
  return (
    <div>
      <h1 className={title()}>Profil módosítása</h1>
      <div className={subtitle({ class: "mt-4" })}>
        Saját profil módosítása, törlése
      </div>
    </div>
  );
}
