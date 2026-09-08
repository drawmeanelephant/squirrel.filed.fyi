---
title: "Beads — Dolt-backed issue memory for coding agents"
parent: dev/index
tags: [dev, agents, ai, issues, dolt, open-source, go]
status: published
summary: "Steve Yegge's bd CLI: a dependency-aware issue graph in a versioned Dolt database that gives coding agents queryable, mergeable task state and persistent memory — the ledger Gas Town is built on."
relations: [relates_to=log/2026-09-04-beads]
---

# Beads — Dolt-backed issue memory for coding agents

Filed from [[log/2026-09-04-beads]]. It's the data layer underneath
[[dev/gastown]] — a Gas Town Mayor breaks work into beads and slings them
to worker agents.

## What it claims to be

A memory upgrade for your coding agent. From the README: it replaces
messy markdown plans with a dependency-aware graph, so agents can handle
long-horizon tasks without losing context. Issued as a single CLI (`bd`)
that you install once and use in every project — the GitHub README is
explicit that you don't clone the repo into your work.

## What it actually is

A distributed issue tracker where the store is a **Dolt** database, not
markdown and not GitHub issues. Dolt is the "git for data" SQL database:
versioned, branchable, mergeable at the cell level. The dev/gastown page
calls Beads "git-backed issue storage" — more precisely, git is only the
sync transport. Data lives in `.beads/`, and cross-machine sync rides
your existing git remote via `bd dolt push` / `bd dolt pull` against
`refs/dolt/data`. In **stealth mode** (`bd init --stealth`) it makes zero
git calls and works fine without a `.git` at all — which is how it serves
non-git VCS, monorepos, and CI.

The core design decisions:

- **Content-hash IDs** (`bd-a1b2`) instead of incrementing numbers. Two
  agents creating work in different branches can't collide on merge —
  same trick that makes git object IDs safe.
- **A dependency graph with blockers.** `bd dep add` links
  blocks/related/parent-child; `bd ready` lists exactly the work with no
  open blockers; claiming is an atomic update. That's the whole
  "auto-ready task detection" — an agent can always ask what it's
  allowed to pick up next.
- **Memory as data.** `bd remember "insight"` stores project memory that
  `bd prime` injects into the agent's context on demand — the README
  tells agents to stop creating MEMORY.md files. **Compaction** does
  semantic "memory decay": long-closed tasks get summarized to bound the
  context window.
- **Messages are first-class.** A message issue type with threading and
  an ephemeral lifecycle — coordination between agents is tracked like
  work, not lost in a chat log.
- **Agent setup is the product.** `bd init` writes or updates AGENTS.md
  so agents discover the workflow, and installs hooks/settings for
  Claude, Codex, Cursor, and others (`bd setup claude`, `bd setup
  codex`, ...). Output is JSON-friendly for agent consumption.

Storage comes in two modes: **embedded** (default — Dolt runs
in-process, single writer, data in `.beads/embeddeddolt/`) or **server**
(`bd init --server` — talks to an external `dolt sql-server` for
multiple concurrent writers). The README's upgrade guide is unusually
candid about the distributed story: when a schema migration lands,
exactly one designated clone runs `bd migrate` and pushes, and every
other clone runs `bd bootstrap` with the new binary.

## Where it shines

The insight is that agent memory is mostly an issue-tracking problem in
disguise. Markdown plans don't merge, don't have owners, don't express
blockers, and die with the session that wrote them. Beads makes task
state **queryable, claimable, and mergeable data** — an agent can ask
"what's ready?" instead of re-reading a plan file, and a crashed agent
loses nothing because the graph is on disk, not in its context window.
That is the same bet as Gas Town's git-worktree hooks, applied to work
tracking instead of code.

The content-hash IDs are quietly the load-bearing decision: they make
the multi-agent case work without a central coordinator issuing numbers.
Combined with atomic claims and Dolt's merge, you get an issue tracker
that parallel agents can actually share.

`bd remember` / `bd prime` is also the most honest shape of "persistent
memory" yet — it's a small, inspectable store the agent consults, not a
proprietary memory-slot service. And the whole thing is a boring Go CLI
you install with brew, with an operator-friendly schema-version guard
that prints an actionable error instead of cryptic SQL failures when
binaries and databases drift.

## Where it breaks

Nothing here has been run by me — this is a README analysis, not a
review. The concerns from reading:

- **Single-writer by default.** The embedded mode supports one writer;
  multiple agents in one repo mean server mode or disciplined
  push/pull. The elaborate upgrade choreography (migrate clone vs.
  bootstrap clones) is evidence the distributed story is real friction,
  not a feature.
- **Memory decay can eat receipts.** Compaction summarizes closed work
  to save context — which means detail is lost on a model's say-so. For
  work you might need to audit later, "decay" is a euphemism for
  trusting the summarizer.
- **It presumes compliant agents.** The whole value comes from agents
  actually running `bd` instead of keeping their own markdown. An agent
  that won't follow AGENTS.md instructions ignores Beads the same way it
  ignores everything else.
- **Invasive defaults.** `bd init` rewrites AGENTS.md and installs agent
  hooks by default; `--stealth` / `--skip-agents` are the conservative
  escape hatches but they're opt-out. And a `.beads/` Dolt database in
  your repo is a new thing to think about backing up — the README says
  the `issues.jsonl` export is explicitly *not* a backup.
- **Young and churning.** The schema guard cites v45+, so migrations are
  a regular occurrence; upgrading across machines takes discipline.

## What sticks around

"Task state as mergeable data, not prose in a file" is the pattern with
legs. GitHub issues live too far from the code and markdown plans live
too far from structure — Beads sits between them, versioned and queryable
by the same agents doing the work. Whether or not bd or Gas Town win,
the shape of it — hash IDs, blockers, `ready` as a query, memory you can
inspect — is what "agent issue tracking" looks like from here on.

The other half worth stealing is the discipline: put the workflow in
AGENTS.md so agents self-discover it, and give them a context command
(`bd prime`) instead of hoping they remember the rules.

## Verdict

Pending. Filed to dev on architecture, not experience — same standing as
[[dev/gastown]]: the design is worth stealing even if the tool never
gets installed here. If it ever runs for real, the memory-decay and
multi-writer sections are where the receipts belong.
