# Project Guidelines & Rules — GMP Vision

## Automatic Git Push Rule

After every task, feature update, bug fix, or codebase change in this project:

1. **Verify First**:
   - Run `npm run build` in `frontend/` to confirm there are 0 TypeScript compilation or bundler errors.

2. **Stage and Commit**:
   - Stage all relevant changes with `git add <files>`.
   - Write a clear, semantic commit message following conventional commits format (e.g., `feat(...)`, `fix(...)`, `style(...)`, `chore(...)`).

3. **Push to GitHub Immediately**:
   - Run `git push origin <branch>` (e.g., `git push origin main`) to ensure remote GitHub repository is always up to date.
   - Never leave unpushed local commits after finishing a task or update requested by the user.

4. **Confirm in Response**:
   - Provide the commit hash, commit message, and confirmation of the GitHub push status to the user.
