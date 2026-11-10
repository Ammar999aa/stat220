TOPIC({ id: '6.4', ch: 6, title: 'Asymptotic normality and confidence intervals', summary: 'θ̂ ≈ N(θ, se²); Hoeffding (exact, finite-n) and Wald (CLT) intervals; reading a confidence level correctly.' }, [
R`A point estimate is one number. A **confidence interval** adds an error bar with a guarantee: "this procedure catches the true $\theta$ at least 95% of the time". Most intervals in this course come from one fact: many estimators are approximately normal for large $n$.

Quantiles you will need (no calculator function for them on the exam): $\Phi^{-1}(0.95) = 1.645$, $\Phi^{-1}(0.975) = 1.96$, $\Phi^{-1}(0.995) = 2.576$.`,
DEF('Asymptotically normal estimator', R`$\hat\theta_n$ is **asymptotically normal** if, as $n\to\infty$,
$$\frac{\hat\theta_n - \theta}{\sigma_n}\xrightarrow{D}N(0,1)\qquad\Longleftrightarrow\qquad\hat\theta_n\ \overset{\text{large } n}{\approx}\ N(\theta,\sigma_n^2).$$
Here $\sigma_n = \operatorname{se}(\hat\theta_n) = \sqrt{\var(\hat\theta_n)}$ is the **standard error**; in practice it is replaced by an estimate $\widehat{\operatorname{se}}$.`),
R`*Slide example.* $X_i\iid\Ber(p)$, $\hat p_n = \bar X_n$. By the CLT, $\frac{\hat p_n - p}{\sqrt{p(1-p)/n}}\xrightarrow{D}N(0,1)$, so $\hat p_n\approx N\left(p, \frac{p(1-p)}{n}\right)$.`,
P({ k: 'a', lvl: 1, q: R`Coin with $p = 0.5$, $n = 100$ flips. What is the standard error $\sigma_n$ of $\hat p_n$?`, h: [R`$\sqrt{p(1-p)/n}$.`], a: '0.05', s: R`$\sqrt{0.25/100} = 0.05$.`, src: 'Slides Ch.6' }),
P({ k: 'b', lvl: 2, q: R`Same coin. Using the normal approximation, $P(\hat p_{100}>0.6)\approx$? (Use $\Phi(2) = 0.9772$.)`, h: [R`Standardize: $\frac{0.6 - 0.5}{0.05} = 2$.`], a: '0.0228', s: R`$P(\hat p>0.6)\approx P(Z>2) = 1 - 0.9772 = 0.0228$.` }),
H('What a confidence interval is'),
DEF('$(1-\alpha)$ confidence interval', R`A $(1-\alpha)$ confidence interval for $\theta\in\R$ is a **random** interval $C_n = (a_n, b_n)$, with $a_n = a(X_1,\dots,X_n)$ and $b_n = b(X_1,\dots,X_n)$ statistics, such that
$$P(\theta\in C_n)\ge1-\alpha\qquad\text{for all }\theta\in\Theta.$$
If this only holds in the limit, $P(\theta\in C_n)\to1-\alpha$, the interval is **approximate** (asymptotically valid).`),
NOTE('Reading it correctly', R`$\theta$ is fixed; the **interval** is what is random. Picture the slides' drawing: repeat the experiment many times and draw each interval; about 95% of them cross the vertical line at the true $\theta$. Once you have computed one interval, say $(0.42, 0.58)$, it either contains $\theta$ or it does not. The 95% describes the procedure, not this particular interval.`),
P({ k: 'c', lvl: 1, q: R`You computed a 95% interval $(0.42, 0.58)$ for $p$. Is it correct to say "$P(0.42<p<0.58) = 0.95$"?`, h: [R`Which quantity is random in the definition?`], a: { choice: ['Yes', 'No'], v: 1 },
  s: R`No. $p$ is a fixed number and $(0.42,0.58)$ is a fixed interval, so that "probability" is 0 or 1. The 0.95 is $P(p\in C_n)$ **before** seeing the data, where $C_n$ is random.` }),
P({ k: 'd', lvl: 2, q: R`20 independent studies each report a 90% confidence interval for their own parameter. How many intervals do you expect to miss their target?`, h: [R`Each misses with probability 0.1.`], a: '2', s: R`The number of misses is $\Bin(20, 0.1)$, with mean $2$.` }),
H('Exact (finite-n) interval from Hoeffding'),
R`Hoeffding (topic 4.2) gives, for **every** $n$ and every $p$: $P(|\hat p_n - p|>\varepsilon)\le2e^{-2n\varepsilon^2}$. Set the right side equal to $\alpha$:
$$\varepsilon_n = \sqrt{\frac{1}{2n}\log\frac2\alpha},\qquad C_n = (\hat p_n - \varepsilon_n,\ \hat p_n + \varepsilon_n),\qquad P(p\in C_n)\ge1-\alpha\ \ \forall p.$$
No asymptotics: valid for any fixed $n$. The price is width.`,
P({ k: 'e', lvl: 1, q: R`Hoeffding half-width $\varepsilon_n$ for $n = 100$, $\alpha = 0.05$?`, h: [R`$\sqrt{\log(40)/200}$.`], a: 'sqrt(log(40)/200)', s: R`$\sqrt{\frac{3.689}{200}}\approx0.136$.`, src: 'Slides Ch.6' }),
P({ k: 'f', lvl: 2, q: R`How many observations does the Hoeffding interval need for a 90% interval of half-width at most $0.03$?`, h: [R`$\frac1{2n}\log\frac2\alpha\le0.03^2$ with $\frac2\alpha = 20$.`], a: '1665', s: R`$n\ge\frac{\log20}{2\cdot0.0009} = \frac{2.996}{0.0018}\approx1664.3$, so $n = 1665$.` }),
H('Approximate interval from the CLT (Wald interval)'),
R`Since $\hat p_n\approx N\left(p, \frac{p(1-p)}n\right)$, define $z = \Phi^{-1}(1-\alpha/2)$ and
$$C_n = \hat p_n\pm z\sqrt{\frac{\hat p_n(1-\hat p_n)}{n}}.$$
**Coverage (slides).** Using the true se for the derivation:
$$P(p\in C_n) = P\left(-z\le\frac{\hat p_n - p}{\sqrt{p(1-p)/n}}\le z\right)\xrightarrow{n\to\infty}P(-z\le Z\le z) = \Phi(z) - \Phi(-z) = \left(1-\tfrac\alpha2\right) - \tfrac\alpha2 = 1-\alpha,$$
using the symmetry of $N(0,1)$. Replacing $p$ by $\hat p_n$ inside the square root does not change the limit (Slutsky).`,
THM('Normal-based confidence interval', R`If $\hat\theta_n$ is asymptotically normal with standard error $\sigma_n$ (or a consistent estimate $\widehat{\operatorname{se}}$), then
$$C_n = \left(\hat\theta_n - \Phi^{-1}(1-\tfrac\alpha2)\,\widehat{\operatorname{se}},\ \ \hat\theta_n + \Phi^{-1}(1-\tfrac\alpha2)\,\widehat{\operatorname{se}}\right)$$
is an approximate $(1-\alpha)$ confidence interval: $P(\theta\in C_n)\to1-\alpha$ for all $\theta$.`),
P({ k: 'g', lvl: 1, q: R`Which $z = \Phi^{-1}(1-\alpha/2)$ goes into a 90% interval?`, h: [R`$\alpha = 0.1$, so you need $\Phi^{-1}(0.95)$.`], a: '1.645', s: R`$1 - 0.1/2 = 0.95$, so $z = 1.645$.` }),
P({ k: 'h', lvl: 2, q: R`In $n = 400$ trials you see 160 successes. Give the 95% Wald interval for $p$ (lower, upper).`, h: [R`$\hat p = 0.4$, $\widehat{\operatorname{se}} = \sqrt{0.4\cdot0.6/400}$.`], a: [[R`lower`, '0.4-1.96*sqrt(0.24/400)'], [R`upper`, '0.4+1.96*sqrt(0.24/400)']],
  s: R`$\widehat{\operatorname{se}} = \sqrt{0.24/400}\approx0.0245$, so $0.4\pm1.96\cdot0.0245 = 0.4\pm0.048$: about $(0.352, 0.448)$.` }),
P({ k: 'i', lvl: 2, q: R`Same data ($n = 400$, $\hat p = 0.4$, 95%). Compute the Hoeffding half-width and the Wald half-width.`, h: [R`Hoeffding: $\sqrt{\log40/800}$. Wald: $1.96\sqrt{0.24/400}$.`], a: [[R`Hoeffding`, 'sqrt(log(40)/800)'], [R`Wald`, '1.96*sqrt(0.24/400)']],
  s: R`Hoeffding $\approx0.068$, Wald $\approx0.048$. Hoeffding is about 40% wider: it holds for every $n$ and uses only the range $[0,1]$, while Wald is approximate but uses the actual variance.` }),
P({ k: 'j', lvl: 2, q: R`$X_i\iid N(\mu, \sigma^2)$ with $\sigma = 2$ known. $n = 25$, $\bar x = 10.3$. 95% interval for $\mu$?`, h: [R`$\bar X_n\sim N(\mu,\sigma^2/n)$ exactly, so $\bar x\pm1.96\cdot\frac{\sigma}{\sqrt n}$ is exact.`], a: [[R`lower`, '10.3-1.96*0.4'], [R`upper`, '10.3+1.96*0.4']],
  s: R`se $= 2/5 = 0.4$. Interval: $10.3\pm0.784 = (9.516, 11.084)$. Here the coverage is exactly 95% for every $n$, because $\bar X_n$ is exactly normal.` }),
P({ k: 'k', lvl: 2, q: R`Poll planning: how many people must you sample so that the 95% Wald interval for $p$ has half-width at most $0.03$ whatever $p$ is?`, h: [R`Worst case $p(1-p) = \frac14$: need $1.96\cdot\frac{0.5}{\sqrt n}\le0.03$.`], a: '1068', s: R`$n\ge\left(\frac{1.96\cdot0.5}{0.03}\right)^2 = 1067.1$, so $n = 1068$.` }),
P({ k: 'l', lvl: 2, q: R`$X_i\iid\Pois(\lambda)$, $n = 50$, $\bar x = 4$. 95% Wald interval for $\lambda$?`, h: [R`$\var(\bar X_n) = \lambda/n$, estimated by $\bar x/n$.`], a: [[R`lower`, '4-1.96*sqrt(4/50)'], [R`upper`, '4+1.96*sqrt(4/50)']],
  s: R`$\widehat{\operatorname{se}} = \sqrt{4/50}\approx0.283$; $4\pm0.554 = (3.446, 4.554)$.` }),
P({ k: 'm', lvl: 3, q: R`A/B test: version A converts 168 of 400 users ($\hat p_1 = 0.42$), version B 140 of 400 ($\hat p_2 = 0.35$), independent samples. Give the 95% Wald interval for $\delta = p_1 - p_2$. Does it exclude 0?`, h: [R`$\var(\hat p_1 - \hat p_2) = \frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}$ (independence).`],
  a: [[R`lower`, '0.07-1.96*sqrt(0.42*0.58/400+0.35*0.65/400)'], [R`upper`, '0.07+1.96*sqrt(0.42*0.58/400+0.35*0.65/400)'], [R`excludes 0?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$\widehat{\operatorname{se}} = \sqrt{\frac{0.42\cdot0.58}{400} + \frac{0.35\cdot0.65}{400}}\approx0.0343$. Interval: $0.07\pm0.0673 = (0.003, 0.137)$. It (just) excludes 0.

Compare topic 4.2: the Hoeffding interval on the same data, $0.07\pm0.096$, did **not** exclude 0. The CLT interval is narrower, at the cost of being only approximate.` }),
P({ k: 'n', lvl: 4, q: R`$X_i\iid\Exp(\beta)$ (mean $\beta$).
(a) Show $\bar X_n$ is asymptotically normal and give $\sigma_n$.
(b) Write the 95% normal-based interval using $\widehat{\operatorname{se}} = \bar X_n/\sqrt n$, and compute it for $n = 100$, $\bar x = 2.5$.`, h: [R`$\var(X_1) = \beta^2$; CLT.`, R`$\bar X_n$ is consistent for $\beta$, so $\bar X_n/\sqrt n$ is a valid plug-in for $\beta/\sqrt n$.`],
  a: [[R`lower`, '2.5-1.96*0.25'], [R`upper`, '2.5+1.96*0.25']],
  s: R`(a) $E(X_1) = \beta$, $\var(X_1) = \beta^2<\infty$. By the CLT, $\frac{\bar X_n - \beta}{\beta/\sqrt n}\xrightarrow{D}N(0,1)$: asymptotically normal with $\sigma_n = \beta/\sqrt n$.

(b) $\bar X_n\xrightarrow{P}\beta$ (LLN), so $\widehat{\operatorname{se}} = \bar X_n/\sqrt n$ estimates $\sigma_n$ consistently, and by the theorem
$$C_n = \bar X_n\pm1.96\frac{\bar X_n}{\sqrt n}$$
has asymptotic coverage 95%. Numbers: $\widehat{\operatorname{se}} = 2.5/10 = 0.25$, $C = 2.5\pm0.49 = (2.01, 2.99)$.` }),
]);

DRILLS('6.4', [
  { k: '01', lvl: 1, q: R`$\Phi^{-1}(1-\alpha/2)$ for a 99% interval?`, h: [R`$\Phi^{-1}(0.995)$.`], a: '2.576', s: R`$2.576$.` },
  { k: '02', lvl: 1, q: R`Hoeffding half-width for $n = 50$, $\alpha = 0.05$?`, h: [R`$\sqrt{\log40/100}$.`], a: 'sqrt(log(40)/100)', s: R`$\approx0.192$.` },
  { k: '03', lvl: 2, q: R`30 successes in 100 trials. 90% Wald interval for $p$?`, h: [R`$0.3\pm1.645\sqrt{0.21/100}$.`], a: [[R`lower`, '0.3-1.645*sqrt(0.21/100)'], [R`upper`, '0.3+1.645*sqrt(0.21/100)']], s: R`se $\approx0.0458$; $0.3\pm0.075 = (0.225, 0.375)$.` },
  { k: '04', lvl: 2, q: R`$N(\mu, 64)$ data, $n = 16$, $\bar x = 50$. 99% interval for $\mu$?`, h: [R`se $= 8/4 = 2$.`], a: [[R`lower`, '50-2.576*2'], [R`upper`, '50+2.576*2']], s: R`$50\pm5.152 = (44.848, 55.152)$.` },
  { k: '05', lvl: 2, q: R`$\sigma = 10$ known. Smallest $n$ so that the 95% interval for $\mu$ has half-width at most 2?`, h: [R`$1.96\cdot10/\sqrt n\le2$.`], a: '97', s: R`$n\ge(9.8)^2 = 96.04$, so $n = 97$.` },
  { k: '06', lvl: 2, q: R`Poisson counts: $n = 200$ days, 300 events in total. 95% Wald interval for $\lambda$?`, h: [R`$\hat\lambda = 1.5$, $\widehat{\operatorname{se}} = \sqrt{1.5/200}$.`], a: [[R`lower`, '1.5-1.96*sqrt(1.5/200)'], [R`upper`, '1.5+1.96*sqrt(1.5/200)']], s: R`$1.5\pm0.170 = (1.330, 1.670)$.` },
  { k: '07', lvl: 2, q: R`You quadruple the sample size. By what factor does the width of a Wald interval change (approximately)?`, h: [R`Width $\propto1/\sqrt n$.`], a: '1/2', s: R`$1/\sqrt4 = 1/2$: twice as precise costs four times the data.` },
  { k: '08', lvl: 3, q: R`Worst-case $p$, 95%, target half-width $0.02$. Smallest $n$ for (a) the Hoeffding interval, (b) the Wald interval.`, h: [R`(a) $n\ge\frac{\log40}{2\cdot0.02^2}$. (b) $n\ge\left(\frac{1.96\cdot0.5}{0.02}\right)^2$.`], a: [[R`(a) Hoeffding`, '4612'], [R`(b) Wald`, '2401']],
    s: R`(a) $\frac{3.689}{0.0008}\approx4611.1\Rightarrow4612$. (b) $(49)^2 = 2401$. Hoeffding's guarantee (exact, any $n$) costs almost twice the sample.` },
  { k: '09', lvl: 3, q: R`Waiting times $X_i\iid\Exp(\beta)$: $n = 64$, $\bar x = 3$. 95% normal-based interval for $\beta$ with $\widehat{\operatorname{se}} = \bar x/\sqrt n$?`, h: [R`se $= 3/8$.`], a: [[R`lower`, '3-1.96*3/8'], [R`upper`, '3+1.96*3/8']], s: R`$3\pm0.735 = (2.265, 3.735)$.` },
  { k: '10', lvl: 3, q: R`Two independent normal samples with known $\sigma_1 = 4$, $\sigma_2 = 3$, $n_1 = n_2 = 50$, $\bar x_1 = 20$, $\bar x_2 = 18$. 95% interval for $\mu_1 - \mu_2$?`, h: [R`$\var(\bar X_1 - \bar X_2) = \frac{16}{50} + \frac{9}{50}$.`], a: [[R`lower`, '2-1.96*sqrt(0.5)'], [R`upper`, '2+1.96*sqrt(0.5)']], s: R`se $= \sqrt{0.5}\approx0.707$; $2\pm1.386 = (0.614, 3.386)$. Excludes 0.` },
  { k: '11', lvl: 3, q: R`A Chebyshev-based interval for $p$: from $P(|\hat p - p|\ge\varepsilon)\le\frac{1}{4n\varepsilon^2}$, set the bound to $\alpha$. Give the half-width for $n = 100$, $\alpha = 0.05$, and compare with Hoeffding's.`, h: [R`$\varepsilon = \frac{1}{2\sqrt{n\alpha}}$.`], a: [[R`Chebyshev`, '1/(2*sqrt(5))'], [R`Hoeffding`, 'sqrt(log(40)/200)']],
    s: R`$\varepsilon = \frac1{2\sqrt{5}}\approx0.224$ vs Hoeffding $0.136$ (and worst-case Wald $0.098$). All three are valid in their own sense; Chebyshev is the crudest.` },
  { k: '12', lvl: 4, q: R`Election poll: 520 of $n = 1000$ voters support A.
(a) 95% Wald interval for $p$. (b) Can you claim A has a majority at the 95% level? (c) Hoeffding half-width for comparison.`, h: [R`$\widehat{\operatorname{se}} = \sqrt{0.52\cdot0.48/1000}$.`, R`A majority claim needs the whole interval above 0.5.`],
    a: [[R`(a) lower`, '0.52-1.96*sqrt(0.52*0.48/1000)'], [R`(a) upper`, '0.52+1.96*sqrt(0.52*0.48/1000)'], [R`(b) majority?`, { choice: ['Yes', 'No'], v: 1 }], [R`(c) Hoeffding`, 'sqrt(log(40)/2000)']],
    s: R`(a) se $\approx0.0158$; $0.52\pm0.031 = (0.489, 0.551)$.
(b) No: the interval contains values below 0.5.
(c) $\sqrt{3.689/2000}\approx0.043$, even wider.` },
  { k: '13', lvl: 4, q: R`$X_i\iid N(\mu,\sigma^2)$, $\sigma$ known, $C_n = \bar X_n\pm z\,\sigma/\sqrt n$.
(a) Prove that $P(\mu\in C_n) = 2\Phi(z) - 1$ exactly for every $n$.
(b) A student uses $z = 1.645$ but reports "95%". What is the true coverage?
(c) With $\sigma = 3$, what $n$ makes the correct 95% interval have half-width 0.5?`, h: [R`$\frac{\bar X_n - \mu}{\sigma/\sqrt n}\sim N(0,1)$ exactly (sum of independent normals).`],
    a: [[R`(b) coverage`, '0.90'], [R`(c) n`, '139']],
    s: R`(a) $\mu\in C_n\iff\left|\frac{\bar X_n - \mu}{\sigma/\sqrt n}\right|\le z$. The standardized mean is exactly $N(0,1)$ because a sum of independent normals is normal, so $P = \Phi(z) - \Phi(-z) = 2\Phi(z) - 1$.
(b) $2\Phi(1.645) - 1 = 2(0.95) - 1 = 0.90$: a 90% interval.
(c) $1.96\cdot3/\sqrt n\le0.5\iff n\ge(11.76)^2 = 138.3$, so $n = 139$.` },
]);
