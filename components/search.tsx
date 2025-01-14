'use client'
import React, { useState, useEffect } from 'react';
import { MyDropdown } from './dropdown';
import { Button, Form, Input } from '@nextui-org/react';
import { MySearchBar } from './searchbar';
import { SearchIcon } from './icons';
import { button as buttonStyles } from "@nextui-org/theme";
import { useRouter } from 'next/navigation';

interface MySearchData {
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
    const router = useRouter();

    // States for dropdown data
    const [ingredients, setIngredients] = useState<MySearchData[]>([]);
    const [dishType, setDishType] = useState<MySearchData[]>([]);
    const [dishCategory, setDishCategory] = useState<MySearchData[]>([]);

    const [selectedFilters, setSelectedFilters] = useState({
        ingredients: new Set<number>(),
        dishType: new Set<number>(),
        dishCategory: new Set<number>(),
    });



    // Loads dropdown with data when page is loaded (mounted)
    useEffect(() => {

        const fetchData = async () => {
            try {
                const [ingredientsRes, dishTypeRes, dishCategoryRes] = await Promise.all([
                    fetch('/api/data?type=ingredients'),
                    fetch('/api/data?type=dish_type'),
                    fetch('/api/data?type=dish_category'),
                ]);

                setIngredients(await ingredientsRes.json());
                setDishType(await dishTypeRes.json());
                setDishCategory(await dishCategoryRes.json());
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchData();
    }, []);

    // Uupdates the selected filters, changing the set in the selectedFilters state
    const updateFilter = (type: keyof typeof selectedFilters, keys: number[]) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: new Set(keys),
        }));
    };

    // Handle search button click
    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Gomb lenyomva: handleSearch", "color: yellow;");

        const filters = {
            ingredients: Array.from(selectedFilters.ingredients),
            dishType: Array.from(selectedFilters.dishType),
            dishCategory: Array.from(selectedFilters.dishCategory),
        };
        console.log(filters);

        if (onSearch) {
            onSearch(filters);
        }

        // Navigate to results page with filters as query params
        const params = new URLSearchParams();
        filters.ingredients.forEach((id) => params.append('ingredients', id.toString()));
        filters.dishType.forEach((id) => params.append('dishType', id.toString()));
        filters.dishCategory.forEach((id) => params.append('dishCategory', id.toString()));

        const paramsUrl = `/api/search?${params.toString()}`; // This calls the back end, without the /api part it gives back HTML
        router.push(paramsUrl);
    };

    return (
        <div className="w-full">
            <Form onSubmit={handleSearch} validationBehavior="native"
                className="w-full flex flex-col overflow-visible py-6">

                <Input
                    className="form-control input py-4"
                    labelPlacement="outside"
                    name="search"
                    placeholder="Keressen rá receptek címére..."
                    type="text"
                    variant="bordered"
                />

                <p className="text-sm py-2">Hozzávalók:</p>
                <MySearchBar
                    list={ingredients}
                    selectedKeys={Array.from(selectedFilters.ingredients)}
                    onSelectionChange={(keys: number[]) => updateFilter('ingredients', keys)}
                />
                <br />

                <p className="text-sm py-2">Étel típusa:</p>
                <MyDropdown
                    list={dishType}
                    selectedKeys={selectedFilters.dishType}
                    onSelectionChange={(keys: number[]) => updateFilter('dishType', keys)}
                />

                <p className="text-sm py-2">Ételérzékenységek, diéta:</p>
                <MyDropdown
                    list={dishCategory}
                    selectedKeys={selectedFilters.dishCategory}
                    onSelectionChange={(keys: number[]) => updateFilter('dishCategory', keys)}
                />

                <br />
                <Button className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                })} type="submit">
                    Keresés <SearchIcon />
                </Button>
            </Form>
        </div>
    );
};
