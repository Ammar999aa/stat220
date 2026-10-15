TOPIC({ id: '2.5', ch: 2, title: 'Important continuous distributions', summary: 'Uniform, Exponential, Gamma, Beta, Normal, t/Cauchy, χ², Pareto; Gamma and Gaussian integrals.' }, [
R`These densities are the building blocks of every exam question. The most useful skill here is **recognizing a density kernel**. If an integrand looks like $x^{\alpha-1}e^{-x/\beta}$, it is a Gamma density up to a constant, and you know its integral without integrating.`,
DEF('Uniform$(a,b)$', R`$f(x) = \frac1{b-a}$ for $a<x<b$. CDF $F(x) = \frac{x-a}{b-a}$ on $[a,b]$. Probabilities are proportional to lengths.`),
P({ k: 'a', lvl: 1, q: R`$X\sim\operatorname{Unif}(2,6)$. Find $P(X>5)$.`, h: [R`Length of $(5,6)$ over length of $(2,6)$.`], a: '1/4', s: R`$\frac{1}{4}$.` }),
DEF(R`Exponential$(\beta)$ (scale $\beta$ = mean)`, R`$f(x) = \frac1\beta e^{-x/\beta}$ for $x>0$; $F(x) = 1 - e^{-x/\beta}$; $P(X>x) = e^{-x/\beta}$.

**Memoryless:** $P(X>s+t\mid X>s) = P(X>t)$. Used for waiting times and lifetimes.

⚠ This course uses the **scale** $\beta$ (mean $\beta$), not the rate $\lambda = 1/\beta$. Always check which one a problem uses.`),
P({ k: 'b', lvl: 1, q: R`$X\sim\operatorname{Exp}(\beta = 3)$. Find $P(X>3)$ and $P(X>5\mid X>2)$.`, h: [R`$e^{-x/\beta}$. Memorylessness for the second.`], a: [['$P(X>3)$', 'exp(-1)'], [R`$P(X>5\mid X>2)$`, 'exp(-1)']], s: R`$e^{-3/3} = e^{-1}$ for both: having already waited 2 doesn't change the chance of waiting 3 more.` }),
DEF(R`Gamma$(\alpha,\beta)$ and the Gamma function`, R`$$f(x) = \frac{1}{\beta^\alpha\Gamma(\alpha)}x^{\alpha-1}e^{-x/\beta},\quad x>0,\qquad\Gamma(\alpha) = \int_0^\infty t^{\alpha-1}e^{-t}\dd t.$$
Facts: $\Gamma(\alpha+1) = \alpha\Gamma(\alpha)$, $\Gamma(n) = (n-1)!$, $\Gamma(\frac12) = \sqrt\pi$. $\alpha = 1$ gives $\operatorname{Exp}(\beta)$. If $X_1,\dots,X_n\iid\operatorname{Exp}(\beta)$ then $\sum X_i\sim\operatorname{Gamma}(n,\beta)$.

**Gamma integral (memorize!):** $\displaystyle\int_0^\infty x^{\alpha-1}e^{-x/\beta}\dd x = \beta^\alpha\Gamma(\alpha)$.`),
P({ k: 'c', lvl: 2, q: R`Compute $\int_0^\infty x^4e^{-2x}\dd x$ using the Gamma integral.`, h: [R`$\alpha - 1 = 4$, and $e^{-2x} = e^{-x/\beta}$ with $\beta = \frac12$.`], a: '3/4', s: R`$\beta^\alpha\Gamma(\alpha) = (\frac12)^5\Gamma(5) = \frac{24}{32} = \frac34$.` }),
P({ k: 'd', lvl: 2, q: R`$f(x) = c\,x^2e^{-x/2}$ for $x>0$. Identify the distribution and find $c$.`, h: [R`Kernel of $\operatorname{Gamma}(3, 2)$.`], a: '1/16', s: R`$x^{3-1}e^{-x/2}$ is a $\operatorname{Gamma}(3,2)$ kernel, so $c = \frac{1}{2^3\Gamma(3)} = \frac{1}{8\cdot2} = \frac1{16}$.` }),
P({ k: 'e', lvl: 1, q: R`Compute $\Gamma(\frac52)$.`, h: [R`$\Gamma(\frac52) = \frac32\Gamma(\frac32) = \frac32\cdot\frac12\Gamma(\frac12)$.`], a: '3*sqrt(pi)/4', s: R`$\frac32\cdot\frac12\sqrt\pi = \frac{3\sqrt\pi}4\approx1.329$.` }),
DEF(R`Beta$(\alpha,\beta)$`, R`$f(x) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1}$ for $0<x<1$. $\operatorname{Beta}(1,1) = \operatorname{Unif}(0,1)$. Used for random proportions.

**Beta integral:** $\int_0^1x^{a-1}(1-x)^{b-1}\dd x = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$.`),
P({ k: 'f', lvl: 2, q: R`$f(x) = c\,x(1-x)^2$ on $(0,1)$. Find $c$.`, h: [R`Beta$(2,3)$ kernel.`], a: '12', s: R`$c = \frac{\Gamma(5)}{\Gamma(2)\Gamma(3)} = \frac{24}{1\cdot2} = 12$.` }),
DEF(R`Normal $N(\mu,\sigma^2)$`, R`$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac12\left(\frac{x-\mu}{\sigma}\right)^2\right),\quad x\in\R.$$
The CDF has **no closed form**. Write $\Phi$ for the standard normal CDF and use a table. Properties (slides):
<ol><li>$X\sim N(\mu,\sigma^2)\Rightarrow Z = \frac{X-\mu}\sigma\sim N(0,1)$ (standardize).</li><li>$Z\sim N(0,1)\Rightarrow X = \mu+\sigma Z\sim N(\mu,\sigma^2)$.</li><li>Independent $X_i\sim N(\mu_i,\sigma_i^2)\Rightarrow\sum X_i\sim N(\sum\mu_i,\sum\sigma_i^2)$.</li></ol>
**Gaussian integral:** $\int_{\R}e^{-x^2/(2\sigma^2)}\dd x = \sigma\sqrt{2\pi}$.`),
P({ k: 'g', lvl: 1, q: R`$X\sim N(5,4)$. Using $\Phi(1) = 0.8413$, find $P(X\le7)$.`, h: [R`$Z = \frac{7-5}{2}$.`], a: '0.8413', s: R`$P\left(Z\le\frac{7-5}2\right) = \Phi(1) = 0.8413$.` }),
P({ k: 'h', lvl: 2, q: R`$X\sim N(\mu,\sigma^2)$. Using $\Phi(2) = 0.9772$, find $P(|X-\mu|\le2\sigma)$.`, h: [R`$P(-2\le Z\le2) = 2\Phi(2) - 1$.`], a: '0.9544', s: R`$2(0.9772) - 1 = 0.9544$. Roughly 95% of a normal lies within 2 standard deviations of the mean.` }),
P({ k: 'i', lvl: 2, q: R`$X\sim N(1,1)$ and $Y\sim N(2,3)$ independent. Find $P(X + Y\le3)$.`, h: [R`$X+Y\sim N(3,4)$.`], a: '1/2', s: R`$X+Y\sim N(3,4)$, and 3 is its mean, so the probability is $\frac12$.` }),
THM('Central limit theorem (informal, slides)', R`If $X_1,X_2,\dots$ are iid with mean $\mu$ and variance $\sigma^2$, then for large $n$, $\sum_{i=1}^nX_i\approx N(n\mu, n\sigma^2)$. (Made precise in Ch.5, after the midterm.)`),
P({ k: 'j', lvl: 2, q: R`$S$ is the sum of 100 iid variables with mean 1 and variance 1. Approximate $P(S\le110)$ with $\Phi(1) = 0.8413$.`, h: [R`$S\approx N(100,100)$.`], a: '0.8413', s: R`$P\left(Z\le\frac{110-100}{10}\right) = \Phi(1)\approx0.8413$.` }),
DEF(R`Student $t_\nu$, Cauchy, $\chi^2_p$`, R`**$t_\nu$:** $f(x) = \frac{\Gamma(\frac{\nu+1}2)}{\sqrt{\nu\pi}\Gamma(\frac\nu2)}\left(1+\frac{x^2}\nu\right)^{-(\nu+1)/2}$. Symmetric, with heavier tails than the normal. As $\nu\to\infty$ it tends to $N(0,1)$. With $\nu = 1$ it is the **Cauchy**: $f(x) = \frac1{\pi(1+x^2)}$.

**$\chi^2_p$:** $f(x) = \frac{1}{\Gamma(p/2)2^{p/2}}x^{p/2-1}e^{-x/2}$, $x>0$. This is $\operatorname{Gamma}(\frac p2, 2)$. If $Z_1,\dots,Z_p\iid N(0,1)$ then $\sum Z_i^2\sim\chi^2_p$.

**Pareto:** $f(x) = \alpha x^{-(\alpha+1)}$ for $x>1$, $P(X>x) = x^{-\alpha}$: a heavy tail.`),
P({ k: 'k', lvl: 2, q: R`$Z_1,Z_2\iid N(0,1)$. Find $P(Z_1^2+Z_2^2>2)$.`, h: [R`$\chi^2_2 = \operatorname{Gamma}(1,2) = \operatorname{Exp}(2)$.`], a: 'exp(-1)', s: R`$Z_1^2+Z_2^2\sim\chi^2_2 = \operatorname{Exp}(\beta = 2)$, so $P(>2) = e^{-2/2} = e^{-1}$.` }),
P({ k: 'l', lvl: 1, q: R`As $\nu\to\infty$, the $t_\nu$ distribution approaches which distribution?`, h: [R`$(1+x^2/\nu)^{-(\nu+1)/2}\to e^{-x^2/2}$.`], a: { choice: ['Cauchy', 'N(0,1)', 'χ²₁', 'Exp(1)'], v: 1 },
  s: R`$N(0,1)$, because $\left(1 + \frac{x^2}{\nu}\right)^{-(\nu+1)/2}\to e^{-x^2/2}$.` }),
]);

DRILLS('2.5', [
  { k: '01', lvl: 1, q: R`$X\sim\operatorname{Unif}(0,10)$. $P(3<X<7)$?`, h: [R`Length ratio.`], a: '0.4', s: R`$\frac4{10} = 0.4$.` },
  { k: '02', lvl: 1, q: R`$X\sim\operatorname{Exp}(\beta = 2)$. $P(X>1)$?`, h: [R`$e^{-x/\beta}$.`], a: 'exp(-1/2)', s: R`$e^{-1/2}\approx0.607$.` },
  { k: '03', lvl: 2, q: R`An exponential lifetime has $P(X>1) = \frac12$. Find $\beta$.`, h: [R`$e^{-1/\beta} = \frac12$.`], a: '1/log(2)', s: R`$\beta = \frac1{\log2}\approx1.443$.` },
  { k: '04', lvl: 1, q: R`$f(x) = c\,x^3e^{-x}$, $x>0$. Find $c$.`, h: [R`$\operatorname{Gamma}(4,1)$.`], a: '1/6', s: R`$c = \frac1{\Gamma(4)} = \frac16$.` },
  { k: '05', lvl: 2, q: R`Compute $\int_0^\infty x^2e^{-x/3}\dd x$.`, h: [R`$\beta^\alpha\Gamma(\alpha)$ with $\alpha = 3$, $\beta = 3$.`], a: '54', s: R`$27\cdot2 = 54$.` },
  { k: '06', lvl: 2, q: R`$f(x) = c\,x^2(1-x)$ on $(0,1)$. Find $c$.`, h: [R`$\operatorname{Beta}(3,2)$.`], a: '12', s: R`$\frac{\Gamma(5)}{\Gamma(3)\Gamma(2)} = \frac{24}{2} = 12$.` },
  { k: '07', lvl: 1, q: R`$X\sim N(100,225)$. With $\Phi(1) = 0.8413$, find $P(X>115)$.`, h: [R`$\sigma = 15$.`], a: '0.1587', s: R`$1 - \Phi(1) = 0.1587$.` },
  { k: '08', lvl: 1, q: R`$Z\sim N(0,1)$, $\Phi(1.96) = 0.975$. Find $P(-1.96<Z<1.96)$.`, h: [R`$2\Phi - 1$.`], a: '0.95', s: R`$0.95$.` },
  { k: '09', lvl: 2, q: R`$X,Y\iid N(0,1)$. With $\Phi(\sqrt2)\approx0.9214$, find $P(X - Y>2)$.`, h: [R`$X-Y\sim N(0,2)$.`], a: '0.0786', s: R`$P\left(Z>\frac{2}{\sqrt2}\right) = 1 - \Phi(\sqrt2)\approx0.0786$.` },
  { k: '10', lvl: 3, q: R`$X\sim\chi^2_4$. Find $P(X>4)$.`, h: [R`$\chi^2_4 = \operatorname{Gamma}(2,2)$, and $P(\operatorname{Gamma}(2,\beta)>x) = e^{-x/\beta}(1 + x/\beta)$.`], a: '3*exp(-2)', s: R`$e^{-2}(1+2) = 3e^{-2}\approx0.406$.` },
  { k: '11', lvl: 2, q: R`Compute $\int_{-\infty}^\infty e^{-x^2/8}\dd x$.`, h: [R`$\sigma^2 = 4$.`], a: '2*sqrt(2*pi)', s: R`$\sigma\sqrt{2\pi}$ with $\sigma = 2$: $2\sqrt{2\pi}\approx5.013$.` },
  { k: '12', lvl: 2, q: R`$S$ = sum of 48 iid $\operatorname{Unif}(0,1)$. With $\Phi(1) = 0.8413$, approximate $P(S>26)$.`, h: [R`Mean $24$, variance $48/12 = 4$.`], a: '0.1587', s: R`$S\approx N(24,4)$, so $P(S>26)\approx1 - \Phi(1) = 0.1587$.` },
  { k: '13', lvl: 2, q: R`Pareto: $P(X>x) = x^{-3}$ for $x>1$. Find $P(X>2)$ and the density at $x = 2$.`, h: [R`$f = 3x^{-4}$.`], a: [['$P(X>2)$', '1/8'], ['$f(2)$', '3/16']], s: R`$2^{-3} = \frac18$; $f(x) = 3x^{-4}$, so $f(2) = \frac3{16}$.` },
]);
