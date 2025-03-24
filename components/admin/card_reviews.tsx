'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Ingredient, Recipe } from "@/types";
import { MySuccessAlert } from '../alert/alert_success';
import { MyDangerAlert } from '../alert/alert_danger';
import { HeroCancel, HeroCheck } from '../icons';

interface Review {
    ingredients: Ingredient[];
    recipe_description: string;
    recipe_headcount: number;
    recipe_id: number;
    recipe_time: number;
    recipe_name: string;
    source_user_id: number | null;
    source_username: string | null;
    status: string;
    dishtype_name: string[];
    cuisine_name: string[];
    category_name: string[];
}

interface MyReviewsProps {
    review: Review;
    handleStatusChange: (updatedReview: Review) => void
}

export const MyReviews: React.FC<MyReviewsProps> = ({ review, handleStatusChange }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [status, setStatus] = useState<string>(review.status)
    const [isChanging, setIsChanging] = useState<boolean>(false);

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" })

    const handleStatusUpdate = async (newStatus: string) => {
        setStatus(newStatus);
        setIsChanging(true);
        try {
            const res = await fetch(`/api/admin/reviews`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ review_id: review.recipe_id, status: newStatus }),
            });

            if (res.ok) {
                setStatus(newStatus);
                setSuccessAlertContent({
                    title: "Státusz módosítva",
                    description: "A recept státust módosult",
                });
                setSuccessAlertVisible(true);
                handleStatusChange({ ...review, status: newStatus });
            } else {
                setDangerAlertContent({
                    title: "Sikertelen módosítás",
                    description: "A recept státuszának módosítása sikertelen. Próbálja újra",
                });
                setDangerAlertVisible(true);
                setStatus(review.status); // back to original status
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

    useEffect(() => {
        setStatus(review.status);
    }, [review.status]);


    const handleDropdownAction = (key: string) => {
        setSelectedKeys([key]);
        handleStatusUpdate(key);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <span>...</span>;
            case "approved":
                return <HeroCheck className="text-green-500" color='success' />;
            case "rejected":
                return <HeroCancel className="text-red-500" color='danger' />;
            default:
                return null;
        }
    };

    return (
        <div className='py-4 px-2'>
            <Card className="max-w-full overflow-visible">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <h2>{review.recipe_name}</h2>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div>
                        <p className="text-sm font-semibold">Hozzávalók:</p>
                        <ul className="grid grid-flow-col auto-rows-auto grid-rows-3 gap-1">
                            {review.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-sm text-default-500 list-disc list-inside">
                                    {ingredient.ingredient_name}
                                </li>
                            ))}
                        </ul>
                        <Divider className="my-3" />
                        <p className="text-sm">
                            {showFullDescription
                                ? review.recipe_description
                                : `${review.recipe_description.slice(0, 100)}...`}
                            {review.recipe_description.length > 100 && (
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-primary text-sm ml-1 underline"
                                >
                                    {showFullDescription ? 'Mutass kevesebbet' : 'Mutass többet'}
                                </button>
                            )}
                        </p>
                        <p className="text-sm">Recept elkészítési ideje: {review.recipe_time}</p>
                        <p className='text-sm'>Beküldő: {review.source_username ? review.source_username : 'Nem nyilvános'}</p>
                    </div>
                    <div className="mt-4">
                        <ul className="grid grid-flow-col auto-rows-auto gap-1">
                            {review.dishtype_name.map((type, dishtype_index) => (
                                <li key={dishtype_index} className="text-sm text-default-500 list-disc list-inside">
                                    {type}
                                </li>
                            ))}
                        </ul>
                        <ul className="grid grid-flow-col auto-rows-auto gap-1">
                            {review.cuisine_name.map((cuisine, cuisine_index) => (
                                <li key={cuisine_index} className="text-sm text-default-500 list-disc list-inside">
                                    {cuisine}
                                </li>
                            ))}
                        </ul>
                        <ul className="grid grid-flow-col auto-rows-auto gap-1">
                            {review.category_name.map((category, category_index) => (
                                <li key={category_index} className="text-sm text-default-500 list-disc list-inside">
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="capitalize" variant="bordered">
                                {getStatusIcon(status)}
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
                            <DropdownItem key="rejected" color='danger'>Elutasítás</DropdownItem>
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
