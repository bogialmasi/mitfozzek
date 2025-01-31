'use client'
import React, { useEffect, useState } from "react";
import { subtitle } from "@/components/primitives";
import { getKeyValue, Listbox, ListboxItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

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
        <section>
            <div className={subtitle({ class: "mt-4" })}>
                Spájzom
            </div>
            <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                <Listbox aria-label="Spájzom" items={pantryIngredients} onAction={(key) => alert(key)}
                    classNames={{
                        base: "max-w-md",
                        list: "max-h-[300px] overflow-scroll",
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