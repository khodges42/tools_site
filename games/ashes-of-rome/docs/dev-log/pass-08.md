# Development Pass 08 — Medieval Awakening

## Changed files

- `chapters/04-medieval.yaml`
- `story.yaml`
- `docs/dev-log/pass-08.md`

## Playable content added

Replaced the empty Chapter 4 placeholder with a full medieval awakening slice set in Rome in 1143 CE, during the Roman Commune. The chapter now includes:

- two awakening approaches: patient listening or an improvised escape;
- Matteo, a mortal contact who interprets the player's impossible appearance as an ordinary family-feud problem;
- a transformed fountain whose local folklore has turned Prisca into six incompatible legends;
- a consequence route for the archive saved during the 410 sack, where preserved household names have become institutional classifications;
- a consequence route for Prisca's descendants, focused on inherited habits rather than a magical pure bloodline;
- a Kindred political contact scene centered on the mortal institutions beneath nocturnal power;
- a Roman Commune route that lets the player support civic politics with either secret infrastructure knowledge or boring administrative labor;
- multiple state-setting choices for later chapters.

## Consequences added

The medieval chapter consumes `fall_saved_archive` and `fall_saved_family` to unlock distinct historical-payoff routes. New medieval flags track Matteo, Prisca's Cup, the register decision, the bakers, the player's answer to Agnese, and alignment with either Agnese's nocturnal network or the mortal commune.

The design goal was to make history feel like transformation rather than a museum tour: Prisca survives as contradictory folklore and family habits; Junia's archive survives but is repurposed by institutions; Roman republican language returns in a form the protagonist recognizes emotionally but not structurally.

## Known weaknesses

- Chapter 3 endings still need explicit transitions into `medieval_arrival`; Chapter 4 is implemented and registered but the main narrative chain needs the transition wiring.
- The `fall_chose_vigil` and `fall_chose_torpor` flags should produce different opening text or routes in Chapter 4. The current awakening opening is strongest for the torpor path.
- The Chapter 1-to-Late-Empire Embrace bridge remains the largest continuity gap.
- Chapter 5 remains an empty placeholder, so `medieval_end` currently ends the playable slice.

## Next concrete build target

Wire Chapter 3 into Chapter 4 and make vigil versus torpor materially change the medieval arrival. Then connect Chapter 4's political and memory choices into the plague-era opening rather than building an isolated plague vignette.