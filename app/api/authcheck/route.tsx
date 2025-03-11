import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(token);
  if (!token) {
    return NextResponse.json({ success: false, message: 'Not logged in' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    console.log("decoded:",decoded);
    return NextResponse.json({ success: true, user: decoded }, 
      { status: 200, headers: { "Content-Type": "application/json" }}); // there is a logged in user
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}
