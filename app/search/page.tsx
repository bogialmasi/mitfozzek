'use client'
import React from 'react';
import { MySearch } from '@/components/search_filters';
import { Button, Form, Input } from '@nextui-org/react';
import { title } from '@/components/primitives';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  // Function to handle search submission
  const handleSearch = (filters: {
    ingredients: number[];
    dishType: number[];
    dishCategory: number[];
  }) => {

    console.log('Filterek:', filters);
    const params = new URLSearchParams();
    filters.ingredients.forEach((id) => params.append('ingredients', id.toString()));
    filters.dishType.forEach((id) => params.append('dishType', id.toString()));
    filters.dishCategory.forEach((id) => params.append('dishCategory', id.toString()));
    
    // Navigate to the results page with query parameters
    router.push(`/search/results?${params.toString()}`);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xl text-center justify-center overflow-visible ">
        <h1 className={title()}>Keresés a receptek között...</h1>
        <MySearch onSearch={handleSearch} />
      </div>
    </section>
  );
}
