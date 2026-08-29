---
title: Ghostty
parent: dev/index
tags: [dev, zig, terminal, mac, gpu, native]
status: published
summary: Mitchell Hashimoto's terminal emulator written in Zig. Native UI, GPU-accelerated, libghostty embeddable library. 60k GitHub stars and the Zig ecosystem's breakout application.
relations: [relates_to=log/2026-08-28-ghostty]
---

# Ghostty

Filed from [[log/2026-08-28-ghostty]].

## What it claims to be

A fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration. Built by Mitchell Hashimoto (HashiCorp founder) as a passion project. Written in Zig. 60k GitHub stars.

## What it actually is

Ghostty is a terminal emulator that refuses to compromise on the three things terminal emulators usually force you to choose between: speed, features, and native UI. It ships as a native app on each platform — SwiftUI on macOS, GTK4 on Linux — with a shared core written in Zig called libghostty.

**The architecture** is the story. libghostty is a cross-platform, zero-dependency C and Zig library that handles terminal emulation, font handling, and rendering. The GUI applications are consumers of libghostty — they provide the windowing, menus, and platform integration while libghostty does the actual terminal work. This separation is what allows Ghostty to feel native on every platform without maintaining three separate codebases.

**The rendering pipeline** is multi-threaded with a dedicated read thread, write thread, and render thread per terminal. The renderer uses Metal on macOS and OpenGL on Linux. The read thread has a heavily optimized terminal parser that leverages CPU-specific SIMD instructions. The result is performance in the same class as Alacritty — both are roughly 100x faster than Terminal.app and iTerm — but with far more features and a native app experience.

**Terminal features** include Kitty graphics protocol, Kitty image protocol, synchronized rendering, light/dark mode notifications, hyperlinks, clipboard sequences, and a comprehensive xterm conformance test suite. The feature set is wider than most terminal emulators — Ghostty supports more modern sequences than almost any competitor.

**Application features** include native tabs, splits, window renaming and coloring, drop-down terminal on macOS, theme switching on system dark/light mode, Quick Look integration, force touch, secure input API, and built-in window state recovery on restart. On Linux, it integrates with systemd for always-on, single-instance, and cgroup isolation.

**libghostty** is the strategic play. It's already being used by third-party terminal projects. The goal is to stabilize the API and release it as a standalone library so other terminal emulators can focus on higher-level features and UIs without reimplementing the core. libghostty-vt (the parsing and state management subset) is already available for Zig, C, macOS, Linux, Windows, and WebAssembly.

**The macOS app** is a true SwiftUI application — real windowing, menu bars, settings GUI, AppleScript support, Apple Shortcuts (AppIntents). It uses Metal for rendering and CoreText for font discovery. It's a universal binary that works on both Apple Silicon and Intel. Requires macOS 13+ (Ventura or later).

**The Linux app** is written in Zig and uses the GTK4 C API. It compiles as a single Zig compilation unit (not traditional linking). Integrates with systemd when available.

**The Zig connection** matters for this site. Boris is Zig. Ziex is Zig. Ghostty is Zig. The Zig web ecosystem is small but the desktop ecosystem already has a breakout app with 60k stars. If you're building Zig tooling, Ghostty is the natural terminal to run it in — same language, same compiler, same memory model philosophy.

## The stack

Zig throughout the core (libghostty). Swift/SwiftUI for macOS GUI. Zig/GTK4 for Linux GUI. Metal for macOS rendering. OpenGL for Linux rendering. SIMD-optimized terminal parser. No Electron, no JavaScript runtime, no web technologies. A 1.3.1 release as of August 2026.

## Where it breaks

The Windows version is still under development. If you need cross-platform terminal support including Windows, Ghostty isn't there yet.

libghostty is not yet a stable API. It's in use by the macOS and Linux apps but hasn't been tagged with a version or released as a standalone library. The Doxygen docs exist but the API signatures are still in flux.

The crash reporter saves reports to disk in Sentry envelope format but doesn't automatically send them anywhere. You have to manually upload them using the Sentry CLI. The crash reports can contain sensitive information (full stack memory of each thread) — there's no redaction.

It's a passion project, not a full-time job for anyone on the team. Hashimoto is explicit about this. Feature development and bug fixes happen on volunteer time. If you need guaranteed response times or enterprise support, this isn't it.

The configuration is file-based (no GUI settings editor on Linux). The macOS app has a settings GUI but the Linux app expects you to edit config files. Power users love this; everyone else finds it annoying.

## What sticks around

The libghostty architecture is the long-term story. A shared, embeddable terminal emulation library written in Zig with zero dependencies and C-ABI compatibility. Other terminal emulators can build on it without reimplementing the core. The parsing is already proven in production by millions of daily users. When the API stabilizes, it becomes the foundation for a whole ecosystem of terminal emulators that focus on UI and features instead of reinventing VT100 parsing.

The Zig ecosystem angle is real. Boris compiles with Zig. Ziex compiles with Zig. Ghostty compiles with Zig. Three projects, same language, same philosophy of explicit control over implicit magic. The Zig web community is small but the desktop community already has proof of concept — Ghostty is the app that makes people take Zig seriously as a practical language, not just an academic exercise.

For this site specifically: if you're running Boris build commands all day, the terminal you run them in matters. Ghostty's performance advantages are most noticeable in scrollback, search, and large output — exactly the things a static site compiler produces.

## Verdict

Ghostty is the most important Zig project outside the language itself. 60k stars isn't just popularity — it's proof that Zig can produce a production-quality desktop application with native UI, GPU acceleration, and a cross-platform embeddable library. The libghostty architecture is the real legacy: a shared terminal emulation core that other projects can build on. It's a passion project with volunteer development, so the pace is what it is, but the foundation is solid. If you're running Zig tooling, this is the terminal to run it in.
