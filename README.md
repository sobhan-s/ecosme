# ecosme

**ecosme** is a modern, full-stack Next.js web application engineered for high performance, scale, and excellent developer experience. It features a robust marketing site, a statically generated blog system, and a dynamic authenticated dashboard.

---

## Key Features

- **Blazing Fast Marketing Pages:** Built with Next.js App Router using Incremental Static Regeneration (ISR) to continuously deliver fresh content without rebuilding.
- **Dynamic Dashboard:** Fully Server-Side Rendered (SSR) private dashboard delivering real-time statistics and user-specific data.
- **Modern Blog System:** Markdown-driven blog posts with optimized reading paths, powered by **Sanity CMS** and Static Site Generation (SSG).
- **Integrated Headless CMS:** A built-in `/studio` route embedding the Sanity Studio directly into the application for seamless content management.
- **Robust Authentication:** Secure, frictionless user authentication flows managed by **Better Auth**.
- **Type-Safe Database:** Serverless PostgreSQL on **Neon**, accessed securely via **Drizzle ORM**.

---

## Tech Stack

### Core Frameworks

- **[Next.js](https://nextjs.org/) (App Router)** - React Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling

### State & Data Management

- **[Sanity (CMS)](https://www.sanity.io/)** - Headless CMS & content lake
- **[Drizzle ORM](https://orm.drizzle.team/)** - Modern TypeScript ORM
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL infrastructure

### UI / UX

- **[Radix UI](https://www.radix-ui.com/)** - Accessible headless components
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set
- **[Framer Motion / Tailwind Animate]** - Smooth interactions and micro-animations

### DevOps & Testing

- **[Vitest](https://vitest.dev/)** - Blazing fast unit testing framework
- **[Husky](https://typicode.github.io/husky/) & [Commitlint](https://commitlint.js.org/)** - Git hooks and commit convention enforcement
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** - Code quality and formatting

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v20+) and [pnpm](https://pnpm.io/) installed.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecosme.git
cd ecosme
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and populate it with your specific API keys:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth Configuration
BETTER_AUTH_SECRET=your_auth_secret

# Database Configuration (Neon)
DATABASE_URL=your_postgres_connection_string

# Sanity configuration
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
```

### 4. Running the Development Server

```bash
# Start Next.js development server
pnpm run dev
```

The application will be available at `http://localhost:3000`.
To access the CMS studio, navigate to `http://localhost:3000/studio`.

---

## Testing

The project utilizes **Vitest** for isolated unit testing, specifically targeting the data fetching layers and Sanity CMS queries.

To run the test suite:

```bash
pnpm run test
```

To run tests with UI:

```bash
pnpm dlx vitest --ui
```

---

## Architecture Overview

The system architecture follows strict Next.js App Router guidelines to separate interactive components from structural server components.

- **`src/app/(marketing)/*`**: Client-facing landing pages and blogs fetched statically (SSG/ISR).
- **`src/app/dashboard/*`**: Protected routes configured to dynamically bypass the cache (SSR).
- **`src/components/*`**: A robust library containing UI primitives, Layout components, and interactive segments marked heavily with `'use client'`.
- **`src/lib/*`**: Core configurations for Auth, Drizzle schemas, and Sanity CMS connections.
- **`tests/*`**: Project vitest files, keeping application code separate from testing infrastructure.

---

## Project st

```txt
ecosme/
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


```

```

```
