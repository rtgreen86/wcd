export async function getMarks(): Promise<string[]> {
  const content = await electronAPI.sendRequest({
    resource: 'get:data',
    payload: {
      filename: 'marks.json'
    }
  });

  return JSON.parse(content.content || '[]') as string[];
}

export async function putMarks(marks: string[]): Promise<void> {
  const content = JSON.stringify(marks);

  await electronAPI.sendRequest({
    resource: 'put:data',
    payload: {
      filename: 'marks.json',
      content,
    }
  });
}
