# 教练学精读导航 · Coaching Study Guide

Interactive visual study companion for **Handbook of Sport Coaching Research** (Callary, Bloom, Rynne & Gearity, 2026, Edward Elgar).

Built by a CS researcher entering the sport coaching domain — six chapters deep-read, cross-referenced, and structured for review.

## Screenshots

> Launch the dev server to see the app — six tabbed panels covering the book's structure, research threads, chapter deep-reads, cognitive shifts, terminology audit, and a 14-day study plan.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## What's Inside

| Tab | Content |
|-----|---------|
| **全景** (Overview) | Book structure map (25 chapters × 4 parts), key statistics |
| **三条线** (Threads) | Three research lines — tech & data, tool design, methodology |
| **精读** (Deep Reads) | Expandable notes for 6 chapters: core question → arguments → inspiration |
| **认知冲击** (Shocks) | Three paradigm shifts for a CS person entering this field |
| **术语审计** (Terms) | Top-10 terminology inconsistencies + translation issues |
| **计划 & 备考** (Plan) | 14-day reading timeline + 15 exam Q&A (3 categories) |

## Project Structure

```
index.html              Main entry point
src/
  style.css             Design tokens + all styles (light/dark themes)
  main.js               Entry: tab switching, accordion, event delegation
  render.js             DOM rendering functions (one per tab)
  data/
    chapters.js         6 deep-read chapter objects
    terms.js            Terminology audit entries
    questions.js        15 exam Q&A (A/B/C types)
    timeline.js         14-day study plan
    stats.js            Overview stats, research threads, cognitive shocks
outputs/                Study deliverables (Markdown, Word, Excel)
```

## Iterating

**Adding a chapter**: Edit `src/data/chapters.js` — add an entry matching the existing shape. The render function picks it up automatically.

**Changing styles**: All design tokens are CSS custom properties in `src/style.css` under `:root`. Both light and dark themes are defined.

**Adding a tab**: 
1. Add a `<button>` in `index.html`'s `.tab-bar-inner`
2. Add a `<div class="panel">` with matching id
3. Write a render function in `src/render.js`
4. Register it in `src/main.js`'s `panels` object

## Tech Stack

- **Vite** — dev server + build
- **Vanilla JS** — no framework, ES modules
- **Google Fonts** — Source Serif 4 (display) + DM Sans (body)
- Light/dark theme support via CSS custom properties

## Study Notes

The `outputs/` directory contains the full study deliverables:

- `精读笔记.md` / `.docx` — Deep reading notes for 6 chapters + synthesis
- `术语对照与校对表.xlsx` — 152-term bilingual glossary + consistency audit
- `术语校对摘要.md` — Top findings from the terminology review
- `检查预备.md` — 15 Q&A + oral summary script + 2-week plan

## Content Policy

All content is paraphrased from the original book. No paragraphs are copied verbatim. Direct quotes are limited to short terminology phrases with attribution. Every claim cites its source location (chapter + DOCX paragraph number).

## License

MIT
