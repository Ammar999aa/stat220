EXAM({ id: 'mock2', title: 'Mock exam 2', summary: 'Hierarchical uniform model, Bayes with machines, Chebyshev vs Hoeffding + Markov proof.',
  intro: R`Original mock in the 2025 format. 80 minutes, one A4 sheet, simple calculator. Write full derivations and name the rules you use.` }, [
  { k: '1', pts: 40, intro: R`Let $X\sim\operatorname{Unif}(0,1)$ and, given $X = x$, let $Y\sim\operatorname{Unif}(0,x)$.`, parts: [
    { k: 'a', pts: 10, topic: '2.8', q: R`Write down the joint PDF $f_{X,Y}(x,y)$, including its support.`, h: [R`$f_{X,Y} = f_{Y|X}f_X$.`],
      a: [[R`$f_{X,Y}(x,y)$ on the support`, '1/x', { x: [0.3, 1], y: [0.01, 0.25] }]],
      s: R`$f_{X,Y}(x,y) = f_{Y|X}(y|x)f_X(x) = \frac1x\cdot1 = \frac1x$ for $0<y<x<1$, and $0$ otherwise.` },
    { k: 'b', pts: 10, topic: '2.8', q: R`Find the marginal PDF of $Y$.`, h: [R`Integrate $x$ from $y$ to 1.`], a: [['$f_Y(y)$', '-log(y)', { y: [0.05, 1] }]],
      s: R`$f_Y(y) = \int_y^1\frac{\dd x}{x} = -\log y$, $0<y<1$. (Check: $\int_0^1-\log y\dd y = 1$ ✓.)` },
    { k: 'c', pts: 10, topic: '2.8', q: R`Find $f_{X|Y}(x|y)$ and $E(X\mid Y = y)$.`, h: [R`Divide; then $\int_y^1x\cdot\frac{1}{-x\log y}\dd x$.`],
      a: [[R`$E(X\mid Y=y)$`, '(1-y)/(-log(y))', { y: [0.05, 0.95] }]],
      s: R`$f_{X|Y}(x|y) = \frac{1/x}{-\log y} = \frac{1}{-x\log y}$ for $y<x<1$. Then $E(X|Y=y) = \int_y^1\frac{x}{-x\log y}\dd x = \frac{1-y}{-\log y}$.` },
    { k: 'd', pts: 10, topic: '3.6', q: R`Find $E(Y)$ and $\operatorname{var}(Y)$ using iterated expectation and variance.`, h: [R`$E(Y|X) = X/2$, $\operatorname{var}(Y|X) = X^2/12$.`],
      a: [['$E(Y)$', '1/4'], [R`$\operatorname{var}(Y)$`, '7/144']],
      s: R`$E(Y) = E[E(Y|X)] = E(X/2) = \frac14$.
$\operatorname{var}(Y) = E[\operatorname{var}(Y|X)] + \operatorname{var}[E(Y|X)] = E\left(\frac{X^2}{12}\right) + \operatorname{var}\left(\frac X2\right) = \frac{1}{36} + \frac1{48} = \frac{7}{144}$.` },
  ] },
  { k: '2', pts: 30, intro: R`A factory has three machines. $M_1$ makes 50% of the items, $M_2$ 30% and $M_3$ 20%. Their defect rates are 1%, 2% and 5%, respectively. Items are defective independently *given the machine*.`, parts: [
    { k: 'a', pts: 10, topic: '1.6', q: R`A random item is inspected. Find $P(D)$ (defective).`, h: [R`Total probability.`], a: '0.021',
      s: R`$P(D) = 0.5(0.01) + 0.3(0.02) + 0.2(0.05) = 0.005 + 0.006 + 0.010 = 0.021$.` },
    { k: 'b', pts: 10, topic: '1.6', q: R`Given the item is defective, find the probability it came from $M_3$.`, h: [R`Bayes.`], a: '10/21',
      s: R`$P(M_3|D) = \frac{0.2\cdot0.05}{0.021} = \frac{0.010}{0.021} = \frac{10}{21}\approx0.476$.` },
    { k: 'c', pts: 10, topic: '1.4', q: R`A machine is chosen at random (with the 50/30/20 probabilities) and makes two items. Find $P(\text{both defective})$. Are the events "item 1 defective" and "item 2 defective" independent?`, h: [R`Condition on the machine: $P(D_1D_2|M_i) = d_i^2$.`],
      a: [['P(both)', '0.00067'], ['independent?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`$P(D_1\cap D_2) = 0.5(0.01)^2 + 0.3(0.02)^2 + 0.2(0.05)^2 = 0.00005 + 0.00012 + 0.0005 = 0.00067$. But $P(D_1)P(D_2) = 0.021^2 = 0.000441\ne0.00067$. They are **not** independent: they are only *conditionally* independent given the machine. A first defect makes $M_3$ more likely, which raises the chance of a second defect.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n\iid\operatorname{Ber}(p)$ and $\bar X_n = \frac1n\sum_iX_i$.`, parts: [
    { k: 'a', pts: 10, topic: '4.1', q: R`State and prove Markov's inequality.`, h: [R`Split $E(X) = \int_0^t + \int_t^\infty$.`],
      s: R`**Statement.** If $X\ge0$ with $E(X)<\infty$, then $P(X>t)\le\frac{E(X)}{t}$ for every $t>0$.

**Proof** (continuous case; the discrete case uses sums):
$$E(X) = \int_0^\infty xf(x)\dd x\ \ge\ \int_t^\infty xf(x)\dd x\ \ge\ t\int_t^\infty f(x)\dd x = tP(X>t).$$
Equivalently: $X\ge t\,\mathbb 1\{X>t\}$, so $E(X)\ge tP(X>t)$ by taking expectations. $\blacksquare$` },
    { k: 'b', pts: 10, topic: '4.1', q: R`Use Chebyshev to show $P(|\bar X_n - p|>\varepsilon)\le\frac{1}{4n\varepsilon^2}$, and find the smallest $n$ guaranteeing this probability is $\le0.05$ for $\varepsilon = 0.05$.`, h: [R`$\operatorname{var}(\bar X_n) = \frac{p(1-p)}{n}$ and $p(1-p)\le\frac14$.`], a: '2000',
      s: R`$E(\bar X_n) = p$ and $\operatorname{var}(\bar X_n) = \frac{p(1-p)}{n}\le\frac{1}{4n}$, since $p(1-p)$ is maximized at $p = \frac12$. Chebyshev: $P(|\bar X_n - p|>\varepsilon)\le\frac{1}{4n\varepsilon^2}$. We need $\frac{1}{4n(0.0025)}\le0.05$, i.e. $n\ge\frac{1}{0.0005} = 2000$.` },
    { k: 'c', pts: 10, topic: '4.2', q: R`Repeat (b) with Hoeffding's inequality $P(|\bar X_n - p|>\varepsilon)\le2e^{-2n\varepsilon^2}$. Comment.`, h: [R`$2e^{-2n(0.0025)}\le0.05\iff n\ge\frac{\log40}{0.005}$.`], a: '738',
      s: R`$2e^{-0.005n}\le0.05\iff n\ge\frac{\log 40}{0.005}\approx737.8$, so $n = 738$. Hoeffding needs far fewer samples than Chebyshev (2000), because its bound decays exponentially in $n$ rather than like $1/n$.` },
  ] },
]);
