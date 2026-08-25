---
title: Boris (static site compiler)
parent: reviews/index
tags: [review, wip]
status: draft
summary: Review stub for the Zig compiler that builds this site — to be filled in after real usage.
---

# Boris

Review of [boris](https://github.com/drawmeanelephant/boris), the Zig
content compiler that builds this site. Draft stub — gets written up
once I've pushed it through actual daily use instead of one afternoon.

## What it claims to be

HTML site + IR + optional RAG, with a validated page graph.

## What I ran it against

This site: five buckets, wiki links, drafts, search index, sitemap.

## Where it broke

Nothing yet. Frontmatter schema is strict — unknown keys hard-fail the
build — which is annoying exactly once, then correct forever.

## Verdict

Pending real usage.
