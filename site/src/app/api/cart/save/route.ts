import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await req.json();
    const { email, items, total } = body;

    if (!email || !items) {
      return NextResponse.json({ error: 'Email and items are required' }, { status: 400 });
    }

    // Insert or update the cart
    await sql`
      INSERT INTO carts (email, items, total, updated_at)
      VALUES (${email}, ${JSON.stringify(items)}, ${total || 0}, CURRENT_TIMESTAMP)
      ON CONFLICT (email)
      DO UPDATE SET
        items = EXCLUDED.items,
        total = EXCLUDED.total,
        updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({
      success: true,
      message: 'Cart saved successfully',
    });
  } catch (error: any) {
    console.error('API /api/cart/save error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
