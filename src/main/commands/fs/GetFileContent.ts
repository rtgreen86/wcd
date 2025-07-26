import { readFile } from 'node:fs/promises';
import { Command } from '@shared/types';

export default class GetFileContent implements Command<Promise<string>> {
  constructor(private params: {
    filename: string,
  }) {}

  async execute() {
    return await readFile(this.params.filename, 'utf8');
  }
}
