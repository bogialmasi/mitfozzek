'use client'
import React, { useState } from "react";
import { Checkbox, useDisclosure } from "@heroui/react";
import { useAuthentication } from "@/app/context/authenticationContext";
import { MyLoginModal } from "../login_check/modal_login";


export const MyPantryCheckBox: React.FC = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();  


    const handleCheckboxChange = (isSelected: boolean): void => {
        if (!user) {
            setIsSelected(false);
            onOpen();
        } else {
            setIsSelected(isSelected);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Checkbox
                size="sm"
                className="py-6"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                onChange={(e) => handleCheckboxChange(e.target.checked)} 
            >
                Csak a spájzom összetevői
            </Checkbox>
            <MyLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}