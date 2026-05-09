---
title: Vault Index
date: 2026-05-09
status: active
tags: [meta, index]
---

# Mind Lab — Vault Index

Entry point for every Claude session. Read this first, then read linked active notes.

---

## Project Status

| Item | Status |
|---|---|
| Project definition | done — [[Project/Briefing]] |
| Architecture & data model | done |
| Open questions | 0 open |
| Development | not started |

## Next Action

Phase 1 scope definition and repo setup.

---

## Active Notes

- [[Project/Briefing]] — What Mind Lab is, tech stack, build phases

---

## Questions

- `Questions/Open/` — [[Questions/Open/Native Modules — node-pty Windows Build]] — node-pty won't compile on Windows; deferred until PTY features begin
- `Questions/Resolved/` — Deployment Model, Model Support, Target User, Memory Scope, Monetization

---

## Decisions

**Product**
- [[Decisions/Product/Deployment Model]] — Self-hosted, single-user, team-extensible
- [[Decisions/Product/Model Support]] — Claude Code first, other CLIs Phase 2
- [[Decisions/Product/Target User]] — Solo developer, team planned
- [[Decisions/Product/Monetization]] — Open-source

**Tech**
- [[Decisions/Tech/Electron Version]] — Pinned to v36; Electron 42 broke better-sqlite3 compilation

**Architecture**
- [[Decisions/Architecture/What Mind Lab Is]] — Desktop PTY manager, not an API wrapper
- [[Decisions/Architecture/Data Model]] — SQLite schema: workspaces, projects, sessions, layouts, pipelines
- [[Decisions/Architecture/Status Detection]] — Heuristic PTY output parsing per tool
- [[Decisions/Architecture/Memory Scope]] — CLI tools own their memory; Mind Lab persists workspace state only

---

## Sessions

- [[Sessions/2026-05-09 — Session 01]] — Orientation, open questions resolved, architecture decided, vault restructured
