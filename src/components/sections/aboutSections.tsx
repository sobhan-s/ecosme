import Image from 'next/image';
import type { AboutSection } from '@/interface/sanity.types';
import { DynamicIcon } from '@/utils/DynamicIcons';

interface AboutProps {
  data: AboutSection | null;
}

const fallback: AboutSection = {
  badge: 'About Us',
  heading: 'We Build Digital Experiences That Last',
  subheading:
    'A team of designers, developers, and strategists obsessed with craft.',
  highlights: [
    {
      icon: 'zap',
      title: 'Fast Delivery',
      description: 'We ship fast without sacrificing quality.',
    },
    {
      icon: 'heart',
      title: 'Client First',
      description: 'Your goals are our goals. Always.',
    },
    {
      icon: 'shield',
      title: 'Proven Results',
      description: '350+ projects delivered with measurable ROI.',
    },
  ],
};

export function AboutSection({ data }: AboutProps) {
  const d = data ?? fallback;

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-6">
              {d.badge ?? 'About Us'}
            </span>

            <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] uppercase tracking-tight mb-6">
              {d.heading}
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md">
              {d.subheading}
            </p>

            <div className="flex flex-col gap-0 divide-y divide-border">
              {(d.highlights ?? []).map((h, i) => (
                <div key={i} className="flex items-start gap-5 py-6 group">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F15A2B]/8 border border-[#F15A2B]/15 flex items-center justify-center group-hover:bg-[#F15A2B] transition-colors">
                      <span className="font-display font-black text-[#F15A2B] text-base group-hover:text-white transition-colors leading-none">
                        <DynamicIcon name={h?.icon} />
                      </span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="font-display font-bold text-lg uppercase tracking-tight mb-1">
                      {h.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {d.image ? (
              <Image
                src={d.image}
                alt="About"
                width={600}
                height={500}
                className="rounded-2xl object-cover w-full"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      val: '350+',
                      label: 'Projects Delivered',
                      bg: 'bg-[#0f0f0f]',
                      valColor: 'text-white',
                      labelColor: 'text-white/40',
                    },
                    {
                      val: '98%',
                      label: 'Satisfaction Rate',
                      bg: 'bg-[#F15A2B]',
                      valColor: 'text-white',
                      labelColor: 'text-white/70',
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`${s.bg} rounded-2xl p-7 flex flex-col justify-between min-h-[160px]`}
                    >
                      <p
                        className={`font-display font-black text-5xl leading-none ${s.valColor}`}
                      >
                        {s.val}
                      </p>
                      <p className={`text-sm font-medium ${s.labelColor}`}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f5f5f3] border border-border rounded-2xl p-7 flex items-center justify-between gap-6">
                  <div>
                    <p className="font-display font-black text-4xl leading-none mb-1">
                      8+
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Years of Experience
                    </p>
                  </div>
                  <div className="h-14 w-px bg-border" />
                  <div>
                    <p className="font-display font-black text-4xl leading-none mb-1">
                      40+
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Team Members
                    </p>
                  </div>
                  <div className="h-14 w-px bg-border" />
                  <div>
                    <p className="font-display font-black text-4xl leading-none mb-1">
                      12
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Countries Served
                    </p>
                  </div>
                </div>

                <div className="bg-[#f5f5f3] border border-border rounded-2xl p-7">
                  <p className="text-foreground text-lg leading-relaxed font-medium mb-5 italic">
                    &ldquo;We don&apos;t just manage files - we create
                    certainty. Every report, every audit is proof of your
                    excellence.&ldquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F15A2B]/15 flex items-center justify-center">
                      <span className="font-display font-black text-[#F15A2B] text-sm">
                        S
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Sobhan Sahoo</p>
                      <p className="text-muted-foreground text-xs">
                        Founder & Creative Director
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
