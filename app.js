(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $('#app');
  var E = window.Engine;
  var MILES = [30, 70, 120, 150, 200];

  // ---------- storage (always wrapped) ----------
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    conv(t); setTimeout(function () { t.remove(); }, 2200);
  }

  // ---------- 繁 / 簡 ----------
  var lang = load('askills.lang') === 'cn' ? 'cn' : 'tw', converter = null, convLoading = null;
  function loadConverter() {
    if (converter) return Promise.resolve(converter);
    if (convLoading) return convLoading;
    convLoading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/t2cn.js';
      s.onload = function () { converter = window.OpenCC.Converter({ from: 'tw', to: 'cn' }); res(converter); };
      s.onerror = function () { convLoading = null; rej(new Error('load')); };
      document.head.appendChild(s);
    });
    return convLoading;
  }
  function conv(root) {
    if (lang !== 'cn' || !converter) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.parentNode && /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName)) continue;
      var v = converter(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v;
    }
    root.querySelectorAll && root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(function (el) {
      ['placeholder', 'title', 'aria-label'].forEach(function (a) { if (el.hasAttribute(a)) el.setAttribute(a, converter(el.getAttribute(a))); });
    });
  }
  function convAll() { if (converter && lang === 'cn') document.title = converter(document.title); conv(app); conv($('.top')); conv($('.foot')); conv($('#keyDlg')); }
  function setLang(l) {
    lang = l; save('askills.lang', l);
    document.documentElement.lang = l === 'cn' ? 'zh-Hans-CN' : 'zh-Hant-TW';
    $('#langBtn').textContent = l === 'cn' ? '繁' : '简';
    if (l === 'cn') loadConverter().then(function () { render(); }, function () { toast('簡體轉換載入失敗，請稍後再試'); });
    else location.reload();
  }
  $('#langBtn').addEventListener('click', function () { setLang(lang === 'cn' ? 'tw' : 'cn'); });
  if (lang === 'cn') { $('#langBtn').textContent = '繁'; document.documentElement.lang = 'zh-Hans-CN'; }

  // ---------- routing ----------
  // #/Bishop/old/burn?lv=120&w=blunt     #/Paladin/new/sim?L=120&s=...
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, ''), q = {}, parts = h.split('?');
    (parts[1] || '').split('&').forEach(function (kv) { if (kv) { var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || ''); } });
    var seg = parts[0].split('/').filter(Boolean);
    return { cls: seg[0], ver: seg[1], tab: seg[2], q: q };
  }
  function go(cls, ver, tab, q) {
    var s = '#/' + cls + '/' + ver + '/' + tab, qs = [];
    for (var k in (q || {})) if (q[k] != null && q[k] !== '') qs.push(k + '=' + encodeURIComponent(q[k]));
    if (qs.length) s += '?' + qs.join('&');
    if (location.hash === s) render(); else location.hash = s;
  }
  window.addEventListener('hashchange', function () { render(); });

  function classOf(key) { return window.CLASSES.filter(function (c) { return c.key === key; })[0]; }
  var state = { weapon: {} };
  try { state.weapon = JSON.parse(load('askills.weapon2') || '{}') || {}; } catch (e) {}
  function weaponB(c) { return !!(c.weapon && state.weapon[c.key] === 'b'); }

  // 職業技能資料按需載入（data/skills/<key>.js）
  var loading = {};
  function ensureSkills(key) {
    if (window.SKILLS_BY && window.SKILLS_BY[key]) return Promise.resolve();
    if (loading[key]) return loading[key];
    loading[key] = new Promise(function (res, rej) {
      var sc = document.createElement('script'); sc.src = 'data/skills/' + key + '.js';
      sc.onload = res; sc.onerror = function () { delete loading[key]; rej(); };
      document.head.appendChild(sc);
    });
    return loading[key];
  }

  function render() {
    var r = parseHash();
    var c = classOf(r.cls);
    if (!c) renderHome();
    else {
      var ver = c.vers.indexOf(r.ver) >= 0 ? r.ver : c.vers[0];
      var tab = /^(burn|save|sim)$/.test(r.tab) ? r.tab : 'burn';
      if (!(window.SKILLS_BY && window.SKILLS_BY[c.key])) {
        app.innerHTML = '<p class="muted">載入中…</p>';
        ensureSkills(c.key).then(render, function () { app.innerHTML = '<p class="notice rose">技能資料載入失敗，請重新整理。</p>'; });
        return;
      }
      renderClass(c, ver, tab, r.q);
    }
    if (lang === 'cn') { if (converter) convAll(); else loadConverter().then(convAll, function () {}); }
  }

  // ---------- home ----------
  function renderHome() {
    var admin = !!(window.Admin && window.Admin.on());
    document.title = 'Artale 技能加點站';
    var html = '<section class="hero"><h1>新角色不用再<b>糾結加點</b></h1>' +
      '<p>每個職業兩套最常見的加法：<b>燒錢快練</b>（藥水換速度）和 <b>省錢性價比</b>（少喝水）。照著 Lv 一步步點，30、70、120 轉職前都會剛好把點數用完。</p>' +
      '<div class="chips"><span class="chip">🧪 現行版 / 技改版</span><span class="chip">🎮 自己配點模擬器</span><span class="chip">✨ AI 點評</span><span class="chip">💬 玩家留言</span></div></section>';
    var groups = [];
    window.CLASSES.forEach(function (c) { if (groups.indexOf(c.group) < 0) groups.push(c.group); });
    groups.forEach(function (g) {
      html += '<h2 class="grp">' + esc(g) + (g === '皇家騎士團' ? ' <span class="muted small">目前只有測試服（技改版）資料</span>' : '') + '</h2><div class="grid">';
      window.CLASSES.filter(function (c) { return c.group === g; }).forEach(function (c) {
        var feat = (window.BUILDS[c.key] || {}).featured;
        var icons = feat && feat.length ? feat : c.icons.map(function (src) { return { img: src, name: '' }; });
        html += '<a class="cls-card" href="#/' + c.key + '/' + c.vers[0] + '/burn"><div class="pic"><img src="' + c.img + '" alt="" loading="lazy"></div><div class="body">' +
          '<h3>' + esc(c.name) + '<small>' + c.en + '</small></h3><div class="muted small">' + esc(c.line) + '</div>' +
          '<div class="icons">' + icons.map(function (f) { return '<img class="ic" src="' + f.img + '" alt="" title="' + esc(f.name) + '" loading="lazy">'; }).join('') +
          (admin ? '<button class="feat-edit" data-feat="' + c.key + '" title="更換代表技能">✏️</button>' : '') + '</div></div></a>';
      });
      html += '</div>';
    });
    app.innerHTML = html;
    app.querySelectorAll('[data-feat]').forEach(function (b) {
      b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); window.Admin.editFeatured(classOf(b.dataset.feat)); };
    });
    window.scrollTo(0, 0);
  }

  // ---------- class page ----------
  function swapFor(c, cls) {
    if (!weaponB(c)) return null;
    var idx = E.index(cls), m = {};
    for (var k in c.swap) if (idx[k] && idx[c.swap[k]]) { m[k] = c.swap[k]; m[c.swap[k]] = k; }
    return m;
  }
  function stageLabel(name) { return name.replace(/\s*\(.*\)/, function (m) { return ' · ' + m.replace(/[()\s]/g, ''); }); }

  function renderClass(c, ver, tab, q) {
    var cls = window.SKILLS_BY[c.key][ver], V = window.VERSIONS.filter(function (v) { return v.key === ver; })[0];
    document.title = c.name + '加點｜Artale 技能加點站';
    var html = '<a class="back" href="#/">← 所有職業</a>' +
      '<div class="cls-head"><div class="face"><img src="' + c.img + '" alt=""></div><div><h1>' + esc(c.name) + ' <span class="muted small">' + c.en + '</span></h1><div class="line">' + esc(c.line) + '</div></div></div>' +
      '<div class="toolbar"><div class="seg" id="verSeg">' + window.VERSIONS.filter(function (v) { return c.vers.indexOf(v.key) >= 0; }).map(function (v) {
        return '<button data-ver="' + v.key + '" class="' + (v.key === ver ? 'on' : '') + '">' + v.name + '</button>';
      }).join('') + '</div>' +
      (c.weapon ? '<div class="seg" id="wSeg"><button data-w="a" class="' + (weaponB(c) ? '' : 'on') + '">' + c.weapon[0] + '</button><button data-w="b" class="' + (weaponB(c) ? 'on' : '') + '">' + c.weapon[1] + '</button></div>' : '') +
      '</div><div class="ver-sub ' + ver + '">' + esc(V.sub) + '</div>' +
      '<div class="tabs">' +
      tabBtn('burn', '🔥 燒錢快練', '藥水換速度', tab) + tabBtn('save', '💰 省錢性價比', '少喝水、CP 值高', tab) + tabBtn('sim', '🎮 自己配點', '模擬器，規則照遊戲', tab) +
      '</div><div id="tabBody"></div>' +
      '<div class="cols"><section class="card ai" id="aiCard"></section><section class="card"><h2>📌 ' + esc(c.name) + '小提醒</h2>' +
      '<p class="notice"><b>AP 配點：</b>' + esc(c.ap) + '</p><ul class="tips">' + c.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></section></div>' +
      '<section class="card" id="cmtCard"><h2>💬 玩家留言 <span class="muted">' + esc(c.name) + '・' + V.name + '</span></h2><div id="giscusBox"></div></section>';
    app.innerHTML = html;

    app.querySelectorAll('#verSeg button').forEach(function (b) { b.onclick = function () { go(c.key, b.dataset.ver, tab, tab === 'sim' ? {} : { lv: q.lv }); }; });
    app.querySelectorAll('#wSeg button').forEach(function (b) { b.onclick = function () { state.weapon[c.key] = b.dataset.w; save('askills.weapon2', JSON.stringify(state.weapon)); render(); }; });
    app.querySelectorAll('.tab').forEach(function (b) { b.onclick = function () { go(c.key, ver, b.dataset.tab, b.dataset.tab === 'sim' ? {} : { lv: q.lv }); }; });

    var ctx = { c: c, cls: cls, ver: ver, V: V, tab: tab, q: q };
    if (tab === 'sim') renderSim(ctx); else renderBuild(ctx);
    renderAI(ctx);
    renderGiscus(c.key + '-' + ver);
  }
  function tabBtn(key, title, sub, tab) {
    return '<button class="tab ' + key + (key === tab ? ' on' : '') + '" data-tab="' + key + '"><b>' + title + '</b><span>' + sub + '</span></button>';
  }

  // skill window (read-only or editable)
  function skillWindow(cls, cur, L, opts) {
    opts = opts || {};
    var sums = E.stageSums(cls, cur), html = '';
    cls.stages.forEach(function (st, si) {
      var gate = E.gateNeed(cls, si, sums), locked = L < (st.skills[0] ? st.skills[0].req : 1);
      var spTag = '';
      if (si === 0) spTag = '<span class="sp">' + sums[0] + ' / ' + cls.beginnerSp + '</span>';
      else if (si < 4) {
        var need = cls.req[si - 1], total = 0; for (var k = 1; k <= si; k++) total += sums[k];
        spTag = '<span class="sp ' + (total >= need ? 'done' : (L >= [0, 30, 70, 120][si] ? 'need' : '')) + '" title="下一轉需要 1~' + si + ' 轉合計 ' + need + ' 點">' + (total >= need ? '✓ ' : '') + '累計 ' + total + ' / ' + need + '</span>';
      } else {
        var have4 = L >= 120 ? E.mainSp(cls, L) - cls.req[2] : 0;
        spTag = '<span class="sp ' + (L >= 120 ? (sums[4] >= have4 ? 'done' : 'need') : '') + '" title="4 轉可用點數">' + sums[4] + (L >= 120 ? ' / ' + have4 : '') + ' 點' + (L >= 120 && sums[4] < have4 ? '・剩 ' + (have4 - sums[4]) : '') + '</span>';
      }
      html += '<div class="win' + (locked ? ' locked' : '') + '"><div class="win-h">' + esc(stageLabel(st.name)) + (locked ? ' 🔒' : '') + spTag + '</div>';
      st.skills.forEach(function (s) {
        var lv = cur[s.id] || 0;
        if (opts.hideZero && !lv) return;
        var eff = lv ? s.lv[lv - 1] : s.desc, cst = lv ? E.cost(s.lv[lv - 1]) : null;
        html += '<div class="sk' + (lv ? '' : ' zero') + '" data-id="' + s.id + '"><img class="ic" src="' + s.img + '" alt="">' +
          '<div class="nm"><b>' + esc(s.name) + costTag(cst) + '</b><small title="' + esc(eff) + '">' + esc(eff) + '</small>' +
          (opts.editable ? '<span class="why"></span>' : '') + '</div>' +
          '<div class="lv' + (lv === s.max ? ' max' : '') + '">' + lv + '<span> / ' + s.max + '</span></div>' +
          (opts.editable ? '<div class="btns"><button class="dn" aria-label="減一級">−</button><button class="up" aria-label="加一級">+</button><button class="mx">滿</button></div>' : '') +
          '</div>';
      });
      html += '</div>';
    });
    return html;
  }
  function costTag(c) {
    if (!c) return '';
    return (c.mp ? '<span class="cost">MP ' + c.mp + '</span>' : '') + (c.hp ? '<span class="cost hp">HP ' + c.hp + '</span>' : '');
  }
  function potion(n) {
    var h = '<span class="potion" title="耗水程度 ' + n + ' / 5">耗水 '; for (var i = 1; i <= 5; i++) h += '<i class="' + (i <= n ? 'f' : '') + '"></i>'; return h + '</span>';
  }

  function lvPicker(L, id, max) {
    max = max || 200;
    var miles = MILES.filter(function (m) { return m < max; }).concat([max]);
    return '<div class="lvbar"><span class="lvnum">Lv <input type="number" min="1" max="' + max + '" value="' + L + '" id="' + id + 'Num" inputmode="numeric"></span>' +
      '<input type="range" min="1" max="' + max + '" value="' + L + '" id="' + id + 'Rng" aria-label="角色等級">' +
      '<div class="mile">' + miles.map(function (m) { return '<button data-lv="' + m + '" class="' + (m === L ? 'on' : '') + '">' + m + '</button>'; }).join('') + '</div></div>';
  }
  function wirePicker(id, onChange, max) {
    var num = $('#' + id + 'Num'), rng = $('#' + id + 'Rng');
    function set(v, commit) { v = Math.max(1, Math.min(max || 200, Math.round(+v || 1))); num.value = v; rng.value = v; onChange(v, commit); }
    rng.oninput = function () { set(rng.value, false); };
    rng.onchange = function () { set(rng.value, true); };
    num.onchange = function () { set(num.value, true); };
    app.querySelectorAll('.lvbar .mile button').forEach(function (b) { b.onclick = function () { set(b.dataset.lv, true); }; });
  }

  // ----- build tab -----
  function renderBuild(x) {
    var b = window.BUILDS[x.c.key][x.ver][x.tab], sim = E.simulate(x.cls, b.steps, swapFor(x.c, x.cls));
    var M = Math.max(10, Math.min(200, +b.maxLv || 200));
    var L = Math.max(1, Math.min(M, +x.q.lv || Math.min(120, M)));
    x.build = b; x.M = M; x.sim = sim; x.L = L;
    var body = $('#tabBody');
    var err = sim.errors.length ? '<p class="notice rose">⚠ 這套加點有規則問題：' + sim.errors.map(esc).join('；') + '</p>' : '';
    body.innerHTML = err +
      '<section class="card summary"><h2>' + (x.tab === 'burn' ? '🔥' : '💰') + ' ' + esc(b.title) + ' ' + potion(b.potion) + (M < 200 ? ' <span class="chip ref">📌 參照 Lv' + M + (unspentAt(x.cls, sim, M) ? '・還有 ' + unspentAt(x.cls, sim, M) + ' 點未分配' : '') + '</span>' : '') +
      (window.Admin && window.Admin.on() ? '<button class="btn edit-btn" id="editBuild">✏️ 編輯這套</button>' : '') + '</h2><p>' + esc(b.summary) + '</p>' +
      '<div class="pc"><div class="pro"><b>優點</b><ul>' + b.pros.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="con"><b>缺點</b><ul>' + b.cons.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div></section>' +
      '<div class="cols"><section class="card"><h2>📋 技能視窗 <span class="muted">拉到你的等級看該點到哪</span></h2>' + lvPicker(L, 'bv', M) + '<div id="bvWin"></div>' +
      '<button class="btn" id="toSim">🎮 用這套在模擬器微調</button></section>' +
      '<section class="card"><h2>🧭 加點順序 <span class="muted">由上往下點</span></h2><ol class="steps" id="stepList"></ol></section></div>';
    function paint(L2) {
      x.L = L2;
      $('#bvWin').innerHTML = skillWindow(x.cls, E.levelsAt(sim.log, L2), L2, { hideZero: false });
      app.querySelectorAll('.lvbar .mile button').forEach(function (bt) { bt.classList.toggle('on', +bt.dataset.lv === L2); });
      app.querySelectorAll('#stepList li[data-s]').forEach(function (li) {
        var s = sim.steps[+li.dataset.s];
        li.classList.toggle('past', s.lvEnd !== undefined && s.lvEnd <= L2 && !(s.lvStart <= L2 && s.lvEnd === L2));
        li.classList.toggle('now', s.lvStart !== undefined && s.lvStart <= L2 && (s.lvEnd === undefined || s.lvEnd >= L2));
      });
      if (lang === 'cn' && converter) conv($('#bvWin'));
    }
    $('#stepList').innerHTML = stepsHtml(x, sim, b);
    paint(L);
    wirePicker('bv', function (v, commit) {
      paint(v);
      if (commit) history.replaceState(null, '', '#/' + x.c.key + '/' + x.ver + '/' + x.tab + '?lv=' + v);
    }, M);
    if ($('#editBuild')) $('#editBuild').onclick = function () { window.Admin.edit(x, body); };
    $('#toSim').onclick = function () {
      var cur = E.levelsAt(sim.log, x.L);
      saveSim(x, { L: x.L, cur: cur });
      go(x.c.key, x.ver, 'sim', {});
    };
  }
  // 參照等級 M 時還沒分配的點數（新手 + 1~4 轉）
  function unspentAt(cls, sim, M) {
    var b = E.budget(cls, E.levelsAt(sim.log, M), M);
    return Math.max(0, b.main - b.usedMain) + Math.max(0, b.beg - b.usedBeg);
  }
  function stepsHtml(x, sim, b) {
    var map = E.index(x.cls), h = '', lastStage = -1;
    sim.steps.forEach(function (st, i) {
      var m = map[st.id]; if (!m) return;
      if (m.stage !== lastStage) {
        lastStage = m.stage;
        var note = b.notes && b.notes[m.stage];
        h += '<li class="stage">' + esc(stageLabel(x.cls.stages[m.stage].name)) + (note ? '<small>💡 ' + esc(note) + '</small>' : '') + '</li>';
      }
      var s = m.skill, c = E.cost(s.lv[st.to - 1]);
      var M = x.M || 200;
      var range = (st.lvStart === undefined || st.lvStart > M) ? 'Lv' + M + ' 後' : (st.lvEnd === undefined || st.lvEnd > M ? 'Lv' + st.lvStart + ' ~ ' + M + '+' : (st.lvStart === st.lvEnd ? 'Lv' + st.lvStart : 'Lv' + st.lvStart + ' ~ ' + st.lvEnd));
      h += '<li data-s="' + i + '"><span class="no">' + (i + 1) + '</span><img class="ic" src="' + s.img + '" alt="" loading="lazy"><span>' + esc(s.name) +
        ' <span class="to">' + (st.from ? st.from + '→' : '') + st.to + '</span>' + costTag(c) + '</span><span class="lvr">' + range + '</span></li>';
    });
    return h;
  }

  // ----- simulator tab -----
  function simKey(x) { return 'askills.sim.' + x.c.key + '.' + x.ver; }
  function saveSim(x, s) { save(simKey(x), JSON.stringify(s)); }
  function allSkills(cls) { var a = []; cls.stages.forEach(function (st) { st.skills.forEach(function (s) { a.push(s); }); }); return a; }
  function encodeSim(cls, s) { return s.L + '.' + allSkills(cls).map(function (k) { return (s.cur[k.id] || 0).toString(36); }).join(''); }
  function decodeSim(cls, str) {
    var p = String(str).split('.'), L = +p[0], d = p[1] || '', cur = {};
    allSkills(cls).forEach(function (k, i) { var v = parseInt(d[i] || '0', 36) || 0; if (v) cur[k.id] = Math.min(v, k.max); });
    return { L: L || 120, cur: cur };
  }
  var WHY = { max: '已滿', lv: '等級不夠', pre: '前置技能不夠', gate: '前一轉點數還沒用完', sp: '沒有剩餘點數', dep: '有技能需要它當前置', gate2: '', zero: '' };

  function renderSim(x) {
    var s = null;
    if (x.q.s) s = decodeSim(x.cls, x.q.s);
    if (!s) { try { s = JSON.parse(load(simKey(x)) || 'null'); } catch (e) { s = null; } }
    if (!s || !s.cur) s = { L: 120, cur: {} };
    var swap = swapFor(x.c, x.cls);
    x.simState = s;
    var body = $('#tabBody');
    body.innerHTML = '<section class="card"><h2>🎮 自己配點 <span class="muted">規則與遊戲相同：30 / 70 / 120 轉職前要把前面的點數用完</span></h2>' +
      lvPicker(s.L, 'sm') +
      '<div class="sim-top"><span class="spleft" id="spLeft"></span><span class="grow"></span>' +
      '<button class="btn" data-apply="burn">套用 🔥 燒錢</button><button class="btn" data-apply="save">套用 💰 省錢</button>' +
      '<button class="btn" id="simReset">清空</button><button class="btn primary" id="simShare">🔗 分享連結</button></div>' +
      '<div id="smWin"></div></section>' +
      '<div class="simbar" id="simBar"><button class="lvb" data-d="-1" aria-label="降一級">−</button><span class="sb-lv">Lv <b id="sbLv"></b></span><button class="lvb" data-d="1" aria-label="升一級">＋</button>' +
      '<span class="sb-sp" id="sbSp"></span><button class="lvb wide" data-d="10">+10 級</button></div>';

    function fixToLevel() {
      // 等級降低時，把超出的點數從後面的轉職開始退回
      var guard = 0;
      while (guard++ < 2000) {
        var b = E.budget(x.cls, s.cur, s.L), changed = false;
        var over = b.usedMain > b.main, overB = b.usedBeg > b.beg;
        var list = allSkills(x.cls).slice().reverse();
        for (var i = 0; i < list.length; i++) {
          var k = list[i], m = E.index(x.cls)[k.id], v = s.cur[k.id] || 0;
          if (!v) continue;
          var tooHigh = s.L < k.req, needCut = tooHigh || (m.stage === 0 ? overB : over && m.stage > 0);
          if (needCut) { s.cur[k.id] = v - 1; if (!s.cur[k.id]) delete s.cur[k.id]; changed = true; break; }
        }
        if (!changed) break;
      }
      // 清掉失效的（前置或門檻不再成立）
      var dirty = true; guard = 0;
      while (dirty && guard++ < 50) {
        dirty = false;
        var sums = E.stageSums(x.cls, s.cur);
        allSkills(x.cls).forEach(function (k) {
          var m = E.index(x.cls)[k.id];
          if (!s.cur[k.id]) return;
          var bad = E.gateNeed(x.cls, m.stage, sums);
          for (var pid in (k.pre || {})) if ((s.cur[pid] || 0) < k.pre[pid]) bad = true;
          if (bad) { delete s.cur[k.id]; dirty = true; }
        });
      }
    }
    function paint() {
      var b = E.budget(x.cls, s.cur, s.L);
      var left = b.main - b.usedMain, lb = b.beg - b.usedBeg;
      $('#sbLv').textContent = s.L;
      $('#sbSp').innerHTML = '剩餘 <b>' + left + '</b> 點' + (lb > 0 ? '・新手 <b>' + lb + '</b>' : '') + (left === 0 && s.L < 200 ? ' <span class="muted small">升級拿更多點 →</span>' : '');
      $('#spLeft').innerHTML = '剩餘 <b>' + (b.main - b.usedMain) + '</b> 點' + (b.beg - b.usedBeg > 0 ? '　新手 <b>' + (b.beg - b.usedBeg) + '</b>' : '') + '　<span class="muted small">已用 ' + b.usedMain + ' / ' + b.main + '</span>';
      $('#smWin').innerHTML = skillWindow(x.cls, s.cur, s.L, { editable: true });
      app.querySelectorAll('#smWin .sk').forEach(function (row) {
        var id = row.dataset.id, wa = E.whyNotAdd(x.cls, s.cur, s.L, id), wr = E.whyNotRemove(x.cls, s.cur, id);
        var up = $('.up', row), dn = $('.dn', row), mx = $('.mx', row);
        up.disabled = !!wa; dn.disabled = !!wr; mx.disabled = !!wa;
        if (wa && wa !== 'max' && wa !== 'sp') { $('.why', row).textContent = WHY[wa]; }
        up.title = wa ? WHY[wa] : '加一級'; dn.title = wr ? (WHY[wr] || '') : '減一級';
        up.onclick = function () { if (!E.whyNotAdd(x.cls, s.cur, s.L, id)) { s.cur[id] = (s.cur[id] || 0) + 1; commit(); } };
        dn.onclick = function () { if (!E.whyNotRemove(x.cls, s.cur, id)) { s.cur[id]--; if (!s.cur[id]) delete s.cur[id]; commit(); } };
        mx.onclick = function () { var n = 0; while (!E.whyNotAdd(x.cls, s.cur, s.L, id) && n++ < 40) s.cur[id] = (s.cur[id] || 0) + 1; commit(); };
      });
      app.querySelectorAll('.lvbar .mile button').forEach(function (bt) { bt.classList.toggle('on', +bt.dataset.lv === s.L); });
      if (lang === 'cn' && converter) { conv($('#smWin')); conv($('#spLeft')); }
    }
    function commit() { saveSim(x, s); paint(); }
    wirePicker('sm', function (v, done) { s.L = v; fixToLevel(); if (done) saveSim(x, s); paint(); });
    app.querySelectorAll('[data-apply]').forEach(function (bt) {
      bt.onclick = function () {
        var r = E.simulate(x.cls, window.BUILDS[x.c.key][x.ver][bt.dataset.apply].steps, swap);
        s.cur = E.levelsAt(r.log, s.L); commit(); toast('已套用到 Lv' + s.L);
      };
    });
    app.querySelectorAll('#simBar .lvb').forEach(function (bt) {
      bt.onclick = function () { var n = $('#smNum'); n.value = Math.max(1, Math.min(200, s.L + +bt.dataset.d)); n.dispatchEvent(new Event('change')); };
    });
    $('#simReset').onclick = function () { s.cur = {}; commit(); };
    $('#simShare').onclick = function () {
      var url = location.href.split('#')[0] + '#/' + x.c.key + '/' + x.ver + '/sim?s=' + encodeSim(x.cls, s);
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { toast('連結已複製，貼給朋友就能看到你的配點'); }, function () { prompt('複製這個連結：', url); });
    };
    fixToLevel(); paint();
  }

  // ---------- AI review ----------
  var KEY = 'askills.geminiKey', MODEL = 'askills.geminiModel';
  function getKey() { return load(KEY) || ''; }
  var dlg = $('#keyDlg');
  function openKey() {
    $('#keyInput').value = '';
    $('#keyState').textContent = getKey() ? '目前已設定金鑰（末四碼 ' + getKey().slice(-4) + '）。' : '目前沒有設定金鑰。';
    if (lang === 'cn' && converter) conv(dlg);
    dlg.showModal();
  }
  $('#aiKeyBtn').onclick = openKey;
  $('#keySave').onclick = function () {
    var v = $('#keyInput').value.trim();
    if (!v) { dlg.close(); return; }
    save(KEY, v); save(MODEL, null); dlg.close(); toast('金鑰已儲存在這台裝置'); render();
  };
  $('#keyClear').onclick = function () { save(KEY, null); save(MODEL, null); dlg.close(); toast('已清除金鑰'); render(); };

  function describe(x) {
    var map = E.index(x.cls), lines = [];
    function dump(cur, label) {
      var parts = [];
      x.cls.stages.forEach(function (st, si) {
        var a = st.skills.filter(function (s) { return cur[s.id]; }).map(function (s) { return s.name + ' ' + cur[s.id] + '/' + s.max; });
        if (a.length) parts.push(stageLabel(st.name) + '：' + a.join('、'));
      });
      lines.push(label + '\n' + parts.join('\n'));
    }
    if (x.tab === 'sim') dump(x.simState.cur, '玩家自己配的點（目前 Lv' + x.simState.L + '）：');
    else {
      lines.push('推薦路線：「' + x.build.title + '」— ' + x.build.summary);
      [30, 70, 120, 200].forEach(function (L) { dump(E.levelsAt(x.sim.log, L), 'Lv' + L + ' 時：'); });
    }
    void map;
    return lines.join('\n\n');
  }
  function renderAI(x) {
    var card = $('#aiCard'), has = !!getKey();
    card.innerHTML = '<h2>✨ AI 點評 <span class="muted">Gemini，用你自己的金鑰</span></h2>' +
      '<textarea id="aiAsk" placeholder="想問什麼？例如：我只有 300 萬楓幣、主要組隊練功，這樣點合適嗎？（可留空）"></textarea>' +
      '<div class="ai-row">' + (has ? '<button class="primary" id="aiGo">請 AI 點評這套加點</button>' : '<button class="primary" id="aiSet">先設定 Gemini 金鑰</button>') +
      '<span class="muted small" id="aiState"></span></div><div class="ai-out" id="aiOut"></div>';
    if (!has) { $('#aiSet').onclick = openKey; return; }
    $('#aiGo').onclick = function () {
      var btn = this; btn.disabled = true; $('#aiState').textContent = 'AI 思考中…（約 10~30 秒）'; $('#aiOut').innerHTML = '';
      var V = x.V, prompt =
        '你是 Artale（楓之谷懷舊版，台服）的資深玩家，幫新手看技能加點。職業：' + x.c.name + '（' + V.name + '：' + V.sub + '）' +
        (x.c.weapon ? '，武器：' + x.c.weapon[weaponB(x.c) ? 1 : 0].replace(/^\S+\s/, '') : '') + '。\n' +
        '遊戲規則：Lv30、70、120 轉職前，前一轉的技能點必須全部用完；技能有前置需求。技能等級越高通常越耗 MP（藥水）。\n\n' +
        describe(x) + '\n\n' + ($('#aiAsk').value.trim() ? '玩家的問題：' + $('#aiAsk').value.trim() + '\n\n' : '') +
        '請用' + (lang === 'cn' ? '簡體中文' : '台灣繁體中文（台灣用語）') + '回答，300 字內，口語好懂：\n' +
        '1. 一句話總評（給 1~10 分）\n2. 這樣點的優點 2 點\n3. 要注意 / 可以調整的地方 2~3 點（具體說哪個技能、改幾級，且要符合上面的規則）\n4. 如果想更省藥水 / 更快練，各給一個建議\n只用 Markdown 的 **粗體** 和 - 清單，不要表格。';
      askGemini(prompt).then(function (txt) {
        $('#aiOut').innerHTML = md(txt); $('#aiState').textContent = '';
        if (lang === 'cn' && converter) conv($('#aiOut'));
      }, function (e) {
        $('#aiState').textContent = ''; $('#aiOut').innerHTML = '<p>😵 ' + esc(aiErr(e)) + '</p>';
        if (lang === 'cn' && converter) conv($('#aiOut'));
      }).then(function () { btn.disabled = false; });
    };
  }
  function aiErr(e) {
    if (e && e.status === 400) return '金鑰格式不對或無效，請重新設定。';
    if (e && e.status === 403) return '這把金鑰沒有權限使用 Gemini（可能專案沒開 Generative Language API）。';
    if (e && e.status === 429) return '免費額度用完了，等一下（或明天）再試。';
    return '連線失敗，請稍後再試。' + (e && e.message ? '（' + e.message + '）' : '');
  }
  // 依金鑰實際可用的模型挑：flash 系列，版本新的優先，lite 備用
  function pickModels(key) {
    var cached = load(MODEL);
    return fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers: { 'x-goog-api-key': key } })
      .then(function (r) { if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; } return r.json(); })
      .then(function (j) {
        var names = (j.models || []).filter(function (m) {
          return (m.supportedGenerationMethods || []).indexOf('generateContent') >= 0 && /flash/.test(m.name) &&
            !/latest|tts|image|live|audio|exp|preview|thinking|embedding/.test(m.name);
        }).map(function (m) { return m.name.replace('models/', ''); });
        function ver(n) { var v = n.match(/gemini-(\d+(?:\.\d+)?)/); return v ? +v[1] : 0; }
        names.sort(function (a, b) { return (/lite/.test(a) - /lite/.test(b)) || (ver(b) - ver(a)); });
        if (cached && names.indexOf(cached) >= 0) names.unshift(cached);
        if (!names.length) names = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
        return names.filter(function (n, i) { return names.indexOf(n) === i; }).slice(0, 5);
      });
  }
  function askGemini(prompt) {
    var key = getKey();
    return pickModels(key).then(function (models) {
      function tryAt(i) {
        var ctl = new AbortController(), t = setTimeout(function () { ctl.abort(); }, 45000);
        return fetch('https://generativelanguage.googleapis.com/v1beta/models/' + models[i] + ':generateContent', {
          method: 'POST', signal: ctl.signal,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 2048 } })
        }).then(function (r) {
          clearTimeout(t);
          if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
          return r.json();
        }).then(function (j) {
          var txt = (((j.candidates || [])[0] || {}).content || {}).parts;
          txt = (txt || []).map(function (p) { return p.text || ''; }).join('').trim();
          if (!txt) throw new Error('空白回覆');
          save(MODEL, models[i]); return txt;
        }).catch(function (e) {
          clearTimeout(t);
          if (i + 1 < models.length && e.status !== 400 && e.status !== 403) return tryAt(i + 1);
          throw e;
        });
      }
      return tryAt(0);
    });
  }
  function md(t) {
    var out = [], inList = false;
    esc(t).split(/\n/).forEach(function (line) {
      var l = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
      var li = l.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)/);
      if (li) { if (!inList) { out.push('<ul>'); inList = true; } out.push('<li>' + li[1] + '</li>'); return; }
      if (inList) { out.push('</ul>'); inList = false; }
      var h = l.match(/^#+\s*(.*)/);
      if (h) out.push('<h4>' + h[1] + '</h4>'); else if (l.trim()) out.push('<p>' + l + '</p>');
    });
    if (inList) out.push('</ul>');
    return out.join('');
  }

  // ---------- comments (giscus) ----------
  function renderGiscus(term) {
    var box = $('#giscusBox'), g = window.GISCUS || {};
    if (!g.repoId || !g.categoryId) { box.innerHTML = '<div class="giscus-wait">留言區設定中，很快開放 🙏</div>'; return; }
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    var attrs = {
      'data-repo': g.repo, 'data-repo-id': g.repoId, 'data-category': g.category, 'data-category-id': g.categoryId,
      'data-mapping': 'specific', 'data-term': term, 'data-strict': '1', 'data-reactions-enabled': '1', 'data-emit-metadata': '0',
      'data-input-position': 'top', 'data-theme': 'preferred_color_scheme', 'data-lang': lang === 'cn' ? 'zh-CN' : 'zh-TW', 'data-loading': 'lazy',
      crossorigin: 'anonymous'
    };
    for (var a in attrs) s.setAttribute(a, attrs[a]);
    s.async = true;
    box.innerHTML = '<p class="muted small">用 GitHub 帳號登入就能留言（看留言不用登入）。分享你的實戰加點、裝備心得都歡迎！</p>';
    box.appendChild(s);
  }

  window.App = { render: render, toast: toast, ensureSkills: ensureSkills, conv: function (el) { if (lang === 'cn' && converter) conv(el); } };
  $('#adminBtn').onclick = function () { window.Admin.openLogin(); };
  if (window.Admin && window.Admin.on()) window.Admin.loadFresh().then(render); else render();
})();
