# SPEC — Artale 技能加點站

Goal: a new Artale character should know how to spend SP without research.

Must:
1. Per class, per version (現行版 old / 技改版 new): two builds — 燒錢快練 and 省錢性價比 — shown as an in-game-style skill window at any level (1–200) plus an ordered step list with level ranges and MP/HP cost.
2. Rules: SP 3/level from 1st-job level (mage 8, others 10), +1 at 1st job/30/70, +3 at 120, beginner 6 (0轉 only). 2nd/3rd/4th-job skills need cumulative earlier-job SP ≥ 61/182/333 (mage 67/188/339). Prerequisites enforced.
3. Own simulator (not embedded): +/−/max, level change, apply a build, share link.
4. AI review with the visitor's own Gemini key (localStorage only).
5. Comments per class+version (giscus).
6. 繁/簡 toggle, default 繁體; skill icons everywhere; works on phone (no sideways scroll).
Done = `npm run check` passes and the above verified in a browser at desktop + phone width.
