import { client } from './client';

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      "logo": logo.asset->url,
      tagline,
      navLinks,
      footerText,
      socialLinks
    }
  `);
}

export async function getHeroSection() {
  return client.fetch(`
    *[_type == "heroSection"][0] {
      headlineLine1,
      headlineLine2,
      subtext,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      stats,
      "heroImage": heroImage.asset->url
    }
  `);
}

export async function getAboutSection() {
  return client.fetch(`
    *[_type == "aboutSection"][0] {
      badge,
      heading,
      subheading,
      description,
      "image": image.asset->url,
      highlights
    }
  `);
}

export async function getWorkItems() {
  return client.fetch(`
    *[_type == "workItem"] | order(order asc) {
      _id,
      title,
      description,
      "image": image.asset->url,
      tag,
      link,
      featured
    }
  `);
}

export async function getPricingPlans() {
  return client.fetch(`
    *[_type == "pricingPlan"] | order(order asc) {
      _id,
      name,
      price,
      period,
      description,
      features,
      ctaLabel,
      ctaHref,
      highlighted,
      badge
    }
  `);
}

export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] {
      _id,
      name,
      role,
      "avatar": avatar.asset->url,
      quote,
      rating,
      company,
      featured
    }
  `);
}

export async function getCustomerLogos() {
  return client.fetch(`
    *[_type == "customerLogo"] | order(order asc) {
      _id,
      companyName,
      "logo": logo.asset->url,
      url
    }
  `);
}

export async function getBlogPreviews(limit = 3) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverImage": coverImage.asset->url,
      publishedAt,
      readingTime,
      categories,
      "author": author { name, "avatar": avatar.asset->url },
      featured
    }`,
    { limit },
  );
}

export async function getAllBlogPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverImage": coverImage.asset->url,
      publishedAt,
      readingTime,
      categories,
      "author": author { name, "avatar": avatar.asset->url },
      featured
    }
  `);
}

export async function getBlogPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverImage": coverImage.asset->url,
      publishedAt,
      readingTime,
      categories,
      "author": author { name, bio, "avatar": avatar.asset->url },
      body,
      featured,
      seo
    }`,
    { slug },
  );
}

export async function getAllBlogSlugs() {
  return client.fetch(`
    *[_type == "post"] { "slug": slug.current }
  `);
}
