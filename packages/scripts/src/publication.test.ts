import { describe, expect, test } from "bun:test";
import { isPublishedMarkdown } from "./publication.ts";

describe("publication boundary", () => {
  test("requires explicit boolean publication and rejects drafts", () => {
    expect(isPublishedMarkdown("Writing/Hello.md", "---\npublished: true\n---\nHello")).toBe(true);
    expect(isPublishedMarkdown("Writing/Hello.md", '---\npublished: "true"\n---\nHello')).toBe(
      false,
    );
    expect(
      isPublishedMarkdown("Writing/Hello.md", "---\npublished: true\ndraft: true\n---\nHello"),
    ).toBe(false);
    expect(isPublishedMarkdown("Writing/Hello.md", "No frontmatter")).toBe(false);
  });
  test("never publishes private folders or unrelated root notes", () => {
    const content = "---\npublished: true\n---\nPrivate";
    for (const path of [
      "Sync test.md",
      ".obsidian/settings.md",
      "Writing/__drafts/Idea.md",
      "__templates/Post.md",
      "Personal/Diary.md",
    ]) {
      expect(isPublishedMarkdown(path, content)).toBe(false);
    }
  });
});
