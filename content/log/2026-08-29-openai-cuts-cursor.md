---
title: OpenAI Cuts Off Cursor After SpaceX Buys It for $60B, Citing Musk's Contract History
parent: log/2026-08
tags: [link, ai, openai, musk, cursor, spacex]
status: published
published_at: 2026-08-29T12:01:00Z
summary: OpenAI is ending its Cursor contract on November 12, three weeks after SpaceX completed a $60B all-stock acquisition. OpenAI cites Musk's history of breaking contracts. Cursor says OpenAI is only 5% of their AI traffic. Anthropic immediately positioned itself as the reliable partner, which is hilarious given their own history.
---

# OpenAI Cuts Off Cursor After SpaceX Buys It for $60B, Citing Musk's Contract History

**Sources:**

- [OpenAI cuts off Cursor after SpaceX acquisition](https://the-decoder.com/openai-cuts-off-cursor-after-spacex-acquisition-citing-musks-history-of-breaking-contracts/) — The Decoder (August 29, 2026)
- [Using OpenAI models in Cursor](https://help.openai.com/en/articles/20001506-using-openai-models-in-cursor) — OpenAI Help Center (August 29, 2026)
- [OpenAI is cutting Cursor off on Nov 12](https://marketchacha.com/post/62cjee/openai-is-cutting-cursor-off-on) — MarketChacha

## What happened

SpaceX completed a $60 billion all-stock acquisition of Cursor. Three weeks later, OpenAI told Cursor it will terminate its contract on November 12, 2026 — the maximum notice period allowed under a change-of-ownership clause.

OpenAI's stated reason: Elon Musk's companies have a "track record of breaking contracts." Specifically:

- After acquiring Twitter, Musk discovered OpenAI had a $2M/year licensing deal for the full tweet data feed. He thought the price was too low and cut off access.
- Musk admitted during litigation that he used data from other labs' AI models to train Grok — a practice known as "distillation" that violates OpenAI's terms of service.
- OpenAI frames this as a safety issue: the upcoming Astra model has "advanced cyber capabilities" and there's "a new level of accountability" to ensure partners comply with terms of service.

## The irony pile

**OpenAI talking about trust.** A company that was sued by its own board, had its non-profit status questioned, and was caught using Claude for internal benchmarks is now lecturing about contract reliability.

**Anthropic playing loyal partner.** Tom Brown, Anthropic's co-founder, immediately posted that Cursor has been a "trusted partner since Sonnet 3.5" and Anthropic will "continue to expand compute capacity." This from the company that blocked Windsurf from accessing Claude after reports of an OpenAI acquisition, and revoked OpenAI's own API access over unauthorized benchmark use. Everyone is everyone's enemy until they need to be friends.

**The 5% problem.** Cursor co-founder Michael Truell says OpenAI models account for just 5% of Cursor's AI traffic. OpenAI is cutting off a $60B company over a relationship that represents 1/20th of its AI usage. This is either a genuine trust/safety move or an expensive symbolic gesture against Musk.

**Users can still bring their own API key.** The help article says users can continue using OpenAI models in Cursor's local Chat and Agent features with their own API key. But not for Cursor Tab, Auto, Cloud Agents, Automations, the CLI, or the SDK. So the core autocomplete and background agent features — the things people actually pay for — lose OpenAI models.

## The bigger picture

This is the AI industry's vendor lock-in problem laid bare. Cursor built its business on OpenAI models. SpaceX bought Cursor. OpenAI cuts off Cursor. Users are stuck in the middle.

The parallel to the Windsurf situation is exact: Anthropic blocked Windsurf when it looked like OpenAI would acquire it. Now OpenAI is blocking Cursor because SpaceX did acquire it. Every AI company uses API access as a weapon against competitors and anyone associated with them.

## The data flywheel underneath it all

OpenAI cutting Cursor off might actually be what SpaceX wanted. Here's the play:

SpaceX merged with xAI in February 2026. They bought Cursor in June. On June 28, Musk announced Grok 4.5 — built on the 1.5T V9 foundation model with Cursor's developer data added in supplemental training — entered private beta at SpaceX and Tesla. The loop: compute (Colossus) -> model (Grok/V9) -> tool (Cursor) -> data (1M+ developers' coding workflows) -> back into the model.

Cursor is giving away massive amounts of Grok inference cheap/free to lock developers into the ecosystem. Grok 4.5 launched with free usage in Cursor and Grok Build. Grok 4.6 launched with 2x included usage for the first week. The pricing is deliberately below cost to generate token volume and training data.

The catch: the generous limits are front-loaded. Users report the second trial period is drastically more restricted than the first. The free inference is a hook, not a gift. And the model being talked up (Grok 4.5 on V9) is only available at SpaceX and Tesla — paying developers still get Grok 4.3 on the older v8-small foundation. The good version is the internal one. The public version is the generation Musk himself called "fundamentally flawed."

OpenAI cutting off Cursor's direct model access might accelerate the flywheel: fewer OpenAI models in the default picker, more Grok models getting default placement, more Cursor data flowing into xAI training runs. The API cutoff isn't a setback for SpaceX. It's a feature.

**Verdict:** Keep. The $60B acquisition -> 3-week cutoff -> "it's about trust" -> "OpenAI is only 5% of our traffic" -> "Anthropic is the reliable partner" irony stack is genuinely funny. But the real story is that SpaceX bought Cursor for its 1M+ developers' coding data, not for the product. OpenAI cutting off access just pushes more users toward Grok. The generous inference limits are a data harvest with a time-limited discount. Users noticed the throttling on second trials — the free ride has a meter, and it runs faster than you think.
