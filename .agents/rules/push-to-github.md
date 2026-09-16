---
name: push-to-github-after-update
description: Mandates staging, committing, and pushing code updates to GitHub after every update in the repository.
always_on: true
---

# Always Push Changes to GitHub After Every Update

Whenever any modification, fix, feature, or code update is completed in this workspace:

1. **Verify**: Run `npm run build` in `frontend` to ensure 0 TypeScript or bundler errors.
2. **Commit**: Stage relevant files with `git add` and commit with a descriptive conventional commit message (`feat:`, `fix:`, `chore:`).
3. **Push to GitHub**: Always run `git push origin main` (or the active branch) before ending the response. Never leave unpushed commits.
4. **Report**: Inform the user of the commit hash and remote push status.
