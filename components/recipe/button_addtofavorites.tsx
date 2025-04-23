import { useState } from 'react';
import { MyDangerAlert } from '@/components/alert/alert_danger';
import { MySuccessAlert } from '@/components/alert/alert_success';
import { useAuthentication } from '@/app/context/authenticationContext';
import { button as buttonStyles } from "@heroui/theme";
import { useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { HeroEmptyHeart } from '../icons';
import { MyLoginModal } from '../login_check/modal_login';

interface MyAddToFavoritesProps {
    recipeId: number;
}

export const MyAddToFavoritesButton: React.FC<MyAddToFavoritesProps> = ({ recipeId }) => {
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); 
    const [isAdding, setIsAdding] = useState<boolean>(false); 
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

    const handleFavorites = async () => {
        if (!user) {
            onOpen();
        }
        else {
            const userId = user.userId;

            if (userId === null || userId === undefined || !recipeId) {
                console.error('Missing userId or recipeId');
                return;
            }

            setIsAdding(true);

            try {
                const response = await fetch('/api/favrecipes', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ userId, recipeId }),
                });

                const result = await response.json();
                if (response.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres mentés",
                        description: "Recept elmentve a kedvencek közé",
                    });
                    setSuccessAlertVisible(true);
                } else {
                    if (result.message === 'Item already in favorites') {
                        setSuccessAlertContent({
                            title: "Ez a recept a kedvencek között van",
                            description: "A recept már korábban a kedvencek közé került.",
                        });
                        setSuccessAlertVisible(true);
                    } else {
                        setDangerAlertContent({
                            title: "Sikertelen mentés",
                            description: "A recept mentése sikertelen. Próbálja újra.",
                        });
                        setDangerAlertVisible(true);
                    }
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
        }
    };

    return (
        <div>
            <Button
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                onClick={handleFavorites}
                disabled={isAdding}
            >
                <HeroEmptyHeart />Recept elmentése a kedvencek közé
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
            <MyLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
};