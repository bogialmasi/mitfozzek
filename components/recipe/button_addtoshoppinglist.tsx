import { useState } from 'react';
import { MyDangerAlert } from '@/components/alert/alert_danger';
import { MySuccessAlert } from '@/components/alert/alert_success';
import { useAuthentication } from '@/app/context/authenticationContext';
import { button as buttonStyles } from "@heroui/theme";
import { useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { HeroShoppingCart } from '../icons';
import { MyLoginModal } from '../login_check/modal_login';
import { Input } from '@heroui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Recipe } from '@/types';

interface MyAddToShoppingProps {
    recipe: Recipe;
    headcount: number;
}

export const MyAddToShoppingButton: React.FC<MyAddToShoppingProps & { headcount: number }> = ({ recipe, headcount }) => {
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control
    const [isAdding, setIsAdding] = useState<boolean>(false); // To manage loading state
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });
    const [shoppingName, setShoppingName] = useState(recipe.recipe_name);

    const handleAddShopping = async (addValue: string) => {
        if (!user) {
            onOpen();
        }
        else {
            const userId = user.userId;

            if (userId === null || userId === undefined || !recipe.recipe_id) {
                console.error('Missing userId or recipeId');
                return;
            }

            try {
                setIsAdding(true);

                const response = await fetch('/api/shopping', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        "recipe_id": recipe.recipe_id,
                        "shopping_name": shoppingName,
                        "add_all": addValue,
                        "headcount": headcount,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    setSuccessAlertContent({
                        title: "Sikeres mentés",
                        description: "Recept összetevői elmentve bevásárlólistaként",
                    });
                    setSuccessAlertVisible(true);
                } else {
                    if (result.message === 'All ingredients are already in the pantry') {
                        setSuccessAlertContent({
                            title: "Már minden hozzávaló a spájzban van",
                            description: "Nincs szükség bevásárlólista írására",
                        });
                        setSuccessAlertVisible(true);
                    } else {
                        setDangerAlertContent({
                            title: "Sikertelen mentés",
                            description: "A bevásárlólista mentése sikertelen. Próbálja újra.",
                        });
                        setDangerAlertVisible(true);
                    }
                }
            } catch (error) {
                console.error('Error adding to favorites:', error);
                setDangerAlertContent({
                    title: "Sikertelen mentés",
                    description: "A hálózati hiba miatt a bevásárlólista mentése sikertelen.",
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
                <PopoverContent className="w-md">
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
                                    onClick={() => handleAddShopping("true")}>
                                    Minden összetevő mentése
                                </Button>
                                <Button
                                    className={buttonStyles({ variant: "bordered", radius: "full" })}
                                    disabled={isAdding}
                                    onClick={() => handleAddShopping("false")}>
                                    Csak a spájzból hiányzó összetevők mentése
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