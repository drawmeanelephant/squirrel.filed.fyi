---
title: "brainless — Claude Code / Codex / Grok as shadcn components"
parent: log/2026-08
tags: [link, tech, ai, agents, cli, ui]
status: published
published_at: 2026-08-31T12:00:00Z
summary: "brainless.swerdlow.dev renders Claude Code, OpenAI Codex, and Grok CLI interfaces as shadcn/ui components — a pixel-styled demo of the three big terminal agents side by side."
---

# brainless — Claude Code / Codex / Grok as shadcn components

- Source: [brainless.swerdlow.dev](https://brainless.swerdlow.dev/) (sent by the owner, 2026-08-31)
- Verdict: keep
- Why: A pixel-styled showcase that renders Claude Code v2.1.206,
  OpenAI Codex v0.132.0, and Grok Build Beta 0.2.93 terminal interfaces
  as shadcn/ui components — by @benswerd (freestyle). Pure eye candy,
  but a neat artifact of how standardized the terminal-agent UX has
  become: same prompt box, same "esc to interrupt", same step
  counters, same auto-approve toggles across all three.

## Noted from the page

- Three panes side by side: Claude Code ("Fable 7 with xhigh effort ·
  Claude Max"), OpenAI Codex (gpt-6.9, 16K/500K tokens, 2/3 steps), and
  Grok Build Beta (Grok 4.21, turn completed in 9.2s).
- Each runs the same demo task: "put the brainless pricing block on
  the marketing page" — read page.tsx, edit components/pricing.tsx,
  run build. The convergence of terminal-agent UX is the point.
- shadcn component framing: `bunx shadcn add brainless/pricing` is the
  demo's own joke install command.
