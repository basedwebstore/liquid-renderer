# @basedweb.store/liquid-renderer

[![npm version](https://img.shields.io/npm/v/@basedweb.store/liquid-renderer)](https://www.npmjs.com/package/@basedweb.store/liquid-renderer)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-live-0f172a)](https://basedwebstore.github.io/liquid-renderer/)

Schema-driven React renderer for dashboard-style interfaces.

It converts JSON blueprints into React UI through a widget registry, resolves runtime data pointers, and emits normalized interaction events to a host dispatcher.

## Install

```bash
npm install @basedweb.store/liquid-renderer
```

Peer dependencies:

- react 18 or 19
- react-dom 18 or 19

## Quick Start

```tsx
import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from '@basedweb.store/liquid-renderer';

const blueprint: LiquidBlueprint = {
	version: '1.0.0',
	theme: 'light',
	layout: {
		columns: 2,
		gap: 16,
	},
	widgets: [
		{
			id: 'users',
			type: 'stat_card',
			props: {
				title: 'Active Users',
				value: '$global.activeUsers',
			},
		},
		{
			id: 'search',
			type: 'input',
			props: {
				label: 'Search',
				value: '$input.query',
				placeholder: 'Type to filter',
			},
		},
	],
};

const runtime: LiquidRendererRuntime = {
	resolveDataPointer: (pointer) => {
		if (pointer === '$global.activeUsers') {
			return 9421;
		}

		if (pointer === '$input.query') {
			return '';
		}

		return undefined;
	},
	dispatch: (event) => {
		console.log(event.type, event.widgetId, event.payload);
	},
};

export function DemoPage() {
	return <LiquidRenderer blueprint={blueprint} runtime={runtime} />;
}
```

## Runtime Boundaries

The renderer is responsible for:

- widget rendering from blueprint schema
- runtime pointer resolution (`$global.*`, `$input.*`, `$page.*`)
- normalized dispatch events from interactive widgets

Your host app is responsible for:

- state storage and mutation
- API/network operations
- routing and navigation behavior
- LLM or intent generation flows

## Documentation

- Local docs app: `npm run docs:dev`
- Production docs build: `npm run docs:build`
- Live docs: https://basedwebstore.github.io/liquid-renderer/

## Public API

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

## Development

```bash
npm ci
npm run docs:generate
npm run typecheck
npm run build
npm run docs:build
```

Build output: `dist`.

Docs output: `docs-dist`.

## Publishing

Publishing is automated through GitHub Actions.

1. Bump the version in package.json.
2. Merge to main.
3. Trigger release workflow (GitHub Release or manual workflow run).

## License

MIT. See LICENSE.
