# offpage: Claude Code instructions

Earned distribution engine for solo operators. Landing page implementing the "Ledger" design direction: the free **Invisibility Check** → **$200 Invisibility Audit** funnel.

Part of Franck's portfolio. Cross-project context (rules, access, decisions) lives in `franckj/ops`: read its `BA-STATE.md` first when you need it.

## At the start of a session
`git pull`, then read: `README.md`.

## Rules
- Franck prompts, Claude Code builds. Be direct.
- A push to `main` can go live; only push site changes when Franck said "deploy" in the session.
- No invented facts, numbers, prices or reviews: every figure comes from a source you checked, or it stays out.
- Never commit keys, tokens, `.env` files or credentials. Name a secret by its variable name only.
- After a live page change: submit the changed URLs (IndexNow) and resubmit the sitemap, as described in `franckj/ops`.
- Update the docs you changed or whose state changed before ending a session, then commit and push.

_Generated 2026-11-01 from the repo's README and package.json. Add the project's real conventions here as they come up._
