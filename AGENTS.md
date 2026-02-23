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
  blog/
    page.tsx            # Blog index (auto-generated from markdown files)
    [slug]/page.tsx     # Dynamic blog post renderer
  projects/page.tsx     # Projects grid page (wider layout, 900px)
components/
  Header.tsx            # Shared header/nav (client component, uses usePathname)
  ProjectCard.tsx       # Project card with image carousel (client component)
content/blog/           # Markdown blog posts with YAML frontmatter
lib/blog.ts             # Blog utilities (getAllPosts, getPostBySlug, getAllSlugs)
public/images/          # Static assets
  projects/             # Project card images (use descriptive names, not versions)
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

## Adding a Project

Edit `app/projects/page.tsx` and add to the `projects` array:

```ts
{
  name: "Project Name",
  description: "Short casual description.",
  link: "https://example.com",        // optional, wraps card in link
  images: ["/images/projects/foo.jpg"], // optional
}
```

Images should be JPEG, ~4:5 aspect ratio preferred. Use clean filenames (e.g. `coder.jpg`, not `coder-v2.jpg`).

## Key Patterns & Lessons

- **Server Components by default**: Blog post page uses `MDXRemote` from `next-mdx-remote/rsc` (not the client version). The client version causes `useState` errors in server components.
- **Client components**: `Header.tsx` and `ProjectCard.tsx` need `"use client"`. Keep client components minimal.
- **Code block styling**: `rehype-pretty-code` wraps code in `<figure>` elements. CSS targets `figure[data-rehype-pretty-code-figure]` for layout. Code blocks are wider than the text column (750px vs 600px `main` max-width).
- **Inline code**: Styled via `:not(pre) > code` selector to avoid conflicting with code blocks.
- **Visited/active link color**: Reset globally (`a:visited`, `a:active` use `color: inherit`). Nav links explicitly set to black.
- **Nav selected state**: Uses `font-weight: 600` (semibold). Don't use `font-weight: bold` (causes layout shift) or `-webkit-text-stroke` (looks pixelated).
- **Nav spacing**: Uses flexbox with `gap: 4px` and `::after` pipe separators.
- **Projects page**: Wider layout (900px) than other pages (600px). Header/hr also expand via `.projects-page` wrapper class.
- **Project carousel**: All images load with `priority` (no lazy loading). Fade transition between slides. Arrows only show on hover. Arrow/dot clicks use `preventDefault()` to not trigger card link.
- **Dynamic routes**: Blog uses `[slug]` with `generateStaticParams` for static generation.
- **Metadata**: Each page exports its own `metadata` object for `<title>` tags.
- **Tone**: Copy on the site is casual, not corporate. Write like a person, not AI.

## Development

```bash
npm install
PORT=0 npm run dev
```

**Use `PORT=0`** to let the OS assign a random available port. This avoids port conflicts when multiple worktrees run dev servers simultaneously. Read the port from the startup output (e.g., `Local: http://localhost:36333`).

For agents running in Mux, start the dev server in the background and parse the port:

```bash
# Run in background with run_in_background=true:
export PATH="/home/benpotter/.local/share/fnm:$PATH" && eval "$(fnm env)" && PORT=0 npm run dev

# Then await with filter "Local|Ready" to grab the port from output
# Verify with: curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>
```

**Do not run `next build` to verify changes** — just keep the dev server running and use `curl` to check pages. The worktree setup can cause spurious build errors that don't affect dev.

## Deployment (Vercel)

This site deploys to [Vercel](https://vercel.com) as a Next.js project.

1. Connect the GitHub repo in the Vercel dashboard
2. Vercel auto-detects Next.js — no special config needed
3. `vercel.json` sets `framework: "nextjs"` explicitly

Build command: `next build` (Vercel default)
Output: `.next/` (Vercel default)

Every push to `main` triggers a production deploy. PRs get preview deployments automatically.

### Vercel CLI

The Vercel CLI is installed globally. After pushing to `main`, verify the deployment:

```bash
export PATH="/home/benpotter/.local/share/fnm:$PATH" && eval "$(fnm env)"
vercel --prod
```

If not authenticated, ask the user for help — they can provide a token or log in interactively. Auth command:

```bash
vercel login
```

### Post-push checklist

After pushing to `main`:
1. Push with `git push origin main`
2. Check Vercel deployment logs immediately — deploys are automatic, don't run `vercel --prod`
3. Watch for build errors in the logs

```bash
export PATH="/home/benpotter/.local/share/fnm:$PATH" && eval "$(fnm env)"
vercel logs --follow
```
