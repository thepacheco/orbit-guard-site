import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
    }

    const safeName = name || 'Anonymous';
    const safeSubject = subject || 'General question';

    // 1. Save to Database
    await sql`
      INSERT INTO contacts (name, email, subject, message, created_at)
      VALUES (${safeName}, ${email}, ${safeSubject}, ${message}, CURRENT_TIMESTAMP)
    `;

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'OrbitGuard <onboarding@resend.dev>',
        to: ['support@orbitguard.com'],
        subject: `New Contact Submission: ${safeSubject}`,
        text: `Name: ${safeName}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      });

      // Optional auto-reply to user
      await resend.emails.send({
        from: 'OrbitGuard <onboarding@resend.dev>',
        to: [email],
        subject: `We received your message: ${safeSubject}`,
        text: `Hi ${safeName},\n\nWe have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nThanks,\nThe OrbitGuard Team`,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission received successfully',
    });
  } catch (error: any) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
