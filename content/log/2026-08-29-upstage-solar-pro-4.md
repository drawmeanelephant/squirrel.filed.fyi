---
title: Upstage Solar Pro 4 - Korea's AI Unicorn With a 90% Off Promotion and Some Creative Accounting
parent: log/2026-08
tags: [link, ai, korea, benchmarks]
status: published
published_at: 2026-08-29T12:02:00Z
summary: Upstage's Solar Pro 4 scores 42 on Artificial Analysis but only answers 41% of questions. The 90% off promotion through Sep 10 is doing heavy lifting. $1B valuation, $285M raised, and a hallucination rate that looks better only because the model refuses to answer most questions.
---

# Upstage Solar Pro 4 — Korea's AI Unicorn With a 90% Off Promotion and Some Creative Accounting

**Sources:**

- [Solar Pro 4: Benchmarks and analysis](https://artificialanalysis.ai/articles/upstage-solar-pro-4) — Artificial Analysis (August 12, 2026)
- [Upstage AI Unveils Solar Pro 4](https://www.prnewswire.com/news-releases/upstage-ai-unveils-solar-pro-4-scoring-42-on-artificial-analysis-index-to-rank-among-global-frontier-models-302856434.html) — PR Newswire (August 20, 2026)
- [Solar Pro 4 docs](https://console.upstage.ai/docs/models/solar-pro-4) — Upstage Console
- [Save frontier models for frontier problems](https://thenewstack.io/upstage-solar-pro-4/) — The New Stack (August 20, 2026)

## The company

Upstage AI is a South Korean enterprise AI company founded in 2020 by Sung Kim — former head of Naver's Clova AI, former HKUST professor, and the guy who built Korea's first search engine as an undergrad in 1996 and taught 6 million people deep learning on YouTube. Based in Seoul with a US HQ in San Jose. 150 employees. Partnerships with AWS and AMD.

**Funding:** $285M+ total. Series C in April 2026 at a $1B+ valuation — Korea's first generative AI unicorn. Revenue claimed at 130%+ YoY.

## The model

Solar Pro 4 is a closed proprietary reasoning model, the successor to Solar Pro 3 (April 2026). It scores **42** on the Artificial Analysis Intelligence Index, up from Solar Pro 3's 14. Upstage's PR says this puts it "on par with general-purpose frontier models."

What the PR doesn't emphasize: it sits alongside Inkling (42) and behind MiMo-V2.5-Pro (43). It's not competing with GPT-5 or Claude Opus — it's competing with mid-tier models and sovereign AI projects.

## The creative accounting

Here's where it gets interesting:

**The abstention trick.** Solar Pro 4's hallucination rate improved from 88% to 24%. Sounds great! Except it only **answers 41% of questions**. Solar Pro 3 attempted 92%. So the "improvement" is mostly the model refusing to answer anything it's not confident about. Its actual accuracy on answered questions is roughly 31% (19% accuracy on all questions ÷ 41% answer rate). That's not "frontier model" territory. That's "I'll only answer the easy ones" territory.

**The speed regression.** Solar Pro 4 takes 8.6 minutes per Intelligence Index task, up from 6.0 minutes for Solar Pro 3 — despite using 17% fewer output tokens. It got slower while getting more token-efficient. That's not a feature.

**The pricing math.** Normal pricing: $0.30/$1.20 per 1M input/output tokens. That's competitive with MiniMax-M3 (which scores 3 points higher at 45) but 2-4x more expensive than DeepSeek V4 Flash (which scores 52). The 90% off launch promo drops it to $0.03/$0.12 — cheap enough to generate usage stats and OpenRouter rankings, but that price reverts September 10.

## The promotion strategy

The 90% off isn't generosity. It's a classic land-grab:

1. Launch at 90% off to generate massive token volume on OpenRouter (they claim 370 billion tokens in the first week)
2. Climb the OpenRouter usage rankings by being the cheapest option
3. Get listed alongside OpenAI, Anthropic, Google, and Nvidia on provider pages
4. Lock in developers during the promo window
5. Hit them with 10x pricing on September 11

Their own tweet says the quiet part out loud: "It's #2 because ✨we're running 90% off✨ through Sept 10." The #2 ranking on OpenRouter is a pricing artifact, not a quality signal.

## The benchmark skepticism

The Latent Space podcast noted that Artificial Analysis "selected 46 of 608 models" and questioned whether the comparison set was cherry-picked or unrepresentative. LocalLLaMA Reddit threads have questioned whether Solar Open (their open-source model) is "just finetuned" rather than a from-scratch training run.

The PR Newswire article frames Solar Pro 4 as surpassing "big tech models like Nvidia's Nemotron 3 Ultra (38) and Google's Gemini 3.5 Flash-Light (37)." But those are lightweight/distilled models, not frontier models. Beating Gemini Flash-Light is not the same as competing with Gemini Ultra.

## What it actually is

A decent mid-tier reasoning model from a well-funded Korean startup with legitimate enterprise credentials (Naver lineage, AWS partnership, regulated-industry focus). The 42 score is real. The agentic improvements (TerminalBench from 12% to 57%, GDPval-AA from 498 to 1277 Elo) are genuine. The 384K context window is useful.

But the marketing is doing a lot of work. "On par with frontier models" is a stretch when you're answering 41% of questions. "90% off" is a promotion, not a price. And climbing OpenRouter rankings while charging 10% of normal pricing tells you more about the strategy than the technology.

**Verdict:** Keep, but with side-eye. The model is real and the enterprise focus is smart. The marketing is in full promotion phase — 90% off, cherry-picked comparisons, and "frontier model" framing for a mid-tier product. After September 10, the real pricing and real rankings will tell the story.
