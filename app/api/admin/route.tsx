import { NextRequest } from 'next/server';
import { isAdmin } from '@/middleware/admin';

export async function GET(req: NextRequest) {
  const adminCheck = await isAdmin(req);  // admin check middleware
  if (adminCheck) {
    return adminCheck;  
  }
}
