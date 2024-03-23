export async function getMarks(): Promise<string[]> {
  const content = await electronAPI.sendRequest({
    type: 'get:data',
    payload: 'marks.json'
  });
  return JSON.parse(content.content || '[]') as string[];
}

export async function putMarks(marks: string[]): Promise<void> {
  const content = JSON.stringify(marks);
  await electronAPI.sendRequest({
    type: 'put:data',
    payload: {
      name: 'marks.json',
      content,
    }
  });
}
