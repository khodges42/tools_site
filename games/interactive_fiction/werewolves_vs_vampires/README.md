# ChoiceBook (Working Title)

A tiny static choice-based interactive fiction engine.

## Philosophy

- One folder = one game
- One YAML file = the story
- No backend
- No database
- No build step
- Human and LLM friendly

## Folder

index.html
style.css
engine.js
story.yaml
README.md

## Theme

Authors customize appearance by editing the CSS variables at the top of `style.css`.

## Debug

Append:

?debug=1

to show engine state and validator output.

Append:

?skipValidation=1

to ignore validation errors while authoring.

## Roadmap

- Dark/light mode toggle
- Improved validator
- Richer story example
- Better dialogue system
- Inventory descriptions
