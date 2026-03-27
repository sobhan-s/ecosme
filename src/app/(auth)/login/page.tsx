import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/loginForm';
import { FiLoader } from 'react-icons/fi';

export const metadata = { title: 'Sign In - ecosme' };

export default function LoginPage() {
  return (
    <Suspense fallback={<FiLoader size={16} className="animate-spin" />}>
      <LoginForm />
    </Suspense>
  );
}
