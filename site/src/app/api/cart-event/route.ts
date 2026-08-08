import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, items, total, timestamp } = body;

    const payload = {
      event: 'cart_activity',
      action: action || 'cart_update',
      itemsCount: items?.length || 0,
      items: items || [],
      total: total || 0,
      timestamp: timestamp || new Date().toISOString(),
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Failed to dispatch cart activity to webhook:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cart activity logged',
      data: payload,
    });
  } catch (error) {
    console.error('API /api/cart-event error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
