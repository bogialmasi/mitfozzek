"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { ArrowUpIcon, HeroArrowUp } from "./icons";
import { button as buttonStyles } from "@heroui/theme";

export const MyBackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200); // Show the button when scrolled more than 200px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-4 right-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <Button
                color="primary"
                className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                })}
                onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <HeroArrowUp />
            </Button>
        </div>
    );
};
