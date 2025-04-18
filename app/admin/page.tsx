'use client'
import { HeroSettings } from "@/components/icons";
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Spinner } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/authcheck', {
                    method: 'GET',
                    credentials: 'include', // Use cookies
                });
                const data = await res.json();
                if (!data.success) {
                    setError('Bejelentkezés szükséges');
                    setLoading(false);
                    return;
                }
            } catch (err) {
                setError('Bejelentkezés szükséges');
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    if (error) {
        return <div>{error}</div>;
    }

    return (

        <div>
            <h1 className={title()}>Adminisztrátori feladatok</h1>
            <div>
                <div className="py-4">
                    <div className="py-4">
                        <div className="flex flex-col gap-4 py-4">
                            <Link
                                className={buttonStyles({ variant: "bordered", radius: "full" })}
                                href={siteConfig.adminItems.users}
                            >
                                <HeroSettings/> Felhasználók kezelése
                            </Link>
                            <Link
                                className={buttonStyles({ variant: "bordered", radius: "full" })}
                                href={siteConfig.adminItems.reviews}
                            >
                                <HeroSettings/> Receptek elbírálása
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
