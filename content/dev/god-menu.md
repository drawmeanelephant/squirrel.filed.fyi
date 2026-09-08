---
title: "The God Menu: A Command Registry, Not a Launcher"
parent: dev/index
tags: [dev, god-menu, launcher, command, design, shell, quicksilver]
status: published
summary: "The command registry is the product and the menu is its renderer. Commands as first-class shell verbs, extensible by any app, so the god menu is the grammar and anyone re-shipping it in 2046 just gets credit for a rent-free idea."
relations: [relates_to=tech/raycast]
---

# The God Menu: A Command Registry, Not a Launcher

The design conclusion from the [[tech/raycast]] post, written down so it
has a place to live: **the command registry is the product and the menu
is its renderer.** Everything else is a consequence of that sentence.

## The thesis

Launchers keep winning and losing for the wrong reasons. The hotkey gets
the credit, the extension store gets the rent, and the actual primitive —
"type to find a thing and do a thing to it" — has been re-shipped on this
platform every five years since before the platform existed. The only
variable that survives the cycle is extensibility. Quicksilver mattered
because it was a *plugin culture*; Raycast won because it's a *store*.
Both are the same idea wearing different business models.

So the god menu stops being a launcher and becomes a **registry of
actions** — a contract any app can hand verbs to. The menu is just the
part you keyboard at.

## The seam

The whole design lives in one seam: **the action-registration contract.**
Commands are first-class shell verbs, not menu items pasted into a
front-end. An app registers a verb with three facts:

- **the object it acts on** — a file, a window, a selection, a URL,
  an app, a search
- **the action** — open, copy, send, run, transform
- **the argument** — what the action should reach for

That's the Quicksilver comma-trick made structural: *object → action →
argument.* The verb grammar is the surface of the API, not a hidden
detail. If you can say `file, send, bob` you can type it, and if you can
type it you can script it. There is no separate "programming model."
There is only the grammar, and everything is an instance of it.

## The menu is disposable

Because the registry is the product, the front-end can be thrown away and
rebuilt without losing anything. The registry survives theme changes,
hotkey changes, input-model changes — even platform changes. Replace the
renderer, keep the registry, and every app that registered its verbs
still works. That inversion is the whole trick: **vendors build evergreen
front-ends around a rented store; the god menu builds no front-end twice
and keeps the grammar.**

This is also what makes extensibility more than a slogan. A verb is just a
file or a function with a declared shape. Any app, any script, any tool
can register one without forking, without a store review, without
monkeypatching. Registration is public, the way shell commands are
public — which is exactly why you can't squat on it.

## Why this is the right bet

The [[log/2026-08-30-raycast|raycast entry]] and the essay it fed make the
historical case: UI primitives get reinvented every generation, and the
reinventor gets the credit. You can't prevent that; it's the nature of
the cycle. What you *can* control is which side of the permanence you sit
on. Quicksilver's grammar outlived its developer, its company, its
relevance, and is still being rediscovered. Raycast's store will live
exactly as long as Raycast's servers do.

So: build the registry and the grammar now, render it simply, and let the
world re-ship pretty menus around it for twenty years. In 2046 someone
ships "the god menu for VirelaiOS" and gets interviewed about their
invention, and everyone who remembers will sigh and say the grammar did
it first. That is not a bug. That is the seat to be in.

## Open questions

As with any design that isn't shipping, there are honest gaps:

- the **permission model** for verbs — how much can a registered action
  do before it has to ask, and who decides the default?
- the **discovery surface** — how a registered verb gets found, tagged,
  and indexed when the registry has no curated store behind it
- how far the "everything is `object, action, argument`" purity goes
  before it fights back against verbs that are really two-argument scripts

These get settled against real use, not ahead of it. The registry first;
then split the different kinds of front-end off and see which one feels
right. The menu really is the last problem to solve.