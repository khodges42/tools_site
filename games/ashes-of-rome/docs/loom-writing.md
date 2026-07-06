# Loom Writing Notes

Local authoring reference for Ashes of Rome. Upstream Loom remains the canonical engine source.

Loom is a static interactive-fiction engine centered on story.yaml, index.html, style.css, and engine.js. Long stories can split passages into chapter YAML files. Chapter state remains global.

## Chapters

The main story manifest lists chapter files. A chapter file can add passages and may also add context, images, stats, flags, and inventory. Passage IDs must be unique across all loaded files.

## State

Declare stats, flags, and possible inventory items at the top level. Choice effects apply stat deltas, set flag values, and add or remove inventory items.

## Conditions

Choices can use conditions or the older requires name. Supported patterns include item checks, flag checks, stat comparisons, character-field checks, and nested all or any groups.

## Character fields

A passage with type character renders fields declared under character.fields. Choice options may be strings or objects. Object values can carry helper data such as pronoun forms. Character values can be interpolated into passage text.

## Context notes

Define glossary entries under context. Context entries may have conditional variants, which is useful for people, places, and institutions whose meaning changes across centuries.

## Saves

Loom stores saves in localStorage. Saves include engine version, story version, and a story-content hash. Story edits can invalidate saves. Bump the top-level story version when intentional compatibility breaks are introduced.

## Project-specific warning

Ashes of Rome is likely to outgrow a pure flag model. Do not invent a large generic framework prematurely. First write enough Rome content to discover concrete requirements for legacy threads, relationship memory, historical transformations, and cross-era state migration. Then extend Loom in the smallest understandable way that supports those requirements.
