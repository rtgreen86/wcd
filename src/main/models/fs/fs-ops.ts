import fs from 'node:fs/promises';

export function save(filename: string, content: string) {
  return fs.writeFile(filename, content, 'utf8');
}

export function load(filename: string) {
  return fs.readFile(filename, 'utf8');
}
