'use client'
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";

import { HeroCancel, HeroPlus } from '../icons';
import { button as buttonStyles } from "@heroui/theme";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';
// import { MyPantryDropdown } from '../pantry/dropdown_measurements';
import { MyPantrySearchBar } from '../pantry/searchbar_pantry';
import { Ingredient } from '@/types';

interface MyAddNewRecipeIngredientsModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    ingredients: Ingredient[];
    onAddItem: (ingredientId: number, quantity: number) => void;
}

export const MyAddRecipeIngredientsModal: React.FC<MyAddNewRecipeIngredientsModalProps> = ({ isOpen, onOpenChange, ingredients, onAddItem }) => {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [ingredientSearchOpen, setIngredientSearchOpen] = useState(true);
    const [error, setError] = useState<string>('');

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "", });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "", });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // handle input <= 0 value
        const newValue = Number(e.target.value);
        if (newValue <= 0) {
            console.log('invalid value input')
            setError("A mennyiségnek 0-tól nagyobbnak kell lennie");
        } else {
            setError("");
        }
        setQuantity(newValue);
    };

    const handleAddItem = () => {
        if (!ingredient || !quantity) {
            setError('Minden mező kitöltése kötelező');
            return;
        }
        if (quantity <= 0) {
            setError('A mennyiségnek 0-nál nagyobbnak kell lennie');
            return;
        }
        if (ingredient && quantity > 0) {
            const newItem = {
                ingredient_id: ingredient.ingredient_id,
                ingredient_quantity: quantity
            };
            onAddItem(newItem.ingredient_id, newItem.ingredient_quantity);
            setError('');
            onOpenChange(false);
            setSuccessAlertContent({
                title: 'Siker!',
                description: 'Az összetevő sikeresen hozzáadva a recepthez.',
            });
            setSuccessAlertVisible(true);
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
                                console.log('Selected:', selectedIng);
                                setIngredient(selectedIng);
                            }}
                            isOpen={ingredientSearchOpen}
                            setIsOpen={(e) => setIngredientSearchOpen(e)}
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
