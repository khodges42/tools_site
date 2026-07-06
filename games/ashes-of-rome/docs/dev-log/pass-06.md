# Pass 06 — Stop Promising the Vampire Story; Build the Game

## Diagnosis

The project had two connected problems. First, player-facing prose repeatedly explained that the Embrace or clan material was being withheld, which made pacing strategy visible inside the fiction. Second, the steering files over-rewarded caution: they told agents to protect future possibility and avoid advancing until Chapter 1 was sufficiently deep, while Chapter 2 remained empty.

The release-hygiene language also needed a narrower scope. Ordinary game-development passes should not drift into legal analysis. The practical intent is Dark Pack/fan-project release readiness plus broadly PG-13 public-repository content.

## Changed files

- `story.yaml`: version 6; rewrote character-creation framing as an ordinary Roman morning focused on rent, bread, water, household signals, and work. Removed player-facing clan/Embrace pacing language from the character creator. Added Late Empire consequence flags and simplified the fan-project credit wording.
- `ITERATION_PROMPT.md`: changed the pass contract from caution-first diagnosis to inspect briefly, implement, test, log. Added a hard rule against telling the player what the story is saving for. Clarified PG-13 content and practical fan-project release scope.
- `LEGAL.md`: reframed as a fan-project release checklist, clarified PG-13 repository expectations, and explicitly sent ordinary development back to building the game.
- `chapters/02-late-empire.yaml`: replaced the empty placeholder with a substantial playable consequence slice involving Junia's archive, Prisca's descendants, the changed fountain, Livia's disputed household memory, and records whose copying history has become institutional power.

## Playable content added

Chapter 2 now contains multiple scene chains and conditional callbacks. Earlier Rome choices can alter available dialogue and routes: preserved records can expose the provenance of a bureaucratic lie; public action at the fountain changes what can be told to Prisca's descendant; protected writings affect the Livia-family search. The chapter's central theme is that immortality does not grant ownership of history: the player remembers clearly while families, offices, buildings, and public inscriptions preserve distorted but socially powerful versions.

## Consequences added

- `rome_secret_record` can unlock a direct confrontation with the copied archive trail.
- `rome_public_stand` can unlock the original bathhouse owner's name in the descendant bakery scene.
- `rome_protected_tablets` can unlock a family-memory route around Livia and the poems.
- Late Empire flags now track archive access, family discovery, fountain discovery, and recovered record provenance.

## Known weaknesses

Chapter 1's six ending passages still contain the repeated sentence `This is not the Embrace. Not yet.` and the Chapter 1 arrival still contains meta framing about being before blood and clan. Those exact lines were identified and should be removed next. The connector available in this pass supports whole-file replacement rather than a small patch, and Chapter 1 is an 826-line file; this pass avoided risking accidental truncation while still shipping Chapter 2 and the smaller requested rewrites.

Chapter 2 is now populated but the current Chapter 1 endings are still terminal `type: ending` passages, so the Late Empire slice needs an explicit tested transition path before it is reachable in the ordinary play flow. The next pass should fix the Chapter 1 meta lines and connect at least one end-state into the next playable era without flattening the six distinct observer outcomes.

## Next concrete build target

Patch Chapter 1's arrival and all six nightfall endings to remove authorial pacing language, then replace terminal closure with a concrete supernatural encounter/transition that preserves the observer-interest flags and reaches `late_empire_arrival`. Test all six routes for YAML validity and reachability.