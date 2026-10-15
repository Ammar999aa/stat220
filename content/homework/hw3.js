HW({ id: 'hw3', title: 'Homework 3', summary: 'Functions of random variables, marginals and conditionals, sums and ratios (Ch.2).',
  intro: R`Topics: Chapter 2, second half. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', ref: 't2.1-h' },
  { k: 'A2', ref: 't2.9-j' },
  { k: 'A3', topic: '2.7', lvl: 2, q: R`Prove: if $X\indep Y$, then $g(X)\indep h(Y)$ for any functions $g, h$.`,
    h: [R`Use preimages: $\{g(X)\in A\} = \{X\in g^{-1}(A)\}$, where $g^{-1}(A) = \{x: g(x)\in A\}$.`],
    s: R`For any sets $A, B$:
$$P(g(X)\in A,\ h(Y)\in B) = P\big(X\in g^{-1}(A),\ Y\in h^{-1}(B)\big) = P\big(X\in g^{-1}(A)\big)P\big(Y\in h^{-1}(B)\big) = P(g(X)\in A)\,P(h(Y)\in B),$$
where the middle step is the independence of $X$ and $Y$. $\blacksquare$`, src: 'HW3 A3 (Wasserman 2.14.10)' },
  { k: 'A4 (a)', ref: 't2.6-k' },
  { k: 'A4 (b)', ref: 't2.8-b' },
  { k: 'A4 (c)', ref: 't2.7-e' },
  { k: 'B1', ref: 't2.8-g' },
  { k: 'B2 (X−Y)', ref: 't2.10-i' },
  { k: 'B2 (X/Y)', ref: 't2.10-j' },
  { k: 'B3', topic: '2.6', lvl: 3, q: R`$f(x,y) = \frac65$ on the region $\{0<y<1,\ y<x<2-\sqrt y\}$, and 0 otherwise. (a) Find the marginals $f_Y(y)$ and $f_X(x)$. (b) Find $f_{Y|X}(y|x)$.`,
    h: [R`Draw it: the left boundary is the line $x = y$; the right boundary is the curve $x = 2-\sqrt y$, i.e. $y = (2-x)^2$ for $1\le x\le2$.`, R`For $f_Y$: fix $y$, so $x\in(y, 2-\sqrt y)$, which has length $2-\sqrt y - y$.`, R`For $f_X$: if $0<x<1$, $y\in(0,x)$. If $1\le x<2$, $y\in(0,(2-x)^2)$.`],
    a: [['$f_Y(y)$', '6/5*(2-sqrt(y)-y)', { y: [0.05, 1] }], [R`$f_X(x)$, $0<x<1$`, '6/5*x', { x: [0.05, 1] }], [R`$f_X(x)$, $1\le x<2$`, '6/5*(2-x)^2', { x: [1, 2] }]],
    s: R`**(a)** For $0<y<1$: $f_Y(y) = \int_y^{2-\sqrt y}\frac65\dd x = \frac65\left(2 - \sqrt y - y\right)$. (Check: $\int_0^1(2-\sqrt y-y)\dd y = 2 - \frac23 - \frac12 = \frac56$ ✓.)

For $0<x<1$: $f_X(x) = \int_0^x\frac65\dd y = \frac65x$. For $1\le x<2$: $f_X(x) = \int_0^{(2-x)^2}\frac65\dd y = \frac65(2-x)^2$.

**(b)** $f_{Y|X}(y|x) = \frac{1}{x}$ for $0<y<x$ when $0<x<1$; and $\frac{1}{(2-x)^2}$ for $0<y<(2-x)^2$ when $1\le x<2$. In both cases $Y$ given $X$ is uniform.`, src: 'HW3 B3' },
  { k: 'C1', topic: '3.6', lvl: 4, q: R`Hierarchical model: $X\sim\operatorname{Gamma}(r,\lambda)$ in the **rate** form $f(x) = \frac{\lambda^r}{\Gamma(r)}x^{r-1}e^{-\lambda x}$, and $Y\mid X = x\sim\operatorname{Poisson}(x)$. Show that $Y$ is negative binomial with success probability $\frac{\lambda}{\lambda+1}$. Enter $P(Y = 0)$ for $r = 2$, $\lambda = 1$.`,
    h: [R`$P(Y = y) = \int_0^\infty e^{-x}\frac{x^y}{y!}\frac{\lambda^r}{\Gamma(r)}x^{r-1}e^{-\lambda x}\dd x$.`, R`Gamma integral: $\int_0^\infty x^{y+r-1}e^{-(1+\lambda)x}\dd x = \frac{\Gamma(y+r)}{(1+\lambda)^{y+r}}$.`],
    a: '1/4',
    s: R`$$P(Y=y) = \frac{\lambda^r}{y!\,\Gamma(r)}\int_0^\infty x^{y+r-1}e^{-(1+\lambda)x}\dd x = \frac{\Gamma(y+r)}{y!\,\Gamma(r)}\left(\frac{\lambda}{1+\lambda}\right)^r\left(\frac1{1+\lambda}\right)^y = \binom{y+r-1}{y}p^r(1-p)^y$$
with $p = \frac{\lambda}{\lambda+1}$. This is the negative binomial PMF (the number of failures before the $r$-th success). For $r = 2$, $\lambda = 1$: $P(Y=0) = (\frac12)^2 = \frac14$.`, src: 'HW3 C1' },
]);
