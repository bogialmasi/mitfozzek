'use client'
import React, { useEffect, useState } from 'react';
import { MySearch } from '@/components/search/search_handler';
import { Button, Form, Input, Spinner } from "@heroui/react";
import { title } from '@/components/primitives';
import { useRouter } from 'next/navigation';
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

export default function SearchPage() {
  const router = useRouter();

  // search filters, grouped
  const [filters, setFilters] = useState<{
    searchQuery: string;
    ingredients: number[];
    dishType: number[];
    dishCategory: number[];
  }>({
    searchQuery: '',
    ingredients: [],
    dishType: [],
    dishCategory: []
  });

  // results are an array of recipes
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update filters when searching
  const handleSearch = (filters: {
    searchQuery: string,
    ingredients: number[];
    dishType: number[];
    dishCategory: number[];
  }) => { setFilters(filters) };

  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (
        filters.searchQuery.trim().length === 0 &&
        !filters.ingredients.length && !filters.dishCategory.length && !filters.dishType.length
      )
        return;

      try {
        const params = new URLSearchParams();
        filters.searchQuery && params.append('searchQuery', filters.searchQuery);
        filters.ingredients.forEach((id) => params.append('ingredients', id.toString()));
        filters.dishType.forEach((id) => params.append('dishType', id.toString()));
        filters.dishCategory.forEach((id) => params.append('dishCategory', id.toString()));

        const response = await fetch(`/api/search?${params.toString()}`);
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
  }, [filters]);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xl text-left justify-center overflow-visible ">
        <h1 className={title()}>Keresés a receptek között</h1>
        <MySearch onSearch={handleSearch} />
      </div>
      <div className="w-full max-w-xl mt-6 text-center">
        {error && <p>Hiba: {error}</p>}
        {!loading && !error && results.length === 0 && filters.ingredients.length > 0 && (
          <p>Nincs a keresési feltételeknek megfelelő recept</p>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="w-full max-w-xl text-center justify-center overflow-visible">
            <h1 className={title()}>Keresési találatok</h1>
            {loading &&
              <div>
                <Spinner color="primary" label="Betöltés..." />
              </div>}
            {results.map((recipe, index) => (
              <MyListItem key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
