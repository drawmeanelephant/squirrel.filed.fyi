---
title: Pi Livecraft — the agent rebuilds its own cockpit
parent: log/index
tags: [link, ai, dev]
status: draft
summary: A web UI for the Pi coding agent that the agent hot-reloads and reshapes while you use it. Forks are expected to drift. The docs are written for the model first.
---

# Pi Livecraft

- Source: [sebastienservouze/pi-livecraft](https://github.com/sebastienservouze/pi-livecraft) (sent by me, 2026-08-25)
- Verdict: keep — promote-to-dev candidate; the pattern is worth stealing
  even if the tool never gets installed

## What it is

A local web client wrapped around [Pi](https://pi.dev), the terminal
coding agent. Pi keeps the brains — providers, sessions, tools,
extensions — and Livecraft gives it a live, editable React app. The
trick: the UI is served by Vite hot reload, so **the model can reshape
its own interface while the session is running**. Something annoys you,
you ask the agent to change it, you watch the cockpit rebuild itself
mid-flight, and you keep the result. The README's own escalation ladder
is the best part — graphs you can click to jump back to the exact tool
call, HTML/SVG/markdown rendered inside tool results, confetti when a
task ends — against the terminal purist's refrain: *"Technically I can
still do that in a terminal."* The author's response: *"Well, maybe
Livecraft isn't for you then :3"*

105 stars, 37 forks, MIT, 748 commits, everything local, sessions
survive browser refreshes because a separate supervisor owns the Pi
processes.

## Two details worth more than the tool

1. **The docs are written for agents first.** All documentation except
   the README "is primarily meant to be read by agents (you can still
   read it, dw)." The human is the tourist; the model is the resident.
2. **Forks are the product.** Upstream takes bug fixes and "no more
   features"; your fork is expected to drift into your personal
   instrument panel, and the suggested first change is to "add something
   objectively unnecessary but personally delightful."

## The pairing

Filed one entry after [T3Libre](https://github.com/maria-rcks/t3libre),
and the two are mirror images: T3Libre is a joke fork promising to never
become a product; Livecraft is a sincere project whose entire design
assumes forks *shouldn't* converge. Satire and earnest practice arriving
at the same conclusion from opposite directions — the fork is where the
personality lives.

## The uncomfortable recognition

The thesis — the agent should maintain its own tools, and the cockpit
should be as editable as the code it flies — is the operating principle
of this very site. The theme, the homepage Venn, the squirrel: all
reshaped by the agent mid-session on owner request. Livecraft just
productized the loop this repo does by hand. Filed under dev with
respect.
