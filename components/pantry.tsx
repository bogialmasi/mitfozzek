'use client'
/*

this will be a list within /profile, where the user can add and remove ingredients (from the ingredients list)
the ADD button should have a popup (modal) on which the user can select which ingredients to add and write how many of that
the DELETE and CHANGE QUANTITY should work as an options menu when clicking on the item.

*/

import { subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/react";
import React from "react";

export const Pantry = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-lg h-[90vh] flex flex-col">
                <div className="p-4 border-b border-gray-300 justify-center">
                    <div className={subtitle({ class: "mt-4" })}>
                        Spájzom
                    </div>
                    <input
                        type="text"
                        placeholder="Keresés a hozzávalók között..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {Array.from({ length: 26 }, (_, i) => (
                            <li key={i} className="p-2 bg-white rounded-md shadow-sm">
                                {String.fromCharCode(65 + i)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 border-t border-gray-300 flex justify-center">
                        <Button type="submit">Hozzáadás</Button>
                    </div>
                    <div className="p-4 border-t border-gray-300 flex justify-center">
                        <Button type="submit">Módosítás</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
