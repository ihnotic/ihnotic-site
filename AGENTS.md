# ihnotic-site Agent Workflow

## Gitflow

- Always start work from `development`.
- Allowed branch names are `feat/*` for normal work and `epic/*` for longer-lived coordination.
- Use `feat/<issue-or-short-id>-<slug>` unless a human explicitly approves an `epic/*` branch.
- Every implementation task must map to a GitHub issue.
- Never commit directly to `main` or `development`.
- Open normal implementation pull requests from the working branch into `development`.
- Promote releases only through `development` to `main`.
- Tag releases as `release-YYYY-MM-DD`, adding `-2`, `-3`, and so on for multiple releases on the same date.

## Delivery Rules

- Use test-first development for non-trivial logic once executable application code exists in the repo.
- Keep the repository hygiene workflow green on every pull request.
- Report the exact verification commands run in the pull request description.
- If a change introduces a new runtime, framework, or deployment target, update this file in the same pull request so future agents inherit the right workflow.

## Repository Structure

- The root governance files are `AGENTS.md`, `README.md`, `.editorconfig`, and `.gitignore`.
- GitHub policy lives under `.github/`, including the pull request template and the repository policy workflow.
- Do not add speculative framework scaffolding. Introduce app directories only in the pull request that actually adopts the chosen stack.
- The application shell now uses `Astro 6` with `React 19` islands, `Tailwind CSS 4`, and `wrangler.jsonc`.
- The primary site entry is `src/pages/index.astro`.
- Interactive graph code should live under `src/components/interactive/`.
- Structured mock or authored content should live under `src/content/`.
- Add `worker/` only when a real runtime endpoint is needed. Static-first deployments should stay on Cloudflare Workers Static Assets without a Worker `main`.

## Runtime Workflow

- Default package manager is `npm`.
- Preferred local commands are `npm install`, `npm run dev`, `npm run build`, and `npm run typecheck`.
- Deployments should target Cloudflare Workers Static Assets through `wrangler.jsonc`, not Cloudflare Pages, unless a human explicitly approves a change.
- Keep primary navigation state hash-driven inside the single-page explorer unless a human explicitly asks for additional routed pages.

## Check Every Time

- Branch starts from the current `development` tip.
- Branch name follows the allowlist.
- The work maps to a GitHub issue.
- Normal implementation pull requests target `development`.
- Release pull requests target `main` and use `development` as the head branch.
- The `Repo Policy / policy` check is green before merge.
- After merge, confirm the remote head branch was auto-deleted. If it was not, delete it unless there is an explicit reason to keep it.
