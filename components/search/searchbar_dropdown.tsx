'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button, Input } from "@heroui/react";
import { HeroCancel } from '../icons';

interface MySearchBarProps {
    isDisabled: boolean;
    list: { key: number; value: string }[];
    selectedKeys: number[];
    onSelectionChange: (keys: number[]) => void;
    showSelection: boolean;
}


export const MySearchBar: React.FC<MySearchBarProps> = ({ isDisabled, list, selectedKeys, onSelectionChange, showSelection }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsOpen(!!value); // Open when typing, close when cleared
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setSearchQuery(''); // clear search query if clicked outside
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        const { exactMatches, partialMatches } = list.reduce<{ exactMatches: typeof list; partialMatches: typeof list }>(
            (acc, item) => {
                const value = item.value.toLowerCase();

                if (value === query) {
                    acc.exactMatches.push(item); // Exact matches first
                } else if (value.includes(query)) {
                    acc.partialMatches.push(item); // Partial matches after
                }
                return acc;
            },
            { exactMatches: [], partialMatches: [] }
        );
        return [...exactMatches, ...partialMatches].slice(0, 6); // Limit to first 6 items
    }, [searchQuery, list]);


    const handleSelectItem = (key: number, e: React.MouseEvent) => {
        e.stopPropagation();
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
                    ref={inputRef}
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
                            <li key={item.key}>
                                <Button
                                    
                                    onClick={(e) => handleSelectItem(item.key, e)}
                                    className="p-2 cursor-pointer bg-white dark:bg-black"
                                >
                                    {item.value}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {showSelection && selectedKeys.length > 0 && (
                <div>
                    <p className="text-sm py-2">Kiválasztva:</p>
                    <div className="flex flex-wrap space-x-3">
                        {selectedKeys.map((key) => {
                            const item = list.find((item) => item.key === key);
                            return (
                                item && (
                                    <Button className="mt-2 flex items-center overflow-visible whitespace-nowrap px-4 min-w-[100px]"
                                        onClick={() => handleRemoveItem(key)} key={key}>
                                        {item.value} <HeroCancel />
                                    </Button>
                                )
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
