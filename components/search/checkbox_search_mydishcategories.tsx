'use client'
import React, { useEffect, useState } from "react";
import { Checkbox, useDisclosure } from "@heroui/react";
import { useAuthentication } from "@/app/context/authenticationContext";
import { MyLoginModal } from "../login_check/modal_login";

interface MySearchData {
    key: number;
    value: string;
}

interface MyCategoriesCheckBoxProps {
    selectedKeys: number[];
    onSelectionChange: (keys: number[]) => void;
  }

export const MyCategoriesCheckBox: React.FC<MyCategoriesCheckBoxProps> = ({selectedKeys, onSelectionChange}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control
    const [userDishCategory, setUserDishCategory] = useState<MySearchData[]>([]);
    const [Error, setError] = useState<string | null>(null);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/data?type=user_dish_category', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                setError('Hiba történt a keresési találatok betöltésekor');
                setUserDishCategory([]); // return empty if error
                return;
            }
            const data = await response.json();
            setUserDishCategory(data);
            setError(null);
        } catch (error) {
            setError('Hiba történt a keresési találatok betöltésekor');
            setUserDishCategory([]); // return empty if error
        }
    };

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]); // fetch if logged in


    const handleCheckboxChange = (isSelected: boolean): void => {
        if (!user) {
            // If user is not logged in, show the modal
            setIsSelected(false);
            onOpen();
        } else {
            // If logged in, update checkbox state
            setIsSelected(isSelected);
            if (isSelected) {
                const keys = userDishCategory.map((cat) => cat.key);
                console.log("keys: ", keys);
                onSelectionChange(keys); // send all user dish cat id-s
              } else {
                // send an empty array (or remove the filter)
                onSelectionChange([]);
              }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Checkbox
                size="sm"
                className="py-6 flex space-x-2"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
            >
                Használja mentett kategóriáimat:
                {userDishCategory.length > 0 ? (
                    <ul className="flex space-x-1">
                    {userDishCategory.map((categ, index) => (
                      <li key={index} className="text-sm text-default-500">
                        {categ.value}
                        {index < userDishCategory.length - 1 && ', '}
                      </li>
                    ))}
                  </ul>
                ) : 
                (<p> - </p>)}
            </Checkbox>
            <MyLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}