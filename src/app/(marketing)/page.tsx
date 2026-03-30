import {
  getHeroSection,
  getAboutSection,
  getWorkItems,
  getPricingPlans,
  getTestimonials,
  getCustomerLogos,
  getBlogPreviews,
} from '@/lib/sanity/query';

// export const dynamic = 'force-dynamic';

import { HeroSection } from '@/components/sections/heroSections';
import { AboutSection } from '@/components/sections/aboutSections';
import { WorkSection } from '@/components/sections/work-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { CustomersSection } from '@/components/sections/customers-section';
import { BlogPreviewSection } from '@/components/sections/blog-preview-section';
import { NewsletterSection } from '@/components/sections/newsletter-section';

export const revalidate = 60;

export default async function HomePage() {
  const [hero, about, work, pricing, testimonials, logos, blogPosts] =
    await Promise.all([
      getHeroSection().catch(() => null),
      getAboutSection().catch(() => null),
      getWorkItems().catch(() => []),
      getPricingPlans().catch(() => []),
      getTestimonials().catch(() => []),
      getCustomerLogos().catch(() => []),
      getBlogPreviews(3).catch(() => []),
    ]);

  return (
    <>
      <HeroSection data={hero} />
      <CustomersSection data={logos} />
      <AboutSection data={about} />
      <WorkSection data={work} />
      <PricingSection data={pricing} />
      <ReviewsSection data={testimonials} />
      <BlogPreviewSection data={blogPosts} />
      <NewsletterSection />
    </>
  );
}
