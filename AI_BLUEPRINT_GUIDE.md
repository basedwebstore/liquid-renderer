# Liquid Renderer AI Blueprint Guide

Use this file as the AI-facing instruction set for generating valid Liquid UI blueprints.

## 1) Allowed Widget Types

Only these `type` values are currently valid:

- `stat_card`
- `button`
- `container`

Example:

```json
{
  "id": "card_1",
  "type": "stat_card",
  "props": {
    "title": "Revenue",
    "value": 120000
  }
}
```

## 2) Global Blueprint Shape

Required top-level fields:

- `version`: string
- `layout`: object
- `widgets`: array

Optional top-level fields:

- `theme`: `light` | `dark`
- `colorScheme`: palette overrides for light and dark themes

Example:

```json
{
  "version": "1.0.0",
  "theme": "light",
  "colorScheme": {
    "light": {
      "surface": "#ffffff"
    },
    "dark": {
      "surface": "#0f172a"
    }
  },
  "layout": {
    "columns": 1,
    "gap": 16
  },
  "widgets": []
}
```

## 3) Layout Contract

`layout` supports required grid values and optional overrides.

Required:

- `columns`: number
- `gap`: number

Optional:

- `theme`: `light` | `dark`
- `colorScheme`: `{ light?: object, dark?: object }`
- `className`: string
- `style`: `{ [cssProperty: string]: string | number }`

Example:

```json
{
  "layout": {
    "columns": 2,
    "gap": 20,
    "theme": "dark",
    "colorScheme": {
      "dark": {
        "surface": "#0f172a",
        "text": "#e2e8f0"
      }
    },
    "className": "md:grid-cols-2",
    "style": {
      "alignItems": "stretch"
    }
  }
}
```

## 4) Widget Contract

Each widget object must include:

- `id`: string
- `type`: one of the registry keys
- `props`: object

Optional:

- `children`: array of widgets

Widget-level theme override:

- `props.theme`: `light` | `dark`
- `props.colorScheme`: palette override object for this widget subtree

If you want the global theme toggle to control the whole preview, leave `props.theme` unset on child widgets.
Only set widget theme values when you intentionally want a fixed subtree that does not follow the parent theme.

Example:

```json
{
  "id": "container_root",
  "type": "container",
  "props": {
    "className": "grid grid-cols-1 gap-4"
  },
  "children": []
}
```
## 5) Component Props

### `stat_card`

Required props:

- `title`: string
- `value`: string | number

Optional props:

- `trend`: number
- `theme`: `light` | `dark`
- `colorScheme`: palette override object
- `className`: string
- `style`: CSS style map

Example:

```json
{
  "id": "revenue_stat",
  "type": "stat_card",
  "props": {
    "title": "Revenue",
    "value": 128400,
    "trend": 8.2,
    "className": "md:col-span-1",
    "style": {
      "borderColor": "#86efac"
    }
  }
}
```

### `button`

Required props:

- `label`: string
- `actionId`: string

Optional props:

- `variant`: `primary` | `secondary`
- `theme`: `light` | `dark`
- `colorScheme`: palette override object
- `className`: string
- `style`: CSS style map
- `disabled`: boolean

Example:

```json
{
  "id": "refresh_button",
  "type": "button",
  "props": {
    "label": "Refresh Metrics",
    "variant": "primary",
    "actionId": "refresh_dashboard_metrics",
    "disabled": false,
    "style": {
      "letterSpacing": "0.01em"
    }
  }
}
```

### `container`

Required props:

- none

Optional props:

- `theme`: `light` | `dark`
- `colorScheme`: palette override object
- `className`: string
- `style`: CSS style map

Example:

```json
{
  "id": "group_container",
  "type": "container",
  "props": {
    "className": "grid grid-cols-1 gap-3 md:grid-cols-3",
    "style": {
      "backgroundColor": "#f8fafc"
    }
  },
  "children": []
}
```

## 6) Styling Rules and Priority

Style priority order:

1. Engine defaults
2. Theme + color scheme defaults (`light` or `dark`)
3. JSON `className` and `style`

If a property conflicts, JSON overrides win.

Example:

```json
{
  "props": {
    "className": "border-2",
    "style": {
      "borderColor": "#fca5a5"
    }
  }
}
```

## 7) actionId Rules

`button.props.actionId` must follow this pattern:

```text
^[a-z][a-z0-9_]{2,63}$
```

Use lowercase and underscores only.

Valid examples:

- `refresh_dashboard_metrics`
- `open_filter_panel`

Invalid examples:

- `RefreshMetrics`
- `refresh-metrics`

## 8) Theme Resolution Rules

Theme inheritance and override order:

1. `LiquidRenderer` prop: `themeMode`
2. `blueprint.theme`
3. `layout.theme`
4. default `light`

Per-widget override:

- `widget.props.theme` overrides inherited theme for that widget and its children.

## 9) Color Scheme Rules

Color schemes let each product define both light and dark palettes in JSON.

Set color schemes in these places:

- `blueprint.colorScheme`
- `layout.colorScheme`
- `widget.props.colorScheme`

Palette tokens:

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

Resolution order:

1. `blueprint.colorScheme`
2. `layout.colorScheme`
3. `widget.props.colorScheme`
4. default palette for the active theme

## 10) Full Example Blueprint

```json
{
  "version": "1.0.0",
  "theme": "dark",
  "colorScheme": {
    "light": {
      "surface": "#ffffff",
      "text": "#0f172a"
    },
    "dark": {
      "surface": "#0f172a",
      "text": "#e2e8f0"
    }
  },
  "layout": {
    "columns": 1,
    "gap": 16,
    "theme": "dark",
    "colorScheme": {
      "dark": {
        "surface": "#111827",
        "text": "#e2e8f0"
      }
    },
    "className": "md:grid-cols-1",
    "style": {
      "alignItems": "stretch"
    }
  },
  "widgets": [
    {
      "id": "root_container",
      "type": "container",
      "props": {
        "theme": "dark",
        "colorScheme": {
          "dark": {
            "surface": "#111827"
          }
        },
        "className": "grid grid-cols-1 gap-4 md:grid-cols-3",
        "style": {
          "backgroundColor": "#0f172a"
        }
      },
      "children": [
        {
          "id": "revenue_stat",
          "type": "stat_card",
          "props": {
            "title": "Revenue",
            "value": 128400,
            "trend": 8.2,
            "style": {
              "borderColor": "#86efac"
            }
          }
        },
        {
          "id": "users_stat",
          "type": "stat_card",
          "props": {
            "title": "Active Users",
            "value": 9421,
            "trend": -2.4,
            "style": {
              "borderColor": "#fca5a5"
            }
          }
        },
        {
          "id": "refresh_button",
          "type": "button",
          "props": {
            "label": "Refresh Metrics",
            "variant": "primary",
            "actionId": "refresh_dashboard_metrics",
            "disabled": false
          }
        }
      ]
    }
  ]
}
```

## 11) Source Docs

Pair this guide with these module docs:

- `REGISTRY_DOCS.md`
- `STYLING_OVERRIDES_DOCS.md`
- `ACTION_DISPATCHER_DOCS.md`
