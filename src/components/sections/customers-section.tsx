import Image from 'next/image';
import type { CustomerLogo } from '@/interface/sanity.types';

interface CustomersProps {
  data: CustomerLogo[];
}

const fallback: CustomerLogo[] = [
  { _id: '1', companyName: 'Notion', logo: '' },
  { _id: '2', companyName: 'Vercel', logo: '' },
  { _id: '3', companyName: 'Stripe', logo: '' },
  { _id: '4', companyName: 'Linear', logo: '' },
  { _id: '5', companyName: 'Figma', logo: '' },
  { _id: '6', companyName: 'Framer', logo: '' },
  { _id: '7', companyName: 'Supabase', logo: '' },
  { _id: '8', companyName: 'Resend', logo: '' },
];

export function CustomersSection({ data }: CustomersProps) {
  const logos = data?.length ? data : fallback;
  const doubled = [...logos, ...logos];

  return (
    <section
      id="customers"
      className="py-20 bg-[#fafaf9] border-y border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-3">
            Trusted By
          </span>
          <h2 className="font-display font-black text-[clamp(1.8rem,3.5vw,3rem)] uppercase tracking-tight leading-[0.95]">
            Companies That
            <br />
            Trust Us
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed md:text-right">
          Join 350+ companies already building with Vantage.
        </p>
      </div>

       <div className="relative flex overflow-hidden">
         <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#fafaf9] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-0 animate-marquee">
          {doubled.map((c, i) => (
            <div
              key={`${c._id}-${i}`}
              className="flex items-center justify-center shrink-0 px-10 h-16 border-r border-border"
            >
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={c.companyName}
                  width={100}
                  height={28}
                  className="object-contain opacity-40 hover:opacity-80 transition-opacity"
                />
              ) : (
                <span className="font-display font-black text-xl text-foreground/25 hover:text-foreground/60 transition-colors uppercase tracking-tight whitespace-nowrap">
                  {c.companyName}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
