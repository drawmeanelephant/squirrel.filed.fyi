---
title: Refero Styles
parent: dev/index
tags: [dev, design, ai, agents, design-systems]
status: published
summary: A curated library of DESIGN.md files extracted from real product websites — drop-in design context for AI coding agents.
relations: [relates_to=log/2026-08-27-refero-styles]
---

# Refero Styles

Filed from [[log/2026-08-27-refero-styles]].

## What it is

A curated library of DESIGN.md files — structured Markdown files describing design systems extracted from real product websites. Browse hundreds of sites, copy a single file that captures their colors, typography, spacing, motion, and component patterns, and paste it into your AI agent's context before a design request.

## Why it exists

AI coding agents do better design work when the brief includes a visual system, not just taste words. "Make it premium" leaves too much room for default layouts, weak spacing, and generic color choices. A DESIGN.md with concrete constraints — palette, type scale, layout rhythm, component weight — gives the agent a smaller, sharper target.

The library exists because extracting those constraints from a real website is tedious work that most people won't do. Refero has already done it for hundreds of sites.

## How to use it

1. **Pick a style** — match the density, tone, and audience of what you're building, not the brand name
2. **Paste the DESIGN.md** into your agent context (Cursor, Claude Code, Lovable, Bolt, v0) before your design request
3. **Ask for a specific screen or component** — the DESIGN.md narrows the visual direction, your prompt defines the product problem

The key instruction: copy the system, not the website. Use the reference to set taste and constraints, then describe your own product, audience, and feature requirements.

## Where it shines

The value is in the curation. Extracting a real design system from a live website — palette, type scale, spacing rhythm, component patterns, motion — is the kind of work that takes hours and produces a document nobody wants to write. Having a library of pre-extracted systems, organized by density and tone, means you can start with concrete constraints instead of starting from scratch.

The "before the first draft" framing is the right mental model. DESIGN.md examples are most useful at the start of a design task — landing pages, dashboards, pricing sections, onboarding flows. They also help when a page already works but feels generic.

## Where it breaks

It's a reference library, not a tool. There's no integration, no CLI, no MCP server (though Refero has a separate MCP product at refero.design/mcp). You browse, copy, paste. That's the whole workflow. For some people that's fine; for others it's friction.

The quality of the extracted systems depends on what Refero has curated. You're browsing their library, not generating from any arbitrary URL.

## Verdict

This is the "style guide for people who don't write style guides" — and more importantly, it's the "style guide for AI agents that can't read your mind." The DESIGN.md format is a good idea: structured enough to be useful, human-readable enough to edit, machine-parseable enough for agents to consume. If you're building UI with AI tools and your output keeps looking generic, this is the cheapest upgrade available. Browse the library, pick a reference close to your product, paste it before your next prompt.
