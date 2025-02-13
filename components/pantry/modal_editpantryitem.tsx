'use client'
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { MyPantrySearchBar } from './searchbar_pantry';
import { MyPantryDropdown } from './dropdown_measurements';
import { HeroCancel, HeroPlus, HeroSearch, HeroSettings, HeroTrash } from '../icons';
import { button as buttonStyles } from "@heroui/theme";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';

interface MyEditPantryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    ingredients: { key: number; value: string }[];
    measurements: { key: number; value: string }[];
    onEditItem: (ingredientId: number, quantity: number, measurementId: number) => void;
    onDeleteItem: (ingredientId: number) => void;
}


export const MyEditPantryModal: React.FC<MyEditPantryModalProps> = ({ isOpen, onOpenChange, ingredients, measurements, onEditItem, onDeleteItem }) => {
    const [ingredient, setIngredient] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [measurement, setMeasurement] = useState<number | null>(null);
    const [ingredientSearchOpen, setIngredientSearchOpen] = useState(true);
    const [error, setError] = useState('');

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "", });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "", });

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

    const handleEditItem = async () => {
        if (ingredient && quantity > 0 && measurement) {
            const editItem = {
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
                const res = await fetch('/api/pantry', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(editItem),
                });
                onEditItem(ingredient, quantity, measurement); // updating pantry table
                onOpenChange(false);
                if (res.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres módosítás",
                        description: "Recept módosítva",
                    });
                    setSuccessAlertVisible(true);
                }
            } catch (error) {
                console.error("Módosítás sikertelen:", error);
                onOpenChange(false);
                setDangerAlertContent({
                    title: "Sikertelen módosítás",
                    description: "A recept módosítása sikertelen. Próbálja újra.",
                });
                setDangerAlertVisible(true);
            }
        }
    };

    const handleDeleteItem = async () => {
        if (ingredient && quantity > 0 && measurement) {
            const deleteItem = {
                ingredient_id: ingredient
            };

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Bejelentkezés szükséges');
                    return;
                }
                const res = await fetch('/api/pantry', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(deleteItem),
                });
                onDeleteItem(ingredient); // deleting from pantry table
                onOpenChange(false);
                if (res.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres törlés",
                        description: "Recept törölve",
                    })
                    setSuccessAlertVisible(true);
                }
            } catch (error) {
                console.error("Törlés sikertelen:", error);
                onOpenChange(false);
                setDangerAlertContent({
                    title: "Sikertelen törlés",
                    description: "A recept törlése sikertelen. Próbálja újra.",
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
                            selectedKey={ingredient}
                            onSelectionChange={setIngredient}
                            isOpen={ingredientSearchOpen}
                            setIsOpen={(e) => setIngredientSearchOpen(e)}
                        />
                        <div className='flex items-center justify-center w-full space-x-4'>
                            <Input
                                value={String(quantity)}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                placeholder="Mennyiség"
                                type="number"
                                variant="bordered"
                            />
                            <MyPantryDropdown
                                list={measurements}
                                selectedKeys={new Set(measurement !== null ? [measurement] : [])}
                                onSelectionChange={(keys) => setMeasurement(keys ? keys[0] : null)}  // only take the first element or null
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "flat",
                        })} onPress={() => onOpenChange(false)}>
                            <HeroCancel /> Mégsem
                        </Button>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "shadow",
                            color: "primary",
                        })} onPress={handleEditItem}>
                            <HeroSettings /> Módosítás
                        </Button>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "shadow",
                            color: "primary",
                        })} onPress={handleDeleteItem}>
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