'use client'
import { Ingredient } from "@/types";
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
        return list
            .filter((item) => item.ingredient_name && item.ingredient_name.toLowerCase().startsWith(searchQuery.toLowerCase()))
            .slice(0, 6); 
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
                            <li
                                key={item.ingredient_id}
                                onClick={() => handleSelectItem(item.ingredient_id)}
                                className="p-2 cursor-pointer bg-white dark:bg-black"
                            >
                                {item.ingredient_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};