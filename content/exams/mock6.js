EXAM({ id: 'mock6', title: 'Mock Midterm 2 — B', summary: 'Original Midterm 2 mock: estimating an exponential rate (shrinkage, bias of 1/X̄, delta-method CI), the empirical CDF on a small data set, and X̄² via CMT and the delta method.',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30). Assumed scope: Chapters 5–7 (convergence, estimation, empirical CDF) and HW7–8, with earlier tools used along the way. 80 minutes, 40/30/30 format. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n$ be iid $\Exp(\beta)$ with PDF $f(x) = \frac1\beta e^{-x/\beta}$, $x>0$ (so $E(X_1) = \beta$, $\var(X_1) = \beta^2$). Let $\lambda = 1/\beta$ be the rate. Recall from Midterm 1 that $\bar X_n\sim\Gam(n, \beta/n)$, and that if $Y\sim\Gam(\alpha, s)$ then $E(Y^k) = s^k\frac{\Gamma(\alpha+k)}{\Gamma(\alpha)}$ whenever $\alpha + k>0$.`, parts: [
    { k: 'a', pts: 10, topic: '6.2', q: R`Show that $\bar X_n$ is unbiased for $\beta$ and give its MSE. Then consider estimators $c\bar X_n$, $c>0$. Find the $c^*$ that minimizes $\operatorname{MSE}(c\bar X_n)$, and the minimal MSE.`,
      h: [R`$\operatorname{MSE}(c\bar X_n) = \var(c\bar X_n) + \operatorname{bias}(c\bar X_n)^2 = c^2\frac{\beta^2}{n} + (c-1)^2\beta^2$.`, R`Differentiate in $c$ and set to zero.`],
      a: [[R`$\operatorname{MSE}(\bar X_n)$`, 'beta^2/n', { beta: [0.5, 3], n: [1, 30, 'int'] }], [R`$c^*$`, 'n/(n+1)', { n: [1, 30, 'int'] }], ['minimal MSE', 'beta^2/(n+1)', { beta: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`$E(\bar X_n) = \frac1n\sum E(X_i) = \beta$, so the bias is $0$. By independence, $\var(\bar X_n) = \frac{\beta^2}n$, so $\operatorname{MSE}(\bar X_n) = \frac{\beta^2}{n}$.

For $c\bar X_n$: $\operatorname{bias} = (c-1)\beta$ and $\var = c^2\frac{\beta^2}n$, so
$$m(c) := \operatorname{MSE}(c\bar X_n) = \beta^2\left[\frac{c^2}{n} + (c-1)^2\right],\qquad m'(c) = \beta^2\left[\frac{2c}{n} + 2(c-1)\right] = 0\iff c^* = \frac{n}{n+1}.$$
$m''>0$, so this is a minimum. Plugging in:
$$m(c^*) = \beta^2\left[\frac{n}{(n+1)^2} + \frac{1}{(n+1)^2}\right] = \frac{\beta^2}{n+1}<\frac{\beta^2}{n}.$$
A slightly **biased** estimator beats the unbiased one in MSE: shrinking towards 0 cuts the variance by more than it adds in squared bias.` },
    { k: 'b', pts: 10, topic: '6.2', q: R`Consider $\hat\lambda = 1/\bar X_n$ for $n\ge2$. Compute $E(\hat\lambda)$ and its bias. Propose an unbiased estimator of $\lambda$.`,
      h: [R`Use $E(Y^{-1}) = s^{-1}\frac{\Gamma(\alpha-1)}{\Gamma(\alpha)} = \frac{1}{s(\alpha-1)}$ with $\alpha = n$, $s = \beta/n$.`],
      a: [[R`$E(\hat\lambda)$`, 'n*lambda/(n-1)', { lambda: [0.3, 3], n: [2, 30, 'int'] }], ['bias', 'lambda/(n-1)', { lambda: [0.3, 3], n: [2, 30, 'int'] }]],
      s: R`With $\bar X_n\sim\Gam(n, \beta/n)$ and $k = -1$ (valid since $n - 1>0$):
$$E\left(\frac{1}{\bar X_n}\right) = \left(\frac\beta n\right)^{-1}\frac{\Gamma(n-1)}{\Gamma(n)} = \frac n\beta\cdot\frac{1}{n-1} = \frac{n}{n-1}\lambda.$$
So $\operatorname{bias}(\hat\lambda) = \frac{n}{n-1}\lambda - \lambda = \frac{\lambda}{n-1}>0$. ($\hat\lambda$ is biased, even though $\bar X_n$ is unbiased for $\beta$: $t\mapsto1/t$ is not linear. By Jensen, $E(1/\bar X_n)>1/E(\bar X_n)$.)

An unbiased estimator: $\tilde\lambda = \frac{n-1}{n}\cdot\frac{1}{\bar X_n} = \frac{n-1}{\sum_{i=1}^nX_i}$, since $E(\tilde\lambda) = \frac{n-1}{n}\cdot\frac{n}{n-1}\lambda = \lambda$.` },
    { k: 'c', pts: 10, topic: '6.3', q: R`For $n\ge3$ compute $\operatorname{MSE}(\hat\lambda)$ and conclude that $\hat\lambda$ is consistent. Is $1/X_1$ a consistent estimator of $\lambda$? Does it even have a finite mean?`,
      h: [R`$E(\bar X_n^{-2}) = \left(\frac\beta n\right)^{-2}\frac{\Gamma(n-2)}{\Gamma(n)} = \frac{n^2\lambda^2}{(n-1)(n-2)}$.`, R`$\operatorname{MSE} = E(\hat\lambda^2) - 2\lambda E(\hat\lambda) + \lambda^2$. Factor $n^2 + n - 2 = (n+2)(n-1)$.`, R`$E(1/X_1) = \int_0^\infty\frac1x\frac1\beta e^{-x/\beta}\dd x$: look near $x = 0$.`],
      a: [['MSE', 'lambda^2*(n+2)/((n-1)*(n-2))', { lambda: [0.3, 3], n: [3, 30, 'int'] }], [R`$1/X_1$ consistent?`, { choice: ['Yes', 'No'], v: 1 }]],
      s: R`$$E(\hat\lambda^2) = \left(\frac\beta n\right)^{-2}\frac{\Gamma(n-2)}{\Gamma(n)} = \frac{n^2\lambda^2}{(n-1)(n-2)}.$$
$$\operatorname{MSE}(\hat\lambda) = E(\hat\lambda^2) - 2\lambda E(\hat\lambda) + \lambda^2 = \lambda^2\left[\frac{n^2}{(n-1)(n-2)} - \frac{2n}{n-1} + 1\right] = \lambda^2\frac{n^2 - 2n(n-2) + (n-1)(n-2)}{(n-1)(n-2)}.$$
The numerator is $n^2 - 2n^2 + 4n + n^2 - 3n + 2 = n + 2$, so
$$\operatorname{MSE}(\hat\lambda) = \frac{(n+2)\lambda^2}{(n-1)(n-2)}\xrightarrow[n\to\infty]{}0.$$
MSE $\to0$ implies $\hat\lambda\xrightarrow{\text{qm}}\lambda$, hence $\hat\lambda\xrightarrow{P}\lambda$: **consistent**. (Also directly: $\bar X_n\xrightarrow{P}\beta$ by the WLLN, and $t\mapsto1/t$ is continuous at $\beta>0$.)

**$1/X_1$.** Its distribution does not depend on $n$, so it cannot concentrate at $\lambda$: $P(|1/X_1 - \lambda|>\varepsilon)$ is a fixed positive number for small $\varepsilon$. It is **not consistent**. Its mean is infinite:
$$E\left(\frac{1}{X_1}\right) = \int_0^\infty\frac1x\cdot\frac1\beta e^{-x/\beta}\dd x\ \ge\ \frac{e^{-1}}{\beta}\int_0^\beta\frac{\dd x}{x} = +\infty.$$` },
    { k: 'd', pts: 10, topic: '6.4', q: R`Use the delta method to find the limiting distribution of $\sqrt n(\hat\lambda - \lambda)$. With $n = 50$ and $\bar x = 2$, give an approximate 95% confidence interval for $\lambda$ ($\Phi^{-1}(0.975) = 1.96$).`,
      h: [R`CLT: $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0,\beta^2)$. Then $g(t) = 1/t$, $g'(\beta) = -1/\beta^2$.`, R`$\widehat{\operatorname{se}}(\hat\lambda) = \hat\lambda/\sqrt n$.`],
      a: [['asymptotic variance', 'lambda^2', { lambda: [0.3, 3] }], ['lower', '0.5-1.96*0.5/sqrt(50)'], ['upper', '0.5+1.96*0.5/sqrt(50)']],
      s: R`**CLT:** $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0,\beta^2)$. **Delta method** with $g(t) = \frac1t$, differentiable at $\beta>0$ with $g'(\beta) = -\frac1{\beta^2}\ne0$:
$$\sqrt n\left(\frac1{\bar X_n} - \frac1\beta\right)\xrightarrow{D}N\left(0,\ \frac{1}{\beta^4}\beta^2\right) = N(0,\lambda^2).$$
So $\hat\lambda\approx N(\lambda, \lambda^2/n)$, and the plug-in standard error is $\widehat{\operatorname{se}} = \hat\lambda/\sqrt n$.

**Numbers.** $\hat\lambda = 1/2 = 0.5$, $\widehat{\operatorname{se}} = 0.5/\sqrt{50}\approx0.0707$:
$$0.5\pm1.96\cdot0.0707 = 0.5\pm0.1386 = (0.361,\ 0.639).$$` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X_1,\dots,X_n\iid F$ (an unknown CDF) and let $\hat F_n(x) = \frac1n\sum_{i=1}^n\1(X_i\le x)$ be the empirical CDF. You observe $n = 8$ values:
$$1.2,\ 3.5,\ 0.4,\ 2.8,\ 5.1,\ 2.2,\ 0.9,\ 4.0.$$`, parts: [
    { k: 'a', pts: 10, topic: '7.1', q: R`Compute $\hat F_8(1)$ and $\hat F_8(2.5)$, and the plug-in estimates of the mean $\mu = \int x\dd F(x)$, the variance $\sigma^2 = \int(x-\mu)^2\dd F(x)$, and the median $F^{-1}(1/2) = \inf\{x: F(x)\ge\frac12\}$.`,
      h: [R`Sort the data first: $0.4, 0.9, 1.2, 2.2, 2.8, 3.5, 4.0, 5.1$.`, R`Plug-in: replace $F$ by $\hat F_n$, which puts mass $\frac1n$ on each data point. So the plug-in variance divides by $n$, not $n-1$.`, R`$\hat F_8(x)\ge\frac12$ first happens at the 4th smallest value.`],
      a: [[R`$\hat F_8(1)$`, '0.25'], [R`$\hat F_8(2.5)$`, '0.5'], ['plug-in mean', '2.5125'], ['plug-in variance', '2.35609375'], ['plug-in median', '2.2']],
      s: R`Sorted: $0.4, 0.9, 1.2, 2.2, 2.8, 3.5, 4.0, 5.1$.
- $\hat F_8(1) = \frac{\#\{X_i\le1\}}{8} = \frac28 = 0.25$ (values $0.4, 0.9$).
- $\hat F_8(2.5) = \frac48 = 0.5$ (values $0.4, 0.9, 1.2, 2.2$).

$\hat F_n$ is the distribution putting mass $\frac18$ on each observation, so the plug-in estimators are:
$$\hat\mu = \int x\dd\hat F_n(x) = \frac18\sum x_i = \frac{20.1}{8} = 2.5125,\qquad\hat\sigma^2 = \frac18\sum(x_i - \hat\mu)^2 = \frac18\sum x_i^2 - \hat\mu^2 = \frac{69.35}{8} - 2.5125^2\approx2.3561.$$
**Median:** $\hat F_8^{-1}(\frac12) = \inf\{x:\hat F_8(x)\ge\frac12\}$. $\hat F_8$ jumps to $\frac48 = \frac12$ at $x = 2.2$, so the plug-in median is $2.2$ (the 4th order statistic; note it is not the "average of the two middle values" convention).` },
    { k: 'b', pts: 10, topic: '7.1', q: R`For a fixed $x$, find $E(\hat F_n(x))$ and $\var(\hat F_n(x))$, show that $\hat F_n(x)$ is consistent, and give the limiting distribution of $\sqrt n\big(\hat F_n(x) - F(x)\big)$. What is the largest possible value of $\var(\hat F_n(x))$ over all $F$?`,
      h: [R`$Y_i = \1(X_i\le x)$ are iid $\Ber(F(x))$, so $n\hat F_n(x)\sim\Bin(n, F(x))$.`, R`$p(1-p)\le\frac14$.`],
      a: [['variance', 'F*(1-F)/n', { F: [0.05, 0.95], n: [1, 50, 'int'] }], ['largest variance', '1/(4*n)', { n: [1, 50, 'int'] }]],
      s: R`Let $Y_i = \1(X_i\le x)$. The $Y_i$ are iid (functions of iid variables) and $\Ber(p)$ with $p = P(X_i\le x) = F(x)$. Hence $n\hat F_n(x) = \sum Y_i\sim\Bin(n, F(x))$ and
$$E(\hat F_n(x)) = F(x)\ \ (\text{unbiased}),\qquad\var(\hat F_n(x)) = \frac{F(x)(1 - F(x))}{n}.$$
**Consistency:** $\operatorname{MSE} = 0 + \frac{F(x)(1-F(x))}{n}\to0$, so $\hat F_n(x)\xrightarrow{P}F(x)$ (or: WLLN applied to the $Y_i$).

**CLT:** the $Y_i$ have finite variance, so
$$\sqrt n\big(\hat F_n(x) - F(x)\big)\xrightarrow{D}N\big(0,\ F(x)(1 - F(x))\big).$$
**Largest variance:** $p(1-p)\le\frac14$ with equality at $p = \frac12$, so $\var(\hat F_n(x))\le\frac{1}{4n}$, reached at the median of $F$.` },
    { k: 'c', pts: 10, topic: '6.4', q: R`Let $\theta = F(3) - F(1) = P(1<X\le3)$ and $\hat\theta = \hat F_8(3) - \hat F_8(1)$. Using the data, compute $\hat\theta$, its estimated standard error, and the approximate 95% Wald interval ($\Phi^{-1}(0.975) = 1.96$). Then compute the half-width of the 95% Hoeffding interval and comment.`,
      h: [R`$\hat\theta = \frac1n\sum\1(1<X_i\le3)$, a mean of iid $\Ber(\theta)$ variables.`, R`$\widehat{\operatorname{se}} = \sqrt{\hat\theta(1-\hat\theta)/n}$. Hoeffding half-width: $\varepsilon_n = \sqrt{\frac{1}{2n}\log\frac2\alpha}$.`],
      a: [[R`$\hat\theta$`, '0.375'], [R`$\widehat{\operatorname{se}}$`, 'sqrt(0.375*0.625/8)'], ['Wald lower', '0.375-1.96*sqrt(0.375*0.625/8)'], ['Wald upper', '0.375+1.96*sqrt(0.375*0.625/8)'], ['Hoeffding half-width', 'sqrt(log(40)/16)']],
      s: R`$\hat\theta = \hat F_8(3) - \hat F_8(1) = \frac{\#\{1<x_i\le3\}}{8} = \frac38 = 0.375$ (the values $1.2, 2.2, 2.8$).

$\hat\theta = \frac1n\sum Z_i$ with $Z_i = \1(1<X_i\le3)$ iid $\Ber(\theta)$. So $\var(\hat\theta) = \frac{\theta(1-\theta)}{n}$, and
$$\widehat{\operatorname{se}} = \sqrt{\frac{\hat\theta(1-\hat\theta)}{n}} = \sqrt{\frac{0.375\cdot0.625}{8}}\approx0.1712.$$
By the CLT, $\hat\theta$ is asymptotically normal, so the Wald interval is
$$\hat\theta\pm1.96\,\widehat{\operatorname{se}} = 0.375\pm0.3355 = (0.040,\ 0.710).$$
**Hoeffding:** $\varepsilon_8 = \sqrt{\frac{\log(2/0.05)}{2\cdot8}} = \sqrt{\frac{\log40}{16}}\approx0.480$, giving $(0, 0.855)$ after clipping to $[0,1]$.

**Comment.** The Hoeffding interval is valid for every $n$ but much wider. The Wald interval is narrower but only asymptotically valid, and with $n = 8$ the normal approximation is doubtful. Both are very wide: 8 observations tell us little about $\theta$.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be iid with mean $\mu$ and variance $\sigma^2\in(0,\infty)$, and let $T_n = \bar X_n^2$, an estimator of $\mu^2$.`, parts: [
    { k: 'a', pts: 10, topic: '6.3', q: R`Show that $T_n\xrightarrow{P}\mu^2$. Compute $E(T_n)$: is $T_n$ unbiased? Using $S_n^2$, propose an unbiased estimator of $\mu^2$.`,
      h: [R`WLLN + continuous mapping ($x\mapsto x^2$).`, R`$E(\bar X_n^2) = \var(\bar X_n) + E(\bar X_n)^2$.`, R`$E(S_n^2) = \sigma^2$, so subtract $S_n^2/n$.`],
      a: [[R`$E(T_n)$`, 'mu^2+sigma^2/n', { mu: [-2, 2], sigma: [0.5, 2], n: [1, 30, 'int'] }], ['unbiased?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`**Consistency.** By the WLLN, $\bar X_n\xrightarrow{P}\mu$ (finite variance). $g(x) = x^2$ is continuous, so by the continuous mapping theorem (Theorem 5.5), $T_n = g(\bar X_n)\xrightarrow{P}\mu^2$.

**Bias.** $E(T_n) = \var(\bar X_n) + E(\bar X_n)^2 = \frac{\sigma^2}{n} + \mu^2$, so $\operatorname{bias}(T_n) = \frac{\sigma^2}{n}\ne0$: **biased** (but the bias $\to0$; consistent and biased is possible).

**Unbiased fix.** $E(S_n^2) = \sigma^2$, so $\tilde T_n = \bar X_n^2 - \frac{S_n^2}{n}$ satisfies $E(\tilde T_n) = \mu^2 + \frac{\sigma^2}n - \frac{\sigma^2}n = \mu^2$.` },
    { k: 'b', pts: 10, topic: '5.4', q: R`For $\mu\ne0$, find the limiting distribution of $\sqrt n(T_n - \mu^2)$. For $\mu = 0$, show that this limit is degenerate and find instead the limiting distribution of $nT_n/\sigma^2$.`,
      h: [R`Delta method with $g(t) = t^2$, $g'(\mu) = 2\mu$.`, R`If $\mu = 0$: $g'(0) = 0$. Write $\frac{nT_n}{\sigma^2} = \left(\frac{\sqrt n\bar X_n}{\sigma}\right)^2$ and use CLT + continuous mapping.`],
      a: [['asymptotic variance (μ ≠ 0)', '4*mu^2*sigma^2', { mu: [0.5, 2], sigma: [0.5, 2] }], [R`limit of $nT_n/\sigma^2$ when $\mu = 0$`, { choice: ['N(0,1)', 'χ²₁', 'point mass at 0', 'Exp(1)'], v: 1 }]],
      s: R`**$\mu\ne0$.** CLT: $\sqrt n(\bar X_n - \mu)\xrightarrow{D}N(0,\sigma^2)$. Delta method with $g(t) = t^2$, $g'(\mu) = 2\mu\ne0$:
$$\sqrt n(\bar X_n^2 - \mu^2)\xrightarrow{D}N\big(0,\ 4\mu^2\sigma^2\big).$$
**$\mu = 0$.** Then $g'(0) = 0$ and the delta method gives $N(0,0)$, a point mass at $0$: $\sqrt n\,T_n\xrightarrow{P}0$ (the first-order term vanishes). We need a bigger scaling. By the CLT, $\frac{\sqrt n\bar X_n}{\sigma}\xrightarrow{D}Z\sim N(0,1)$, and $x\mapsto x^2$ is continuous, so by continuous mapping
$$\frac{nT_n}{\sigma^2} = \left(\frac{\sqrt n\,\bar X_n}{\sigma}\right)^2\xrightarrow{D}Z^2\sim\chi^2_1.$$
(Same structure as HW7 B3(3).)` },
    { k: 'c', pts: 10, topic: '5.3', q: R`Take $X_i\sim\Unif(0,2)$ (so $\mu = 1$, $\sigma^2 = \frac13$) and $n = 300$. (i) Use (b) to approximate $P(T_n>1.1)$. (ii) Give the Chebyshev upper bound for $P(|\bar X_n - 1|\ge0.05)$. Use $\Phi(1.5) = 0.9332$.`,
      h: [R`From (b): $T_n\approx N\left(1, \frac{4\cdot1\cdot\frac13}{300}\right) = N\left(1, \left(\tfrac{1}{15}\right)^2\right)$.`, R`Chebyshev: $\frac{\var(\bar X_n)}{0.05^2}$ with $\var(\bar X_n) = \frac{1/3}{300} = \frac1{900}$.`],
      a: [['(i) approximation', '1-0.9332'], ['(ii) Chebyshev bound', '4/9']],
      s: R`**(i)** By (b), $T_n\approx N\left(\mu^2, \frac{4\mu^2\sigma^2}{n}\right) = N\left(1, \frac{4/3}{300}\right)$, i.e. standard deviation $\sqrt{4/900} = \frac{2}{30} = \frac1{15}\approx0.0667$. Hence
$$P(T_n>1.1)\approx P\left(Z>\frac{0.1}{1/15}\right) = P(Z>1.5) = 1 - \Phi(1.5) = 0.0668.$$
(Using the CLT for $\bar X_n$ directly, $P(\bar X_n>\sqrt{1.1})\approx1 - \Phi(1.464)\approx0.072$: close, as the delta method is a linearization.)

**(ii)** $\var(\bar X_n) = \frac{\sigma^2}{n} = \frac{1/3}{300} = \frac{1}{900}$, so by Chebyshev
$$P(|\bar X_n - 1|\ge0.05)\le\frac{1/900}{0.0025} = \frac49\approx0.444.$$
For comparison, the CLT gives $P(|Z|\ge0.05\cdot30) = 2(1 - \Phi(1.5))\approx0.134$: Chebyshev is valid for every $n$ and distribution, but crude.` },
  ] },
]);
