import { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function isAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.isAdmin === true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}
