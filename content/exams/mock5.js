EXAM({ id: 'mock5', title: 'Mock Midterm 2 — A', summary: 'Original Midterm 2 mock: MoM vs MLE for a shifted exponential (the MLE is the minimum, with an Exp(1) limit), the minimum of uniforms (modes of convergence), Poisson MLE + Fisher information + equivariance vs the empirical CDF.',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30), updated to cover Chapters 5–9: convergence, estimation, the empirical CDF, the method of moments and maximum likelihood (Fisher information, equivariance). 80 minutes, 40/30/30 format. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n$ be iid from the shifted exponential distribution with PDF
$$f(x;\theta) = \begin{cases}e^{-(x-\theta)}, & x\ge\theta,\\ 0, & x<\theta,\end{cases}$$
where $\theta\in\R$ is an unknown location parameter. (So $X_1 - \theta\sim\Exp(1)$, with mean $1$ and variance $1$.)`, parts: [
    { k: 'a', pts: 10, topic: '9.1', q: R`Derive the method-of-moments estimator $\hat\theta_{\text{MOM}}$. Compute its bias and MSE, and derive its asymptotic distribution.`,
      h: [R`$E(X_1) = \theta + E(X_1 - \theta) = \theta + 1$ and $\var(X_1) = \var(X_1 - \theta) = 1$.`, R`Set $\theta + 1 = \bar X_n$ and solve. The CLT gives the limit directly (the map $t\mapsto t - 1$ is linear).`],
      a: [[R`$\hat\theta_{\text{MOM}}$ (use xbar)`, 'xbar-1', { xbar: [-3, 3] }], ['bias', '0'], ['MSE', '1/n', { n: [1, 30, 'int'] }]],
      s: R`**MoM.** One parameter, one moment: $\mu_1(\theta) = E(X_1) = \theta + 1$ since $X_1 - \theta\sim\Exp(1)$. Setting $\mu_1(\hat\theta) = \bar X_n$ gives
$$\hat\theta_{\text{MOM}} = \bar X_n - 1.$$
**Bias and MSE.** By linearity $E(\hat\theta_{\text{MOM}}) = (\theta+1) - 1 = \theta$: unbiased. By independence $\var(\bar X_n) = \frac{\var(X_1)}n = \frac1n$, so
$$\operatorname{MSE}(\hat\theta_{\text{MOM}}) = 0^2 + \frac1n = \frac1n.$$
**Asymptotic distribution.** The $X_i$ are iid with finite variance $1$, so by the CLT
$$\sqrt n(\hat\theta_{\text{MOM}} - \theta) = \sqrt n\big(\bar X_n - (\theta+1)\big)\xrightarrow{D}N(0,1).$$` },
    { k: 'b', pts: 10, topic: '9.2', q: R`Write down the likelihood $L_n(\theta)$ and show that the MLE is $\hat\theta_{\text{ML}} = X_{(1)} = \min\{X_1,\dots,X_n\}$. Why does setting the score to zero not work here?`,
      h: [R`Keep the indicator: $f(x;\theta) = e^{-(x-\theta)}\1(x\ge\theta)$, and $\prod_i\1(X_i\ge\theta) = \1(\theta\le X_{(1)})$.`, R`On $\theta\le X_{(1)}$ the likelihood is $e^{n\theta - \sum X_i}$: increasing in $\theta$.`],
      s: R`**Likelihood.** Writing the support with an indicator,
$$L_n(\theta) = \prod_{i=1}^ne^{-(X_i - \theta)}\1(X_i\ge\theta) = e^{n\theta - \sum_iX_i}\,\1\big(\theta\le X_{(1)}\big),$$
because all $X_i\ge\theta$ holds exactly when the smallest one does.

**Maximize.** For $\theta>X_{(1)}$, $L_n(\theta) = 0$. For $\theta\le X_{(1)}$, $L_n(\theta) = e^{-\sum X_i}e^{n\theta}$ is strictly **increasing** in $\theta$. So $L_n$ is largest at the right end of the allowed range:
$$\hat\theta_{\text{ML}} = X_{(1)}.$$
**Why calculus fails.** On the allowed range $\ell_n(\theta) = n\theta - \sum X_i$, so the score is $\ell_n'(\theta) = n>0$: it is never zero. The maximum sits at the **boundary** $\theta = X_{(1)}$, where $L_n$ jumps to $0$. This happens whenever the support depends on $\theta$ (like $\Unif(0,\theta)$, where the MLE is the max).` },
    { k: 'c', pts: 10, topic: '6.2', q: R`Find the distribution of $X_{(1)} - \theta$. Compute the bias and MSE of $\hat\theta_{\text{ML}}$. For which $n$ is $\hat\theta_{\text{ML}}$ strictly better than $\hat\theta_{\text{MOM}}$ in MSE? Propose an unbiased modification of $\hat\theta_{\text{ML}}$ and give its MSE.`,
      h: [R`$P(X_{(1)}>x) = \prod_iP(X_i>x) = e^{-n(x - \theta)}$ for $x\ge\theta$.`, R`So $X_{(1)} - \theta\sim\Exp$ with mean $\frac1n$: mean $\frac1n$, variance $\frac1{n^2}$.`],
      a: [['bias', '1/n', { n: [1, 30, 'int'] }], ['MSE', '2/n^2', { n: [1, 30, 'int'] }], ['smallest n', '3'], ['MSE of the unbiased version', '1/n^2', { n: [1, 30, 'int'] }]],
      s: R`**Distribution of the minimum** (independence, then identical distribution): for $x\ge\theta$,
$$P(X_{(1)}>x) = \prod_{i=1}^nP(X_i>x) = \left(e^{-(x-\theta)}\right)^n = e^{-n(x-\theta)}.$$
So $X_{(1)} - \theta\sim\Exp(1/n)$ in our notation (mean $\frac1n$, variance $\frac1{n^2}$).

**Bias and MSE.**
$$\operatorname{bias}(\hat\theta_{\text{ML}}) = E(X_{(1)}) - \theta = \frac1n>0,\qquad\operatorname{MSE} = \frac1{n^2} + \frac1{n^2} = \frac2{n^2}.$$
(It always overestimates, since $X_{(1)}\ge\theta$.)

**Comparison.** $\frac2{n^2}<\frac1n\iff n>2$. At $n = 1$: $2$ vs $1$ (MoM better); at $n = 2$: $\frac12$ vs $\frac12$ (tie). So the MLE is strictly better for every $n\ge3$, and by a lot for large $n$: its MSE shrinks like $\frac1{n^2}$, not $\frac1n$.

**Unbiased version.** $\tilde\theta = X_{(1)} - \frac1n$ has bias $0$ and the same variance, so $\operatorname{MSE}(\tilde\theta) = \frac1{n^2}$.` },
    { k: 'd', pts: 10, topic: '9.3', q: R`Show that both estimators are consistent. Find the exact distribution of $n(\hat\theta_{\text{ML}} - \theta)$ and the limit of $\sqrt n(\hat\theta_{\text{ML}} - \theta)$. Why doesn't the usual result "$\hat\theta_{\text{ML}}\approx N(\theta, 1/I_n(\theta))$" apply?`,
      h: [R`MSE $\to0$ implies convergence in quadratic mean, hence in probability.`, R`If $Y\sim\Exp(1/n)$ then $nY\sim\Exp(1)$. And $\sqrt n\,Y = \frac1{\sqrt n}(nY)$.`],
      a: [[R`distribution of $n(\hat\theta_{\text{ML}} - \theta)$`, { choice: ['N(0, 1)', 'Exp(1), mean 1', 'Degenerate at 0'], v: 1 }]],
      s: R`**Consistency.** $\operatorname{MSE}(\hat\theta_{\text{MOM}}) = \frac1n\to0$ and $\operatorname{MSE}(\hat\theta_{\text{ML}}) = \frac2{n^2}\to0$. MSE $\to0$ means convergence in quadratic mean, which implies convergence in probability, so both are consistent. (For the MoM, the WLLN + continuous mapping also works: $\bar X_n - 1\xrightarrow{P}\theta + 1 - 1$.)

**Rate $n$, not $\sqrt n$.** From (c), for $t\ge0$,
$$P\big(n(X_{(1)} - \theta)>t\big) = P\left(X_{(1)}>\theta + \tfrac tn\right) = e^{-t},$$
so $n(\hat\theta_{\text{ML}} - \theta)\sim\Exp(1)$ **exactly**, for every $n$. Then $\sqrt n(\hat\theta_{\text{ML}} - \theta) = \frac1{\sqrt n}\cdot n(\hat\theta_{\text{ML}} - \theta)\xrightarrow{P}0$ (Slutsky: $\frac1{\sqrt n}\to0$ times something $O_P(1)$). The $\sqrt n$-scaled limit is **degenerate**: the MLE converges faster than any $\sqrt n$-rate estimator.

**Why the Fisher-information result fails.** Its regularity conditions require the support $\{x: f(x;\theta)>0\}$ **not to depend on $\theta$**, so that one can differentiate under the integral and the score has mean $0$. Here the support is $[\theta,\infty)$. Indeed the "score" $\partial_\theta\log f(X;\theta) = 1$ has mean $1\ne0$, and $-E(\partial_\theta^2\log f) = 0$, which would give an infinite asymptotic variance: nonsense. The limit is $\Exp(1)$ at rate $n$, the same phenomenon as the uniform maximum. (For the same reason the nonparametric bootstrap fails for $X_{(1)}$.)` },
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
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be iid $\Pois(\lambda)$, $\lambda>0$, with PMF $f(x;\lambda) = \frac{\lambda^xe^{-\lambda}}{x!}$, $x = 0,1,2,\dots$ We want to estimate $\lambda$ and the probability of a zero count, $\tau = P(X_1 = 0) = e^{-\lambda}$. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '9.3', q: R`Derive the MLE $\hat\lambda$ (check that it is a maximum). Compute the Fisher information $I_n(\lambda)$ and state the asymptotic distribution of $\hat\lambda$.`,
      h: [R`$\ell_n(\lambda) = \left(\sum X_i\right)\log\lambda - n\lambda - \sum\log X_i!$.`, R`$I_n(\lambda) = -E\big(\ell_n''(\lambda)\big)$, and $E\left(\sum X_i\right) = n\lambda$.`],
      a: [[R`$\hat\lambda$ (use xbar)`, 'xbar', { xbar: [0.5, 5] }], [R`$I_n(\lambda)$`, 'n/lambda', { lambda: [0.5, 5], n: [1, 50, 'int'] }]],
      s: R`**Likelihood.** By independence $L_n(\lambda) = \prod_i\frac{\lambda^{X_i}e^{-\lambda}}{X_i!}$, so
$$\ell_n(\lambda) = \Big(\sum_iX_i\Big)\log\lambda - n\lambda - \sum_i\log X_i!.$$
**Score equation.** $\ell_n'(\lambda) = \frac{\sum X_i}{\lambda} - n = 0\iff\hat\lambda = \bar X_n$. And $\ell_n''(\lambda) = -\frac{\sum X_i}{\lambda^2}<0$ (when $\sum X_i>0$), so it is a maximum. (If all $X_i = 0$, $\ell_n = -n\lambda$ is maximized at the boundary $0 = \bar X_n$, so the formula still holds.)

**Fisher information.**
$$I_n(\lambda) = -E\big(\ell_n''(\lambda)\big) = \frac{E\left(\sum X_i\right)}{\lambda^2} = \frac{n\lambda}{\lambda^2} = \frac n\lambda\qquad(I_1(\lambda) = 1/\lambda).$$
**Asymptotics.** The Poisson model is regular (support $\{0,1,\dots\}$ does not depend on $\lambda$), so
$$\hat\lambda\approx N\left(\lambda, \frac1{I_n(\lambda)}\right) = N\left(\lambda, \frac\lambda n\right),\quad\text{i.e. }\sqrt n(\hat\lambda - \lambda)\xrightarrow{D}N(0,\lambda).$$
This matches the CLT, since $\var(X_1) = \lambda$: here the MLE is the sample mean.` },
    { k: 'b', pts: 10, topic: '9.3', q: R`Find the MLE $\hat\tau$ of $\tau = e^{-\lambda}$ and the asymptotic distribution of $\sqrt n(\hat\tau - \tau)$. With $n = 100$ observations and $\bar x = 4$, give approximate 95% confidence intervals for $\lambda$ and for $\tau$.`,
      h: [R`Equivariance: the MLE of $g(\lambda)$ is $g(\hat\lambda)$.`, R`Delta method with $g(\lambda) = e^{-\lambda}$: the asymptotic variance is $g'(\lambda)^2/I_1(\lambda)$.`],
      a: [['asymptotic variance', 'lambda*exp(-2*lambda)', { lambda: [0.5, 5] }], [R`$\lambda$: lower`, '4-1.96*0.2'], [R`$\lambda$: upper`, '4+1.96*0.2'], [R`$\tau$: lower`, 'exp(-4)*(1-1.96*0.2)'], [R`$\tau$: upper`, 'exp(-4)*(1+1.96*0.2)']],
      s: R`**Equivariance.** $\hat\tau = e^{-\hat\lambda} = e^{-\bar X_n}$.

**Delta method.** $g(\lambda) = e^{-\lambda}$ is differentiable with $g'(\lambda) = -e^{-\lambda}\ne0$, so from (a)
$$\sqrt n\big(e^{-\bar X_n} - e^{-\lambda}\big)\xrightarrow{D}N\big(0,\ g'(\lambda)^2\lambda\big) = N\big(0,\ \lambda e^{-2\lambda}\big).$$
($\hat\tau$ is consistent by continuous mapping, but **not unbiased**: $E(e^{-\bar X_n}) = \exp\{n\lambda(e^{-1/n} - 1)\}\ne e^{-\lambda}$, from the MGF of $n\bar X_n\sim\Pois(n\lambda)$.)

**For $\lambda$.** $\hat\lambda = 4$ and $\widehat{\operatorname{se}} = 1/\sqrt{I_n(\hat\lambda)} = \sqrt{\hat\lambda/n} = \sqrt{4/100} = 0.2$:
$$4\pm1.96\cdot0.2 = (3.608,\ 4.392).$$
**For $\tau$.** $\hat\tau = e^{-4}\approx0.01832$ and $\widehat{\operatorname{se}}(\hat\tau) = \frac{\sqrt{\hat\lambda}\,e^{-\hat\lambda}}{\sqrt n} = 0.2e^{-4}\approx0.003663$, so
$$\hat\tau\pm1.96\,\widehat{\operatorname{se}} = e^{-4}(1\pm0.392)\approx(0.01114,\ 0.02550).$$
Plugging $\hat\lambda$ into the se is justified by Slutsky, since $\hat\lambda\xrightarrow{P}\lambda$.` },
    { k: 'c', pts: 10, topic: '7.1', q: R`A nonparametric alternative ignores the Poisson model: $\tilde\tau = \hat F_n(0) = \frac1n\sum_{i=1}^n\1(X_i = 0)$, the empirical CDF at $0$. Find its bias and variance, and its limiting distribution. Compute the ratio of asymptotic variances $\frac{\text{avar}(\hat\tau)}{\text{avar}(\tilde\tau)}$ at $\lambda = 4$. Which estimator would you use if you trust the Poisson model?`,
      h: [R`$\1(X_i = 0) = \1(X_i\le0)$ are iid $\Ber(\tau)$, so $n\hat F_n(0)\sim\Bin(n,\tau)$.`, R`Ratio: $\frac{\lambda e^{-2\lambda}}{e^{-\lambda}(1 - e^{-\lambda})} = \frac{\lambda e^{-\lambda}}{1 - e^{-\lambda}}$.`],
      a: [['bias', '0'], ['variance', 'exp(-lambda)*(1-exp(-lambda))/n', { lambda: [0.5, 5], n: [1, 50, 'int'] }], ['ratio at λ = 4', '4*exp(-4)/(1-exp(-4))'], ['use', { choice: ['the MLE e^{-X̄}', 'the empirical CDF'], v: 0 }]],
      s: R`$X_i\ge0$ is integer-valued, so $\1(X_i = 0) = \1(X_i\le0)$, and these are iid $\Ber(\tau)$ with $\tau = F(0) = e^{-\lambda}$. Hence $n\tilde\tau\sim\Bin(n,\tau)$ and
$$E(\tilde\tau) = \tau\ \ (\text{bias } 0),\qquad\var(\tilde\tau) = \frac{\tau(1-\tau)}{n} = \frac{e^{-\lambda}(1 - e^{-\lambda})}{n}.$$
By the CLT, $\sqrt n(\tilde\tau - \tau)\xrightarrow{D}N\big(0, e^{-\lambda}(1-e^{-\lambda})\big)$.

**Ratio of asymptotic variances:**
$$\frac{\lambda e^{-2\lambda}}{e^{-\lambda}(1 - e^{-\lambda})} = \frac{\lambda e^{-\lambda}}{1 - e^{-\lambda}} = \frac{\lambda}{e^\lambda - 1}<1\quad\text{for all }\lambda>0\ (\text{since }e^\lambda>1+\lambda).$$
At $\lambda = 4$: $\frac{4e^{-4}}{1 - e^{-4}}\approx0.0746$. The model-based estimator has about 7.5% of the variance of the empirical one: it uses all the counts, while $\tilde\tau$ only uses whether each count is zero. If the Poisson model is right, use the MLE $\hat\tau = e^{-\bar X_n}$: this is the efficiency of the MLE at work. The price of $\tilde\tau$ is efficiency; its advantage is that it stays valid (unbiased, consistent) when the model is wrong.` },
  ] },
]);
