
import { useAuthentication } from "@/app/context/authenticationContext";
import { siteConfig } from "@/config/site";
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
                            color: 'primary',
                            radius: "full",
                            variant: "shadow",
                        })}>Helló, {user.username}!</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="profile" href={siteConfig.links.profile} textValue="Profilom">
                            Profilom
                        </DropdownItem>
                        <DropdownItem key="search" href={siteConfig.links.search} textValue="Keresés">
                            Keresés
                        </DropdownItem>
                        <DropdownItem key="shopping" href={siteConfig.profileMenuItems.shoppingLists} textValue="Bevásárlólistáim">
                            Bevásárlólistáim
                        </DropdownItem>
                        <DropdownItem key="logout" onPress={logout} textValue="Kijelentkezés">
                            <Link href="/">Kijelentkezés</Link>
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
                        <DropdownItem key="login" href={siteConfig.links.login} textValue="Bejelentkezés">
                            Bejelentkezés
                        </DropdownItem>
                        <DropdownItem key="register" href={siteConfig.links.register} textValue="Bejelentkezés">
                            Regisztráció
                        </DropdownItem>
                        <DropdownItem key="search" href={siteConfig.links.search} textValue="Keresés">
                            Keresés
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div >
    )
}