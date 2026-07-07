# Pass 14 — The Years of Lead

## Diagnosis

The project had accumulated eight playable eras, but Chapter 9 remained an empty placeholder. The strongest existing systems—split identity records, distributed printing, hospital refuge rules, archive poisoning, oral routes, and predatory domain maps—had no late-20th-century payoff.

## Implemented

Replaced the Chapter 9 placeholder with a substantial playable 1977–1978 Rome chapter, **The Years of Lead**.

The chapter adds:

- a municipal computing/archive storyline built around punched cards, query logs, and duplicate wartime identities;
- Teresa, a programmer/clerk who treats databases as encoded institutional choices rather than objective truth;
- branching investigation through municipal queries, the hospital network, the inherited printing network, or the nocturnal court;
- a honey-record operation using a fabricated identity to expose unauthorized queries;
- a meaningful erasure dilemma: deleting dangerous records also destroys pensions, leases, school histories, and proof of existence;
- a switchboard investigation showing how human habits persist beneath changing technology;
- hospital refuge policy that can reuse the occupation-era split-record method;
- a printing branch where public memory, operational deception, and distributed production compete for scarce press time;
- a route network that combines bakeries, hospitals, transit knowledge, clerical timing, and compartmentalized handoffs;
- a Renaissance printed Prisca legend returning as the edition key for a library dead-drop system;
- a Kindred court conflict in which supposed political neutrality conceals use of mortal surveillance as a predatory feeding map;
- a final cabinet crisis with three distinct philosophies: destroy the identity key and rebuild proof socially, centralize custody personally, or substitute a decoy and trace the network upstream.

Earlier state is consumed throughout rather than merely referenced in prose, including `modernity_joined_hospital`, `modernity_joined_press`, `modernity_split_identity_records`, `modernity_built_redundant_press`, `modernity_built_relief_routes`, `modernity_shared_domain_map`, `renaissance_corrected_prisca`, and `renaissance_poisoned_archive`.

## Practical validation

The new chapter is self-contained YAML using the same passage, choice, `requires`, effects, stats, and ending structures already used by prior chapters. No new unregistered flags were introduced in this pass, avoiding schema drift while still consuming existing consequence state.

## Remaining weaknesses

- Chapter 8 still needs an explicit transition into `late_century_arrival`; Chapter 9 is playable content but the era-to-era handoff remains incomplete.
- The early-game Embrace/sire/clan bridge remains the largest continuity gap.
- Chapter 10 is still a placeholder and should eventually consume the new late-century ending philosophies, but the next pass should prioritize connectivity rather than immediately adding another isolated era.
- The Loom UI still does not surface enough of long-horizon consequence state to help players understand that old methods—not only named characters—are recurring.

## Next concrete build target

Build the playable Embrace bridge as a compact multi-scene sequence that consumes Chapter 1 observer state, establishes a sire relationship through action rather than exposition, and produces distinct clan pathways with immediate mechanical/story consequences before Late Empire. If whole-file Chapter 1 editing remains cumbersome, implement the bridge as a separate chapter file and perform the smallest safe transition edits needed to route the existing Rome endings into it.