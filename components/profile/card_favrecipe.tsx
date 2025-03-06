import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from "@heroui/react";
import { Recipe } from "@/types";
import { button as buttonStyles } from "@heroui/theme";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';

interface MyFavRecipeProps {
    recipe: Recipe;
    onDelete: (recipeId: number) => void;
}

export const MyFavRecipe: React.FC<MyFavRecipeProps> = ({ recipe, onDelete }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // Track if the delete operation is in progress

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

    const deleteFromFavorites = async (recipeId: number) => {
        try {
            const res = await fetch(`/api/favrecipes?recipeId=${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Make sure to use the correct token source
                },
            });

            if (res.ok) {
                setSuccessAlertContent({
                    title: "Sikeres törlés",
                    description: "Recept törölve a kedvencek közül",
                });
                setSuccessAlertVisible(true);
                return true;
            } else {
                setDangerAlertContent({
                    title: "Sikertelen törlés",
                    description: "A recept törlése sikertelen. Próbálja újra",
                });
                setDangerAlertVisible(true);
                return false;
            }
        } catch (error) {
            console.error('Error deleting favorite recipe:', error);
            return false;
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true); // Disable the button during the delete process
        const success = await deleteFromFavorites(recipe.recipe_id);
        if (success) {
            onDelete(recipe.recipe_id); // Call the parent callback to remove the recipe from the list
        }
        setIsDeleting(false); // Re-enable the button after the delete operation
    };
    return (
        <div className='py-4'>
            <Card className="max-w-xl overflow-visible">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <Link href={`/recipe/?id=${recipe.recipe_id}`} className="text-md font-semibold">
                            {recipe.recipe_name}
                        </Link>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div>
                        <p className="text-sm font-semibold">Hozzávalók:</p>
                        <ul className="flex flex-row space-x-1">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-sm text-default-500">
                                    {ingredient.ingredient_name}
                                    {index < recipe.ingredients.length - 1 && ','}
                                </li>
                            ))}
                        </ul>
                        <Divider className="my-3" />
                        <p className="text-sm">
                            {showFullDescription
                                ? recipe.recipe_description
                                : `${recipe.recipe_description.slice(0, 100)}...`}
                            {recipe.recipe_description.length > 100 && (
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-primary text-sm ml-1 underline"
                                >
                                    {showFullDescription ? 'Mutass kevesebbet' : 'Mutass többet'}
                                </button>
                            )}
                        </p>
                        <p className="text-sm">Recept elkészítési ideje: {recipe.recipe_time}</p>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting} // Disable the button while deleting
                        className={buttonStyles({ variant: "ghost", radius: "full", color: "danger" })}
                    >
                        {isDeleting ? 'Törlés folyamatban' : 'Törlés'}
                    </Button>
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
    );
};
