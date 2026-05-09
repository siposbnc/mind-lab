---
title: Data Model
date: 2026-05-09
status: active
tags: [decision, architecture, data-model, sqlite]
---

# Data Model

SQLite via Drizzle ORM + better-sqlite3. Embedded, no server. All data local to the user's machine.

Session terminal output stored as flat log files, not in the DB.

---

## Schema

### `workspaces`
```sql
id          TEXT PRIMARY KEY,
name        TEXT NOT NULL,
settings    TEXT,           -- json: theme, default_tool, etc.
created_at  INTEGER NOT NULL
```
One per install. `user_id` column added when team/sync features arrive.

---

### `projects`
```sql
id             TEXT PRIMARY KEY,
workspace_id   TEXT NOT NULL REFERENCES workspaces(id),
name           TEXT NOT NULL,
description    TEXT,
codebase_path  TEXT,        -- absolute path to project directory
color          TEXT,        -- ui accent color
created_at     INTEGER NOT NULL,
updated_at     INTEGER NOT NULL
```

---

### `sessions`
```sql
id             TEXT PRIMARY KEY,
workspace_id   TEXT NOT NULL REFERENCES workspaces(id),
project_id     TEXT REFERENCES projects(id),   -- nullable: scratch sessions allowed
name           TEXT NOT NULL,
tool           TEXT NOT NULL,                  -- 'claude' | 'codex' | 'gemini' | 'copilot'
tool_args      TEXT,                           -- json array of extra CLI args
cwd            TEXT NOT NULL,                  -- working directory for the process
env            TEXT,                           -- json: extra env vars to inject
status         TEXT NOT NULL DEFAULT 'idle',   -- active | idle | waiting_input | error | exited
pid            INTEGER,                        -- live OS process ID, null when not running
log_file_path  TEXT NOT NULL,                  -- absolute path to terminal output log
created_at     INTEGER NOT NULL,
last_active_at INTEGER,
exited_at      INTEGER
```

**Notes:**
- `project_id` is nullable — scratch sessions are a first-class concept
- `log_file_path` points to `~/.mind-lab/logs/<session_id>.log`
- `pid` is set when process is spawned, cleared on exit
- `status` is updated by the status detection layer (see [[Decisions/Architecture/Status Detection]])

---

### `layouts`
```sql
id           TEXT PRIMARY KEY,
workspace_id TEXT NOT NULL REFERENCES workspaces(id),
name         TEXT NOT NULL,
definition   TEXT NOT NULL,   -- json: panel tree with positions, sizes, session IDs
is_default   INTEGER NOT NULL DEFAULT 0,
created_at   INTEGER NOT NULL,
updated_at   INTEGER NOT NULL
```

Multiple named layouts per workspace. User can switch between them. One marked `is_default` loads on startup.

**`definition` shape (json):**
```json
{
  "type": "split",
  "direction": "horizontal",
  "children": [
    { "type": "panel", "sessionId": "sess_abc", "size": 50 },
    { "type": "panel", "sessionId": "sess_xyz", "size": 50 }
  ]
}
```

---

### `pipelines` *(Phase 3)*
```sql
id           TEXT PRIMARY KEY,
workspace_id TEXT NOT NULL REFERENCES workspaces(id),
project_id   TEXT REFERENCES projects(id),
name         TEXT NOT NULL,
definition   TEXT NOT NULL,   -- json: Reactflow DAG (nodes = sessions, edges = triggers)
created_at   INTEGER NOT NULL,
updated_at   INTEGER NOT NULL
```

---

### `pipeline_runs` *(Phase 3)*
```sql
id           TEXT PRIMARY KEY,
pipeline_id  TEXT NOT NULL REFERENCES pipelines(id),
status       TEXT NOT NULL,    -- pending | running | completed | failed
input        TEXT,             -- json
output       TEXT,             -- json
started_at   INTEGER NOT NULL,
completed_at INTEGER,
error        TEXT
```

---

## Session Log Files

Location: `~/.mind-lab/logs/<session_id>.log`

- Plain text, raw terminal output appended as it arrives from node-pty
- On session restore: if PID alive → reattach to running process; if exited → replay log file into xterm.js
- Simple now. If plain text replay proves insufficient (ANSI artifacts, cursor issues), upgrade to xterm serialize addon

---

## ID Strategy

Use `cuid2` for all primary keys — URL-safe, monotonic, no UUID collision risk, works without a DB sequence.

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
