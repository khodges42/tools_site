# Review 4 — Route validation and release-risk pass

## Verdict

This pass still improves the actual game rather than only scaffolding it. The strongest current change is that the Rome slice is now coherently shaped around one daylight attachment, one nightfall pressure, and one observer response. The version 4 manifest includes dedicated observer flags for debt, public action, learning, art, records, and bare restraint, which makes later sire/legacy logic easier to derive from play instead of from a menu.

The playable flow is now better bounded than the early hub loop: `rome_arrival` chooses an attachment, that attachment converges at `rome_crossroads`, and `rome_crossroads` now routes only to state-relevant nightfall scenes plus a gated bare-rent fallback. The bare-rent route is no longer an always-visible escape hatch, which directly addresses earlier feedback.

## High-priority user feedback

1. **Runtime/CDN architecture remains user-directed.** Kass explicitly corrected the earlier assumption that Ashes lacked static CDN infrastructure, then reacted positively to the jsDelivr-from-GitHub possibility. Treat jsDelivr as a useful option, not an automatic final architecture. Do not change `index.html`, pin runtime URLs, or swap delivery paths until the intended Loom/static-CDN setup is inspected. If jsDelivr remains in use, `@main` is mutable and must not be described as pinned.

## Findings

1. **The route structure is source-valid on inspection, but still needs live smoke testing.** The story now relies on nested `requires: all:` with `not_flag` entries for the bare-rent fallback. `docs/loom-writing.md` says nested `all`/`any` groups are supported, and the YAML shape looks consistent, but the next development pass should run or simulate the Loom route filter directly before expanding the day structure.

2. **The latest content increases consequence specificity.** The endings no longer read like a generic observer summary. Debt, public speech, forbidden learning, art, records, and bare restraint each leave a different kind of supernatural trace. This is the right direction: the old watcher is learning the player through evidence, not exposition.

3. **The hidden-record route is now a major spine candidate.** `rome_night_record_and_rent` is doing excellent work because it can be reached from notary work or fountain observation and naturally joins law, documentation, household survival, and future historical distortion. This should be treated as a prototype for cross-era consequence transformation.

4. **The game still needs a finite two-stop day before more era expansion.** One daylight choice now produces a clean first slice, but the design goal wants consequences colliding. The next content pass should allow two non-repeatable daylight/evening stops, then force a collision at nightfall. Avoid returning to infinite replay or stat farming.

5. **Historical/legal precision remains intentionally under-specified.** The current Rome scenes wisely avoid exact legal claims. Before adding concrete eviction procedure, censorship authority, magistrate jurisdiction, debt enforcement, or imperial policy, choose a date/reign anchor and research around it. Until then, keep the texture material and social rather than procedural.

6. **Release checklist is still a blocker for public listing.** `LEGAL.md` is appropriately cautious, but the exact current fan-program logo/disclaimer/attribution requirements were not verified in this pass. Do not add Ashes to `games/index.html` as a public catalog entry or present it as release-ready until those current official requirements are confirmed and added.

7. **`humanity` remains ambiguous in mortal Rome.** The stat is being changed before the Embrace. That may be intentional, but the dev docs should decide whether it is literal VTM Humanity, pre-Embrace moral pressure, or a local proxy. If it is a proxy, consider renaming before downstream systems depend on it.

## Priority feedback for the next development pass

1. Smoke-test or script-validate Loom conditions for the current chapter before expanding content: state-specific nightfall routes, bare-rent fallback, item removal, ending behavior, save/version invalidation, and mobile layout.
2. If validation passes, implement a finite two-stop day/evening structure using visited flags. The player should be able to create two earned mortal threads before nightfall, without replay farming.
3. Make two existing NPC threads collide instead of adding new named characters. Best candidates: Marcus + Livia, Prisca + collector, Varro + secret record, Gaius + rent pressure, or Varro + wax portrait + household need.
4. Keep the observer varied and indirect. One route can show him directly, but others should show effects: a moved tablet, a rumor, a patron knowing too much, a corrected line, or a door opened by someone who was not seen.
5. Add a short `Pass 3` or `Pass 4` entry to `DEVELOPMENT.md` if the latest development pass changed story/version state but did not update the main journal. The separate review files are useful, but the main journal should remain the compact operational state for future automation runs.

## Recommended next pass

First validate the current Loom route behavior. Then build the smallest possible finite two-stop structure in Chapter 1, using existing NPCs and flags. Do not advance to the Embrace, do not add a new era, and do not change runtime/CDN delivery until the intended static deployment setup is inspected.
