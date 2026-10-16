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

## Runtime Workflow

- The initial production site is plain HTML/CSS in `public/`, deployed directly with Cloudflare Workers Static Assets through `wrangler.jsonc`.
- Use Node.js 22.12 or newer and npm. Run `npm ci`, `npm run dev`, and `npm run deploy:dry-run`.
- There is no application build step or Worker `main`. Only `public/` is published; keep credentials, internal documents, and calendar data outside it.
- The root is a placeholder. Preserve the standalone `/eink-board/`, `/eink-board/privacy/`, and `/eink-board/terms/` URLs when integrating the future explorer.
- PR #4 contains the separate Astro/React/Tailwind explorer prototype. It is not required to publish these static information pages. Reconcile its tooling and asset directory when integrating it.
- Live deployment uses `npx wrangler deploy` from an approved release on `main`, after DNS prerequisites in `docs/deployment.md` are satisfied. A dry run does not deploy or verify DNS/TLS.
- Add application runtime code only when a real endpoint is needed. Do not switch to Cloudflare Pages.

## Check Every Time

- Branch starts from the current `development` tip.
- Branch name follows the allowlist.
- The work maps to a GitHub issue.
- Normal implementation pull requests target `development`.
- Release pull requests target `main` and use `development` as the head branch.
- The `Repo Policy / policy` check is green before merge.
- After merge, confirm the remote head branch was auto-deleted. If it was not, delete it unless there is an explicit reason to keep it.
