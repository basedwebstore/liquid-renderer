import { LiquidRenderer, type LiquidBlueprint, type LiquidRendererRuntime } from '@liquid-src/index';

const RUNTIME: LiquidRendererRuntime = {
  dispatch: (event) => {
    console.info('Layouting page event', event);
  },
};

const ONE_COLUMN_BLUEPRINT: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: { columns: 1, gap: 16 },
  widgets: [
    {
      id: 'header',
      type: 'section_header',
      props: { title: 'Single Column Layout', subtitle: 'Widgets stack top to bottom' },
    },
    {
      id: 'info',
      type: 'text_block',
      props: { body: 'Use columns: 1 for a simple stacked layout. Good for forms, detail views, and mobile-first designs.' },
    },
    {
      id: 'name-input',
      type: 'input',
      props: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
      },
    },
    {
      id: 'email-input',
      type: 'input',
      props: {
        label: 'Email Address',
        inputType: 'email',
        placeholder: 'you@example.com',
      },
    },
  ],
};

const TWO_COLUMN_BLUEPRINT: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: { columns: 2, gap: 16 },
  widgets: [
    {
      id: 'active-users',
      type: 'stat_card',
      props: { title: 'Active Users', value: '9,421', trend: 12 },
    },
    {
      id: 'revenue',
      type: 'stat_card',
      props: { title: 'Revenue', value: '$128k', trend: -3 },
    },
    {
      id: 'role-select',
      type: 'select',
      props: {
        label: 'Role',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ],
      },
    },
    {
      id: 'search-input',
      type: 'input',
      props: {
        label: 'Search',
        placeholder: 'Filter by name…',
      },
    },
  ],
};

const THREE_COLUMN_BLUEPRINT: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: { columns: 3, gap: 12 },
  widgets: [
    {
      id: 'orders',
      type: 'stat_card',
      props: { title: 'Orders', value: '3,204' },
    },
    {
      id: 'revenue-3col',
      type: 'stat_card',
      props: { title: 'Revenue', value: '$98k', trend: 8 },
    },
    {
      id: 'errors',
      type: 'stat_card',
      props: { title: 'Errors', value: '14', trend: -2 },
    },
    {
      id: 'period',
      type: 'select',
      props: {
        label: 'Period',
        options: [
          { label: 'Today', value: 'today' },
          { label: 'This Week', value: 'week' },
          { label: 'This Month', value: 'month' },
        ],
      },
    },
    {
      id: 'region',
      type: 'select',
      props: {
        label: 'Region',
        options: [
          { label: 'All Regions', value: 'all' },
          { label: 'North America', value: 'na' },
          { label: 'Europe', value: 'eu' },
        ],
      },
    },
    {
      id: 'keyword-input',
      type: 'input',
      props: {
        label: 'Keyword',
        placeholder: 'Filter results…',
      },
    },
  ],
};

const CONTAINER_BLUEPRINT: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'light',
  layout: { columns: 1, gap: 16 },
  widgets: [
    {
      id: 'toolbar-root',
      type: 'toolbar',
      props: {
        title: 'User Management',
        actions: [
          { label: 'Invite', actionId: 'invite', tone: 'primary' },
          { label: 'Export', actionId: 'export' },
        ],
      },
    },
    {
      id: 'metric-row',
      type: 'container',
      props: { className: 'grid grid-cols-3 gap-4' },
      children: [
        {
          id: 'total-users',
          type: 'stat_card',
          props: { title: 'Total Users', value: '1,240' },
        },
        {
          id: 'active-accounts',
          type: 'stat_card',
          props: { title: 'Active', value: '982', trend: 4 },
        },
        {
          id: 'pending',
          type: 'stat_card',
          props: { title: 'Pending', value: '17' },
        },
      ],
    },
    {
      id: 'user-table',
      type: 'table',
      props: {
        columns: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }],
        rows: [
          { name: 'Alice', role: 'Admin', status: 'Active' },
          { name: 'Bob', role: 'Editor', status: 'Pending' },
          { name: 'Carol', role: 'Viewer', status: 'Active' },
        ],
      },
    },
  ],
};

const DARK_BLUEPRINT: LiquidBlueprint = {
  version: '1.0.0',
  theme: 'dark',
  layout: { columns: 2, gap: 16 },
  widgets: [
    {
      id: 'title-dark',
      type: 'section_header',
      props: { title: 'Dark Theme Layout', subtitle: 'Set theme: "dark" at the blueprint level' },
    },
    {
      id: 'spacer',
      type: 'text_block',
      props: { body: 'Color tokens are resolved automatically for all child widgets.' },
    },
    {
      id: 'dark-input',
      type: 'input',
      props: {
        label: 'Username',
        placeholder: 'Enter username',
      },
    },
    {
      id: 'dark-select',
      type: 'select',
      props: {
        label: 'Access Level',
        options: [
          { label: 'Read Only', value: 'read' },
          { label: 'Read & Write', value: 'write' },
          { label: 'Full Access', value: 'full' },
        ],
      },
    },
  ],
};

const ONE_COLUMN_JSON = `{
  "version": "1.0.0",
  "theme": "light",
  "layout": {
    "columns": 1,
    "gap": 16
  },
  "widgets": [
    {
      "id": "name-input",
      "type": "input",
      "props": {
        "label": "Full Name",
        "placeholder": "Enter your full name"
      }
    },
    {
      "id": "email-input",
      "type": "input",
      "props": {
        "label": "Email Address",
        "inputType": "email",
        "placeholder": "you@example.com"
      }
    }
  ]
}`;

const TWO_COLUMN_JSON = `{
  "version": "1.0.0",
  "theme": "light",
  "layout": {
    "columns": 2,
    "gap": 16
  },
  "widgets": [
    {
      "id": "active-users",
      "type": "stat_card",
      "props": { "title": "Active Users", "value": "9,421", "trend": 12 }
    },
    {
      "id": "revenue",
      "type": "stat_card",
      "props": { "title": "Revenue", "value": "$128k", "trend": -3 }
    },
    {
      "id": "role-select",
      "type": "select",
      "props": {
        "label": "Role",
        "options": [
          { "label": "Admin", "value": "admin" },
          { "label": "Editor", "value": "editor" }
        ]
      }
    },
    {
      "id": "search-input",
      "type": "input",
      "props": {
        "label": "Search",
        "placeholder": "Filter by name…"
      }
    }
  ]
}`;

const THREE_COLUMN_JSON = `{
  "version": "1.0.0",
  "theme": "light",
  "layout": {
    "columns": 3,
    "gap": 12
  },
  "widgets": [
    {
      "id": "orders",
      "type": "stat_card",
      "props": { "title": "Orders", "value": "3,204" }
    },
    {
      "id": "revenue",
      "type": "stat_card",
      "props": { "title": "Revenue", "value": "$98k", "trend": 8 }
    },
    {
      "id": "errors",
      "type": "stat_card",
      "props": { "title": "Errors", "value": "14", "trend": -2 }
    },
    {
      "id": "period",
      "type": "select",
      "props": {
        "label": "Period",
        "options": [
          { "label": "Today", "value": "today" },
          { "label": "This Week", "value": "week" }
        ]
      }
    },
    {
      "id": "region",
      "type": "select",
      "props": {
        "label": "Region",
        "options": [
          { "label": "All Regions", "value": "all" },
          { "label": "North America", "value": "na" }
        ]
      }
    },
    {
      "id": "keyword",
      "type": "input",
      "props": {
        "label": "Keyword",
        "placeholder": "Filter results…"
      }
    }
  ]
}`;

const CONTAINER_JSON = `{
  "version": "1.0.0",
  "theme": "light",
  "layout": { "columns": 1, "gap": 16 },
  "widgets": [
    {
      "id": "toolbar-root",
      "type": "toolbar",
      "props": {
        "title": "User Management",
        "actions": [
          { "label": "Invite", "actionId": "invite", "tone": "primary" },
          { "label": "Export", "actionId": "export" }
        ]
      }
    },
    {
      "id": "metric-row",
      "type": "container",
      "props": { "className": "grid grid-cols-3 gap-4" },
      "children": [
        {
          "id": "total-users",
          "type": "stat_card",
          "props": { "title": "Total Users", "value": "1,240" }
        },
        {
          "id": "active-accounts",
          "type": "stat_card",
          "props": { "title": "Active", "value": "982", "trend": 4 }
        },
        {
          "id": "pending",
          "type": "stat_card",
          "props": { "title": "Pending", "value": "17" }
        }
      ]
    },
    {
      "id": "user-table",
      "type": "table",
      "props": {
        "columns": [
          { "key": "name", "label": "Name" },
          { "key": "role", "label": "Role" },
          { "key": "status", "label": "Status" }
        ],
        "rows": [
          { "name": "Alice", "role": "Admin", "status": "Active" },
          { "name": "Bob", "role": "Editor", "status": "Pending" }
        ]
      }
    }
  ]
}`;

const DARK_JSON = `{
  "version": "1.0.0",
  "theme": "dark",
  "layout": {
    "columns": 2,
    "gap": 16
  },
  "widgets": [
    {
      "id": "title-dark",
      "type": "section_header",
      "props": {
        "title": "Dark Theme Layout",
        "subtitle": "Set theme: \\"dark\\" at the blueprint level"
      }
    },
    {
      "id": "spacer",
      "type": "text_block",
      "props": {
        "body": "Color tokens are resolved automatically for all child widgets."
      }
    },
    {
      "id": "dark-input",
      "type": "input",
      "props": {
        "label": "Username",
        "placeholder": "Enter username"
      }
    },
    {
      "id": "dark-select",
      "type": "select",
      "props": {
        "label": "Access Level",
        "options": [
          { "label": "Read Only", "value": "read" },
          { "label": "Read & Write", "value": "write" },
          { "label": "Full Access", "value": "full" }
        ]
      }
    }
  ]
}`;

interface ExampleProps {
  title: string;
  description: string;
  blueprint: LiquidBlueprint;
  json: string;
  rules: string[];
}

function LayoutExample({ title, description, blueprint, json, rules }: ExampleProps) {
  return (
    <section className="panel main-panel">
      <h3>{title}</h3>
      <p className="muted">{description}</p>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Rules</h4>
      <ul>
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Live Preview</h4>
      <div className="preview-wrap">
        <LiquidRenderer blueprint={blueprint} runtime={RUNTIME} />
      </div>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>JSON Blueprint</h4>
      <pre>{json}</pre>
    </section>
  );
}

export function LayoutingPage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel main-panel">
        <h2>Layouting Guide</h2>
        <p className="muted">
          Learn how to structure JSON blueprints for clean, correct layouts. Each example below shows a live rendered
          preview alongside the exact JSON that produces it.
        </p>

        <h3>Layout Rules</h3>
        <ul>
          <li>
            <strong>columns</strong> — number of equal-width grid columns (1–4 recommended).
          </li>
          <li>
            <strong>gap</strong> — spacing in pixels between widgets.
          </li>
          <li>
            Every <code>input</code> and <code>select</code> widget must include a <strong>label</strong> property — it is
            required and must be on its own line in the JSON.
          </li>
          <li>
            Use a <code>container</code> widget with <code>children</code> to nest sub-layouts independently of the root
            grid.
          </li>
          <li>
            Set <code>theme</code> at the top-level blueprint to apply a global dark or light mode to all widgets.
          </li>
        </ul>

        <h3>Input &amp; Select Label Rule</h3>
        <p className="muted">
          Labels are <strong>required</strong> for <code>input</code> and <code>select</code> widgets. Always write the{' '}
          <code>label</code> property on its own line, before other props:
        </p>
        <pre>{`// ✅ Correct — label on its own line
{
  "id": "search",
  "type": "input",
  "props": {
    "label": "Search",
    "placeholder": "Type to filter…",
    "value": "$input.query"
  }
}

// ✅ Correct — select label on its own line
{
  "id": "role",
  "type": "select",
  "props": {
    "label": "Role",
    "options": [
      { "label": "Admin", "value": "admin" },
      { "label": "Viewer", "value": "viewer" }
    ]
  }
}

// ❌ Avoid — all props squashed on one line
{
  "id": "search",
  "type": "input",
  "props": { "label": "Search", "placeholder": "Type to filter…" }
}`}</pre>
      </section>

      <LayoutExample
        title="1 — Single Column"
        description="Widgets stack vertically. Use for forms, detail views, and mobile-first designs."
        blueprint={ONE_COLUMN_BLUEPRINT}
        json={ONE_COLUMN_JSON}
        rules={[
          'Set layout.columns to 1.',
          'Widgets render top to bottom in declaration order.',
          'Each input label appears above its field on a separate line.',
        ]}
      />

      <LayoutExample
        title="2 — Two Columns"
        description="Side-by-side pairs. Good for dashboards with stats and filters."
        blueprint={TWO_COLUMN_BLUEPRINT}
        json={TWO_COLUMN_JSON}
        rules={[
          'Set layout.columns to 2.',
          'Widgets fill left-to-right, wrapping to the next row automatically.',
          'Mix stat_card with input/select to pair metrics with controls.',
        ]}
      />

      <LayoutExample
        title="3 — Three Columns"
        description="Dense metric grids with filter controls underneath."
        blueprint={THREE_COLUMN_BLUEPRINT}
        json={THREE_COLUMN_JSON}
        rules={[
          'Set layout.columns to 3.',
          'Keep widget count a multiple of 3 for clean rows.',
          'Use select with a label on its own line for each filter column.',
        ]}
      />

      <LayoutExample
        title="4 — Container with Children (Nested Layout)"
        description="Use a container widget to create independent nested grids inside the root layout."
        blueprint={CONTAINER_BLUEPRINT}
        json={CONTAINER_JSON}
        rules={[
          'Set the container props.className to a CSS grid class for the inner layout.',
          'Children are rendered inside the container, not the root grid.',
          'Nest containers as deeply as needed for complex UIs.',
        ]}
      />

      <LayoutExample
        title="5 — Dark Theme"
        description="Apply dark mode globally with theme: 'dark' at the blueprint root."
        blueprint={DARK_BLUEPRINT}
        json={DARK_JSON}
        rules={[
          'Set blueprint.theme to "dark" to apply dark mode to all widgets.',
          'Override per-widget with widget.props.theme if needed.',
          'Input and select labels inherit the theme color tokens automatically.',
        ]}
      />
    </div>
  );
}
