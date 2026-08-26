---
title: Astro Cactus
parent: log/2026-08
tags: [link, meta]
status: published
published_at: 2026-08-25T18:30:00Z
summary: The 1.7k-star Astro blog theme I wasn't even excited about when I used Astro — filed for the irony, which is structural.
---

# Astro Cactus

- Source: [chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus) (mine, 2026-08-25) — [demo](https://astro-cactus.chriswilliams.dev/)
- Verdict: keep — as sentiment, not strategy
- Why: I want to support it and possibly port it into boris and
  rotkeeper. It is a bad fit for both systems and for me, I wasn't even
  that excited about it when I was using Astro, which I don't anymore.
  The desire persists anyway. Rich in irony, as advertised.

## The facts

[Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) is
Chris Williams's opinionated blog starter: 1.7k stars, MIT, Astro v6 +
Tailwind v4, MD/MDX posts and notes, dark/light mode, Pagefind static
search, Satori-generated OG images, webmentions, automatic RSS, sitemap,
robots.txt, web manifest, Expressive Code blocks. 939 commits of
maintenance. It is, genuinely, one of the good ones — the theme you
point people at when they say "I want a blog."

It was also [born as a Hexo theme](https://github.com/probberechts/hexo-theme-cactus).
Cactus has now survived two JavaScript ecosystems and is eyeing a third
that isn't JavaScript at all.

## The irony, examined

The port urge is sentiment wearing a strategy costume. Boris already
does most of Cactus's feature list natively — RSS, sitemap, drafts
excluded from feeds, static search, dark mode — with no Node, no
pnpm lockfile, and no `postbuild` script. Porting Cactus *into* boris
means translating Tailwind classes into a Zig compiler's template slots
to reproduce a design I was lukewarm on, for a site that already has a
theme I actively like. Rotkeeper's spooky-dark crypt would fit it even
less.

The honest version of the impulse: star it, sponsor Chris if the
sponsor button's warm, and if the affection needs an outlet, steal the
*design language* — the type scale, the spacing, the quiet — into the
lab theme, without importing a single dependency. Themes migrate;
frameworks don't get to come along.

## Disposition

Held as draft until the owner decides: publish the irony as-is, or
promote to [[tech/index]] with a full "porting a theme across three
frameworks" writeup. The middle path (design-language transplant into
`lab/`) is real work with no deadline.
