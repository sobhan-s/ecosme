import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const singletonTypes = new Set(['siteSettings', 'heroSection', 'aboutSection']);

export default defineConfig({
  name: 'ecosme',
  title: 'A CMS MARKETING SITE',

  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection'),
              ),
            S.listItem()
              .title('About Section')
              .child(
                S.document()
                  .schemaType('aboutSection')
                  .documentId('aboutSection'),
              ),

            S.divider(),

            S.documentTypeListItem('workItem').title('Work / Features'),
            S.documentTypeListItem('pricingPlan').title('Pricing Plans'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('customerLogo').title('Customer Logos'),

            S.divider(),

            S.documentTypeListItem('post').title('Blog Posts'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) => !singletonTypes.has(template.templateId),
        );
      }
      return prev;
    },
  },
});
