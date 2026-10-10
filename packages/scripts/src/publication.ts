import { YAML } from "bun";

const frontmatterPattern = /^(?:\uFEFF)?---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u;
const sections = new Set([
  "Writing",
  "Work",
  "Images",
  "Music",
  "Lists",
  "About",
]);

const isPublicPath = (path: string): boolean => {
  const parts = path.replaceAll("\\", "/").split("/");
  if (parts.some((part) => part.startsWith(".") || part.startsWith("__"))) {
    return false;
  }
  return path === "page.md" || sections.has(parts[0] ?? "");
};

const isPublishedMarkdown = (path: string, source: string): boolean => {
  if (!isPublicPath(path)) {
    return false;
  }
  const match = frontmatterPattern.exec(source);
  if (!match) {
    return false;
  }
  const properties = YAML.parse(match[1] ?? "") as Record<string, unknown> | null;
  return properties?.published === true && properties.draft !== true;
};

export { isPublishedMarkdown };
