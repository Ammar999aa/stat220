EXAM({ id: 'mock3', title: 'Mock exam 3', summary: 'Discrete joint PMF, X² of a normal → χ², Pareto moments and tails.',
  intro: R`Original mock in the 2025 format. 80 minutes, one A4 sheet, simple calculator. Write full derivations and name the rules you use.` }, [
  { k: '1', pts: 40, intro: R`$(X,Y)$ has joint PMF $f(x,y) = c\,(x + 2y)$ for $x\in\{0,1,2\}$ and $y\in\{0,1\}$ (and 0 otherwise).`, parts: [
    { k: 'a', pts: 10, topic: '2.6', q: R`Find $c$.`, h: [R`Sum over all 6 cells.`], a: '1/12',
      s: R`$\sum_{x,y}(x+2y) = (0+1+2) + (2+3+4) = 12$, so $c = \frac1{12}$ (and $c>0$ keeps $f\ge0$).` },
    { k: 'b', pts: 10, topic: '2.6', q: R`Find the marginal PMFs of $X$ and $Y$.`, h: [R`$f_X(x) = \frac{x + (x+2)}{12}$.`],
      a: [['$P(X=0)$', '1/6'], ['$P(X=1)$', '1/3'], ['$P(X=2)$', '1/2'], ['$P(Y=1)$', '3/4']],
      s: R`$f_X(x) = \frac{x + (x+2)}{12} = \frac{x+1}{6}$: $\frac16,\frac13,\frac12$ for $x = 0,1,2$.
$f_Y(0) = \frac{0+1+2}{12} = \frac14$, $f_Y(1) = \frac{2+3+4}{12} = \frac34$.` },
    { k: 'c', pts: 10, topic: '2.7', q: R`Are $X$ and $Y$ independent? Justify.`, h: [R`Check the cell $(0,0)$.`], a: { choice: ['Yes', 'No'], v: 1 },
      s: R`$f(0,0) = 0$, but $f_X(0)f_Y(0) = \frac16\cdot\frac14 = \frac1{24}\ne0$. **Not independent.** One failing cell suffices.` },
    { k: 'd', pts: 10, topic: '3.5', q: R`Compute $\operatorname{cov}(X,Y)$.`, h: [R`$E(XY) = \sum_xx\,f(x,1)$.`], a: '-1/12',
      s: R`$E(X) = \frac13 + 2\cdot\frac12 = \frac43$, $E(Y) = \frac34$. $E(XY) = 1\cdot f(1,1) + 2\cdot f(2,1) = \frac3{12} + 2\cdot\frac4{12} = \frac{11}{12}$. So $\operatorname{cov}(X,Y) = \frac{11}{12} - \frac43\cdot\frac34 = \frac{11}{12} - 1 = -\frac1{12}$.` },
  ] },
  { k: '2', pts: 30, intro: R`Let $Z\sim N(0,1)$ and $Y = Z^2$.`, parts: [
    { k: 'a', pts: 10, topic: '2.9', q: R`Derive the PDF of $Y$.`, h: [R`$F_Y(y) = P(-\sqrt y\le Z\le\sqrt y) = 2\Phi(\sqrt y) - 1$.`],
      a: [['$f_Y(y)$', 'exp(-y/2)/sqrt(2*pi*y)', { y: [0.1, 6] }]],
      s: R`For $y>0$: $F_Y(y) = P(Z^2\le y) = \Phi(\sqrt y) - \Phi(-\sqrt y) = 2\Phi(\sqrt y) - 1$. Differentiating, $f_Y(y) = 2\phi(\sqrt y)\cdot\frac{1}{2\sqrt y} = \frac{1}{\sqrt{2\pi y}}e^{-y/2}$, $y>0$. This is $\chi^2_1$.` },
    { k: 'b', pts: 10, topic: '3.7', q: R`Compute the MGF $\psi_Y(t)$ (state for which $t$).`, h: [R`$E(e^{tZ^2}) = \int\frac{1}{\sqrt{2\pi}}e^{-z^2(1-2t)/2}\dd z$: a Gaussian integral with $\sigma^2 = \frac{1}{1-2t}$.`],
      a: [[R`$\psi_Y(t)$`, '(1-2*t)^(-1/2)', { t: [-1, 0.4] }]],
      s: R`By the lazy statistician rule, for $t<\frac12$:
$$\psi_Y(t) = \int_{\R}e^{tz^2}\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\dd z = \int_{\R}\frac{1}{\sqrt{2\pi}}e^{-\frac{z^2}{2}(1-2t)}\dd z = \frac{1}{\sqrt{1-2t}},$$
using $\int e^{-z^2/(2\sigma^2)}\dd z = \sigma\sqrt{2\pi}$ with $\sigma^2 = \frac1{1-2t}$. For $t\ge\frac12$ the integral diverges.` },
    { k: 'c', pts: 10, topic: '3.7', q: R`Let $Z_1,\dots,Z_n\iid N(0,1)$ and $S = \sum Z_i^2$. Identify the distribution of $S$ and give its mean and variance for $n = 7$.`, h: [R`Product of MGFs: $(1-2t)^{-n/2}$, i.e. $\operatorname{Gamma}(n/2, 2)$.`],
      a: [['mean', '7'], ['variance', '14']],
      s: R`By independence, $\psi_S(t) = (1-2t)^{-n/2}$, the MGF of $\operatorname{Gamma}(\frac n2,2) = \chi^2_n$. By uniqueness $S\sim\chi^2_n$, with mean $\alpha\beta = n$ and variance $\alpha\beta^2 = 2n$. For $n = 7$: $7$ and $14$.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X$ have the Pareto density $f(x) = \alpha x^{-(\alpha+1)}$ for $x>1$, with $\alpha>0$.`, parts: [
    { k: 'a', pts: 10, topic: '3.1', q: R`For which $\alpha$ is $E(X)$ finite? Compute it.`, h: [R`$\int_1^\infty\alpha x^{-\alpha}\dd x$.`],
      a: [['$E(X)$', 'alpha/(alpha-1)', { alpha: [1.5, 5] }]],
      s: R`$E(X) = \int_1^\infty\alpha x^{-\alpha}\dd x$ converges iff $\alpha>1$, and then equals $\frac{\alpha}{\alpha-1}$. For $\alpha\le1$, $E(X) = +\infty$.` },
    { k: 'b', pts: 10, topic: '3.3', q: R`For $\alpha>2$, compute $\operatorname{var}(X)$.`, h: [R`$E(X^2) = \frac{\alpha}{\alpha-2}$.`],
      a: [[R`$\operatorname{var}(X)$`, 'alpha/((alpha-1)^2*(alpha-2))', { alpha: [2.5, 6] }]],
      s: R`$E(X^2) = \int_1^\infty\alpha x^{1-\alpha}\dd x = \frac{\alpha}{\alpha-2}$ for $\alpha>2$. So
$$\operatorname{var}(X) = \frac{\alpha}{\alpha-2} - \frac{\alpha^2}{(\alpha-1)^2} = \frac{\alpha\left[(\alpha-1)^2 - \alpha(\alpha-2)\right]}{(\alpha-2)(\alpha-1)^2} = \frac{\alpha}{(\alpha-1)^2(\alpha-2)}.$$` },
    { k: 'c', pts: 10, topic: '4.1', q: R`Take $\alpha = 3$. Compare Markov's bound for $P(X>t)$ with the exact tail $P(X>t)$ at $t = 10$.`, h: [R`$P(X>t) = t^{-\alpha}$.`],
      a: [['Markov', '0.15'], ['exact', '0.001']],
      s: R`$E(X) = \frac32$, so Markov gives $P(X>10)\le\frac{1.5}{10} = 0.15$. The exact value is $10^{-3} = 0.001$. Markov decays like $1/t$, whereas the true tail decays like $t^{-3}$.` },
  ] },
]);
