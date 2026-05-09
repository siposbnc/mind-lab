# Mind Lab — Claude Instructions

## Project

Mind Lab is a **desktop workspace manager for AI coding agent CLIs** (Claude Code, Codex, Gemini CLI, Copilot, etc.). It replaces the multi-terminal-window workflow with a unified tiled UI where developers manage multiple AI coding sessions simultaneously.

**Mental model: tmux + a purpose-built workspace UI for AI coding agents.**

Mind Lab does NOT wrap AI APIs. It manages OS processes running those CLIs via PTY, renders their terminal I/O, persists workspace state, and provides orchestration between sessions. The CLIs (Claude Code, etc.) handle their own API calls, context, and memory.

## Vault — Source of Truth

All decisions, architecture, and project context live in `./vault/`. This replaces conversation history.

**At the start of every session:**
1. Read `vault/_meta/Index.md`
2. Read every note with `status: active` in its frontmatter
3. Do not assume prior conversation context — the vault is authoritative

**During work:**
- Create a session log in `vault/Sessions/` before doing anything else
- Write decisions to the correct `vault/Decisions/` subfolder immediately as they are made
- New open questions go in `vault/Questions/Open/` as individual notes
- When a question is answered, rewrite its note with `status: resolved` and move it to `vault/Questions/Resolved/`
- Update existing notes rather than creating duplicates
- Cross-link notes using `[[Folder/Note Name]]` syntax — always use the full path
- Every note must have YAML frontmatter with `title`, `date`, `status`, `tags`
- `status` values: `draft`, `active`, `resolved`, `archived` — never delete a note; set archived and add pointer
- Decision notes end with `*Resolved in [[Sessions/YYYY-MM-DD — Session NN]]*`
- Update `vault/_meta/Index.md` when notes are added, moved, or change status

## Locked Decisions

Do not re-open these without explicit user instruction:

| Decision | Resolution |
|---|---|
| What Mind Lab is | Desktop PTY manager + workspace UI. Not an API wrapper. See [[Decisions/Architecture Clarification — What Mind Lab Is]] |
| Deployment | Desktop app (Electron). Self-hosted, single-user. Extensible for teams later. |
| CLI support | Claude Code first. Codex, Gemini CLI, Copilot planned. No AI SDK in Mind Lab itself. |
| Memory | CLI tools own their own memory (e.g. CLAUDE.md). Mind Lab persists workspace state only. |
| Target user | Solo developer. No roles or team features in Phase 1. |
| Monetization | Open-source. No billing or feature gating. |

## Tech Stack

| Layer | Choice |
|---|---|
| Desktop framework | Electron |
| Frontend | React + TypeScript, shadcn/ui + Tailwind, Zustand, React Grid Layout, Reactflow (Phase 3) |
| Terminal rendering | xterm.js |
| PTY / process management | node-pty (Electron main process) |
| IPC | Electron ipcMain / ipcRenderer |
| Database | SQLite via Drizzle ORM + better-sqlite3 |
| Session logs | Flat files (one per session, terminal output) |
| Packaging | Electron Forge |

## Build Phases

- **Phase 1 — Core Shell:** Single Claude Code session, xterm.js rendering, session persistence (reconnect or history), basic workspace UI
- **Phase 2 — Multi-Session Workspace:** Multiple concurrent sessions, tiled layout, project grouping, status detection, multi-tool support
- **Phase 3 — Orchestration:** Pipeline builder (Reactflow DAG), fan-out, control layer (programmatic input to sessions)
- **Phase 4 — Polish:** OS notifications, session history browser, plugin system for new CLI tools

## Working Style

- Be direct. These are working documents, not essays.
- Record the **why** behind decisions, not just the what.
- Mark open questions with `> **?** Question text` blockquotes in vault notes.
- Do not re-open locked decisions or propose stack changes without being asked.
- Do not add features, abstractions, or error handling beyond what is currently needed.
