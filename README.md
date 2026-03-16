# YCstack

**A YC partner in your terminal.** One command gives you startup review, application prep, mock interviews, pitch coaching, and more — all contextualized to your codebase.

YCstack is a self-orchestrating [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill. You install one thing, run one command (`/yc`), and it dynamically loads the right skill for what you need. Skills are fetched on demand from this repo — new skills appear automatically, no update needed.

### Without YCstack

- You ask ChatGPT "act as a YC partner" and get generic advice
- You can't find the relevant 90 seconds from a 2000-video library at 2am
- Your pitch deck gets feedback on grammar, not on whether the business makes sense
- Interview prep means memorizing answers, not stress-testing your thinking

### With YCstack

| Skill | What it does |
|-------|-------------|
| **review** | Full startup analysis — scores idea, market, product, moat, team. Cites real YC essays. |
| **roast** | Brutal PG-style feedback. Strips the marketing language. Tells you the hard truth. |
| **apply** | Interactive YC application builder. Walks through all 17 questions one at a time. |
| **interview** | Mock 10-minute partner interview. Two partners grill you. Scorecard at the end. |
| **demo-day** | 60-second Demo Day pitch builder. Scores each section. Iterates until investor-ready. |
| **office-hours** | 1-on-1 partner session. Bring a problem, work through it interactively. |
| **metrics** | Hunt through your codebase for growth signals. North star metric recommendation. |
| **speed-run** | Full readiness report. Review + roast + metrics in one pass. Overall score. |
| **founders-like-you** | Find YC alumni with similar companies. Learn from their journeys. |

### How It Works

```
  You run: /yc

  ┌─────────────────────────────────────────────────────────┐
  │  1. Reads your codebase silently                         │
  │     README, package.json, git history, routes, models    │
  │                                                          │
  │  2. Asks what you need                                   │
  │     "Review my startup" / "Practice interview" / etc.    │
  │                                                          │
  │  3. Fetches the right skill from GitHub                  │
  │     Skills live on the web — always up to date           │
  │                                                          │
  │  4. Executes with live YC knowledge                      │
  │     WebSearches for relevant YC essays, videos, talks    │
  │     Cites real sources with URLs                         │
  │                                                          │
  │  5. Delivers specific, codebase-aware advice             │
  │     Not generic — references YOUR code, YOUR metrics     │
  └─────────────────────────────────────────────────────────┘
```

Every piece of advice references something specific from your codebase. Every citation is a real YC essay, lecture, or partner talk. No generic startup advice.

---

## Install

### Requirements
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- Git

### One-line install

Paste this into Claude Code:

```
Install YCstack: run `git clone https://github.com/VedSoni-dev/YCstack.git
~/.claude/skills/ycstack && cd ~/.claude/skills/ycstack && bash setup`
```

Claude will clone the repo, create the skill symlink, and update your CLAUDE.md.

### Manual install

```bash
git clone https://github.com/VedSoni-dev/YCstack.git ~/.claude/skills/ycstack
cd ~/.claude/skills/ycstack
bash setup
```

### What gets installed

- One skill file (`~/.claude/skills/yc/SKILL.md`) — the orchestrator
- One line in your `~/.claude/CLAUDE.md` — registers the `/yc` command
- Nothing else. All other skills are fetched on demand from this repo.

---

## Usage

Run `/yc` in any project directory:

```
/yc              → Choose what you need
/yc review       → Full startup analysis
/yc roast        → Brutal PG-style feedback
/yc apply        → Interactive application builder
/yc interview    → Mock partner interview
/yc demo-day     → 60-second pitch builder
/yc office-hours → 1-on-1 partner session
/yc metrics      → Find growth signals in code
/yc speed-run    → Full readiness report
```

---

## Architecture

```
  YOUR MACHINE                              GITHUB
  ───────────────────────                   ───────────────────────
  ~/.claude/skills/yc/SKILL.md              VedSoni-dev/YCstack/
  (the only installed file)                     │
      │                                         ├── skills/
      ├── reads your codebase                   │   ├── index.json
      ├── asks what you need                    │   ├── review.md
      ├── fetches skill from GitHub ──────────▶ │   ├── roast.md
      ├── executes fetched instructions         │   ├── apply.md
      └── searches for live YC content          │   ├── interview.md
                                                │   ├── demo-day.md
                                                │   ├── office-hours.md
                                                │   ├── metrics.md
                                                │   ├── speed-run.md
                                                │   └── founders-like-you.md
                                                │
                                                └── site/ (landing page)
```

**Why this architecture:**
- Tiny install footprint (one file)
- Skills are always up to date (fetched from web, not cached)
- New skills appear automatically — no `git pull` needed
- Works offline with embedded fallback review
- Anyone can contribute a new skill by submitting one `.md` file

---

## Add to Your Project

To share YCstack with your team, copy it into your project:

```bash
cp -Rf ~/.claude/skills/ycstack .claude/skills/ycstack
rm -rf .claude/skills/ycstack/.git
```

Teammates run `cd .claude/skills/ycstack && bash setup` once after cloning.

---

## Contributing

Each skill is a standalone `.md` file in the `skills/` directory. To add a new skill:

1. Create `skills/your-skill.md` following the structure: ROLE → CONTEXT → STEPS → OUTPUT → STYLE RULES
2. Add an entry to `skills/index.json`
3. Submit a PR

The orchestrator auto-discovers new skills from `index.json`.

---

## License

MIT
