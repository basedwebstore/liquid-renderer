# @basedweb/liquid-renderer

Reusable Liquid UI rendering engine package.

## Closed-Source Distribution Notes

This package is configured for private npm distribution under a scope with restricted access.

Important: npm packages always ship executable JavaScript to consumers. That means code can be inspected by anyone who can install the package. This setup prevents accidental source leakage (for example raw `src/*` and internal docs), but no npm setup can provide mathematically perfect secrecy once clients execute the code.

## What This Repo Now Enforces

- Publish only compiled output from `dist/`
- Exclude `src/` and internal docs from the npm tarball via the `files` allowlist
- Disable source maps in the build output
- Run CI validation (`typecheck`, `build`, `npm pack --dry-run`)
- Publish via GitHub Actions with npm provenance and a repo secret token

## Package Scope

This package is only intended for private/internal distribution.

## Exports

- `LiquidRenderer`
- `ComponentRegistry`
- Liquid schema and theme types

## Source Layout

- `src/LiquidRenderer.tsx`
- `src/liquid.registry.tsx`
- `src/liquid.types.ts`
- `src/color-scheme.ts`
- `src/components/liquid/*`

## Internal Docs

- `REGISTRY_DOCS.md`
- `STYLING_OVERRIDES_DOCS.md`
- `ACTION_DISPATCHER_DOCS.md`
- `AI_BLUEPRINT_GUIDE.md`
- `AI_COMPONENT_REQUEST_INSTRUCTIONS.md`

## Publish Strategy (Private)

Use a private npm scope/registry and publish with restricted access.

## One-Time Setup

1. Ensure the npm org/scope exists and supports private packages.
2. In npm, create an automation token with publish rights.
3. In GitHub repo settings, add secret `NPM_TOKEN` with that token value.
4. Ensure your default branch is `main` (or update workflow branch filters).
5. Create GitHub Environment `npm-publish` and add required reviewers (maintainers only).
6. Add branch protection on `main`:
	- Require a pull request before merging
	- Require approvals (recommended: 1 or 2)
	- Require review from Code Owners
	- Require status checks to pass (`CI / validate`)

## Local Verification

Run these before releasing:

```bash
npm ci
npm run typecheck
npm run build
npm run check:pack
```

`npm run check:pack` shows exactly what files would be published. You should only see `dist/*` and package metadata files.

## Release Options

### Option A: npm-publish Workflow (recommended)

1. Bump version in package.json.
2. Commit and push to main.
3. Trigger publish by either:
   - creating a GitHub Release (published), or
   - running workflow npm-publish manually from the Actions tab.

Required GitHub secret:

- NPM_TOKEN (npm automation token with publish rights)

## Extra Hardening You Can Add

- Use npm organization teams so only approved users can install.
- Rotate `NPM_TOKEN` regularly.
- If you need stronger IP protection, move sensitive logic behind an API and keep only rendering adapters in the client package.
