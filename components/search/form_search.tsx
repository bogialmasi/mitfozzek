'use client'
import React, { useState } from 'react';
import { MyDropdown } from './dropdown_searchfilters';
import { Button, Form, Input, Checkbox } from "@heroui/react";
import { MySearchBar } from './searchbar_dropdown';
import { HeroSearch } from '../icons';
import { button as buttonStyles } from "@heroui/theme";
import { useAuthentication } from '@/app/context/authenticationContext';

interface MySearchProps {
    onSearch: (filters: {
        searchQuery: string;
        ingredients: number[];
        dishType: number[];
        dishCategory: number[];
        dishCuisine: number[];
        onlyPantryIngredients: boolean;
        pantryIngredients: number[];
    }) => void;
    ingredients: any[];
    dishType: any[];
    dishCategory: any[];
    dishCuisine: any[];
    pantryIngredients: any[];
}

export const MySearch: React.FC<MySearchProps> = ({ onSearch, ingredients, dishType, dishCategory, dishCuisine, pantryIngredients }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuthentication();
    const [searchQuery, setSearchQuery] = useState('');
    const [pantryIngredientsOnly, setPantryIngredientsOnly] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        ingredients: new Set<number>(),
        dishType: new Set<number>(),
        dishCategory: new Set<number>(),
        dishCuisine: new Set<number>(),
        pantryIngredient: new Set<number>(),
    });
    // Uupdates the selected filters, changing the set in the selectedFilters state
    const updateFilter = (type: keyof typeof selectedFilters, keys: number[]) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: new Set(keys),
        }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            searchQuery,
            ingredients: Array.from(selectedFilters.ingredients),
            dishType: Array.from(selectedFilters.dishType),
            dishCategory: Array.from(selectedFilters.dishCategory),
            dishCuisine: Array.from(selectedFilters.dishCuisine),
            onlyPantryIngredients: pantryIngredientsOnly,
            pantryIngredients: Array.from(selectedFilters.pantryIngredient),
        });
    };

    const deleteFilters = () => {
        setSearchQuery('');
        setPantryIngredientsOnly(false);
        setSelectedFilters({
            ingredients: new Set<number>(),
            dishType: new Set<number>(),
            dishCategory: new Set<number>(),
            dishCuisine: new Set<number>(),
            pantryIngredient: new Set<number>(),
        });
    }


    return (
        <div className="w-full">
            <Form onSubmit={handleSearch} validationBehavior="native"
                className="w-full flex flex-col overflow-visible py-4">
                <div className='flex flex-col space-y-1 w-full'>
                    <p className="text-sm py-2">Keressen rá a recept címére</p>
                    <Input
                        className="form-control input py-2"
                        labelPlacement="outside"
                        name="search"
                        placeholder="Keresés..."
                        type="text"
                        variant="bordered"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <p className="text-sm py-2">Milyen hozzávalókat tartalmazzon a recept?</p>
                    <MySearchBar
                        isDisabled={pantryIngredientsOnly}
                        list={ingredients}
                        selectedKeys={Array.from(selectedFilters.ingredients)}
                        onSelectionChange={(keys: number[]) => updateFilter('ingredients', keys)}
                        showSelection={true}
                    />
                </div>
                {user && (
                    <div className='bg-gray-200 dark:bg-gray-800 rounded-xl p-4 w-full py-2'>
                        <div className='flex flex-col space-y-1 w-full'>
                            <p className="text-sm py-2">Recept keresése a spájz összetevői alapján</p>
                            <MySearchBar
                                isDisabled={false}
                                list={pantryIngredients}
                                selectedKeys={Array.from(selectedFilters.ingredients)}
                                onSelectionChange={(keys: number[]) => updateFilter('ingredients', keys)}
                                showSelection={false}
                            />
                            <Checkbox isSelected={pantryIngredientsOnly} onValueChange={setPantryIngredientsOnly}>
                                <p className="text-sm py-2">Olyan receptek keresése, amelyekhez a spájzomban már minden összetevő megvan</p>
                            </Checkbox>
                        </div>
                    </div>
                )}
                <div className='flex flex-col space-y-1 w-full'>
                    <p className="text-sm py-2">Milyen konyha?</p>
                    <MySearchBar
                        isDisabled={false}
                        list={dishCuisine}
                        selectedKeys={Array.from(selectedFilters.dishCuisine)}
                        onSelectionChange={(keys: number[]) => updateFilter('dishCuisine', keys)}
                        showSelection={true}
                    />
                </div>
                <div>
                    <div className='flex flex-col space-y-1 w-md'>
                        <p className="text-sm py-2">Reggeli, ebéd, vacsora, vagy valami különleges?</p>
                        <MyDropdown
                            list={dishType}
                            selectedKeys={selectedFilters.dishType}
                            onSelectionChange={(keys: number[]) => updateFilter('dishType', keys)}
                        />
                    </div>
                    <div className='flex flex-col space-y-1 w-md'>
                        <p className="text-sm py-2">Keresés ételérzékenységek, speciális diéták alapján</p>
                        <MyDropdown
                            list={dishCategory}
                            selectedKeys={selectedFilters.dishCategory}
                            onSelectionChange={(keys: number[]) => updateFilter('dishCategory', keys)}
                        />
                    </div>

                    <br />
                    <div className='flex flex-row items-center space-x-6'>
                        <Button className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })} type="submit">
                            Keresés <HeroSearch />
                        </Button>
                        <Button className={buttonStyles({
                            color: "default",
                            radius: "full",
                            variant: "shadow",
                        })} onClick={deleteFilters}>
                            Keresési feltételek törlése
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};