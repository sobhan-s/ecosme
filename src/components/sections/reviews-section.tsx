'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/interface/sanity.types';

interface ReviewsProps {
  data: Testimonial[];
}

const fallback: Testimonial[] = [
  {
    _id: '1',
    name: 'Sarah Chen',
    role: 'CEO at NovaTech',
    rating: 5,
    quote:
      'Working with this team completely transformed our brand. The attention to detail and creative thinking is unmatched. Our conversions doubled in 3 months.',
  },
  {
    _id: '2',
    name: 'Marcus Reid',
    role: 'Founder, Drift Studio',
    rating: 5,
    quote:
      "They delivered our platform ahead of schedule and the quality was exceptional. I wouldn't trust any other team with our product.",
  },
  {
    _id: '3',
    name: 'Priya Sharma',
    role: 'Head of Marketing',
    rating: 5,
    quote:
      'The motion campaign they designed for us hit 2 million impressions in the first week. Absolutely phenomenal creative work.',
  },
  {
    _id: '4',
    name: 'James Okafor',
    role: 'CTO at Finly',
    rating: 5,
    quote:
      'Clean code, pixel-perfect design, and communication throughout. This is what a true digital partner looks like.',
  },
  {
    _id: '5',
    name: 'Lena Müller',
    role: 'Product Lead, Waveform',
    rating: 5,
    quote:
      'Incredible results. They took our vague brief and turned it into something we never could have imagined on our own.',
  },
  {
    _id: '6',
    name: 'David Park',
    role: 'CMO at Stackly',
    rating: 5,
    quote:
      'Every deadline hit, every deliverable polished. Rare to find a team that actually cares this much.',
  },
];

function ReviewCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <div
      className={`shrink-0 w-85 rounded-2xl p-6 flex flex-col gap-4 border ${
        dark ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-border'
      }`}
    >
      <div className="flex gap-1">
        {[...Array(t.rating ?? 5)].map((_, j) => (
          <Star key={j} size={13} className="fill-[#F15A2B] text-[#F15A2B]" />
        ))}
      </div>

      <p
        className={`text-sm leading-relaxed flex-1 ${dark ? 'text-white/75' : 'text-foreground'}`}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        className={`flex items-center gap-3 pt-3 border-t ${dark ? 'border-white/10' : 'border-border'}`}
      >
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt={t.name}
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#F15A2B]/15 flex items-center justify-center shrink-0">
            <span className="font-display font-black text-[#F15A2B] text-sm">
              {t.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className={`font-semibold text-sm ${dark ? 'text-white' : ''}`}>
            {t.name}
          </p>
          <p
            className={`text-xs ${dark ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection({ data }: ReviewsProps) {
  const items = data?.length ? data : fallback;

  const row1 = [...items, ...items, ...items];
  const row2 = [
    ...items.slice().reverse(),
    ...items.slice().reverse(),
    ...items.slice().reverse(),
  ];

  return (
    <section id="reviews" className="py-24 bg-[#fafaf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-5">
              Reviews
            </span>
            <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-tight leading-[0.9]">
              What Our Clients
              <br />
              Say About Us
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-border self-start md:self-end">
            <div>
              <p className="font-display font-black text-4xl leading-none">
                4.9
              </p>
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className="fill-[#F15A2B] text-[#F15A2B]"
                  />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-semibold text-sm">{items.length * 47}+</p>
              <p className="text-muted-foreground text-xs">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex overflow-hidden mb-4 mx-[245px]">
        <div className="absolute left-0 top-0 bottom-0 w-7 bg-linear-to-r from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-7 bg-linear-to-l from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee-left">
          {row1.map((t, i) => (
            <ReviewCard key={`r1-${t._id}-${i}`} t={t} dark={i % 3 === 1} />
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden mx-[245px]">
        <div className="absolute left-0 top-0 bottom-0 w-7 bg-linear-to-r from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-7 bg-linear-to-l from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee-right">
          {row2.map((t, i) => (
            <ReviewCard key={`r2-${t._id}-${i}`} t={t} dark={i % 3 === 2} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
