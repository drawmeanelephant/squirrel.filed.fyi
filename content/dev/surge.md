---
title: Surge — static publishing from the CLI
parent: dev/index
tags: [dev, hosting, static, cli]
status: published
summary: Surge publishes any directory with an index.html to a global CDN in one command — no config, no build pipeline, no dashboard.
relations: [relates_to=log/2026-09-02-surge]
---

# Surge — static publishing from the CLI

Filed from [[log/2026-09-02-surge]].

## What it is

[Surge](https://surge.sh/) is the opposite of the platform-creep hosts:
no build pipeline to configure, no dashboard to click through. You run
`surge publish` in any folder with an `index.html` and it's live on a
10-region CDN with HTTPS, clean URLs, and atomic deploys. Pick a
`*.surge.sh` subdomain or bring your own domain; a `CNAME` file in the
project remembers it. `surge rollback` undoes a bad publish, `--preview`
gives a throwaway URL, and `surge tokens add` plus `SURGE_TOKEN` makes CI
trivial. Free custom domains with auto-provisioned certs, guides for
Vite/Astro/Eleventy, and SPA `200.html` fallback. Made by Chloi Inc.
([sintaxi/surge](https://github.com/sintaxi/surge)).

## Why it's worth filing

The whole pitch fits in one terminal session: `mkdir lucid-example &&
echo '<h1>Hello, Surge</h1>' > index.html && surge publish`. Account
creation happens inline on first run; every subsequent publish ships
straight to the remembered domain. Revisions are atomic, previews never
touch production. It's the tool you reach for when the site is done and
you just want it *on the internet* without adopting a platform's
opinions about how software should be built.

## Where it bites

One honest wrinkle, and it's a real one for this household: the
zero-config static host arrives via `npm install --global surge`. The
entire pitch is freedom from ecosystems, delivered by an ecosystem.
There's no way to get the CLI without Node — which, given the standing
position that npm is the trojan horse, makes Surge the rare tool filed
here *despite* its install story rather than because of it. Worth it for
what it does; just know what you're letting in the door.

## Verdict

The fastest path from "folder with an index.html" to "a URL you can send
someone." Keep it in the toolbox next to the heavier machinery, and
reach for it whenever the correct amount of infrastructure is "none."

---

## Virelai for Surge

*Refrain — sung before and between each verse*

> **A folder and a command, and the world is live —** *— surge!* —
> **A `CNAME` remembers, the CDN will give.**

### I.

In terminal the account is born, you type `surge publish` *on light air* — **A**
No dashboard begs, no pipeline sworn, just `index.html` *laid quite fair* — **b**
Ten points of presence answer, London to Singapore *in bright air* — **b**
HTTPS renews itself before you swear — **a**
> **A folder and a command, and the world is live —** *— surge!*

### II.

You wrote `<h1>Hello</h1>` and left no lock or chain — **A**
Custom domain, free cert — `surge.sh` will bow and bend — **b**
`200.html` for the single-page, no broken friend — **b**
`rollback` for the second thought you cannot mend — **a**
> **A `CNAME` remembers, the CDN will give.**

### III.

No build to watch, no hook to prove — *still live, still light* — **A**
`--preview` lifts a ghost that never touches night — **b**
`SURGE_TOKEN` moves through CI without delight — **b**
Atomic cutover, clean URLs, done right — **a**
> **A folder and a command, and the world is live —** *— surge!* —
> **A `CNAME` remembers, the CDN will give.**
