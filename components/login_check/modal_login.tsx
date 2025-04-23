import { siteConfig } from "@/config/site";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

interface MyLoginModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const MyLoginModal: React.FC<MyLoginModalProps> = ({ isOpen, onOpenChange }) => {
    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">A funkció eléréséhez regisztráció szükséges</ModalHeader>
                            <ModalBody>
                                <p>
                                    Ez a funkció csak regisztrált felhasználóknak elérhető. A használatához kérjük jelentkezzen be, vagy amennyiben nincs még fiókja, ingyenesen regisztrálhat.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary">
                                    <a href={siteConfig.links.login}>Bejelentkezés</a>
                                </Button>
                                <Button color="primary">
                                    <a href={siteConfig.links.register}>Regisztráció</a>
                                </Button>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Bezárás
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
