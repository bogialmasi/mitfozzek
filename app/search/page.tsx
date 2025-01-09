'use client'
import React from 'react';
import { MySearch } from '@/components/search';
import { Button, Form, Input } from '@nextui-org/react';
import { title } from '@/components/primitives';

export default function SearchPage() {
  // Function to handle search submission
  const handleSearch = (filters: {
    ingredients: number[];
    dishType: number[];
    dishCategory: number[];
  }) => {
    console.log('Search Filters:', filters);
    // Perform your search logic or API call here
  };

  return (
    <Form className="">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Receptek keresése</h1>
      </div>
      <Input
        className="form-control input py-4"
        labelPlacement="outside"
        name="search"
        placeholder="Keressen rá receptek címére..."
        type="text"
        variant="bordered"
      />
      <div className="inline-block w-max text-left justify-center py-2">
        <div className="container mx-auto p-4">
          <MySearch onSearch={handleSearch} />
        </div>
      </div>
    </Form>
  );
}
