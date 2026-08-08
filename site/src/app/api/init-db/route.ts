import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    // 1. Create Carts Table
    await sql`
      CREATE TABLE IF NOT EXISTS carts (
        email VARCHAR(255) PRIMARY KEY,
        items JSONB NOT NULL,
        total NUMERIC(10, 2) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Contacts Table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Create Newsletter Table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter (
        email VARCHAR(255) PRIMARY KEY,
        source VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
