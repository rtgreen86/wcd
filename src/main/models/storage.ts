import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

export async function get(filename: string): Promise<string> {
  try {
    return await fs.readFile(buildPath(filename), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return 'null';
    throw error;
  }
}

export function put(filename: string, content: string) {
  return fs.writeFile(buildPath(filename), content, 'utf8')
}

function buildPath(filename: string): string {
  return path.join(
    app.getPath('userData'),
    safeFilename(filename),
  );
}

function safeFilename(filename: string) {
  const {base} = path.parse(filename);
  return base;
}
