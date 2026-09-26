---
title: Convex — the reactive TypeScript backend
parent: dev/index
tags: [dev, database, typescript, backend]
status: published
summary: Convex runs your TypeScript queries as ACID transactions inside the database and syncs results to clients live — no SQL, no ORM, no glue.
relations: [relates_to=log/2026-09-02-convex]
---

# Convex — the reactive TypeScript backend

Filed from [[log/2026-09-02-convex]].

## What it is

[Convex](https://www.convex.dev/) is a backend where your database
queries are TypeScript functions that run *inside the database* as
serializable ACID transactions, and the results sync to clients live
over WebSocket. You write `query` / `mutation` / `action` functions in
a `convex/` folder; `useQuery` subscriptions push updates whenever a
read set is invalidated. No SQL, no ORM, no glue code, no hand-wired
WebSockets.

The data model is document-relational: schemaless on day one, with
`defineTable` / `defineSchema` when you want incremental rigor. File
storage, full-text and vector search, crons, scheduling, and auth are
built in rather than bolted on.

## Why it's interesting

The founders are ex-Dropbox infra — CEO Jamie Turner and CTO James
Cowling (MIT PhD, distributed transactions), people who shipped
multi-exabyte storage. That discipline is the product: end-to-end
types, optimistic concurrency on an append-only transaction log,
automatic caching and scaling. The happy path is the correct path,
which matters more than usual right now: Convex's pitch for the agent
era is that 90% of AI-built apps on traditional databases silently
corrupted data in their testing, versus 0% on Convex — because reactive
serializable transactions make the first thing an agent writes also the
safe thing.

The backend [open-sourced in February 2025](https://github.com/get-convex/convex-backend)
(Rust + TypeScript) under FSL-1.1-Apache-2.0 — source-available, no
competing hosted offer, auto-converting to Apache-2.0 two years after
each release. Self-hosting can run on SQLite, Postgres, or MySQL.

## Where it bites

- **Pricing is per developer, not flat.** The free tier is generous (1M
  calls, 0.5 GB), then Pro is $25/developer/month plus usage. Compare
  Supabase's flat $25. Teams feel this shape immediately.
- **FSL is not open source.** Source-available with a two-year fuse to
  Apache-2.0. Fine for most people, a dealbreaker for some — know which
  you are.
- **The hosted dashboard is where the tooling lives.** Self-hosting is
  real, but the gravity pulls toward their cloud.
- Funded to $110.5M after a [$57M Series B in August 2026](https://news.convex.dev/convex-raises-57m/)
  led by Insight Partners. Money is not a technical argument, but it
  predicts which docs stay maintained.

## The tradeoff triangle

- **Firebase:** fastest on-ramp, proprietary, per-read billing with no
  cap, no self-host.
- **Supabase:** flat $25, real Postgres, Apache-2.0, self-host yes.
- **Convex:** reactive sync and transactions as the default, per-dev
  pricing, source-available.

If this site ever needs live sync without wiring WebSockets by hand,
this is the one to promote.

## Verdict

The rare backend where the marketing claim ("no glue, just types")
survives contact with the architecture docs. Worth a real look the next
time a project needs realtime without the realtime tax.

---

## Virelai for Convex

*Refrain — sung before and between each verse*

> **No glue, just types — the query lives where data lives —** *— convex!* —
> **What changes once, all clients know it gives.**

### I.

You write no SQL, no ORM to chase or shive — **A**
A `convex/` of functions, pure `query` in light — **b**
Mutations close as transactions, serializable and right — **b**
OCC upon a log that never needs contrive — **a**
> **No glue, just types — the query lives where data lives —** *— convex!*

### II.

The sync worker watches, the runner seals to thrive — **A**
V8 bundled by esbuild, sandboxed and contrived to hold — **b**
Indexes multiversioned, read-sets quietly told — **b**
WebSockets whisper `useQuery` till the view's alive — **a**
> **What changes once, all clients know it gives.**

### III.

Dropbox exiles built it for exabyte archive — **A**
FSL now, Apache later — two years till laws forgive — **b**
Twenty-five per dev, not flat — the price will test the sieve — **b**
Yet agents write the first thing safe, and safe will live — **a**
> **No glue, just types — the query lives where data lives —** *— convex!* —
> **What changes once, all clients know it gives.**
