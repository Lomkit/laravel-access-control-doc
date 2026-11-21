# Laravel Access Control documentation

Source of [laravel-access-control.lomkit.com](https://laravel-access-control.lomkit.com), the documentation of [Laravel Access Control](https://github.com/Lomkit/laravel-access-control).

Built with [Nuxt](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com) and [Nuxt Content](https://content.nuxt.com). The pages of the documentation live in `content/1.x`, served at the root. The landing page is `app/pages/index.vue`, built from the components of `app/components/landing`; `content/index.md` holds its title, description and summary.

## Setup

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run check:landing
```

## Static build

```bash
npm run generate
```

The site is generated into `.output/public` and deployed to GitHub Pages on every push to `main`.

## Pages and redirects

- Each section is a folder of `content/1.x` with a `.navigation.yml` (title and icon). The numbers in the names set the order and are not part of the URLs: `content/1.x/1.getting-started/2.installation.md` is served at `/getting-started/installation`. `llms.txt` lists the sections in the same order.
- `shared/utils/docs.ts` maps every URL of the 0.x site to its 1.x page in `legacyPages`. The build writes a redirect page for each old URL whose page no longer exists: a 1.x page that takes an old path replaces its redirect, and the map points the other old URLs to their new page.

## Versions and releases

- The site documents one version, 1.x. A second major would follow [laravel-rest-api-doc](https://github.com/Lomkit/laravel-rest-api-doc): a list of versions in `shared/utils`, one content collection and folder for each, the latest one at the root, and a version switcher.
- `shared/utils/package-info.ts` holds the facts about the package that `llms.txt` and the structured data of the pages use. Update `release` with each release, and the requirements with `composer.json`.

## Markdown, llms.txt and MCP

The static build publishes `llms.txt`, `llms-full.txt` and a Markdown copy of every page under `/raw/<path>.md`.

The deployed site is static and has no `/mcp` endpoint. To give an assistant the docs over MCP, use GitMCP (`https://lomkit.gitmcp.io/laravel-access-control-doc`) or Context7. `context7.json` sets what Context7 indexes.

## Landing data

The posts, lists, Edit buttons and search results of the landing, in `app/data/landing/eyes.ts`, come from a test run against the package release with Scout's database engine, and its control is the `PostControl` of the package README. `scripts/landing` keeps the output of that run and the README control, and `npm run check:landing` checks the data file against both. After a change of the package, rerun the test, replace both files and update the data file until the check passes.
