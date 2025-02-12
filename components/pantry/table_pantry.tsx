'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import { HeroCancel, HeroPlus, HeroSettings } from "../icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@heroui/theme";
import { Ingredient, Measurement } from "@/types";
import { MyPantrySearchBar } from "./searchbar_pantry";
import { MyPantryDropdown } from "./dropdown_measurements";
import { MyPantryModal } from "./modal_pantry";

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal form
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPantryItems = pantryIngredients.filter((item) =>
        item.ingredient_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const [ingredients, setIngredients] = useState<{key: number; value: string}[]>([]);
    const [measurements, setMeasurements] = useState<{ key: number; value: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ingredientsRes, measurementsRes] = await Promise.all([
                    fetch('/api/data?type=ingredients'),
                    fetch('/api/data?type=measurement')
                ]);
                setIngredients(await ingredientsRes.json());
                setMeasurements(await measurementsRes.json());
            } catch (error) {
                console.error('Dropdown adatok betöltése sikertelen:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddItem = (ingredientId: number, quantity: number, measurementId: number) => {
        const selectedIngredient = ingredients.find((ing) => ing.key === ingredientId);
        const selectedMeasurement = measurements.find((measure) => measure.key === measurementId);

        if (selectedIngredient && selectedMeasurement) {
            const newItem: PantryListItem = {
                ingredient_id: selectedIngredient.key,
                ingredient_name: selectedIngredient.value,
                ingredient_quantity: quantity,
                measurement_name: selectedMeasurement.value,
            };

            pantryIngredients.push(newItem);
            console.log('New item added:', newItem);
        }
    };

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
                    </TableHeader>
                    <TableBody items={filteredPantryItems}>
                        {(item) => (
                            <TableRow key={item.ingredient_id}>
                                <TableCell>{getKeyValue(item, "ingredient_name")}</TableCell>
                                <TableCell>{getKeyValue(item, "ingredient_quantity")} {getKeyValue(item, "measurement_name")}</TableCell>
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
                    <Button className={buttonStyles({ variant: "bordered", radius: "full" })} onPress={onOpen}>
                        <HeroPlus /> Hozzáadás
                    </Button>
                    <MyPantryModal isOpen={isOpen} onOpenChange={onOpenChange}
                        ingredients={ingredients} measurements={measurements}
                        onAddItem={handleAddItem} />
                </div>
            </div>
        </section>
    );
}