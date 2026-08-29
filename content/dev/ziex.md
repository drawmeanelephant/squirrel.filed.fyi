---
title: Ziex
parent: dev/index
tags: [dev, zig, web-framework, performance, ssr]
status: published
summary: A full-stack web framework for Zig with JSX syntax, 35k req/s SSR, 6.7MB memory, and a 14MB Docker image. Compiles to a single binary or WASI module.
relations: [relates_to=log/2026-08-28-ziex]
---

# Ziex

Filed from [[log/2026-08-28-ziex]].

## What it claims to be

A full-stack web framework for Zig — JSX-like syntax transpiled to efficient Zig code. Compile-time safety, deterministic performance, absolute simplicity. Deploy as a standalone binary, WASI module, or static site. Built by the team at [ziex.dev](https://ziex.dev/).

## What it actually is

Ziex is a server-side rendering framework that takes JSX-flavored `.zx` files and compiles them into a single Zig binary. The component model is function-based — each component is a Zig function that returns a `zx.Component`. Props are structs, control flow is native Zig (`if`, `while`, `switch`), and memory is explicitly managed through allocators passed as the first parameter.

**The rendering model** is hybrid by default. Server components run on the server and produce HTML. Client components are marked with `@rendering={.client}` and hydrate on the client side — state management, event handlers, the full interactive lifecycle. The split is explicit in the source, not inferred by a compiler heuristic.

**File system routing** maps folders to routes. A `pages/[id]/page.zx` file becomes a dynamic route. API endpoints are `route.zig` files with exported handler functions (`GET`, `POST`, `PUT`, etc.). WebSocket support is a single `ws/route.zig` file. No configuration — just files in folders.

**The benchmark numbers** are the headline. In a Docker container limited to 2 CPU cores and 2GB RAM, hitting 3000 requests at 30 concurrent connections:

- Ziex: 35,732 req/s, 0.67ms P50, 3.73ms P99, 6.7MB peak memory
- Leptos (Rust): 8,778 req/s, 2.90ms P50, 9.51ms P99, 6.7MB peak memory
- Next.js: 267 req/s, 102.28ms P50, 282.14ms P99, 252MB peak memory

The CPU utilization is the one that matters more than raw throughput. Ziex at 15.8% average CPU to serve 35k req/s means it has massive headroom. Next.js is at 68.8% average CPU to serve 267 req/s — it's redlining just to stay alive. The Docker image is 14MB vs 275MB. The binary is 6.2MB.

**Component caching** is built in. `@caching="10s"` on a component memoizes its output for the TTL. Page-level caching is configured through `PageOptions`. No Redis, no external cache layer — it's in-process, determined at compile time.

**Memory model** follows Zig's explicit allocation philosophy. Every component receives an allocator as its first parameter. The arena allocator pattern means bulk allocation and bulk deallocation — no per-object malloc/free, no GC pauses, no hidden allocations. Peak memory and idle memory are nearly identical (6.7MB vs 1.9MB), which tells you the allocator is doing its job.

**Deployment targets** cover the full range. Standalone binary for Linux/macOS/Windows. WASI module for Cloudflare Workers and Vercel Edge. Static site generation for GitHub Pages, Netlify, S3. Cross-compilation from any host to any target — the Zig toolchain handles it natively.

**The JSX-to-Zig transpilation** is the clever part. You write what looks like JSX but with Zig syntax — `{if (condition) (<span>yes</span>)}` instead of JSX expressions. The transpiler converts this to Zig struct construction and function calls. It's not a runtime framework pretending to be JSX — it's actual Zig code that happens to be written in a familiar syntax.

## The stack

Zig throughout. No JavaScript runtime, no Node.js dependency, no build system beyond Zig's own `zig build`. The CLI (`zx`) handles project scaffolding, dev server with hot reload, and production builds. Editor extensions for syntax highlighting. Supports Zig 0.15, 0.16, and 0.17-dev.

## Where it breaks

It's v0.1.0-dev. The version number is honest. There's no ecosystem yet — no component library, no auth integrations, no ORM, no deployment guides beyond "compile and run." The documentation is the website itself, not a docs site. The code examples on the homepage are the primary reference.

The community is small. The GitHub repo exists but there's no Discord, no forum, no Stack Overflow tags. If you hit a bug, you're reading Zig source code and opening GitHub issues.

The JSX syntax is familiar but not standard. If you're coming from React, you'll recognize the shapes but every component is a function call, not a class or hook. The mental model shift is small but real — you're writing Zig that happens to look like JSX, not JSX that happens to run on Zig.

There's no story yet for database access, authentication, session management, or background jobs. The framework handles rendering, routing, and API endpoints. Everything else is your problem.

## What sticks around

The performance numbers are real and the architecture backs them up. This isn't a framework optimized for benchmarks — it's a framework that's fast because Zig is fast and the memory model is explicit. When the ecosystem catches up (it will, if the Zig web community grows), the performance floor is already absurd.

The single-binary deployment model is the feature that matters most in practice. No Node.js runtime to install, no `node_modules` to ship, no container to optimize. A 6.2MB binary that starts in 287ms and serves 35k req/s with 6.7MB memory. That's a fundamentally different operational profile from the JavaScript ecosystem.

The WASI target is the strategic play. Edge computing is growing, and a framework that compiles to WASI natively — without a JavaScript runtime, without a container — can run on Cloudflare Workers, Vercel Edge, Fastly Compute, and any other WASI-compatible runtime. The binary is 6.2MB; the WASI module is likely smaller.

For Boris specifically: if the static site compiler ever needed dynamic features (API routes for the intake workflow, real-time updates, a backend for the agent pipeline), Ziex is the obvious choice. Same language, same deployment model, same philosophy of explicit control over implicit magic. A Boris-generated site could embed a Ziex binary as its dynamic backend without adding a second language to the stack.

## Verdict

Ziex is what happens when someone applies Zig's philosophy — explicit control, no hidden allocations, compile-time safety — to web development. The benchmarks are serious, the architecture is sound, and the deployment model is clean. It's too early for production use (v0.1.0-dev, no ecosystem, minimal docs) but the foundation is solid. If the Zig web community grows, this is the framework they'll build on. For now, it's the most interesting thing happening in the Zig web space. Worth watching, worth filing, not yet worth betting on.
