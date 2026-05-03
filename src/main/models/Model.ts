export default class Model {
  isEncryptionSupported: boolean = false;
  encryptionKey: string | null = null;
  sessionTokens = new Set<string>();
}
