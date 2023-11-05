import {readFile, writeFile} from 'node:fs/promises';

export function saveFile(filename: string, content: string) {
  return writeFile(filename, content, 'utf8');
}

export function loadFile(filename: string) {
  return readFile(filename, 'utf8');
}
