// npm run check：檢查所有推薦加點都符合遊戲規則，並測試自由配點模擬器的規則
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = vm.createContext({ window: {} });
const files = ['data/classes.js', 'data/builds.js'].concat(fs.readdirSync(path.join(root, 'data/skills')).map(f => 'data/skills/' + f));
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx);
const { SKILLS_BY, BUILDS, CLASSES } = ctx.window;
const E = require(path.join(root, 'engine.js'));
let fail = 0;
const ok = (c, msg) => { if (!c) { fail++; console.log('  ✗ ' + msg); } };

for (const c of CLASSES) for (const v of c.vers) for (const b of ['burn', 'save']) {
  const cls = SKILLS_BY[c.key][v], build = BUILDS[c.key] && BUILDS[c.key][v] && BUILDS[c.key][v][b];
  if (!cls || !build) { ok(false, `${c.key}/${v}/${b}: 缺資料`); continue; }
  const idx = E.index(cls), swap = {};
  for (const k in (c.swap || {})) if (idx[k] && idx[c.swap[k]]) { swap[k] = c.swap[k]; swap[c.swap[k]] = k; }
  for (const weapon of c.weapon ? ['a', 'b'] : ['-']) {
    const before = fail;
    const tag = `${c.key}/${v}/${b}${weapon !== '-' ? '/' + weapon : ''}`;
    const vr = E.validate(cls, build.steps, weapon === 'b' ? swap : null, build.maxLv), r = vr.sim;
    vr.errors.forEach(e => ok(false, tag + ': ' + e));
    for (const k of ['title', 'summary', 'pros', 'cons', 'potion']) ok(build[k] != null && build[k] !== '', tag + ': 缺少 ' + k);
    const at = L => E.stageSums(cls, E.levelsAt(r.log, L));
    const s200 = at(200), used = s200.slice(1).reduce((a, x) => a + x, 0);
    console.log(`${fail > before ? '✗' : '✓'} ${tag}  Lv200 用 ${used}/${E.mainSp(cls, 200)}  4轉:${s200[4]}  步驟:${r.steps.length}`);
  }
}

// 模擬器規則
const P = SKILLS_BY.Paladin.old;
ok(E.mainSp(P, 30) === 62 && E.mainSp(P, 200) === 576, 'Paladin SP 公式');
ok(E.mainSp(SKILLS_BY.Bishop.old, 30) === 68, 'Bishop SP 公式');
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

// 武陵道場資料與停層計算
const dctx = vm.createContext({ window: {} });
for (const f of ['data/dojo.js', 'dojo.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), dctx);
const DJ = dctx.window.DOJO, DM = dctx.window.Dojo;
for (const f of ['app.js', 'admin.js', 'dojo.js', 'engine.js']) { try { new vm.Script(fs.readFileSync(path.join(root, f), 'utf8')); } catch (e) { ok(false, f + ' 語法錯誤：' + e.message); } }
ok(DJ.floors.length === 47 && DJ.floors.every((x, i) => x.f === i + 1 && x.solo > 0 && x.party > 0), '道場 47 層連號且都有分數');
const dc = DM.cumulative(DJ.floors, 'solo');
ok(dc[36] === 274 && dc[47] === 627, '道場個人累計分數（36 層 274、47 層 627）');
ok(DM.cumulative(DJ.floors, 'party')[47] === 557, '道場組隊累計分數（47 層 557）');
ok(DM.parseLeft('44:26') > 44.43 && DM.parseLeft('44:26') < 44.44 && DM.parseLeft('abc') === null && DM.parseLeft('61:00') === null, '計時器時間解析');
const dp = DM.plan(DJ.floors, 'solo', [{ floor: 34, left: '47:00' }, { floor: 36, left: '44:26' }, { floor: 38, left: '38:32' }], 1, 60);
ok(dp.list.length === 3 && dp.best.floor === 34 && Math.abs(dp.list[0].rate - 233 / 14) < 1e-9, '停層計算：選每分鐘分數最高的樓層');
ok(DM.nextBelt(DJ.belts, 5359).pts === 8500 && DM.nextBelt(DJ.belts, 9000) === null, '下一條腰帶');
console.log('✓ 武陵道場：47 層、累計 ' + dc[47] + ' 分、計算器');

console.log(fail ? `\n${fail} 個問題` : '\n全部通過');
process.exit(fail ? 1 : 0);
