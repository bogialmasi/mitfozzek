'use client'
import { Ingredient, Recipe } from "@/types";
import { HeroCancel, HeroCheck } from "../icons";
import { useState, useEffect } from "react";

// compares one recipe ingredient to items in pantry
interface MyPantryIngredientComparatorProps {
    ingredient: Ingredient;
}
export const MyPantryIngredientComparator: React.FC<MyPantryIngredientComparatorProps> = ({ ingredient }) => {
    const [pantryItems, setPantryItems] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchPantry = async () => {
            try {
                const pantryResponse = await fetch('/api/pantry', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!pantryResponse.ok) {
                    setError(`Error fetching pantry items: ${pantryResponse.statusText}`);
                    return;
                }

                const pantryData = await pantryResponse.json();
                const formattedPantryItems: Ingredient[] = (pantryData.pantry_items || []).map((item: any) => ({
                    ingredient_id: item.ingredient_id,
                    ingredient_name: item.ingredient_name,
                    ingredient_quantity: item.ingredient_quantity,
                    measurement_id: item.measurement_id,
                    measurement_name: item.measurement_name
                }));
                setPantryItems(formattedPantryItems);
            } catch (err) {
                console.error('Hiba a spájz feltöltése közben:', err);
                setError('Something went wrong.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchPantry();
    }, []);

    // check if both recipe and pantry store the same ingredient id
    const pantryItem = pantryItems?.find(
        (item) =>
            item.ingredient_id === ingredient.ingredient_id
    );

    // compare quantity values
    const enoughQuantity = pantryItem ? pantryItem.ingredient_quantity >= ingredient.ingredient_quantity : false;

    return (
        <div>
            <span>
                {enoughQuantity ? <HeroCheck /> : <HeroCancel />}
            </span>
        </div>
    )
}