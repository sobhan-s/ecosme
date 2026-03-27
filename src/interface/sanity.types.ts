export interface SiteSettings {
  siteName: string;
  logo?: string;
  tagline?: string;
  navLinks?: { label: string; href: string }[];
  footerText?: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface HeroSection {
  headlineLine1: string;
  headlineLine2: string;
  subtext?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: { value: string; label: string }[];
  heroImage?: string;
}

export interface AboutSection {
  badge?: string;
  heading: string;
  subheading?: string;
  description?: any[];
  image?: string;
  highlights?: { icon?: string; title: string; description?: string }[];
}

export interface WorkItem {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  tag?: string;
  link?: string;
  featured?: boolean;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  _id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: PricingFeature[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  avatar?: string;
  quote: string;
  rating?: number;
  company?: string;
  featured?: boolean;
}

export interface CustomerLogo {
  _id: string;
  companyName: string;
  logo: string;
  url?: string;
}

export interface BlogAuthor {
  name?: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPostPreview {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt?: string;
  readingTime?: number;
  categories?: string[];
  author?: BlogAuthor;
  featured?: boolean;
}

export interface BlogPost extends BlogPostPreview {
  body?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface StatsResponse {
  subscribers: number;
  users: number;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}
