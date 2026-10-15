TOPIC({ id: '3.3', ch: 3, title: 'Variance', summary: 'var = E(X²) − E(X)², var(aX+b) = a²var(X), variance of sums of independent variables.' }, [
R`The mean tells you *where* a distribution is centered. The **variance** tells you how **spread out** it is: the average squared distance from the mean. A big variance means values often land far from $\mu$; a variance of $0$ means $X$ is a constant.`,
DEF('Variance and standard deviation', R`With $\mu = E(X)$,
$$\operatorname{var}(X) = \sigma^2 = E\big[(X-\mu)^2\big] = \int(x-\mu)^2\dd F_X(x),\qquad \operatorname{sd}(X) = \sqrt{\operatorname{var}(X)}.$$
The standard deviation has the same units as $X$. The variance is in squared units.`),
THM('Properties of the variance', R`Assuming the variance is finite:
<ol><li>$\operatorname{var}(X) = E(X^2) - E(X)^2$ ("second moment minus first moment squared").</li><li>$\operatorname{var}(aX+b) = a^2\operatorname{var}(X)$. Shifting does nothing; scaling by $a$ multiplies the variance by $a^2$.</li><li>If $X_1,\dots,X_n$ are <b>independent</b>: $\operatorname{var}\left(\sum a_iX_i\right) = \sum a_i^2\operatorname{var}(X_i)$.</li></ol>`),
R`*Proof of 1:* $E[(X-\mu)^2] = E[X^2 - 2\mu X + \mu^2] = E(X^2) - 2\mu E(X) + \mu^2 = E(X^2) - \mu^2$, by linearity.

*Proof of 2:* $aX+b$ has mean $a\mu+b$, so $\operatorname{var}(aX+b) = E[(aX + b - a\mu - b)^2] = a^2E[(X-\mu)^2]$.

In practice, formula 1 is **almost always** how you compute a variance: find $E(X)$, then find $E(X^2)$ by LOTUS, and subtract.`,
P({ k: 'a', lvl: 1, q: R`$X\sim\operatorname{Ber}(0.3)$. Find $\operatorname{var}(X)$.`, h: [R`$E(X) = E(X^2) = p$ because $X^2 = X$.`], a: '0.21',
  s: R`$E(X^2) - E(X)^2 = p - p^2 = p(1-p) = 0.3\cdot0.7 = 0.21$. ($p(1-p)$ is largest at $p = \tfrac12$, where a coin is most uncertain.)` }),
P({ k: 'b', lvl: 1, q: R`$X\sim\operatorname{Unif}(0,1)$. Find $\operatorname{var}(X)$.`, h: [R`$E(X) = \tfrac12$, $E(X^2) = \tfrac13$.`], a: '1/12',
  s: R`$\tfrac13 - \tfrac14 = \tfrac1{12}$. In general $\operatorname{Unif}(a,b)$ has variance $\frac{(b-a)^2}{12}$.` }),
P({ k: 'c', lvl: 2, q: R`$X$ has density $2x$ on $(0,1)$. Find $\operatorname{var}(X)$.`, h: [R`$E(X) = \tfrac23$, $E(X^2) = \int_0^12x^3\dd x$.`], a: '1/18',
  s: R`$E(X^2) = \tfrac12$, so $\operatorname{var}(X) = \tfrac12 - \tfrac49 = \tfrac1{18}$.` }),
P({ k: 'd', lvl: 1, q: R`$\operatorname{var}(X) = 4$. Find $\operatorname{var}(3X - 2)$ and $\operatorname{sd}(3X-2)$.`, h: [R`$a^2\operatorname{var}(X)$.`], a: [['variance', '36'], ['sd', '6']],
  s: R`$\operatorname{var}(3X-2) = 9\cdot4 = 36$ and $\operatorname{sd} = 6 = |3|\cdot\operatorname{sd}(X)$.` }),
WARN('Variance of a difference', R`For **independent** $X, Y$: $\operatorname{var}(X - Y) = \operatorname{var}(X) + (-1)^2\operatorname{var}(Y) = \operatorname{var}(X)+\operatorname{var}(Y)$. Variances **add** even when you subtract the variables. Subtracting does not cancel the noise; it combines it.`),
P({ k: 'e', lvl: 1, q: R`$X\indep Y$ with $\operatorname{var}(X) = 2$, $\operatorname{var}(Y) = 3$. Find $\operatorname{var}(X - Y)$.`, h: [R`See the warning above.`], a: '5', s: R`$2 + 3 = 5$.` }),
EX('Binomial variance', R`$X = \sum_{i=1}^nX_i$ with $X_i\iid\operatorname{Ber}(p)$. By independence, $\operatorname{var}(X) = \sum\operatorname{var}(X_i) = np(1-p)$.`),
P({ k: 'f', lvl: 1, q: R`$X\sim\operatorname{Bin}(10, 0.2)$. Find $\operatorname{var}(X)$.`, h: [R`$np(1-p)$.`], a: '1.6', s: R`$10\cdot0.2\cdot0.8 = 1.6$.` }),
P({ k: 'g', lvl: 3, q: R`$X\sim\operatorname{Poisson}(\lambda)$. (a) Show $E[X(X-1)] = \lambda^2$. (b) Deduce $\operatorname{var}(X)$. Enter $\operatorname{var}(X)$ as an expression in $\lambda$.`,
  h: [R`$E[X(X-1)] = \sum_{x\ge2}x(x-1)\frac{e^{-\lambda}\lambda^x}{x!} = \lambda^2\sum_{x\ge2}\frac{e^{-\lambda}\lambda^{x-2}}{(x-2)!}$.`, R`$E(X^2) = E[X(X-1)] + E(X)$.`],
  a: [[R`$\operatorname{var}(X)$`, 'lambda', { lambda: [0.5, 5] }]],
  s: R`(a) The terms $x = 0,1$ vanish. Re-index with $y = x-2$:
$$E[X(X-1)] = \lambda^2\sum_{y\ge0}\frac{e^{-\lambda}\lambda^y}{y!} = \lambda^2.$$
(b) $E(X^2) = E[X(X-1)] + E(X) = \lambda^2+\lambda$, so $\operatorname{var}(X) = \lambda^2 + \lambda - \lambda^2 = \lambda$. A Poisson's mean and variance are equal.

**Why $X(X-1)$?** The factorial moment cancels with the $x!$ in the PMF. That makes it the natural moment for discrete distributions.`,
  src: 'HW4 B1' }),
P({ k: 'h', lvl: 2, q: R`$X\sim\operatorname{Exp}(\beta)$. Using $E(X^2) = 2\beta^2$, find $\operatorname{var}(X)$ for $\beta = 3$.`, h: [R`$2\beta^2 - \beta^2$.`], a: '9',
  s: R`$\operatorname{var}(X) = 2\beta^2 - \beta^2 = \beta^2 = 9$.` }),
P({ k: 'i', lvl: 3, q: R`$X\sim N(0,1)$ and $Y = e^{2X+1}$ (so $E(Y) = e^3$). Find $\operatorname{var}(Y)$.`,
  h: [R`$Y^2 = e^{4X+2}$. Use $E(e^{tX}) = e^{t^2/2}$ for $X\sim N(0,1)$.`],
  a: 'e^10-e^6',
  s: R`$E(Y^2) = E(e^{4X+2}) = e^2E(e^{4X}) = e^2e^{16/2} = e^{10}$. So $\operatorname{var}(Y) = e^{10} - (e^3)^2 = e^{10}-e^6$.`, src: 'HW4 A3' }),
P({ k: 'j', lvl: 3, q: R`Show $E[(X-\alpha)^2] = \operatorname{var}(X) + (\alpha - E(X))^2$ and hence that $\alpha = E(X)$ minimizes it. For $X\sim\operatorname{Unif}(0,4)$, find $\min_\alpha E[(X-\alpha)^2]$.`,
  h: [R`Add and subtract $\mu$: $X - \alpha = (X-\mu) + (\mu-\alpha)$.`],
  a: '4/3',
  s: R`$E[(X-\alpha)^2] = E[(X-\mu)^2] + 2(\mu-\alpha)E(X-\mu) + (\mu-\alpha)^2 = \operatorname{var}(X) + (\mu-\alpha)^2$, since $E(X-\mu) = 0$. This is smallest when $\alpha = \mu$, and the minimum is $\operatorname{var}(X) = \frac{4^2}{12} = \frac43$.

The mean is the best constant predictor under squared error.`, src: 'HW4 C1' }),
]);

DRILLS('3.3', [
  { k: '01', lvl: 1, q: R`$X\sim\operatorname{Unif}(2,8)$. Find $\operatorname{var}(X)$.`, h: [R`$(b-a)^2/12$.`], a: '3', s: R`$36/12 = 3$.` },
  { k: '02', lvl: 1, q: R`$P(X=-1) = 0.2$, $P(X=0) = 0.5$, $P(X=2) = 0.3$. Find $\operatorname{var}(X)$.`, h: [R`$E(X) = 0.4$, $E(X^2) = 1.4$.`], a: '1.24', s: R`$1.4 - 0.16 = 1.24$.` },
  { k: '03', lvl: 2, q: R`$f(x) = 3x^2$ on $(0,1)$. Find $\operatorname{var}(X)$.`, h: [R`$E(X) = \tfrac34$, $E(X^2) = \tfrac35$.`], a: '3/80', s: R`$\tfrac35 - \tfrac9{16} = \tfrac{48-45}{80} = \tfrac3{80}$.` },
  { k: '04', lvl: 1, q: R`$\operatorname{sd}(X) = 3$. Find $\operatorname{var}(2X+5)$.`, h: [R`$4\cdot9$.`], a: '36', s: R`$2^2\cdot3^2 = 36$.` },
  { k: '05', lvl: 1, q: R`$X\sim\operatorname{Bin}(20,0.5)$. Find $\operatorname{sd}(X)$.`, h: [R`$\sqrt{np(1-p)}$.`], a: 'sqrt(5)', s: R`$\sqrt{20\cdot\tfrac14} = \sqrt5\approx2.236$.` },
  { k: '06', lvl: 2, q: R`$X\indep Y$, $\operatorname{var}(X) = 1$, $\operatorname{var}(Y) = 4$. Find $\operatorname{var}(2X - 3Y + 1)$.`, h: [R`$4\cdot1 + 9\cdot4$.`], a: '40', s: R`$4 + 36 = 40$.` },
  { k: '07', lvl: 2, q: R`$X\sim\operatorname{Geom}(\tfrac12)$ (support $\{1,2,\dots\}$). Find $\operatorname{var}(X)$.`, h: [R`$\operatorname{var} = \frac{1-p}{p^2}$.`], a: '2', s: R`$\frac{1/2}{1/4} = 2$.` },
  { k: '08', lvl: 1, q: R`$X\sim\operatorname{Exp}(\beta = 4)$. Find $\operatorname{var}(X)$.`, h: [R`$\beta^2$.`], a: '16', s: R`$\beta^2 = 16$ (and $\operatorname{sd} = 4$ = the mean).` },
  { k: '09', lvl: 1, q: R`$X_1,\dots,X_{10}$ iid with variance 2. Find $\operatorname{var}(\sum X_i)$ and $\operatorname{var}(\bar X)$.`, h: [R`Independence; $\bar X = \frac1n\sum X_i$.`],
    a: [[R`$\operatorname{var}(\sum X_i)$`, '20'], [R`$\operatorname{var}(\bar X)$`, '0.2']], s: R`$10\cdot2 = 20$, and $\operatorname{var}(\bar X) = \frac{20}{100} = 0.2 = \sigma^2/n$.` },
  { k: '10', lvl: 2, q: R`Random walk: steps $+2$ w.p. $p$, $-1$ w.p. $1-p$, independent. Find $\operatorname{var}(X_n)$ for $n = 4$, $p = \tfrac12$.`, h: [R`One step: $E(Z) = 3p-1$, $E(Z^2) = 4p + (1-p)$.`], a: '9',
    s: R`$\operatorname{var}(Z) = 1 + 3p - (3p-1)^2 = 9p - 9p^2 = 9p(1-p)$. So $\operatorname{var}(X_n) = 9np(1-p) = 9\cdot4\cdot\tfrac14 = 9$.`, src: 'HW4 A1' },
  { k: '11', lvl: 2, q: R`$E(X) = 0$, $E(X^2) = 1$, $E(X^3) = 0$, $E(X^4) = 3$, and $Y = X^2 - 1$. Find $E(Y)$ and $\operatorname{var}(Y)$.`, h: [R`$E(Y^2) = E(X^4) - 2E(X^2) + 1$.`],
    a: [['$E(Y)$', '0'], [R`$\operatorname{var}(Y)$`, '2']], s: R`$E(Y) = 1 - 1 = 0$. $E(Y^2) = 3 - 2 + 1 = 2$, so $\operatorname{var}(Y) = 2$.`, src: 'HW4 B3(a)' },
  { k: '12', lvl: 2, q: R`$X,Y\iid\operatorname{Unif}(0,1)$, $M = \max(X,Y)$. Find $\operatorname{var}(M)$.`, h: [R`$f_M(m) = 2m$.`], a: '1/18', s: R`$E(M) = \tfrac23$, $E(M^2) = \int_0^12m^3\dd m = \tfrac12$, so $\operatorname{var}(M) = \tfrac12 - \tfrac49 = \tfrac1{18}$.` },
  { k: '13', lvl: 3, q: R`With probability $\tfrac12$, $X = 0$; otherwise $X\sim\operatorname{Unif}(0,2)$. Find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`$E(X^k) = \tfrac12\cdot0 + \tfrac12E(U^k)$ with $U\sim\operatorname{Unif}(0,2)$.`],
    a: [['$E(X)$', '1/2'], [R`$\operatorname{var}(X)$`, '5/12']], s: R`$E(X) = \tfrac12\cdot1 = \tfrac12$, $E(X^2) = \tfrac12\cdot\tfrac43 = \tfrac23$, so $\operatorname{var}(X) = \tfrac23-\tfrac14 = \tfrac5{12}$.` },
  { k: '14', lvl: 1, q: R`$X\sim\operatorname{Gamma}(4,\tfrac12)$. Find $\operatorname{var}(X)$.`, h: [R`$\alpha\beta^2$.`], a: '1', s: R`$4\cdot\tfrac14 = 1$.` },
  { k: '15', lvl: 3, q: R`$F(x) = 2x^2$ on $[0,\tfrac12)$, $1-2(1-x)^2$ on $[\tfrac12,\tfrac34)$, and $1$ for $x\ge\tfrac34$. This $X$ has a point mass at $\tfrac34$. Find that point mass and $E(X)$.`,
    h: [R`Jump at $\tfrac34$: $1 - F(\tfrac34^-) = 1 - (1 - 2\cdot\tfrac1{16})$.`, R`$E(X) = \int_0^{1/2}x\cdot4x\dd x + \int_{1/2}^{3/4}x\cdot4(1-x)\dd x + \tfrac34\cdot\tfrac18$.`],
    a: [['$P(X = 3/4)$', '1/8'], ['$E(X)$', '47/96']],
    s: R`Density $4x$ on $(0,\tfrac12)$, $4(1-x)$ on $(\tfrac12,\tfrac34)$, plus a jump of $\tfrac18$ at $\tfrac34$.
$E(X) = \tfrac16 + \tfrac{11}{48} + \tfrac{3}{32} = \tfrac{16+22+9}{96} = \tfrac{47}{96}$.`, src: 'HW4 C2' },
]);
