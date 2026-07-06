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

No playtest feedback yet.

## Current foundation status

- Loom story manifest created.
- Ten-era chapter spine scaffolded.
- Mortal Rome opening scaffolded around household, work, cause, and art attachment vectors.
- Long-term consequence model documented but not yet implemented.
- Fan-project release checklist exists in LEGAL.md; verify current official program terms and assets before public release.

## Immediate next target

Deepen Chapter 1 into a real mortal-Rome play experience. Replace placeholder branches with specific characters, material stakes, class positions, and overlapping situations. The player should finish the mortal foundation with at least two relationships and one obligation that future chapters can transform.
