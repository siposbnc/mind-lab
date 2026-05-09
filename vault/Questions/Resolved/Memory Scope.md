---
title: Memory Scope
date: 2026-05-09
status: resolved
tags: [question, architecture]
---

# Memory Scope

> **?** Per-session memory only, or persistent cross-session agent memory?

**Resolution:** CLI tools (Claude Code, etc.) own their own memory. Mind Lab persists workspace state only (sessions, layout, project groupings).

→ [[Decisions/Architecture/Memory Scope]]
