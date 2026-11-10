TOPIC({ id: '5.3', ch: 5, title: 'Central limit theorem', summary: 'Sample means are approximately normal: normal approximations, CLT intervals, sample sizes, multivariate CLT.' }, [
R`The law of large numbers says $\bar X_n\to\mu$. That tells you *where* the sample mean ends up, but not *how* it wobbles around $\mu$ for a finite $n$. The **central limit theorem** (CLT) answers that: whatever the distribution of the $X_i$ (as long as the variance is finite), the fluctuations of $\bar X_n$ around $\mu$ look **normal**, with standard deviation $\sigma/\sqrt n$.

Throughout this page, $\Phi$ is the $N(0,1)$ CDF. Values you should know (and put on your cheat sheet): $\Phi(1) = 0.8413$, $\Phi(1.5) = 0.9332$, $\Phi(1.645) = 0.95$, $\Phi(1.96) = 0.975$, $\Phi(2) = 0.9772$, $\Phi(2.576) = 0.995$, and $\Phi(-z) = 1 - \Phi(z)$.`,
THM('Central limit theorem (Wasserman Thm 5.8, Lindeberg–Lévy)', R`Let $X_1,\dots,X_n$ be iid with mean $\mu$ and finite variance $\sigma^2>0$, and $\bar X_n = \frac1n\sum_{i=1}^nX_i$. Then
$$Z_n = \frac{\bar X_n - \mu}{\sqrt{\var(\bar X_n)}} = \frac{\sqrt n(\bar X_n - \mu)}{\sigma}\ \xrightarrow{D}\ Z\sim N(0,1),$$
that is, $\lim_{n\to\infty}P(Z_n\le z) = \Phi(z)$ for every $z\in\R$.`),
R`It is a statement about **convergence in distribution** (topic 5.1): the CDF of $Z_n$ converges to $\Phi$ at every point (every point is a continuity point of $\Phi$). Nothing is said about densities, and the $X_i$ can even be discrete.`,
P({ k: 'a', lvl: 1, q: R`$X_1,\dots,X_{100}$ are iid with mean $5$ and standard deviation $2$. By the CLT, $\bar X_{100}$ is approximately normal. Give its approximate mean and variance.`,
  h: [R`$E(\bar X_n) = \mu$ and $\var(\bar X_n) = \sigma^2/n$; the CLT says the shape is normal.`],
  a: [[R`mean`, '5'], [R`variance`, '0.04']],
  s: R`$\bar X_{100}\approx N\left(\mu, \frac{\sigma^2}{n}\right) = N\left(5, \frac{4}{100}\right) = N(5, 0.04)$, so its standard deviation is $0.2$.`, src: 'Slides Ch.6 (CLT for $\hat p_n$)' }),
NOTE('Equivalent ways to write the CLT', R`For large $n$, all of these say the same thing:
<ul><li>$\sqrt n(\bar X_n - \mu)\xrightarrow{D}N(0, \sigma^2)$;</li><li>$\bar X_n\approx N\left(\mu, \frac{\sigma^2}{n}\right)$;</li><li>$S_n = \sum_{i=1}^nX_i\approx N(n\mu, n\sigma^2)$.</li></ul>
To approximate a probability: **standardize** with the exact mean and standard deviation, then use $\Phi$.
$$P(\bar X_n\le x)\approx\Phi\left(\frac{x - \mu}{\sigma/\sqrt n}\right),\qquad P(S_n\le s)\approx\Phi\left(\frac{s - n\mu}{\sigma\sqrt n}\right).$$`),
P({ k: 'b', lvl: 2, q: R`Same setting ($n = 100$, $\mu = 5$, $\sigma = 2$). Approximate $P(\bar X_{100}>5.4)$. Use $\Phi(2) = 0.9772$.`,
  h: [R`Standardize: $\frac{5.4 - 5}{0.2}$.`],
  a: '0.0228',
  s: R`$$P(\bar X_{100}>5.4) = P\left(\frac{\bar X_{100} - 5}{0.2}>\frac{5.4 - 5}{0.2}\right)\approx P(Z>2) = 1 - \Phi(2) = 0.0228.$$` }),
P({ k: 'c', lvl: 2, q: R`$U_1,\dots,U_{48}\iid\Unif(0,1)$ and $S = \sum U_i$. Approximate $P(S>27)$. Use $\Phi(1.5) = 0.9332$.`,
  h: [R`$E(U_i) = \frac12$, $\var(U_i) = \frac1{12}$. So $E(S) = 24$ and $\var(S) = 4$.`],
  a: '0.0668',
  s: R`$E(S) = 48\cdot\frac12 = 24$, $\var(S) = 48\cdot\frac1{12} = 4$ (independence), so $\sd(S) = 2$. By the CLT,
$$P(S>27)\approx1 - \Phi\left(\frac{27 - 24}{2}\right) = 1 - \Phi(1.5) = 0.0668.$$` }),
P({ k: 'd', lvl: 3, q: R`A truck carries $64$ boxes whose weights are iid $\Exp(\beta = 2)$ (in tens of kg; the course uses the scale $\beta$, so the mean is $2$). Approximate the probability that the total weight exceeds $140$. Use $\Phi(0.75) = 0.7734$.`,
  h: [R`$\Exp(\beta)$: mean $\beta$, variance $\beta^2$.`, R`Total: mean $64\cdot2 = 128$, variance $64\cdot4 = 256$.`],
  a: '0.2266',
  s: R`Let $T = \sum_{i=1}^{64}X_i$. Since $E(X_i) = \beta = 2$ and $\var(X_i) = \beta^2 = 4$, and the $X_i$ are independent,
$$E(T) = 128,\quad\var(T) = 256,\quad\sd(T) = 16.$$
By the CLT, $T\approx N(128, 256)$, so
$$P(T>140)\approx1 - \Phi\left(\frac{140 - 128}{16}\right) = 1 - \Phi(0.75) = 0.2266.$$
(The exact answer uses $T\sim\Gam(64, 2)$ (topic 3.7); the CLT avoids that integral.)` }),
H('Binomial and Poisson approximations'),
R`A $\Bin(n,p)$ variable is a sum of $n$ iid $\Ber(p)$ variables, so the CLT applies directly: $\Bin(n,p)\approx N\big(np, np(1-p)\big)$ when $n$ is large (rule of thumb: $np$ and $n(1-p)$ both at least about 10). Likewise $\Pois(\lambda)$ with $\lambda$ a large integer is a sum of $\lambda$ iid $\Pois(1)$ variables, so $\Pois(\lambda)\approx N(\lambda, \lambda)$.`,
P({ k: 'e', lvl: 1, q: R`$X\sim\Bin(400, 0.5)$. Give the mean and standard deviation of the approximating normal.`,
  h: [R`$np$ and $\sqrt{np(1-p)}$.`],
  a: [[R`mean`, '200'], [R`sd`, '10']],
  s: R`$np = 200$ and $\sqrt{np(1-p)} = \sqrt{100} = 10$.` }),
P({ k: 'f', lvl: 2, q: R`$X\sim\Bin(400, 0.5)$. Approximate $P(X\ge220)$ with the CLT (no continuity correction). Use $\Phi(2) = 0.9772$.`,
  h: [R`$\frac{220 - 200}{10} = 2$.`],
  a: '0.0228',
  s: R`$P(X\ge220)\approx1 - \Phi\left(\frac{220 - 200}{10}\right) = 1 - \Phi(2) = 0.0228.$

*Continuity correction (optional refinement):* since $X$ is integer-valued, $P(X\ge220) = P(X>219.5)\approx1 - \Phi(1.95) = 0.0256$, closer to the exact value. Unless asked, the plain CLT answer is fine.` }),
P({ k: 'g', lvl: 2, q: R`A call centre receives $X\sim\Pois(100)$ calls per day. Approximate $P(X>115)$. Use $\Phi(1.5) = 0.9332$.`,
  h: [R`$\Pois(100)$ is a sum of 100 iid $\Pois(1)$: mean 100, variance 100.`],
  a: '0.0668',
  s: R`$X\overset{d}{=}\sum_{i=1}^{100}Y_i$ with $Y_i\iid\Pois(1)$ (Poisson sums add their rates, topic 3.7). So $X\approx N(100, 100)$ and
$$P(X>115)\approx1 - \Phi\left(\frac{115 - 100}{10}\right) = 1 - \Phi(1.5) = 0.0668.$$` }),
H('Why it is true: the MGF proof'),
R`Assume the MGF exists near 0 (topic 3.7). Put $Y_i = \frac{X_i - \mu}{\sigma}$: mean 0, variance 1, so its MGF is $\psi_Y(t) = 1 + 0\cdot t + \frac{t^2}{2} + o(t^2)$. Since $Z_n = \frac1{\sqrt n}\sum Y_i$ is a scaled sum of iid variables,
$$\psi_{Z_n}(t) = \left[\psi_Y\left(\tfrac{t}{\sqrt n}\right)\right]^n = \left[1 + \frac{t^2}{2n} + o\left(\tfrac1n\right)\right]^n\ \longrightarrow\ e^{t^2/2},$$
using $(1 + \frac an)^n\to e^a$. And $e^{t^2/2}$ is the MGF of $N(0,1)$. A continuity theorem for MGFs (if $\psi_{Z_n}\to\psi_Z$ near 0 then $Z_n\xrightarrow{D}Z$) finishes the proof.`,
P({ k: 'h', lvl: 2, q: R`In the proof above, compute $\lim_{n\to\infty}\left(1 + \frac{t^2}{2n}\right)^n$ at $t = 2$.`,
  h: [R`$(1 + a/n)^n\to e^a$ with $a = t^2/2$.`],
  a: 'exp(2)',
  s: R`$a = \frac{t^2}{2} = 2$, so the limit is $e^2\approx7.39$, which is $\psi_Z(2)$ for $Z\sim N(0,1)$.` }),
H('CLT with an estimated standard deviation'),
R`In practice $\sigma$ is unknown. Replace it with the sample standard deviation $S_n$ (topic 3.4); the limit does not change.`,
THM('Wasserman Thm 5.10', R`Under the CLT assumptions,
$$\frac{\sqrt n(\bar X_n - \mu)}{S_n}\ \xrightarrow{D}\ N(0,1).$$
(Proof: $S_n\xrightarrow{P}\sigma$ by the law of large numbers, then Slutsky's theorem, topic 5.4.)`),
R`Consequence: $\bar X_n\pm z_{\alpha/2}\frac{S_n}{\sqrt n}$, with $z_{\alpha/2} = \Phi^{-1}(1 - \frac\alpha2)$, is an approximate $1-\alpha$ confidence interval for $\mu$ (topic 6.4). For 95%, $z_{0.025} = 1.96$.`,
P({ k: 'i', lvl: 2, q: R`$n = 100$ observations give $\bar x = 12.3$ and $s = 4$. Give the approximate 95% confidence interval for $\mu$.`,
  h: [R`Half-width $1.96\cdot\frac{s}{\sqrt n} = 1.96\cdot0.4$.`],
  a: [[R`lower end`, '12.3-1.96*0.4'], [R`upper end`, '12.3+1.96*0.4']],
  s: R`$\frac{s}{\sqrt n} = \frac4{10} = 0.4$, so the interval is $12.3\pm1.96\cdot0.4 = 12.3\pm0.784 = (11.516,\ 13.084)$.` }),
H('CLT versus Chebyshev'),
R`Chebyshev (topic 4.1) gives a **guaranteed** bound for every $n$ and every distribution, but it is crude. The CLT gives an **approximate** probability that is much sharper when $n$ is large. Expect the Chebyshev interval to be about twice as wide at 90–95% levels.`,
P({ k: 'j', lvl: 3, q: R`$\bar X$ is the mean of $64$ iid observations with variance $\sigma^2 = 16$. Find $c$ such that $P(|\bar X - \mu|<c)\ge0.95$ (i) by Chebyshev, (ii) approximately by the CLT.`,
  h: [R`$\sd(\bar X) = \frac{4}{8} = 0.5$.`, R`Chebyshev: $P(|\bar X - \mu|\ge k\cdot0.5)\le\frac1{k^2}$; set $\frac1{k^2} = 0.05$.`, R`CLT: $c = 1.96\cdot0.5$.`],
  a: [[R`(i) Chebyshev $c$`, '0.5*sqrt(20)'], [R`(ii) CLT $c$`, '0.98']],
  s: R`$\var(\bar X) = \frac{16}{64} = \frac14$, $\sd(\bar X) = 0.5$.

**(i) Chebyshev.** $P(|\bar X - \mu|\ge0.5k)\le\frac{1}{k^2}$. We need $1 - \frac1{k^2}\ge0.95$, i.e. $k\ge\sqrt{20}\approx4.472$. So $c = 0.5\sqrt{20}\approx2.236$.

**(ii) CLT.** $\frac{\bar X - \mu}{0.5}\approx N(0,1)$, so $P(|\bar X - \mu|<1.96\cdot0.5)\approx0.95$: $c = 0.98$.

The Chebyshev interval is about $2.3$ times wider: that is the price of a guarantee that holds for every distribution and every $n$.`, src: 'like HW7 C2' }),
H('Sample size'),
P({ k: 'k', lvl: 2, q: R`A poll estimates a proportion $p$ by $\hat p_n$. Using the CLT and $p(1-p)\le\frac14$, what is the smallest $n$ such that the 95% interval $\hat p_n\pm1.96\sqrt{p(1-p)/n}$ has half-width at most $0.03$ for every $p$?`,
  h: [R`Worst case: $1.96\cdot\frac{1/2}{\sqrt n}\le0.03$.`],
  a: '1068',
  s: R`$1.96\cdot\frac{0.5}{\sqrt n}\le0.03\iff\sqrt n\ge\frac{0.98}{0.03} = 32.67\iff n\ge1067.1$. So $n = 1068$.` }),
P({ k: 'l', lvl: 3, q: R`Same goal, $P(|\hat p_n - p|>0.03)\le0.05$ for every $p$. Find the smallest $n$ guaranteed by (i) Hoeffding, (ii) Chebyshev with $p(1-p)\le\frac14$. Compare with the CLT answer $1068$.`,
  h: [R`Hoeffding: $2e^{-2n\varepsilon^2}\le0.05$.`, R`Chebyshev: $\frac{1}{4n\varepsilon^2}\le0.05$.`],
  a: [[R`(i) Hoeffding $n$`, '2050'], [R`(ii) Chebyshev $n$`, '5556']],
  s: R`**(i)** $2e^{-2n(0.03)^2}\le0.05\iff n\ge\frac{\log40}{2\cdot0.0009} = \frac{3.689}{0.0018}\approx2049.4$, so $n = 2050$.

**(ii)** $\frac{1}{4n(0.0009)}\le0.05\iff n\ge\frac{1}{0.00018}\approx5555.6$, so $n = 5556$.

The CLT answer ($1068$) is the smallest, but it is only approximate. Hoeffding and Chebyshev are exact guarantees, and Hoeffding is the sharper of the two (same ranking as on Midterm 1 2026, Ex.3).`, src: 'like Midterm 1 2026 Ex.3' }),
H('The multivariate CLT'),
THM('Multivariate CLT (Wasserman Thm 5.12)', R`Let $\mathbf X_1,\dots,\mathbf X_n$ be iid random vectors in $\R^k$ with mean $\boldsymbol\mu$ and covariance matrix $\Sigma$. Then
$$\sqrt n\,(\bar{\mathbf X}_n - \boldsymbol\mu)\ \xrightarrow{D}\ N_k(\mathbf 0, \Sigma).$$
In particular, for any fixed vector $\mathbf a$: $\sqrt n\,\mathbf a^T(\bar{\mathbf X}_n - \boldsymbol\mu)\xrightarrow{D}N(0, \mathbf a^T\Sigma\mathbf a)$.`),
P({ k: 'm', lvl: 2, q: R`Pairs $(X_i, Y_i)$ are iid with $\var(X) = 4$, $\var(Y) = 9$, $\cov(X,Y) = 3$. Find the variance of the normal limit of $\sqrt n\big[(\bar X_n + \bar Y_n) - (\mu_X + \mu_Y)\big]$.`,
  h: [R`$\mathbf a = (1,1)$: $\mathbf a^T\Sigma\mathbf a = \var X + \var Y + 2\cov(X,Y)$.`],
  a: '19',
  s: R`With $\mathbf a = (1,1)^T$: $\mathbf a^T\Sigma\mathbf a = 4 + 9 + 2\cdot3 = 19$. (It is just $\var(X + Y)$, as the one-dimensional CLT applied to $X_i + Y_i$ would also give.)` }),
WARN('When the CLT fails', R`The CLT needs a **finite variance**. If $X_i\iid$ Cauchy, $\bar X_n$ is again standard Cauchy for every $n$ (topic 3.7 / characteristic functions): no normal limit, and not even a law of large numbers. Also remember the CLT is a limit statement: for small $n$ or very skewed data the approximation can be poor.`),
P({ k: 'n', lvl: 3, q: R`$X_1,\dots,X_n\iid$ standard Cauchy. Does the CLT imply that $\sqrt n\,\bar X_n$ is approximately normal for large $n$?`,
  h: [R`Check the assumptions: is $\var(X_1)$ finite? Is $E(X_1)$ even defined?`],
  a: { choice: ['Yes', 'No'], v: 1 },
  s: R`**No.** The Cauchy distribution has no mean (topic 3.1) and infinite variance, so the CLT's hypotheses fail. In fact $\bar X_n$ is standard Cauchy for every $n$, so $\sqrt n\,\bar X_n$ spreads out more and more and does not converge at all.` }),
]);

DRILLS('5.3', [
  { k: '01', lvl: 1, q: R`$X_1,\dots,X_{25}$ iid with $\sigma = 10$. Standard deviation of $\bar X_{25}$?`, h: [R`$\sigma/\sqrt n$.`], a: '2', s: R`$\frac{10}{\sqrt{25}} = 2$.` },
  { k: '02', lvl: 1, q: R`$n = 36$, $\mu = 50$, $\sigma = 12$. Approximate $P(\bar X_{36}>54)$. Use $\Phi(2) = 0.9772$.`, h: [R`$\sd(\bar X) = 2$.`], a: '0.0228', s: R`$1 - \Phi\left(\frac{54 - 50}{2}\right) = 1 - \Phi(2) = 0.0228$.` },
  { k: '03', lvl: 2, q: R`$X_1,\dots,X_{100}\iid\Exp(\beta = 3)$. Approximate $P(\bar X_{100}<2.4)$. Use $\Phi(2) = 0.9772$.`, h: [R`Mean $\beta = 3$, sd of $\bar X$: $\beta/\sqrt n = 0.3$.`], a: '0.0228', s: R`$\bar X\approx N(3, 0.09)$, so $P(\bar X<2.4)\approx\Phi\left(\frac{2.4 - 3}{0.3}\right) = \Phi(-2) = 0.0228$.` },
  { k: '04', lvl: 2, q: R`$S$ is the sum of $12$ iid $\Unif(0,1)$ variables. Approximate $P(S>7)$. Use $\Phi(1) = 0.8413$.`, h: [R`$E(S) = 6$, $\var(S) = 12\cdot\frac1{12} = 1$.`], a: '0.1587', s: R`$S\approx N(6, 1)$, so $P(S>7)\approx1 - \Phi(1) = 0.1587$.` },
  { k: '05', lvl: 2, q: R`$X\sim\Bin(100, 0.2)$. Approximate $P(X\le14)$ by the CLT (no continuity correction). Use $\Phi(1.5) = 0.9332$.`, h: [R`Mean $20$, sd $\sqrt{16} = 4$.`], a: '0.0668', s: R`$P(X\le14)\approx\Phi\left(\frac{14 - 20}{4}\right) = \Phi(-1.5) = 0.0668$.` },
  { k: '06', lvl: 2, q: R`Bulbs fail at a rate of $0.5$ per hour, so the number of failures in 200 hours is $\Pois(100)$. Approximate $P(\text{fewer than }90\text{ failures})$, treating it as $P(X<90)\approx\Phi(\cdot)$ without continuity correction. Use $\Phi(1) = 0.8413$.`, h: [R`$\Pois(100)\approx N(100, 100)$.`], a: '0.1587', s: R`$P(X<90)\approx\Phi\left(\frac{90 - 100}{10}\right) = \Phi(-1) = 0.1587$.` },
  { k: '07', lvl: 2, q: R`$n = 400$, $\bar x = 3.2$, $s = 2$. Half-width of the approximate 95% confidence interval for $\mu$?`, h: [R`$1.96\cdot s/\sqrt n$.`], a: '0.196', s: R`$1.96\cdot\frac{2}{20} = 0.196$, so the interval is $(3.004, 3.396)$.` },
  { k: '08', lvl: 2, q: R`Measurements have $\sigma = 5$. How many are needed so that the 95% CLT interval $\bar X\pm1.96\sigma/\sqrt n$ has half-width at most $0.5$?`, h: [R`$n\ge\left(\frac{1.96\cdot5}{0.5}\right)^2$.`], a: '385', s: R`$n\ge(19.6)^2 = 384.16$, so $n = 385$.` },
  { k: '09', lvl: 3, q: R`$\bar X$ is the mean of $25$ observations from a population with variance $4$. Find limits $\pm c$ for $\bar X - \mu$ that hold with probability at least $0.90$ (i) by Chebyshev, (ii) approximately by the CLT. Use $\Phi(1.645) = 0.95$.`,
    h: [R`$\sd(\bar X) = 0.4$.`, R`Chebyshev: $\frac1{k^2} = 0.10\Rightarrow k = \sqrt{10}$.`],
    a: [[R`(i) Chebyshev $c$`, '0.4*sqrt(10)'], [R`(ii) CLT $c$`, '0.658']],
    s: R`$\sd(\bar X) = \frac{2}{5} = 0.4$.

**(i)** $P(|\bar X - \mu|\ge0.4k)\le\frac1{k^2} = 0.1$ gives $k = \sqrt{10}$, so $c = 0.4\sqrt{10}\approx1.265$.

**(ii)** $P(|\bar X - \mu|<1.645\cdot0.4)\approx0.90$, so $c\approx0.658$.

Chebyshev's interval is about $1.92$ times wider: it holds for every distribution, the CLT one only approximately.`, src: 'like HW7 C2' },
  { k: '10', lvl: 3, q: R`Pairs $(X_i,Y_i)$ iid with $\var X = 1$, $\var Y = 4$, $\cov(X,Y) = -1$. Give the variances of the normal limits of (i) $\sqrt n[(\bar X - \bar Y) - (\mu_X - \mu_Y)]$, (ii) $\sqrt n[(\bar X + 2\bar Y) - (\mu_X + 2\mu_Y)]$.`,
    h: [R`Multivariate CLT: $\mathbf a^T\Sigma\mathbf a$.`],
    a: [[R`(i)`, '7'], [R`(ii)`, '13']],
    s: R`$\Sigma = \begin{pmatrix}1&-1\\-1&4\end{pmatrix}$.
(i) $\mathbf a = (1,-1)$: $1 + 4 - 2(-1) = 7$.
(ii) $\mathbf a = (1,2)$: $1 + 4\cdot4 + 2\cdot2\cdot(-1) = 13$.` },
  { k: '11', lvl: 3, q: R`An insurer has $400$ independent claims, each with mean $1000$ and standard deviation $500$. Find the reserve $r$ such that $P(\text{total}\le r)\approx0.975$. Use $\Phi(1.96) = 0.975$.`,
    h: [R`Total: mean $400{,}000$, sd $500\sqrt{400} = 10{,}000$.`],
    a: '419600',
    s: R`$T\approx N(400000, 10000^2)$. $P(T\le r)\approx\Phi\left(\frac{r - 400000}{10000}\right) = 0.975\iff\frac{r - 400000}{10000} = 1.96$, so $r = 419{,}600$.` },
  { k: '12', lvl: 4, q: R`$X_1,\dots,X_n\iid\Exp(\beta)$ (mean $\beta$).
(a) State the CLT approximation for $\bar X_n$; give its variance for $\beta = 2$, $n = 100$.
(b) With $\beta = 2$, $n = 100$, approximate $P(\bar X_n>2.3)$. Use $\Phi(1.5) = 0.9332$.
(c) Find the smallest $n$ such that, approximately, $P(|\bar X_n - \beta|>0.1\beta)\le0.05$ (for any $\beta$).`,
    h: [R`$\var(\bar X_n) = \beta^2/n$.`, R`(c): $P(|\bar X_n - \beta|>0.1\beta)\approx2\left[1 - \Phi\left(0.1\sqrt n\right)\right]$.`],
    a: [[R`(a) variance`, '0.04'], [R`(b) probability`, '0.0668'], [R`(c) $n$`, '385']],
    s: R`**(a)** $E(X_i) = \beta$, $\var(X_i) = \beta^2<\infty$, so by the CLT $\frac{\sqrt n(\bar X_n - \beta)}{\beta}\xrightarrow{D}N(0,1)$, i.e. $\bar X_n\approx N\left(\beta, \frac{\beta^2}{n}\right)$. For $\beta = 2$, $n = 100$: variance $\frac{4}{100} = 0.04$.

**(b)** $P(\bar X_n>2.3)\approx1 - \Phi\left(\frac{2.3 - 2}{0.2}\right) = 1 - \Phi(1.5) = 0.0668$.

**(c)** $P(|\bar X_n - \beta|>0.1\beta) = P\left(\left|\frac{\sqrt n(\bar X_n - \beta)}{\beta}\right|>0.1\sqrt n\right)\approx2[1 - \Phi(0.1\sqrt n)]$. This is $\le0.05$ iff $0.1\sqrt n\ge1.96$, i.e. $n\ge384.16$: $n = 385$. Note $\beta$ cancels.` },
  { k: '13', lvl: 4, q: R`Let $X_n\sim\Pois(n)$. Using MGFs, show that $Z_n = \frac{X_n - n}{\sqrt n}\xrightarrow{D}N(0,1)$. As a check, enter $\lim_{n\to\infty}\psi_{Z_n}(1)$.`,
    h: [R`$\psi_{X_n}(t) = e^{n(e^t - 1)}$ and $\psi_{aX + b}(t) = e^{bt}\psi_X(at)$.`, R`$\log\psi_{Z_n}(t) = n\left(e^{t/\sqrt n} - 1\right) - t\sqrt n$. Expand $e^u = 1 + u + \frac{u^2}{2} + O(u^3)$.`],
    a: 'exp(1/2)',
    s: R`With $a = \frac1{\sqrt n}$, $b = -\sqrt n$:
$$\psi_{Z_n}(t) = e^{-t\sqrt n}\,\psi_{X_n}\left(\tfrac{t}{\sqrt n}\right) = \exp\left\{n\left(e^{t/\sqrt n} - 1\right) - t\sqrt n\right\}.$$
Expanding $e^{t/\sqrt n} = 1 + \frac{t}{\sqrt n} + \frac{t^2}{2n} + O(n^{-3/2})$:
$$n\left(e^{t/\sqrt n} - 1\right) - t\sqrt n = t\sqrt n + \frac{t^2}{2} + O(n^{-1/2}) - t\sqrt n\ \longrightarrow\ \frac{t^2}{2}.$$
So $\psi_{Z_n}(t)\to e^{t^2/2}$, the MGF of $N(0,1)$, for every $t$; by the continuity theorem for MGFs, $Z_n\xrightarrow{D}N(0,1)$. At $t = 1$ the limit is $e^{1/2}\approx1.649$.` },
  { k: '14', lvl: 4, q: R`In a poll of $n = 900$ people, $540$ say yes. Let $\hat p = \bar X_n$.
(a) Estimated standard error $\sqrt{\hat p(1-\hat p)/n}$.
(b) The approximate 95% interval for $p$ (lower and upper ends).
(c) Does the interval contain $p = 0.55$?`,
    h: [R`$\hat p = 0.6$, so $\hat p(1-\hat p) = 0.24$.`, R`Justification: CLT plus $\hat p(1-\hat p)\xrightarrow{P}p(1-p)$ and Slutsky (topic 5.4).`],
    a: [[R`(a) se`, 'sqrt(0.24/900)'], [R`(b) lower`, '0.6-1.96*sqrt(0.24/900)'], [R`(b) upper`, '0.6+1.96*sqrt(0.24/900)'], [R`(c) contains 0.55?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** $\hat p = 0.6$, $\widehat{\text{se}} = \sqrt{0.24/900}\approx0.01633$.

**(b)** By the CLT, $\frac{\hat p - p}{\sqrt{p(1-p)/n}}\xrightarrow{D}N(0,1)$, and replacing $p(1-p)$ by $\hat p(1-\hat p)$ does not change the limit (Slutsky). So $0.6\pm1.96\cdot0.01633 = 0.6\pm0.032 = (0.568, 0.632)$.

**(c)** $0.55<0.568$: **no**, the data are not compatible with $p = 0.55$ at the 95% level.` },
]);
