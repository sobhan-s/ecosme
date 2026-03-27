'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { signUp } from '@/lib/authClient';

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signUp.email({
      name,
      email,
      password,
      callbackURL: '/dashboard',
    });
    if (result.error) {
      setError(result.error.message ?? 'Could not create account.');
      setLoading(false);
    } else {
      router.push('/dashboard');
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
          Create
          <br />
          Account
        </h1>
        <p className="text-muted-foreground text-sm">
          Free forever. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#F15A2B] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

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
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
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
          {/* Password strength hint */}
          {password.length > 0 && (
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    password.length >= i * 3
                      ? i <= 1
                        ? 'bg-red-400'
                        : i <= 2
                          ? 'bg-orange-400'
                          : i <= 3
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                      : 'bg-border'
                  }`}
                />
              ))}
            </div>
          )}
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
              <Loader2 size={16} className="animate-spin" /> Creating account…
            </>
          ) : (
            <>
              Create Account <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-1">
          By signing up you agree to our{' '}
          <span className="text-[#F15A2B] cursor-pointer hover:underline">
            Terms
          </span>{' '}
          and{' '}
          <span className="text-[#F15A2B] cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-[#F15A2B] font-semibold hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
