# ihnotic-site

Personal website repository for John Ihnotic.

## Status

This repository is intentionally starting with a governance-first skeleton. The site stack, deployment target, and application layout should be introduced in a normal issue-driven pull request after the workflow rules are in place.

## Branch Model

- `development` is the default working branch.
- Normal work happens on `feat/*` branches.
- Longer-running coordination can use `epic/*` branches with explicit approval.
- Normal pull requests merge into `development`.
- Releases promote `development` into `main`.

## Initial Structure

```text
.
|-- .editorconfig
|-- .gitignore
|-- AGENTS.md
|-- README.md
`-- .github/
    |-- pull_request_template.md
    `-- workflows/
        `-- policy.yml
```

## Next Step

Pick the site stack in an issue, create a `feat/*` branch from `development`, and add the app structure in that pull request.
