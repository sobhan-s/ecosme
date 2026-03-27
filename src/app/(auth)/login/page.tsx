import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/loginForm';

export const metadata = { title: 'Sign In — Vantage' };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
