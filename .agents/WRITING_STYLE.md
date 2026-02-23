# Writing Style Guide

## Why this file exists

I use AI agents to help me write basic informational articles — the kind where I solved a technical problem and want to document it for others (e.g. PopOS on a MacBook Pro, M5Stack with Home Assistant). Without this help, I'd probably never get around to writing these up, and the learnings would just stay in my head instead of being useful to someone Googling the same problem at 2am.

**This is not for deeply thoughtful or personal writing.** Essays, opinions, product narratives — those I write myself. This guide is strictly for practical "I hit a problem, here's how I fixed it" articles.

The goal is to sound like me, not like AI. No slop. Study the examples below carefully — they're pulled from my actual writing across my blog, the [Coder blog](https://coder.com/blog), and [GitHub issues](https://github.com/coder/coder/issues?q=author:bpmct).

---

## Voice

Write like an engineer talking to another engineer. First person, casual, direct. Confident but not arrogant — admit when something is janky or not ideal.

**Examples of my actual voice:**

- "Kubernetes is awesome and we still recommend enterprises use Coder v2 with Kubernetes but, as a small startup, it was overkill for us." — [Bare metal blog post](https://coder.com/blog/how-our-development-team-shares-one-giant-bare-metal-machine)
- "We're building a remote development platform, so local development wouldn't be a good choice for us. Awkward." — same post
- "Sounds kinda scary." — [code-server deployment guide](https://coder.com/blog/deploying-code-server-and-developing-in-the-cloud), after listing all the requirements for remote dev
- "code-server is a tool, not a workflow." — same post

No corporate polish. No "In today's fast-paced world." No "we're excited to announce." Just say the thing.

---

## Openings

Open with why the article exists — one or two sentences max. What I was trying to do, why it was harder than expected. Jump straight to the point.

**Examples of my actual openings:**

- "Well, we actually develop on two machines. When our Australian coworkers found out, they wanted one too." — [Bare metal post](https://coder.com/blog/how-our-development-team-shares-one-giant-bare-metal-machine)
- "TLDR: code-server is a tool for developing on a remote server with VS Code in the web browser. I created deploy-code-server to help people quickly install it on popular cloud platforms." — [code-server deploy post](https://coder.com/blog/deploying-code-server-and-developing-in-the-cloud)
- "Setting up developer environments for Kubernetes projects can be complex. With Coder, developers can auto-provision a namespace on your development cluster, no need to configure tools or spin up infrastructure locally." — [Kubernetes Namespaces as Dev Environments](https://coder.com/blog/kubernetes-namespaces-as-dev-environments)

---

## Structure

- **Problem → Solution sections** with clear H2/H3 headers. Each section should be self-contained so people can skip to what they need.
- **End with next steps or open questions**, not a grand conclusion. These are living documents, not essays.
- Add "Last Updated: [date]" at the bottom. I may come back to update these.

Each section should follow the same pattern:
1. H2 header naming the problem
2. One or two sentences of context
3. Code block showing the error/output/config
4. Brief explanation + fix
5. Credit the source if I used someone else's workaround

---

## Tone rules

- Short paragraphs — rarely more than 3-4 sentences.
- Short to medium sentences. No complex clauses or academic phrasing.
- Use parentheticals for asides: *(showing roughly 1/10 of the actual capacity, like 56GB instead of 500GB)*
- Emoji sparingly and only when natural. Not decoration. I use them in tables ("😎 Cool", "🤷 Meh") or inline asides ("especially 😉 an enterprise") — never a wall of them.
- No buzzwords. No "revolutionize," "game-changing," "seamless," "leverage."
- No hedging filler like "It's worth noting that" or "Interestingly enough." Just state the thing.
- Don't over-explain tools or concepts — link to docs instead of re-explaining inline.
- "figured I'd" > "I decided to." Casual contractions are fine.
- Introduce code blocks with a short sentence ending in a colon: "The logs found in /tmp/installer.log showed:", "My xremap config:", "Open Terminal and run:"

---

## Code and evidence

- Show real terminal output, real configs, real error messages. Not pseudocode.
- Always use language tags on code blocks (use `text` for plain output).
- Provide context before a code block — what it does and why — but keep it brief.
- Credit people by name/username when using their workaround or solution. Link to the source:
  > "A workaround was shared by [tnorman42](https://github.com/tnorman42) in their comment on GitHub issue #253"
  >
  > "I followed rob-hills' notes and added the Broadcom config file"
- Link to specific GitHub issues, gists, forum threads. Be specific — link to the exact comment, not just the repo.

---

## Reference examples

These are real things I've written. Study them for voice, structure, and tone.

### Coder blog

- [How Our Development Team Shares One Giant Bare Metal Machine](https://coder.com/blog/how-our-development-team-shares-one-giant-bare-metal-machine) — Casual tone, honest about tradeoffs, benchmark tables with emoji, self-deprecating humor
- [Deploying code-server and Developing in the Cloud](https://coder.com/blog/deploying-code-server-and-developing-in-the-cloud) — Tutorial style, TLDR opening, "Sounds kinda scary" tension break
- [Kubernetes Namespaces as Dev Environments](https://coder.com/blog/kubernetes-namespaces-as-dev-environments) — Shows code, adds one-line context, moves on. Casual wrap-up: "That's it!"
- [Achieving Low Latency Remote Development](https://coder.com/blog/achieving-low-latency-remote-development) — Concrete numbers with honest caveats ("While your own performance improvement may vary")
- [Configuring Node.js Workspaces in Coder](https://coder.com/blog/configuring-node-js-workspaces-in-coder) — Step-by-step, practical
- [Automate Developer Onboarding with Coder](https://coder.com/blog/automate-developer-onboarding-with-coder) — Problem → solution walkthrough

### GitHub issues (how I write when I'm not "writing")

These show my natural voice when documenting problems and proposals. The more descriptive ones are good reference for how I explain technical problems:

**Root-cause analysis / technical deep-dives:**
- [#21183 — Command apps don't show up in Tasks view](https://github.com/coder/coder/issues/21183) — Full root cause with exact file/line references, code snippets, clear Problem → Root Cause → Fix structure
- [#20763 — Add checks to identify costly database migrations](https://github.com/coder/coder/issues/20763) — Real incident postmortem driving the issue, investigation checklist
- [#20762 — Improve visibility when a database migration is occurring](https://github.com/coder/coder/issues/20762) — Empathetic framing from the admin's perspective: *"Why is Coder not upgrading?" "Where can I see the status?"*
- [#8517 — Prevent agents from being killed in CPU or memory-constrained workspaces](https://github.com/coder/coder/issues/8517) — Technical background on NICE levels and OOM killer

**Customer-motivated feature requests:**
- [#21715 — Add 24 hour grace period for licenses](https://github.com/coder/coder/issues/21715) — Opens with specific customer story: *"A customer had a license that was thought to expire by Jan 27. However, the expiration actually occurred on 6 AM on Jan 27, not at the end of the day. This led to a disruption in the Coder service."*
- [#20399 — Add deployment flag to disable/anonymize template insights](https://github.com/coder/coder/issues/20399) — Compliance motivation, multiple solution options with tradeoffs
- [#20743 — Add support for retention policy on large tables](https://github.com/coder/coder/issues/20743) — Customer pain → concrete benefits list → solution proposal
- [#10109 — Make external auth providers optional](https://github.com/coder/coder/issues/10109) — Real migration scenario, current vs desired behavior clearly separated

**Vision / feature specs:**
- [#5325 — Workspace pre-builds](https://github.com/coder/coder/issues/5325) — Opens with customer pain (30+ min builds), structured overview with workstreams
- [#13434 — ☂️ Restructure our docs](https://github.com/coder/coder/issues/13434) — Umbrella issue with information architecture rationale: *"Our current structure reads like a reference, which can be great for recalling information but makes it difficult for a new reader."*
- [#4203 — Surface deployment settings/status in the UI](https://github.com/coder/coder/issues/4203) — *"It can be difficult for new admins to see the features Coder has to offer, since they are hidden as CLI flags."*
- [#9495 — Insights: Show weekly active users instead of daily](https://github.com/coder/coder/issues/9495) — Challenges current approach with data reasoning: *"Most people will not connect during weekends, adding large fluctuations to the graph"*

**First-person user stories:**
- [#4973 — Auto start workspace when I connect via SSH](https://github.com/coder/coder/issues/4973) — Written from personal experience: *"I primarily interact with my workspace via VS Code Remote SSH by clicking my workspace in the sidebar. However, it's often off."*

**UX improvements with screenshots:**
- [#15048 — Improve UX when there is no corresponding provisioner](https://github.com/coder/coder/issues/15048) — Screenshots of current state, suggested error copy
- [#19984 — Better UX when coder_app URL is visited and workspace is not ready](https://github.com/coder/coder/issues/19984) — *"Many users are building automations around Coder, where the control plane is rarely visited, but coder_apps itself are visited commonly."*

**Terse but effective (when brevity is the whole message):**
- [#21179 — cmd+enter to submit tasks](https://github.com/coder/coder/issues/21179) — Entire body is one sentence: *"On the tasks page, you should be able to hit cmd+enter (Mac) or ctrl+enter (Windows/Linux) to automatically kick off/submit a new task"*

---

## What to avoid (AI slop checklist)

- ❌ Starting with "In this article, we'll explore..."
- ❌ "Let's dive in"
- ❌ Transition phrases like "Now that we've covered X, let's move on to Y"
- ❌ Restating what was just said in different words
- ❌ Concluding with "In conclusion" or summarizing the whole article
- ❌ Exclamation marks for fake enthusiasm
- ❌ "Happy coding!" or any sign-off like that
- ❌ Explaining what a terminal is, what Linux is, etc. The reader knows.
- ❌ Padding short sections to make them look longer
- ❌ Using 5 sentences when 1 would do
- ❌ "Whether you're a beginner or an expert" — I write for one audience
- ❌ "In this guide, I'll walk you through" — just start walking
- ❌ Any sentence that exists only as a transition and adds no information
