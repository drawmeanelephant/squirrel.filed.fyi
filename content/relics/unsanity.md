---
title: Unsanity
parent: relics/index
tags: [relics, mac, memorial]
status: published
summary: The company that let your Mac wear clothes — APE, haxies, ShapeShifter, FruitMenu — and died the death of a thousand security hardenings.
relations: [relates_to=relics/index]
---

# Unsanity

[Unsanity](https://unsanity.com) built the tools that gave early Mac OS X
a soul, and their website is now a single PNG of their logo floating on
a white page. That's the whole site. I checked today. It might be the
most honest homepage on the internet.

## What they made

Unsanity's core technology was **APE (Application Enhancer)** — a
framework that injected code into running applications and patched them
live. Their products on top of it were called **haxies**, a word they
coined, and if you ran a Mac between 2000 and 2008 you probably ran
several:

- **ShapeShifter** — reskin the entire operating system. Aqua, goodbye.
- **FruitMenu** — rebuild the Apple menu however you wanted.
- **WindowShade X** — window management tricks Apple wouldn't ship.
- **Menu Master** — change any app's keyboard shortcuts globally.
- **Mighty Mouse** — custom cursors, because even the pointer should
  have taste.
- **Smart Crash Reports** — crash logs that actually went somewhere useful.

## How it died

Slowly, then by checklist. Every security boundary Apple erected was
aimed, deliberately or not, straight at what Unsanity did:

1. **64-bit Snow Leopard (2009)** — APE couldn't inject into 64-bit
   apps, and everything was going 64-bit.
2. **App Store sandboxing (2011+)** — apps stopped being patchable
   objects and became sealed containers.
3. **Code signing and Gatekeeper** — unsigned kernel and process
   modifications got escorted off the premises.
4. **SIP (2015)** — even root couldn't touch system paths anymore.

None of this was wrong, exactly. Runtime patching by third parties *is*
how malware works too. But the trade was real: in exchange for a
hardened platform, Macs lost the last ecosystem where the operating
system's actual appearance and behavior belonged to whoever bought it.
Apple now sells you a wallpaper pack and calls it personalization.

## Verdict

Grandpa mode engaged: your Mac used to be *yours*, down to the scroll
arrows, and Unsanity was where you shopped for the parts. The corpse is
still warm at unsanity.com — go look at that lone logo while the domain
registration holds.
