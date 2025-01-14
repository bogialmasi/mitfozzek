'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { title } from '@/components/primitives';

// This is what a recipe looks like in my example.ts file
interface Recipe {
    recipe_id: number;
    recipe_name: string;
    recipe_description: string;
    recipe_time: string;
    recipe_headcount: number;
    source_user_id: number;
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
              throw new Error('Failed to fetch results');
            }
            const data = await response.json();
            setResults(data);  // Assuming `data` is an array of `Recipe` objects
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchResults();
      }, [searchParams]);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
      return (
        <div>
          <h2>Search Results</h2>
          <ul>
            {results.map((result, idx) => (
              <li key={idx}>{result.recipe_name}</li>  // Access recipe_name correctly now
            ))}
          </ul>
        </div>
      );
    }