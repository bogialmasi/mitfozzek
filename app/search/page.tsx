'use client'
import React from "react";
import { title, subtitle } from "@/components/primitives";
import { Button, Form, Input } from "@nextui-org/react";
import { MyDropdown } from "@/components/dropdown";
import { Examples } from "@/config/example";

export default function SearchPage() {

  // State for selections in each dropdown
  const [selectedKeysDish, setSelectedKeysDish] = React.useState<Set<string>>(new Set());
  const [selectedKeysSensitivity, setSelectedKeysSensitivity] = React.useState<Set<string>>(new Set());
  const [selectedKeysRestriction, setSelectedKeysRestriction] = React.useState<Set<string>>(new Set());


  return (
    <Form className="">
      <div className="inline-block max-w-xl text-center justify-center py-45 md:py-8">
        <h1 className={title()}>Receptek keresése</h1>
      </div>
      <Input
        className="form-control input"
        labelPlacement="outside"
        name="search"
        placeholder="Keressen rá receptek címére, vagy hozzávalóra..."
        type="text"
        variant="bordered"
      />
      <div className="inline-block max-w-xl w-max text-left justify-center gap-2 py-2">
      <p className="text-sm py-2">Étel típusa:</p>
      <MyDropdown
        list={Examples.dishTypes} // Pass the dishTypes list
        selectedKeys={selectedKeysDish}
        onSelectionChange={(keys) => setSelectedKeysDish(new Set(keys))}
      />
      <p className="text-sm py-2">Ételérzékenységek:</p>
      <MyDropdown
        list={Examples.foodSensitivities} // Pass the foodSensitivities list
        selectedKeys={selectedKeysSensitivity}
        onSelectionChange={(keys) => setSelectedKeysSensitivity(new Set(keys))}
      />
      <p className="text-sm py-2">Étrendbeli megkötések:</p>
      <MyDropdown
        list={Examples.dietaryRestrictions} // Pass the dietaryRestrictions list
        selectedKeys={selectedKeysRestriction}
        onSelectionChange={(keys) => setSelectedKeysRestriction(new Set(keys))}
      />
      </div>
      <div>
      <Button type="submit" className="btn btn-primary mb-2 justify-center">Keresés</Button>
      </div>
    </Form>
  );
}
