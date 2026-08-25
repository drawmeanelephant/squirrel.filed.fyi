---
title: The Log
parent: index
tags: [log, feed]
summary: Dated link dumps and news summaries, newest first. Everything lands here first.
---

# The Log

Everything enters the system here: raw links from friends, news worth a
summary, half-thoughts that need a parking spot. Entries are dated files,
`YYYY-MM-DD-slug.md`, one link (or one cluster) per file.

Draft entries stay out of nav, search, RSS, and sitemap until promoted to
`status: published`.

## Entry template

```markdown
---
title: Short human title
parent: log/index
tags: [link]
status: draft
summary: One sentence on what this is and why it was filed.
---

# <title>

- Source: <url> (sent by <who>, <date>)
- Verdict: <keep | promote-to-<bucket> | toss>
- Why: two or three sentences, plain words.
```

When an entry gets promoted into a bucket, add a `relations:
[relates_to=<bucket-entry>]` line here so the graph keeps both halves.
