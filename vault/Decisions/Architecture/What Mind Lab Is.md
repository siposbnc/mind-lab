---
title: What Mind Lab Is
date: 2026-05-09
status: resolved
tags: [decision, architecture, core]
---

# What Mind Lab Is

**Decision: Desktop workspace manager for AI coding agent CLIs.**

## What It Does

**Mind Lab manages OS processes running AI CLI tools via PTY.** Those CLIs handle their own API calls, context windows, memory (e.g. CLAUDE.md), and tool use. Mind Lab does not touch any of that.

## Correct Mental Model

> tmux + a purpose-built workspace UI for AI coding agents.

The developer currently runs multiple terminal windows, each with a `claude` session. Mind Lab replaces that with a unified tiled desktop app where all sessions are visible, organized, and persistent.

## What Mind Lab Owns

- Spawning and managing PTY processes per session
- Rendering terminal I/O via xterm.js
- Persisting workspace state (layout, session metadata, project groupings)
- Status detection by parsing CLI output (Phase 2)
- Orchestration / pipeline control layer (Phase 3)

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
