---
title: DipshitOS
parent: dev/index
tags: [dev, zig, os, kernel, apple-silicon, aarch64, uefi, virtualization]
status: published
summary: A from-scratch AArch64 operating system. Freestanding Zig kernel booting real UEFI firmware on Apple silicon. No Linux, no libc, no POSIX. 27 milestones shipped.
relations: [relates_to=log/2026-08-28-dipshit-os]
---

# DipshitOS

Filed from [[log/2026-08-28-dipshit-os]].

## The Origin

The project started on August 5, 2026, when Gemini / Antigravity assigned the workspace a random two-word slug: `calm-lavoisier`. It could have been `eager-curie` or `distracted-turing`. The universe chose `calm-lavoisier`, and the name became the philosophy — Antoine Lavoisier, the Father of Modern Chemistry, who dragged alchemy into the light of rigid quantitative measurement. The project's first rule: "State what was directly observed versus inferred. Never present a guess as a result." Every memory page balanced like a chemical equation. Every subsystem verified against real hardware. 359 commits, 180 pull requests, six epic battles — including the Great KERNEL.TXT Scramble and the 1530-Byte Virtio-Net RX Wall. The memorial to `calm-lavoisier` is the project's soul.

## What it claims to be

A from-scratch AArch64 operating system. Not Linux-based. No libc, no POSIX. Kernel written in Zig, booting real UEFI firmware on Apple silicon via Apple's Virtualization.framework (macOS 27 or newer). The name is a joke. The engineering is not.

## What it actually is

DipshitOS is a fully functional operating system built from zero — bootloader, kernel, userspace, networking stack, graphics stack, window manager, filesystem, and GUI applications — all in freestanding Zig. It boots on real Apple silicon hardware through Virtualization.framework, not QEMU, not an emulator. The guest is bare metal Zig; the host launcher is Swift.

**The boot path** starts in `boot/` — an AArch64 UEFI bootloader that hands off to the kernel in `kernel/`. The kernel is freestanding Zig with no libc, no POSIX, no existing guest OS. Every subsystem is either verified deterministically (Class A) or live-gated on real hardware (Class B). The build pipeline produces a GPT+FAT32 disk image that boots under Virtualization.framework.

**The kernel proper** includes a custom allocator, a scheduler, EL0 + syscalls for userspace, and process management (IPC, wait, kill). The syscall interface is documented in ADR 0007 with numbered slots — each new capability gets a slot number and a formal decision record.

**The networking stack** is built from scratch: virtio-net driver → ARP → IPv4/ICMP → UDP → DHCP → TCP. Not borrowed from lwIP or any existing stack. A bounded RFC 1035 DNS client and an HTTP/1.0 client (FETCH.BIN) sit on top. The CHAT.BIN graphical chat application is the capstone that proves the stack works end-to-end.

**The graphics stack** started with a framebuffer, evolved into the "Road Pops" terminal emulator, then the "Driving Award" window manager — all part of a drunk driving themed interface that commits fully to the bit. The terminal is Road Pops, the window manager is Driving Award, the OS is DipshitOS. The vibe is [DUI by the Pilbilly Knights](https://www.youtube.com/watch?v=wwe-UW2IkfI): rigorous engineering wrapped in deliberate absurdity. The GUI contract (ADR 0011) defines a zero-heap micro-widget toolkit. Four real applications ship: CALC.BIN, NOTEPAD.BIN, TOP.BIN, and DESKTOP.BIN. The desktop launcher reads an APPS.TXT manifest — it doesn't hardcode its app list.

**The filesystem** supports mutation — syscalls for delete, rename, truncate, and free (ADR 0007 slots 34–37). FILE.BIN is a graphical file browser. The application identity manifest (APPS.TXT) means the desktop discovers apps dynamically.

**Milestones 17–27 and Arcs 1–5** (as of August 2026) — the README only documents through milestone 13. The real status is significantly ahead of the public docs. Fifteen closed milestones visible on GitHub:

- **M17**: Desktop completeness — dropdowns, alt-tab, snap, multi-notepad, file preview, settings, calc history, dock
- **M18**: Terminal & shell depth — scrollback, selection/copy/paste, history, ANSI/VT, job control, env vars, scripting
- **M19**: Shell as programming environment — pipes, redirection, conditionals, loops, functions, globbing, exit status
- **M20**: Text rendering & Unicode — multiple font sizes, glyph tables, grapheme clusters, emoji, text shaping
- **M21**: Window management depth — tiling, master-detail, minimize, workspace alt-tab, notification center, fullscreen, always-on-top, window persistence
- **M22**: Developer tools — ELF loader, assembler, symbols, disassembler, strace, ps, dmesg, sysinfo
- **M23**: The text editor (EDIT.BIN) — buffers, tabs, undo/redo, syntax, macros, command palette, crash recovery
- **M24**: CALC grows up — programmer mode, scientific, trig, unit conversion, matrices, statistics, CLI mode
- **M25**: File manager depth — bulk ops, properties, trash, batch rename, split panes, favorites, file associations
- **M26**: Network experience — ping, netstat, DNS lookup, bandwidth, connection manager, download manager, profiles
- **M27**: Desktop polish — boot splash, about, previews, sounds, sysmon, tooltips, shortcuts, dogfood

Five parallel arcs for deeper subsystem work:

- **Arc1**: Widget toolkit depth — ScrollView, Checkbox/Toggle, ProgressBar, Dialog, HScrollBar
- **Arc2**: Window management ABI — compositor, window chrome, drag-to-resize, system tray, right-click
- **Arc4**: Rich interactions — mouse wheel, drag-and-drop, animations, notifications, workspaces, unsaved state
- **Arc5**: System polish — crash tombstones, shutdown, compose, resource limits, settings migration

The canonical status accounting lives in `docs/status.md`. The milestone pace has been relentless — and the README is fourteen milestones behind.

**The verification model** is worth noting. Class A evidence (formatting, unit tests, byte-identical console transcripts, build pipeline) runs in CI on every push. Class B evidence (live VM boot on Apple silicon) cannot run in CI — it requires real hardware. The project separates these honestly instead of pretending CI covers everything.

**The documentation** lives in `docs/` — claims, ADRs (Architecture Decision Records), status, hardware contract, gate inventory, and the memorial to calm-lavoisier. The public documentation site is compiled by Boris and published to GitHub Pages. This is a project that documents its decisions as carefully as its code.

**The license** is source-available, not open source. The code is publicly visible for review and learning, but you may not use, modify, redistribute, or incorporate it without written permission. "Forks are not freedom."

## The stack

Zig throughout — freestanding, no libc, no POSIX. Swift for the Virtualization.framework host launcher. AArch64 UEFI for the boot path. Virtualization.framework for the VM (not QEMU). GPT+FAT32 for the disk image. Python 3 and bash for build tooling. Just for task running. Boris for documentation compilation.

## Where it breaks

It requires Apple silicon and macOS 27+. No x86, no Linux hosts, no older macOS. If you're not on recent Apple hardware, you can't run it.

It's a single-developer project (as far as the public repo shows). The milestone pace is impressive — fifteen closed milestones with hundreds of issues — but bus factor is one. The source-available license means nobody can fork it if something happens to the project.

The networking stack is IPv4 only. No IPv6. The HTTP client is HTTP/1.0. The filesystem is minimal. These are honest limitations for a from-scratch OS, but they're limits.

The Class B verification (live VM boot) can't run in CI. It requires real Apple silicon hardware. This means the live-gated features are verified manually, not automatically. The project is honest about this gap.

## What sticks around

This is a from-scratch operating system that boots on real Apple silicon hardware. Not a toy, not a tutorial project — a fully functional OS with networking, graphics, a window manager, GUI applications, a filesystem, a shell with pipes and functions, a text editor with macros, a calculator with scientific mode, a file manager with batch rename, developer tools with an ELF loader and disassembler, Unicode rendering with emoji support, and a desktop with tiling, workspaces, and a notification center. Fifteen closed milestones visible on GitHub, each one verified either deterministically or on real hardware.

The architecture decision record (ADR) discipline is the hidden story. Every subsystem has a formal decision record with a slot number, a rationale, and a verification gate. This isn't just code — it's a documented engineering process that happens to produce an operating system.

The Zig connection matters. Freestanding Zig with no libc means every byte is explicitly managed. The same philosophy that makes Boris fast and Ghostty fast makes DipshitOS possible — explicit control, no hidden allocations, compile-time safety. Three projects, same language, same ethos, wildly different scales.

The documentation site compiled by Boris is the meta-detail that ties it all together. The OS documentation is generated by the same static site compiler that powers squirrel.filed.fyi. Same toolchain, same philosophy, different output.

## Verdict

DipshitOS is the most ambitious Zig project I've seen. A from-scratch AArch64 operating system booting on real Apple silicon, with a networking stack, graphics stack, window manager, filesystem, and GUI applications — all in freestanding Zig, all verified against real hardware. Fifteen closed milestones and five arcs, hundreds of issues closed, each one verified against real hardware. The engineering is serious, the documentation is thorough, and the milestone pace is relentless. The source-available license is a deliberate choice: learn from it, don't fork it. If you want to understand what Zig can do when someone pushes it to the absolute limit, this is the project to read.
