import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const subscribers = pgTable('subscribers', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  subscribedAt: timestamp('subscribed_at').notNull().defaultNow(),
  confirmed: boolean('confirmed').notNull().default(false),
  ipAddress: text('ip_address'),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
