import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/interface/sanity.types';

interface PricingProps {
  data: PricingPlan[];
}

const fallback: PricingPlan[] = [
  {
    _id: '1',
    name: 'Starter',
    price: 'Free',
    period: 'per month',
    description: 'Perfect for small projects and side hustles.',
    ctaLabel: 'Get Started',
    ctaHref: '/signup',
    highlighted: false,
    features: [
      { text: '5 projects', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Community support', included: true },
      { text: 'Custom domain', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    _id: '2',
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    ctaLabel: 'Start Free Trial',
    ctaHref: '/signup',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'White-label', included: false },
    ],
  },
  {
    _id: '3',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organisations.',
    ctaLabel: 'Contact Sales',
    ctaHref: '#contact',
    highlighted: false,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'White-label', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Dedicated manager', included: true },
      { text: 'Custom integrations', included: true },
    ],
  },
];

export function PricingSection({ data }: PricingProps) {
  const plans = data?.length ? data : fallback;

  return (
    <section id="pricing" className="py-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-5">
            Pricing
          </span>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-tight leading-[0.9]">
            Simple, Transparent
            <br />
            Pricing
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm">
            No hidden fees. No surprises. Pick the plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={cn(
                'relative flex flex-col rounded-2xl p-8 border transition-all duration-300',
                plan.highlighted
                  ? 'bg-[#0f0f0f] text-white border-transparent shadow-2xl scale-[1.04] z-10'
                  : 'bg-white border-border hover:border-[#F15A2B]/30 hover:shadow-md',
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#F15A2B] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <p
                className={cn(
                  'text-xs font-semibold uppercase tracking-widest mb-4',
                  plan.highlighted ? 'text-white/50' : 'text-muted-foreground',
                )}
              >
                {plan.name}
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span className="font-display font-black text-5xl leading-none">
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={cn(
                      'text-sm pb-1',
                      plan.highlighted
                        ? 'text-white/40'
                        : 'text-muted-foreground',
                    )}
                  >
                    /{plan.period}
                  </span>
                )}
              </div>

              {plan.description && (
                <p
                  className={cn(
                    'text-sm mb-8 leading-relaxed',
                    plan.highlighted
                      ? 'text-white/60'
                      : 'text-muted-foreground',
                  )}
                >
                  {plan.description}
                </p>
              )}

              <div
                className={cn(
                  'h-px mb-6',
                  plan.highlighted ? 'bg-white/10' : 'bg-border',
                )}
              />

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <span className="w-5 h-5 rounded-full bg-[#F15A2B]/15 flex items-center justify-center shrink-0">
                        <Check
                          size={11}
                          className="text-[#F15A2B]"
                          strokeWidth={3}
                        />
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                          plan.highlighted ? 'bg-white/5' : 'bg-border/50',
                        )}
                      >
                        <X
                          size={11}
                          className={
                            plan.highlighted
                              ? 'text-white/20'
                              : 'text-muted-foreground/40'
                          }
                          strokeWidth={3}
                        />
                      </span>
                    )}
                    <span
                      className={cn(
                        !f.included &&
                          (plan.highlighted
                            ? 'text-white/30'
                            : 'text-muted-foreground/50'),
                      )}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref ?? '/signup'}>
                <button
                  className={cn(
                    'w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200',
                    plan.highlighted
                      ? 'bg-[#F15A2B] hover:bg-[#F15A2B]/90 text-white'
                      : 'bg-transparent border border-border hover:border-foreground hover:bg-foreground hover:text-background',
                  )}
                >
                  {plan.ctaLabel ?? 'Get Started'}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
