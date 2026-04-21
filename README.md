# ihnotic-site

Personal website repository for John Ihnotic.

## Current Direction

The site is being built as a single-page Knowledge Graph Explorer rather than a linear marketing site or blog. The current mockup uses a topology-style interface that is meant to feel closer to a switch fabric or circuit board than a conventional website layout.

## Stack

- `Astro 6`
- `React 19` islands
- `Tailwind CSS 4`
- `TypeScript`
- `Wrangler 4`
- Cloudflare Workers Static Assets deployment

## Local Development

```sh
npm install
npm run dev
npm run build
npm run typecheck
```

## Branch Model

- `development` is the default working branch.
- Normal work happens on `feat/*` branches.
- Longer-running coordination can use `epic/*` branches with explicit approval.
- Normal pull requests merge into `development`.
- Releases promote `development` into `main`.

## Project Shape

```text
.
|-- AGENTS.md
|-- astro.config.mjs
|-- package.json
|-- plan.md
|-- wrangler.jsonc
`-- src/
    |-- components/
    |   `-- interactive/
    |-- content/
    |-- layouts/
    |-- pages/
    `-- styles/
```

## Deployment

The site is intended to deploy on Cloudflare Workers Static Assets via `wrangler.jsonc`. Add a `worker/` entrypoint only when an actual runtime endpoint is needed.
