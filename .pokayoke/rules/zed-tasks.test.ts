import { expect, test } from "bun:test";
import { renderZedTasks } from "./zed-tasks.ts";

test("app-specific dev and preview tasks keep their server terminals open", () => {
  const tasks = JSON.parse(
    renderZedTasks({
      "build:web": "bun run --filter @zhaonanw/web build",
      "dev:web": "bun run --filter @zhaonanw/web dev",
      "start:web": "bun run --filter @zhaonanw/web start",
    }),
  ) as Readonly<Record<string, unknown>>[];

  expect(
    tasks.map((task) => [
      task.label,
      task.hide,
      task.use_new_terminal,
    ]),
  ).toEqual([
    [
      "bun: build:web",
      "on_success",
      false,
    ],
    [
      "bun: dev:web",
      "never",
      true,
    ],
    [
      "bun: start:web",
      "never",
      true,
    ],
  ]);
});
