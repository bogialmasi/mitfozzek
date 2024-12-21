import React, { useState, useMemo } from 'react';
import { Examples } from '@/config/example';  // Importing the config object containing multiple lists
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

type DropdownItemType = {
  key: string;
  value: string;
};

interface DropdownProps {
    list: readonly { key: string; value: string }[]; // The list of items to display
    selectedKeys: Set<string>; // Selected keys for this dropdown
    onSelectionChange: (keys: string[]) => void; // Handler to update selection
  }

export const MyDropdown: React.FC<DropdownProps> = ({ list, selectedKeys, onSelectionChange }) => {
    // Determine the text to display in the button
    const selectedValue = useMemo(() => {
      const selectedValues = Array.from(selectedKeys).map((key) => {
        const item = list.find((d) => d.key === key);
        return item ? item.value : '';
      });
  
      return selectedValues.length > 0 ? selectedValues.join(', ') : 'Nincs kiválasztva'; // Default fallback text
    }, [selectedKeys, list]);
  
    const handleSelectChange = (keys: string[]) => {
      onSelectionChange(keys);
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
            aria-label="Select Item"
            closeOnSelect={false}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            variant="flat"
            onSelectionChange={handleSelectChange}
          >
            {/* Render the items dynamically from the list */}
            {list.map((item) => (
              <DropdownItem key={item.key} value={item.key}>
                {item.value}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };