'use client';
import { Button } from "@heroui/button"
import { SearchIcon } from "../icons";
import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";

export default function MySidebar() {
    return (
        <aside className="w-64 flex flex-col h-screen fixed w-64">
            {/* Header */}
            <div className="h-16 flex items-center justify-center text-lg font-bold">
                Keresési beállítások:
            </div>
            <ul className="p-8">
                    <li>Ételtípusok: </li>
                    <li>Ételérzékenységek: </li>
                </ul>
            {/* Navigation */}
            <nav className="flex-1 p-8 space-y-4 justify-center items-center">
                <Link
                    className={buttonStyles({
                        color: "primary",
                        radius: "full",
                        variant: "shadow",
                    })}
                    href={`/search`}
                >
                    Új keresés <SearchIcon/>
                </Link>
            </nav>
        </aside>
    );
}