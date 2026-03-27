import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import {
  Users,
  Mail,
  LogOut,
  BookOpen,
  ArrowUpRight,
  LayoutDashboard,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/lib/authClient';
import { Button } from '@/components/ui/button';

async function getStats() {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/stats`, { cache: 'no-store' });
    return res.json();
  } catch {
    return { subscribers: 0, users: 0 };
  }
}

export const metadata = { title: 'Dashboard — Vantage' };

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login?redirect=/dashboard');

  const stats = await getStats();
  const user = session.user;

  const initials =
    user.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? 'U';

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <header className="bg-white border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl uppercase tracking-tight">
              Vantage
            </span>
            <span className="w-2.5 h-2.5 bg-[#F15A2B] rounded-sm rotate-12 inline-block" />
          </Link>
          <span className="text-border mx-2">|</span>
          <span className="text-sm text-muted-foreground font-medium">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to site
          </Link>
          {/* <Button
            onClick={() => signOut()}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 h-9 px-4 border border-border rounded-lg text-sm font-medium hover:bg-foreground hover:text-background transition-all"
          >
            <LogOut size={14} /> Sign Out
          </Button> */}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0f0f0f] flex items-center justify-center shrink-0">
              <span className="font-display font-black text-xl text-white">
                {initials}
              </span>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-0.5">
                Welcome back
              </p>
              <h1 className="font-display font-black text-3xl uppercase tracking-tight leading-none">
                {user.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 self-start sm:self-auto">
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-xs font-medium text-muted-foreground">
              Member since {memberSince}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F15A2B] rounded-2xl p-7 flex flex-col justify-between min-h-35 relative overflow-hidden">
            {/* <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5" /> */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  Subscribers
                </p>
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                  <Mail size={15} className="text-white" />
                </div>
              </div>
              <p className="font-display font-black text-5xl text-white leading-none">
                {stats.subscribers}
              </p>
              <p className="text-white/50 text-xs mt-2">Newsletter sign-ups</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-7 flex flex-col justify-between min-h-35">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                Total Users
              </p>
              <div className="w-8 h-8 bg-[#F15A2B]/10 rounded-lg flex items-center justify-center">
                <Users size={15} className="text-[#F15A2B]" />
              </div>
            </div>
            <p className="font-display font-black text-5xl leading-none">
              {stats.users}
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Registered accounts
            </p>
          </div>
        </div>

        <div className="mb-3">
          <h2 className="font-display font-black text-xl uppercase tracking-tight mb-4">
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/blog">
            <div className="group bg-white border border-border rounded-2xl p-6 flex items-center justify-between hover:border-[#F15A2B]/40 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#F15A2B]/8 border border-[#F15A2B]/15 rounded-xl flex items-center justify-center group-hover:bg-[#F15A2B] transition-colors">
                  <BookOpen
                    size={18}
                    className="text-[#F15A2B] group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">Blog Posts</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Read all full articles
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 border border-border rounded-full flex items-center justify-center group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all">
                <ArrowUpRight size={15} />
              </div>
            </div>
          </Link>

          <Link href="/studio" target="_blank">
            <div className="group bg-white border border-border rounded-2xl p-6 flex items-center justify-between hover:border-[#F15A2B]/40 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#F15A2B]/8 border border-[#F15A2B]/15 rounded-xl flex items-center justify-center group-hover:bg-[#F15A2B] transition-colors">
                  <LayoutDashboard
                    size={18}
                    className="text-[#F15A2B] group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">Sanity Studio</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Manage CMS content
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 border border-border rounded-full flex items-center justify-center group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all">
                <ExternalLink size={15} />
              </div>
            </div>
          </Link>

          <Link href="/#pricing">
            <div className="group bg-white border border-border rounded-2xl p-6 flex items-center justify-between hover:border-[#F15A2B]/40 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#F15A2B]/8 border border-[#F15A2B]/15 rounded-xl flex items-center justify-center group-hover:bg-[#F15A2B] transition-colors">
                  <TrendingUp
                    size={18}
                    className="text-[#F15A2B] group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">View Pricing</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Upgrade your plan
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 border border-border rounded-full flex items-center justify-center group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all">
                <ArrowUpRight size={15} />
              </div>
            </div>
          </Link>

          <div className="bg-[#0f0f0f] rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-white/60" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Newsletter</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {stats.subscribers} subscribers so far
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display font-black text-3xl text-white leading-none">
                {stats.subscribers}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
