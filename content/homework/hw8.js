HW({ id: 'hw8', title: 'Homework 8', summary: 'Estimation (Ch.6–7): bias, se, MSE; the empirical CDF.',
  intro: R`Topics: Chapter 6 (bias, standard error, MSE) and the empirical distribution function from textbook Chapter 7. The B problems were **due Nov 4, 8:30** on Blackboard. **There are no official solutions**, so these were written for this app, and each formula was double-checked numerically.

Definitions used throughout: for an estimator $\hat\theta_n$ of $\theta$,
$$\text{bias}(\hat\theta_n) = \E(\hat\theta_n) - \theta,\qquad\text{se}(\hat\theta_n) = \sqrt{\var(\hat\theta_n)},\qquad\text{MSE}(\hat\theta_n) = \E[(\hat\theta_n - \theta)^2] = \text{bias}^2 + \var.$$
When an answer box asks for a formula, type it using the variable names given in the label (e.g. <code>theta^2/(3*n)</code>).` }, [
  { k: 'A1', topic: '6.2', lvl: 2, q: R`Let $X_1,\dots,X_n\iid\Unif(0,\theta)$ and $\hat\theta = 2\bar X_n$. Find the bias, se and MSE of $\hat\theta$.`,
    h: [R`For $\Unif(0,\theta)$: $\E X_i = \frac\theta2$ and $\var(X_i) = \frac{\theta^2}{12}$.`, R`$\E(2\bar X_n) = 2\E\bar X_n$ and $\var(2\bar X_n) = 4\var(\bar X_n) = 4\frac{\var X_1}{n}$.`, R`Unbiased estimators have $\text{MSE} = \var$.`],
    a: [['bias', { expr: '0', vars: { n: [2, 50, 'int'], theta: [0.5, 5] } }], ['se (use n, theta)', { expr: 'theta/sqrt(3*n)', vars: { n: [2, 50, 'int'], theta: [0.5, 5] } }], ['MSE (use n, theta)', { expr: 'theta^2/(3*n)', vars: { n: [2, 50, 'int'], theta: [0.5, 5] } }]],
    s: R`For $X_i\sim\Unif(0,\theta)$: $\E X_i = \frac\theta2$, $\var(X_i) = \frac{\theta^2}{12}$.

**Bias.** By linearity, $\E(\hat\theta) = 2\E(\bar X_n) = 2\cdot\frac\theta2 = \theta$, so $\text{bias}(\hat\theta) = 0$. ($\hat\theta$ is the method-of-moments idea: the mean is $\theta/2$, so double the sample mean.)

**se.** By independence, $\var(\bar X_n) = \frac{\var X_1}{n} = \frac{\theta^2}{12n}$, so
$$\var(\hat\theta) = 4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n},\qquad\text{se}(\hat\theta) = \frac{\theta}{\sqrt{3n}}.$$

**MSE.** $\text{MSE} = \text{bias}^2 + \var = 0 + \frac{\theta^2}{3n} = \frac{\theta^2}{3n}$.

It tends to 0 as $n\to\infty$, so $\hat\theta$ is consistent. Compare B2: the maximum does better ($\text{MSE}\sim\frac{2\theta^2}{n^2}$).`,
    src: 'HW8 A1 (Wasserman 6.6.3; solution written for this app)' },
  { k: 'A2', topic: '6.2', lvl: 2, q: R`Let $X_1,\dots,X_n\iid\Pois(\lambda)$ and $\hat\lambda = \frac1n\sum_{i=1}^nX_i$. Find the bias, se and MSE of $\hat\lambda$.`,
    h: [R`Poisson: mean and variance are both $\lambda$.`, R`$\E\bar X_n = \E X_1$ and $\var\bar X_n = \frac{\var X_1}{n}$ (independence).`],
    a: [['bias', { expr: '0', vars: { n: [2, 50, 'int'], lambda: [0.5, 8] } }], ['se (use n, lambda)', { expr: 'sqrt(lambda/n)', vars: { n: [2, 50, 'int'], lambda: [0.5, 8] } }], ['MSE (use n, lambda)', { expr: 'lambda/n', vars: { n: [2, 50, 'int'], lambda: [0.5, 8] } }]],
    s: R`For $X_i\sim\Pois(\lambda)$: $\E X_i = \var(X_i) = \lambda$.

**Bias.** $\E(\hat\lambda) = \frac1n\sum\E X_i = \lambda$, so $\text{bias}(\hat\lambda) = 0$.

**se.** By independence, $\var(\hat\lambda) = \frac1{n^2}\sum\var(X_i) = \frac{n\lambda}{n^2} = \frac\lambda n$, so $\text{se}(\hat\lambda) = \sqrt{\lambda/n}$.

**MSE.** $0^2 + \frac\lambda n = \frac\lambda n$.

In practice $\lambda$ is unknown, so the **estimated** standard error is $\widehat{\text{se}} = \sqrt{\hat\lambda/n}$.`,
    src: 'HW8 A2 (Wasserman 6.6.1; solution written for this app)' },
  { k: 'A3', topic: '7.1', lvl: 3, q: R`Let $X_1,\dots,X_n\sim F$ (iid) and let $\hat F_n(x) = \frac1n\sum_{i=1}^n\1(X_i\le x)$ be the empirical distribution function. For a fixed $x$, use the central limit theorem to find the limiting distribution of $\hat F_n(x)$. Enter the variance of the limit of $\sqrt n\big(\hat F_n(x) - F(x)\big)$, writing $F$ for $F(x)$.`,
    h: [R`For fixed $x$, the indicators $Y_i = \1(X_i\le x)$ are iid. What distribution? (A yes/no variable.)`, R`$Y_i\sim\Ber(F(x))$, so $\hat F_n(x) = \bar Y_n$ is a sample mean. Apply the CLT to it.`],
    a: { expr: 'F*(1-F)', vars: { F: [0.05, 0.95] } },
    s: R`Fix $x$ and let $Y_i = \1(X_i\le x)$. The $Y_i$ are iid (functions of iid variables), and
$$P(Y_i = 1) = P(X_i\le x) = F(x),$$
so $Y_i\sim\Ber(F(x))$, with $\E Y_i = F(x)$ and $\var(Y_i) = F(x)(1 - F(x))<\infty$.

Since $\hat F_n(x) = \frac1n\sum Y_i = \bar Y_n$ is a sample mean of iid variables with finite variance, the CLT gives
$$\sqrt n\big(\hat F_n(x) - F(x)\big)\xrightarrow{D}N\big(0,\ F(x)(1 - F(x))\big).$$
Equivalently, for large $n$,
$$\hat F_n(x)\ \approx\ N\left(F(x),\ \frac{F(x)(1-F(x))}{n}\right).$$
(Also: $\E\hat F_n(x) = F(x)$, so $\hat F_n(x)$ is unbiased, and $n\hat F_n(x)\sim\Bin(n, F(x))$ exactly. If $F(x)\in\{0,1\}$ the limit is degenerate at 0.)`,
    src: 'HW8 A3 (Wasserman 7.4.4; solution written for this app)' },
  { k: 'B1', topic: '6.2', lvl: 3, q: R`Let $X_1,\dots,X_n\iid N(\mu,\sigma^2)$ and consider
$$\hat\mu = \bar X_n,\qquad\hat\sigma^2 = S_n^2 = \frac{1}{n-1}\sum_{i=1}^n(X_i - \bar X_n)^2.$$
Find the bias, se and MSE of both estimators.`,
    h: [R`$\hat\mu$: linearity and independence, as in A2.`, R`$S_n^2$ is unbiased (HW7 A1). For its variance use the normal-sample fact $\frac{(n-1)S_n^2}{\sigma^2}\sim\chi^2_{n-1}$.`, R`$\chi^2_k = \Gam(\frac k2, 2)$ has variance $2k$. So $\var(S_n^2) = \frac{\sigma^4}{(n-1)^2}\cdot2(n-1)$.`],
    a: [[R`bias of $\hat\mu$`, { expr: '0', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }], [R`se of $\hat\mu$ (use n, sigma)`, { expr: 'sigma/sqrt(n)', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }], [R`MSE of $\hat\mu$`, { expr: 'sigma^2/n', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }], [R`bias of $S_n^2$`, { expr: '0', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }], [R`se of $S_n^2$`, { expr: 'sigma^2*sqrt(2/(n-1))', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }], [R`MSE of $S_n^2$`, { expr: '2*sigma^4/(n-1)', vars: { n: [2, 50, 'int'], sigma: [0.5, 4] } }]],
    s: R`**$\hat\mu = \bar X_n$.** $\E\bar X_n = \mu$, so $\text{bias} = 0$. By independence $\var(\bar X_n) = \frac{\sigma^2}{n}$, so
$$\text{se}(\hat\mu) = \frac{\sigma}{\sqrt n},\qquad\text{MSE}(\hat\mu) = \frac{\sigma^2}{n}.$$
(In fact $\bar X_n\sim N(\mu, \sigma^2/n)$ exactly.)

**$\hat\sigma^2 = S_n^2$. Bias.** For any iid sample with finite variance, $\E S_n^2 = \sigma^2$ (HW7 A1 (a)). So $\text{bias}(S_n^2) = 0$.

**Variance.** For a **normal** sample, $\frac{(n-1)S_n^2}{\sigma^2}\sim\chi^2_{n-1}$, and $\var(\chi^2_k) = 2k$ (since $\chi^2_k = \Gam(\frac k2,2)$ has variance $\frac k2\cdot2^2$). Hence
$$\var(S_n^2) = \frac{\sigma^4}{(n-1)^2}\var\left(\frac{(n-1)S_n^2}{\sigma^2}\right) = \frac{\sigma^4}{(n-1)^2}\cdot2(n-1) = \frac{2\sigma^4}{n-1}.$$
So
$$\text{se}(S_n^2) = \sigma^2\sqrt{\frac{2}{n-1}},\qquad\text{MSE}(S_n^2) = 0 + \frac{2\sigma^4}{n-1}.$$
Both MSEs tend to 0, so both estimators are consistent. (C1 does this without normality; C2 shows that a slightly smaller multiple of $S_n^2$ has smaller MSE.)`,
    src: 'HW8 B1 (solution written for this app)' },
  { k: 'B2', topic: '6.2', lvl: 4, q: R`Let $X_1,\dots,X_n\iid\Unif(0,\theta)$ and $\hat\theta = \max\{X_1,\dots,X_n\}$. Find the bias, se and MSE of $\hat\theta$.`,
    h: [R`Distribution of the maximum: $P(\hat\theta\le y) = P(\text{all } X_i\le y) = (y/\theta)^n$ for $0\le y\le\theta$. Differentiate for the density.`, R`$f_{\hat\theta}(y) = \frac{ny^{n-1}}{\theta^n}$ on $(0,\theta)$. Then $\E\hat\theta^k = \int_0^\theta y^k\frac{ny^{n-1}}{\theta^n}\dd y = \frac{n}{n+k}\theta^k$.`, R`$\var = \E\hat\theta^2 - (\E\hat\theta)^2$ with $k = 1, 2$; then $\text{MSE} = \text{bias}^2 + \var$. Put everything over $(n+1)^2(n+2)$.`],
    a: [['bias (use n, theta)', { expr: '-theta/(n+1)', vars: { n: [1, 40, 'int'], theta: [0.5, 5] } }], ['se', { expr: 'theta/(n+1)*sqrt(n/(n+2))', vars: { n: [1, 40, 'int'], theta: [0.5, 5] } }], ['MSE', { expr: '2*theta^2/((n+1)*(n+2))', vars: { n: [1, 40, 'int'], theta: [0.5, 5] } }]],
    s: R`**Distribution of the maximum.** For $0\le y\le\theta$, by independence,
$$F_{\hat\theta}(y) = P(X_1\le y,\dots,X_n\le y) = \left(\frac y\theta\right)^n,\qquad f_{\hat\theta}(y) = \frac{ny^{n-1}}{\theta^n},\quad0<y<\theta.$$

**Moments.** For $k\ge1$:
$$\E(\hat\theta^k) = \int_0^\theta y^k\,\frac{ny^{n-1}}{\theta^n}\dd y = \frac{n}{\theta^n}\cdot\frac{\theta^{n+k}}{n+k} = \frac{n}{n+k}\theta^k.$$
So $\E\hat\theta = \frac{n}{n+1}\theta$ and $\E\hat\theta^2 = \frac{n}{n+2}\theta^2$.

**Bias.** $\text{bias}(\hat\theta) = \frac{n}{n+1}\theta - \theta = -\frac{\theta}{n+1}$. Negative, as expected: the maximum can never exceed $\theta$.

**Variance and se.**
$$\var(\hat\theta) = \frac{n\theta^2}{n+2} - \frac{n^2\theta^2}{(n+1)^2} = n\theta^2\,\frac{(n+1)^2 - n(n+2)}{(n+1)^2(n+2)} = \frac{n\theta^2}{(n+1)^2(n+2)},$$
so $\text{se}(\hat\theta) = \frac{\theta}{n+1}\sqrt{\frac{n}{n+2}}$.

**MSE.**
$$\text{MSE} = \frac{\theta^2}{(n+1)^2} + \frac{n\theta^2}{(n+1)^2(n+2)} = \frac{\theta^2\big((n+2) + n\big)}{(n+1)^2(n+2)} = \frac{2\theta^2}{(n+1)(n+2)}.$$

**Comparison with A1.** $2\bar X_n$ is unbiased but has $\text{MSE} = \frac{\theta^2}{3n}$, of order $\frac1n$. The maximum is biased, yet its MSE is of order $\frac1{n^2}$: much smaller for large $n$ (already smaller for every $n\ge3$). Unbiasedness is not everything. (The bias-corrected $\frac{n+1}{n}\hat\theta$ is unbiased with variance $\frac{\theta^2}{n(n+2)}$, even better.)`,
    src: 'HW8 B2 (Wasserman 6.6.2; solution written for this app)' },
  { k: 'B3', topic: '7.1', lvl: 3, q: R`Let $X_1,\dots,X_n\sim F$ (iid) with empirical distribution function $\hat F_n$. Fix $a<b$ and let $\theta = T(F) = F(b) - F(a)$, estimated by the plug-in $\hat\theta = T(\hat F_n) = \hat F_n(b) - \hat F_n(a)$. Find the estimated standard error of $\hat\theta$ and an approximate $1-\alpha$ confidence interval for $\theta$. Enter $\widehat{\text{se}}$ writing <code>t</code> for $\hat\theta$.`,
    h: [R`$\hat F_n(b) - \hat F_n(a) = \frac1n\sum_i\big[\1(X_i\le b) - \1(X_i\le a)\big] = \frac1n\sum_i\1(a<X_i\le b)$.`, R`So $\hat\theta$ is a sample mean of iid $\Ber(\theta)$ variables, where $\theta = P(a<X\le b)$. Its variance is $\frac{\theta(1-\theta)}{n}$; plug in $\hat\theta$ for the unknown $\theta$.`, R`Asymptotic normality (CLT) ⇒ the Wald interval $\hat\theta\pm z_{\alpha/2}\,\widehat{\text{se}}$ with $z_{\alpha/2} = \Phi^{-1}(1 - \alpha/2)$.`],
    a: { expr: 'sqrt(t*(1-t)/n)', vars: { t: [0.05, 0.95], n: [5, 100, 'int'] } },
    s: R`**Rewrite the estimator.** Since $a<b$, $\1(X_i\le b) - \1(X_i\le a) = \1(a<X_i\le b)$. So
$$\hat\theta = \hat F_n(b) - \hat F_n(a) = \frac1n\sum_{i=1}^nY_i,\qquad Y_i = \1(a<X_i\le b).$$
The $Y_i$ are iid $\Ber(\theta)$ with $\theta = P(a<X_i\le b) = F(b) - F(a)$.

**Mean and standard error.** $\E\hat\theta = \theta$ (unbiased) and
$$\var(\hat\theta) = \frac{\theta(1-\theta)}{n},\qquad\text{se}(\hat\theta) = \sqrt{\frac{\theta(1-\theta)}{n}}.$$
$\theta$ is unknown, so plug in $\hat\theta$:
$$\widehat{\text{se}}(\hat\theta) = \sqrt{\frac{\hat\theta(1-\hat\theta)}{n}}.$$

**Confidence interval.** By the CLT, $\frac{\hat\theta - \theta}{\text{se}}\xrightarrow{D}N(0,1)$, and replacing se by $\widehat{\text{se}}$ does not change the limit (since $\hat\theta\xrightarrow{P}\theta$ by the LLN; Slutsky). So an approximate $1-\alpha$ confidence interval is
$$\hat\theta\ \pm\ z_{\alpha/2}\sqrt{\frac{\hat\theta(1-\hat\theta)}{n}},\qquad z_{\alpha/2} = \Phi^{-1}\left(1 - \frac\alpha2\right)$$
(e.g. $z_{0.025} = 1.96$ for 95%).

**Alternative.** A finite-sample interval without the CLT: Hoeffding gives $\hat\theta\pm\sqrt{\frac1{2n}\log\frac2\alpha}$ (valid for every $n$, but wider).

*Note on the "covariance" route:* you may also compute $\var(\hat F_n(b) - \hat F_n(a)) = \frac1n[F(b)(1-F(b)) + F(a)(1-F(a)) - 2F(a)(1-F(b))]$, using $\cov(\hat F_n(a),\hat F_n(b)) = \frac{F(a)(1-F(b))}{n}$ for $a<b$. Expanding shows it equals $\frac{\theta(1-\theta)}{n}$, the same answer.`,
    src: 'HW8 B3 (Wasserman 7.4.6; solution written for this app)' },
  { k: 'C1', topic: '6.2', lvl: 4, q: R`Redo B1 **without** normality: let $X_1,\dots,X_n$ be independent with common mean $\mu$, variance $\sigma^2$ and fourth central moment $\mu_4 = \E[(X_i - \mu)^4]$, and let $\hat\mu = \bar X_n$, $\hat\sigma^2 = S_n^2$. Find the bias, se and MSE of these estimators. Enter $\var(S_n^2)$ using <code>mu4</code>, <code>sigma</code>, <code>n</code>.`,
    h: [R`$\hat\mu$ and the bias of $S_n^2$ never used normality: same answers as B1.`, R`For $\var(S_n^2)$, shift so that $\mu = 0$ ($S_n^2$ does not change when you subtract $\mu$ from every $X_i$). Then $(n-1)S_n^2 = A - B$ with $A = \sum X_i^2$, $B = \frac1n\left(\sum X_i\right)^2$.`, R`Compute $\E A^2$, $\E[AB]$, $\E B^2$ by expanding the sums: only terms where every index appears an even number of times survive (mean 0, independence). Useful counts: $\E\left(\sum X_i\right)^4 = n\mu_4 + 3n(n-1)\sigma^4$ and $\E\left[\sum_iX_i^2\left(\sum_jX_j\right)^2\right] = n\mu_4 + n(n-1)\sigma^4$.`],
    a: { expr: '(mu4-(n-3)/(n-1)*sigma^4)/n', vars: { mu4: [1, 30], sigma: [0.5, 2], n: [3, 40, 'int'] } },
    s: R`**$\hat\mu = \bar X_n$.** Only means and variances are needed, so as in B1: $\text{bias} = 0$, $\text{se} = \frac{\sigma}{\sqrt n}$, $\text{MSE} = \frac{\sigma^2}{n}$.

**Bias of $S_n^2$.** $\E S_n^2 = \sigma^2$ for any distribution with finite variance (HW7 A1 (a)), so $\text{bias} = 0$.

**Variance of $S_n^2$.** $S_n^2$ is unchanged if every $X_i$ is replaced by $X_i - \mu$, so assume $\mu = 0$. Then $\E X_i^2 = \sigma^2$, $\E X_i^4 = \mu_4$, and any product containing some $X_i$ to the first power has mean 0. Write $(n-1)S_n^2 = A - B$ with
$$A = \sum_iX_i^2,\qquad B = n\bar X^2 = \frac1n\Big(\sum_iX_i\Big)^2.$$
- $\E A^2 = \sum_i\E X_i^4 + \sum_{i\ne j}\E X_i^2\E X_j^2 = n\mu_4 + n(n-1)\sigma^4.$
- $\E\left[A\left(\sum X_j\right)^2\right] = \sum_i\sum_{j,k}\E[X_i^2X_jX_k]$: only $j = k$ survives, giving $n\mu_4 + n(n-1)\sigma^4$. So $\E[AB] = \mu_4 + (n-1)\sigma^4$.
- $\E\left(\sum X_i\right)^4 = n\mu_4 + 3n(n-1)\sigma^4$ (all four indices equal, or two distinct pairs: $\binom42/2 = 3$ pairings). So $\E B^2 = \frac{\mu_4}{n} + \frac{3(n-1)\sigma^4}{n}$.

Hence
$$\E(A-B)^2 = \mu_4\left(n - 2 + \frac1n\right) + \sigma^4(n-1)\left(n - 2 + \frac3n\right) = \frac{(n-1)^2}{n}\mu_4 + \frac{(n-1)(n^2 - 2n + 3)}{n}\sigma^4.$$
Since $\E(A - B) = (n-1)\sigma^2$,
$$\var(A - B) = \frac{(n-1)^2}{n}\mu_4 + \frac{(n-1)\sigma^4}{n}\big[(n^2 - 2n + 3) - n(n-1)\big] = \frac{(n-1)^2}{n}\mu_4 - \frac{(n-1)(n-3)}{n}\sigma^4.$$
Dividing by $(n-1)^2$:
$$\boxed{\var(S_n^2) = \frac1n\left[\mu_4 - \frac{n-3}{n-1}\sigma^4\right]}$$
So $\text{se}(S_n^2) = \sqrt{\frac1n\left[\mu_4 - \frac{n-3}{n-1}\sigma^4\right]}$ and $\text{MSE}(S_n^2) = \var(S_n^2)$ (unbiased).

**Check against B1.** For a normal, $\mu_4 = 3\sigma^4$: $\frac{\sigma^4}{n}\left[3 - \frac{n-3}{n-1}\right] = \frac{\sigma^4}{n}\cdot\frac{2n}{n-1} = \frac{2\sigma^4}{n-1}$. ✓

For large $n$, $\var(S_n^2)\approx\frac{\mu_4 - \sigma^4}{n}$: heavy tails (large $\mu_4$) make the variance much harder to estimate.`,
    src: 'HW8 C1 (solution written for this app)' },
  { k: 'C2', topic: '6.2', lvl: 4, q: R`Let $X_1,\dots,X_n$ be independent with mean $\mu$, variance $\sigma^2$ and fourth central moment $\mu_4$, so that $\var(S_n^2) = \frac1n\left[\mu_4 - \frac{n-3}{n-1}\sigma^4\right]$ (C1). Consider $cS_n^2$ as an estimator of $\sigma^2$, with $c>0$.
(a) Find the $c^*$ minimizing the MSE of $cS_n^2$.
(b) What can you say about $c^*$ when $\mu_4<3\sigma^4$ and when $\mu_4>3\sigma^4$?
(c) For normal data, which estimator of the form $cS_n^2$ has the smallest MSE?
Enter $c^*$ in terms of <code>n</code> and the kurtosis <code>k</code> $=\mu_4/\sigma^4$, and the normal-case $c^*$ in terms of <code>n</code>.`,
    h: [R`$\E(cS_n^2) = c\sigma^2$, so $\text{bias} = (c-1)\sigma^2$ and $\var(cS_n^2) = c^2V$ with $V = \var(S_n^2)$.`, R`$\text{MSE}(c) = c^2V + (c-1)^2\sigma^4$ is a parabola in $c$. Set the derivative to 0: $c^* = \frac{\sigma^4}{V + \sigma^4}$.`, R`Simplify $V + \sigma^4$ over the common denominator $n(n-1)$. For (b) note $c^*$ is decreasing in $\mu_4$, and $\mu_4 = 3\sigma^4$ is the normal case.`],
    a: [[R`(a) $c^*$ (use n, k)`, { expr: 'n*(n-1)/((n-1)*k+n^2-2*n+3)', vars: { n: [3, 40, 'int'], k: [1, 9] } }], [R`(b) if $\mu_4<3\sigma^4$, $c^*$ is`, { choice: [R`larger than $\frac{n-1}{n+1}$`, R`equal to $\frac{n-1}{n+1}$`, R`smaller than $\frac{n-1}{n+1}$`], v: 0 }], [R`(c) normal $c^*$ (use n)`, { expr: '(n-1)/(n+1)', vars: { n: [3, 40, 'int'] } }]],
    s: R`Let $V = \var(S_n^2)$.

**(a)** $\E(cS_n^2) = c\sigma^2$, so $\text{bias} = (c-1)\sigma^2$, and $\var(cS_n^2) = c^2V$. Hence
$$\text{MSE}(c) = c^2V + (c-1)^2\sigma^4.$$
This is a convex parabola in $c$. Setting $\text{MSE}'(c) = 2cV + 2(c-1)\sigma^4 = 0$:
$$c^* = \frac{\sigma^4}{V + \sigma^4}.$$
Now
$$V + \sigma^4 = \frac1n\left[\mu_4 - \frac{n-3}{n-1}\sigma^4 + n\sigma^4\right] = \frac{(n-1)\mu_4 + (n^2 - 2n + 3)\sigma^4}{n(n-1)},$$
so
$$c^* = \frac{n(n-1)\sigma^4}{(n-1)\mu_4 + (n^2 - 2n + 3)\sigma^4} = \frac{n(n-1)}{(n-1)\kappa + n^2 - 2n + 3},\qquad\kappa = \frac{\mu_4}{\sigma^4}.$$
Since $V>0$, $c^*<1$ always: it pays to **shrink** $S_n^2$ a little, accepting some bias for less variance. (In practice $\kappa$ is unknown and must itself be estimated.)

**(b)** $c^*$ is a decreasing function of $\mu_4$. At $\mu_4 = 3\sigma^4$ (the normal value, $\kappa = 3$) the denominator is $3(n-1) + n^2 - 2n + 3 = n(n+1)$, so $c^* = \frac{n-1}{n+1}$. Therefore:
- $\mu_4<3\sigma^4$ (lighter tails than normal, e.g. uniform): $c^*>\frac{n-1}{n+1}$, less shrinkage is needed;
- $\mu_4>3\sigma^4$ (heavier tails, e.g. Laplace, $t$): $c^*<\frac{n-1}{n+1}$, more shrinkage, because $S_n^2$ is noisier.

**(c)** For normal data $c^* = \frac{n-1}{n+1}$, i.e. the best estimator of this form is
$$\frac{n-1}{n+1}S_n^2 = \frac{1}{n+1}\sum_{i=1}^n(X_i - \bar X_n)^2,$$
with $\text{MSE} = \frac{V\sigma^4}{V + \sigma^4} = \frac{2\sigma^4}{n+1}$, smaller than $\frac{2\sigma^4}{n-1}$ (unbiased $S_n^2$, divide by $n-1$) and than $\frac{(2n-1)\sigma^4}{n^2}$ (MLE, divide by $n$).`,
    src: 'HW8 C2 (solution written for this app)' },
  { k: 'C3', topic: '7.1', lvl: 4, q: R`Let $X_1,\dots,X_n\sim F$ (iid) with empirical distribution function $\hat F_n$. For a fixed $x$, find the limiting distribution of $\sqrt{\hat F_n(x)}$. Enter the variance in $\sqrt n\left(\sqrt{\hat F_n(x)} - \sqrt{F(x)}\right)\xrightarrow{D}N(0, v)$, writing $F$ for $F(x)$.`,
    h: [R`Start from A3: $\sqrt n(\hat F_n(x) - F(x))\xrightarrow{D}N(0, F(1-F))$.`, R`Apply the delta method with $g(t) = \sqrt t$, $g'(t) = \frac{1}{2\sqrt t}$ (needs $F(x)>0$).`, R`$g'(F)^2\cdot F(1-F) = \frac{1}{4F}\cdot F(1-F)$. Also mention what $\sqrt{\hat F_n(x)}$ itself converges to.`],
    a: { expr: '(1-F)/4', vars: { F: [0.05, 0.95] } },
    s: R`**Without scaling.** $\hat F_n(x)\xrightarrow{P}F(x)$ (LLN), and $t\mapsto\sqrt t$ is continuous on $[0,1]$, so $\sqrt{\hat F_n(x)}\xrightarrow{P}\sqrt{F(x)}$: the limit is a point mass. To see a non-degenerate limit we scale by $\sqrt n$.

**Delta method.** Assume $0<F(x)<1$. From A3,
$$\sqrt n\big(\hat F_n(x) - F(x)\big)\xrightarrow{D}N\big(0, F(x)(1-F(x))\big).$$
Let $g(t) = \sqrt t$, differentiable at $F(x)>0$ with $g'(F(x)) = \frac{1}{2\sqrt{F(x)}}\ne0$. The delta method gives
$$\sqrt n\left(\sqrt{\hat F_n(x)} - \sqrt{F(x)}\right)\xrightarrow{D}N\left(0,\ \frac{1}{4F(x)}F(x)(1-F(x))\right) = N\left(0,\ \frac{1 - F(x)}{4}\right).$$
So for large $n$, $\sqrt{\hat F_n(x)}\approx N\left(\sqrt{F(x)},\ \frac{1 - F(x)}{4n}\right)$.

**Edge cases.** If $F(x) = 0$, then $\hat F_n(x) = 0$ almost surely and $\sqrt{\hat F_n(x)} = 0$ (degenerate). If $F(x) = 1$, the formula gives variance 0: the limit is degenerate at 0 (indeed $\hat F_n(x) = 1$ almost surely).`,
    src: 'HW8 C3 (solution written for this app)' },
]);
