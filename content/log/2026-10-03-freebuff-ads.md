---
title: Freebuff started selling ads — 500k developers, $500 to get in
parent: log/2026-10
tags: [link, ai, agents, ads]
status: draft
summary: Freebuff opened a self-serve ad platform to 500,000 developers — pay-per-click spots in the CLI, desktop, web, and mobile, a flat-$0.50 engagement marketplace, and Greptile already running in the ad rail.
published_at: 2026-10-03T00:00:00Z
relations: [relates_to=log/2026-08-25-freebuff]
---

# Freebuff started selling ads — 500k developers, $500 to get in

- Source: https://freebuff.com/advertisers (sent by owner, 2026-10-03)
- Verdict: keep
- Why: the ad-funded free coding agent from [[log/2026-08-25-freebuff]]
  stopped being the buyer's problem and became the seller's business.
  Two months ago the pitch to users was "text ads between agent turns
  pay for your models." Now there's an ads console, a rate card, an
  engagement marketplace, and logos already running inside the app —
  including the one in the screenshot below. Worth a note because the
  owner is on this thing daily, and because "free AI funded by ads"
  just turned into "AI ad network aimed at developers."

## What actually launched

Freebuff Ads, live for about a week. The pitch: 500,000 developers, in
the CLI, the desktop app, the web chat, and (per the launch post) mobile.
Self-serve console, pay-per-click, your own daily and total caps, clicks
and conversions in one dashboard. Spend $500 inside your first 30 days
and they match it with a $500 credit. Under $10k/month you're on your
own in the console; at or above it, you get a human.

Then there's the part that will age interestingly. Alongside display
ads they're selling an "engagement campaign": real Freebuff users like,
comment on, and repost your X, LinkedIn, Reddit, or GitHub posts, at a
flat $0.50 per engagement, "verified before it counts," against a daily
budget you set. That is not an ad unit. That is a paid-engagement
marketplace with an ad unit's paperwork, sold to people who want
developer attention and don't want to call it astroturfing.

## The tenants already moved in

The advertisers page names three: Greptile, ARCHIL, ObsessionDB. Greptile
is the one in the ad rail above — "Catch bugs before you merge," an AI
pull-request reviewer, advertised inside a free AI coding agent. Which
is a genuinely funny stack: you run the free agent to write the code, and
the paid agent across the aisle offers to catch what the free one missed.
A competitor-adjacent product sold straight to the audience of the free
tier. Nobody is pretending otherwise, and that's the whole point.

## What the screenshot shows

This is Freebuff Desktop mid-session. The old format — a line of text
between agent turns — is gone. The ad is now a full-height panel beside
your editor: logo, headline, body copy, a CTA button, and a little
decorative diff (`retry_policy.max_attempts =1` → `backoff_ms =0`) to
make it look like a tool. It sits there while the agent works, not just
between turns. The model picker reads DeepSeek V4.1 Flash at High; the
streak badge says 64 days, which tells you the owner did not download
this last week to look at an ad.

![Screenshot of the Freebuff desktop app: the left pane shows a chat session for the squirrel.filed.fyi project with a 64-day streak badge and the DeepSeek V4.1 Flash High model picker, while the right pane is a full-height Greptile ad reading "Catch bugs before you merge. AI agents that review and test pull requests with full context of the codebase." above a "Try Greptile" button and a sample retry-policy diff.](2026-10-03-freebuff-ads.assets/freebuff-desktop-greptile-ad.png)

## The deal, re-read with the bigger slot

February's launch post promised "small, text-only ads from sponsors
developers actually use… between agent turns, not inside generated code
or as popups." Text-only between turns is now a display panel on four
surfaces plus a paid-engagement product. The privacy language, though,
hasn't moved: prompts, messages, agent traces, code, and files are used
to run Freebuff and "may be analyzed to personalize ads"; separately
uploaded files and connected repositories are not handed to advertisers;
restricted partners may *evaluate* connected Cloud repos but not
otherwise use, share, or train on them. Same bargain as August, same
warning: fine for hobby repos, think hard before pointing it at anything
that pays the rent. What changed is only how big the ad next to your code
gets.

## The repos, checked

CodebuffAI is a six-repo org and it's still shipping — `freebuff` was
updated the same day this was filed. The shape of it:

| repo | what it is |
|---|---|
| [freebuff](https://github.com/CodebuffAI/freebuff) | the products; Apache-2.0 TypeScript monorepo, 13.1k stars, ~1.4k forks |
| [codebuff-community](https://github.com/CodebuffAI/codebuff-community) | showcase of things people built with it |
| [evalbuff](https://github.com/CodebuffAI/evalbuff) | internal evals, TypeScript |
| [opentui](https://github.com/CodebuffAI/opentui) | fork of anomalyco/opentui |
| [stagehand](https://github.com/CodebuffAI/stagehand) | fork of browserbase/stagehand, for browser-use |
| [codebuff-swe-bench](https://github.com/CodebuffAI/codebuff-swe-bench) | fork of Aider's SWE-bench harness |

The "open multi-agent framework" claim holds up better than most: the
products are actually in the repo, and the three forks are honest about
being forks — the TUI, the browser automation, and the benchmark rig are
all borrowed wholesale. Stars went 10.8k → 13.1k since the August entry,
so either the ads are working or the model catalog is. Both, probably.

The catalog itself has turned over. MiMo 2.6 Flash is the default now;
GLM 5.3 Flash took over the deep-reasoning slot from the retired DeepSeek
V4 Pro; DeepSeek V4.1 Flash is the unmetered fast-coding pick (and the
one in the screenshot). GPT-6 Luna, Solar Mini 4 and Solar Pro 4 (524K
context), and Space Bunny Alpha — a stealth model from an anonymous
provider that "retains prompts," stated plainly in the README as if
that's a feature. Gemini 3.8 Flash and Muse Spark 1.3 sit behind paid
plans; GPT-6.1 Sol is a US-only promo slot. Billing is now Freebucks:
every model costs Freebucks at the price in the picker, the free
limited-access allowance is 25 a day (20 behind a VPN), and referrals
and bounties top up the wallet.

## Why it gets filed

The interesting thing isn't that a free product shows ads. It's that the
developer-tool category found the ad format and started selling it on
purpose — same audience, same surfaces, same "verified engagement"
line the influencer economy already burned through. Freebuff is a clean
test case because the owner is a real daily user, so there's usage
evidence in bulk when someone finally writes the review. The ad platform
is the news; the review is still waiting on the owner.
