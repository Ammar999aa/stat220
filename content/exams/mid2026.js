EXAM({ id: 'mid2026', title: 'Midterm 1 — Fall 2026 (real exam)', summary: 'This year\'s actual Midterm 1: two diagnostic tests (Bayes, covariance), a triangle joint PDF with U = Y/X, Bernoulli MGF + Chebyshev vs Hoeffding.',
  intro: R`October 21, 2026. 80 minutes. One double-sided A4 sheet of handwritten formulae and a simple calculator were allowed. Solutions follow the instructor's own handwritten solutions, with the steps written out in full. The instructor's note on the paper says Exercise 3 took him about 14 minutes.` }, [
  { k: '1', pts: 40, intro: R`A diagnostic procedure uses two tests for the same disease. Let $D$ denote the event that a person has the disease, with $P(D) = 0.10$. Let $T_i = 1$ if test $i$ is positive and $T_i = 0$ otherwise, for $i = 1, 2$. Each test has sensitivity $0.90$ and false-positive probability $0.20$; that is,
$$P(T_i = 1\mid D) = 0.90,\qquad P(T_i = 1\mid D^c) = 0.20,\qquad i = 1,2.$$
**Assume that $T_1$ and $T_2$ are independent conditional on $D$, and also independent conditional on $D^c$.**`, parts: [
    { k: 'a', pts: 10, topic: '1.6', q: R`Compute $P(T_1 = 1)$ and $P(D\mid T_1 = 1)$.`,
      h: [R`$\{D, D^c\}$ is a partition: law of total probability for $P(T_1 = 1)$.`, R`Then Bayes: $P(D\mid T_1 = 1) = \frac{P(T_1 = 1\mid D)P(D)}{P(T_1 = 1)}$.`],
      a: [[R`$P(T_1 = 1)$`, '0.27'], [R`$P(D\mid T_1 = 1)$`, '1/3']],
      s: R`**Law of total probability** (partition $D$, $D^c$):
$$P(T_1 = 1) = P(T_1 = 1\mid D)P(D) + P(T_1 = 1\mid D^c)P(D^c) = 0.9\cdot0.1 + 0.2\cdot0.9 = 0.09 + 0.18 = 0.27.$$
**Bayes' theorem:**
$$P(D\mid T_1 = 1) = \frac{P(T_1 = 1\mid D)P(D)}{P(T_1 = 1)} = \frac{0.9\cdot0.1}{0.27} = \frac{0.09}{0.27} = \frac13\approx0.333.$$
Most positives come from the large healthy group: $0.18$ of the population is a false positive versus $0.09$ a true positive.` },
    { k: 'b', pts: 10, topic: '1.6', q: R`Compute $P(T_1 = 1, T_2 = 1)$ and $P(D\mid T_1 = T_2 = 1)$. Compare the result to the answer in (a); what do you conclude?`,
      h: [R`Condition on $D$ and $D^c$ first. Inside each, the tests are independent, so the joint probability factorizes: $P(T_1 = T_2 = 1\mid D) = 0.9^2$.`, R`Then Bayes again, with the event $\{T_1 = T_2 = 1\}$ in place of $\{T_1 = 1\}$.`],
      a: [[R`$P(T_1 = 1, T_2 = 1)$`, '0.117'], [R`$P(D\mid T_1 = T_2 = 1)$`, '0.081/0.117']],
      s: R`**Total probability, then conditional independence:**
$$P(T_1 = 1, T_2 = 1) = P(T_1 = T_2 = 1\mid D)P(D) + P(T_1 = T_2 = 1\mid D^c)P(D^c)$$
$$= P(T_1 = 1\mid D)P(T_2 = 1\mid D)P(D) + P(T_1 = 1\mid D^c)P(T_2 = 1\mid D^c)P(D^c)\quad(T_1\indep T_2\text{ given }D\text{ and given }D^c)$$
$$= 0.9^2\cdot0.1 + 0.2^2\cdot0.9 = 0.081 + 0.036 = 0.117.$$
**Bayes:**
$$P(D\mid T_1 = T_2 = 1) = \frac{P(T_1 = T_2 = 1\mid D)P(D)}{P(T_1 = T_2 = 1)} = \frac{0.9^2\cdot0.1}{0.117} = \frac{0.081}{0.117}\approx0.692.$$
**Conclusion.** With one test, the probability of truly having the disease given a positive test is only $33.3\%$. With two positive tests it rises to $69.2\%$, so using both tests is much more informative.` },
    { k: 'c', pts: 10, topic: '3.5', q: R`Are $T_1$ and $T_2$ independent *unconditionally* (i.e., after marginalizing over $D$)? Justify your answer and compute $\cov(T_1, T_2)$.`,
      h: [R`Independence needs $P(T_1 = 1, T_2 = 1) = P(T_1 = 1)P(T_2 = 1)$. You have both sides from (a) and (b).`, R`For indicators, $E(T_1T_2) = P(T_1 = 1, T_2 = 1)$ and $E(T_i) = P(T_i = 1)$.`],
      a: [['independent?', { choice: ['Yes', 'No'], v: 1 }], [R`$\cov(T_1,T_2)$`, '0.0441']],
      s: R`We have $P(T_1 = T_2 = 1) = 0.117$, but $P(T_1 = 1) = P(T_2 = 1) = 0.27$ (by symmetry, the same computation as in (a)), so
$$P(T_1 = 1, T_2 = 1) = 0.117\ \ne\ 0.27^2 = 0.0729 = P(T_1 = 1)P(T_2 = 1).$$
Hence $T_1$ and $T_2$ are **not** independent unconditionally. Conditional independence does not imply independence: both tests "know" about $D$, so a positive first test makes $D$ more likely, which in turn makes a positive second test more likely.

Since $T_1, T_2$ are indicators, $E(T_1T_2) = P(T_1 = T_2 = 1)$ and $E(T_i) = P(T_i = 1)$:
$$\cov(T_1, T_2) = E(T_1T_2) - E(T_1)E(T_2) = 0.117 - 0.27^2 = 0.117 - 0.0729 = 0.0441.$$
It is positive, matching the intuition above.` },
    { k: 'd', pts: 10, topic: '3.5', q: R`Let $N = T_1 + T_2$ be the number of positive tests. Derive $E(N)$ and $\var(N)$.`,
      h: [R`Linearity of expectation always works, even for dependent variables.`, R`Variance of a sum of **dependent** variables: $\var(T_1) + \var(T_2) + 2\cov(T_1,T_2)$. Each $T_i\sim\Ber(0.27)$.`],
      a: [[R`$E(N)$`, '0.54'], [R`$\var(N)$`, '0.4824']],
      s: R`**Mean** (linearity):
$$E(N) = E(T_1) + E(T_2) = 0.27 + 0.27 = 0.54.$$
**Variance.** $T_i\sim\Ber(0.27)$, so $\var(T_i) = 0.27(1 - 0.27) = 0.1971$. The tests are dependent (part (c)), so the covariance term must be kept:
$$\var(N) = \var(T_1) + \var(T_2) + 2\cov(T_1,T_2) = 0.1971 + 0.1971 + 2\cdot0.0441 = 0.1971 + 0.1971 + 0.0882 = 0.4824.$$
(Forgetting the covariance would give $0.3942$, the answer for independent tests.)` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X$ and $Y$ be two continuous random variables with joint probability density function
$$f_{X,Y}(x,y) = \begin{cases}cx, & 0<y<x<1,\\ 0, & \text{otherwise,}\end{cases}$$
where $c>0$ is a constant.`, parts: [
    { k: 'a', pts: 10, topic: '2.6', q: R`Find $c$ such that $f_{X,Y}$ is a valid joint density, and derive the marginal densities $f_X$ and $f_Y$ (including their supports).`,
      h: [R`Draw the support: the triangle below the diagonal $y = x$ in the unit square. For fixed $x$, $y$ runs over $(0, x)$; for fixed $y$, $x$ runs over $(y, 1)$.`, R`$\int_0^1\int_0^xcx\dd y\dd x = \int_0^1cx^2\dd x$.`],
      a: [['$c$', '3'], ['$f_X(x)$', '3*x^2', { x: [0.05, 0.95] }], ['$f_Y(y)$', '3/2*(1-y^2)', { y: [0.05, 0.95] }]],
      s: R`$f_{X,Y}(x,y)\ge0$ for all $x,y$ requires $c\ge0$. The domain is the triangle $D = \{0<y<x<1\}$ (below the diagonal $y = x$). Normalization:
$$\iint f_{X,Y}(x,y)\dd x\dd y = \int_0^1\int_0^xcx\dd y\dd x = \int_0^1\Big[cxy\Big]_0^x\dd x = \int_0^1cx^2\dd x = \left[\frac c3x^3\right]_0^1 = \frac c3 = 1\iff c = 3.$$
**Marginals:**
$$f_X(x) = \int f_{X,Y}(x,y)\dd y = \int_0^x3x\dd y = \Big[3xy\Big]_0^x = 3x^2,\quad x\in[0,1].$$
$$f_Y(y) = \int f_{X,Y}(x,y)\dd x = \int_y^13x\dd x = \left[\frac32x^2\right]_y^1 = \frac32(1 - y^2),\quad y\in[0,1].$$` },
    { k: 'b', pts: 10, topic: '3.6', q: R`Derive the conditional density $f_{Y|X}(y\mid x)$ and $E(Y\mid X = x)$. Use the law of iterated expectation to calculate $E(Y)$.`,
      h: [R`$f_{Y|X}(y\mid x) = \frac{f_{X,Y}(x,y)}{f_X(x)}$. Recognize the distribution: it does not depend on $y$.`, R`$E(Y) = E[E(Y\mid X)]$, and you know $f_X$ from (a).`],
      a: [[R`$E(Y\mid X = x)$`, 'x/2', { x: [0.05, 0.95] }], [R`$E(Y)$`, '3/8']],
      s: R`For $x\in(0,1)$:
$$f_{Y|X}(y\mid x) = \frac{f_{X,Y}(x,y)}{f_X(x)} = \frac{3x}{3x^2} = \frac1x,\quad y\in[0,x],$$
so $Y\mid X = x\sim\Unif(0,x)$, and therefore
$$E(Y\mid X = x) = \frac x2.$$
**Iterated expectation:**
$$E(Y) = E\big[E(Y\mid X)\big] = E\left(\frac X2\right) = \frac12E(X) = \frac12\int_0^1x\cdot3x^2\dd x = \frac32\int_0^1x^3\dd x = \frac32\left[\frac14x^4\right]_0^1 = \frac32\cdot\frac14 = \frac38.$$
(Check with the marginal: $\int_0^1y\cdot\frac32(1-y^2)\dd y = \frac32\left(\frac12 - \frac14\right) = \frac38$. ✓)` },
    { k: 'c', pts: 10, topic: '2.10', q: R`Define $U = Y/X$. Using an appropriate change of variables, derive the joint density $f_{X,U}(x,u)$. Find the marginal distribution of $U$ and determine whether $X$ and $U$ are independent.`,
      h: [R`Write $f_{X,U}(x,u) = f_{U|X}(u\mid x)f_X(x)$. Find the conditional CDF $P(U\le u\mid X = x) = P(Y\le ux\mid X = x)$ using (b).`, R`$Y\mid X = x\sim\Unif(0,x)$, so $P(Y\le ux\mid X = x) = \frac{ux}{x} = u$ for $u\in[0,1]$.`, R`(Alternative: the transformation $(x,y)\mapsto(x, u = y/x)$ has inverse $y = ux$ and Jacobian $|\partial(x,y)/\partial(x,u)| = x$.)`],
      a: [[R`$f_{X,U}(x,u)$`, '3*x^2', { x: [0.05, 0.95], u: [0.05, 0.95] }], [R`$f_U(u)$`, '1', { u: [0.05, 0.95] }], ['independent?', { choice: ['Yes', 'No'], v: 0 }]],
      s: R`Use $f_{X,U}(x,u) = f_{U|X}(u\mid x)\,f_X(x)$. For $x\in(0,1)$ and $u\in[0,1]$:
$$P(U\le u\mid X = x) = P\left(\frac YX\le u\ \Big|\ X = x\right) = P(Y\le ux\mid X = x) = \frac{ux}{x} = u,$$
because $Y\mid X = x\sim\Unif(0,x)$ by (b). Differentiating in $u$: $f_{U|X}(u\mid x) = 1$, $u\in[0,1]$. Hence
$$f_{X,U}(x,u) = 1\cdot3x^2 = 3x^2,\quad(x,u)\in[0,1]^2.$$
(Same result by the Jacobian method: $y = ux$, $\left|\frac{\partial(x,y)}{\partial(x,u)}\right| = x$, so $f_{X,U}(x,u) = f_{X,Y}(x, ux)\cdot x = 3x\cdot x = 3x^2$ on $0<ux<x<1$, i.e. $0<u<1$, $0<x<1$.)

**Marginal of $U$:**
$$f_U(u) = \int_0^1f_{X,U}(x,u)\dd x = \int_0^13x^2\dd x = 1,\quad u\in[0,1],$$
so $U\sim\Unif(0,1)$.

**Independence.** $f_{X,U}(x,u) = 3x^2\cdot1 = f_X(x)f_U(u)$ for all $x,u$ (on the product support $[0,1]^2$), so $X$ and $U$ are **independent**. Note the contrast: $X$ and $Y$ are dependent (triangular support), but $X$ and the ratio $Y/X$ are independent.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be independent and identically distributed $\Ber(p)$ random variables, where $0<p<1$, and define
$$\bar X_n = \frac1n\sum_{i=1}^nX_i.$$`, parts: [
    { k: 'a', pts: 10, topic: '3.7', q: R`Derive the moment generating functions of $X_1$ and $\bar X_n$. Use these results to obtain $E(\bar X_n)$ and $\var(\bar X_n)$.`,
      h: [R`$\psi_{X_1}(t) = E(e^{tX_1})$ is a two-term sum.`, R`$\psi_{\bar X_n}(t) = \prod_iE\left(e^{\frac tnX_i}\right) = \left[\psi_{X_1}\left(\frac tn\right)\right]^n$ by independence, then identical distribution.`, R`$E(\bar X_n) = \psi'(0)$, $E(\bar X_n^2) = \psi''(0)$; use the product rule for the second derivative.`],
      a: [[R`$\psi_{X_1}(t)$`, '1-p+p*exp(t)', { p: [0.1, 0.9], t: [-1, 1] }], [R`$\psi_{\bar X_n}(t)$`, '(1-p+p*exp(t/n))^n', { p: [0.1, 0.9], n: [1, 8, 'int'], t: [-1, 1] }], [R`$\var(\bar X_n)$`, 'p*(1-p)/n', { p: [0.1, 0.9], n: [1, 20, 'int'] }]],
      s: R`$$\psi_{X_1}(t) = E(e^{tX_1}) = e^{t\cdot1}p + e^{t\cdot0}(1-p) = pe^t + (1-p) = 1 - p(1 - e^t).$$
$$\psi_{\bar X_n}(t) = E\left(e^{t\bar X_n}\right) = E\left(\prod_{i=1}^ne^{\frac tnX_i}\right) \underset{\text{indep.}}{=} \prod_{i=1}^nE\left(e^{\frac tnX_i}\right) \underset{\text{iid}}{=} \left(\psi_{X_1}\left(\tfrac tn\right)\right)^n = \left(1 - p\left(1 - e^{t/n}\right)\right)^n.$$
**First moment:**
$$\psi'_{\bar X_n}(t) = n\left(1 - p(1-e^{t/n})\right)^{n-1}\cdot p\,e^{t/n}\cdot\frac1n = p\left(1 - p(1-e^{t/n})\right)^{n-1}e^{t/n},$$
so $E(\bar X_n) = \psi'_{\bar X_n}(0) = p$.

**Second moment** (product rule):
$$\psi''_{\bar X_n}(t) = \frac{p^2(n-1)}{n}\left(1 - p(1-e^{t/n})\right)^{n-2}e^{2t/n} + \frac pn\left(1-p(1-e^{t/n})\right)^{n-1}e^{t/n},$$
so $E(\bar X_n^2) = \psi''_{\bar X_n}(0) = \frac{p^2(n-1)}{n} + \frac pn$.

**Variance:**
$$\var(\bar X_n) = E(\bar X_n^2) - E(\bar X_n)^2 = \frac{p^2(n-1)}{n} + \frac pn - p^2 = \frac{p^2n - p^2 + p - p^2n}{n} = \frac{p(1-p)}{n}.$$` },
    { k: 'b', pts: 10, topic: '4.2', q: R`Using $p(1-p)\le1/4$, derive an upper bound for $P(|\bar X_n - p|>0.1)$ using Chebyshev's inequality. Obtain another upper bound using Hoeffding's inequality. Evaluate both bounds for $n = 200$ and compare them.`,
      h: [R`Chebyshev: $P(|\bar X_n - p|>\varepsilon)\le\frac{\var(\bar X_n)}{\varepsilon^2}$, with $\var(\bar X_n)$ from (a).`, R`Hoeffding for Bernoulli means: $P(|\bar X_n - p|>\varepsilon)\le2e^{-2n\varepsilon^2}$.`],
      a: [['Chebyshev bound at n = 200', '0.125'], ['Hoeffding bound at n = 200', '2*exp(-4)']],
      s: R`**Chebyshev** (with $\var(\bar X_n) = \frac{p(1-p)}n$ from (a)):
$$P(|\bar X_n - p|>0.1)\le\frac{\var(\bar X_n)}{0.1^2} = \frac{100\,p(1-p)}{n}\le\frac{25}{n}\quad\forall p,$$
using $p(1-p)\le\frac14$.

**Hoeffding:**
$$P(|\bar X_n - p|>0.1)\le2e^{-2n\cdot0.1^2} = 2e^{-n/50}.$$
**With $n = 200$:**
- Chebyshev: $\frac{25}{200} = 0.125$;
- Hoeffding: $2e^{-4}\approx0.0366$.

Hoeffding's bound is much tighter than Chebyshev's here.` },
    { k: 'c', pts: 10, topic: '4.2', q: R`Determine the *smallest integer $n$ sufficient to guarantee*, using (i) Hoeffding's inequality and (ii) the bound from Chebyshev's inequality in (b), that
$$P(|\bar X_n - p|>0.1)\le0.05$$
for *every* $p\in(0,1)$.`,
      h: [R`Set each bound from (b) $\le0.05$ and solve for $n$. Round **up**.`, R`Hoeffding: $2e^{-n/50}\le0.05\iff n\ge50\log(40)$.`],
      a: [['(i) Hoeffding n', '185'], ['(ii) Chebyshev n', '500']],
      s: R`We want $P(|\bar X_n - p|>0.1)\le0.05$. It suffices that the bound is $\le0.05$:

- **Chebyshev:** $\frac{25}{n}\le0.05\iff n\ge\frac{25}{0.05} = 500$.
- **Hoeffding:** $2e^{-n/50}\le0.05\iff n\ge-50\log\left(\frac{0.05}{2}\right) = 50\log\left(\frac{2}{0.05}\right) = 50\log40\approx184.44$.

So the smallest integers are $n = 185$ (Hoeffding) and $n = 500$ (Chebyshev). Both bounds hold for every $p$, because we used the worst case $p(1-p)\le\frac14$ for Chebyshev, and Hoeffding does not depend on $p$ at all.` },
  ] },
]);
