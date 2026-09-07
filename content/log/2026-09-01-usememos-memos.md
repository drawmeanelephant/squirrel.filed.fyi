---
title: usememos/memos — the engine under a 62k-star self-hosted note app
parent: log/2026-09
tags: [link, dev, go, markdown, self-hosted, notes]
status: published
published_at: 2026-09-01T12:00:00Z
summary: A deep-ish dive into what actually runs memos — a custom Go markdown parser, protobuf-first API, and a single-binary SQLite-by-default engine that explains the popularity.
relations: [relates_to=dev/usememos-memos]
---

# usememos/memos — the engine under a 62k-star self-hosted note app

- Source: https://github.com/usememos/memos (sent by me, 2026-09-01)
- Verdict: promote-to-dev
- Why: real popular, and the architecture is more interesting than the
  pitch. Worth knowing if you build Go web apps or care about markdown
  engines.

## What it is

[Memos](https://github.com/usememos/memos) — 62.7k stars, 4.7k forks, MIT
— calls itself "an open-source, self-hosted home for short-form
thinking." Translation: a private microblog/timeline for your own
markdown notes, links, and snippets. One Docker command, zero
telemetry, runs on a Raspberry Pi. That's the marketing layer. The
interesting part is what's underneath.

## The engine

Their own `AGENTS.md` states it cleanly, and the `go.mod` confirms every
line:

- **Backend: Go 1.27, Echo v5, Connect RPC, gRPC-Gateway, Protocol
  Buffers.** The API is defined in `.proto` files first, then generated
  out to Go, TypeScript, and OpenAPI via `buf generate`. You get a
  typed REST surface and a gRPC surface from one source. Service handlers
  stay thin — pull user from context, delegate to the store, return
  `status.Errorf(codes.X, ...)`. Textbook shape.
- **Frontend: React 19, Vite 8, Tailwind v4, React Query v5.** The SPA
  ships baked into the Go binary via `server/router/frontend/dist`, so
  the deployment story is one container, one port (5230), no separate
  node process in prod.
- **Storage: SQLite (default), MySQL, PostgreSQL.** Three drivers behind
  one `store/` facade — `store/db/{sqlite,mysql,postgres}/` each with
  their own migrations and `LATEST.sql`. SQLite ships with WAL mode and
  a busy timeout on by default, which is the one PRAGMA that turns it
  from a toy into a real database for concurrent reads. The store
  abstraction is what makes the swap to Postgres feasible without
  polluting the service layer.

## The markdown engine — this is the real find

Memos doesn't use goldmark or any off-the-shelf CommonMark parser. It
ships [usememos/gomark](https://github.com/usememos/gomark), a custom
token-based parser written for this project. Architecture:

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

Design claims: single-pass tokenization, minimal allocations, roundtrip
support (parse → modify → restore back to markdown), and a configurable
extension system. Beyond CommonMark it handles tables, math (`$...$` /
`$$...$$`), `==highlighting==`, `~sub~` / `^super^`, `||spoilers||`,
`#tags`, `[[wiki-links]]`, and `![[embeds]]` — the wiki-link and tag
syntax being the load-bearing additions for a notes app with light
graphing. There's a safe mode that sanitizes, and per-extension toggles.

The reason this matters: most note apps bolt on a JS markdown library
and live with its rounding errors. Memos owns the parser, so tags and
wiki-links are first-class AST nodes, not regex post-processing — which
is how search, the timeline, and the API all agree on what a memo
*contains*.

## The rest of the dependency tell

`go.mod` is a map of the project's ambitions:

- `modernc.org/sqlite` — pure-Go SQLite, no CGo. This is why the single
  binary cross-compiles to amd64/arm64/armv7 without a C toolchain.
- `connectrpc.com/connect` + `grpc-ecosystem/grpc-gateway/v2` — the
  dual REST/gRPC API surface.
- `labstack/echo/v5` — the HTTP server and router.
- `spf13/cobra` + `spf13/viper` — CLI and config (env vars, the
  `MEMOS_DRIVER` / `MEMOS_DSN` knobs).
- `golang-jwt/jwt/v5` — access tokens, refresh tokens, personal access
  tokens.
- `google/cel-go` — CEL expressions for memo filtering in the
  `internal/filter` package.
- `aws-sdk-go-v2` + `johannesboyne/gofakes3` — S3-compatible attachment
  storage, with a fake S3 for local/testing.
- `modelcontextprotocol/go-sdk` + `openai/openai-go` +
  `google.golang.org/genai` — an `internal/ai` package exposing memos
  over MCP and wiring OpenAI/Google GenAI. So memos can be an agent's
  memory store, not just a human's.
- `pion/opus` + `at-wat/ebml-go` — audio/EBML handling, suggesting
  voice-memo ingestion.
- `disintegration/imaging` — thumbnail generation in the fileserver.
- `testcontainers-go` with mysql/postgres/minio modules — the store
  tests spin up real DBs in containers. Not mocked.

## Why it's popular

The architecture explains the stars. A single static binary plus a
SQLite file is about the simplest deployment story in self-hosting — no
runtime, no external DB to babysit, ~50 MB RAM idle. Markdown-native
means your notes are portable plain text, not a proprietary blob.
Protobuf-first means the API is real and typed, which is why there's a
whole ecosystem of third-party clients (Memosly for Android, iOS apps,
the Web Clipper). And owning the parser means the note-taking semantics
(tags, links, embeds) are consistent across every surface.

It's the kind of codebase worth half an hour of reading if you build Go
web apps: the store-facade-over-three-drivers pattern, the
proto-first-then-generate workflow, and the custom markdown parser are
all directly pinchable.
