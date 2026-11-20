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

  // ---------- 編輯器 ----------
  function edit(x, body) {
    var b = JSON.parse(JSON.stringify(window.BUILDS[x.c.key][x.ver][x.tab]));
    var steps = b.steps.trim().split(/\s+/).map(function (t) { var p = t.split(':'); return { id: p[0], to: +p[1] }; });
    var map = E.index(x.cls);
    var opts = x.cls.stages.map(function (st) {
      return '<optgroup label="' + esc(st.name) + '">' + st.skills.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '（最高 ' + s.max + '）</option>'; }).join('') + '</optgroup>';
    }).join('');
    var notes = b.notes || {};
    body.innerHTML = '<section class="card edit"><h2>✏️ 編輯：' + esc(x.c.name) + '・' + esc(x.V.name) + '・' + esc(b.title) + '</h2>' +
      '<p class="notice">改完按「儲存到網站」，約 1 分鐘後所有人都會看到。不合遊戲規則時不能儲存。' + (x.c.weapon ? '（聖騎士請用「劍」的技能編輯，棍騎會自動換算）' : '') + '</p>' +
      '<div class="ed-grid">' +
      '<label>標題<input id="edTitle" value="' + esc(b.title) + '"></label>' +
      '<label>耗水程度<select id="edPotion">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === b.potion ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<label class="full">簡介<textarea id="edSummary" rows="2">' + esc(b.summary) + '</textarea></label>' +
      '<label>優點（一行一個）<textarea id="edPros" rows="3">' + esc(b.pros.join('\n')) + '</textarea></label>' +
      '<label>缺點（一行一個）<textarea id="edCons" rows="3">' + esc(b.cons.join('\n')) + '</textarea></label>' +
      x.cls.stages.map(function (st, i) { return '<label>' + esc(st.name) + ' 小提示<input data-note="' + i + '" value="' + esc(notes[i] || '') + '"></label>'; }).join('') +
      '</div>' +
      '<h3 class="ed-h">加點順序 <span class="muted small">由上往下點；右邊會即時算出在幾等點完</span></h3>' +
      '<ol class="ed-steps" id="edSteps"></ol>' +
      '<button class="btn" id="edAdd">＋ 在最後加一步</button>' +
      '<div id="edCheck" class="ed-check"></div>' +
      '<div class="ed-bar"><button class="btn" id="edCancel">取消</button><span class="grow"></span><button class="primary" id="edSave">💾 儲存到網站</button></div></section>';

    var list = body.querySelector('#edSteps'), check = body.querySelector('#edCheck'), saveBtn = body.querySelector('#edSave');
    function stepsStr() { return steps.map(function (s) { return s.id + ':' + s.to; }).join(' '); }
    function paint() {
      var v = E.validate(x.cls, stepsStr(), null), sim = v.sim;
      list.innerHTML = steps.map(function (s, i) {
        var m = map[s.id], r = sim.steps[i] || {}, sk = m ? m.skill : null;
        var range = r.lvStart === undefined ? '—' : (r.lvEnd === undefined ? 'Lv' + r.lvStart + '~' : (r.lvStart === r.lvEnd ? 'Lv' + r.lvStart : 'Lv' + r.lvStart + '~' + r.lvEnd));
        return '<li data-i="' + i + '"><span class="no">' + (i + 1) + '</span>' + (sk ? '<img class="ic" src="' + sk.img + '" alt="">' : '') +
          '<select class="ed-sk">' + opts + '</select><input class="ed-to" type="number" min="1" max="' + (sk ? sk.max : 30) + '" value="' + s.to + '" aria-label="點到幾級">' +
          '<span class="ed-lv">' + range + '</span>' +
          '<span class="ed-btns"><button class="up" title="上移">↑</button><button class="dn" title="下移">↓</button><button class="ins" title="在下面插入一步">＋</button><button class="del" title="刪除">✕</button></span></li>';
      }).join('');
      list.querySelectorAll('li').forEach(function (li) {
        var i = +li.dataset.i, sel = li.querySelector('.ed-sk');
        sel.value = steps[i].id;
        sel.onchange = function () { steps[i].id = sel.value; paint(); };
        li.querySelector('.ed-to').onchange = function () { steps[i].to = Math.max(1, +this.value || 1); paint(); };
        li.querySelector('.up').onclick = function () { if (i > 0) { var t = steps[i]; steps[i] = steps[i - 1]; steps[i - 1] = t; paint(); } };
        li.querySelector('.dn').onclick = function () { if (i < steps.length - 1) { var t = steps[i]; steps[i] = steps[i + 1]; steps[i + 1] = t; paint(); } };
        li.querySelector('.ins').onclick = function () { steps.splice(i + 1, 0, { id: steps[i].id, to: steps[i].to }); paint(); };
        li.querySelector('.del').onclick = function () { steps.splice(i, 1); paint(); };
      });
      var used = E.stageSums(x.cls, E.levelsAt(sim.log, 200));
      check.innerHTML = v.errors.length
        ? '<p class="notice rose">⚠ 還不能儲存：<br>' + v.errors.map(esc).join('<br>') + '</p>'
        : '<p class="notice ok">✓ 符合遊戲規則。Lv200 時：1轉 ' + used[1] + '、2轉 ' + used[2] + '、3轉 ' + used[3] + '、4轉 ' + used[4] + ' 點</p>';
      saveBtn.disabled = v.errors.length > 0;
      if (window.App) window.App.conv(body);
    }
    body.querySelector('#edAdd').onclick = function () { var l = steps[steps.length - 1]; steps.push({ id: l ? l.id : x.cls.stages[1].skills[0].id, to: 1 }); paint(); };
    body.querySelector('#edCancel').onclick = function () { window.App.render(); };
    saveBtn.onclick = function () {
      var nb = {
        title: body.querySelector('#edTitle').value.trim() || b.title,
        potion: +body.querySelector('#edPotion').value,
        summary: body.querySelector('#edSummary').value.trim(),
        pros: lines('#edPros'), cons: lines('#edCons'),
        steps: stepsStr(), notes: {}
      };
      body.querySelectorAll('[data-note]').forEach(function (el) { if (el.value.trim()) nb.notes[el.dataset.note] = el.value.trim(); });
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

  // 只改這一套，其他套用 GitHub 上最新的內容，避免蓋掉別處的修改
  function saveBuild(cls, ver, tab, nb, label) {
    return gh(API + '?ref=' + A.branch).then(function (j) {
      var all = parseBuilds(b64decode(j.content));
      all[cls][ver][tab] = nb;
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
