/* Problem widget: prompt, answer box (auto-check), progressive hints, solution, self-grade. */

// Light prose formatter: blank-line separated blocks become <p> unless they start with an HTML tag. **bold** supported.
// Escape <, >, & inside $...$ / $$...$$ so the HTML parser can't eat math like "$0<y<x$".
window.mathSafe = function (s) {
  return String(s).replace(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g, (m) => m.replace(/&(?![a-z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
};
window.fmt = function (s) {
  if (!s) return '';
  return mathSafe(s)
    .trim()
    .split(/\n\s*\n/)
    .map((b) => {
      b = b.trim();
      b = emph(b);
      return /^<(p|div|ul|ol|table|h\d|blockquote|figure|svg|details|pre|section)\b/i.test(b) ? b : '<p>' + b + '</p>';
    })
    .join('\n');
};
window.fmtInline = function (s) { return emph(mathSafe(String(s || ''))); };
function emph(s) {
  return s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(^|[\s(>"])\*([^*\s$][^*$]*?)\*(?=[\s.,;:!?)<"]|$)/g, '$1<i>$2</i>');
}

window.renderMath = function (el) {
  if (!el || !window.renderMathInElement) return;
  try {
    renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
      ],
      macros: window.TEX_MACROS,
      throwOnError: false,
      ignoredClasses: ['no-math'],
    });
  } catch (e) { console.warn('Math render error', e); }
};

window.TEX_MACROS = {
  '\\E': '\\mathbb{E}',
  '\\P': '\\mathbb{P}',
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\var': '\\operatorname{var}',
  '\\Var': '\\operatorname{var}',
  '\\cov': '\\operatorname{cov}',
  '\\corr': '\\operatorname{corr}',
  '\\sd': '\\operatorname{sd}',
  '\\indep': '\\perp\\!\\!\\!\\perp',
  '\\iid': '\\overset{\\text{iid}}{\\sim}',
  '\\Bin': '\\operatorname{Bin}',
  '\\Ber': '\\operatorname{Ber}',
  '\\Pois': '\\operatorname{Poisson}',
  '\\Unif': '\\operatorname{Unif}',
  '\\Exp': '\\operatorname{Exp}',
  '\\Gam': '\\operatorname{Gamma}',
  '\\Bet': '\\operatorname{Beta}',
  '\\Geom': '\\operatorname{Geom}',
  '\\dd': '\\,\\mathrm{d}',
  '\\1': '\\mathbb{1}',
};

window.Problem = (function () {
  const C = window.CONTENT;
  const STATUS = { got: ['✓ Got it', 'got'], part: ['◐ Partly', 'part'], miss: ['✗ Missed', 'miss'] };

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function badge(pid) {
    const r = Store.status(pid);
    if (!r) return '<span class="status-badge none">Not done</span>';
    return '<span class="status-badge ' + STATUS[r][1] + '">' + STATUS[r][0] + '</span>';
  }

  function answerArea(p) {
    if (!p.a) return '';
    const parts = p.a.parts.map((pt, i) => {
      const lab = pt.label ? '<label class="ans-label" for="in-' + p.id + '-' + i + '">' + fmtInline(pt.label) + '</label>' : '<label class="ans-label" for="in-' + p.id + '-' + i + '">Answer</label>';
      if (pt.kind === 'choice') {
        return '<div class="ans-row">' + lab + '<div class="choice-group" data-part="' + i + '">' +
          pt.choices.map((c, j) => '<button type="button" class="choice" data-act="choose" data-part="' + i + '" data-val="' + j + '">' + fmtInline(c) + '</button>').join('') + '</div><span class="ans-mark" data-mark="' + i + '"></span></div>';
      }
      const ph = pt.kind === 'expr' ? 'expression in ' + Object.keys(pt.vars).join(', ') : 'e.g. 3/8';
      return '<div class="ans-row">' + lab + '<input class="ans-in no-math" id="in-' + p.id + '-' + i + '" data-part="' + i + '" autocomplete="off" spellcheck="false" placeholder="' + ph + '"><span class="ans-mark" data-mark="' + i + '"></span></div>';
    }).join('');
    return '<div class="ans-area">' + parts +
      '<div class="ans-foot"><button type="button" class="btn primary" data-act="check">Check answer</button>' +
      '<details class="fmt-help"><summary>Answer format</summary><div>Type plain math: <code>3/8</code>, <code>0.375</code>, <code>e^3</code>, <code>sqrt(2)/pi</code>, <code>1 - exp(-2)</code>, <code>2*(1-x)</code>, <code>x^2/4</code>. Greek is fine (β or <code>beta</code>, λ or <code>lambda</code>). Decimals need ≥ 3 significant figures.</div></details>' +
      '<span class="ans-feedback"></span></div></div>';
  }

  // opts: {label, exam:boolean (hide hints/answer), showSource:true}
  function html(pid, opts) {
    opts = opts || {};
    const p = C.probs[pid];
    if (!p) return '<div class="prob missing">Missing problem ' + esc(pid) + '</div>';
    const lvlName = XP.LEVEL_NAMES[p.lvl];
    const pts = p.pts ? '<span class="chip pts">' + p.pts + ' pt</span>' : '';
    const hints = p.h.map((h, i) => '<div class="hint hidden" data-hint="' + i + '"><span class="hint-tag">Hint ' + (i + 1) + '</span>' + fmt(h) + '</div>').join('');
    const src = p.src && opts.showSource !== false ? '<div class="src">Source: ' + esc(p.src) + '</div>' : '';
    return '<div class="prob lvl' + p.lvl + '" id="p-' + p.id + '" data-pid="' + p.id + '" data-hints="0">' +
      '<div class="prob-head"><span class="prob-num">' + (opts.label || 'Problem') + '</span>' +
      (opts.noLevel ? '' : '<span class="chip lvl l' + p.lvl + '">' + lvlName + '</span>') + pts +
      '<span class="spacer"></span><span class="badge-slot">' + badge(pid) + '</span></div>' +
      (opts.intro ? '<div class="prob-intro">' + fmt(opts.intro) + '</div>' : '') +
      '<div class="prob-q">' + fmt(p.q) + '</div>' +
      (opts.exam ? '' : answerArea(p)) +
      (opts.exam ? '' :
        '<div class="prob-actions">' +
        (p.h.length ? '<button type="button" class="btn" data-act="hint">💡 Hint <span class="hint-count">(' + p.h.length + ')</span></button>' : '') +
        '<button type="button" class="btn" data-act="sol">📖 Show solution</button></div>') +
      '<div class="hints">' + hints + '</div>' +
      '<div class="sol hidden"><div class="sol-title">Solution</div>' + fmt(p.s) + src + '</div>' +
      (opts.exam ? '' :
        '<div class="grade hidden"><span>How did you do?</span>' +
        '<button type="button" class="btn g-got" data-act="grade" data-r="got">✓ Got it</button>' +
        '<button type="button" class="btn g-part" data-act="grade" data-r="part">◐ Partly</button>' +
        '<button type="button" class="btn g-miss" data-act="grade" data-r="miss">✗ Missed</button></div>') +
      '</div>';
  }

  function refreshBadge(el) { const slot = el.querySelector('.badge-slot'); if (slot) slot.innerHTML = badge(el.dataset.pid); }

  function grade(el, r) {
    const res = Store.record(el.dataset.pid, r);
    refreshBadge(el);
    el.querySelectorAll('[data-act=grade]').forEach((b) => b.classList.toggle('sel', b.dataset.r === r));
    if (res.gained > 0) App.toast('+' + res.gained + ' XP');
    else App.toast('Saved');
    document.dispatchEvent(new CustomEvent('problem-graded', { detail: { pid: el.dataset.pid, r } }));
  }

  function onClick(e) {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const el = btn.closest('.prob');
    if (!el) return;
    const act = btn.dataset.act;
    const p = C.probs[el.dataset.pid];
    if (act === 'hint') {
      const n = Number(el.dataset.hints);
      const h = el.querySelector('[data-hint="' + n + '"]');
      if (h) { h.classList.remove('hidden'); el.dataset.hints = n + 1; }
      const left = p.h.length - n - 1;
      btn.querySelector('.hint-count').textContent = left > 0 ? '(' + left + ' more)' : '(all shown)';
      if (left <= 0) btn.disabled = true;
    } else if (act === 'sol') {
      const sol = el.querySelector('.sol');
      const showing = !sol.classList.contains('hidden');
      sol.classList.toggle('hidden', showing);
      btn.innerHTML = showing ? '📖 Show solution' : '📖 Hide solution';
      const g = el.querySelector('.grade'); if (g) g.classList.remove('hidden');
    } else if (act === 'grade') {
      grade(el, btn.dataset.r);
    } else if (act === 'choose') {
      btn.parentElement.querySelectorAll('.choice').forEach((b) => b.classList.toggle('sel', b === btn));
      btn.parentElement.dataset.sel = btn.dataset.val;
    } else if (act === 'check') {
      check(el, p);
    }
  }

  function check(el, p) {
    let allOk = true, parseErr = false, empty = false;
    p.a.parts.forEach((spec, i) => {
      let input;
      if (spec.kind === 'choice') input = el.querySelector('.choice-group[data-part="' + i + '"]').dataset.sel;
      else input = el.querySelector('input[data-part="' + i + '"]').value;
      if (input === undefined || String(input).trim() === '') { empty = true; allOk = false; setMark(el, i, null); return; }
      const r = Check.part(spec, input);
      if (r.msg === 'parse') parseErr = true;
      if (!r.ok) allOk = false;
      setMark(el, i, r.ok);
    });
    const fb = el.querySelector('.ans-feedback');
    if (allOk) {
      fb.className = 'ans-feedback ok';
      fb.textContent = '✓ Correct!';
      const prev = Store.status(p.id);
      if (prev !== 'got') grade(el, 'got');
      const g = el.querySelector('.grade'); if (g) g.classList.remove('hidden');
    } else {
      fb.className = 'ans-feedback bad';
      fb.textContent = empty ? 'Fill in every box first.' : parseErr ? "Couldn't read that — see “Answer format”." : '✗ Not quite. Re-check your work, or take a hint.';
    }
  }
  function setMark(el, i, ok) {
    const m = el.querySelector('[data-mark="' + i + '"]');
    if (!m) return;
    m.textContent = ok == null ? '' : ok ? '✓' : '✗';
    m.className = 'ans-mark ' + (ok == null ? '' : ok ? 'ok' : 'bad');
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('ans-in')) {
      const el = e.target.closest('.prob');
      check(el, C.probs[el.dataset.pid]);
    }
  });

  return { html, badge, refreshBadge };
})();
