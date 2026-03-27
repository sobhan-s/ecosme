import { NextResponse } from 'next/server';
import { db } from '@/database/index';
import { subscribers } from '@/database/schema/subscribers.schema';
import { users } from '@/database/schema/user.schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const [subResult, userResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(subscribers),
      db.select({ count: sql<number>`count(*)` }).from(users),
    ]);

    return NextResponse.json({
      subscribers: Number(subResult[0]?.count ?? 0),
      users: Number(userResult[0]?.count ?? 0),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ subscribers: 0, users: 0 }, { status: 500 });
  }
}
