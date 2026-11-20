// 職業基本資料（AP、提醒）、劍↔棍對照、版本
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
