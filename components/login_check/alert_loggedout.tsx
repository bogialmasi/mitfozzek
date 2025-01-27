import { Alert, Button } from "@heroui/react";

export const MyAlert = () => {
    return (
        <Alert
            color="warning"
            title="A bejelentkezés ideje lejárt"
            description="Jelentkezzen be újra"
            endContent={
                <Button color="warning" size="sm" variant="flat">
                    <a href="/login">Bejelentkezés</a>
                </Button>
            }
            variant="faded"
        />
    );
}