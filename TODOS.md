# YCstack — TODOs

## Phase 2: Skill Expansion
**What:** Add 15+ new skill prompts — pricing, fundraise, growth-hacks, competitor-analysis, cold-email, weekly-update, launch-checklist, cap-table, market-size, user-interviews, pivot, tech-stack, postmortem, hire, legal.
**Why:** Each skill is a standalone .md file with zero code changes. More skills = more value = more installs. The orchestrator auto-discovers new skills from the catalog.
**Context:** Each skill follows the standardized structure (ROLE → CONTEXT → STEPS → OUTPUT → STYLE RULES). Estimated ~30 min per skill. Can be prioritized individually based on user demand.
**Effort:** M (per skill: S)
**Depends on:** Phase 1 shipped, skill structure validated

## GitHub Actions CI
**What:** On every push, run validate-urls.sh to verify all skill URLs return HTTP 200.
**Why:** One broken URL = one entire skill unavailable. Automated checks catch renames and deletions before they reach users.
**Context:** validate-urls.sh already exists. Just needs a .github/workflows/validate.yml wrapper.
**Effort:** S
**Depends on:** Repo being public, validate-urls.sh existing

## Community Contribution Guide
**What:** Write CONTRIBUTING.md explaining the skill prompt structure, how to test a new skill, and how to submit a PR.
**Why:** Unlocks community skill authoring. The self-orchestrating architecture means anyone can add a skill by submitting one .md file.
**Context:** Standardized skill structure (ROLE → CONTEXT → STEPS → OUTPUT → STYLE RULES) must be finalized first. Include a skill template and examples.
**Effort:** M
**Depends on:** Phase 1 shipped, skill structure validated, at least some community interest (GitHub stars/forks)

## Custom Domain
**What:** Register ycstack.com (or similar) and point to GitHub Pages.
**Why:** Brandable URLs, more professional appearance, decouples from GitHub username.
**Context:** GitHub Pages supports custom domains natively. ~$12/yr for a .com domain. No code changes needed — just DNS config.
**Effort:** S
**Depends on:** Nothing
