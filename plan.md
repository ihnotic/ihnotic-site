# ihnotic.com Knowledge Graph Explorer Plan

## Status

- Draft architecture and proof-of-concept plan.
- Scope is planning only. Do not add framework scaffolding until the first issue-driven implementation PR is opened.

## Product Direction

Build `ihnotic.com` as a single-document Knowledge Graph Explorer that reads like a switch fabric topology or circuit board rather than a linear marketing site or blog.

The content model must support:

- Leadership and IP artifacts
- Fabric architecture deep-dives
- Hardware and homelab notes
- Professional timeline milestones

## Additional Constraints

- Deploy on Cloudflare.
- Stay as close as practical to the `exohelix-site` stack.
- Do not use traditional route transitions for primary navigation.
- Graph state changes must update the URL hash without reloading or remounting the page.
- UI copy should prefer exact terms, dates, ranges, and metrics over adjectives.

## Assumptions

- The stated `sub-50ms FCP` target is treated as a lab budget for the graph shell on warm edge-cache desktop hardware, not a realistic public-web cold-load target across mobile devices.
- Public-web success should instead track `p75 FCP < 1.2s`, `p75 LCP < 1.8s`, and `p95 dirty-frame time < 16ms` during pan and zoom.
- The first proof of concept should stay static-first, with no runtime search backend, no live CMS, and no runtime force simulation.

## Architecture Decision

### Site Shell and Deployment

Use the same base stack shape as `exohelix-site`:

- `Astro 6`
- `React 19` islands
- `TypeScript` strict mode
- `Tailwind CSS 4`
- `Wrangler 4`
- `wrangler.jsonc`
- Cloudflare Workers deployment

Deploy to **Cloudflare Workers Static Assets**, not Pages.

Rationale:

- Cloudflare currently recommends Workers Static Assets for new static, SPA, and full-stack projects.
- Astro already has a supported Cloudflare Workers deployment path.
- `exohelix-site` already uses `Astro + React + Tailwind + Wrangler`, so this keeps tooling, scripts, and repo conventions aligned.
- The site can remain static-first for the POC and still add a small Worker entrypoint later if API routes are needed.

### Graph Runtime

Use a custom GPU-rendered graph island inside the Astro shell:

- `pixi.js 8` for WebGL rendering
- `pixi-viewport` for pan, wheel zoom, pinch zoom, and camera snapping
- `zustand` with a vanilla store and `subscribeWithSelector` for camera, selection, filters, and hash sync
- `graphology` for the normalized node and edge graph model
- `elkjs` only for build-time or worker-thread fallback layout, not for per-frame runtime layout

Rationale:

- The approved visual direction is closer to a board schematic than a generic node-link diagram.
- PixiJS gives lower-level control over traces, ports, edge batching, and level-of-detail rules than generic graph UI libraries.
- React should own overlays and surrounding chrome, not the graph scene itself.

## Deliberate Non-Choices

- Do not use a standalone Vite-only application for the main site shell. That reduces parity with `exohelix-site` for limited benefit.
- Do not use DOM-heavy graph frameworks for the core explorer surface.
- Do not use runtime force-directed layouts in the hot path.
- Do not introduce multipage navigation for the primary content model in the POC.

## Recommended Project Shape

This is a target layout for the first implementation PR, not permission to scaffold it early:

```text
src/
  components/
    interactive/
      KnowledgeGraphExplorer.tsx
      GraphOverlay.tsx
    graph/
      renderer/
      store/
      layout/
      labels/
  content/
    artifacts/
      *.md
    graph-schema.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
worker/
  index.ts        # only if or when runtime API endpoints are required
```

## Interaction Model

### Camera and Navigation

- The primary page stays mounted at all times.
- Navigation state is encoded in the URL hash only.
- Example hash: `#focus=fabric.supernode&x=4820&y=1180&z=1.6&filters=fabric,timeline`
- `0` resets the camera to fit.
- `F` centers the selected node.
- `Esc` collapses the active node dossier and clears transient highlights.

### Zoom Bands

- `0.35-0.8`: overview band
  - Show lane headers, cluster counts, primary trunks, and only the highest-weight edges.
- `0.8-1.6`: cluster band
  - Show node titles, relation highlights, and cluster-local edges.
- `1.6-3.0`: artifact band
  - Show metrics, dates, ports, short metadata labels, and inline dossier affordances.

### Selection and Expansion

- Single click selects a node and highlights first-degree neighbors.
- Second click or `Enter` expands the selected node dossier without changing documents.
- Expansion should grow along authored lanes and orthogonal traces, not as radial bubbles.
- Child ordering should be deterministic: `lane`, then `sort date`, then `weight`.
- Camera snap after expansion should stay within `180-240ms`.

### Mobile Behavior

- Full-screen canvas remains the primary surface.
- One-finger drag pans.
- Pinch gesture zooms.
- Tap selects.
- Second tap opens a bottom sheet dossier.
- Default mobile view should start with collapsed clusters and reduced labels.
- Provide a fixed lane jump control for the four top-level categories.

## Performance Plan

- Keep the initial shell mostly static HTML and CSS from Astro.
- Hydrate only one React island for the graph explorer.
- Load graph overview data first, then load heavier label and dossier payloads lazily.
- Precompute node positions and edge segments whenever possible.
- Use authored coordinates first. Use `ELK Layered` with orthogonal routing only when authored coordinates are missing.
- Do not allocate DOM nodes per graph node.
- Cull labels by zoom band.
- Avoid runtime text layout churn; cache label textures where possible.
- Keep pan and zoom updates inside the Pixi scene and external store, not through React rerenders.

## Content Pipeline

Source of truth should be Markdown artifacts with validated frontmatter.

Pipeline:

1. Author Markdown files under `src/content/artifacts/`
2. Validate frontmatter against the graph schema
3. Compile a normalized graph manifest
4. Emit lightweight overview data for first paint
5. Emit per-node or per-lane detail payloads for lazy loading

## Draft Content Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "IhnoticArtifact",
  "type": "object",
  "required": ["id", "kind", "category", "title", "summary", "dates", "relations"],
  "properties": {
    "id": { "type": "string", "pattern": "^[a-z0-9._-]+$" },
    "kind": {
      "enum": [
        "executive_summary",
        "patent",
        "rfc",
        "fabric_note",
        "homelab_note",
        "material_profile",
        "timeline_event",
        "role",
        "keynote"
      ]
    },
    "category": {
      "enum": [
        "leadership-ip",
        "fabric-architecture",
        "hardware-homelab",
        "professional-timeline"
      ]
    },
    "title": { "type": "string" },
    "summary": { "type": "string", "maxLength": 280 },
    "dates": {
      "type": "object",
      "required": ["sort"],
      "properties": {
        "sort": { "type": "string", "format": "date" },
        "start": { "type": "string", "format": "date" },
        "end": { "type": ["string", "null"], "format": "date" }
      }
    },
    "metrics": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "value", "unit"],
        "properties": {
          "label": { "type": "string" },
          "value": { "type": ["number", "string"] },
          "unit": { "type": "string" },
          "min": { "type": "number" },
          "max": { "type": "number" }
        }
      }
    },
    "layout": {
      "type": "object",
      "properties": {
        "lane": { "type": "string" },
        "order": { "type": "number" },
        "fixed": { "type": "boolean" },
        "x": { "type": "number" },
        "y": { "type": "number" }
      }
    },
    "relations": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["target", "kind"],
        "properties": {
          "target": { "type": "string" },
          "kind": {
            "enum": [
              "extends",
              "references",
              "depends_on",
              "derived_from",
              "implemented_in",
              "presented_at",
              "advises",
              "chronology"
            ]
          },
          "weight": { "type": "number", "minimum": 0, "maximum": 1 }
        }
      }
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

## POC Scope

Keep the first proof of concept intentionally narrow:

- `32` seeded nodes
- `4` top-level taxonomy lanes
- `40-80` typed edges
- `1` inline desktop dossier pattern
- `1` mobile bottom-sheet dossier pattern
- No backend search
- No CMS
- No live editing

## Next Steps

| Date | Owner | Action | Output |
| --- | --- | --- | --- |
| 2026-04-22 | John Ihnotic | Open the implementation issue for the graph POC and lock scope | Issue with acceptance criteria and seeded node list |
| 2026-04-23 | John Ihnotic | Prepare first content pack across all four lanes | `8-12` source artifacts and relation map |
| 2026-04-24 | Frontend Systems Engineer | Create `feat/<issue>-graph-poc` from `development` and scaffold the Astro/Cloudflare base stack | Initial app shell PR |
| 2026-04-24 | Frontend Systems Engineer | Mirror `exohelix-site` conventions for scripts, Node version floor, Tailwind, React, and Wrangler | Repo-aligned build and deploy shape |
| 2026-04-25 | UI/UX Architect | Freeze zoom bands, node sizing, label thresholds, and mobile dossier behavior | Interaction spec v1 |
| 2026-04-28 | Frontend Systems Engineer | Build the first interactive island with PixiJS, camera controls, selection, and hash sync | Working graph shell |
| 2026-04-29 | John Ihnotic + Frontend Systems Engineer | Load seed data, tune authored coordinates, and remove layout work from the hot path | Seeded POC graph |
| 2026-04-30 | Performance Owner | Profile desktop and mobile behavior | Frame-time and load budget report |

## Repository Workflow Notes

- The repo is currently governance-first. The first implementation PR is the place to introduce Astro, React, Tailwind, Wrangler, and Cloudflare deployment files.
- Because that PR introduces a new runtime and deployment target, update `AGENTS.md` in the same PR so future work inherits the correct workflow.
- Normal implementation work should start from `development`, use a `feat/*` branch, map to a GitHub issue, and target `development` in the PR.

## Reference Decisions

- Prefer Cloudflare Workers Static Assets for new projects.
- Prefer Astro for the static-first shell and React islands for localized interactivity.
- Preserve `exohelix-site` parity for build stack and deployment conventions.
- Keep the graph runtime as a deliberate exception: custom PixiJS rendering instead of DOM-first component layout.
