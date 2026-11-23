EXAM({ id: 'mock9', title: 'Mock Midterm 2 — E', summary: 'Original Midterm 2 mock: Laplace scale by MoM (second moment) vs MLE (efficiency ratio 4/5) + equivariance CI, two-sample empirical CDF comparison with the plug-in variance and the DKW band, and the Bernoulli log-odds MLE (an asymptotically normal estimator with no mean).',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30), weighted like the real 2025 paper: MoM vs MLE (40), the empirical CDF and plug-in (30), MLE + Fisher information + delta method (30). 80 minutes. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n$ be iid from the Laplace (double exponential) distribution with PDF
$$f(x;b) = \frac{1}{2b}e^{-|x|/b},\qquad x\in\R,$$
where $b>0$ is an unknown scale. You may use: $|X_1|\sim\Exp(b)$ (mean $b$, variance $b^2$), $E(X_1^2) = 2b^2$ and $E(X_1^4) = 24b^4$. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '9.1', q: R`Explain why the first moment cannot be used for the method of moments here. Derive the MoM estimator $\hat b_{\text{MOM}}$ from the second moment, and show that it is consistent.`,
      h: [R`$f(-x;b) = f(x;b)$, so $E(X_1) = 0$ for every $b$.`, R`Set $2b^2 = \frac1n\sum X_i^2$. Consistency: LLN for $X_i^2$, then continuous mapping with $\sqrt{\cdot}$.`],
      a: [[R`$\hat b_{\text{MOM}}$ (use m2 = (1/n)ΣXᵢ²)`, 'sqrt(m2/2)', { m2: [0.5, 8] }]],
      s: R`**First moment.** The density is symmetric about $0$ and $E|X_1| = b<\infty$, so $E(X_1) = 0$ for **every** $b$. The equation $\mu_1(b) = \bar X_n$ does not involve $b$, so it cannot identify it.

**Second moment.** $\mu_2(b) = E(X_1^2) = 2b^2$. Setting $2b^2 = \hat m_2 = \frac1n\sum X_i^2$ and taking $b>0$:
$$\hat b_{\text{MOM}} = \sqrt{\hat m_2/2}.$$
**Consistency.** The $X_i^2$ are iid with finite mean $2b^2$, so by the WLLN $\hat m_2\xrightarrow{P}2b^2$. The map $h(m) = \sqrt{m/2}$ is continuous on $[0,\infty)$, so by the continuous mapping theorem $\hat b_{\text{MOM}} = h(\hat m_2)\xrightarrow{P}h(2b^2) = b$.` },
    { k: 'b', pts: 10, topic: '9.2', q: R`Derive the MLE $\hat b_{\text{ML}}$ and check that it is a maximum. Compute its bias, variance and MSE exactly.`,
      h: [R`$\ell_n(b) = -n\log(2b) - \frac1b\sum|X_i|$. (The $|x|$ is not differentiable in $x$, but $\ell_n$ is smooth in $b$.)`, R`$\hat b_{\text{ML}}$ is the average of the iid $|X_i|\sim\Exp(b)$.`],
      a: [[R`$\hat b_{\text{ML}}$ (use a = (1/n)Σ|Xᵢ|)`, 'a', { a: [0.5, 5] }], ['bias', '0'], ['MSE', 'b^2/n', { b: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**Log-likelihood** (independence):
$$\ell_n(b) = \sum_i\left[-\log(2b) - \frac{|X_i|}{b}\right] = -n\log(2b) - \frac1b\sum_i|X_i|.$$
**Score.** $\ell_n'(b) = -\frac nb + \frac{\sum|X_i|}{b^2} = 0\iff\hat b_{\text{ML}} = \frac1n\sum_{i=1}^n|X_i|.$

**Maximum.** $\ell_n''(b) = \frac{n}{b^2} - \frac{2\sum|X_i|}{b^3}$. At $\hat b$, $\sum|X_i| = n\hat b$, so $\ell_n''(\hat b) = \frac n{\hat b^2} - \frac{2n}{\hat b^2} = -\frac{n}{\hat b^2}<0$. (Also $\ell_n'>0$ before $\hat b$ and $<0$ after: global maximum.)

**Bias, variance, MSE.** $|X_i|\iid\Exp(b)$, so $E(\hat b_{\text{ML}}) = b$ (unbiased) and, by independence, $\var(\hat b_{\text{ML}}) = \frac{b^2}{n}$. So $\operatorname{MSE} = \frac{b^2}{n}$.` },
    { k: 'c', pts: 10, topic: '9.3', q: R`Compute the Fisher information $I_n(b)$ and the asymptotic distributions of $\hat b_{\text{ML}}$ and $\hat b_{\text{MOM}}$. Compute the ratio of asymptotic variances ML / MoM. What does it mean in terms of sample size?`,
      h: [R`$I_n(b) = -E(\ell_n''(b))$ with $E\sum|X_i| = nb$.`, R`For the MoM: $\var(X_1^2) = E(X_1^4) - (EX_1^2)^2$. Delta method with $h(m) = \sqrt{m/2}$, $h'(m) = \frac{1}{2\sqrt{2m}}$ at $m = 2b^2$.`],
      a: [[R`$I_n(b)$`, 'n/b^2', { b: [0.5, 3], n: [1, 30, 'int'] }], ['avar of MoM', '5*b^2/4', { b: [0.5, 3] }], ['ratio ML/MoM', '4/5']],
      s: R`**Fisher information.**
$$I_n(b) = -E\big(\ell_n''(b)\big) = -\frac{n}{b^2} + \frac{2\,E\sum|X_i|}{b^3} = -\frac{n}{b^2} + \frac{2nb}{b^3} = \frac{n}{b^2}.$$
The support $\R$ does not depend on $b$, so $\sqrt n(\hat b_{\text{ML}} - b)\xrightarrow{D}N(0, b^2)$. Here $\var(\hat b_{\text{ML}}) = 1/I_n(b)$ exactly, for every $n$.

**MoM.** $\var(X_1^2) = 24b^4 - (2b^2)^2 = 20b^4$, so by the CLT $\sqrt n(\hat m_2 - 2b^2)\xrightarrow{D}N(0, 20b^4)$. With $h(m) = \sqrt{m/2}$, $h'(2b^2) = \frac{1}{2\sqrt{4b^2}} = \frac{1}{4b}\ne0$, and the delta method gives
$$\sqrt n(\hat b_{\text{MOM}} - b)\xrightarrow{D}N\left(0, \frac{20b^4}{16b^2}\right) = N\left(0, \frac{5b^2}{4}\right).$$
**Ratio.** $\frac{b^2}{5b^2/4} = \frac45$. The MoM needs about $25\%$ more observations ($\frac54n$) to match the MLE's precision. This is the efficiency of the MLE: nothing beats $1/I_1(b)$ asymptotically. The MoM also wastes information by squaring, which makes it sensitive to the heavy-ish Laplace tails (it uses the fourth moment).` },
    { k: 'd', pts: 10, topic: '9.3', q: R`Let $\psi = P(|X_1|>1) = e^{-1/b}$. Find the MLE $\hat\psi$ and its asymptotic distribution. With $n = 100$ and $\frac1n\sum|x_i| = 2$, give $\hat\psi$ and an approximate 95% confidence interval for $\psi$.`,
      h: [R`Equivariance: $\hat\psi = e^{-1/\hat b_{\text{ML}}}$.`, R`$g(b) = e^{-1/b}$, $g'(b) = \frac{e^{-1/b}}{b^2}$. Then $\widehat{\operatorname{se}} = |g'(\hat b)|\,\hat b/\sqrt n = \frac{e^{-1/\hat b}}{\hat b\sqrt n}$.`],
      a: [[R`$\hat\psi$`, 'exp(-0.5)'], ['lower', 'exp(-0.5)*(1-1.96/20)'], ['upper', 'exp(-0.5)*(1+1.96/20)']],
      s: R`**MLE.** $P(|X_1|>1) = e^{-1/b}$ since $|X_1|\sim\Exp(b)$. By equivariance, $\hat\psi = e^{-1/\hat b_{\text{ML}}}$.

**Asymptotics.** $g(b) = e^{-1/b}$ is differentiable with $g'(b) = \frac{e^{-1/b}}{b^2}\ne0$. By (c) and the delta method,
$$\sqrt n(\hat\psi - \psi)\xrightarrow{D}N\left(0,\ g'(b)^2b^2\right) = N\left(0,\ \frac{e^{-2/b}}{b^2}\right).$$
**Numbers.** $\hat b = 2$, so $\hat\psi = e^{-0.5}\approx0.6065$, and
$$\widehat{\operatorname{se}}(\hat\psi) = \frac{e^{-1/\hat b}}{\hat b\sqrt n} = \frac{0.6065}{2\cdot10} = 0.03033.$$
$$0.6065\pm1.96(0.03033) = 0.6065\pm0.0594 = (0.547,\ 0.666).$$
Plugging $\hat b$ into the standard error is justified by Slutsky ($\hat b\xrightarrow{P}b$).` },
  ] },
  { k: '2', pts: 30, intro: R`Waiting times (minutes) are recorded at two clinics: $X_1,\dots,X_n\iid F_X$ at clinic A and $Y_1,\dots,Y_m\iid F_Y$ at clinic B, the two samples independent of each other. Let $\hat F_X$ and $\hat F_Y$ be their empirical CDFs. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '7.2', q: R`Let $\theta = F_X(30) - F_Y(30)$, the difference in the probability of waiting at most 30 minutes. Give the plug-in estimator $\hat\theta$, its exact variance, and its limiting distribution. With $n = 100$ (62 waits $\le30$) and $m = 80$ (40 waits $\le30$), compute $\hat\theta$, $\widehat{\operatorname{se}}$ and an approximate 95% CI. Is there evidence of a difference?`,
      h: [R`$n\hat F_X(30)\sim\Bin(n, F_X(30))$, independent of $m\hat F_Y(30)\sim\Bin(m, F_Y(30))$.`, R`Variances of independent estimators add, even for a difference.`],
      a: [[R`$\hat\theta$`, '0.12'], [R`$\widehat{\operatorname{se}}$`, 'sqrt(0.62*0.38/100+0.25/80)'], ['lower', '0.12-1.96*sqrt(0.62*0.38/100+0.25/80)'], ['upper', '0.12+1.96*sqrt(0.62*0.38/100+0.25/80)'], ['evidence of a difference at 5%?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`**Estimator.** $\hat\theta = \hat F_X(30) - \hat F_Y(30)$. With $p_X = F_X(30)$ and $p_Y = F_Y(30)$, $n\hat F_X(30)\sim\Bin(n, p_X)$ and $m\hat F_Y(30)\sim\Bin(m, p_Y)$, independent. So $\hat\theta$ is unbiased with
$$\var(\hat\theta) = \frac{p_X(1-p_X)}{n} + \frac{p_Y(1-p_Y)}{m}.$$
By the CLT for each sample (and independence), $\frac{\hat\theta - \theta}{\operatorname{se}}\xrightarrow{D}N(0,1)$ as $n, m\to\infty$, and the same holds with the plug-in $\widehat{\operatorname{se}}$ (Slutsky).

**Numbers.** $\hat\theta = 0.62 - 0.50 = 0.12$ and
$$\widehat{\operatorname{se}} = \sqrt{\frac{0.62\cdot0.38}{100} + \frac{0.5\cdot0.5}{80}} = \sqrt{0.002356 + 0.003125} = 0.0740.$$
$$0.12\pm1.96(0.0740) = 0.12\pm0.145 = (-0.025,\ 0.265).$$
The interval contains $0$, so at the 5% level there is **no clear evidence** of a difference, despite the 12-point gap in the estimates.` },
    { k: 'b', pts: 10, topic: '7.2', q: R`For one sample, show that the plug-in estimator of $\sigma^2 = \int(x - \mu)^2\dd F(x)$ is $\hat\sigma^2 = \frac1n\sum(X_i - \bar X_n)^2$. Compute its bias, and prove it is consistent (assume $\sigma^2<\infty$).`,
      h: [R`Write $\sigma^2 = \int x^2\dd F - \left(\int x\dd F\right)^2$: a function of two linear functionals.`, R`$E\left[\sum(X_i - \bar X)^2\right] = (n-1)\sigma^2$.`],
      a: [['bias', '-sigma^2/n', { sigma: [0.5, 3], n: [1, 30, 'int'] }]],
      s: R`**Plug-in.** $\sigma^2 = T(F) = \int x^2\dd F(x) - \left(\int x\dd F(x)\right)^2$. Replacing $F$ by $\hat F_n$ (mass $\frac1n$ at each $X_i$):
$$T(\hat F_n) = \frac1n\sum X_i^2 - \bar X_n^2 = \frac1n\sum(X_i - \bar X_n)^2 = \hat\sigma^2.$$
**Bias.** $\sum(X_i - \bar X_n)^2 = \sum X_i^2 - n\bar X_n^2$, and $E(X_i^2) = \sigma^2 + \mu^2$, $E(\bar X_n^2) = \frac{\sigma^2}{n} + \mu^2$. So
$$E\left[\sum(X_i - \bar X_n)^2\right] = n(\sigma^2 + \mu^2) - n\left(\frac{\sigma^2}{n} + \mu^2\right) = (n-1)\sigma^2,$$
giving $E(\hat\sigma^2) = \frac{n-1}{n}\sigma^2$ and $\operatorname{bias} = -\frac{\sigma^2}{n}$ (vanishing as $n\to\infty$).

**Consistency.** By the WLLN, $\frac1n\sum X_i^2\xrightarrow{P}\sigma^2 + \mu^2$ (finite since $\sigma^2<\infty$) and $\bar X_n\xrightarrow{P}\mu$. The map $g(a, c) = a - c^2$ is continuous, so by the continuous mapping theorem $\hat\sigma^2 = g\left(\frac1n\sum X_i^2, \bar X_n\right)\xrightarrow{P}\sigma^2 + \mu^2 - \mu^2 = \sigma^2$.` },
    { k: 'c', pts: 10, topic: '7.1', q: R`For clinic A ($n = 100$), compute the half-width $\varepsilon_n$ of the 95% DKW confidence band, and the half-width of the pointwise 95% Wald interval for $F_X(30)$. Explain precisely what each one guarantees, and why the band is wider.`,
      h: [R`DKW: $\varepsilon_n = \sqrt{\frac{1}{2n}\log\frac2\alpha}$.`, R`Wald: $1.96\sqrt{\hat p(1-\hat p)/n}$ with $\hat p = 0.62$.`],
      a: [[R`DKW $\varepsilon_n$`, 'sqrt(log(40)/200)'], ['Wald half-width', '1.96*sqrt(0.62*0.38/100)']],
      s: R`**DKW.** $\varepsilon_{100} = \sqrt{\frac{1}{200}\log\frac{2}{0.05}} = \sqrt{\frac{\log40}{200}} = \sqrt{\frac{3.689}{200}}\approx0.136.$

**Wald.** $1.96\sqrt{\frac{0.62\cdot0.38}{100}} = 1.96(0.0485)\approx0.095$.

**Guarantees.**
- The DKW band $\big[\max(\hat F_n(x) - \varepsilon_n, 0),\ \min(\hat F_n(x) + \varepsilon_n, 1)\big]$ contains the **entire** function $F_X$, at **all** $x$ simultaneously, with probability at least $0.95$, for **every** $n$. It is a finite-sample bound with no normal approximation.
- The Wald interval $0.62\pm0.095$ covers the **single** number $F_X(30)$ with probability **approximately** $0.95$, and only as $n\to\infty$ (CLT).

**Why wider.** Covering infinitely many values at once is harder than covering one, and DKW pays for being exact in finite samples. At $x = 30$ the band gives $(0.484, 0.756)$ versus the pointwise $(0.525, 0.715)$.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n\iid\Ber(p)$ with $0<p<1$, and let $\psi = \log\frac{p}{1-p}$ be the log-odds. Use $\Phi^{-1}(0.975) = 1.96$.`, parts: [
    { k: 'a', pts: 10, topic: '9.3', q: R`Derive the MLE $\hat p$, the Fisher information $I_n(p)$, and the asymptotic distribution of $\hat p$.`,
      h: [R`$\ell_n(p) = S\log p + (n - S)\log(1-p)$ with $S = \sum X_i$.`, R`$-E(\ell_n'') = \frac{np}{p^2} + \frac{n(1-p)}{(1-p)^2}$.`],
      a: [[R`$\hat p$ (use xbar)`, 'xbar', { xbar: [0.1, 0.9] }], [R`$I_n(p)$`, 'n/(p*(1-p))', { p: [0.1, 0.9], n: [1, 30, 'int'] }]],
      s: R`**MLE.** With $S = \sum X_i$, $\ell_n(p) = S\log p + (n - S)\log(1-p)$, and
$$\ell_n'(p) = \frac Sp - \frac{n - S}{1 - p} = 0\iff S(1-p) = p(n - S)\iff\hat p = \frac Sn = \bar X_n.$$
$\ell_n''(p) = -\frac{S}{p^2} - \frac{n - S}{(1-p)^2}<0$, so it is a maximum. (If $S = 0$ or $S = n$, $\ell_n$ is monotone and the maximum is at the boundary $0$ or $1$, which is still $\bar X_n$.)

**Fisher information.** $I_n(p) = \frac{E(S)}{p^2} + \frac{n - E(S)}{(1-p)^2} = \frac np + \frac{n}{1-p} = \frac{n}{p(1-p)}$.

**Asymptotics.** The model is regular, so $\sqrt n(\hat p - p)\xrightarrow{D}N\big(0, p(1-p)\big)$. This matches the CLT, as $\var(X_1) = p(1-p)$.` },
    { k: 'b', pts: 10, topic: '9.3', q: R`Find the MLE $\hat\psi$ and its asymptotic distribution. With $n = 200$ and $140$ successes, compute $\hat\psi$, a 95% CI for $\psi$, and transform it into a CI for $p$. Compare with the Wald interval for $p$.`,
      h: [R`$g(p) = \log\frac{p}{1-p}$ has $g'(p) = \frac1p + \frac1{1-p} = \frac{1}{p(1-p)}$.`, R`$\widehat{\operatorname{se}}(\hat\psi) = \frac{1}{\sqrt{n\hat p(1-\hat p)}}$. Map back with $p = \frac{e^\psi}{1 + e^\psi}$ (increasing).`],
      a: [[R`$\hat\psi$`, 'log(7/3)'], [R`$\psi$: lower`, 'log(7/3)-1.96/sqrt(42)'], [R`$\psi$: upper`, 'log(7/3)+1.96/sqrt(42)'], [R`$p$: lower (back-transformed)`, '1/(1+exp(-(log(7/3)-1.96/sqrt(42))))'], [R`$p$: upper (back-transformed)`, '1/(1+exp(-(log(7/3)+1.96/sqrt(42))))']],
      s: R`**MLE and asymptotics.** By equivariance $\hat\psi = \log\frac{\hat p}{1 - \hat p}$. $g'(p) = \frac{1}{p(1-p)}\ne0$, so by the delta method
$$\sqrt n(\hat\psi - \psi)\xrightarrow{D}N\left(0,\ \frac{p(1-p)}{p^2(1-p)^2}\right) = N\left(0,\ \frac{1}{p(1-p)}\right).$$
**Numbers.** $\hat p = 0.7$, $\hat\psi = \log\frac{0.7}{0.3} = \log\frac73\approx0.847$, and $\widehat{\operatorname{se}} = \frac{1}{\sqrt{200\cdot0.21}} = \frac1{\sqrt{42}} = 0.1543$:
$$\psi:\quad0.847\pm1.96(0.1543) = 0.847\pm0.302 = (0.545,\ 1.150).$$
Since $p = \frac{e^\psi}{1 + e^\psi}$ is increasing, applying it to both endpoints gives a 95% CI for $p$: $(0.633,\ 0.759)$.

**Wald for $p$:** $0.7\pm1.96\sqrt{0.21/200} = 0.7\pm0.0635 = (0.636,\ 0.764)$. The two are close here. The back-transformed interval is not symmetric around $0.7$ and always stays inside $(0,1)$, which matters when $\hat p$ is near $0$ or $1$.` },
    { k: 'c', pts: 10, topic: '5.1', q: R`Compute $P(\hat\psi = +\infty)$ and $P(\hat\psi = -\infty)$ for finite $n$. Does $E(\hat\psi)$ exist? Reconcile this with (b), which says $\hat\psi$ is consistent and asymptotically normal.`,
      h: [R`$\hat\psi = +\infty$ iff $\hat p = 1$ iff all $X_i = 1$.`, R`On the event $\{0<\hat p<1\}$, $\hat\psi = g(\hat p)$, and the probability of its complement goes to $0$.`],
      a: [[R`$P(\hat\psi = \pm\infty)$ in total`, 'p^n+(1-p)^n', { p: [0.1, 0.9], n: [1, 30, 'int'] }], [R`does $E(\hat\psi)$ exist?`, { choice: ['Yes', 'No'], v: 1 }]],
      s: R`**Infinite values.** $\hat\psi = +\infty$ iff $\hat p = 1$ iff all $X_i = 1$, so $P(\hat\psi = +\infty) = p^n$. Likewise $P(\hat\psi = -\infty) = (1-p)^n$. Both are positive for every finite $n$.

**Mean.** $\hat\psi$ takes the values $+\infty$ and $-\infty$ with positive probability, so $E|\hat\psi| = \infty$ and $E(\hat\psi)$ is **not defined** ($\infty - \infty$). In particular, "bias" and "MSE" make no sense for $\hat\psi$.

**Reconciliation.** Convergence in probability and in distribution only concern probabilities of events, not moments. $P(\hat p\in\{0,1\}) = p^n + (1-p)^n\to0$, and on the complement $\hat\psi = g(\hat p)$ with $g$ continuous on $(0,1)$. So $\hat\psi\xrightarrow{P}\psi$ (continuous mapping), and the delta method gives the normal limit: a sequence that differs from an asymptotically normal one only on events of vanishing probability has the same limit (Slutsky). The rare infinite values ruin the mean but not the distributional limit. It is the same lesson as $W_n = n\1(U\le\frac1n)$: $\xrightarrow{D}$ does **not** imply convergence of moments.` },
  ] },
]);
