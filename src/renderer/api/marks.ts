export async function get(): Promise<string[]> {
  const content = await electronAPI.sendRequest({
    type: 'get:data',
    payload: 'marks'
  });
  return JSON.parse(content.content || '[]') as string[];
}

export async function put(marks: string[]): Promise<void> {
  await electronAPI.sendRequest({
    type: 'put:data',
    payload: {
      name: 'marks',
      content: JSON.stringify(marks),
    }
  });
}
