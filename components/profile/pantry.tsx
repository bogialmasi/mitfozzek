'use client'
import React, { useState } from "react";
import { subtitle } from "@/components/primitives";
import { Listbox, ListboxItem } from "@heroui/react";
import { HeroPlus, HeroSettings } from "../icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@heroui/theme";

interface PantryItem {
    ingredient_id: number;
    ingredient_name: string;
    ingredient_quantity: number;
    measurement_name: string;
}

interface MyPantryProps {
    pantryIngredients: PantryItem[];
}


export const MyPantry: React.FC<MyPantryProps> = ({ pantryIngredients }) => {
    const [loading, setLoading] = useState<boolean>(false);
    if (loading) {
        return <div>Betöltés...</div>;
    }

    return (
        <section className="flex justify-center w-full py-8">
            <div className="w-full max-w-md mx-auto px-4 py-6 border border-default-200 dark:border-default-100 rounded-lg">
                <div className="text-center flex items-center justify-center gap-2  ">
                    <div className={subtitle({ class: "mt-4" })}>
                        Spájzom
                    </div>
                </div>

                <div className="w-full max-w-md border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mx-auto">
                    <Listbox aria-label="Spájzom" items={pantryIngredients} onAction={(key) => alert(key)}
                        classNames={{
                            base: "max-w-md",
                            list: "max-h-md overflow-auto",
                        }}>
                        {(item) => (
                            <ListboxItem
                                key={item.ingredient_id} textValue={item.ingredient_name}
                            ><div className="flex gap-2 items-center">
                                    {item.ingredient_name}, {item.ingredient_quantity} {item.measurement_name}
                                </div>
                            </ListboxItem>
                        )}
                    </Listbox>
                </div>
                <div className="py-4 flex justify-center space-x-4">
                    <Link
                        className={buttonStyles({ variant: "bordered", radius: "full" })}
                        href={siteConfig.profileMenuItems.modifyPantry}
                    >
                        <HeroSettings /> Spájz módosítása
                    </Link>
                    <Link
                        className={buttonStyles({ variant: "bordered", radius: "full" })}
                        href={siteConfig.profileMenuItems.modifyPantry}
                    >
                        <HeroPlus /> Hozzáadás
                    </Link>
                </div>
            </div>
        </section>
    );
}

/*

    const [error, setError] = useState<string | null>(null);

    const [isDeleting, setIsDeleting] = useState(false); // Track if the deletöe operation is in progress

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

    */