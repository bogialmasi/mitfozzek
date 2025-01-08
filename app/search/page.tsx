'use client'
import React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";
import { MyDropdown } from "@/components/dropdown";
import { useState, useEffect } from 'react';

interface MyDropdownData {
  key: number;
  value: string;
}

export default function SearchPage() {

  const [ingredients, setIngredients] = useState<{ key: number; value: string }[]>([]);
  const [dishType, setDishType] = useState<{ key: number; value: string }[]>([]);
  const [dishCategory, setDishCategory] = useState<{ key: number; value: string }[]>([]);

  const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(new Set());
  const [selectedDishType, setSelectedDishType] = useState<Set<number>>(new Set());
  const [selectedDishCategory, setSelectedDishCategory] = useState<Set<number>>(new Set());

  // These will be used for db queries
  const selectedIngredientsArray = Array.from(selectedIngredients);
  const selectedDishTypeArray = Array.from(selectedDishType);
  const selectedDishCategoryArray = Array.from(selectedDishCategory);

  useEffect(() => {
    fetch('/api/data?type=ingredients')
      .then((res) => res.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Hozzávalók hiba:', error));

    fetch('/api/data?type=dish_type')
      .then((res) => res.json())
      .then((data) => setDishType(data))
      .catch((error) => console.error('Ételtípus hiba:', error));

    fetch('/api/data?type=dish_category')
      .then((res) => res.json())
      .then((data) => setDishCategory(data))
      .catch((error) => console.error('Ételérzékenység hiba:', error));
  }, []);


  return (
    <Form className="">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Receptek keresése</h1>
      </div>
      <Input
        className="form-control input"
        labelPlacement="outside"
        name="search"
        placeholder="Keressen rá receptek címére, vagy hozzávalóra..."
        type="text"
        variant="bordered"
      />
      <div className="inline-block max-w-xl w-max text-left justify-center gap-2 py-2">
        <p className="text-sm py-2">Hozzávalók:</p>
        <MyDropdown
          list={ingredients}  // Pass the fetched ingredients here
          selectedKeys={selectedIngredients}
          onSelectionChange={(keys: number[]) => {
            setSelectedIngredients(new Set(keys));
          }}
        />
        <p className="text-sm py-2">Étel típusa:</p>
        <MyDropdown
          list={dishType}
          selectedKeys={selectedDishType}
          onSelectionChange={(keys: number[]) => {
            setSelectedDishType(new Set(keys));
          }}
        />
        <p className="text-sm py-2">Ételérzékenységek, diéta:</p>
        <MyDropdown
          list={dishCategory}
          selectedKeys={selectedDishCategory}
          onSelectionChange={(keys: number[]) => {
            setSelectedDishCategory(new Set(keys));
          }}
        />
      </div>
      <div>
        <Button type="submit" className="btn btn-primary mb-2 justify-center">Keresés</Button>
      </div>
    </Form>
  );
}
