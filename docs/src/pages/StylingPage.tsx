export function StylingPage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Styling and Overrides</h2>
        <p className="muted">
          Liquid components are default-styled out of the box. You can layer theme and palette controls globally, at layout
          level, or per widget.
        </p>

        <h3>Styling Model</h3>
        <ol>
          <li>Engine defaults are always applied.</li>
          <li>Theme and resolved palette values are applied next.</li>
          <li>JSON className/style overrides apply last.</li>
        </ol>

        <h3>Override Entry Points</h3>
        <ul>
          <li>Layout: blueprint.layout.className, blueprint.layout.style</li>
          <li>Widget: widget.props.className, widget.props.style</li>
        </ul>

        <h3>Theme Resolution</h3>
        <pre>{`Resolution order:
1) renderer prop themeMode
2) blueprint.theme
3) blueprint.layout.theme
4) 'light' fallback

widget.props.theme overrides inherited mode for that widget subtree.`}</pre>

        <h3>Color Scheme Tokens</h3>
        <pre>{`pageBackground
surface
surfaceAlt
text
mutedText
border
accent
accentText
success
warning
danger
shadow`}</pre>

        <h3>Color Scheme Resolution</h3>
        <pre>{`1) blueprint.colorScheme
2) blueprint.layout.colorScheme
3) widget.props.colorScheme
4) default theme palette`}</pre>

        <h3>Supported Types</h3>
        <ul>
          <li>theme: 'light' | 'dark'</li>
          <li>className: string</li>
          <li>style: object with string or number values</li>
          <li>colorScheme: {`{ light?: tokens, dark?: tokens }`}</li>
        </ul>

        <h3>Style Object Example</h3>
        <pre>{`{
  "borderColor": "#86efac",
  "padding": 24,
  "letterSpacing": "0.01em"
}`}</pre>

        <h3>Blueprint Example</h3>
        <pre>{`{
  "theme": "dark",
  "colorScheme": {
    "dark": {
      "pageBackground": "#020617",
      "surface": "#0f172a",
      "surfaceAlt": "#1e293b",
      "text": "#e2e8f0",
      "mutedText": "#94a3b8",
      "border": "#334155",
      "accent": "#22d3ee",
      "accentText": "#020617",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fda4af",
      "shadow": "rgba(2, 6, 23, 0.5)"
    }
  },
  "layout": {
    "columns": 1,
    "gap": 16,
    "theme": "dark",
    "style": { "alignItems": "stretch" }
  },
  "widgets": [
    {
      "id": "root-container",
      "type": "container",
      "props": {
        "className": "grid grid-cols-1 gap-4",
        "style": { "backgroundColor": "#0f172a" }
      }
    }
  ]
}`}</pre>
      </section>
    </div>
  );
}
