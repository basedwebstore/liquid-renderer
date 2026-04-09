import { useMemo, useState } from 'react';

import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from '@liquid-src/index';

import { createPropsFromSource } from '../lib/demo-props';
import { getComponentDocs } from '../lib/source-docs';

const INITIAL_BLUEPRINT: LiquidBlueprint = {
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
        trend: 12,
      },
    },
    {
      id: 'query',
      type: 'input',
      props: {
        label: 'Search',
        value: '$input.query',
        placeholder: 'Type and watch dispatch events',
      },
    },
  ],
};

function parseBlueprint(json: string): { value: LiquidBlueprint | null; error: string | null } {
  try {
    const parsed = JSON.parse(json) as LiquidBlueprint;

    if (!parsed || typeof parsed !== 'object') {
      return { value: null, error: 'Blueprint must be a JSON object.' };
    }

    if (!Array.isArray(parsed.widgets)) {
      return { value: null, error: 'Blueprint.widgets must be an array.' };
    }

    if (!parsed.layout || typeof parsed.layout !== 'object') {
      return { value: null, error: 'Blueprint.layout is required.' };
    }

    return { value: parsed, error: null };
  } catch (error) {
    return {
      value: null,
      error: error instanceof Error ? error.message : 'Invalid JSON.',
    };
  }
}

function readPointer(store: Record<string, unknown>, pointer: string): unknown {
  const path = pointer.split('.').slice(1);
  let value: unknown = store;

  for (const key of path) {
    if (!value || typeof value !== 'object') {
      return undefined;
    }

    value = (value as Record<string, unknown>)[key];
  }

  return value;
}

export function PlaygroundPage() {
  const [blueprintText, setBlueprintText] = useState(JSON.stringify(INITIAL_BLUEPRINT, null, 2));
  const [runtimeStore, setRuntimeStore] = useState<Record<string, Record<string, unknown>>>({
    global: {
      activeUsers: 9421,
      inventory: [
        { Name: 'Keyboard', Stock: 21 },
        { Name: 'Mouse', Stock: 45 },
      ],
    },
    input: {
      query: '',
    },
    page: {},
  });
  const [lastEvent, setLastEvent] = useState('No events yet.');

  const parseResult = useMemo(() => parseBlueprint(blueprintText), [blueprintText]);
  const componentDocs = useMemo(() => getComponentDocs(), []);

  const runtime: LiquidRendererRuntime = {
    resolveDataPointer: (pointer) => {
      if (pointer.startsWith('$global.')) {
        return readPointer(runtimeStore.global, pointer) as any;
      }

      if (pointer.startsWith('$input.')) {
        return readPointer(runtimeStore.input, pointer) as any;
      }

      if (pointer.startsWith('$page.')) {
        return readPointer(runtimeStore.page, pointer) as any;
      }

      return undefined;
    },
    dispatch: (event) => {
      setLastEvent(JSON.stringify(event, null, 2));

      const payload = event.payload && typeof event.payload === 'object' ? (event.payload as Record<string, unknown>) : null;
      const value = payload?.value;

      if ((event.type === 'input' || event.type === 'change') && event.widgetId && value != null) {
        setRuntimeStore((current) => ({
          ...current,
          input: {
            ...current.input,
            [event.widgetId!]: value,
            query: typeof value === 'string' ? value : current.input.query,
          },
        }));
      }
    },
  };

  function updateBlueprint(mutator: (draft: LiquidBlueprint) => void) {
    const parsed = parseBlueprint(blueprintText);
    if (!parsed.value) {
      return;
    }

    const draft: LiquidBlueprint = JSON.parse(JSON.stringify(parsed.value));
    mutator(draft);
    setBlueprintText(JSON.stringify(draft, null, 2));
  }

  function addWidget(widgetType: string) {
    const doc = componentDocs.find((item) => item.key === widgetType);
    if (!doc) {
      return;
    }

    updateBlueprint((draft) => {
      draft.widgets.push({
        id: `${widgetType}_${Date.now()}`,
        type: widgetType,
        props: createPropsFromSource(doc),
      });
    });
  }

  return (
    <div className="page-grid playground-grid">
      <section className="panel editor-panel">
        <h2>Playground</h2>
        <p className="muted">Paste JSON, edit visually, and see live UI output.</p>

        <label className="field">
          <span>Blueprint JSON</span>
          <textarea value={blueprintText} onChange={(event) => setBlueprintText(event.target.value)} rows={20} />
        </label>

        {parseResult.error ? <p className="error">{parseResult.error}</p> : null}
      </section>

      <section className="panel visual-panel">
        <h2>Visual Editor</h2>
        <div className="row">
          <button type="button" onClick={() => addWidget('stat_card')}>Add Stat Card</button>
          <button type="button" onClick={() => addWidget('table')}>Add Table</button>
          <button type="button" onClick={() => addWidget('button')}>Add Button</button>
          <button type="button" onClick={() => addWidget('input')}>Add Input</button>
        </div>

        {parseResult.value ? (
          <div className="field-group">
            <label className="field-inline">
              <span>Theme</span>
              <select
                value={parseResult.value.theme ?? 'light'}
                onChange={(event) =>
                  updateBlueprint((draft) => {
                    draft.theme = event.target.value as 'light' | 'dark';
                  })
                }
              >
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </label>
            <label className="field-inline">
              <span>Columns</span>
              <input
                type="number"
                min={1}
                max={4}
                value={parseResult.value.layout.columns}
                onChange={(event) =>
                  updateBlueprint((draft) => {
                    draft.layout.columns = Number(event.target.value || 1);
                  })
                }
              />
            </label>
            <label className="field-inline">
              <span>Gap</span>
              <input
                type="number"
                min={0}
                max={48}
                value={parseResult.value.layout.gap}
                onChange={(event) =>
                  updateBlueprint((draft) => {
                    draft.layout.gap = Number(event.target.value || 0);
                  })
                }
              />
            </label>
          </div>
        ) : null}

        <h3>Last Dispatch Event</h3>
        <pre>{lastEvent}</pre>
      </section>

      <section className="panel preview-panel">
        <h2>Live Preview</h2>
        {parseResult.value ? <LiquidRenderer blueprint={parseResult.value} runtime={runtime} /> : <p>Fix JSON errors to preview UI.</p>}
      </section>
    </div>
  );
}
