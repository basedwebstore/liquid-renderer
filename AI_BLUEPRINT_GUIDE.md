# Liquid Renderer AI Blueprint Guide

Use this guide to generate valid JSON blueprints for the Liquid renderer.

If you are new to the package, read [GET_STARTED_GUIDE.md](GET_STARTED_GUIDE.md) first.

## Allowed Widget Types

- alert
- avatar_chip
- badge
- button
- container
- divider
- empty_state
- icon_label
- input
- key_value_list
- list
- metric_grid
- progress_card
- section_header
- select
- stat_card
- stat_group
- table
- tabs
- text_block
- timeline
- toolbar
- trend_card

## Global Blueprint Shape

Required top-level fields:

- version: string
- layout: object
- widgets: array

Optional top-level fields:

- theme: light | dark
- colorScheme: palette overrides

## Layout Contract

Required:

- columns: number
- gap: number

Optional:

- theme: light | dark
- colorScheme: { light?: object, dark?: object }
- className: string
- style: { [cssProperty: string]: string | number }

## Widget Contract

Each widget must include:

- id: string
- type: one of allowed keys
- props: object

Optional:

- children: widget[]

## Shared Props Across Components

- theme: light | dark
- colorScheme: palette overrides
- className: string
- style: CSS object

## Runtime Conventions

The renderer can resolve data pointers at runtime when the host provides a runtime resolver.

Supported pointer prefixes:

- `$global.*` for shared context data
- `$input.*` for live input state
- `$page.*` for page-scoped runtime data

Use pointers only for values that must be hydrated at runtime. Keep static text, labels, and structural config as plain JSON values.

## Quick Prop Guide

- alert: { title, message, tone? }
- avatar_chip: { name, subtitle?, imageUrl? }
- badge: { label, tone? }
- button: { label, actionId, variant?, disabled? }
- container: { className?, style? }
- divider: { label? }
- empty_state: { title, description?, actionLabel? }
- icon_label: { label, icon?, tone? }
- input: { label, value?, placeholder?, inputType?, readOnly? }
- key_value_list: { entries: [{ key, value }] }
- list: { items: [{ title, subtitle?, meta? }] }
- metric_grid: { items: [{ label, value, tone? }], columns? }
- progress_card: { title, value, max?, tone? }
- section_header: { title, subtitle?, actionLabel? }
- select: { label, options: [{ label, value }], value?, disabled? }
- stat_card: { title, value, trend? }
- stat_group: { title?, stats: [{ label, value }] }
- table: { columns: string[], rows: Record<string, string|number|boolean>[] }
- tabs: { items: [{ id, label }], activeId? }
- text_block: { body, heading?, align? }
- timeline: { items: [{ title, description?, time?, tone? }] }
- toolbar: { title?, actions?: [{ label, tone? }] }
- trend_card: { title, current, previous, suffix? }

## Interaction Model

- `button` widgets emit dispatch events containing their `actionId` and widget metadata.
- `input`, `select`, and `tabs` widgets emit value-change events through the host runtime when a dispatcher is present.
- The renderer itself does not fetch data, mutate global state, or call LLM endpoints.
- Host controllers decide how to handle `action`, `change`, `input`, `navigation`, `refresh`, and `intent` event types.

## Example

```json
{
  "version": "1.0.0",
  "theme": "dark",
  "layout": {
    "columns": 1,
    "gap": 16
  },
  "widgets": [
    {
      "id": "root",
      "type": "container",
      "props": {
        "className": "grid grid-cols-1 gap-4"
      },
      "children": [
        {
          "id": "toolbar",
          "type": "toolbar",
          "props": {
            "title": "Ops Dashboard",
            "actions": [
              { "label": "Refresh" },
              { "label": "Export", "tone": "primary" }
            ]
          }
        },
        {
          "id": "mgrid",
          "type": "metric_grid",
          "props": {
            "columns": 3,
            "items": [
              { "label": "Revenue", "value": "$128k" },
              { "label": "Active Users", "value": 9421, "tone": "success" },
              { "label": "Errors", "value": 12, "tone": "warning" }
            ]
          }
        },
        {
          "id": "timeline",
          "type": "timeline",
          "props": {
            "items": [
              { "title": "Deploy started", "time": "09:02" },
              { "title": "Deploy complete", "time": "09:08", "tone": "success" }
            ]
          }
        }
      ]
    }
  ]
}
```