# Pass 3 — State-aware nightfall observer

## Diagnosis

- Review 2 correctly identified that the fallback bare-rent route was always visible and could let a player ignore the specific consequence they had just unlocked.
- The previous universal ending over-summarized the player as an archetype list: useful liar, public risk, keeper of dangerous words, maker of true faces, etc. That drifted toward personality-quiz framing.
- The first slice still needed a bounded second collision where an earned daylight thread interacts with another material pressure before the observer registers the player.
- Runtime delivery architecture remains intentionally unchanged. Kass has a static CDN and was interested in jsDelivr-from-GitHub as an option, but this pass did not inspect or change Loom delivery.
- No new historical era should be added yet.

## Changes made

- Bumped `story.yaml` to version 4 because new flags and save-state meaning were added.
- Added durable observer-interest flags:
  - `rome_observer_debt`
  - `rome_observer_public`
  - `rome_observer_learning`
  - `rome_observer_art`
  - `rome_observer_records`
  - `rome_observer_bare`
- Added `rome_secret_record` and `rome_prisca_spared` to make existing choices produce clearer durable state.
- Made the bare-rent route a true fallback by requiring the absence of the specific nightfall-driving flags: patron debt, public stand, protected tablets, secret sketch, and secret record.
- Added a new hidden-record nightfall route, `rome_night_record_and_rent`, for paths that produce documents, names, reused seals, or private leverage. This creates a stronger two-pressure collision: hidden record + Marcus/collector + Livia's household.
- Replaced the single generic `rome_nightfall_end` with route-specific endings:
  - debt/ring ending
  - public/fountain ending
  - forbidden-learning ending
  - art/likeness ending
  - record/copy ending
  - bare-restraint ending
- Each ending now shows what the old observer noticed through concrete evidence rather than summarizing the player with a category list.

## Testing notes

- Re-fetched `story.yaml` after commit and confirmed version 4 plus the new observer flags are present.
- Re-fetched the revised Chapter 1 nightfall section and confirmed:
  - the always-visible fallback was replaced with a gated fallback using nested `all` + `not_flag` conditions;
  - the hidden-record route is reachable from `rome_secret_record` choices;
  - all nightfall choices now target defined route-specific ending passages;
  - the old generic archetype-list ending has been removed.
- Source-level inspection only. Full browser/static preview testing is still not available in this run, so the next review should verify Loom's nested `all` + `not_flag` behavior live.

## Remaining weaknesses

- This still is not a proper multi-stop day. It deepens nightfall convergence and adds a record route, but the player still makes only one daylight attachment before nightfall.
- `humanity` is still used as if it were both a VTM-like moral stat and a pre-Embrace narrative score. This should be clarified or renamed before more systems depend on it.
- The Rome chapter still lacks an explicit date/reign anchor. Do not add precise Roman legal/procedural claims until that is researched and pinned.
- The CDN/runtime path is still `@main`; do not call that pinned, and do not change it without inspecting Kass's actual static CDN setup.
- The release checklist remains a gate before public linking from `games/index.html`.

## Recommended next pass

Run or simulate a live Loom smoke test if possible, especially nested conditions and hidden choice visibility. If the runtime checks out, make the next pass a real bounded day structure: allow two non-repeatable daylight stops, use visited flags to prevent farming, and then let two earned mortal threads collide before nightfall. Also decide whether `humanity` should be literal VTM Humanity, pre-Embrace moral pressure, or renamed story-state.
