# CLAUDE.md - dave.coffee

Personal website for Dave Worth, hosted at https://dave.coffee

## Project Status

**Migration in progress**: Jekyll → Astro + Tailwind CSS
See `MIGRATION_PLAN.md` for detailed implementation plan and commit strategy.

## Tech Stack

### Current (Jekyll - being replaced)
- Jekyll 3.6.3 with Kramdown markdown
- Static CSS with Pygments syntax highlighting
- GitHub Pages deployment

### Target (Astro)
- Astro 5.x with TypeScript strict mode
- Tailwind CSS 4.x with Typography plugin
- Volta for Node.js/npm version management
- GitHub Actions for deployment

## Commands

```bash
# Development (after migration)
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # TypeScript checking
npm run new-post     # Create new blog post

# Current Jekyll (until migration complete)
bundle exec jekyll serve
```

## Project Structure

### Target Astro Structure
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

### Current Jekyll Structure (to be removed)
```
_layouts/            # Jekyll templates
_includes/           # Reusable partials
_posts/              # Blog posts (6 total)
stylesheets/         # CSS files
assets/              # Static files
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

- Feature branch: `feat/astro-migration`
- Atomic commits with conventional commit messages
- Test before merging to `master`

## Important Notes

- Preserve URL structure for existing blog posts
- RSS feed must remain compatible
- Custom domain: dave.coffee (CNAME in public/)
- All new code must be TypeScript
