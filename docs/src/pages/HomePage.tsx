export function HomePage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Liquid Renderer</h2>
        <p className="muted">
          Render dashboard-style React UI from JSON blueprints. The renderer draws widgets, resolves runtime pointers, and emits
          normalized events. Your host app owns state, APIs, routing, and LLM orchestration.
        </p>

        <h3>Install From npm</h3>
        <pre>{`npm install @basedweb.store/liquid-renderer`}</pre>
        <p className="muted">Peer dependencies: react 18 or 19, react-dom 18 or 19.</p>

        <h3>Build From Source</h3>
        <pre>{`git clone https://github.com/basedwebstore/liquid-renderer.git
cd liquid-renderer
npm ci
npm run docs:generate
npm run typecheck
npm run docs:dev`}</pre>

        <h3>Production Docs Build</h3>
        <pre>{`npm run docs:build`}</pre>

        <h3>Mental Model</h3>
        <ul>
          <li>JSON blueprint describes structure and props.</li>
          <li>Renderer resolves pointers and renders widgets.</li>
          <li>Interactive widgets dispatch typed events.</li>
          <li>Host controller decides side effects.</li>
        </ul>

        <h3>Quick Runtime Example</h3>
        <pre>{`import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from '@basedweb.store/liquid-renderer';

const blueprint: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: { columns: 2, gap: 16 },
  widgets: [
    {
      id: 'users',
      type: 'stat_card',
      props: { title: 'Active Users', value: '$global.activeUsers' },
    },
    {
      id: 'search',
      type: 'input',
      props: {
        label: 'Search',
        value: '$input.searchQuery',
        placeholder: 'Type to filter',
      },
    },
  ],
};

const runtime: LiquidRendererRuntime = {
  resolveDataPointer: (pointer) => {
    if (pointer === '$global.activeUsers') return 9421;
    if (pointer === '$input.searchQuery') return 'keyboard';
    return undefined;
  },
  dispatch: (event) => {
    console.log(event.type, event.widgetId, event.payload);
  },
};

export function DemoPage() {
  return <LiquidRenderer blueprint={blueprint} runtime={runtime} />;
}`}</pre>

        <h3>What To Build First</h3>
        <ol>
          <li>Create one blueprint with 2-3 widgets.</li>
          <li>Render it in a page using LiquidRenderer.</li>
          <li>Add one runtime pointer.</li>
          <li>Handle one dispatch action in your host layer.</li>
        </ol>
      </section>
    </div>
  );
}
