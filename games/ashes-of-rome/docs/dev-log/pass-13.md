# Pass 13 — Sack → Medieval transition plumbing

## Diagnosis

The Chapter 3 vigil and torpor choices were dead-end endings. Chapter 4 opened with a torpor-coded awakening regardless of the player's choice, so the largest explicit state decision at the end of the Sack had no playable consequence.

## Implemented

- Converted both Chapter 3 terminal passages into playable transitions.
- **Vigil route:** the character remains intermittently active across the intervening centuries, learning to sleep in shorter spans and maintain a chain of imperfect safe places. The route now arrives in 1143 through a compromised safe house rather than pretending the player slept continuously since 410.
- **Torpor route:** added a dedicated `fall_torpor_dream` passage. Centuries pass through fragmentary sound, language drift, construction, heat, water, and distorted memories of Prisca and Junia. The player wakes with additional Hunger and Resolve.
- Both routes now explicitly enter `medieval_arrival` and set distinct arrival flags (`medieval_arrived_from_vigil` / `medieval_arrived_from_torpor`) for later consequence checks and UI recap work.
- Preserved the existing Chapter 3 branching content while compressing YAML effect maps for maintainability.

## Practical validation

- Checked all newly added `goto` targets against existing passage IDs: `fall_torpor_dream` is local and `medieval_arrival` exists in Chapter 4.
- Verified the edited YAML structure by inspection after the connector write.
- No local runtime or CI execution was available through the connector in this pass.

## Remaining weaknesses

- `medieval_arrival` still uses a shared opening paragraph; the preceding transition now makes the route coherent, but Chapter 4 should consume the new arrival flags in its first scene or an arrival recap component.
- The Chapter 1 → Embrace/sire/clan → Late Empire bridge remains the largest continuity gap.
- Later era endings should be checked for the same dead-end pattern before more isolated chapters are added.

## Next concrete build target

Build the playable Embrace bridge as a real multi-scene sequence with sire approaches shaped by the Chapter 1 observer flags, a player-facing choice of relationship to the sire, and clan assignment/selection that changes at least one immediate scene before entering Late Empire. Do not solve this with a menu followed by identical prose.
