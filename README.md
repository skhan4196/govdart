# GovDart

**Federal Subcontracting Intelligence Platform**

GovDart helps small government subcontractors discover prime contractors, find relevant federal contract opportunities, and build winning teaming strategies.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Base UI)
- **Icons**: lucide-react
- **Charts**: Recharts
- **Auth & Database**: Supabase (scaffolded)
- **Notifications**: Sonner

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/sign-in` | Sign in |
| `/sign-up` | Create account |
| `/dashboard` | Overview metrics + charts |
| `/opportunities` | Searchable contract opportunities |
| `/opportunities/[id]` | Opportunity detail + notes |
| `/primes` | Prime contractor directory |
| `/primes/[id]` | Company profile + past awards |
| `/pipeline` | Kanban board |
| `/saved` | Saved searches & alerts |
| `/settings` | Profile, company, subscription |

## Supabase Setup

1. Create a project at supabase.com
2. Run `src/lib/schema.sql` in the SQL editor
3. Add env vars:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/       # Auth pages
│   ├── (dashboard)/  # App pages
│   └── page.tsx      # Landing page
├── components/
│   ├── layout/       # Sidebar, TopNav, CommandSearch
│   └── ui/           # shadcn/ui components
└── lib/
    ├── data.ts       # Seed data + helpers
    ├── schema.sql    # PostgreSQL schema
    ├── supabase.ts   # Supabase client
    └── types.ts      # TypeScript types
```
