# ihnotic-site

Personal website repository for John Ihnotic.

## Site

A minimal placeholder and eInk Board information pages, served directly from `public/` by Cloudflare Workers Static Assets. No application server or build step is needed.

- `/` — personal-site placeholder
- `/eink-board/` — app information
- `/eink-board/privacy/` — Privacy Policy
- `/eink-board/terms/` — Terms of Use

The interactive explorer remains separate work in PR #4.

## Local verification

Use Node.js 22.12 or newer:

```sh
npm ci
npm run dev
npm run deploy:dry-run
```

Wrangler serves the site at `http://localhost:8787`. The dry run validates the deployment configuration without publishing. CI runs it in addition to repository policy checks.

## Deployment

`wrangler.jsonc` binds the `ihnotic-site` Worker to `ihnotic.com`. Only `public/` is uploaded. Follow [the deployment and DNS plan](docs/deployment.md) before a live deployment; the custom domain requires an active Cloudflare zone.

The [eInk Board publishing checklist](docs/eink-board-public-pages.md) contains the exact Google branding URLs and content provenance. A configured domain or successful dry run does not establish public HTTPS acceptance or Google approval.

## Branch Model

- `development` is the default working branch.
- Normal work happens on `feat/*` branches.
- Longer-running coordination can use `epic/*` branches with explicit approval.
- Normal pull requests merge into `development`.
- Releases promote `development` into `main`.

## Structure

```text
.
|-- AGENTS.md
|-- README.md
|-- docs/
|-- package.json
|-- public/
|   |-- index.html
|   `-- eink-board/
|-- wrangler.jsonc
`-- .github/workflows/
```
