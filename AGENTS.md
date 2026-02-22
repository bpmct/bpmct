# AGENTS.md

## Project Overview

Personal website for Ben Potter, built with **Next.js 15** (App Router) and TypeScript.

## Tech Stack

- **Framework**: Next.js 15 with App Router (`app/` directory)
- **Language**: TypeScript
- **Blog**: Markdown files in `content/blog/` rendered via `next-mdx-remote/rsc`
- **Syntax Highlighting**: `rehype-pretty-code` (Shiki-based, same engine as VS Code)
  - Theme: `github-dark-dimmed`
  - All code blocks in markdown **must have a language tag** (use `text` for plain output) — untagged blocks won't be styled by rehype-pretty-code
- **Heading anchors**: `rehype-slug` + `rehype-autolink-headings`
- **Analytics**: Google Analytics via `next/script` in root layout

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (GA, global CSS, metadata)
  globals.css           # All global styles
  page.tsx              # Home page (/)
  job/page.tsx          # /job
  hobbies/page.tsx      # /hobbies
  blog/
    page.tsx            # Blog index (auto-generated from markdown files)
    [slug]/page.tsx     # Dynamic blog post renderer
components/
  Header.tsx            # Shared header/nav (client component, uses usePathname)
content/blog/           # Markdown blog posts with YAML frontmatter
lib/blog.ts             # Blog utilities (getAllPosts, getPostBySlug, getAllSlugs)
public/images/          # Static assets
```

## Adding a Blog Post

Drop a `.md` file in `content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Optional description"
---
```

It will auto-appear on `/blog` and be accessible at `/blog/<filename-without-ext>`.

## Key Patterns & Lessons

- **Server Components by default**: Blog post page uses `MDXRemote` from `next-mdx-remote/rsc` (not the client version). The client version causes `useState` errors in server components.
- **Client components**: Only `Header.tsx` needs `"use client"` (for `usePathname`). Keep client components minimal.
- **Code block styling**: `rehype-pretty-code` wraps code in `<figure>` elements. CSS targets `figure[data-rehype-pretty-code-figure]` for layout. Code blocks are wider than the text column (750px vs 600px `main` max-width).
- **Inline code**: Styled via `:not(pre) > code` selector to avoid conflicting with code blocks.
- **Visited link color**: Disabled globally (`a:visited { color: inherit }`).
- **Nav spacing**: Uses flexbox with `gap: 4px` and `::after` pipe separators.
- **Dynamic routes**: Blog uses `[slug]` with `generateStaticParams` for static generation.
- **Metadata**: Each page exports its own `metadata` object for `<title>` tags.

## Development

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:3000.

## Deployment (Vercel)

This site deploys to [Vercel](https://vercel.com) as a Next.js project.

1. Connect the GitHub repo in the Vercel dashboard
2. Vercel auto-detects Next.js — no special config needed
3. `vercel.json` sets `framework: "nextjs"` explicitly

Build command: `next build` (Vercel default)
Output: `.next/` (Vercel default)

Every push to `main` triggers a production deploy. PRs get preview deployments automatically.
