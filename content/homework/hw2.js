HW({ id: 'hw2', title: 'Homework 2', summary: 'PMF/CDF, transformations, joint and conditional densities (Ch.2).',
  intro: R`Topics: Chapter 2, first half. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', topic: '2.4', lvl: 2, q: R`There are 30 microwave ovens, 5 of them defective. You pick 4 at random without replacement; $X$ = number of defective ones picked. Find the PMF of $X$ and the CDF values $F(0)$, $F(1)$, $F(2)$. Describe the CDF's graph.`,
    h: [R`Hypergeometric: $P(X=x) = \binom5x\binom{25}{4-x}/\binom{30}4$, with $\binom{30}{4} = 27405$.`, R`$\binom{25}4 = 12650$, $\binom{25}3 = 2300$, $\binom{25}2 = 300$.`],
    a: [['$F(0)$', '12650/27405'], ['$F(1)$', '24150/27405'], ['$F(2)$', '27150/27405']],
    s: R`$X\sim\text{Hypergeometric}(N=30, K=5, n=4)$, with $P(X = x) = \frac{\binom5x\binom{25}{4-x}}{\binom{30}4}$ for $x = 0,\dots,4$:
<table><tr><th>$x$</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>$P(X=x)$</th><td>$\frac{12650}{27405}\approx.4616$</td><td>$\frac{11500}{27405}\approx.4196$</td><td>$\frac{3000}{27405}\approx.1095$</td><td>$\frac{250}{27405}\approx.0091$</td><td>$\frac{5}{27405}\approx.0002$</td></tr></table>
CDF: $F(0)\approx.4616$, $F(1)\approx.8812$, $F(2)\approx.9907$, $F(3)\approx.9998$, $F(4) = 1$. The graph is a right-continuous step function: $0$ for $x<0$, jumping at $0,1,2,3,4$ by the probabilities above, and flat in between.`, src: 'HW2 A1' },
  { k: 'A2', ref: 't2.2-i' },
  { k: 'A3 (a)', ref: 't2.2-h' },
  { k: 'A3 (b)', ref: 't2.9-i' },
  { k: 'A4', ref: 't2.10-d' },
  { k: 'A5', ref: 't2.8-c' },
  { k: 'B1', ref: 't2.2-g' },
  { k: 'B2 (a)', ref: 't2.1-c' },
  { k: 'B2 (b)', ref: 'd2.9-09' },
  { k: 'B3', topic: '2.7', lvl: 4, q: R`A coin with $P(\text{heads}) = p$ is tossed. Let $X$ = number of heads and $Y$ = number of tails.

(a) If the coin is tossed **once**, prove $X$ and $Y$ are dependent.

(b) If the coin is tossed $N\sim\operatorname{Poisson}(\lambda)$ times, show $X$ and $Y$ are independent. Enter $P(X = 1, Y = 1)$ for $\lambda = 2$, $p = \frac12$.`,
    h: [R`(a) $P(X=1, Y=1) = 0$ but $P(X=1)P(Y=1) = p(1-p)$.`, R`(b) $P(X = x, Y = y) = P(X=x, Y=y\mid N = x+y)P(N=x+y) = \binom{x+y}{x}p^x(1-p)^y\,e^{-\lambda}\frac{\lambda^{x+y}}{(x+y)!}$.`, R`Split $e^{-\lambda} = e^{-\lambda p}e^{-\lambda(1-p)}$ and $\lambda^{x+y} = \lambda^x\lambda^y$.`],
    a: [['$P(X=1,Y=1)$', 'exp(-2)']],
    s: R`**(a)** With one toss, exactly one of $X, Y$ equals 1. So $P(X=1,Y=1) = 0\ne p(1-p) = P(X=1)P(Y=1)$ for $0<p<1$. Dependent.

**(b)** Given $N = n$, $X\sim\operatorname{Bin}(n,p)$ and $Y = n - X$. Hence
$$P(X=x,Y=y) = \binom{x+y}{x}p^x(1-p)^y\cdot\frac{e^{-\lambda}\lambda^{x+y}}{(x+y)!} = \frac{e^{-\lambda p}(\lambda p)^x}{x!}\cdot\frac{e^{-\lambda(1-p)}(\lambda(1-p))^y}{y!}.$$
The joint PMF factors into a $\operatorname{Poisson}(\lambda p)$ PMF in $x$ times a $\operatorname{Poisson}(\lambda(1-p))$ PMF in $y$, on the product set $\N\times\N$. So $X\indep Y$ with these marginals.

With $\lambda=2$, $p=\frac12$: $X, Y\iid\operatorname{Poisson}(1)$, and $P(X=1,Y=1) = (e^{-1})^2 = e^{-2}$.`, src: 'HW2 B3 (Wasserman 2.14.11)' },
  { k: 'B4', ref: 't2.10-c' },
  { k: 'C1', ref: 't2.9-f' },
  { k: 'C2', ref: 't2.9-k' },
]);
