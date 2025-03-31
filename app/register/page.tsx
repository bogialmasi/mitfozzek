'use client'
import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@heroui/react";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
const validatePassword = (password: string) => {
    const minlength = 8;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const numbers = /\d/.test(password);
    if (password.length < minlength) {
        return `A jelszónak legalább ${minlength} karakter hosszúnak kell lennie.`;
    }
    if (!upperCase || !lowerCase || !numbers) {
        return 'A jelszónak tartalmaznia kell legalább egy nagybetűt, legalább egy kisbetűt és legalább egy számot';
    }
    return ''; // No error
};

export default function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordAgain, setPasswordAgain] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== passwordAgain) {
            setError('A jelszavak nem egyeznek')
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });

        const data = await response.json();
        if (data.success) {
            router.push(siteConfig.links.login);
        } else {
            setError(data.message || 'A regisztráció sikertelen');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <Form onSubmit={handleRegister} validationBehavior="native"
                className="w-full max-w-xs flex flex-col gap-6">
                <div className="inline-block max-w-xl text-center justify-center">
                    <h1 className={title()}>Regisztráció</h1>
                </div>
                <Input
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    isRequired
                    errorMessage="Adjon meg felhasználónevet!"
                    label="Felhasználónév"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Felhasználónév"
                    type="text"
                    variant="bordered"
                />
                <Input
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    isRequired
                    errorMessage="Adjon meg jelszót!"
                    label="Jelszó"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Jelszó"
                    type="password"
                    variant="bordered"
                />
                <Input
                    value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}
                    isRequired
                    errorMessage="Adjon meg jelszót!"
                    label="Jelszó újra"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Jelszó újra"
                    type="password"
                    variant="bordered"
                />
                <Input
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    isRequired
                    errorMessage="Adjon meg érvényes emailt"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="bordered"
                />
                <Button type="submit">Regisztráció</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <h3>Van már fiókja? <Link href="/login">Bejelentkezés</Link></h3>
                </div>
            </Form>
        </section>
    );
}