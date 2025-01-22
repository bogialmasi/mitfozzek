'use client'
import * as React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@heroui/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from "@heroui/link";
import { useAuthentication } from "../context/authenticationContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthentication(); // from Context
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();  // Only parse the response once

        if (data.success) {
            // Redirect to /search after successful login
            login(data.token);
            router.push('/search');
          } else {
            setError(data.message || 'Login failed.');
          }
    };

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
                <Button type="submit">Belépés</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <h3>Nincs fiókja? <Link href="/register">Regisztráció</Link></h3>
                </div>
            </Form>
        </section>
    );
}