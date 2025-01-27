
import { useAuthentication } from "@/app/context/authenticationContext";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { button as buttonStyles } from "@heroui/theme";
import Link from "next/link";

export const MyUserLoginLogout = () => {
    const { user, logout } = useAuthentication();
    return (
        <div>
            {user ? (
                <Dropdown aria-label="light">
                    <DropdownTrigger>
                        <Button className={buttonStyles({
                            radius: "full",
                            variant: "shadow",
                        })}>{user.username}</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="profile" href="/profile">
                            Profilom
                        </DropdownItem>
                        <DropdownItem key="logout" onPress={logout}>
                            <a href="/">Kijelentkezés</a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Dropdown>
                    <DropdownTrigger>
                        <Button className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })}>Bejelentkezés</Button>
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