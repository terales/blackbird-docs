import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "path";

const SOURCE_DIR = "./src/content/docs";
const TARGET_DIR = "./bin";

for (const file of await readdir(TARGET_DIR)) {
  await unlink(path.join(TARGET_DIR, file));
}

let files = await readdir(SOURCE_DIR, { recursive: true });
files = files.filter((x) => x.endsWith(".md") || x.endsWith(".mdx"));

files.forEach(async (f) => {
  let name = f.replace(/^.*[\\/]/, "");
  let content = await readFile(SOURCE_DIR + "/" + f, "utf-8");

  if (name.endsWith(".mdx")) {
    name = name.slice(0, -1);
  }

  writeFile(TARGET_DIR + "/" + name, content);
});
