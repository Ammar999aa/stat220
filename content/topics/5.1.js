TOPIC({ id: '5.1', ch: 5, title: 'Types of convergence', summary: 'Convergence in probability, in distribution, in quadratic mean and almost surely; how they relate and the standard counterexamples.' }, [
R`For a sequence of **numbers**, $x_n\to x$ means $|x_n - x|$ eventually gets (and stays) as small as you like. For example, $x_n = 1/n\to0$.

For a sequence of **random variables** $X_1, X_2, \dots$ there is no single meaning: $X_n$ is a whole distribution, not a number. Chapter 5 defines four ways for $X_n$ to "approach" a random variable $X$ (often a constant). Throughout, $F_n$ is the CDF of $X_n$ and $F$ is the CDF of $X$.`,
DEF('Convergence in probability', R`$X_n\xrightarrow{P}X$ if for **every** $\varepsilon>0$,
$$P\big(|X_n - X|>\varepsilon\big)\longrightarrow0\quad\text{as } n\to\infty.$$
In words: the chance that $X_n$ is more than $\varepsilon$ away from $X$ dies out.`),
P({ k: 'a', lvl: 1, q: R`$X_n\sim\Ber(1/n)$. Compute $P(|X_n - 0|>0.5)$ for $n = 50$. Does $X_n\xrightarrow{P}0$?`,
  h: [R`$|X_n|>0.5$ happens exactly when $X_n = 1$.`],
  a: [[R`$P(|X_n|>0.5)$ at $n=50$`, '0.02'], [R`$X_n\xrightarrow{P}0$?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$X_n$ only takes the values 0 and 1, so for $0<\varepsilon<1$: $P(|X_n|>\varepsilon) = P(X_n = 1) = \frac1n$. At $n = 50$ this is $0.02$. For $\varepsilon\ge1$ the probability is $0$. In every case $P(|X_n|>\varepsilon)\to0$, so $X_n\xrightarrow{P}0$.`, src: 'original' }),
P({ k: 'b', lvl: 2, q: R`$X_n\sim\Unif(0, 1/n)$. Compute $P(|X_n|>0.05)$ for $n = 10$ and for $n = 30$.`,
  h: [R`For $\varepsilon<1/n$: $P(X_n>\varepsilon) = \frac{1/n - \varepsilon}{1/n} = 1 - n\varepsilon$. For $\varepsilon\ge 1/n$ it is 0.`],
  a: [[R`$n = 10$`, '0.5'], [R`$n = 30$`, '0']],
  s: R`$P(|X_n|>\varepsilon) = \max(0, 1 - n\varepsilon)$. With $\varepsilon = 0.05$: $n = 10$ gives $1 - 0.5 = 0.5$; $n = 30$ gives $\max(0, 1 - 1.5) = 0$. Once $n>1/\varepsilon$ the probability is exactly 0, so $X_n\xrightarrow{P}0$.` }),
P({ k: 'c', lvl: 2, q: R`$X_n\sim N(0, 1/n)$. Use Chebyshev to bound $P(|X_n|>0.5)$ at $n = 100$. Conclude whether $X_n\xrightarrow{P}0$.`,
  h: [R`Chebyshev: $P(|X_n - E X_n|>\varepsilon)\le\frac{\var(X_n)}{\varepsilon^2}$.`],
  a: [[R`bound`, '0.04'], [R`$X_n\xrightarrow{P}0$?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`By Chebyshev, $P(|X_n|>\varepsilon)\le\frac{1/n}{\varepsilon^2} = \frac{1}{n\varepsilon^2}$. At $n = 100$, $\varepsilon = 0.5$: $\frac{1}{25} = 0.04$. Since $\frac1{n\varepsilon^2}\to0$ for every $\varepsilon>0$, $X_n\xrightarrow{P}0$.

This is the standard recipe: **mean → limit and variance → 0 gives convergence in probability** (via Chebyshev).` }),
DEF('Convergence in distribution', R`$X_n\xrightarrow{D}X$ if
$$\lim_{n\to\infty}F_n(x) = F(x)\quad\text{at every } x \text{ where } F \text{ is continuous.}$$
Only the **distributions** matter: $X_n$ and $X$ need not even live on the same probability space.`),
R`Why "at continuity points only"? Take $X_n = \frac1n$ (a constant). Surely $X_n$ should converge to $X = 0$. But $F_n(0) = P(\frac1n\le0) = 0$ for every $n$, while $F(0) = P(0\le0) = 1$. The CDFs disagree at the jump $x = 0$, and that is exactly the point the definition ignores.`,
P({ k: 'd', lvl: 1, q: R`$X_n = 1/n$ with probability 1 and $X = 0$. What is $\lim F_n(0)$? Is $0$ a continuity point of $F$? Does $X_n\xrightarrow{D}X$?`,
  h: [R`$F(x) = \1(x\ge0)$ jumps at 0.`],
  a: [[R`$\lim F_n(0)$`, '0'], [R`$0$ is a continuity point of $F$?`, { choice: ['Yes', 'No'], v: 1 }], [R`$X_n\xrightarrow{D}0$?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$F_n(x) = \1(x\ge1/n)$. At $x = 0$: $F_n(0) = 0\to0\ne F(0) = 1$. But $F = \1(x\ge0)$ jumps at 0, so 0 is not a continuity point and does not count. For $x<0$: $F_n(x) = 0 = F(x)$. For $x>0$: $F_n(x) = 1$ once $n>1/x$, so $F_n(x)\to1 = F(x)$. Hence $X_n\xrightarrow{D}0$.` }),
P({ k: 'e', lvl: 2, q: R`$U_1,\dots,U_n\iid\Unif(0,1)$ and $M_n = \max_iU_i$. Show $n(1 - M_n)\xrightarrow{D}\Exp(1)$ by computing $P(n(1-M_n)>t)$. Enter $\lim_n P(n(1 - M_n)>2)$.`,
  h: [R`$P(n(1-M_n)>t) = P(M_n<1 - t/n)$, and $P(M_n\le x) = x^n$ on $[0,1]$.`, R`$(1 - t/n)^n\to e^{-t}$.`],
  a: 'exp(-2)',
  s: R`For $0<t<n$: $P\big(n(1-M_n)>t\big) = P\big(M_n<1-\tfrac tn\big) = \prod_{i=1}^nP\big(U_i<1-\tfrac tn\big) = \big(1-\tfrac tn\big)^n$ by independence. As $n\to\infty$, $\big(1-\frac tn\big)^n\to e^{-t}$. So $F_n(t)\to1 - e^{-t}$ for every $t>0$ (and $F_n(t) = 0$ for $t\le0$): the limit is the $\Exp(1)$ CDF, which is continuous everywhere. Hence $n(1 - M_n)\xrightarrow{D}\Exp(1)$, and $P(n(1-M_n)>2)\to e^{-2}\approx0.135$.`, src: 'original' }),
P({ k: 'f', lvl: 3, q: R`$Z_1,\dots,Z_n\iid\Unif(0,2)$ and $X_n = n\min\{Z_1,\dots,Z_n\}$. Find the limit distribution of $X_n$ and enter $\lim_n P(X_n>1)$.`,
  h: [R`$P(X_n>x) = P(Z_1>x/n)^n$ by independence.`, R`$P(Z_1>x/n) = 1 - \frac{x}{2n}$.`],
  a: 'exp(-1/2)',
  s: R`For $0<x<2n$, by independence and identical distribution,
$$P(X_n>x) = P\big(Z_1>\tfrac xn,\dots,Z_n>\tfrac xn\big) = \Big(1 - \frac{x}{2n}\Big)^n\longrightarrow e^{-x/2}.$$
So $F_n(x)\to1 - e^{-x/2}$ for all $x>0$: $X_n\xrightarrow{D}\Exp(\beta = 2)$ (mean 2). Then $P(X_n>1)\to e^{-1/2}\approx0.607$.

General pattern (HW7 B2): if the density near 0 is $f(0^+) = \lambda$, then $n\min Z_i\xrightarrow{D}$ exponential with mean $1/\lambda$. Here $\lambda = \frac12$.`, src: 'like HW7 B2' }),
NOTE('Integer-valued variables', R`If $X_n$ and $X$ take values in $\{1,2,\dots\}$, then $X_n\xrightarrow{D}X$ **if and only if** $P(X_n = k)\to P(X = k)$ for every $k$. (Use the non-integer continuity points $k\pm\frac12$: $P(X_n = k) = F_n(k+\frac12) - F_n(k-\frac12)$.) This is how $\Bin(n, \lambda/n)\xrightarrow{D}\Pois(\lambda)$ is proved.`),
P({ k: 'g', lvl: 2, q: R`$X_n\sim\Bin(n, 3/n)$. Find $\lim_n P(X_n = 2)$.`,
  h: [R`Law of small numbers: $np = 3$ fixed, so the limit is $\Pois(3)$.`],
  a: '9/2*exp(-3)',
  s: R`$P(X_n = 2) = \binom n2\big(\frac3n\big)^2\big(1-\frac3n\big)^{n-2} = \frac{n(n-1)}{n^2}\cdot\frac{9}{2}\cdot\big(1-\frac3n\big)^{n-2}\to\frac92e^{-3}\approx0.224$, the $\Pois(3)$ probability. Since the pmfs converge at every $k$, $X_n\xrightarrow{D}\Pois(3)$.` }),
DEF('Convergence in quadratic mean (L²)', R`$X_n\xrightarrow{\text{qm}}X$ if
$$E\big[(X_n - X)^2\big]\longrightarrow0.$$`),
THM('Squared error = variance + squared bias', R`For a constant $b$:
$$E\big[(X_n - b)^2\big] = \var(X_n) + \big(E X_n - b\big)^2.$$
Hence $X_n\xrightarrow{\text{qm}}b$ **iff** $E(X_n)\to b$ and $\var(X_n)\to0$.`),
R`*Proof.* Add and subtract $\mu_n = E X_n$: $(X_n - b)^2 = (X_n - \mu_n)^2 + 2(X_n-\mu_n)(\mu_n - b) + (\mu_n - b)^2$. Take expectations; the cross term vanishes since $E(X_n - \mu_n) = 0$. Both remaining terms are $\ge0$, so the sum tends to 0 iff each does.`,
P({ k: 'h', lvl: 1, q: R`$E(X_n) = 2 + \frac1n$ and $\var(X_n) = \frac1n$. Compute $E[(X_n - 2)^2]$ at $n = 10$.`,
  h: [R`Variance plus squared bias.`],
  a: '0.11',
  s: R`$E(X_n - 2)^2 = \frac1{10} + \big(\frac1{10}\big)^2 = 0.11$. Both terms $\to0$, so $X_n\xrightarrow{\text{qm}}2$.` }),
P({ k: 'i', lvl: 2, q: R`$X_1,\dots,X_n\iid\Exp(\beta = 3)$. Compute $E[(\bar X_n - 3)^2]$ at $n = 90$. Does $\bar X_n\xrightarrow{\text{qm}}3$?`,
  h: [R`$E\bar X_n = \beta$, $\var\bar X_n = \beta^2/n$.`],
  a: [[R`$E(\bar X_n - 3)^2$`, '0.1'], [R`qm convergence?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$\bar X_n$ is unbiased for $3$, so $E(\bar X_n - 3)^2 = \var(\bar X_n) = \frac{9}{n} = 0.1$ at $n = 90$. It tends to 0: yes, $\bar X_n\xrightarrow{\text{qm}}3$.` }),
DEF('Almost sure convergence', R`$X_n\xrightarrow{\text{a.s.}}X$ if $P\big(\{\omega: X_n(\omega)\to X(\omega)\}\big) = 1$: for (almost) every outcome, the **numbers** $X_n(\omega)$ converge. Also called strong convergence. It implies convergence in probability; it is mostly for theory in this course (the strong LLN).`),
H('How the modes relate (Theorem 5.4)'),
THM('Theorem 5.4', R`<ol><li>$X_n\xrightarrow{\text{qm}}X\ \Rightarrow\ X_n\xrightarrow{P}X$.</li><li>$X_n\xrightarrow{P}X\ \Rightarrow\ X_n\xrightarrow{D}X$.</li><li>If $X_n\xrightarrow{D}c$ where $c$ is a **constant** (point mass), then $X_n\xrightarrow{P}c$.</li></ol>
Also a.s. $\Rightarrow$ P. **No other implications hold in general.**`),
R`*Proof of 1.* By Markov applied to $(X_n - X)^2$: $P(|X_n - X|>\varepsilon) = P\big((X_n - X)^2>\varepsilon^2\big)\le\frac{E(X_n - X)^2}{\varepsilon^2}\to0$.`,
WARN('The converses fail', R`<ul><li><b>P but not qm.</b> $X_n = n$ with probability $\frac1n$, else 0. Then $P(|X_n|>\varepsilon)\le\frac1n\to0$, but $E(X_n^2) = n^2\cdot\frac1n = n\to\infty$. A rare but huge value kills the second moment.</li><li><b>D but not P.</b> $X\sim N(0,1)$ and $X_n = -X$ for all $n$. Each $X_n\sim N(0,1)$, so $X_n\xrightarrow{D}X$ trivially, but $|X_n - X| = 2|X|$ never shrinks.</li></ul>`),
P({ k: 'j', lvl: 2, q: R`$X_n = n^2$ with probability $\frac1n$, and $X_n = 0$ otherwise. Compute $P(|X_n|>1)$ at $n = 20$ and $E(X_n^2)$ at $n = 20$. Does $X_n\xrightarrow{\text{qm}}0$?`,
  h: [R`$E(X_n^2) = (n^2)^2\cdot\frac1n$.`],
  a: [[R`$P(|X_n|>1)$`, '0.05'], [R`$E(X_n^2)$`, '8000'], [R`qm to 0?`, { choice: ['Yes', 'No'], v: 1 }]],
  s: R`$P(|X_n|>1) = P(X_n = n^2) = \frac1n = 0.05$, and this $\to0$, so $X_n\xrightarrow{P}0$. But $E(X_n^2) = n^4\cdot\frac1n = n^3 = 8000$ at $n = 20$, and it diverges. So **no** convergence in quadratic mean.`, src: 'like HW7 A3' }),
P({ k: 'k', lvl: 3, q: R`$X\sim N(0,1)$ and $X_n = -X$. Compute $P(|X_n - X|>2)$ (it does not depend on $n$). Does $X_n\xrightarrow{P}X$? Does $X_n\xrightarrow{D}X$?`,
  h: [R`$|X_n - X| = 2|X|$, so the event is $|X|>1$.`, R`$P(|Z|>1) = 2(1 - \Phi(1))$ with $\Phi(1)\approx0.8413$.`],
  a: [[R`$P(|X_n - X|>2)$`, '0.3173'], [R`in probability?`, { choice: ['Yes', 'No'], v: 1 }], [R`in distribution?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$P(|X_n - X|>2) = P(2|X|>2) = P(|X|>1) = 2(1-\Phi(1))\approx0.3173$ for every $n$. It does not tend to 0, so **not** in probability. But $X_n = -X\sim N(0,1)$ by symmetry, so $F_n = F$ for all $n$: trivially $X_n\xrightarrow{D}X$. Convergence in distribution says nothing about $X_n$ and $X$ being close.` }),
P({ k: 'l', lvl: 3, q: R`Prove part 3 of Theorem 5.4: if $X_n\xrightarrow{D}c$ for a constant $c$, then $X_n\xrightarrow{P}c$.`,
  h: [R`The limit CDF is $F(x) = \1(x\ge c)$, continuous everywhere except at $c$.`, R`Split: $P(|X_n - c|>\varepsilon)\le P(X_n\le c-\varepsilon) + P(X_n>c+\varepsilon)$.`],
  s: R`Let $F(x) = \1(x\ge c)$, the CDF of the constant $c$; it is continuous at every $x\ne c$. Fix $\varepsilon>0$. Then
$$P(|X_n - c|>\varepsilon) = P(X_n<c-\varepsilon) + P(X_n>c+\varepsilon)\le F_n(c-\varepsilon) + 1 - F_n(c+\varepsilon).$$
Since $c\pm\varepsilon$ are continuity points of $F$, convergence in distribution gives $F_n(c-\varepsilon)\to F(c-\varepsilon) = 0$ and $F_n(c+\varepsilon)\to F(c+\varepsilon) = 1$. So the right side tends to $0 + 1 - 1 = 0$, i.e. $X_n\xrightarrow{P}c$. $\blacksquare$`, src: 'Wasserman Thm 5.4' }),
P({ k: 'm', lvl: 3, q: R`Let $X\sim\Unif(0,1)$ and $X_n = (1 + \frac1n)X$. Compute $E[(X_n - X)^2]$ at $n = 10$. Which modes of convergence to $X$ hold?`,
  h: [R`$X_n - X = \frac Xn$, and $E(X^2) = \frac13$.`],
  a: [[R`$E(X_n - X)^2$ at $n=10$`, '1/300'], [R`qm?`, { choice: ['Yes', 'No'], v: 0 }], [R`P?`, { choice: ['Yes', 'No'], v: 0 }], [R`D?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$E(X_n - X)^2 = \frac{1}{n^2}E(X^2) = \frac{1}{3n^2} = \frac1{300}$ at $n = 10$, and it $\to0$. So $X_n\xrightarrow{\text{qm}}X$, and by Theorem 5.4 also in probability and in distribution. (Here even $X_n(\omega)\to X(\omega)$ for every $\omega$, so a.s. too.)` }),
]);

DRILLS('5.1', [
  { k: '01', lvl: 1, q: R`$X_n\sim\Ber(1/n^2)$. Compute $P(|X_n|>\frac12)$ at $n = 10$.`, h: [R`Only $X_n = 1$ exceeds $\frac12$.`], a: '0.01', s: R`$P(X_n = 1) = \frac1{n^2} = 0.01$. It tends to 0, so $X_n\xrightarrow{P}0$.` },
  { k: '02', lvl: 1, q: R`$X_n\sim\Unif(0, 1/n)$. Compute $P(X_n>0.1)$ at $n = 5$.`, h: [R`$\frac{1/n - 0.1}{1/n}$.`], a: '0.5', s: R`$1 - n\cdot0.1 = 1 - 0.5 = 0.5$. For $n\ge10$ it is 0.` },
  { k: '03', lvl: 2, q: R`$X_n\sim\Unif(0,1/n)$. Find $\lim_n F_n(0.01)$ and $F_n(0)$. Does $X_n\xrightarrow{D}0$?`, h: [R`Check $x>0$, $x<0$, and remember $x = 0$ is a jump of the limit CDF.`],
    a: [[R`$\lim F_n(0.01)$`, '1'], [R`$F_n(0)$`, '0'], [R`$X_n\xrightarrow{D}0$?`, { choice: ['Yes', 'No'], v: 0 }]],
    s: R`For $n\ge100$, $1/n\le0.01$ so $F_n(0.01) = 1$. $F_n(0) = 0$ for all $n$ while $F(0) = 1$, but $0$ is not a continuity point of $F = \1(x\ge0)$, so it is ignored. For all $x\ne0$, $F_n(x)\to F(x)$: yes, $X_n\xrightarrow{D}0$.` },
  { k: '04', lvl: 2, q: R`$X_n\sim N(\frac1n, \frac1n)$. Compute $E(X_n^2)$ at $n = 10$.`, h: [R`$E(X_n^2) = \var + \text{mean}^2$.`], a: '0.11', s: R`$\frac1{10} + \frac1{100} = 0.11\to0$: $X_n\xrightarrow{\text{qm}}0$.` },
  { k: '05', lvl: 2, q: R`$X_n\sim\Exp(\beta = 1/n)$ (mean $1/n$). Compute $E(X_n^2)$ at $n = 10$. Does $X_n\xrightarrow{\text{qm}}0$?`, h: [R`$E(X^2) = 2\beta^2$ for $\Exp(\beta)$.`], a: [[R`$E(X_n^2)$`, '0.02'], [R`qm?`, { choice: ['Yes', 'No'], v: 0 }]], s: R`$2/n^2 = 0.02\to0$. Yes.` },
  { k: '06', lvl: 2, q: R`$X_n\sim\Bin(n, 2/n)$. Find $\lim_n P(X_n = 0)$.`, h: [R`$(1 - 2/n)^n$.`], a: 'exp(-2)', s: R`$P(X_n = 0) = (1-\frac2n)^n\to e^{-2}$, the $\Pois(2)$ value. Pmf convergence at every $k$ is equivalent to $X_n\xrightarrow{D}\Pois(2)$ for integer-valued variables.` },
  { k: '07', lvl: 2, q: R`$X_n\sim\Geom(1/n)$ (support $\{1,2,\dots\}$). Find $\lim_n P(X_n>2n)$.`, h: [R`$P(X_n>k) = (1-p)^k$ for integer $k$.`], a: 'exp(-2)', s: R`$P(X_n>2n) = (1 - \frac1n)^{2n}\to e^{-2}$. More generally $P(X_n/n>t)\to e^{-t}$: $X_n/n\xrightarrow{D}\Exp(1)$.` },
  { k: '08', lvl: 3, q: R`$X_1,\dots,X_n\iid\Exp(\beta = 1)$ and $M_n = \max X_i$. Find $\lim_n P(M_n - \log n\le0)$.`, h: [R`$P(M_n\le x + \log n) = (1 - e^{-x-\log n})^n = (1 - e^{-x}/n)^n$.`], a: 'exp(-1)',
    s: R`$P(M_n - \log n\le x) = \big(1 - e^{-(x + \log n)}\big)^n = \big(1 - \frac{e^{-x}}n\big)^n\to\exp(-e^{-x})$ (the Gumbel CDF). At $x = 0$: $e^{-1}\approx0.368$.` },
  { k: '09', lvl: 3, q: R`$X_n = n$ with probability $\frac1{n^2}$, else 0. Compute $E(X_n)$ at $n = 10$ and $E(X_n^2)$. Does $X_n\xrightarrow{P}0$? Does $X_n\xrightarrow{\text{qm}}0$?`, h: [R`$E(X_n^2) = n^2\cdot\frac1{n^2}$.`],
    a: [[R`$E(X_n)$ at $n=10$`, '0.1'], [R`$E(X_n^2)$`, '1'], [R`P?`, { choice: ['Yes', 'No'], v: 0 }], [R`qm?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`$E(X_n) = \frac1n = 0.1$. $E(X_n^2) = 1$ for every $n$, which does not tend to 0: **not** qm. But $P(|X_n|>\varepsilon)\le\frac1{n^2}\to0$: in probability. (Note $E X_n\to0$ but $\var X_n = 1 - \frac1{n^2}\not\to0$.)` },
  { k: '10', lvl: 3, q: R`$Z_1,\dots,Z_n\iid\Unif(0,4)$, $X_n = n\min Z_i$. Find $\lim_n P(X_n>2)$.`, h: [R`$P(X_n>x) = (1 - \frac{x}{4n})^n$.`], a: 'exp(-1/2)', s: R`$(1 - \frac{x}{4n})^n\to e^{-x/4}$: $X_n\xrightarrow{D}\Exp(\beta = 4)$. At $x = 2$: $e^{-1/2}\approx0.607$.`, src: 'like HW7 B2' },
  { k: '11', lvl: 4, q: R`Let $X_n = n^{1/4}$ with probability $\frac1n$ and $X_n = 0$ otherwise.
(a) Compute $P(|X_n|>1)$ at $n = 16$.
(b) Compute $E(X_n^2)$ at $n = 16$.
(c) Does $X_n\xrightarrow{\text{qm}}0$? (d) If instead $X_n = n$ with probability $\frac1n$, does $X_n\xrightarrow{\text{qm}}0$?`,
    h: [R`At $n = 16$, $n^{1/4} = 2>1$.`, R`$E(X_n^2) = n^{1/2}\cdot\frac1n = n^{-1/2}$.`],
    a: [[R`(a)`, '1/16'], [R`(b)`, '1/4'], [R`(c)`, { choice: ['Yes', 'No'], v: 0 }], [R`(d)`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`(a) $P(|X_n|>1) = P(X_n = 2) = \frac1{16}$ (for $n>1$, $n^{1/4}>1$), and $\frac1n\to0$: $X_n\xrightarrow{P}0$.
(b) $E(X_n^2) = (n^{1/4})^2\cdot\frac1n = n^{-1/2} = \frac14$ at $n = 16$.
(c) $n^{-1/2}\to0$, so yes, $X_n\xrightarrow{\text{qm}}0$.
(d) $E(X_n^2) = n^2\cdot\frac1n = n\to\infty$: no. The rare value has to grow slower than $\sqrt n$ for qm convergence.` },
  { k: '12', lvl: 4, q: R`Prove: if $X_n\xrightarrow{\text{qm}}X$ and $Y_n\xrightarrow{\text{qm}}Y$, then $X_n + Y_n\xrightarrow{\text{qm}}X + Y$ (Theorem 5.5(b)).`,
    h: [R`$(a + b)^2\le2a^2 + 2b^2$, since $2a^2 + 2b^2 - (a+b)^2 = (a - b)^2\ge0$.`],
    s: R`With $a = X_n - X$ and $b = Y_n - Y$:
$$E\big[(X_n + Y_n - X - Y)^2\big] = E[(a + b)^2]\le2E[(X_n - X)^2] + 2E[(Y_n - Y)^2]\to0,$$
using $(a + b)^2\le2a^2 + 2b^2$ (equivalent to $(a-b)^2\ge0$) and monotonicity of expectation. $\blacksquare$`, src: 'Wasserman Thm 5.5' },
  { k: '13', lvl: 4, q: R`$X\sim\Unif(0,1)$ and $X_n = (1 - \frac1n)X$.
(a) Compute $E[(X_n - X)^2]$ at $n = 5$.
(b) Give $F_n(x)$ for $0\le x\le1 - \frac1n$ and compute $\lim_nF_n(0.5)$.
(c) Which of qm / P / D hold?`,
    h: [R`$X_n - X = -X/n$.`, R`$F_n(x) = P(X\le\frac{x}{1 - 1/n})$.`],
    a: [[R`(a)`, '1/75'], [R`(b) $\lim F_n(0.5)$`, '0.5'], [R`(c) all three hold?`, { choice: ['Yes', 'No'], v: 0 }]],
    s: R`(a) $E(X_n - X)^2 = \frac{E X^2}{n^2} = \frac{1}{3n^2} = \frac1{75}$.
(b) $F_n(x) = \frac{x}{1 - 1/n}$ on $[0, 1 - \frac1n]$ (and 1 above). $F_n(0.5) = \frac{0.5}{1 - 1/n}\to0.5 = F(0.5)$.
(c) qm holds since (a) $\to0$; then P and D follow from Theorem 5.4.` },
  { k: '14', lvl: 2, q: R`$X_n\in\{1,2\}$ with $P(X_n = 1) = \frac12 + \frac1{n+2}$. Find $\lim_nP(X_n = 1)$, and say whether $X_n\xrightarrow{D}X$ where $P(X = 1) = P(X = 2) = \frac12$.`, h: [R`Integer-valued: pmf convergence ⇔ convergence in distribution.`],
    a: [[R`limit`, '1/2'], [R`$X_n\xrightarrow{D}X$?`, { choice: ['Yes', 'No'], v: 0 }]], s: R`$P(X_n = 1)\to\frac12$ and $P(X_n = 2)\to\frac12$: the pmfs converge at every integer, so $X_n\xrightarrow{D}X$.`, src: 'like HW7 B1' },
]);
