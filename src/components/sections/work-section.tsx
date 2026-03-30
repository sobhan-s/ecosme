import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { WorkItem } from '@/interface/sanity.types';

interface WorkProps {
  data: WorkItem[];
}

const fallback: WorkItem[] = [
  {
    _id: '1',
    title: 'Brand Identity System',
    tag: 'Graphic Design',
    description: 'Complete visual identity for a fintech startup.',
  },
  {
    _id: '2',
    title: 'E-commerce Platform',
    tag: 'Web Design',
    description: 'Full-stack store with 40% conversion lift.',
  },
  {
    _id: '3',
    title: 'Motion Campaign',
    tag: 'Motion Graphic',
    description: 'Social campaign that reached 2M impressions.',
  },
  {
    _id: '4',
    title: 'SaaS Dashboard',
    tag: 'Web Design',
    description: 'Complex data visualisation made simple.',
  },
];

const BG_COLORS = [
  'bg-[#F15A2B]/8',
  'bg-blue-50',
  'bg-emerald-50',
  'bg-purple-50',
];

export function WorkSection({ data }: WorkProps) {
  const items = data?.length ? data : fallback;

  return (
    <section id="work" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-5">
              Our Work
            </span>
            <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-tight leading-[0.9]">
              Projects That
              <br />
              Make an Impact
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed md:text-right">
            A selection of work we&apos;re proud of from brand systems to
            interactive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={item._id}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-[#F15A2B]/40 transition-all duration-300 hover:shadow-lg ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div
                className={`relative w-full overflow-hidden ${i === 0 ? 'h-72' : 'h-52'} ${BG_COLORS[i % 4]}`}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-black text-[8rem] uppercase opacity-[0.07] select-none">
                      {item.title.charAt(0)}
                    </span>
                  </div>
                )}
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 w-10 h-10 border border-border rounded-full flex items-center justify-center group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
