# Artale 技能加點站

Artale 各職業技能加點推薦（非官方玩家整理）。

- 每個職業 × 現行版 / 技改版（Tespia v2）× 兩套：🔥 燒錢快練、💰 省錢性價比
- 技能視窗：拉到任意等級，看該點到哪（附技能圖示、MP/HP 消耗）
- 🎮 自己配點模擬器：規則與遊戲相同（30 / 70 / 120 轉職前，前一轉點數必須用完；前置技能；新手 6 點）
- ✨ AI 點評：用自己的 Gemini 金鑰（只存在自己的瀏覽器）
- 💬 留言：giscus（GitHub Discussions）
- 繁體 / 簡體切換（預設繁體）

## 開發

純靜態網頁，零依賴。

```
npm run check            # 檢查所有推薦加點都符合遊戲規則
node scripts/serve.mjs   # 本機預覽 http://localhost:8792
```

- `data/classes.js`：職業清單
- `data/skills/<職業>.js`：技能資料（進職業頁才載入）
- `data/builds.js`：推薦加點（`技能id:目標等級` 依序排列，網站自動模擬每一步在幾等完成）
- `engine.js`：加點規則引擎（網站與檢查共用）

推薦加點也可以在網站上用「🔧 管理員」登入後直接編輯：站長或站長在 GitHub 邀請的協作者（Settings → Collaborators）才能存檔。協作者用 classic token（只勾 public_repo）。

技能圖示與職業圖片版權屬原遊戲公司所有。
