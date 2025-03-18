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
  dietCategory: number[];
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
  const [dietCategory, setDietCategory] = useState([]);
  const [dishCuisine, setDishCuisine] = useState([]);
  const [pantryIngredients, setPantryIngredients] = useState([]);
  // search filters, grouped
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    ingredients: [],
    dishType: [],
    dietCategory: [],
    dishCuisine: [],
    onlyPantryIngredients: false,
    pantryIngredients: [],
  });


  // results are an array of recipes
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const checkLogin = async () => {
    console.log('checkLogin')
    try {
      const res = await fetch('/api/authcheck', {
        method: 'GET',
        credentials: 'include', // Use cookies for authentication
      });
      const data = await res.json();
      if (!res.ok) {
        console.log('User is not logged in')
        setLoading(false);
        return false;
      }
      return true;
    } catch (err) {
      console.log('Err')
      setError('Bejelentkezés szükséges');
      setLoading(false);
      return false;
    }
  };

  // Fetch filters 
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      setError('');


      try {
        // Fetch all dropdown data
        const [ingredientsRes, dishTypeRes, dietCategoryRes, dishCuisineRes] = await Promise.all([
          fetch('/api/data?type=ingredients'),
          fetch('/api/data?type=dish_type'),
          fetch('/api/data?type=diet_category'),
          fetch('/api/data?type=dish_cuisine')
        ]);


        if (!ingredientsRes.ok || !dishTypeRes.ok || !dietCategoryRes.ok || !dishCuisineRes.ok) {
          setError("Hiba a keresési filterek betöltése közben");
        }

        const isLoggedIn = await checkLogin();
        if (isLoggedIn) {
          const pantryIngredientsRes = await fetch('/api/data?type=user_pantry', {
            method: 'GET',
            credentials: 'include',
          });

          if (!pantryIngredientsRes.ok) {
            setError('A spájz betöltése sikertelen');
          } else {
            setPantryIngredients(await pantryIngredientsRes.json());
          }
        }

        setIngredients(await ingredientsRes.json());
        setDishType(await dishTypeRes.json());
        setDietCategory(await dietCategoryRes.json());
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


  // Fetch results based on filters
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        filters.searchQuery && params.append('searchQuery', filters.searchQuery);
        filters.ingredients.forEach((id) => params.append('ingredients', id.toString()));
        filters.pantryIngredients.forEach((id) => params.append('ingredients', id.toString())); // pantry ingredients are also ingredients for search
        filters.dishType.forEach((id) => params.append('dishType', id.toString()));
        filters.dietCategory.forEach((id) => params.append('dietCategory', id.toString()));
        filters.dishCuisine.forEach((id) => params.append('dishCuisine', id.toString()));

        const isLoggedIn = await checkLogin(); // Ensure the user is logged in
        if (filters.onlyPantryIngredients && isLoggedIn) {
          params.append('pantryIngredientsOnly', 'true');
          const response = await fetch(`/api/search?${params.toString()}`, {
            method: 'GET',
            credentials: 'include',
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
          const response = await fetch(`/api/search?${params.toString()}`, {
            method: 'GET',
            credentials: isLoggedIn ? 'include' : 'omit',
          });
          if (!response.ok) {
            if (response.status === 404) {
              setResults([]); // empty result set
              setError('Nincs a keresési találat');
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
          dietCategory={dietCategory}
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
