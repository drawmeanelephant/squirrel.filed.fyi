---
title: "Gas Town — the city you install to run 30 coding agents"
parent: dev/index
tags: [dev, agents, ai, orchestration, claude-code, open-source, go]
status: published
summary: "Steve Yegge's multi-agent workspace manager: git-worktree hooks that survive agent restarts, a Beads ledger for work state, a Bors-style merge queue, and a full cast of watchdog daemons — if you want to run 20-30 coding agents on one repo."
relations: [relates_to=log/2026-09-04-gastownhall]
---

# Gas Town — the city you install to run 30 coding agents

Filed from [[log/2026-09-04-gastownhall]].

## What it claims to be

A workspace manager that coordinates multiple AI coding agents — Claude
Code, GitHub Copilot, Codex, Gemini, and a preset list of others — working
in parallel on the same repos. The pitch, from the README: agents lose
context on restart, manual coordination doesn't scale past 4-10 agents,
and work state lives in agent memory where it dies. Gas Town's answer to
all three is the same move: **make every piece of agent work a git
object.**

## What it actually is

The mental model is a small city, and the README leans into it. `gt
install ~/gt` builds a workspace ("Town"). Projects get cloned in as
**Rigs**. A **Mayor** — a Claude Code instance with full workspace context
— is the primary coordinator: you tell it what to build, it breaks thework into **beads** (issues stored in a ledger called
  [[dev/beads]]), bundles them into
**convoys**, and slings them to **polecats** — worker agents with
persistent identity but ephemeral sessions.

The load-bearing idea is **hooks**: each agent's work happens in a git
worktree. Work state, decisions, and progress are committed as you go, so
a crashed or killed agent loses nothing — the next one `git checkout`s the
same worktree and continues. That's the "persistent context" trick, and
it's more honest than the memory-slots every agent framework sells: it
uses the one durable, rollbackable, mergeable store that already exists.
Work tracking rides the same rail — Beads is git-backed issue storage
(`gt-abc12`-style IDs), so the issue tracker and the code live in one
place.

Around that core it grows organs a real city needs:

- **Refinery** — a per-rig merge queue. Polecats push branches and report
  `gt done`; the Refinery batches merge requests, runs verification gates,
  and merges with a Bors-style bisecting queue. Polecats never push to
  main directly.
- **Witness / Deacon / Dogs** — a three-tier watchdog. Each rig has a
  Witness watching its polecats for stuck sessions; a Deacon patrols
  across rigs; Dogs are maintenance workers it dispatches. `gt feed
  --problems` groups agents by health state (GUPP violation, stalled,
  zombie, working, idle).
- **Seance** — session archaeology: previous agent sessions log to
  `.events.jsonl`, and a new agent can query its predecessors' sessions
  for context instead of re-reading the codebase.
- **Scheduler** — a config-driven capacity governor for polecat dispatch,
  to avoid blowing API rate limits when you run 30 agents.
- **Wasteland** — a federation layer that links Gas Towns through DoltHub:
  rigs post wanted items, claim work from other towns, and earn portable
  reputation stamps. This is the "trust network" the org page hypes.
- **Molecules** — TOML-defined workflow templates ("formulas") that get
  instantiated as tracked, multi-step processes with checkpoints.
- **Telemetry** — everything emits OpenTelemetry events to any OTLP
  backend.

## Where it shines

The hook design is the real contribution. Every other multi-agent
framework either loses state on restart or hides it in a proprietary
store. Git worktrees are the obvious-in-hindsight answer: versioned,
mergeable, diffable, rollbackable, reviewable with existing tools. If the
agent dies, a human — or the next agent — resumes from a `git log`, not a
chat transcript.

The stack is also refreshingly boring underneath the naming: Go binary,
Dolt (a git-like SQL database) for the ledger, tmux for session hosting,
shell integration, a web dashboard that auto-refreshes via htmx. It's MIT
licensed, installs via `brew install gastown`, and supports Docker Compose
sandboxing. For a project that launched in January 2026 it is
shockingly documented — design docs, a glossary, install guides for macOS
/ Linux / Windows with the ICU workarounds spelled out.

## Where it breaks

Nothing here has been run by me — this is a README analysis, not a review.
The concerns from reading:

- **It's a whole city.** `gt up` boots Dolt, a daemon, the Deacon, the
  Mayor, per-rig Witnesses and Refineries, all tmux-backed. The
  prerequisites list is real: git worktrees, Go, Beads, sqlite3, ICU4C
  dev headers, tmux, and Claude Code CLI as the default runtime. This is
  not a tool you adopt casually; it's a toolchain decision.
- **The naming is a tax.** Mayor, polecats, convoys, seance, GUPP
  violations, the Wasteland, "MEOW" (Mayor-Enhanced Orchestration
  Workflow). It's charming until you have to explain to a teammate what a
  "stalled polecat in a GUPP violation" means. The glossary exists
  precisely because the jargon doesn't self-explain.
- **It presumes the Claude Code world.** The default runtime is Claude
  Code; hooks live in `.claude/settings.json`. Codex and Copilot are
  supported but need fallback configs, and Copilot requires an org-level
  CLI policy. If you're not on Claude Code, you're a second-class citizen.
- **The scale claims are unproven here.** "20-30 agents comfortably" is
  the pitch; nothing in the README is a benchmark. The whole watchdog
  apparatus exists because running 30 agents is operationally hard, not
  because it's solved.

## What sticks around

The git-worktree-as-persistence trick is the idea worth stealing. Whether
or not Gas Town wins, "agent work state lives in git" is the pattern that
outlives the project — it solves crash recovery, review, and merge with
infrastructure we already trust, and it makes agent work auditable in a
way memory dumps never will be.

The rest is a bet on how many moving parts a solo developer will tolerate
to run 30 agents at once. That bet is still out.

## Verdict

Pending. Filed to dev on architecture, not experience — the hook design
and the Bors-style merge queue are worth stealing even if the full
installation never happens. If it ever gets run for real work, this page
gets the receipts.