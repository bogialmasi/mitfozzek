'use client'

import { subtitle } from "@/components/primitives";
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";

/*

this will be a list within /profile, where the user can add and remove ingredients (from the ingredients list)
the ADD button should have a popup (modal) on which the user can select which ingredients to add and write how many of that
the DELETE and CHANGE QUANTITY should work as an options menu when clicking on the item.

*/
interface PantryItem {
    ingredient_name: string,
    ingredient_quantity: number,
    measurement_name: string
}

interface MyPantryProps {
    userId: number; // User ID passed from ProfilePage
}


export const MyPantry = ({ userId }: MyPantryProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addPantryItem = (event: React.FormEvent) => {
            event.preventDefault();}

    const [pantryItems, setPantryItems] = useState<PantryItem[]>([
        { ingredient_name: 'Tej', ingredient_quantity: 1000, measurement_name: 'ml' },
        { ingredient_name: 'Tojás', ingredient_quantity: 10, measurement_name: 'db' },
        { ingredient_name: 'Liszt', ingredient_quantity: 500, measurement_name: 'g' },
        { ingredient_name: 'Só', ingredient_quantity: 10, measurement_name: 'g' },
        { ingredient_name: 'Alma', ingredient_quantity: 5000, measurement_name: 'g' },
        { ingredient_name: 'Brokkoli', ingredient_quantity: 400, measurement_name: 'g' },
        { ingredient_name: 'Kenyér', ingredient_quantity: 500, measurement_name: 'g' },
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPantryData = async () => {
            const response = await fetch(`/api/pantry?user_id=${userId}`);
            const data = await response.json();
            //setPantryItems(data); this works with example.ts but to add new items i make the list instead
            setLoading(false);
        };

        fetchPantryData();
    }, [userId]); // Re-fetch pantry items if userId changes

    if (loading) {
        return <div>Loading pantry...</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-lg h-[90vh] flex flex-col">
                <div className="p-4 border-b border-gray-300 justify-center">
                    <div className={subtitle({ class: "mt-4" })}>Spájzom</div>
                    <input
                        type="text"
                        placeholder="Keresés a hozzávalók között..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {pantryItems.map((item, index) => (
                            <li key={index} className="p-2 bg-white rounded-md shadow-sm">
                                {item.ingredient_name}, {item.ingredient_quantity} {item.measurement_name}
                            </li>
                        ))}
                    </ul>
                </div>
                    <div className="p-4 border-t border-gray-300 flex justify-center">
                        <Button onPress={onOpen}>Új összetevő hozzáadása</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Új összetevő hozzáadása</ModalHeader>
                                        <ModalBody>
                                            <p>
                                                Adja meg a hozzáadni kívánt összetevőt, és annak mennyiségét!
                                            </p>
                                            <Form onSubmit={addPantryItem}>
                                                <Input
                                                placeholder="Összetevő neve"
                                                labelPlacement="outside"
                                                name="ingredient_name"
                                                type="text">
                                                </Input>
                                                <div className="flex space-x-2">
                                                <Input
                                                className="p-1"
                                                placeholder="Mennyiség"
                                                labelPlacement="outside"
                                                name="ingredient_quantity"
                                                type="number">
                                                </Input>
                                                <Input
                                                className="p-1"
                                                placeholder="Mérték"
                                                labelPlacement="outside"
                                                name="measurement_name"
                                                type="text">
                                                </Input>
                                                </div>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Mégse
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Hozzáadás
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
    );
}
