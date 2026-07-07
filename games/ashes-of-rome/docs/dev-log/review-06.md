# Review 06 — Late Empire consequence pass

## Verdict

Pass 6 clearly improves the actual game rather than only adding scaffolding. Chapter 2 is no longer a placeholder: it contains a substantial playable consequence slice where Chapter 1 state changes dialogue and routes, and where the project's central design idea—consequences transforming across time—is finally demonstrated in play.

The strongest material is the transformation of immediate Rome pressures into later social memory: a copied record becomes office habit and property power; Prisca becomes a family story that disagrees with public inscription; Livia becomes competing genealogies; the fountain survives as infrastructure, accusation, and civic folklore. This is much stronger than merely carrying flags forward unchanged.

## High-priority user feedback

1. **Playable development work is the priority.** Kass explicitly questioned a prior pass producing no development changes. Treat that as higher priority than autonomous caution: reviews, legal notes, and architecture analysis should support shipping playable game changes, not replace them. Pass 6 responds well by adding a real Chapter 2 slice and by refocusing the iteration prompt toward implement → test → log.
2. **Runtime/CDN architecture remains user-directed.** Do not change Loom delivery, CDN paths, or public listing based on autonomous assumptions. Inspect the intended setup first. If jsDelivr is retained for release, do not describe `@main` as pinned.

## Findings

1. **The consequence model is finally visible in gameplay.** `rome_secret_record`, `rome_public_stand`, and `rome_protected_tablets` do more than unlock flavor text: they let the player recognize provenance, correct or complicate inherited stories, and expose contradictions between family memory, office records, and public monuments. This is the best evidence yet that the game's long-form premise can work.

2. **Chapter 2 has a strong thematic spine.** The line of thought that immortality does not grant ownership of history is supported by scenes rather than only explained in design notes. Junia's archive is especially strong because it turns copying, provenance, bureaucracy, and property into a centuries-long consequence chain without requiring a secret vampire conspiracy.

3. **The new chapter is not yet part of the playable flow.** This is the largest issue. All six Chapter 1 nightfall outcomes remain terminal endings, while Chapter 2 begins from `late_empire_arrival`. The project now contains good playable content that ordinary play cannot reach. The next development pass should prioritize a tested transition over adding Chapter 3 content.

4. **The missing transition is also a story problem, not only routing.** Chapter 2 assumes the protagonist has survived centuries, but the current playable flow has not yet shown the supernatural encounter, Embrace, torpor, or another concrete mechanism bridging mortal Rome to Late Empire. The bridge should preserve the six observer-interest outcomes rather than collapsing them into one generic vampire scene.

5. **The pass correctly removed meta pacing language from character creation, but Chapter 1 still contains it.** The remaining `This is not the Embrace. Not yet.` endings and opening references to being before blood/clan expose authorial pacing strategy inside the fiction. Remove those lines during the transition pass.

6. **Historical texture is effective but now needs an anchor soon.** Chapter 2 uses a painted cross, church hospice property, changed religious memory, and a still-functioning late Roman civic landscape. These are plausible broad signals, but the chapter is now concrete enough that choosing an approximate date/reign would improve confidence around church property, archive practices, urban administration, and the condition of the Subura. Do this before adding more procedural specificity, not as a substitute for the transition work.

7. **`humanity` remains unresolved.** Mortal and Late Empire choices continue to modify `humanity` while `embraced` is still false in the manifest and no playable transition sets it. Decide whether Humanity is literal VTM Humanity, a pre-Embrace moral-pressure proxy, or a stat that should be renamed before more chapters depend on it.

8. **Release checklist scope is better.** `LEGAL.md` now correctly separates ordinary development from pre-release verification. Keep the checklist as a release gate, but do not let recurring development passes repeatedly perform speculative legal analysis. Current official Dark Pack requirements still need verification before actual public release.

9. **Runtime validation remains important.** The new chapter uses state-gated choices and new flags, but source inspection is not a substitute for a real playthrough. Test YAML loading, Chapter 1 route conditions, transition reachability, Chapter 2 conditional visibility, save invalidation from version 6, ending behavior, and mobile readability.

## Priority feedback for the next development pass

1. Connect all six Chapter 1 observer outcomes into a concrete supernatural encounter/transition that reaches `late_empire_arrival` while preserving observer-interest state.
2. Remove the remaining player-facing meta lines about withholding blood, clan, or the Embrace.
3. Test the full ordinary path from character creation through one Chapter 1 route, transition, and multiple Chapter 2 state variants.
4. Do not add Chapter 3 yet. The highest-value work is making the existing two chapters one playable game.
5. After the transition works, choose an approximate Late Empire date/reign before increasing legal, ecclesiastical, or administrative specificity.

## Recommended next pass

Make Chapter 2 reachable. Build the smallest concrete supernatural bridge that preserves the differentiated observer outcomes, sets the necessary vampire-era state deliberately, removes the remaining meta pacing prose, and smoke-tests an end-to-end Chapter 1 → Chapter 2 playthrough. Pass 6 proved the consequence concept; the next pass should turn that proof into a continuous game.
