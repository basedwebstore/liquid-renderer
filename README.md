# liquid-renderer

A schema-driven React renderer for building dashboard-like UIs from a JSON blueprint.

The library turns structured widget data into composable React output using a registry-based rendering system. It also supports a host-provided runtime for resolving data pointers and dispatching interactions back to the app layer.

Start here if you are new: [GET_STARTED_GUIDE.md](GET_STARTED_GUIDE.md)

## Features

- Blueprint-driven rendering via LiquidRenderer
- Host runtime support for resolved data pointers and dispatch events
- Built-in widget registry for container, button, and stat card primitives	
- Theme and color token support (light and dark)
- TypeScript-first API with exported blueprint and widget types
- Safe fallback UI for unknown or invalid widget entries

## Installation

```bash
npm install liquid-renderer
```

Peer dependencies:

- react 18 or 19
- react-dom 18 or 19

## Quick Start

```tsx
import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from 'liquid-renderer';

const blueprint: LiquidBlueprint = {
	theme: 'light',
	layout: {
		columns: 2,
		gap: 16,
	},
	widgets: [
		{
			id: 'card-1',
			type: 'stat_card',
			props: {
				title: 'Revenue',
				value: '$42,180',
			},
		},
		{
			id: 'button-1',
			type: 'button',
			props: {
				label: 'View Report',
			},
		},
	],
};

const runtime: LiquidRendererRuntime = {
	resolveDataPointer: (pointer) => {
		if (pointer === '$global.revenue') {
			return '$42,180';
		}

		return undefined;
	},
	dispatch: (event) => {
		console.log(event.type, event.payload, event.widgetId);
	},
};

export function Demo() {
	return <LiquidRenderer blueprint={blueprint} runtime={runtime} />;
}
```

## Public API

Exports from this package:

- LiquidRenderer
- ComponentRegistry
- LiquidBlueprint
- LiquidWidget
- LiquidWidgetProps
- LiquidThemeMode
- LiquidColorScheme
- LiquidColorTokens
- LiquidLayout
- LiquidPrimitive
- LiquidStyleMap
- LiquidRendererRuntime
- LiquidDispatch
- LiquidDispatchEvent
- LiquidDataPointer
- LiquidDispatchType

## Extending the Registry

The renderer resolves components from ComponentRegistry by widget type.

When a host runtime is provided, the renderer also resolves data pointers inside widget props before rendering:

- `$global.*` for global context data
- `$input.*` for live input state
- `$page.*` for page-scoped runtime data

Interactive widgets emit normalized dispatch events through the injected runtime. The host app decides whether to update state, fetch data, navigate, or trigger intent generation.

Built-in mappings currently include:

- stat_card
- button
- container

You can extend or wrap registry usage in your application layer to support additional widget types and custom props.

## Development

```bash
npm ci
npm run typecheck
npm run build
npm run check:pack
```

Build output is emitted to dist.

## Publishing

Publishing is automated via GitHub Actions workflow npm-publish.

Before publishing:

1. Bump version in package.json.
2. Merge to main.
3. Trigger publish by either:
	 - creating a GitHub Release, or
	 - manually running npm-publish from Actions.

## Contributing

Contributions are welcome.

Please open an issue or pull request with:

- problem statement
- proposed approach
- tests or validation notes

## License

MIT. See LICENSE.
