export default class Model {
  encryptionSupported: boolean = false;
  encryptionKey: string | null = null;
  sessionTokens = new Set<string>();
}
