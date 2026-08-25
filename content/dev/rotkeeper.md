---
title: Rotkeeper
parent: dev/index
tags: [dev, bash, static-site, preservation]
status: published
summary: Explain page for my Bash-native static publishing toolchain — what it is, what its dependencies actually are, and where it bites.
relations: [relates_to=log/2026-08-25-rotkeeper]
---

# Rotkeeper

[Rotkeeper](https://github.com/drawmeanelephant/rotkeeper) is a static-site
toolchain written in [Bash](https://www.gnu.org/software/bash/) — no Node,
no npm, no framework, no build graph. You write
[Markdown](https://commonmark.org/), it renders HTML through a pinned Zig
binary, verifies the output against a manifest, and packages releases as
plain zip files. That's it. 510 commits, MIT license, tagline: *"What
lives in `/bones/` may yet render again."*

## Why it exists

The pitch on the tin: survive "the heat death of the modern JavaScript
ecosystem." A typical static site generator in 2026 is a
[Node.js](https://nodejs.org/) app pulling 900 transitive dependencies
maintained by whoever still answers GitHub issues, and when one of them
goes [hostile or vanishes](https://en.wikipedia.org/wiki/Left-pad), your
blog stops building. Rotkeeper's bet is that the boring parts of Unix —
the shell, awk, tar, zip — have been frozen for decades *because* nobody
could monetize them, and that's exactly what makes them immortal. If you
find tech companies as a whole exhausting, this is the toolchain-shaped
version of that feeling.

The honest caveat: it's not dependency-free, it's dependency-*honest*.
Everything below is a real program with a real lineage. The difference is
none of these projects can rug you.

## The model: bones, home, output

Rotkeeper splits every site into three directories:

- **`bones/`** — the system itself: scripts (`rc-*.sh`), templates,
  config, logs. Named like a crypt because the whole repo leans into
  preservation-as-death imagery.
- **`home/`** — your Markdown and assets. The only stuff you touch.
- **`output/`** — rendered artifacts. Generated, pruned, never edited by
  hand; `render` writes an ownership marker so stale pages get reaped.

Three layout presets (`crypt`, `busy`, `sterile`) shuffle where content
and output live for people who hate other people's directory names.
Default everything and it just works.

## The renderer: Oliver

Rendering isn't done in Bash (nobody sane parses Markdown with regex in
awk). It shells out to
[Oliver](https://github.com/drawmeanelephant/oliver), a freestanding
renderer written in [Zig](https://ziglang.org/) that implements the
[CommonMark](https://spec.commonmark.org/0.31.2/) spec at 652/652 on its
conformance corpus, plus
[Textile](https://textile-lang.com/) and
[Cooklang](https://cooklang.org/) frontends. It reads stdin, writes an
HTML fragment to stdout, warnings to stderr. One file per invocation,
byte-deterministic, no daemon.

Two details worth stealing even if you never use rotkeeper:

1. **Oliver is pinned to an exact source commit**, verified via
   `--version` before install, with published SHA-256 checksums. Not
   "latest", not a version range. Upgrades are deliberate acts recorded
   in the contract doc.
2. The same engine family renders this very site — boris (see
   [[reviews/boris]]) speaks Oliver serialization profiles. One renderer,
   two consumers, zero JavaScript shipped to do either.

## What the dependencies actually are

Since this is the part nobody explains: here's each requirement, what it
actually is, and which project it comes from.

| Requirement | What it actually is |
|---|---|
| **Bash 4+** | The [GNU Project](https://www.gnu.org/software/bash/) shell. Your Mac ships 3.2 from 2007 because Apple won't touch [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) — install a current one via Homebrew or stay on Linux. |
| **yq v4+** | A YAML processor written in Go by Mike Farah ([mikefarah/yq](https://github.com/mikefarah/yq)). Trap for the unwary: there is a completely different [kislyuk/yq](https://github.com/kislyuk/yq) that's a Python wrapper around jq. Same name, different tool, different syntax. Rotkeeper wants the Go one. |
| **gawk** | The GNU implementation of [awk](https://www.gnu.org/software/gawk/) — the pattern-scanning language from Aho, Weinberger, and Kernighan, 1977. macOS's default awk is BSD's "one true awk," which lacks features rotkeeper relies on. |
| **sha256sum** | From [GNU coreutils](https://www.gnu.org/software/coreutils/). macOS substitutes `shasum`, a Perl script, which rotkeeper detects and accepts. |
| **jq** | The JSON processor — a single C program originally by Stephen Dolan, now maintained at [jqlang/jq](https://jqlang.github.io/jq/). Used for manifest and metadata plumbing. |
| **rsync** | Andrew Tridgell's delta-transfer tool ([rsync.samba.org](https://rsync.samba.org/)) — the reason partial file sync over slow links became possible in 1996. Fun wrinkle: recent macOS ships [openrsync](https://man.openbsd.org/openrsync), a clean-room BSD rewrite, instead. |
| **zip / zipinfo / tar** | Zip tooling from [Info-ZIP](https://infozip.sourceforge.net/); tar on macOS is the [libarchive](https://www.libarchive.org/) BSD implementation. Both older than most programming languages currently trending on Hacker News. |

Plus [ShellCheck](https://www.shellcheck.net/) in CI to keep 500+ commits
of Bash from doing the thing Bash does.

## Where it bites

No big whoop, but honesty has teeth too:

- **38 open issues** and counting. It's alive, which means it's unfinished.
- Frontmatter is seven scalar fields only — lists and maps are silently
  ignored, and the block must start on line 1. YAML nerds will grieve.
- Task lists and footnotes aren't CommonMark, so they render as literal
  text. Raw HTML is the escape hatch.
- XHTML output mode fails closed on any raw HTML rather than quietly
  producing invalid markup. Correct, and occasionally infuriating.
- The docs are generated by the tool's own `dip` command, and the README
  warns they're "reference material, not ground truth" — the scripts are
  authoritative. Refreshing, slightly haunted.

## Verdict

I built it, so weigh that however you like: it runs my publishing
pipeline, its contracts survived 510 commits of agent-assisted
development, and the worst thing anyone can say about its architecture is
that it takes ritual seriously. For a personal site that should outlive
every company currently selling you a rendering pipeline, boring is the
feature.
