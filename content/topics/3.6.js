TOPIC({ id: '3.6', ch: 3, title: 'Conditional expectation and iterated expectations', summary: 'E(X|Y), the tower rule E(X) = E[E(X|Y)], conditional variance, var = E var + var E.' }, [
R`The conditional expectation $E(X\mid Y=y)$ is just the mean of the **conditional distribution** of $X$ given $Y = y$ (topic 2.8). The powerful idea is what happens when you leave $y$ unspecified: $E(X\mid Y)$ becomes a **random variable**, a function of $Y$. Averaging it over $Y$ gives back $E(X)$.

This "condition, then average" strategy is often the *fastest* way to compute a mean or variance in a two-stage (hierarchical) model.`,
DEF('Conditional expectation', R`$$E(X\mid Y=y) = \begin{cases}\sum_x x\,f_{X|Y}(x\,|\,y)\\ \int x\,f_{X|Y}(x\,|\,y)\dd x.\end{cases}$$
Similarly (lazy statistician): $E\big(r(X,Y)\mid Y=y\big) = \int r(x,y)f_{X|Y}(x\,|\,y)\dd x$.

If $E(X\mid Y=y) = g(y)$, then $E(X\mid Y)$ denotes the random variable $g(Y)$.`),
P({ k: 'a', lvl: 1, q: R`Given $X = x$, $Y\sim\operatorname{Unif}(0,x)$. Find $E(Y\mid X = x)$.`, h: [R`Mean of a uniform is the midpoint.`], a: [[R`$E(Y\mid X=x)$`, 'x/2', { x: [0.1, 5] }]],
  s: R`$E(Y\mid X=x) = \frac{0+x}2 = \frac x2$. As a random variable, $E(Y\mid X) = X/2$.` }),
P({ k: 'b', lvl: 1, q: R`Joint PMF $f(0,0) = \tfrac19$, $f(0,1) = \tfrac29$, $f(1,0) = \tfrac29$, $f(1,1) = \tfrac49$. Find $E(X\mid Y=1)$.`, h: [R`$P(X=1\mid Y=1) = \tfrac23$.`], a: '2/3',
  s: R`$E(X\mid Y=1) = 0\cdot\tfrac13 + 1\cdot\tfrac23 = \tfrac23$.` }),
P({ k: 'c', lvl: 2, q: R`$f(x,y) = x+y$ on $[0,1]^2$. Find $E(X\mid Y=y)$.`, h: [R`$f_{X|Y}(x|y) = \frac{x+y}{y+1/2}$.`, R`$\int_0^1x(x+y)\dd x = \tfrac13 + \tfrac y2$.`],
  a: [[R`$E(X\mid Y=y)$`, '(1/3+y/2)/(y+1/2)', { y: [0, 1] }]],
  s: R`$$E(X\mid Y=y) = \int_0^1x\frac{x+y}{y+\frac12}\dd x = \frac{\frac13+\frac y2}{y+\frac12} = \frac{2+3y}{3+6y},\quad 0\le y\le1.$$` }),
H('The tower rule'),
THM('Rule of iterated expectations', R`$$E(X) = E\big[E(X\mid Y)\big].$$
The inner expectation is over $X$ given $Y$; the outer one is over $Y$.

*Proof (continuous):* $E[E(X|Y)] = \int\left(\int xf_{X|Y}(x|y)\dd x\right)f_Y(y)\dd y = \iint x\,f_{X,Y}(x,y)\dd x\dd y = E(X)$.`),
EX('Slides: two strategies', R`$X\sim\operatorname{Unif}(0,1)$ and $Y\mid X=x\sim\operatorname{Unif}(x,1)$. Find $E(Y)$.

*Strategy 1* (the long way): find $f_Y(y) = -\log(1-y)$ (topic 2.8), then integrate $\int_0^1-y\log(1-y)\dd y = \tfrac34$.

*Strategy 2* (tower rule): $E(Y\mid X) = \frac{1+X}{2}$, so $E(Y) = E\left[\frac{1+X}2\right] = \frac{1+\frac12}{2} = \frac34$. Much faster!`),
P({ k: 'd', lvl: 2, q: R`Stick-breaking: $X\sim\operatorname{Unif}(0,1)$, and given $X$, $Y\sim\operatorname{Unif}(0,X)$. Find $E(Y)$.`, h: [R`$E(Y\mid X) = X/2$.`], a: '1/4',
  s: R`$E(Y) = E[E(Y\mid X)] = E(X/2) = \tfrac14$.` }),
P({ k: 'e', lvl: 2, q: R`$N\sim\operatorname{Poisson}(10)$ customers arrive; each buys with probability $0.3$ independently, so $X\mid N\sim\operatorname{Bin}(N,0.3)$. Find $E(X)$.`, h: [R`$E(X\mid N) = 0.3N$.`], a: '3',
  s: R`$E(X) = E(0.3N) = 0.3\cdot10 = 3$.` }),
THM('Taking out what is known', R`$E\big(r(X)s(Y)\mid X\big) = r(X)\,E\big(s(Y)\mid X\big)$, and in particular $E(r(X)\mid X) = r(X)$. Given $X$, anything that depends only on $X$ behaves like a constant.`),
P({ k: 'f', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$, $Y\mid X\sim\operatorname{Unif}(0,X)$. Find $E(XY)$.`, h: [R`$E(XY\mid X) = XE(Y\mid X) = X^2/2$.`], a: '1/6',
  s: R`$E(XY) = E[E(XY\mid X)] = E\left[X\cdot\frac X2\right] = \frac12E(X^2) = \frac16$.`, src: 'HW5 A1 (Wasserman 3.8.16)' }),
H('Conditional variance and the law of total variance'),
DEF('Conditional variance', R`$\operatorname{var}(X\mid Y=y) = E\big[(X - E(X\mid Y=y))^2\,\big|\,Y = y\big] = E(X^2\mid Y=y) - E(X\mid Y=y)^2$.`),
THM('Rule of iterated variance', R`$$\operatorname{var}(X) = E\big[\operatorname{var}(X\mid Y)\big] + \operatorname{var}\big[E(X\mid Y)\big].$$
In words: total variance = average variance *within* groups + variance *between* group means.`),
P({ k: 'g', lvl: 3, q: R`$X\sim\operatorname{Unif}(0,1)$ and $Y\mid X\sim\operatorname{Unif}(X,1)$. Find $\operatorname{var}(Y)$.`,
  h: [R`$E(Y\mid X) = \frac{1+X}{2}$ and $\operatorname{var}(Y\mid X) = \frac{(1-X)^2}{12}$.`, R`$E[(1-X)^2] = \tfrac13$ and $\operatorname{var}\left(\frac{1+X}{2}\right) = \tfrac14\cdot\tfrac1{12}$.`],
  a: '7/144',
  s: R`$E[\operatorname{var}(Y|X)] = \frac1{12}E[(1-X)^2] = \frac1{12}\cdot\frac13 = \frac1{36}$. $\operatorname{var}[E(Y|X)] = \operatorname{var}\left(\frac{1+X}2\right) = \frac14\cdot\frac1{12} = \frac1{48}$.
$$\operatorname{var}(Y) = \frac1{36} + \frac1{48} = \frac{4+3}{144} = \frac{7}{144}.$$`, src: 'Slides Ch.3' }),
P({ k: 'h', lvl: 3, q: R`$N\sim\operatorname{Poisson}(\lambda)$, $X\mid N\sim\operatorname{Bin}(N,p)$. Use the law of total variance to find $\operatorname{var}(X)$; enter it for $\lambda = 10$, $p = 0.3$.`,
  h: [R`$E(X|N) = Np$, $\operatorname{var}(X|N) = Np(1-p)$.`],
  a: '3',
  s: R`$\operatorname{var}(X) = E[Np(1-p)] + \operatorname{var}(Np) = \lambda p(1-p) + p^2\lambda = \lambda p$. Here $10\cdot0.3 = 3$, consistent with $X\sim\operatorname{Poisson}(\lambda p)$.` }),
P({ k: 'i', lvl: 3, q: R`(Random sum.) $N\sim\operatorname{Poisson}(4)$ claims arrive; claim sizes $X_i\iid\operatorname{Exp}(\beta = 2)$, independent of $N$. Total $S = \sum_{i=1}^NX_i$. Find $E(S)$ and $\operatorname{var}(S)$.`,
  h: [R`$E(S\mid N) = N\beta$, $\operatorname{var}(S\mid N) = N\beta^2$.`],
  a: [['$E(S)$', '8'], [R`$\operatorname{var}(S)$`, '32']],
  s: R`$E(S) = E(N\beta) = 4\cdot2 = 8$.
$\operatorname{var}(S) = E(N\beta^2) + \operatorname{var}(N\beta) = 4\cdot4 + 4\cdot4 = 32$.` }),
P({ k: 'j', lvl: 3, q: R`(Gamma–Poisson.) $X\sim\operatorname{Gamma}(\alpha,\beta)$ and $Y\mid X\sim\operatorname{Poisson}(X)$. Find $E(Y)$ and $\operatorname{var}(Y)$ for $\alpha = 2$, $\beta = 3$.`,
  h: [R`$E(Y|X) = \operatorname{var}(Y|X) = X$.`, R`$E(X) = \alpha\beta$, $\operatorname{var}(X) = \alpha\beta^2$.`],
  a: [['$E(Y)$', '6'], [R`$\operatorname{var}(Y)$`, '24']],
  s: R`$E(Y) = E(X) = \alpha\beta = 6$. $\operatorname{var}(Y) = E(X) + \operatorname{var}(X) = \alpha\beta + \alpha\beta^2 = 6 + 18 = 24$. The variance exceeds the mean ("overdispersion"); this $Y$ is negative binomial (HW3 C1).` }),
P({ k: 'k', lvl: 2, q: R`Suppose $E(X\mid Y=y) = c$ for all $y$ (a constant). Are $X$ and $Y$ necessarily uncorrelated?`,
  h: [R`$E(X) = E[E(X|Y)] = c$. And $E(XY) = E[YE(X|Y)] = cE(Y)$.`],
  a: { choice: ['Yes, always uncorrelated', 'Not necessarily'], v: 0 },
  s: R`$E(X) = c$ and $E(XY) = E[E(XY\mid Y)] = E[Y\,E(X\mid Y)] = cE(Y)$. Hence $\operatorname{cov}(X,Y) = cE(Y) - cE(Y) = 0$: uncorrelated. They need not be independent: the conditional *variance* may still depend on $y$.`, src: 'HW5 A2 (Wasserman 3.8.18)' }),
NOTE('Law of total covariance (HW5 B1)', R`$\operatorname{cov}(X,Y) = E\big[\operatorname{cov}(X,Y\mid Z)\big] + \operatorname{cov}\big(E(X|Z), E(Y|Z)\big)$. The proof is the same algebra as for the variance: expand $E(XY) = E[E(XY\mid Z)]$.`),
]);

DRILLS('3.6', [
  { k: '01', lvl: 1, q: R`$X$ is uniform on $\{1,2,3\}$ and $Y\mid X\sim\operatorname{Bin}(X,\tfrac12)$. Find $E(Y)$.`, h: [R`$E(Y|X) = X/2$.`], a: '1', s: R`$E(X)/2 = 2/2 = 1$.` },
  { k: '02', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$ and $Y\mid X\sim\operatorname{Poisson}(X)$. Find $E(Y)$ and $\operatorname{var}(Y)$.`, h: [R`$E(Y|X) = \operatorname{var}(Y|X) = X$.`], a: [['$E(Y)$', '1'], [R`$\operatorname{var}(Y)$`, '2']], s: R`$E(Y) = E(X) = 1$; $\operatorname{var}(Y) = E(X) + \operatorname{var}(X) = 1+1 = 2$.` },
  { k: '03', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,2)$ and $Y\mid X\sim N(X,1)$. Find $E(Y)$ and $\operatorname{var}(Y)$.`, h: [R`$\operatorname{var}(Y) = E(1) + \operatorname{var}(X)$.`], a: [['$E(Y)$', '1'], [R`$\operatorname{var}(Y)$`, '4/3']], s: R`$E(Y) = E(X) = 1$; $\operatorname{var}(Y) = 1 + \frac{4}{12} = \frac43$.` },
  { k: '04', lvl: 2, q: R`$f(x,y) = 2$ on $0<y<x<1$. Find $E(Y\mid X=x)$ and $E(X\mid Y=y)$.`, h: [R`$Y|X=x\sim\operatorname{Unif}(0,x)$; $X|Y=y\sim\operatorname{Unif}(y,1)$.`],
    a: [[R`$E(Y\mid X=x)$`, 'x/2', { x: [0, 1] }], [R`$E(X\mid Y=y)$`, '(1+y)/2', { y: [0, 1] }]], s: R`$E(Y|X=x) = \frac x2$ and $E(X|Y=y) = \frac{1+y}{2}$. (Check: $E[E(Y|X)] = E(X)/2 = \frac13 = E(Y)$ ✓.)` },
  { k: '05', lvl: 2, q: R`$f(x,y) = x+y$ on $[0,1]^2$. Find $E(Y\mid X=0)$.`, h: [R`$f_{Y|X}(y|0) = 2y$.`], a: '2/3', s: R`$\int_0^1y\cdot2y\dd y = \tfrac23$.` },
  { k: '06', lvl: 2, q: R`$N\sim\operatorname{Geom}(\tfrac12)$ (mean 2), and $X_1,X_2,\dots$ iid with mean 3, independent of $N$. Find $E\left(\sum_{i=1}^NX_i\right)$.`, h: [R`$E(S|N) = 3N$.`], a: '6', s: R`$E(S) = 3E(N) = 6$ (Wald's identity).` },
  { k: '07', lvl: 3, q: R`$N\sim\operatorname{Poisson}(2)$ and $X_i\iid\operatorname{Ber}(0.5)$ independent of $N$; $S = \sum_{i=1}^NX_i$. Find $\operatorname{var}(S)$ with the law of total variance.`, h: [R`$E(N)\operatorname{var}(X) + \operatorname{var}(N)E(X)^2$.`], a: '1',
    s: R`$\operatorname{var}(S) = E(N)\cdot0.25 + \operatorname{var}(N)\cdot0.25 = 0.5 + 0.5 = 1$. ($S\sim\operatorname{Poisson}(1)$ by thinning ✓.)` },
  { k: '08', lvl: 3, q: R`$X,Y\iid\operatorname{Exp}(\beta)$. It can be shown that $X\mid X+Y = c\sim\operatorname{Unif}(0,c)$. Find $E(X\mid X+Y=c)$ and $E(X^2\mid X+Y=c)$ for $c = 3$.`, h: [R`Moments of $\operatorname{Unif}(0,c)$.`],
    a: [[R`$E(X\mid X+Y=3)$`, '3/2'], ['second moment', '3']], s: R`$E = c/2 = \tfrac32$, $E(X^2\mid\cdot) = c^2/3 = 3$.`, src: 'HW5 C1(d)' },
  { k: '09', lvl: 1, q: R`$E(X) = 5$. What is $E[E(X\mid Y)]$?`, h: [R`Tower rule.`], a: '5', s: R`$5$.` },
  { k: '10', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$ and $Y\mid X\sim\operatorname{Unif}(0,X^2)$. Find $E(Y)$.`, h: [R`$E(Y|X) = X^2/2$.`], a: '1/6', s: R`$E(X^2)/2 = \frac13\cdot\frac12 = \frac16$.` },
  { k: '11', lvl: 1, q: R`True or false: $\operatorname{var}(X)\ge E[\operatorname{var}(X\mid Y)]$ always.`, h: [R`The other term in the law of total variance is a variance.`], a: { choice: ['True', 'False'], v: 0 },
    s: R`True, since $\operatorname{var}(X) - E[\operatorname{var}(X|Y)] = \operatorname{var}[E(X|Y)]\ge0$. Conditioning reduces variance on average.` },
  { k: '12', lvl: 3, q: R`$Y\sim N(0,4)$ and $X\mid Y\sim N(Y,1)$. Find $\operatorname{var}(X)$ and $\operatorname{cov}(X,Y)$.`, h: [R`$\operatorname{cov}(X,Y) = E(XY) = E[YE(X|Y)] = E(Y^2)$.`],
    a: [[R`$\operatorname{var}(X)$`, '5'], [R`$\operatorname{cov}(X,Y)$`, '4']], s: R`$\operatorname{var}(X) = E(1) + \operatorname{var}(Y) = 5$. $\operatorname{cov}(X,Y) = E(XY) - 0 = E[Y\cdot Y] = 4$.` },
  { k: '13', lvl: 4, q: R`$X\sim\operatorname{Exp}$ with **rate** $\lambda$ and $Y\sim\operatorname{Exp}$ with rate $\mu$, independent, $\lambda>\mu$. One can show $f_{X|X+Y}(x|c)\propto e^{-(\lambda-\mu)x}$ on $(0,c)$. Find $E[X\mid X+Y=c]$ for $\lambda = 2$, $\mu = 1$, $c = 1$.`,
    h: [R`With $a = \lambda-\mu$: $E = \frac{\int_0^cxae^{-ax}\dd x}{1-e^{-ac}}$.`, R`$\int_0^c xae^{-ax}\dd x = \frac1a - e^{-ac}\left(c + \frac1a\right)$.`],
    a: '1-1/(e-1)',
    s: R`With $a = \lambda-\mu$, the conditional density is $\frac{ae^{-ax}}{1-e^{-ac}}$ on $(0,c)$, so
$$E[X\mid X+Y=c] = \frac{1}{a} - \frac{c}{e^{ac}-1}.$$
With $a = c = 1$: $1 - \frac1{e-1}\approx0.418$, a bit less than $c/2$ because $X$ has the higher rate (it tends to be smaller).`, src: 'HW5 C1(b)' },
  { k: '14', lvl: 3, q: R`A miner is trapped in a room with three doors. Door 1 leads to safety after 3 hours. Door 2 leads back to the same room after 5 hours, and door 3 leads back after 7 hours. Let $T$ be the time until he reaches safety.
(a) Each time, he picks a door uniformly at random, forgetting earlier attempts. Find $E(T)$.
(b) Now he remembers and never retries a door. Find $E(T)$.`,
    h: [R`(a) Condition on the first door $D$: $E(T\mid D=1) = 3$, $E(T\mid D=2) = 5 + E(T)$, because after door 2 he is back at the start with no memory, so the remaining time has the same distribution as $T$.`, R`Tower rule: $E(T) = \frac13\big[3 + (5+E(T)) + (7+E(T))\big]$. Solve for $E(T)$.`, R`(b) His order of doors is a uniformly random permutation. $T = 3 + 5\cdot\mathbb 1\{\text{door 2 before door 1}\} + 7\cdot\mathbb 1\{\text{door 3 before door 1}\}$.`],
    a: [['(a) no memory', '15'], ['(b) with memory', '9']],
    s: R`**(a)** By iterated expectations, conditioning on the first door $D$:
$$E(T) = \tfrac13E(T|D=1) + \tfrac13E(T|D=2) + \tfrac13E(T|D=3) = \tfrac13\big[3 + 5 + E(T) + 7 + E(T)\big].$$
So $3E(T) = 15 + 2E(T)$, i.e. $E(T) = 15$ hours.

**(b)** Now $T = 3 + 5I_2 + 7I_3$, where $I_k = 1$ if door $k$ is tried before door 1. By symmetry each of these orderings has probability $\tfrac12$, so by linearity $E(T) = 3 + \tfrac52 + \tfrac72 = 9$ hours.

The trap in (a) is to treat "back to the room" as the end of the story. The key step is that $E(T\mid D=2) = 5 + E(T)$ involves the unknown itself, giving an equation to solve.` },
  { k: '15', lvl: 4, q: R`(Exam style.) The rate $\Lambda\sim\operatorname{Unif}(0,2)$, and given $\Lambda = \lambda$, the count $N\sim\operatorname{Poisson}(\lambda)$.
(a) Find $E(N)$ and $\operatorname{var}(N)$.
(b) Find $\operatorname{cov}(N,\Lambda)$.
(c) Find $P(N=0)$.
(d) Find $E(\Lambda\mid N=0)$.`,
    h: [R`$E(N\mid\Lambda) = \operatorname{var}(N\mid\Lambda) = \Lambda$. Then the tower rule and the law of total variance.`, R`$E(N\Lambda) = E\big[E(N\Lambda\mid\Lambda)\big] = E\big[\Lambda E(N\mid\Lambda)\big]$ (taking out what is known).`, R`$P(N=0) = E\big[P(N=0\mid\Lambda)\big] = E(e^{-\Lambda})$.`, R`Bayes for densities: $f_{\Lambda|N}(\lambda\mid0) = \frac{P(N=0\mid\lambda)f_\Lambda(\lambda)}{P(N=0)}\propto e^{-\lambda}$ on $(0,2)$. Integrate $\lambda e^{-\lambda}$ by parts.`],
    a: [['$E(N)$', '1'], [R`$\operatorname{var}(N)$`, '4/3'], [R`$\operatorname{cov}(N,\Lambda)$`, '1/3'], ['$P(N=0)$', '(1-exp(-2))/2'], [R`$E(\Lambda\mid N=0)$`, '(1-3*exp(-2))/(1-exp(-2))']],
    s: R`$\Lambda$ has $E(\Lambda) = 1$, $\operatorname{var}(\Lambda) = \frac{4}{12} = \frac13$, $E(\Lambda^2) = \frac43$.

**(a)** $E(N) = E[E(N|\Lambda)] = E(\Lambda) = 1$.
$\operatorname{var}(N) = E[\operatorname{var}(N|\Lambda)] + \operatorname{var}[E(N|\Lambda)] = E(\Lambda) + \operatorname{var}(\Lambda) = 1 + \frac13 = \frac43$. (Bigger than the mean: a mixed Poisson is overdispersed.)

**(b)** $E(N\Lambda) = E[\Lambda\,E(N|\Lambda)] = E(\Lambda^2) = \frac43$, so $\operatorname{cov}(N,\Lambda) = \frac43 - 1\cdot1 = \frac13$ $(=\operatorname{var}\Lambda)$.

**(c)** $P(N=0) = E(e^{-\Lambda}) = \int_0^2e^{-\lambda}\frac12\dd\lambda = \frac{1-e^{-2}}{2}\approx0.432$.

**(d)** $f_{\Lambda|N}(\lambda|0) = \frac{e^{-\lambda}\cdot\frac12}{(1-e^{-2})/2} = \frac{e^{-\lambda}}{1-e^{-2}}$ on $(0,2)$. With $\int_0^2\lambda e^{-\lambda}\dd\lambda = \big[-\lambda e^{-\lambda}\big]_0^2 + \int_0^2e^{-\lambda}\dd\lambda = -2e^{-2} + 1 - e^{-2} = 1 - 3e^{-2}$:
$$E(\Lambda\mid N=0) = \frac{1-3e^{-2}}{1-e^{-2}}\approx0.687.$$
Seeing no events pulls the rate below its prior mean of 1, as it should.` },
]);
