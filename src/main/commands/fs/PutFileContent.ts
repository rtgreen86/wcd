import { writeFile, readFile } from 'node:fs/promises';
import { Command } from '@shared/types';

export default class PutFileContent implements Command<Promise<void>> {
  constructor(private params: {
    filename: string,
    content: string,
  }) {}

  async execute() {
    await writeFile(this.params.filename, this.params.content, 'utf8');
  }
}
