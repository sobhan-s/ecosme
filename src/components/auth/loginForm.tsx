'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { signIn } from '@/lib/authClient';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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

  return (
    <div className="w-full max-w-105">
      <span className="flex items-center gap-1.5 mb-10">
        <span className="font-display font-black text-2xl tracking-tight uppercase">
          Vantage
        </span>
        <span className="w-3 h-3 bg-[#F15A2B] rounded-sm rotate-12 inline-block" />
      </span>

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

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
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
