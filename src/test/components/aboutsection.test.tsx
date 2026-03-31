import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AboutSection } from '../../components/sections/aboutSections';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('@/utils/DynamicIcons', () => ({
  DynamicIcon: () => <span>icon</span>,
}));

describe('AboutSection', () => {
  it('renders fallback when no data', () => {
    render(<AboutSection data={null} />);

    expect(screen.getByText('About Us')).toBeTruthy();
    expect(
      screen.getByText('We Build Digital Experiences That Last'),
    ).toBeTruthy();
  });

  it('renders provided data', () => {
    render(
      <AboutSection
        data={{
          badge: 'Test Badge',
          heading: 'Test Heading',
          subheading: 'Test Sub',
          highlights: [],
          // image: null,
        }}
      />,
    );

    expect(screen.getByText('Test Badge')).toBeTruthy();
    expect(screen.getByText('Test Heading')).toBeTruthy();
  });

  it('renders highlights', () => {
    render(
      <AboutSection
        data={{
          badge: 'Test Badge',
          heading: 'Test Heading',
          subheading: 'Test Sub',
          // image: null,
          highlights: [
            {
              icon: 'zap',
              title: 'Fast',
              description: 'Fast desc',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('Fast')).toBeTruthy();
    expect(screen.getByText('Fast desc')).toBeTruthy();
  });

  it('renders image when present', () => {
    render(
      <AboutSection
        data={{
          badge: 'Test Badge',
          heading: 'Test Heading',
          subheading: 'Test Sub',
          highlights: [],
          image: '/img.jpg',
        }}
      />,
    );

    expect(screen.getByRole('img')).toBeTruthy();
  });
});
