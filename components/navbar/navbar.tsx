'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useState, useEffect } from 'react';
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { MyUserLoginLogout } from "./user_login_logout";
import { useAuthentication } from "@/app/context/authenticationContext";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user, logout } = useAuthentication();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const checkIfAdmin = async () => {
    if (user) {
      const res = await fetch('/api/authcheck');
      const data = await res.json();
      if (data.success && data.isAdmin) {
        setIsAdmin(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      checkIfAdmin();
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [user]);

  const navItems = user
    ? [
      { label: "Keresés", href: "/search" },
      { label: "Profilom", href: "/profile" },
      { label: "Bevásárlólistáim", href: "/shopping" },
      ...(isAdmin ? [
        { label: "Felhasználók kezelése", href: "/admin/users" },
        { label: "Elbírálandó receptek", href: "/admin/reviews" }
      ] : [])
    ]
    : [
      { label: "Főoldal", href: "/" },
      { label: "Keresés", href: "/search" },
      { label: "Rólunk", href: "/about" },
    ];

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1 space-x-2" href="/">

            <p className="font-bold text-inherit">Mit főzzek?</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <MyUserLoginLogout />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <MyUserLoginLogout />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
