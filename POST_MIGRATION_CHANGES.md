# Post-Migration Changes

Changes to make after the Astro migration is complete. These are intentional deviations from the original Jekyll site.

---

## Content Changes

### Remove GitHub Issues Discussion CTA

**Location:** `src/layouts/PostLayout.astro`

**Current text:**
> Have something to contribute? Open an Issue on Github and let's have a chat!

**Action:** 
1. Remove this entire section from `PostLayout.astro`
2. Write a new blog post reflecting on why using GitHub Issues as a discussion forum didn't work for me personally, even though some folks in the community liked the idea. Topics to cover:
   - The original intent and optimism (reference the 2013-01-01 post)
   - What didn't work in practice
   - Lessons learned

### Update date formatting and styling

**Locations:** 
- `src/pages/index.astro` (post listing and "Other Blog Posts and Lists" section)
- `src/layouts/PostLayout.astro` (individual post pages)

**Changes:**
1. Format all dates as `yyyy-mm-dd` (ISO 8601 format)
2. Style dates to be visually distinct from surrounding content - consider:
   - Monospace font
   - Different color or background

### Unify formatting between homepage sections

**Location:** `src/pages/index.astro`

**Issue:** The "Other Blog Posts and Lists" section has different formatting than the main "Blog Posts, Presentations, Slide Decks, Papers, and even videos!" section.

**Changes:**
1. Apply consistent styling to both sections
2. Use the same date format (`yyyy-mm-dd`) in both sections
3. Match link styles, spacing, and typography between sections

---

## Repository Changes

### Rename default branch from `master` to `main`

**Steps:**
1. Rename branch locally: `git branch -m master main`
2. Push and set upstream: `git push -u origin main`
3. Update default branch in GitHub repository settings
4. Delete old remote branch: `git push origin --delete master`
5. Update `.github/workflows/deploy.yml` to use `main` instead of `master`

---

## Future Improvements

(Add items here as they come up during migration or testing)

