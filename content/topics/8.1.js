TOPIC({ id: '8.1', ch: 8, title: 'The nonparametric bootstrap', summary: 'Resample the data with replacement to approximate the distribution, variance and bias of any statistic. Exact bootstrap moments of X̄*, counting bootstrap samples, and where the bootstrap fails (the maximum).' }, [
R`You have an estimator $T_n = g(X_1,\dots,X_n)$ (a median, a correlation, $e^{1/\bar X}$…) and want its standard error. Often there is no formula. The **bootstrap** replaces the unknown $F$ by $\hat F_n$ and lets the computer do the rest.

(Source: Chapter 8 lecture notes, pp. 1–4; textbook 8.6.4, 8.6.5; HW9 A3, A4, B2, B3, C2.)`,
DEF('Bootstrap algorithm', R`Data $X_1,\dots,X_n\iid F$; statistic $T_n = g(X_1,\dots,X_n)$.
<ol><li>Draw a **bootstrap sample** $X_1^*,\dots,X_n^*\iid\hat F_n$, i.e. sample $n$ times **with replacement** from $\{X_1,\dots,X_n\}$.</li>
<li>Recompute the statistic: $T_n^* = g(X_1^*,\dots,X_n^*)$.</li>
<li>Repeat steps 1–2 $B$ times: $T_{n,1}^*,\dots,T_{n,B}^*$.</li>
<li>Use their empirical distribution: e.g. $\hat v_{\text{boot}} = \frac1B\sum_{b=1}^B\left(T_{n,b}^* - \bar T^*\right)^2$, $\widehat{\operatorname{se}}_{\text{boot}} = \sqrt{\hat v_{\text{boot}}}$, empirical quantiles, …</li></ol>`),
R`Two approximations are stacked:
$$\var_F(T_n)\ \overset{\text{(1)}}{\approx}\ \var_{\hat F_n}(T_n)\ \overset{\text{(2)}}{\approx}\ \hat v_{\text{boot}}.$$
(1) is the statistical error: fixed by the data, it shrinks only as $n$ grows. (2) is simulation error: make it as small as you like by increasing $B$, at a computational cost.

<b>Real world:</b> $F\Rightarrow X_1,\dots,X_n\Rightarrow T_n\Rightarrow\var(T_n)$. <b>Bootstrap world:</b> $\hat F_n\Rightarrow X_1^*,\dots,X_n^*\Rightarrow T_n^*\Rightarrow\hat v_{\text{boot}}$.

Conditional on the data, each $X_i^*$ is a **discrete uniform** on $\{X_1,\dots,X_n\}$. Expectations "in the bootstrap world" are written $\E^*(\cdot) = \E(\cdot\mid X_1,\dots,X_n)$.`,
P({ k: 'a', lvl: 1, q: R`Data $\{2, 4, 9\}$. A bootstrap draw $X_1^*$ takes which values, with what probabilities? Give $\E^*(X_1^*)$.`, h: [R`Uniform on the three data points.`], a: '5', s: R`$X_1^*\in\{2,4,9\}$, each with probability $\frac13$; $\E^*(X_1^*) = \frac{2 + 4 + 9}{3} = 5 = \bar X_n$.` }),
P({ k: 'b', lvl: 1, q: R`$n = 10$ distinct observations. Probability that $X_1$ does **not** appear in a bootstrap sample?`, h: [R`Each of the $n$ draws misses $X_1$ with probability $1 - \frac1n$, independently.`], a: '0.9^10', s: R`$(1 - \frac1{10})^{10}\approx0.349$. As $n\to\infty$, $(1-\frac1n)^n\to e^{-1}\approx0.368$: a bootstrap sample contains about 63.2% of the distinct observations.` }),
H('Exact bootstrap moments of the mean'),
THM('Bootstrap mean (notes p. 3–4; textbook 8.6.5)', R`Let $\bar X_n^* = \frac1n\sum X_i^*$ and $\hat\sigma_n^2 = \frac1n\sum(X_i - \bar X_n)^2$. Then
$$\E^*(\bar X_n^*) = \bar X_n,\qquad\var^*(\bar X_n^*) = \frac{\hat\sigma_n^2}{n},$$
$$\E(\bar X_n^*) = \mu,\qquad\var(\bar X_n^*) = \frac{\sigma^2}{n} + \frac{(n-1)\sigma^2}{n^2} = \frac{(2n-1)\sigma^2}{n^2}\approx\frac{2\sigma^2}{n}.$$`),
R`**Proof.** Given the data, $X_1^*,\dots,X_n^*$ are iid uniform on the data, so $\E^*(X_1^*) = \sum_i X_i\cdot\frac1n = \bar X_n$ and $\var^*(X_1^*) = \frac1n\sum X_i^2 - \bar X_n^2 = \hat\sigma_n^2$. Linearity and (conditional) independence give the first line. For the unconditional ones use the tower rule and the law of total variance:
$$\E(\bar X_n^*) = \E[\E^*(\bar X_n^*)] = \E(\bar X_n) = \mu,\quad\var(\bar X_n^*) = \var\big(\E^*\bar X_n^*\big) + \E\big(\var^*\bar X_n^*\big) = \frac{\sigma^2}n + \frac{\E\hat\sigma_n^2}{n},$$
and $\E\hat\sigma_n^2 = \frac{n-1}{n}\sigma^2$. ∎

So the bootstrap estimate of $\var(\bar X_n) = \frac{\sigma^2}{n}$ is $\frac{\hat\sigma_n^2}{n}$: exactly the plug-in estimate. For the mean the bootstrap is not needed; it shines for statistics without a formula.`,
P({ k: 'c', lvl: 2, q: R`Data $\{2, 4, 9\}$. Compute $\var^*(\bar X_3^*)$ exactly.`, h: [R`$\hat\sigma^2 = \frac13\sum(x_i - 5)^2$.`], a: '26/9', s: R`Deviations $-3, -1, 4$: $\hat\sigma^2 = \frac{9 + 1 + 16}{3} = \frac{26}{3}$, so $\var^*(\bar X^*) = \frac{26}{9}\approx2.89$.` }),
P({ k: 'd', lvl: 2, q: R`Data $\{2, 4, 9\}$. Find $P^*(\bar X_3^* = 2)$ and $P^*(\bar X_3^* = 5)$.`, h: [R`$\bar X^* = 2$ only if all three draws are 2.`, R`$\bar X^* = 5$ means the three draws sum to 15. Which triples from $\{2,4,9\}$ do that, and in how many orders?`],
  a: [[R`$P^*(\bar X^* = 2)$`, '1/27'], [R`$P^*(\bar X^* = 5)$`, '6/27']],
  s: R`All three draws must be 2: $(\frac13)^3 = \frac1{27}$. A sum of 15 from $\{2,4,9\}$ with three draws: only $2 + 4 + 9$ (check $9 + 4 + 2$ and others: $9 + 2 + 2 = 13$, $4 + 4 + 9 = 17$, …), in any of $3! = 6$ orders: $\frac{6}{27}$.` }),
H('How many bootstrap samples are there?'),
THM('Counting (textbook 8.6.4)', R`With $n$ distinct observations there are $\binom{2n-1}{n}$ distinct bootstrap samples (as multisets).

**Proof.** A bootstrap sample is determined by how many times each $X_i$ is drawn: counts $c_1,\dots,c_n\ge0$ with $c_1 + \dots + c_n = n$. "Stars and bars": $n$ balls into $n$ buckets uses $n$ stars and $n-1$ bars, so the number is $\binom{2n-1}{n}$. ∎ They are **not** equally likely: $(c_1,\dots,c_n)$ has multinomial probability $\frac{n!}{c_1!\cdots c_n!}n^{-n}$.`),
P({ k: 'e', lvl: 1, q: R`How many distinct bootstrap samples are there for $n = 3$ and for $n = 5$ distinct observations?`, a: [[R`$n = 3$`, '10'], [R`$n = 5$`, '126']], s: R`$\binom53 = 10$ and $\binom95 = 126$.` }),
P({ k: 'f', lvl: 3, q: R`Data $b<c<d$ ($n = 3$). Let $m^*$ be the median of a bootstrap sample. Find $P^*(m^* = b)$, $P^*(m^* = c)$, and the bootstrap bias estimate $\E^*(m^*) - c$ in terms of $b,c,d$.`, h: [R`$m^* = b$ iff at least two of the three draws equal $b$.`, R`$P(\text{at least 2 of 3}) = 3(\frac13)^2\frac23 + (\frac13)^3$.`],
  a: [[R`$P^*(m^* = b)$`, '7/27'], [R`$P^*(m^* = c)$`, '13/27'], [R`bias (use b, c, d)`, '7*(b+d-2*c)/27', { b: [0, 1], c: [1.5, 2.5], d: [3, 5] }]],
  s: R`The median of 3 draws is $b$ iff at least two draws are $b$: $3\cdot\frac19\cdot\frac23 + \frac1{27} = \frac{7}{27}$. Same for $d$. So $P^*(m^* = c) = 1 - \frac{14}{27} = \frac{13}{27}$. Then
$$\E^*(m^*) = \frac{7b + 13c + 7d}{27},\qquad\widehat{\text{bias}} = \E^*(m^*) - c = \frac{7(b + d - 2c)}{27}.$$
Zero when the data are symmetric about $c$; positive when the data are right-skewed. (HW9 C2.)`, src: 'HW9 C2' }),
H('Bootstrap bias and when the bootstrap fails'),
R`**Bias:** $\widehat{\text{bias}}_{\text{boot}} = \bar T^* - T_n$ (bootstrap world: "truth" is $T(\hat F_n) = T_n$). A bias-corrected estimator is $T_n - \widehat{\text{bias}} = 2T_n - \bar T^*$.

**Failure: the maximum** (HW9 A4). For $\Unif(0,\theta)$, $\hat\theta = X_{(n)}$ is continuous, so $P(\hat\theta = \theta) = 0$. But $\hat\theta^* = \max X_i^*$ equals $\hat\theta$ whenever the largest observation is drawn at least once:
$$P^*(\hat\theta^* = \hat\theta) = 1 - \left(1 - \frac1n\right)^n\xrightarrow[n\to\infty]{}1 - e^{-1}\approx0.632.$$
The bootstrap distribution has a 63% atom where the truth has none. The bootstrap works for **smooth** statistics of the data (means, smooth functions of means); it breaks for extremes and boundary parameters.`,
P({ k: 'g', lvl: 2, q: R`$n = 5$ distinct data. Compute $P^*(\max X_i^* = \max X_i)$.`, a: '1-0.8^5', s: R`$1 - (\frac45)^5 = 1 - 0.32768 = 0.67232$.` }),
P({ k: 'h', lvl: 2, q: R`$T_n = 3.20$ and $B = 1000$ bootstrap replicates have mean $\bar T^* = 3.45$. Give the bootstrap bias estimate and the bias-corrected estimate.`, a: [['bias', '0.25'], ['bias-corrected', '2.95']], s: R`$\widehat{\text{bias}} = 3.45 - 3.20 = 0.25$; corrected $3.20 - 0.25 = 2.95$.` }),
P({ k: 'i', lvl: 4, q: R`$X_1,\dots,X_n\iid\Unif(0,\theta)$, $\hat\theta = X_{(n)}$. (a) Give the CDF and PDF of $\hat\theta$. (b) Show $P(\hat\theta = \theta) = 0$ but $P^*(\hat\theta^* = \hat\theta) = 1 - (1-\frac1n)^n$, and find its limit. (c) What does this say about the bootstrap?`,
  h: [R`$P(X_{(n)}\le t) = P(\text{all }X_i\le t)$.`, R`$\hat\theta^*\ne\hat\theta$ iff none of the $n$ draws hits the largest observation.`],
  a: [[R`(b) limit`, '1-exp(-1)']],
  s: R`(a) $F_{\hat\theta}(t) = (t/\theta)^n$ for $0\le t\le\theta$ (0 below, 1 above), $f_{\hat\theta}(t) = \frac{nt^{n-1}}{\theta^n}$ on $(0,\theta)$.

(b) $\hat\theta$ has a density, so $P(\hat\theta = \theta) = 0$. Given the data (no ties), $\hat\theta^* = \hat\theta$ iff $X_{(n)}$ is drawn at least once. Each draw misses it with probability $1 - \frac1n$, independently: $P^*(\hat\theta^*\ne\hat\theta) = (1-\frac1n)^n$, so $P^*(\hat\theta^* = \hat\theta) = 1 - (1-\frac1n)^n\to1 - e^{-1}\approx0.632$ because $(1 - \frac1n)^n\to e^{-1}$.

(c) The bootstrap distribution of $\hat\theta^*$ puts about 63% of its mass on a single point, while the true sampling distribution of $\hat\theta$ is continuous, so the bootstrap does not approximate it, however large $n$ is. In R (seed 220, $n = 50$, $B = 2000$) the proportion of replicates equal to $\hat\theta$ was $0.6425$ against the theoretical $1 - 0.98^{50} = 0.6358$. (HW9 A4.)`, src: 'HW9 A4' }),
]);

DRILLS('8.1', [
  { k: '01', lvl: 1, q: R`In the bootstrap, step 1 draws $X_1^*,\dots,X_n^*$ from…`, a: { choice: [R`$\hat F_n$, with replacement`, R`$\hat F_n$, without replacement`, R`$F$, the true distribution`, R`$N(\bar X, \hat\sigma^2)$`], v: 0 }, s: R`From the empirical CDF, i.e. resampling the data **with** replacement. (Without replacement you would just get a permutation of the data back.)` },
  { k: '02', lvl: 1, q: R`Data $\{1, 3, 8\}$. $\E^*(\bar X_3^*)$?`, a: '4', s: R`$\bar X = 4$.` },
  { k: '03', lvl: 1, q: R`Number of distinct bootstrap samples for $n = 4$ distinct observations?`, a: '35', s: R`$\binom{7}{4} = 35$.` },
  { k: '04', lvl: 2, q: R`Data $\{1, 3, 8\}$. $\var^*(\bar X_3^*)$?`, h: [R`$\hat\sigma^2 = \frac{9 + 1 + 16}{3}$.`], a: '26/9', s: R`Deviations $-3, -1, 4$: $\hat\sigma^2 = \frac{26}{3}$; divide by 3: $\frac{26}{9}$.` },
  { k: '05', lvl: 2, q: R`Data $\{1, 3, 8\}$. $P^*(\bar X_3^* = 1)$ and $P^*(\bar X_3^* = 8)$?`, a: [['=1', '1/27'], ['=8', '1/27']], s: R`All three draws equal: $\frac1{27}$ each.` },
  { k: '06', lvl: 2, q: R`$n = 20$ distinct observations. Expected number of distinct observations in a bootstrap sample?`, h: [R`Linearity: each $X_i$ appears with probability $1 - (1 - \frac1n)^n$.`], a: '20*(1-0.95^20)', s: R`$20\left(1 - 0.95^{20}\right)\approx20(0.6415) = 12.83$.` },
  { k: '07', lvl: 2, q: R`$T_n = 10.5$ and the bootstrap replicates have mean $11.4$ and standard deviation $2.9$. Bootstrap bias estimate, bias-corrected estimate, and bootstrap se?`, a: [['bias', '0.9'], ['corrected', '9.6'], ['se', '2.9']], s: R`$11.4 - 10.5 = 0.9$; $10.5 - 0.9 = 9.6$; $\widehat{\operatorname{se}}_{\text{boot}} = 2.9$.` },
  { k: '08', lvl: 2, q: R`$X_i$ iid with variance $\sigma^2$, $n = 10$. Unconditional $\var(\bar X_{10}^*)$ in terms of $\sigma^2$?`, a: [['use sigma', '19*sigma^2/100', { sigma: [0.3, 3] }]], s: R`$\frac{(2n-1)\sigma^2}{n^2} = \frac{19\sigma^2}{100}$.` },
  { k: '09', lvl: 3, q: R`Data $\{1, 2, 6\}$. Bootstrap distribution of the median $m^*$ ($n = 3$): give $\E^*(m^*)$ and $\var^*(m^*)$.`, h: [R`$P^*(m^* = 1) = P^*(m^* = 6) = \frac7{27}$, $P^*(m^* = 2) = \frac{13}{27}$.`], a: [[R`$\E^*$`, '25/9'], [R`$\var^*$`, '308/81']],
    s: R`$\E^* = \frac{7 + 26 + 42}{27} = \frac{75}{27} = \frac{25}9$. $\E^*(m^{*2}) = \frac{7 + 52 + 252}{27} = \frac{311}{27}$. $\var^* = \frac{311}{27} - \frac{625}{81} = \frac{933 - 625}{81} = \frac{308}{81}\approx3.80$: a bootstrap se of about $1.95$.` },
  { k: '10', lvl: 3, q: R`Data $\{0, 1\}$ ($n = 2$). List the bootstrap distribution of $\bar X^*$ and check $\var^*(\bar X^*) = \hat\sigma^2/n$.`, a: [[R`$P^*(\bar X^* = \frac12)$`, '1/2'], [R`$\var^*(\bar X^*)$`, '1/8']],
    s: R`Draws $(0,0), (0,1), (1,0), (1,1)$ equally likely: $\bar X^* = 0, \frac12, \frac12, 1$ with probabilities $\frac14, \frac12, \frac14$. $\var^* = \frac14\cdot\frac14 + 0 + \frac14\cdot\frac14 = \frac18$. And $\hat\sigma^2 = \frac14$, $\hat\sigma^2/2 = \frac18$. ✓` },
  { k: '11', lvl: 4, q: R`Prove: $\E(\bar X_n^*) = \mu$ and $\var(\bar X_n^*) = \frac{(2n-1)\sigma^2}{n^2}$ (textbook 8.6.5).`, h: [R`Condition on the data: tower rule and law of total variance.`],
    s: R`Given the data, $X_i^*$ are iid uniform on $\{X_1,\dots,X_n\}$: $\E^*X_1^* = \bar X_n$ and $\var^*X_1^* = \hat\sigma_n^2 = \frac1n\sum(X_j - \bar X_n)^2$. Hence $\E^*\bar X^* = \bar X_n$ and $\var^*\bar X^* = \hat\sigma_n^2/n$.
$\E(\bar X^*) = \E(\E^*\bar X^*) = \E\bar X_n = \mu$.
$\var(\bar X^*) = \var(\E^*\bar X^*) + \E(\var^*\bar X^*) = \var(\bar X_n) + \frac{\E\hat\sigma_n^2}{n} = \frac{\sigma^2}{n} + \frac{(n-1)\sigma^2}{n^2} = \frac{(2n-1)\sigma^2}{n^2}$, using $\E\hat\sigma_n^2 = \frac{n-1}{n}\E S_n^2 = \frac{n-1}n\sigma^2$. ∎`, src: 'Wasserman 8.6.5 (HW9 B2)' },
  { k: '12', lvl: 4, q: R`$X_1,\dots,X_n$ iid, $\mu\ne0$, $\theta = \mu^2$, $\hat\theta = \bar X_n^2$. (a) Delta-method se of $\hat\theta$ and its plug-in estimate. (b) How would you get a bootstrap se? (c) What goes wrong at $\mu = 0$?`, h: [R`$g(u) = u^2$, $g'(\mu) = 2\mu$.`],
    a: [[R`(a) se (use mu, sigma, n)`, '2*abs(mu)*sigma/sqrt(n)', { mu: [0.5, 3], sigma: [0.3, 3], n: [5, 100, 'int'] }]],
    s: R`(a) $\sqrt n(\bar X - \mu)\xrightarrow{D}N(0,\sigma^2)$, so $\sqrt n(\bar X^2 - \mu^2)\xrightarrow{D}N(0, 4\mu^2\sigma^2)$: $\operatorname{se}\approx\frac{2|\mu|\sigma}{\sqrt n}$, estimated by $\frac{2|\bar X_n|\hat\sigma}{\sqrt n}$.
(b) Resample with replacement $B$ times, compute $\bar X^{*2}_b$ each time, and take the standard deviation of the $B$ values.
(c) $g'(0) = 0$, so the first-order variance is 0: useless. The right scaling is $n$, not $\sqrt n$: $n\bar X_n^2/\sigma^2 = (\sqrt n\bar X_n/\sigma)^2\xrightarrow{D}\chi^2_1$. (In R with seed 220, $n = 100$, $N(2,1)$: delta se $0.382$, bootstrap se $0.381$.)`, src: 'HW9 C1' },
]);
