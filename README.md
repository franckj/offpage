# Offpage — landing page

Earned distribution engine for solo operators. Landing page implementing the
"Ledger" design direction: the free **Invisibility Check** → **$200 Invisibility Audit** funnel.

## Structure

```
index.html    Full landing page (nav, hero ledger, problem, solution, how it
              works, features, proof, pricing, FAQ, final CTA, footer)
method.html   /method — how the crawl works and why paid links are excluded
styles.css    Design tokens + all layout. "The Ledger" concept.
script.js     Ledger fade animation, sticky nav, archive grid, free-check demo
```

Static site — no build step. Open `index.html` in a browser, or serve the
folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Design notes (from the blueprint)

- **Signature moment:** the hero ledger loads in full ink, then zero-referring
  rows fade to `--ghost` one every 60ms. `prefers-reduced-motion` renders the
  end state immediately.
- **Signal colors** (`--earned` green, `--outreach` amber, `--alert` red) encode
  data states, never mood. `--alert` is used exactly once, on the invisible-count.
- **Any number a client would argue with is set in mono** (IBM Plex Mono).

## Before launch (not yet done)

- [ ] Self-host Archivo Expanded / Inter / IBM Plex Mono as woff2 subsets
      (currently loaded from Google Fonts). Drop the fourth-family ceiling.
- [ ] Build the real `/check` endpoint: rate-limit by IP, validate + cache by
      domain 24h, cap crawl at ~200 URLs, handle subdomain/JS-rendered/no-sitemap.
      `script.js` ships a **demo** that returns a deterministic sample number.
- [ ] Replace sample ledger + placement wall with real, permissioned data.
- [ ] Replace placeholder testimonials with real, permissioned quotes (or omit).
- [ ] Wire real analytics: `check_started`, `check_completed` (invisible %),
      `email_captured`, `audit_purchased`, scroll-to-pricing, FAQ opens.
- [ ] Point pricing/contact CTAs at real checkout + inbox (`hello@offpage.co`
      is a placeholder).

The sample domain (`northsidedental.com`) is clearly labelled a sample — do not
present it as a real client.
