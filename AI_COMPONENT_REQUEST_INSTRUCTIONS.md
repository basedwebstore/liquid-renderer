# AI Component Request Instructions

Use this file when you want to ask AI to create a new Liquid UI component.

## Purpose

This guide gives a reusable request format so AI returns production-ready component code that fits the Liquid renderer architecture.

## Where The New Component Must Go

- Component file: `LiquidRenderer/components/liquid/<ComponentName>.tsx`
- Registry update: `LiquidRenderer/liquid.registry.tsx`
- Optional type updates: `LiquidRenderer/liquid.types.ts`
- Documentation update: `LiquidRenderer/REGISTRY_DOCS.md`
- AI guide update: `LiquidRenderer/AI_BLUEPRINT_GUIDE.md` (only if blueprint contract changes)

## Hard Requirements To Include In Your Prompt

Ask AI to do all items below in one pass:

1. Create the component with strict TypeScript props.
2. Keep default styling built-in.
3. Support JSON overrides via `className` and `style`.
4. Support `theme?: 'light' | 'dark'` and ensure dark/light defaults differ.
5. Support `colorScheme`-driven palette overrides when the component is color-aware.
6. Use Tailwind classes plus inline fallback default styles.
7. Register the component in `ComponentRegistry` with a new string key.
8. Document exact props (required/optional) in `REGISTRY_DOCS.md`.
9. Add a JSON widget example.
10. Keep renderer compatibility with recursive children behavior.
11. Run a build/type check after edits.

## Copy/Paste Prompt Template

```md
Create a new Liquid component named <ComponentName>.

Requirements:
- File path: LiquidRenderer/components/liquid/<ComponentName>.tsx
- Add strict props interface.
- Include default styles that look good out of the box.
- Support `className?: string` and `style?: LiquidStyleMap` overrides.
- Support `theme?: 'light' | 'dark'` with different dark/light defaults.
- If the component uses color-sensitive UI, consume the renderer-provided palette tokens and be compatible with JSON `colorScheme` inputs.
- Leave `theme` unset in example JSON unless you intentionally want a fixed subtree that ignores the global theme toggle.
- Keep component clean and minimal.
- Register it in LiquidRenderer/liquid.registry.tsx with key `<registry_key>`.
- Update LiquidRenderer/REGISTRY_DOCS.md with required and optional props.
- Add one valid JSON widget example using `<registry_key>`.
- Do not break existing components or renderer behavior.
- Run diagnostics/build and fix any issues.
```

## Good Request Example

```md
Create a new Liquid component named LiquidProgressCard.

Requirements:
- File path: LiquidRenderer/components/liquid/LiquidProgressCard.tsx
- Props:
  - title (required, string)
  - value (required, number)
  - max (optional, number, default 100)
  - tone (optional, 'neutral' | 'success' | 'warning')
  - theme (optional, 'light' | 'dark')
  - colorScheme (optional, palette overrides for light and dark)
  - className (optional, string)
  - style (optional, LiquidStyleMap)
- Add default modern styling and inline fallback styles.
- Register it in LiquidRenderer/liquid.registry.tsx with key `progress_card`.
- Update LiquidRenderer/REGISTRY_DOCS.md with prop contract and JSON example.
- Run build and ensure zero TS errors.
```

## Output You Should Expect From AI

A correct response should include:

1. New component file created.
2. Registry updated with new key mapping.
3. Docs updated with exact prop contract.
4. A JSON blueprint/widget example for the new component.
5. Confirmation that checks/build passed.

## Validation Checklist

Use this checklist after AI finishes:

- New file exists in `LiquidRenderer/components/liquid/`.
- `ComponentRegistry` contains the new key.
- Component supports `className` and `style`.
- Component supports `theme` and visibly differs in dark mode.
- Component can use `colorScheme`-driven palette overrides when relevant.
- Docs include required/optional props.
- JSON example uses the correct key and prop names.
- `npm run build` succeeds.
