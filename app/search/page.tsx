'use client'
import React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export default function SearchPage() {
  // Előételek, Főételek, Desszertek stb. list
  const [selectedKeysDish, setSelectedKeysDish] = React.useState(new Set());

  const selectedValueDish = React.useMemo(() => {
    const selectedArray = Array.from(selectedKeysDish);
    return selectedArray.length > 0
      ? selectedArray.join(", ").replaceAll("_", " ")
      : "Bármilyen";  // Fallback if no selection
  }, [selectedKeysDish]);
  
  const handleSelectChangeDish = (keys) => {
    setSelectedKeysDish(new Set(keys));
  };

  // Vegan, Vegeratian
  const [selectedKeysMeat, setSelectedKeysMeat] = React.useState(new Set(["Vegán, Vegetariánus?"]));
  const selectedValueMeat = React.useMemo(
    () => Array.from(selectedKeysMeat).join(", ").replace(/_/g, ""),
    [selectedKeysMeat],
  );

  // Food Sensitivity
  const [selectedKeysSensitivity, setSelectedKeysSensitivity] = React.useState(new Set());

  const selectedValueSensitivity = React.useMemo(() => {
    const selectedArray = Array.from(selectedKeysSensitivity);
    return selectedArray.length > 0
      ? selectedArray.join(", ").replaceAll("_", " ")
      : "Nincs ételérzékenység";  // Fallback if no selection
  }, [selectedKeysSensitivity]);
  
  const handleSelectChangeSensitivity = (keys) => {
    setSelectedKeysSensitivity(new Set(keys));
  };

  return (
    <Form className="">
      <div className="inline-block max-w-xl text-center justify-center gap-6">
        <h1 className={title()}>Receptek keresése</h1>
      </div>
      <Input
        className="form-control input gap-6"
        labelPlacement="outside"
        name="search"
        placeholder="Keressen rá receptek címére, vagy hozzávalóra..."
        type="text"
        variant="bordered"
      />

      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {selectedValueDish}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          closeOnSelect={false}
          selectedKeys={selectedKeysDish}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={handleSelectChangeDish}
        >
          <DropdownItem key="előételek">Előételek</DropdownItem>
          <DropdownItem key="levesek">Levesek</DropdownItem>
          <DropdownItem key="főételek">Főételek</DropdownItem>
          <DropdownItem key="saláták">Saláták</DropdownItem>
          <DropdownItem key="desszertek">Desszertek</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {selectedValueSensitivity}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          closeOnSelect={false}
          selectedKeys={selectedKeysSensitivity}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={handleSelectChangeSensitivity}
        >
          <DropdownItem key="Gluténérzékenység">Gluténérzékenység</DropdownItem>
          <DropdownItem key="Laktózérzékenység">Laktózérzékenység</DropdownItem>
          <DropdownItem key="Diabetikus">Diabetikus</DropdownItem>
          <DropdownItem key="Mogyoróallergia">Mogyoróallergia</DropdownItem>
          <DropdownItem key="Tojásallergia">Tojásallergia</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {selectedValueMeat}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          selectedKeys={selectedKeysMeat}
          selectionMode="single"
          variant="flat"
          onSelectionChange={setSelectedKeysMeat}
        >
          <DropdownItem key="húsos">Húsos fogások</DropdownItem>
          <DropdownItem key="vegetariánus">Vegetariánus fogások</DropdownItem>
          <DropdownItem key="vegán">Vegán ételek</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button type="submit" className="btn btn-primary mb-2 justify-center">Keresés</Button>
    </Form>
  );
}
