import Secret from './Secret';
import KeyGenerator from './KeyGenerator';

export async function initializeKey() {
  const existsKey = await Secret.get('key');
  if (!existsKey) {
    const newKey = KeyGenerator.generate();
    Secret.put('key', newKey);
  }
}
