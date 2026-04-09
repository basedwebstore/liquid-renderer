export function DispatchGuidePage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Action Dispatcher Contract</h2>
        <p className="muted">
          Interactive widgets emit normalized events. Your host-side dispatcher maps those events to state updates, navigation,
          API calls, or intent generation.
        </p>

        <h3>Supported Event Types</h3>
        <ul>
          <li>action</li>
          <li>input</li>
          <li>change</li>
          <li>navigation</li>
          <li>refresh</li>
          <li>intent</li>
        </ul>

        <h3>Event Shape</h3>
        <pre>{`dispatch({
  type: 'change',
  widgetId: 'region-filter',
  payload: { value: 'eu-west', label: 'Region' },
});`}</pre>

        <h3>actionId Rules</h3>
        <pre>{`Pattern: ^[a-z][a-z0-9_]{2,63}$

Rules:
- lowercase only
- underscore separators
- starts with a letter
- 3 to 64 chars
- no spaces, hyphens, dots, symbols`}</pre>

        <h3>Allowlist Pattern</h3>
        <pre>{`const ALLOWED_ACTIONS = [
  'refresh_dashboard_metrics',
  'open_user_profile',
  'export_monthly_report',
] as const;`}</pre>
        <p className="muted">
          Unknown actions should be safe no-ops with diagnostics; do not throw uncaught runtime errors.
        </p>

        <h3>AI Authoring Rules</h3>
        <ul>
          <li>Every button must include a non-empty actionId.</li>
          <li>Use approved action keys only.</li>
          <li>Reuse keys for the same semantic action across blueprints.</li>
        </ul>

        <h3>Host Handling Guidance</h3>
        <ul>
          <li>input and change: update local app state immediately.</li>
          <li>refresh: trigger fetch/recompute.</li>
          <li>navigation: route through host router/shell.</li>
          <li>intent: send current state plus prompt to generation endpoint.</li>
        </ul>

        <h3>Button Example</h3>
        <pre>{`{
  "id": "refresh-button",
  "type": "button",
  "props": {
    "label": "Refresh Metrics",
    "variant": "primary",
    "actionId": "refresh_dashboard_metrics",
    "disabled": false
  }
}`}</pre>
      </section>
    </div>
  );
}
