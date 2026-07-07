# Pass 07 — Rome Is Breached

## Diagnosis

The project had finally expanded into Late Empire consequence play, but Chapter 3 was still an empty placeholder. The most useful implementation target was to turn the sack of 410 CE into a playable crisis where the player's earlier relationship to records, families, water infrastructure, and Kindred politics becomes immediate rather than abstract.

## Changed files

- `chapters/03-fall.yaml`: replaced the empty placeholder with a full playable chapter set during the sack of Rome in 410 CE.
- `story.yaml`: version 7; added state flags for archive/family rescue, Kindred-domain knowledge, Masquerade risk, and the player's vigil-versus-torpor decision.

## Playable content added

Chapter 3 now opens with the breach of the Salarian Gate and forces a concrete priority: help Junia and the hospice archive, reach Prisca's bakery, or follow armed figures toward the bathhouse ruins. Those routes branch into distinct scene chains:

- The hospice route asks whether names or property records are saved first, with different Humanity, Influence, and Learning consequences.
- The bakery route turns a cart with six places into a triage decision, and can reuse knowledge of the old water infrastructure to evacuate people through a service passage.
- The bathhouse route reveals a Kindred meeting beneath the ruins where domains and feeding rights are being assigned according to mortal institutions and habits.
- A Hunger scene uses the chaos of the sack as pressure on the Beast without making catastrophe a permission slip for consequence-free violence.
- The closing route lets the player choose continued vigil or deliberate torpor, establishing state for the medieval wake-up chapter.

## Consequences added

- `late_empire_fountain_found` unlocks the water-service escape route during the sack.
- The Prisca family thread becomes a living evacuation problem rather than another historical callback.
- The hospice/archive theme becomes a hard choice between preserving people-centered rolls and preserving property records that will shape reconstruction.
- The sandal-mender from Chapter 2 is revealed as part of the local Kindred political layer, turning an earlier uncanny encounter into a later payoff.
- `fall_chose_vigil` and `fall_chose_torpor` provide explicit state for different medieval arrival framing.

## Known weaknesses

Chapter 1 still contains the player-facing pacing lines identified in Pass 06 and remains the highest-priority prose cleanup. Chapter 2's final passage is still terminal and therefore Chapter 3 is not yet reachable through ordinary linear play. The chapter content and state are now present, but the next implementation pass must connect the existing era endings rather than adding another isolated chapter.

The Embrace itself also needs a concrete authored pathway. The current later chapters assume the character is Kindred, while the first chapter's observer outcomes do not yet resolve into a specific transformation scene. That gap should be fixed in fiction, not explained with more meta prose.

## Next concrete build target

Connect Chapter 1's six observer outcomes through one or more concrete Embrace pathways, remove the repeated `not yet`/future-promising prose, and route the resulting state into Late Empire. Then change the Late Empire terminal passage into a transition to `fall_arrival`. Do not add Chapter 4 until Chapters 1–3 are reachable in sequence.