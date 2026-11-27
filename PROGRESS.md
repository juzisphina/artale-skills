# PROGRESS

Done (2026-11-20):
- All 17 classes (12 adventurers old+new, 5 Cygnus new only). Bishop/Paladin builds hand-written; others generated from priority lists (generator kept outside the repo), then editable on the site.
- Own simulator with sticky bottom bar (Lv −/+, remaining SP).
- Admin editor: 🔧 管理員 in footer → owner's fine-grained GitHub token → edit steps/text → validated → commits data/builds.js.
- AI review (visitor's Gemini key), giscus comments (installed), 繁/簡.
Known: real Gemini call untested (no key on this machine). Striker 1~3轉 cap 330 < 333 → treated as special case (req = 330).

Done (2026-11-27): 🥋 武陵道場 Season 2 page (#/dojo, dojo.js + data/dojo.js): 47-floor score table (official 11/24 notice), stop-floor calculator (timer left per floor -> best stop, pts/hour, runs to next belt), class records, coin shop, rules, giscus term "武陵道場 Season 2". Admin can edit boss/hp/note + records (Admin.saveDojo -> data/dojo.js). BOSS names/HP not published anywhere yet -> 待補. npm run check also syntax-checks app/admin/dojo/engine.js.
