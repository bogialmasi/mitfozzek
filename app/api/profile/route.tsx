import { Examples } from "@/config/example";
import { user } from "@heroui/theme";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ success: false }, { status: 405 });
    }

    try {
        // gets user_id from headers
        const userId = req.headers.get('user_id');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'No User ID' }, { status: 400 });
        }
        
        const user = Examples.users.find((r) => r.user_id === Number(userId));
        
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error('Hiba a keresés során:', error);
        return NextResponse.json({ success: false, message: 'Szerver oldali hiba' }, { status: 500 });
    }
}