import { client } from '@/lib/sanity/client';
import {
  getAboutSection,
  getAllBlogPosts,
  getAllBlogSlugs,
  getBlogPost,
  getBlogPreviews,
  getCustomerLogos,
  getHeroSection,
  getPricingPlans,
  getSiteSettings,
  getTestimonials,
  getWorkItems,
} from '@/lib/sanity/query';
import { describe, it, expect, vi, beforeEach } from 'vitest';

let queryes: any;

const mocks = {
  getSiteSettings: vi.fn(),
  getHeroSection: vi.fn(),
  getAboutSection: vi.fn(),
  getWorkItems: vi.fn(),
  getPricingPlans: vi.fn(),
  getTestimonials: vi.fn(),
  getCustomerLogos: vi.fn(),
  getBlogPreviews: vi.fn(),
  getAllBlogPosts: vi.fn(),
  getBlogPost: vi.fn(),
  getAllBlogSlugs: vi.fn(),
};

vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

describe('sanity queryes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be call site setting data', async () => {
    const mockData = { siteName: 'ecosme' };
    (client.fetch as any).mockResolvedValue(mockData);

    const result = await getSiteSettings();
    // console.log(result);
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('siteSettings'),
    );
    expect(result).toEqual(mockData);
  });

  it('should be call get hero section data', async () => {
    const mockData = {
      headlineLine1: 'test1',
      headlineLine2: 'test2',
    };

    (client.fetch as any).mockResolvedValue(mockData);

    const result = await getHeroSection();
    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('hero'));
    expect(result).toEqual(mockData);
  });

  it('should be call get about section dagta', async () => {
    const mockData = {
      heading: 'test about',
    };

    (client.fetch as any).mockResolvedValue(mockData);
    const result = await getAboutSection();

    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(expect.stringContaining('about'));
    expect(result).toEqual(mockData);
  });

  it('should be call get testimonials data', async () => {
    const mockData = {
      name: 'test testimonial',
    };

    (client.fetch as any).mockResolvedValue(mockData);
    const result = await getTestimonials();

    expect(client.fetch).toHaveBeenCalledTimes(1);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('testimonial'),
    );
    expect(result).toEqual(mockData);
  });

  it('should be call get all blog post data', async () => {
    const mockData = [{ title: 'Post 1' }, { title: 'Post 2' }];

    (client.fetch as any).mockResolvedValue(mockData);

    const result = await getBlogPreviews();

    expect(client.fetch).toHaveBeenCalledTimes(1);

    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('*[_type == "post"]'),
      { limit: 3 },
    );

    expect(result).toEqual(mockData);
  });
});
