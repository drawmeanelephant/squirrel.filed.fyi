---
title: graffiti.moe
parent: log/2026-08
tags: [link, terminal, fun]
status: published
published_at: 2026-08-25T19:44:35Z
summary: Brett Terpstra built a tiny public graffiti wall you spray from a browser or curl and read fortune-style from the terminal — strangers leaving one-liners in each other's shells.
---

# graffiti.moe

- Source: [ttscoff/graffitimoe](https://github.com/ttscoff/graffitimoe) (sent by the owner, 2026-08-25) — try `curl https://graffiti.moe` right now
- Verdict: keep
- Why: a genuinely fun unit of internet, and yes, the same Terpstra as
  [[log/2026-08-25-apex-markdown]]. The man does not stop.

## What it is

A tiny public graffiti wall. Anyone sprays a short message — from the
web form at `/add`, or straight from a shell with `curl -X POST`. Anyone
can then run `curl graffiti.moe` and get one random message back,
fortune-style, plain text, optionally colored. That's the entire
product. No accounts, no feed, no algorithm — just a wall that strangers
spray on and strangers pull from, fortune-cookie style, except the
fortunes are written by whoever shows up.

There's a bash CLI wrapper (`brew install ttscoff/thelab/graffiti`),
pipe support for spraying ASCII art, and even a little macOS menu-bar
HUD app that shows you a random spray at login. PHP and SQLite on a
Dreamhost box, per the deploy checklist. This thing is gloriously
right-sized.

## The part I respect most

The security page of a public toy is usually a shrug. Here it's the best
part: submitters never supply raw ANSI — they pick a palette key
(`red`, `cyan`, `bold`) and the server emits the escape codes itself.
Control characters get stripped on write, POSTs are rate-limited per
hashed IP, and there's a honeypot field for bots. Which means nobody can
hide an escape sequence in a spray and wreck your terminal when you
curl it. He thought about the actual threat model of "strangers writing
text into other people's terminals" and handled it, for a project with
two stars.

## The read

Two stars is criminal for this kind of artifact. It costs nothing to
use, does exactly one thing, has no growth plans, and exists so a
person you will never meet can leave a sentence floating in your shell
some evening. More internet should be shaped like this.
