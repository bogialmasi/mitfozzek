import { Examples } from "@/config/example";
import { user } from "@heroui/theme";
import { NextRequest, NextResponse } from "next/server";

// TODO user data should be fetched from header instead of params, maybe do alongside JWT????

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ success: false }, { status: 405 });
    }

    try {
        const { searchParams } = req.nextUrl;

        // Gives back only one recipe that matches the id
        const id = searchParams.get('id') || null;


        if (id) {
            const userId = Number(id);
            const user = Examples.users.find((r) => r.user_id === userId);

            if (!user) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(user);
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error('Hiba a keresés során:', error);
        return NextResponse.json({ success: false, message: 'Szerver oldali hiba' }, { status: 500 });
    }
}