HW({ id: 'hw5', title: 'Homework 5', summary: 'Conditional expectation, MGFs (Ch.3).',
  intro: R`Topics: Chapter 3, second half. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', ref: 't3.6-f' },
  { k: 'A2', ref: 't3.6-k' },
  { k: 'A3 (Poisson)', ref: 't3.7-c' },
  { k: 'A3 (Normal)', ref: 't3.7-d' },
  { k: 'A3 (Gamma)', topic: '3.7', lvl: 2, q: R`$X\sim\operatorname{Gamma}(\alpha,\beta)$ (scale $\beta$). Find $\psi_X(t)$.`,
    h: [R`$\psi(t) = \frac{1}{\beta^\alpha\Gamma(\alpha)}\int_0^\infty x^{\alpha-1}e^{-x(1/\beta - t)}\dd x$.`, R`Gamma integral with new scale $\tilde\beta = \frac{\beta}{1-\beta t}$ (need $t<1/\beta$).`],
    a: [[R`$\psi_X(t)$`, '(1-beta*t)^(-alpha)', { alpha: [0.5, 4], beta: [0.5, 2], t: [-0.3, 0.2] }]],
    s: R`For $t<1/\beta$, set $\frac1{\tilde\beta} = \frac1\beta - t$, i.e. $\tilde\beta = \frac{\beta}{1-\beta t}$:
$$\psi_X(t) = \frac{1}{\beta^\alpha\Gamma(\alpha)}\int_0^\infty x^{\alpha-1}e^{-x/\tilde\beta}\dd x = \frac{\tilde\beta^\alpha\Gamma(\alpha)}{\beta^\alpha\Gamma(\alpha)} = (1-\beta t)^{-\alpha}.$$`, src: 'HW5 A3' },
  { k: 'B1', topic: '3.6', lvl: 4, q: R`Prove: (i) $E(X) = E[E(X\mid Y)]$; (ii) $\operatorname{var}(X) = E[\operatorname{var}(X\mid Y)] + \operatorname{var}[E(X\mid Y)]$; (iii) $\operatorname{cov}(X,Y) = E[\operatorname{cov}(X,Y\mid Z)] + \operatorname{cov}\big(E(X\mid Z),E(Y\mid Z)\big)$.`,
    h: [R`(i) Write $E[E(X|Y)] = \int\left(\int xf_{X|Y}(x|y)\dd x\right)f_Y(y)\dd y$ and use Fubini.`, R`(ii) $\operatorname{var}(X|Y) = E(X^2|Y) - E(X|Y)^2$; take expectations and use (i) twice.`, R`(iii) Same as (ii) with $\operatorname{cov}(X,Y|Z) = E(XY|Z) - E(X|Z)E(Y|Z)$.`],
    s: R`**(i)** $E[E(X|Y)] = \int\int xf_{X|Y}(x|y)\dd x\,f_Y(y)\dd y = \iint x f_{X,Y}(x,y)\dd x\dd y = E(X)$.

**(ii)** $E[\operatorname{var}(X|Y)] = E[E(X^2|Y)] - E[E(X|Y)^2] = E(X^2) - E[E(X|Y)^2]$. Also $\operatorname{var}[E(X|Y)] = E[E(X|Y)^2] - (E[E(X|Y)])^2 = E[E(X|Y)^2] - E(X)^2$. Adding: $E(X^2) - E(X)^2 = \operatorname{var}(X)$.

**(iii)** $E[\operatorname{cov}(X,Y|Z)] = E(XY) - E[E(X|Z)E(Y|Z)]$ and $\operatorname{cov}(E(X|Z),E(Y|Z)) = E[E(X|Z)E(Y|Z)] - E(X)E(Y)$. Adding gives $E(XY) - E(X)E(Y) = \operatorname{cov}(X,Y)$. $\blacksquare$`, src: 'HW5 B1' },
  { k: 'B2', ref: 't3.7-l' },
  { k: 'B3 (a)', ref: 't3.7-m' },
  { k: 'B3 (b)–(c)', topic: '3.7', lvl: 4, q: R`Noncentral $\chi^2$: $\chi^2(r,\theta)$ has MGF $(1-2t)^{-r/2}\exp\left(\frac{t\theta}{1-2t}\right)$.

(b) If $X_i\sim N(\mu_i,\sigma^2)$ independent, show $\sum_{i=1}^nX_i^2/\sigma^2\sim\chi^2\left(n, \sum\mu_i^2/\sigma^2\right)$.

(c) Show a sum of independent $\chi^2(r_i,\theta_i)$ is $\chi^2(\sum r_i,\sum\theta_i)$. Enter the parameters of $\chi^2(2,1) + \chi^2(3,4)$.`,
    h: [R`(b) Compute $E\left(e^{tX_i^2/\sigma^2}\right)$ with $X_i = \mu_i + \sigma Z$; complete the square in the Gaussian integral.`, R`You should get $(1-2t)^{-1/2}\exp\left(\frac{t\mu_i^2/\sigma^2}{1-2t}\right)$; then multiply over $i$.`, R`(c) Multiply MGFs: exponents and powers add.`],
    a: [['$r$', '5'], [R`$\theta$`, '5']],
    s: R`**(b)** With $m = \mu_i/\sigma$ and $Z\sim N(0,1)$: $X_i^2/\sigma^2 = (m+Z)^2$. For $t<\frac12$:
$$E\left(e^{t(m+z)^2}\right) = \int\frac{1}{\sqrt{2\pi}}e^{t(m+z)^2 - z^2/2}\dd z.$$
Completing the square in $z$ gives $(1-2t)^{-1/2}\exp\left(\frac{tm^2}{1-2t}\right)$. By independence the MGF of the sum is the product:
$$(1-2t)^{-n/2}\exp\left(\frac{t\sum_i\mu_i^2/\sigma^2}{1-2t}\right),$$
the $\chi^2(n,\sum\mu_i^2/\sigma^2)$ MGF. Uniqueness finishes the proof.

**(c)** $\prod_i(1-2t)^{-r_i/2}e^{t\theta_i/(1-2t)} = (1-2t)^{-\sum r_i/2}e^{t\sum\theta_i/(1-2t)}$. So $\chi^2(2,1)+\chi^2(3,4)\sim\chi^2(5,5)$.`, src: 'HW5 B3(b),(c)' },
  { k: 'C1', topic: '3.6', lvl: 4, q: R`$X\sim\operatorname{Exp}$ with **rate** $\lambda$, $Y\sim\operatorname{Exp}$ with rate $\mu$, independent, $\lambda>\mu$, $c>0$.
(a) Show $f_{X|X+Y}(x|c) = \frac{(\lambda-\mu)e^{-(\lambda-\mu)x}}{1-e^{-(\lambda-\mu)c}}$, $0<x<c$.
(b) Find $E[X\mid X+Y=c]$. (c) Find $E[Y\mid X+Y=c]$. (d) If $\lambda = \mu$, find $E[X^2\mid X+Y=c]$.
Enter (b) and (c) for $\lambda = 2$, $\mu = 1$, $c = 1$, and (d) for $c = 3$.`,
    h: [R`Joint of $(X, S = X+Y)$: $f_{X,S}(x,s) = f_X(x)f_Y(s-x) = \lambda\mu e^{-\lambda x}e^{-\mu(s-x)}$ for $0<x<s$ (Jacobian 1).`, R`As a function of $x$ this is $\propto e^{-(\lambda-\mu)x}$ on $(0,c)$; normalize.`, R`(c) $E[Y|S=c] = c - E[X|S=c]$. (d) When $\lambda = \mu$ the conditional is $\operatorname{Unif}(0,c)$.`],
    a: [['(b)', '1-1/(e-1)'], ['(c)', '1/(e-1)'], ['(d)', '3']],
    s: R`**(a)** The map $(x,y)\mapsto(x,s = x+y)$ has Jacobian 1, so $f_{X,S}(x,s) = \lambda e^{-\lambda x}\mu e^{-\mu(s-x)}$ for $0<x<s$. For fixed $s = c$ this is proportional to $e^{-(\lambda-\mu)x}$ on $(0,c)$. Normalizing with $\int_0^ce^{-ax}\dd x = \frac{1-e^{-ac}}{a}$, $a = \lambda-\mu$, gives the stated density.

**(b)** $E[X|S=c] = \frac{a}{1-e^{-ac}}\int_0^cxe^{-ax}\dd x = \frac1a - \frac{c}{e^{ac}-1}$.

**(c)** $E[Y|S=c] = c - E[X|S=c] = \frac{c}{1-e^{-ac}} - \frac1a$.

**(d)** If $\lambda = \mu$, the conditional density is constant: $X\mid S=c\sim\operatorname{Unif}(0,c)$, so $E[X^2|S=c] = \frac{c^2}{3}$.

Numbers ($a = c = 1$): (b) $1 - \frac1{e-1}\approx0.418$, (c) $\frac{1}{e-1}\approx0.582$ (they sum to $c = 1$ ✓), (d) $\frac93 = 3$.`, src: 'HW5 C1' },
  { k: 'C2', topic: '3.6', lvl: 3, q: R`Prove $E[\operatorname{var}(Y\mid X)] = \operatorname{var}\big(Y - E[Y\mid X]\big) = E\left[\big(Y - E[Y\mid X]\big)^2\right]$.`,
    h: [R`Let $W = Y - E[Y|X]$. Then $E[W|X] = 0$, so $E(W) = 0$.`, R`Apply the law of total variance to $W$.`],
    s: R`Let $W = Y - E[Y|X]$. Then $E[W\mid X] = E[Y|X] - E[Y|X] = 0$, so $E(W) = 0$ and $\operatorname{var}(W) = E(W^2)$, which is the second equality. Given $X$, $W$ is $Y$ minus a constant, so $\operatorname{var}(W|X) = \operatorname{var}(Y|X)$. By the law of total variance:
$$\operatorname{var}(W) = E[\operatorname{var}(W|X)] + \operatorname{var}(E[W|X]) = E[\operatorname{var}(Y|X)] + 0.\ \blacksquare$$`, src: 'HW5 C2' },
]);
