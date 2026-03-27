import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headlineLine1',
      title: 'Headline Line 1',
      type: 'string',
      description: '"DRIVING -> DIGITAL"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'headlineLine2',
      title: 'Headline Line 2',
      type: 'string',
      description: '"-> SUCCESS * TOGETHER"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      initialValue: 'Book Meeting',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'stats',
      title: 'Stats (bento cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: '"350+"',
            }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (product mockup)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

// →
