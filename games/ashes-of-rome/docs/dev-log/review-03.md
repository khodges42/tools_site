# Review 3 — State-aware observer pass

## Verdict

This pass improved the actual game, not just the scaffolding. It directly addressed the highest-priority notes from Review 2: the bare-rent route is no longer an always-visible escape hatch, the generic personality-archetype ending has been split into route-specific endings, and the hidden-record branch gives the first Rome slice a stronger second pressure point before supernatural attention lands.

The pass is strongest where it keeps the mortal world material: tablets, rings, rent, patron messages, Livia's room, public accusation, forbidden verses, and wax likenesses. The old observer now reacts to concrete evidence instead of reading like a quiz-result narrator.

## High-priority user feedback

1. **Keep runtime/CDN architecture user-directed.** Kass has a static CDN and explicitly corrected the earlier assumption that the project lacked one. This pass correctly left Loom delivery alone. Do not change `index.html`, pin jsDelivr, or swap runtime paths until the actual intended static-CDN/deployment setup is inspected. If jsDelivr-from-GitHub remains in use, `@main` is mutable and must not be described as pinned.

## Priority feedback for the next development pass

1. **Validate nested conditions before content expansion.** The new bare-rent fallback depends on nested `requires: all:` with multiple `not_flag` entries. Source inspection says this is intended, but the next pass should test or simulate actual Loom behavior before building a larger multi-stop day on top of it. Specifically verify: hidden-record routes appear only when `rome_secret_record` is true; bare rent appears only when no specific nightfall-driving flag is true; route-specific endings are reachable; item removal still works; restart/save version behavior is sane.

2. **Do not rush the Embrace or a new era.** The best part of the current slice is that Rome is still a mortal trap first and a vampire story second. Keep the old watcher as pressure, not explanation. The next useful expansion is a bounded day/evening structure, not transformation.

3. **Build a real two-stop day, but keep it finite.** The first slice still allows only one daylight attachment before nightfall. That was good for closing stat farming, but now the next pass can safely attempt two non-repeatable stops using visited flags. The goal should be: choose one public/private pressure, choose one household/work/patronage pressure, then force those two earned threads to collide at nightfall.

4. **Prefer route-specific observer evidence over repeated observer cameos.** The endings are better, but the old man still appears in most routes in similar framing. Vary certainty and distance: one route can show him directly, one can show evidence he touched a tablet, one can show a patron suddenly knowing too much, one can leave only a secondhand rumor. This will make him feel less like a quest marker.

5. **Clarify `humanity` before more systems depend on it.** Current changes still use `humanity` for mortal-era choices. That may be okay, but the dev docs should decide whether this is literal VTM Humanity, pre-Embrace moral pressure, or a story-local stat. If it is not literal VTM Humanity, rename or document it before adding more downstream consequences.

6. **Pin the Rome historical frame before precise legal claims.** The story currently works because it avoids overclaiming exact Roman law. Before adding eviction procedure, censorship authority, debt enforcement rules, legal offices, or precise patron-client obligations, choose a date/reign and research around that anchor.

7. **Release/legal remains a blocker for public listing.** Do not link from `games/index.html` or present this as release-ready until the current official fan-project requirements are checked and exact required disclaimer/attribution language is added. Keep exact legal text out of story files until verified.

## Story notes

- `A Tablet with Two Shadows` is the strongest new material because it joins record-keeping, rent, patron pressure, and household survival in one object.
- `A Mercy With Teeth` still works as the first-slice ending title. Keep it.
- The “not the Embrace, not yet” restraint is correct. Let the player become legible to the night before they become claimed by it.
- Livia is currently carrying a lot of emotional weight. The next pass should make sure she remains a person with her own needs, not only a meter for household stakes.
- Marcus, Varro, Prisca, Gaius, and the collector are now strong enough to collide. Use them before inventing more named NPCs.

## Recommended next pass

First run or simulate a Loom smoke test of the new conditional route behavior. If it passes, implement a finite two-stop day/evening structure with visited flags and no replay farming. The content goal should be two earned mortal threads colliding before nightfall, with observer evidence that varies by route. Do not add a new era, do not advance to the Embrace, and do not change runtime/CDN paths without inspecting the intended static deployment setup.
