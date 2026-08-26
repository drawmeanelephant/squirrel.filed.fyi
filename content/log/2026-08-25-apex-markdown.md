---
title: Apex Markdown processor
parent: log/2026-08
tags: [link, markdown, dev]
status: draft
summary: Brett Terpstra's unified Markdown processor in C — one CLI that speaks CommonMark, GFM, MultiMarkdown, Kramdown, and Marked at once.
---

# Apex Markdown processor

- Source: [ApexMarkdown/apex](https://github.com/ApexMarkdown/apex) (sent by the owner, 2026-08-25)
- Verdict: promote-to-dev
- Why: the owner was using it to do the markdown-processing half of what became boris before writing out oliver to do the same job, and it briefly powered another thing along the way. That's real usage history, which makes it more than a random repo dump.

## What it is

A C-based Markdown processor that refuses to pick a flavor.
Compatibility modes for CommonMark, GFM, MultiMarkdown, Kramdown, and a
"unified" mode that turns everything on at once — GFM tables with
rowspan/captions, three footnote syntaxes, Kramdown IALs, Pandoc fenced
divs, citations with BibTeX/CSL bibliographies, mmark-style indices,
CriticMarkup accept/reject, wiki links, callouts in three dialects,
plugins and Pandoc-style AST filters, terminal/RTF/man output. Ships as
a CLI plus a C API and Swift Package for embedding in apps.

## Who made it

Brett Terpstra (ttscoff) — the Marked 2 / nvUltra person, distributing
through his homebrew tap like all his stuff. Consistent with a long
history of Mac markdown tooling; ~155 stars so far, active (v1.1.16).

## The angle

Interesting mainly as prior art and a foil: it's the kitchen-sink
answer to "which markdown flavor," where boris went the other way —
one strict dialect, validated graph. Also a candidate for the dev
bucket with a note on where it ended up in the owner's own pipeline.
