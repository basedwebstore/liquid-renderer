# Liquid Renderer AI Blueprint Guide

Use this guide to generate valid JSON blueprints for the Liquid renderer.

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