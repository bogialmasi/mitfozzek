'use client'
import React, { useState, useEffect } from 'react';
import { MyDropdown } from './dropdown';
import { Button } from '@nextui-org/react';
import { MySearchBar } from './searchbar';
import { SearchIcon } from './icons';
import { button as buttonStyles } from "@nextui-org/theme";

interface DropdownData {
    key: number;
    value: string;
}

interface MySearchProps {
    onSearch: (filters: {
        ingredients: number[];
        dishType: number[];
        dishCategory: number[];
    }) => void;
}

export const MySearch: React.FC<MySearchProps> = ({ onSearch }) => {
    // States for dropdown data
    const [ingredients, setIngredients] = useState<DropdownData[]>([]);
    const [dishType, setDishType] = useState<DropdownData[]>([]);
    const [dishCategory, setDishCategory] = useState<DropdownData[]>([]);

    // States for selected values
    const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(new Set());
    const [selectedDishType, setSelectedDishType] = useState<Set<number>>(new Set());
    const [selectedDishCategory, setSelectedDishCategory] = useState<Set<number>>(new Set());

    const handleSelectionChange = (keys: number[]) => {
        const updatedSet = new Set(keys); // Create a new Set from the array of keys
        setSelectedIngredients(updatedSet); // Update the state
    };
    // Fetch dropdown data on mount
    useEffect(() => {
        fetch('/api/data?type=ingredients')
            .then((res) => res.json())
            .then((data) => setIngredients(data))
            .catch((error) => console.error('Ingredients fetch error:', error));

        fetch('/api/data?type=dish_type')
            .then((res) => res.json())
            .then((data) => setDishType(data))
            .catch((error) => console.error('Dish Type fetch error:', error));

        fetch('/api/data?type=dish_category')
            .then((res) => res.json())
            .then((data) => setDishCategory(data))
            .catch((error) => console.error('Dish Category fetch error:', error));
    }, []);

    // Handle search
    const handleSearch = () => {
        const filters = {
            ingredients: Array.from(selectedIngredients),
            dishType: Array.from(selectedDishType),
            dishCategory: Array.from(selectedDishCategory),
        };
        onSearch(filters); // Pass filters to parent
    };

    return (
        <div>
            <p className="text-sm py-2">Hozzávalók:</p>
            <MySearchBar
                list={ingredients}
                selectedKeys={Array.from(selectedIngredients)} // Convert Set to Array
                onSelectionChange={(keys: number[]) => handleSelectionChange(keys)} // Pass updated array
            />
            <p className="text-sm">
                Kiválasztott hozzávalók: {Array.from(selectedIngredients).join(', ')}
            </p>
            <br />
            <p className="text-sm py-2">Étel típusa:</p>
            <MyDropdown
                list={dishType}
                selectedKeys={selectedDishType}
                onSelectionChange={(keys: number[]) => setSelectedDishType(new Set(keys))}
            />

            <p className="text-sm py-2">Ételérzékenységek, diéta:</p>
            <MyDropdown
                list={dishCategory}
                selectedKeys={selectedDishCategory}
                onSelectionChange={(keys: number[]) => setSelectedDishCategory(new Set(keys))}
            />
            <br />
            <Button className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
            })} onPress={handleSearch}>
                Keresés <SearchIcon />
            </Button>
        </div>
    );
};
