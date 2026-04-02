import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkSection } from '../../components/sections/work-section';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('work sections', () => {
  it('renders fallback data when no data is provided', () => {
    render(<WorkSection data={[]} />);

    expect(screen.getByText('Brand Identity System')).toBeTruthy();
    expect(screen.getByText('E-commerce Platform')).toBeTruthy();
    expect(screen.getByText('Motion Campaign')).toBeTruthy();
    expect(screen.getByText('SaaS Dashboard')).toBeTruthy();
  });

  it('renders provided data correctly', () => {
    render(
      <WorkSection
        data={[
          {
            _id: '1',
            title: 'Test Project',
            tag: 'test',
            description: 'Test description',
          },
        ]}
      />,
    );

    expect(screen.getByText('Test Project')).toBeTruthy();
    expect(screen.getByText('test')).toBeTruthy();
    expect(screen.getByText('Test description')).toBeTruthy();
  });

  it('renders first letter fallback when image is missing', () => {
    render(
      <WorkSection
        data={[{ _id: '1', title: 'Alpha', tag: 'Tag', description: 'Desc' }]}
      />,
    );

    expect(screen.getByText('A')).toBeTruthy();
  });

  it('renders section heading', () => {
    render(<WorkSection data={[]} />);

    expect(screen.getByText('Our Work')).toBeTruthy();
  });
});
