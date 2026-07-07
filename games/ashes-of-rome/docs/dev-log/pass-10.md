# Pass 10 — The Printed Lie

## Changed files

- `chapters/06-renaissance.yaml`
- `story.yaml`
- `docs/dev-log/pass-10.md`

## Playable content added

Replaced the Chapter 6 placeholder with a playable Renaissance chapter set in Rome in 1517. The chapter centers on Beatrice, a printer whose shop turns inherited stories, refuge rules, property records, patronage demands, and deliberate forgery into reproducible power.

Major routes include:

- Prisca's mutation from remembered baker into a printed folk saint, with choices to correct, complicate, or profit from the legend.
- Plague refuge rules surviving as decorative printer's borders and becoming contested hospital policy.
- Old plague property records becoming fuel for Renaissance land claims and genealogical forgery.
- A living household whose defense echoes the roof-tile scene from the plague chapter.
- Beatrice's challenge to Kindred information-hoarding: printing makes secrets difficult to kill.
- Cardinal Orsini's attempt to protect and control the press.
- A forgery workshop where the player chooses between ambiguity, defensive fabrication, and reusable leverage.
- A final pressroom choice that establishes how the protagonist responds to cheap reproducibility as the Reformation begins.

## Consequences added

The chapter consumes prior state including `plague_refuge_rules_copied`, `plague_copied_empty_houses`, and `medieval_found_bakers`. It adds persistent Renaissance state for printed Prisca traditions, refuge-rule transmission, property and genealogy conflicts, Beatrice's press relationship, patron-control strategies, forgery methods, and long-term print-network posture.

The strongest cross-era chain now reaches across multiple chapters: Prisca's mortal dispute and baker identity -> medieval folklore and baker descendants -> plague oven and chalk slogan -> Renaissance saint woodcut and mass printing.

A second chain now exists around records: Junia's protective archive -> medieval institutional copying -> plague property exploitation -> Renaissance genealogical claims and defensive or predatory forgery.

## Known weaknesses

- Chapter 5 still ends without an explicit `goto: renaissance_arrival`; chapter connectivity remains inconsistent across the current story and needs a dedicated wiring pass.
- The Embrace/clan pathway and Chapter 1-to-Late-Empire bridge remain incomplete and are now the largest continuity gap in the game.
- Chapter 6 has meaningful historical consequence state but does not yet use clan-specific approaches or Disciplines; those should be introduced only after the actual Embrace pathway is authored rather than guessed around.
- Historical texture is intentionally grounded but should receive a later fact-check pass before release.

## Next concrete build target

Do a connectivity-and-transformation pass rather than immediately writing another isolated chapter. Author the actual Embrace pathway, remove remaining player-facing meta commentary around delayed vampire content, connect Chapter 1 outcomes into the Embrace and Late Empire, then wire chapter endings through Fall, Medieval, Plague, and Renaissance so the existing six-chapter arc is continuously playable.