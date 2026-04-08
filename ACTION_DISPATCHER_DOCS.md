# Action Dispatcher Contract

This document defines the `actionId` contract used by `LiquidButton` widgets.

Use this as a strict guide when generating JSON blueprints so every button maps to a known app action.

## Purpose

- `actionId` is a stable string key, not executable code.
- The UI engine emits `actionId` when a button is pressed.
- A separate dispatcher layer maps `actionId` to real application behavior.
- `actionId` logic is theme-agnostic (same action keys in light and dark mode).
- `actionId` logic is also color-scheme-agnostic (palette changes do not change action keys).

## `actionId` Format

Allowed pattern:

```text
^[a-z][a-z0-9_]{2,63}$
```

Rules:

- Lowercase only
- Use underscores to separate words
- Must start with a letter
- Length: 3 to 64 characters
- No spaces, hyphens, dots, or special symbols

Good examples:

- `refresh_dashboard_metrics`
- `open_user_profile`
- `export_monthly_report`

Invalid examples:

- `RefreshDashboard` (uppercase)
- `refresh-dashboard` (hyphen)
- `refresh dashboard` (space)
- `1st_action` (starts with number)

## Dispatcher Allowlist

Only allow actions present in a central allowlist.

Example allowlist:

```ts
const ALLOWED_ACTIONS = [
  'refresh_dashboard_metrics',
  'open_user_profile',
  'export_monthly_report',
] as const;
```

Unknown actions should be handled safely:

- Log diagnostic details for developers.
- Ignore execution (no-op) or show a non-blocking warning.
- Do not throw uncaught runtime errors.

## AI Blueprint Authoring Rules

- For every `button` widget, always provide a non-empty `actionId`.
- Choose `actionId` values from the approved action list only.
- Reuse the exact string key for the same semantic action across blueprints.
- Do not invent near-duplicate keys for the same intent.

## Recommended Starter Action Set

- `refresh_dashboard_metrics`
- `open_filter_panel`
- `clear_all_filters`
- `export_current_view`
- `navigate_to_details`

## Button Example

```json
{
  "id": "refresh-button",
  "type": "button",
  "props": {
    "theme": "dark",
    "label": "Refresh Metrics",
    "variant": "primary",
    "actionId": "refresh_dashboard_metrics",
    "disabled": false
  }
}
```