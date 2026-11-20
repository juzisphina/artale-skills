// 加點引擎：依照 Artale 規則，把「加點順序」一級一級模擬出來。
// 規則：
//  - 新手 Lv10 前給 6 點，只能點 0 轉技能
//  - 從 1 轉等級（法師 8 / 其他 10）起每升一級 +3 點；轉職等級（1轉、30、70）各 +1，120 +3
//  - 2 轉技能：1 轉已點 >= req[0]；3 轉：1+2 轉 >= req[1]；4 轉：1+2+3 轉 >= req[2]
//    （= 30、70、120 轉職前，前面的點數必須全部用完）
(function (root) {
  var MAX_LV = 200;

  function index(cls) {
    var map = {};
    cls.stages.forEach(function (st, si) {
      st.skills.forEach(function (s) { map[s.id] = { skill: s, stage: si }; });
    });
    return map;
  }

  function mainSp(cls, L) {
    if (L < cls.start) return 0;
    var sp = (L - cls.start) * 3;
    [cls.start, 30, 70].forEach(function (b) { if (L >= b) sp += 1; });
    if (L >= 120) sp += 3;
    return sp;
  }
  function beginnerSp(cls, L) { return L >= 10 ? cls.beginnerSp : 0; }

  function parseSteps(steps, swap) {
    return steps.trim().split(/\s+/).map(function (t) {
      var p = t.split(':'); var id = p[0];
      if (swap && swap[id]) id = swap[id];
      return { id: id, to: +p[1] };
    });
  }

  // 回傳 { log:[{lv,id,level}], steps:[{id,to,from,lvStart,lvEnd}], errors:[], idle }
  function simulate(cls, stepsStr, swap) {
    var map = index(cls), steps = parseSteps(stepsStr, swap), errors = [];
    var cur = {}, stageSum = [0, 0, 0, 0, 0], log = [];
    var poolMain = 0, poolBeg = 0, si = 0;
    steps.forEach(function (st, i) {
      if (!map[st.id]) errors.push('第 ' + (i + 1) + ' 步：找不到技能 ' + st.id);
      else if (st.to > map[st.id].skill.max) errors.push('第 ' + (i + 1) + ' 步：' + map[st.id].skill.name + ' 最高只有 ' + map[st.id].skill.max + ' 級');
    });
    if (errors.length) return { log: log, steps: steps, errors: errors };

    function gateOk(stage) {
      if (stage <= 1) return true;
      var sum = 0; for (var k = 1; k < stage; k++) sum += stageSum[k];
      return sum >= cls.req[stage - 2];
    }
    for (var L = 1; L <= MAX_LV; L++) {
      poolMain += mainSp(cls, L) - mainSp(cls, L - 1);
      poolBeg += beginnerSp(cls, L) - beginnerSp(cls, L - 1);
      while (si < steps.length) {
        var st = steps[si], m = map[st.id], s = m.skill;
        var have = cur[st.id] || 0;
        if (st.from === undefined) st.from = have;
        if (have >= st.to) { if (st.lvEnd === undefined) st.lvEnd = st.lvStart || L; si++; continue; }
        var beg = m.stage === 0;
        if ((beg ? poolBeg : poolMain) <= 0) break;
        if (L < s.req || !gateOk(m.stage)) break;
        var bad = null;
        for (var pid in (s.pre || {})) if ((cur[pid] || 0) < s.pre[pid]) bad = pid;
        if (bad) {
          errors.push('第 ' + (si + 1) + ' 步 ' + s.name + '：前置技能 ' + (map[bad] ? map[bad].skill.name : bad) + ' 還不夠 ' + s.pre[bad] + ' 級');
          return { log: log, steps: steps, errors: errors };
        }
        cur[st.id] = have + 1; stageSum[m.stage]++;
        if (beg) poolBeg--; else poolMain--;
        if (st.lvStart === undefined) st.lvStart = L;
        log.push({ lv: L, id: st.id, level: have + 1 });
        if (have + 1 >= st.to) { st.lvEnd = L; si++; }
      }
    }
    if (si < steps.length) {
      // 到 200 級還沒點完是正常的（點數不夠）；但若是被規則卡住就報錯
      var st2 = steps[si], m2 = map[st2.id];
      if (!gateOk(m2.stage)) errors.push('第 ' + (si + 1) + ' 步 ' + m2.skill.name + ' 被轉職門檻卡住：前一轉的點數沒點夠');
    }
    return { log: log, steps: steps, errors: unique(errors), stageSum: stageSum };
  }
  function unique(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  function levelsAt(log, L) {
    var cur = {};
    for (var i = 0; i < log.length && log[i].lv <= L; i++) cur[log[i].id] = log[i].level;
    return cur;
  }

  // 從效果文字抓 MP / HP 消耗
  function cost(effect) {
    if (!effect) return null;
    var mp = effect.match(/(?:消耗MP|MP消耗|HP、MP消耗（各自）)\s*[:：]\s*(\d+)/);
    var hp = effect.match(/(?:消耗HP|HP、MP消耗（各自）)\s*[:：]\s*(\d+)/);
    if (!mp && !hp) return null;
    return { mp: mp ? +mp[1] : 0, hp: hp ? +hp[1] : 0 };
  }

  // ---------- 自由配點模擬器 ----------
  function stageSums(cls, cur) {
    var sums = cls.stages.map(function () { return 0; });
    cls.stages.forEach(function (st, si) { st.skills.forEach(function (s) { sums[si] += cur[s.id] || 0; }); });
    return sums;
  }
  function budget(cls, cur, L) {
    var sums = stageSums(cls, cur), used = 0;
    for (var i = 1; i < sums.length; i++) used += sums[i];
    return { sums: sums, main: mainSp(cls, L), usedMain: used, beg: beginnerSp(cls, L), usedBeg: sums[0] };
  }
  function gateNeed(cls, stage, sums) {
    if (stage <= 1) return null;
    var sum = 0; for (var k = 1; k < stage; k++) sum += sums[k];
    return sum >= cls.req[stage - 2] ? null : { have: sum, need: cls.req[stage - 2] };
  }
  // 為什麼不能再 +1？回傳原因字串，可以就回傳 null
  function whyNotAdd(cls, cur, L, id) {
    var m = index(cls)[id], s = m.skill, b = budget(cls, cur, L), have = cur[id] || 0;
    if (have >= s.max) return 'max';
    if (L < s.req) return 'lv';
    for (var pid in (s.pre || {})) if ((cur[pid] || 0) < s.pre[pid]) return 'pre';
    if (gateNeed(cls, m.stage, b.sums)) return 'gate';
    if (m.stage === 0 ? b.usedBeg >= b.beg : b.usedMain >= b.main) return 'sp';
    return null;
  }
  function whyNotRemove(cls, cur, id) {
    var map = index(cls), m = map[id], have = cur[id] || 0;
    if (have <= 0) return 'zero';
    var next = {}; for (var k in cur) next[k] = cur[k]; next[id] = have - 1;
    for (var oid in map) {
      var o = map[oid].skill;
      if ((next[oid] || 0) > 0 && o.pre && o.pre[id] && next[id] < o.pre[id]) return 'dep';
    }
    var sums = stageSums(cls, next);
    for (var st = m.stage + 1; st < sums.length; st++) if (sums[st] > 0 && gateNeed(cls, st, sums)) return 'gate';
    return null;
  }
  // 完整檢查一套加點（網站編輯器與 npm run check 共用）：回傳 { sim, errors }
  function validate(cls, stepsStr, swap) {
    var r = simulate(cls, stepsStr, swap), errors = r.errors.slice();
    if (!errors.length) {
      var at = function (L) { return stageSums(cls, levelsAt(r.log, L)); };
      var s29 = at(29), s69 = at(69), s119 = at(119);
      if (s29[1] !== mainSp(cls, 29)) errors.push('Lv30 轉職前 1 轉點數沒用完（' + s29[1] + ' / ' + mainSp(cls, 29) + '）');
      if (s69[1] + s69[2] !== mainSp(cls, 69)) errors.push('Lv70 轉職前 1~2 轉點數沒用完（' + (s69[1] + s69[2]) + ' / ' + mainSp(cls, 69) + '）');
      if (s119[1] + s119[2] + s119[3] !== mainSp(cls, 119)) errors.push('Lv120 轉職前 1~3 轉點數沒用完（' + (s119[1] + s119[2] + s119[3]) + ' / ' + mainSp(cls, 119) + '）');
      var s200 = at(200), used = s200[1] + s200[2] + s200[3] + s200[4];
      var allDone = r.steps.every(function (s) { return s.lvEnd !== undefined; });
      var cap = 0; cls.stages.forEach(function (st, si) { if (si > 0) st.skills.forEach(function (s) { cap += s.max; }); });
      var should = Math.min(mainSp(cls, 200), cap);
      if (allDone && used < should) errors.push('步驟全部點完了，但到 Lv200 還剩 ' + (should - used) + ' 點沒安排');
    }
    return { sim: r, errors: errors };
  }

  var api = { validate: validate, MAX_LV: MAX_LV, index: index, mainSp: mainSp, beginnerSp: beginnerSp, simulate: simulate, levelsAt: levelsAt, cost: cost,
    stageSums: stageSums, budget: budget, gateNeed: gateNeed, whyNotAdd: whyNotAdd, whyNotRemove: whyNotRemove };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Engine = api;
})(this);
