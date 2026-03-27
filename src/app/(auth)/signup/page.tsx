import { SignupForm } from '@/components/auth/signupForm';
import { FiLoader } from 'react-icons/fi';
import { Suspense } from 'react';

export const metadata = { title: 'Sign Up ecosme' };

export default function SignupPage() {
  return (
    <>
      <Suspense fallback={<FiLoader size={16} className="animate-spin" />}>
        <SignupForm />;
      </Suspense>
    </>
  );
}
