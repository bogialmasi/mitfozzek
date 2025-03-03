'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import { button as buttonStyles } from "@heroui/theme";
import { MyAddPantryModal } from "./modal_addpantryitem";
import { MyEditPantryModal } from "./modal_editpantryitem";
import { PantryItem } from "@/types";


interface MyPantryTableProps {
    pantryIngredients: PantryItem[];
}


export const MyPantryTable: React.FC<MyPantryTableProps> = ({ pantryIngredients: pantryIngredients }) => {
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
                const [ingredientsRes, measurementsRes] = await Promise.all([
                    fetch('/api/data?type=ingredients'),
                    fetch('/api/data?type=measurement')
                ]);
                setIngredients(await ingredientsRes.json());
                setMeasurements(await measurementsRes.json());
            } catch (error) {
                console.error('Dropdown adatok betöltése sikertelen:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddItem = (ingredientId: number, quantity: number, measurementId: number) => {
        console.log('handleAddItem')
        const selectedIngredient = ingredients.find((ing) => ing.key === ingredientId);
        const selectedMeasurement = measurements.find((measure) => measure.key === measurementId);

        if (selectedIngredient && selectedMeasurement) {
            const alreadyExistingItem = pantryItems.find(item => item.ingredient_id === ingredientId); // item is already in the list
            if (!alreadyExistingItem) {
                const newItem: PantryItem = {
                    ingredient_id: selectedIngredient.key,
                    ingredient_name: selectedIngredient.value,
                    ingredient_quantity: quantity,
                    measurement_id: selectedMeasurement.key,
                    measurement_name: selectedMeasurement.value,
                };
                try {
                    setPantryItems((prev) => [...prev, newItem]);
                    setError('');
                    console.log('Add successful')
                } catch (error) {
                    console.log('Add failed')
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
            }
        } catch (error) {
            console.log('Edit failed')
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
            }
        } catch (error) {
            console.log('Delete failed')
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

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

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
                        onClick={onEditOpen}>
                        <HeroSettings /> Spájz módosítása
                    </Button>
                    <Button className={buttonStyles({ variant: "bordered", radius: "full" })}
                        onClick={onAddOpen}>
                        <HeroPlus /> Hozzáadás
                    </Button>
                    <MyAddPantryModal isOpen={isAddOpen} onOpenChange={onAddOpenChange}
                        ingredients={ingredients} measurements={measurements} // all ingredients
                        onAddItem={handleAddItem} />
                    <MyEditPantryModal isOpen={isEditOpen} onOpenChange={onEditOpenChange}
                        ingredients={ // only the ingredients from pantry, formatted
                            pantryItems.map(item => ({
                                key: item.ingredient_id,
                                value: item.ingredient_name,
                            }))
                        } measurements={measurements}
                        onEditItem={handleEditItem} onDeleteItem={handleDeleteItem}
                    />
                </div>
            </div>
        </section>
    );
}