export function BlueprintGuidePage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Blueprint Guide</h2>
        <p className="muted">Use this contract to generate valid JSON blueprints for the renderer.</p>

        <h3>Allowed Widget Types</h3>
        <pre>{`alert, avatar_chip, badge, button, container, divider, empty_state, icon_label,
input, key_value_list, list, metric_grid, progress_card, section_header, select,
stat_card, stat_group, table, tabs, text_block, timeline, toolbar, trend_card`}</pre>

        <h3>Top-Level Blueprint Shape</h3>
        <ul>
          <li>Required: version, layout, widgets</li>
          <li>Optional: theme, colorScheme</li>
        </ul>

        <h3>Layout Contract</h3>
        <ul>
          <li>Required: columns (number), gap (number)</li>
          <li>Optional: theme, colorScheme, className, style</li>
        </ul>

        <h3>Widget Contract</h3>
        <ul>
          <li>Required for each widget: id, type, props</li>
          <li>Optional: children (recursive widget array)</li>
        </ul>

        <h3>Shared Runtime Conventions</h3>
        <ul>
          <li>Use $global.* for shared app data.</li>
          <li>Use $input.* for live input values.</li>
          <li>Use $page.* for page-scoped values.</li>
        </ul>

        <h3>Quick Prop Reference</h3>
        <pre>{`button: { label, actionId, variant?, disabled? }
input: { label, value?, placeholder?, inputType?, readOnly? }
select: { label, options, value?, disabled? }
tabs: { items, activeId? }
stat_card: { title, value, trend? }
metric_grid: { items, columns? }
table: { columns, rows }
timeline: { items }
text_block: { body, heading?, align? }
toolbar: { title?, actions? }`}</pre>

        <h3>Blueprint Example</h3>
        <pre>{`{
  "version": "1.0.0",
  "theme": "dark",
  "layout": {
    "columns": 1,
    "gap": 16
  },
  "widgets": [
    {
      "id": "root",
      "type": "container",
      "props": {
        "className": "grid grid-cols-1 gap-4"
      },
      "children": [
        {
          "id": "toolbar",
          "type": "toolbar",
          "props": {
            "title": "Ops Dashboard",
            "actions": [
              { "label": "Refresh" },
              { "label": "Export", "tone": "primary" }
            ]
          }
        },
        {
          "id": "mgrid",
          "type": "metric_grid",
          "props": {
            "columns": 3,
            "items": [
              { "label": "Revenue", "value": "$128k" },
              { "label": "Active Users", "value": 9421, "tone": "success" },
              { "label": "Errors", "value": 12, "tone": "warning" }
            ]
          }
        }
      ]
    }
  ]
}`}</pre>
      </section>
    </div>
  );
}
