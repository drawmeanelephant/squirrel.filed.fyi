---
title: "Raycast: A 200MB Web Browser That Charges Rent for LaunchBar"
parent: tech/index
tags: [tech, raycast, launcher, electron, quicksilver, launchbar, ai]
status: published
published_at: "2026-08-30T09:05:00Z"
summary: "Raycast is an Electron app idling at several hundred megabytes that charges a subscription for abbreviation launchers that have been free on the Mac for twenty years. The receipts, the pattern, and why the command registry — not the menu — is the product."
relations: [relates_to=log/2026-08-30-raycast, relates_to=dev/god-menu]
---

# Raycast: A 200MB Web Browser That Charges Rent for LaunchBar

Filed from [[log/2026-08-30-raycast]].

## What it claims to be

A blazing-fast launcher that will change how you use your Mac, complete
with an extension store, AI extras, and a subscription. It was
recommended to me by AI. I had never heard of it, and the AI chatbot was
profoundly confused that this was possible — which is exactly the tell.
Because everyone who arrived at computing in 2020 knows Raycast invented
this entire category.

No it didn't.

## What it actually is

An **Electron app**. A launcher whose *entire job* is to launch things
quickly, built on a web browser runtime, idling at several hundred
megabytes. Sit with that for a second. The tool you summon because a
native app feels too slow is a whole Chromium quietly waiting around to
look fast.

Quicksilver did the same job in single-digit megabytes of Cocoa. You run
a Mac with a BSS-budget gate; you already know which lineage you're
descended from.

## The receipts, in order

- **LaunchBar, 1995, NeXTSTEP** — abbreviation search before macOS
  itself existed. The launcher predates the platform it now lives on by
  half a decade and change. Everything Raycast does with fuzzy matching,
  LaunchBar was doing when the Mac was running System 7.
- **Quicksilver, 2003** — this is the important one. It took "type to
  find" and turned it into an actual *object broker*: object → action →
  argument. The comma-trick. Triggers. A plugin culture. It was the tool
  every power user ran, run by essentially one guy — Nick Jitkoff — until
  someone hired that guy away from it.
- Jitkoff took it to Google, where it became **QSB (2009)**. Google
  open-sourced it, then did what Google does and buried it in the
  Reader/Inbox graveyard.
- **Spotlight (2005)** shipped the mainstream, defanged version of the
  whole idea — enough to convince the world Apple had done something new,
  just late and watered down.
- **Alfred (2010)** productized the vacuum that Quicksilver left behind.
- **Raycast (2020)** took Alfred's shape, added an extension store, and
  got credited with inventing the category by everyone who showed up that
  year.

And meanwhile Quicksilver's corpse *still ships releases on GitHub*,
maintained by hobbyists with no funding and no roadmap. It never even
properly died — it just stopped being cool, which as far as Silicon Valley
is concerned is the same thing.

## The pattern underneath

This is the part worth keeping, because it's the same one in reverse from
the floating-windows shower thought: **UI history doesn't accumulate, it
re-runs.** Tabs were BeOS window handles. Launchers were LaunchBar in
'95. Virtual desktops were a 1986 X10 hack. Tiling was Ratpoison and
acme. Every platform generation forgets and reinvents the same handful of
primitives, and whoever re-ships them gets all the credit.

The only variable that decides who's remembered is extensibility.
Quicksilver mattered because it was a *plugin culture*, not a hotkey.
Raycast won because it's a *store*, not a feature. Same shape, twenty
years apart, and the store got paid rent.

## Charging rent for it

Here's what actually galling about Raycast specifically: the thing it's
selling a subscription for has been free software on this very platform
for twenty years. LaunchBar did it in '95 for whatever the shareware cost,
Quicksilver was free, Alfred's base has been a free download for
fifteen years. You do not get to put an ocean of Electron between a user
and a hotkey, demand money monthly, and then act like you're owed the
"power user" demographic. You're a SaaS lease on a 1995 idea wearing a
2020 haircut.

## What sticks around

The design lesson, which has real teeth for the god menu: **the command
*registry* is the product and the menu is its renderer.** Get the
action-registration seam right — commands as first-class shell verbs,
extensible by any app, not locked inside a single vendor's store — and
the origin of the pattern stops mattering. An action is just a verb
with a target.

Quicksilver's comma-trick was this: object → action → argument. That
seam is what made it a culture instead of a feature. The hotkey was
disposable; the grammar was the thing. Anyone re-shipping a launcher in
2046 will be selling some dressed-up version of that same grammar, and we
should all be able to say "oh, right, Quicksilver already did that."

## Verdict

Raycast is not the invention. It's the fourth or fifth re-ship of a
primitive that predates macOS, delivered in a web browser runtime, sold
to you monthly for the privilege. It's Alfred with an app store and a
sub, graduate school for the people who think dot-com discovery is
invention.

Pig pile complete. In 2046 someone ships a fancy new launcher for
VirelaiOS and gets credited with inventing it — that's a feature of the
cycle, not a bug. The only thing you can control is which seat you're in.
Be LaunchBar. Be Quicksilver. Do not be Raycast.