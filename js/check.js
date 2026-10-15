/* Answer checking with math.js: numbers (fractions, e, pi, sqrt…) and expressions (compared at random points). */
window.Check = (function () {
  const GREEK = { 'α': 'alpha', 'β': 'beta', 'λ': 'lambda', 'μ': 'mu', 'σ': 'sigma', 'θ': 'theta', 'π': 'pi', 'ε': 'eps', 'ν': 'nu', 'ψ': 'psi', 'φ': 'phi' };

  function clean(s) {
    s = String(s).trim();
    s = s.replace(/[αβλμσθπενψφ]/g, (c) => ' ' + GREEK[c] + ' ');
    s = s.replace(/[−–—]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/√/g, 'sqrt');
    s = s.replace(/²/g, '^2').replace(/³/g, '^3');
    s = s.replace(/\bln\b/g, 'log');
    s = s.replace(/\*\*/g, '^');
    s = s.replace(/,(?=\d{3}\b)/g, ''); // 1,000 -> 1000
    // decimal comma "0,25" -> "0.25" (only when it looks like a single number)
    if (/^-?\d+,\d+$/.test(s)) s = s.replace(',', '.');
    return s.trim();
  }

  function evalAt(expr, scope) {
    const v = math.evaluate(clean(expr), Object.assign({}, scope));
    if (typeof v === 'number') return v;
    if (v && typeof v.re === 'number' && Math.abs(v.im) < 1e-12) return v.re;
    if (v && typeof v.valueOf === 'function' && typeof v.valueOf() === 'number') return v.valueOf();
    throw new Error('Not a number');
  }

  function close(u, e, rel) {
    if (!isFinite(e)) return u === e;
    const tol = (rel || 2e-3) * Math.abs(e) + 1e-9;
    return Math.abs(u - e) <= Math.max(tol, 1e-9);
  }

  // Deterministic pseudo-random so a check is reproducible
  function rng(seed) { let x = seed || 123456789; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 1e6) / 1e6; }; }

  function samplePoints(vars, n) {
    const r = rng(987654321);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const sc = {};
      Object.keys(vars).forEach((k) => {
        const [lo, hi, kind] = vars[k];
        let v = lo + (hi - lo) * (0.05 + 0.9 * r());
        if (kind === 'int') v = Math.round(v);
        sc[k] = v;
      });
      pts.push(sc);
    }
    return pts;
  }

  // Returns {ok:boolean, msg?:string}
  function part(spec, input) {
    if (spec.kind === 'choice') {
      return { ok: Number(input) === Number(spec.v) };
    }
    if (input === undefined || String(input).trim() === '') return { ok: false, msg: 'empty' };
    try {
      if (spec.kind === 'num') {
        const e = evalAt(spec.v, {});
        const u = evalAt(input, {});
        // If user typed a short decimal, allow rounding to the digits they gave (min 3 significant digits)
        const m = String(input).trim().match(/^-?\d*\.(\d+)$/);
        let rel = 2e-3;
        if (m) {
          const absTol = 0.5 * Math.pow(10, -m[1].length);
          const sig = Math.abs(e) >= 1e-12 ? Math.floor(Math.log10(Math.abs(e))) : 0;
          // require at least 3 significant figures
          if (m[1].length + sig + 1 >= 3 && Math.abs(u - e) <= absTol + 1e-12) return { ok: true };
        }
        return { ok: close(u, e, rel) };
      }
      // expression
      const pts = samplePoints(spec.vars, 6);
      for (const sc of pts) {
        const e = evalAt(spec.v, sc);
        const u = evalAt(input, sc);
        if (!close(u, e, 1e-6)) return { ok: false };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, msg: 'parse', err: String(err.message || err) };
    }
  }

  return { part, clean, evalAt, samplePoints };
})();
