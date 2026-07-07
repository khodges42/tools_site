# Pass 12 — The Open City

## Changed files

- `chapters/08-modernity.yaml`
- `story.yaml`
- `docs/dev-log/pass-12.md`

## Playable content added

Replaced the empty Chapter 8 placeholder with a full occupied-Rome chapter set across September 1943 through June 1944. The chapter has three major entry routes:

- an underground print network producing warnings and forged ration cards;
- a hospital/refuge network using split identity records and unwritten routes;
- a Kindred political route confronting feeding under occupation and the court's claim of neutrality.

The routes converge on a raid against the press network, then branch around whether the player searches for Lucia or preserves the distributed network. The final section forces a choice about warning people named on a transport list versus destroying address data that could enable a second roundup.

## Consequences added

Added state for press redundancy, cellular organization, rotating forgery defects, split identity records, oral versus encoded routes, feeding-ground politics, court voting records, predatory domain mapping, Lucia's arrest, network survival, warnings, and destruction of dangerous address records.

The chapter deliberately continues earlier motifs without requiring clean historical continuity: printing becomes reproducible resistance; refuge rules become information separation; archive poisoning becomes data minimization; route knowledge becomes a network with no authoritative map; Kindred domain politics are shown as parasitic on mortal logistics rather than detached supernatural lore.

## Known weaknesses

- Chapter-to-chapter transitions remain inconsistent. Several chapters still terminate as `ending` passages instead of explicitly handing off to the next era.
- Chapter 1 still contains player-facing meta language about the Embrace and clan pacing. This remains a high-priority prose and connectivity defect.
- The playable Embrace/sire bridge is still missing. The later chapters assume the player is Kindred without dramatizing the transition.
- Chapter 8 currently consumes thematic inheritance more strongly than direct `requires` branches from Chapter 7. A later consequence pass should make specific 1849 choices alter available 1943 tactics.
- Historical specificity should receive a focused fact-check before release; this pass prioritized playable structure and consequence design.

## Next concrete build target

Do a connectivity pass before adding another era: remove Chapter 1's meta pacing language, build the playable Embrace/sire bridge, and wire explicit transitions from Chapter 1 through Late Empire and the Sack into the differentiated medieval wake state. After that, add direct Chapter 7 consequence gates to Chapter 8 rather than expanding Chapter 9.