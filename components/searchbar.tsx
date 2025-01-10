'use client'

/* Search for ingredients. The chosen items show up in a list. */
import React, { useState, useMemo } from 'react';
import { Button, Input } from '@nextui-org/react';
import { CancelIcon } from './icons';

interface MySearchBarProps {
    list: { key: number; value: string }[];
    selectedKeys: number[];
    onSelectionChange: (keys: number[]) => void;
}


export const MySearchBar: React.FC<MySearchBarProps> = ({ list, selectedKeys, onSelectionChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter the list based on the search query
    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return list.filter((item) =>
            item.value.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    }, [searchQuery, list]);


    const handleSelectItem = (key: number) => {
        if (!selectedKeys.includes(key)) {
            onSelectionChange([...selectedKeys, key]);
        }
        setSearchQuery(''); // Clear the search bar after selection
    };
    const handleRemoveItem = (key: number) => {
        onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
    };

    return (
        <div className="w-full max-w-md">
            <div className="relative mb-4">
                <Input
                    className="form-control input w-64"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keressen a hozávalók között..."
                    variant="bordered"
                />
                {filteredList.length > 0 && (
                    <ul className="absolute z-10 border rounded shadow-md w-full max-h-48 overflow-y-auto">
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
                                {item.value}
                                <span className="flex-shrink-0">
                                    <CancelIcon style={{ width: '12px', height: '12px' }} />
                                </span>
                            </Button>
                        )
                    );
                })}
            </div>
        </div>
    );
};