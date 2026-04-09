import type { LiquidBlueprint, LiquidWidgetProps } from '@liquid-src/index';

import type { ComponentDoc, ParsedProp } from '../types';

function firstLiteral(type: string): string | null {
  const match = type.match(/'([^']+)'/);
  return match ? match[1] : null;
}

function sampleForProp(prop: ParsedProp, componentKey: string): unknown {
  if (prop.name === 'actionId') {
    return `${componentKey}_action`;
  }

  if (prop.name === 'label') {
    return 'Sample Label';
  }

  if (prop.name === 'title') {
    return 'Sample Title';
  }

  if (prop.name === 'body') {
    return 'Sample body text generated from source props.';
  }

  if (prop.name === 'value') {
    if (prop.type.includes('number')) {
      return 42;
    }

    return 'Sample Value';
  }

  if (prop.name === 'options') {
    return [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ];
  }

  if (prop.name === 'items') {
    if (componentKey === 'tabs') {
      return [
        { id: 'tab_overview', label: 'Overview' },
        { id: 'tab_activity', label: 'Activity' },
      ];
    }

    if (componentKey === 'list') {
      return [
        { title: 'List Item A', subtitle: 'Subtitle A', meta: 'Meta' },
        { title: 'List Item B', subtitle: 'Subtitle B', meta: 'Meta' },
      ];
    }

    if (componentKey === 'metric_grid') {
      return [
        { label: 'Users', value: 9421, tone: 'success' },
        { label: 'Errors', value: 12, tone: 'warning' },
      ];
    }

    if (componentKey === 'timeline') {
      return [
        { title: 'Created', time: '09:00' },
        { title: 'Updated', time: '09:15', tone: 'success' },
      ];
    }

    return [
      { label: 'Item A', value: 'Value A' },
      { label: 'Item B', value: 'Value B' },
    ];
  }

  if (prop.name === 'entries') {
    return [
      { key: 'CPU', value: '42%' },
      { key: 'RAM', value: '68%' },
    ];
  }

  if (prop.name === 'stats') {
    return [
      { label: 'Users', value: 9421 },
      { label: 'Revenue', value: '$128k' },
    ];
  }

  if (prop.name === 'columns') {
    return ['Name', 'Status'];
  }

  if (prop.name === 'rows') {
    return [
      { Name: 'Pipeline A', Status: 'Healthy' },
      { Name: 'Pipeline B', Status: 'Warning' },
    ];
  }

  if (prop.type.includes('boolean')) {
    return false;
  }

  if (prop.type.includes('number')) {
    return 1;
  }

  if (prop.type.includes('string')) {
    const literal = firstLiteral(prop.type);
    return literal ?? `Sample ${prop.name}`;
  }

  if (prop.type.includes('[]') || prop.type.includes('Array<')) {
    return [];
  }

  if (prop.type.includes('Record<') || prop.type.includes('{')) {
    return {};
  }

  return null;
}

export function createPropsFromSource(doc: ComponentDoc): LiquidWidgetProps {
  const props: Record<string, unknown> = {};

  for (const prop of doc.props) {
    if (!prop.required && prop.name !== 'value' && prop.name !== 'items' && prop.name !== 'options') {
      continue;
    }

    props[prop.name] = sampleForProp(prop, doc.key);
  }

  if (doc.key === 'button' && typeof props.actionId !== 'string') {
    props.actionId = 'sample_action';
  }

  return props as LiquidWidgetProps;
}

export function createPreviewBlueprint(doc: ComponentDoc): LiquidBlueprint {
  return {
    version: '1.0.0',
    theme: 'light',
    layout: {
      columns: 1,
      gap: 16,
    },
    widgets: [
      {
        id: `${doc.key}_preview`,
        type: doc.key,
        props: createPropsFromSource(doc),
      },
    ],
  };
}
