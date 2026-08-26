import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pdf } from 'pdf-to-img';

const books = [
  { input: 'assets/PDF/SunniPorichoy.pdf', output: 'assets/pdf-pages/sunni' },
  { input: 'assets/PDF/MuriderKoroniyo.pdf', output: 'assets/pdf-pages/murider' },
];

for (const book of books) {
  await mkdir(book.output, { recursive: true });
  await using document = await pdf(book.input, { scale: 1.5 });

  let pageNumber = 1;
  for await (const image of document) {
    await writeFile(join(book.output, `page-${pageNumber}.png`), image);
    pageNumber += 1;
  }

  console.log(`${book.input}: ${pageNumber - 1} pages rendered`);
}
