/* XP rules and levels. Kept deliberately simple — it's a friendly honour system. */
window.XP = (function () {
  const BASE = { 1: 5, 2: 10, 3: 20, 4: 30 };
  const DAY_BONUS = 10;
  const LEVEL_NAMES = { 1: 'Warm-up', 2: 'Practice', 3: 'Challenge', 4: 'Exam-style' };

  function forResult(lvl, r) {
    const b = BASE[lvl] || 10;
    if (r === 'got') return b;
    if (r === 'part') return Math.floor(b / 2);
    if (r === 'miss') return 1;
    return 0;
  }

  const LEVELS = [
    [0, 'Lost in Ω'],
    [60, 'Event Rookie'],
    [150, 'Axiom Apprentice'],
    [300, 'Conditional Thinker'],
    [500, 'Bayes Believer'],
    [750, 'CDF Climber'],
    [1050, 'Density Tamer'],
    [1400, 'Jacobian Juggler'],
    [1800, 'Marginal Master'],
    [2300, 'Lazy Statistician'],
    [2900, 'Expectation Expert'],
    [3600, 'Variance Wrangler'],
    [4400, 'MGF Mage'],
    [5300, 'Chebyshev Champion'],
    [6300, 'Hoeffding Hero'],
    [7500, 'Jensen Genius'],
    [9000, 'Midterm Slayer'],
    [11000, 'Wasserman Whisperer'],
  ];

  function level(xp) {
    let i = 0;
    while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
    const cur = LEVELS[i], next = LEVELS[i + 1];
    return {
      n: i + 1,
      name: cur[1],
      floor: cur[0],
      next: next ? next[0] : null,
      progress: next ? (xp - cur[0]) / (next[0] - cur[0]) : 1,
    };
  }

  return { forResult, level, DAY_BONUS, LEVEL_NAMES, BASE };
})();
