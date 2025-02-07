'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { getKeyValue, Input, Listbox, ListboxItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@heroui/theme";

interface PantryListItem {
    ingredient_id: number;
    ingredient_name: string;
    ingredient_quantity: number;
    measurement_name: string;
}

interface MyPantryListProps {
    pantryIngredients: PantryListItem[];
}


export const MyPantryList: React.FC<MyPantryListProps> = ({ pantryIngredients }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPantryItems = pantryIngredients.filter((item) =>
        item.ingredient_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );


    const getKeyValue = (item: PantryListItem, columnKey: string) => {
        switch (columnKey) {
            case "ingredient_name":
                return item.ingredient_name;
            case "ingredient_quantity":
                return item.ingredient_quantity;
            case "measurement_name":
                return item.measurement_name;
            default:
                return '';
        }
    };

    return (
        <section className="flex justify-center w-full py-8">
            <div className="w-full max-w-md mx-auto px-4 py-6 rounded-lg">
                <div className={subtitle({ class: "mt-4" })}>
                    Spájzom
                </div>
                <Input
                    className="form-control input max-w-md py-2"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keresés..."
                    variant="bordered"
                />
                <Table aria-label="Spájzom">
                    <TableHeader>
                        <TableColumn>Hozzávaló</TableColumn>
                        <TableColumn>Mennyiség</TableColumn>
                        <TableColumn>Mértékegység</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredPantryItems}>
                        {(item) => (
                            <TableRow key={item.ingredient_id}>
                                <TableCell>{getKeyValue(item, "ingredient_name")}</TableCell>
                                <TableCell>{getKeyValue(item, "ingredient_quantity")}</TableCell>
                                <TableCell>{getKeyValue(item, "measurement_name")}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="py-4 flex justify-center space-x-4">
                    <Link
                        className={buttonStyles({ variant: "bordered", radius: "full" })}
                        href={siteConfig.profileMenuItems.modifyPantry}
                    >
                        <HeroSettings /> Spájz módosítása
                    </Link>
                    <Link
                        className={buttonStyles({ variant: "bordered", radius: "full" })}
                        href={siteConfig.profileMenuItems.modifyPantry}
                    >
                        <HeroPlus /> Hozzáadás
                    </Link>
                </div>
            </div>
        </section>
    );
}