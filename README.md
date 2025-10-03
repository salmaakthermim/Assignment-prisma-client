# Portfolio Blog Next

A personal portfolio and blog built with Next.js and TypeScript.

### Live URL

[https://portfolio-blog-next-puce.vercel.app/dashboard](https://portfolio-blog-next-puce.vercel.app/dashboard)

### Admin Credentials

    Email: towhidkarim123@gmail.com
    Password: 123456

This repository implements a portfolio website with a blog and project showcase. It uses Next.js (App Router), TypeScript, Tailwind CSS, NextAuth for authentication, and a rich text editor for creating/editing posts and projects.

## Project overview & features

- Public pages (accessible to all visitors):

  - All Blogs page: lists published blog posts. Implemented with Incremental Static Regeneration (ISR) so new content can appear without a full rebuild.
  - Individual Blog page: static-generation per post with dynamic paths and ISR to serve and update pages on demand.
  - About Me section: static content served with Static Site Generation (SSG) for fast performance.
  - Project Showcase: a section listing personal projects with thumbnails, descriptions, features, live links, and repo/live site links. Project pages/pages list use ISR so updates can be pulled in dynamically.

- Private (owner-only) pages and features:

  - JWT-based authentication using Next-Auth for the owner (see `api/[...nextauth]/route.ts` and `auth.ts` for authentication wiring).
  - Admin dashboard: owner-only dashboard (under `/dashboard`) to create, edit and delete blogs and projects.
  - Backend assumptions: an admin user should be seeded in the backend with a bcrypt-hashed password to allow owner login. Passwords are hashed with bcrypt in the backend implementation.

- Rich text editor (bonus / implemented):
  - A rich text editor is included for creating and editing blog/project content. The project uses TipTap (`@tiptap/react`, `@tiptap/starter-kit`, and extensions) to provide formatting tools such as bold, italic, links, images, highlights and text alignment.

## Tech stack

- Framework: Next.js (App Router) + TypeScript
- UI: Tailwind CSS (with `@tailwindcss/postcss`), Radix UI primitives
- Auth: NextAuth (configured in `api/[...nextauth]/route.ts`) with JWT-style session handling
- Rich text editor: TipTap (`@tiptap/react`, `@tiptap/starter-kit`, and extensions)
- Image upload & media: `next-cloudinary` + a custom upload widget in `components/features/imageupload/upload-widget.tsx`
- Forms: `react-hook-form` + `@hookform/resolvers`
- Validation: `zod` (type schemas in `zod/`)
- Icons: `lucide-react`
- Notifications/toasts: `sonner`
- Utilities: `clsx`, `class-variance-authority`, `tailwind-merge`

## Project structure

- `app/` - Next.js App Router pages and layouts. Public pages live under `app/(public)/` and `app/(public)/blog`, while the dashboard routes exist under `app/dashboard/`.
- `api/[...nextauth]/route.ts` - NextAuth configuration and authentication API route.
- `components/` - Reusable UI components, providers, and feature components like the TipTap editor and image upload widget.
- `actions/` - Server actions for CRUD operations (create/edit/delete posts and projects, fetching collections).
- `zod/` - Zod schemas for request/response validation and typed data shapes.
- `lib/` - Shared utilities and constants.

## Setup instructions (local development)

These instructions assume you have Node.js and pnpm installed. Adjust to `npm` or `yarn` if you prefer.

1. Install dependencies

   ```powershell
   pnpm install
   ```

2. Environment variables

   Create a `.env.local` file in the project root with the variables your app needs. Typical variables for this project might include:

   - NEXTAUTH_SECRET=your_nextauth_secret
   - DATABASE_URL=your_database_connection_string
   - CLOUDINARY*URL or CLOUDINARY*\* vars for Cloudinary uploads

   The repo expects NextAuth to be configured; if you run a local backend or database, ensure an admin user is seeded with a bcrypt-hashed password.

3. Run the dev server

   ```powershell
   pnpm dev
   ```

4. Build for production

   ```powershell
   pnpm build; pnpm start
   ```

Notes:

- The `dev` and `build` scripts use Turbopack flags (see `package.json`). If you run into issues, you can remove `--turbopack` from the scripts.

## Data fetching & rendering strategy

- All Blogs page: Implemented with ISR so the list picks up new posts without a full rebuild. The page lives under `app/(public)/blog/page.tsx`.
- Blog detail pages: Implemented with dynamic routes under `app/(public)/blog/[id]/page.tsx`. The pages are statically generated per post with getStaticPaths-like behaviour and revalidation to update when content changes.
- Projects: Project listing and project pages use ISR to allow updates without redeploy.
- About: Static content served by SSG for best performance.

## Authentication & security notes

- NextAuth is configured in `api/[...nextauth]/route.ts`. The project uses JWT/session management so only the owner can access dashboard pages under `/dashboard`.
- Backend must seed an admin user for initial login. Passwords should be hashed with bcrypt on the server. If you integrate a database or Prisma, use secure migration and seeding steps.

## Editor (TipTap) details

- TipTap is set up in `components/features/text-editor/` (see `index.tsx` and `menu-bar.tsx`). The editor provides:
  - Bold, italic, underline, and highlight
  - Links and link editing
  - Image insertion as thumbnail (with Cloudinary upload support via `next-cloudinary` and the image upload widget)
  - Text alignment and other rich formatting via TipTap extensions

## Developer notes & tips

- Validation: Use the Zod schemas in `zod/` when building or updating API endpoints and form handling.
- Actions: Server actions for creating/editing/deleting content are in the `actions/` folder. These are good entry points for wiring your backend persistence layer.
- Image uploads: The `upload-widget.tsx` handles selecting and uploading images; ensure your Cloudinary credentials are correctly set in your environment.

## Testing & quality

- There are no automated tests included in this repo by default. Consider adding unit and integration tests (e.g., Vitest / Jest + React Testing Library) for critical components such as auth flows and the editor.

## Next steps & improvements

- Add a backend seeding script to create the admin user automatically (bcrypt-hashed).
- Add tests for the dashboard and auth flows.
- Add deployment guide for Vercel (or your preferred host) including environment variables and secret management.
