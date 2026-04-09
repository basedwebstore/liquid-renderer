import type { ComponentDoc, ParsedProp } from '../types';

const IGNORED_PROPS = new Set([
  'theme',
  'colorScheme',
  'colorTokens',
  'className',
  'style',
  'children',
  'widgetId',
  'dispatch',
]);

const COMPONENT_FILES = import.meta.glob('../../../src/components/liquid/*.tsx', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const REGISTRY_SOURCE = import.meta.glob('../../../src/liquid.registry.tsx', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

function parseRegistryMap(): Record<string, string> {
  const source = Object.values(REGISTRY_SOURCE)[0] ?? '';
  const entries = source.match(/\b[a-z0-9_]+:\s*Liquid[A-Za-z0-9_]+/g) ?? [];
  const map: Record<string, string> = {};

  for (const entry of entries) {
    const [key, componentName] = entry.split(':').map((part) => part.trim());
    map[key] = componentName;
  }

  return map;
}

function parseProps(source: string): ParsedProp[] {
  const match = source.match(/export interface\s+\w+Props(?:\s+extends\s+[^\{]+)?\s*\{([\s\S]*?)\n\}/m);

  if (!match) {
    return [];
  }

  const body = match[1];
  const lines = body.split('\n').map((line) => line.trim()).filter(Boolean);
  const props: ParsedProp[] = [];

  for (const line of lines) {
    if (line.startsWith('[') || line.startsWith('//') || line.startsWith('*')) {
      continue;
    }

    const propMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\??:\s*([^;]+);$/);
    if (!propMatch) {
      continue;
    }

    const name = propMatch[1];
    if (IGNORED_PROPS.has(name)) {
      continue;
    }

    props.push({
      name,
      type: propMatch[2].trim(),
      required: !line.includes('?:'),
    });
  }

  return props;
}

function toFileComponentName(sourcePath: string): string {
  const file = sourcePath.split('/').pop() ?? '';
  return file.replace('.tsx', '');
}

export function getComponentDocs(): ComponentDoc[] {
  const registryMap = parseRegistryMap();
  const registryEntries = Object.entries(registryMap);

  return registryEntries
    .map(([key, componentName]) => {
      const sourceEntry = Object.entries(COMPONENT_FILES).find(([filePath]) =>
        filePath.endsWith(`${componentName}.tsx`),
      );

      if (!sourceEntry) {
        return null;
      }

      const [sourcePath, source] = sourceEntry;
      return {
        key,
        componentName,
        fileName: `${componentName}.tsx`,
        sourcePath,
        props: parseProps(source),
        source,
      } satisfies ComponentDoc;
    })
    .filter((doc): doc is ComponentDoc => doc !== null)
    .sort((a, b) => a.key.localeCompare(b.key));
}
