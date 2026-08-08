import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const rows = await sql`
      SELECT items, total FROM carts WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ items: [], total: 0 }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      items: rows[0].items,
      total: rows[0].total,
    });
  } catch (error: any) {
    console.error('API /api/cart/load error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
