---
title: usememos/memos
parent: dev/index
tags: [dev, go, markdown, self-hosted, notes, protobuf, sqlite]
status: published
summary: A 62k-star self-hosted note app whose engine is more interesting than the pitch — custom Go markdown parser, protobuf-first API, single-binary SQLite-by-default.
relations: [relates_to=log/2026-09-01-usememos-memos, relates_to=dev/go-markdown-parsers, relates_to=dev/gomark]
---

# usememos/memos

Filed from [[log/2026-09-01-usememos-memos]].

## What it claims to be

An open-source, self-hosted home for short-form thinking. Daily notes,
links, work logs, and snippets flow into a chronological Markdown
timeline on infrastructure you control. One Docker command, zero
telemetry, MIT-licensed. That's the README pitch — and it's accurate —
but the pitch hides the interesting part.

## What it actually is

A Go web application built with unusual discipline, where every layer
choice was made to buy portability, typed APIs, and deployment
simplicity. 62.7k stars and 4.7k forks is not an accident.

**The HTTP engine.** Echo v5 as the HTTP server and router, fronting a
Connect RPC + gRPC-Gateway layer. The entire public API is defined in
`.proto` files first, then generated out to Go, TypeScript, and OpenAPI
via `buf generate`. Service handlers stay thin — pull the user from
context, delegate to the store, return `status.Errorf(codes.X, ...)`.
You get a typed REST surface and a gRPC surface from one source
definition. Hand-editing generated proto output is explicitly forbidden
in their agent rules.

**The storage engine.** SQLite is the default and the best fit for most
deployments — single binary, no external DB, one file on disk. But it's
not a SQLite-only project: MySQL and PostgreSQL sit behind the same
`store/` facade, in `store/db/{sqlite,mysql,postgres}/`, each with its
own migrations and `LATEST.sql`. SQLite ships with WAL mode and a busy
timeout on by default, the one PRAGMA that turns it from a toy into a
real database for concurrent reads. Schema changes require migrations
for all three drivers — the abstraction is real, not aspirational.
Store tests use testcontainers-go with real MySQL, PostgreSQL, and
MinIO instances in containers, not mocks.

**The deployment engine.** A single static Go binary with the React 19
SPA baked into `server/router/frontend/dist`. One container, one port
(5230), ~50 MB RAM idle. The pure-Go SQLite driver
(`modernc.org/sqlite`, no CGo) is what lets the binary cross-compile to
amd64/arm64/armv7 without a C toolchain. Alpine 3.21 runtime, non-root
user, multi-arch Docker image.

## The markdown engine — the real find

Memos doesn't use goldmark or any off-the-shelf CommonMark parser. It
ships [usememos/gomark](https://github.com/usememos/gomark), a custom
token-based parser written for this project — see [[dev/gomark]] for
the standalone writeup.

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

Design claims from the repo: single-pass tokenization, minimal
allocations, roundtrip support (parse → modify → restore back to
markdown), configurable extension system, type-safe Go interfaces.
Beyond CommonMark it handles tables, math (`$...$` / `$$...$$`),
`==highlighting==`, `~sub~` / `^super^`, `||spoilers||`, `#tags`,
`[[wiki-links]]`, and `![[embeds]]` — the wiki-link and tag syntax
being the load-bearing additions for a notes app with light graphing.
Safe mode sanitizes content; per-extension toggles let you disable
tables, math, etc.

**Why this matters.** Most note apps bolt on a JS markdown library and
live with its rounding errors. Memos owns the parser, so tags and
wiki-links are first-class AST nodes, not regex post-processing — which
is how search, the timeline, and the API all agree on what a memo
*contains*. The roundtrip renderer means parse → modify → restore is
lossless, so programmatic edits to notes stay as clean markdown, not
degraded HTML-ified text.

## The dependency tell

`go.mod` is a map of the project's current ambitions:

- **`modernc.org/sqlite`** — pure-Go SQLite, no CGo. The reason the
  binary cross-compiles without a C toolchain.
- **`connectrpc.com/connect` + `grpc-ecosystem/grpc-gateway/v2`** —
  the dual REST/gRPC API surface from one proto definition.
- **`labstack/echo/v5`** — HTTP server and router.
- **`spf13/cobra` + `spf13/viper`** — CLI and config (the
  `MEMOS_DRIVER` / `MEMOS_DSN` environment knobs).
- **`golang-jwt/jwt/v5`** — access tokens, refresh tokens, personal
  access tokens.
- **`google/cel-go`** — CEL expressions for memo filtering in the
  `internal/filter` package.
- **`aws-sdk-go-v2` + `johannesboyne/gofakes3`** — S3-compatible
  attachment storage, with a fake S3 for local/testing.
- **`modelcontextprotocol/go-sdk` + `openai/openai-go` +
  `google.golang.org/genai`** — an `internal/ai` package exposing memos
  over MCP and wiring OpenAI/Google GenAI. Memos is positioning itself
  as an agent memory store, not just a human's notebook.
- **`pion/opus` + `at-wat/ebml-go`** — audio/EBML handling, suggesting
  voice-memo ingestion.
- **`disintegration/imaging`** — thumbnail generation in the fileserver.
- **`testcontainers-go`** (mysql/postgres/minio modules) — the store
  tests spin up real DBs in containers.

## Where it shines

The deployment story is the headline. A static binary plus a SQLite
file is about the simplest deployment in self-hosting — no runtime, no
external DB to babysit, ~50 MB RAM idle, runs on a Raspberry Pi.
Markdown-native means notes are portable plain text, not a proprietary
blob. Protobuf-first means the API is real and typed from one source
definition, which is why a whole client ecosystem exists — Memosly for
Android, iOS apps, a Web Clipper for Chrome and Firefox, plus REST,
gRPC, and webhook integrations.

Owning the markdown parser is the architectural decision that keeps
paying off. Tags, wiki-links, and embeds are first-class AST nodes, so
every surface — search, timeline, API, filters — agrees on what a memo
contains. No regex bolt-ons, no JS-library rounding errors.

The multi-database store facade is done correctly. Three drivers
behind one interface, each with its own migrations and `LATEST.sql`,
tested against real containerized instances. The swap from SQLite to
Postgres doesn't pollute the service layer. That's rare.

The MCP integration is the forward-looking bet. With
`modelcontextprotocol/go-sdk` plus OpenAI and Google GenAI SDKs in the
dependency tree, memos is positioning as an agent's memory store over
MCP — your notes become readable and writable by coding agents, not
just by you.

## Where it breaks

SQLite is the default, and write contention surfaces first under
concurrent multi-user load. WAL mode helps, but if you have many
writers, you're better off on Postgres — which is a heavier
operational footprint. The project's own docs are honest about this.

The custom markdown parser is a strength and a liability. gomark is
maintained by the same project, so its fate is tied to memos. If you
pin your note semantics to gomark's AST and the project stalls, you're
on your own. CommonMark compliance is "with useful extensions," not
"strict CommonMark," so there are edge cases where gomark and goldmark
disagree — see [[dev/go-markdown-parsers]] for the full comparison.

The AI/MCP integration is early. The `internal/ai` package and the
three LLM SDKs in the dependency tree are ambitious, but the surface
is still maturing — there's a difference between "depends on the SDK"
and "ships a stable agent memory API."

No multi-node story. This is a single-instance app; if you outgrow one
node, the answer is "move to Postgres," not "scale out memos
horizontally." That's fine for the target audience but worth naming.

## What sticks around

The patterns are directly pinchable for anyone building Go web apps.
The store-facade-over-three-drivers abstraction is the textbook way to
support multiple databases without leaking driver specifics into
services. The proto-first-then-generate workflow buys type safety,
generated docs, and client code in one move. The single-binary-with-
embedded-SPA deployment is the model for self-hosted tools. And the
custom markdown parser with first-class note-taking semantics (tags,
links, embeds as AST nodes, not regex) is the pattern that explains
why the whole product feels coherent.

## Verdict

The popularity is earned, not luck. A single static binary plus a
SQLite file is the simplest deployment story in self-hosting.
Markdown-native keeps notes portable. Protobuf-first makes the API real
and typed, which is why a client ecosystem exists. And owning the
markdown parser means note-taking semantics are consistent across
every surface. It's a genuinely well-structured Go web app — worth
reading the source if you build that kind of thing, and worth running
if you want quick capture without handing your data to someone else.
