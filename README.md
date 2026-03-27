Directory structure:
└── sobhan-s-ecosme/
    ├── README.md
    ├── auth-schema.ts
    ├── commitlint.config.js
    ├── components.json
    ├── docker-compose.yml
    ├── Dockerfile
    ├── drizzle.config.ts
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── sanity.config.ts
    ├── tsconfig.json
    ├── .dockerignore
    ├── .prettierignore
    ├── .prettierrc
    ├── drizzle/
    │   ├── 0000_third_maggott.sql
    │   └── meta/
    │       ├── 0000_snapshot.json
    │       └── _journal.json
    ├── infra/
    │   └── nginx/
    │       └── default.conf
    ├── src/
    │   ├── app/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── middleware.ts
    │   │   ├── (auth)/
    │   │   │   ├── layout.tsx
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx
    │   │   │   └── signup/
    │   │   │       └── page.tsx
    │   │   ├── (marketing)/
    │   │   │   ├── layout.tsx
    │   │   │   ├── page.tsx
    │   │   │   └── blog/
    │   │   │       ├── page.tsx
    │   │   │       └── [slug]/
    │   │   │           └── page.tsx
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   │   └── [...all]/
    │   │   │   │       └── route.ts
    │   │   │   ├── stats/
    │   │   │   │   └── route.ts
    │   │   │   └── subscribe/
    │   │   │       └── route.ts
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   └── studio/
    │   │       └── [[...tool]]/
    │   │           └── page.tsx
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── loginForm.tsx
    │   │   │   └── signupForm.tsx
    │   │   ├── blog/
    │   │   │   └── postBody.tsx
    │   │   ├── layout/
    │   │   │   ├── footer.tsx
    │   │   │   └── navbar.tsx
    │   │   ├── sections/
    │   │   │   ├── aboutSections.tsx
    │   │   │   ├── blog-preview-section.tsx
    │   │   │   ├── customers-section.tsx
    │   │   │   ├── heroSections.tsx
    │   │   │   ├── newsletter-section.tsx
    │   │   │   ├── pricing-section.tsx
    │   │   │   ├── reviews-section.tsx
    │   │   │   └── work-section.tsx
    │   │   └── ui/
    │   │       ├── badge.tsx
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       └── input.tsx
    │   ├── database/
    │   │   ├── index.ts
    │   │   └── schema/
    │   │       ├── accounts.schema.ts
    │   │       ├── session.schema.ts
    │   │       ├── subscribers.schema.ts
    │   │       ├── user.schema.ts
    │   │       └── verification.schema.ts
    │   ├── interface/
    │   │   └── sanity.types.ts
    │   ├── lib/
    │   │   ├── auth.ts
    │   │   ├── authClient.ts
    │   │   ├── mail.ts
    │   │   ├── utils.ts
    │   │   └── sanity/
    │   │       ├── client.ts
    │   │       └── query.ts
    │   └── sanity/
    │       └── schemas/
    │           ├── aboutSecion.ts
    │           ├── customer.ts
    │           ├── heroSeciton.ts
    │           ├── index.ts
    │           ├── post.ts
    │           ├── pricing.ts
    │           ├── siteSetting.ts
    │           ├── testimonial.ts
    │           └── workItem.ts
    └── .husky/
        ├── commit-msg
        └── pre-commit
