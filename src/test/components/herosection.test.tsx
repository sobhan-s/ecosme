import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '../../components/sections/heroSections';

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('Hero sections', () => {
  it('show fallback data when no data is provided from cms', () => {
    render(<HeroSection data={null} />);

    expect(screen.getByText(/DRIVING/i)).toBeTruthy();
    expect(screen.getByText(/SUCCESS/i)).toBeTruthy();

    expect(screen.getAllByText(/Your trusted partner/i).length).toBeGreaterThan(
      0,
    );

    expect(screen.getByText('Contact Us')).toBeTruthy();
    expect(screen.getByText('Book Meeting')).toBeTruthy();
  });

  it('show data in screen when data is provided', () => {
    render(
      <HeroSection
        data={{
          headlineLine1: 'TEST1 -> HEADLINE1',
          headlineLine2: '-> TEST2 * HEADLINE2',
          subtext: 'Test subtext',
          primaryCtaLabel: 'Test lebel',
          primaryCtaHref: '/testlebelhref',
          secondaryCtaLabel: 'Learn',
          secondaryCtaHref: '/learn',
          stats: [
            { value: '100+', label: 'Clients' },
            { value: '10+', label: 'Developers' },
          ],
        }}
      />,
    );

    expect(screen.getByText(/TEST1/i)).toBeTruthy();
    expect(screen.getByText(/HEADLINE1/i)).toBeTruthy();
    expect(screen.getByText(/TEST2/i)).toBeTruthy();

    expect(screen.getAllByText('Test subtext').length).toBeGreaterThan(0);

    expect(screen.getByText('Test lebel')).toBeTruthy();
    expect(screen.getByText('Learn')).toBeTruthy();
  });

  it('renders stats correctly', () => {
    render(
      <HeroSection
        data={{
          headlineLine1: 'Test',
          headlineLine2: 'Test',
          subtext: 'Test',
          primaryCtaLabel: 'CTA',
          primaryCtaHref: '#',
          secondaryCtaLabel: 'CTA2',
          secondaryCtaHref: '#',
          stats: [
            { value: '500+', label: 'Projects' },
            { value: '50+', label: 'Team' },
          ],
        }}
      />,
    );

    expect(screen.getAllByText('500+').length).toBeGreaterThan(0);
    expect(screen.getByText('Projects')).toBeTruthy();

    expect(screen.getAllByText('50+').length).toBeGreaterThan(0);
    expect(screen.getByText('Team')).toBeTruthy();
  });

  it('renders CTA links with correct hrefs', () => {
    render(
      <HeroSection
        data={{
          headlineLine1: 'Test',
          headlineLine2: 'Test',
          subtext: 'Test',
          primaryCtaLabel: 'Go',
          primaryCtaHref: '/go',
          secondaryCtaLabel: 'Docs',
          secondaryCtaHref: '/docs',
          stats: [],
        }}
      />,
    );

    const primary = screen.getByText('Go').closest('a');
    const secondary = screen.getByText('Docs').closest('a');

    expect(primary?.getAttribute('href')).toBe('/go');
    expect(secondary?.getAttribute('href')).toBe('/docs');
  });

  it('renders service tags', () => {
    render(<HeroSection data={null} />);

    expect(screen.getByText('Cloud Storage')).toBeTruthy();
    expect(screen.getByText('Smart Tagging')).toBeTruthy();
    expect(screen.getByText('Version Control')).toBeTruthy();
    expect(screen.getByText('Instant Sharing')).toBeTruthy();
  });

  it('renders play button text', () => {
    render(<HeroSection data={null} />);

    expect(screen.getByText('See how it works')).toBeTruthy();
  });
});
