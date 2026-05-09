---
title: Memory Scope
date: 2026-05-09
status: resolved
tags: [decision, architecture, memory]
---

# Memory Scope

**Decision: CLI tools own their memory. Mind Lab persists workspace state only.**

## What This Means

Claude Code manages its own memory via `CLAUDE.md` files and its internal context window. Mind Lab does not inject memory into API calls — it never touches the API layer.

Mind Lab persists:
- Session metadata (name, tool, cwd, status, project association)
- Workspace layout
- Project groupings
- Terminal output log files

Mind Lab does NOT persist:
- Conversation history (owned by the CLI tool)
- Agent memory or context (owned by the CLI tool)
- Any AI model state

## Why

Mind Lab is a process manager, not an AI platform. Memory management belongs to the tools being managed, not the workspace that runs them. This keeps Mind Lab's scope focused and avoids duplicating functionality the CLI tools already handle.

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
