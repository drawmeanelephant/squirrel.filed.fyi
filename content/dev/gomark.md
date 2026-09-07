---
title: gomark
parent: dev/index
tags: [dev, go, markdown, parser, library, notes, ast]
status: published
summary: usememos's custom Go markdown parser — token-based, AST-first, with first-class tags, wiki-links, embeds, and a lossless roundtrip renderer that makes agent edits stay clean.
relations: [relates_to=dev/usememos-memos, relates_to=dev/go-markdown-parsers]
---

# gomark

Filed alongside [[dev/usememos-memos]] and [[dev/go-markdown-parsers]].

## What it is

[gomark](https://github.com/usememos/gomark) is a markdown parser for
Go, built by the [memos](https://github.com/usememos/memos) project and
used as that app's note engine. It is not a CommonMark implementation.
It is a purpose-built, token-based parser whose reason for existing is
that note-taking apps need markdown semantics that off-the-shelf parsers
handle badly: tags, wiki-links, and embeds as first-class AST nodes, plus
a lossless roundtrip renderer so programmatic edits don't degrade the
source.

The README calls it "fast, extensible, and well-structured, optimized
for simplicity and performance." The source backs most of that up, with
some caveats worth naming.

## The architecture

Two-stage parsing, same as the README claims:

```
gomark/
├── gomark.go           # Public API: Parse(), Restore(), Engine
├── ast/                # Node types: Document, Paragraph, Heading, Tag, ...
├── config/             # ParserConfig (MaxDepth, MaxFileSize only)
├── parser/
│   ├── parser.go       # ParseBlock, ParseInline, parser registry
│   ├── registry.go     # ParserRegistry, RegisterBlockParser/InlineParser
│   ├── errors.go       # ParseResult, ParseError, warnings
│   ├── tokenizer/      # Single-pass character tokenizer
│   ├── internal/       # One file per parser: heading.go, tag.go, ...
│   └── tests/          # Per-parser test suites
└── renderer/
    ├── html/           # HTMLRenderer
    ├── markdown/       # MarkdownRenderer (roundtrip)
    └── string/         # StringRenderer (plain-text extraction)
```

**Tokenization.** `tokenizer.Tokenize(markdown)` does a single pass
over the raw text, producing a `[]*Token` slice where each token is a
markdown-significant character or sequence. The tokenizer recognizes
single characters (`*`, `_`, `#`, `` ` ``, `[`, etc.) as token types.
Multi-character tokenization is intentionally disabled for simplicity.

**Block parsing.** Tokens go to `ParseBlock`, which runs a hardcoded
list of block parsers in order. Each parser implements:

```go
type BlockParser interface {
    Match(tokens []*tokenizer.Token) (ast.Node, int)
}
```

It returns the parsed AST node and the number of tokens consumed. The
parser tries each block parser in priority order; the first match wins.
Unmatched tokens fall through to a safety valve that consumes them as
plain text in a fallback paragraph, preventing infinite loops.

**Inline parsing.** Block content gets a second pass via `ParseInline`,
which runs a separate hardcoded list of inline parsers. Adjacent text
nodes are merged. List item nodes get assembled into `List` containers
with indent tracking via a stack.

## The AST — the real point

This is why gomark exists. The AST has dedicated node types for
note-taking semantics that other parsers handle via regex post-
processing:

**Block nodes:**

| Node | Syntax | Why it matters |
|---|---|---|
| `Document` | (root) | Container with `Children []Node` |
| `Paragraph` | text | Standard |
| `Heading` | `# H1`–`###### H6` | Standard |
| `CodeBlock` | `` ``` `` or indented | Standard |
| `Blockquote` | `>` | Standard |
| `List` / `OrderedListItem` / `UnorderedListItem` | `-` / `1.` | Stack-based nesting by indent |
| `TaskListItem` | `- [x]` / `- [ ]` | GFM task lists |
| `Table` | pipe tables | GFM tables |
| `HorizontalRule` | `---` | Standard |
| `MathBlock` | `$$...$$` | Block math |
| **`EmbeddedContent`** | **`![[embed]]`** | Transclusion — first-class |
| `LineBreak` | | Structural |

**Inline nodes:**

| Node | Syntax | Why it matters |
|---|---|---|
| `Text` | plain | Standard, merges adjacent |
| `Bold` / `Italic` / `BoldItalic` | `**` / `*` / `***` | Standard |
| `Code` | `` `code` `` | Standard |
| `Link` / `AutoLink` | `[t](u)` / bare URL | Standard + GFM autolinks |
| `Image` | `![alt](src)` | Standard |
| `Strikethrough` | `~~text~~` | GFM |
| `Highlight` | `==text==` | Non-standard |
| `Subscript` / `Superscript` | `~text~` / `^text^` | Non-standard |
| `Spoiler` | `\|\|text\|\|` | Non-standard |
| `Math` | `$inline$` | Inline math |
| **`Tag`** | **`#hashtag`** | First-class — drives search/filters |
| **`ReferencedContent`** | **`[[wiki-link]]`** | First-class — drives backlinks |
| `EscapingCharacter` | `\char` | Standard |
| `HTMLElement` | `<kbd>`, `<br>`, `<img>`, `<small>`, `<mark>` | Inline HTML pass-through |

The `Node` interface is minimal:

```go
type Node interface {
    Type() NodeType
    Restore() string
}
```

Direct field access (`node.Children`) instead of getter methods. No
parent/sibling tracking — by design, for performance and simplicity.

## The roundtrip renderer — the other reason it exists

`gomark.Restore(doc)` renders the AST back to markdown. Every node
implements `Restore() string`, so the document can be serialized back to
its source format losslessly. The markdown renderer
(`renderer/markdown/`) is a first-class sibling to the HTML renderer,
not an afterthought.

This is what makes agent/AI edits clean. A coding agent reads a note,
parses it, swaps a `Tag` node, calls `Restore()`, and writes it back.
The markdown stays markdown, not degraded HTML-ified text. goldmark and
blackfriday both lack a built-in markdown-back renderer — gomark has it
in the public API.

The `Engine` type ties it together:

```go
type Engine struct {
    config   *config.ParserConfig
    registry *parser.ParserRegistry
}

func (e *Engine) Parse(markdown string) (*ast.Document, error)
func (e *Engine) Restore(doc *ast.Document) string
```

Plus the package-level shortcuts `gomark.Parse(markdown)` and
`gomark.Restore(doc)` using a singleton `defaultEngine`.

## The extension surface — honest version

The README claims `WithExtension("tables", false)`, `WithStrictMode`,
and `WithSafeMode`. **The actual `config.go` does not have these.**
The real `ParserConfig` is:

```go
type ParserConfig struct {
    MaxDepth    int   // default 200
    MaxFileSize int64 // default 50 MB
}
```

With only `WithMaxDepth` and `WithMaxFileSize` builders. That's it.

Extension toggling is not a config-level feature in the current source.
The default parsers are hardcoded slices in `parser.go`:

```go
var defaultInlineParsers = []InlineParser{
    internal.NewEscapingCharacterParser(),
    internal.NewLineBreakParser(),
    internal.NewHTMLElementParser(),
    internal.NewBoldItalicParser(),
    internal.NewImageParser(),
    internal.NewLinkParser(),
    internal.NewAutoLinkParser(),
    internal.NewBoldParser(),
    internal.NewItalicParser(),
    internal.NewSpoilerParser(),
    internal.NewHighlightParser(),
    internal.NewCodeParser(),
    internal.NewSubscriptParser(),
    internal.NewSuperscriptParser(),
    internal.NewMathParser(),
    internal.NewReferencedContentParser(),
    internal.NewTagParser(),
    internal.NewStrikethroughParser(),
    internal.NewTextParser(), // must be last — catch-all
}
```

To disable an extension, you build a custom `ParserRegistry` and call
`RegisterBlockParser` / `RegisterInlineParser` with your own subset.
The registry is the real extension surface, not config toggles:

```go
registry := parser.NewParserRegistry()
registry.RegisterInlineParser("custom", func() InlineParser {
    return &CustomInlineParser{}
})
doc, err := parser.ParseWithRegistry(tokens, registry)
```

So: gomark is extensible via the registry, but the README oversells the
config-level ergonomics. If you need to toggle extensions, expect to
write registry setup code, not one-liners.

## Where it shines

**First-class note semantics.** `Tag`, `ReferencedContent`, and
`EmbeddedContent` are dedicated AST node types with their own parsers.
When you walk the tree, you visit them like any other node — no regex
scraping over rendered HTML. This is why memos's search, timeline, and
API all agree on what a memo contains: they share one parse tree.

**Lossless roundtrip.** `Restore()` on every node, a built-in markdown
renderer, and `gomark.Restore(doc)` in the public API. Agent edits stay
clean. This is the feature goldmark and blackfriday don't have.

**Minimal AST design.** Direct field access, no parent tracking, simple
`Node` interface. Easy to walk, easy to modify, easy to write custom
renderers for. The `renderer/string/` plain-text renderer and
`renderer/html/` renderer both use the same tree.

**Honest error handling.** `ParseResult` tracks errors and warnings.
Unmatched content becomes a warning plus a fallback paragraph, not a
panic. Depth limits prevent stack overflow on pathological input.

## Where it breaks

**Not CommonMark-compliant.** The README says "CommonMark with useful
extensions." That means edge cases — list nesting, emphasis boundaries,
HTML block detection — can diverge from what GitHub, cmark, or goldmark
produce. If you need spec compliance for content interoperability, this
isn't it. See [[dev/go-markdown-parsers]] for the divergence details.

**README oversells config.** The docs describe `WithExtension`,
`WithStrictMode`, and `WithSafeMode` that don't exist in the current
`config.go`. If you read the README and write code against those APIs,
it won't compile. The real extension surface is the parser registry,
which is less documented.

**Tied to memos.** There's a `NewMemosEngine()` function in the public
API — the library is explicitly coupled to its parent project. Its
release cycle, maintenance priority, and feature roadmap are memos's.
If memos stalls, gomark stalls. No independent community around it.

**No parent pointers.** The AST doesn't track parent/sibling
relationships. That's a performance win for parsing and rendering, but
it makes some tree manipulations harder — you can't walk *up* from a
node to its container without building your own parent map.

**Single-character tokenization.** Multi-character tokenization is
disabled "for simplicity." This is probably fine for note-taking
volumes, but it means the tokenizer does more work on long runs of
significant characters than a multi-char tokenizer would.

## What sticks around

gomark is the proof that owning your parser pays off when the markdown
*is* the data model. Tags as `TagNode`, wiki-links as
`ReferencedContentNode`, embeds as `EmbeddedContentNode`, and a
lossless `Restore()` — these are the features that make a note app's
search, graph, and agent-edit surfaces all share one source of truth.
The architecture (token-based, two-stage, registry-driven) is clean
and readable in an afternoon.

The honest caveat is that it's a one-project library with a README that
oversells its config ergonomics and no independent ecosystem. If you're
building a note app where tags and links are load-bearing, study the
AST design and the roundtrip renderer. If you need CommonMark compliance
or a broader extension community, use goldmark and add custom inline
parsers — see [[dev/go-markdown-parsers]].

## Verdict

A focused, well-architected parser that solves a real problem
(first-class note semantics + lossless roundtrip) that no other Go
parser solves out of the box. Its limitation is that it's a one-project
library with aspirational docs and no independent community. Worth
reading for the AST design alone; worth adopting if your use case
matches memos's exactly; otherwise, borrow the patterns and build on
goldmark.
