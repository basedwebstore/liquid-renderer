# ComponentRegistry Reference

This document defines all component keys and prop contracts currently supported by ComponentRegistry.

## Registry Map

- alert -> LiquidAlert
- avatar_chip -> LiquidAvatarChip
- badge -> LiquidBadge
- button -> LiquidButton
- container -> LiquidContainer
- divider -> LiquidDivider
- empty_state -> LiquidEmptyState
- icon_label -> LiquidIconLabel
- input -> LiquidInput
- key_value_list -> LiquidKeyValueList
- list -> LiquidList
- metric_grid -> LiquidMetricGrid
- progress_card -> LiquidProgressCard
- section_header -> LiquidSectionHeader
- select -> LiquidSelect
- stat_card -> LiquidStatCard
- stat_group -> LiquidStatGroup
- table -> LiquidTable
- tabs -> LiquidTabs
- text_block -> LiquidTextBlock
- timeline -> LiquidTimeline
- toolbar -> LiquidToolbar
- trend_card -> LiquidTrendCard

## Shared Widget Props

Every component also supports:

- theme: light | dark
- colorScheme: palette override object
- className: string
- style: CSS style object

## Component Prop Contracts

### alert
- required: title (string), message (string)
- optional: tone (info | success | warning | danger)

### avatar_chip
- required: name (string)
- optional: subtitle (string), imageUrl (string)

### badge
- required: label (string)
- optional: tone (neutral | success | warning | danger)

### button
- required: label (string), actionId (string)
- optional: variant (primary | secondary), disabled (boolean)

### container
- required: none
- optional: children via widget.children

### divider
- required: none
- optional: label (string)

### empty_state
- required: title (string)
- optional: description (string), actionLabel (string)

### icon_label
- required: label (string)
- optional: icon (string), tone (neutral | success | warning | danger)

### input
- required: label (string)
- optional: value (string), placeholder (string), inputType (text | email | number | password), readOnly (boolean)

### key_value_list
- required: entries (Array<{ key: string; value: string | number }>)

### list
- required: items (Array<{ title: string; subtitle?: string; meta?: string }>)

### metric_grid
- required: items (Array<{ label: string; value: string | number; tone?: neutral | success | warning | danger }>)
- optional: columns (number)

### progress_card
- required: title (string), value (number)
- optional: max (number), tone (neutral | success | warning | danger)

### section_header
- required: title (string)
- optional: subtitle (string), actionLabel (string)

### select
- required: label (string), options (Array<{ label: string; value: string }>)
- optional: value (string), disabled (boolean)

### stat_card
- required: title (string), value (string | number)
- optional: trend (number)

### stat_group
- required: stats (Array<{ label: string; value: string | number }>)
- optional: title (string)

### table
- required: columns (string[]), rows (Array<Record<string, string | number | boolean>>)

### tabs
- required: items (Array<{ id: string; label: string }>)
- optional: activeId (string)

### text_block
- required: body (string)
- optional: heading (string), align (left | center | right)

### timeline
- required: items (Array<{ title: string; description?: string; time?: string; tone?: neutral | success | warning | danger }>)

### toolbar
- required: none
- optional: title (string), actions (Array<{ label: string; tone?: neutral | primary }>)

### trend_card
- required: title (string), current (number), previous (number)
- optional: suffix (string)

## Example Blueprint Snippet

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
        "className": "grid grid-cols-1 gap-4 md:grid-cols-2"
      },
      "children": [
        {
          "id": "toolbar",
          "type": "toolbar",
          "props": {
            "title": "Dashboard",
            "actions": [
              { "label": "Refresh" },
              { "label": "Export", "tone": "primary" }
            ]
          }
        },
        {
          "id": "trend",
          "type": "trend_card",
          "props": {
            "title": "MRR",
            "current": 92000,
            "previous": 87300,
            "suffix": "$"
          }
        },
        {
          "id": "grid",
          "type": "metric_grid",
          "props": {
            "columns": 3,
            "items": [
              { "label": "Users", "value": 9421 },
              { "label": "Conversion", "value": "3.8%", "tone": "success" },
              { "label": "Errors", "value": 12, "tone": "warning" }
            ]
          }
        }
      ]
    }
  ]
}
```