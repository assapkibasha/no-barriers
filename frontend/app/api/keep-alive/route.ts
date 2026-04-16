import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { 
      status: 'alive', 
      timestamp: new Date().toISOString(),
      message: 'Render keep-alive ping successful'
    }, 
    { status: 200 }
  );
}
