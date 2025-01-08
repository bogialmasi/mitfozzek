import React, { useMemo } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { SharedSelection } from "@nextui-org/react";

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
          variant="flat"
        /*onSelectionChange={(selected) => {
          const numberKeys = Array.from(selected).map((key) => Number(key));  // Convert to numbers
          handleSelectChange(numberKeys);
        }}*/
        >
          {list.map((item) => (
            <DropdownItem key={item.key} value={item.key} 
            onPress={() => handleSelectChange(item.key)}
            className={`flex items-center ${selectedKeys.has(item.key) ? 'bg-gray-200' : ''}`}>
              {item.value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};