export function StylingPage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Styling and Layout (Low Effort)</h2>
        <p className="muted">
          Liquid ships with built-in spacing, surface, and layout defaults so you can build usable UI from JSON without writing
          manual CSS.
        </p>

        <h3>Default-First Model</h3>
        <ol>
          <li>Renderer layout defaults are applied first (columns, gaps, padding).</li>
          <li>Container defaults are applied next (surface, border, spacing, internal layout).</li>
          <li>Theme and color tokens are resolved.</li>
          <li>JSON style/className overrides apply last.</li>
        </ol>

        <h3>Layout Controls You Can Use Today</h3>
        <pre>{`blueprint.layout:
  columns?: number (default 1)
  rows?: number
  gap?: number (default 16)
  rowGap?: number (default gap)
  columnGap?: number (default gap)
  padding?: number | string (default 12)
  margin?: number | string (default 0)
  theme?: 'light' | 'dark'
  colorScheme?: { light?: tokens, dark?: tokens }
  className?: string
  style?: object`}</pre>

        <h3>Container Built-ins (No CSS Required)</h3>
        <pre>{`container.props:
  columns?: number
  rows?: number
  gap?: number (default 12)
  rowGap?: number (default gap)
  columnGap?: number (default gap)
  direction?: 'row' | 'column' (default 'column')
  wrap?: boolean (default false)
  align?: 'start' | 'center' | 'end' | 'stretch' (default 'stretch')
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' (default 'start')
  padding?: number | string (default 16)
  margin?: number | string (default 0)
  radius?: number (default 20)
  shadow?: 'none' | 'sm' | 'md' (default 'sm')
  borderless?: boolean (default false)
  className?: string
  style?: object`}</pre>

        <h3>Where To Override</h3>
        <ul>
          <li>Global grid: blueprint.layout</li>
          <li>Local grouping/layout: container.props</li>
          <li>Fine tuning: widget.props.style or widget.props.className</li>
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

        <h3>Minimal No-CSS Example</h3>
        <pre>{`{
  "version": "1.0.0",
  "theme": "light",
  "layout": {
    "columns": 2,
    "gap": 16,
    "padding": 16
  },
  "widgets": [
    {
      "id": "left",
      "type": "container",
      "props": {
        "gap": 12,
        "padding": 16,
        "radius": 18
      },
      "children": [
        { "id": "search", "type": "input", "props": { "label": "Search", "placeholder": "Type here" } },
        { "id": "region", "type": "select", "props": { "label": "Region", "options": [{"label":"US","value":"us"}] } }
      ]
    }
  ]
}`}</pre>

        <h3>Advanced Override Example</h3>
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
    "columns": 2,
    "rows": 2,
    "gap": 16,
    "rowGap": 20,
    "columnGap": 14,
    "padding": 20,
    "theme": "dark",
    "style": { "alignItems": "stretch" }
  },
  "widgets": [
    {
      "id": "root-container",
      "type": "container",
      "props": {
        "columns": 1,
        "gap": 14,
        "padding": 18,
        "radius": 16,
        "shadow": "md",
        "style": { "backgroundColor": "#0f172a" }
      }
    }
  ]
}`}</pre>
      </section>
    </div>
  );
}
