/* Progress storage: localStorage is the source of truth (several players can share a device),
 * mirrored to Firestore `players/{name.toLowerCase()}` when firebase-config.js is filled in. */
window.Store = (function () {
  const KEY = 'stat220.v1';
  const C = window.CONTENT;
  let root = loadRoot();
  const listeners = [];

  function loadRoot() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const r = JSON.parse(raw);
        if (r && r.players) { Object.values(r.players).forEach(fixup); return r; }
      }
    } catch (e) { console.warn('Could not read saved progress', e); }
    return { current: null, players: {} };
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(root)); } catch (e) { console.warn('Could not save progress', e); }
  }

  const keyOf = (name) => String(name).trim().toLowerCase();
  function blank(name) {
    return { name, created: Date.now(), updated: Date.now(), attempts: {}, events: [], days: {}, exams: {}, examRun: null, flags: {} };
  }
  function fixup(s) {
    s.attempts = s.attempts || {}; s.events = s.events || []; s.days = s.days || {};
    s.exams = s.exams || {}; s.flags = s.flags || {}; if (s.examRun === undefined) s.examRun = null;
    return s;
  }

  function me() { return root.current ? root.players[root.current] || null : null; }
  function localPlayers() { return Object.values(root.players); }

  function setPlayer(name, data) {
    const k = keyOf(name);
    if (data) root.players[k] = fixup(Object.assign({}, data, { name }));
    else if (!root.players[k]) root.players[k] = blank(name);
    root.current = k;
    save();
  }

  function save(opts) {
    const s = me();
    if (s) s.updated = Date.now();
    persist();
    if (!(opts && opts.noSync)) Sync.schedule();
    listeners.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
  }
  function on(f) { listeners.push(f); }

  function dayKey(t) {
    const d = new Date(t || Date.now());
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function addXP(s, xp, why) {
    if (xp <= 0) return 0;
    const now = Date.now();
    let total = xp;
    const dk = dayKey(now);
    if (!s.days[dk]) {
      s.days[dk] = 1;
      s.events.push([now, XP.DAY_BONUS, 'day']);
      total += XP.DAY_BONUS;
    }
    s.events.push([now, xp, why]);
    return total;
  }

  const RANK = { miss: 1, part: 2, got: 3 };
  // Record a result for a problem. Returns {gained, r, improved}.
  function record(pid, r) {
    const s = me(); if (!s) return { gained: 0 };
    const p = C.probs[pid]; if (!p) return { gained: 0 };
    const prev = s.attempts[pid];
    const xpNew = XP.forResult(p.lvl, r);
    const xpOld = prev ? prev.xp : 0;
    let gained = 0;
    if (!prev || RANK[r] >= RANK[prev.r]) {
      const delta = Math.max(0, xpNew - xpOld);
      gained = addXP(s, delta, pid);
      s.attempts[pid] = { r, xp: Math.max(xpNew, xpOld), t: Date.now(), n: (prev ? prev.n || 1 : 0) + 1 };
    } else {
      // Lower result than before: keep the best result but remember it was retried.
      s.attempts[pid] = Object.assign({}, prev, { t: Date.now(), n: (prev.n || 1) + 1, last: r });
    }
    save();
    return { gained, r, improved: !prev || RANK[r] > RANK[prev.r] };
  }

  // Flagged Learn blocks: flags[key] = time flagged
  function isFlagged(key) { const s = me(); return !!(s && s.flags[key]); }
  function toggleFlag(key) {
    const s = me(); if (!s) return false;
    if (s.flags[key]) delete s.flags[key]; else s.flags[key] = Date.now();
    save();
    return !!s.flags[key];
  }
  function flagCount() { const s = me(); return s ? Object.keys(s.flags).length : 0; }

  function status(pid) { const s = me(); return s && s.attempts[pid] ? s.attempts[pid].r : null; }

  function totalXP(s) { s = s || me(); return s ? s.events.reduce((a, e) => a + e[1], 0) : 0; }
  function weekXP(s) {
    s = s || me(); if (!s) return 0;
    const since = Date.now() - 7 * 864e5;
    return s.events.reduce((a, e) => a + (e[0] >= since ? e[1] : 0), 0);
  }
  function solved(s) { s = s || me(); return s ? Object.values(s.attempts).filter((a) => a.r === 'got').length : 0; }
  function attempted(s) { s = s || me(); return s ? Object.keys(s.attempts).length : 0; }
  function streak(s) {
    s = s || me(); if (!s) return 0;
    let n = 0; let t = Date.now();
    if (!s.days[dayKey(t)]) t -= 864e5; // streak still alive if you studied yesterday
    while (s.days[dayKey(t)]) { n++; t -= 864e5; }
    return n;
  }

  function topicProbIds(tid) {
    const t = C.topics[tid];
    return (t ? t.probIds : []).concat(C.drills[tid] || []);
  }
  function masteryOf(ids, s) {
    s = s || me();
    if (!ids.length) return 0;
    let sc = 0;
    ids.forEach((id) => {
      const a = s && s.attempts[id];
      if (a) sc += a.r === 'got' ? 1 : a.r === 'part' ? 0.5 : 0;
    });
    return sc / ids.length;
  }
  function mastery(tid, s) { return masteryOf(topicProbIds(tid), s); }
  function overallMastery(s) {
    const ids = C.topicOrder.flatMap(topicProbIds);
    return masteryOf(ids, s);
  }

  function examBest(s) {
    s = s || me(); if (!s) return null;
    let best = null;
    Object.keys(s.exams).forEach((id) => {
      const e = s.exams[id]; const ex = C.exams.find((x) => x.id === id);
      if (e.best != null && ex) { const pct = Math.round((100 * e.best) / ex.total); if (best == null || pct > best) best = pct; }
    });
    return best;
  }

  function startExam(id) { const s = me(); s.examRun = { id, start: Date.now() }; save(); }
  function cancelExam() { const s = me(); s.examRun = null; save(); }
  function finishExam(id, score, partScores) {
    const s = me();
    const e = s.exams[id] || (s.exams[id] = { best: null, runs: [], xp: false });
    e.runs.push({ t: Date.now(), score, parts: partScores });
    if (e.best == null || score > e.best) e.best = score;
    let gained = 0;
    if (!e.xp) { gained = addXP(s, Math.round(score), 'exam:' + id); e.xp = true; }
    s.examRun = null;
    save();
    return gained;
  }

  function exportJSON() { return JSON.stringify(me(), null, 1); }
  function importJSON(txt) {
    const d = JSON.parse(txt);
    if (!d || !d.attempts || !d.name) throw new Error('Not a STAT 220 progress file');
    setPlayer(d.name, d);
  }
  function resetMe() {
    const s = me(); if (!s) return;
    root.players[root.current] = blank(s.name);
    save();
  }

  function summary(s) {
    s = s || me();
    const xp = totalXP(s);
    return {
      name: s.name, xp, weekXp: weekXP(s), solved: solved(s), mastery: Math.round(100 * overallMastery(s)),
      examBest: examBest(s), streak: streak(s), level: XP.level(xp).n, lastActive: s.updated || Date.now(),
    };
  }

  /* ---------------- Firestore sync ---------------- */
  const Sync = {
    db: null, enabled: false, timer: null, status: 'off',
    init() {
      try {
        if (window.FIREBASE_CONFIG && window.firebase && window.FIREBASE_CONFIG.projectId) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
          this.db = firebase.firestore();
          this.enabled = true;
          this.status = 'ready';
        }
      } catch (e) { console.warn('Firebase init failed', e); this.status = 'error'; }
    },
    schedule() {
      if (!this.enabled || !me()) return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.push(), 1500);
    },
    async push() {
      const s = me(); if (!this.enabled || !s) return;
      const sum = summary(s);
      const doc = Object.assign({}, sum, {
        examBest: sum.examBest == null ? -1 : sum.examBest,
        updated: s.updated, data: JSON.stringify(s),
      });
      try {
        await this.db.collection('players').doc(keyOf(s.name)).set(doc);
        this.status = 'synced';
      } catch (e) { console.warn('Sync failed', e); this.status = 'error'; }
    },
    async fetch(name) {
      if (!this.enabled) return null;
      try {
        const snap = await this.db.collection('players').doc(keyOf(name)).get();
        if (!snap.exists) return null;
        const d = snap.data();
        return d.data ? JSON.parse(d.data) : null;
      } catch (e) { console.warn('Fetch failed', e); return null; }
    },
    watchPlayers(cb) {
      if (!this.enabled) return () => {};
      return this.db.collection('players').orderBy('xp', 'desc').limit(100).onSnapshot(
        (snap) => cb(snap.docs.map((d) => { const x = d.data(); delete x.data; return x; })),
        (err) => { console.warn('Leaderboard error', err); cb(null, err); }
      );
    },
    // On startup: if the cloud copy of the current player is newer, take it.
    async pullNewer() {
      const s = me(); if (!this.enabled || !s) return false;
      const cloud = await this.fetch(s.name);
      if (cloud && (cloud.updated || 0) > (s.updated || 0)) {
        root.players[root.current] = fixup(cloud);
        save({ noSync: true });
        return true;
      }
      if (!cloud) this.schedule();
      return false;
    },
  };

  return {
    me, localPlayers, setPlayer, save, on, record, status, totalXP, weekXP, solved, attempted, streak,
    mastery, masteryOf, overallMastery, topicProbIds, examBest, startExam, cancelExam, finishExam,
    exportJSON, importJSON, resetMe, summary, dayKey, Sync, keyOf, isFlagged, toggleFlag, flagCount,
  };
})();
