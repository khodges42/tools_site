# Review 08 — Medieval awakening critique

## Verdict

Pass 08 improves the actual game rather than only adding scaffolding. Chapter 4 is a substantial playable slice with choices, state-gated consequence routes, new relationships, and one of the clearest demonstrations yet of the project's core idea: history transforms prior choices instead of merely remembering them.

The strongest material is the transformation work. Prisca becoming contradictory folklore and inherited household habits, while Junia's rescued archive becomes an institutional classification system, is exactly the person → family/myth and record → institution pattern described in `DEVELOPMENT.md`. The mundane details also remain stronger than the lore: reused stone, drains, bread, registers, tolls, fountains, hostels, and administrative work make 1143 Rome feel inhabited.

## High-priority user feedback

1. **Runtime/CDN architecture remains user-directed.** Kass previously corrected the assumption that the project lacked static CDN infrastructure. Pass 08 correctly did not touch runtime delivery or public listing. Continue to treat jsDelivr as an option rather than an assumed architecture, and never call `@main` pinned.

## Findings

1. **The chapter is currently implemented but not part of a continuous playable campaign.** Both Chapter 3 endings are still `type: ending` and do not route to `medieval_arrival`. This is now the highest-priority game issue. Four authored chapters are less valuable than three chapters a player can actually traverse.

2. **Pass 08 repeated the timeline-expansion pattern that Review 07 explicitly warned against.** The previous review asked for Chapter 1 → Chapter 3 continuity, a real Embrace bridge, valid post-Embrace state, and end-to-end runtime testing before more era expansion. Chapter 4 is good content, but it deepens the integration debt: Chapter 1 still ends before the Embrace, Chapters 2–4 assume a Kindred protagonist, and Chapter 3 still does not enter Chapter 4.

3. **Vigil and torpor currently collapse into the same awakening premise.** `fall_chose_vigil` and `fall_chose_torpor` are registered, but `medieval_arrival` always presents the protagonist as waking from a buried chamber. That is coherent for torpor and contradictory or at least unexplained for the vigil route. Gate opening prose or provide distinct entry passages before wiring Chapter 3 forward.

4. **The strongest consequence routes are state-earned.** `fall_saved_archive` unlocking the institutionalized register and `fall_saved_family` unlocking the bakers are excellent. Preserve this standard: future chapters should transform concrete prior choices, not simply provide era-themed vignettes.

5. **Some medieval political texture should be checked before becoming more specific.** The 1143 Roman Commune anchor is a good move because it gives the chapter a concrete historical pressure. Before expanding claims about Senate powers, neighborhood communes, monastery property, pilgrim-hostel control, or factional relationships, add a compact research note with sources and distinguish attested detail from plausible fiction.

6. **The Hunger underflow issue from Review 07 remains unresolved.** `story.yaml` still initializes Hunger at 0, while Chapter 3 can apply `hunger: -1`. Fix or clamp this before end-to-end testing.

7. **The main journal is stale.** `DEVELOPMENT.md` still ends at Pass 2 despite separate logs through Pass 08. The separate dev-log files are useful, but the main operational journal no longer summarizes the actual state of the game and can mislead future automated passes.

8. **Release implications are unchanged.** `LEGAL.md` correctly keeps release verification separate from ordinary development. No new blocker was introduced, but the game is not release-ready: current fan-program requirements still need verification, and the public runtime/CDN architecture remains intentionally undecided.

## Priority feedback for the next development pass

1. Stop adding eras. Wire Chapter 3 → Chapter 4 with distinct vigil/torpor continuity.
2. Fix the Hunger underflow path.
3. Build the missing Chapter 1 → Chapter 2 Embrace bridge so the authored campaign has a coherent supernatural transition and valid state.
4. Smoke-test the continuous route in Loom: chapter loading, conditional choices, save/version invalidation, endings/transitions, item effects, and mobile layout.
5. Refresh `DEVELOPMENT.md` with a compact current-state summary and point future passes to the latest review/dev-log files.
6. Preserve the best pattern from Chapter 4: concrete mortal artifacts and habits changing function across centuries.

## Recommended next pass

Integration only. Make the existing Chapters 1–4 into one coherent playable chain before writing Chapter 5. Chapter 4 is good enough to justify connecting; more disconnected content would now make the game worse as a development project even if the prose remains strong.
