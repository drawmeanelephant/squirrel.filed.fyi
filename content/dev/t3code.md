---
title: T3 Code
parent: dev/index
tags: [dev, agents, tools, typescript, t3, pinggg]
status: published
summary: A unified control surface for coding agents — Codex, Claude Code, Cursor, Grok Build, OpenCode — with an event-sourced backend, remote access, and mobile apps.
relations: [relates_to=log/2026-08-27-t3code]
---

# T3 Code

Filed from [[log/2026-08-27-t3code]].

## What it claims to be

An "agent harness control surface" from [ping.gg](https://ping.gg) (the T3 stack people). One UI to control Claude Code, Codex, Cursor, Grok Build, and OpenCode running on your machine. iOS app, Android app, web app, Electron desktop. Remote access from your phone. Open source.

## What it actually is

It's a server-client architecture where the server is the execution boundary — every agent process, terminal, git operation, and filesystem read happens there, never in the client. The clients (web, desktop, mobile) talk to the server over a single authenticated Effect RPC WebSocket connection.

**The orchestration engine** is event-sourced. Commands go in, events come out, projections derive the read model. A single worker fiber processes commands in total order. Each command is checked against a durable receipt (idempotent retries), run through a pure decider to produce events, then committed in one SQL transaction that appends events, applies them to the in-memory read model, projects into persisted tables, and writes the receipt. The read model can never durably disagree with the event log.

**The provider driver registry** has five built-in drivers: Codex, Claude, Cursor, Grok, and OpenCode. Each driver declares its kind, config schema, and creates a scoped adapter. The orchestration engine routes session and turn operations through `ProviderService` without knowing which agent is behind them. Adding a new agent means writing a driver, not touching the engine.

**Workspace checkpointing** brackets every turn with Git-ref-based checkpoints. Diffs and reverts are exact — you can see exactly what an agent changed between turns and roll back surgically. The `CheckpointReactor` coordinates baseline capture, completed-turn capture, diff projection, and reverting both the workspace and the provider conversation.

**Remote access** works because the server is the execution boundary. Your phone connects to your home machine's T3 Code server over the same Effect RPC WebSocket. The mobile apps share a common client runtime (`packages/client-runtime`) with the web app — connection lifecycle, authentication, RPC, and domain state are all the same code. The platform layer is the only thing that differs.

**The drainable workers** are worth stealing. `DrainableWorker` pairs a transactional queue with a transactional count of outstanding items. `enqueue` atomically offers and increments; processing always decrements. `drain` retries until the count reaches zero, so tests can await "queue empty and current item finished" instead of sleeping. Three workers run this pattern: runtime ingestion, provider command reaction, and checkpoint reaction.

## The stack

TypeScript throughout. Effect for the RPC layer. Vite+ for the build (requires the `vp` CLI). The server is a Node.js process. The desktop app is Electron. Mobile is React Native. The whole thing is one authenticated WebSocket connection with per-method authorization — holding a valid socket isn't authorization to call everything on it.

## Where it breaks

They say it themselves: very very early, expect bugs. Not actively accepting contributions — small bug fixes might land, big feature PRs will get closed. The CONTRIBUTING.md is refreshingly blunt about this. External contributors get a `vouch:unvouched` label until explicitly added to a vouch list.

The documentation is markdown files in `docs/` with no docs site yet. The architecture docs are thorough (event sourcing, RPC contracts, provider drivers, checkpointing) but aimed at maintainers, not users.

It requires Node.js 22.16+ or 23.11+ or 24.10+ — no LTS support yet. The `npx t3@latest` quickstart is the easiest way in, but real use means installing the desktop app or running the server persistently.

## What sticks around

The architecture is the story. Most agent tools are either single-provider (Claude Desktop, Codex desktop) or thin wrappers (Conductor, Cursor Glass). T3 Code is a proper orchestration engine with event sourcing, idempotent command processing, and workspace checkpointing — the kind of infrastructure you'd build if you were serious about agents being a long-lived part of the development workflow, not a demo.

The remote access from phone is the feature that makes it real. Being able to check on an agent running on your home machine, approve a turn, see a diff — that's the actual workflow, not the terminal-and-clipboard dance everyone else is shipping.

The provider-agnostic driver registry means it's not betting on one agent winning. If the coding agent landscape stays fragmented (it will), a control surface that works across all of them is more useful than any single-agent UI.

## Verdict

This is what happens when a team that builds for the T3 stack (TypeScript, Tailwind, tRPC) applies that rigor to the agent tooling space. The event-sourced architecture, Effect RPC, drainable workers, and Git-ref checkpointing are serious engineering choices, not-framework-defaults. It's early and they know it, but the bones are good. If you're running multiple coding agents and want one place to control them — especially remotely — this is the most complete option that exists right now. The "not accepting contributions" stance is actually a good sign: it means they're protecting scope while the architecture is still settling.
