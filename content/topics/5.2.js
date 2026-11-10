TOPIC({ id: '5.2', ch: 5, title: 'Law of large numbers', summary: 'Sample averages converge in probability to the mean; sample moments, Monte Carlo, and what the LLN does not say.' }, [
R`Flip a fair coin many times: the **fraction** of heads settles near $\frac12$. The law of large numbers (LLN) makes this precise: the sample mean $\bar X_n = \frac1n\sum_{i=1}^nX_i$ converges to the true mean $\mu$.`,
THM('Weak law of large numbers (Theorem 5.6)', R`If $X_1,X_2,\dots$ are iid with $E|X_1|<\infty$ and $\mu = E(X_1)$, then
$$\bar X_n\xrightarrow{P}\mu.$$`),
R`*Proof (assuming also $\sigma^2 = \var X_1<\infty$).* $E\bar X_n = \mu$ and $\var\bar X_n = \sigma^2/n$. By Chebyshev, for every $\varepsilon>0$,
$$P(|\bar X_n - \mu|>\varepsilon)\le\frac{\var\bar X_n}{\varepsilon^2} = \frac{\sigma^2}{n\varepsilon^2}\longrightarrow0.\qquad\blacksquare$$
(The proof even gives $\bar X_n\xrightarrow{\text{qm}}\mu$.) The **strong** LLN upgrades this to $\bar X_n\xrightarrow{\text{a.s.}}\mu$.`,
P({ k: 'a', lvl: 1, q: R`iid with $\sigma^2 = 4$. Chebyshev bound for $P(|\bar X_n - \mu|>0.5)$ at $n = 100$?`,
  h: [R`$\frac{\sigma^2}{n\varepsilon^2}$.`], a: '0.16',
  s: R`$\frac{4}{100\cdot0.25} = 0.16$.` }),
P({ k: 'b', lvl: 2, q: R`iid with $\sigma^2 = 9$. Smallest $n$ for which the Chebyshev bound on $P(|\bar X_n - \mu|>0.3)$ is at most $0.05$?`,
  h: [R`Solve $\frac{9}{0.09n}\le0.05$.`], a: '2000',
  s: R`$\frac{9}{0.09\,n} = \frac{100}{n}\le0.05\iff n\ge2000$.` }),
NOTE('LLN for any function', R`Apply the LLN to $Y_i = g(X_i)$, which are also iid: if $E|g(X_1)|<\infty$,
$$\frac1n\sum_{i=1}^ng(X_i)\xrightarrow{P}E\,g(X_1).$$
So sample moments converge: $\frac1n\sum X_i^k\xrightarrow{P}E(X_1^k)$; sample frequencies converge: $\frac1n\sum\1(X_i\in A)\xrightarrow{P}P(X_1\in A)$.`),
P({ k: 'c', lvl: 2, q: R`$X_i\iid\Exp(\beta = 2)$. Find the limits in probability of $\bar X_n$ and of $\frac1n\sum X_i^2$.`,
  h: [R`$E X = \beta$, $E X^2 = \var X + (EX)^2 = 2\beta^2$.`],
  a: [[R`$\bar X_n\to$`, '2'], [R`$\frac1n\sum X_i^2\to$`, '8']],
  s: R`By the LLN, $\bar X_n\xrightarrow{P}\beta = 2$. Applying the LLN to $Y_i = X_i^2$ (iid, $E Y_i = 2\beta^2 = 8<\infty$): $\frac1n\sum X_i^2\xrightarrow{P}8$.` }),
P({ k: 'd', lvl: 1, q: R`$X_i\iid\Exp(\beta = 1)$. To what does the fraction $\frac1n\sum\1(X_i\le1)$ converge?`,
  h: [R`It is an average of iid Bernoulli variables with success probability $P(X_1\le1)$.`], a: '1-exp(-1)',
  s: R`$\1(X_i\le1)\iid\Ber(p)$ with $p = P(X_1\le1) = 1 - e^{-1}\approx0.632$. By the LLN the fraction converges in probability to $p$.` }),
EX('Monte Carlo integration', R`To compute $I = \int_0^1h(x)\dd x$, note $I = E\,h(U)$ for $U\sim\Unif(0,1)$. Simulate $U_1,\dots,U_n$ iid and use $\hat I_n = \frac1n\sum h(U_i)\xrightarrow{P}I$ by the LLN. For an interval $[a,b]$: $\int_a^bh = (b-a)E\,h(U)$ with $U\sim\Unif(a,b)$.`),
P({ k: 'e', lvl: 2, q: R`$U_i\iid\Unif(0,1)$. Limit in probability of $\frac1n\sum e^{U_i}$?`,
  h: [R`$E e^{U} = \int_0^1e^u\dd u$.`], a: 'e-1', s: R`LLN: $\to E e^U = e - 1\approx1.718$.` }),
P({ k: 'f', lvl: 2, q: R`$U_i\iid\Unif(0,2)$. Limit in probability of $\frac2n\sum U_i^3$? (This estimates $\int_0^2x^3\dd x$.)`,
  h: [R`$E U^3 = \frac12\int_0^2u^3\dd u$.`], a: '4',
  s: R`$E U^3 = \frac12\cdot\frac{16}{4} = 2$, so $\frac2n\sum U_i^3\xrightarrow{P}2\cdot2 = 4 = \int_0^2x^3\dd x$.` }),
H('Combining limits: Theorem 5.5'),
THM('Theorem 5.5 (the parts used with the LLN)', R`If $X_n\xrightarrow{P}a$ and $Y_n\xrightarrow{P}b$, then $X_n + Y_n\xrightarrow{P}a + b$, $X_nY_n\xrightarrow{P}ab$, and $g(X_n)\xrightarrow{P}g(a)$ for any $g$ continuous at $a$ (continuous mapping). Deterministic sequences like $\frac{n}{n-1}\to1$ count as converging in probability. More in topic 5.4.`),
P({ k: 'g', lvl: 2, q: R`$X_i\iid\Pois(3)$. Limit in probability of $\bar X_n^2 + \bar X_n$?`,
  h: [R`LLN gives $\bar X_n\to3$; then $g(x) = x^2 + x$ is continuous.`], a: '12',
  s: R`$\bar X_n\xrightarrow{P}3$ by the LLN; $g(x) = x^2 + x$ is continuous, so by Theorem 5.5 $g(\bar X_n)\xrightarrow{P}9 + 3 = 12$.` }),
P({ k: 'h', lvl: 3, q: R`$X_i$ iid with mean $\mu$ and finite variance $\sigma^2$. Prove that $\hat\sigma_n^2 = \frac1n\sum_{i=1}^n(X_i - \bar X_n)^2\xrightarrow{P}\sigma^2$.`,
  h: [R`Expand: $\frac1n\sum(X_i - \bar X)^2 = \frac1n\sum X_i^2 - \bar X_n^2$.`, R`LLN on each piece, then Theorem 5.5.`],
  s: R`**Algebra.** Using $\sum X_i = n\bar X_n$:
$$\hat\sigma_n^2 = \frac1n\sum X_i^2 - 2\bar X_n\cdot\frac1n\sum X_i + \bar X_n^2 = \frac1n\sum X_i^2 - \bar X_n^2.$$
**LLN.** $E X_1^2 = \sigma^2 + \mu^2<\infty$, so $\frac1n\sum X_i^2\xrightarrow{P}\sigma^2 + \mu^2$; also $\bar X_n\xrightarrow{P}\mu$.
**Theorem 5.5.** $x\mapsto x^2$ is continuous, so $\bar X_n^2\xrightarrow{P}\mu^2$, and the difference converges: $\hat\sigma_n^2\xrightarrow{P}\sigma^2 + \mu^2 - \mu^2 = \sigma^2$. $\blacksquare$

The unbiased $S_n^2 = \frac{n}{n-1}\hat\sigma_n^2$ converges to the same limit because $\frac{n}{n-1}\to1$ (HW7 A1).`, src: 'variant of HW7 A1(b)' }),
P({ k: 'i', lvl: 3, q: R`$X_i\iid\Exp(\beta = 3)$. Limit in probability of $\dfrac{\sum X_i^2}{\sum X_i}$?`,
  h: [R`Divide top and bottom by $n$.`, R`Ratio of limits, valid since the denominator's limit is not 0.`], a: '6',
  s: R`$\frac{\sum X_i^2}{\sum X_i} = \frac{\frac1n\sum X_i^2}{\bar X_n}$. By the LLN the numerator $\to E X^2 = 2\beta^2 = 18$ and the denominator $\to\beta = 3\ne0$. $g(u,v) = u/v$ is continuous at $(18,3)$, so the ratio $\xrightarrow{P}6 = 2\beta$.` }),
P({ k: 'j', lvl: 3, q: R`$X_i\iid\Unif(0,1)$. Let $T_n = \binom n2^{-1}\sum_{i<j}\frac{(X_i - X_j)^2}{2}$. Find the limit in probability of $T_n$.`,
  h: [R`Expand $\sum_{i<j}(X_i - X_j)^2$ in terms of $\sum X_i^2$ and $(\sum X_i)^2$.`, R`$\sum_{i<j}(X_i - X_j)^2 = n\sum X_i^2 - (\sum X_i)^2$.`],
  a: '1/12',
  s: R`Over all ordered pairs, $\sum_{i,j}(X_i - X_j)^2 = 2n\sum X_i^2 - 2(\sum X_i)^2$, and each unordered pair appears twice, so $\sum_{i<j}(X_i - X_j)^2 = n\sum X_i^2 - (\sum X_i)^2$. Dividing by $2\binom n2 = n(n-1)$:
$$T_n = \frac{n\sum X_i^2 - n^2\bar X_n^2}{n(n-1)} = \frac{n}{n-1}\Big(\frac1n\sum X_i^2 - \bar X_n^2\Big) = S_n^2.$$
By the LLN and Theorem 5.5, $T_n\xrightarrow{P}E X^2 - (EX)^2 = \sigma^2 = \frac1{12}$ for $\Unif(0,1)$.`, src: 'like HW7 C3' }),
WARN('What the LLN does not say', R`<ul><li>It is about the **average**, not the sum. $\sum X_i - n\mu$ has variance $n\sigma^2$, which grows: the count of heads drifts further from $n/2$ in absolute terms, even though the fraction gets closer to $\frac12$.</li><li>It needs a finite mean. For iid Cauchy, $\bar X_n$ is again standard Cauchy for **every** $n$, so it never settles.</li><li>It gives no rate. How close, with what probability, is the job of Chebyshev, Hoeffding and the CLT.</li><li>It does not mean "the coin compensates" after a run of heads (gambler's fallacy): the flips stay independent.</li></ul>`),
P({ k: 'k', lvl: 2, q: R`$X_i\iid$ standard Cauchy. Then $\bar X_n$ is standard Cauchy. Compute $P(|\bar X_n|>1)$ for any $n$. Does $\bar X_n\xrightarrow{P}0$?`,
  h: [R`Cauchy CDF: $\frac12 + \frac1\pi\arctan x$, and $\arctan1 = \pi/4$.`],
  a: [[R`$P(|\bar X_n|>1)$`, '0.5'], [R`$\bar X_n\xrightarrow{P}0$?`, { choice: ['Yes', 'No'], v: 1 }]],
  s: R`$P(|\bar X_n|>1) = 2\big(1 - (\frac12 + \frac1\pi\cdot\frac\pi4)\big) = 2\cdot\frac14 = 0.5$ for every $n$. It does not go to 0: no convergence. The LLN does not apply since $E|X_1| = \infty$.` }),
P({ k: 'l', lvl: 2, q: R`Toss a fair coin $n = 10\,000$ times. What is the standard deviation of the number of heads? Of the fraction of heads?`,
  h: [R`Number of heads $\sim\Bin(n, \frac12)$.`],
  a: [[R`sd of count`, '50'], [R`sd of fraction`, '0.005']],
  s: R`$\var(\text{count}) = n\cdot\frac14 = 2500$, sd $= 50$: the count typically misses $5000$ by tens. The fraction has sd $\frac{50}{10000} = 0.005$, which shrinks with $n$: that is the LLN.` }),
P({ k: 'm', lvl: 4, q: R`$X_1,\dots,X_n\iid\Unif(0,\theta)$, $\theta>0$ unknown.
(a) Show that $2\bar X_n\xrightarrow{P}\theta$.
(b) Find the limit in probability of $\frac1n\sum X_i^2$ when $\theta = 4$.
(c) Show that $\tilde\theta_n = \big(\frac3n\sum X_i^2\big)^{1/2}\xrightarrow{P}\theta$; enter its limit when $\theta = 4$.`,
  h: [R`$E X = \theta/2$, $E X^2 = \theta^2/3$.`, R`$\sqrt{\cdot}$ is continuous on $[0,\infty)$.`],
  a: [[R`(b)`, '16/3'], [R`(c)`, '4']],
  s: R`(a) $E|X_1| = \theta/2<\infty$, so by the WLLN $\bar X_n\xrightarrow{P}\theta/2$; multiplying by the constant 2 (Theorem 5.5), $2\bar X_n\xrightarrow{P}\theta$.
(b) $Y_i = X_i^2$ are iid with $E Y_1 = \frac1\theta\int_0^\theta x^2\dd x = \frac{\theta^2}3$. LLN: $\frac1n\sum X_i^2\xrightarrow{P}\frac{\theta^2}3 = \frac{16}3$.
(c) $\frac3n\sum X_i^2\xrightarrow{P}\theta^2$ and $g(x) = \sqrt x$ is continuous, so $\tilde\theta_n\xrightarrow{P}\sqrt{\theta^2} = \theta = 4$ by the continuous mapping theorem. (Both are *consistent* estimators of $\theta$: see Chapter 6.)` }),
]);

DRILLS('5.2', [
  { k: '01', lvl: 1, q: R`$X_i\iid\Ber(0.3)$. Limit in probability of $\bar X_n$?`, h: [R`The mean of $\Ber(p)$ is $p$.`], a: '0.3', s: R`WLLN: $\bar X_n\xrightarrow{P}E X_1 = 0.3$.` },
  { k: '02', lvl: 1, q: R`iid with $\sigma^2 = 1$. Chebyshev bound for $P(|\bar X_n - \mu|>0.1)$ at $n = 400$?`, h: [R`$\frac{\sigma^2}{n\varepsilon^2}$.`], a: '0.25', s: R`$\frac{1}{400\cdot0.01} = 0.25$.` },
  { k: '03', lvl: 2, q: R`$X_i\iid N(2, 5)$. Limit in probability of $\frac1n\sum X_i^2$?`, h: [R`$E X^2 = \sigma^2 + \mu^2$.`], a: '9', s: R`$5 + 4 = 9$, by the LLN applied to $X_i^2$.` },
  { k: '04', lvl: 2, q: R`$X_i\iid\Pois(4)$. Limit in probability of $\frac1n\sum X_i(X_i - 1)$?`, h: [R`$E[X(X-1)] = \lambda^2$ for Poisson.`], a: '16', s: R`$E[X(X-1)] = E X^2 - E X = (\lambda + \lambda^2) - \lambda = \lambda^2 = 16$.` },
  { k: '05', lvl: 2, q: R`iid with $\sigma^2 = 2$. Smallest $n$ such that Chebyshev guarantees $P(|\bar X_n - \mu|>0.1)\le0.01$?`, h: [R`$\frac{2}{0.01n}\le0.01$.`], a: '20000', s: R`$\frac{200}{n}\le0.01\iff n\ge20\,000$.` },
  { k: '06', lvl: 2, q: R`$U_i\iid\Unif(0,1)$. Limit in probability of $\frac1n\sum\sqrt{U_i}$?`, h: [R`$\int_0^1\sqrt u\dd u$.`], a: '2/3', s: R`Monte Carlo: $\to E\sqrt U = \frac23$.` },
  { k: '07', lvl: 2, q: R`$X_i\iid\Exp(\beta = 2)$. Limit in probability of $1/\bar X_n$?`, h: [R`Continuous mapping with $g(x) = 1/x$, continuous at $2$.`], a: '1/2', s: R`$\bar X_n\xrightarrow{P}2$ and $g(x) = 1/x$ is continuous at $2\ne0$, so $1/\bar X_n\xrightarrow{P}\frac12$ (the rate $\lambda$).` },
  { k: '08', lvl: 2, q: R`$U_i\iid\Unif(0,1)$. Find the limits in probability of $\frac1n\sum\log U_i$ and of the geometric mean $(\prod U_i)^{1/n}$.`, h: [R`$E\log U = \int_0^1\log u\dd u = -1$.`, R`$(\prod U_i)^{1/n} = \exp(\frac1n\sum\log U_i)$.`],
    a: [[R`$\frac1n\sum\log U_i$`, '-1'], [R`geometric mean`, 'exp(-1)']], s: R`LLN: $\frac1n\sum\log U_i\xrightarrow{P}-1$. Then $\exp$ is continuous: $(\prod U_i)^{1/n}\xrightarrow{P}e^{-1}\approx0.368$, smaller than the arithmetic mean's limit $\frac12$ (AM–GM / Jensen).` },
  { k: '09', lvl: 3, q: R`$X_i\iid\Gam(\alpha = 2, \beta = 3)$. Limit in probability of $\dfrac{\bar X_n^2}{\frac1n\sum X_i^2 - \bar X_n^2}$?`, h: [R`$E X = \alpha\beta$, $\var X = \alpha\beta^2$.`, R`Numerator $\to(\alpha\beta)^2$, denominator $\to\alpha\beta^2$.`], a: '2',
    s: R`By the LLN and Theorem 5.5: $\bar X_n^2\to(\alpha\beta)^2 = 36$ and $\frac1n\sum X_i^2 - \bar X_n^2\to\var X = \alpha\beta^2 = 18\ne0$. The ratio $\to\frac{36}{18} = 2 = \alpha$. (This is the method-of-moments estimator of $\alpha$.)` },
  { k: '10', lvl: 3, q: R`$X_i\iid N(0,1)$. Limit in probability of the fraction of observations above 1? ($\Phi(1)\approx0.8413$.)`, h: [R`Average of iid indicators.`], a: '0.1587', s: R`$\frac1n\sum\1(X_i>1)\xrightarrow{P}P(X_1>1) = 1 - \Phi(1)\approx0.1587$.` },
  { k: '11', lvl: 3, q: R`$X_i\iid\Unif(0,6)$ with known mean $\mu = 3$. Find the limit in probability of $\frac1n\sum(X_i - 3)^2$, and justify.`, h: [R`$Y_i = (X_i - 3)^2$ are iid; no $\bar X_n$ is involved.`], a: '3',
    s: R`$Y_i = (X_i - \mu)^2$ are iid with $E Y_1 = \var X_1 = \frac{6^2}{12} = 3<\infty$. By the WLLN, $\frac1n\sum Y_i\xrightarrow{P}3$.` },
  { k: '12', lvl: 4, q: R`$X_1,\dots,X_{2n}\iid\Exp(\beta = 2)$. Let $W_n = \frac1n\sum_{i=1}^nX_{2i-1}X_{2i}$ (products of disjoint pairs).
(a) Find the limit in probability of $W_n$.
(b) Compute $\var(X_1X_2)$.
(c) Chebyshev bound for $P(|W_n - 4|>1)$ at $n = 480$.`,
    h: [R`The pairs are disjoint, so $Y_i = X_{2i-1}X_{2i}$ are iid.`, R`$E(Y_i) = (EX)^2$ and $E(Y_i^2) = (EX^2)^2$ by independence; $E X^2 = 2\beta^2 = 8$.`],
    a: [[R`(a)`, '4'], [R`(b)`, '48'], [R`(c)`, '0.1']],
    s: R`(a) $Y_i = X_{2i-1}X_{2i}$ use disjoint pairs, so they are iid, with $E Y_i = E X_1\,E X_2 = 4$ by independence. WLLN: $W_n\xrightarrow{P}4$.
(b) $E Y_i^2 = E X_1^2\,E X_2^2 = 8\cdot8 = 64$, so $\var Y_i = 64 - 16 = 48$.
(c) $\var W_n = \frac{48}{n}$; Chebyshev: $P(|W_n - 4|>1)\le\frac{48}{n} = 0.1$ at $n = 480$.` },
  { k: '13', lvl: 4, q: R`$X_i\iid\Pois(\lambda)$ with $\lambda = 4$, and $S_n^2$ the sample variance.
(a) Limit in probability of $S_n^2$?
(b) Limit in probability of $\bar X_n/S_n^2$?
(c) Justify (b) carefully.`,
    h: [R`$S_n^2 = \frac n{n-1}\big(\frac1n\sum X_i^2 - \bar X_n^2\big)$.`, R`For a Poisson, mean = variance.`],
    a: [[R`(a)`, '4'], [R`(b)`, '1']],
    s: R`(a) By the LLN, $\frac1n\sum X_i^2\xrightarrow{P}\lambda + \lambda^2$ and $\bar X_n\xrightarrow{P}\lambda$; by Theorem 5.5 (square, difference, and the deterministic factor $\frac n{n-1}\to1$), $S_n^2\xrightarrow{P}\lambda = 4$.
(b)–(c) $g(u, v) = u/v$ is continuous at $(\lambda, \lambda)$ since $\lambda\ne0$, so $\bar X_n/S_n^2\xrightarrow{P}\lambda/\lambda = 1$ (Theorem 5.5). A value far from 1 in real data suggests the data are not Poisson.` },
  { k: '14', lvl: 1, q: R`Does the WLLN apply to iid standard Cauchy variables?`, h: [R`Check $E|X_1|$.`], a: { choice: ['Yes', 'No'], v: 1 }, s: R`No: $E|X_1| = \infty$, so the mean does not exist and $\bar X_n$ stays standard Cauchy for every $n$.` },
]);
