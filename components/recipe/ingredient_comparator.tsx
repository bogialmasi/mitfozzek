'use client'
import { Ingredient } from "@/types";
import { HeroCancel, HeroCheck } from "../icons";
import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

interface MyPantryIngredientComparatorProps {
    ingredient: Ingredient;
}
export const MyPantryIngredientComparator: React.FC<MyPantryIngredientComparatorProps> = ({ ingredient }) => {
    const [pantryItems, setPantryItems] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

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
                    ingredient_measurement: item.ingredient_measurement
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

    const pantryItem = pantryItems?.find(
        (item) =>
            item.ingredient_id === ingredient.ingredient_id
    );
    const enoughQuantity = pantryItem ? pantryItem.ingredient_quantity >= ingredient.ingredient_quantity : false;

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Popover
                placement="top"
                showArrow={true}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                shouldCloseOnBlur={false}
            >
                <PopoverTrigger>
                    <span className="cursor-pointer">
                        {enoughQuantity ? (
                            <HeroCheck/>
                        ) : (
                            <HeroCancel/>
                        )}
                    </span>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-2 py-1">
                        <div className="text-small font-bold">
                            {enoughQuantity
                                ? "Van elegendő mennyiség a spájzban"
                                : "Nincs elegendő mennyiség a spájzban"
                            }
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}