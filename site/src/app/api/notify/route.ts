import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source = 'launch_notify' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const payload = {
      event: 'notify_signup',
      email,
      source,
      timestamp: new Date().toISOString(),
    };

    // Forward to Google Sheets Webhook (e.g. Google Apps Script / Zapier) if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Failed to dispatch webhook to Google Sheets:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Notification request saved and dispatched',
      data: payload,
    });
  } catch (error) {
    console.error('API /api/notify error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
