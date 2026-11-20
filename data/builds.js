// 推薦加點（可在網站「管理員編輯」修改，存檔會覆蓋這個檔案）
// steps = 依序「技能id:目標等級」。檢查：npm run check
window.BUILDS = {
  "Bishop": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每個階段的主力攻擊最早點滿"
        ],
        "cons": [
          "前期需要當活七沖等上來"
        ],
        "steps": "b_nimbleFeet:3 b_snailThrow:3 magicArrow:1 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:20 teleport:1 massHeal:30 magicDrain:20 holyLight:20 angelBlessing:20 teleport:20 holyArrow:10 magicClaw:1 magicResistance:1 dispel:3 holySymbol:30 shiningRay:30 magicResistance:20 summonHolyDragon:15 dispel:20 mysticDoor:20 monsterTransformation:16 heavensDoor:1 mapleWarrior:10 heavensDoor:30 infinity:30 genesis:30 angelRay:30 summonDragon:15 holyShield:1 resurrection:1",
        "notes": {
          "2": "群體治癒先滿打不死系。",
          "3": "優先祈禱當活七/戰七",
          "4": "先天怒1當活七，活七到天怒滿，尻骨龍，之後核爆/天神箭/神龍"
        },
        "maxLv": 168
      },
      "save": {
        "title": "省錢性價比",
        "potion": 1,
        "summary": "70-80靠自己的戰鬥七",
        "pros": [
          "戰鬥七，前期靠自己"
        ],
        "cons": [
          "練等耗時、較牢"
        ],
        "steps": "b_snailThrow:3 b_nimbleFeet:3 magicArrow:1 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:20 teleport:1 massHeal:30 magicDrain:20 teleport:20 holyLight:20 angelBlessing:20 holyArrow:10 magicClaw:1 shiningRay:30 magicResistance:1 dispel:3 holySymbol:30 summonHolyDragon:15 magicResistance:20 mysticDoor:20 dispel:20 monsterTransformation:16 heavensDoor:1 mapleWarrior:9 genesis:30 mapleWarrior:10 summonDragon:30 angelRay:30 heavensDoor:5 holyShield:1 infinity:1 resurrection:1 holyShield:20 infinity:15",
        "notes": {
          "1": "魔力爪點 11 就夠用（越高越耗藍），點數拿去回藍。",
          "2": "魔力吸收早點滿；瞬間移動等級越高越省藍（60 → 13）。2 轉多出的 11 點回補 1 轉魔力之盾。",
          "3": "時空門 20 級耗藍最低；聖龍召喚 15 是為了解鎖召喚神龍。",
          "4": "魚屋需要30核爆1刀+神龍補1刀，小優其他職業。或者一直當活七到145左右，滿神龍再打。"
        },
        "maxLv": 168
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "技改後主教多了「聖靈祈禱」（範圍內所有人最終傷害增加），天使之箭在祈禱期間會多段攻擊，攻擊向全部優先。",
        "pros": [
          "聖靈祈禱 + 天使之箭早成形，輸出大增",
          "超級神聖祈禱讓組隊經驗更多"
        ],
        "cons": [
          "聖靈祈禱每次要扣 HP、MP 各 500~1000",
          "前中期一樣靠藍水撐"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 massHeal:30 teleport:20 holyLight:20 angelBlessing:20 holyArrow:30 magicPurify:6 shiningRay:30 dispel:3 holySymbol:30 summonHolyDragon:15 mysticDoor:1 magicResistance:20 dispel:20 monsterTransformation:30 mysticDoor:6 genesis:30 patch_2321011:10 angelRay:30 mapleWarrior:10 summonDragon:30 patch_2321012:20 infinity:30 mapleWarrior:30 holyShield:30 heroesWill:1 resurrection:10 heavensDoor:30",
        "notes": {
          "3": "神聖祈禱要 30 級才能點 4 轉的聖靈祈禱，3 轉就先滿。",
          "4": "聖靈祈禱 10 → 天使之箭 30，祈禱期間天使之箭是 3 段攻擊。"
        }
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "1~3 轉照省水路線，4 轉先拿魔力無限和聖靈祈禱，超級神聖祈禱可以幫隊伍加經驗（組隊好找）。",
        "pros": [
          "回藍技能早點滿，幾乎不用買藍水",
          "超級神聖祈禱 = 組隊經驗加成，很受歡迎"
        ],
        "cons": [
          "前期打怪較慢",
          "天怒、復甦之光比較晚才點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 massHeal:30 magicDrain:20 teleport:20 holyLight:20 angelBlessing:20 magicShield:20 shiningRay:30 dispel:3 holySymbol:30 mysticDoor:20 magicResistance:20 dispel:20 monsterTransformation:16 summonHolyDragon:15 genesis:30 infinity:15 patch_2321011:10 mapleWarrior:10 summonDragon:30 angelRay:30 holyShield:20 resurrection:1 heavensDoor:5 patch_2321012:20 mapleWarrior:30 infinity:30 holyShield:30 heroesWill:1 heavensDoor:30 resurrection:10",
        "notes": {
          "4": "技改版拿掉了魔法反射，點數改給聖靈祈禱 / 超級神聖祈禱。"
        }
      }
    },
    "featured": [
      {
        "id": "holySymbol",
        "name": "神聖祈禱",
        "img": "img/skills/holySymbol.png"
      },
      {
        "id": "resurrection",
        "name": "復甦之光",
        "img": "img/skills/resurrection.png"
      },
      {
        "id": "patch_2321011",
        "name": "聖靈祈禱",
        "img": "img/skills/patch_2321011.png"
      },
      {
        "id": "patch_2321012",
        "name": "超級神聖祈禱",
        "img": "img/skills/patch_2321012.png"
      }
    ]
  },
  "ArchMageFP": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 poisonMist:30 teleport:20 mentalClarity:20 flameArrow:30 magicDrain:20 slow:1 firePoisonStrike:30 apocalypse:30 magicBooster:30 deadlyPoison:30 extremeCasting:20 firePoisonResistance:11 paralyze:30 mapleWarrior:10 fieryHell:5 summonIfritI:30 meteorShower:30 infinity:30 mapleWarrior:30 fieryHell:30 genesis:30 heroesWill:1 magicReflect:30 firePoisonResistance:20 magicSeal:20 slow:20 magicShield:20 magicPurify:16 magicArrow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 magicDrain:20 poisonMist:30 teleport:20 mentalClarity:20 flameArrow:30 slow:1 firePoisonStrike:30 magicBooster:30 apocalypse:30 firePoisonResistance:20 deadlyPoison:30 extremeCasting:11 infinity:15 paralyze:30 mapleWarrior:10 fieryHell:5 summonIfritI:30 meteorShower:30 infinity:30 mapleWarrior:30 genesis:30 fieryHell:30 heroesWill:1 magicReflect:30 extremeCasting:20 magicSeal:20 slow:20 magicShield:20 magicArrow:20 magicClaw:20",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 patch_2100001:1 poisonMist:30 teleport:20 mentalClarity:20 flameArrow:30 magicDrain:20 firePoisonStrike:30 apocalypse:30 magicBooster:30 patch_2100001:20 patch_2110002:1 deadlyPoison:30 extremeCasting:11 paralyze:30 mapleWarrior:10 fieryHell:5 summonIfritI:30 meteorShower:30 infinity:30 mapleWarrior:30 fieryHell:30 genesis:30 patch_2110002:20 patch_2120000:30 heroesWill:1 extremeCasting:20 firePoisonResistance:20 magicShield:20 magicPurify:16 magicArrow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 magicDrain:20 patch_2100001:1 poisonMist:30 teleport:20 mentalClarity:20 flameArrow:30 firePoisonStrike:30 magicBooster:30 apocalypse:30 firePoisonResistance:20 patch_2100001:20 patch_2110002:1 deadlyPoison:21 infinity:15 paralyze:30 mapleWarrior:10 fieryHell:5 summonIfritI:30 meteorShower:30 infinity:30 mapleWarrior:30 genesis:30 fieryHell:30 heroesWill:1 patch_2110002:20 patch_2120000:30 deadlyPoison:30 extremeCasting:20 magicShield:20 magicArrow:20 magicClaw:20",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "mentalClarity",
        "name": "精神強化",
        "img": "img/skills/mentalClarity.png"
      },
      {
        "id": "deadlyPoison",
        "name": "致命毒霧",
        "img": "img/skills/deadlyPoison.png"
      },
      {
        "id": "paralyze",
        "name": "劇毒麻痺",
        "img": "img/skills/paralyze.png"
      },
      {
        "id": "meteorShower",
        "name": "火流星",
        "img": "img/skills/meteorShower.png"
      }
    ]
  },
  "ArchMageIL": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 thunderBolt:30 teleport:20 iceBolt:30 mentalClarity:20 magicDrain:20 slow:1 iceLightningStrike:30 lightningOrb:30 iceStorm:30 magicBooster:30 extremeCasting:20 iceLightningResistance:11 chainLightning:30 mapleWarrior:10 blizzard:30 iceInferno:5 summonIfritF:30 infinity:30 mapleWarrior:30 genesis:30 iceInferno:30 heroesWill:1 magicReflect:30 iceLightningResistance:20 magicSeal:20 slow:20 magicShield:20 magicPurify:16 magicArrow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 magicDrain:20 thunderBolt:30 teleport:20 mentalClarity:20 iceBolt:30 slow:1 iceLightningStrike:30 magicBooster:30 lightningOrb:30 iceLightningResistance:20 iceStorm:30 extremeCasting:11 infinity:15 chainLightning:30 mapleWarrior:10 blizzard:30 iceInferno:5 summonIfritF:30 infinity:30 mapleWarrior:30 genesis:30 iceInferno:30 heroesWill:1 magicReflect:30 extremeCasting:20 magicSeal:20 slow:20 magicShield:20 magicArrow:20 magicClaw:20",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 thunderBolt:30 teleport:20 iceBolt:30 mentalClarity:20 magicDrain:20 slow:1 iceLightningStrike:30 lightningOrb:30 iceStorm:30 magicBooster:30 extremeCasting:20 patch_2210002:11 chainLightning:30 mapleWarrior:10 blizzard:30 iceInferno:5 summonIfritF:30 infinity:30 mapleWarrior:30 genesis:30 iceInferno:30 patch_2210002:30 patch_2220000:20 heroesWill:1 iceLightningResistance:20 slow:20 magicShield:20 magicPurify:16 magicArrow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 magicDrain:20 thunderBolt:30 teleport:20 mentalClarity:20 iceBolt:30 slow:1 iceLightningStrike:30 magicBooster:30 lightningOrb:30 iceLightningResistance:20 iceStorm:30 extremeCasting:11 infinity:15 chainLightning:30 mapleWarrior:10 blizzard:30 iceInferno:5 summonIfritF:30 infinity:30 mapleWarrior:30 genesis:30 iceInferno:30 heroesWill:1 patch_2210002:30 patch_2220000:20 extremeCasting:20 slow:20 magicShield:20 magicArrow:20 magicClaw:20",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "mentalClarity",
        "name": "精神強化",
        "img": "img/skills/mentalClarity.png"
      },
      {
        "id": "thunderBolt",
        "name": "電閃雷鳴",
        "img": "img/skills/thunderBolt.png"
      },
      {
        "id": "blizzard",
        "name": "暴風雪",
        "img": "img/skills/blizzard.png"
      },
      {
        "id": "chainLightning",
        "name": "閃電連擊",
        "img": "img/skills/chainLightning.png"
      }
    ]
  },
  "Hero": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 rage:20 powerReflection:30 ironBody:4 combatMastery:1 brandishSword:30 combatMastery:30 panicSword:30 tigerOfFury:30 guardCancel:20 mpRecoveryHero:11 advancedCombatMastery:10 monsterMagnet:30 berserk:30 advancedCombatMastery:30 mapleWarrior:30 powerGuard:30 sturdyArmor:30 absolutecity:30 ultimateShield:30 ultimateSpear:30 heroesWill:1 mpRecoveryHero:20 shieldMastery:20 ironBody:20 hpRecovery:16 hpRestore:8 brandishAxe:30 panicAxe:30 axeMastery:20 axeBooster:20 finalAttackAxe:30",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 rage:20 ironBody:4 combatMastery:1 brandishSword:30 mpRecoveryHero:20 combatMastery:30 shieldMastery:20 panicSword:30 tigerOfFury:21 sturdyArmor:10 advancedCombatMastery:10 powerGuard:30 monsterMagnet:30 mapleWarrior:10 berserk:30 advancedCombatMastery:30 sturdyArmor:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateShield:30 ultimateSpear:30 tigerOfFury:30 guardCancel:20 ironBody:20 hpRecovery:16 hpRestore:8 brandishAxe:30 panicAxe:30 axeMastery:20 axeBooster:20 finalAttackAxe:30",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 rage:20 powerReflection:30 ironBody:4 combatMastery:1 brandishSword:30 combatMastery:30 panicSword:30 tigerOfFury:30 guardCancel:20 mpRecoveryHero:11 advancedCombatMastery:10 monsterMagnet:30 berserk:30 advancedCombatMastery:30 mapleWarrior:30 powerGuard:30 sturdyArmor:30 absolutecity:30 ultimateShield:30 ultimateSpear:30 heroesWill:1 mpRecoveryHero:20 shieldMastery:20 ironBody:20 hpRecovery:16 hpRestore:8 axeMastery:20 axeBooster:20 finalAttackAxe:30",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 rage:20 ironBody:4 combatMastery:1 brandishSword:30 mpRecoveryHero:20 combatMastery:30 shieldMastery:20 panicSword:30 tigerOfFury:21 sturdyArmor:10 advancedCombatMastery:10 powerGuard:30 monsterMagnet:30 mapleWarrior:10 berserk:30 advancedCombatMastery:30 sturdyArmor:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateShield:30 ultimateSpear:30 tigerOfFury:30 guardCancel:20 ironBody:20 hpRecovery:16 hpRestore:8 axeMastery:20 axeBooster:20 finalAttackAxe:30",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "rage",
        "name": "激勵",
        "img": "img/skills/rage.png"
      },
      {
        "id": "combatMastery",
        "name": "鬥氣集中",
        "img": "img/skills/combatMastery.png"
      },
      {
        "id": "absolutecity",
        "name": "絕對引力",
        "img": "img/skills/absolutecity.png"
      },
      {
        "id": "monsterMagnet",
        "name": "無雙劍舞",
        "img": "img/skills/monsterMagnet.png"
      }
    ]
  },
  "Paladin": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "攻擊與終極之劍優先，3 轉屬性攻擊和兩種屬性先滿，4 轉鬼神之擊、騎士衝擊波先成形。",
        "pros": [
          "1 轉劍氣縱橫最早滿，清怪快",
          "終極之劍 30 很早就有"
        ],
        "cons": [
          "劍氣縱橫要扣 HP + MP，紅藍都喝很兇",
          "防禦類技能較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 flameChargeSword:1 elementalCharge:30 flameChargeSword:30 iceChargeSword:30 magicCrash:20 shieldMastery:20 mpRecoveryKnight:20 ironBody:5 elementalReinforcement:10 holyChargeSword:20 heavensHammer:30 blast:30 mapleWarrior:30 powerGuard:30 sturdyArmor:30 heroesWill:1 absolutecity:30 ultimateShield:30 ultimateSpear:30",
        "notes": {
          "1": "魔天一擊點 1 解鎖劍氣縱橫（群攻）並點滿。",
          "2": "精準之劍 3 解鎖終極之劍，直接點滿。",
          "3": "先點 1 級烈焰之劍開充能，屬性攻擊才能用。",
          "4": "屬性強化需要屬性攻擊 30。"
        }
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點生命淨化 / 擴展省紅水，快速之劍早點（等級越高越省 HP/MP），3 轉魔力恢復提早。",
        "pros": [
          "生命淨化 + 擴展先點，血多回得快",
          "快速之劍等級越高消耗越少（29 → 10）",
          "3 轉魔力恢復提早，藍水省很多"
        ],
        "cons": [
          "1 轉打怪稍慢"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 flameChargeSword:1 elementalCharge:30 mpRecoveryKnight:20 iceChargeSword:30 flameChargeSword:30 shieldMastery:20 magicCrash:20 ironBody:5 elementalReinforcement:10 holyChargeSword:20 sturdyArmor:30 mapleWarrior:10 heavensHammer:30 powerGuard:30 blast:30 mapleWarrior:30 heroesWill:1 ultimateShield:30 absolutecity:30 ultimateSpear:30",
        "notes": {
          "1": "先 5 淨化 + 10 擴展（血量上升更多），再點攻擊。",
          "3": "冰屬性在 Lv90 魚屋前要有；4 轉前把冰補滿。",
          "4": "武神防禦先點，被打少扣血就少喝水。"
        }
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "技改後屬性衝擊劍棍共用、屬性強化變 20 級，新增盾牌之力（依盾防加攻擊）。輸出技能全部優先。",
        "pros": [
          "屬性攻擊 + 屬性強化 20 早成形",
          "盾牌之力讓攻擊再往上加"
        ],
        "cons": [
          "祝福護甲、魔力恢復很晚才點，喝水多"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 flameChargeBluntWeapon:1 elementalCharge:30 iceChargeBluntWeapon:30 flameChargeBluntWeapon:30 magicCrash:20 shieldMastery:20 patch_1210016:20 mpRecoveryKnight:1 elementalReinforcement:20 holyChargeBlunt:20 patch_1220000:20 heavensHammer:30 blast:30 mapleWarrior:30 powerGuard:30 patch_1221005:30 heroesWill:1 absolutecity:30 mpRecoveryKnight:20 ultimateSpear:30",
        "notes": {
          "3": "技改版屬性衝擊劍棍共用，一次只能開一種。",
          "4": "聖靈之棍技改後劍騎也能用（屬性衝擊系列）。"
        }
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "技改新增的「祝福護甲」（永久減傷 10%）和「聖騎士防禦」（隊伍減傷 20%）很省紅水，優先點起來。",
        "pros": [
          "祝福護甲 3 轉就點滿，被打少扣血",
          "聖騎士防禦全隊減傷，組隊受歡迎"
        ],
        "cons": [
          "輸出成形比燒錢版晚一些"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 flameChargeBluntWeapon:1 elementalCharge:30 patch_1210016:20 mpRecoveryKnight:20 iceChargeBluntWeapon:30 shieldMastery:20 magicCrash:20 flameChargeBluntWeapon:11 elementalReinforcement:20 holyChargeBlunt:20 patch_1221005:30 mapleWarrior:10 heavensHammer:30 powerGuard:30 patch_1220000:20 blast:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateSpear:30",
        "notes": {
          "3": "祝福護甲是被動減傷，越早點越省。",
          "4": "聖騎士防禦 30 = 全隊受到傷害 -20%。"
        }
      }
    },
    "featured": [
      {
        "id": "magicCrash",
        "name": "魔防消除",
        "img": "img/skills/magicCrash.png"
      },
      {
        "id": "patch_1210016",
        "name": "祝福護甲",
        "img": "img/skills/patch_1210016.png"
      },
      {
        "id": "patch_1221005",
        "name": "聖騎士防禦",
        "img": "img/skills/patch_1221005.png"
      },
      {
        "id": "holyChargeSword",
        "name": "聖靈之劍",
        "img": "img/skills/holyChargeSword.png"
      }
    ]
  },
  "DarkKnight": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 spearMastery:3 finalAttackSpear:30 spearMastery:20 spearBooster:20 hyperBody:20 holyFire:30 ironBody:4 dragonSacrifice:3 dragonRoar:30 dragonBusterSpear:30 dragonFurySpear:30 dragonSpirit:3 powerCrash:20 dragonSacrifice:30 dragonSpirit:11 darkForce:30 darkSoul:10 mapleWarrior:10 powerGuard:30 darkSpiritHeal:25 darkGuardian:25 mapleWarrior:30 sturdyArmor:30 absolutecity:30 ultimateSpear:30 heroesWill:1 dragonSpirit:20 magicResistance:20 ironBody:20 hpRecovery:16 hpRestore:8 dragonBusterPolearm:30 dragonFuryPolearm:30 polearmMastery:20 polearmBooster:20 finalAttackPolearm:30",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 hyperBody:20 spearMastery:5 spearBooster:6 finalAttackSpear:30 spearMastery:20 spearBooster:20 holyFire:30 ironBody:4 dragonBusterSpear:30 dragonSpirit:20 dragonSacrifice:3 dragonRoar:30 magicResistance:20 dragonFurySpear:30 powerCrash:18 darkSoul:10 darkSpiritHeal:25 sturdyArmor:10 darkForce:30 darkGuardian:25 powerGuard:30 mapleWarrior:10 sturdyArmor:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateSpear:30 powerCrash:20 dragonSacrifice:30 ironBody:20 hpRecovery:16 hpRestore:8 dragonBusterPolearm:30 dragonFuryPolearm:30 polearmMastery:20 polearmBooster:20 finalAttackPolearm:30",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 spearMastery:3 finalAttackSpear:30 spearMastery:20 spearBooster:20 hyperBody:20 holyFire:30 ironBody:4 dragonSacrifice:3 dragonRoar:30 dragonBusterSpear:30 dragonFurySpear:30 dragonSpirit:3 powerCrash:20 dragonSacrifice:30 dragonSpirit:11 darkForce:30 darkSoul:10 mapleWarrior:10 patch_1321005:30 powerGuard:30 darkSpiritHeal:25 darkGuardian:25 mapleWarrior:30 sturdyArmor:30 absolutecity:30 ultimateSpear:30 heroesWill:1 dragonSpirit:20 magicResistance:20 ironBody:20 hpRecovery:16 hpRestore:8 polearmMastery:20 polearmBooster:20 finalAttackPolearm:30",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 hyperBody:20 spearMastery:5 spearBooster:6 finalAttackSpear:30 spearMastery:20 spearBooster:20 holyFire:30 ironBody:4 dragonBusterSpear:30 dragonSpirit:20 dragonSacrifice:3 dragonRoar:30 magicResistance:20 dragonFurySpear:30 powerCrash:18 darkSoul:10 darkSpiritHeal:25 sturdyArmor:10 darkForce:30 darkGuardian:25 powerGuard:30 mapleWarrior:10 patch_1321005:30 sturdyArmor:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateSpear:30 powerCrash:20 dragonSacrifice:30 ironBody:20 hpRecovery:16 hpRestore:8 polearmMastery:20 polearmBooster:20 finalAttackPolearm:30",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "holyFire",
        "name": "神聖之火",
        "img": "img/skills/holyFire.png"
      },
      {
        "id": "powerCrash",
        "name": "力量消除",
        "img": "img/skills/powerCrash.png"
      },
      {
        "id": "dragonRoar",
        "name": "龍咆哮",
        "img": "img/skills/dragonRoar.png"
      },
      {
        "id": "dragonFurySpear",
        "name": "龍無雙",
        "img": "img/skills/dragonFurySpear.png"
      }
    ]
  },
  "Bowmaster": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 arrowBlow:1 doubleShot:20 archeryMastery:3 eyeOfTheAmazon:8 criticalShot:20 focus:9 bowMastery:3 finalAttackBow:30 bowMastery:20 bowBooster:20 bombArrow:30 powerKnockBack:20 arrowPlatter:1 strafeBow:30 mortalBlow:5 arrowRain:30 inferno:30 puppet:5 summonSilverHawk:30 mortalBlow:20 puppet:11 hurricane:30 sharpEyes:30 bowExpert:30 phoenix:30 concentrate:30 mapleWarrior:30 dragonBreath:30 hamstringShot:30 heroesWill:1 puppet:20 nimbleFeet:20 arrowPlatter:20 focus:20 archeryMastery:16 arrowBlow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 archeryMastery:3 eyeOfTheAmazon:8 arrowBlow:1 doubleShot:20 criticalShot:20 archeryMastery:12 bowMastery:5 bowBooster:20 arrowPlatter:20 bowMastery:20 finalAttackBow:30 bombArrow:30 powerKnockBack:1 puppet:5 summonSilverHawk:30 strafeBow:30 mortalBlow:5 arrowRain:30 puppet:20 inferno:30 mortalBlow:11 bowExpert:30 hurricane:30 phoenix:30 sharpEyes:30 mapleWarrior:30 concentrate:30 dragonBreath:30 hamstringShot:30 heroesWill:1 mortalBlow:20 nimbleFeet:20 powerKnockBack:20 archeryMastery:16 focus:20 arrowBlow:20",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 arrowBlow:1 doubleShot:20 archeryMastery:3 eyeOfTheAmazon:8 criticalShot:20 focus:9 bowMastery:3 finalAttackBow:30 bowMastery:20 bowBooster:20 bombArrow:30 powerKnockBack:20 arrowPlatter:1 strafeBow:30 mortalBlow:5 arrowRain:30 inferno:30 puppet:5 summonSilverHawk:30 mortalBlow:20 puppet:11 hurricane:30 sharpEyes:30 bowExpert:30 phoenix:30 concentrate:30 mapleWarrior:30 dragonBreath:30 hamstringShot:30 heroesWill:1 puppet:20 nimbleFeet:20 arrowPlatter:20 focus:20 archeryMastery:16 arrowBlow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 archeryMastery:3 eyeOfTheAmazon:8 arrowBlow:1 doubleShot:20 criticalShot:20 archeryMastery:12 bowMastery:5 bowBooster:20 arrowPlatter:20 bowMastery:20 finalAttackBow:30 bombArrow:30 powerKnockBack:1 puppet:5 summonSilverHawk:30 strafeBow:30 mortalBlow:5 arrowRain:30 puppet:20 inferno:30 mortalBlow:11 bowExpert:30 hurricane:30 phoenix:30 sharpEyes:30 mapleWarrior:30 concentrate:30 dragonBreath:30 hamstringShot:30 heroesWill:1 mortalBlow:20 nimbleFeet:20 powerKnockBack:20 archeryMastery:16 focus:20 arrowBlow:20",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "sharpEyes",
        "name": "會心之眼",
        "img": "img/skills/sharpEyes.png"
      },
      {
        "id": "hurricane",
        "name": "暴風神射",
        "img": "img/skills/hurricane.png"
      },
      {
        "id": "phoenix",
        "name": "召喚鳳凰",
        "img": "img/skills/phoenix.png"
      },
      {
        "id": "concentrate",
        "name": "念力集中",
        "img": "img/skills/concentrate.png"
      }
    ]
  },
  "Marksman": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 arrowBlow:1 doubleShot:20 archeryMastery:3 eyeOfTheAmazon:8 criticalShot:20 focus:9 crossbowMastery:3 finalAttackCrossbow:30 crossbowMastery:20 crossbowBooster:20 piercingArrow:30 boltBurst:20 arrowPlatter:1 strafeBow:30 mortalBlow:5 arrowEruptionCrossbow:30 blizzardCrossbow:30 puppet:5 summonGoldenEagle:30 mortalBlow:20 puppet:11 snipe:10 piercingArrowMarksman:30 crossbowExpert:30 sharpEyes:30 frostprey:30 blind:30 snipe:30 mapleWarrior:30 dragonBreath:30 heroesWill:1 puppet:20 nimbleFeet:20 arrowPlatter:20 focus:20 archeryMastery:16 arrowBlow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 archeryMastery:3 eyeOfTheAmazon:8 arrowBlow:1 doubleShot:20 criticalShot:20 archeryMastery:12 crossbowMastery:5 crossbowBooster:20 arrowPlatter:20 crossbowMastery:20 finalAttackCrossbow:30 piercingArrow:30 boltBurst:1 puppet:5 summonGoldenEagle:30 strafeBow:30 mortalBlow:5 arrowEruptionCrossbow:30 puppet:20 blizzardCrossbow:30 mortalBlow:11 crossbowExpert:30 piercingArrowMarksman:30 frostprey:30 sharpEyes:30 snipe:10 blind:30 mapleWarrior:30 snipe:30 dragonBreath:30 heroesWill:1 mortalBlow:20 nimbleFeet:20 boltBurst:20 archeryMastery:16 focus:20 arrowBlow:20",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 arrowBlow:1 doubleShot:20 archeryMastery:3 eyeOfTheAmazon:8 criticalShot:20 focus:9 crossbowMastery:3 finalAttackCrossbow:30 crossbowMastery:20 crossbowBooster:20 piercingArrow:30 boltBurst:20 arrowPlatter:1 strafeBow:30 mortalBlow:5 arrowEruptionCrossbow:30 blizzardCrossbow:30 puppet:5 summonGoldenEagle:30 mortalBlow:20 puppet:11 snipe:10 piercingArrowMarksman:30 crossbowExpert:30 sharpEyes:30 frostprey:30 blind:30 snipe:30 mapleWarrior:30 dragonBreath:30 heroesWill:1 puppet:20 nimbleFeet:20 arrowPlatter:20 focus:20 archeryMastery:16 arrowBlow:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 archeryMastery:3 eyeOfTheAmazon:8 arrowBlow:1 doubleShot:20 criticalShot:20 archeryMastery:12 crossbowMastery:5 crossbowBooster:20 arrowPlatter:20 crossbowMastery:20 finalAttackCrossbow:30 piercingArrow:30 boltBurst:1 puppet:5 summonGoldenEagle:30 strafeBow:30 mortalBlow:5 arrowEruptionCrossbow:30 puppet:20 blizzardCrossbow:30 mortalBlow:11 crossbowExpert:30 piercingArrowMarksman:30 frostprey:30 sharpEyes:30 snipe:10 blind:30 mapleWarrior:30 snipe:30 dragonBreath:30 heroesWill:1 mortalBlow:20 nimbleFeet:20 boltBurst:20 archeryMastery:16 focus:20 arrowBlow:20",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "sharpEyes",
        "name": "會心之眼",
        "img": "img/skills/sharpEyes.png"
      },
      {
        "id": "piercingArrowMarksman",
        "name": "光速神弩",
        "img": "img/skills/piercingArrowMarksman.png"
      },
      {
        "id": "frostprey",
        "name": "召喚銀隼",
        "img": "img/skills/frostprey.png"
      },
      {
        "id": "snipe",
        "name": "必殺狙擊",
        "img": "img/skills/snipe.png"
      }
    ]
  },
  "Shadower": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 doubleStab:20 haste:20 darkSight:1 luckySeven:20 savageBlow:30 daggerMastery:5 daggerBooster:20 daggerMastery:20 booster:5 steal:30 recovery:16 assaulter:30 shadowPartner:30 mesoExplosion:3 mesoUp:20 mesoExplosion:30 mesoGuard:30 shieldMasteryThief:11 boomerangStep:30 assassinate:30 venom:30 shadowerInstinct:5 ninjaAmbush:30 mapleWarrior:30 smokescreen:30 taunt:30 shadowerInstinct:30 heroesWill:1 shieldMasteryThief:20 mesoGuardShield:20 recovery:20 booster:20 darkSight:20 curse:20 keenEyes:8",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 darkSight:1 haste:20 doubleStab:20 darkSight:20 luckySeven:1 daggerMastery:5 daggerBooster:6 savageBlow:30 recovery:20 daggerMastery:20 daggerBooster:20 booster:20 steal:11 mesoExplosion:3 mesoUp:20 assaulter:30 shadowPartner:30 mesoGuard:30 shieldMasteryThief:20 mesoGuardShield:18 venom:30 shadowerInstinct:30 boomerangStep:30 mapleWarrior:10 assassinate:30 smokescreen:30 ninjaAmbush:30 mapleWarrior:30 taunt:30 heroesWill:1 mesoGuardShield:20 mesoExplosion:30 steal:30 luckySeven:20 curse:20 keenEyes:8",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 doubleStab:20 haste:20 darkSight:1 luckySeven:20 savageBlow:30 daggerMastery:5 daggerBooster:20 daggerMastery:20 booster:5 steal:30 recovery:16 assaulter:30 shadowPartner:30 mesoExplosion:3 mesoUp:20 mesoExplosion:30 mesoGuard:30 shieldMasteryThief:11 boomerangStep:30 assassinate:20 venom:30 shadowerInstinct:5 ninjaAmbush:30 mapleWarrior:30 smokescreen:30 patch_4221002:10 taunt:30 shadowerInstinct:30 heroesWill:1 shieldMasteryThief:20 mesoGuardShield:20 recovery:20 booster:20 darkSight:20 curse:20 keenEyes:8",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 darkSight:1 haste:20 doubleStab:20 darkSight:20 luckySeven:1 daggerMastery:5 daggerBooster:6 savageBlow:30 recovery:20 daggerMastery:20 daggerBooster:20 booster:20 steal:11 mesoExplosion:3 mesoUp:20 assaulter:30 shadowPartner:30 mesoGuard:30 shieldMasteryThief:20 mesoGuardShield:18 venom:30 shadowerInstinct:30 boomerangStep:30 mapleWarrior:10 assassinate:20 smokescreen:30 ninjaAmbush:30 mapleWarrior:30 patch_4221002:10 taunt:30 heroesWill:1 mesoGuardShield:20 mesoExplosion:30 steal:30 luckySeven:20 curse:20 keenEyes:8",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "booster",
        "name": "速度激發",
        "img": "img/skills/booster.png"
      },
      {
        "id": "savageBlow",
        "name": "迴旋斬",
        "img": "img/skills/savageBlow.png"
      },
      {
        "id": "mesoGuardShield",
        "name": "楓幣護盾",
        "img": "img/skills/mesoGuardShield.png"
      },
      {
        "id": "boomerangStep",
        "name": "順步連擊",
        "img": "img/skills/boomerangStep.png"
      }
    ]
  },
  "NightLord": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 luckySeven:20 haste:3 keenEyes:8 haste:20 darkSight:13 shurikenMastery:3 criticalThrow:30 shurikenMastery:20 shurikenBooster:20 drain:30 booster:20 recovery:1 windDemonShuriken:30 shadowClone:30 luckyCharm:5 doubleJump:5 mesoAttack:30 shadowWeb:20 alchemist:20 luckyCharm:16 tripleThrow:30 expertThrowingStarHandling:30 ninjaStorm:30 toxicVenom:30 shadowerInstinct:5 mapleWarrior:30 ninjaAmbushNL:30 shadowerInstinct:30 tauntNL:30 heroesWill:1 luckyCharm:20 doubleJump:20 recovery:20 darkSight:20 curse:20 doubleStab:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 haste:3 keenEyes:8 luckySeven:20 haste:20 darkSight:13 shurikenMastery:5 shurikenBooster:6 drain:30 criticalThrow:30 shurikenMastery:20 shurikenBooster:20 recovery:20 booster:1 alchemist:20 windDemonShuriken:30 luckyCharm:5 shadowClone:30 doubleJump:5 luckyCharm:20 shadowWeb:20 mesoAttack:26 expertThrowingStarHandling:30 tripleThrow:30 toxicVenom:30 mapleWarrior:10 ninjaStorm:30 shadowerInstinct:30 mapleWarrior:30 ninjaAmbushNL:30 tauntNL:30 heroesWill:1 mesoAttack:30 doubleJump:20 booster:20 darkSight:20 curse:20 doubleStab:20",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 luckySeven:20 haste:3 keenEyes:8 haste:20 darkSight:13 shurikenMastery:3 criticalThrow:30 shurikenMastery:20 shurikenBooster:20 drain:30 booster:20 recovery:1 windDemonShuriken:30 shadowClone:30 luckyCharm:5 doubleJump:5 mesoAttack:30 shadowWeb:20 alchemist:20 luckyCharm:16 tripleThrow:30 expertThrowingStarHandling:30 ninjaStorm:30 toxicVenom:30 shadowerInstinct:5 mapleWarrior:30 ninjaAmbushNL:30 shadowerInstinct:30 tauntNL:30 heroesWill:1 luckyCharm:20 doubleJump:20 recovery:20 darkSight:20 curse:20 doubleStab:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 haste:3 keenEyes:8 luckySeven:20 haste:20 darkSight:13 shurikenMastery:5 shurikenBooster:6 drain:30 criticalThrow:30 shurikenMastery:20 shurikenBooster:20 recovery:20 booster:1 alchemist:20 windDemonShuriken:30 luckyCharm:5 shadowClone:30 doubleJump:5 luckyCharm:20 shadowWeb:20 mesoAttack:26 expertThrowingStarHandling:30 tripleThrow:30 toxicVenom:30 mapleWarrior:10 ninjaStorm:30 shadowerInstinct:30 mapleWarrior:30 ninjaAmbushNL:30 tauntNL:30 heroesWill:1 mesoAttack:30 doubleJump:20 booster:20 darkSight:20 curse:20 doubleStab:20",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "booster",
        "name": "速度激發",
        "img": "img/skills/booster.png"
      },
      {
        "id": "luckyCharm",
        "name": "幸運術",
        "img": "img/skills/luckyCharm.png"
      },
      {
        "id": "windDemonShuriken",
        "name": "風魔手裡劍",
        "img": "img/skills/windDemonShuriken.png"
      },
      {
        "id": "tripleThrow",
        "name": "三飛閃",
        "img": "img/skills/tripleThrow.png"
      }
    ]
  },
  "Buccaneer": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 somersaultKick:20 straightPunch:20 dash:1 nimbleBody:20 knuckleMastery:5 knuckleBooster:20 corkscrewBlow:20 knuckleMastery:20 backspinBlow:20 screwPunch:20 hpIncrease:10 mpRecovery:10 oakBarrel:1 transformation:1 energyCharge:40 energyBlast:30 shockwave:30 transformation:20 energyDrain:20 demolition:11 dragonLord:30 energyBlastPlus:30 finalAttack:1 flashBlast:30 flashAssault:30 mapleWarrior:30 timeLeap:30 finalAttack:20 flashAssaultS:30 finalAttackS:20 heroesWill:1 demolition:20 oakBarrel:10 doubleShotPirate:20 dash:10",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 nimbleBody:10 somersaultKick:20 straightPunch:20 dash:1 nimbleBody:20 hpIncrease:10 mpRecovery:10 knuckleMastery:5 knuckleBooster:20 corkscrewBlow:20 knuckleMastery:20 backspinBlow:20 screwPunch:20 oakBarrel:1 energyCharge:1 energyDrain:20 transformation:1 energyCharge:40 energyBlast:30 shockwave:30 transformation:20 demolition:11 energyBlastPlus:30 dragonLord:30 mapleWarrior:10 finalAttack:1 flashBlast:30 timeLeap:30 flashAssault:30 mapleWarrior:30 finalAttack:20 flashAssaultS:30 finalAttackS:20 heroesWill:1 demolition:20 oakBarrel:10 doubleShotPirate:20 dash:10",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 somersaultKick:20 straightPunch:20 dash:1 nimbleBody:20 knuckleMastery:5 knuckleBooster:20 corkscrewBlow:20 knuckleMastery:20 backspinBlow:20 screwPunch:20 hpIncrease:10 mpRecovery:10 oakBarrel:1 transformation:1 energyCharge:40 energyBlast:30 shockwave:30 transformation:20 energyDrain:20 demolition:11 dragonLord:30 energyBlastPlus:30 finalAttack:1 flashBlast:30 flashAssault:30 mapleWarrior:30 timeLeap:30 finalAttack:20 flashAssaultS:30 finalAttackS:20 patch_5121009:20 heroesWill:1 demolition:20 oakBarrel:10 doubleShotPirate:20 dash:10",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 nimbleBody:10 somersaultKick:20 straightPunch:20 dash:1 nimbleBody:20 hpIncrease:10 mpRecovery:10 knuckleMastery:5 knuckleBooster:20 corkscrewBlow:20 knuckleMastery:20 backspinBlow:20 screwPunch:20 oakBarrel:1 energyCharge:1 energyDrain:20 transformation:1 energyCharge:40 energyBlast:30 shockwave:30 transformation:20 demolition:11 energyBlastPlus:30 dragonLord:30 mapleWarrior:10 finalAttack:1 flashBlast:30 timeLeap:30 flashAssault:30 mapleWarrior:30 finalAttack:20 flashAssaultS:30 finalAttackS:20 patch_5121009:20 heroesWill:1 demolition:20 oakBarrel:10 doubleShotPirate:20 dash:10",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "transformation",
        "name": "鬥神附體",
        "img": "img/skills/transformation.png"
      },
      {
        "id": "finalAttack",
        "name": "鬥神降世",
        "img": "img/skills/finalAttack.png"
      },
      {
        "id": "finalAttackS",
        "name": "最終極速",
        "img": "img/skills/finalAttackS.png"
      },
      {
        "id": "timeLeap",
        "name": "時間置換",
        "img": "img/skills/timeLeap.png"
      }
    ]
  },
  "Corsair": {
    "old": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 doubleShotPirate:20 somersaultKick:20 dash:1 nimbleBody:20 gunMastery:5 gunBooster:20 gunMastery:20 scatterShot:20 bombToss:20 fakeShot:20 slowDescent:10 recoilShot:11 summonOctopus:30 gaviota:5 flamethrower:30 coldBeam:30 tripleFire:20 targeting:30 gaviota:11 pirateShip:10 pirateCannon:30 octopusKing:20 instantBlizzard:30 instantFlash:30 gaviota:15 specialForce:30 mapleWarrior:30 pirateTorpedo:30 mindControl:20 preciseCannon:20 heroesWill:1 gaviota:30 recoilShot:20 straightPunch:20 dash:10",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 nimbleBody:10 doubleShotPirate:20 somersaultKick:20 dash:1 nimbleBody:20 gunMastery:5 gunBooster:6 gunMastery:20 bombToss:20 scatterShot:20 gunBooster:20 fakeShot:20 slowDescent:10 recoilShot:11 summonOctopus:30 tripleFire:20 gaviota:5 coldBeam:30 flamethrower:30 targeting:30 gaviota:11 octopusKing:20 pirateShip:10 pirateCannon:30 instantBlizzard:30 mapleWarrior:10 instantFlash:30 gaviota:15 specialForce:30 mapleWarrior:30 pirateTorpedo:30 mindControl:20 preciseCannon:20 heroesWill:1 gaviota:30 recoilShot:20 straightPunch:20 dash:10",
        "notes": {}
      }
    },
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 doubleShotPirate:20 somersaultKick:20 dash:1 nimbleBody:20 gunMastery:5 gunBooster:20 gunMastery:20 scatterShot:20 bombToss:20 fakeShot:20 slowDescent:10 recoilShot:11 summonOctopus:30 gaviota:5 flamethrower:30 coldBeam:30 tripleFire:20 targeting:30 gaviota:11 pirateShip:10 pirateCannon:30 octopusKing:20 instantBlizzard:30 instantFlash:30 gaviota:15 specialForce:30 mapleWarrior:30 pirateTorpedo:30 mindControl:20 preciseCannon:20 heroesWill:1 gaviota:30 recoilShot:20 straightPunch:20 dash:10",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 nimbleBody:10 doubleShotPirate:20 somersaultKick:20 dash:1 nimbleBody:20 gunMastery:5 gunBooster:6 gunMastery:20 bombToss:20 scatterShot:20 gunBooster:20 fakeShot:20 slowDescent:10 recoilShot:11 summonOctopus:30 tripleFire:20 gaviota:5 coldBeam:30 flamethrower:30 targeting:30 gaviota:11 octopusKing:20 pirateShip:10 pirateCannon:30 instantBlizzard:30 mapleWarrior:10 instantFlash:30 gaviota:15 specialForce:30 mapleWarrior:30 pirateTorpedo:30 mindControl:20 preciseCannon:20 heroesWill:1 gaviota:30 recoilShot:20 straightPunch:20 dash:10",
        "notes": {}
      }
    },
    "featured": [
      {
        "id": "slowDescent",
        "name": "緩降術",
        "img": "img/skills/slowDescent.png"
      },
      {
        "id": "summonOctopus",
        "name": "章魚砲台",
        "img": "img/skills/summonOctopus.png"
      },
      {
        "id": "gaviota",
        "name": "海鷗突擊隊",
        "img": "img/skills/gaviota.png"
      },
      {
        "id": "flamethrower",
        "name": "火焰噴射",
        "img": "img/skills/flamethrower.png"
      }
    ]
  },
  "SoulMaster": {
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c11001004:1 c11001005:20 c11001004:20 c11000000:5 c11000001:10 c11001002:6 c11100000:3 c11101002:30 c11100000:20 c11101001:20 c11101004:30 c11101003:20 c11101005:1 c11111005:30 c11111004:30 c11110003:30 c11111006:20 c11110001:20 c11110000:20 c11110002:1 c11121006:30 c11121005:30 c11120002:30 c11121000:30 c11121004:30 c11121001:30 c11120003:30 c11121099:1 c11110002:20 c11101005:10 c11001002:20 c11001003:20 c11000000:16",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c11000000:5 c11000001:10 c11001004:1 c11001005:20 c11001002:20 c11001004:6 c11100000:5 c11101001:6 c11101002:30 c11100000:20 c11101001:20 c11101003:20 c11101004:30 c11101005:1 c11110000:20 c11111005:30 c11110001:20 c11111004:30 c11110003:30 c11111006:20 c11110002:1 c11120003:30 c11121006:30 c11121001:30 c11121000:10 c11121005:30 c11120002:30 c11121000:30 c11121004:30 c11121099:1 c11110002:20 c11101005:10 c11001004:20 c11000000:16 c11001003:20",
        "notes": {}
      }
    }
  },
  "FlameWizard": {
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c12001004:20 c12001002:20 c12000000:5 c12000001:10 c12001003:6 c12101004:20 c12101005:20 c12101003:20 c12101001:20 c12100000:20 c12101006:20 c12101002:1 c12111006:30 c12110002:30 c12110000:1 c12111005:30 c12110000:20 c12110003:20 c12110001:20 c12111004:1 c12121005:30 c12121004:30 c12121003:30 c12121000:30 c12120001:20 c12121007:30 c12120002:30 c12120006:30 c12121099:1 c12111004:20 c12101002:20 c12001003:20 c12001005:20 c12000000:16",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c12000000:16 c12000001:10 c12001004:20 c12001002:15 c12100000:20 c12101003:20 c12101005:20 c12101004:20 c12101001:20 c12101006:20 c12101002:1 c12110003:20 c12110000:20 c12111006:30 c12110002:30 c12111005:30 c12110001:20 c12111004:1 c12120001:20 c12121005:30 c12121000:10 c12121004:30 c12121003:30 c12121007:30 c12121000:30 c12120006:30 c12120002:30 c12121099:1 c12111004:20 c12101002:20 c12001002:20 c12001003:20 c12001005:20",
        "notes": {}
      }
    }
  },
  "WindBreaker": {
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c13001005:20 c13000000:3 c13000002:8 c13000001:20 c13001004:10 c13100000:3 c13101003:30 c13100000:20 c13101001:20 c13101005:20 c13101004:20 c13100002:10 c13001004:11 c13111005:30 c13111006:20 c13110002:20 c13111004:20 c13110000:20 c13111003:20 c13110001:20 c13001004:12 c13121006:30 c13121005:30 c13001004:20 c13120004:30 c13120001:30 c13121003:20 c13121000:30 c13120002:20 c13121099:1 c13001003:20 c13000000:16",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c13000000:3 c13000002:8 c13001005:20 c13000001:20 c13001003:10 c13100000:5 c13101001:20 c13101004:20 c13100000:20 c13101003:30 c13101005:20 c13100002:10 c13001003:11 c13111003:20 c13111004:20 c13111005:30 c13110000:20 c13111006:20 c13110002:20 c13110001:20 c13001003:12 c13120001:30 c13121006:30 c13121003:20 c13121000:10 c13121005:30 c13001004:20 c13120004:30 c13121000:30 c13120002:20 c13121099:1 c13001003:20 c13000000:16",
        "notes": {}
      }
    }
  },
  "NightWalker": {
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c14001004:20 c14000000:3 c14000001:8 c14000000:20 c14001002:13 c14100000:3 c14100002:30 c14100000:20 c14101001:20 c14101004:20 c14101003:20 c14101005:11 c14111003:30 c14111004:20 c14101005:20 c14110002:30 c14111005:20 c14111001:20 c14110000:20 c14001002:15 c14121006:30 c14001002:20 c14120002:30 c14121005:30 c14120001:20 c14121000:30 c14120003:20 c14120004:30 c14121099:1 c14001003:20",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c14000000:3 c14000001:8 c14001004:20 c14000000:20 c14001003:13 c14100000:5 c14101001:6 c14101005:20 c14100002:30 c14100000:20 c14101001:20 c14101004:20 c14101003:11 c14110000:20 c14111003:30 c14111004:20 c14110002:30 c14111005:20 c14111001:20 c14101003:20 c14001003:15 c14120004:30 c14121006:30 c14120001:20 c14121000:10 c14001002:20 c14120002:30 c14121005:30 c14121000:30 c14120003:20 c14121099:1 c14001003:20",
        "notes": {}
      }
    }
  },
  "Striker": {
    "new": {
      "burn": {
        "title": "燒錢快練",
        "potion": 5,
        "summary": "主力攻擊技能優先點滿，用藥水換練功速度。適合藥水錢不心疼、想最快衝等的人。",
        "pros": [
          "每一轉的主力攻擊最早成形",
          "練功速度快"
        ],
        "cons": [
          "攻擊技能等級高、每發比較耗 MP",
          "輔助 / 防禦技能比較晚"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c15001003:20 c15001002:20 c15001001:20 c15001004:1 c15100001:5 c15101002:20 c15100001:20 c15101005:20 c15101004:20 c15101003:20 c15100000:10 c15001004:10 c15000000:2 c15111005:30 c15110002:20 c15110001:20 c15111004:20 c15110000:20 c15110003:20 c15000000:20 c15121003:30 c15120002:30 c15121004:30 c15121005:30 c15121000:30 c15121001:30 c15120006:30 c15121099:1",
        "notes": {}
      },
      "save": {
        "title": "省錢性價比",
        "potion": 2,
        "summary": "先點回復、減傷、省消耗品的技能，攻擊夠用就好，長期少花很多藥水錢。",
        "pros": [
          "回復 / 減傷 / 省消耗品技能先點",
          "長期藥水錢省很多"
        ],
        "cons": [
          "前期打怪比燒錢版慢一點"
        ],
        "steps": "b_nimbleFeet:3 b_recovery:3 c15000000:10 c15001003:20 c15001002:20 c15001001:11 c15100000:10 c15100001:5 c15101002:20 c15100001:20 c15101005:20 c15101004:20 c15101003:20 c15001001:20 c15001004:2 c15110003:20 c15110000:20 c15111005:30 c15110002:20 c15110001:20 c15111004:20 c15001004:10 c15000000:20 c15120006:30 c15121003:30 c15121001:30 c15121000:10 c15120002:30 c15121004:30 c15121005:30 c15121000:30 c15121099:1",
        "notes": {}
      }
    }
  }
};
