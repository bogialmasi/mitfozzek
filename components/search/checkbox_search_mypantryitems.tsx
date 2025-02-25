'use client'
import React, { useState } from "react";
import { Checkbox, useDisclosure } from "@heroui/react";
import { useAuthentication } from "@/app/context/authenticationContext";
import { MyLoginModal } from "../login_check/modal_login";

/* This Checkbox is only for logged in users */

export const MyPantryCheckBox: React.FC = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { user } = useAuthentication();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control


    const handleCheckboxChange = (isSelected: boolean): void => {
        if (!user) {
            // If user is not logged in, show the modal
            setIsSelected(false);
            onOpen();
        } else {
            // If logged in, update checkbox state
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