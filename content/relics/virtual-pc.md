---
title: Virtual PC
parent: relics/index
tags: [relics, mac, emulation, memorial]
status: published
summary: Connectix Virtual PC, later Microsoft's — a whole x86 PC faked in software on PowerPC Macs, plus the court case that made emulation legal.
relations: [relates_to=relics/index]
---

# Virtual PC

Before Parallels, before Boot Camp, before your laptop ran Windows ARM
VMs like it was nothing, there was
[Virtual PC](https://en.wikipedia.org/wiki/Virtual_PC_for_Mac): a
PowerPC Mac pretending, entirely in software, to be an entire Intel
computer. Processor, BIOS, video card, the works. You installed Windows
98 inside a window on your Macintosh and it *ran*. Slowly. And we were
grateful.

## Connectix did it first

Virtual PC came from
[Connectix](https://en.wikipedia.org/wiki/Connectix), a San Mateo
company with a gift for doing things that sounded illegal:

- **RAM Doubler** — made your 8MB of memory act like more, somehow.
- **[Virtual Game Station](https://en.wikipedia.org/wiki/Connectix_Virtual_Game_Station)** —
  a PlayStation emulator for PowerPC Macs, released 1999. Sony sued.
  Connectix won on appeal: [*Sony v. Connectix*](https://en.wikipedia.org/wiki/Sony_Computer_Entertainment,_Inc._v._Connectix_Corp.)
   (9th Cir. 2000) held that reverse-engineering a console to make an
  emulator was fair use. That case is load-bearing for every emulator
  project that exists today.
- **Virtual PC** — the flagship. Dynamic recompilation translating x86
  to PowerPC on the fly, fast enough to be miserable instead of
  unusable. Office documents opened. Doom ran. Nobody cared that it was
  a quarter of native speed; the alternative was owning a second
  computer shaped like a beige pizza box.

Microsoft hated the idea so much they bought it — Virtual PC landed at
Redmond in 2003, and shipped as Microsoft Virtual PC through version 7
for OS X.

## How it died

Ironically. Virtual PC emulated x86 chips using PowerPC code. When Macs
switched *to* x86 in 2006, the product's entire premise evaporated
overnight — Intel Macs could run Windows natively or virtualize it at
near-native speed, and Microsoft had zero interest in porting an
emulator whose job was making Intel pretend to be Motorola.
[Parallels Desktop](https://www.parallels.com/) shipped that exact year,
ate the category in one bite, and Virtual PC became a trivia answer.

## Verdict

Kids today complain about VM setup wizards taking two clicks. We watched
an entire fake Pentium boot Windows 95 from within a window on a G3, at
the speed of continental drift, and we said thank you. Pepperidge Farm
remembers. So does case law.
