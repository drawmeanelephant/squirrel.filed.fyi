---
title: Canvas UI
parent: dev/index
tags: [dev, ui, webgl, components, canvas, open-source]
status: published
summary: 35 creative canvas and WebGL components — particle reveals, glass, liquid, shatter, VHS. Framework agnostic, shadcn protocol, AI-ready.
relations: [relates_to=log/2026-08-27-canvasui]
---

# Canvas UI

Filed from [[log/2026-08-27-canvasui]].

## What it claims to be

An open-source library of tasteful HTML-in-Canvas and WebGL components. 35 effects, six framework flavors (React, Solid, Preact, Vue, Svelte, vanilla TypeScript). Copy, paste, ship. Uses the shadcn protocol so AI agents can browse and install components from a single prompt.

## What it actually is

A component library where every effect renders on the GPU via WebGL, animating outside the framework's render cycle. The components initialize only when mounted, pause when off-screen, and clean up fully on unmount. Reduced-motion preferences are respected.

**The effects.** Particle Reveal (radius-based content reveal through particles), Blaze (fire/distortion), Liquid (fluid simulation), Glass (refraction/blur), Shatter (fragmentation), VHS (scan lines and chromatic aberration), plus Laser, Clouds, Bubble, Droplets, Magnify, Grid, and Ripple. Each ships as a self-contained component with configurable props.

**The HTML-in-Canvas part.** Some components (Blaze, Liquid, Glass, Shatter, etc.) rely on an experimental browser capability — HTML-in-Canvas — that's available today in Chrome behind a flag. Everywhere else they degrade gracefully: your content renders as regular HTML, and the WebGL overlay keeps running on top of it. WebGL-only components work in every modern browser. The degradation story is solid — you don't lose content, you lose the canvas effect.

**The shadcn protocol.** The registry speaks shadcn, so any assistant with the shadcn MCP server can browse the library, read docs, and install components from a single prompt. `npx shadcn@latest add @canvas-ui/particle-reveal-react` drops the component into your repo. Code is copied, not imported — nothing updates from under you.

**The license.** MIT + Commons Clause. Use every component in any personal or commercial app, free forever. The only restriction is reselling or redistributing the components themselves — alone, in a bundle, or as a port.

## Where it shines

The "AI-ready" framing is the real differentiator. Most component libraries assume you'll browse docs, copy code, and wire it up manually. Canvas UI assumes an agent will do it — the shadcn MCP server integration means a single prompt can browse, select, and install. Francisco Macedo's quote nails it: "The state of the art for products in the age of AI: building blocks that work well and are easy for an LLM to use."

The framework coverage is unusually complete. Six flavors of every component, same engine and props across all of them. That's a lot of maintenance surface, but it means you're never locked out by your stack choice.

The graceful degradation for HTML-in-Canvas is the right call. Chrome behind a flag is the full experience; everywhere else you get the content as regular HTML with WebGL overlays for the effects that don't need canvas-level control. No content loss, no broken layouts.

## Where it breaks

The HTML-in-Canvas API is experimental and Chrome-only behind a flag. The full effects require that flag — everywhere else you're getting the degraded version. That's a real limitation for production use if your audience isn't Chrome-heavy.

MIT + Commons Clause means you can use it commercially but can't resell the components. That's a reasonable license for a component library, but it's not pure MIT — the Commons Clause adds a restriction that some people will miss in the fine print.

The library is young (35 components, "and counting"). The ecosystem around it — docs, examples, community components — is still early.

## What sticks around

The shadcn protocol integration is the bet that matters. If AI agents become the primary way people install and use component libraries, being agent-discoverable and agent-installable is the moat. Canvas UI is ahead of the curve on this.

The WebGL-outside-the-render-cycle architecture is the other bet. Animating on the GPU, outside React's reconciliation, with proper lifecycle management (mount, off-screen pause, unmount cleanup) — that's the pattern for performant visual effects in modern frameworks. Other libraries will copy this.

The effects themselves are the immediate value. Particle Reveal on a hero section, Glass on a card, VHS on a loading state — these are the kinds of touches that make a landing page memorable without requiring a creative developer to hand-code WebGL shaders.

## Verdict

This is the most complete creative component library that exists for the canvas/WebGL space. 35 effects, six frameworks, shadcn protocol, graceful degradation, GPU-rendered, reduced-motion aware. The AI-ready integration via shadcn MCP is the feature that makes it feel like 2026 instead of 2023. If you're building landing pages, marketing sites, or creative portfolios and want effects that go beyond CSS transitions, this is the library to reach for. Copy, paste, ship — and let the agent handle the installation.
