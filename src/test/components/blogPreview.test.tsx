import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BlogPreviewSection } from '../../components/sections/blog-preview-section';

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('BlogPreviewSection', () => {
  it('renders with provided data', () => {
    const mockData = [
      {
        _id: '1',
        title: 'test blog preview title',
        slug: 'testslug',
        excerpt: 'design',
      },
    ];

    render(<BlogPreviewSection data={mockData} />);

    expect(screen.getByText('test blog preview title')).toBeTruthy();

    expect(screen.getByText('design')).toBeTruthy();

    const link = screen.getByRole('link', { name: /test blog preview title/i });
    expect(link.getAttribute('href')).toBe('/blog/testslug');
  });
});
