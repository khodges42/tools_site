# Review 2 — Nightfall convergence pass

## Verdict

This pass materially improved the game rather than adding scaffolding. It directly resolved the worst structural defect from Review 1: the infinite Rome hub loop is gone, contradictory branch replay/stat farming is closed, convergence is driven by actual flags, and the playable slice now has a clear daylight → rent crisis → nightfall ending shape. The strongest improvement is that ordinary mortal pressures still drive the scene while supernatural attention remains observational rather than explanatory.

## High-priority user feedback

1. **Runtime delivery architecture remains user-directed.** Kass explicitly corrected the assumption that the project lacked a static CDN. Do not invent a replacement architecture. Inspect the actual Loom static-CDN/deployment setup before changing `index.html`. jsDelivr-from-GitHub is an available option Kass found interesting, not an automatic decision. If jsDelivr is retained for production, do not use or describe `@main` as pinned; use a release tag or immutable commit SHA.

## Priority feedback for the next development pass

1. **Do not immediately add a multi-stop day until browser behavior is proven.** The source structure looks coherent, but this pass still has no live smoke test. First verify YAML parsing, chapter merge, conditional choice visibility for each branch, item removal, stat/flag effects, ending/restart behavior, save fingerprint/version behavior, and mobile layout. A content expansion built on an untested runtime path risks compounding invisible defects.

2. **The fallback bare-rent route needs intent, not just availability.** Because it is always visible, players with a specific unlocked thread can bypass the consequence they just created. Either condition it so it is truly a fallback, or rewrite it as a deliberate avoidance choice whose consequences are distinct and arguably worse. Avoidance can be good gameplay; accidental escape from state is not.

3. **The convergence improved state correctness but still only collides one earned thread with rent.** Review 1 asked for at least two prior threads to collide. The current routes mostly pair one daylight thread with the universal collector. The next content pass should create a bounded second stop/evening beat where two player-earned relationships or artifacts interact. This is more important than adding a new era or the Embrace.

4. **The observer is appropriately subtle, but the ending over-summarizes player archetypes.** The final line listing “useful liar, public risk, keeper of dangerous words, maker of true faces...” partially reintroduces the personality-quiz feeling the design rules reject. Prefer route-specific observer behavior or conditional text that reveals what the observer noticed without categorizing the player. Keep the watcher interested in concrete acts and access, not a moral/personality type.

5. **Pin the Roman date/reign before increasing legal specificity.** Current material works because it stays at the level of rent, patronage, petitions, copying, water access, household precarity, and social pressure. Before specifying legal procedure, censorship authority, debt enforcement powers, eviction/seizure process, or precise civic offices, choose a date/reign and research those institutions for that period. Do not retrofit precise law onto an intentionally floating Rome.

6. **Be careful with the `humanity` stat semantics.** Several choices award or subtract Humanity for pragmatic tradeoffs that may not map cleanly to Vampire: The Masquerade Humanity mechanics. Before expanding this pattern, decide whether these are literal VTM Humanity changes, a pre-Embrace moral disposition seed, or merely internal story scoring. If literal, verify edition/system assumptions; if not literal, rename or document the distinction.

7. **Release checklist remains a gate, not a background note.** No games-index link or public release should happen until current official fan-content requirements are checked from the current official source: permitted/noncommercial scope, required attribution/disclaimer language, trademarks/logos/marks, and any content restrictions. Keep exact legal wording out of story/dev docs until verified.

## Story and historical notes

- The collector/porters imagery is effective because it makes debt physical. Keep that material mode.
- The old observer appearing in every route risks feeling mechanically inevitable. Consider varying distance, evidence, or certainty by route: perhaps one path sees him directly, another only finds that someone asked about the tablets, another notices a patron already knows too much. This preserves supernatural attention without making the same NPC cameo feel like a quest marker.
- `A Mercy With Teeth` is a strong title and the non-Embrace ending is the right restraint. Do not rush the transformation.
- The next meaningful story advance should make the player lose the ability to keep every mortal obligation compartmentalized. Livia, Gaius, Prisca, Marcus, Varro, the collector, and the observer should begin creating incompatible demands.

## Recommended next pass

Run the runtime/browser smoke test first. If the flow is sound, make the bare-rent choice intentionally consequential, replace the ending's archetype list with state-aware observer detail, and add one bounded second beat where two earned mortal threads collide. Do not add a new historical era yet.