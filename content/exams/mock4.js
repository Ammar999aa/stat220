EXAM({ id: 'mock4', title: 'Mock exam 4', summary: 'Gamma-type joint density, Poisson sums and conditioning, Markov/Chebyshev/Cantelli/Jensen.',
  intro: R`Original mock in the 2025 format. 80 minutes, one A4 sheet, simple calculator. Write full derivations and name the rules you use.` }, [
  { k: '1', pts: 40, intro: R`Let $(X,Y)$ have joint PDF
$$f_{X,Y}(x,y) = \begin{cases}c\,y\,e^{-y} & \text{if } 0<x<y,\\ 0 & \text{otherwise.}\end{cases}$$`, parts: [
    { k: 'a', pts: 10, topic: '2.6', q: R`Find $c$.`, h: [R`Inner integral over $x$ gives $y$; then $\int_0^\infty y^2e^{-y}\dd y = \Gamma(3)$.`], a: '1/2',
      s: R`$\int_0^\infty\int_0^ycye^{-y}\dd x\dd y = c\int_0^\infty y^2e^{-y}\dd y = c\,\Gamma(3) = 2c = 1\Rightarrow c = \frac12$.` },
    { k: 'b', pts: 10, topic: '2.6', q: R`Find the marginal PDFs of $Y$ and of $X$.`, h: [R`$\int_x^\infty ye^{-y}\dd y = (x+1)e^{-x}$ (by parts).`],
      a: [['$f_Y(y)$', 'y^2*exp(-y)/2', { y: [0, 6] }], ['$f_X(x)$', '(x+1)*exp(-x)/2', { x: [0, 6] }]],
      s: R`$f_Y(y) = \int_0^y\frac12ye^{-y}\dd x = \frac12y^2e^{-y}$, $y>0$: $\operatorname{Gamma}(3,1)$.
$f_X(x) = \int_x^\infty\frac12ye^{-y}\dd y = \frac12\Big[-(y+1)e^{-y}\Big]_x^\infty = \frac12(x+1)e^{-x}$, $x>0$.` },
    { k: 'c', pts: 10, topic: '2.8', q: R`Find the conditional distribution of $X$ given $Y = y$. Are $X$ and $Y$ independent?`, h: [R`Divide by $f_Y$.`],
      a: [['independent?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`$f_{X|Y}(x|y) = \frac{\frac12ye^{-y}}{\frac12y^2e^{-y}} = \frac1y$ for $0<x<y$: $X\mid Y = y\sim\operatorname{Unif}(0,y)$. It depends on $y$, so they are not independent (also: the support is not a product set).` },
    { k: 'd', pts: 10, topic: '3.6', q: R`Compute $E(X)$ in two ways: from $f_X$, and with the tower rule.`, h: [R`$E(X|Y) = Y/2$ and $E(Y) = 3$.`], a: '3/2',
      s: R`Tower: $E(X) = E[E(X|Y)] = E(Y/2) = \frac32$ (since $Y\sim\operatorname{Gamma}(3,1)$ has mean 3).
Directly: $E(X) = \frac12\int_0^\infty x(x+1)e^{-x}\dd x = \frac12(\Gamma(3) + \Gamma(2)) = \frac12(2+1) = \frac32$ ✓.` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X\sim\operatorname{Poisson}(\lambda)$ and $Y\sim\operatorname{Poisson}(\mu)$ be independent, and $S = X + Y$.`, parts: [
    { k: 'a', pts: 10, topic: '3.7', q: R`Using MGFs, show that $S\sim\operatorname{Poisson}(\lambda+\mu)$.`, h: [R`$\psi_{\text{Pois}(\lambda)}(t) = e^{\lambda(e^t-1)}$.`],
      a: [[R`$\psi_S(t)$`, 'exp((lambda+mu)*(exp(t)-1))', { lambda: [0.5, 3], mu: [0.5, 3], t: [-1, 1] }]],
      s: R`By independence, $\psi_S(t) = \psi_X(t)\psi_Y(t) = e^{\lambda(e^t-1)}e^{\mu(e^t-1)} = e^{(\lambda+\mu)(e^t-1)}$, the $\operatorname{Poisson}(\lambda+\mu)$ MGF. By uniqueness, $S\sim\operatorname{Poisson}(\lambda+\mu)$.` },
    { k: 'b', pts: 10, topic: '2.8', q: R`Show that $X\mid S = n\sim\operatorname{Bin}\left(n, \frac{\lambda}{\lambda+\mu}\right)$. Enter $P(X = 2\mid S = 3)$ for $\lambda = 2$, $\mu = 1$.`, h: [R`$P(X = x|S=n) = \frac{P(X=x)P(Y=n-x)}{P(S=n)}$.`], a: '4/9',
      s: R`For $0\le x\le n$:
$$P(X=x\mid S=n) = \frac{\frac{e^{-\lambda}\lambda^x}{x!}\cdot\frac{e^{-\mu}\mu^{n-x}}{(n-x)!}}{\frac{e^{-(\lambda+\mu)}(\lambda+\mu)^n}{n!}} = \binom nx\left(\frac{\lambda}{\lambda+\mu}\right)^x\left(\frac{\mu}{\lambda+\mu}\right)^{n-x}.$$
With $\lambda = 2$, $\mu = 1$, $n = 3$: $\binom32\left(\frac23\right)^2\frac13 = \frac{4}{9}$.` },
    { k: 'c', pts: 10, topic: '3.6', q: R`Find $E(X\mid S)$ and verify $E[E(X\mid S)] = E(X)$.`, h: [R`Binomial mean.`],
      a: [[R`$E(X\mid S = n)$`, 'n*lambda/(lambda+mu)', { n: [0, 10, 'int'], lambda: [0.5, 3], mu: [0.5, 3] }]],
      s: R`$E(X\mid S = n) = \frac{n\lambda}{\lambda+\mu}$, so $E(X|S) = \frac{\lambda}{\lambda+\mu}S$. Then $E[E(X|S)] = \frac{\lambda}{\lambda+\mu}E(S) = \frac{\lambda}{\lambda+\mu}(\lambda+\mu) = \lambda = E(X)$ ✓.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X\ge0$ with $E(X) = 1$ and $\operatorname{var}(X) = 1$.`, parts: [
    { k: 'a', pts: 10, topic: '4.1', q: R`Bound $P(X\ge3)$ using Markov, Chebyshev, and the one-sided (Cantelli) inequality $P(X - \mu\ge t)\le\frac{\sigma^2}{\sigma^2+t^2}$.`, h: [R`$\{X\ge3\} = \{X - 1\ge2\}\subseteq\{|X-1|\ge2\}$.`],
      a: [['Markov', '1/3'], ['Chebyshev', '1/4'], ['Cantelli', '1/5']],
      s: R`Markov: $P(X\ge3)\le\frac13$. Chebyshev: $P(X\ge3)\le P(|X-1|\ge2)\le\frac14$. Cantelli: $P(X - 1\ge2)\le\frac{1}{1+4} = \frac15$. The more information a bound uses, and the more it targets one tail, the tighter it is.` },
    { k: 'b', pts: 10, topic: '4.1', q: R`If in fact $X\sim\operatorname{Exp}(1)$, what is the exact $P(X\ge3)$?`, h: [R`Survival function.`], a: 'exp(-3)', s: R`$e^{-3}\approx0.0498$, far below all three bounds. Those bounds hold for *every* distribution with mean 1 and variance 1.` },
    { k: 'c', pts: 10, topic: '4.4', q: R`Using Jensen's inequality, show that $E(e^{-X})\ge e^{-1}$ and $E(\log(1+X))\le\log2$. Then compute $E(e^{-X})$ when $X\sim\operatorname{Exp}(1)$.`, h: [R`$e^{-x}$ is convex; $\log(1+x)$ is concave.`], a: [[R`$E(e^{-X})$ for Exp(1)`, '1/2']],
      s: R`$g(x) = e^{-x}$ is convex, so $E(e^{-X})\ge e^{-E(X)} = e^{-1}$. $h(x) = \log(1+x)$ is concave on $x>-1$, so $E\log(1+X)\le\log(1+E X) = \log2$.
For $X\sim\operatorname{Exp}(1)$: $E(e^{-X}) = \int_0^\infty e^{-x}e^{-x}\dd x = \frac12\ge e^{-1}\approx0.368$ ✓.` },
  ] },
]);
