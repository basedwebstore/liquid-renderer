# Liquid Docs App

This folder contains the Vite docs website and live playground.

## Goals

- Real working playground for JSON blueprints
- Component reference sourced directly from `src/components/liquid/*.tsx`
- AI authoring guidance pages

## Run

From the package root:

```bash
npm run docs:dev
```

Build static docs:

```bash
npm run docs:build
```

Generate a static component manifest from source files:

```bash
npm run docs:generate
```

## Source-Driven Docs

The docs app parses component source and registry files at runtime using Vite raw imports:

- `src/components/liquid/*.tsx`
- `src/liquid.registry.tsx`

This keeps prop tables and component lists synced with the real code.
