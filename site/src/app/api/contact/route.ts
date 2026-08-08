import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
    }

    const payload = {
      event: 'contact_form_submission',
      name: name || 'Anonymous',
      email,
      subject: subject || 'General question',
      message,
      timestamp: new Date().toISOString(),
    };

    // Forward to Google Sheets Webhook / Operational Notification Endpoint
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Failed to dispatch contact form to webhook:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission received and queued for operational notification',
      data: payload,
    });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
