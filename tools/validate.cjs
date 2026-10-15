/* Validate all content: ids, required fields, answers parse & self-check, KaTeX renders.
 * Run: NODE_PATH=<dir with katex+mathjs node_modules> node app/tools/validate.cjs */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const katex = require('katex');
const math = require('mathjs');

const APP = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1].split('?')[0]).filter((s) => !s.startsWith('http'));
const mathProxy = { evaluate: (e, sc) => math.evaluate(e, Object.assign({}, sc || {})) };
const ctx = { console, math: mathProxy };
ctx.window = ctx;
vm.createContext(ctx);
const errors = [];
const stop = new Set(['js/xp.js', 'js/store.js', 'js/problem.js', 'js/app.js']);
for (const s of scripts) {
  if (stop.has(s)) continue;
  const f = path.join(APP, s);
  if (!fs.existsSync(f)) { errors.push('MISSING FILE ' + s); continue; }
  const src = fs.readFileSync(f, 'utf8');
  if (s.startsWith('content/') && /R`[^`]*\$\{/.test(src)) errors.push(s + ': contains "$ {" interpolation inside R`` (write "$ {" or "\\{")');
  if (process.env.VDEBUG) fs.appendFileSync("/tmp/vdbg.txt", "load " + s + "\n"); try { vm.runInContext(src, ctx, { filename: s }); } catch (e) { errors.push('LOAD ' + s + ': ' + e.message); }
}
// load macros from problem.js
const probSrc = fs.readFileSync(path.join(APP, 'js/problem.js'), 'utf8');
const macroSrc = probSrc.match(/window\.TEX_MACROS = (\{[\s\S]*?\});/)[1];
const macros = vm.runInNewContext('(' + macroSrc + ')');
const C = ctx.CONTENT;
const Check = ctx.Check;

function mathSegments(str) {
  const out = []; let i = 0; str = String(str || '');
  while (i < str.length) {
    if (str.startsWith('$$', i)) { const j = str.indexOf('$$', i + 2); if (j < 0) { out.push({ err: 'unclosed $$' }); break; } out.push({ tex: str.slice(i + 2, j), display: true }); i = j + 2; continue; }
    if (str.startsWith('\\[', i)) { const j = str.indexOf('\\]', i + 2); if (j < 0) { out.push({ err: 'unclosed \\[' }); break; } out.push({ tex: str.slice(i + 2, j), display: true }); i = j + 2; continue; }
    if (str[i] === '$') { const j = str.indexOf('$', i + 1); if (j < 0) { out.push({ err: 'unclosed $ near: ' + str.slice(i, i + 40) }); break; } out.push({ tex: str.slice(i + 1, j), display: false }); i = j + 1; continue; }
    i++;
  }
  return out;
}
function checkTex(where, str) {
  if (process.env.VDEBUG) fs.appendFileSync('/tmp/vdbg.txt', 'tex ' + where + '\n');
  if (/[\x08\x0b\x0c\t\r]/.test(String(str || ''))) errors.push(where + ': control character (a TeX backslash was eaten by a normal JS string: use R``)');
  for (const seg of mathSegments(str)) {
    if (seg.err) { errors.push(where + ': ' + seg.err); continue; }
    try { katex.renderToString(seg.tex, { displayMode: seg.display, macros: Object.assign({}, macros), throwOnError: true, strict: 'ignore' }); }
    catch (e) { errors.push(where + ': KaTeX ' + e.message.slice(0, 160) + ' in: ' + seg.tex.slice(0, 80)); }
  }
}

const counts = {};
for (const [id, p] of Object.entries(C.probs)) {
  if (process.env.VDEBUG) fs.appendFileSync('/tmp/vdbg.txt', 'prob ' + id + '\n');
  if (!p.q) errors.push(id + ': empty question');
  if (!p.s) errors.push(id + ': empty solution');
  if (!(p.lvl >= 1 && p.lvl <= 4)) errors.push(id + ': bad lvl');
  if (!C.topics[p.topic]) errors.push(id + ': unknown topic ' + p.topic);
  checkTex(id + '.q', p.q); checkTex(id + '.s', p.s); p.h.forEach((h, i) => checkTex(id + '.h' + i, h));
  if (p.a) p.a.parts.forEach((pt, i) => {
    checkTex(id + '.label', pt.label);
    if (pt.kind === 'choice') { if (!(pt.v >= 0 && pt.v < pt.choices.length)) errors.push(id + ': bad choice index'); return; }
    try {
      if (pt.kind === 'num') { const v = Check.evalAt(pt.v, {}); if (!isFinite(v)) errors.push(id + ': answer not finite'); }
      else { Check.samplePoints(pt.vars, 3).forEach((sc) => { const v = Check.evalAt(pt.v, sc); if (!isFinite(v)) throw new Error('not finite at ' + JSON.stringify(sc)); }); }
      const r = Check.part(pt, pt.v); if (!r.ok) errors.push(id + ': answer does not self-check ' + JSON.stringify(r));
    } catch (e) { errors.push(id + ': answer eval error ' + e.message + ' [' + pt.v + ']'); }
  });
  const key = p.kind + ':' + p.topic; counts[key] = (counts[key] || 0) + 1;
}
for (const t of Object.values(C.topics)) t.blocks.forEach((b, i) => { if (b.html) checkTex('topic ' + t.id + ' block ' + i, b.html); if (b.title) checkTex('topic ' + t.id + ' title', b.title); });
if (C.technique) C.technique.blocks.forEach((b, i) => { if (typeof b === 'string') checkTex('technique ' + i, b); else if (b.html) checkTex('technique ' + i, b.html); });
if (C.cheatsheet) C.cheatsheet.pages.forEach((pg, i) => checkTex('cheatsheet p' + (i + 1), pg));
for (const ex of C.exams) ex.questions.forEach((q) => checkTex(ex.id + ' intro ' + q.k, q.intro));
for (const hw of C.hw) checkTex(hw.id + ' intro', hw.intro);

console.log('Topics:', C.topicOrder.length, ' Problems:', Object.keys(C.probs).length, ' HW sets:', C.hw.length, ' Exams:', C.exams.length);
const rows = C.topicOrder.map((t) => t.padEnd(5) + ' topic ' + String(counts['topic:' + t] || 0).padStart(3) + '  drill ' + String(counts['drill:' + t] || 0).padStart(3) + '  hw ' + String(counts['hw:' + t] || 0).padStart(2) + '  exam ' + String(counts['exam:' + t] || 0).padStart(2));
if (process.argv.includes('--counts')) console.log(rows.join('\n'));
const tot = (k) => Object.entries(counts).filter(([a]) => a.startsWith(k)).reduce((s, [, v]) => s + v, 0);
console.log('Totals: topic', tot('topic:'), ' drill', tot('drill:'), ' hw', tot('hw:'), ' exam', tot('exam:'));
if (errors.length) { console.log('\n' + errors.length + ' ERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('OK — no errors'); process.exit(0);
