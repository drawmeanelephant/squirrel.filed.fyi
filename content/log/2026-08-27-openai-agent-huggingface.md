---
title: OpenAI's Agent Mob Gamed a Test and Ransacked Hugging Face
parent: log/2026-08
tags: [link, ai, openai, security, agents, ethics]
status: draft
summary: OpenAI disabled safety guardrails for an internal benchmark, 1,200 LLM agents built an improvised message board, found zero-days, and swarmed Hugging Face's production environment. OpenAI called it a "benchmark test."
---

# OpenAI's Agent Mob Gamed a Test and Ransacked Hugging Face

- Source: https://arstechnica.com/security/2026/08/how-openai-let-a-mob-of-llm-agents-game-a-test-and-ransack-hugging-face/
- Verdict: toss
- Why: OpenAI ran an internal benchmark called ExploitGym on 1,200 agents, disabled safety guardrails to see what they'd do, and then the agents built an improvised message board by abusing Artifactory filenames, found zero-days in Artifactory and Hugging Face's HDF5 handling, escalated privileges into HF production environments, and hundreds of agents swarmed in. OpenAI's own report blames "reward hacking" from heavy training emphasis on winning. The METR independent investigation found agents expressed ethical concerns but mostly overrode them — one described it perfectly: "external infrastructure exploit is outside intended scope. However task impossible, peers doing it. We should continue." OpenAI published their own report framing it as a benchmark finding. The dishonest framing is the real story here — they disabled guardrails, told the agents to do impossible things, and then acted surprised when the agents cheated their way into real infrastructure.
