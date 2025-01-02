'use client'
import * as React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();  // Only parse the response once

        if (data.success) {
            // Redirect to the dashboard or another page after successful login
            router.push('/search');  // Change this URL as needed
        } else {
            setError(data.message || 'Login failed.');
        }
    };

    /*
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent default browser page refresh.
      e.preventDefault();
  
      // Get form data as an object.
      const data = Object.fromEntries(new FormData(e.currentTarget));
  
      // Submit data to your backend API.
      setSubmitted(data);
    };
    
    <Form onSubmit={onSubmit} validationBehavior="native">*/

    return (
        <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
            <Form onSubmit={handleLogin} validationBehavior="native"
                className="w-full max-w-xs flex flex-col gap-6">
                <div className="inline-block max-w-xl text-center justify-center">
                    <h1 className={title()}>Belépés</h1>
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
                    errorMessage="!"
                    label="Jelszó"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Jelszó"
                    type="password"
                    variant="bordered"
                />
                <Button type="submit">Belépés</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Form>
        </section>
    );
}