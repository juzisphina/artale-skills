// 管理員編輯：站長（juzisphina）或站長在 GitHub 邀請的協作者，用自己的 GitHub 金鑰登入後能把修改存回網站。
// 金鑰只存在這台裝置的瀏覽器；存檔時直接呼叫 GitHub API 改 data/builds.js。
(function () {
  'use strict';
  var A = window.ADMIN || {}, TOKEN = 'askills.ghToken', LOGIN = 'askills.ghLogin', API = 'https://api.github.com/repos/' + A.repo + '/contents/' + A.path;
  var E = window.Engine;
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function token() { return load(TOKEN) || ''; }
  function saveErr(e) {
    if (e.status === 401) return '金鑰過期或無效，請重新登入';
    if (e.status === 403 || e.status === 404) return '這個帳號沒有編輯權限（可能已被站長移除協作者，或金鑰沒開寫入權限）';
    if (e.status === 409) return '剛好有人同時在改，請重新整理後再存一次';
    return e.message;
  }
  function gh(url, opt) {
    opt = opt || {};
    opt.headers = Object.assign({ Authorization: 'Bearer ' + token(), Accept: 'application/vnd.github+json' }, opt.headers || {});
    opt.cache = 'no-store';
    return fetch(url, opt).then(function (r) {
      if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { var e = new Error(j.message || ('HTTP ' + r.status)); e.status = r.status; throw e; });
      if (r.status === 204) return {};
      return r.json().then(function (j) { if (j && typeof j === 'object' && !Array.isArray(j)) j._status = r.status; return j; });
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
      var d = document.getElementById('adminDlg'), on = !!token();
      // 沒登入：只有輸入框 + 登入；已登入：只顯示帳號 + 登出（站長另有協作者區塊）
      document.getElementById('adminIntro').hidden = on;
      document.getElementById('adminInput').hidden = on;
      document.getElementById('adminSave').hidden = on;
      document.getElementById('adminOut').hidden = !on;
      document.getElementById('adminState').textContent = on ? '目前已登入：' + (load(LOGIN) || '…') + (load(LOGIN) ? (load(LOGIN) === A.owner ? '（站長）' : '（協作者）') : '') + '。' : '';
      document.getElementById('adminInput').value = '';
      document.getElementById('teamBox').hidden = true;
      if (window.App) window.App.conv(d);
      d.showModal();
      if (!token()) return;
      // 舊版登入沒有記帳號名：補查一次
      (load(LOGIN) ? Promise.resolve() : gh('https://api.github.com/user').then(function (u) { save(LOGIN, u.login); }))
        .then(function () {
          var who = load(LOGIN);
          document.getElementById('adminState').textContent = '目前已登入：' + who + (who === A.owner ? '（站長）' : '（協作者）') + '。';
          if (window.App) window.App.conv(document.getElementById('adminState'));
          if (who === A.owner) renderTeam();
        }, function () {});
    },
    edit: edit
  };

  // ---------- 站長專用：邀請 / 移除協作者 ----------
  var REPO = 'https://api.github.com/repos/' + A.repo;
  var TOKEN_LINK = 'https://github.com/settings/tokens/new?scopes=public_repo&description=artale-skills';
  function teamErr(e) {
    if (e.status === 403) return '你的金鑰還沒開「Administration」權限，所以不能邀請。請到 GitHub 金鑰設定，把 Administration 設成 Read and write（見下方說明）。';
    if (e.status === 404) return '找不到這個 GitHub 帳號，請確認拼字。';
    if (e.status === 422) return '這個帳號不能邀請（可能是站長自己，或帳號有問題）。';
    return e.message;
  }
  function renderTeam() {
    var box = document.getElementById('teamBox');
    box.hidden = false;
    box.innerHTML = '<h4>👥 協作者（只有站長看得到）</h4>' +
      '<div class="team-add"><input id="teamUser" placeholder="對方的 GitHub 帳號名稱" autocomplete="off"><button type="button" class="primary" id="teamInvite">邀請</button></div>' +
      '<p class="muted small" id="teamMsg"></p><div id="teamList" class="muted small">讀取中…</div>' +
      '<button type="button" class="btn" id="teamCopy">📋 複製給協作者的說明</button>' +
      '<details class="muted small"><summary>邀請失敗說沒有權限？</summary><p>到 <a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noopener">GitHub 金鑰列表</a> → 點你建的 artale-skills 金鑰 → Edit → Repository permissions 裡的 <b>Administration</b> 設成 <b>Read and write</b> → Update。金鑰字串不會變，不用重新登入。</p></details>' +
      '<details class="muted small"><summary>站長金鑰過期了怎麼辦？</summary><p>GitHub → Settings → Developer settings → <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">Fine-grained tokens</a>：Repository access 只選 artale-skills，權限加 <b>Contents</b> 和 <b>Administration</b>，都設 Read and write。產生後回這裡按「登出」，再貼上新金鑰登入。</p></details>';
    var msg = box.querySelector('#teamMsg'), list = box.querySelector('#teamList');
    function say(t, bad) { msg.textContent = t; msg.className = 'small ' + (bad ? 'bad' : 'muted'); if (window.App) window.App.conv(msg); }
    function refresh() {
      Promise.all([
        gh(REPO + '/collaborators?affiliation=direct&per_page=100').catch(function () { return []; }),
        gh(REPO + '/invitations?per_page=100').catch(function (e) { return e.status === 403 ? null : []; })
      ]).then(function (res) {
        var people = (res[0] || []).filter(function (u) { return u.login !== A.owner; }), inv = res[1];
        var html = '';
        if (!people.length && !(inv && inv.length)) html = '目前還沒有協作者。';
        people.forEach(function (u) { html += '<div class="team-row"><img src="' + esc(u.avatar_url) + '&s=40" alt=""><b>' + esc(u.login) + '</b><span class="tag ok">已加入</span><button type="button" class="ghost" data-rm="' + esc(u.login) + '">移除</button></div>'; });
        (inv || []).forEach(function (i) { html += '<div class="team-row"><img src="' + esc(i.invitee.avatar_url) + '&s=40" alt=""><b>' + esc(i.invitee.login) + '</b><span class="tag wait">等待接受</span><button type="button" class="ghost" data-cancel="' + i.id + '">取消邀請</button></div>'; });
        if (inv === null) html += '<p class="bad">（看不到待接受的邀請：金鑰還沒開 Administration 權限）</p>';
        list.innerHTML = html;
        list.querySelectorAll('[data-rm]').forEach(function (b) {
          b.onclick = function () {
            if (!confirm('確定移除 ' + b.dataset.rm + '？移除後他就不能再編輯。')) return;
            gh(REPO + '/collaborators/' + encodeURIComponent(b.dataset.rm), { method: 'DELETE' }).then(function () { say('已移除 ' + b.dataset.rm); refresh(); }, function (e) { say(teamErr(e), true); });
          };
        });
        list.querySelectorAll('[data-cancel]').forEach(function (b) {
          b.onclick = function () { gh(REPO + '/invitations/' + b.dataset.cancel, { method: 'DELETE' }).then(function () { say('已取消邀請'); refresh(); }, function (e) { say(teamErr(e), true); }); };
        });
        if (window.App) window.App.conv(list);
      });
    }
    box.querySelector('#teamInvite').onclick = function () {
      var u = box.querySelector('#teamUser').value.trim().replace(/^@/, '');
      if (!/^[A-Za-z0-9-]{1,39}$/.test(u)) return say('帳號名稱只會有英文、數字和 -，請再確認。', true);
      say('邀請中…');
      gh('https://api.github.com/users/' + encodeURIComponent(u)).then(function (info) {
        return gh(REPO + '/collaborators/' + encodeURIComponent(info.login), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ permission: 'push' }) })
          .then(function (j) {
            say(j && j._status === 201 ? '已邀請 ' + info.login + ' ✓ 對方會收到 GitHub 通知 / Email。記得把「協作者說明」複製給他。' : info.login + ' 已經是協作者了。');
            box.querySelector('#teamUser').value = ''; refresh();
          });
      }).catch(function (e) { say(teamErr(e), true); });
    };
    box.querySelector('#teamUser').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); box.querySelector('#teamInvite').click(); } });
    box.querySelector('#teamCopy').onclick = function () {
      var site = location.origin + location.pathname;
      var text = '我邀請你一起編輯「Artale 技能加點站」🍊\n' +
        '1. 接受邀請：打開 GitHub 寄到你信箱的邀請信，按「Accept invitation」。\n' +
        '2. 申請金鑰：先確認已登入你自己的 GitHub 帳號，再打開這個連結（選項已勾好，你只要選金鑰的有效期限）：' + TOKEN_LINK + '\n' +
        '   拉到最下面按「Generate token」，新頁面會出現一串 ghp_ 開頭的金鑰，請馬上複製起來。\n' +
        '3. 打開「Artale 技能加點站」：' + site + ' ，按最下面「🔧 管理員」，貼上金鑰按「登入」，就可以編輯了。';
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { say('已複製 ✓ 直接貼給對方就好'); }, function () { prompt('複製這段文字給對方：', text); });
    };
    refresh();
  }

  function wireLogin() {
    var d = document.getElementById('adminDlg'), st = document.getElementById('adminState');
    document.getElementById('adminSave').onclick = function () {
      var v = document.getElementById('adminInput').value.trim();
      if (!v) return;
      st.textContent = '驗證中…';
      var old = token(); save(TOKEN, v);
      Promise.all([gh('https://api.github.com/user'), gh('https://api.github.com/repos/' + A.repo)]).then(function (res) {
        // 站長本人，或站長在 GitHub 邀請的協作者（有寫入權限）才可以編輯
        var login = res[0].login, push = res[1].permissions && res[1].permissions.push;
        if (!push) throw new Error('帳號 ' + login + ' 不是這個網站的協作者。請站長先在 GitHub 邀請你，接受邀請後再登入');
        save(LOGIN, login);
        d.close(); window.App.toast('登入成功 ✓ ' + login + (login === A.owner ? '（站長）' : '（協作者）')); Admin.loadFresh().then(window.App.render);
      }).catch(function (e) {
        save(TOKEN, old || null);
        st.textContent = e.status === 401 ? '金鑰無效或已過期。' : ('不能用：' + e.message);
      });
    };
    document.getElementById('adminOut').onclick = function () { save(TOKEN, null); save(LOGIN, null); d.close(); window.App.toast('已登出'); window.App.render(); };
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
        var left = p.reach ? Math.max(0, p.budget - w.spent[k]) : 0;
        return '<button class="ed-tab' + (k === P ? ' on' : '') + (st.ok ? ' ok' : ' bad') + (p.reach ? '' : ' off') + (st.ok && left ? ' left' : '') + '" data-p="' + k + '"><b>' + (st.ok ? '✓ ' : '⚠ ') + p.name + '</b><span>' + p.range +
          (st.ok && left ? '<em>・剩 ' + left + ' 點</em>' : '') + '</span></button>';
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
          html += '<div class="sk' + (lv ? '' : ' zero') + (window.App.isOpen(s.id) ? ' open' : '') + '" data-id="' + s.id + '" draggable="true" title="拖到右邊的加點順序"><img class="ic" src="' + s.img + '" alt="" draggable="false">' +
            '<div class="nm" title="點一下看完整說明"><b>' + esc(s.name) + costTag(cst) + '<i class="more-ic">▾</i></b><small>' + esc(lv ? s.lv[lv - 1] : s.desc) + '</small>' + window.App.preTag(s, after, cls) + '</div>' +
            '<div class="lv' + (lv === s.max ? ' max' : '') + '">' + lv + '<span> / ' + s.max + '</span>' + (lv > b0 ? '<em>+' + (lv - b0) + '</em>' : '') + '</div>' +
            '<div class="btns"><button class="dn"' + (canDn ? '' : ' disabled') + ' aria-label="減一級">−</button><button class="up"' + (canUp ? '' : ' disabled') + ' aria-label="加一級">+</button></div>' + window.App.skillMore(s, lv, cls) + '</div>';
        });
        html += '</div>';
      });
      html += '</div><div><h3 class="ed-h">這段的加點順序 <span class="muted small">由上往下點・可把左邊技能拖進來、步驟可拖動排序</span></h3><p class="ed-flash" id="edFlash"></p><ol class="ed-steps">' +
        (seg[P].length ? '' : '<li class="ed-empty muted small">還沒有步驟：把左邊的技能拖到這裡，或按 ＋</li>') +
        seg[P].map(function (q, i) {
          var s = map[q.id].skill, r = simOf[P][i] || {};
          var range = r.lvStart === undefined ? '—' : (r.lvEnd === undefined || r.lvStart === r.lvEnd ? 'Lv' + r.lvStart : 'Lv' + r.lvStart + '~' + r.lvEnd);
          var noop = q.to <= (q.from || 0);
          var full = w.spent[P] >= PER[P].budget;
          return '<li data-i="' + i + '" draggable="true"' + (noop ? ' class="noop"' : '') + '><span class="grip" title="拖動排序">⋮⋮</span><img class="ic" src="' + s.img + '" alt="" draggable="false"><span class="ed-nm">' + esc(s.name) + ' <b>' + (noop ? q.to : (q.from ? q.from + '→' : '') + q.to) + '</b>' +
            (noop ? '<small>前面已經點到 ' + q.from + ' 級，這步沒有作用，可以刪掉</small>' : '') + '</span>' +
            '<span class="ed-lv">' + range + '</span><span class="ed-btns"><button class="tm" title="這步少點一級">−</button><button class="tp" title="這步多點一級"' + (full || q.to >= s.max ? ' disabled' : '') + '>＋</button>' +
            '<button class="mu" title="上移">↑</button><button class="md" title="下移">↓</button><button class="del" title="刪除">✕</button></span></li>';
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
        li.querySelector('.tp').onclick = function () { saveNote(); s[i].to++; paint(); };
        li.querySelector('.tm').onclick = function () { saveNote(); if (s[i].to - 1 > (s[i].from || 0)) s[i].to--; else s.splice(i, 1); paint(); };
      });

      // ----- 拖放：左邊技能拖進來 = 在那個位置加一級；右邊步驟拖動 = 換順序 -----
      var list = perEl.querySelector('.ed-steps'), drag = null;
      function rows() { return [].slice.call(list.querySelectorAll('li[data-i]')); }
      function dropIndex(ev) {
        var r = rows();
        for (var k = 0; k < r.length; k++) { var b = r[k].getBoundingClientRect(); if (ev.clientY < b.top + b.height / 2) return k; }
        return r.length;
      }
      function clearMark() { list.classList.remove('drop-on'); rows().forEach(function (li) { li.classList.remove('drop-before', 'drop-after'); }); }
      function mark(idx) {
        clearMark(); var r = rows();
        if (!r.length) list.classList.add('drop-on');
        else if (idx < r.length) r[idx].classList.add('drop-before'); else r[r.length - 1].classList.add('drop-after');
      }
      function flash(msg) { var f = perEl.querySelector('#edFlash'); f.textContent = msg; if (window.App) window.App.conv(f); clearTimeout(flash.t); flash.t = setTimeout(function () { f.textContent = ''; }, 2500); }
      function insertSkill(id, idx) {
        var s = seg[P], sk = map[id].skill;
        if (walk().spent[P] >= PER[P].budget) return flash('這段的點數已經用完了，先減掉別的技能再加。');
        var lv = before[id] || 0;
        for (var k = 0; k < idx; k++) if (s[k].id === id && s[k].to > lv) lv = s[k].to;
        if (lv >= sk.max) return flash(sk.name + ' 在這個位置已經滿級了。');
        saveNote();
        if (idx > 0 && s[idx - 1].id === id) s[idx - 1].to++;
        else s.splice(idx, 0, { id: id, to: lv + 1 });
        // 後面同一個技能的步驟也往上推一級，讓總點數真的 +1
        for (var j = idx + 1; j < s.length; j++) if (s[j].id === id && s[j].to > lv && s[j].to < sk.max) s[j].to++;
        paint();
      }
      function moveStep(from, to) {
        saveNote(); var s = seg[P], it = s.splice(from, 1)[0];
        if (to > from) to--;
        s.splice(to, 0, it); paint();
      }
      perEl.querySelectorAll('.sk[draggable]').forEach(function (row) {
        row.addEventListener('dragstart', function (e) { drag = { type: 'skill', id: row.dataset.id }; e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', row.dataset.id); row.classList.add('dragging'); });
        row.addEventListener('dragend', function () { drag = null; row.classList.remove('dragging'); clearMark(); });
      });
      rows().forEach(function (li) {
        li.addEventListener('dragstart', function (e) { drag = { type: 'step', i: +li.dataset.i }; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', 'step'); li.classList.add('dragging'); });
        li.addEventListener('dragend', function () { drag = null; li.classList.remove('dragging'); clearMark(); });
      });
      list.addEventListener('dragover', function (e) { if (!drag) return; e.preventDefault(); e.dataTransfer.dropEffect = drag.type === 'skill' ? 'copy' : 'move'; mark(dropIndex(e)); });
      list.addEventListener('dragleave', function (e) { if (!list.contains(e.relatedTarget)) clearMark(); });
      list.addEventListener('drop', function (e) {
        if (!drag) return; e.preventDefault();
        var idx = dropIndex(e), d = drag; drag = null; clearMark();
        if (d.type === 'skill') insertSkill(d.id, idx); else moveStep(d.i, idx);
      });

      var periodBad = PER.map(function (p, k) { return status(k, w.spent).ok ? null : p.name + '：' + status(k, w.spent).txt; }).filter(Boolean);
      var errs = periodBad.concat(v.errors.filter(function () { return !periodBad.length; }));
      var used = E.stageSums(cls, E.levelsAt(sim.log, M));
      var unspent = PER.reduce(function (a, p, k) { return a + (p.reach ? Math.max(0, p.budget - w.spent[k]) : 0); }, 0);
      var leftNote = unspent ? '<br><b class="warn">⚠ 到 Lv' + M + ' 還有 ' + unspent + ' 點沒安排</b>（' +
        PER.map(function (p, k) { var l = p.reach ? Math.max(0, p.budget - w.spent[k]) : 0; return l ? p.name + ' 剩 ' + l : ''; }).filter(Boolean).join('、') +
        '）。可以儲存，網頁上會提醒玩家這些點還沒分配。' : '';
      check.innerHTML = errs.length
        ? '<p class="notice rose">⚠ 還不能儲存：<br>' + errs.map(esc).join('<br>') + '</p>'
        : '<p class="notice ' + (unspent ? 'warn' : 'ok') + '">✓ 符合遊戲規則。Lv' + M + ' 時：1轉 ' + used[1] + '、2轉 ' + used[2] + '、3轉 ' + used[3] + '、4轉 ' + used[4] + ' 點' + leftNote + '</p>';
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
        check.insertAdjacentHTML('afterbegin', '<p class="notice rose">儲存失敗：' + esc(saveErr(e)) + '</p>');
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
            d.querySelector('#featMsg').textContent = '儲存失敗：' + (saveErr(e));
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
        body: JSON.stringify({ message: '網站編輯：' + label + (load(LOGIN) ? '（by ' + load(LOGIN) + '）' : ''), content: b64encode(src), sha: j.sha, branch: A.branch })
      }).then(function () { window.BUILDS = all; });
    });
  }

  // 武陵道場資料（data/dojo.js）：同樣先拿 GitHub 上最新的 sha 再覆蓋
  Admin.saveDojo = function (data, label) {
    var url = 'https://api.github.com/repos/' + A.repo + '/contents/data/dojo.js';
    return gh(url + '?ref=' + A.branch).then(function (j) {
      var src = '// 武陵道場 Season 2（官方 11/24 更新公告）。boss / hp / note / records 可在網站「管理員」編輯，存檔會覆蓋這個檔案。\n' +
        'window.DOJO = ' + JSON.stringify(data, null, 2) + ';\n';
      return gh(url, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '網站編輯：' + label + (load(LOGIN) ? '（by ' + load(LOGIN) + '）' : ''), content: b64encode(src), sha: j.sha, branch: A.branch })
      });
    });
  };

  window.Admin = Admin;
  document.addEventListener('DOMContentLoaded', wireLogin);
  if (document.readyState !== 'loading') wireLogin();
})();
