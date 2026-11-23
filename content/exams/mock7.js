EXAM({ id: 'mock7', title: 'Mock Midterm 2 — C', summary: 'Original Midterm 2 mock on the newest material: method of moments vs MLE (Fisher information, efficiency) + CIs, an exact bootstrap by hand and the three bootstrap intervals, linear functionals and the empirical CDF.',
  intro: R`Original mock for Midterm 2 (Wed Nov 25, 08:30) focused on the material released last: Chapters 7–9 (plug-in, bootstrap, method of moments, maximum likelihood), using Chapter 5–6 tools throughout. 80 minutes, 40/30/30. Two handwritten A4 sheets and a simple calculator allowed. Justify every step.` }, [
  { k: '1', pts: 40, intro: R`Let $X_1,\dots,X_n$ be iid with PDF
$$f(x;\theta) = \theta x^{\theta-1},\qquad0<x<1,$$
where $\theta>0$ is unknown.`, parts: [
    { k: 'a', pts: 6, topic: '3.1', q: R`Compute $E(X_1)$, $E(X_1^2)$ and $\var(X_1)$.`,
      h: [R`$\int_0^1x^k\theta x^{\theta-1}\dd x = \frac{\theta}{\theta+k}$.`],
      a: [[R`$E(X_1)$`, 'theta/(theta+1)', { theta: [0.3, 4] }], [R`$\var(X_1)$`, 'theta/((theta+2)*(theta+1)^2)', { theta: [0.3, 4] }]],
      s: R`$E(X_1^k) = \theta\int_0^1x^{\theta+k-1}\dd x = \frac{\theta}{\theta+k}$. So $E X_1 = \frac\theta{\theta+1}$, $E X_1^2 = \frac\theta{\theta+2}$, and
$$\var X_1 = \frac{\theta}{\theta+2} - \frac{\theta^2}{(\theta+1)^2} = \frac{\theta(\theta+1)^2 - \theta^2(\theta+2)}{(\theta+2)(\theta+1)^2} = \frac{\theta}{(\theta+2)(\theta+1)^2}.$$
(Numerator: $\theta^3 + 2\theta^2 + \theta - \theta^3 - 2\theta^2 = \theta$.)` },
    { k: 'b', pts: 6, topic: '9.1', q: R`Derive the method-of-moments estimator $\hat\theta_n$ of $\theta$.`,
      h: [R`Set $\frac{\theta}{\theta+1} = \bar X_n$ and solve.`],
      a: [[R`$\hat\theta$ (use xbar)`, 'xbar/(1-xbar)', { xbar: [0.1, 0.9] }]],
      s: R`One parameter, one equation: $\mu_1(\theta) = \frac{\theta}{\theta+1} = \bar X_n$. Then $\theta = \bar X_n(\theta + 1)$, so $\theta(1 - \bar X_n) = \bar X_n$ and
$$\hat\theta_n = \frac{\bar X_n}{1 - \bar X_n}.$$
(Well defined since $0<\bar X_n<1$ almost surely.)` },
    { k: 'c', pts: 6, topic: '6.3', q: R`Show that $\hat\theta_n$ is consistent. Name every theorem you use.`,
      s: R`By the WLLN ($E|X_1|\le1<\infty$), $\bar X_n\xrightarrow{P}\mu_1 = \frac{\theta}{\theta+1}\in(0,1)$. The function $h(u) = \frac{u}{1-u}$ is continuous on $(0,1)$, hence at $\mu_1$, so by the continuous mapping theorem
$$\hat\theta_n = h(\bar X_n)\xrightarrow{P}h\left(\frac{\theta}{\theta+1}\right) = \frac{\theta/(\theta+1)}{1/(\theta+1)} = \theta.$$
So $\hat\theta_n$ is consistent. ∎` },
    { k: 'd', pts: 8, topic: '5.4', q: R`Find the limiting distribution of $\sqrt n(\hat\theta_n - \theta)$.`,
      h: [R`CLT for $\bar X_n$, then the delta method with $h(u) = \frac u{1-u}$, $h'(u) = \frac1{(1-u)^2}$.`],
      a: [[R`asymptotic variance`, 'theta*(theta+1)^2/(theta+2)', { theta: [0.3, 4] }]],
      s: R`CLT ($\var X_1<\infty$): $\sqrt n(\bar X_n - \mu_1)\xrightarrow{D}N\left(0, \frac{\theta}{(\theta+2)(\theta+1)^2}\right)$.
$h'(u) = \frac{(1-u) + u}{(1-u)^2} = \frac{1}{(1-u)^2}$; at $u = \mu_1$, $1 - \mu_1 = \frac{1}{\theta+1}$, so $h'(\mu_1) = (\theta+1)^2\ne0$. Delta method:
$$\sqrt n(\hat\theta_n - \theta)\xrightarrow{D}N\left(0, (\theta+1)^4\cdot\frac{\theta}{(\theta+2)(\theta+1)^2}\right) = N\left(0, \frac{\theta(\theta+1)^2}{\theta+2}\right).$$` },
    { k: 'e', pts: 8, topic: '9.3', q: R`Derive the MLE $\hat\theta_{\text{ML}}$, the Fisher information $I_n(\theta)$, and the asymptotic distribution of $\hat\theta_{\text{ML}}$. Compute the ratio of asymptotic variances ML / MoM and show it is below $1$ for every $\theta>0$.`,
      h: [R`$\ell_n(\theta) = n\log\theta + (\theta - 1)\sum\log X_i$.`, R`Ratio: $\theta^2\Big/\frac{\theta(\theta+1)^2}{\theta+2} = \frac{\theta(\theta+2)}{(\theta+1)^2}$.`],
      a: [[R`$\hat\theta_{\text{ML}}$ (use L = (1/n)Σ log Xᵢ, which is negative)`, '-1/L', { L: [-3, -0.2] }], [R`$I_n(\theta)$`, 'n/theta^2', { theta: [0.3, 4], n: [1, 30, 'int'] }], ['ratio ML/MoM', 'theta*(theta+2)/(theta+1)^2', { theta: [0.3, 4] }]],
      s: R`**MLE.** $\ell_n(\theta) = \sum_i\log\big(\theta X_i^{\theta-1}\big) = n\log\theta + (\theta - 1)\sum_i\log X_i$. Score:
$$\ell_n'(\theta) = \frac n\theta + \sum_i\log X_i = 0\iff\hat\theta_{\text{ML}} = -\frac{n}{\sum_i\log X_i} = \frac{1}{\frac1n\sum_i(-\log X_i)},$$
positive since $0<X_i<1$. $\ell_n''(\theta) = -\frac n{\theta^2}<0$: a maximum.

**Fisher information.** $I_n(\theta) = -E(\ell_n''(\theta)) = \frac{n}{\theta^2}$. The support $(0,1)$ does not depend on $\theta$ (regular model), so
$$\sqrt n(\hat\theta_{\text{ML}} - \theta)\xrightarrow{D}N\big(0,\ \theta^2\big).$$
**Comparison with (d).**
$$\frac{\text{avar}_{\text{ML}}}{\text{avar}_{\text{MOM}}} = \frac{\theta^2}{\theta(\theta+1)^2/(\theta+2)} = \frac{\theta(\theta+2)}{(\theta+1)^2} = \frac{\theta^2 + 2\theta}{\theta^2 + 2\theta + 1}<1.$$
The MLE is more efficient for every $\theta$, as the theory promises. (At $\theta = 1.5$ the ratio is $\frac{5.25}{6.25} = 0.84$.)` },
    { k: 'f', pts: 6, topic: '6.4', q: R`With $n = 100$, $\bar X = 0.6$ and $\frac1n\sum\log X_i = -0.65$, compute both estimates and approximate 95% confidence intervals for $\theta$ based on each.`,
      a: [[R`$\hat\theta_{\text{MOM}}$`, '1.5'], ['MoM lower', '1.5-1.96*sqrt(1.5*6.25/3.5/100)'], ['MoM upper', '1.5+1.96*sqrt(1.5*6.25/3.5/100)'], [R`$\hat\theta_{\text{ML}}$`, '1/0.65'], ['ML lower', '(1/0.65)*(1-1.96/10)'], ['ML upper', '(1/0.65)*(1+1.96/10)']],
      s: R`**MoM.** $\hat\theta = \frac{0.6}{0.4} = 1.5$. Plug-in asymptotic variance $\frac{1.5\cdot2.5^2}{3.5} = 2.679$; $\widehat{\operatorname{se}} = \sqrt{2.679/100} = 0.1637$. By (d) and Slutsky:
$$1.5\pm1.96(0.1637) = 1.5\pm0.321 = (1.179,\ 1.821).$$
**MLE.** $\hat\theta_{\text{ML}} = \frac{1}{0.65} = 1.538$ and $\widehat{\operatorname{se}} = \frac{1}{\sqrt{I_n(\hat\theta)}} = \frac{\hat\theta}{\sqrt n} = 0.1538$:
$$1.538\pm1.96(0.1538) = 1.538\pm0.302 = (1.237,\ 1.840).$$
The ML interval is narrower, as (e) predicts.` },
  ] },
  { k: '2', pts: 30, intro: R`A tiny data set: $X_1 = 1$, $X_2 = 2$, $X_3 = 6$, assumed iid from an unknown $F$. Let $X_1^*, X_2^*, X_3^*$ be a nonparametric bootstrap sample.`, parts: [
    { k: 'a', pts: 6, topic: '8.1', q: R`How many distinct bootstrap samples (multisets) are there? Is each equally likely? Give $P^*(\text{the sample is }\{1,2,6\})$.`,
      a: [['number', '10'], ['P*', '6/27']],
      s: R`$\binom{2n-1}{n} = \binom53 = 10$. Not equally likely: $\{1,1,1\}$ has probability $\frac1{27}$, but $\{1,2,6\}$ arises from $3! = 6$ ordered draws, probability $\frac{6}{27} = \frac29$.` },
    { k: 'b', pts: 8, topic: '8.1', q: R`Compute $E^*(\bar X^*)$ and $\var^*(\bar X^*)$ exactly.`,
      a: [[R`$E^*$`, '3'], [R`$\var^*$`, '14/9']],
      s: R`Given the data, $X_i^*$ are iid uniform on $\{1,2,6\}$: $E^*X_1^* = 3$, $\var^*X_1^* = \frac{(1-3)^2 + (2-3)^2 + (6-3)^2}{3} = \frac{14}{3} = \hat\sigma^2$. Hence $E^*\bar X^* = 3$ and $\var^*\bar X^* = \frac{14/3}{3} = \frac{14}{9}$.` },
    { k: 'c', pts: 8, topic: '8.1', q: R`Let $m$ be the sample median and $m^*$ the bootstrap median. Find the bootstrap distribution of $m^*$ and the bootstrap estimate of the bias of $m$.`,
      h: [R`$m^* = 1$ iff at least two draws are 1.`],
      a: [[R`$P^*(m^* = 2)$`, '13/27'], ['bias', '7/9']],
      s: R`$P^*(m^* = 1) = P(\ge2\text{ draws equal }1) = 3\cdot\frac19\cdot\frac23 + \frac1{27} = \frac7{27}$; likewise $P^*(m^* = 6) = \frac7{27}$; so $P^*(m^* = 2) = \frac{13}{27}$.
$E^*(m^*) = \frac{7 + 26 + 42}{27} = \frac{25}{9}$, and $\widehat{\text{bias}} = E^*(m^*) - m = \frac{25}{9} - 2 = \frac79\approx0.78$.` },
    { k: 'd', pts: 8, topic: '8.2', q: R`On a larger data set, $\hat\theta = 4.2$; $B = 2000$ bootstrap replicates have standard deviation $0.9$ and 2.5%, 97.5% quantiles $2.9$ and $6.4$. Give the 95% Normal, percentile and pivotal intervals, and comment on their differences.`,
      a: [['Normal lower', '4.2-1.96*0.9'], ['Normal upper', '4.2+1.96*0.9'], ['pivotal lower', '2'], ['pivotal upper', '5.5']],
      s: R`Normal: $4.2\pm1.764 = (2.44, 5.96)$. Percentile: $(2.9, 6.4)$. Pivotal: $(2(4.2) - 6.4, 2(4.2) - 2.9) = (2.0, 5.5)$.
The bootstrap distribution is right-skewed ($6.4 - 4.2 = 2.2 > 4.2 - 2.9 = 1.3$). The percentile interval follows the skew, the pivotal interval reflects it (it estimates the distribution of $\hat\theta - \theta$ by that of $\hat\theta^* - \hat\theta$), and the Normal interval ignores it. They would coincide only for a symmetric bootstrap distribution.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n\iid F$ with $E(X_1^4)<\infty$, and let $\hat F_n$ be the empirical CDF.`, parts: [
    { k: 'a', pts: 6, topic: '7.2', q: R`Show that $T(F) = \int x^2\dd F(x)$ is a linear functional and give its plug-in estimator. Is the median $F^{-1}(\frac12)$ linear? Justify.`,
      s: R`For CDFs $F, G$ and $a\in[0,1]$: $T(aF + (1-a)G) = \int x^2\dd(aF + (1-a)G) = a\int x^2\dd F + (1-a)\int x^2\dd G = aT(F) + (1-a)T(G)$: linear. Plug-in: $T(\hat F_n) = \frac1n\sum X_i^2$.
The median is not linear: $F = \delta_0$, $G = \delta_1$, $a = 0.3$ gives the $\Ber(0.7)$ mixture with median 1, but $0.3\cdot0 + 0.7\cdot1 = 0.7$.` },
    { k: 'b', pts: 8, topic: '7.2', q: R`Suppose $F = N(0,\sigma^2)$. Find the limiting distribution of $\sqrt n\left(\frac1n\sum X_i^2 - \sigma^2\right)$ and an approximate 95% CI for $\sigma^2$ when $n = 200$ and $\frac1n\sum X_i^2 = 1.8$. ($E X^4 = 3\sigma^4$.)`,
      a: [['avar (use sigma)', '2*sigma^4', { sigma: [0.3, 3] }], ['lower', '1.8-1.96*sqrt(2*1.8^2/200)'], ['upper', '1.8+1.96*sqrt(2*1.8^2/200)']],
      s: R`$Y_i = X_i^2$ are iid with mean $\sigma^2$ and variance $3\sigma^4 - \sigma^4 = 2\sigma^4$. CLT: $\sqrt n(\bar Y - \sigma^2)\xrightarrow{D}N(0, 2\sigma^4)$. Plug-in se: $\sqrt{2(1.8)^2/200} = 0.18$; CI $1.8\pm0.353 = (1.447, 2.153)$.` },
    { k: 'c', pts: 8, topic: '7.2', q: R`For $x<y$, compute $\cov\big(\hat F_n(x), \hat F_n(y)\big)$. Evaluate for $F(x) = 0.2$, $F(y) = 0.6$, $n = 50$.`,
      a: [['cov', '(0.2-0.12)/50']],
      s: R`$\cov = \frac1{n^2}\sum_{i,j}\cov(\1(X_i\le x), \1(X_j\le y))$; terms $i\ne j$ vanish by independence; for $i = j$, $E[\1(X\le x)\1(X\le y)] = F(x)$ since $x<y$. So $\cov = \frac{F(x) - F(x)F(y)}{n} = \frac{F(x)(1 - F(y))}{n} = \frac{0.2\cdot0.4}{50} = 0.0016$.` },
    { k: 'd', pts: 8, topic: '7.1', q: R`How large must $n$ be so that the 95% DKW confidence band has half-width at most $0.04$? State what the band guarantees, and how this differs from a pointwise interval for $F(x_0)$.`,
      a: [['n', '1153']],
      s: R`$\varepsilon_n = \sqrt{\frac1{2n}\log\frac2\alpha}\le0.04$ ⟺ $n\ge\frac{\log40}{2(0.0016)} = \frac{3.689}{0.0032} = 1152.8$: $n = 1153$.
The band $[\max(\hat F_n - \varepsilon_n, 0), \min(\hat F_n + \varepsilon_n, 1)]$ contains the **whole** CDF $F(x)$, for all $x$ simultaneously, with probability $\ge0.95$, for every $n$ (DKW is non-asymptotic). A pointwise Wald interval $\hat F_n(x_0)\pm1.96\sqrt{\hat F_n(x_0)(1-\hat F_n(x_0))/n}$ is narrower (at most $0.98/\sqrt n$) but covers $F$ only at the single point $x_0$, and only asymptotically.` },
  ] },
]);
