/* Router + pages */
window.App = (function () {
  const C = window.CONTENT;
  const main = document.getElementById('main');
  const EXAM_DATE = new Date(2026, 9, 21, 8, 30); // Wed Oct 21, 2026 08:30 (local time)
  const CH_TITLES = { 1: 'Probability', 2: 'Random Variables', 3: 'Expectation', 4: 'Inequalities' };
  let cleanup = [];

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pct = (x) => Math.round(100 * x) + '%';

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  function bar(x, cls) { return '<div class="bar ' + (cls || '') + '"><div style="width:' + Math.round(100 * Math.min(1, x)) + '%"></div></div>'; }

  function topicTitle(id) { const t = C.topics[id]; return t ? t.id + ' ' + t.title : id; }

  // Where does a problem live?
  function linkFor(pid) {
    const p = C.probs[pid]; if (!p) return '#/';
    if (p.kind === 'topic') return '#/learn/' + p.topic + '?p=' + encodeURIComponent(pid);
    if (p.kind === 'drill') return '#/drills/' + encodeURIComponent(pid);
    const pre = pid.split('-')[0];
    if (p.kind === 'hw') return '#/homework/' + pre + '?p=' + encodeURIComponent(pid);
    if (p.kind === 'exam') return '#/exams/' + pre + '/practice?p=' + encodeURIComponent(pid);
    return '#/';
  }

  // Global drill numbering (1..N), grouped by topic in topic order
  function drillList() {
    const out = [];
    C.topicOrder.forEach((tid) => (C.drills[tid] || []).forEach((pid) => out.push(pid)));
    return out;
  }

  /* ---------------- pages ---------------- */

  function pageHome() {
    const s = Store.me();
    const xp = Store.totalXP();
    const lv = XP.level(xp);
    const ms = EXAM_DATE - Date.now();
    const days = Math.floor(ms / 864e5), hrs = Math.floor((ms % 864e5) / 36e5);
    const countdown = ms > 0
      ? '<div class="count"><b>' + days + '</b> days <b>' + hrs + '</b> h</div><div class="muted">until Midterm 1 · Wed Oct 21, 08:30–09:50</div>'
      : '<div class="count"><b>Exam day!</b></div><div class="muted">Good luck — trust your cheat sheet.</div>';

    // Next up: first plan topic below 60% mastery
    let next = null;
    if (C.plan) {
      for (const d of C.plan.days) {
        for (const it of d.items) {
          if (it.type === 'topic' && Store.mastery(it.id) < 0.6) { next = it.id; break; }
        }
        if (next) break;
      }
    }
    const today = Store.dayKey();
    const planHtml = C.plan ? C.plan.days.map((d) => {
      const isToday = d.date === today;
      const items = d.items.map((it) => planItem(it)).join('');
      return '<div class="plan-day' + (isToday ? ' today' : '') + (d.date < today ? ' past' : '') + '">' +
        '<div class="plan-date">' + esc(d.label) + (isToday ? ' <span class="chip today-chip">Today</span>' : '') + '</div>' +
        '<div class="plan-title">' + esc(d.title) + '</div>' +
        (d.note ? '<div class="plan-note">' + fmtInline(d.note) + '</div>' : '') +
        '<ul class="plan-items">' + items + '</ul></div>';
    }).join('') : '';

    return '<div class="page wide">' +
      '<div class="hero"><div><h1>Hi ' + esc(s.name) + ' 👋</h1><p class="lead">Everything you need for STAT 220 Midterm 1: Chapters 1–4 and Homeworks 1–6.</p></div>' +
      '<div class="card count-card">' + countdown + '</div></div>' +
      '<div class="grid3">' +
      '<div class="card stat"><div class="stat-k">Level ' + lv.n + '</div><div class="stat-v">' + esc(lv.name) + '</div>' + bar(lv.progress, 'xp') +
      '<div class="muted small">' + xp + ' XP' + (lv.next ? ' · ' + (lv.next - xp) + ' to next level' : '') + '</div></div>' +
      '<div class="card stat"><div class="stat-k">Streak</div><div class="stat-v">🔥 ' + Store.streak() + ' day' + (Store.streak() === 1 ? '' : 's') + '</div><div class="muted small">+' + XP.DAY_BONUS + ' XP for your first solve each day</div></div>' +
      '<div class="card stat"><div class="stat-k">Course mastery</div><div class="stat-v">' + pct(Store.overallMastery()) + '</div>' + bar(Store.overallMastery()) + '<div class="muted small">' + Store.solved() + ' problems solved</div></div>' +
      '</div>' +
      (next ? '<a class="card next-up" href="#/learn/' + next + '"><div class="stat-k">Next up</div><div class="next-title">' + esc(topicTitle(next)) + ' →</div><div class="muted small">Mastery ' + pct(Store.mastery(next)) + '. Read the page and do the practice as you go.</div></a>' : '') +
      '<h2>Study plan</h2>' +
      (C.plan && C.plan.intro ? '<div class="prose">' + fmt(C.plan.intro) + '</div>' : '') +
      '<div class="plan">' + planHtml + '</div></div>';
  }

  function planItem(it) {
    if (it.type === 'topic') {
      const m = Store.mastery(it.id);
      return '<li><a href="#/learn/' + it.id + '">' + esc(topicTitle(it.id)) + '</a> <span class="mini">' + bar(m, 'mini') + '<span>' + pct(m) + '</span></span></li>';
    }
    if (it.type === 'hw') {
      const hw = C.hw.find((h) => h.id === it.id);
      const m = hw ? Store.masteryOf(hw.probIds) : 0;
      return '<li><a href="#/homework/' + it.id + '">' + esc(hw ? hw.title : it.id) + '</a> <span class="mini">' + bar(m, 'mini') + '<span>' + pct(m) + '</span></span></li>';
    }
    if (it.type === 'exam') {
      const ex = C.exams.find((e) => e.id === it.id);
      const s = Store.me(); const r = s.exams[it.id];
      return '<li><a href="#/exams/' + it.id + '">' + esc(ex ? ex.title : it.id) + '</a>' + (r && r.best != null ? ' <span class="chip">best ' + r.best + '/' + ex.total + '</span>' : '') + (it.mode === 'run' ? ' <span class="muted small">(timed)</span>' : '') + '</li>';
    }
    if (it.type === 'drills') return '<li><a href="#/drills">' + esc(it.text || 'Drills') + '</a></li>';
    if (it.type === 'link') return '<li><a href="' + it.href + '">' + esc(it.text) + '</a></li>';
    return '<li>' + fmtInline(it.text || '') + '</li>';
  }

  function pageLearn() {
    const chapters = {};
    C.topicOrder.forEach((id) => { const t = C.topics[id]; (chapters[t.ch] = chapters[t.ch] || []).push(t); });
    let h = '<div class="page wide"><h1>Learn</h1><p class="lead">Each page explains one idea in plain words, with examples. Practice problems sit right after each new idea. Do them as you read: the first one is always a quick warm-up.</p>';
    const nf = Store.flagCount();
    h += '<a class="card tech-card" href="#/flagged"><b>⚑ Flagged boxes (' + nf + ')</b><div class="muted small">' + (nf ? 'Revisit the definitions, theorems and examples you flagged.' : 'Click ⚑ on any box to save it here for later.') + '</div></a>';
    if (C.technique) h += '<a class="card tech-card" href="#/technique"><b>✍️ ' + esc(C.technique.title) + '</b><div class="muted small">' + esc(C.technique.summary || '') + '</div></a>';
    Object.keys(chapters).sort().forEach((ch) => {
      h += '<h2>Chapter ' + ch + ' · ' + CH_TITLES[ch] + '</h2><div class="topic-grid">';
      chapters[ch].forEach((t) => {
        const m = Store.mastery(t.id);
        h += '<a class="card topic-card" href="#/learn/' + t.id + '"><div class="topic-id">' + t.id + '</div><div class="topic-name">' + esc(t.title) + '</div>' +
          '<div class="muted small">' + esc(t.summary || '') + '</div>' + bar(m) +
          '<div class="muted small">' + t.probIds.length + ' practice · ' + (C.drills[t.id] || []).length + ' drills · ' + pct(m) + ' mastery</div></a>';
      });
      h += '</div>';
    });
    return h + '</div>';
  }

  const KIND_NAME = { def: 'Definition', thm: 'Theorem', ex: 'Example', note: 'Note', warn: 'Watch out' };

  // Flag keys for the boxes of a page (`src` is a topic id or 'technique'). A key depends on the box's
  // kind, title and how many same-kind same-title boxes come before it, so editing text keeps flags.
  function boxKeys(src, blocks) {
    const seen = {};
    return blocks.map((b) => {
      if (b.type !== 'box') return null;
      const base = b.kind + '|' + (b.title || '');
      seen[base] = (seen[base] || 0) + 1;
      return src + '|' + hash(base + '|' + seen[base]);
    });
  }
  function hash(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h * 33) ^ str.charCodeAt(i)) >>> 0; return h.toString(36); }

  function boxHtml(b, key, extra) {
    const on = Store.isFlagged(key);
    return '<div class="box ' + b.kind + '" id="b-' + key.replace(/[^a-z0-9]/gi, '-') + '"><div class="box-title"><span>' + KIND_NAME[b.kind] + (b.title ? ' · ' + fmtInline(b.title) : '') + '</span>' + (extra || '') +
      '<button class="flag-btn' + (on ? ' on' : '') + '" data-go="flag" data-key="' + esc(key) + '" title="' + (on ? 'Unflag' : 'Flag to revisit later') + '" aria-pressed="' + on + '">⚑</button></div><div class="prose">' + fmt(b.html) + '</div></div>';
  }

  function renderBlocks(blocks, counter, src) {
    const keys = boxKeys(src, blocks);
    return blocks.map((b, i) => {
      if (b.type === 'html') return '<div class="prose">' + fmt(b.html) + '</div>';
      if (b.type === 'h') return '<h2 id="' + slug(b.text) + '">' + esc(b.text) + '</h2>';
      if (b.type === 'box') return boxHtml(b, keys[i]);
      if (b.type === 'prob') { counter.n++; return Problem.html(b.id, { label: 'Practice ' + counter.n }); }
      return '';
    }).join('');
  }

  // All flagged boxes, in course order
  function flaggedBoxes() {
    const s = Store.me(); const out = [];
    const scan = (src, blocks) => boxKeys(src, blocks).forEach((k, i) => { if (k && s.flags[k]) out.push({ src, key: k, b: blocks[i] }); });
    if (C.technique) scan('technique', C.technique.blocks);
    C.topicOrder.forEach((id) => scan(id, C.topics[id].blocks));
    return out;
  }

  function pageFlagged(q) {
    const all = flaggedBoxes();
    const kinds = Object.keys(KIND_NAME).filter((k) => all.some((x) => x.b.kind === k));
    const list = q.k ? all.filter((x) => x.b.kind === q.k) : all;
    let h = '<div class="page"><div class="crumbs"><a href="#/learn">Learn</a></div><h1>⚑ Flagged</h1>' +
      '<p class="lead">Definitions, theorems, examples and notes you flagged on the Learn pages. Click ⚑ on any box to add or remove it.</p>';
    if (!all.length) return h + '<div class="card"><p class="muted">Nothing flagged yet. Open a <a href="#/learn">Learn</a> page and click the ⚑ in the corner of a box you want to come back to.</p></div></div>';
    h += '<div class="toolbar"><a class="btn' + (q.k ? '' : ' primary') + '" href="#/flagged">All (' + all.length + ')</a>' +
      kinds.map((k) => '<a class="btn' + (q.k === k ? ' primary' : '') + '" href="#/flagged?k=' + k + '">' + KIND_NAME[k] + ' (' + all.filter((x) => x.b.kind === k).length + ')</a>').join('') + '</div>';
    let cur = null;
    list.forEach((x) => {
      if (x.src !== cur) {
        cur = x.src;
        h += '<h2>' + (x.src === 'technique' ? '<a href="#/technique">' + esc(C.technique.title) + '</a>' : '<a href="#/learn/' + x.src + '">' + esc(topicTitle(x.src)) + '</a>') + '</h2>';
      }
      const href = (x.src === 'technique' ? '#/technique' : '#/learn/' + x.src) + '?b=' + encodeURIComponent(x.key);
      h += boxHtml(x.b, x.key, '<a class="box-ctx" href="' + href + '" title="Show it on its page">in context ↗</a>');
    });
    return h + '</div>';
  }
  function slug(s) { return 's-' + String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function pageTopic(id) {
    const t = C.topics[id];
    if (!t) return notFound();
    const idx = C.topicOrder.indexOf(id);
    const prev = C.topicOrder[idx - 1], next = C.topicOrder[idx + 1];
    const heads = t.blocks.filter((b) => b.type === 'h');
    const toc = heads.length ? '<div class="toc">' + heads.map((b) => '<a href="javascript:void 0" data-scroll="' + slug(b.text) + '">' + esc(b.text) + '</a>').join('') + '</div>' : '';
    const m = Store.mastery(id);
    return '<div class="page"><div class="crumbs"><a href="#/learn">Learn</a> › Chapter ' + t.ch + ' · ' + CH_TITLES[t.ch] + '</div>' +
      '<h1><span class="topic-num">' + t.id + '</span> ' + esc(t.title) + '</h1>' +
      '<div class="topic-meta">' + bar(m) + '<span class="muted small">' + pct(m) + ' mastery (practice + drills)</span></div>' + toc +
      renderBlocks(t.blocks, { n: 0 }, id) +
      ((C.drills[id] || []).length ? '<div class="card end-card">Done reading? <a href="#/drills?t=' + id + '">Do the ' + C.drills[id].length + ' drills for this topic →</a></div>' : '') +
      '<div class="pager">' + (prev ? '<a href="#/learn/' + prev + '">← ' + esc(topicTitle(prev)) + '</a>' : '<span></span>') +
      (next ? '<a href="#/learn/' + next + '">' + esc(topicTitle(next)) + ' →</a>' : '<span></span>') + '</div></div>';
  }

  function pageTechnique() {
    const t = C.technique; if (!t) return notFound();
    return '<div class="page"><div class="crumbs"><a href="#/learn">Learn</a></div><h1>' + esc(t.title) + '</h1>' + renderBlocks(t.blocks, { n: 0 }, 'technique') + '</div>';
  }

  function pageDrills(q) {
    const list = drillList();
    const num = {}; list.forEach((pid, i) => { num[pid] = i + 1; });
    const s = Store.me();
    const done = list.filter((pid) => s.attempts[pid]).length;
    let h = '<div class="page wide"><h1>Drills</h1><p class="lead">' + list.length + ' numbered questions, grouped by topic. Click a number to open it. Each question has hints and a full worked solution. Colours: <span class="tile-key got">got it</span> <span class="tile-key part">partly</span> <span class="tile-key miss">missed</span> <span class="tile-key">not done</span></p>' +
      '<div class="toolbar"><button class="btn primary" data-go="random">🎲 Random unsolved question</button><button class="btn" data-go="retry">🔁 Random missed/partly question</button><span class="muted small">' + done + ' / ' + list.length + ' attempted</span></div>';
    let ch = 0;
    C.topicOrder.forEach((tid) => {
      const ids = C.drills[tid] || [];
      if (!ids.length) return;
      const t = C.topics[tid];
      if (t.ch !== ch) { ch = t.ch; h += '<h2>Chapter ' + ch + ' · ' + CH_TITLES[ch] + '</h2>'; }
      h += '<div class="drill-group' + (q.t === tid ? ' focus' : '') + '" id="dg-' + tid.replace('.', '-') + '"><div class="drill-topic">' + esc(t.id + ' ' + t.title) + '</div><div class="tiles">' +
        ids.map((pid) => '<a class="tile ' + (s.attempts[pid] ? s.attempts[pid].r : '') + '" href="#/drills/' + pid + '">' + num[pid] + '</a>').join('') + '</div></div>';
    });
    return h + '</div>';
  }

  function pageDrill(pid) {
    const list = drillList();
    const i = list.indexOf(pid);
    if (i < 0) return notFound();
    const prev = list[i - 1], next = list[i + 1];
    return '<div class="page"><div class="crumbs"><a href="#/drills">Drills</a></div>' +
      Problem.html(pid, { label: 'Question ' + (i + 1) }) +
      '<div class="pager">' + (prev ? '<a href="#/drills/' + prev + '">← Question ' + i + '</a>' : '<span></span>') +
      '<a href="#/drills">All questions</a>' +
      (next ? '<a href="#/drills/' + next + '">Question ' + (i + 2) + ' →</a>' : '<span></span>') + '</div></div>';
  }

  function pageHomeworkList() {
    let h = '<div class="page wide"><h1>Homework</h1><p class="lead">Every homework problem from HW1–HW6, with hints and clean step-by-step solutions. Typos in the official PDFs are fixed. HW6 had no official solutions, so these are written from scratch. In each set, <b>A</b> problems are warm-ups, <b>B</b> were graded, and <b>C</b> are "going beyond".</p><div class="topic-grid">';
    C.hw.forEach((hw) => {
      const m = Store.masteryOf(hw.probIds);
      h += '<a class="card topic-card" href="#/homework/' + hw.id + '"><div class="topic-name">' + esc(hw.title) + '</div><div class="muted small">' + esc(hw.summary || '') + '</div>' + bar(m) + '<div class="muted small">' + hw.probIds.length + ' problems · ' + pct(m) + '</div></a>';
    });
    return h + '</div></div>';
  }

  function pageHomework(id) {
    const hw = C.hw.find((x) => x.id === id);
    if (!hw) return notFound();
    return '<div class="page"><div class="crumbs"><a href="#/homework">Homework</a></div><h1>' + esc(hw.title) + '</h1>' +
      (hw.intro ? '<div class="prose">' + fmt(hw.intro) + '</div>' : '') +
      hw.probIds.map((pid) => Problem.html(pid, { label: 'Problem ' + (hw.labels[pid] || C.probs[pid].label) + (C.probs[pid].kind === 'topic' ? ' <a class="also" href="' + linkFor(pid) + '" title="Also on the topic page">↗ ' + C.probs[pid].topic + '</a>' : '') })).join('') + '</div>';
  }

  function pageExams() {
    const s = Store.me();
    let h = '<div class="page wide"><h1>Exams</h1><p class="lead">The real 2025 Midterm 1, plus four original mock exams in the same format: 3 exercises worth 40 + 30 + 30 points, 80 minutes, cheat sheet allowed.</p>' +
      '<div class="card tip">How to use these: do the <b>2025 midterm in exam mode first</b>, on paper, with your cheat sheet. Then grade yourself honestly against the solutions. Use <b>practice mode</b> (hints and per-part solutions) for the mocks you are not ready to time yet.</div>' +
      (s.examRun ? '<div class="card warnbox">⏱ You have an exam running: <a href="#/exams/' + s.examRun.id + '/run">return to it →</a></div>' : '') +
      '<div class="topic-grid">';
    C.exams.forEach((ex) => {
      const r = s.exams[ex.id];
      h += '<div class="card exam-card"><div class="topic-name">' + esc(ex.title) + '</div><div class="muted small">' + esc(ex.summary || '') + '</div>' +
        (r && r.best != null ? '<div class="best">Best: <b>' + r.best + '</b> / ' + ex.total + ' (' + r.runs.length + ' attempt' + (r.runs.length > 1 ? 's' : '') + ')</div>' : '<div class="muted small">Not attempted yet</div>') +
        '<div class="btn-row"><a class="btn primary" href="#/exams/' + ex.id + '/run">⏱ Exam mode</a><a class="btn" href="#/exams/' + ex.id + '/practice">Practice mode</a></div></div>';
    });
    return h + '</div></div>';
  }

  function examQuestionsHtml(ex, opts) {
    return ex.questions.map((q) => {
      return '<section class="exam-q"><h2>Exercise ' + q.k + ' <span class="muted">(' + q.pts + ' pt)</span></h2>' +
        (q.intro ? '<div class="prose exam-intro">' + fmt(q.intro) + '</div>' : '') +
        q.parts.map((pid) => Problem.html(pid, Object.assign({ label: '(' + C.probs[pid].label.split('(')[1], noLevel: true }, opts))).join('') + '</section>';
    }).join('');
  }

  function pageExamPractice(id) {
    const ex = C.exams.find((x) => x.id === id); if (!ex) return notFound();
    return '<div class="page"><div class="crumbs"><a href="#/exams">Exams</a> › Practice mode</div><h1>' + esc(ex.title) + '</h1>' +
      (ex.intro ? '<div class="prose">' + fmt(ex.intro) + '</div>' : '') + examQuestionsHtml(ex, {}) + '</div>';
  }

  function pageExamRun(id) {
    const ex = C.exams.find((x) => x.id === id); if (!ex) return notFound();
    const s = Store.me();
    if (s.examRun && s.examRun.id !== id) {
      const other = C.exams.find((x) => x.id === s.examRun.id);
      return '<div class="page"><div class="card warnbox">Another exam is running (' + esc(other ? other.title : s.examRun.id) + '). <a href="#/exams/' + s.examRun.id + '/run">Go to it</a> or <button class="btn" data-go="cancel-exam">abandon it</button>.</div></div>';
    }
    if (!s.examRun) {
      return '<div class="page"><div class="crumbs"><a href="#/exams">Exams</a> › Exam mode</div><h1>' + esc(ex.title) + '</h1>' +
        '<div class="card"><h3>Exam conditions</h3><ul><li><b>' + ex.minutes + ' minutes</b>. The timer keeps running if you close the tab.</li><li>Work on <b>paper</b>, with only your one double-sided A4 cheat sheet and a simple calculator.</li><li>No hints or solutions until you finish.</li><li>Write full derivations and justify each step. Partial credit is per 10-point part.</li><li>When you finish, you grade each part against the official-style solution. Your score is added as XP the first time.</li></ul>' +
        '<button class="btn primary big" data-go="start-exam" data-id="' + id + '">Start the ' + ex.minutes + '-minute timer</button></div></div>';
    }
    return '<div class="page"><div class="crumbs"><a href="#/exams">Exams</a> › Exam mode</div><h1>' + esc(ex.title) + '</h1>' +
      '<div class="card exam-bar"><span>⏱ Time left: <b class="exam-clock" data-exam-clock>--:--</b></span><button class="btn primary" data-go="finish-exam" data-id="' + id + '">Finish &amp; grade</button></div>' +
      examQuestionsHtml(ex, { exam: true }) +
      '<div class="center"><button class="btn primary big" data-go="finish-exam" data-id="' + id + '">Finish &amp; grade</button></div></div>';
  }

  let gradeState = {};
  function pageExamGrade(id) {
    const ex = C.exams.find((x) => x.id === id); if (!ex) return notFound();
    if (!gradeState[id]) gradeState[id] = {};
    const gs = gradeState[id];
    let h = '<div class="page"><div class="crumbs"><a href="#/exams">Exams</a> › Grade yourself</div><h1>Grade: ' + esc(ex.title) + '</h1>' +
      '<div class="card tip">For each part, compare your paper with the solution and give yourself points. Be strict: the instructor wants every step justified. Full = complete and correct. ¾ = small slip. ½ = right method but real gaps. ¼ = a correct start.</div>';
    ex.questions.forEach((q) => {
      h += '<section class="exam-q"><h2>Exercise ' + q.k + ' <span class="muted">(' + q.pts + ' pt)</span></h2>' + (q.intro ? '<div class="prose exam-intro">' + fmt(q.intro) + '</div>' : '');
      q.parts.forEach((pid) => {
        const p = C.probs[pid];
        const opts = [0, 0.25, 0.5, 0.75, 1].map((f) => {
          const v = Math.round(f * p.pts * 10) / 10;
          return '<button class="btn pts-btn' + (gs[pid] === v ? ' sel' : '') + '" data-go="pts" data-pid="' + pid + '" data-v="' + v + '" data-exam="' + id + '">' + v + '</button>';
        }).join('');
        h += '<div class="prob grading"><div class="prob-head"><span class="prob-num">(' + p.label.split('(')[1] + '</span><span class="chip pts">' + p.pts + ' pt</span></div>' +
          '<div class="prob-q">' + fmt(p.q) + '</div><div class="sol"><div class="sol-title">Solution</div>' + fmt(p.s) + '</div>' +
          '<div class="pts-row"><span>Your points:</span>' + opts + '</div></div>';
      });
      h += '</section>';
    });
    const total = Object.values(gs).reduce((a, b) => a + b, 0);
    const n = ex.questions.reduce((a, q) => a + q.parts.length, 0);
    h += '<div class="card exam-bar sticky-bottom"><span>Total: <b data-total>' + total + '</b> / ' + ex.total + ' · graded <span data-graded>' + Object.keys(gs).length + '</span>/' + n + ' parts</span><button class="btn primary" data-go="save-exam" data-id="' + id + '">Save score</button></div>';
    return h + '</div>';
  }

  function pageCheatsheet() {
    const cs = C.cheatsheet; if (!cs) return notFound();
    return '<div class="page wide cs-page"><div class="no-print"><h1>Cheat sheet</h1><div class="prose">' + fmt(cs.intro || '') + '</div>' +
      '<div class="toolbar"><button class="btn primary" data-go="print">🖨 Print (2 A4 pages)</button><span class="muted small cs-fit"></span></div></div>' +
      cs.pages.map((pg, i) => '<div class="sheet"><div class="sheet-inner">' + mathSafe(pg) + '</div><div class="sheet-num no-print">Side ' + (i + 1) + '</div></div>').join('') + '</div>';
  }

  function pageProgress() {
    const s = Store.me();
    const xp = Store.totalXP(); const lv = XP.level(xp);
    let h = '<div class="page wide"><h1>Progress</h1><div class="grid4">' +
      '<div class="card stat"><div class="stat-k">XP</div><div class="stat-v">' + xp + '</div><div class="muted small">Level ' + lv.n + ' · ' + esc(lv.name) + '</div>' + bar(lv.progress, 'xp') + '</div>' +
      '<div class="card stat"><div class="stat-k">Solved</div><div class="stat-v">' + Store.solved() + '</div><div class="muted small">' + Store.attempted() + ' attempted</div></div>' +
      '<div class="card stat"><div class="stat-k">Streak</div><div class="stat-v">🔥 ' + Store.streak() + '</div><div class="muted small">' + Object.keys(s.days).length + ' study days</div></div>' +
      '<div class="card stat"><div class="stat-k">Mastery</div><div class="stat-v">' + pct(Store.overallMastery()) + '</div>' + bar(Store.overallMastery()) + '</div></div>';

    // weakest topics
    const ranked = C.topicOrder.map((id) => [id, Store.mastery(id)]).sort((a, b) => a[1] - b[1]).slice(0, 5);
    h += '<h2>Focus next</h2><div class="card"><ol class="weak">' + ranked.map(([id, m]) => '<li><a href="#/learn/' + id + '">' + esc(topicTitle(id)) + '</a> <span class="mini">' + bar(m, 'mini') + pct(m) + '</span></li>').join('') + '</ol></div>';

    // topic table
    h += '<h2>By topic</h2><div class="card"><table class="tbl"><thead><tr><th>Topic</th><th>Mastery</th><th class="num">✓</th><th class="num">◐</th><th class="num">✗</th><th class="num">Total</th></tr></thead><tbody>';
    C.topicOrder.forEach((id) => {
      const ids = Store.topicProbIds(id);
      let g = 0, pa = 0, mi = 0;
      ids.forEach((pid) => { const a = s.attempts[pid]; if (a) { if (a.r === 'got') g++; else if (a.r === 'part') pa++; else mi++; } });
      const m = Store.mastery(id);
      h += '<tr><td><a href="#/learn/' + id + '">' + esc(topicTitle(id)) + '</a></td><td>' + bar(m, 'mini') + ' ' + pct(m) + '</td><td class="num">' + g + '</td><td class="num">' + pa + '</td><td class="num">' + mi + '</td><td class="num">' + ids.length + '</td></tr>';
    });
    h += '</tbody></table></div>';

    // exams
    h += '<h2>Exams</h2><div class="card"><table class="tbl"><thead><tr><th>Exam</th><th class="num">Best</th><th class="num">Attempts</th></tr></thead><tbody>' +
      C.exams.map((ex) => { const r = s.exams[ex.id]; return '<tr><td><a href="#/exams">' + esc(ex.title) + '</a></td><td class="num">' + (r && r.best != null ? r.best + ' / ' + ex.total : '—') + '</td><td class="num">' + (r ? r.runs.length : 0) + '</td></tr>'; }).join('') +
      '</tbody></table></div>';

    // retry queue
    const retry = Object.keys(s.attempts).filter((pid) => C.probs[pid] && s.attempts[pid].r !== 'got').sort((a, b) => s.attempts[a].t - s.attempts[b].t);
    h += '<h2>Retry queue <span class="muted small">(' + retry.length + ')</span></h2><div class="card">' +
      (retry.length ? '<ul class="retry">' + retry.map((pid) => { const p = C.probs[pid]; return '<li><a href="' + linkFor(pid) + '">' + esc(retryLabel(p)) + '</a> ' + Problem.badge(pid) + '</li>'; }).join('') + '</ul>' : '<p class="muted">Nothing to retry. Problems you mark Partly or Missed show up here.</p>') + '</div>';
    return h + '</div>';
  }
  function retryLabel(p) {
    if (p.kind === 'drill') { const i = drillList().indexOf(p.id); return 'Drill question ' + (i + 1); }
    if (p.kind === 'topic') { const t = C.topics[p.topic]; return 'Practice ' + (t.probIds.indexOf(p.id) + 1) + ' in ' + topicTitle(p.topic); }
    if (p.kind === 'hw') { const hw = C.hw.find((h) => h.probIds.includes(p.id)); return (hw ? hw.title : '') + ' · Problem ' + (hw ? hw.labels[p.id] : p.label); }
    if (p.kind === 'exam') { const ex = C.exams.find((e) => p.id.startsWith(e.id + '-')); return (ex ? ex.title : '') + ' · ' + p.label; }
    return p.id;
  }

  function pageLeaderboard() {
    const enabled = Store.Sync.enabled;
    let h = '<div class="page wide"><h1>Leaderboard</h1>';
    if (!enabled) {
      h += '<div class="card warnbox"><b>Shared leaderboard not set up yet.</b> Until it is, this shows only the players on this device. To share progress with friends, fill in <code>app/firebase-config.js</code> (steps in <code>app/README.md</code>, about 5 minutes).</div>';
    }
    h += '<div class="card"><table class="tbl lb"><thead><tr><th>#</th><th>Player</th><th class="num">XP</th><th class="num">This week</th><th class="num">Solved</th><th class="num">Mastery</th><th class="num">Best exam</th><th class="num">Streak</th><th>Active</th></tr></thead><tbody data-lb>' +
      lbRows(enabled ? [] : Store.localPlayers().map((p) => Store.summary(p))) + '</tbody></table></div>' +
      '<p class="muted small">XP: warm-up 5 · practice 10 · challenge 20 · exam-style 30. Partly earns half, Missed earns 1. +' + XP.DAY_BONUS + ' for each study day. Exam scores are added once.</p></div>';
    if (enabled) {
      setTimeout(() => {
        const unsub = Store.Sync.watchPlayers((rows, err) => {
          const tb = document.querySelector('[data-lb]'); if (!tb) return;
          if (err) { tb.innerHTML = '<tr><td colspan="9">Could not load the leaderboard: ' + esc(err.message) + '</td></tr>'; return; }
          tb.innerHTML = lbRows(rows.map((r) => Object.assign({}, r, { examBest: r.examBest < 0 ? null : r.examBest })));
        });
        cleanup.push(unsub);
      }, 0);
    }
    return h;
  }
  function lbRows(rows) {
    rows = rows.slice().sort((a, b) => b.xp - a.xp);
    const meName = Store.me() ? Store.me().name.toLowerCase() : '';
    if (!rows.length) return '<tr><td colspan="9" class="muted">Loading…</td></tr>';
    return rows.map((r, i) => '<tr class="' + (String(r.name).toLowerCase() === meName ? 'me' : '') + '"><td>' + (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1) + '</td><td><b>' + esc(r.name) + '</b> <span class="muted small">Lv ' + (r.level || XP.level(r.xp).n) + '</span></td><td class="num">' + r.xp + '</td><td class="num">' + (r.weekXp || 0) + '</td><td class="num">' + (r.solved || 0) + '</td><td class="num">' + (r.mastery || 0) + '%</td><td class="num">' + (r.examBest == null ? '—' : r.examBest + '%') + '</td><td class="num">' + (r.streak || 0) + '</td><td class="muted small">' + ago(r.lastActive) + '</td></tr>').join('');
  }
  function ago(t) {
    if (!t) return '';
    const m = Math.round((Date.now() - t) / 6e4);
    if (m < 2) return 'just now'; if (m < 60) return m + ' min ago';
    const h = Math.round(m / 60); if (h < 24) return h + ' h ago';
    return Math.round(h / 24) + ' d ago';
  }

  function pageSettings() {
    const s = Store.me();
    const others = Store.localPlayers().filter((p) => p.name !== s.name);
    return '<div class="page"><h1>Settings</h1>' +
      '<div class="card"><h3>Player</h3><p>You are <b>' + esc(s.name) + '</b>.</p>' +
      '<form class="row-form" data-form="switch"><input name="name" placeholder="Switch to / create player…" maxlength="24" required><button class="btn">Switch</button></form>' +
      (others.length ? '<p class="muted small">Other players on this device: ' + others.map((p) => '<a href="javascript:void 0" data-go="switch" data-name="' + esc(p.name) + '">' + esc(p.name) + '</a>').join(', ') + '</p>' : '') +
      '<p class="muted small">Switching loads that player\'s progress (from the cloud if the leaderboard is set up). Your own progress stays saved.</p></div>' +
      '<div class="card"><h3>Sync</h3><p>Shared leaderboard: <b>' + (Store.Sync.enabled ? 'connected (' + Store.Sync.status + ')' : 'not configured') + '</b></p>' + (Store.Sync.enabled ? '<button class="btn" data-go="sync-now">Sync now</button>' : '<p class="muted small">Fill in <code>app/firebase-config.js</code>. See <code>app/README.md</code>.</p>') + '</div>' +
      '<div class="card"><h3>Backup</h3><div class="btn-row"><button class="btn" data-go="export">⬇ Export progress (JSON)</button><label class="btn">⬆ Import progress<input type="file" accept="application/json,.json" data-import hidden></label></div></div>' +
      '<div class="card"><h3>Theme</h3><div class="btn-row"><button class="btn" data-go="theme" data-v="">Auto</button><button class="btn" data-go="theme" data-v="light">Light</button><button class="btn" data-go="theme" data-v="dark">Dark</button></div></div>' +
      '<div class="card danger"><h3>Reset</h3><p class="muted small">Erases all progress and XP for ' + esc(s.name) + '. The leaderboard copy is also overwritten.</p><button class="btn danger" data-go="reset">Reset my progress</button></div></div>';
  }

  function notFound() { return '<div class="page"><h1>Not found</h1><p><a href="#/">Go home</a></p></div>'; }

  /* ---------------- onboarding ---------------- */
  function showOnboarding() {
    const modal = document.getElementById('modal');
    const local = Store.localPlayers();
    modal.innerHTML = '<div class="modal-card"><h2>Welcome to STAT 220 Study 👋</h2><p>Pick a nickname. Your friends will see it on the leaderboard. There is no password: we all trust each other.</p>' +
      '<form data-form="onboard" class="row-form"><input name="name" placeholder="Nickname" maxlength="24" required autofocus pattern="[A-Za-z0-9 _\\-]{2,24}" title="2–24 letters, digits, spaces, _ or -"><button class="btn primary">Start</button></form>' +
      (local.length ? '<p class="muted small">On this device: ' + local.map((p) => '<a href="javascript:void 0" data-go="switch" data-name="' + esc(p.name) + '">' + esc(p.name) + '</a>').join(', ') + '</p>' : '') +
      '<p class="muted small" data-cloud-players></p></div>';
    modal.classList.remove('hidden');
    if (Store.Sync.enabled) {
      const unsub = Store.Sync.watchPlayers((rows) => {
        const el = modal.querySelector('[data-cloud-players]');
        if (el && rows && rows.length) el.innerHTML = 'Already playing: ' + rows.map((r) => '<a href="javascript:void 0" data-go="switch" data-name="' + esc(r.name) + '">' + esc(r.name) + '</a>').join(', ') + '. Pick yours to continue on this device.';
      });
      modal._unsub = unsub;
    }
  }
  async function choosePlayer(name) {
    name = String(name).trim().replace(/\s+/g, ' ');
    if (!/^[A-Za-z0-9 _-]{2,24}$/.test(name)) { toast('Use 2–24 letters, digits, spaces, _ or -'); return; }
    const k = Store.keyOf(name);
    const local = Store.localPlayers().find((p) => Store.keyOf(p.name) === k);
    let cloud = null;
    if (Store.Sync.enabled) cloud = await Store.Sync.fetch(name);
    if (cloud && (!local || (cloud.updated || 0) > (local.updated || 0))) Store.setPlayer(cloud.name || name, cloud);
    else Store.setPlayer(local ? local.name : name);
    const modal = document.getElementById('modal');
    if (modal._unsub) { modal._unsub(); modal._unsub = null; }
    modal.classList.add('hidden'); modal.innerHTML = '';
    toast('Playing as ' + Store.me().name);
    route();
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', (e) => {
    const sc = e.target.closest('[data-scroll]');
    if (sc) { const t = document.getElementById(sc.dataset.scroll); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const b = e.target.closest('[data-go]');
    if (!b) return;
    const go = b.dataset.go;
    if (go === 'random' || go === 'retry') {
      const s = Store.me();
      const pool = drillList().filter((pid) => go === 'random' ? !s.attempts[pid] : (s.attempts[pid] && s.attempts[pid].r !== 'got'));
      if (!pool.length) { toast(go === 'random' ? 'You have attempted every drill!' : 'No missed questions. Nice!'); return; }
      location.hash = '#/drills/' + pool[Math.floor(Math.random() * pool.length)];
    } else if (go === 'start-exam') { Store.startExam(b.dataset.id); route(); }
    else if (go === 'cancel-exam') { Store.cancelExam(); route(); }
    else if (go === 'finish-exam') { const id = b.dataset.id; Store.me().examRun = null; Store.save(); gradeState[id] = {}; location.hash = '#/exams/' + id + '/grade'; }
    else if (go === 'pts') {
      const gs = gradeState[b.dataset.exam] || (gradeState[b.dataset.exam] = {});
      gs[b.dataset.pid] = Number(b.dataset.v);
      b.parentElement.querySelectorAll('.pts-btn').forEach((x) => x.classList.toggle('sel', x === b));
      document.querySelector('[data-total]').textContent = Math.round(10 * Object.values(gs).reduce((a, c) => a + c, 0)) / 10;
      document.querySelector('[data-graded]').textContent = Object.keys(gs).length;
    } else if (go === 'save-exam') {
      const id = b.dataset.id; const ex = C.exams.find((x) => x.id === id); const gs = gradeState[id] || {};
      const n = ex.questions.reduce((a, q) => a + q.parts.length, 0);
      if (Object.keys(gs).length < n && !b.dataset.confirm) { b.dataset.confirm = '1'; b.textContent = 'Some parts ungraded (count as 0). Click to save'; return; }
      const score = Math.round(10 * Object.values(gs).reduce((a, c) => a + c, 0)) / 10;
      const gained = Store.finishExam(id, score, gs);
      delete gradeState[id];
      toast('Saved ' + score + '/' + ex.total + (gained ? ' · +' + gained + ' XP' : ''));
      location.hash = '#/exams';
    } else if (go === 'flag') {
      const on = Store.toggleFlag(b.dataset.key);
      document.querySelectorAll('.flag-btn').forEach((x) => { if (x.dataset.key === b.dataset.key) { x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); x.title = on ? 'Unflag' : 'Flag to revisit later'; } });
      toast(on ? 'Flagged ⚑' : 'Unflagged');
    } else if (go === 'print') window.print();
    else if (go === 'switch') choosePlayer(b.dataset.name);
    else if (go === 'export') {
      const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'stat220-progress-' + Store.me().name + '.json'; a.click();
    } else if (go === 'reset') {
      if (!b.dataset.confirm) { b.dataset.confirm = '1'; b.textContent = 'Really erase everything? Click again'; return; }
      Store.resetMe(); toast('Progress reset'); route();
    } else if (go === 'theme') { setTheme(b.dataset.v); }
    else if (go === 'sync-now') { Store.Sync.push().then(() => toast('Synced')); }
  });
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('[data-form]'); if (!f) return;
    e.preventDefault();
    const name = f.querySelector('[name=name]').value;
    choosePlayer(name);
  });
  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-import]')) {
      const file = e.target.files[0]; if (!file) return;
      file.text().then((txt) => { try { Store.importJSON(txt); toast('Imported'); route(); } catch (err) { toast('Import failed: ' + err.message); } });
    }
  });

  function setTheme(v) {
    try { if (v) localStorage.setItem('stat220.theme', v); else localStorage.removeItem('stat220.theme'); } catch (e) {}
    if (v) document.documentElement.setAttribute('data-theme', v); else document.documentElement.removeAttribute('data-theme');
  }
  document.getElementById('themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'light' : 'dark');
  });
  const sidebar = document.getElementById('sidebar'), scrim = document.getElementById('scrim');
  document.getElementById('menuBtn').addEventListener('click', () => { sidebar.classList.toggle('open'); scrim.classList.toggle('show'); });
  scrim.addEventListener('click', () => { sidebar.classList.remove('open'); scrim.classList.remove('show'); });

  /* ---------------- chrome (xp pill, timer) ---------------- */
  function updateChrome() {
    const s = Store.me();
    const pill = document.getElementById('xpPill');
    if (!s) { pill.textContent = ''; return; }
    const xp = Store.totalXP();
    pill.innerHTML = 'Lv ' + XP.level(xp).n + ' · <b>' + xp + '</b> XP';
    document.getElementById('flagCount').textContent = Store.flagCount() || '';
    document.getElementById('sidebarFoot').innerHTML = esc(s.name) + ' · 🔥 ' + Store.streak();
  }
  setInterval(tickTimer, 1000);
  function tickTimer() {
    const s = Store.me();
    const slot = document.getElementById('examTimerSlot');
    if (!s || !s.examRun) { slot.innerHTML = ''; return; }
    const ex = C.exams.find((x) => x.id === s.examRun.id);
    if (!ex) return;
    const left = s.examRun.start + ex.minutes * 6e4 - Date.now();
    const txt = left > 0 ? Math.floor(left / 6e4) + ':' + String(Math.floor((left % 6e4) / 1000)).padStart(2, '0') : '0:00';
    slot.innerHTML = '<a class="timer-pill' + (left < 10 * 6e4 ? ' low' : '') + '" href="#/exams/' + ex.id + '/run">⏱ ' + txt + '</a>';
    document.querySelectorAll('[data-exam-clock]').forEach((el) => { el.textContent = txt; });
    if (left <= 0) {
      s.examRun = null; Store.save(); gradeState[ex.id] = gradeState[ex.id] || {};
      toast("Time's up! Pens down. Now grade yourself.");
      location.hash = '#/exams/' + ex.id + '/grade';
    }
  }

  /* ---------------- router ---------------- */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    const q = {};
    (qs || '').split('&').filter(Boolean).forEach((kv) => { const [k, v] = kv.split('='); q[k] = decodeURIComponent(v || ''); });
    return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), q };
  }

  function route() {
    cleanup.forEach((f) => { try { f(); } catch (e) {} }); cleanup = [];
    sidebar.classList.remove('open'); scrim.classList.remove('show');
    if (!C.topicOrder.length || !C.exams.length) {
      main.innerHTML = '<div class="page"><div class="card warnbox"><h3>Some files did not load</h3><p>The browser is probably using an old cached copy. Press <b>Cmd+Shift+R</b> (Windows: Ctrl+Shift+R) to reload, or open this page with <code>?fresh=' + Date.now() + '</code> added to the address.</p></div></div>';
      return;
    }
    if (!Store.me()) { main.innerHTML = ''; showOnboarding(); updateChrome(); return; }
    const { parts, q } = parseHash();
    const [a, b, c] = parts;
    let html; let nav = a || 'home';
    if (!a) html = pageHome();
    else if (a === 'learn' && !b) html = pageLearn();
    else if (a === 'learn') html = pageTopic(b);
    else if (a === 'technique') { html = pageTechnique(); nav = 'learn'; }
    else if (a === 'flagged') html = pageFlagged(q);
    else if (a === 'drills' && !b) html = pageDrills(q);
    else if (a === 'drills') html = pageDrill(b);
    else if (a === 'homework' && !b) html = pageHomeworkList();
    else if (a === 'homework') html = pageHomework(b);
    else if (a === 'exams' && !b) html = pageExams();
    else if (a === 'exams' && c === 'practice') html = pageExamPractice(b);
    else if (a === 'exams' && c === 'grade') html = pageExamGrade(b);
    else if (a === 'exams') html = pageExamRun(b);
    else if (a === 'cheatsheet') html = pageCheatsheet();
    else if (a === 'progress') html = pageProgress();
    else if (a === 'leaderboard') html = pageLeaderboard();
    else if (a === 'settings') html = pageSettings();
    else html = notFound();
    main.innerHTML = html;
    renderMath(main);
    document.querySelectorAll('[data-nav]').forEach((el) => el.classList.toggle('active', el.dataset.nav === nav));
    updateChrome(); tickTimer();
    if (q.p) {
      const el = document.getElementById('p-' + q.p);
      if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 2000); }
    } else if (q.b) {
      const el = document.getElementById('b-' + q.b.replace(/[^a-z0-9]/gi, '-'));
      if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 2000); }
    } else if (q.t) {
      const el = document.getElementById('dg-' + q.t.replace('.', '-'));
      if (el) el.scrollIntoView({ block: 'start' });
    } else window.scrollTo(0, 0);
    if (a === 'cheatsheet') checkSheetFit();
    document.title = 'STAT 220 Study';
  }

  function checkSheetFit() {
    const out = [];
    const sizes = [];
    const over = (el) => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
    document.querySelectorAll('.sheet-inner').forEach((el, i) => {
      // Auto-fit: the largest font size (in 0.25pt steps) that still fits on one A4 side
      let size = 11;
      el.style.setProperty('--cs-size', size + 'pt');
      while (over(el) && size > 5.5) { size -= 0.25; el.style.setProperty('--cs-size', size + 'pt'); }
      sizes.push(size);
      if (over(el)) out.push('Side ' + (i + 1) + ' overflows');
    });
    const slot = document.querySelector('.cs-fit'); if (slot) slot.textContent = out.length ? '⚠ ' + out.join(', ') : 'Fits on exactly 2 A4 sides (font ' + sizes.join(' / ') + ' pt).';
    window.__sheetSizes = sizes;
    window.__sheetFit = out;
  }

  Store.on(updateChrome);
  window.addEventListener('hashchange', route);
  Store.Sync.init();
  if (Store.me() && Store.Sync.enabled) Store.Sync.pullNewer().then((changed) => { if (changed) route(); });
  route();

  return { toast, route, linkFor, drillList };
})();
