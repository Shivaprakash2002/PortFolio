# Alex Dev — Personal Portfolio & Blog

A personal portfolio website with a full blog management system built with **Next.js 14 (App Router)**, **Supabase**, and **Tailwind CSS**.

---

## What I Built

**Public Portfolio:**
- **Home page** — Hero section with name, photo, bio, and skills grouped by category
- **Projects page** — Three featured projects with tech stack tags and links
- **Blog listing** — All published posts fetched from Supabase
- **Individual post** — Full post rendered with slug-based routing and metadata

**Admin Portal:**
- **Login** — Hardcoded credentials validated via API route (credentials stay server-side)
- **Dashboard** — Table view of all posts (published + draft) with inline actions
- **Create post** — Form with auto-slug generation
- **Edit post** — Pre-populated form to update any field
- **Delete post** — Confirmation dialog before permanent deletion
- **Toggle status** — Publish or unpublish a post with one click

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 — App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |
| Icons | Lucide React |

---

## AI Tools Used

| Tool | How It Helped | % of Code |
|---|---|---|
| **Claude (Anthropic)** | Generated full project scaffold, component architecture, Supabase schema, Tailwind config, and all page/component code | ~85% |
| **GitHub Copilot** | Inline autocompletions for repetitive patterns (form handlers, map callbacks) | ~10% |

**Did I understand the AI-generated code?** Yes. Before generating, the architecture was reviewed and approved. Each file was checked for correctness — including TypeScript types, Supabase query patterns, Next.js App Router conventions (server vs client components), and the auth flow. The remaining 5% was manual fixes and customisation.

---

## Project Structure

```
app/
  (public)/           ← Public portfolio pages
    page.tsx          ← Home
    projects/         ← Projects listing
    blog/             ← Blog list + [slug] post page
  admin/              ← Admin portal (auth-guarded)
    login/            ← Login form
    dashboard/        ← Post management table
    posts/new/        ← Create post
    posts/[id]/       ← Edit post
  api/auth/           ← Login API route

components/
  public/             ← Navbar, Footer, BlogCard, ProjectCard
  admin/              ← PostForm (shared create/edit)

lib/
  supabase.ts         ← Supabase client
  auth.ts             ← sessionStorage helpers
  data.ts             ← Static projects and skills data

types/index.ts        ← TypeScript interfaces
supabase-schema.sql   ← DB setup script
```

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourname/portfolio.git
cd portfolio
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. In the SQL editor, paste and run the contents of `supabase-schema.sql`
3. Copy your **Project URL** and **anon public key** from Settings → API

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

ADMIN_USERNAME=admin
ADMIN_PASSWORD=portfolio2024
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin portal: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Vercel Deployment

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the four environment variables from `.env.local` in Vercel's project settings
4. Deploy — Vercel auto-detects Next.js

---

## Customising the Content

- **Your name / bio** — Edit `app/(public)/page.tsx`
- **Your photo** — Replace the avatar div with `<Image>` pointing to your photo
- **Projects** — Edit `lib/data.ts` → `PROJECTS` array
- **Skills** — Edit `lib/data.ts` → `SKILL_GROUPS` array
- **Social links** — Edit `components/public/Footer.tsx`

---

## Database Schema

```sql
posts (
  id          uuid PRIMARY KEY,
  title       text NOT NULL,
  slug        text UNIQUE NOT NULL,
  excerpt     text NOT NULL,
  content     text NOT NULL,
  status      text DEFAULT 'draft',   -- 'published' | 'draft'
  created_at  timestamptz,
  updated_at  timestamptz
)
```
