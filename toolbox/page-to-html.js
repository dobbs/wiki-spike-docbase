#!/usr/bin/env deno run --allow-read --allow-write

for await (const dir of Deno.readDir("./")) {
  if (dir.isDirectory && dir.name.startsWith('~')) {
    const author = dir.name
    for await (const subdir of Deno.readDir(`./${author}`)) {
      if (dir.isDirectory) {
        const site = subdir.name
        for await (const page of Deno.readDir(`./${author}/${site}`)) {
          if (page.isFile) {
            console.log(dir.name, subdir.name, page.name)

          }
        }
      }
    }
  }
}

async function pageToDoc(filepath) {
  const file = await Deno.open(filepath, { read: true });
  const fileInfo = await file.stat();
  if (fileInfo.isFile && fileInfo.name.toLowerCase().endsWith('.json')) {
    const buf = new Uint8Array(fileInfo.size); // TODO choose a max size limit
    const numberOfBytesRead = await file.read(buf);
    const text = new TextDecoder().decode(buf);
    const page = JSON.parse(text)
  }
  file.close();
  if (page.title) {
    return `<!DOCTYPE html>
<head>
  <title>${page.title}</title>
  <!-- TODO add author, links, and other metadata -->
  <script data-wiki-type="page">
${JSON.stringify(page, null, 2)}
  </script>
</head>
`
  } else {
    return ''
  }
}
