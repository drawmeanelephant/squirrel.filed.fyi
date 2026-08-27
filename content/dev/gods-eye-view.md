---
title: God's Eye View
parent: dev/index
tags: [dev, osint, geospatial, visualization, cesiumjs, web, voice]
status: published
summary: A spy-satellite simulator in your browser with real data — 13 live OSINT layers, voice control, cockpit mode, no framework.
relations: [relates_to=log/2026-08-27-gods-eye-view]
---

# God's Eye View

Filed from [[log/2026-08-27-gods-eye-view]].

## What it claims to be

A spy-satellite simulator in your browser, except the sources are public and the data is real. Photorealistic 3D globe (CesiumJS + Google Photorealistic 3D Tiles) with live aircraft, ships, satellites, earthquakes, traffic, CCTV, radio, fires, and space missions. Voice control via OpenAI Realtime API. Cockpit mode. No framework — vanilla JavaScript.

## What it actually is

It's the OSINT interface that every intelligence analyst browser-tab堆 was trying to be. Thirteen layers, most of them free, all of them live.

**The layers.** Live flights from OpenSky + adsb.lol (thousands of aircraft, route history). Military ADS-B traffic in amber. Ships from AISStream. ~840 satellites with SGP4 propagation and orbit rings. USGS earthquakes (last 24h). TomTom traffic at street level. ~800 public CCTV cameras projected into 3D space (Austin, California, London). Geolocated world radio with an analog tuner. NASA FIRMS active fires. Space missions (rolling 30-day launches). Mapped military installations from OSM. Bikeshare stations. Plus bundled static data: 4,351 datacenters, 704 dams, 712 submarine cables.

**Cockpit mode.** Click any aircraft, hit COCKPIT, and the camera rides it with real terrain underneath — all the way down to the taxiway. Switch sensors mid-flight (NVG, FLIR, CRT). The cockpit carries a briefing strip: nearby signals, regional headlines, local weather. The aircraft model swaps from glyph to 3D model as you zoom in — per-class models for 787, ATR-72, Citation, Bell 206, MQ-9.

**Voice control.** Click the mic, talk to it. The agent pulls live scene context before answering — coordinates, street names, active layers, view scale. Twenty-eight tools across four jobs: camera direction ("Take me to Tokyo"), annotation ("Outline the state of Texas"), interrogation ("How many flights are over Texas right now?"), and operation ("Switch to night vision and turn on flights"). Entity Q&A — click a plane and ask "what's this?" Visual grounding at street level reads signage from viewport screenshots.

**The engineering.** World-stable icons: aircraft and ships point along their true heading at every camera angle via per-frame screen-space course projection. Smooth motion from choppy data: feeds arrive every 15–30s, the globe renders one interval behind and interpolates with dead reckoning. Honest satellites: SGP4 propagation with GMST realignment, no drift. Geoid-aware entity heights sampled against the terrain mesh — aircraft park on aprons, cameras stand on corners. Budget-governed proxies for paid feeds so an afternoon exploring doesn't torch an API allowance.

**The stack.** Vanilla JavaScript, CesiumJS, Vite. Google Photorealistic 3D Tiles for the planet. OpenAI Realtime API for voice. No React, no Vue, no framework — just modules in `src/` with one file per layer. The `src/data/` directory has one module per layer plus a context store. Voice lives in `src/voice/`. Scenes for cinematic camera tours live in `src/scenes/`.

## Where it breaks

Google Maps is the only required key and it's metered — the photorealistic 3D planet is the whole visual, so there's no free alternative. OpenAI voice is also metered (the app caps at $5 per session and warns at $2, but it's still real money). The project is young — the README is thorough but the codebase will have rough edges.

Some layers are modeled rather than live: keyless traffic is an approximate simulation, camera poses are estimated priors, launch ascents are reconstructed estimates. They're labeled honestly, but it's worth knowing.

Requires Node.js 24.14.x or 26.x — no LTS support yet. The macOS dev script pulls keys from Keychain, which is a nice touch but ties you to one platform for the convenience path.

## What sticks around

The cockpit mode is the killer feature. Riding a real aircraft over real terrain with sensor switching — NVG into FLIR into CRT — is the kind of experience that makes you forget it's running in a browser. The fact that it's built on live ADS-B data, not pre-recorded flights, means every session is different.

The voice control is the other half. Twenty-eight tools, scene-aware context, visual grounding at street level — this isn't a voice assistant bolted onto a map. It's a voice-controlled intelligence workstation where the agent knows what it's looking at and can act on it.

The "no framework" bet is refreshing. Vanilla JS + CesiumJS + Vite means the whole thing is readable in an afternoon. Every layer is one file. The architecture is transparent in a way that framework-built projects rarely are.

The honest labeling is the design philosophy. Every layer shows its source and freshness state — partial, delayed, simulated, unavailable. Nothing pretends to be more real than it is. That's rare in a space where most tools overstate their data quality.

## Verdict

This is what happens when someone builds the OSINT tool they actually want to use and then open-sources it. The 13 live layers, cockpit mode, voice control, and honest data labeling make it the most complete browser-based geospatial intelligence interface that exists. The "forbidden cockpit" aesthetic is half the appeal — the other half is that every source is public, every line of code is inspectable, and the data is real. Start with zero keys, add Google Maps for the full experience, and prepare to lose an afternoon.
