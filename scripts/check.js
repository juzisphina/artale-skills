// npm run check：檢查所有推薦加點都符合遊戲規則，並測試自由配點模擬器的規則
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = vm.createContext({ window: {} });
for (const f of ['data/skills.js', 'data/classes.js', 'data/builds.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx);
const { SKILLS, BUILDS, CLASSES, WEAPON_SWAP } = ctx.window;
const E = require(path.join(root, 'engine.js'));
let fail = 0;
const ok = (c, msg) => { if (!c) { fail++; console.log('  ✗ ' + msg); } };

for (const c of CLASSES) for (const v of ['old', 'new']) for (const b of ['burn', 'save']) {
  const cls = SKILLS[v][c.key], build = BUILDS[c.key][v][b];
  for (const weapon of c.weapon ? ['sword', 'blunt'] : ['-']) {
    const before = fail;
    const tag = `${c.key}/${v}/${b}${weapon !== '-' ? '/' + weapon : ''}`;
    const vr = E.validate(cls, build.steps, weapon === 'blunt' ? WEAPON_SWAP : null), r = vr.sim;
    vr.errors.forEach(e => ok(false, tag + ': ' + e));
    for (const k of ['title', 'summary', 'pros', 'cons', 'potion']) ok(build[k] != null && build[k] !== '', tag + ': 缺少 ' + k);
    const at = L => E.stageSums(cls, E.levelsAt(r.log, L));
    const s200 = at(200), used = s200.slice(1).reduce((a, x) => a + x, 0);
    console.log(`${fail > before ? '✗' : '✓'} ${tag}  Lv200 用 ${used}/${E.mainSp(cls, 200)}  4轉:${s200[4]}  步驟:${r.steps.length}`);
  }
}

// 模擬器規則
const P = SKILLS.old.Paladin;
ok(E.mainSp(P, 30) === 62 && E.mainSp(P, 200) === 576, 'Paladin SP 公式');
ok(E.mainSp(SKILLS.old.Bishop, 30) === 68, 'Bishop SP 公式');
let cur = {};
ok(E.whyNotAdd(P, cur, 30, 'swordMastery') === 'gate', '1 轉沒點滿不能點 2 轉');
ok(E.whyNotAdd(P, cur, 20, 'swordMastery') === 'lv', '等級不到不能點 2 轉');
ok(E.whyNotAdd(P, cur, 20, 'powerStrike') === 'pre', '前置技能');
ok(E.whyNotAdd(P, { slashBlast: 1 }, 10, 'powerStrike') === 'sp', '沒點數');
cur = { hpRecovery: 16, hpBoost: 10, hpRestore: 8, ironBody: 20, slashBlast: 7 };
ok(E.whyNotAdd(P, cur, 30, 'swordMastery') === null, '1 轉點 61 後可點 2 轉');
cur.swordMastery = 5; cur.swordBooster = 1;
ok(E.whyNotRemove(P, cur, 'swordMastery') === 'dep', '降前置會擋');
ok(E.whyNotRemove(P, cur, 'slashBlast') === 'gate', '降 1 轉會讓 2 轉失效要擋');
ok(E.whyNotAdd(P, { b_recovery: 3, b_nimbleFeet: 3 }, 15, 'b_snailThrow') === 'sp', '新手只有 6 點');

console.log(fail ? `\n${fail} 個問題` : '\n全部通過');
process.exit(fail ? 1 : 0);
