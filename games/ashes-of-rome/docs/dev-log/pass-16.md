# Pass 16 — Chapter 1 Progression and Embrace Bridge

## Diagnosis

The reported line — `This is not the Embrace. Not yet. It is the first time the night chooses to look back.` — was a real progression blocker. The six Chapter 1 nightfall outcomes were still authored as `type: ending`, so reaching any of them stopped play before the Embrace and before Late Empire.

## Implemented

- Added `chapters/01b-embrace-bridge.yaml` immediately after `chapters/01-rome.yaml` in the story manifest.
- Overrode the six former Chapter 1 ending passage IDs as playable `story` passages.
- Removed the player-facing "not yet" pacing language from the playable path.
- Added a shared Embrace bridge with Valerius as sire.
- Routed each Rome observer outcome into a sire-lesson scene:
  - debt / patronage
  - public witness
  - forbidden learning
  - art / truth
  - records / corrections
  - bare restraint
- Added a first-Hunger scene that forces the Embrace to become an immediate playable moral problem instead of a lore label.
- Added clan pathway choices: Ventrue, Toreador, Malkavian, and Caitiff.
- Routed the bridge into `late_empire_arrival` so Chapter 2 is reachable from normal play.
- Bumped `story.yaml` to version 13 and registered new Embrace/clan flags.

## Weaknesses

- The bridge uses a later-loaded override file instead of editing the original 826-line Chapter 1 file directly. This is safer with the current connector, but the original file still contains obsolete ending definitions underneath the override layer.
- Clan choice is currently player-selected at the moment of Embrace. A later pass should make clan options more reactive to sire relationship, route state, and prior behavior.
- Late Empire does not yet branch on `clan_*`, `embrace_sire_*`, `embrace_spared_household`, or `embrace_bound_to_livia`.

## Next concrete build target

Make `late_empire_arrival` and the first Late Empire scene react to the Embrace bridge: clan, sire lesson, household handling, and whether Livia was treated as a person or a liability.
