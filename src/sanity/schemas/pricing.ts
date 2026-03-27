import { defineField, defineType } from 'sanity';

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: '"$29" or "Free"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      options: {
        list: ['per month', 'per year', 'one-time', 'custom'],
      },
      initialValue: 'per month',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Feature text',
              type: 'string',
            }),
            defineField({
              name: 'included',
              title: 'Included?',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/signup',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted (most popular)?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge text (e.g. Most Popular)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
  },
});
