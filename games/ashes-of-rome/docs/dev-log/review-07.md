# Review 07 — Fall of Rome playable-content review

## Verdict

Pass 07 improves the actual game rather than only adding scaffolding. Chapter 3 has real choices, route-specific consequences, and the strongest cross-era payoff so far: the fountain can become an escape route, Prisca becomes a family survival problem, records become a reconstruction problem, and mortal institutions become the substrate Kindred politics tries to map onto.

The pass is still premature in sequence. Review 06's highest-priority implementation target was continuity from Chapter 1 through the Embrace into Chapter 2 and then Chapter 3. Pass 07 instead added another strong but unreachable island. Stop adding eras now and make Chapters 1–3 one playable route.

## Higher-priority user feedback

1. **Runtime/CDN architecture remains user-directed.** Kass explicitly corrected the earlier assumption that the project lacked static CDN infrastructure. Do not change Loom delivery, `games/index.html`, CDN URLs, or release packaging until the intended deployment setup is inspected. Treat jsDelivr as an option, not an automatic architecture; if retained for release, `@main` is mutable and must not be described as pinned.

## Findings

1. **The chapter's consequence design is good.** The water-service escape is exactly the desired transformation pattern: a civic conflict becomes remembered infrastructure, then survival knowledge. The archive choice also works because saving household rolls versus property records creates an immediate moral/political tradeoff instead of merely rewarding the player for remembering an old flag.

2. **The human-history/supernatural balance is mostly strong.** The sack remains a human catastrophe. The Kindred court reacts to damaged institutions and tries to divide feeding access around mortal habits; it is not presented as the secret cause of the sack. Keep that boundary.

3. **There is a continuity bug around the sandal-mender.** `fall_bathhouse` says the player recognizes him as "the sandal-mender from the fountain" and he says "You took your time," but Chapter 2 does not require the player to visit the fountain. Archive and bakery routes can terminate at `late_empire_crossroads` without meeting him. Gate this recognition text from a dedicated encounter flag, or ensure every Chapter 2 route encounters him before Chapter 3.

4. **Hunger can underflow.** `story.yaml` initializes `hunger: 0`, while the Chapter 3 feeding choice applies `hunger: -1`. Until the Embrace pathway establishes a valid Hunger state or the engine clamps the stat, this route can produce a negative value. Fix the state contract as part of connecting the Embrace, then smoke-test the feeding route.

5. **The largest gameplay/runtime problem is reachability.** Chapter 2 still ends at `late_empire_crossroads`, so Chapter 3 cannot be reached through ordinary play. Chapter 1 also still lacks the authored Embrace transition required to justify Chapter 2's already-Kindred viewpoint. The next pass should connect, not expand.

6. **The 410 CE framing is directionally sound, but keep historical claims disciplined.** The chapter's strongest material is local and concrete: bread prices, shelter, archives, carts, water passages, and reconstruction records. Avoid making exact claims about church sanctuary behavior, administrative continuity, or specific sack logistics without research. The current Kindred-domain scene works best as fictional reaction layered onto human events, not as an explanation for them.

7. **Release implications are unchanged.** `LEGAL.md` correctly treats Dark Pack/fan-program verification, required branding, exact notice language, free-project constraints, and PG-13 repository hygiene as pre-release work. This pass adds dark historical crisis content but does not create a new release blocker. Do not divert the next development pass into legal research or public catalog work.

8. **The main journal is stale.** `DEVELOPMENT.md` still ends at the Pass 2-era operational state even though separate dev-log files now cover much later work. Update the compact current-status section after the continuity work so scheduled passes do not have to reconstruct the project's actual state from scattered logs.

## Priority feedback for the next development pass

1. Connect Chapter 1's observer outcomes to concrete authored Embrace pathway(s), set valid post-Embrace state including Hunger, and route into `late_empire_arrival`.
2. Change the Chapter 2 terminal passage into a transition to `fall_arrival` after preserving any needed state.
3. Fix the sandal-mender recognition continuity and test Chapter 3 routes with Chapter 2 paths that did and did not visit the fountain.
4. Smoke-test the full Chapter 1 → Embrace → Chapter 2 → Chapter 3 flow, including conditional choice visibility, save/version behavior, Hunger bounds, endings/transitions, and mobile readability.
5. Do not add Chapter 4 until Chapters 1–3 are continuously playable.

## Recommended next pass

Build the missing connective tissue as playable fiction, not exposition: resolve the observer outcomes into an Embrace, establish valid vampire state, enter Late Empire, and continue into the sack. The existing three chapters contain enough good material; the highest-value improvement is now making them one game.
