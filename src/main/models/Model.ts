export default class Model {
  data: string | null = null;
  fsKey: string | null = null;
  sessionTokens = new Set<string>();
}
