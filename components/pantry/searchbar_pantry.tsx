'use client'
import { Input } from "@heroui/input";
import { useState, useMemo } from "react";

interface MySearchBarProps {
    list: { key: number; value: string }[];
    selectedKey: number | null;
    onSelectionChange: (key: number) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const MyPantrySearchBar: React.FC<MySearchBarProps> = ({ list, selectedKey, onSelectionChange, isOpen, setIsOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log("typed in input:", value);
        setSearchQuery(value);
        if (value.trim()) {
            setIsOpen(true); // Open when typing
            console.log("opened dropdown")
        }
    };

    const filteredList = useMemo(() => {
            if (!searchQuery.trim()) return [];
            return list.filter((item) =>
                item.value.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
                .slice(0, 6); // Limit to the first 6 items
        }, [searchQuery, list]);

    const handleSelectItem = (key: number) => {
        const selectedItem = list.find(item => item.key === key);
        if (selectedItem) {
            setSearchQuery(selectedItem.value);
        }
        onSelectionChange(key);
        setIsOpen(false);
    };


    console.log("isOpen:", isOpen);
    console.log("filteredList:", filteredList);

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
        </div>
    );
};