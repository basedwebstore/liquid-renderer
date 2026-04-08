import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { minify } from 'terser';

const DIST_DIR = path.resolve('dist');

async function collectJsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectJsFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const distStat = await stat(DIST_DIR).catch(() => null);
  if (!distStat || !distStat.isDirectory()) {
    throw new Error('dist directory not found. Run TypeScript build before obfuscation.');
  }

  const jsFiles = await collectJsFiles(DIST_DIR);

  for (const filePath of jsFiles) {
    const source = await readFile(filePath, 'utf8');
    const result = await minify(source, {
      module: true,
      compress: true,
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    });

    if (!result.code) {
      throw new Error(`Failed to obfuscate ${filePath}`);
    }

    await writeFile(filePath, result.code, 'utf8');
  }

  console.log(`Obfuscated ${jsFiles.length} files in dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
