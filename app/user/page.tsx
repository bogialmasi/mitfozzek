'use client'
import { title } from "@/components/primitives";
import { Spinner } from "@heroui/spinner";
import { Suspense, useEffect, useState } from "react";
import { Recipe } from "@/types";
import { button as buttonStyles } from "@heroui/theme";
import { HeroSearch } from "@/components/icons";
import Link from "next/link";
import { MyListItem } from "@/components/search/card_searchresult_listitem";
import { useSearchParams } from "next/navigation";
const UserPageContent = () => {
    const searchParams = useSearchParams();
    const [username, setUsername] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        const fetchRecipes = async () => {
            const id = searchParams.get('id');
            if (!id) {
                setError('No ID provided in the query parameters');
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/search?user=${id}`);
                if (!res.ok) {
                    setError('Recept lekérése sikertelen');
                }
                const data = await res.json();

                if (data.username) {
                    setUsername(data.username);
                } else {
                    setUsername("Ismeretlen felhasználó");
                }

                if (data.fullRecipe && data.fullRecipe.length > 0) {
                    setRecipes(data.fullRecipe);
                } else {
                    setRecipes(null);
                }
            } catch (error) {
                console.error(error);
                setError("Hiba történt a receptek lekérése közben");
                setRecipes(null);
            } finally {
                setLoading(false);
            }

            fetchRecipes();
        }
    }, [searchParams]);

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    if (error) return <p>Hiba: {error}</p>;
    if (!username) {
        return (
          <div>
            <p>Ez a felhasználó nem létezik.</p>
            <Link
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={`/search`}
            >
              Vissza a receptek kereséséhez <HeroSearch />
            </Link>
          </div>
        )
      }

    return (
        <div>
            <h1 className={title()}>{username.length > 0 ? username : "Ismeretlen felhasználó"} receptjei</h1>
            <div>
                {recipes && recipes.length > 0 ? (
                    <ul>
                        {recipes.map((recipe) => (
                            <MyListItem key={recipe.recipe_id} recipe={recipe} />
                        ))}
                    </ul>
                ) : (
                    <div className="py-4">
                        <p>Ez a felhasználó még nem töltött fel recepteket</p>
                        <div className="flex flex-col gap-4 py-4">
                            <Link
                                className={buttonStyles({ variant: "bordered", radius: "full" })}
                                href={`/search`}
                            >
                                Keresés a receptek között <HeroSearch />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function UserPage() {
    return (
        <Suspense fallback={<div>Betöltés...</div>}>
            <UserPageContent />
        </Suspense>
    );
}
