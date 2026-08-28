---
title: Frontman
parent: dev/index
tags: [dev, agents, frontend, ai, elixir, open-source]
status: published
summary: An AI coding agent that lives in your browser — click any element, describe the change, it edits the source with hot reload. Live DOM, computed CSS, component tree, source maps.
relations: [relates_to=log/2026-08-27-frontman]
---

# Frontman

Filed from [[log/2026-08-27-frontman]].

## What it claims to be

An AI coding agent that lives in your browser. Click any element in your running app, describe the change in plain English, and it edits the actual source files with instant hot reload. It sees the live DOM, component tree, computed CSS, routes, source maps, and server logs — so non-technical teammates can make precise frontend fixes without guessing which file owns the UI.

## What it actually is

Most AI coding tools start from source files and never see the running application. Frontman takes the opposite approach — it starts from the browser and works backward to the source. The framework integration turns your local dev server into an MCP server that the AI agent queries for both client-side context (DOM tree, computed CSS, screenshots, element selection) and server-side context (routes, server logs, query timing, compiled modules).

**The browser-side MCP server** sits in your running app. It captures the DOM tree, computed styles, element selection, console logs, and screenshots. When you click an element in the Frontman overlay, the agent gets the element's position in the component tree, its computed CSS, and the source map resolution — all before it touches a file.

**The framework middleware** is a plugin for Next.js (App Router + Pages Router, Turbopack compatible), Astro (5, 6, 7 — Islands architecture, content collections, SSR/hybrid), and Vite (React, Vue, Svelte, SvelteKit). One command to install, works in dev mode only — production builds strip it out entirely.

**The server** is Elixir/Phoenix. The AI agent orchestrator queries MCP tools, generates edits, writes source files, and triggers hot reload. BYOK model — connect any LLM provider (OpenAI, Anthropic, OpenRouter, Fireworks, NVIDIA, Google, xAI).

**The split license** is interesting: Apache 2.0 for framework integrations and client libraries, AGPL-3.0 for the server. The AGPL means hosted services built on Frontman stay open. Self-hosting remains free.

## Where it shines

The use case is specific and real: small frontend fixes that get stuck in design QA, product review, or internal tooling backlogs. "Fix this button on an internal sub-page" — navigate to the route, click the button, Frontman edits the source. "Change the empty-state copy across the app" — describe the change once, review the diff before it lands. "Make the mobile cards match desktop spacing" — Frontman reads computed CSS and layout context, not just static source.

The target user is product managers and designers who need to fix copy, spacing, colors, and layout issues without waiting for a developer to open an IDE. It's complementary to Cursor/Copilot — use those for backend and general refactoring, switch to Frontman when you need to see what you're editing.

## Where it breaks

Development mode only — the middleware strips out of production builds, which is the right call but means it's strictly a local dev tool. The server is Elixir/Phoenix, which is a great choice for concurrency but narrows the contributor pool compared to Node.js. The BYOK model means you're paying your LLM provider directly, and the pricing for hosted Frontman is still moving to paid.

It's also early — Remix, Nuxt, SolidStart, Qwik, and Phoenix LiveView are listed as "coming soon." The framework support is solid for the big three (Next.js, Astro, Vite) but the long tail is still ahead.

## What sticks around

The architecture is the bet: browser-first editing, not IDE-first. Every other AI coding tool assumes the IDE is the center of the world. Frontman assumes the browser is — because that's where the user sees the problem, and that's where the rendered output lives. The computed CSS, the component tree, the source maps — that's context no terminal-based tool can provide.

The "non-technical teammates can make precise frontend fixes" framing is the real value prop. Not "AI writes your code" — "the designer fixes the spacing without bugging the developer." That's a workflow change, not just a tool change.

The OpenClaw integration is worth noting: `openclaw skill install frontman-dev` gives your general-purpose agent specialized frontend editing capabilities. It's a building block, not just a standalone tool.

## Verdict

This is the most complete browser-first AI coding agent that exists. The framework integrations (Next.js, Astro, Vite), the Elixir/Phoenix server, the split license, and the BYOK model are all solid choices. The real achievement is the architecture — starting from the running application instead of the source files gives it context that no IDE-based tool can match. If your team has a backlog of small frontend fixes that never get prioritized, this is the tool that lets product and design ship them without opening an IDE. Complementary to Cursor/Copilot, not competitive.
