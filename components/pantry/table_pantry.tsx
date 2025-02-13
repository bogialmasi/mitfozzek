'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import { button as buttonStyles } from "@heroui/theme";
import { MyAddPantryModal } from "./modal_addpantryitem";
import { MyDangerAlert } from "../recipe/alert_danger";
import { MySuccessAlert } from "../recipe/alert_success";
import { MyEditPantryModal } from "./modal_editpantryitem";

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


    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure(); // add modal form
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure(); // edit modal form
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
    
    useEffect(() => {
        console.log("Success alert visibility changed:", successAlertVisible);
    }, [successAlertVisible]);

    useEffect(() => {
        console.log("Danger alert visibility changed:", dangerAlertVisible);
    }, [dangerAlertVisible]);

    const handleAddItem = (ingredientId: number, quantity: number, measurementId: number) => {
        console.log('handleAddItem')
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
                    console.log('Add successful')
                    setSuccessAlertContent({
                        title: `Sikeres hozzáadás`,
                        description: `${selectedIngredient.value} sikeresen hozzáadva a spájzhoz`,
                    });
                    setSuccessAlertVisible(true);
                } catch (error) {
                    console.log('Add failed')
                    setDangerAlertContent({
                        title: "Hiba történt",
                        description: "Az összetevő hozzáadása sikertelen. Próbálja újra.",
                    });
                    setDangerAlertVisible(true);
                }
            }
        }
    };

    const handleEditItem = (ingredientId: number, quantity: number, measurementId: number) => {
        console.log('handleEditItem')
        try {
            const ingredient = pantryItems.find(item => item.ingredient_id === ingredientId);
            if (ingredient) {
                setPantryItems((prevItems) =>
                    prevItems.map((item) =>
                        item.ingredient_id === ingredientId
                            ? { ...item, ingredient_quantity: quantity, measurement_id: measurementId }
                            : item
                    )

                );
                setError('');
                console.log('Edit successful')
                setSuccessAlertContent({
                    title: `Sikeres módosítás`,
                    description: `${ingredient.ingredient_name} módosítva: ${ingredient.ingredient_quantity} ${ingredient.measurement_name}`,
                });
                setSuccessAlertVisible(true);
            }
        } catch (error) {
            console.log('Edit failed')
            setDangerAlertContent({
                title: "Hiba történt",
                description: "Az összetevő módosítása sikertelen. Próbálja újra.",
            });
            setDangerAlertVisible(true);
        }
    }


    const handleDeleteItem = (ingredientId: number) => {
        console.log('handleDeleteItem')
        try {
            const ingredient = pantryItems.find(item => item.ingredient_id === ingredientId);
            if (ingredient) {
                setPantryItems((prevItems) => prevItems.filter((item) => item.ingredient_id !== ingredientId));
                setError('');
                console.log('Delete successful')
                setSuccessAlertContent({
                    title: `Sikeres törlés`,
                    description: `${ingredient.ingredient_name} (${ingredient.ingredient_quantity} ${ingredient.measurement_name}) törölve`,
                });
                setSuccessAlertVisible(true);
            }
        } catch (error) {
            console.log('Delete failed')
            setDangerAlertContent({
                title: "Hiba történt",
                description: "Az összetevő törlés sikertelen. Próbálja újra.",
            });
            setDangerAlertVisible(true);
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
                    <Button className={buttonStyles({ variant: "bordered", radius: "full" })}
                        onPress={onEditOpen}>
                        <HeroSettings /> Spájz módosítása
                    </Button>
                    <Button className={buttonStyles({ variant: "bordered", radius: "full" })}
                        onPress={onAddOpen}>
                        <HeroPlus /> Hozzáadás
                    </Button>
                    <MyAddPantryModal isOpen={isAddOpen} onOpenChange={onAddOpenChange}
                        ingredients={ingredients} measurements={measurements}
                        onAddItem={handleAddItem} />
                    <MyEditPantryModal isOpen={isEditOpen} onOpenChange={onEditOpenChange}
                        ingredients={
                            pantryItems.map(item => ({
                                key: item.ingredient_id,
                                value: item.ingredient_name,
                            }))
                        } measurements={measurements}
                        onEditItem={handleEditItem} onDeleteItem={handleDeleteItem}
                    />
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