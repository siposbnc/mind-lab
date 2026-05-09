---
title: Electron Version
date: 2026-05-09
status: resolved
tags: [decision, tech, electron]
---

# Electron Version

**Decision: Electron 36**

Pinned to Electron 36 instead of latest (42).

**Why:** Electron 42's V8 introduced breaking API changes that prevent `better-sqlite3` from compiling. Electron 36 has stable prebuilds for `better-sqlite3` and is the latest version with proven native module compatibility.

**What we give up:** Chromium/Node.js version currency — no practical impact for Mind Lab's feature set (terminal rendering, workspace UI).

**Revisit when:** `better-sqlite3` and `node-pty` ship prebuilt binaries for a newer Electron version.

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
