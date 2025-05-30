'use client'
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { MyPantrySearchBar } from './searchbar_pantry';
import { HeroCancel, HeroSettings, HeroTrash } from '../icons';
import { button as buttonStyles } from "@heroui/theme";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';
import { Ingredient } from '@/types';

interface MyEditPantryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    ingredients: Ingredient[];
    onEditItem: (ingredientId: number, quantity: number) => void;
    onDeleteItem: (ingredientId: number) => void;
}


export const MyEditPantryModal: React.FC<MyEditPantryModalProps> = ({ isOpen, onOpenChange, ingredients, onEditItem, onDeleteItem }) => {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [ingredientSearchOpen, setIngredientSearchOpen] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "", });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "", });

    useEffect(() => {
        if (!ingredient) return;
        setLoading(true);
        const fetchIngredient = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/pantry?id=${ingredient.ingredient_id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setQuantity(data.ingredient_quantity)
                } else {
                    setError(data.message || 'Az elem betöltése sikertelen');
                    return;
                }
            }
            catch (err) {
                setError('Something went wrong.');
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        }; fetchIngredient();
    }, [ingredient])

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (successAlertVisible) {
            timeout = setTimeout(() => {
                setSuccessAlertVisible(false);
            }, 3000);
        }
        if (dangerAlertVisible) {
            timeout = setTimeout(() => {
                setDangerAlertVisible(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [successAlertVisible, dangerAlertVisible]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // handle input <= 0 value
        const newValue = Number(e.target.value);
        if (newValue <= 0) {
            setError("A mennyiségnek 0-tól nagyobbnak kell lennie");
        } else {
            setError("");
        }
        setQuantity(newValue);
    };

    const handleEditItem = async () => {
        if (ingredient && quantity) {
            const editItem = {
                ingredient_id: ingredient.ingredient_id,
                ingredient_quantity: quantity,
            };

            try {
                const res = await fetch('/api/pantry', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(editItem),
                });
                const response = await res.json();
                onEditItem(ingredient.ingredient_id, quantity); 
                onOpenChange(false);
                if (res.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres módosítás",
                        description: "Összetevő módosítva",
                    });
                    setSuccessAlertVisible(true);
                }
                else if (response.message === 'Quantity cannot be zero') {
                    setError('A mennyiség nem lehet 0.')
                    setDangerAlertContent({
                        title: "Hibás adatok",
                        description: "A mennyiség nem lehet nulla.",
                    });
                    setDangerAlertVisible(true);
                } else if (response.message === 'No data to update') {
                    setDangerAlertContent({
                        title: "Az adatok megegyeznek",
                        description: "Módosítás nem történt",
                    });
                    setDangerAlertVisible(true);
                }
            } catch (error) {
                console.error("Módosítás sikertelen:", error);
                onOpenChange(false);
                setDangerAlertContent({
                    title: "Sikertelen módosítás",
                    description: "Az összetevő módosítása sikertelen. Próbálja újra.",
                });
                setDangerAlertVisible(true);
            }
        }
    };

    const handleDeleteItem = async () => {
        if (ingredient && quantity > 0) {
            const deleteItem = {
                ingredient_id: ingredient.ingredient_id
            };

            try {
                const res = await fetch('/api/pantry', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(deleteItem),
                });
                onDeleteItem(ingredient.ingredient_id);
                onOpenChange(false);
                if (res.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres törlés",
                        description: "Összetevő törölve a spájzból",
                    })
                    setSuccessAlertVisible(true);
                }
            } catch (error) {
                console.error("Törlés sikertelen:", error);
                onOpenChange(false);
                setDangerAlertContent({
                    title: "Sikertelen törlés",
                    description: "Az összetevő törlése sikertelen. Próbálja újra.",
                });
                setDangerAlertVisible(true);
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
                    <ModalHeader className="flex flex-col gap-1">Összetevő módosítása</ModalHeader>
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
                        })} onClick={handleEditItem}>
                            <HeroSettings /> Módosítás
                        </Button>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "shadow",
                            color: "primary",
                        })} onClick={handleDeleteItem}>
                            <HeroTrash /> Törlés
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {
                successAlertVisible && (
                    <MySuccessAlert
                        title={successAlertContent.title}
                        description={successAlertContent.description}
                    />
                )
            }
            {
                dangerAlertVisible && (
                    <MyDangerAlert
                        title={dangerAlertContent.title}
                        description={dangerAlertContent.description}
                    />
                )
            }
        </div >
    )

}