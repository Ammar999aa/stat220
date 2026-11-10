EXAM({ id: 'mock5', title: 'Mock Midterm 2 — A', summary: 'Original Midterm 2 mock: two estimators of θ compared by MSE, the minimum of uniforms (modes of convergence), Poisson delta method + Wald CI vs the empirical CDF.',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30). Assumed scope: Chapters 5–7 (convergence, estimation, empirical CDF) and HW7–8, with earlier tools used along the way. 80 minutes, same 40/30/30 format as Midterm 1. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n$ be iid with PDF
$$f(x;\theta) = \begin{cases}\dfrac{2x}{\theta^2}, & 0<x<\theta,\\ 0, & \text{otherwise,}\end{cases}$$
where $\theta>0$ is an unknown parameter.`, parts: [
    { k: 'a', pts: 10, topic: '3.1', q: R`Compute $E(X_1)$ and $\var(X_1)$.`,
      h: [R`Rule of the lazy statistician: $E(X_1) = \int_0^\theta x\cdot\frac{2x}{\theta^2}\dd x$.`, R`$E(X_1^2) = \int_0^\theta x^2\cdot\frac{2x}{\theta^2}\dd x$, then $\var = E(X^2) - (EX)^2$.`],
      a: [[R`$E(X_1)$`, '2*theta/3', { theta: [0.5, 3] }], [R`$\var(X_1)$`, 'theta^2/18', { theta: [0.5, 3] }]],
      s: R`$$E(X_1) = \int_0^\theta x\frac{2x}{\theta^2}\dd x = \frac{2}{\theta^2}\left[\frac{x^3}{3}\right]_0^\theta = \frac{2\theta}{3},\qquad E(X_1^2) = \int_0^\theta x^2\frac{2x}{\theta^2}\dd x = \frac{2}{\theta^2}\left[\frac{x^4}{4}\right]_0^\theta = \frac{\theta^2}{2}.$$
$$\var(X_1) = \frac{\theta^2}{2} - \frac{4\theta^2}{9} = \frac{9\theta^2 - 8\theta^2}{18} = \frac{\theta^2}{18}.$$` },
    { k: 'b', pts: 10, topic: '6.2', q: R`Consider $\hat\theta_1 = \frac32\bar X_n$. Compute its bias, standard error and MSE.`,
      h: [R`$E(\bar X_n) = E(X_1)$ and $\var(\bar X_n) = \var(X_1)/n$ (iid).`, R`$\var(c\bar X_n) = c^2\var(\bar X_n)$. MSE $=$ bias$^2$ + variance.`],
      a: [['bias', '0'], ['se', 'theta/sqrt(8*n)', { theta: [0.5, 3], n: [1, 30, 'int'] }], ['MSE', 'theta^2/(8*n)', { theta: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**Bias.** By linearity, $E(\hat\theta_1) = \frac32E(\bar X_n) = \frac32\cdot\frac{2\theta}3 = \theta$, so $\operatorname{bias}(\hat\theta_1) = 0$: $\hat\theta_1$ is unbiased. (It is the method-of-moments estimator: solve $\bar X_n = \frac{2\theta}{3}$ for $\theta$.)

**Variance.** The $X_i$ are independent, so $\var(\bar X_n) = \frac{\var(X_1)}{n} = \frac{\theta^2}{18n}$ and
$$\var(\hat\theta_1) = \frac94\cdot\frac{\theta^2}{18n} = \frac{\theta^2}{8n},\qquad\operatorname{se}(\hat\theta_1) = \frac{\theta}{\sqrt{8n}}.$$
**MSE** $= \operatorname{bias}^2 + \var = 0 + \frac{\theta^2}{8n} = \frac{\theta^2}{8n}$.` },
    { k: 'c', pts: 10, topic: '6.2', q: R`Consider $\hat\theta_2 = X_{(n)} = \max\{X_1,\dots,X_n\}$. Derive its CDF and PDF, then compute its bias and MSE. *(You may use: $E(X_{(n)}^2) = \frac{n}{n+1}\theta^2$, but you must derive $E(X_{(n)})$.)*`,
      h: [R`$F(x) = \int_0^x\frac{2t}{\theta^2}\dd t = \frac{x^2}{\theta^2}$ on $(0,\theta)$.`, R`$P(X_{(n)}\le x) = P(X_1\le x,\dots,X_n\le x) = F(x)^n$ by independence.`, R`MSE $= E[(\hat\theta_2 - \theta)^2] = E(\hat\theta_2^2) - 2\theta E(\hat\theta_2) + \theta^2$. Put everything over $(n+1)(2n+1)$.`],
      a: [['bias', '-theta/(2*n+1)', { theta: [0.5, 3], n: [1, 30, 'int'] }], ['MSE', 'theta^2/((n+1)*(2*n+1))', { theta: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**CDF of $X_1$:** $F(x) = \int_0^x\frac{2t}{\theta^2}\dd t = \frac{x^2}{\theta^2}$ for $0<x<\theta$ ($0$ below, $1$ above).

**CDF of the max** (independence, then identical distribution):
$$F_{X_{(n)}}(x) = P(X_1\le x,\dots,X_n\le x) = \prod_{i=1}^nP(X_i\le x) = \left(\frac x\theta\right)^{2n},\quad 0<x<\theta,$$
so $f_{X_{(n)}}(x) = \frac{2n\,x^{2n-1}}{\theta^{2n}}$ on $(0,\theta)$.

**Mean:**
$$E(X_{(n)}) = \int_0^\theta x\frac{2nx^{2n-1}}{\theta^{2n}}\dd x = \frac{2n}{\theta^{2n}}\cdot\frac{\theta^{2n+1}}{2n+1} = \frac{2n}{2n+1}\theta,$$
so $\operatorname{bias}(\hat\theta_2) = \frac{2n}{2n+1}\theta - \theta = -\frac{\theta}{2n+1}$ (it always underestimates, since $X_{(n)}<\theta$).

**MSE.** With $E(X_{(n)}^2) = \frac{2n}{2n+2}\theta^2 = \frac{n}{n+1}\theta^2$ (same integral with $x^2$):
$$\operatorname{MSE} = E(X_{(n)}^2) - 2\theta E(X_{(n)}) + \theta^2 = \theta^2\left[\frac{n}{n+1} - \frac{4n}{2n+1} + 1\right] = \theta^2\,\frac{n(2n+1) - 4n(n+1) + (n+1)(2n+1)}{(n+1)(2n+1)}.$$
The numerator is $2n^2 + n - 4n^2 - 4n + 2n^2 + 3n + 1 = 1$, hence
$$\operatorname{MSE}(\hat\theta_2) = \frac{\theta^2}{(n+1)(2n+1)}.$$` },
    { k: 'd', pts: 10, topic: '6.3', q: R`Show that both $\hat\theta_1$ and $\hat\theta_2$ are consistent. Which estimator has the smaller MSE? Find the smallest $n$ for which $\hat\theta_2$ is strictly better.`,
      h: [R`Theorem: $\operatorname{MSE}(\hat\theta_n)\to0\Rightarrow\hat\theta_n\xrightarrow{P}\theta$ (q.m. convergence implies convergence in probability).`, R`Compare $\frac1{(n+1)(2n+1)}$ with $\frac1{8n}$: $\hat\theta_2$ wins iff $(n+1)(2n+1)>8n$.`],
      a: [['smallest n', '3']],
      s: R`**Consistency.** $\operatorname{MSE}(\hat\theta_1) = \frac{\theta^2}{8n}\to0$ and $\operatorname{MSE}(\hat\theta_2) = \frac{\theta^2}{(n+1)(2n+1)}\to0$. MSE $\to0$ means $\hat\theta\xrightarrow{\text{qm}}\theta$, which implies $\hat\theta\xrightarrow{P}\theta$. So both are consistent. (For $\hat\theta_1$, the WLLN also works: $\bar X_n\xrightarrow{P}\frac{2\theta}3$ and $x\mapsto\frac32x$ is continuous.)

**Comparison.** $\operatorname{MSE}(\hat\theta_2)<\operatorname{MSE}(\hat\theta_1)\iff(n+1)(2n+1)>8n\iff2n^2 - 5n + 1>0\iff n>\frac{5+\sqrt{17}}{4}\approx2.28$.
- $n = 1$: $\frac{\theta^2}6$ vs $\frac{\theta^2}8$, so $\hat\theta_1$ is better.
- $n = 2$: $\frac{\theta^2}{15}$ vs $\frac{\theta^2}{16}$, so $\hat\theta_1$ is (barely) better.
- $n = 3$: $\frac{\theta^2}{28}$ vs $\frac{\theta^2}{24}$, so $\hat\theta_2$ is better.

The smallest such $n$ is $3$. For large $n$ the max wins by a lot: its MSE decays like $\frac1{n^2}$, versus $\frac1n$ for $\hat\theta_1$, even though $\hat\theta_2$ is biased.` },
  ] },
  { k: '2', pts: 30, intro: R`Let $U_1, U_2,\dots$ be iid $\Unif(0,1)$, and let $M_n = \min\{U_1,\dots,U_n\}$.`, parts: [
    { k: 'a', pts: 10, topic: '5.1', q: R`Show that $M_n\xrightarrow{P}0$ and that $nM_n\xrightarrow{D}Z$ where $Z\sim\Exp(1)$ (mean 1).`,
      h: [R`$P(M_n>x) = P(U_1>x,\dots,U_n>x) = (1-x)^n$ for $x\in[0,1]$.`, R`For the second claim compute $P(nM_n>x) = (1 - \frac xn)^n$ for $0\le x\le n$, and use $(1 - \frac xn)^n\to e^{-x}$.`],
      s: R`**Survival function of the min** (independence, iid): for $0\le x\le1$,
$$P(M_n>x) = P(U_1>x,\dots,U_n>x) = \prod_{i=1}^nP(U_i>x) = (1-x)^n.$$
**In probability.** $M_n\ge0$, so for any $\varepsilon\in(0,1)$, $P(|M_n - 0|>\varepsilon) = P(M_n>\varepsilon) = (1-\varepsilon)^n\to0$ (and it is $0$ for $\varepsilon\ge1$). Hence $M_n\xrightarrow{P}0$.

**In distribution.** For fixed $x>0$ and $n\ge x$:
$$P(nM_n>x) = P\left(M_n>\frac xn\right) = \left(1 - \frac xn\right)^n\xrightarrow[n\to\infty]{}e^{-x}.$$
So $F_{nM_n}(x) = 1 - (1 - \frac xn)^n\to1 - e^{-x}$ for $x>0$, and $F_{nM_n}(x) = 0$ for $x\le0$. The limit is the CDF of $\Exp(1)$, which is continuous everywhere, so $nM_n\xrightarrow{D}Z\sim\Exp(1)$.` },
    { k: 'b', pts: 10, topic: '5.1', q: R`Does $M_n\to0$ in quadratic mean? Compute $E(M_n^2)$ to decide.`,
      h: [R`From (a), $f_{M_n}(x) = n(1-x)^{n-1}$ on $(0,1)$: that is a $\Bet(1,n)$ density.`, R`Tail formula: $E(M_n^2) = \int_0^1P(M_n^2>t)\dd t = \int_0^12x(1-x)^n\dd x$, or use the Beta moments.`],
      a: [[R`$E(M_n^2)$`, '2/((n+1)*(n+2))', { n: [1, 30, 'int'] }], ['q.m. convergence?', { choice: ['Yes', 'No'], v: 0 }]],
      s: R`Differentiating $1 - (1-x)^n$: $f_{M_n}(x) = n(1-x)^{n-1}$, $0<x<1$, i.e. $M_n\sim\Bet(1,n)$. Using the Beta integral $\int_0^1x^{a-1}(1-x)^{b-1}\dd x = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$:
$$E(M_n^2) = n\int_0^1x^2(1-x)^{n-1}\dd x = n\frac{\Gamma(3)\Gamma(n)}{\Gamma(n+3)} = n\cdot\frac{2\,(n-1)!}{(n+2)!} = \frac{2}{(n+1)(n+2)}.$$
Since $E[(M_n - 0)^2] = \frac{2}{(n+1)(n+2)}\to0$, **yes**: $M_n\xrightarrow{\text{qm}}0$. (This gives a second proof of $M_n\xrightarrow{P}0$, since q.m. convergence implies convergence in probability.)` },
    { k: 'c', pts: 10, topic: '5.1', q: R`Now define $W_n = n\,\1(U_n\le1/n)$, i.e. $W_n = n$ if $U_n\le\frac1n$ and $W_n = 0$ otherwise. Does $W_n$ converge to $0$ in probability? In distribution? In quadratic mean?`,
      h: [R`$P(W_n\ne0) = P(U_n\le\frac1n) = \frac1n$.`, R`$E(W_n^2) = n^2\cdot\frac1n$.`],
      a: [['in probability', { choice: ['Yes', 'No'], v: 0 }], ['in distribution', { choice: ['Yes', 'No'], v: 0 }], ['in quadratic mean', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`**In probability: yes.** For every $\varepsilon>0$, $P(|W_n|>\varepsilon)\le P(W_n\ne0) = P(U_n\le\tfrac1n) = \frac1n\to0$.

**In distribution: yes.** Convergence in probability implies convergence in distribution. Directly, $F_{W_n}(x) = 0$ for $x<0$, $= 1 - \frac1n$ for $0\le x<n$, and $= 1$ for $x\ge n$. For fixed $x$ this tends to $\1(x\ge0)$, the CDF of the point mass at $0$.

**In quadratic mean: no.** $E[(W_n - 0)^2] = n^2\cdot P(U_n\le\tfrac1n) = n^2\cdot\frac1n = n\to\infty$. A rare but huge value ruins the second moment, even though it almost never happens. (Even $E(W_n) = 1$ does not go to $0$.) So convergence in probability does **not** imply convergence in quadratic mean.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be iid $\Pois(\lambda)$, $\lambda>0$. We want to estimate $\lambda$ and the probability of a zero count, $\tau = P(X_1 = 0) = e^{-\lambda}$. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '5.4', q: R`State the CLT for $\bar X_n$. Use the delta method to find the limiting distribution of $\sqrt n\big(e^{-\bar X_n} - e^{-\lambda}\big)$. Is $\hat\tau = e^{-\bar X_n}$ consistent? Is it unbiased?`,
      h: [R`$E(X_1) = \var(X_1) = \lambda$, so $\sqrt n(\bar X_n - \lambda)\xrightarrow{D}N(0,\lambda)$.`, R`Delta method with $g(t) = e^{-t}$: the asymptotic variance is $g'(\lambda)^2\lambda$.`, R`Unbiased? Use the Poisson MGF: $n\bar X_n\sim\Pois(n\lambda)$, so $E(e^{-\bar X_n}) = \psi_{n\bar X_n}(-1/n)$.`],
      a: [['asymptotic variance', 'lambda*exp(-2*lambda)', { lambda: [0.5, 5] }], ['unbiased?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`**CLT.** The $X_i$ are iid with $E(X_1) = \var(X_1) = \lambda<\infty$, so
$$\sqrt n(\bar X_n - \lambda)\xrightarrow{D}N(0,\lambda).$$
**Delta method.** $g(t) = e^{-t}$ is differentiable with $g'(\lambda) = -e^{-\lambda}\ne0$, so
$$\sqrt n\big(e^{-\bar X_n} - e^{-\lambda}\big)\xrightarrow{D}N\big(0,\ g'(\lambda)^2\lambda\big) = N\big(0,\ \lambda e^{-2\lambda}\big).$$
**Consistent: yes.** By the WLLN, $\bar X_n\xrightarrow{P}\lambda$, and $g$ is continuous, so $e^{-\bar X_n}\xrightarrow{P}e^{-\lambda}$ (continuous mapping).

**Unbiased: no.** $n\bar X_n = \sum X_i\sim\Pois(n\lambda)$ with MGF $\psi(t) = e^{n\lambda(e^t - 1)}$, so
$$E(e^{-\bar X_n}) = \psi\left(-\tfrac1n\right) = \exp\left\{n\lambda\left(e^{-1/n} - 1\right)\right\}\ne e^{-\lambda}.$$
(It tends to $e^{-\lambda}$ since $n(e^{-1/n} - 1)\to-1$, so the bias vanishes asymptotically. By Jensen, since $e^{-t}$ is convex, $E(e^{-\bar X_n})>e^{-\lambda}$.)` },
    { k: 'b', pts: 10, topic: '6.4', q: R`With $n = 100$ observations you find $\bar x = 4$. Give approximate 95% Wald confidence intervals for $\lambda$ and for $\tau = e^{-\lambda}$ (estimate the standard errors by plugging in).`,
      h: [R`$\widehat{\operatorname{se}}(\bar X_n) = \sqrt{\hat\lambda/n}$.`, R`From (a): $\widehat{\operatorname{se}}(\hat\tau) = \sqrt{\hat\lambda}\,e^{-\hat\lambda}/\sqrt n$.`],
      a: [[R`$\lambda$: lower`, '4-1.96*0.2'], [R`$\lambda$: upper`, '4+1.96*0.2'], [R`$\tau$: lower`, 'exp(-4)*(1-1.96*0.2)'], [R`$\tau$: upper`, 'exp(-4)*(1+1.96*0.2)']],
      s: R`**For $\lambda$.** $\hat\lambda = \bar x = 4$ and $\widehat{\operatorname{se}} = \sqrt{\hat\lambda/n} = \sqrt{4/100} = 0.2$. Since $\bar X_n$ is asymptotically normal,
$$\hat\lambda\pm\Phi^{-1}(0.975)\,\widehat{\operatorname{se}} = 4\pm1.96\cdot0.2 = (3.608,\ 4.392).$$
**For $\tau$.** $\hat\tau = e^{-4}\approx0.01832$, and from (a), $\widehat{\operatorname{se}}(\hat\tau) = \frac{\sqrt{\hat\lambda}e^{-\hat\lambda}}{\sqrt n} = \frac{2e^{-4}}{10} = 0.2e^{-4}\approx0.003663$. So
$$\hat\tau\pm1.96\,\widehat{\operatorname{se}} = e^{-4}(1\pm0.392)\approx(0.01114,\ 0.02550).$$
These are approximate intervals: $P(\theta\in C_n)\to0.95$ as $n\to\infty$.` },
    { k: 'c', pts: 10, topic: '7.1', q: R`A nonparametric alternative ignores the Poisson model: $\tilde\tau = \hat F_n(0) = \frac1n\sum_{i=1}^n\1(X_i = 0)$, the empirical CDF at $0$. Find its bias and variance, and its limiting distribution. Compute the ratio of asymptotic variances $\frac{\text{avar}(\hat\tau)}{\text{avar}(\tilde\tau)}$ at $\lambda = 4$. Which estimator would you use if you trust the Poisson model?`,
      h: [R`$\1(X_i = 0) = \1(X_i\le0)$ are iid $\Ber(\tau)$, so $n\hat F_n(0)\sim\Bin(n,\tau)$.`, R`Ratio: $\frac{\lambda e^{-2\lambda}}{e^{-\lambda}(1 - e^{-\lambda})} = \frac{\lambda e^{-\lambda}}{1 - e^{-\lambda}}$.`],
      a: [['bias', '0'], ['variance', 'exp(-lambda)*(1-exp(-lambda))/n', { lambda: [0.5, 5], n: [1, 50, 'int'] }], ['ratio at λ = 4', '4*exp(-4)/(1-exp(-4))'], ['use', { choice: ['the model-based e^{-X̄}', 'the empirical CDF'], v: 0 }]],
      s: R`$X_i\ge0$ is integer-valued, so $\1(X_i = 0) = \1(X_i\le0)$, and these are iid $\Ber(\tau)$ with $\tau = F(0) = e^{-\lambda}$. Hence $n\tilde\tau\sim\Bin(n,\tau)$ and
$$E(\tilde\tau) = \tau\ \ (\text{bias } 0),\qquad\var(\tilde\tau) = \frac{\tau(1-\tau)}{n} = \frac{e^{-\lambda}(1 - e^{-\lambda})}{n}.$$
By the CLT, $\sqrt n(\tilde\tau - \tau)\xrightarrow{D}N\big(0, e^{-\lambda}(1-e^{-\lambda})\big)$.

**Ratio of asymptotic variances:**
$$\frac{\lambda e^{-2\lambda}}{e^{-\lambda}(1 - e^{-\lambda})} = \frac{\lambda e^{-\lambda}}{1 - e^{-\lambda}} = \frac{\lambda}{e^\lambda - 1}<1\quad\text{for all }\lambda>0\ (\text{since }e^\lambda>1+\lambda).$$
At $\lambda = 4$: $\frac{4e^{-4}}{1 - e^{-4}}\approx0.0746$. The model-based estimator has about 7.5% of the variance of the empirical one: it uses all the counts, while $\tilde\tau$ only uses whether each count is zero. If the Poisson model is right, use $\hat\tau = e^{-\bar X_n}$. The price of $\tilde\tau$ is efficiency; its advantage is that it stays valid (unbiased, consistent) when the model is wrong.` },
  ] },
]);
