// 職業清單（技能資料在 data/skills/<key>.js，進入職業頁才載入）
window.CLASSES = [
 {
  "key": "Bishop",
  "name": "主教",
  "en": "Bishop",
  "line": "魔法師 → 僧侶 → 祭司 → 主教",
  "img": "img/cards/bishop_face.webp",
  "icons": [
   "img/skills/magicClaw.png",
   "img/skills/holyArrow.png",
   "img/skills/shiningRay.png",
   "img/skills/patch_2321012.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "INT 為主力，LUK 依裝備需求補到剛好即可（大多 4 起跳，換裝再補）。",
  "tips": [
   "Lv30 轉僧侶後用「群體治癒」打不死系怪（殭屍菇、木乃伊）是最快的練法。",
   "神聖祈禱（HS）可以幫隊伍加經驗，組隊很搶手。",
   "聖龍召喚至少要 15 級才能點 4 轉的召喚神龍。"
  ]
 },
 {
  "key": "ArchMageFP",
  "name": "火毒大魔導",
  "en": "Arch Mage (F/P)",
  "line": "魔法師 → 火毒巫師 → 火毒魔導士 → 火毒大魔導",
  "img": "img/cards/archmage-fp_face.webp",
  "icons": [
   "img/skills/magicClaw.png",
   "img/skills/patch_2100001.png",
   "img/skills/patch_2110002.png",
   "img/skills/patch_2120000.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "INT 為主力，LUK 依裝備需求補到剛好即可（大多 4 起跳，換裝再補）。",
  "tips": [
   "2 轉毒霧可以持續扣血，打一群怪很好用。",
   "魔力吸收打怪回藍，越早點越省藍水。",
   "4 轉劇毒麻痺是主力群攻。"
  ]
 },
 {
  "key": "ArchMageIL",
  "name": "冰雷大魔導",
  "en": "Arch Mage (I/L)",
  "line": "魔法師 → 冰雷巫師 → 冰雷魔導士 → 冰雷大魔導",
  "img": "img/cards/archmage-il_face.webp",
  "icons": [
   "img/skills/magicClaw.png",
   "img/skills/thunderBolt.png",
   "img/skills/patch_2210002.png",
   "img/skills/patch_2220000.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "INT 為主力，LUK 依裝備需求補到剛好即可（大多 4 起跳，換裝再補）。",
  "tips": [
   "2 轉電閃雷鳴是主力群攻，冰錐術可以凍住怪。",
   "魔力吸收打怪回藍，越早點越省藍水。",
   "4 轉閃電連擊是主力，暴風雪清怪。"
  ]
 },
 {
  "key": "Hero",
  "name": "英雄",
  "en": "Hero",
  "line": "劍士 → 狂戰士 → 十字軍 → 英雄",
  "img": "img/cards/hero_face.webp",
  "icons": [
   "img/skills/powerStrike.png",
   "img/skills/powerReflection.png",
   "img/skills/guardCancel.png",
   "img/skills/monsterMagnet.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "STR、DEX 越高越好，其他 4。DEX 跟著命中走（夠命中就好），其他全部點 STR。",
  "tips": [
   "拿斧頭的話，上方切換成「斧」，劍系技能會自動換成斧系。",
   "3 轉鬥氣集中要先點，黑暗斬擊、氣絕斬才能用。",
   "4 轉進階鬥氣需要鬥氣集中 30 級。"
  ],
  "weapon": [
   "🗡 劍",
   "🪓 斧"
  ],
  "swap": {
   "swordMastery": "axeMastery",
   "swordBooster": "axeBooster",
   "finalAttackSword": "finalAttackAxe",
   "brandishSword": "brandishAxe",
   "panicSword": "panicAxe"
  }
 },
 {
  "key": "Paladin",
  "name": "聖騎士",
  "en": "Paladin",
  "line": "劍士 → 見習騎士 → 騎士 → 聖騎士",
  "img": "img/cards/paladin_face.webp",
  "icons": [
   "img/skills/powerStrike.png",
   "img/skills/powerReflection.png",
   "img/skills/patch_1210016.png",
   "img/skills/patch_1221005.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "STR、DEX 越高越好，其他 4。DEX 跟著命中走（夠命中就好），其他全部點 STR。",
  "tips": [
   "棍騎：上方切換「棍騎」，精準 / 快速 / 終極之劍會自動換成之棍。",
   "Lv90 去魚屋前，冰屬性先點 1，不然會降低效率。",
   "屬性攻擊要先開一種屬性衝擊（武器充能）才能用。"
  ],
  "weapon": [
   "🗡 劍騎",
   "🔨 棍騎"
  ],
  "swap": {
   "swordMastery": "bluntWeaponMastery",
   "swordBooster": "bluntWeaponBooster",
   "finalAttackSword": "finalAttackBluntWeapon",
   "flameChargeSword": "flameChargeBluntWeapon",
   "iceChargeSword": "iceChargeBluntWeapon",
   "lightningChargeSword": "lightningChargeBluntWeapon",
   "holyChargeSword": "holyChargeBlunt"
  }
 },
 {
  "key": "DarkKnight",
  "name": "黑騎士",
  "en": "Dark Knight",
  "line": "劍士 → 槍騎兵 → 龍騎士 → 黑騎士",
  "img": "img/cards/darkknight_face.webp",
  "icons": [
   "img/skills/powerStrike.png",
   "img/skills/holyFire.png",
   "img/skills/dragonSpirit.png",
   "img/skills/patch_1321005.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "STR、DEX 越高越好，其他 4。DEX 跟著命中走（夠命中就好），其他全部點 STR。",
  "tips": [
   "禦魔陣（HB）大幅加 HP/MP，組隊很受歡迎。",
   "龍咆哮打一群怪但會扣自己 HP，記得帶紅水。",
   "4 轉暗之靈魂召喚後，闇靈治癒、黑暗守護才能點。"
  ],
  "weapon": [
   "🔱 槍",
   "⚔ 矛"
  ],
  "swap": {
   "spearMastery": "polearmMastery",
   "spearBooster": "polearmBooster",
   "finalAttackSpear": "finalAttackPolearm",
   "dragonBusterSpear": "dragonBusterPolearm",
   "dragonFurySpear": "dragonFuryPolearm"
  }
 },
 {
  "key": "Bowmaster",
  "name": "箭神",
  "en": "Bowmaster",
  "line": "弓箭手 → 獵人 → 遊俠 → 箭神",
  "img": "img/cards/bowmaster_face.webp",
  "icons": [
   "img/skills/doubleShot.png",
   "img/skills/bombArrow.png",
   "img/skills/summonSilverHawk.png",
   "img/skills/concentrate.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "DEX 為主力，STR 依裝備需求補（大多 4 起跳）。",
  "tips": [
   "2 轉無形之箭＝不消耗箭矢，長期很省錢。",
   "3 轉替身術可以替你擋怪，練功更安全。",
   "4 轉會心之眼（SE）組隊非常搶手。"
  ]
 },
 {
  "key": "Marksman",
  "name": "神射手",
  "en": "Marksman",
  "line": "弓箭手 → 弩弓手 → 狙擊手 → 神射手",
  "img": "img/cards/marksman_face.webp",
  "icons": [
   "img/skills/doubleShot.png",
   "img/skills/piercingArrow.png",
   "img/skills/summonGoldenEagle.png",
   "img/skills/snipe.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "DEX 為主力，STR 依裝備需求補（大多 4 起跳）。",
  "tips": [
   "2 轉無形之箭＝不消耗箭矢，長期很省錢。",
   "3 轉昇龍弩是主力群攻。",
   "4 轉必殺狙擊打王超強，專注弱點需要它 10 級。"
  ]
 },
 {
  "key": "Shadower",
  "name": "暗影神偷",
  "en": "Shadower",
  "line": "盜賊 → 俠盜 → 神偷 → 暗影神偷",
  "img": "img/cards/shadower_face.webp",
  "icons": [
   "img/skills/luckySeven.png",
   "img/skills/savageBlow.png",
   "img/skills/mesoExplosion.png",
   "img/skills/patch_4221002.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "LUK 為主力，DEX 依裝備需求補；其他 4。",
  "tips": [
   "楓幣炸彈會消耗楓幣，燒錢版才建議早點滿。",
   "勇者掠奪術打怪掉更多楓幣，省錢版先點。",
   "分身術可以讓攻擊多一次，輸出差很多。"
  ]
 },
 {
  "key": "NightLord",
  "name": "夜使者",
  "en": "Night Lord",
  "line": "盜賊 → 刺客 → 暗殺者 → 夜使者",
  "img": "img/cards/nightlord_face.webp",
  "icons": [
   "img/skills/luckySeven.png",
   "img/skills/drain.png",
   "img/skills/doubleJump.png",
   "img/skills/tripleThrow.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "LUK 為主力，DEX 依裝備需求補；其他 4。",
  "tips": [
   "3 轉藥劑精通讓藥水效果變強，等於省水。",
   "4 轉無形鏢＝不消耗飛鏢，長期很省錢。",
   "風魔手裡劍是 3 轉主力群攻。"
  ]
 },
 {
  "key": "Buccaneer",
  "name": "拳霸",
  "en": "Buccaneer",
  "line": "海盜 → 打手 → 格鬥家 → 拳霸",
  "img": "img/cards/viper_face.webp",
  "icons": [
   "img/skills/dash.png",
   "img/skills/oakBarrel.png",
   "img/skills/shockwave.png",
   "img/skills/patch_5121009.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "STR 為主力，DEX 依裝備需求與命中補。",
  "tips": [
   "3 轉蓄能激發要先點，能量暴擊、損人利己才能用。",
   "損人利己打怪回 HP，很省紅水。",
   "鬥神附體 20 級才能點 4 轉的鬥神降世。"
  ]
 },
 {
  "key": "Corsair",
  "name": "槍神",
  "en": "Corsair",
  "line": "海盜 → 槍手 → 神槍手 → 槍神",
  "img": "img/cards/captain_face.webp",
  "icons": [
   "img/skills/dash.png",
   "img/skills/recoilShot.png",
   "img/skills/targeting.png",
   "img/skills/preciseCannon.png"
  ],
  "vers": [
   "old",
   "new"
  ],
  "group": "冒險家",
  "ap": "DEX 為主力，STR 依裝備需求補。",
  "tips": [
   "1 轉雙子星攻擊要 20 級，3 轉才能點 3 連發。",
   "章魚砲台、海鷗突擊隊可以幫你打怪。",
   "4 轉海盜船要先點 1，才能點加農炮和魚雷。"
  ]
 },
 {
  "key": "SoulMaster",
  "name": "聖魂劍士",
  "en": "Soul Master",
  "line": "皇家騎士團",
  "img": "img/cards/soulmaster_face.webp",
  "icons": [
   "img/skills/c_11001005.png",
   "img/skills/c_11101005.png",
   "img/skills/c_11111006.png",
   "img/skills/c_11121006.png"
  ],
  "vers": [
   "new"
  ],
  "group": "皇家騎士團",
  "ap": "STR、DEX 越高越好，其他 4。DEX 跟著命中走（夠命中就好），其他全部點 STR。",
  "tips": [
   "皇家騎士團目前只有測試服（技改版）資料。",
   "3 轉靈魂斬、靈魂鬥氣是主力。"
  ]
 },
 {
  "key": "FlameWizard",
  "name": "烈焰巫師",
  "en": "Flame Wizard",
  "line": "皇家騎士團",
  "img": "img/cards/flamewizard_face.webp",
  "icons": [
   "img/skills/c_12001005.png",
   "img/skills/c_12101006.png",
   "img/skills/c_12111006.png",
   "img/skills/c_12121007.png"
  ],
  "vers": [
   "new"
  ],
  "group": "皇家騎士團",
  "ap": "INT 為主力，LUK 依裝備需求補到剛好即可（大多 4 起跳，換裝再補）。",
  "tips": [
   "皇家騎士團目前只有測試服（技改版）資料。",
   "烈焰巫師 2 轉火柱是主力群攻。"
  ]
 },
 {
  "key": "WindBreaker",
  "name": "破風使者",
  "en": "Wind Breaker",
  "line": "皇家騎士團",
  "img": "img/cards/windbreaker_face.webp",
  "icons": [
   "img/skills/c_13001005.png",
   "img/skills/c_13101005.png",
   "img/skills/c_13111006.png",
   "img/skills/c_13121006.png"
  ],
  "vers": [
   "new"
  ],
  "group": "皇家騎士團",
  "ap": "DEX 為主力，STR 依裝備需求補（大多 4 起跳）。",
  "tips": [
   "皇家騎士團目前只有測試服（技改版）資料。",
   "2 轉無形之箭＝不消耗箭矢，長期很省錢。"
  ]
 },
 {
  "key": "NightWalker",
  "name": "暗夜行者",
  "en": "Night Walker",
  "line": "皇家騎士團",
  "img": "img/cards/nightwalker_face.webp",
  "icons": [
   "img/skills/c_14001004.png",
   "img/skills/c_14101005.png",
   "img/skills/c_14111005.png",
   "img/skills/c_14121006.png"
  ],
  "vers": [
   "new"
  ],
  "group": "皇家騎士團",
  "ap": "LUK 為主力，DEX 依裝備需求補；其他 4。",
  "tips": [
   "皇家騎士團目前只有測試服（技改版）資料。",
   "3 轉藥劑精通讓藥水效果變強，等於省水。"
  ]
 },
 {
  "key": "Striker",
  "name": "閃雷悍將",
  "en": "Striker",
  "line": "皇家騎士團",
  "img": "img/cards/striker_face.webp",
  "icons": [
   "img/skills/c_15001004.png",
   "img/skills/c_15101005.png",
   "img/skills/c_15111005.png",
   "img/skills/c_15120006.png"
  ],
  "vers": [
   "new"
  ],
  "group": "皇家騎士團",
  "ap": "STR 為主力，DEX 依裝備需求與命中補。",
  "tips": [
   "皇家騎士團目前只有測試服（技改版）資料。",
   "閃雷悍將 1~3 轉全部點滿也只有 330 點，不夠 333：本站依模擬器「特例」處理，1~3 轉全滿即可點 4 轉（官方之後可能調整）。"
  ]
 }
];

window.VERSIONS = [
  { key: 'old', name: '現行版', sub: '目前正式服（未技改）' },
  { key: 'new', name: '技改版', sub: 'Tespia v2 測試服資料，正式上線可能再改' }
];
