---
title: ChatGPT Now Signs Into Your Accounts and Keeps the Sessions on Its Servers
parent: log/2026-08
tags: [link, doomed-ai, openai, security, privacy, national-security]
status: draft
summary: ChatGPT Work's cloud browser can now sign into websites and keeps the session cookie on OpenAI's servers — even after you close your device. A stolen cookie is enough to hijack an account without the password or 2FA. Red Scare 3.0: the national security framing is the subsidy play.
---

# ChatGPT Now Signs Into Your Accounts and Keeps the Sessions on Its Servers

- Source: [Notebookcheck](https://www.notebookcheck.net/ChatGPT-signs-in-to-your-accounts-now-and-stays-signed-in.1379126.0.html)
- Verdict: toss
- Why: OpenAI added account sign-in to ChatGPT Work's cloud browser on August 25. You type the credentials yourself, they say the model never sees them and doesn't store them. But the session cookie persists on their cloud machine — even after you close your laptop. A cookie like that is enough to walk into an account without the password and without 2FA. The cloud browser "keeps working including after you close your computer or turn off your phone." Your session now sits somewhere you cannot see. OpenAI concedes the residual risk themselves: "those safeguards do not eliminate every risk." The ingredient that makes prompt injection attacks dangerous — a session that stays signed in — it now has.

The national security framing writes itself: "The Chinese have open-weight models anyone can run locally, so we need persistent cloud infrastructure to stay competitive." The logic doesn't survive a single sentence but nobody's pressure-testing it because the fear is the point. This is Red Scare 3.0 with a login form — the same playbook Hollywood used, the same playbook the defense contractors used, now deployed by a company burning $14B a year that needs a funding model better than ads.

And the real endgame isn't consumer subscriptions. It's government subsidies. Microsoft already has the playbook with GCC High: get FedRAMP authorized, call it national security, and the government pays you to build the infrastructure you were going to build anyway. The session persistence, the agent infrastructure, the cloud browser running on your servers — all of it becomes "essential for American competitiveness" instead of "surveillance with a chat interface." OpenAI's $14B annual burn stops being a problem and starts being a defense budget. The Chinese threat becomes self-fulfilling: "they have open models" becomes "they have models that might be used against us" becomes "we need closed, American-controlled models with persistent sessions and government backdoors" becomes... this. A botnet with a defense budget.
