---
title: gomark vs goldmark vs blackfriday — a Go markdown parser comparison
parent: dev/index
tags: [dev, go, markdown, parsers, comparison, notes, wiki-links]
status: published
summary: Three Go markdown parsers compared for note-taking and wiki-link use cases — gomark's first-class tags and embeds vs goldmark's extension model vs blackfriday's legacy.
relations: [relates_to=dev/usememos-memos, relates_to=dev/gomark]
---

# gomark vs goldmark vs blackfriday

Filed alongside [[dev/usememos-memos]].

## The question

When you're building a note-taking app, a wiki, or anything where the
markdown *is* the data model, the parser choice stops being cosmetic.
You need three things that most parsers handle badly:

1. **Wiki-style links** — `[[page-name]]` and `![[embed]]` syntax that
   resolves to other documents in your system, not external URLs.
2. **Tags as first-class entities** — `#hashtag` that the search index,
   the timeline, and the API all agree on, not regex post-processing.
3. **Roundtrip fidelity** — parse → modify programmatically → render
   back to markdown without degradation, so agent edits stay clean.

This compares the three Go parsers you'd realistically choose between
for that job: **gomark** (usememos's custom parser), **goldmark** (the
de facto standard, Hugo's default), and **blackfriday** (the legacy
choice, now maintenance-mode).

## The three parsers

### gomark — [usememos/gomark](https://github.com/usememos/gomark)

Built for [memos](https://github.com/usememos/memos). See
[[dev/gomark]] for the full standalone writeup. Token-based,
single-pass, modular architecture:

```
gomark/
├── ast/           # AST node definitions
├── config/        # extension toggles, limits
├── parser/
│   ├── internal/  # per-node-type parser implementations
│   └── tokenizer/ # single-pass tokenizer
└── renderer/
    ├── html/      # HTML output
    ├── markdown/  # roundtrip back to markdown
    └── string/    # plain-text extraction
```

Extensions enabled by default, all toggleable: tables, strikethrough,
autolinks, task lists, math (`$...$` / `$$...$$`), highlighting
(`==text==`), subscript/superscript (`~sub~` / `^super^`), spoilers
(`||text||`), **tags** (`#hashtag`), **referenced content**
(`[[wiki-link]]`), **embedded content** (`![[embed]]`), and HTML
elements (`<kbd>`, `<br>`, `<img>`, `<small>`, `<mark>`).

Config: `WithMaxDepth`, `WithMaxFileSize`, `WithStrictMode`,
`WithSafeMode`, per-extension toggles via `WithExtension("tables", false)`.

### goldmark — [yuin/goldmark](https://github.com/yuin/goldmark)

The standard. CommonMark 0.31.2 compliant, AST-based, pure Go, depends
only on stdlib. Hugo's default parser since 2019. Performance on par
with cmark (the C reference implementation). Fuzz-tested.

Built-in extensions: `extension.GFM` (tables, strikethrough, linkify,
task lists as a bundle), `extension.DefinitionList`,
`extension.Footnote`, `extension.Typographer`, `extension.CJK`. A
broader ecosystem of third-party extensions exists
([goldmark-emoji], [goldmark-meta] for frontmatter, [goldmark-wiki]
for wiki-style links, etc.).

Extension model: you can add your own AST nodes, block-level parsers,
inline-level parsers, paragraph transformers, AST transformers, and
renderers — all via functional options. This is the key differentiator:
goldmark was designed to be extended from outside the package.

[goldmark-emoji]: https://github.com/yuin/goldmark-emoji
[goldmark-meta]: https://github.com/yuin/goldmark-meta
[goldmark-wiki]: https://github.com/alvaroloes/goldmark-wiki

### blackfriday — [russross/blackfriday](https://github.com/russross/blackfriday)

The legacy. A translation from C of Sundown. v2 is the maintained
version, with a separate `Parse` call that produces an AST. BSD-licensed,
stdlib-only, thread-safe (no global state).

Extensions: tables, fenced code blocks, autolinks, strikethrough,
definition lists, footnotes, smart quotes/fractions, hard line breaks.
Alternative renderers exist (LaTeX, Confluence, Slack, Chroma via
bfchroma).

**The critical caveat from goldmark's own README:** blackfriday.v2 is
"not CommonMark-compliant and cannot be extended from outside of the
package, since its AST uses structs instead of interfaces." Its list
behavior differs from other implementations — deep nested lists and
list blocks with second lines break in ways that matter if you ever
migrate content from GitHub. Several bug fixes are trailing behind and
need forward-porting to v2 (issue #348).

## The comparison, by the criteria that matter for notes

### Wiki-links (`[[page]]` and `![[embed]]`)

| Parser | Built-in? | How |
|---|---|---|
| gomark | **Yes, first-class** | `references` and `embedded` extensions are default-on AST node types |
| goldmark | No, but extensible | Third-party [goldmark-wiki] adds `[[link]]` syntax; you write a custom inline parser if you need embeds |
| blackfriday | **No, and hard** | "No direct support for changing the parser — you'd need to fork it" (from the maintainer on Reddit, 2019) |

This is the sharpest split. gomark treats `[[wiki-link]]` and
`![[embed]]` as load-bearing syntax with dedicated AST nodes — search,
resolution, and rendering all share one parse tree. goldmark can get
there with a third-party extension or a custom inline parser, which is
more code but keeps you on a CommonMark-compliant core. blackfriday
can't get there without forking, because its AST uses structs, not
interfaces, so you can't inject new node types from outside.

For a note app where wiki-links are the *point* — Obsidian-style
graphing, backlinks, embedded transclusions — gomark is the only one
that ships this as a default, first-class concept.

### Tags (`#hashtag`)

| Parser | Built-in? | AST node? |
|---|---|---|
| gomark | **Yes** | `tags` extension, dedicated AST node |
| goldmark | No | Add a custom inline parser (straightforward but DIY) |
| blackfriday | No | Fork required |

Same pattern. If tags are a first-class concept in your app — they
drive search, filtering, the timeline — having them as AST nodes means
`doc.Walk()` visits them like any other node, no regex scraping over
rendered HTML. gomark gives you this for free. goldmark gives you the
hooks to build it cleanly. blackfriday makes you fork.

### Roundtrip fidelity (parse → modify → restore)

| Parser | Supports roundtrip? | Renderer |
|---|---|---|
| gomark | **Yes, by design** | `renderer/markdown/` — `gomark.Restore(doc)` |
| goldmark | Partial | No built-in markdown renderer; community options exist but roundtrip isn't a stated goal |
| blackfriday | No | HTML output only; `Parse` gives an AST but no markdown-back renderer |

This matters most for agent/AI use cases. If a coding agent reads a
note, modifies it, and writes it back, you want parse → modify →
restore to be lossless. gomark was designed for this — the markdown
renderer is a first-class sibling to the HTML renderer, and
`gomark.Restore(doc)` is in the public API. goldmark can render to
HTML and plain text, but markdown-back is a community gap. blackfriday
has no path to it at all.

This is why memos owning the parser pays off: an agent (or the
`server/runner/` memo payload rebuilder) can parse a note, swap a node,
and write it back as clean markdown, not degraded HTML-ified text.

### CommonMark compliance

| Parser | Compliance |
|---|---|
| goldmark | **CommonMark 0.31.2** (full, fuzz-tested) |
| gomark | CommonMark "with useful extensions" — not strict, edge cases exist |
| blackfriday | Not CommonMark-compliant; list behavior diverges from GitHub |

If you need your markdown to round-trip cleanly against the broader
ecosystem — GitHub, CommonMark validators, other tools — goldmark is
the only fully compliant choice. gomark is close but admits it's
"CommonMark with extensions," so there are edge cases where it and
goldmark disagree on list nesting or emphasis boundaries. blackfriday
is the worst here: migrating content *from* GitHub to a
blackfriday-based wiki breaks lists.

### Performance

| Parser | Claim |
|---|---|
| goldmark | On par with cmark (the C reference implementation) |
| gomark | "Single-pass tokenization, minimal allocations" — designed for speed, no published benchmarks against cmark |
| blackfriday | "Fast enough to render on-demand in most web apps"; v2 is ~15% slower than v1 |

All three are fast enough for note-app volumes. gomark's single-pass
design and buffer reuse are real advantages at scale, but goldmark's
cmark-parity means you're not sacrificing speed for compliance.
blackfriday is fast but pays a 15% v2 tax and hasn't been tuned
recently. Performance is not the deciding factor here.

### Extensibility model

| Parser | Add custom syntax? |
|---|---|
| goldmark | **Yes, by design** — custom AST nodes, block/inline parsers, transformers, renderers, all via functional options |
| gomark | Partial — modular `parser/internal/` with per-node-type implementations, but the extension points are less documented than goldmark's |
| blackfriday | **No** — struct-based AST, "cannot be extended from outside of the package" (goldmark's README) |

goldmark was built to be extended. If you need a `@mention` syntax, a
custom directive, or a domain-specific inline element, goldmark's
`parser.WithInlineParsers` with a `PrioritizedSlice` is the cleanest
extension surface of the three. gomark is modular but its extension
points are project-internal — you can read the code and add a parser in
`parser/internal/`, but the public API is more about toggling existing
extensions than adding new ones. blackfriday is a dead end for
extension without a fork.

### Maintenance and ecosystem

| Parser | Maintained by | Ecosystem |
|---|---|---|
| goldmark | yuin, active, CommonMark 0.31.2 | Hugo's default; third-party extensions (emoji, meta, wiki, mermaid); Rust port (rushdown) |
| gomark | usememos project, tied to memos release cycle | Small but focused; one consumer (memos) |
| blackfriday | russross, v2 is "maintained" but bug fixes trailing (issue #348) | Historical; many projects migrated to goldmark |

goldmark has the largest ecosystem and the most active maintenance.
gomark's fate is tied to memos — if memos thrives, gomark thrives; if
memos stalls, gomark stalls. blackfriday is the past: Hugo moved away
from it, and the maintainer has flagged forward-porting lag.

## Where each one wins

**gomark wins** when the markdown *is* the app. If you're building a
note-taking tool, a wiki, or a knowledge base where tags, wiki-links,
and embeds are first-class concepts that search/filters/APIs need to
agree on, and where agent roundtrip edits must stay clean — gomark is
the only one that ships all of this as default AST nodes with a
lossless markdown renderer. You trade CommonMark strictness and a
broader ecosystem for note-taking semantics baked into the parse tree.

**goldmark wins** when you need compliance and extensibility. If
you're building a general-purpose markdown tool, a static site
generator, or anything where the content must interoperate with the
broader CommonMark ecosystem, goldmark is the right choice. You can add
wiki-links and tags via custom inline parsers — it's more code, but you
keep full CommonMark compliance and the largest extension ecosystem.
For most projects, this is the default for a reason.

**blackfriday wins** when you have an existing v1/v2 codebase that
depends on it and migration cost is high. For new projects, there's no
reason to choose it. It's not CommonMark-compliant, it can't be
extended without a fork, list behavior diverges from GitHub, and bug
fixes are trailing. The maintainer is honest about all of this. Pick
goldmark instead.

## The verdict for note-taking specifically

If I were building a note app today and didn't want to write a parser,
I'd use goldmark and add a custom inline parser for `[[wiki-links]]`
and `#tags`. That's a few hundred lines, you keep CommonMark
compliance, and you get the ecosystem. The roundtrip gap is real but
manageable for most apps — you cache the original markdown and only
re-render when an agent modifies it, accepting some lossiness.

If I were building a note app where the markdown *is* the data model —
where tags drive search, wiki-links drive a graph, embeds drive
transclusion, and agents edit notes programmatically — I'd look hard at
gomark, or at least at its architecture. The bet is that first-class
AST nodes for note-taking semantics plus a lossless roundtrip renderer
are worth more than CommonMark compliance and a bigger extension
ecosystem. memos made that bet, and 62.7k stars suggest it's
defensible.

What I wouldn't do is pick blackfriday for anything new. It's a
fine parser with an honest maintainer, but the struct-based AST that
blocks extension and the CommonMark-divergent list behavior are
disqualifying for a notes use case where content portability matters.
