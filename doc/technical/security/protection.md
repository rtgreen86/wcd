Сохранение и загрузка данных из ФС

1. Сохранение и загрузка текстового файла из ФС
2. Сохранение и загрузка шифрованного файла из ФС
3. Сохранение и загрузка файла из AppData
4. Сохранение и загрузка JSON файла


const file = new File('path/to/file.dat');

const content = await file.load();

await file.save(content);

