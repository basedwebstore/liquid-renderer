# Action Dispatcher Contract

This document defines the runtime dispatch contract used by interactive Liquid widgets.

Use this as a strict guide when generating JSON blueprints so every interaction maps to a known app action or host-side state change.

## Purpose

- `actionId` is a stable string key, not executable code.
- The UI engine emits normalized dispatch events when interactive widgets are used.
- A separate dispatcher layer maps those events to real application behavior.
- `actionId` logic is theme-agnostic (same action keys in light and dark mode).
- `actionId` logic is also color-scheme-agnostic (palette changes do not change action keys).

## Event Types

Supported dispatch types:

- `action` - button-like intent triggers
- `input` - text input changes
- `change` - select/tabs-style value changes
- `navigation` - route/page switches
- `refresh` - explicit refetch/recompute requests
- `intent` - LLM-assisted blueprint generation or regeneration

Each event may include:

- `widgetId` - the originating widget ID
- `payload` - event-specific data

Example shape:

```ts
dispatch({
  type: 'change',
  widgetId: 'region-filter',
  payload: { value: 'eu-west', label: 'Region' },
});
```

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

## Host Handling Guidance

- Update Zustand state immediately for local UI interactions when possible.
- Trigger API fetches for standard data refreshes and persist the result back into runtime state.
- Route navigation events through the host router or page shell.
- For `intent` events, bundle current runtime state plus the user prompt and send that to the LLM generation endpoint.
- Keep the renderer stateless with respect to network, persistence, and model execution.

## Recommended Starter Action Set

- `refresh_dashboard_metrics`
- `open_filter_panel`
- `clear_all_filters`
- `export_current_view`
- `navigate_to_details`
- `generate_new_blueprint`

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