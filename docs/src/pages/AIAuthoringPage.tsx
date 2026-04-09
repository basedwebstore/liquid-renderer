export function AIAuthoringPage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>AI Authoring Playbook</h2>
        <p className="muted">
          Use this page when prompting AI to generate blueprints, add components, or wire host-side behavior without breaking Liquid
          renderer boundaries.
        </p>

        <h3>Where Changes Belong</h3>
        <ul>
          <li>Component file: src/components/liquid/ComponentName.tsx</li>
          <li>Registry mapping: src/liquid.registry.tsx</li>
          <li>Shared types: src/liquid.types.ts (if contract changes)</li>
          <li>Docs updates: docs pages and README when behavior changes</li>
        </ul>

        <h3>Blueprint Prompt Template</h3>
        <pre>{`Create a valid Liquid JSON blueprint for a utility dashboard.

Requirements:
- version: "1.0.0"
- use widget types from the current registry only
- include id/type/props for every widget
- include actionId for every button
- use $global.*, $input.*, and $page.* only for runtime-resolved values
- keep static labels/text as literal JSON values
- include one container with recursive children
- output JSON only (no markdown fences)`}</pre>

        <h3>Component Prompt Template</h3>
        <pre>{`Create a new Liquid component named <ComponentName>.

Requirements:
- file: src/components/liquid/<ComponentName>.tsx
- strict TypeScript props
- support className?: string and style?: LiquidStyleMap
- support theme?: 'light' | 'dark'
- support colorScheme when color-aware
- if interactive, accept dispatch and widgetId; emit dispatch({ type, widgetId, payload })
- no business logic in component
- register key in src/liquid.registry.tsx
- include one valid blueprint widget example
- run typecheck and fix errors`}</pre>

        <h3>Controller Prompt Template</h3>
        <pre>{`Build host-side dispatch controller logic for Liquid runtime events.

Requirements:
- consume action | input | change | navigation | refresh | intent
- update local store immediately for input and change
- route navigation through host router
- call API/refetch for refresh events
- for intent events, send prompt + runtime state to generation endpoint
- keep renderer stateless (no fetch/store/LLM logic inside renderer)`}</pre>

        <h3>Expected AI Output Checklist</h3>
        <ul>
          <li>Code changes only in the intended files.</li>
          <li>No registry key drift or duplicate widget key aliases.</li>
          <li>Interactive components dispatch events instead of owning side effects.</li>
          <li>A concrete JSON widget example is included.</li>
          <li>Build or typecheck confirmation is provided.</li>
        </ul>

        <h3>Validation Checklist</h3>
        <ol>
          <li>Registry contains the new or updated key mapping.</li>
          <li>Props support className, style, and theme behavior as required.</li>
          <li>Dispatch payloads are typed and include widgetId when interactive.</li>
          <li>Blueprint examples use valid widget prop names.</li>
          <li>npm run typecheck succeeds.</li>
        </ol>
      </section>
    </div>
  );
}
