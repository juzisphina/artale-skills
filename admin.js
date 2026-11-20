// 管理員編輯：只有持有 juzisphina 帳號 GitHub 金鑰（token）的人能把修改存回網站。
// 金鑰只存在這台裝置的瀏覽器；存檔時直接呼叫 GitHub API 改 data/builds.js。
(function () {
  'use strict';
  var A = window.ADMIN || {}, TOKEN = 'askills.ghToken', API = 'https://api.github.com/repos/' + A.repo + '/contents/' + A.path;
  var E = window.Engine;
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function token() { return load(TOKEN) || ''; }
  function gh(url, opt) {
    opt = opt || {};
    opt.headers = Object.assign({ Authorization: 'Bearer ' + token(), Accept: 'application/vnd.github+json' }, opt.headers || {});
    opt.cache = 'no-store';
    return fetch(url, opt).then(function (r) {
      if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { var e = new Error(j.message || ('HTTP ' + r.status)); e.status = r.status; throw e; });
      return r.json();
    });
  }
  function b64decode(s) { return decodeURIComponent(escape(atob(s.replace(/\n/g, '')))); }
  function b64encode(s) { return btoa(unescape(encodeURIComponent(s))); }
  function parseBuilds(src) {
    var i = src.indexOf('window.BUILDS = '), j = src.lastIndexOf(';');
    return JSON.parse(src.slice(i + 'window.BUILDS = '.length, j));
  }
  function header() { return '// 推薦加點（可在網站「管理員編輯」修改，存檔會覆蓋這個檔案）\n// steps = 依序「技能id:目標等級」。檢查：npm run check\n'; }

  var Admin = {
    on: function () { return !!token(); },
    // 管理員看到的永遠是 GitHub 上最新版（GitHub Pages 更新要等約 1 分鐘）
    loadFresh: function () {
      return gh(API + '?ref=' + A.branch).then(function (j) { window.BUILDS = parseBuilds(b64decode(j.content)); }, function () {});
    },
    openLogin: function () {
      var d = document.getElementById('adminDlg');
      document.getElementById('adminState').textContent = token() ? '目前已登入管理員。' : '目前不是管理員。';
      document.getElementById('adminInput').value = '';
      if (window.App) window.App.conv(d);
      d.showModal();
    },
    edit: edit
  };

  function wireLogin() {
    var d = document.getElementById('adminDlg'), st = document.getElementById('adminState');
    document.getElementById('adminSave').onclick = function () {
      var v = document.getElementById('adminInput').value.trim();
      if (!v) return;
      st.textContent = '驗證中…';
      var old = token(); save(TOKEN, v);
      Promise.all([gh('https://api.github.com/user'), gh('https://api.github.com/repos/' + A.repo)]).then(function (res) {
        var login = res[0].login, push = res[1].permissions && res[1].permissions.push;
        if (login !== A.owner || !push) throw new Error('這把金鑰屬於 ' + login + '，沒有這個網站的編輯權限');
        d.close(); window.App.toast('管理員登入成功 ✓'); Admin.loadFresh().then(window.App.render);
      }).catch(function (e) {
        save(TOKEN, old || null);
        st.textContent = e.status === 401 ? '金鑰無效或已過期。' : ('不能用：' + e.message);
      });
    };
    document.getElementById('adminOut').onclick = function () { save(TOKEN, null); d.close(); window.App.toast('已登出管理員'); window.App.render(); };
  }

  // ---------- 編輯器（依轉職階段分頁編輯）----------
  function edit(x, body) {
    var b = JSON.parse(JSON.stringify(window.BUILDS[x.c.key][x.ver][x.tab]));
    var cls = x.cls, map = E.index(cls), notes = b.notes || {};
    var M = Math.max(10, Math.min(200, +b.maxLv || 200)), PER;
    // 依參照等級 M 算每一段有幾點：已經走完的轉職階段要剛好點完，M 所在的那一段點不完也可以
    function computePER() {
      var total = E.mainSp(cls, M), startCum = [0, 0, cls.req[0], cls.req[1], cls.req[2]], endCum = [0, cls.req[0], cls.req[1], cls.req[2], Infinity];
      var lvA = [1, cls.start, 30, 70, 120], lvB = [10, 30, 70, 120, 200];
      PER = ['新手', '1轉期', '2轉期', '3轉期', '4轉期'].map(function (name, k) {
        var budget, full;
        if (k === 0) { budget = M >= 10 ? cls.beginnerSp : 0; full = M >= 10; }
        else { budget = Math.max(0, Math.min(total, endCum[k]) - startCum[k]); full = total >= endCum[k]; }
        var reach = k === 0 || M >= lvA[k];
        return { name: name, budget: budget, full: full, reach: reach, range: reach ? 'Lv' + lvA[k] + '~' + Math.min(lvB[k], M) : 'Lv' + lvA[k] + ' 才開放' };
      });
    }
    computePER();
    // 把原本的步驟切成 5 段
    var seg = [[], [], [], [], []];
    (function () {
      // 依點數切段：1 轉期 = 前 req[0] 點，2 轉期 = 到 req[1] 點… （和遊戲轉職門檻一致）
      var cum = 0, p = 1, cur = {}, gate = [0, cls.req[0], cls.req[1], cls.req[2]];
      b.steps.trim().split(/\s+/).forEach(function (t) {
        var q = t.split(':'), id = q[0], to = +q[1];
        if (!map[id]) return;
        if (map[id].stage === 0) { seg[0].push({ id: id, to: to }); cur[id] = to; return; }
        while (p < 4 && cum >= gate[p]) p++;
        seg[p].push({ id: id, to: to });
        cum += Math.max(0, to - (cur[id] || 0)); cur[id] = Math.max(cur[id] || 0, to);
      });
    })();
    var P = 1;
    function stepsStr() { var a = []; seg.forEach(function (s) { s.forEach(function (st) { a.push(st.id + ':' + st.to); }); }); return a.join(' '); }
    // 走到第 k 段結束時的等級 + 每段花了幾點
    function walk() {
      var cur = {}, spent = [0, 0, 0, 0, 0], before = [];
      seg.forEach(function (s, k) {
        before[k] = Object.assign({}, cur);
        s.forEach(function (st) { var h = cur[st.id] || 0; if (st.to > h) { spent[k] += st.to - h; cur[st.id] = st.to; } st.from = h; });
      });
      return { cur: cur, spent: spent, before: before };
    }
    function levelsAfter(k) { var cur = {}; for (var i = 0; i <= k; i++) seg[i].forEach(function (st) { if (st.to > (cur[st.id] || 0)) cur[st.id] = st.to; }); return cur; }
    function status(k, spent) {
      var bud = PER[k].budget, s = spent[k];
      if (!PER[k].reach) return s ? { ok: false, over: true, txt: 'Lv' + M + ' 還點不到這一段，多了 ' + s + ' 點' } : { ok: true, txt: '參照等級還沒到' };
      if (s > bud) {
        if (M === 200 && k === 4) return { ok: true, txt: '已安排 ' + s + ' 點，最後 ' + (s - bud) + ' 點要 Lv200 之後才點得到（顯示為「200 級後」）' };
        return { ok: false, over: true, txt: '超出 ' + (s - bud) + ' 點（Lv' + M + ' 只有 ' + bud + ' 點）' };
      }
      if (s === bud) return { ok: true, txt: '剛好 ' + s + ' / ' + bud };
      if (!PER[k].full) return { ok: true, txt: '已安排 ' + s + ' / ' + bud + '（參照等級的最後一段，點不完也可以）' };
      return { ok: false, txt: '還差 ' + (bud - s) + ' 點（' + s + ' / ' + bud + '）才能轉職' };
    }

    body.innerHTML = '<section class="card edit"><h2>✏️ 編輯：' + esc(x.c.name) + '・' + esc(x.V.name) + '・' + esc(b.title) + '</h2>' +
      '<p class="notice">一個階段一個階段點：每個轉職階段的點數要剛好用完，才能進下一轉。改完按「儲存到網站」，約 1 分鐘後所有人都會看到。' + (x.c.weapon ? '（請用「' + esc(x.c.weapon[0]) + '」的技能編輯，切換武器會自動換算）' : '') + '</p>' +
      '<details class="ed-text"><summary>📝 文字說明（標題、簡介、優缺點）</summary><div class="ed-grid">' +
      '<label>標題<input id="edTitle" value="' + esc(b.title) + '"></label>' +
      '<label>耗水程度<select id="edPotion">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === b.potion ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<label class="full">簡介<textarea id="edSummary" rows="2">' + esc(b.summary) + '</textarea></label>' +
      '<label>優點（一行一個）<textarea id="edPros" rows="3">' + esc(b.pros.join('\n')) + '</textarea></label>' +
      '<label>缺點（一行一個）<textarea id="edCons" rows="3">' + esc(b.cons.join('\n')) + '</textarea></label>' +
      '</div></details>' +
      '<div class="ed-lvset"><label>📌 參照等級 Lv <input type="number" id="edMax" min="10" max="200" value="' + M + '"></label>' +
      '<span class="muted small">這套加點是給幾等的角色看？點數只算到這個等級；最後一段點不完也可以存。</span>' +
      '<span class="mile">' + [70, 100, 121, 141, 160, 200].map(function (n) { return '<button type="button" data-m="' + n + '">' + n + '</button>'; }).join('') + '</span></div>' +
      '<div class="ed-tabs" id="edTabs"></div><div id="edPeriod"></div>' +
      '<div id="edCheck" class="ed-check"></div>' +
      '<div class="ed-bar"><button class="btn" id="edCancel">取消</button><span class="grow"></span><button class="primary" id="edSave">💾 儲存到網站</button></div></section>';
    var noteVals = {}; for (var nk in notes) noteVals[nk] = notes[nk];
    var tabsEl = body.querySelector('#edTabs'), perEl = body.querySelector('#edPeriod'), check = body.querySelector('#edCheck'), saveBtn = body.querySelector('#edSave');

    function paint() {
      computePER();
      var w = walk(), v = E.validate(cls, stepsStr(), null, M), sim = v.sim;
      body.querySelectorAll('.ed-lvset [data-m]').forEach(function (bt) { bt.classList.toggle('on', +bt.dataset.m === M); });
      // 對應每一步在 sim 裡的位置（算 Lv 範圍）
      var idx = 0, simOf = [];
      seg.forEach(function (s, k) { simOf[k] = s.map(function () { return sim.steps[idx++] || {}; }); });
      tabsEl.innerHTML = PER.map(function (p, k) {
        var st = status(k, w.spent);
        return '<button class="ed-tab' + (k === P ? ' on' : '') + (st.ok ? ' ok' : ' bad') + (p.reach ? '' : ' off') + '" data-p="' + k + '"><b>' + (st.ok ? '✓ ' : '⚠ ') + p.name + '</b><span>' + p.range + '</span></button>';
      }).join('');
      tabsEl.querySelectorAll('.ed-tab').forEach(function (t) { t.onclick = function () { saveNote(); P = +t.dataset.p; paint(); }; });

      var st = status(P, w.spent), stageMax = P, after = levelsAfter(P), before = w.before[P];
      var html = '<div class="ed-budget ' + (st.ok ? 'ok' : 'bad') + '"><b>' + PER[P].name + '（' + PER[P].range + '）</b> 這段有 <b>' + PER[P].budget + '</b> 點：' + st.txt +
        (w.spent.some(function (x, k) { return status(k, w.spent).over; }) ? ' <button type="button" class="btn" id="edTrim">✂ 刪掉 Lv' + M + ' 之後才點得到的步驟</button>' : '') + '</div>';
      // 技能視窗：只顯示這個階段能點的技能
      html += '<div class="ed-cols"><div>';
      cls.stages.forEach(function (stg, si) {
        if (P === 0 ? si !== 0 : (si === 0 || si > stageMax)) return;
        html += '<div class="win"><div class="win-h">' + esc(stg.name) + '</div>';
        stg.skills.forEach(function (s) {
          var lv = after[s.id] || 0, b0 = before[s.id] || 0, cst = lv ? E.cost(s.lv[lv - 1]) : null;
          var canUp = lv < s.max && preOk(s, after) && w.spent[P] < PER[P].budget;
          var canDn = seg[P].some(function (q) { return q.id === s.id; });
          html += '<div class="sk' + (lv ? '' : ' zero') + '" data-id="' + s.id + '"><img class="ic" src="' + s.img + '" alt="">' +
            '<div class="nm"><b>' + esc(s.name) + costTag(cst) + '</b><small>' + esc(lv ? s.lv[lv - 1] : s.desc) + '</small></div>' +
            '<div class="lv' + (lv === s.max ? ' max' : '') + '">' + lv + '<span> / ' + s.max + '</span>' + (lv > b0 ? '<em>+' + (lv - b0) + '</em>' : '') + '</div>' +
            '<div class="btns"><button class="dn"' + (canDn ? '' : ' disabled') + ' aria-label="減一級">−</button><button class="up"' + (canUp ? '' : ' disabled') + ' aria-label="加一級">+</button></div></div>';
        });
        html += '</div>';
      });
      html += '</div><div><h3 class="ed-h">這段的加點順序 <span class="muted small">由上往下點</span></h3><ol class="ed-steps">' +
        (seg[P].length ? '' : '<li class="muted small">還沒有步驟：用左邊的 ＋ 加點</li>') +
        seg[P].map(function (q, i) {
          var s = map[q.id].skill, r = simOf[P][i] || {};
          var range = r.lvStart === undefined ? '—' : (r.lvEnd === undefined || r.lvStart === r.lvEnd ? 'Lv' + r.lvStart : 'Lv' + r.lvStart + '~' + r.lvEnd);
          var noop = q.to <= (q.from || 0);
          return '<li data-i="' + i + '"' + (noop ? ' class="noop"' : '') + '><img class="ic" src="' + s.img + '" alt=""><span class="ed-nm">' + esc(s.name) + ' <b>' + (noop ? q.to : (q.from ? q.from + '→' : '') + q.to) + '</b>' +
            (noop ? '<small>前面已經點到 ' + q.from + ' 級，這步沒有作用，可以刪掉</small>' : '') + '</span>' +
            '<span class="ed-lv">' + range + '</span><span class="ed-btns"><button class="mu" title="上移">↑</button><button class="md" title="下移">↓</button><button class="del" title="刪除">✕</button></span></li>';
        }).join('') + '</ol>' +
        (P > 0 ? '<label class="ed-note">💡 這段的小提示（顯示在加點順序裡）<input id="edNote" value="' + esc(noteVals[P] || '') + '"></label>' : '') +
        '</div></div>';
      perEl.innerHTML = html;
      var trimBtn = perEl.querySelector('#edTrim');
      if (trimBtn) trimBtn.onclick = function () { saveNote(); trim(); paint(); };

      perEl.querySelectorAll('.sk').forEach(function (row) {
        var id = row.dataset.id;
        row.querySelector('.up').onclick = function () {
          saveNote(); var s = seg[P], last = s[s.length - 1];
          if (last && last.id === id) last.to++; else s.push({ id: id, to: (levelsAfter(P)[id] || 0) + 1 });
          paint();
        };
        row.querySelector('.dn').onclick = function () {
          saveNote(); var s = seg[P];
          for (var i = s.length - 1; i >= 0; i--) if (s[i].id === id) { if (s[i].to - 1 > (s[i].from || 0)) s[i].to--; else s.splice(i, 1); break; }
          paint();
        };
      });
      perEl.querySelectorAll('.ed-steps li[data-i]').forEach(function (li) {
        var i = +li.dataset.i, s = seg[P];
        li.querySelector('.mu').onclick = function () { saveNote(); if (i > 0) { var t = s[i]; s[i] = s[i - 1]; s[i - 1] = t; paint(); } };
        li.querySelector('.md').onclick = function () { saveNote(); if (i < s.length - 1) { var t = s[i]; s[i] = s[i + 1]; s[i + 1] = t; paint(); } };
        li.querySelector('.del').onclick = function () { saveNote(); s.splice(i, 1); paint(); };
      });

      var periodBad = PER.map(function (p, k) { return status(k, w.spent).ok ? null : p.name + '：' + status(k, w.spent).txt; }).filter(Boolean);
      var errs = periodBad.concat(v.errors.filter(function () { return !periodBad.length; }));
      var used = E.stageSums(cls, E.levelsAt(sim.log, 200));
      check.innerHTML = errs.length
        ? '<p class="notice rose">⚠ 還不能儲存：<br>' + errs.map(esc).join('<br>') + '</p>'
        : '<p class="notice ok">✓ 符合遊戲規則。Lv200 時：1轉 ' + used[1] + '、2轉 ' + used[2] + '、3轉 ' + used[3] + '、4轉 ' + used[4] + ' 點</p>';
      saveBtn.disabled = errs.length > 0;
      if (window.App) window.App.conv(body);
    }
    function preOk(s, cur) { for (var pid in (s.pre || {})) if ((cur[pid] || 0) < s.pre[pid]) return false; return true; }
    function costTag(c) { return c ? (c.mp ? '<span class="cost">MP ' + c.mp + '</span>' : '') + (c.hp ? '<span class="cost hp">HP ' + c.hp + '</span>' : '') : ''; }
    // 每一段只留下參照等級點得到的部分
    function trim() {
      var cur = {};
      seg.forEach(function (s, k) {
        var left = PER[k].reach ? PER[k].budget : 0;
        if (M === 200 && k === 4) left = Infinity;
        for (var i = 0; i < s.length; i++) {
          var h = cur[s[i].id] || 0, inc = s[i].to - h;
          if (inc <= 0) continue;
          if (inc > left) s[i].to = h + left;
          if (s[i].to <= h) { s.splice(i, 1); i--; continue; }
          left -= s[i].to - h; cur[s[i].id] = s[i].to;
        }
      });
    }
    function saveNote() { var n = body.querySelector('#edNote'); if (n) noteVals[P] = n.value.trim(); }

    var maxIn = body.querySelector('#edMax');
    function setM(v) { saveNote(); M = Math.max(10, Math.min(200, Math.round(+v || 200))); maxIn.value = M; paint(); }
    maxIn.onchange = function () { setM(maxIn.value); };
    body.querySelectorAll('.ed-lvset [data-m]').forEach(function (bt) { bt.onclick = function () { setM(bt.dataset.m); }; });
    body.querySelector('#edCancel').onclick = function () { window.App.render(); };
    saveBtn.onclick = function () {
      saveNote();
      var nb = {
        title: body.querySelector('#edTitle').value.trim() || b.title,
        potion: +body.querySelector('#edPotion').value,
        summary: body.querySelector('#edSummary').value.trim(),
        pros: lines('#edPros'), cons: lines('#edCons'),
        steps: stepsStr(), notes: {}, maxLv: M < 200 ? M : undefined
      };
      for (var k in noteVals) if (noteVals[k]) nb.notes[k] = noteVals[k];
      saveBtn.disabled = true; saveBtn.textContent = '儲存中…';
      saveBuild(x.c.key, x.ver, x.tab, nb, x.c.name + ' ' + x.V.name + ' ' + nb.title).then(function () {
        window.App.toast('已儲存 ✓ 約 1 分鐘後網站更新'); window.App.render();
      }, function (e) {
        saveBtn.disabled = false; saveBtn.textContent = '💾 儲存到網站';
        check.insertAdjacentHTML('afterbegin', '<p class="notice rose">儲存失敗：' + esc(e.status === 401 ? '金鑰過期，請重新登入管理員' : e.message) + '</p>');
      });
    };
    function lines(sel) { return body.querySelector(sel).value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean); }
    paint();
    body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- 首頁代表技能（4 個圖示）----------
  function editFeatured(c) {
    window.App.ensureSkills(c.key).then(function () {
      var data = window.SKILLS_BY[c.key], seen = {}, all = [];
      ['new', 'old'].forEach(function (v) {
        if (!data[v]) return;
        data[v].stages.forEach(function (st, si) { if (si) st.skills.forEach(function (sk) { if (!seen[sk.id]) { seen[sk.id] = 1; all.push(sk); } }); });
      });
      var cur = ((window.BUILDS[c.key] || {}).featured || []).map(function (f) { return f.id; });
      var d = document.getElementById('featDlg');
      if (!d) { d = document.createElement('dialog'); d.id = 'featDlg'; document.body.appendChild(d); }
      function paint() {
        d.innerHTML = '<div class="dlg feat"><h3>🖼 ' + esc(c.name) + ' 首頁代表技能</h3><p class="muted small">點選 4 個技能（依點選順序顯示）。目前：' + cur.length + ' / 4</p>' +
          '<div class="feat-grid">' + all.map(function (sk) {
            var i = cur.indexOf(sk.id);
            return '<button type="button" class="feat-it' + (i >= 0 ? ' on' : '') + '" data-id="' + sk.id + '" title="' + esc(sk.name) + '"><img class="ic" src="' + sk.img + '" alt="">' +
              (i >= 0 ? '<b>' + (i + 1) + '</b>' : '') + '<span>' + esc(sk.name) + '</span></button>';
          }).join('') + '</div><p class="muted small" id="featMsg"></p>' +
          '<div class="dlg-row"><button type="button" class="ghost" id="featClear">清空</button><span class="grow"></span><button type="button" class="ghost" id="featCancel">取消</button>' +
          '<button type="button" class="primary" id="featSave"' + (cur.length === 4 ? '' : ' disabled') + '>儲存到網站</button></div></div>';
        d.querySelectorAll('.feat-it').forEach(function (b) {
          b.onclick = function () {
            var i = cur.indexOf(b.dataset.id);
            if (i >= 0) cur.splice(i, 1); else if (cur.length < 4) cur.push(b.dataset.id);
            paint();
          };
        });
        d.querySelector('#featClear').onclick = function () { cur = []; paint(); };
        d.querySelector('#featCancel').onclick = function () { d.close(); };
        d.querySelector('#featSave').onclick = function () {
          var btn = this; btn.disabled = true; btn.textContent = '儲存中…';
          var list = cur.map(function (id) { var sk = all.filter(function (x) { return x.id === id; })[0]; return { id: id, name: sk.name, img: sk.img }; });
          saveAll(function (B) { B[c.key].featured = list; }, c.name + ' 首頁代表技能').then(function () {
            d.close(); window.App.toast('已儲存 ✓ 約 1 分鐘後網站更新'); window.App.render();
          }, function (e) {
            btn.disabled = false; btn.textContent = '儲存到網站';
            d.querySelector('#featMsg').textContent = '儲存失敗：' + (e.status === 401 ? '金鑰過期，請重新登入管理員' : e.message);
          });
        };
        window.App.conv(d);
      }
      paint();
      if (!d.open) d.showModal();
    });
  }
  Admin.editFeatured = editFeatured;

  function saveBuild(cls, ver, tab, nb, label) {
    return saveAll(function (all) { all[cls][ver][tab] = nb; }, label);
  }
  // 只改需要的部分，其他套用 GitHub 上最新的內容，避免蓋掉別處的修改
  function saveAll(mutate, label) {
    return gh(API + '?ref=' + A.branch).then(function (j) {
      var all = parseBuilds(b64decode(j.content));
      mutate(all);
      var src = header() + 'window.BUILDS = ' + JSON.stringify(all, null, 2) + ';\n';
      return gh(API, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '網站編輯：' + label, content: b64encode(src), sha: j.sha, branch: A.branch })
      }).then(function () { window.BUILDS = all; });
    });
  }

  window.Admin = Admin;
  document.addEventListener('DOMContentLoaded', wireLogin);
  if (document.readyState !== 'loading') wireLogin();
})();
