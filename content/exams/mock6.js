EXAM({ id: 'mock6', title: 'Mock Midterm 2 — B', summary: 'Original Midterm 2 mock: estimating an exponential rate (shrinkage, bias of 1/X̄, MLE + Fisher information CI), the empirical CDF on a small data set, and MLE vs MoM for the Rayleigh distribution (efficiency).',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30). Updated to cover Chapters 5–9: estimation (bias, MSE, consistency), the empirical CDF, and maximum likelihood (Fisher information, equivariance, efficiency) vs the method of moments. 80 minutes, 40/30/30 format. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
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
    { k: 'd', pts: 10, topic: '9.3', q: R`Reparametrize by the rate: $f(x;\lambda) = \lambda e^{-\lambda x}$. Show that $\hat\lambda = 1/\bar X_n$ is the MLE of $\lambda$, compute the Fisher information $I_n(\lambda)$, and give the limiting distribution of $\sqrt n(\hat\lambda - \lambda)$. Check it with the delta method. With $n = 50$ and $\bar x = 2$, give an approximate 95% confidence interval for $\lambda$ ($\Phi^{-1}(0.975) = 1.96$).`,
      h: [R`$\ell_n(\lambda) = n\log\lambda - \lambda\sum X_i$, so $\ell_n''(\lambda) = -n/\lambda^2$ (non-random).`, R`Delta-method check: CLT $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0,\beta^2)$, then $g(t) = 1/t$, $g'(\beta) = -1/\beta^2$.`, R`$\widehat{\operatorname{se}}(\hat\lambda) = 1/\sqrt{I_n(\hat\lambda)} = \hat\lambda/\sqrt n$.`],
      a: [['asymptotic variance', 'lambda^2', { lambda: [0.3, 3] }], ['lower', '0.5-1.96*0.5/sqrt(50)'], ['upper', '0.5+1.96*0.5/sqrt(50)']],
      s: R`**MLE.** $\ell_n(\lambda) = \sum_i\log(\lambda e^{-\lambda X_i}) = n\log\lambda - \lambda\sum_iX_i$. Score: $\ell_n'(\lambda) = \frac n\lambda - \sum X_i = 0\iff\hat\lambda = \frac{1}{\bar X_n}$, and $\ell_n''(\lambda) = -\frac{n}{\lambda^2}<0$: a maximum. (Equivalently, by equivariance: $\bar X_n$ is the MLE of $\beta$, so $1/\bar X_n$ is the MLE of $\lambda = 1/\beta$.)

**Fisher information.** $I_n(\lambda) = -E(\ell_n''(\lambda)) = \frac{n}{\lambda^2}$. The model is regular (support $(0,\infty)$), so $\sqrt n(\hat\lambda - \lambda)\xrightarrow{D}N(0, 1/I_1(\lambda)) = N(0,\lambda^2)$.

**Check.** CLT: $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0,\beta^2)$. **Delta method** with $g(t) = \frac1t$, differentiable at $\beta>0$ with $g'(\beta) = -\frac1{\beta^2}\ne0$:
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
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be iid from the Rayleigh distribution with PDF
$$f(x;\theta) = \frac{x}{\theta}\,e^{-x^2/(2\theta)},\qquad x>0,$$
where $\theta>0$ is unknown. You may use: $E(X_1) = \sqrt{\pi\theta/2}$, and $X_1^2\sim\Exp(2\theta)$ (mean $2\theta$, variance $4\theta^2$).`, parts: [
    { k: 'a', pts: 10, topic: '9.2', q: R`Derive the MLE $\hat\theta_{\text{ML}}$ and check that it is a maximum. Is it unbiased? Compute its exact variance.`,
      h: [R`$\ell_n(\theta) = \sum\log X_i - n\log\theta - \frac{1}{2\theta}\sum X_i^2$.`, R`$\hat\theta_{\text{ML}}$ is an average of $X_i^2/2$, and $E(X_1^2) = 2\theta$, $\var(X_1^2) = 4\theta^2$.`],
      a: [[R`$\hat\theta_{\text{ML}}$ (use m2 = (1/n)ΣXᵢ²)`, 'm2/2', { m2: [0.5, 5] }], ['unbiased?', { choice: ['Yes', 'No'], v: 0 }], ['variance', 'theta^2/n', { theta: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**Log-likelihood** (independence):
$$\ell_n(\theta) = \sum_i\log X_i - n\log\theta - \frac{1}{2\theta}\sum_iX_i^2.$$
**Score equation.** $\ell_n'(\theta) = -\frac n\theta + \frac{\sum X_i^2}{2\theta^2} = 0\iff\hat\theta_{\text{ML}} = \frac{1}{2n}\sum_{i=1}^nX_i^2$.

**Maximum.** $\ell_n''(\theta) = \frac{n}{\theta^2} - \frac{\sum X_i^2}{\theta^3}$. At $\hat\theta$, $\sum X_i^2 = 2n\hat\theta$, so $\ell_n''(\hat\theta) = \frac n{\hat\theta^2} - \frac{2n}{\hat\theta^2} = -\frac n{\hat\theta^2}<0$. (Also $\ell_n'>0$ for $\theta<\hat\theta$ and $<0$ after, so it is the global maximum.)

**Unbiased: yes.** $E(\hat\theta_{\text{ML}}) = \frac{1}{2n}\cdot n\cdot2\theta = \theta$.

**Variance** (independence): $\var(\hat\theta_{\text{ML}}) = \frac{1}{4n^2}\cdot n\cdot4\theta^2 = \frac{\theta^2}{n}$.` },
    { k: 'b', pts: 10, topic: '9.3', q: R`Compute the Fisher information $I_n(\theta)$ and the asymptotic distribution of $\hat\theta_{\text{ML}}$. Compare $1/I_n(\theta)$ with the exact variance from (a). Then find the MLE of the mean $\mu = E(X_1)$ and its asymptotic distribution.`,
      h: [R`$I_n(\theta) = -E(\ell_n''(\theta)) = -\frac n{\theta^2} + \frac{E\sum X_i^2}{\theta^3}$.`, R`Equivariance: $\hat\mu = \sqrt{\pi\hat\theta/2}$. Delta method with $g(\theta) = \sqrt{\pi\theta/2}$, $g'(\theta) = \frac12\sqrt{\frac{\pi}{2\theta}}$.`],
      a: [[R`$I_n(\theta)$`, 'n/theta^2', { theta: [0.5, 3], n: [1, 30, 'int'] }], [R`asymptotic variance of $\sqrt n(\hat\mu - \mu)$`, 'pi*theta/8', { theta: [0.5, 3] }]],
      s: R`**Fisher information.**
$$I_n(\theta) = -E\big(\ell_n''(\theta)\big) = -\frac{n}{\theta^2} + \frac{n\cdot2\theta}{\theta^3} = \frac{n}{\theta^2}.$$
The model is regular (support $(0,\infty)$ does not depend on $\theta$), so
$$\sqrt n(\hat\theta_{\text{ML}} - \theta)\xrightarrow{D}N\big(0,\ 1/I_1(\theta)\big) = N(0,\theta^2).$$
**Comparison.** $1/I_n(\theta) = \theta^2/n$ is exactly $\var(\hat\theta_{\text{ML}})$ from (a): here the MLE is unbiased and its variance equals $1/I_n(\theta)$ for **every** $n$, not just asymptotically. (Directly: $\hat\theta$ is an average of iid $X_i^2/2$, so the CLT gives the same limit.)

**MLE of the mean.** $\mu = g(\theta) = \sqrt{\pi\theta/2}$, so by equivariance $\hat\mu = \sqrt{\pi\hat\theta_{\text{ML}}/2}$. $g'(\theta) = \frac12\sqrt{\frac{\pi}{2\theta}}\ne0$, and by the delta method
$$\sqrt n(\hat\mu - \mu)\xrightarrow{D}N\left(0,\ g'(\theta)^2\theta^2\right) = N\left(0,\ \frac{\pi}{8\theta}\theta^2\right) = N\left(0,\ \frac{\pi\theta}{8}\right).$$` },
    { k: 'c', pts: 10, topic: '9.1', q: R`Derive the method-of-moments estimator $\hat\theta_{\text{MOM}}$ (using the first moment) and its asymptotic distribution. Compute the ratio of asymptotic variances $\text{avar}(\hat\theta_{\text{ML}})/\text{avar}(\hat\theta_{\text{MOM}})$. Which estimator do you prefer, and why is that no accident?`,
      h: [R`$\sqrt{\pi\theta/2} = \bar X_n\iff\theta = \frac{2\bar X_n^2}{\pi}$.`, R`$\var(X_1) = E(X_1^2) - (EX_1)^2 = 2\theta - \frac{\pi\theta}2$. Delta method with $h(m) = \frac{2m^2}{\pi}$, $h'(m) = \frac{4m}{\pi}$.`],
      a: [[R`$\hat\theta_{\text{MOM}}$ (use xbar)`, '2*xbar^2/pi', { xbar: [0.5, 3] }], ['avar of MoM', '4*(4-pi)*theta^2/pi', { theta: [0.5, 3] }], ['ratio ML/MoM', 'pi/(4*(4-pi))']],
      s: R`**MoM.** $\mu_1(\theta) = \sqrt{\pi\theta/2} = \bar X_n$ gives
$$\hat\theta_{\text{MOM}} = \frac{2\bar X_n^2}{\pi}.$$
**Asymptotics.** $\var(X_1) = 2\theta - \frac{\pi\theta}{2} = \frac{(4-\pi)\theta}{2}$. CLT: $\sqrt n(\bar X_n - m)\xrightarrow{D}N\left(0, \frac{(4-\pi)\theta}2\right)$ with $m = \sqrt{\pi\theta/2}$. Delta method with $h(m) = \frac{2m^2}\pi$, $h'(m) = \frac{4m}{\pi}$, so $h'(m)^2 = \frac{16}{\pi^2}\cdot\frac{\pi\theta}{2} = \frac{8\theta}{\pi}$:
$$\sqrt n(\hat\theta_{\text{MOM}} - \theta)\xrightarrow{D}N\left(0,\ \frac{8\theta}{\pi}\cdot\frac{(4-\pi)\theta}{2}\right) = N\left(0,\ \frac{4(4-\pi)}{\pi}\theta^2\right)\approx N(0,\ 1.093\,\theta^2).$$
**Ratio.**
$$\frac{\theta^2}{4(4-\pi)\theta^2/\pi} = \frac{\pi}{4(4-\pi)}\approx0.915.$$
Prefer the **MLE**: it needs about 8.5% fewer observations for the same precision, and it is also exactly unbiased. This is no accident: in a regular model the MLE is asymptotically **efficient**. No (well-behaved) estimator has asymptotic variance below $1/I_1(\theta)$, and the MLE attains it.` },
  ] },
]);
