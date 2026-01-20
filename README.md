# dave.coffee

Personal website for Dave Worth, hosted at https://dave.coffee

## Tech Stack

- [Astro](https://astro.build/) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with Typography plugin
- [Volta](https://volta.sh/) for Node.js version management
- GitHub Actions for deployment to GitHub Pages

## Prerequisites

Install [Volta](https://volta.sh/) for automatic Node.js version management:

```bash
curl https://get.volta.sh | bash
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# TypeScript checking
npm run lint
```

## Creating New Posts

Create a new markdown file in `src/content/posts/` with the naming convention:

```
YYYY-MM-DD-post-slug.md
```

Front matter template:

```yaml
---
title: 'Your Post Title'
author: Dave
published: true
pubDate: YYYY-MM-DD
description: 'Brief description for RSS and social sharing'
---
```

## Project Structure

```
src/
├── components/      # Astro components
├── content/posts/   # Blog posts (Markdown)
├── layouts/         # Page layouts
├── pages/           # Routes
└── styles/          # Global CSS
public/
├── assets/          # Static files (PDFs, images)
└── CNAME            # Custom domain
```

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to `master`.
