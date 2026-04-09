# Liquid UI Styling and Overrides

This document defines how styling and theme resolution work in the Liquid UI Engine.

## Goal

The engine is default-styled out of the box.

You can optionally override styles in blueprint JSON without changing component code.

The engine supports both light mode and dark mode defaults.

Projects can also define explicit color palettes for both modes through a `colorScheme` object.

Styling behavior is independent from runtime pointer resolution and dispatch wiring. A widget can remain visually identical whether it is static or wired to host state.

## Styling Model

### 1. Default styles (always applied)

- `LiquidRenderer` applies a default grid layout style.
- `LiquidContainer` applies default wrapper/card styles.
- `LiquidStatCard` applies default card and typography styles.
- `LiquidButton` applies default button and variant styles.

### 2. JSON overrides (optional)

Layout-level overrides:

- `blueprint.layout.className`
- `blueprint.layout.style`

Widget-level overrides:

- `widget.props.className`
- `widget.props.style`

### 3. Theme controls

Theme values:

- `light`
- `dark`

Theme can be set in these places:

- Renderer prop: `themeMode`
- Blueprint: `blueprint.theme`
- Layout: `blueprint.layout.theme`
- Widget: `widget.props.theme`

Theme resolution order:

1. Renderer prop `themeMode` (if provided)
2. `blueprint.theme`
3. `layout.theme`
4. `light` fallback

Per-widget override behavior:

- `widget.props.theme` overrides inherited theme for that widget subtree.
- Do not set `widget.props.theme` if you want the widget to follow the global light/dark toggle.
- Use widget-level theme only when you need a fixed subtree that ignores the parent theme.

### 4. Color scheme controls

`colorScheme` can be set in three places:

- `blueprint.colorScheme`
- `layout.colorScheme`
- `widget.props.colorScheme`

Each entry should define palette overrides for one or both modes:

- `light`
- `dark`

Supported tokens:

- `pageBackground`
- `surface`
- `surfaceAlt`
- `text`
- `mutedText`
- `border`
- `accent`
- `accentText`
- `success`
- `warning`
- `danger`
- `shadow`

Palette resolution order:

1. `blueprint.colorScheme`
2. `layout.colorScheme`
3. `widget.props.colorScheme`
4. default palette for the active theme

Use `colorScheme` at the blueprint or layout level when you want the whole product to change look across light and dark modes.
Use widget-level `colorScheme` only for local overrides.

## Precedence Rules

When a style conflict happens:

1. Engine base defaults are applied.
2. Resolved theme/palette defaults (`light` or `dark`) are applied.
3. JSON `className` and `style` overrides are applied.

For `style` objects, later keys win by merge order.

For `className`, override classes are appended after defaults.

## Supported JSON Types

- `theme`: `light` | `dark`
- `colorScheme`: object with light/dark palette overrides
- `className`: string
- `style`: object with CSS properties and `string | number` values

Example `style` object:

```json
{
  "borderColor": "#86efac",
  "padding": 24,
  "letterSpacing": "0.01em"
}
```

## Example Blueprint Snippet

```json
{
  "theme": "dark",
  "colorScheme": {
    "light": {
      "pageBackground": "#f8fafc",
      "surface": "#ffffff",
      "surfaceAlt": "#f1f5f9",
      "text": "#0f172a",
      "mutedText": "#64748b",
      "border": "#e2e8f0",
      "accent": "#0f172a",
      "accentText": "#ffffff",
      "success": "#059669",
      "warning": "#d97706",
      "danger": "#b91c1c",
      "shadow": "rgba(15, 23, 42, 0.08)"
    },
    "dark": {
      "pageBackground": "#020617",
      "surface": "#0f172a",
      "surfaceAlt": "#1e293b",
      "text": "#e2e8f0",
      "mutedText": "#94a3b8",
      "border": "#334155",
      "accent": "#22d3ee",
      "accentText": "#020617",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fda4af",
      "shadow": "rgba(2, 6, 23, 0.5)"
    }
  },
  "layout": {
    "columns": 1,
    "gap": 16,
    "theme": "dark",
    "className": "md:grid-cols-1",
    "style": {
      "alignItems": "stretch"
    }
  },
  "widgets": [
    {
      "id": "root-container",
      "type": "container",
      "props": {
        "theme": "dark",
        "className": "grid grid-cols-1 gap-4 md:grid-cols-3",
        "style": {
          "backgroundColor": "#0f172a"
        }
      }
    }
  ]
}
```