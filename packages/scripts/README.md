# Website scripts

Run `bun run content:prepare` from the repository root to copy published content into the generated website vault. See the root README for source selection and publication rules.

`src/publication.ts` defines the publication filter; its tests cover draft and path exclusions. `src/test-sync.ts` is a development utility for optional remote Obsidian sync.
