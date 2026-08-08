import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await req.json();
    const { email, source = 'launch_notify' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // 1. Save to Database
    await sql`
      INSERT INTO newsletter (email, source, created_at)
      VALUES (${email}, ${source}, CURRENT_TIMESTAMP)
      ON CONFLICT (email) DO NOTHING
    `;

    // 2. Optional: Send Welcome Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'OrbitGuard <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to OrbitGuard!',
        text: 'Thanks for signing up to receive updates. We will let you know as soon as we launch!',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Signup successful',
    });
  } catch (error: any) {
    console.error('API /api/notify error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
