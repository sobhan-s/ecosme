'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { signIn, useSession } from '@/lib/authClient';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/dashboard';
  const { data: session, isPending } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!isPending && session) router.replace('/dashboard');
  }, [session, isPending, router]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn.email({
      email,
      password,
      callbackURL: redirect,
    });
    if (result.error) {
      setError(result.error.message ?? 'Invalid email or password.');
      setLoading(false);
    } else {
      router.push(redirect);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn.social({
      provider: 'google',
      callbackURL: redirect,
    });
  }

  if (isPending || session) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="w-6 h-6 border-2 border-border border-t-[#F15A2B] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-105">
      <Link href="/" className="flex items-center gap-1.5 mb-10">
        <span className="font-display font-black text-2xl tracking-tight uppercase">
          Vantage
        </span>
        <span className="w-3 h-3 bg-[#F15A2B] rounded-sm rotate-12 inline-block" />
      </Link>

      <div className="mb-8">
        <h1 className="font-display font-black text-[clamp(2.5rem,5vw,3.5rem)] uppercase tracking-tight leading-[0.9] mb-3">
          Welcome
          <br />
          Back
        </h1>
        <p className="text-muted-foreground text-sm">
          Sign in to access your dashboard and blog content.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading || loading}
        className="w-full h-12 flex items-center justify-center gap-3 border border-border rounded-xl bg-white hover:bg-gray-50 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-5"
      >
        {googleLoading ? (
          <Loader2 size={16} className="animate-spin text-muted-foreground" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
        )}
        {googleLoading ? 'Redirecting…' : 'Continue with Google'}
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#F15A2B] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#F15A2B] focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-12 bg-[#F15A2B] hover:bg-[#F15A2B]/90 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Signing in…
            </>
          ) : (
            <>
              Sign In <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-[#F15A2B] font-semibold hover:underline underline-offset-4"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}
