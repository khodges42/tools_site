# Pass 3 - Playable Embrace bridge

## Diagnosis

Chapter 1's six observer-specific nightfall routes all terminated as `type: ending`, while Chapter 2 already assumed the protagonist had survived into the Late Empire. The missing transformation was therefore not another Rome review pass: it was the playable bridge between mortal consequence and immortal continuity.

## Changes made

- Added `chapters/01b-embrace-bridge.yaml` and wired it into `story.yaml` between Mortal Rome and Late Empire.
- Replaced the six former dead-end nightfall passage IDs through chapter merge overrides, preserving route-specific observer memory for debt, public witness, forbidden learning, art, records, and deliberate emptiness.
- Introduced Valerius directly as the observer/sire and gave each observer route distinct sire dialogue before convergence.
- Added a playable clan pathway with Ventrue, Toreador, Malkavian, and Caitiff outcomes, plus persistent clan flags in the story state.
- Added the protagonist's first Hunger scene, with Livia and the household kept central to the moral stakes rather than treating the Embrace as a detached character-build menu.
- Added a departure transition that explicitly carries the player into `late_empire_arrival`.
- Bumped the story version to 13 because chapter order and persistent state schema changed.

## Testing notes

- Re-fetched `story.yaml` after commit and confirmed version 13 and `01b-embrace-bridge.yaml` are present in chapter order.
- Re-fetched the story state and confirmed clan plus Embrace-path flags are declared.
- Re-fetched the bridge file and confirmed the former Chapter 1 ending passage IDs now resolve as story passages in the later-loaded bridge chapter.
- Source-level reachability is: Rome route ending ID -> `embrace_threshold` -> route-specific sire passage -> `embrace_clan_choice` -> `embrace_first_hunger` -> `embrace_departure` -> `late_empire_arrival`.
- Live browser validation remains outstanding. The main practical risk is whether Loom's chapter merge semantics permit later passage definitions to override earlier IDs; if not, move the six short bridge choices directly into Chapter 1 and keep the rest of the bridge chapter unchanged.

## Remaining weaknesses

- Clan selection is now playable but still too explicit. The current four-choice clan screen is a functional bridge, not the final design promised by the project principles. A later pass should turn clan outcome into conditional sire/blood pathways derived from mortal state, or at minimum gate and reframe choices so they feel like consequences rather than a class picker.
- Valerius currently acts as a single sire across divergent clan outcomes. This is mechanically useful but weak VTM fiction. The next sire pass should either make Valerius a broker/observer who hands the protagonist to route-specific sires, or constrain his bloodline and add alternate observers.
- Chapter 2 has good consequence seeds but needs more substantial playable breadth and explicit clan/Embrace callbacks.
- The first Hunger scene needs mechanical Hunger consequences in later eras rather than only stat initialization.
- A live Loom validation/browser smoke test is still needed, especially for duplicate passage merge behavior and YAML parsing.

## Next concrete build target

Expand Chapter 2 into a substantial post-Embrace consequence chapter. Add at least one clan-sensitive route and make the Rome household, fountain/bakery lineage, and copied-record threads collide with the protagonist's new predatory needs. The chapter should end in a consequential torpor-or-vigil transition that feeds the Fall chapter rather than simply jumping eras.
