import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { HeroSection } from '@/interface/sanity.types';

interface HeroProps {
  data: HeroSection | null;
}

const fallback: HeroSection = {
  headlineLine1: 'DRIVING → DIGITAL',
  headlineLine2: '→ SUCCESS * TOGETHER',
  subtext:
    "Your trusted partner for all things digital. Let's transform your online presence.",
  primaryCtaLabel: 'Contact Us',
  primaryCtaHref: '#contact',
  secondaryCtaLabel: 'Book Meeting',
  secondaryCtaHref: '#contact',
  stats: [
    { value: '350+', label: 'Projects completed' },
    { value: '40+', label: 'Team members' },
  ],
};

export function HeroSection({ data }: HeroProps) {
  const d = data ?? fallback;

  return (
    <section id="home" className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <h1 className="font-display font-black text-[clamp(3rem,2vw,8rem)] leading-[0.88] tracking-tight uppercase text-foreground">
          {d.headlineLine1?.split('→').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-[#F15A2B]">→</span>}
            </span>
          ))}
        </h1>
        <h1 className="font-display font-black text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight uppercase text-foreground">
          {d.headlineLine2
            ?.replace('→', '__ARROW__')
            .replace('*', '__STAR__')
            .split(/(__ARROW__|__STAR__)/)
            .map((part, i) => {
              if (part === '__ARROW__')
                return (
                  <span key={i} className="text-[#F15A2B]">
                    →
                  </span>
                );
              if (part === '__STAR__')
                return (
                  <span key={i} className="text-[#F15A2B]">
                    {' '}
                    *{' '}
                  </span>
                );
              return <span key={i}>{part}</span>;
            })}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#f5f5f3] rounded-2xl p-8 flex flex-col justify-between min-h-75 relative overflow-hidden border border-border">
          <div className="absolute -right-4 -top-4 font-display font-black text-[8rem] leading-none text-foreground/4 select-none pointer-events-none uppercase">
            {d.stats?.[0]?.value ?? '350'}
          </div>

          <div className="relative z-10">
            <p className="font-display font-black text-6xl text-foreground leading-none">
              {d.stats?.[0]?.value ?? '350+'}
            </p>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              {d.stats?.[0]?.label ?? 'Projects delivered'}
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {d.subtext}
            </p>
            <p className="font-display font-bold text-base mt-4 italic text-foreground/70">
              &quot;Centralize. Sync. Scale.&quot;
            </p>
          </div>

          <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#F15A2B] rounded-xl flex items-center justify-center shadow-lg shadow-[#F15A2B]/20">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 15L15 3M15 3H7M15 3V11"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="bg-[#f5f5f3] rounded-2xl p-8 flex flex-col items-center justify-center gap-5 text-center border border-border">
          <p className="text-muted-foreground text-sm leading-relaxed max-w-55">
            {d.subtext}
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link href={d.primaryCtaHref ?? '#contact'}>
              <button className="h-11 px-7 bg-[#F15A2B] hover:bg-[#F15A2B]/90 text-white rounded-full font-semibold text-sm transition-all shadow-md shadow-[#F15A2B]/20">
                {d.primaryCtaLabel ?? 'Contact Us'}
              </button>
            </Link>
            <Link href={d.secondaryCtaHref ?? '#contact'}>
              <button className="h-11 px-7 bg-transparent border border-foreground/20 hover:border-foreground text-foreground rounded-full font-semibold text-sm transition-all">
                {d.secondaryCtaLabel ?? 'Book Meeting'}
              </button>
            </Link>
          </div>

          <button className="flex items-center gap-3 bg-white border border-border rounded-full pl-2 pr-5 py-2 hover:shadow-md transition-all group">
            <span className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center group-hover:bg-[#F15A2B] transition-colors">
              <Play size={11} fill="white" className="text-white ml-0.5" />
            </span>
            <span className="text-sm font-medium">See how it works</span>
          </button>

          <div className="flex items-center gap-3 pt-1">
            <p className="font-display font-black text-5xl leading-none">
              {d.stats?.[1]?.value ?? '40+'}
            </p>
            <div className="flex -space-x-2">
              {[
                'bg-[#F15A2B]',
                'bg-yellow-400',
                'bg-sky-400',
                'bg-emerald-400',
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white ${bg}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            {d.stats?.[1]?.label ?? 'Team members across the globe'}
          </p>
        </div>

        <div className="bg-[#f5f5f3] rounded-2xl p-8 flex flex-col justify-between min-h-75 border border-border">
          <div>
            <p className="font-semibold text-sm mb-1">Our Services</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are committed to transparency, innovation, and delivering
              outstanding value.
            </p>
          </div>

          <div>
            <p className="font-display font-black text-[2.8rem] leading-none mb-6">
              Expertise
              <br />
              In
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Cloud Storage',
                'Smart Tagging',
                'Version Control',
                'Instant Sharing',
              ].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-between border border-border bg-white rounded-full px-4 py-2 text-xs font-semibold hover:border-[#F15A2B] hover:text-[#F15A2B] transition-colors cursor-pointer group"
                >
                  <span>{tag}</span>
                  <span className="w-5 h-5 border border-border rounded-full flex items-center justify-center text-[10px] group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
