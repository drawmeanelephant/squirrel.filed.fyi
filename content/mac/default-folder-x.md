---
title: Default Folder X
parent: mac/index
tags: [review, mac, utility]
status: published
summary: 25-year review of St. Clair Software's Default Folder X — the utility that fixes the worst dialog on your computer.
relations: [relates_to=log/2026-08-25-default-folder-x]
---

# Default Folder X

[Default Folder X](https://www.stclairsoft.com/DefaultFolderX/index.html)
is a $39.95 Mac utility from [St. Clair Software](https://www.stclairsoft.com/)
that fixes the single worst piece of interface Apple has shipped
unchanged for decades: the Open and Save
[dialog](https://developer.apple.com/documentation/appkit/nsopenpanel).
I have liked it for roughly 25 years. This is what a quarter century of
daily use looks like written down.

## What it claims to be

"Quick access to your files and folders in every app." Concretely: every
Open and Save dialog on your Mac grows a toolbar. It carries hierarchical
menus of recent and favorite folders, you can click any Finder window to
save into it, type three letters to jump to a file, rename or tag things
mid-dialog, and set per-application default folders so Photoshop stops
dropping you in `~/Desktop` like an animal. Also: it widens the filename
edit field, because whoever designed that two-centimeter text box in the
year of our lord one thousand nine hundred something hated you.

## What I ran it against

Every Mac I've owned since about 2001. The current build (6.2.8) runs on
macOS 10.13 through 26.x, native Intel and Apple Silicon, and they're
already shipping betas for macOS 27 "Golden Gate." Note those version
numbers: Apple renumbered macOS to track years, which is why one line of
system requirements spans nine years of operating systems — and why a
utility whose entire job is touching a system dialog has survived nine
years of them, plus everything back to the [classic Mac OS control panel](https://en.wikipedia.org/wiki/Control_Panel_(Mac_OS))
it grew out of in 1996.

That last part is the actual story. Utilities like this work by injecting
themselves into other apps' processes without those apps' knowledge or
consent — which makes them the first casualty of every security regime
Apple has ever introduced. Code signing killed half the category.
Sandboxing, Gatekeeper, notarization, SIP: each was a mass extinction
event for haxies, and each time St. Clair just... rebuilt it and kept
shipping. Meanwhile Apple itself still hasn't fixed the underlying
dialog, twenty-five years running.

## Where it broke

Honest ledger across 25 years: occasionally an OS beta breaks it until
the matching DFX update lands (hence the public beta page). Every few
major versions there's a paid upgrade, which at this utility's lifespan
works out to less than the coffee you spill while using it. That's the
entire list. I cannot recall a single instance of it eating a file,
crashing an app, or losing settings — which for software whose whole job
is process injection is frankly absurd. The company's website still has a
hit counter on it, if you want a sense of the institution we're dealing with.

## What stuck around after the test

The test never ended; that's the point of the review. After 25 years the
muscle memory is load-bearing: Finder-click alone saves me hundreds of
micro-navigations a week, per-app default folders mean every tool opens
where it should, and Quick Search (Cmd-Space-adjacent muscle memory,
configurable) is faster than Spotlight for "open the thing I had open
ten minutes ago." It also tracks files synced from cloud drives now,
which tells you the developer pays attention to how computing actually
changed rather than shipping a museum piece. Settings sync over iCloud.
Thirty-day demo, no account, no subscription, no telemetry, no startup
pitch deck. A human named Jon Gotow has answered support mail since the
Clinton administration.

## Verdict

If tech companies as a whole exhaust you, Default Folder X is the
counter-evidence: one small shop, one niche problem, owned by its users'
loathing of folder navigation, sustained for nearly thirty years without
an acquisition, a pivot to SaaS, or an AI feature nobody asked for. Buy
it, run the demo for thirty days, and discover you've been negotiating
with a file picker like a peasant since the turn of the millennium.
