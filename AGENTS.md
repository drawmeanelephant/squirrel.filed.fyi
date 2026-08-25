# AGENTS.md — squirrel.filed.fyi

A personal link-log and blog built with [Boris](https://github.com/drawmeanelephant/boris),
a Zig static-site compiler with a validated page graph. Links come in
from friends and from the owner; agents triage, summarize, and file them
into buckets. If you are an agent working in this repo, this file is
your contract.

## Repository layout

```text
content/            site source (markdown + strict frontmatter)
  index.md          trunk page
  log/              the feed — every link enters here first, YYYY-MM-DD-slug.md
  dev/              development bucket
  tech/             technology shit bucket
  videos/           silly videos bucket
  mac/              the Mac shelf — long-lived Mac software writeups
  relics/           pepperidge farm remembers — dead-software grandpa moments
  reviews/          AI software reviews bucket
  includes/         shared fragments; NEVER compile as pages
lab/                theme (layouts + assets). Do not restructure.
boris-agent-kit/    boris binaries for Darwin-arm64. Do not modify.
boris.json          publication profile (content -> dist via lab theme)
dist/               build output, git-ignored
```

## Toolchain

Binaries live in `boris-agent-kit/bin/` (Darwin-arm64 only). `boris`
is the compiler; the rest are specialist tools (`boris-search-index`,
`boris-content-audit`, ...) you almost never need directly.

Verify the kit before first use on a new machine:

```sh
cd boris-agent-kit && shasum -a 256 -c SHA256SUMS
```

Core commands (run from repo root):

```sh
# full build: HTML + search index + sitemap into dist/
# (trunk layout rule keeps the homepage <title> free of the site suffix)
./boris-agent-kit/bin/boris build --input content --html-dir dist \
  --theme lab --sitemap --site-url https://squirrel.filed.fyi/ \
  --layout-rule default id:index lab/layouts/trunk.html

# RSS feed — separate mode, run after the HTML build.
# Items require `status: published` + `summary` + `published_at`.
./boris-agent-kit/bin/boris build --input content --rss --rss-path dist/rss.xml \
  --site-url https://squirrel.filed.fyi/ \
  --rss-title "squirrel.filed.fyi" \
  --rss-description "Links, Mac software, AI reviews, and relics — filed, not forgotten."

# zero-write preflight — run this before declaring any task done
./boris-agent-kit/bin/boris validate --input content --theme lab \
  --layout-rule default id:index lab/layouts/trunk.html

# read-only graph health report
./boris-agent-kit/bin/boris check --input content

# rebuild on save, serve on loopback :8090
./boris-agent-kit/bin/boris watch --input content --html-dir dist \
  --theme lab --serve

# offline corpus export so an agent can reason over the whole site
./boris-agent-kit/bin/boris build --input content --rag --complete
```

Exit codes: 0 ok, 1 content validation, 2 usage conflict, 3 I/O.
Note that `--rss`, `--llms`, and RAG/context exports are separate modes
and cannot be combined with HTML flags in one invocation.

## Content rules (hard)

Frontmatter accepts **exactly seven keys** — anything else fails the
build with `EFRONTMATTER`. This was verified empirically; do not invent
keys.

| key | required | values |
|---|---|---|
| `title` | yes | human title |
| `parent` | satellites | entity id of parent page, e.g. `log/index` |
| `tags` | recommended | YAML list |
| `status` | recommended | exactly `draft`, `published`, or `archived` |
| `summary` | recommended | one sentence, used by listings/search/RSS |
| `published_at` | feed pages | exactly `YYYY-MM-DDTHH:MM:SSZ`; required for RSS eligibility |
| `relations` | optional | e.g. `[relates_to=reviews/index]` |

More rules:

- Wiki links are `[[path/to/page]]`; external links are normal markdown.
- Draft pages render to HTML but are excluded from nav, search, sitemap,
  RSS, and publication. Draft is the default state for triaged links.
- Page images go in `<stem>.assets/` beside the owning page.
- One link cluster per file in `log/`. Filename:
  `YYYY-MM-DD-short-slug.md`.
- Never edit files under `dist/` — it is generated.
- Do not commit secrets or session stores; boris publication sessions
  never belong in this repo.

## Buckets and filing rules

Everything enters `content/log/` as a draft. Then:

- **videos** — pure entertainment, no summary beyond one line. File
  directly as a video page if there's nothing to say about it.
- **mac** — the Mac shelf: long-lived Mac software the owner has real
  history with. Company/app pages live here; dead software gets its own
  page if it earned one (see [[mac/omniweb]] for the tone).
- **relics** — pepperidge farm remembers: software that is dead AND no
  longer especially relevant to today's ecosystem, so nobody under a
  certain age has heard of it. Grandpa voice allowed here. If the thing
  still matters or still has a successor people argue about, it belongs
  on [[mac/index]] instead (see [[relics/virtual-pc]] vs
  [[mac/omniweb]] for the line).
- **dev** — tools/repos/techniques usable for building things.
- **tech** — technology shit: industry news, AI discourse, hardware,
  drama. Default bucket when unsure.
- **reviews** — gets promoted here only when the owner has actually
  used the thing long enough for a writeup; agents draft stubs, never
  final verdicts.
- **toss** — verdict `toss` entries stay in the log as published
  one-liners (so the same link doesn't get re-filed) unless the sender
  is owed politeness; then keep as draft and say nothing.

Promotion path: log entry gains `relations: [relates_to=<new page>]`,
new page in the bucket links back with `[[log/<entry>]]`.

## Agent workflows

### Intake (a link arrives)

1. Create `content/log/YYYY-MM-DD-slug.md` from the template in
   `content/log/index.md`, `status: draft`.
2. Fetch the URL. Summarize in plain words: what it is, who made it,
   why it was sent. No marketing voice, no filler.
3. Add a `Verdict:` line: `keep | promote-to-<bucket> | toss`.
4. Run `validate`, then stop. Publishing is the owner's call unless
   they asked for autonomous filing.

### Promotion (draft becomes a real page)

1. Write the bucket page (full template for reviews lives in
   `content/reviews/index.md`).
2. Flip the log entry to `published`, add the `relations:` cross-link.
3. Run `validate` then the full `build`. Confirm both exit 0.

### Review drafting (AI software)

Use the five-part structure in `content/reviews/index.md`. Ground every
claim in observed behavior from the owner's usage notes; if you have no
usage evidence, write the stub and leave `## Verdict` as `Pending`.
Never fabricate benchmark numbers or experience.

### Site-wide reasoning (before big edits)

Export the corpus and read it instead of guessing:

```sh
./boris-agent-kit/bin/boris build --input content --rag --complete
# working packs land in rag/ — read INDEX.md first
```

## Before you declare done

1. `boris validate ...` exits 0.
2. Full build command exits 0.
3. New pages appear in `dist/` with correct paths.
4. No edits to `boris-agent-kit/`, `SHA256SUMS`, or `MANIFEST.json`.
5. No commits unless explicitly asked.
