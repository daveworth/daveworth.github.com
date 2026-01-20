# CLAUDE.md - dave.coffee

Personal website for Dave Worth, hosted at https://dave.coffee

## Tech Stack
- Astro 5.x with TypeScript strict mode
- Tailwind CSS 4.x with Typography plugin
- Volta for Node.js/npm version management
- GitHub Actions for deployment

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # TypeScript checking
npm run new-post     # Create new blog post
```

## Project Structure

```
src/
├── components/      # Astro components (Header, Footer, etc.)
├── layouts/         # Page layouts (Base, Default, Post)
├── pages/           # Routes (index.astro, rss.xml.ts)
├── content/posts/   # Blog posts (Markdown with frontmatter)
└── styles/          # Global CSS with Tailwind
public/
├── assets/          # Static files (PDFs, images)
└── CNAME            # Custom domain
```

## Code Style

- **TypeScript**: Strict mode, prefer explicit types
- **Astro**: Use `.astro` components, avoid client-side JS unless necessary
- **Tailwind**: Mobile-first responsive design, use design tokens from config
- **Commits**: Conventional commits format (`type(scope): description`)

## Content

- 6 blog posts (2012-2015)
- Homepage with presentations, talks, papers list
- RSS feed at `/rss.xml`
- Static assets: resume, thesis, conference PDFs

## Design System

Colors (from current site):
- Text primary: `#777`
- Headings: `#222`
- Links: `#39c`

Typography:
- Font: Lato (300, 700 weights)
- Fallbacks: Helvetica Neue, Helvetica, Arial

Layout:
- Two-column: 270px sidebar + 500px content
- Responsive breakpoints: 480px, 720px, 960px

## Git Workflow

- Default branch: `main`
- Atomic commits with conventional commit messages

## Important Notes

- Preserve URL structure for existing blog posts
- RSS feed must remain compatible
- Custom domain: dave.coffee (CNAME in public/)
- All new code must be TypeScript
