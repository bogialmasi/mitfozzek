import { useState } from 'react';
import { MyDangerAlert } from '@/components/alert/alert_danger';
import { MySuccessAlert } from '@/components/alert/alert_success';
import { useAuthentication } from '@/app/context/authenticationContext';
import { button as buttonStyles } from "@heroui/theme";
import { useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { HeroCheck, HeroShoppingCart } from '../icons';
import { MyLoginModal } from '../login_check/modal_login';
import { Input } from '@heroui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Recipe } from '@/types';

interface MyAddToShoppingProps {
    recipe: Recipe;
}

export const MyAddToShoppingButton: React.FC<MyAddToShoppingProps> = ({ recipe }) => {
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control
    const [isAdding, setIsAdding] = useState(false); // To manage loading state
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });
    const [shoppingName, setShoppingName] = useState(recipe.recipe_name);

    const handleFavorites = async () => {
        if (!user) {
            onOpen();
        }
        else {
            const userId = user.userId;

            if (!userId || !recipe.recipe_id) {
                console.error('Missing userId or recipeId');
                return;
            }
            setIsAdding(true);
            try {
                const response = await fetch('/api/shopping', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ "recipe_id": recipe.recipe_id, "shopping_name": shoppingName }),
                });

                const result = await response.json();
                console.log(result);
                if (response.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres mentés",
                        description: "Recept összetevői elmentve bevásárlólistaként",
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

            <Popover showArrow offset={10} placement="bottom">
                <PopoverTrigger>
                    <Button
                        className={buttonStyles({ variant: "bordered", radius: "full" })}
                        disabled={isAdding}
                    >
                        <HeroShoppingCart />Bevásárlólista készítése az összetevőkból
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                            <p className="text-small font-bold text-foreground" {...titleProps}>
                                Bevásárlólista neve:
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                                <Input
                                    defaultValue={recipe.recipe_name}
                                    value={shoppingName}
                                    onChange={(e) => setShoppingName(e.target.value)}
                                    size="sm"
                                    variant="bordered"
                                    type='text'
                                    isRequired />
                                <Button
                                    className={buttonStyles({ variant: "bordered", radius: "full" })}
                                    disabled={isAdding}
                                    onClick={handleFavorites}>
                                    Mentés <HeroCheck />
                                </Button>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
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