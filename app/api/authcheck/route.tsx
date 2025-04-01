'use server'
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { JwtPayload } from 'jsonwebtoken';

const ADMIN_USER_ID = ['1']; // multiple possible
export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(token);
  if (!token) {
    return NextResponse.json({ success: false, message: 'Not logged in' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const decodedPayload = decoded as JwtPayload
    const isAdmin = ADMIN_USER_ID.includes(decodedPayload.userId.toString())
    return NextResponse.json({ success: true, isAdmin, user: decoded },
      { status: 200, headers: { "Content-Type": "application/json" } }); // there is a logged in user
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}
