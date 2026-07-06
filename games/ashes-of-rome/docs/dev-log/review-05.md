# Review 5 — Evening consequence pass

## Verdict

Pass 5 improves the actual game, not just scaffolding. The Rome slice now has a stronger daylight → evening collision → nightfall shape, with the second stop built from existing mortal pressures instead of jumping to a new era or rushing the Embrace.

The best improvement is that `rome_crossroads` no longer functions only as a direct nightfall router. It now asks the day for a second consequence and routes into five earned evening scenes keyed from prior flags: patron pressure, Prisca/Marcus paperwork, Gaius/Marcus search pressure, wax/Prisca/Varro testimony, and hidden-record/Livia pressure. That is exactly the kind of consequence collision the design journal has been asking for.

## High-priority user feedback

1. **Runtime/CDN architecture remains user-directed.** Kass previously corrected the assumption that Ashes lacked static CDN infrastructure. Pass 5 correctly avoided changing `games/index.html`, runtime URLs, public listing, release packaging, or CDN delivery. Keep doing that until the intended Loom/static-CDN setup is inspected deliberately. If jsDelivr remains in use later, never describe `@main` as pinned; use a tag or immutable commit SHA for release.

## Findings

1. **Playable flow is meaningfully better.** The current loop is finite: `rome_arrival` selects one daylight attachment, `rome_crossroads` offers a state-gated evening collision, the evening scene flows into a matching nightfall/rent scene, and the route ends in a state-aware observer beat. This is a real playable improvement.

2. **The second-stop design is strong because it recombines existing material.** The pass did not solve thinness by adding unrelated NPCs. It lets Livia, Marcus, Prisca, Gaius, Varro, records, wax, patronage, rent, and public speech cross-contaminate each other. That makes the Rome chapter feel more like a city and less like isolated choice branches.

3. **The bare-rent route is correctly constrained.** It appears only when the player avoided the major weaponized threads. That preserves a low-leverage route without undercutting stronger state-specific content.

4. **The observer remains at the right distance.** The old man still reads evidence rather than explaining clan logic. The best endings are the ones where he leaves a material disturbance or inference trail: moved tablet, ash, scratched name, ring mark, altered room texture. Keep the supernatural as interpretation pressure, not lore delivery.

5. **Runtime risk is now the blocker.** The chapter relies on conditional choice visibility, nested `all`/`not_flag` gating, item removal, ending behavior, save invalidation from version 5, and mobile readability. Source inspection looks coherent, and the pass log says route targets were checked, but this should not be expanded further until Loom behavior is smoke-tested in-browser or via a local/static harness.

6. **`humanity` is still a design ambiguity.** Mortal scenes continue to change `humanity` before the Embrace. Decide whether this is literal VTM Humanity, a mortal moral-pressure proxy, or a stat that should be renamed before later systems depend on it.

7. **Historical specificity remains safely broad but cannot stay broad forever.** The writing is still mostly social/material rather than procedural, which avoids false precision. Before adding firmer claims about Roman eviction, censorship, debt enforcement, magistrates, grain contracts, or legal paperwork, choose a date/reign anchor and research around it.

8. **Release checklist remains blocking.** The fan-project notice is present in `story.yaml`, but the exact current required logo, disclaimer, attribution text, and free/noncommercial constraints still need verification before public release or catalog promotion.

## Priority feedback for the next development pass

1. Run a runtime smoke test before adding more story: route visibility at `rome_crossroads`, each evening route, item removal in tablet/wax routes, ending restart behavior, localStorage/version-5 save invalidation, validation warnings, and mobile layout.
2. If the runtime test passes, do one of two things only: either add one tightly constrained third pressure beat using existing state, or choose the historical date/reign anchor and revise existing Rome texture around it.
3. Do not add a new era, public release entry, runtime/CDN change, clan menu, or Embrace scene yet.
4. Keep the strongest design pattern from this pass: mortal systems colliding first, supernatural attention arriving as a reader of what the player made visible.

## Recommended next pass

Smoke-test version 5 end-to-end. If it behaves correctly, either deepen the current finite day with one more bounded collision or pin the historical setting before adding more procedural Roman detail. The game is finally improving as a game; protect that by validating runtime behavior before content expansion.
