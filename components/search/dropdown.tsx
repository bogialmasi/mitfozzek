'use client'
/* MyDropdown is for MySearch, choose from DishCategory or DishType */
import React, { useMemo } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

interface MyDropdownProps {
  list: { key: number; value: string }[]; // List passed as props
  selectedKeys: Set<number>; // Set of selected keys
  onSelectionChange: (keys: number[]) => void; // Handler to update selected keys
}

export const MyDropdown: React.FC<MyDropdownProps> = ({ list, selectedKeys, onSelectionChange }) => {
  const selectedValue = useMemo(() => {
    const selectedValues = Array.from(selectedKeys)
      .map((key) => list.find((d) => d.key === key)?.value)
      .filter((v) => v);  // Filter undefined values
    return selectedValues.length > 0 ? selectedValues.join(', ') : 'Nincs kiválasztva';
  }, [selectedKeys, list]);

  // Handle the selection change
  const handleSelectChange = (key: number) => {
    const currentSelection = new Set(selectedKeys);
    if (currentSelection.has(key)) {
      currentSelection.delete(key);  // Deselect if already selected
    } else {
      currentSelection.add(key);  // Select if not selected
    }
    onSelectionChange(Array.from(currentSelection));
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          aria-label="Válasszon!"
          closeOnSelect={false}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="bordered"
        /* TODO When selecting the items, NextUI puts a checkmark to it by default, where is it? bg-gray-200 should have a different tone for when in dark mode */
        >
          {list.map((item) => (
            <DropdownItem key={item.key} value={item.key} 
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