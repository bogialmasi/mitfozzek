import { useState } from 'react';
import { MyDangerAlert } from '@/components/alert/alert_danger';
import { MySuccessAlert } from '@/components/alert/alert_success';
import { button as buttonStyles } from "@heroui/theme";
import { Button } from '@heroui/button';
import { ShoppingIngredient } from '@/types';

interface MyAddToPantryProps {
    ingredients: ShoppingIngredient[]
}

export const MyAddToPantryButton: React.FC<MyAddToPantryProps> = ({ ingredients }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

    const handleAddItem = async (ing: ShoppingIngredient) => {
        const newItem = {
            ingredient_id: ing.ingredient_id,
            ingredient_quantity: ing.ingredient_quantity
        };

        try {
            const res = await fetch('/api/pantry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newItem),
            });

            const response = await res.json();
            if (res.ok) {
                setSuccessAlertContent({
                    title: 'Sikeres hozzáadás',
                    description: "A bevásárlólista elemei bekerültek a spájzba",
                });
                setSuccessAlertVisible(true);
            } else if (response.message === 'Item already exists in pantry') {
                setSuccessAlertContent({
                    title: "Néhány összetevő már benne van a spájzban",
                    description: "Ezen összetevők újbóli hozzáadása nem szükséges.",
                });
                setSuccessAlertVisible(true);
            }
        } catch (error) {
            console.error("Hozzáadás sikertelen:", error);
            setDangerAlertContent({
                title: "Hiba történt",
                description: "Az összetevő hozzáadása sikertelen. Próbálja újra.",
            });
            setDangerAlertVisible(true);
        }
    };

    const handleAddAllItems = async () => {
        setIsAdding(true);
        for (const ingredient of ingredients) {
            await handleAddItem(ingredient);
        }
        setIsAdding(false);
    };

    return (
        <div className='w-full'>
            <Button
                className={`${buttonStyles({ variant: "ghost", radius: "full", color: "default" })} w-full`}
                onClick={handleAddAllItems}
                disabled={isAdding}
            >
                Hozzávalók felvétele a spájzba
            </Button>
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
}