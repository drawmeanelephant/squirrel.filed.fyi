---
title: "Gas Town Hall — the community org for Steve Yegge's agent orchestrator"
parent: log/2026-09
tags: [link, dev, ai, agents, orchestration]
status: published
published_at: 2026-09-04T17:17:17Z
summary: The official GitHub org and docs hub for Gas Town, the open-source multi-agent workspace manager that coordinates Claude Code, Copilot, Codex, and Gemini on one repo.
relations: [relates_to=dev/gastown]
---

# Gas Town Hall — the community org for Steve Yegge's agent orchestrator

- Source: https://github.com/gastownhall (sent by me, 2026-09-04)
- Verdict: promote-to-dev
- Why: Gas Town is one of the higher-profile agent-orchestration
  projects of the year — Steve Yegge's "Kubernetes for agents" take —
  and this org is the community/docs front door for it. Promoted to dev
  on architecture — the git-worktree persistence and Bors-style merge
  queue are worth stealing even without running it.

**Filed to:** [[dev/gastown]]

## What it is

Gas Town Hall is the official community and documentation hub for
[Gas Town](https://github.com/gastownhall/gastown), an open-source
"multi-agent workspace" tool. It coordinates several AI coding agents —
Claude Code, GitHub Copilot, Codex, Gemini — working in parallel on one
repo, git-native, with a trust/accountability layer ("the Wasteland
trust network") that rates rigs by tiers: Imperator › Warrior › Settler ›
Scavenger › Drifter. The project is Steve Yegge's (the Google/Amazon
engineer and famously long-winded blogger); the org and community are
run by Chris Sells.

The org page itself is thin — a README-style pitch, a Town Crier news
feed, and a leaderboard — which is the point: it's the landing page, not
the product. The actual tool lives in `gastownhall/gastown`.