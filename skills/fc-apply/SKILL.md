---
name: fc-apply
version: 0.1.0
description: |
  Interactive incubator/accelerator application builder. Walks you through every
  question of a standard application form, drafts answers from your codebase,
  stress-tests each one, and outputs a submission-ready application. Includes video
  script for the 1-min founder video. The full application prep pipeline.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
  - Agent
---

# Accelerator Application Builder

You are running the `/fc-apply` skill. You walk the founder through building a complete, submission-ready accelerator application — interactively, one question at a time.

---

## How This Differs from `/fc review`

`/fc review` generates a full startup analysis in one shot.
`/fc-apply` is **interactive** — you work through each question WITH the founder, challenging and refining each answer before moving to the next.

---

## Step 1: Context Gathering

Silently read the codebase. Same pattern as other /fc skills.

Then output:

---

**APPLICATION BUILDER**

I've read your codebase. Here's what I know about your company before we start:

- **What I think you're building:** [1 sentence from README/code]
- **Your stack:** [from package.json/requirements.txt]
- **Your stage:** [pre-launch / launched / revenue]
- **Team:** [from git contributors]

Let's build your application. I'll walk you through each question. For each one, I'll draft an answer, then we'll refine it together.

---

## Step 2: The Application (Question by Question)

For EACH question below, follow this exact flow:

### Flow per Question:

1. **Show the question** — display the application question
2. **Show what they're really asking** — the subtext behind the question (what separates good from great answers)
3. **Draft an answer** — based on codebase context, write a strong first draft
4. **Critique it** — point out weaknesses an evaluator would flag
5. **Ask the founder** — via AskUserQuestion, present options:
   - "Use this draft" — move on
   - "I want to edit it" — let them provide their version, then critique that
   - "This is wrong, let me explain" — they correct your understanding, you redraft
6. **Lock it in** — save the final answer

### The Questions:

**Q1: Company name**
- Just confirm it. Move fast.

**Q2: Company URL (if any)**
- Check if there's a deployed URL in the codebase (Vercel, Netlify, custom domain in config)

**Q3: One-line description of your company (max 70 characters)**
- This is THE hardest question. Most founders can't do it.
- **What they want:** Could your mom understand this in one read? No jargon. No "platform." No "leveraging AI to..."
- **The test:** Read it to someone who knows nothing about tech. Do they get it?
- Draft 3 options. Let the founder pick and refine.

**Q4: What does your company do? (max 200 words)**
- **What they want:** A smart friend should understand after reading this. If they don't, you've failed.
- **Structure:** [Who has the problem] + [what the problem is] + [what you built] + [why it works]
- No buzzwords. No "revolutionary." No "disruptive."

**Q5: Where do you live? Where is the company based?**
- Quick answer. Move on.

**Q6: Founders (name, role, background, equity split)**
- From git history, identify contributors
- Ask the founder to fill in backgrounds
- **What evaluators care about:** Technical co-founder? Full-time? Equal-ish equity split? (Unequal splits are a red flag)

**Q7: How long have the founders known each other?**
- **Why this matters:** Long relationship = less likely to break up. Accelerators have seen too many co-founder divorces.

**Q8: Progress — What have you built? How many users/customers?**
- **The most important question after the one-liner.**
- **What they want:** Evidence you can execute. Code > slides. Users > plans. Revenue > users.
- Pull from codebase: what's actually built (routes, features, integrations)
- Pull from git: how long have they been building, how fast
- **Red flags to avoid:** "We plan to..." "We're about to..." "We will..."
- **Green flags:** "We have X users." "We're doing $Y/month." "We shipped Z last week."

**Q9: How will you make money? (Revenue model)**
- **What they want:** You've thought about it. It doesn't have to be perfect. But "we'll figure it out later" = reject.
- Look for: Stripe integration, pricing page, subscription code, billing models in the codebase

**Q10: How much money have you raised? From whom?**
- Ask the founder directly.

**Q11: Have you incorporated?**
- Ask directly. Delaware C-Corp is standard for US startups.

**Q12: Why did you pick this idea to work on?**
- **What they want:** Founder-market fit. Personal pain > market research. Domain expertise > MBA analysis.
- **The magic answer structure:** "I experienced [specific problem] when I was [specific context]. I tried [existing solutions] and they all [specific failure]. So I built [your solution]."

**Q13: What domain expertise do you have?**
- Related to Q12. What makes YOU specifically the right person?

**Q14: What do you understand about your business that other companies don't?**
- **This is the "secret" question.** PG's famous question.
- **What they want:** A non-obvious insight. Something counterintuitive. Something earned, not researched.
- **Bad answers:** "We use AI." "The market is big." "No one is doing this."
- **Good answers:** Specific, surprising, earned through direct experience.

**Q15: Who are your competitors? What do you understand that they don't?**
- **What they want:** You know the landscape deeply. You respect competitors but see a gap they don't.
- **Red flag:** "We have no competitors." (Everything has competitors. If you think otherwise, you don't understand the market.)

**Q16: How will you get users? (Growth strategy)**
- **What they want:** A specific, believable plan. Not "social media marketing."
- **Good:** "I'm going to personally email 100 [specific people] this week because [reason]."
- **Good:** "Our users share because [specific mechanism in the product]."

**Q17: 1-minute founder video**
- Generate a video script (see below)

---

## Step 3: The Founder Video

The 1-minute video is often the deciding factor. Generate:

```
┌──────────────────────────────────────────────────────────────┐
│              1-MINUTE FOUNDER VIDEO SCRIPT                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  0:00-0:05  INTRO                                            │
│  "Hi, I'm [name]. I'm building [company]."                   │
│                                                              │
│  0:05-0:15  THE PROBLEM                                      │
│  "[Specific problem]. [Who has it]. [Why it matters]."       │
│                                                              │
│  0:15-0:30  THE SOLUTION + DEMO                              │
│  "[What we built]. Let me show you."                         │
│  [Screen share of the actual product working]                │
│                                                              │
│  0:30-0:40  TRACTION                                         │
│  "[What's happened since we launched]."                       │
│  "[Specific numbers]."                                        │
│                                                              │
│  0:40-0:50  WHY US                                           │
│  "[Why we're the right team]."                                │
│  "[What we know that others don't]."                          │
│                                                              │
│  0:50-1:00  THE ASK                                          │
│  "We're applying to [program] because [specific reason]."     │
│  "[What we'll accomplish in the program]."                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  TIPS:                                                        │
│  - Look at the camera, not a script                          │
│  - Film in good lighting, quiet room                         │
│  - Show the product (screen share > slides)                  │
│  - Energy matters. Be yourself but be excited.               │
│  - One take is fine. Don't over-produce it.                  │
│  - If you have co-founders, both should appear               │
└──────────────────────────────────────────────────────────────┘
```

## Step 4: Final Application Output

After all questions are complete, write to `application.md`:

```markdown
# Application — [Company Name]

### Submission-Ready Answers

[All finalized answers, formatted for copy-paste]

### Application Strength Assessment

Overall: X/10

Strongest answers: Q[X], Q[Y] — because [reason]
Weakest answers: Q[X], Q[Y] — because [reason]

### Pre-Interview Prep

If you get an interview, they will ask about:
1. [weakness #1 in your application]
2. [the metric you cited — be ready to go deeper]
3. [your growth plan — have specifics]

Run `/fc-interview` to practice.

### Video Script

[The 1-minute script from Step 3]
```

## Style Rules

1. **One question at a time.** Never show all questions at once. The interactive flow is the whole point.
2. **Draft first, then ask.** Don't make the founder stare at a blank page. Give them something to react to.
3. **Be the critic.** For every draft, point out what an evaluator would challenge. Then fix it.
4. **Concrete > abstract.** "We have 47 paying customers at $29/mo" beats "We have strong traction."
5. **The one-liner is everything.** Spend extra time on Q3. Get it perfect.
