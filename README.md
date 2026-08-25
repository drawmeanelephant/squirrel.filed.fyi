# squirrel.filed.fyi

Personal link-log and blog: buckets for links, Mac software, AI software
reviews, and dead-software grandpa moments. Built with
[Boris](https://github.com/drawmeanelephant/boris), a Zig static-site
compiler with a validated page graph, deployed to Cloudflare Pages.

## Layout

- `content/` — site source (markdown + strict frontmatter)
- `lab/` — site theme (layouts + assets)
- `boris-agent-kit/` — Boris binaries for Darwin-arm64 (local dev only;
  CI builds Boris from source at the pinned commit)
- `AGENTS.md` — the contract for agents working in this repo. Read it
  before touching content.

## Local build

```sh
./boris-agent-kit/bin/boris build --input content --html-dir dist \
  --theme lab --sitemap --site-url https://squirrel.filed.fyi/ \
  --layout-rule default id:index lab/layouts/trunk.html
```

Or watch + serve on loopback:

```sh
./boris-agent-kit/bin/boris watch --input content --html-dir dist \
  --theme lab --serve
```

## Deployment

Pushes to `main` build the site in GitHub Actions (Boris compiled from
source at the pinned commit) and deploy `dist/` to Cloudflare Pages via
Wrangler.

Required repository secrets (set via `gh secret set`, never committed):

- `CLOUDFLARE_API_TOKEN` — token with Cloudflare Pages: Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account id

Optional repository variable:

- `CF_PAGES_PROJECT` — Pages project name (defaults to `squirrel-filed-fyi`)
