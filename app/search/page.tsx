'use client'
import React, { useEffect, useRef, useState } from 'react';
import { MySearch } from '@/components/search/form_search';
import { Spinner } from "@heroui/react";
import { subtitle, title } from '@/components/primitives';
import { MyListItem } from '@/components/search/card_searchresult_listitem';
import { Recipe } from '@/types';

interface SearchFilters {
  searchQuery: string;
  ingredients: number[];
  dishType: number[];
  dishCategory: number[];
  dishCuisine: number[];
  onlyPantryIngredients: boolean;
  pantryIngredients: number[];
}

export default function SearchPage() {
  // scroll down to results
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const scrollResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const [ingredients, setIngredients] = useState([]);
  const [dishType, setDishType] = useState([]);
  const [dishCategory, setDishCategory] = useState([]);
  const [dishCuisine, setDishCuisine] = useState([]);
  const [pantryIngredients, setPantryIngredients] = useState([]);
  // search filters, grouped
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    ingredients: [],
    dishType: [],
    dishCategory: [],
    dishCuisine: [],
    onlyPantryIngredients: false,
    pantryIngredients: [],
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
        const token = localStorage.getItem('token');
        const pantryIngredientsRes = await fetch('/api/data?type=user_pantry', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!ingredientsRes.ok || !dishTypeRes.ok || !dishCategoryRes.ok || !dishCuisineRes.ok) {
          setError("Hiba a keresési filterek betöltése közben");
        }
        if (!pantryIngredientsRes.ok) {
          setError('A spájz betöltése sikertelen');
        }

        setIngredients(await ingredientsRes.json());
        setDishType(await dishTypeRes.json());
        setDishCategory(await dishCategoryRes.json());
        setDishCuisine(await dishCuisineRes.json());

        setPantryIngredients(await pantryIngredientsRes.json());

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
        filters.pantryIngredients.forEach((id) => params.append('ingredients', id.toString())); // pantry ingredients are also ingredients for search
        filters.dishType.forEach((id) => params.append('dishType', id.toString()));
        filters.dishCategory.forEach((id) => params.append('dishCategory', id.toString()));
        filters.dishCuisine.forEach((id) => params.append('dishCuisine', id.toString()));
        if (filters.onlyPantryIngredients) {
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
      } catch (error) {
        console.error('Hiba a keresés során:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [filters]);



  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full text-left justify-center overflow-visible ">
        <h1 className={title()}>Keresés a receptek között</h1>
        <MySearch
          onSearch={(newFilters) => {
            setFilters(newFilters);
            scrollResults();
          }}
          ingredients={ingredients}
          dishType={dishType}
          dishCategory={dishCategory}
          dishCuisine={dishCuisine}
          pantryIngredients={pantryIngredients}
        />
      </div>
      <br />
      <div className="w-full mt-6 text-center" ref={resultsRef}>

        {error && <div className="w-full text-center justify-center overflow-visible">
          <h1 className={subtitle()}>{error}</h1>
        </div>}

        {loading && (
          <div>
            <div className="flex justify-center items-center">
              <h1 className={subtitle()}>Receptek betöltése folyamatban...</h1>
              <br />
              <Spinner />
            </div>
          </div>
        )}

        {!loading && results.length === 0 && filters.ingredients.length > 0 && (
          <div className="w-full text-center justify-center overflow-visible">
            <h1 className={title()}>Keresési találatok</h1>
            <p>Nincs a keresési feltételeknek megfelelő recept</p>
          </div>

        )}

        {!loading && !error && results.length > 0 && (
          <div className="w-full text-center justify-center overflow-visible">
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
