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

interface MyDeactivateModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const MyDeactivateModal: React.FC<MyDeactivateModalProps> = ({ isOpen, onOpenChange }) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const { logout } = useAuthentication();

    const onConfirm = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Bejelentkezés szükséges');
            return;
        }
        const response = await fetch('/api/profile/deactivate', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            setError(`A fiók deaktiválásra került.`)
            logout(); // removes token and user context
            //onOpenChange(false);
            setTimeout(() => {
                onOpenChange(false); // Close after 5 seconds
            }, 5000);

        } else {
            setError(data.message || 'Deaktiválás nem sikerült');
            console.log(data.message);
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Fiók deaktiválása</ModalHeader>
                            <ModalBody>
                                {error ? <p style={{ color: "red" }}>{error}</p> : (
                                    <p>
                                        A fiók újraaktiválására nincs lehetőség.
                                        A bejelentkezéssel elérhető funkciók ezután nem lesznek elérhetőek.
                                        Az ön által írt receptek feltöltve maradnak, a törlésükre így később nem lesz lehetőség.
                                        Biztosan deaktiválja fiókját?
                                    </p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger"
                                    onClick={onConfirm}>
                                    Igen
                                </Button>
                                <Button color="primary" variant="light"
                                    onClick={() => onOpenChange(false)}>
                                    Mégsem
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
