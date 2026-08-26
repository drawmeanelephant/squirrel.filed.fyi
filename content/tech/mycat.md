---
title: myCat — Desktop Cat Companion
parent: tech/index
tags: [desktop-pet, python, qt, fun, ai, ollama]
status: published
summary: A transparent animated desktop cat with Ollama chat, Stable Diffusion character creation, and banner-plane reminders. Python + PySide6, cross-platform, pure joy.
relations: [relates_to=log/2026-08-25-mycat]
---

# myCat

Filed from [[log/2026-08-25-mycat]].

## What it claims to be

A desktop cat. Just a little guy who sits on your screen. Frameless Qt overlay, transparent background, draggable, remembers where you left it. The tagline is "Desktop Cat: QT Overlay" and it delivers exactly that.

## What it actually is

It's way more than a desktop cat, and that's the problem — in the best way.

**The core loop:** A transparent PySide6 window renders an animated GIF. Static first frame for a few seconds, then the GIF plays once, then back to static. You drag it around. It sits there. It's a cat. That alone would be enough.

**But then they added:**

- **Ollama chat** — right-click the cat, talk to it through a local LLM. No API key, no cloud, everything stays on your machine. You're having a conversation with your desktop cat.
- **AI character generation** — feed it 1–3 photos, write a prompt, generate a custom chibi cat via OpenAI API or self-hosted Stable Diffusion (AUTOMATIC1111/ComfyUI). Reference photos are never stored. The result is just a local GIF zip you can reuse or delete.
- **Banner-plane reminders** — set a message and time, and a little plane flies across the top of your screen carrying a banner. One-shot or daily. This is the feature that gets me.
- **Activity tracking** — counts key presses and clicks (never which keys) on Windows/macOS/Linux/X11. Wayland degrades to cursor path recording only.
- **Multilingual UI** — English, Korean, Russian, Simplified Chinese. Translations live in plain JSON files, adding a language is just dropping in a file.

## Where it breaks

It doesn't, really. The scope is ambitious but everything is optional — you can just run the cat and never touch Ollama or AI generation. The Docker setup exists but requires X server forwarding which is always a pain. Linux transparency needs a compositor. The codebase is clean Python, 233 commits, well-structured with separate modules for render, serve, embed, and the main app.

## What sticks around

The reminder planes. I cannot overstate how much joy a tiny banner plane flying across your screen carrying a message like "DRINK WATER" delivers. The cat itself is charming — the GIF animations are smooth, the always-on-top behavior works, and it remembers its position between sessions.

The Ollama integration is surprisingly practical. Having a local chatbot that lives on your desktop as a cat is a different UX than opening a terminal or browser tab. It changes the relationship with the tool.

## Verdict

This is what happens when someone builds a desktop pet with the same seriousness as a production app — Docker support, CI/CD, prebuilt binaries for every platform, multilingual UI, activity tracking — and then also makes it a cat. The technical execution is solid (Python + PySide6, cross-platform, pip installable), but the real achievement is the vibe. It's fun. Install it, talk to your cat, let it remind you to drink water via banner plane. That's enough.
