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

