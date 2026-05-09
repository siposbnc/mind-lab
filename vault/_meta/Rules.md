---
title: Vault Rules — Claude Usage Guidelines
date: 2026-05-09
status: active
tags: [meta, rules]
---

# Vault Rules — Claude Usage Guidelines

---

## Purpose

This vault is the shared persistent memory and working space for the **Mind Lab** project. It replaces reliance on conversation history, which is ephemeral. Both the user and Claude contribute to it.

---

## Folder Structure

| Folder | Purpose |
|---|---|
| `_meta/` | Index, rules — maintained by Claude |
| `Project/` | Briefings, specs, feature definitions |
| `Questions/Open/` | One note per open question |
| `Questions/Resolved/` | One note per resolved question (lightweight summary + link to decision) |
| `Decisions/Product/` | Product and scope decisions |
| `Decisions/Architecture/` | System design and data model decisions |
| `Decisions/Tech/` | Tooling and stack decisions |
| `Sessions/` | Per-session work logs |
| `Research/` | Tech research, comparisons, external references |

---

## Claude's Responsibilities

### At the Start of Every Conversation
- Read `_meta/Index.md` to orient on current project state.
- Read any notes linked under **Active Notes** in the Index.
- Do not assume prior conversation context — the vault is the source of truth.
- Create a session log in `Sessions/` before doing any work.

### During Work
- Write new decisions immediately as they are made — not at the end of the session.
- Update existing notes rather than creating duplicates.
- Cross-link related notes using `[[Folder/Note Name]]` syntax with the full path.
- When a question is answered, move its note from `Questions/Open/` to `Questions/Resolved/` by rewriting it with `status: resolved` and a link to the decision note.

### Note Hygiene
- Every note must have YAML frontmatter (see template below).
- Use `status` values: `draft`, `active`, `resolved`, `archived`.
- Never delete a note — set `status: archived` and add a pointer to the replacement.
- Keep note titles short and descriptive.
- Update `_meta/Index.md` whenever notes are added, moved, or change status.

---

## Note Frontmatter Template

```yaml
---
title: Note Title
date: YYYY-MM-DD
status: draft | active | resolved | archived
tags: [tag1, tag2]
---
```

---

## Writing Style

- Be direct and factual — these are working documents, not essays.
- Use headings, tables, and bullet points. Avoid long paragraphs.
- Record the **why** behind decisions, not just the **what**.
- Mark open questions with `> **?** Question text` blockquotes.
- Decision notes must end with `*Resolved in [[Sessions/YYYY-MM-DD — Session NN]]*`.

---

## What Does NOT Go Here

- Ephemeral task breakdowns (use Claude's task tool instead).
- Code files (use the project repo).
- Conversation summaries (record outcomes and decisions only).
