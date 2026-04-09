# Liquid Renderer Get Started Guide

This is the easiest way to start using Liquid Renderer.

If you only read one doc first, read this one.

## What This Package Does

Liquid Renderer turns a JSON blueprint into React UI.

You describe the layout and widgets in JSON, then render them with `LiquidRenderer`.

The renderer is only responsible for drawing UI.

Your app is still responsible for:

- fetching data
- storing live state
- handling button clicks and input changes
- calling APIs
- calling an LLM if you want a new UI to be generated

## The Mental Model

Think of it like this:

- JSON = what the UI should look like
- React/TypeScript = how your app reacts to user actions
- Host runtime = the bridge between the two

## Install

```bash
npm install liquid-renderer
```

You also need:

- react 18 or 19
- react-dom 18 or 19

## First Example

Here is the smallest useful example.

```tsx
import { LiquidRenderer, type LiquidBlueprint } from 'liquid-renderer';

const blueprint: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: {
    columns: 2,
    gap: 16,
  },
  widgets: [
    {
      id: 'welcome-card',
      type: 'stat_card',
      props: {
        title: 'Revenue',
        value: '$42,180',
      },
    },
    {
      id: 'report-button',
      type: 'button',
      props: {
        label: 'View Report',
        actionId: 'open_report',
      },
    },
  ],
};

export function DemoPage() {
  return <LiquidRenderer blueprint={blueprint} />;
}
```

What happens here:

- `stat_card` renders a metric
- `button` renders a clickable action button
- `LiquidRenderer` puts them into a grid

## Example With Live State

When you want UI to react to real data, pass a runtime object.

```tsx
import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from 'liquid-renderer';

const blueprint: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: {
    columns: 1,
    gap: 16,
  },
  widgets: [
    {
      id: 'search-box',
      type: 'input',
      props: {
        label: 'Search',
        value: '$input.searchQuery',
        placeholder: 'Type to filter',
      },
    },
    {
      id: 'results',
      type: 'table',
      props: {
        columns: ['Name', 'Category'],
        rows: '$global.inventory',
      },
    },
  ],
};

const runtime: LiquidRendererRuntime = {
  resolveDataPointer: (pointer) => {
    if (pointer === '$input.searchQuery') {
      return 'keyboard';
    }

    if (pointer === '$global.inventory') {
      return [
        { Name: 'Keyboard', Category: 'Hardware' },
        { Name: 'Mouse', Category: 'Hardware' },
      ];
    }

    return undefined;
  },
  dispatch: (event) => {
    console.log('dispatch event', event);
  },
};

export function InventoryPage() {
  return <LiquidRenderer blueprint={blueprint} runtime={runtime} />;
}
```

In this example:

- `$input.searchQuery` is resolved from host state
- `$global.inventory` is resolved from host data
- the renderer does not fetch anything itself

## How Interactions Work

Interactive widgets emit events through the runtime.

Common event types:

- `action` for buttons
- `input` for text input changes
- `change` for selects and tabs
- `refresh` for manual reloads
- `navigation` for page changes
- `intent` for LLM-driven UI generation

Example button event handling:

```tsx
const runtime: LiquidRendererRuntime = {
  dispatch: (event) => {
    if (event.type === 'action' && event.payload && typeof event.payload === 'object') {
      const payload = event.payload as { actionId?: string };

      if (payload.actionId === 'open_report') {
        console.log('open report panel');
      }
    }
  },
};
```

## Simple Rule Of Thumb

Use the renderer for display.

Use your app for behavior.

That means:

- put UI structure in JSON
- put live data in your host store
- put actions in your controller or page shell

## Common Widget Examples

### Button

```json
{
  "id": "refresh-button",
  "type": "button",
  "props": {
    "label": "Refresh",
    "actionId": "refresh_dashboard"
  }
}
```

### Input

```json
{
  "id": "search-input",
  "type": "input",
  "props": {
    "label": "Search",
    "value": "$input.searchQuery",
    "placeholder": "Search items..."
  }
}
```

### Table

```json
{
  "id": "inventory-table",
  "type": "table",
  "props": {
    "columns": ["Name", "Stock"],
    "rows": [
      { "Name": "Keyboard", "Stock": 20 },
      { "Name": "Mouse", "Stock": 45 }
    ]
  }
}
```

## What To Build First

If you are starting a new project, begin with this order:

1. Make one blueprint with 2 to 3 widgets.
2. Render it in a TSX page.
3. Add a runtime for one data pointer.
4. Add one button dispatch.
5. Add Zustand state only after the basic loop works.

## Good Starting Project Shape

```text
src/
  app/
    DashboardPage.tsx
  blueprints/
    dashboard.json
  state/
    store.ts
  runtime/
    liquid-runtime.ts
```

## When To Use The Other Docs

Use these docs after the getting-started guide:

- `README.md` for package overview
- `AI_BLUEPRINT_GUIDE.md` for blueprint authoring rules
- `ACTION_DISPATCHER_DOCS.md` for event handling
- `REGISTRY_DOCS.md` for widget prop details
- `STYLING_OVERRIDES_DOCS.md` for theme and styling behavior
