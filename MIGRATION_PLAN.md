# Jekyll to Astro Migration Plan

## Overview

This document outlines the plan to migrate dave.coffee from Jekyll to Astro with Tailwind CSS, using Volta for JavaScript/TypeScript tooling management.

---

## Phase 1: Environment Setup

### 1.1 Install Volta for Toolchain Management

Volta provides isolated, reproducible JavaScript tooling per project.

**Steps:**
1. Install Volta globally (if not already installed):
   ```bash
   curl https://get.volta.sh | bash
   ```
2. Pin Node.js version for the project:
   ```bash
   volta pin node@22
   ```
3. Pin package manager:
   ```bash
   volta pin npm@10
   ```

**Result:** Creates `volta` section in `package.json` ensuring all contributors use identical tooling.

### 1.2 Initialize Astro Project

**Steps:**
1. Create new Astro project in a temporary directory or branch:
   ```bash
   npm create astro@latest -- --template minimal --typescript strict
   ```
2. Select TypeScript strict mode when prompted
3. Move configuration files to project root
4. Update `.gitignore` for Astro (replace Jekyll's `_site/` with `dist/`)

**Key Files Created:**
- `astro.config.ts` - Astro configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `src/` - Source directory structure

---

## Phase 2: Configure Astro with Tailwind CSS

### 2.1 Install Tailwind CSS Integration

**Steps:**
1. Add Tailwind integration:
   ```bash
   npx astro add tailwind
   ```
2. This automatically creates:
   - `tailwind.config.mjs`
   - Updates `astro.config.ts` with Tailwind integration

### 2.2 Configure Tailwind Theme

Replicate current design system in `tailwind.config.mjs`:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Current site colors
        'text-primary': '#777',
        'text-heading': '#222',
        'link': '#39c',
        'heading-secondary': '#393939',
      },
      fontFamily: {
        sans: ['Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        bold: '700',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For prose styling in blog posts
  ],
} satisfies Config;
```

### 2.3 Install Typography Plugin

For beautiful Markdown rendering:
```bash
npm install @tailwindcss/typography
```

---

## Phase 3: Create Astro Directory Structure

### 3.1 Directory Layout

```
src/
├── components/
│   ├── Header.astro          # Profile sidebar component
│   ├── Footer.astro          # Footer with RSS/theme info
│   ├── GitHubProfileLink.astro
│   ├── RSSLink.astro
│   ├── ThemeInfo.astro
│   └── BackToHome.astro      # Navigation component
├── layouts/
│   ├── BaseLayout.astro      # Main HTML structure
│   ├── DefaultLayout.astro   # Two-column homepage layout
│   └── PostLayout.astro      # Blog post layout
├── pages/
│   ├── index.astro           # Homepage
│   ├── rss.xml.ts            # RSS feed endpoint (TypeScript)
│   └── [...slug].astro       # Dynamic blog post routes
├── content/
│   └── posts/                # Blog posts (Markdown/MDX)
│       ├── 2012-12-25-coffee-setups.md
│       ├── 2013-01-01-github-issues.md
│       ├── 2013-01-21-mdns-development.md
│       ├── 2014-07-03-test-suites-upstart.md
│       ├── 2014-07-04-empower-qa-team.md
│       └── 2015-02-19-math-books.md
├── styles/
│   └── global.css            # Tailwind imports + custom utilities
└── types/
    └── index.ts              # Shared TypeScript types
public/
├── assets/
│   ├── pic.jpg               # Profile image
│   ├── resume.pdf
│   ├── DaveWorthThesis.pdf
│   └── ... (other PDFs)
└── CNAME                     # Custom domain file
```

### 3.2 Content Collections Configuration

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().default('Dave'),
    published: z.boolean().default(true),
    pubDate: z.coerce.date(),
    image_hint_url: z.string().url().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

---

## Phase 4: Migrate Layouts and Components

### 4.1 BaseLayout.astro

Handles HTML boilerplate, head metadata, Font Awesome, and global styles.

**Key elements to include:**
- `<html lang="en">`
- Meta tags (viewport, description, charset)
- Font Awesome 6.x (upgrade from 4.1.0)
- Google Fonts (Lato)
- Tailwind CSS
- Open Graph / Twitter card meta tags for social sharing

### 4.2 Header Component (Sidebar)

Convert the fixed sidebar to a responsive component:
- Profile image with rounded corners
- Site title and description
- GitHub profile link
- Mobile: collapses to horizontal header

### 4.3 Footer Component

- RSS link
- Theme attribution

### 4.4 PostLayout.astro

- Back-to-home button
- Post title and date
- Content area with Tailwind Typography prose classes
- GitHub issue discussion link

---

## Phase 5: Migrate Content

### 5.1 Homepage Content

Convert `index.md` to `src/pages/index.astro`:
- Preserve all presentation/talk links
- Use Astro components for structure
- Apply Tailwind classes for styling
- Fetch and display blog post listings from content collection

### 5.2 Blog Posts Migration

**For each post in `_posts/`:**

1. Copy to `src/content/posts/`
2. Update front matter format:
   - Add explicit `pubDate` field (extracted from filename date)
   - Keep existing fields
3. Update any Jekyll-specific syntax:
   - Replace `{% gist %}` tags with embedded code or links
   - Update internal links if needed

**Example front matter conversion:**

Before (Jekyll):
```yaml
---
layout: post
title: 'Coffee Setups for the Persnikkity'
author: Dave
published: true
---
```

After (Astro):
```yaml
---
title: 'Coffee Setups for the Persnikkity'
author: Dave
published: true
pubDate: 2012-12-25
---
```

### 5.3 RSS Feed

Create `src/pages/rss.xml.ts`:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => data.published);
  
  return rss({
    title: "Dave Worth's STDOUT",
    description: 'the landing place of my various presentations, papers, and occasional blog posts',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
```

---

## Phase 6: Static Assets

### 6.1 Move Assets to `public/`

```bash
# All files in public/ are served at root
public/
├── assets/
│   ├── pic.jpg
│   ├── resume.pdf
│   ├── DaveWorthThesis.pdf
│   ├── grehack-paper.pdf
│   ├── grehack-talk.pdf
│   └── bh-us-04-worth-up.pdf
└── CNAME
```

### 6.2 Update Asset References

- Current: `/assets/pic.jpg`
- Astro: `/assets/pic.jpg` (unchanged, served from `public/`)

---

## Phase 7: Responsive Design with Tailwind

### 7.1 Breakpoint Strategy

Align with current CSS breakpoints:

| Current | Tailwind | Description |
|---------|----------|-------------|
| 960px   | `lg:`    | Full two-column layout |
| 720px   | `md:`    | Medium screens |
| 480px   | `sm:`    | Mobile devices |

### 7.2 Mobile-First Approach

Tailwind uses mobile-first breakpoints. Design mobile layout as default, add complexity for larger screens:

```html
<!-- Mobile: stacked, Desktop: side-by-side -->
<div class="flex flex-col lg:flex-row">
  <header class="w-full lg:w-72 lg:fixed">...</header>
  <main class="w-full lg:ml-72 lg:max-w-xl">...</main>
</div>
```

### 7.3 Typography Improvements

Use Tailwind Typography plugin for blog posts:

```html
<article class="prose prose-lg prose-slate max-w-none">
  <slot /> <!-- Markdown content -->
</article>
```

---

## Phase 8: Build and Deploy Configuration

### 8.1 Astro Configuration

`astro.config.ts`:

```typescript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dave.coffee',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light', // Similar to current Pygments theme
    },
  },
});
```

### 8.2 GitHub Pages Deployment

Option A: GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: volta-cli/action@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Option B: Keep existing GitHub Pages behavior (if preferred)

### 8.3 Package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "astro check",
    "new-post": "tsx scripts/new-post.ts"
  }
}
```

---

## Phase 9: Development Tooling

### 9.1 TypeScript Configuration

`tsconfig.json` (Astro generates this, customize as needed):

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@content/*": ["src/content/*"]
    }
  }
}
```

### 9.2 Post Generation Script

Replace Rake task with TypeScript script `scripts/new-post.ts`:

```typescript
import { writeFileSync } from 'fs';
import { join } from 'path';

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run new-post "Post Title"');
  process.exit(1);
}

const date = new Date().toISOString().split('T')[0];
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const filename = `${date}-${slug}.md`;

const content = `---
title: '${title}'
author: Dave
published: false
pubDate: ${date}
description: ''
categories: []
tags: []
---

Write your post content here.
`;

const filepath = join('src', 'content', 'posts', filename);
writeFileSync(filepath, content);
console.log(`Created: ${filepath}`);
```

---

## Phase 10: Testing and Validation

### 10.1 Pre-Migration Checklist

- [ ] All 6 blog posts render correctly
- [ ] Homepage displays all presentations/talks
- [ ] RSS feed generates valid XML
- [ ] All PDF/asset links work
- [ ] Responsive layout works at all breakpoints
- [ ] Code syntax highlighting functional
- [ ] Font Awesome icons display
- [ ] Custom domain (dave.coffee) configured

### 10.2 Lighthouse Audit Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### 10.3 Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Phase 11: Cleanup and Finalization

### 11.1 Files to Remove (after migration complete)

- `_config.yml`
- `_layouts/` directory
- `_includes/` directory
- `_posts/` directory (content moved to `src/content/posts/`)
- `stylesheets/` directory
- `javascripts/` directory
- `Gemfile` and `Gemfile.lock`
- `Rakefile` and `lib/` directory
- `index.md`
- `feed.xml`
- `params.json`

### 11.2 Files to Keep

- `CNAME` (move to `public/`)
- `assets/` directory contents (move to `public/assets/`)
- `.git/` directory
- `README.md` (update with new build instructions)

### 11.3 Update README

Document new development workflow:
- Prerequisites (Volta)
- Installation: `npm install`
- Development: `npm run dev`
- Build: `npm run build`
- Creating posts: `npm run new-post "Title"`

---

## Git Workflow and Commit Strategy

### Branch Strategy

All migration work will be done on an isolated feature branch:

```bash
git checkout -b feat/astro-migration
```

### Conventional Commit Format

All commits will follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
```

**Types used in this migration:**
- `feat` - New features (components, pages, functionality)
- `build` - Build system and dependencies
- `chore` - Maintenance tasks (file moves, cleanup)
- `docs` - Documentation updates
- `refactor` - Code restructuring without behavior change
- `style` - Styling changes (Tailwind classes, CSS)
- `ci` - CI/CD configuration

### Commit Plan (Atomic Commits)

Each commit should be small, focused, and independently reviewable.

#### Phase 1: Environment Setup
| Commit | Message |
|--------|---------|
| 1.1 | `build(volta): pin node and npm versions` |
| 1.2 | `build(astro): initialize astro project with typescript strict` |
| 1.3 | `chore(git): update gitignore for astro` |

#### Phase 2: Tailwind CSS Setup
| Commit | Message |
|--------|---------|
| 2.1 | `build(tailwind): add tailwind integration` |
| 2.2 | `build(tailwind): add typography plugin` |
| 2.3 | `style(tailwind): configure theme with site colors and fonts` |

#### Phase 3: Directory Structure
| Commit | Message |
|--------|---------|
| 3.1 | `feat(content): add posts collection schema` |
| 3.2 | `feat(styles): add global css with tailwind directives` |

#### Phase 4: Layouts and Components
| Commit | Message |
|--------|---------|
| 4.1 | `feat(layout): add base layout with head and meta tags` |
| 4.2 | `feat(components): add header sidebar component` |
| 4.3 | `feat(components): add footer component` |
| 4.4 | `feat(components): add github profile link component` |
| 4.5 | `feat(components): add rss link component` |
| 4.6 | `feat(layout): add default two-column layout` |
| 4.7 | `feat(layout): add post layout` |
| 4.8 | `feat(components): add back-to-home navigation` |

#### Phase 5: Content Migration
| Commit | Message |
|--------|---------|
| 5.1 | `feat(pages): add homepage with presentations list` |
| 5.2 | `feat(content): migrate coffee-setups post` |
| 5.3 | `feat(content): migrate github-issues post` |
| 5.4 | `feat(content): migrate mdns-development post` |
| 5.5 | `feat(content): migrate test-suites-upstart post` |
| 5.6 | `feat(content): migrate empower-qa-team post` |
| 5.7 | `feat(content): migrate math-books post` |
| 5.8 | `feat(pages): add dynamic post routing` |
| 5.9 | `feat(rss): add rss feed endpoint` |

#### Phase 6: Static Assets
| Commit | Message |
|--------|---------|
| 6.1 | `chore(assets): move static assets to public directory` |
| 6.2 | `chore(assets): move CNAME to public directory` |

#### Phase 7: Responsive Design
| Commit | Message |
|--------|---------|
| 7.1 | `style(responsive): add mobile-first layout styles` |
| 7.2 | `style(responsive): add tablet breakpoint styles` |
| 7.3 | `style(responsive): add desktop breakpoint styles` |

#### Phase 8: Deployment
| Commit | Message |
|--------|---------|
| 8.1 | `ci(github): add github actions deploy workflow` |
| 8.2 | `build(astro): configure site url and build settings` |

#### Phase 9: Development Tooling
| Commit | Message |
|--------|---------|
| 9.1 | `build(typescript): add path aliases` |
| 9.2 | `feat(scripts): add new-post generation script` |

#### Phase 10: Testing (no commits, validation only)

#### Phase 11: Cleanup
| Commit | Message |
|--------|---------|
| 11.1 | `chore(cleanup): remove jekyll layouts directory` |
| 11.2 | `chore(cleanup): remove jekyll includes directory` |
| 11.3 | `chore(cleanup): remove jekyll posts directory` |
| 11.4 | `chore(cleanup): remove jekyll stylesheets directory` |
| 11.5 | `chore(cleanup): remove jekyll javascripts directory` |
| 11.6 | `chore(cleanup): remove jekyll config and gemfiles` |
| 11.7 | `chore(cleanup): remove rakefile and lib directory` |
| 11.8 | `chore(cleanup): remove jekyll index and feed files` |
| 11.9 | `docs(readme): update with astro build instructions` |

### Merge Strategy

After all commits are complete and tested:

```bash
# Ensure branch is up to date
git checkout master
git pull origin master
git checkout feat/astro-migration
git rebase master

# Merge to master (squash optional, but individual commits preferred for history)
git checkout master
git merge feat/astro-migration

# Push to deploy
git push origin master
```

---

## Migration Execution Order

1. **Create feature branch**: `git checkout -b feat/astro-migration`
2. **Phase 1**: Set up Volta and initialize Astro (3 commits)
3. **Phase 2**: Configure Tailwind CSS (3 commits)
4. **Phase 3**: Create directory structure (2 commits)
5. **Phase 4**: Build layouts and components (8 commits)
6. **Phase 5**: Migrate content (9 commits)
7. **Phase 6**: Move static assets (2 commits)
8. **Phase 7**: Implement responsive design (3 commits)
9. **Phase 8**: Configure deployment (2 commits)
10. **Phase 9**: Set up dev tooling (2 commits)
11. **Phase 10**: Test thoroughly (no commits)
12. **Phase 11**: Clean up Jekyll files (9 commits)
13. **Merge to master** and deploy

**Total: ~43 atomic commits**

---

## Dependencies Summary

### Production Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/rss": "^4.x"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@astrojs/check": "^0.9.x",
    "@astrojs/tailwind": "^6.x",
    "@tailwindcss/typography": "^0.5.x",
    "tailwindcss": "^4.x",
    "typescript": "^5.x",
    "tsx": "^4.x"
  }
}
```

### Volta Configuration (in package.json)

```json
{
  "volta": {
    "node": "22.x.x",
    "npm": "10.x.x"
  }
}
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Broken links after migration | Medium | Medium | Maintain URL structure, add redirects if needed |
| Style differences | Low | Low | Reference current site during development |
| RSS feed compatibility | Low | Medium | Validate with feed validators |
| GitHub Pages deployment | Low | High | Test in staging environment first |

---

## Estimated Effort

This is a relatively small site with 6 blog posts and a single content page. The migration is straightforward due to:
- No custom Jekyll plugins
- Simple layout structure
- Standard Markdown content
- Minimal JavaScript

The work can be broken into focused sessions, tackling one phase at a time.
