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

### Review and resolve Dependabot security alerts

**Location:** https://github.com/daveworth/daveworth.github.com/security/dependabot

**Action:**
1. Review any remaining security vulnerabilities flagged by Dependabot
2. Dismiss alerts related to removed Jekyll dependencies (no longer applicable)
3. Address any new vulnerabilities in the Astro/Node.js dependencies if present

---

## Future Improvements

### Add nightly dead link checker GitHub Action

**Goal:** Create a GitHub Action that runs nightly to check for dead/broken links across the site.

**Considerations:**
- Check both internal and external links
- Run on a schedule (nightly)
- Create an issue or send notification when broken links are found
- Consider using a tool like `lychee` or `linkinator`

