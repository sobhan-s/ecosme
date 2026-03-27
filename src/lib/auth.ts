import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/database/index';
import { accounts } from '@/database/schema/accounts.schema';
import { users } from '@/database/schema/user.schema';
import { sessions } from '@/database/schema/session.schema';
import { verifications } from '@/database/schema/verification.schema';
import { config } from 'dotenv';

config({
  path: '.env',
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ['openid', 'email', 'profile'],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
