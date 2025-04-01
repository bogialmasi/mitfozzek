'use server'
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({ success: true, message: 'Sikeres kijelentkezés' });

        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0),
            path: '/',
            sameSite: 'lax',
        });

        return response;
    }
    catch (error) {
        console.error('Logout failed:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
