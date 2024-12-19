'use client'
import { title } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";

export default function SearchPage() {
  return (
      <Form className="">
        <div className="inline-block max-w-xl text-center justify-center gap-6">
          <h1 className={title()}>Receptek keresése</h1>
        </div>
        <Input
          className="form-control input gap-6"
          labelPlacement="outside"
          name="search"
          placeholder="Keressen rá receptek címére, vagy hozzávalóra..."
          type="text"
          variant="bordered"
        />
        <Button type="submit" className="btn btn-primary mb-2 justify-center">Keresés</Button>
      </Form>
  );
}
