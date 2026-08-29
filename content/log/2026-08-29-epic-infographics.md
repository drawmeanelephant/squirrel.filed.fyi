---
title: Epic Infographics — AI Agent Skill for Studio-Quality Infographics
parent: log/2026-08
tags: [link, ai, design, tools]
status: draft
summary: An open-source skill that teaches AI agents to design infographics using scene-first composition, truthful geometry, and 12 distinct design languages instead of the usual template slop.
---

# Epic Infographics — AI Agent Skill for Studio-Quality Infographics

**Source:** [OrRon/EpicInfographics](https://github.com/OrRon/EpicInfographics) — GitHub (sent by user, August 29, 2026)

## What it is

An open-source skill/plugin for AI agents (Claude Code, Codex, Factory Droid, Pi) that teaches them to design infographics the way a design studio would. It explicitly tries to avoid the "Tailwind blue rounded cards with emoji icons" look that AI-generated infographics typically produce.

## How it works

The skill provides a full framework:

- **12 design languages** — blueprint, dark-glass, naturalist-plate, isometric-world, retro-print, editorial, hand-drawn, park-poster, cutaway, and three "high slop-risk" styles (swiss, corporate-clean, neo-brutalist) that are only used when explicitly requested
- **Data vocabulary** — ~25 data forms chosen by the question the data answers, not the format the data comes in
- **Scene-first composition** — every piece builds a scene (a drafting sheet, a dark theatre, a naturalist's folio) and the data lives inside that scene
- **Computed charts** — bar ratios, donut arcs, and areas come from arithmetic, not eyeballing
- **Color-blind-safe palettes** — every palette passes a six-check validation
- **Render pipeline** — Playwright drives headless Chromium to render HTML/CSS to retina PNGs at 2x
- **Animation** — CSS animations scrubbed frame-by-frame, assembled into MP4/GIF with ffmpeg

## The anti-slop checklist

Every graphic gets screenshotted, read back, and checked against a hard anti-slop list before delivery: the no-text squint test, the template test, the flat-ground test. The rule zero: "where is the reader standing? If the answer is 'looking at a well-designed page,' the agent starts over."

## Gallery

13 briefs, 12 design languages, 6 canvas formats, every piece animated. Orbital launch blueprint, tallest buildings, signup funnel, streaming wars, case for sleep, margherita anatomy, honeybee economy, coffee tree, spotlight shrinking, two tiny worlds of work, road the internet took, visit Mars, wind turbine cutaway.

## Install

Works with Claude Code (`/plugin marketplace add`), Codex, Factory Droid, Pi, or manual git clone. Needs `npm install && npx playwright install chromium` for rendering.

**Verdict:** Keep. The "no Tailwind blue" philosophy is refreshing. Could be useful for the site's own visual content.
