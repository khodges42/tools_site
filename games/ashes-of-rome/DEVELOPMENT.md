# Ashes of Rome Development Journal

## Design intent

Build a long-form historical interactive fiction in which the player begins as a mortal in Rome, becomes Kindred because of the life they actually lived, and carries transformed consequences across historical jumps into the modern nights.

The central design problem is not branching quantity. It is consequence transformation across time.

## Non-negotiable principles

1. The mortal chapter must matter. Do not rush the Embrace.
2. Do not present clan selection as a personality quiz or menu. Background, behavior, relationships, access, and choices should make different potential sires plausible.
3. Choices should create durable threads, not isolated flags.
4. Historical jumps should transform threads: people become families; families become institutions; rumors become doctrines; favors become obligations; enemies acquire descendants, childer, allies, and stories.
5. Torpor is a structural tool for omission, surprise, and distorted continuity.
6. Real history remains human history. Kindred politics may exploit, survive, distort, or react to events without becoming the secret explanation for everything.
7. Concrete historical texture beats exposition. Rent, food, work, law, streets, household structures, worship, patronage, travel, disease, language, and material conditions should shape choices.
8. Player feedback has highest priority. Scheduled passes must read this file first.
9. Never advance the timeline merely because the next chapter is empty. Deepen the current era until moving forward creates more consequences than it discards.
10. Engine changes are allowed when the story genuinely needs them. Keep Loom understandable and document extensions.

## Persistent consequence model to develop

Candidate thread transformations:

- person -> family -> institution -> myth
- favor -> obligation -> tradition -> law or custom
- lie -> rumor -> doctrine -> historical record
- enemy -> protege or childe -> faction -> modern organization
- object -> inheritance -> relic -> forgery or contested provenance
- place -> household -> shrine or business -> ruin -> redevelopment

The engine currently has stats, flags, inventory, conditions, chapter loading, saves, context variants, and character fields. The project will likely need a richer thread or legacy system. Do not add one until the first Rome content demonstrates concrete requirements.

## Autonomous pass protocol

Every scheduled pass should:

1. Read this journal and the latest player feedback.
2. Inspect the current game and recent commits.
3. Diagnose before changing anything.
4. Make one coherent improvement or tightly related set of improvements.
5. Test reachable passages, chapter loading, save behavior, and mobile usability as far as the environment allows.
6. Update this journal with what changed, what remains weak, and a recommendation for the next pass.
7. Do not add a new historical era just to show visible progress.

## Player feedback inbox

### High priority - runtime delivery architecture

- Kass explicitly corrected the assumption that the project lacked static CDN infrastructure. Do not invent or assume a deployment architecture.
- Kass was interested in the fact that jsDelivr can serve a public GitHub repository directly. Treat that as an available option, not an automatic final decision.
- Before changing Loom delivery again, inspect the actual Loom deployment/static-CDN setup and choose deliberately. For production, never describe `@main` as pinned; use a release tag or immutable commit SHA if jsDelivr is retained.

## Current foundation status

- Loom story manifest created.
- Ten-era chapter spine scaffolded.
- Mortal Rome opening now has concrete household, work, civic-conflict, and art/patronage branches instead of placeholder foundation text.
- Durable Rome flags and stats exist for obligation, risk, household protection, forbidden texts, public standing, secret art, and patron debt.
- Long-term consequence model documented but not yet implemented.
- Fan-project release checklist exists in LEGAL.md; verify current official program terms and assets before public release.

## Development pass log

### Pass 1 - Mortal Rome material stakes

Diagnosis:

- The project rules correctly prioritized mortal Rome, but Chapter 1 still contained placeholder branches.
- The main technical risk in this pass was not the absence of an engine feature; Loom already supports stats, flags, inventory, conditions, chapter loading, and context notes. The story needed concrete state first.
- The current `index.html` still loads Loom from `loom-engine@main`; that is acceptable for internal iteration but should be pinned to a tag or commit before public release.

Changes made:

- Bumped `story.yaml` to version 2 because the state schema changed and existing saves should not be assumed compatible.
- Added new stats: `obligation` and `risk`.
- Added Rome-specific durable flags for Livia/Gaius, forbidden texts, public civic action, secret artwork, and patron debt.
- Added inventory seeds for family token, forbidden text, patron ring, rent tablet, and wax portrait.
- Added context entries for the Subura and patronage.
- Replaced Chapter 1 placeholders with a playable first slice: household crisis, notary work, fountain dispute, and wax portrait commission.
- Each branch now creates at least one concrete relationship, obligation, risk, or artifact that can transform across centuries.

Testing notes:

- Re-fetched updated `story.yaml` and `chapters/01-rome.yaml` through GitHub after commit.
- Confirmed the story manifest now contains the expanded state fields and version 2.
- Confirmed Chapter 1 has reachable passages from `rome_arrival` to each branch and back to `rome_crossroads`.
- Full browser testing was not available in this run. Next review should specifically check Loom validation in-browser because YAML syntax and passage reachability were inspected through source rather than a live Cloudflare/static preview.

Remaining weaknesses:

- `rome_crossroads` currently summarizes all possible branch artifacts, even if the player did not encounter all of them. This needs conditional text support, separate convergence passages, or more careful prose that only references universal consequences.
- The current loop lets the player revisit the city and accumulate contradictory choices. That may be useful during development, but the playable chapter needs a deliberate day structure.
- No sire candidates are present yet. The next pass should introduce pressure from one or two plausible mortal-world observers without turning them into clan menus.
- `index.html` still references Loom with `@main`; pin or document the intended CDN version before any public link from the games index.

### Review 1 - Pass 1 critique

Verdict:

- This pass materially improved the game, not just the scaffolding. The Rome chapter now has named people, material pressures, social class, work, neighborhood conflict, art, patronage, and choices that produce state with plausible long-term transformation potential.
- The strongest material is the overlap between ordinary survival and future historical consequence: altered debt dates, copied petitions, forbidden verses, diverted water, and funerary portraiture are better seeds than abstract morality labels.

Priority feedback for the next development pass:

1. **Fix the repeatable hub before adding more content.** `rome_crossroads -> rome_arrival` currently permits infinite replay of branches, repeated stat gains, repeated item effects, and mutually incompatible choices. Replace the loop with a bounded day structure or gate each branch/choice with visited flags. This is the highest gameplay/runtime issue.
2. **Build the convergence from actual state.** The current crossroads prose names every artifact regardless of player history. The nightfall/rent scene should branch or condition text from flags/items and make at least two previously chosen threads collide. Do not merely summarize state.
3. **Introduce supernatural attention indirectly.** Add a quietly supernatural observer whose interest is legible through what the player did, not through clan exposition. Keep mortal antagonist pressure primary so the Embrace remains an intrusion into an already meaningful life.
4. **Preserve the best historical mode.** Continue grounding Rome in rent, water access, copying, patronage, household dependency, and material objects. Before making precise legal or political claims, verify the specific period and institution; the current broad framing is evocative but the project still needs an explicit date/reign anchor before legal procedures or censorship details become more specific.
5. **Runtime delivery: follow user feedback first.** Inspect the actual Loom/static-CDN setup before changing URLs. If jsDelivr remains the choice, replace `@main` with a release tag or commit SHA before public release. Do not call a branch reference pinned.
6. **Release/legal checklist is intentionally incomplete.** `LEGAL.md` correctly avoids inventing terms, but no public release or games-index link should happen until current official fan-content requirements, required marks/assets, attribution/disclaimer text, and free/noncommercial constraints are verified against the official current source.
7. **Testing gap remains real.** Source inspection confirms structure but not live behavior. A future pass should perform a browser/static-server smoke test of YAML loading, chapter merge, validation, choice effects, save compatibility, and mobile layout. Do this before expanding far beyond Chapter 1.

Story note:

- Avoid making every Rome seed telegraph its future form in narration. Lines that explicitly list “schoolroom rumor, family boast, heresy, or evidence” explain the consequence system to the player. Prefer one concrete immediate consequence now and let later centuries reveal the transformation unexpectedly.

## Immediate next target

Build the rent-collection/nightfall convergence scene, but first close the repeatable hub exploit. The convergence should read actual flags/items, make two mortal obligations collide, introduce one mortal antagonist and one quietly supernatural observer, and leave the player with a costly unresolved problem rather than advancing to the Embrace.