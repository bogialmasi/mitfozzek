
import { useAuthentication } from "@/app/context/authenticationContext";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import Link from "next/link";

export const MyUserLoginLogout = () => {
    const { user, logout } = useAuthentication();
    return (
        <div>
            {user ? (
                <Dropdown aria-label="light">
                    <DropdownTrigger>
                        <Button variant="bordered">{user.username}</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="profile" href="/profile">
                            Profilom
                        </DropdownItem>
                        <DropdownItem key="logout" onPress={logout}>
                            Kijelentkezés
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">Bejelentkezés</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="login" href="/login">
                            Bejelentkezés
                        </DropdownItem>
                        <DropdownItem key="register" href="/register">
                            Regisztráció
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div >
    )
}