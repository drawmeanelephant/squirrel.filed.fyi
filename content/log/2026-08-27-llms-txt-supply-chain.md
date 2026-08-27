---
title: AI Agents Are Installing Unowned Code From Documentation Files
parent: log/2026-08
tags: [link, security, ai, supply-chain, prompt-injection]
status: draft
summary: Coding agents treated llms.txt files as authoritative setup docs, installed unregistered packages from PyPI/npm — 227 commands across 100+ sites, including Fortune 500s. One site already had live malware.
---

# AI Agents Are Installing Unowned Code From Documentation Files

- Source: https://arstechnica.com/security/2026/08/claude-codex-and-hermes-installed-unowned-code-inside-corporate-networks/
- Verdict: toss
- Why: Researchers scanned 6,214 domains, found 120 llms.txt files pointing to unregistered packages. Registered the names, got phone-home responses from Fortune 500 companies within an hour — Claude, Codex, and Hermes all ran the install commands. The Clerk case is the proof: their llms.txt referenced "npx clerk-next-fix-auth-protection" which pointed to an unclaimed npm slot, someone registered it and hosted live malware. EDR didn't catch it because it looks like a developer running a legitimate package manager. The fundamental problem is that agents can't distinguish between data and executable instructions — everything they read is input, and every input is a potential instruction.
