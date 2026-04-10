import { LiquidRenderer, type LiquidBlueprint } from '@liquid-src/index';

type LayoutExample = {
  title: string;
  description: string;
  blueprint: LiquidBlueprint;
};

const EXAMPLES: LayoutExample[] = [
  {
    title: 'Start with a stable single column',
    description:
      'Begin with one-column structure, then stack related widgets. This keeps spacing predictable and avoids chaotic growth.',
    blueprint: {
      version: '1.0.0',
      theme: 'light',
      layout: {
        columns: 1,
        gap: 16,
      },
      widgets: [
        {
          id: 'overview',
          type: 'section_header',
          props: {
            title: 'Operations Overview',
            subtitle: 'Single-column baseline',
          },
        },
        {
          id: 'stack',
          type: 'container',
          props: {
            columns: 1,
            gap: 12,
            padding: 16,
            radius: 18,
          },
          children: [
            {
              id: 'users',
              type: 'stat_card',
              props: {
                title: 'Active Users',
                value: 9421,
                trend: 6,
              },
            },
            {
              id: 'errors',
              type: 'stat_card',
              props: {
                title: 'Error Rate',
                value: '0.8%',
                trend: -2,
              },
            },
            {
              id: 'revenue',
              type: 'stat_card',
              props: {
                title: 'MRR',
                value: '$128k',
                trend: 4,
              },
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Use columns for scan-heavy metrics',
    description:
      'Use multiple columns for compact KPI cards, then place larger widgets like tables below for readability.',
    blueprint: {
      version: '1.0.0',
      theme: 'light',
      layout: {
        columns: 3,
        gap: 16,
        rowGap: 20,
        padding: 16,
      },
      widgets: [
        {
          id: 'rev',
          type: 'stat_card',
          props: {
            title: 'Revenue',
            value: '$42,180',
            trend: 8,
          },
        },
        {
          id: 'conv',
          type: 'stat_card',
          props: {
            title: 'Conversion',
            value: '3.8%',
            trend: 1,
          },
        },
        {
          id: 'churn',
          type: 'stat_card',
          props: {
            title: 'Churn',
            value: '1.2%',
            trend: -1,
          },
        },
        {
          id: 'pipelines',
          type: 'table',
          props: {
            columns: ['Pipeline', 'Status', 'Owner'],
            rows: [
              { Pipeline: 'A', Status: 'Healthy', Owner: 'Ari' },
              { Pipeline: 'B', Status: 'Warning', Owner: 'Mina' },
              { Pipeline: 'C', Status: 'Healthy', Owner: 'Leo' },
            ],
          },
        },
      ],
    },
  },
  {
    title: 'Group related widgets with container hierarchy',
    description:
      'Use container children to define clear left-right regions so JSON remains maintainable as features grow.',
    blueprint: {
      version: '1.0.0',
      theme: 'light',
      layout: {
        columns: 2,
        gap: 16,
      },
      widgets: [
        {
          id: 'left-panel',
          type: 'container',
          props: {
            columns: 1,
            gap: 12,
            padding: 16,
            radius: 18,
          },
          children: [
            {
              id: 'filters-header',
              type: 'section_header',
              props: {
                title: 'Filters',
              },
            },
            {
              id: 'region',
              type: 'select',
              props: {
                label: 'Region',
                options: [
                  { label: 'US', value: 'us' },
                  { label: 'EU', value: 'eu' },
                ],
              },
            },
            {
              id: 'search',
              type: 'input',
              props: {
                label: 'Search',
                value: 'pipeline',
                placeholder: 'Type to filter',
              },
            },
          ],
        },
        {
          id: 'right-panel',
          type: 'container',
          props: {
            columns: 1,
            gap: 12,
            padding: 16,
            radius: 18,
          },
          children: [
            {
              id: 'events-header',
              type: 'section_header',
              props: {
                title: 'Recent Events',
              },
            },
            {
              id: 'events',
              type: 'timeline',
              props: {
                items: [
                  { title: 'Deploy started', time: '09:00' },
                  { title: 'Deploy passed', time: '09:11', tone: 'success' },
                ],
              },
            },
          ],
        },
      ],
    },
  },
];

export function LayoutingPage() {
  return (
    <div className="page-grid docs-page">
      <section className="panel">
        <h2>Layouting with JSON Blueprints</h2>
        <p className="muted">
          Use this guide to shape dashboard layout with predictable structure. Each example includes JSON and a rendered preview.
        </p>
        <ul>
          <li>Start simple with one-column structure first.</li>
          <li>Use layout.columns and layout.gap intentionally.</li>
          <li>Group related widgets inside container children.</li>
          <li>Place dense data widgets after summary cards.</li>
        </ul>
      </section>

      {EXAMPLES.map((example) => (
        <section className="panel" key={example.title}>
          <h3>{example.title}</h3>
          <p className="muted">{example.description}</p>
          <div className="layout-example-grid">
            <div>
              <h4>JSON</h4>
              <pre>{JSON.stringify(example.blueprint, null, 2)}</pre>
            </div>
            <div>
              <h4>Rendered</h4>
              <div className="preview-wrap">
                <LiquidRenderer blueprint={example.blueprint} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
