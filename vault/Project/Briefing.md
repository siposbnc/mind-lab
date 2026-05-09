---
title: Mind Lab — Project Briefing
date: 2026-05-09
status: active
tags: [project, briefing, architecture]
---

# Mind Lab — Project Briefing

A **desktop workspace manager for AI coding agent CLIs**. Replaces the scattered multi-terminal-window workflow of running multiple `claude`, `codex`, `gemini`, or `copilot` sessions with a single unified UI.

Mind Lab does not wrap the AI APIs directly. It manages the **OS processes** that run those CLIs, renders their terminal I/O, persists workspace state, and provides orchestration between sessions.

Think: tmux + a purpose-built workspace UI, designed specifically for AI coding agents.

---

## The Problem It Solves

A developer running multiple Claude Code sessions today uses multiple terminal windows — no shared context about what each session is doing, no persistent layout, no way to coordinate between them. Mind Lab replaces that with a managed workspace.

---

## Core Feature Areas

### 1. Session Management
- Spawn named terminal sessions running any supported AI CLI (`claude`, `codex`, etc.)
- Set working directory, environment, and CLI arguments per session
- Persist sessions: reconnect to running processes on app restart; show history if process exited
- Session status tracking: active, idle, waiting for input, error, exited
- Kill, restart, and rename sessions

### 2. Workspace UI
- Tiled/tabbed canvas showing multiple terminal sessions simultaneously
- Drag-and-drop panel layout, resizable panes
- Persistent layout — workspace restores on relaunch
- Visual status indicators per session (thinking, waiting, done, error)
- OS notifications when a session needs input or completes a task

### 3. Project Organization
- Group sessions under a project (bound to a codebase path)
- Quick-switch between projects
- Per-project session history

### 4. Agent Orchestration (Phase 3)
- Pipeline builder: trigger session B when session A produces a defined output
- Fan-out: send the same task to N sessions in parallel, compare outputs
- Human-in-the-loop checkpoints between pipeline steps

### 5. Multi-tool Support (Phase 2+)
- Claude Code first
- Codex, Gemini CLI, GitHub Copilot CLI planned
- Tool-specific output parsing for status detection

---

## Tech Stack

### Desktop Framework

| Concern | Choice | Reason |
|---|---|---|
| App framework | Electron | node-pty + xterm.js have first-class Electron support; mature tooling |
| Frontend | React + TypeScript | Component model fits tiled workspace UI |
| UI Library | shadcn/ui + Tailwind | |
| Terminal rendering | xterm.js | Industry standard, works natively in Electron |
| State | Zustand | |
| Layout | React Grid Layout | Drag-and-drop tiled panels |
| Pipeline UI | Reactflow | DAG builder for Phase 3 |

### Main Process (Electron)

| Concern | Choice |
|---|---|
| PTY / process management | node-pty |
| IPC | Electron ipcMain / ipcRenderer |
| Database | SQLite via better-sqlite3 |
| ORM | Drizzle ORM |
| Packaging | Electron Forge |

### Data

| Concern | Choice | Reason |
|---|---|---|
| Primary DB | SQLite | Embedded, no server, fits desktop app |
| Session logs | Flat files (one per session) | Terminal output can be large; avoids SQLite row limits |
| Settings | JSON file | Simple key/value workspace config |

---

## Architecture Overview

```
┌──────────────────────────────────────────────┐
│              Electron App                     │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │         Renderer Process (React)        │  │
│  │  Workspace UI, xterm.js panels,         │  │
│  │  Zustand state, session controls        │  │
│  └────────────────┬────────────────────────┘  │
│                   │ ipcRenderer / ipcMain      │
│  ┌────────────────▼────────────────────────┐  │
│  │           Main Process (Node)           │  │
│  │  ┌─────────────┐  ┌──────────────────┐  │  │
│  │  │  PTY Manager│  │  Session Registry│  │  │
│  │  │  (node-pty) │  │  (SQLite)        │  │  │
│  │  └──────┬──────┘  └──────────────────┘  │  │
│  │         │                               │  │
│  │  ┌──────▼──────────────────────────┐   │  │
│  │  │     Spawned CLI Processes        │   │  │
│  │  │  claude | codex | gemini | ...   │   │  │
│  │  └──────────────────────────────────┘   │  │
│  └─────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
         │                    │
   SQLite DB            Session log files
   (workspace,          (terminal output,
    sessions,            one file per session)
    projects,
    pipelines)
```

---

## Phased Build Plan

### Phase 1 — Core Shell
- Spawn and manage a single Claude Code session
- xterm.js terminal rendering
- Session persistence (reconnect or show history)
- Basic workspace UI (single panel)

### Phase 2 — Multi-Session Workspace
- Multiple concurrent sessions
- Tiled layout, drag-and-drop panels
- Project grouping
- Status detection (parsing Claude Code output)
- Multi-tool support (Codex, Gemini CLI)

### Phase 3 — Orchestration
- Pipeline builder (Reactflow DAG)
- Fan-out and comparison view
- Control layer (send input to sessions programmatically)

### Phase 4 — Polish & Platform
- OS notifications
- Session search and history browser
- Plugin system for new CLI tools
- Team/sync features (future)

---

## Related Notes
- [[Project/Open Questions]]
- [[Decisions/Q1 — Deployment Model]]
- [[Decisions/Q2 — Model Support]]
- [[Decisions/Q3 — Target User]]
- [[Decisions/Q4 — Agent Memory Scope]]
- [[Decisions/Q5 — Monetization]]
- [[Decisions/Architecture Clarification — What Mind Lab Is]]
