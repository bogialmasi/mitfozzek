'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { MyPantrySearchBar } from './searchbar_pantry';
import { HeroCancel, HeroPlus } from '../icons';
import { button as buttonStyles } from "@heroui/theme";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';
import { Ingredient } from '@/types';

interface MyAddPantryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    ingredients: Ingredient[];
    onAddItem: (ingredientId: number, quantity: number) => void;
}

export const MyAddPantryModal: React.FC<MyAddPantryModalProps> = ({ isOpen, onOpenChange, ingredients, onAddItem }) => {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [ingredientSearchOpen, setIngredientSearchOpen] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "", });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "", });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // handle input <= 0 value
        const newValue = Number(e.target.value);
        if (newValue <= 0) {
            setError("A mennyiségnek 0-tól nagyobbnak kell lennie");
        } else {
            setError("");
        }
        setQuantity(newValue);
    };

    const handleAddItem = async () => {
        if (ingredient && quantity > 0) {
            const newItem = {
                ingredient_id: ingredient.ingredient_id, 
                ingredient_quantity: quantity,
                ingredient_measurement: ingredient.ingredient_measurement
            };

            try {
                const res = await fetch('/api/pantry', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(newItem),
                });
                const response = await res.json();
                onAddItem(ingredient.ingredient_id, quantity);
                onOpenChange(false);
                if (res.ok) {
                    setSuccessAlertContent({
                        title: 'Sikeres hozzáadás',
                        description: `Új összetevő sikeresen hozzáadva`,
                    })
                    setSuccessAlertVisible(true)
                } else if (response.message === 'Item already exists in pantry') {
                    setSuccessAlertContent({
                        title: "Már van ilyen összetevő a spájzban",
                        description: "Az újbóli hozzáadás nem szükséges.",
                    })
                    setSuccessAlertVisible(true)
                }
            } catch (error) {
                console.error("Hozzáadás sikertelen:", error);
                onOpenChange(false);
                setDangerAlertContent({
                    title: "Hiba történt",
                    description: "Az összetevő hozzáadása sikertelen. Próbálja újra.",
                })
                setDangerAlertVisible(true)
            }
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} placement="top-center"
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                onOpenChange={(open) => onOpenChange(open)}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Összetevő hozzáadása</ModalHeader>
                    <ModalBody>
                        <MyPantrySearchBar
                            list={ingredients}
                            onSelectionChange={(key: number) => {
                                const selectedIng = ingredients.find(ing => ing.ingredient_id === key) || null;
                                setIngredient(selectedIng);
                            }}
                            isOpen={ingredientSearchOpen}
                            setIsOpen={setIngredientSearchOpen}
                        />
                        <div className='flex items-center justify-center w-full space-x-4'>
                            <Input
                                value={String(quantity)}
                                onChange={handleChange}
                                placeholder="Mennyiség"
                                type="number"
                                variant="bordered"
                                endContent={
                                    ingredient && (
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">{ingredient.ingredient_measurement}</span>
                                        </div>)
                                }
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "flat",
                        })} onClick={() => onOpenChange(false)}>
                            <HeroCancel /> Mégsem
                        </Button>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "shadow",
                            color: "primary",
                        })} onClick={handleAddItem}>
                            <HeroPlus /> Hozzáadás
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
    );
};
