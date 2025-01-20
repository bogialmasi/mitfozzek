'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { title } from '@/components/primitives';
import { MyListItem } from '@/components/search/searchresult_listitem';

// This is what a recipe looks like in my example.ts file
interface Recipe {
    recipe_id: number;
    recipe_name: string;
    recipe_description: string;
    recipe_time: string;
    recipe_headcount: number;
    source_user_id: number;
    ingredients: Ingredient[];
}

interface Ingredient {
    id: number;
    name: string;
}

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const [results, setResults] = useState<Recipe[]>([]); // results will be recipes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams(searchParams.toString());
                const response = await fetch(`/api/search?${params}`);
                if (!response.ok) {
                    throw new Error('Hiba a receptek betöltése során');
                }
                const data = await response.json();
                setResults(data); 
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba: {error}</p>;
    if (results.length === 0) {
        return <p>Nincs a keresési feltételeknek megfelelő recept</p>;
    }

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="w-full max-w-xl text-center justify-center overflow-visible">
                <h1 className={title()}>Keresési találatok</h1>
                {results.map((recipe, index) => (
                    <MyListItem key={index} recipe={recipe} />
                ))}
            </div>
        </section>
    );
}