'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@heroui/theme";
import { MyPantryModal } from "./modal_pantry";
import { MyDangerAlert } from "../recipe/alert_danger";
import { MySuccessAlert } from "../recipe/alert_success";

interface PantryItem {
    ingredient_id: number;
    ingredient_name: string;
    ingredient_quantity: number;
    measurement_name: string;
}

interface MyPantryTableProps {
    pantryIngredients: PantryItem[];
}


export const MyPantryTable: React.FC<MyPantryTableProps> = ({ pantryIngredients: pantryIngredients }) => {

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "", });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "", });


    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal form
    const [searchQuery, setSearchQuery] = useState('');
    const [pantryItems, setPantryItems] = useState<PantryItem[]>(pantryIngredients);
    const [error, setError] = useState<string>('');

    const filteredPantryItems = pantryItems.filter((item) =>
        item.ingredient_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );


    const [ingredients, setIngredients] = useState<{ key: number; value: string }[]>([]);
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
            const alreadyExistingItem = pantryItems.find(item => item.ingredient_id === ingredientId); // item is already in the list
            if (alreadyExistingItem) {
                setDangerAlertContent({
                    title: `${selectedIngredient.value} már van a spájzban`,
                    description: `${selectedIngredient.value}, ${alreadyExistingItem.ingredient_quantity} ${alreadyExistingItem.measurement_name}`,
                });
                setDangerAlertVisible(true);
            }
            else {
                const newItem: PantryItem = {
                    ingredient_id: selectedIngredient.key,
                    ingredient_name: selectedIngredient.value,
                    ingredient_quantity: quantity,
                    measurement_name: selectedMeasurement.value,
                };
                try {
                    setPantryItems((prev) => [...prev, newItem]);
                    setError('');
                    setSuccessAlertContent({
                        title: `Sikeres hozzáadás`,
                        description: `${selectedIngredient.value} sikeresen hozzáadva a spájzhoz`,
                    });
                    setSuccessAlertVisible(true);
                } catch (error) {
                    setDangerAlertContent({
                        title: "Hiba történt",
                        description: "Az összetevő hozzáadása sikertelen. Próbálja újra.",
                    });
                    setDangerAlertVisible(true);
                }
            }
        }
    };

    const getKeyValue = (item: PantryItem, columnKey: string) => {
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
                {successAlertVisible && (
                    <MySuccessAlert
                        title={successAlertContent.title}
                        description={successAlertContent.description}
                    />
                )}
                {dangerAlertVisible && (
                    <MyDangerAlert
                        title={dangerAlertContent.title}
                        description={dangerAlertContent.description}
                    />
                )}
            </div>
        </section>
    );
}