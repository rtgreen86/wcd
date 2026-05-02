export default class Model {
  fsKey: string | null = null;
  isSafeStorageSupported: boolean = false;
  isEncryptionSupported: boolean = false;
  sessionTokens = new Set<string>();
}
