# zhaonanw.com

The personal website of **Zhaonan Wang** — a home for writing, photographs, projects, music, and collected observations.

[Visit the website](https://zhaonanw.com) · [Source code](https://github.com/Brianfr77/zhaonanw.com)

## Features

- Markdown and Obsidian wiki links for content and navigation.
- Writing, image galleries, project collections, and curated lists.
- Light and dark themes, responsive layouts, RSS, and sitemap generation.
- Explicit publication flags to keep drafts out of the generated website.
- Cloudflare Workers deployment with local development through Vinext.

## Get started

Install Bun 1.4.2 or newer, then run:

```sh
git clone https://github.com/Brianfr77/zhaonanw.com.git
cd zhaonanw.com
bun install
bun run content:prepare
bun run dev
```

Open `http://localhost:4444`. A fresh clone uses the small vault in `content-example`, so no Obsidian account or credentials are required.

## Content

Set the `VAULT_SOURCE` environment variable to your content directory, or place a vault named `zhaonanw.com` beside this repository. An explicitly configured directory takes priority, followed by that sibling vault, then the bundled example. The source vault is never modified by the build.

The home page is `page.md`. Supported sections are `Writing`, `Work`, `Images`, `Music`, `Lists`, and `About`. Markdown must have `published: true` and must not have `draft: true` to be included. Hidden folders and folders beginning with `__` are excluded. Supported images in `Assets` are included regardless of article publication flags; keep private images outside that directory. Each included file must be at most 5 MB.

After editing content, run `bun run content:prepare` before previewing. `bun run build` and `bun run build:web` prepare content automatically. Generated snapshots live in `apps/web/.obsidian-vaults` and are ignored by Git. Personal articles, photographs, Obsidian settings, and credentials are not included in this repository.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start development on port 4444 |
| `bun run check` | Formatting, types, dependency checks, tests, and project rules |
| `bun run build` | Prepare content and build the website |
| `bun run verify` | Run checks and build |
| `bun run deploy:web` | Deploy the current build to Cloudflare |

## Deployment and customization

Before deploying your own copy, update the identity and URLs in `apps/web/src/app/layout.tsx`, `apps/web/src/lib/seo/site.ts`, `apps/web/src/lib/vault/schema.tsx`, and `apps/web/public/mark.svg`. Configure your own Worker name and domain in `apps/web/wrangler.jsonc`. The optional image transformation endpoint accepts images from the origin in `apps/web/src/lib/image/thumbnail.ts`; update that origin for your deployment. Cloudflare image transformations require the corresponding service configuration.

Authenticate with Cloudflare using `bun --cwd apps/web wrangler login`, then run `bun run verify` followed by `bun run deploy:web`. Deploying requires your own Cloudflare account and domain configuration. Build output is not committed.

Remote Obsidian sync is optional; local publishing does not need it. If using it, copy `apps/web/.env.example` to a local environment file and supply your own credentials. Never commit environment files. Analytics are disabled unless a project token is configured.

## Structure

| Directory | Purpose |
| --- | --- |
| `apps/web` | React, Vinext, and Tailwind website |
| `packages/obsid` | Markdown vault parsing and rendering |
| `packages/scripts` | Content publication and maintenance scripts |
| `content-example` | Minimal content for running a fresh clone |

## License

Code is available under the [MIT License](LICENSE), including the retained copyright notices for incorporated code and the notice for Zhaonan Wang's modifications. The code license does not grant rights to personal content or third-party media displayed on the live website.
