import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const COMPONENT_DIR = path.join(ROOT, 'src', 'components', 'liquid');
const REGISTRY_PATH = path.join(ROOT, 'src', 'liquid.registry.tsx');
const OUT_PATH = path.join(ROOT, 'docs', 'component-docs.generated.json');

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

function parseProps(source) {
  const match = source.match(/export interface\s+\w+Props(?:\s+extends\s+[^\{]+)?\s*\{([\s\S]*?)\n\}/m);

  if (!match) {
    return [];
  }

  const lines = match[1].split('\n').map((line) => line.trim()).filter(Boolean);

  return lines
    .map((line) => {
      const propMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\??:\s*([^;]+);$/);
      if (!propMatch) {
        return null;
      }

      const name = propMatch[1];
      if (IGNORED_PROPS.has(name)) {
        return null;
      }

      return {
        name,
        type: propMatch[2].trim(),
        required: !line.includes('?:'),
      };
    })
    .filter(Boolean);
}

async function parseRegistryMap() {
  const source = await fs.readFile(REGISTRY_PATH, 'utf8');
  const entries = source.match(/\b[a-z0-9_]+:\s*Liquid[A-Za-z0-9_]+/g) ?? [];

  const map = {};
  for (const entry of entries) {
    const [key, componentName] = entry.split(':').map((part) => part.trim());
    map[key] = componentName;
  }

  return map;
}

async function run() {
  const registryMap = await parseRegistryMap();
  const files = await fs.readdir(COMPONENT_DIR);

  const componentFiles = files.filter((file) => file.endsWith('.tsx'));
  const byName = new Map();

  for (const file of componentFiles) {
    const source = await fs.readFile(path.join(COMPONENT_DIR, file), 'utf8');
    byName.set(file.replace('.tsx', ''), {
      fileName: file,
      source,
      props: parseProps(source),
    });
  }

  const docs = Object.entries(registryMap)
    .map(([key, componentName]) => {
      const file = byName.get(componentName);
      if (!file) {
        return null;
      }

      return {
        key,
        componentName,
        fileName: file.fileName,
        props: file.props,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.key.localeCompare(b.key));

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, `${JSON.stringify(docs, null, 2)}\n`, 'utf8');

  console.log(`Generated ${docs.length} component docs at ${path.relative(ROOT, OUT_PATH)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
