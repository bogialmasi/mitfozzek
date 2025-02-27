'use client'
import React, { useEffect, useRef, useState } from 'react';
import { MySearch } from '@/components/search/search_handler';
import { Checkbox, Spinner } from "@heroui/react";
import { title } from '@/components/primitives';
import { MyListItem } from '@/components/search/card_searchresult_listitem';
import { Recipe } from '@/types';

interface SearchFilters {
  searchQuery: string;
  ingredients: number[];
  dishType: number[];
  dishCategory: number[];
  dishCuisine: number[];
}

export default function SearchPage() {
  // scroll down to results
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const filtersChange = useRef(false); // don't scholl until filters are set

  const [ingredients, setIngredients] = useState([]);
  const [dishType, setDishType] = useState([]);
  const [dishCategory, setDishCategory] = useState([]);
  const [dishCuisine, setDishCuisine] = useState([]);
  const [pantryIngredientsOnly, setPantryIngredientsOnly] = useState(true);
  // search filters, grouped
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    ingredients: [],
    dishType: [],
    dishCategory: [],
    dishCuisine: [],
  });


  // results are an array of recipes
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Fetch filters 
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all dropdown data
        const [ingredientsRes, dishTypeRes, dishCategoryRes, dishCuisineRes] = await Promise.all([
          fetch('/api/data?type=ingredients'),
          fetch('/api/data?type=dish_type'),
          fetch('/api/data?type=dish_category'),
          fetch('/api/data?type=dish_cuisine')
        ]);

        if (!ingredientsRes.ok || !dishTypeRes.ok || !dishCategoryRes.ok || !dishCuisineRes.ok) {
          throw new Error("Hiba a keresési filterek betöltése közben");
        }

        setIngredients(await ingredientsRes.json());
        setDishType(await dishTypeRes.json());
        setDishCategory(await dishCategoryRes.json());
        setDishCuisine(await dishCuisineRes.json());
      } catch (error) {
        console.error('Hiba a filterek betöltése közben:', error);
        setError('Hiba a keresési filterek betöltése közben');
      } finally {
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);


  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        filters.searchQuery && params.append('searchQuery', filters.searchQuery);
        filters.ingredients.forEach((id) => params.append('ingredients', id.toString()));
        filters.dishType.forEach((id) => params.append('dishType', id.toString()));
        filters.dishCategory.forEach((id) => params.append('dishCategory', id.toString()));
        filters.dishCuisine.forEach((id) => params.append('dishCuisine', id.toString()));
        if (pantryIngredientsOnly) {
          const token = localStorage.getItem('token');
          params.append('pantryIngredientsOnly', 'true');
          const response = await fetch(`/api/search?${params.toString()}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
          if (!response.ok) {
            if (response.status === 404) {
              setResults([]); // empty result set
              setError('Nincs a keresésnek megfelelő elem');
            } else {
              setError(`Hiba a keresés során: ${response.status}`);
            }
          }
          const data = await response.json();
          setResults(data);
        } else {
          console.log("params:", params.toString())
          const response = await fetch(`/api/search?${params.toString()}`);
          if (!response.ok) {
            if (response.status === 404) {
              setResults([]); // empty result set
              setError('Nincs a keresésnek megfelelő elem');
            } else {
              setError(`Hiba a keresés során: ${response.status}`);
            }
          }
          const data = await response.json();
          setResults(data);
        }

        // wait before scroll to allow results to load
        if (filtersChange.current) {
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // scrolls smoothly, as little as possible
          }, 100);
        }
        else {
          filtersChange.current = true;
        }
      } catch (error) {
        console.error('Hiba a keresés során:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [filters, pantryIngredientsOnly]);



  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full text-left justify-center overflow-visible ">
        <h1 className={title()}>Keresés a receptek között</h1>
        <MySearch
          onSearch={setFilters}
          ingredients={ingredients}
          dishType={dishType}
          dishCategory={dishCategory}
          dishCuisine={dishCuisine}
          onlyPantryIngredients={pantryIngredientsOnly}
        />
      </div>
      <div className="w-full mt-6 text-center">
        {error && <div className="w-full text-center justify-center overflow-visible"
          ref={resultsRef}>
          <p>{error}</p>
        </div>}
        {loading && (
          <div>
            <div className="flex justify-center items-center">
              <p>Receptek betöltése ... </p>
              <br />
              <Spinner />
            </div>
          </div>
        )}
        {!loading && results.length === 0 && filters.ingredients.length > 0 && (
          <div className="w-full text-center justify-center overflow-visible"
            ref={resultsRef}>
            <p>Nincs a keresési feltételeknek megfelelő recept</p>
          </div>

        )}
        {!loading && !error && results.length > 0 && (
          <div className="w-full text-center justify-center overflow-visible"
            ref={resultsRef}>
            <h1 className={title()}>Keresési találatok</h1>
            {loading && <Spinner color="primary" label="Betöltés..." />}
            {results.map((recipe, index) => (
              <MyListItem key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
