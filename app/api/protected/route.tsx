import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Ez egy védett route' });
}
