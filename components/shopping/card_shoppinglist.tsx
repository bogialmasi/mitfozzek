import { Shopping, ShoppingIngredient } from "@/types"
import { useState } from "react";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import Link from "next/link";
import { MyAddToPantryButton } from "./button_addtopantry";

interface MyShoppingListProps {
    shoppingList: Shopping
    onDelete: (shopping_id: number) => void
}

export const MyShoppingList: React.FC<MyShoppingListProps> = ({ shoppingList, onDelete }) => {
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });
    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        shoppingList.ingredients.filter((ingredient) => ingredient.bought).map((ingredient) => String(ingredient.ingredient_id))
    );
    const handleCheckboxChange = async (updatedIngredients: string[]) => {
        setSelectedIngredients(updatedIngredients);
        shoppingList.ingredients.forEach(async (ingredient) => {
            const bought = updatedIngredients.includes(String(ingredient.ingredient_id));
            await updateIngredientBoughtStatus(ingredient, bought);
        });
    };

    const updateIngredientBoughtStatus = async (ingredient: ShoppingIngredient, bought: boolean) => {
        setIsChanging(true);
        try {
            const res = await fetch(`/api/shopping?shoppingId=${shoppingList.shopping_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ingredient_id: ingredient.ingredient_id,
                    bought: bought ? 1 : 0,
                }),
            });

            const response = await res.json();
            if (res.ok) {
                setSuccessAlertContent({
                    title: "Változtatás elmentve",
                    description: "A bevásárlólista frissítve",
                });
                setSuccessAlertVisible(true);
            } else {
                setDangerAlertContent({
                    title: "Hiba történt",
                    description: "Az összetevő állapotának frissítése sikertelen. Próbálja újra.",
                });
                setDangerAlertVisible(true);
            }
        } catch (error) {
            setDangerAlertContent({
                title: "Hiba történt",
                description: "Az összetevő állapotának frissítése sikertelen. Próbálja újra.",
            });
            setDangerAlertVisible(true);
        } finally {
            setIsChanging(false);
        }
    };

    const deleteShopping = async (shoppingId: number) => {
        setIsDeleting(true)
        try {
            const res = await fetch(`/api/shopping?shoppingId=${shoppingId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                setSuccessAlertContent({
                    title: "Sikeres törlés",
                    description: "Bevásárlólista törölve",
                });
                setSuccessAlertVisible(true);
                return true;
            } else {
                setDangerAlertContent({
                    title: "Sikertelen törlés",
                    description: "A lista törlése sikertelen. Próbálja újra",
                });
                setDangerAlertVisible(true);
                return false;
            }
        } catch (error) {
            console.error('Error deleting shopping list:', error);
            return false;
        }
        finally {
            setIsDeleting(false)
        }
    };

    const handleDelete = async () => {
        const success = await deleteShopping(shoppingList.shopping_id);
        if (success) {
            onDelete(shoppingList.shopping_id);
        }
    };

    return (
        <div>
            <Card className="max-w-[600px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md  font-semibold">{shoppingList.shopping_name}</p>
                        <p className="text-small text-default-500">
                            <Link href={`/recipe/?id=${shoppingList.recipe_id}`} className="text-md">
                                {shoppingList.recipe_name}
                            </Link>
                        </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <CheckboxGroup label="Hozzávalók:"
                        value={selectedIngredients}
                        onValueChange={handleCheckboxChange}>
                        {shoppingList.ingredients.map((ingredient, index) => (
                            <Checkbox
                                value={String(ingredient.ingredient_id)}
                                key={index}
                                checked={selectedIngredients.includes(String(ingredient.ingredient_id))}>
                                {ingredient.ingredient_name}, {ingredient.ingredient_quantity} {ingredient.ingredient_measurement}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </CardBody>
                <Divider />
                <CardFooter>
                    <div className="flex flex-row gap-4 py-4 flex-wrap">
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting} // Disable the button while deleting
                            className={`${buttonStyles({ variant: "ghost", radius: "full", color: "danger" })} w-full`}
                        >
                            {isDeleting ? 'Törlés...' : 'Törlés'}
                        </Button>
                        <MyAddToPantryButton ingredients={shoppingList.ingredients} />
                    </div>
                </CardFooter>
            </Card>
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
    )
}