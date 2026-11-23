EXAM({ id: 'mock8', title: 'Mock Midterm 2 — D', summary: 'Original Midterm 2 mock: MoM vs MLE for Uniform(θ, 2θ) (the MLE is X₍ₙ₎/2 and only wins from n = 11), geometric MLE + Fisher information + equivariance CIs, and plug-in + exact bootstrap by hand, including why the bootstrap fails for the maximum.',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30), weighted like the real 2025 paper: MoM vs MLE compared by MSE (40), MLE + Fisher information + delta method (30), plug-in and the bootstrap (30). 80 minutes. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n\iid\Unif(\theta, 2\theta)$, with PDF $f(x;\theta) = \frac1\theta$ for $\theta\le x\le2\theta$ (and $0$ otherwise), where $\theta>0$ is unknown. Write $X_{(1)} = \min_iX_i$ and $X_{(n)} = \max_iX_i$.`, parts: [
    { k: 'a', pts: 10, topic: '9.1', q: R`Derive the method-of-moments estimator $\hat\theta_{\text{MOM}}$. Compute its bias and MSE, and derive its asymptotic distribution.`,
      h: [R`$E(X_1) = \frac{\theta + 2\theta}{2}$ and $\var(X_1) = \frac{(2\theta - \theta)^2}{12}$ (uniform on an interval).`, R`$\var(c\bar X_n) = c^2\var(X_1)/n$.`],
      a: [[R`$\hat\theta_{\text{MOM}}$ (use xbar)`, '2*xbar/3', { xbar: [1, 6] }], ['MSE', 'theta^2/(27*n)', { theta: [0.5, 3], n: [1, 30, 'int'] }], [R`asymptotic variance of $\sqrt n(\hat\theta_{\text{MOM}} - \theta)$`, 'theta^2/27', { theta: [0.5, 3] }]],
      s: R`**MoM.** $\mu_1(\theta) = E(X_1) = \frac{3\theta}{2}$. Setting $\frac{3\hat\theta}{2} = \bar X_n$:
$$\hat\theta_{\text{MOM}} = \frac{2\bar X_n}{3}.$$
**Bias.** By linearity $E(\hat\theta_{\text{MOM}}) = \frac23\cdot\frac{3\theta}2 = \theta$: unbiased.

**MSE.** $\var(X_1) = \frac{\theta^2}{12}$, and by independence $\var(\bar X_n) = \frac{\theta^2}{12n}$, so
$$\operatorname{MSE}(\hat\theta_{\text{MOM}}) = \var(\hat\theta_{\text{MOM}}) = \frac49\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{27n}.$$
**Asymptotics.** CLT (finite variance) and the linear map $t\mapsto\frac23t$ (delta method with $g' = \frac23$):
$$\sqrt n(\hat\theta_{\text{MOM}} - \theta)\xrightarrow{D}N\left(0, \frac49\cdot\frac{\theta^2}{12}\right) = N\left(0, \frac{\theta^2}{27}\right).$$` },
    { k: 'b', pts: 10, topic: '9.2', q: R`Write the likelihood with indicators and show that the MLE is $\hat\theta_{\text{ML}} = X_{(n)}/2$. Why is it not $X_{(1)}$?`,
      h: [R`$\prod_i\1(\theta\le X_i\le2\theta) = \1(\theta\le X_{(1)})\,\1(X_{(n)}\le2\theta)$.`, R`So $L_n(\theta) = \theta^{-n}$ on the interval $\frac{X_{(n)}}2\le\theta\le X_{(1)}$, and $0$ elsewhere. Which end does a decreasing function prefer?`],
      s: R`**Likelihood.**
$$L_n(\theta) = \prod_{i=1}^n\frac1\theta\1(\theta\le X_i\le2\theta) = \theta^{-n}\,\1\big(\theta\le X_{(1)}\big)\,\1\big(X_{(n)}\le2\theta\big) = \theta^{-n}\,\1\left(\frac{X_{(n)}}{2}\le\theta\le X_{(1)}\right).$$
All $X_i\ge\theta$ iff the smallest is, and all $X_i\le2\theta$ iff the largest is. The interval is non-empty, since the true $\theta$ lies in it.

**Maximize.** On that interval $L_n(\theta) = \theta^{-n}$ is strictly **decreasing**, so the maximum is at the **left** end:
$$\hat\theta_{\text{ML}} = \frac{X_{(n)}}{2}.$$
The score $\ell_n'(\theta) = -\frac n\theta$ is never $0$, so calculus cannot find it: the support depends on $\theta$.

**Why not $X_{(1)}$.** $X_{(1)}$ is the *right* end of the allowed interval, where $\theta^{-n}$ is smallest. Both order statistics constrain $\theta$, but the likelihood prefers small $\theta$, and the binding constraint for small $\theta$ is $2\theta\ge X_{(n)}$.` },
    { k: 'c', pts: 10, topic: '6.2', q: R`Write $X_{(n)} = \theta(1 + V)$ where $V = \max_iU_i$ for $U_i = X_i/\theta - 1\iid\Unif(0,1)$. Using $P(V\le v) = v^n$, compute the bias and MSE of $\hat\theta_{\text{ML}}$. For which $n$ is $\hat\theta_{\text{ML}}$ strictly better than $\hat\theta_{\text{MOM}}$?`,
      h: [R`$\hat\theta_{\text{ML}} - \theta = \frac\theta2(1+V) - \theta = -\frac\theta2(1 - V)$.`, R`$1 - V$ has density $n(1-w)^{n-1}$ on $(0,1)$: $E(1-V) = \frac1{n+1}$, $E(1-V)^2 = \frac{2}{(n+1)(n+2)}$.`, R`Compare $\frac{1}{2(n+1)(n+2)}$ with $\frac1{27n}$.`],
      a: [['bias', '-theta/(2*(n+1))', { theta: [0.5, 3], n: [1, 30, 'int'] }], ['MSE', 'theta^2/(2*(n+1)*(n+2))', { theta: [0.5, 3], n: [1, 30, 'int'] }], ['smallest n', '11']],
      s: R`$U_i = X_i/\theta - 1\iid\Unif(0,1)$ and $X_{(n)} = \theta(1 + V)$ with $V = \max U_i$, $P(V\le v) = v^n$ (independence). So $W = 1 - V$ has $P(W>w) = (1-w)^n$, density $n(1-w)^{n-1}$ on $(0,1)$, i.e. $W\sim\Bet(1,n)$:
$$E(W) = \frac1{n+1},\qquad E(W^2) = n\int_0^1w^2(1-w)^{n-1}\dd w = n\frac{\Gamma(3)\Gamma(n)}{\Gamma(n+3)} = \frac{2}{(n+1)(n+2)}.$$
**Bias.** $\hat\theta_{\text{ML}} - \theta = -\frac\theta2W$, so $\operatorname{bias} = -\frac{\theta}{2(n+1)}$ (it underestimates, since $X_{(n)}\le2\theta$).

**MSE.** $E\left[\left(\frac\theta2W\right)^2\right] = \frac{\theta^2}{4}\cdot\frac{2}{(n+1)(n+2)} = \frac{\theta^2}{2(n+1)(n+2)}.$

**Comparison.**
$$\frac{\theta^2}{2(n+1)(n+2)}<\frac{\theta^2}{27n}\iff27n<2n^2 + 6n + 4\iff2n^2 - 21n + 4>0\iff n>\frac{21 + \sqrt{409}}{4}\approx10.3.$$
Check: $n = 10$ gives $200 - 210 + 4 = -6<0$ (MoM better), and $n = 11$ gives $242 - 231 + 4 = 15>0$. So the MLE is strictly better for $n\ge11$. Unlike $\Unif(0,\theta)$, the MoM is quite good here for small $n$ (its variance has the small factor $\frac1{27}$), but the MLE's $\frac1{n^2}$ rate always wins eventually.` },
    { k: 'd', pts: 10, topic: '9.3', q: R`Show that both estimators are consistent. Find the limiting distribution of $\frac{2n}{\theta}(\theta - \hat\theta_{\text{ML}})$. Give an unbiased estimator of the form $c_nX_{(n)}$ and its MSE.`,
      h: [R`$\frac{2n}{\theta}(\theta - \hat\theta_{\text{ML}}) = nW$, and $P(nW>t) = (1 - t/n)^n$.`, R`$E(X_{(n)}) = \theta\left(1 + \frac{n}{n+1}\right) = \theta\frac{2n+1}{n+1}$.`],
      a: [['limit', { choice: ['N(0, 1)', 'Exp(1), mean 1', 'Degenerate at 0', 'χ²₁'], v: 1 }], [R`unbiased estimator (use M = $X_{(n)}$)`, '(n+1)*M/(2*n+1)', { M: [1, 6], n: [1, 30, 'int'] }], ['its MSE', 'theta^2*n/((2*n+1)^2*(n+2))', { theta: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**Consistency.** $\operatorname{MSE}(\hat\theta_{\text{MOM}}) = \frac{\theta^2}{27n}\to0$ and $\operatorname{MSE}(\hat\theta_{\text{ML}}) = \frac{\theta^2}{2(n+1)(n+2)}\to0$. MSE $\to0$ gives convergence in quadratic mean, hence in probability: both are consistent.

**Limit.** $\frac{2n}{\theta}(\theta - \hat\theta_{\text{ML}}) = nW$, and for fixed $t>0$ and $n\ge t$:
$$P(nW>t) = \left(1 - \frac tn\right)^n\to e^{-t}.$$
So $\frac{2n}{\theta}(\theta - \hat\theta_{\text{ML}})\xrightarrow{D}\Exp(1)$: rate $n$, and a non-normal limit. The Fisher-information theory does not apply because the support $[\theta, 2\theta]$ depends on $\theta$.

**Unbiased version.** $E(X_{(n)}) = \theta(1 + EV) = \theta\frac{2n+1}{n+1}$, so
$$\tilde\theta = \frac{n+1}{2n+1}X_{(n)}$$
is unbiased. Its MSE is its variance: $\var(X_{(n)}) = \theta^2\var(V) = \theta^2\frac{n}{(n+1)^2(n+2)}$, so
$$\operatorname{MSE}(\tilde\theta) = \frac{(n+1)^2}{(2n+1)^2}\cdot\frac{\theta^2n}{(n+1)^2(n+2)} = \frac{\theta^2n}{(2n+1)^2(n+2)}\approx\frac{\theta^2}{4n^2},$$
about half the MSE of $\hat\theta_{\text{ML}}$ for large $n$.` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X_1,\dots,X_n$ be iid geometric with PMF $f(x;p) = p(1-p)^{x-1}$, $x = 1, 2, \dots$ (the number of trials up to the first success), where $0<p<1$. Recall $E(X_1) = \frac1p$ and $\var(X_1) = \frac{1-p}{p^2}$. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '9.2', q: R`Derive the MLE $\hat p$ and check that it is a maximum. Is $\hat p$ unbiased? Justify without computing $E(\hat p)$.`,
      h: [R`$\ell_n(p) = n\log p + \left(\sum X_i - n\right)\log(1-p)$.`, R`Jensen's inequality for the strictly convex $t\mapsto1/t$.`],
      a: [[R`$\hat p$ (use xbar)`, '1/xbar', { xbar: [1.2, 6] }], ['unbiased?', { choice: ['Yes', 'No: it overestimates p', 'No: it underestimates p'], v: 1 }]],
      s: R`**Log-likelihood** (independence): with $S = \sum X_i$,
$$\ell_n(p) = n\log p + (S - n)\log(1-p).$$
**Score.** $\ell_n'(p) = \frac np - \frac{S - n}{1 - p} = 0\iff n(1-p) = p(S - n)\iff n = pS\iff\hat p = \frac{n}{S} = \frac1{\bar X_n}.$

**Maximum.** $\ell_n''(p) = -\frac{n}{p^2} - \frac{S - n}{(1-p)^2}<0$, since $S\ge n$. So $\ell_n$ is strictly concave and $\hat p$ is the global maximum. (If all $X_i = 1$, then $\ell_n = n\log p$ is maximized at the boundary $p = 1 = 1/\bar X_n$, so the formula still holds.)

**Bias.** $t\mapsto\frac1t$ is strictly convex on $(0,\infty)$ and $\bar X_n$ is not constant, so by Jensen
$$E(\hat p) = E\left(\frac1{\bar X_n}\right)>\frac1{E(\bar X_n)} = p.$$
So $\hat p$ is **biased upward**. (The bias vanishes as $n\to\infty$.)` },
    { k: 'b', pts: 10, topic: '9.3', q: R`Compute the Fisher information $I_n(p)$ and the asymptotic distribution of $\hat p$. Check your answer with the CLT and the delta method.`,
      h: [R`$I_n(p) = -E(\ell_n''(p))$ with $E(S - n) = n\left(\frac1p - 1\right) = \frac{n(1-p)}{p}$.`, R`Delta method: $g(m) = 1/m$, $g'(m) = -1/m^2$ at $m = 1/p$.`],
      a: [[R`$I_n(p)$`, 'n/(p^2*(1-p))', { p: [0.1, 0.9], n: [1, 30, 'int'] }], [R`asymptotic variance of $\sqrt n(\hat p - p)$`, 'p^2*(1-p)', { p: [0.1, 0.9] }]],
      s: R`**Fisher information.**
$$I_n(p) = \frac{n}{p^2} + \frac{E(S - n)}{(1-p)^2} = \frac n{p^2} + \frac{n(1-p)/p}{(1-p)^2} = \frac{n}{p^2} + \frac{n}{p(1-p)} = \frac{n\big[(1-p) + p\big]}{p^2(1-p)} = \frac{n}{p^2(1-p)}.$$
The support $\{1,2,\dots\}$ does not depend on $p$ (regular model), so
$$\sqrt n(\hat p - p)\xrightarrow{D}N\big(0,\ 1/I_1(p)\big) = N\big(0,\ p^2(1-p)\big).$$
**Check.** CLT: $\sqrt n(\bar X_n - \frac1p)\xrightarrow{D}N\left(0, \frac{1-p}{p^2}\right)$. Delta method with $g(m) = \frac1m$, $g'(\frac1p) = -p^2\ne0$: the asymptotic variance is $p^4\cdot\frac{1-p}{p^2} = p^2(1-p)$. ✓` },
    { k: 'c', pts: 10, topic: '9.3', q: R`Let $\psi = P(X_1\ge3) = (1-p)^2$. Find the MLE $\hat\psi$ and its asymptotic distribution. With $n = 50$ and $\bar x = 4$, give approximate 95% confidence intervals for $p$ and for $\psi$.`,
      h: [R`$P(X_1\ge3) = P(\text{first two trials fail})$. Equivariance gives $\hat\psi$.`, R`Delta method: $g(p) = (1-p)^2$, $g'(p) = -2(1-p)$, so $\widehat{\operatorname{se}}(\hat\psi) = 2(1-\hat p)\,\widehat{\operatorname{se}}(\hat p)$.`],
      a: [[R`$p$: lower`, '0.25-1.96*sqrt(0.0625*0.75/50)'], [R`$p$: upper`, '0.25+1.96*sqrt(0.0625*0.75/50)'], [R`$\hat\psi$`, '0.5625'], [R`$\psi$: lower`, '0.5625-1.96*1.5*sqrt(0.0625*0.75/50)'], [R`$\psi$: upper`, '0.5625+1.96*1.5*sqrt(0.0625*0.75/50)']],
      s: R`**MLE.** $X_1\ge3$ iff the first two trials fail, so $\psi = (1-p)^2$. By equivariance, $\hat\psi = (1 - \hat p)^2 = \left(1 - \frac1{\bar X_n}\right)^2$.

**Asymptotics.** $g(p) = (1-p)^2$ has $g'(p) = -2(1-p)\ne0$. By the delta method and (b),
$$\sqrt n(\hat\psi - \psi)\xrightarrow{D}N\big(0,\ 4(1-p)^2\cdot p^2(1-p)\big) = N\big(0,\ 4p^2(1-p)^3\big).$$
**Numbers.** $\hat p = \frac14 = 0.25$ and $\widehat{\operatorname{se}}(\hat p) = \sqrt{\hat p^2(1-\hat p)/n} = \sqrt{0.0625\cdot0.75/50} = 0.03062$, so
$$p:\quad0.25\pm1.96(0.03062) = 0.25\pm0.0600 = (0.190,\ 0.310).$$
$\hat\psi = 0.75^2 = 0.5625$ and $\widehat{\operatorname{se}}(\hat\psi) = 2(0.75)(0.03062) = 0.04593$, so
$$\psi:\quad0.5625\pm1.96(0.04593) = 0.5625\pm0.0900 = (0.4725,\ 0.6525).$$
Plugging $\hat p$ into the standard errors is justified by Slutsky ($\hat p\xrightarrow{P}p$).` },
  ] },
  { k: '3', pts: 30, intro: R`You observe $n = 5$ values, assumed iid from an unknown CDF $F$:
$$2,\quad3,\quad3,\quad5,\quad7.$$
Let $\hat F_5$ be the empirical CDF and $X_1^*,\dots,X_5^*$ a nonparametric bootstrap sample (drawn with replacement from the data).`, parts: [
    { k: 'a', pts: 10, topic: '7.1', q: R`Compute $\hat F_5(3)$ and $\hat F_5(6)$, and the plug-in estimates of the mean, the variance $\sigma^2 = \int(x-\mu)^2\dd F(x)$, the median, and $\theta = P(X>4)$. Give the estimated standard error of $\hat\theta$.`,
      h: [R`$\hat F_5(x)$ = fraction of data points $\le x$ (count ties!).`, R`The plug-in variance divides by $n$, not $n-1$. $\hat\theta$ is a sample proportion.`],
      a: [[R`$\hat F_5(3)$`, '0.6'], [R`$\hat F_5(6)$`, '0.8'], ['mean', '4'], ['variance', '3.2'], ['median', '3'], [R`$\hat\theta$`, '0.4'], [R`$\widehat{\operatorname{se}}(\hat\theta)$`, 'sqrt(0.24/5)']],
      s: R`**Empirical CDF.** Three of the five values are $\le3$ (namely $2,3,3$), so $\hat F_5(3) = \frac35 = 0.6$. Four are $\le6$, so $\hat F_5(6) = 0.8$.

**Plug-in estimates** ($\hat F_5$ puts mass $\frac15$ on each data point):
- mean $\hat\mu = \bar x = \frac{2+3+3+5+7}{5} = 4$;
- variance $\hat\sigma^2 = \frac15\sum(x_i - 4)^2 = \frac{4+1+1+1+9}{5} = \frac{16}{5} = 3.2$;
- median $\hat F_5^{-1}(\frac12) = \inf\{x:\hat F_5(x)\ge\frac12\} = 3$, since $\hat F_5(2) = 0.2$ and $\hat F_5(3) = 0.6$;
- $\hat\theta = 1 - \hat F_5(4) = 1 - 0.6 = 0.4$.

**Standard error.** $n\hat\theta\sim\Bin(n,\theta)$, so $\operatorname{se}(\hat\theta) = \sqrt{\theta(1-\theta)/n}$, estimated by $\sqrt{0.4\cdot0.6/5} = \sqrt{0.048}\approx0.219$. (With $n = 5$, a normal-approximation interval would be unreliable.)` },
    { k: 'b', pts: 10, topic: '8.1', q: R`Compute exactly $E^*(\bar X^*)$ and $\var^*(\bar X^*)$. Let $\hat\sigma^{2*}$ be the plug-in variance of the bootstrap sample. Compute $E^*(\hat\sigma^{2*})$, the bootstrap estimate of the bias of $\hat\sigma^2$, and the bias-corrected estimate.`,
      h: [R`Given the data, $X_i^*$ are iid from $\hat F_5$: mean $\bar x = 4$, variance $\hat\sigma^2 = 3.2$.`, R`For any iid sample of size $n$ from a distribution with variance $\sigma^2$, the plug-in variance has expectation $\frac{n-1}{n}\sigma^2$. Apply this with $\hat F_5$ playing the role of $F$.`],
      a: [[R`$E^*(\bar X^*)$`, '4'], [R`$\var^*(\bar X^*)$`, '0.64'], [R`$E^*(\hat\sigma^{2*})$`, '2.56'], ['bootstrap bias estimate', '-0.64'], ['bias-corrected estimate', '3.84']],
      s: R`Conditionally on the data, $X_1^*,\dots,X_5^*$ are iid from $\hat F_5$, which has mean $\bar x = 4$ and variance $\hat\sigma^2 = 3.2$. So
$$E^*(\bar X^*) = 4,\qquad\var^*(\bar X^*) = \frac{\hat\sigma^2}{n} = \frac{3.2}{5} = 0.64.$$
**Plug-in variance.** For iid $Y_1,\dots,Y_n$ with variance $\sigma^2$: $E\left[\frac1n\sum(Y_i - \bar Y)^2\right] = \frac{n-1}{n}\sigma^2$. Applied under $\hat F_5$:
$$E^*(\hat\sigma^{2*}) = \frac45\cdot3.2 = 2.56.$$
**Bootstrap bias estimate:** $E^*(\hat\sigma^{2*}) - \hat\sigma^2 = 2.56 - 3.2 = -0.64$, i.e. $-\hat\sigma^2/n$. This mimics the true bias $-\sigma^2/n$.

**Bias-corrected:** $\hat\sigma^2 - (-0.64) = 3.84$. (Compare the unbiased $S^2 = \frac{16}{4} = 4$: the bootstrap correction $\hat\sigma^2(1 + \frac1n)$ goes in the right direction but only approximately.)` },
    { k: 'c', pts: 10, topic: '8.1', q: R`Compute $P^*\big(\max_iX_i^* = 7\big)$ exactly. For a general sample of $n$ distinct values, show that $P^*(\max X_i^* = X_{(n)})\to1 - e^{-1}$. Explain why this means the bootstrap fails for $\hat\theta = X_{(n)}$ in the $\Unif(0,\theta)$ model, where $n(\theta - X_{(n)})/\theta\xrightarrow{D}\Exp(1)$.`,
      h: [R`$P^*(\max<7) = P^*(\text{no draw equals }7) = (4/5)^5$.`, R`In general $P^*(\max X^* = X_{(n)}) = 1 - (1 - \frac1n)^n$.`],
      a: [[R`$P^*(\max = 7)$`, '1-(4/5)^5'], ['limit', '1-exp(-1)']],
      s: R`**Exact.** The bootstrap max equals $7$ unless none of the 5 draws is $7$. Each draw misses $7$ with probability $\frac45$, independently, so
$$P^*(\max X_i^* = 7) = 1 - \left(\frac45\right)^5 = 1 - 0.32768 = 0.67232.$$
**General $n$.** Likewise $P^*(\max X_i^* = X_{(n)}) = 1 - \left(1 - \frac1n\right)^n\to1 - e^{-1}\approx0.632$.

**Why the bootstrap fails.** It estimates the distribution of $n(\theta - X_{(n)})/\theta$ by that of $n(X_{(n)} - X^*_{(n)})/X_{(n)}$. The true limit $\Exp(1)$ is **continuous**: $P(n(\theta - X_{(n)}) = 0) = 0$. But the bootstrap version equals $0$ with probability $\approx0.632$ for every large $n$: a big atom at $0$ that never goes away. So the bootstrap distribution does not converge to the right limit. The underlying reason: $X_{(n)}$ is not a smooth function of averages. It depends on the extreme tail of $F$ near $\theta$, which $\hat F_n$ cannot reproduce (it has no mass above $X_{(n)}$).` },
  ] },
]);
