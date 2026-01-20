# Post-Migration Changes

Changes to make after the Astro migration is complete. These are intentional deviations from the original Jekyll site.

---

## Content Changes

### ~~Remove GitHub Issues Discussion CTA~~ (DONE)

**TODO for Dave:** Write a new blog post reflecting on why using GitHub Issues as a discussion forum didn't work personally, even though some folks in the community liked the idea. Topics to cover:
- The original intent and optimism (reference the 2013-01-01 post)
- What didn't work in practice
- Lessons learned

### ~~Update date formatting and styling~~ (DONE)

### ~~Unify formatting between homepage sections~~ (DONE)

Both sections now use:
- Dates at start in `yyyy-mm-dd` format with smaller monospace font
- Bold chevron separators instead of bullets
- Consistent styling across both sections

---

## Repository Changes

### ~~Rename default branch from `master` to `main`~~ (DONE)

### ~~Review and resolve Dependabot security alerts~~ (DONE)

Alerts cleared after migration from Jekyll to Astro - old Ruby dependencies removed.

---

## Future Improvements

### ~~Add nightly dead link checker GitHub Action~~ (DONE)

Implemented using `lychee-action`:
- Nightly scheduled check of all links in built site
- PR-based check of changed files only using `step-security/changed-files`
- Creates GitHub issue on failure (nightly) or PR comment (PRs)
- All actions pinned to SHA with version comments for Renovate

