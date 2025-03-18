/*
'use client'
import React, { useMemo } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

interface MyPantryDropdownProps {
  list: { key: number; value: string }[];
  selectedKeys: Set<number>;
  onSelectionChange: (key: number[] | null) => void;
}

export const MyPantryDropdown: React.FC<MyPantryDropdownProps> = ({ list, selectedKeys, onSelectionChange }) => {
  const selectedValue = useMemo(() => {
    const selectedValues = Array.from(selectedKeys)
      .map((key) => list.find((d) => d.key === key)?.value)
      .filter((v) => v);  // Filter undefined values
    return selectedValues.length > 0 ? selectedValues : 'Mértékegység';
  }, [selectedKeys, list]);

  // Handle the selection change
  const handleSelectChange = (key: number) => {
    onSelectionChange([key]);  // select the key as an array
  };

  return (
    <div className='w-full'>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          aria-label="Mértékegység"
          closeOnSelect={true}
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="bordered"
        >
          {list.map((item, index) => (
            <DropdownItem key={index} value={item.key} textValue={item.value}
              onPress={() => handleSelectChange(item.key)}
              className={`flex items-center ${selectedKeys.has(item.key) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
              {item.value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
*/