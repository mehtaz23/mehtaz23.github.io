---
title: "Building with Intention: Spec-Driven Development with GitHub Spec-Kit"
description: "How writing the spec first — and letting it govern the entire development cycle — maps naturally to Scrum roles, keeps AI-assisted code generation honest, and delivers real velocity to the SDLC."
date: "Apr 26 2026"
---

There is a specific kind of pain that comes from building something fast and building it wrong.

You open your editor, sketch out a controller, wire up a database, and three days later you realize the feature you built solves a slightly different problem than the one you intended to solve. Or worse — it solves the right problem but with the wrong contracts, the wrong boundaries, and no paper trail for any of the decisions that shaped it.

I wanted a different process. That search led me to **Spec-Driven Development (SDD)** and a library called **GitHub Spec-Kit**.

---

## 📋 What Is Spec-Driven Development?

Spec-Driven Development is the practice of writing a full, reviewed feature specification *before* any implementation begins. The spec is the source of truth. Every plan, every task, every line of code traces back to something explicitly described in a spec document.

With GitHub Spec-Kit, this becomes an opinionated, AI-assisted pipeline that lives directly inside your repository:

```
constitution → specify → clarify → plan → tasks → analyze → implement
```

Each step is triggered by a command invoked through GitHub Copilot or another configured AI integration:

| Command | What It Produces |
| :--- | :--- |
| `/speckit.specify` | `spec.md` — user stories, functional requirements, success criteria |
| `/speckit.clarify` | Surfaces ambiguities and folds the answers back into the spec |
| `/speckit.plan` | `plan.md` + `quickstart.md` — phased implementation with sequencing rationale |
| `/speckit.tasks` | `tasks.md` — dependency-ordered tasks ready for a developer to execute |
| `/speckit.implement` | Iterative code commits driven by each task in sequence |
| `/speckit.analyze` | Cross-checks spec, plan, and tasks for drift or inconsistency |
| `/speckit.checklist` | Generates a QA checklist scoped directly to the feature requirements |

The guiding principle is simple: **the spec always comes first. No implementation begins until `spec.md` is clarified and approved.**

Every feature lives under a versioned folder in the repository. These artifacts aren't documentation written after the fact — they are the development record, generated *before* code, not after.

```
specs/
└── 001-edi-transaction-ingest/
    ├── spec.md
    ├── plan.md
    ├── tasks.md
    ├── quickstart.md
    ├── data-model.md
    ├── research.md
    └── checklists/
        └── requirements.md
```

---

## 🚀 SDD as a Scrum Cycle

What surprised me most about this workflow was how closely it mirrors the role structure of a real Scrum team. When you are working solo or in a small team with an AI pair, each phase of the pipeline forces you to *wear a different hat* — and that structured shift in perspective is exactly where the value comes from.

| Spec-Kit Phase | Role Analogy | Responsibility |
| :--- | :--- | :--- |
| **Constitution** | 🏛️ Architect | Sets non-negotiables: tech boundaries, patterns, constraints that cannot be revisited |
| **Specify + Clarify** | 📋 Product Owner / Scrum Master | Writes user stories, defines acceptance criteria, resolves every open question |
| **Plan** | 📅 Project Manager / Scrum Master | Sequences work into phases, identifies dependencies, structures the sprint |
| **Analyze** | 🔍 Business Analyst | Cross-checks spec against plan and tasks — catches drift before code is written |
| **Tasks** | ✅ Developer (Backlog Ready) | Consumes a dependency-ordered task list with no remaining ambiguity |
| **Implement** | 💻 Developer | Executes tasks iteratively, with a clarified spec as the constant reference |

### The Constitution as Guardrails

The constitution step is the easiest to skip — and that is exactly why it is the most valuable. Before anything else is written, you define what *cannot change*. For a project like EdiTrack, that means committing up front to decisions like:

- PostgreSQL as the backing store, full stop
- EF Core with Npgsql — no raw SQL in the application layer
- Structured JSON logging via Serilog on every ingest attempt
- UUID v7 for all primary keys — time-ordered, no integer surrogates
- A custom `ErrorResponse` DTO in place of ASP.NET's `ProblemDetails`

These are not implementation details to be debated later. They are the constitution of the project. Once set, every downstream artifact — the spec, the plan, the tasks, the code — builds on top of them. The architect role, even when it is just you at a keyboard, has spoken.

### Specify and Clarify as the PM Layer

The `/speckit.specify` command generates a living spec document from a natural-language description. Running `/speckit.clarify` then surfaces every assumption in the spec and forces a decision. By the time the spec is marked *Clarified*, you have a document that reads like something a product manager or scrum master actually produced in a planning session:

- User stories with explicit priority levels (P1 MVP, P2, P3)
- Functional requirements that are numbered and independently testable (FR-001 through FR-016)
- Edge cases enumerated and given explicit handling decisions
- Every open question answered and recorded

The `/speckit.plan` step then acts as your sprint planning session. It sequences the implementation into phases — not arbitrarily, but according to the dependencies that were surfaced by the spec. The output is a phased plan that a developer can read and immediately understand *why* Phase 3 comes before Phase 4.

### Analyze as the BA Gate

One of the most underrated steps is `/speckit.analyze`. Before any task is committed to, the analyzer cross-checks the spec, the plan, and the existing tasks for consistency. Are there requirements in the spec that have no corresponding implementation step in the plan? Are there tasks referencing decisions that were never formally captured? Are there entries in the research document that contradict a choice made in the constitution?

This is the business analyst function — ensuring that what was *agreed* and what was *planned* and what was *tasked* are all telling the same story before anyone writes a line of code.

---

## ⚡︎ How SDD Adds Velocity

It might seem like producing all of this documentation *before* touching the codebase would slow things down. In practice, the opposite is true — but only when you understand where velocity is actually lost in a standard development cycle.

Most development time is not lost in the act of writing code. It is lost in:

1. **Ambiguity** — debating what the feature should actually do mid-sprint
2. **Scope creep** — pulling in work that was never part of the agreed plan
3. **Rework** — discovering that what was built does not match what was intended
4. **Context loss** — picking up a half-finished feature and having to reconstruct the decisions that shaped it

SDD addresses all four directly, and it does so by moving the iteration *upstream*.

### The Key Insight: Where Iteration Is Cheap

In a traditional approach, the first concrete artifact is code. Code is expensive to change — it has tests, dependencies, deployed state, and cognitive weight. When you discover a gap, you rework it in the most expensive medium available.

In a spec-driven approach, the first concrete artifact is a markdown document. Markdown is free to rewrite. The entire value of the pipeline is that it forces all the hard decisions — the scope boundaries, the data model, the error contracts, the sequencing — into a phase where changing your mind costs nothing.

```
Traditional:  Plan loosely → Code → Discover gaps → Rework code → Repeat
Spec-Driven:  Write spec → Clarify → Discover gaps → Rewrite spec → Plan → Code once
```

By the time a developer sits down to implement, there is no interpretation left to do. The spec defined *what*. The plan defined *how* and *in what order*. The tasks defined *exactly what to build next*. An AI assistant given this level of context generates accurate, targeted code — because there is nothing left to guess.

### Boundary Setting as a First-Class Concern

The spec and the constitution together form a hard boundary around the feature. Scope creep is resisted not by willpower or process discipline, but by structure. If something was not in the spec, it is not in the tasks. If it is not in the tasks, it does not get implemented this sprint. Adding it requires a new spec entry, a new plan entry, and new tasks — which is exactly the right amount of friction to apply to an unplanned expansion.

This mirrors what a strong scrum master does when a stakeholder asks for something new mid-sprint: not a flat refusal, but a redirect. *That belongs in the next spec. Let's finish what we committed to.*

### Checklist as Definition of Done

Because every task traces back to a functional requirement, and every requirement has a success criterion, there is always an objective answer to the question *are we done?* The QA checklist is not an afterthought written at the end — it was generated from the spec before implementation started. It defines done before the first commit.

---

## 📄 In Practice

I applied this entire workflow to my first real project, **EdiTrack API** — a production-grade EDI X12 transaction ingest platform built on ASP.NET Core. Every decision in the codebase — the data model, the API contract, the error envelope shape, the UUID v7 key strategy, the Serilog structured log fields — traces back to a named artifact in the `specs/` folder. The first `dotnet new webapi` command came well after the spec was clarified and the plan was approved.

The [EdiTrack API project page](/projects/editrack-api) covers the tooling, the business problem, and the architecture in full.

---

## ⏭️ What's Next

Starting from scratch is the ideal condition for spec-driven development. There is no legacy code, no undocumented decisions already baked into the architecture, no implicit contracts between systems that you have to reverse-engineer before you can even begin writing a spec.

The next thing I want to explore is applying this workflow to an **existing codebase**. The challenge is meaningfully different: how do you write a spec for something that was already built? How do you retroactively construct a constitution when the architectural decisions were made months or years ago — often without documentation? How do you bring the spec-kit pipeline into a project that is already in motion, mid-feature, mid-sprint, with real production constraints?

That is a different class of problem than starting fresh, and I expect it will surface a different set of insights. It is the next chapter.

---

## 📺 Further Reading

If you are getting started with GitHub Spec-Kit and want a hands-on walkthrough before applying it to your own project, the **Net Ninja** YouTube playlist on Spec-Kit is where I first encountered the tool in practice:

- [GitHub Spec-Kit — Net Ninja (YouTube Playlist)](https://www.youtube.com/watch?v=61K-2VRaC6s&list=PL4cUxeGkcC9h9RbDpG8ZModUzwy45tLjb)

Net Ninja covers the full workflow end-to-end in a digestible format and is a solid complement to the official documentation when you are orienting yourself for the first time.

---

## 🏛️ Closing Thought

GitHub Spec-Kit is an opinionated tool and it will not fit every team or every codebase. But for engineers who want the discipline of a structured SDLC without the overhead of full ceremony, it gives you exactly that — with AI handling the generation work and you making every decision that matters.

The spec is not the documentation.

**The spec is the development.**