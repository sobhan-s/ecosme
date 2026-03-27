import { defineField, defineType } from 'sanity';

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon name (lucide)',
              type: 'string',
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        },
      ],
    }),
  ],
});
