import { useState, useEffect } from 'react';
import { MyDangerAlert } from '@/components/recipe/alert_danger';
import { MySuccessAlert } from '@/components/recipe/alert_success';
import { useAuthentication } from '@/app/context/authenticationContext';
import { button as buttonStyles } from "@heroui/theme";
import { useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { HeroEmptyHeart } from '../icons';

interface MyAddToFavoritesProps {
    recipeId: number;
}

export const MyAddToFavoritesButton: React.FC<MyAddToFavoritesProps> = ({ recipeId }) => {
    const { user } = useAuthentication();
    const { onOpen } = useDisclosure(); // Modal control
    const [isAdding, setIsAdding] = useState(false); // To manage loading state
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

    const handleFavorites = async () => {
        if (!user) {
            onOpen(); // Open login modal if the user is not logged in
            return;
        }

        const userId = user.userId;

        if (!userId || !recipeId) {
            console.error('Missing userId or recipeId');
            return;
        }

        setIsAdding(true);

        try {
            const response = await fetch('/api/favrecipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ userId, recipeId }),
            });

            const result = await response.json();

            if (response.ok && result.message === "Item added to favorites") {
                setSuccessAlertContent({
                    title: "Sikeres mentés",
                    description: "Recept elmentve a kedvencek közé",
                });
                setSuccessAlertVisible(true);
            } else {
                setDangerAlertContent({
                    title: "Sikertelen mentés",
                    description: "A recept mentése sikertelen. Próbálja újra.",
                });
                setDangerAlertVisible(true);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setDangerAlertContent({
                title: "Sikertelen mentés",
                description: "A hálózati hiba miatt a recept mentése sikertelen.",
            });
            setDangerAlertVisible(true);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div>
            <Button
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                onPress={handleFavorites}
            >
                <HeroEmptyHeart />Recept elmentése a kedvencek közé
                {/* If succesful save -> HeroFilledHeart*/}
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
};