import { existsSync } from "node:fs";
import { mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { file as bunFile, write as bunWrite } from "bun";
import { isPublishedMarkdown } from "./publication.ts";

const root = resolve(import.meta.dir, "../../..");
const localVault = resolve(root, "../zhaonanw.com");
const source = process.env.VAULT_SOURCE
  ? resolve(root, process.env.VAULT_SOURCE)
  : existsSync(join(localVault, "page.md"))
    ? localVault
    : resolve(root, "content-example");
const target = resolve(root, "apps/web/.obsidian-vaults/zhaonanw.com");
const maximumFileBytes = 5 * 1024 * 1024;
const imagePattern = /\.(?:jpg|jpeg|png|webp|avif|svg)$/iu;
const files: Array<{
  path: string;
  content: Uint8Array;
}> = [];

const collect = async (folder = ""): Promise<void> => {
  for (const entry of await readdir(join(source, folder), {
    withFileTypes: true,
  })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("__") || entry.isSymbolicLink()) {
      continue;
    }
    const path = folder ? `${folder}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await collect(path);
      continue;
    }
    const file = bunFile(join(source, path));
    const isMarkdown = path.endsWith(".md") && isPublishedMarkdown(path, await file.text());
    const isAsset = path.startsWith("Assets/") && imagePattern.test(path);
    if (!(isMarkdown || isAsset)) {
      continue;
    }
    if (file.size > maximumFileBytes) {
      throw new Error(`Exceeds Sync Standard's 5 MB limit: ${path}`);
    }
    files.push({
      content: new Uint8Array(await file.arrayBuffer()),
      path,
    });
  }
};

await collect();
if (!files.some(({ path }) => path === "page.md")) {
  throw new Error("No published homepage. Keeping existing snapshot.");
}
// Only replace the generated copy, after validating all source files. Never change the live vault.
if (target !== join(root, "apps", "web", ".obsidian-vaults", "zhaonanw.com") || target === source) {
  throw new Error("Unexpected generated vault destination");
}
await rm(target, {
  force: true,
  recursive: true,
});
for (const { path, content } of files) {
  await mkdir(dirname(join(target, path)), {
    recursive: true,
  });
  await bunWrite(join(target, path), content);
}
// biome-ignore lint/suspicious/noConsole: Report the result of a user-invoked content build.
console.info(
  `Prepared ${files.length} public files from the website vault. No remote Sync client was started.`,
);
