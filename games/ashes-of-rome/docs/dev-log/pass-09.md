# Development Pass 09 — The Pestilence

## Diagnosis

Chapter 5 was still an empty placeholder while Chapter 4 had established useful medieval consequence state: the baker family, copied institutional records, Agnese's nocturnal network, and the Commune's knowledge of old routes. The best next move was not another disconnected era vignette, but a plague chapter that forces those inherited systems to do work under pressure.

## Changed files

- `chapters/05-plague.yaml`
- `story.yaml`
- `docs/dev-log/pass-09.md`

## Playable content added

Built Chapter 5 as a branching Rome 1348 plague-era chapter. The player can enter through inherited relationships and institutions or through the civic/street fallback routes.

Major playable threads include:

- Prisca's descendants keeping an oven running as neighborhood relief infrastructure.
- Prisca's name returning to public folklore in a form the player cannot fully control.
- Junia's legacy mutating into relief, surveillance, and property records maintained by the same institution.
- A choice to separate aid records from property claims, producing an immediate material result rather than an abstract morality statement.
- A disputed house where opportunistic property claims conceal a surviving girl.
- Agnese's network transformed into Tommaso's closed hostel and information market.
- A player-created refuge with simple, legible operating rules.
- Reuse of medieval route knowledge for night deliveries when the relevant prior flag exists.
- A flour-cart versus burial-cart conflict that turns logistics into an actual choice.
- A scapegoating rumor whose material beneficiary can be traced and exposed or extorted.
- A Kindred council responding to feeding scarcity, with options to reject exploitative shelters, negotiate a shared compact, or preserve private routes.

## Consequences added

The chapter consumes earlier state including:

- `medieval_found_bakers`
- `medieval_copied_names`
- `medieval_joined_agneses_network`
- `medieval_gave_routes_to_commune`

Version 9 adds plague-era state for bakery routes, Prisca's restored name, record separation, empty-house claims, the rescued survivor, refuge policy, relief networks, civic ledgers, logistics priorities, anti-scapegoating action, rumor tracing, profiteer exposure/extortion, and Kindred feeding policy.

## Known weaknesses

- Chapter 4 still ends without explicit transition wiring into `plague_arrival`; the new chapter is implemented and registered but continuity between chapter endings remains a broader structural gap across the current spine.
- The plague chapter currently converges into one council and ending. A later pass can condition the council prose on relief/refuge choices so the Kindred react explicitly to what the player built.
- The chapter needs live Loom validation. Source structure follows the project's existing `requires`, `effects`, flag, and stat syntax, but browser behavior was not available in this connector-only pass.
- The older `DEVELOPMENT.md` journal is stale relative to the per-pass logs and should eventually be reconciled rather than expanded with duplicate pass history.

## Next concrete build target

Build Chapter 6 around Renaissance printing, patronage, forgery, and contested memory. Carry forward at least two plague outcomes: copied refuge rules becoming attributed doctrine or civic practice, and Prisca's restored name becoming a contested printed story rather than a clean historical truth. Also make the Chapter 5 Kindred council react conditionally to at least one player-created relief system before expanding further.