/* Content-authoring helpers. Content files call TOPIC / DRILLS / HW / EXAM etc.
 * Write prose with R`...` (String.raw) so TeX backslashes survive.
 * Never write the two characters "$" "{" next to each other inside R`` (that is JS interpolation) — use "$ {" or "\{".
 */
window.R = String.raw;

window.CONTENT = {
  topics: {},        // id -> topic
  topicOrder: [],    // ids in order
  drills: {},        // topicId -> [problem ids]
  hw: [],            // homework sets
  exams: [],         // exams
  probs: {},         // problem id -> problem
  technique: null,
  cheatsheet: null,
  plan: null,
};

(function () {
  const C = window.CONTENT;

  // Normalize an answer spec into {parts:[{label, kind, v, vars, choices}]} or null.
  function normPart(label, val, vars) {
    if (val && typeof val === 'object' && Array.isArray(val.choice)) {
      return { label, kind: 'choice', choices: val.choice, v: val.v };
    }
    if (val && typeof val === 'object' && val.expr !== undefined) {
      return { label, kind: 'expr', v: String(val.expr), vars: val.vars || {} };
    }
    if (vars) return { label, kind: 'expr', v: String(val), vars };
    return { label, kind: 'num', v: String(val) };
  }
  function normAnswer(a) {
    if (a === undefined || a === null) return null;
    if (typeof a === 'string' || typeof a === 'number') return { parts: [normPart('', a)] };
    if (Array.isArray(a)) {
      return {
        parts: a.map((x) => {
          if (Array.isArray(x)) return normPart(x[0], x[1], x[2]);
          return normPart('', x);
        }),
      };
    }
    if (typeof a === 'object') {
      if (a.choice) return { parts: [normPart('', a)] };
      if (a.expr !== undefined) return { parts: [normPart('', a)] };
    }
    console.error('Bad answer spec', a);
    return null;
  }

  function mkProb(o, id, topic, kind) {
    if (C.probs[id]) console.error('Duplicate problem id', id);
    const p = {
      id,
      topic: o.topic || topic,
      kind,
      lvl: o.lvl || 2,
      q: o.q || '',
      h: o.h ? (Array.isArray(o.h) ? o.h : [o.h]) : [],
      a: normAnswer(o.a),
      s: o.s || '',
      src: o.src || 'original',
      pts: o.pts,
    };
    C.probs[id] = p;
    return p;
  }
  window.__mkProb = mkProb;

  // Block constructors for topic pages
  window.P = (o) => Object.assign({ _prob: true }, o);
  const box = (kind) => (title, html) => ({ type: 'box', kind, title, html });
  window.DEF = box('def');
  window.THM = box('thm');
  window.EX = box('ex');      // worked example
  window.NOTE = box('note');
  window.WARN = box('warn');
  window.H = (text) => ({ type: 'h', text });

  window.TOPIC = function (meta, blocks) {
    const t = Object.assign({ blocks: [], probIds: [] }, meta);
    blocks.forEach((b) => {
      if (typeof b === 'string') t.blocks.push({ type: 'html', html: b });
      else if (b && b._prob) {
        const p = mkProb(b, 't' + meta.id + '-' + b.k, meta.id, 'topic');
        t.blocks.push({ type: 'prob', id: p.id });
        t.probIds.push(p.id);
      } else t.blocks.push(b);
    });
    if (C.topics[meta.id]) console.error('Duplicate topic', meta.id);
    C.topics[meta.id] = t;
    C.topicOrder.push(meta.id);
  };

  window.DRILLS = function (topicId, list) {
    const ids = C.drills[topicId] || [];
    list.forEach((o) => ids.push(mkProb(o, 'd' + topicId + '-' + o.k, topicId, 'drill').id));
    C.drills[topicId] = ids;
  };

  // HW({id:'hw1', title, intro}, [{k:'A1', topic:'1.5', ...}])
  window.HW = function (meta, probs) {
    const set = Object.assign({ probIds: [], labels: {} }, meta);
    probs.forEach((o) => {
      if (o.ref) {
        // Reuse an identical problem from a topic page (shared progress/XP)
        if (!C.probs[o.ref]) console.error('HW ref to unknown problem', o.ref);
        set.probIds.push(o.ref);
        set.labels[o.ref] = o.k;
        return;
      }
      const p = mkProb(o, meta.id + '-' + o.k.replace(/[^A-Za-z0-9]/g, ''), o.topic, 'hw');
      p.label = o.k;
      set.labels[p.id] = o.k;
      set.probIds.push(p.id);
    });
    C.hw.push(set);
  };

  // EXAM({id, title, minutes, intro, original:true}, [{k:'1', pts:40, intro, parts:[{k:'a', pts:10, topic, q, h, a, s}]}])
  window.EXAM = function (meta, questions) {
    const ex = Object.assign({ minutes: 80, questions: [] }, meta);
    questions.forEach((q) => {
      const qq = { k: q.k, pts: q.pts, intro: q.intro || '', parts: [] };
      q.parts.forEach((pt) => {
        const p = mkProb(Object.assign({ lvl: 4 }, pt), meta.id + '-' + q.k + pt.k, pt.topic, 'exam');
        p.pts = pt.pts;
        p.label = q.k + '(' + pt.k + ')';
        p.examIntro = qq.intro;
        qq.parts.push(p.id);
      });
      ex.questions.push(qq);
    });
    ex.total = ex.questions.reduce((s, q) => s + q.pts, 0);
    C.exams.push(ex);
  };

  window.TECHNIQUE = (o) => { o.blocks = o.blocks.map((b) => (typeof b === 'string' ? { type: 'html', html: b } : b)); C.technique = o; };
  window.CHEATSHEET = (o) => { C.cheatsheet = o; };
  window.STUDYPLAN = (o) => { C.plan = o; };
})();
