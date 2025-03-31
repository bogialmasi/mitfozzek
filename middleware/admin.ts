/*import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function isAdmin(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Authorization token missing' }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const isAdmin = decoded.isAdmin;


    if (!isAdmin) {
      return NextResponse.json({ success: false, message: `Not admin. UserId: ${userId}` }, { status: 403 });
    }

    // proceed if the user is the admin
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}
*/