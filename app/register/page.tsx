'use client'
import * as React from "react";
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

export default function RegisterPage() {
    const [submitted, setSubmitted] = React.useState(null);
    const onSubmit = (e) => {
        e.preventDefault();
    };
    const [password, setPassword] = React.useState("");
    const errors = [];

    if (password.length < 4) {
        errors.push("Password must be 4 characters or more.");
    }
    if ((password.match(/[A-Z]/g) || []).length < 1) {
        errors.push("Password must include at least 1 upper case letter");
    }
    if ((password.match(/[^a-z]/gi) || []).length < 1) {
        errors.push("Password must include at least 1 symbol.");
    }

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
            <Form className="w-full max-w-xs flex flex-col gap-6">
                <div className="inline-block max-w-xl text-center justify-center">
                    <h1 className={title()}>Regisztráció</h1>
                </div>
                <Input
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
                    isRequired
                    errorMessage="!"
                    label="Jelszó"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Jelszó"
                    type="password"
                    value={password}
                    variant="bordered"
                    onValueChange={setPassword}
                />
                <Input
                    isRequired
                    errorMessage="Adjon meg érvényes emailt"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="bordered"
                />
                <DateInput
                    isRequired
                    label="Születési dátum"
                    labelPlacement="outside"
                    name="birthdate"
                    type="datetime"
                    variant="bordered"
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                />
                <Button type="submit">Regisztráció</Button>
                {submitted && (
                    <div className="text-small text-default-500">
                        You submitted: <code>{JSON.stringify(submitted)}</code>
                    </div>
                )}
            </Form>
        </section>
    );
}