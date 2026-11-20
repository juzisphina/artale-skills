// 推薦加點：每個職業 × 版本（old = 現行正式服 / new = 技改 Tespia v2）× 兩套（burn 燒錢快練 / save 省錢性價比）
// steps = 依序「技能id:目標等級」，網站會自動一級一級模擬，算出每一步在幾等完成。
// 規則檢查：npm run check（scripts/check.js）
window.CLASSES = [
  { key: 'Bishop', name: '主教', en: 'Bishop', line: '法師 → 僧侶 → 祭司 → 主教', img: 'img/bishop.webp',
    ap: 'INT 為主力，LUK 依裝備需求補到剛好即可（大多 4 起跳，換裝再補）。',
    tips: ['Lv30 轉僧侶後用「群體治癒」打不死系怪（殭屍菇、木乃伊）是最快的練法。', '神聖祈禱（HS）可以幫隊伍加經驗，組隊很搶手。', '聖龍召喚至少要 15 級才能點 4 轉的召喚神龍。'] },
  { key: 'Paladin', name: '聖騎士', en: 'Paladin', line: '劍士 → 見習騎士 → 騎士 → 聖騎士', img: 'img/paladin.webp', weapon: true,
    ap: 'STR、DEX 越高越好，其他 4。DEX 跟著命中走（夠命中就好），其他全部點 STR。',
    tips: ['棍騎：把「精準 / 快速 / 終極之劍」換成「之棍」即可（上方可切換劍 / 棍）。', 'Lv90 去魚屋前，冰屬性先點 1，不然會降低效率。', '屬性攻擊要先開一種屬性衝擊（武器充能）才能用。'] }
];

// 劍 ↔ 棍 對照（聖騎士）
window.WEAPON_SWAP = {
  swordMastery: 'bluntWeaponMastery', swordBooster: 'bluntWeaponBooster', finalAttackSword: 'finalAttackBluntWeapon',
  flameChargeSword: 'flameChargeBluntWeapon', iceChargeSword: 'iceChargeBluntWeapon', lightningChargeSword: 'lightningChargeBluntWeapon',
  holyChargeSword: 'holyChargeBlunt'
};

window.VERSIONS = [
  { key: 'old', name: '現行版', sub: '目前正式服（未技改）' },
  { key: 'new', name: '技改版', sub: 'Tespia v2 測試服資料，正式上線可能再改' }
];

window.BUILDS = {
  Bishop: {
    old: {
      burn: {
        title: '燒錢快練', potion: 5,
        summary: '攻擊技能先點滿，不點魔力吸收，用藥水換速度。適合藥水錢不心疼、想最快衝等的人。',
        pros: ['每個階段的主力攻擊最早點滿', '3 轉聖光、4 轉核爆最快成形'], cons: ['魔力爪 20、聖光 30 每發都比較耗藍', '前期幾乎靠喝藍水撐'],
        steps: 'b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 ' +
          'massHeal:30 teleport:20 holyLight:20 angelBlessing:20 holyArrow:30 magicPurify:6 ' +
          'shiningRay:30 dispel:3 holySymbol:30 summonHolyDragon:15 mysticDoor:1 magicResistance:20 dispel:20 monsterTransformation:30 mysticDoor:6 ' +
          'genesis:30 mapleWarrior:10 summonDragon:30 angelRay:30 heavensDoor:10 infinity:30 mapleWarrior:30 holyShield:30 resurrection:10 heroesWill:1 heavensDoor:30 magicDrain:20 magicPurify:16',
        notes: { 1: '魔力爪是 1 轉唯一的主力，直接點滿。', 2: '群體治癒先滿打不死系；不點魔力吸收，改點神聖之箭補單體輸出。', 3: '聖光一進 3 轉就點滿。', 4: '核爆術最先滿，召喚神龍、天使之箭接著補。' }
      },
      save: {
        title: '省錢性價比', potion: 2,
        summary: '先把回藍、魔力吸收、時空門這類「省水」技能點起來，攻擊夠用就好。參考玩家實戰截圖（約 Lv165）的加法。',
        pros: ['魔力淨化 / 擴展早點滿，藍量大回得快', '魔力吸收 20 打怪回藍，幾乎不用買藍水', '4 轉先點魔力無限，打王不耗藍'], cons: ['1 轉魔力爪只點 11，前期打怪比較慢'],
        steps: 'b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 ' +
          'massHeal:30 magicDrain:20 teleport:20 holyLight:20 angelBlessing:20 magicShield:20 ' +
          'shiningRay:30 dispel:3 holySymbol:30 mysticDoor:20 magicResistance:20 dispel:20 monsterTransformation:16 summonHolyDragon:15 ' +
          'genesis:30 infinity:15 mapleWarrior:10 summonDragon:30 angelRay:30 holyShield:20 resurrection:1 heavensDoor:5 mapleWarrior:30 infinity:30 holyShield:30 heroesWill:1 heavensDoor:30 resurrection:10 magicReflect:30',
        notes: { 1: '魔力爪點 11 就夠用（越高越耗藍），點數拿去回藍。', 2: '魔力吸收早點滿；瞬間移動等級越高越省藍（60 → 13）。2 轉多出的 11 點回補 1 轉魔力之盾。', 3: '時空門 20 級耗藍最低；聖龍召喚 15 是為了解鎖召喚神龍。', 4: '魔力無限先點 15，打王時 MP 不減。' }
      }
    },
    new: {
      burn: {
        title: '燒錢快練', potion: 5,
        summary: '技改後主教多了「聖靈祈禱」（範圍內所有人最終傷害增加），天使之箭在祈禱期間會多段攻擊，攻擊向全部優先。',
        pros: ['聖靈祈禱 + 天使之箭早成形，輸出大增', '超級神聖祈禱讓組隊經驗更多'], cons: ['聖靈祈禱每次要扣 HP、MP 各 500~1000', '前中期一樣靠藍水撐'],
        steps: 'b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:20 magicGuard:20 magicPurify:5 magicExtension:10 magicShield:11 ' +
          'massHeal:30 teleport:20 holyLight:20 angelBlessing:20 holyArrow:30 magicPurify:6 ' +
          'shiningRay:30 dispel:3 holySymbol:30 summonHolyDragon:15 mysticDoor:1 magicResistance:20 dispel:20 monsterTransformation:30 mysticDoor:6 ' +
          'genesis:30 patch_2321011:10 angelRay:30 mapleWarrior:10 summonDragon:30 patch_2321012:20 infinity:30 mapleWarrior:30 holyShield:30 heroesWill:1 resurrection:10 heavensDoor:30',
        notes: { 3: '神聖祈禱要 30 級才能點 4 轉的聖靈祈禱，3 轉就先滿。', 4: '聖靈祈禱 10 → 天使之箭 30，祈禱期間天使之箭是 3 段攻擊。' }
      },
      save: {
        title: '省錢性價比', potion: 2,
        summary: '1~3 轉照省水路線，4 轉先拿魔力無限和聖靈祈禱，超級神聖祈禱可以幫隊伍加經驗（組隊好找）。',
        pros: ['回藍技能早點滿，幾乎不用買藍水', '超級神聖祈禱 = 組隊經驗加成，很受歡迎'], cons: ['前期打怪較慢', '天怒、復甦之光比較晚才點'],
        steps: 'b_nimbleFeet:3 b_recovery:3 magicArrow:1 magicClaw:11 magicPurify:16 magicExtension:10 magicGuard:20 magicShield:9 ' +
          'massHeal:30 magicDrain:20 teleport:20 holyLight:20 angelBlessing:20 magicShield:20 ' +
          'shiningRay:30 dispel:3 holySymbol:30 mysticDoor:20 magicResistance:20 dispel:20 monsterTransformation:16 summonHolyDragon:15 ' +
          'genesis:30 infinity:15 patch_2321011:10 mapleWarrior:10 summonDragon:30 angelRay:30 holyShield:20 resurrection:1 heavensDoor:5 patch_2321012:20 mapleWarrior:30 infinity:30 holyShield:30 heroesWill:1 heavensDoor:30 resurrection:10',
        notes: { 4: '技改版拿掉了魔法反射，點數改給聖靈祈禱 / 超級神聖祈禱。' }
      }
    }
  },
  Paladin: {
    old: {
      burn: {
        title: '燒錢快練', potion: 5,
        summary: '攻擊與終極之劍優先，3 轉屬性攻擊和兩種屬性先滿，4 轉鬼神之擊、騎士衝擊波先成形。',
        pros: ['1 轉劍氣縱橫最早滿，清怪快', '終極之劍 30 很早就有'], cons: ['劍氣縱橫要扣 HP + MP，紅藍都喝很兇', '防禦類技能較晚'],
        steps: 'b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 ' +
          'swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 ' +
          'flameChargeSword:1 elementalCharge:30 flameChargeSword:30 iceChargeSword:30 magicCrash:20 shieldMastery:20 mpRecoveryKnight:20 ironBody:5 ' +
          'elementalReinforcement:10 holyChargeSword:20 heavensHammer:30 blast:30 mapleWarrior:30 powerGuard:30 sturdyArmor:30 heroesWill:1 absolutecity:30 ultimateShield:30 ultimateSpear:30',
        notes: { 1: '魔天一擊點 1 解鎖劍氣縱橫（群攻）並點滿。', 2: '精準之劍 3 解鎖終極之劍，直接點滿。', 3: '先點 1 級烈焰之劍開充能，屬性攻擊才能用。', 4: '屬性強化需要屬性攻擊 30。' }
      },
      save: {
        title: '省錢性價比', potion: 2,
        summary: '參考 Comboking〈剩歧視簡易一圖〉的路線：先點生命淨化 / 擴展省紅水，快速之劍早點（等級越高越省 HP/MP），3 轉魔力恢復提早。',
        pros: ['生命淨化 + 擴展先點，血多回得快', '快速之劍等級越高消耗越少（29 → 10）', '3 轉魔力恢復提早，藍水省很多'], cons: ['1 轉打怪稍慢'],
        steps: 'b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 ' +
          'swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 ' +
          'flameChargeSword:1 elementalCharge:30 mpRecoveryKnight:20 iceChargeSword:30 flameChargeSword:30 shieldMastery:20 magicCrash:20 ironBody:5 ' +
          'elementalReinforcement:10 holyChargeSword:20 sturdyArmor:30 mapleWarrior:10 heavensHammer:30 powerGuard:30 blast:30 mapleWarrior:30 heroesWill:1 ultimateShield:30 absolutecity:30 ultimateSpear:30',
        notes: { 1: '先 5 淨化 + 10 擴展（血量上升更多），再點攻擊。', 3: '冰屬性在 Lv90 魚屋前要有；4 轉前把冰補滿。', 4: '武神防禦先點，被打少扣血就少喝水。' }
      }
    },
    new: {
      burn: {
        title: '燒錢快練', potion: 5,
        summary: '技改後屬性衝擊劍棍共用、屬性強化變 20 級，新增盾牌之力（依盾防加攻擊）。輸出技能全部優先。',
        pros: ['屬性攻擊 + 屬性強化 20 早成形', '盾牌之力讓攻擊再往上加'], cons: ['祝福護甲、魔力恢復很晚才點，喝水多'],
        steps: 'b_nimbleFeet:3 b_recovery:3 slashBlast:1 powerStrike:20 slashBlast:20 hpRecovery:5 hpBoost:10 hpRestore:3 ironBody:3 ' +
          'swordMastery:3 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 ' +
          'flameChargeBluntWeapon:1 elementalCharge:30 iceChargeBluntWeapon:30 flameChargeBluntWeapon:30 magicCrash:20 shieldMastery:20 patch_1210016:20 mpRecoveryKnight:1 ' +
          'elementalReinforcement:20 holyChargeBlunt:20 patch_1220000:20 heavensHammer:30 blast:30 mapleWarrior:30 powerGuard:30 patch_1221005:30 heroesWill:1 absolutecity:30 mpRecoveryKnight:20 ultimateSpear:30',
        notes: { 3: '技改版屬性衝擊劍棍共用，一次只能開一種。', 4: '聖靈之棍技改後劍騎也能用（屬性衝擊系列）。' }
      },
      save: {
        title: '省錢性價比', potion: 2,
        summary: '技改新增的「祝福護甲」（永久減傷 10%）和「聖騎士防禦」（隊伍減傷 20%）很省紅水，優先點起來。',
        pros: ['祝福護甲 3 轉就點滿，被打少扣血', '聖騎士防禦全隊減傷，組隊受歡迎'], cons: ['輸出成形比燒錢版晚一些'],
        steps: 'b_nimbleFeet:3 b_recovery:3 hpRecovery:5 hpBoost:10 slashBlast:1 powerStrike:20 hpRestore:3 slashBlast:20 ironBody:3 ' +
          'swordMastery:5 swordBooster:6 finalAttackSword:30 swordMastery:20 swordBooster:20 powerReflection:30 threaten:20 ironBody:4 ' +
          'flameChargeBluntWeapon:1 elementalCharge:30 patch_1210016:20 mpRecoveryKnight:20 iceChargeBluntWeapon:30 shieldMastery:20 magicCrash:20 flameChargeBluntWeapon:11 ' +
          'elementalReinforcement:20 holyChargeBlunt:20 patch_1221005:30 mapleWarrior:10 heavensHammer:30 powerGuard:30 patch_1220000:20 blast:30 mapleWarrior:30 heroesWill:1 absolutecity:30 ultimateSpear:30',
        notes: { 3: '祝福護甲是被動減傷，越早點越省。', 4: '聖騎士防禦 30 = 全隊受到傷害 -20%。' }
      }
    }
  }
};
