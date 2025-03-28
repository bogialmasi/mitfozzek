import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_USER_ID = ['1'];  // multiple admin users possible

export async function isAdmin(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;


    if (!ADMIN_USER_ID.includes(userId.toString())) {
      return NextResponse.json({ success: false, message: `Not admin. UserId: ${userId}` }, { status: 403 });
    }

    // proceed if the user is the admin
    //return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}
