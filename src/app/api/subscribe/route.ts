import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/index';
import { subscribers } from '@/database/schema/subscribers.schema';
import { sendSubscribeConfirmation } from '@/lib/mail';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const existing = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed!' },
        { status: 409 },
      );
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ??
      req.headers.get('x-real-ip') ??
      null;

    await db.insert(subscribers).values({
      id: crypto.randomUUID(),
      email,
      ipAddress: ip,
      confirmed: false,
    });

    sendSubscribeConfirmation(email).catch((err) =>
      console.error('Mail send failed:', err),
    );

    return NextResponse.json(
      { success: true, message: "You're on the list! Check your inbox." },
      { status: 201 },
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
