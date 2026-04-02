import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReviewsSection } from '../../components/sections/reviews-section';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('ReviewsSection', () => {
  it('renders provided data correctly', () => {
    render(
      <ReviewsSection
        data={[
          {
            _id: '1',
            name: 'Test User',
            role: 'Tester',
            rating: 5,
            quote: 'Test quote',
          },
        ]}
      />,
    );

    expect(screen.getAllByText('Test User').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tester').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Test quote/i).length).toBeGreaterThan(0);
  });

  it('renders section heading', () => {
    render(<ReviewsSection data={[]} />);

    expect(screen.getByText(/What Our Clients/i)).toBeTruthy();
    expect(screen.getByText(/Say About Us/i)).toBeTruthy();
  });

  it('renders star ratings', () => {
    render(<ReviewsSection data={[]} />);

    const stars = document.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders fallback avatar letter when no image', () => {
    render(
      <ReviewsSection
        data={[
          {
            _id: '1',
            name: 'Test',
            role: 'Dev',
            rating: 5,
            quote: 'Hello',
          },
        ]}
      />,
    );

    expect(screen.getAllByText('T').length).toBeGreaterThan(0);
  });
});
