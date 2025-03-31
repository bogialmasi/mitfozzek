'use client'
import * as React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input, Spinner } from "@heroui/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from "@heroui/link";
import { useAuthentication } from "../context/authenticationContext";
import { siteConfig } from "@/config/site";
import crypto from 'crypto';

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuthentication();
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password: hashed })
            });
            const data = await response.json();
            console.log("response:", data);
            if (data.success) {
                // Redirect to /search after successful login
                setLoading(false);
                login(data.token);
                router.push(siteConfig.links.search);
            } else {
                setLoading(false);
                setError(data.message || 'Hiba történt a bejelentkezéskor');
            }
        } catch (error) {
            setLoading(false);
            setError('Hiba történt a bejelentkezéskor');
        }
    };

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    return (
        <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
            <Form onSubmit={handleLogin} validationBehavior="native"
                className="w-full max-w-xs flex flex-col gap-6">
                <div className="inline-block max-w-xl text-center justify-center">
                    <h1 className={title()}>Bejelentkezés</h1>
                </div>
                <Input
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    isRequired
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
                <Button type="submit" isDisabled={loading}>
                    {loading ? "Bejelentkezés..." : "Belépés"}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <h3>Nincs fiókja? <Link href={siteConfig.links.register}>Regisztráció</Link></h3>
                </div>
                {loading &&
                    <div className="flex justify-center items-center h-screen">
                        <p>Betöltés...</p>
                        <Spinner />
                    </div>}
            </Form>
        </section>
    );
}