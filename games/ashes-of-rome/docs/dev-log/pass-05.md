# Pass 5 — Evening consequence pass

## Diagnosis

The latest review said the Rome slice was finally bounded, but still too thin: one daylight attachment moved directly into nightfall. That fixed the old replay/farming problem, but it did not yet let mortal consequences collide before the supernatural observer took interest.

The highest-leverage content change was therefore a finite second stop inside Chapter 1, not a new era, not the Embrace, and not a Loom/CDN delivery change. Runtime delivery remains user-directed; this pass intentionally did not modify `games/index.html`, runtime URLs, release packaging, or public listing.

## Changes made

- Bumped `story.yaml` to version 5 because route/state shape changed.
- Added declared evening-state flags:
  - `rome_evening_second_stop`
  - `rome_evening_livia_seen`
  - `rome_evening_marcus_seen`
  - `rome_evening_prisca_seen`
  - `rome_evening_gaius_seen`
  - `rome_evening_varro_seen`
  - `rome_evening_patron_pressure`
- Reworked `rome_crossroads` into a finite second-stop router instead of a direct nightfall router.
- Added five evening collision scenes using existing NPCs and institutions:
  - patron pressure + Livia/household survival
  - Prisca + Marcus's paperwork
  - Gaius + Marcus's apprentice/search list
  - wax portrait + Prisca's oven/back room + someone who knew Varro's sister
  - hidden record + Livia's household arithmetic + Marcus's retrieval pressure
- Preserved the bare-rent fallback only for routes that carry no major weaponized thread.
- Kept the old observer indirect and delayed. The new evening scenes deepen mortal stakes before the observer reads the result at nightfall.

## Testing notes

- Re-fetched `story.yaml` after commit and confirmed version 5 plus the new evening flags are present.
- Re-fetched the edited Chapter 1 crossroads/evening section after commit and confirmed the new passage IDs and conditional choices are present.
- Source-level route check: every new `rome_crossroads` target points to a newly defined `rome_evening_*` passage; each evening passage points to an existing `rome_night_*` passage; night passages still point to existing endings.
- Full live browser/static-server testing was not available in this environment. A future pass should still run the Loom route filter in-browser or through a local static server.

## Remaining weaknesses

- This pass improves the day shape, but it still allows only one initial daylight attachment plus one evening collision. The structure is now better for consequences, but the opening may still feel like a slice rather than a full day.
- `humanity` is still being modified before the Embrace. That needs a design decision: literal VTM Humanity, mortal moral-pressure proxy, or renamed stat.
- The historical date/reign remains deliberately unpinned. The content avoids hard procedural claims, but future legal/censorship/eviction specificity should choose and research a date anchor first.
- The old observer remains effective as a reader of evidence, but still not socially grounded. A later pass should decide how he moves in mortal Rome without naming clan logic.
- Live validation, mobile layout, save/version invalidation, and release checklist verification remain open.

## Recommended next pass

Smoke-test the version 5 route behavior before adding more content. Specifically verify conditional choice visibility at `rome_crossroads`, item removal in the tablet/wax routes, ending behavior, localStorage save invalidation for version 5, and mobile readability. If that passes, the next content pass should either add a third constrained pressure beat or choose a historically plausible date/reign anchor and revise the existing Rome texture around it.
