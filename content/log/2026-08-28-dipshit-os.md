---
title: "DipshitOS — From-Scratch AArch64 OS in Zig on Apple Silicon"
parent: log/2026-08
tags: [link, dev, zig, os, apple-silicon, kernel]
status: published
summary: "From-scratch AArch64 operating system. Freestanding Zig kernel, boots on real UEFI firmware via Apple Virtualization.framework. No Linux, no libc, no POSIX. 27 milestones shipped."
published_at: "2026-08-28T00:00:00Z"
relations: [relates_to=dev/dipshit-os]
---

# DipshitOS — From-Scratch AArch64 OS in Zig on Apple Silicon

- Source: [github.com/drawmeanelephant/DipshitOS](https://github.com/drawmeanelephant/DipshitOS)
- Verdict: keep
- Why: From-scratch AArch64 operating system written in freestanding Zig. Boots on real UEFI firmware via Apple Virtualization.framework on Apple silicon (macOS 27+). No Linux, no Unix, no libc, no POSIX, no QEMU. Twenty-seven milestones shipped as of August 2026. The README only documents through milestone 13 — the real status is ahead of the docs. Full stack from bootloader to GUI applications, all in freestanding Zig, all verified on real Apple silicon hardware. Documentation site compiled by Boris.
