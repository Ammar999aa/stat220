HW({ id: 'hw4', title: 'Homework 4', summary: 'Expectation, variance, covariance (Ch.3).',
  intro: R`Topics: Chapter 3, first half. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', topic: '3.3', lvl: 3, q: R`Random walk: $X_0 = 0$; at each step $X_n = X_{n-1} + Z_n$ where $Z_n = +2$ with probability $p$ and $-1$ with probability $1-p$, independently. (a) Find $E(X_n)$ and $\operatorname{var}(X_n)$. (b) For which $p$ is $E(X_n) = 0$ for all $n$? (c) For that $p$, find $E(X_n^2)$.`,
    h: [R`$X_n = \sum_{i=1}^nZ_i$, a sum of iid steps.`, R`$E(Z) = 3p-1$, $E(Z^2) = 4p + (1-p) = 1+3p$.`],
    a: [['$E(X_n)$', 'n*(3*p-1)', { n: [1, 20, 'int'], p: [0.1, 0.9] }], [R`$\operatorname{var}(X_n)$`, '9*n*p*(1-p)', { n: [1, 20, 'int'], p: [0.1, 0.9] }], ['$p$', '1/3'], ['$E(X_n^2)$', '2*n', { n: [1, 20, 'int'] }]],
    s: R`**(a)** $E(Z) = 2p - (1-p) = 3p-1$, so $E(X_n) = n(3p-1)$. $\operatorname{var}(Z) = 1 + 3p - (3p-1)^2 = 9p - 9p^2 = 9p(1-p)$, so by independence $\operatorname{var}(X_n) = 9np(1-p)$.

**(b)** $3p - 1 = 0\iff p = \frac13$.

**(c)** $E(X_n^2) = \operatorname{var}(X_n) + 0 = 9n\cdot\frac13\cdot\frac23 = 2n$.`, src: 'HW4 A1' },
  { k: 'A2', ref: 't3.1-l' },
  { k: 'A3 (mean)', ref: 't3.1-h' },
  { k: 'A3 (variance)', ref: 't3.3-i' },
  { k: 'B1', ref: 't3.3-g' },
  { k: 'B2 (a)', ref: 't2.6-e' },
  { k: 'B2 (b)–(c)', ref: 't3.5-c' },
  { k: 'B2 (d)', ref: 't3.5-d' },
  { k: 'B3', ref: 't3.5-e' },
  { k: 'C1', ref: 't3.3-j' },
  { k: 'C2', topic: '3.3', lvl: 3, q: R`$F(x) = 0$ for $x<0$; $2x^2$ for $0\le x<\frac12$; $1 - 2(1-x)^2$ for $\frac12\le x<\frac34$; $1$ for $x\ge\frac34$. Find $P(\frac14<X<\frac58)$, $E(X)$ and $\operatorname{var}(X)$.`,
    h: [R`$X$ has density $4x$ on $(0,\frac12)$, $4(1-x)$ on $(\frac12,\frac34)$, and a point mass $1 - F(\frac34^-) = \frac18$ at $\frac34$.`, R`$P(\frac14<X<\frac58) = F(\frac58) - F(\frac14)$ (no atoms there).`, R`$E(X^2) = \int_0^{1/2}4x^3\dd x + \int_{1/2}^{3/4}4x^2(1-x)\dd x + \left(\tfrac34\right)^2\tfrac18$.`],
    a: [[R`$P(\tfrac14<X<\tfrac58)$`, '19/32'], ['$E(X)$', '47/96'], [R`$\operatorname{var}(X)$`, '323/9216']],
    s: R`**Atom:** $F(\frac34^-) = 1 - 2\cdot\frac1{16} = \frac78$, so $P(X=\frac34) = \frac18$.

**Probability:** $F(\frac58) - F(\frac14) = \left[1 - 2\left(\frac38\right)^2\right] - 2\left(\frac14\right)^2 = 1 - \frac{18}{64} - \frac{8}{64} = \frac{38}{64} = \frac{19}{32}$.

**Mean:** $E(X) = \int_0^{1/2}4x^2\dd x + \int_{1/2}^{3/4}4x(1-x)\dd x + \frac34\cdot\frac18 = \frac16 + \frac{11}{48} + \frac{3}{32} = \frac{47}{96}$.

**Second moment:** $\int_0^{1/2}4x^3 = \frac1{16}$, $\int_{1/2}^{3/4}(4x^2-4x^3) = \frac{109}{768}$, atom $\frac{9}{16}\cdot\frac18 = \frac{9}{128}$, total $\frac{48+109+54}{768} = \frac{211}{768}$.

**Variance:** $\frac{211}{768} - \left(\frac{47}{96}\right)^2 = \frac{2532 - 2209}{9216} = \frac{323}{9216}\approx0.035$.`, src: 'HW4 C2' },
  { k: 'C3', topic: '3.3', lvl: 3, q: R`$X\sim\operatorname{Beta}(\alpha,\beta)$. Derive $E(X)$ and $\operatorname{var}(X)$. Evaluate the variance for $\alpha = 2$, $\beta = 3$.`,
    h: [R`$E(X^k) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\cdot\frac{\Gamma(\alpha+k)\Gamma(\beta)}{\Gamma(\alpha+\beta+k)}$ (Beta integral).`, R`$E(X^2) = \frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}$.`],
    a: [[R`$\operatorname{var}(X)$`, '1/25']],
    s: R`Using the Beta integral and $\Gamma(z+1) = z\Gamma(z)$: $E(X) = \frac{\alpha}{\alpha+\beta}$ and $E(X^2) = \frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}$. Then
$$\operatorname{var}(X) = \frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)} - \frac{\alpha^2}{(\alpha+\beta)^2} = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.$$
For $(2,3)$: $\frac{6}{25\cdot6} = \frac{1}{25}$.`, src: 'HW4 C3' },
]);
