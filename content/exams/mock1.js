EXAM({ id: 'mock1', title: 'Mock exam 1', summary: 'Joint density on a wedge, exponential transformations, Poisson MGF + inequalities.',
  intro: R`Original mock in the 2025 format. 80 minutes, one A4 sheet, simple calculator. Write full derivations and name the rules you use.` }, [
  { k: '1', pts: 40, intro: R`Let $(X,Y)$ have joint PDF
$$f_{X,Y}(x,y) = \begin{cases}c\,e^{-y} & \text{if } 0<x<y,\\ 0 & \text{otherwise.}\end{cases}$$`, parts: [
    { k: 'a', pts: 10, topic: '2.6', q: R`Find $c$.`, h: [R`Inner integral over $x\in(0,y)$ gives $y$; then a Gamma integral.`], a: '1',
      s: R`$f\ge0$ needs $c>0$. $\int_0^\infty\int_0^yce^{-y}\dd x\dd y = c\int_0^\infty ye^{-y}\dd y = c\,\Gamma(2) = c = 1$. So $c = 1$.` },
    { k: 'b', pts: 10, topic: '2.6', q: R`Find the marginal PDFs of $X$ and $Y$ and name them.`, h: [R`For $f_X$: integrate $y$ from $x$ to $\infty$.`],
      a: [['$f_X(x)$', 'exp(-x)', { x: [0, 4] }], ['$f_Y(y)$', 'y*exp(-y)', { y: [0, 4] }]],
      s: R`$f_X(x) = \int_x^\infty e^{-y}\dd y = e^{-x}$, $x>0$: $X\sim\operatorname{Exp}(1)$.
$f_Y(y) = \int_0^ye^{-y}\dd x = ye^{-y}$, $y>0$: $Y\sim\operatorname{Gamma}(2,1)$.` },
    { k: 'c', pts: 10, topic: '2.8', q: R`Find $f_{X|Y}(x|y)$. Are $X$ and $Y$ independent? Justify.`, h: [R`Divide the joint by $f_Y$.`],
      a: [['independent?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`$f_{X|Y}(x|y) = \frac{e^{-y}}{ye^{-y}} = \frac1y$ for $0<x<y$: given $Y = y$, $X\sim\operatorname{Unif}(0,y)$. This depends on $y$, so $X$ and $Y$ are **not** independent. Equivalently, the support $\{0<x<y\}$ is not a product set, and $f_X(x)f_Y(y) = e^{-x}\,ye^{-y}\ne f_{X,Y}(x,y)$.` },
    { k: 'd', pts: 10, topic: '3.5', q: R`Compute $\operatorname{cov}(X,Y)$.`, h: [R`$E(XY) = \int_0^\infty\int_0^yxy\,e^{-y}\dd x\dd y = \int_0^\infty\frac{y^3}{2}e^{-y}\dd y$.`, R`$E(X) = 1$, $E(Y) = 2$.`], a: '1',
      s: R`$E(XY) = \int_0^\infty y e^{-y}\frac{y^2}{2}\dd y = \frac{\Gamma(4)}{2} = 3$. $E(X) = 1$ (Exp(1)), $E(Y) = 2$ (Gamma(2,1)). So $\operatorname{cov}(X,Y) = 3 - 2 = 1$.

(Alternative via the tower rule: $E(XY) = E[Y\,E(X|Y)] = E(Y^2/2) = \frac{\operatorname{var}(Y) + E(Y)^2}{2} = \frac{2+4}{2} = 3$.)` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X, Y\iid\operatorname{Exp}(\beta)$ (scale $\beta$, so $P(X>x) = e^{-x/\beta}$).`, parts: [
    { k: 'a', pts: 10, topic: '2.10', q: R`Show that $M = \min(X,Y)\sim\operatorname{Exp}(\beta/2)$.`, h: [R`$P(M>m) = P(X>m)P(Y>m)$.`],
      a: [['$P(M>m)$', 'exp(-2*m/beta)', { m: [0, 3], beta: [0.5, 3] }]],
      s: R`For $m>0$: $P(M>m) = P(X>m, Y>m) \overset{\indep}{=} e^{-m/\beta}e^{-m/\beta} = e^{-m/(\beta/2)}$. This is the survival function of $\operatorname{Exp}(\beta/2)$, so $F_M(m) = 1 - e^{-2m/\beta}$ and $M\sim\operatorname{Exp}(\beta/2)$.` },
    { k: 'b', pts: 10, topic: '2.10', q: R`Show that $W = \frac{X}{X+Y}\sim\operatorname{Unif}(0,1)$.`, h: [R`For $0<w<1$: $\{W\le w\} = \{X\le\frac{w}{1-w}Y\}$. Condition on $Y$.`],
      a: [['$F_W(w)$', 'w', { w: [0.05, 0.95] }]],
      s: R`For $0<w<1$, let $k = \frac{w}{1-w}$. Then $W\le w\iff X\le kY$. Conditioning on $Y$:
$$F_W(w) = \int_0^\infty\left(1 - e^{-ky/\beta}\right)\frac1\beta e^{-y/\beta}\dd y = 1 - \frac{1}{1+k} = 1 - (1-w) = w.$$
So $W\sim\operatorname{Unif}(0,1)$. (Note: the answer does not depend on $\beta$.)` },
    { k: 'c', pts: 10, topic: '3.1', q: R`Compute $E|X - Y|$.`, h: [R`$|X-Y| = \max - \min$, and $E(\max) + E(\min) = E(X+Y) = 2\beta$.`, R`Or: for $d>0$, $P(|X-Y|>d) = e^{-d/\beta}$ (memorylessness).`], a: [[R`for $\beta = 1$`, '1']],
      s: R`$E(\min) = \beta/2$ by (a), and $E(\max) = E(X+Y) - E(\min) = 2\beta - \frac\beta2 = \frac{3\beta}{2}$. Hence $E|X-Y| = E(\max) - E(\min) = \beta$. (Indeed $|X-Y|\sim\operatorname{Exp}(\beta)$ by memorylessness.) For $\beta = 1$: $1$.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X\sim\operatorname{Poisson}(\lambda)$, $\lambda>0$.`, parts: [
    { k: 'a', pts: 10, topic: '3.7', q: R`Derive the MGF $\psi_X(t)$.`, h: [R`Exponential series.`],
      a: [[R`$\psi_X(t)$`, 'exp(lambda*(exp(t)-1))', { lambda: [0.5, 4], t: [-1, 1] }]],
      s: R`$\psi_X(t) = \sum_{x\ge0}e^{tx}\frac{e^{-\lambda}\lambda^x}{x!} = e^{-\lambda}\sum_{x\ge0}\frac{(\lambda e^t)^x}{x!} = e^{-\lambda}e^{\lambda e^t} = e^{\lambda(e^t - 1)}$, $t\in\R$.` },
    { k: 'b', pts: 10, topic: '3.7', q: R`Use (a) to find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`$\psi'(t) = \lambda e^t\psi(t)$.`],
      a: [['$E(X)$', 'lambda', { lambda: [0.5, 5] }], [R`$\operatorname{var}(X)$`, 'lambda', { lambda: [0.5, 5] }]],
      s: R`$\psi'(t) = \lambda e^te^{\lambda(e^t-1)}$, so $E(X) = \psi'(0) = \lambda$. $\psi''(t) = \lambda e^t\psi(t) + \lambda e^t\psi'(t)$, so $E(X^2) = \psi''(0) = \lambda + \lambda^2$ and $\operatorname{var}(X) = \lambda$. (Or use the CGF $\varphi(t) = \lambda(e^t-1)$.)` },
    { k: 'c', pts: 10, topic: '4.1', q: R`Bound $P(X\ge2\lambda)$ using (i) Markov and (ii) Chebyshev. Which is better for large $\lambda$? Enter both for $\lambda = 10$.`, h: [R`Markov: $\frac{E(X)}{2\lambda}$. Chebyshev: $\{X\ge2\lambda\}\subseteq\{|X-\lambda|\ge\lambda\}$.`],
      a: [['Markov', '1/2'], ['Chebyshev', '1/10']],
      s: R`(i) $X\ge0$ with finite mean, so Markov gives $P(X\ge2\lambda)\le\frac{\lambda}{2\lambda} = \frac12$.
(ii) $P(X\ge2\lambda)\le P(|X-\lambda|\ge\lambda)\le\frac{\operatorname{var}(X)}{\lambda^2} = \frac1\lambda$.
For $\lambda>2$, Chebyshev is better, and it goes to 0 as $\lambda\to\infty$. With $\lambda = 10$: $\frac12$ vs $\frac1{10}$.` },
  ] },
]);
