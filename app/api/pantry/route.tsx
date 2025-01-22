import { NextRequest, NextResponse } from "next/server";
import { Examples } from "@/config/example";

// Gives back a list of pantry items based on the user_id params

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ success: false }, { status: 405 });
    }

    try {
        const { searchParams } = req.nextUrl;
        const id = Number(searchParams.get('user_id')) || null; // converting id string to number

        // Get the pantry items for the user
        const userPantries = Examples.pantry.filter(p =>
            Examples.con_user_pantry.some(con => con.user_id === id && con.pantry_id === p.pantry_id)
        );

        // Map pantry data to include ingredient names and measurement names
        const fullPantry = userPantries.map(item => {
            // Find the ingredient name
            const ingredient = Examples.ingredients.find(i => i.ingredient_id === item.ingredient_id);
            // Find the measurement name
            const measurement = Examples.measurements.find(m => m.measurement_id === item.measurement_id);

            return {
                ingredient_name: ingredient ? ingredient.ingredient_name : 'Ismeretlen összetevő',
                ingredient_quantity: item.ingredient_quantity,
                measurement_name: measurement ? measurement.measurement_name : 'Ismeretlen mérték',
            };
        });

        return NextResponse.json(fullPantry);
    } catch (error) {
        console.error('Hiba a keresés során:', error);
        return NextResponse.json({ success: false, message: 'Szerver oldali hiba' }, { status: 500 });
    }
}
