'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { MyPantrySearchBar } from './searchbar_pantry';
import { MyPantryDropdown } from './dropdown_measurements';
import { HeroCancel, HeroPlus } from '../icons';

interface MyPantryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    ingredients: { key: number; value: string }[];
    measurements: { key: number; value: string }[];
    onAddItem: (ingredientId: number, quantity: number, measurementId: number) => void;
}

export const MyPantryModal: React.FC<MyPantryModalProps> = ({ isOpen, onOpenChange, ingredients, measurements, onAddItem }) => {
    const [ingredient, setIngredient] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [measurement, setMeasurement] = useState<number | null>(null);
    const [ingredientSearchOpen, setIngredientSearchOpen] = useState(true);
    const [error, setError] = useState('');

    const handleAddItem = async () => {
        if (ingredient && quantity > 0 && measurement) {
            const newItem = {
                ingredient_id: ingredient,
                ingredient_quantity: quantity,
                measurement_id: measurement,
            };

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Bejelentkezés szükséges');
                    return;
                }
                const response = await fetch('/api/pantry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(newItem),
                });

                if (response.ok) {
                    console.log("Sikeresen hozzáadva");
                    onOpenChange(false);
                } else {
                    console.error("Hozzáadás sikertelen");
                }
            } catch (error) {
                console.error("Hozzáadás sikertelen:", error);
            }
        }
    };


    return (
        <Modal isOpen={isOpen} placement="top-center"
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            onOpenChange={(open) => onOpenChange(open)}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Add Ingredient</ModalHeader>
                <ModalBody>
                    <MyPantrySearchBar
                        list={ingredients}
                        selectedKey={ingredient}
                        onSelectionChange={setIngredient}
                        isOpen={ingredientSearchOpen}
                        setIsOpen={(e) => setIngredientSearchOpen(e)}
                    />
                    <Input
                        value={String(quantity)}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        label="Quantity"
                        type="number"
                        variant="bordered"
                    />
                    <MyPantryDropdown
                        list={measurements}
                        selectedKeys={new Set(measurement !== null ? [measurement] : [])}
                        onSelectionChange={(keys) => setMeasurement(keys ? keys[0] : null)}  // only take the first element or null
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="bordered" onPress={() => onOpenChange(false)}>
                        <HeroCancel /> Mégsem
                    </Button>
                    <Button variant='flat' onPress={handleAddItem}>
                        <HeroPlus /> Hozzáadás
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
