'use client'

import React, { useState, useMemo } from 'react';
import { Button, Input } from "@heroui/react";
import { HeroCancel } from '../icons';
import { useAuthentication } from '@/app/context/authenticationContext';

interface MySearchBarProps {
    isDisabled: boolean;
    list: { key: number; value: string }[];
    selectedKeys: number[];
    onSelectionChange: (keys: number[]) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}


export const MySearchBar: React.FC<MySearchBarProps> = ({ isDisabled, list, selectedKeys, onSelectionChange, isOpen, setIsOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuthentication();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsOpen(!!value); // Open when typing, close when cleared
    };

    // Filter the list based on the search query (Ingredient)
    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return list.filter((item) =>
            item.value.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
            .slice(0, 6); // Limit to the first 6 items
    }, [searchQuery, list]);


    const handleSelectItem = (key: number) => {
        if (!selectedKeys.includes(key)) {
            onSelectionChange([...selectedKeys, key]);
        }
        setSearchQuery(''); // Clear the search bar after selection
        setIsOpen(false);  // Close the dropdown
    };
    const handleRemoveItem = (key: number) => {
        onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
    };

    return (
        <div>
            <div>
                <Input
                    isDisabled={isDisabled}
                    className="form-control input"
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Keresés..."
                    variant="bordered"
                />
                {isOpen && filteredList.length > 0 && (
                    <ul className="absolute z-10 border rounded overflow-y-auto">
                        {filteredList.map((item) => (
                            <li
                                key={item.key}
                                onClick={() => handleSelectItem(item.key)}
                                className="p-2 cursor-pointer bg-white dark:bg-black"
                            >
                                {item.value}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {selectedKeys.map((key) => {
                    const item = list.find((item) => item.key === key);
                    return (
                        item && (
                            <Button className="mt-4 flex items-center overflow-visible whitespace-nowrap px-4 min-w-[100px]"
                                onPress={() => handleRemoveItem(key)} key={key}>
                                {item.value} <HeroCancel />
                            </Button>
                        )
                    );
                })}
            </div>
        </div>
    );
};
