// 🥋 武陵道場 Season 2 頁面：樓層表、停層計算器、職業紀錄、硬幣商店（資料在 data/dojo.js）
(function () {
  var CALC = 'askills.dojoCalc';
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

  // ---------- pure math (also used by npm run check) ----------
  function cumulative(floors, mode) {
    var c = [0], s = 0;
    floors.forEach(function (x) { s += +x[mode] || 0; c[x.f] = s; });
    return c;
  }
  // "45:30" → 45.5 minutes left; null when not a time
  function parseLeft(t) {
    var m = String(t || '').trim().match(/^(\d{1,2})[:：.](\d{1,2})$/) || String(t || '').trim().match(/^(\d{1,2})$/);
    if (!m) return null;
    var v = +m[1] + (m[2] != null ? +m[2] / 60 : 0);
    return v > 0 && v <= 60 ? v : null;
  }
  // rows: [{floor, left}] → options ranked by points per minute (re-entry overhead included)
  function plan(floors, mode, rows, over, minutes) {
    var cum = cumulative(floors, mode), out = [];
    rows.forEach(function (r) {
      var left = parseLeft(r.left), f = +r.floor;
      if (left == null || !cum[f]) return;
      var used = minutes - left;
      if (used <= 0) return;
      var run = used + over;
      out.push({ floor: f, left: r.left, used: used, pts: cum[f], run: run, rate: cum[f] / run });
    });
    out.sort(function (a, b) { return a.floor - b.floor; });
    var best = null;
    out.forEach(function (o) { if (!best || o.rate > best.rate) best = o; });
    out.forEach(function (o) { o.best = o === best; });
    return { list: out, best: best, cum: cum };
  }
  function nextBelt(belts, cur) {
    for (var i = 0; i < belts.length; i++) if (cur < belts[i].pts) return belts[i];
    return null;
  }
  function mmss(min) { var s = Math.max(0, Math.round(min * 60)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }

  // ---------- page ----------
  function render(app, A) {
    var D = window.DOJO, S = D.season;
    var st = readCalc();
    document.title = '武陵道場 Season 2｜Artale 技能加點站';
    var left = Math.ceil((Date.parse(S.end) - Date.now()) / 86400000);
    var admin = !!(window.Admin && window.Admin.on());
    var html =
      '<p class="crumb"><a href="#/">← 回首頁</a></p>' +
      '<section class="hero dojo-hero"><h1>🥋 武陵道場 <b>Season 2</b></h1>' +
      '<p>' + (left > 0 ? '賽季還剩 <b>' + left + ' 天</b>（到 2027/1/19 維護前）' : '本賽季已結束') + '・共 ' + S.floors + ' 層・限時 ' + S.minutes + ' 分鐘・' + S.minLv + ' 等以上</p>' +
      '<div class="chips">' + D.belts.map(function (b) { return '<span class="chip">' + esc(b.name) + ' <b>' + fmt(b.pts) + '</b> 分</span>'; }).join('') +
      '<a class="chip" href="' + esc(S.source) + '" target="_blank" rel="noopener">📢 官方公告</a></div>' +
      '<nav class="dojo-nav">' + [['calc', '🧮 停層計算器'], ['floors', '📋 樓層表'], ['boss', '👹 BOSS 招式'], ['recs', '🏅 職業紀錄'], ['shop', '🪙 硬幣商店'], ['rules', '📌 規則'], ['cmtCard', '💬 留言']]
        .map(function (x) { return '<a href="#" data-jump="' + x[0] + '">' + x[1] + '</a>'; }).join('') + '</nav></section>' +

      // calculator
      '<section class="card" id="calc"><h2>🧮 停層計算器 <span class="muted">打到第幾層就重來最快？</span></h2>' +
      '<p class="muted small">打一場時，在幾個樓層<b>打完的瞬間</b>看一下右上角倒數計時器，填進來（例：45:30）。會自動算出停在哪一層、每小時拿最多分。</p>' +
      '<div class="calc-top">' +
      '<label>模式<div class="seg" id="modeSeg"><button type="button" data-m="solo"' + (st.mode === 'solo' ? ' class="on"' : '') + '>個人</button><button type="button" data-m="party"' + (st.mode === 'party' ? ' class="on"' : '') + '>組隊</button></div></label>' +
      '<label>目前訓練分數<input id="cCur" type="number" min="0" inputmode="numeric" value="' + esc(st.cur) + '" placeholder="0"></label>' +
      '<label>重新進場要幾分鐘<input id="cOver" type="number" min="0" step="0.5" inputmode="decimal" value="' + esc(st.over) + '"></label>' +
      '</div>' +
      '<div class="calc-rows" id="cRows">' + st.rows.map(rowHtml).join('') + '</div>' +
      '<button type="button" class="ghost" id="cAdd">＋ 加一層</button>' +
      '<div id="cOut" class="calc-out"></div></section>' +

      // floors
      '<section class="card" id="floors"><h2>📋 47 層分數表 <span class="muted">官方公告分數；★ = 分數比前後層高很多的樓層</span>' +
      (admin ? '<button type="button" class="btn edit-btn" id="dojoEdit">✏️ 編輯 BOSS／血量／紀錄</button>' : '') + '</h2>' +
      '<p class="muted small">第 2 季每層是哪隻 BOSS、血量多少，官方沒有公布，也還沒有人整理完。下面「👹 BOSS 招式」有第 1 季玩家整理的 BOSS 和傷害可以參考。打過的玩家歡迎留言補充，確認後會更新到表裡。</p>' +
      '<div class="tbl-wrap"><table class="dojo-tbl"><thead><tr><th>層</th><th>BOSS</th><th>血量</th><th>個人</th><th>累計</th><th>組隊</th><th>要注意</th></tr></thead><tbody>' +
      floorRows(D.floors) + '</tbody></table></div></section>' +

      // bosses (season 1 player notes)
      bossHtml(D) +

      // records
      '<section class="card" id="recs"><h2>🏅 職業實測紀錄 <span class="muted">大家打到哪、花多久</span></h2>' + recsHtml(D.records) +
      '<p class="muted small">想分享你的紀錄？在最下面留言寫：職業／等級／打到幾層／打完時計時器剩多少。</p></section>' +

      // shop
      '<section class="card" id="shop"><h2>🪙 武陵修煉硬幣商店 <span class="muted">打 BOSS 有機率掉硬幣</span></h2>' +
      '<p class="notice">💡 硬幣不多時：先換<b>每週重置</b>的經驗值 2 倍券（最便宜、每週都能再買），再換每月的 3 倍券；550 硬幣的擊破椅子（每 10 秒回 HP/MP 200）最後再存。</p>' +
      '<div class="tbl-wrap"><table class="dojo-tbl shop"><thead><tr><th>道具</th><th>硬幣</th><th>可買</th><th>重置</th></tr></thead><tbody>' +
      D.shop.map(function (s) { return '<tr class="r-' + (s.reset === '每週' ? 'wk' : s.reset === '每月' ? 'mo' : 'no') + '"><td class="l">' + esc(s.item) + '</td><td>' + s.coin + '</td><td>' + s.limit + '</td><td>' + esc(s.reset) + '</td></tr>'; }).join('') +
      '</tbody></table></div></section>' +

      // rules
      '<section class="card" id="rules"><h2>📌 本季規則重點</h2><ul class="tips">' + D.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<div class="belts">' + D.belts.map(function (b) { return '<div class="belt"><b>' + esc(b.name) + '</b><span>' + fmt(b.pts) + ' 分・Lv' + b.lv + '</span><small>' + esc(b.stat) + '</small></div>'; }).join('') + '</div></section>' +

      '<section class="card" id="cmtCard"><h2>💬 道場心得・紀錄分享</h2><div id="giscusBox"></div></section>';
    app.innerHTML = html;

    app.querySelectorAll('[data-jump]').forEach(function (a) {
      a.onclick = function (e) { e.preventDefault(); var t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    });
    wireCalc(app, A);
    if (admin) document.getElementById('dojoEdit').onclick = function () { openEditor(A); };
    A.giscus('武陵道場 Season 2');
    window.scrollTo(0, 0);
  }

  function rowHtml(r, i) {
    return '<div class="calc-row" data-i="' + i + '"><span>打完第</span><input class="cF" type="number" min="1" max="47" inputmode="numeric" value="' + esc(r.floor) + '"><span>層，剩</span>' +
      '<input class="cL" type="text" inputmode="numeric" placeholder="例 45:30" value="' + esc(r.left) + '"><button type="button" class="x" title="刪除這列" aria-label="刪除這列">✕</button></div>';
  }

  function floorRows(floors) {
    var c = cumulative(floors, 'solo');
    return floors.map(function (x, i) {
      var prev = i ? floors[i - 1].solo : 0, next = floors[i + 1] ? floors[i + 1].solo : 0;
      var star = x.solo >= prev + 3 && x.solo > next;
      return '<tr' + (star ? ' class="star"' : '') + '><td>' + x.f + (star ? ' ★' : '') + '</td><td class="l">' + (x.boss ? esc(x.boss) : '<span class="faint">待補</span>') + '</td>' +
        '<td>' + (x.hp ? esc(x.hp) : '<span class="faint">—</span>') + '</td><td><b>' + x.solo + '</b></td><td>' + c[x.f] + '</td><td>' + x.party + '</td>' +
        '<td class="l small">' + esc(x.note || '') + '</td></tr>';
    }).join('');
  }

  function bossHtml(D) {
    var B = D.bosses || [], T = D.s2tips || [];
    if (!B.length && !T.length) return '';
    return '<section class="card" id="boss"><h2>👹 BOSS 招式與傷害 <span class="muted">要注意什麼、會被打多痛</span></h2>' +
      ((D.s2new || []).length ? '<div class="boss-new">' + D.s2new.map(function (b) { return '<div class="boss-card"><img src="' + esc(b.img) + '" alt="' + esc(b.name) + '" loading="lazy"><b>' + esc(b.name) + '</b><small>' + esc(b.tip) + '</small></div>'; }).join('') + '</div>' : '') +
      (T.length ? '<p class="notice">⚠️ <b>第 2 季已知：</b></p><ul class="tips">' + T.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      (B.length ? '<p class="muted small">' + esc(D.bossNote || '') + '</p>' +
        '<div class="tbl-wrap"><table class="dojo-tbl" style="min-width:820px"><thead><tr><th>第1季層</th><th>BOSS</th><th>等級</th><th>圖鑑血量<br><small>野外版</small></th><th>命中需求</th><th>會被打多痛</th><th>怎麼打</th></tr></thead><tbody>' +
        B.map(function (b) { return '<tr><td>' + esc(b.s1) + '</td><td class="l boss-cell">' + (b.img ? '<img src="' + esc(b.img) + '" alt="" loading="lazy">' : '<span class="no-img">?</span>') + '<b>' + esc(b.name) + '</b></td><td>' + (b.lv ? 'Lv' + esc(b.lv) : '—') + '</td><td>' + esc(b.hp || '—') + '</td><td>' + esc(b.acc || '—') + '</td><td class="l small">' + esc(b.dmg || '—') + '</td><td class="l small">' + esc(b.tip || '') + '</td></tr>'; }).join('') +
        '</tbody></table></div>' : '') +
      '<p class="muted small">道場裡每層 BOSS 的真實血量還沒有人公開，打過的玩家歡迎在最下面留言補充。</p></section>';
  }

  function recsHtml(recs) {
    if (!recs.length) return '<p class="muted">本季還沒有紀錄，整理後會放上來給大家參考。</p>';
    return '<div class="tbl-wrap"><table class="dojo-tbl"><thead><tr><th>職業</th><th>賽季</th><th>模式</th><th>打到</th><th>計時器剩</th><th>用時</th><th>得分</th><th>每小時</th><th>心得</th></tr></thead><tbody>' +
      recs.map(function (r) {
        var lft = parseLeft(r.left), used = lft == null ? null : 60 - lft;
        var ph = used ? r.pts / (used + 1) * 60 : null;
        return '<tr><td>' + esc(r.cls) + '</td><td>' + esc(r.season) + '</td><td>' + esc(r.mode) + '</td><td>' + esc(r.floor) + ' 層</td><td>' + esc(r.left) + '</td>' +
          '<td>' + (used == null ? '—' : mmss(used)) + '</td><td>' + esc(r.pts) + '</td><td>' + (ph ? '約 ' + fmt(ph) : '—') + '</td><td class="l small">' + esc(r.note) + '</td></tr>';
      }).join('') + '</tbody></table></div><p class="muted small">每小時＝得分 ÷（用時＋1 分鐘重新進場）。第 1 季的分數和第 2 季不同，只能參考速度。</p>';
  }

  // ---------- calculator ----------
  function readCalc() {
    var st = null;
    try { st = JSON.parse(load(CALC) || 'null'); } catch (e) {}
    st = st || {};
    return {
      mode: st.mode === 'party' ? 'party' : 'solo',
      cur: st.cur != null ? st.cur : '',
      over: st.over != null ? st.over : 1,
      rows: st.rows && st.rows.length ? st.rows : [33, 34, 35, 36, 37, 38].map(function (f) { return { floor: f, left: '' }; })
    };
  }
  function wireCalc(app, A) {
    var st = readCalc();
    function collect() {
      st.cur = app.querySelector('#cCur').value;
      st.over = app.querySelector('#cOver').value;
      st.rows = Array.prototype.map.call(app.querySelectorAll('.calc-row'), function (r) { return { floor: r.querySelector('.cF').value, left: r.querySelector('.cL').value }; });
      save(CALC, JSON.stringify(st));
    }
    function out() {
      collect();
      app.querySelector('#cOut').innerHTML = resultHtml(st);
      A.conv(app.querySelector('#cOut'));
    }
    function redrawRows() {
      app.querySelector('#cRows').innerHTML = st.rows.map(rowHtml).join('');
      A.conv(app.querySelector('#cRows'));
      out();
    }
    app.querySelector('#calc').addEventListener('input', out);
    app.querySelector('#cRows').addEventListener('click', function (e) {
      var x = e.target.closest('.x'); if (!x) return;
      collect(); st.rows.splice(+x.parentNode.dataset.i, 1); redrawRows();
    });
    app.querySelector('#cAdd').onclick = function () {
      collect();
      var last = st.rows.length ? +st.rows[st.rows.length - 1].floor || 30 : 30;
      st.rows.push({ floor: Math.min(47, last + 1), left: '' }); redrawRows();
    };
    app.querySelectorAll('#modeSeg button').forEach(function (b) {
      b.onclick = function () {
        st.mode = b.dataset.m;
        app.querySelectorAll('#modeSeg button').forEach(function (y) { y.classList.toggle('on', y === b); });
        save(CALC, JSON.stringify(st)); out();
      };
    });
    out();
  }
  function resultHtml(st) {
    var D = window.DOJO, over = Math.max(0, +st.over || 0);
    var p = plan(D.floors, st.mode, st.rows, over, D.season.minutes);
    if (!p.list.length) return '<p class="muted">填上至少一層的計時器時間，就會出現結果。</p>';
    var cur = Math.max(0, +st.cur || 0), b = p.best, nb = nextBelt(D.belts, cur);
    var h = '<div class="tbl-wrap"><table class="dojo-tbl calc-tbl"><thead><tr><th>停在</th><th>用時</th><th>一場</th><th>每分鐘</th><th>每小時</th></tr></thead><tbody>' +
      p.list.map(function (o) {
        return '<tr' + (o.best ? ' class="best"' : '') + '><td>' + o.floor + ' 層' + (o.best ? ' 👑' : '') + '</td><td>' + mmss(o.used) + '</td><td>' + o.pts + ' 分</td><td>' + o.rate.toFixed(1) + '</td><td>' + fmt(o.rate * 60) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    var nf = D.floors[b.floor] || null;   // the floor after the best stop (array is 0-based)
    h += '<div class="verdict"><b>👑 打完第 ' + b.floor + ' 層就重來最快</b>：一場約 ' + mmss(b.run) + '（含進場）拿 ' + b.pts + ' 分，每小時約 ' + fmt(b.rate * 60) + ' 分。';
    if (nf) h += '<br>想多打第 ' + nf.f + ' 層（' + nf[st.mode] + ' 分）的話，要在 <b>' + mmss(nf[st.mode] / b.rate) + '</b> 內打完才划算。';
    if (nb) {
      var runs = Math.ceil((nb.pts - cur) / b.pts);
      h += '<br>離<b>' + esc(nb.name) + '</b>還差 ' + fmt(nb.pts - cur) + ' 分：約 <b>' + runs + ' 場</b>、' + (runs * b.run / 60).toFixed(1) + ' 小時。';
    } else if (cur) h += '<br>🎉 三條腰帶的分數都夠了！';
    return h + '</div>';
  }

  // ---------- admin editor ----------
  function openEditor(A) {
    var D = JSON.parse(JSON.stringify(window.DOJO));
    var box = document.getElementById('floors');
    var html = '<h2>✏️ 編輯樓層資料 <span class="muted">只改 BOSS／血量／要注意；分數是官方數字</span></h2>' +
      '<div class="tbl-wrap"><table class="dojo-tbl ed"><thead><tr><th>層</th><th>BOSS</th><th>血量</th><th>要注意</th></tr></thead><tbody>' +
      D.floors.map(function (x, i) {
        return '<tr><td>' + x.f + '</td><td><input data-i="' + i + '" data-k="boss" value="' + esc(x.boss) + '"></td><td><input data-i="' + i + '" data-k="hp" value="' + esc(x.hp) + '"></td>' +
          '<td><input data-i="' + i + '" data-k="note" value="' + esc(x.note) + '"></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<h3>🏅 職業紀錄</h3><div id="recEd">' + D.records.map(recEdRow).join('') + '</div>' +
      '<button type="button" class="ghost" id="recAdd">＋ 加一筆紀錄</button>' +
      '<div class="dlg-row" style="margin-top:12px"><span class="grow"></span><button type="button" class="ghost" id="edCancel">取消</button><button type="button" class="primary" id="edSave">💾 存檔</button></div>' +
      '<p class="muted small" id="edMsg"></p>';
    box.innerHTML = html;
    A.conv(box);
    box.querySelector('#recAdd').onclick = function () {
      box.querySelector('#recEd').insertAdjacentHTML('beforeend', recEdRow({ cls: '', season: '第2季', mode: '個人', floor: '', left: '', pts: '', note: '' }));
    };
    box.querySelector('#recEd').addEventListener('click', function (e) { var x = e.target.closest('.x'); if (x) x.parentNode.remove(); });
    box.querySelector('#edCancel').onclick = function () { A.render(); };
    box.querySelector('#edSave').onclick = function () {
      box.querySelectorAll('input[data-k]').forEach(function (inp) { D.floors[+inp.dataset.i][inp.dataset.k] = inp.value.trim(); });
      D.records = Array.prototype.map.call(box.querySelectorAll('.rec-ed'), function (r) {
        var o = {};
        r.querySelectorAll('[data-r]').forEach(function (inp) { o[inp.dataset.r] = inp.value.trim(); });
        o.floor = +o.floor || o.floor; o.pts = +o.pts || o.pts;
        return o;
      }).filter(function (o) { return o.cls; });
      var msg = box.querySelector('#edMsg'), btn = box.querySelector('#edSave');
      btn.disabled = true; msg.textContent = '存檔中…';
      window.Admin.saveDojo(D, '武陵道場資料').then(function () {
        window.DOJO = D; A.toast('已存檔 ✓ 約 1 分鐘後所有人都看得到'); A.render();
      }, function (e) { btn.disabled = false; msg.textContent = '存檔失敗：' + (e && e.message || e); });
    };
  }
  function recEdRow(r) {
    var f = function (k, ph, w) { return '<input data-r="' + k + '" placeholder="' + ph + '" value="' + esc(r[k]) + '" style="width:' + w + '">'; };
    return '<div class="rec-ed">' + f('cls', '職業', '5.5em') + f('season', '賽季', '4.5em') + f('mode', '模式', '3.5em') + f('floor', '層', '3em') + f('left', '剩 45:30', '5em') + f('pts', '得分', '4em') + f('note', '心得', '14em') +
      '<button type="button" class="x" title="刪除">✕</button></div>';
  }

  window.Dojo = { render: render, cumulative: cumulative, parseLeft: parseLeft, plan: plan, nextBelt: nextBelt };
  if (typeof module !== 'undefined') module.exports = window.Dojo;
})();
