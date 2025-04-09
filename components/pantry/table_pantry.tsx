'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { Button, Input, ScrollShadow, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import { button as buttonStyles } from "@heroui/theme";
import { MyAddPantryModal } from "./modal_addpantryitem";
import { MyEditPantryModal } from "./modal_editpantryitem";
import { Ingredient } from "@/types";


interface MyPantryTableProps {
    pantryIngredients: Ingredient[];
    allIngredients: Ingredient[];
}


export const MyPantryTable: React.FC<MyPantryTableProps> = ({ pantryIngredients, allIngredients }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure(); // add modal form
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure(); // edit modal form
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [pantryItems, setPantryItems] = useState<Ingredient[]>(pantryIngredients);
    const [ingredients, setIngredients] = useState<Ingredient[]>(allIngredients);
    const [error, setError] = useState<string>('');

    const filteredPantryItems = pantryItems.filter((item) =>
        item.ingredient_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );


    const handleAddItem = (ingredientId: number, quantity: number) => {
        const selectedIngredient = ingredients.find((ing) => ing.ingredient_id === ingredientId);

        if (selectedIngredient) {
            const alreadyExistingItem = pantryItems.find(item => item.ingredient_id === ingredientId); // item is already in the list
            if (!alreadyExistingItem) {
                const newItem: Ingredient = {
                    ingredient_id: selectedIngredient.ingredient_id,
                    ingredient_name: selectedIngredient.ingredient_name,
                    ingredient_quantity: quantity,
                    ingredient_measurement: selectedIngredient.ingredient_measurement
                };
                try {
                    setPantryItems((prev) => [...prev, newItem]);
                    setError('');
                } catch (error) {
                    console.log('Add failed')
                }
            }
        }
    };

    const handleEditItem = (ingredientId: number, quantity: number) => {
        try {
            const ingredient = pantryItems.find(item => item.ingredient_id === ingredientId);
            if (ingredient) {
                setPantryItems((prevItems) =>
                    prevItems.map((item) =>
                        item.ingredient_id === ingredientId
                            ? { ...item, ingredient_quantity: quantity }
                            : item
                    )

                );
                setError('');
            }
        } catch (error) {
            console.log('Edit failed')
        }
    }


    const handleDeleteItem = (ingredientId: number) => {
        try {
            const ingredient = pantryItems.find(item => item.ingredient_id === ingredientId);
            if (ingredient) {
                setPantryItems((prevItems) => prevItems.filter((item) => item.ingredient_id !== ingredientId));
                setError('');
            }
        } catch (error) {
            console.log('Delete failed')
        }
    };


    const getKeyValue = (item: Ingredient, columnKey: string) => {
        switch (columnKey) {
            case "ingredient_name":
                return item.ingredient_name;
            case "ingredient_quantity":
                return item.ingredient_quantity;
            case "measurement_name":
                return item.ingredient_measurement;
            default:
                return '';
        }
    };

    useEffect(() => {
        setPantryItems(pantryIngredients);
        setIngredients(allIngredients);
    }, [pantryIngredients, allIngredients]);

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    return (
        <section className="flex justify-center w-full py-8">
            <div className="w-full mx-auto px-4 py-6 rounded-lg">
                <div className={subtitle({ class: "mt-4" })}>
                    Spájzom
                </div>
                <Input
                    className="form-control input py-2"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keresés..."
                    variant="bordered"
                />
                <div className="w-full border border-collapse rounded-xl">
                    <ScrollShadow className="max-h-[300px] overflow-y-auto" hideScrollBar>
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
                    </ScrollShadow>
                </div>
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
                        ingredients={ingredients} // all ingredients
                        onAddItem={handleAddItem} />
                    <MyEditPantryModal isOpen={isEditOpen} onOpenChange={onEditOpenChange}
                        ingredients={pantryItems}
                        onEditItem={handleEditItem} onDeleteItem={handleDeleteItem}
                    />
                </div>
            </div>
        </section>
    );
}