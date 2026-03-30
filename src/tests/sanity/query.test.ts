import { describe, it, expect, vi, beforeEach } from 'vitest';
import { client } from '@/lib/sanity/client';
import {
  getSiteSettings,
  getHeroSection,
  getAboutSection,
  getWorkItems,
  getPricingPlans,
  getTestimonials,
  getCustomerLogos,
  getBlogPreviews,
  getAllBlogPosts,
  getBlogPost,
  getAllBlogSlugs,
} from '@/lib/sanity/query';

vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

describe('Sanity Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getSiteSettings', async () => {
    const mockData = { siteName: 'ecosme' };
    (client.fetch as any).mockResolvedValue(mockData);

    const result = await getSiteSettings();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('siteSettings'),
    );
    expect(result).toEqual(mockData);
  });

  it('should call getHeroSection', async () => {
    const mockData = { title: 'Hero' };
    (client.fetch as any).mockResolvedValue(mockData);

    const result = await getHeroSection();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('heroSection'),
    );
    expect(result).toEqual(mockData);
  });

  it('should call getAboutSection', async () => {
    (client.fetch as any).mockResolvedValue({});
    await getAboutSection();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('aboutSection'),
    );
  });

  it('should call getWorkItems', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getWorkItems();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('workItem'),
    );
  });

  it('should call getPricingPlans', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getPricingPlans();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('pricingPlan'),
    );
  });

  it('should call getTestimonials', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getTestimonials();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('testimonial'),
    );
  });

  it('should call getCustomerLogos', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getCustomerLogos();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('customerLogo'),
    );
  });

  it('should call getBlogPreviews with default limit', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getBlogPreviews();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('post'), {
      limit: 3,
    });
  });

  it('should call getBlogPreviews with custom limit', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getBlogPreviews(5);
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('post'), {
      limit: 5,
    });
  });

  it('should call getAllBlogPosts', async () => {
    (client.fetch as any).mockResolvedValue([]);
    await getAllBlogPosts();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('post'));
  });

  it('should call getBlogPost with slug', async () => {
    const slug = 'test-post';
    (client.fetch as any).mockResolvedValue({});
    await getBlogPost(slug);
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('post'), {
      slug,
    });
  });

  it('should call getAllBlogSlugs', async () => {
    (client.fetch as any).mockResolvedValue([{ slug: 'post-1' }]);
    await getAllBlogSlugs();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('post'));
  });
});
