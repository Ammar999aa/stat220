TOPIC({ id: '7.1', ch: 7, title: 'The empirical CDF and plug-in estimators', summary: 'F̂ₙ(x) = fraction of data ≤ x: its mean, variance, DKW band, and plug-in estimates T(F̂ₙ) with standard errors.' }, [
R`Chapter 6 asked how to estimate a parameter $\theta$. Now we estimate the **whole distribution** $F$, with no parametric model at all. The answer is almost embarrassingly simple: put mass $\frac1n$ on each data point. Everything else (means, variances, medians, probabilities) is then estimated by computing it for that distribution: the **plug-in principle**.

(Source: textbook Ch.7, "Estimating the CDF and statistical functionals"; HW8 A3, B3, C3.)`,
DEF('Empirical distribution function', R`Given $X_1,\dots,X_n\iid F$, the **empirical CDF** is
$$\hat F_n(x) = \frac1n\sum_{i=1}^n\1(X_i\le x) = \frac{\#\{i: X_i\le x\}}{n}.$$
It is a step function that jumps by $\frac1n$ at each data point (by $\frac kn$ at a value repeated $k$ times).`),
R`Running example (8 observations): $3.1,\ 0.4,\ 2.2,\ 5.0,\ 1.7,\ 2.2,\ 4.3,\ 0.9$. Sorted: $0.4, 0.9, 1.7, 2.2, 2.2, 3.1, 4.3, 5.0$.`,
P({ k: 'a', lvl: 1, q: R`For the running example, compute $\hat F_8(2)$.`, h: [R`Count the observations $\le2$.`], a: '3/8', s: R`$0.4, 0.9, 1.7$ are $\le2$: $\hat F_8(2) = \frac38$.` }),
P({ k: 'b', lvl: 1, q: R`Running example: compute $\hat F_8(2.2)$, and the size of the jump of $\hat F_8$ at $2.2$.`, h: [R`$\le$ includes the value itself; 2.2 appears twice.`], a: [[R`$\hat F_8(2.2)$`, '5/8'], [R`jump at 2.2`, '2/8']],
  s: R`Five values are $\le2.2$, so $\hat F_8(2.2) = \frac58$. Just left of 2.2 the value is $\frac38$, so the jump is $\frac28$ (two tied observations).` }),
H('Properties at a fixed point'),
THM('Mean and variance of $\hat F_n(x)$', R`For each fixed $x$, the indicators $\1(X_i\le x)$ are iid $\Ber(F(x))$, so $n\hat F_n(x)\sim\Bin(n, F(x))$. Hence
$$E\big[\hat F_n(x)\big] = F(x),\qquad\var\big[\hat F_n(x)\big] = \frac{F(x)\big(1-F(x)\big)}{n},$$
$\operatorname{MSE} = \frac{F(x)(1-F(x))}{n}\to0$, and therefore $\hat F_n(x)\xrightarrow{P}F(x)$: unbiased and consistent.`),
P({ k: 'c', lvl: 1, q: R`$F(x) = 0.3$, $n = 50$. $\var(\hat F_n(x))$?`, h: [R`$\frac{F(1-F)}{n}$.`], a: '0.21/50', s: R`$\frac{0.3\cdot0.7}{50} = 0.0042$.` }),
P({ k: 'd', lvl: 2, q: R`$X_i\iid\Exp(\beta = 2)$, $n = 100$. Find $E\big[\hat F_n(2)\big]$ and $\var\big[\hat F_n(2)\big]$.`, h: [R`$F(x) = 1 - e^{-x/\beta}$, so $F(2) = 1 - e^{-1}$.`], a: [[R`mean`, '1-exp(-1)'], [R`variance`, '(1-exp(-1))*exp(-1)/100']],
  s: R`$F(2) = 1 - e^{-1}\approx0.632$, and $\var = \frac{(1-e^{-1})e^{-1}}{100}\approx0.00233$.` }),
H('Uniform convergence and the DKW band'),
THM('Glivenko–Cantelli and DKW', R`**Glivenko–Cantelli:** $\sup_x|\hat F_n(x) - F(x)|\to0$ (almost surely): the convergence is uniform in $x$.

**Dvoretzky–Kiefer–Wolfowitz (DKW):** for any $\varepsilon>0$,
$$P\Big(\sup_x|\hat F_n(x) - F(x)|>\varepsilon\Big)\le2e^{-2n\varepsilon^2}.$$`),
R`DKW looks exactly like Hoeffding, but it controls **all** $x$ at once. Setting $2e^{-2n\varepsilon^2} = \alpha$ gives a nonparametric $(1-\alpha)$ **confidence band**:
$$\varepsilon_n = \sqrt{\frac{1}{2n}\log\frac2\alpha},\quad L(x) = \max\{\hat F_n(x) - \varepsilon_n, 0\},\quad U(x) = \min\{\hat F_n(x) + \varepsilon_n, 1\},$$
$$P\big(L(x)\le F(x)\le U(x)\ \text{for all }x\big)\ge1-\alpha.$$`,
P({ k: 'e', lvl: 1, q: R`DKW band half-width $\varepsilon_n$ for $n = 200$, $\alpha = 0.05$?`, h: [R`$\sqrt{\log40/400}$.`], a: 'sqrt(log(40)/400)', s: R`$\approx0.096$.` }),
P({ k: 'f', lvl: 2, q: R`Running example ($n = 8$), $\alpha = 0.05$: give $L(2)$ and $U(2)$ for the DKW band.`, h: [R`$\varepsilon_8 = \sqrt{\log40/16}\approx0.480$; $\hat F_8(2) = 0.375$. Clip to $[0,1]$.`], a: [[R`$L(2)$`, '0'], [R`$U(2)$`, '0.375+sqrt(log(40)/16)']],
  s: R`$\varepsilon_8\approx0.480$. $L(2) = \max(0.375 - 0.480, 0) = 0$ and $U(2) = \min(0.375 + 0.480, 1)\approx0.855$. With 8 points the band is nearly useless; it shrinks like $1/\sqrt n$.` }),
P({ k: 'g', lvl: 2, q: R`How large must $n$ be for the 95% DKW band to have half-width at most $0.05$?`, h: [R`$\frac{\log40}{2n}\le0.0025$.`], a: '738', s: R`$n\ge\frac{3.689}{0.005}\approx737.8$: $n = 738$.` }),
H('Pointwise CLT and interval for F(x)'),
R`Because $n\hat F_n(x)$ is binomial, the CLT gives (like HW8 A3)
$$\sqrt n\big(\hat F_n(x) - F(x)\big)\xrightarrow{D}N\big(0, F(x)(1-F(x))\big),$$
so a pointwise Wald interval is $\hat F_n(x)\pm z\sqrt{\hat F_n(x)(1-\hat F_n(x))/n}$. It is narrower than the DKW band, but it only covers $F$ at **one** $x$.`,
P({ k: 'h', lvl: 2, q: R`$F(x) = 0.5$, $n = 100$. Approximate $P\big(\hat F_n(x)>0.6\big)$ (use $\Phi(2) = 0.9772$).`, h: [R`sd $= \sqrt{0.25/100} = 0.05$.`], a: '0.0228', s: R`$P(Z>\frac{0.1}{0.05}) = P(Z>2) = 0.0228$.` }),
P({ k: 'i', lvl: 2, q: R`60 of $n = 200$ observations are $\le x_0$. 95% Wald interval for $F(x_0)$?`, h: [R`$\hat F = 0.3$, $\widehat{\operatorname{se}} = \sqrt{0.21/200}$.`], a: [[R`lower`, '0.3-1.96*sqrt(0.21/200)'], [R`upper`, '0.3+1.96*sqrt(0.21/200)']],
  s: R`$\widehat{\operatorname{se}}\approx0.0324$; $0.3\pm0.0635 = (0.236, 0.364)$.` }),
H('Statistical functionals and the plug-in principle'),
DEF('Functional and plug-in estimator', R`A **statistical functional** is any function of the distribution, $\theta = T(F)$: the mean $\int x\dd F(x)$, the variance, the median $F^{-1}(\frac12)$, a probability $F(b) - F(a)$, a correlation…

The **plug-in estimator** is $\hat\theta_n = T(\hat F_n)$: compute the same quantity for the distribution putting mass $\frac1n$ on each $X_i$.

If $T(F) = \int r(x)\dd F(x)$ (a **linear functional**), then $T(\hat F_n) = \frac1n\sum_{i=1}^nr(X_i)$.`),
R`Examples:
<ul><li>mean $\mu = \int x\dd F$ ⟶ $\hat\mu = \bar X_n$;</li>
<li>variance $\sigma^2 = \int x^2\dd F - \left(\int x\dd F\right)^2$ ⟶ $\hat\sigma^2 = \frac1n\sum(X_i - \bar X_n)^2$ (divisor $n$, **not** $n-1$);</li>
<li>quantile $F^{-1}(q)$ ⟶ $\hat F_n^{-1}(q) = \inf\{x: \hat F_n(x)\ge q\}$;</li>
<li>$F(b) - F(a)$ ⟶ $\hat F_n(b) - \hat F_n(a)$ = fraction of data in $(a,b]$;</li>
<li>correlation ⟶ $\hat\rho = \frac{\sum(X_i - \bar X)(Y_i - \bar Y)}{\sqrt{\sum(X_i-\bar X)^2\sum(Y_i - \bar Y)^2}}$.</li></ul>
For a standard error, either compute $\var(\hat\theta_n)$ directly and plug in, or use the delta method (topic 5.4). Then the normal-based interval $\hat\theta_n\pm z\,\widehat{\operatorname{se}}$ (topic 6.4) applies.`,
P({ k: 'j', lvl: 1, q: R`Running example: plug-in estimate of the mean.`, h: [R`Sum is 19.8.`], a: '19.8/8', s: R`$\hat\mu = \frac{19.8}{8} = 2.475$.` }),
P({ k: 'k', lvl: 2, q: R`Running example: plug-in estimate of the variance (divisor $n$).`, h: [R`$\frac1n\sum X_i^2 - \bar X^2$. $\sum X_i^2 = 66.64$.`], a: '2.204375',
  s: R`$\sum x_i^2 = 0.16 + 0.81 + 2.89 + 4.84 + 4.84 + 9.61 + 18.49 + 25 = 66.64$. $\hat\sigma^2 = \frac{66.64}{8} - 2.475^2 = 8.33 - 6.125625 = 2.204$.` }),
P({ k: 'l', lvl: 2, q: R`Running example: plug-in median $\hat F_8^{-1}(\tfrac12)$.`, h: [R`Smallest $x$ with $\hat F_8(x)\ge\frac12$. $\hat F_8(1.7) = \frac38$, $\hat F_8(2.2) = \frac58$.`], a: '2.2',
  s: R`$\hat F_8$ first reaches $\ge\frac12$ at $x = 2.2$, so the plug-in median is $2.2$. (The "average of the two middle values" convention gives the same here, since both middle values are 2.2.)` }),
P({ k: 'm', lvl: 2, q: R`Running example: estimate $\theta = F(4) - F(1)$ and its standard error $\widehat{\operatorname{se}} = \sqrt{\hat\theta(1-\hat\theta)/n}$.`, h: [R`Fraction of data in $(1, 4]$.`], a: [[R`$\hat\theta$`, '0.5'], [R`$\widehat{\operatorname{se}}$`, 'sqrt(0.25/8)']],
  s: R`$\hat F_8(4) = \frac68$, $\hat F_8(1) = \frac28$, so $\hat\theta = \frac12$. Since $n\hat\theta = \#\{X_i\in(1,4]\}\sim\Bin(n,\theta)$, $\var(\hat\theta) = \frac{\theta(1-\theta)}n$, estimated by $\frac{0.25}{8}$: $\widehat{\operatorname{se}}\approx0.177$.`, src: 'original (like HW8 B3)' }),
P({ k: 'n', lvl: 3, q: R`Running example: 95% normal-based interval for the mean, using $\widehat{\operatorname{se}} = \hat\sigma/\sqrt n$ with the plug-in $\hat\sigma^2 = 2.204375$.`, h: [R`$\widehat{\operatorname{se}} = \sqrt{2.204375/8}\approx0.525$.`], a: [[R`lower`, '2.475-1.96*sqrt(2.204375/8)'], [R`upper`, '2.475+1.96*sqrt(2.204375/8)']],
  s: R`$\widehat{\operatorname{se}}\approx0.525$; $2.475\pm1.029 = (1.446, 3.504)$. (With only 8 points the normal approximation is rough; the formula is what the exam asks for.)` }),
P({ k: 'o', lvl: 4, q: R`Fix $x$ with $0<F(x)<1$. Use the delta method to find the limiting distribution of $\sqrt n\big(\log\hat F_n(x) - \log F(x)\big)$. Give the asymptotic variance in terms of $F = F(x)$.`, h: [R`Start from $\sqrt n(\hat F_n(x) - F)\xrightarrow{D}N(0, F(1-F))$.`, R`$g(u) = \log u$, $g'(F) = 1/F$; variance $g'(F)^2F(1-F)$.`],
  a: [[R`asymptotic variance`, '(1-F)/F', { F: [0.05, 0.95] }]],
  s: R`By the CLT for binomial proportions, $\sqrt n(\hat F_n(x) - F)\xrightarrow{D}N(0, F(1-F))$. The map $g(u) = \log u$ is differentiable at $F>0$ with $g'(F) = \frac1F\ne0$, so by the delta method
$$\sqrt n\big(\log\hat F_n(x) - \log F\big)\xrightarrow{D}N\left(0, \frac{F(1-F)}{F^2}\right) = N\left(0, \frac{1-F}{F}\right).$$
(The same recipe with $g(u) = \sqrt u$ is HW8 C3.)`, src: 'original (like HW8 C3)' }),
]);

DRILLS('7.1', [
  { k: '01', lvl: 1, q: R`Data: $5, 2, 8, 2, 6$. $\hat F_5(4)$?`, h: [R`Count values $\le4$.`], a: '2/5', s: R`Two values (2, 2): $\frac25$.` },
  { k: '02', lvl: 1, q: R`Data: $5, 2, 8, 2, 6$. Give $\hat F_5(2)$ and $\hat F_5(1.9)$.`, h: [R`$\le$ includes ties.`], a: [[R`$\hat F_5(2)$`, '2/5'], [R`$\hat F_5(1.9)$`, '0']], s: R`$\frac25$ and $0$.` },
  { k: '03', lvl: 1, q: R`$F(x) = 0.2$, $n = 25$. $\var(\hat F_n(x))$?`, h: [R`$F(1-F)/n$.`], a: '0.16/25', s: R`$0.0064$.` },
  { k: '04', lvl: 2, q: R`Data: $5, 2, 8, 2, 6$. Plug-in mean and plug-in variance (divisor $n$)?`, h: [R`$\sum x^2 = 133$.`], a: [[R`mean`, '4.6'], [R`variance`, '5.44']], s: R`$\bar x = 23/5 = 4.6$; $\hat\sigma^2 = 133/5 - 4.6^2 = 26.6 - 21.16 = 5.44$.` },
  { k: '05', lvl: 2, q: R`Data: $5, 2, 8, 2, 6$. Plug-in median $\hat F_5^{-1}(1/2)$?`, h: [R`Sorted: 2, 2, 5, 6, 8.`], a: '5', s: R`$\hat F_5(2) = 0.4<0.5$, $\hat F_5(5) = 0.6\ge0.5$: median $5$.` },
  { k: '06', lvl: 2, q: R`DKW 90% band half-width for $n = 500$?`, h: [R`$\sqrt{\log20/1000}$.`], a: 'sqrt(log(20)/1000)', s: R`$\approx0.0547$.` },
  { k: '07', lvl: 2, q: R`45 of $n = 100$ observations are $\le x_0$. 90% Wald interval for $F(x_0)$?`, h: [R`$\widehat{\operatorname{se}} = \sqrt{0.45\cdot0.55/100}$.`], a: [[R`lower`, '0.45-1.645*sqrt(0.2475/100)'], [R`upper`, '0.45+1.645*sqrt(0.2475/100)']], s: R`se $\approx0.0497$; $0.45\pm0.082 = (0.368, 0.532)$.` },
  { k: '08', lvl: 2, q: R`120 of $n = 400$ observations fall in $(a,b]$. 95% interval for $\theta = F(b) - F(a)$?`, h: [R`$\hat\theta = 0.3$; $n\hat\theta\sim\Bin(n,\theta)$.`], a: [[R`lower`, '0.3-1.96*sqrt(0.21/400)'], [R`upper`, '0.3+1.96*sqrt(0.21/400)']], s: R`se $\approx0.0229$; $0.3\pm0.045 = (0.255, 0.345)$.`, src: 'original (like HW8 B3)' },
  { k: '09', lvl: 3, q: R`For $a<b$, write $F_a = F(a)$, $F_b = F(b)$. (a) Find $\cov(\hat F_n(a), \hat F_n(b))$. (b) Use it to find $\var(\hat F_n(b) - \hat F_n(a))$ in terms of $\theta = F_b - F_a$.`, h: [R`$\cov(\1(X\le a), \1(X\le b)) = P(X\le a) - F_aF_b$ since $\{X\le a\}\subseteq\{X\le b\}$.`],
    a: [[R`(a) cov`, 'Fa*(1-Fb)/n', { Fa: [0.05, 0.4], Fb: [0.5, 0.95], n: [1, 50, 'int'] }], [R`(b) var`, 'theta*(1-theta)/n', { theta: [0.05, 0.95], n: [1, 50, 'int'] }]],
    s: R`(a) For one observation, $E[\1(X\le a)\1(X\le b)] = F_a$, so the covariance is $F_a - F_aF_b = F_a(1-F_b)$. Averaging $n$ iid pairs divides by $n$: $\frac{F_a(1-F_b)}{n}$.

(b) $\frac{1}{n}\left[F_b(1-F_b) + F_a(1-F_a) - 2F_a(1-F_b)\right] = \frac1n\left[(F_b - F_a) - (F_b - F_a)^2\right] = \frac{\theta(1-\theta)}{n}$. Same as the binomial shortcut, as it should be.` },
  { k: '10', lvl: 3, q: R`Smallest $n$ so that, with probability at least $0.99$, $\sup_x|\hat F_n(x) - F(x)|\le0.1$ (by DKW)?`, h: [R`$2e^{-2n(0.01)}\le0.01$.`], a: '265', s: R`$n\ge\frac{\log200}{0.02} = \frac{5.298}{0.02}\approx264.9$: $n = 265$.` },
  { k: '11', lvl: 3, q: R`Paired data $(x_i, y_i)$: $(1,2), (2,1), (3,4), (4,3)$. Plug-in correlation $\hat\rho$?`, h: [R`Centre at $\bar x = \bar y = 2.5$; $\sum dx\,dy = 3$, $\sum dx^2 = \sum dy^2 = 5$.`], a: '0.6', s: R`$\hat\rho = \frac{3}{\sqrt{5\cdot5}} = 0.6$.` },
  { k: '12', lvl: 4, q: R`Fix $x$ with $0<F(x)<1$. Delta method: find the asymptotic variance of $\sqrt n\left(\frac{\hat F_n(x)}{1-\hat F_n(x)} - \frac{F}{1-F}\right)$ (the empirical odds), in terms of $F = F(x)$.`, h: [R`$g(u) = \frac u{1-u}$, $g'(u) = \frac{1}{(1-u)^2}$.`], a: [[R`asymptotic variance`, 'F/(1-F)^3', { F: [0.05, 0.9] }]],
    s: R`$\sqrt n(\hat F_n(x) - F)\xrightarrow{D}N(0,F(1-F))$; $g'(F) = (1-F)^{-2}\ne0$, so the limit is $N\left(0, \frac{F(1-F)}{(1-F)^4}\right) = N\left(0, \frac{F}{(1-F)^3}\right)$.` },
  { k: '13', lvl: 4, q: R`$X_i\iid\Exp(\beta = 1)$, $n = 50$, point $x = 1$.
(a) $E[\hat F_{50}(1)]$. (b) $\var[\hat F_{50}(1)]$. (c) Chebyshev bound on $P(|\hat F_{50}(1) - F(1)|\ge0.1)$. (d) DKW bound on $P(\sup_x|\hat F_{50}(x) - F(x)|>0.1)$. Which is smaller, and why is that not a contradiction?`, h: [R`$F(1) = 1 - e^{-1}$.`, R`Chebyshev: $\var/0.01$. DKW: $2e^{-2\cdot50\cdot0.01}$.`],
    a: [[R`(a)`, '1-exp(-1)'], [R`(b)`, '(1-exp(-1))*exp(-1)/50'], [R`(c)`, '(1-exp(-1))*exp(-1)/50/0.01'], [R`(d)`, '2*exp(-1)']],
    s: R`(a) $1 - e^{-1}\approx0.632$. (b) $\frac{0.632\cdot0.368}{50}\approx0.00465$. (c) $\frac{0.00465}{0.01}\approx0.465$. (d) $2e^{-1}\approx0.736$.

Chebyshev is smaller here, but it is about **one** point $x = 1$; DKW bounds the deviation at **all** $x$ simultaneously, a much stronger event to control.` },
  { k: '14', lvl: 4, q: R`$X_i$ iid with variance $\sigma^2$. Plug-in variance $\hat\sigma^2 = \frac1n\sum(X_i - \bar X_n)^2$. (a) Its bias? (b) Is it consistent?`, h: [R`$\hat\sigma^2 = \frac{n-1}{n}S_n^2$ and $E(S_n^2) = \sigma^2$.`], a: [[R`(a) bias`, '-sigma^2/n', { sigma: [0.5, 3], n: [2, 40, 'int'] }], [R`(b) consistent?`, { choice: ['Yes', 'No'], v: 0 }]],
    s: R`(a) $E(\hat\sigma^2) = \frac{n-1}n\sigma^2$, bias $-\frac{\sigma^2}{n}$.
(b) $\hat\sigma^2 = \frac1n\sum X_i^2 - \bar X_n^2\xrightarrow{P}E(X^2) - \mu^2 = \sigma^2$ by the LLN and continuous mapping (needs $E X^2<\infty$): consistent.` },
]);
