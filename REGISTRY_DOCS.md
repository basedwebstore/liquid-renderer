# ComponentRegistry Reference

This document defines the exact component keys and props currently supported by `ComponentRegistry`.

Use these definitions when generating JSON blueprints.

For strict `button.props.actionId` conventions, also use `ACTION_DISPATCHER_DOCS.md`.

## Registry Map

- `stat_card` -> `LiquidStatCard`
- `button` -> `LiquidButton`
- `container` -> `LiquidContainer`

## Blueprint Rules

- Every widget must include:
  - `id` (string)
  - `type` (string key from the registry map)
  - `props` (object)
- `children` is optional and must be an array of widgets.
- Blueprint-level theme is supported:
  - `theme`: `light` | `dark` (optional)
- `props` values are limited to:
  - `string`
  - `number`
  - `boolean`
  - `style` object with CSS property keys and `string | number` values
  - `colorScheme` object with `light` and `dark` palette overrides

## Theme and Color Scheme Contract

The renderer resolves theme and palette values before rendering widgets.

- `theme`: `light` | `dark`
- `colorScheme`: object with optional `light` and `dark` entries

Color scheme tokens:

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

Renderer precedence:

1. `themeMode` passed to `LiquidRenderer`
2. `blueprint.theme`
3. `layout.theme`
4. `light` fallback

Palette inheritance:

1. `blueprint.colorScheme`
2. `layout.colorScheme`
3. `widget.props.colorScheme`
4. renderer default palette for the active theme

The renderer injects resolved `colorTokens` internally. Blueprint authors should set `colorScheme`, not `colorTokens`.

## Layout Styling Contract

`layout` supports both required grid parameters and optional styling overrides:

- `columns`: number (required)
- `gap`: number (required)
- `theme`: `light` | `dark` (optional)
- `colorScheme`: object (optional, same shape as the blueprint color scheme)
- `className`: string (optional)
- `style`: object (optional, CSS properties with `string | number` values)

Precedence:

- Engine defaults are applied first.
- JSON `layout.className` and `layout.style` are applied second.
- If both define the same style property, JSON wins.

## Component Prop Contracts

### `stat_card` (`LiquidStatCard`)

Required props:

- `title`: string
- `value`: string | number

Optional props:

- `trend`: number
- `theme`: `light` | `dark`
- `colorScheme`: object (optional, inherited palette override for this widget subtree)
- `className`: string
- `style`: object (`{ [cssProperty: string]: string | number }`)

Example:

```json
{
  "id": "revenue-card",
  "type": "stat_card",
  "props": {
    "title": "Revenue",
    "value": 128400,
    "trend": 8.2,
    "className": "md:col-span-1"
  }
}
```

### `button` (`LiquidButton`)

Required props:

- `label`: string
- `actionId`: string

Optional props:

- `variant`: `primary` | `secondary`
- `theme`: `light` | `dark`
- `colorScheme`: object (optional, inherited palette override for this widget subtree)
- `className`: string
- `style`: object (`{ [cssProperty: string]: string | number }`)
- `disabled`: boolean

Example:

```json
{
  "id": "refresh-button",
  "type": "button",
  "props": {
    "label": "Refresh Metrics",
    "actionId": "refresh_dashboard_metrics",
    "variant": "primary",
    "disabled": false
  }
}
```

### `container` (`LiquidContainer`)

Required props:

- None

Optional props:

- `theme`: `light` | `dark`
- `colorScheme`: object (optional, inherited palette override for this widget subtree)
- `className`: string
- `style`: object (`{ [cssProperty: string]: string | number }`)

Children behavior:

- `container` is intended to hold nested widgets via the widget `children` field.

Example:

```json
{
  "id": "root-container",
  "type": "container",
  "props": {
    "className": "grid grid-cols-1 gap-4 md:grid-cols-3"
  },
  "children": []
}
```

## Full Blueprint Example

```json
{
  "version": "1.0.0",
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
    "colorScheme": {
      "dark": {
        "surface": "#111827"
      }
    }
  },
  "widgets": [
    {
      "id": "root-container",
      "type": "container",
      "props": {
        "theme": "dark",
        "colorScheme": {
          "dark": {
            "surface": "#111827"
          }
        },
        "className": "grid grid-cols-1 gap-4 md:grid-cols-3"
      },
      "children": [
        {
          "id": "revenue-card",
          "type": "stat_card",
          "props": {
            "title": "Revenue",
            "value": 128400,
            "trend": 8.2
          }
        },
        {
          "id": "users-card",
          "type": "stat_card",
          "props": {
            "title": "Active Users",
            "value": 9421,
            "trend": -2.4
          }
        },
        {
          "id": "refresh-button",
          "type": "button",
          "props": {
            "label": "Refresh Metrics",
            "actionId": "refresh_dashboard_metrics",
            "variant": "primary",
            "disabled": false
          }
        }
      ]
    }
  ]
}
```