'use client'
import { Ingredient } from "@/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState, useMemo, useEffect } from "react";

interface MySearchBarProps {
    list: Ingredient[];
    onSelectionChange: (key: number) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const MyPantrySearchBar: React.FC<MySearchBarProps> = ({ list, onSelectionChange, isOpen, setIsOpen }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim()) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        const { exactMatches, partialMatches } = list.reduce<{ exactMatches: typeof list; partialMatches: typeof list }>(
            (acc, item) => {
                const name = item.ingredient_name?.toLowerCase();
                if (!name) return acc;
                if (name === query) {
                    acc.exactMatches.push(item); // Exact matches first
                } else if (name.includes(query)) {
                    acc.partialMatches.push(item); // Partial matches after
                }
                return acc;
            },
            { exactMatches: [], partialMatches: [] }
        );
        return [...exactMatches, ...partialMatches].slice(0, 6); // Limit to first 6 items
    }, [searchQuery, list]);





    const handleSelectItem = (key: number) => {
        const selectedItem = list.find(item => item.ingredient_id === key);
        if (selectedItem) {
            setSearchQuery(selectedItem.ingredient_name);
        }
        onSelectionChange(key);
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <div className="relative mb-4">
                <Input
                    className="form-control input max-w-md"
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Hozzávaló keresése..."
                    variant="bordered"
                />
                {isOpen && filteredList.length > 0 && (
                    <ul className="absolute z-50 border rounded shadow-md max-w-md w-full overflow-y-auto">
                        {filteredList.map((item) => (
                            <li key={item.ingredient_id}>
                                <Button
                                    onClick={() => handleSelectItem(item.ingredient_id)}
                                    className="p-2 cursor-pointer bg-white dark:bg-black"
                                >
                                    {item.ingredient_name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};