'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Recipe } from "@/types";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';

interface MyReviewsProps {
    recipe: Recipe;
    username: string | null;
}

export const MyReviews: React.FC<MyReviewsProps> = ({ recipe, username }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [statusChange, setStatusChange] = useState<string>("");
    const [isChanging, setIsChanging] = useState<boolean>(false);

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" })

    const handleStatusChange = async (key: string) => {
        setStatusChange(key);
        setIsChanging(true)
        try {
            const res = await fetch(`/api/admin/reviews`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ recipe_id: recipe.recipe_id, status: key }),
            });

            if (res.ok) {
                setSuccessAlertContent({
                    title: "Státusz módosítva",
                    description: "A recept státust módosult",
                });
                setSuccessAlertVisible(true);
            } else {
                setDangerAlertContent({
                    title: "Sikertelen módosítás",
                    description: "A recept státuszának módosítása sikertelen. Próbálja újra",
                });
                setDangerAlertVisible(true);
            }
        } catch (error) {
            console.error('Error changing status of recipe:', error);
            setDangerAlertContent({
                title: "Sikertelen módosítás",
                description: "Hiba történt a státusz módosítása közben. Próbálja újra.",
            });
            setDangerAlertVisible(true);
        } finally {
            setIsChanging(false);
        }
    };

    const handleDropdownAction = (key: string) => {
        setSelectedKeys([key]);
        handleStatusChange(key);
    };

    return (
        <div className='py-4'>
            <Card className="max-w-xl overflow-visible">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <h2>{recipe.recipe_name}</h2>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div>
                        <p className="text-sm font-semibold">Hozzávalók:</p>
                        <ul className="grid grid-flow-col auto-rows-auto grid-rows-3 gap-1">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-sm text-default-500 list-disc list-inside">
                                    {ingredient.ingredient_name}
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
                        <p className='text-sm'>Beküldő: {username ? username : 'Nem nyilvános'}</p>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="capitalize" variant="bordered">
                                {statusChange || 'Nincs kiválasztva'}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Status módosítása"
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            variant="flat"
                            onAction={(key) => handleDropdownAction(key as string)}
                        >
                            <DropdownItem key="pending">Elbírálatlan</DropdownItem>
                            <DropdownItem key="approved" color='success'>Jóváhagyás</DropdownItem>
                            <DropdownItem key="recejted" color='danger'>Elutasítás</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
