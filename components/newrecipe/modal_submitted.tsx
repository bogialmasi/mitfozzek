'use client'
import { useAuthentication } from "@/app/context/authenticationContext";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeroCheck } from "../icons";

interface MySubmittedModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const MySubmittedModal: React.FC<MySubmittedModalProps> = ({ isOpen, onOpenChange }) => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const { logout } = useAuthentication();

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recept beküldése</ModalHeader>
                            <ModalBody>
                                {error ? <p style={{ color: "red" }}>{error}</p> : (
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <HeroCheck className="w-12 h-12" />
                                        <p className="font-semibold">A recept beküldésre került</p>
                                        <p className="text-sm text-gray-500">
                                            A recept elbírálás után nyilvános lesz a mitfőzzek.hu oldalán. Ez pár napot is igénybe vehet. Köszönjük a türelmét!
                                        </p>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light"
                                    onClick={() => onOpenChange(false)}>
                                    OK
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
