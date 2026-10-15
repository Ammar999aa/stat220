TOPIC({ id: '3.7', ch: 3, title: 'Moment generating functions', summary: 'ψ(t) = E(e^{tX}): moments from derivatives, sums of independent variables, identifying distributions; the CGF.' }, [
R`The **moment generating function (MGF)** packs *all* the moments of $X$ into one function. It is the tool behind Exercise 3 of the 2025 midterm (30 points): derive the MGF, use it to get the mean and variance, and identify the distribution of the sample mean.

Two superpowers make it worth learning:
<ol><li><b>Moments by differentiation</b>: no more integrals for $E(X^2)$, $E(X^3)$, …</li><li><b>Sums become products</b>: the MGF of a sum of independent variables is the product of the MGFs. Combined with <b>uniqueness</b>, this identifies the distribution of sums and averages in a few lines.</li></ol>`,
DEF('Moment generating function', R`$$\psi_X(t) = E\left(e^{tX}\right) = \int e^{tx}\dd F_X(x),$$
defined for $t$ in some open interval $(-\varepsilon,\varepsilon)$ around 0 where the expectation is finite. You compute it with the **rule of the lazy statistician**: $\int e^{tx}f_X(x)\dd x$ or $\sum_xe^{tx}f_X(x)$.`),
P({ k: 'a', lvl: 1, q: R`$X\sim\operatorname{Ber}(p)$. Find $\psi_X(t)$.`, h: [R`$E(e^{tX}) = e^{t\cdot0}(1-p) + e^{t\cdot1}p$.`],
  a: [[R`$\psi_X(t)$`, '1-p+p*exp(t)', { p: [0.1, 0.9], t: [-1, 1] }]],
  s: R`$\psi_X(t) = (1-p) + pe^t = 1 - p(1-e^t)$, for all $t\in\R$.` }),
P({ k: 'b', lvl: 4, q: R`(Midterm 2025, Ex.3(a), first half.) $X$ is exponential with CDF $F_X(x) = 1 - e^{-x/\beta}$, $x>0$. Derive $\psi_X(t)$ and state for which $t$ it exists.`,
  h: [R`$f_X(x) = \frac1\beta e^{-x/\beta}$. Combine exponents: $e^{tx}e^{-x/\beta} = e^{x(t-1/\beta)}$.`, R`The integral $\int_0^\infty e^{x(t - 1/\beta)}\dd x$ converges only if $t - 1/\beta < 0$.`],
  a: [[R`$\psi_X(t)$`, '1/(1-beta*t)', { beta: [0.5, 3], t: [-0.3, 0.15] }]],
  s: R`By the rule of the lazy statistician,
$$\psi_X(t) = E(e^{tX}) = \int_0^\infty e^{tx}\frac1\beta e^{-x/\beta}\dd x = \frac1\beta\int_0^\infty e^{x(t-1/\beta)}\dd x = \frac1\beta\left[\frac{e^{x(t-1/\beta)}}{t-\frac1\beta}\right]_0^{\infty}.$$
If $t<1/\beta$, the exponent is negative and the bracket at $\infty$ is 0:
$$\psi_X(t) = \frac1\beta\left[0 - \frac{1}{t-\frac1\beta}\right] = \frac{1}{1-\beta t} = (1-\beta t)^{-1},\qquad t<\frac1\beta.$$
(For $t\ge1/\beta$ the integral diverges.)`, src: 'Midterm 2025 Ex.3(a)' }),
P({ k: 'c', lvl: 2, q: R`$X\sim\operatorname{Poisson}(\lambda)$. Find $\psi_X(t)$.`, h: [R`$\sum_x e^{tx}\frac{e^{-\lambda}\lambda^x}{x!} = e^{-\lambda}\sum_x\frac{(\lambda e^t)^x}{x!}$.`],
  a: [[R`$\psi_X(t)$`, 'exp(lambda*(exp(t)-1))', { lambda: [0.5, 4], t: [-1, 1] }]],
  s: R`$\psi_X(t) = e^{-\lambda}\sum_{x\ge0}\frac{(\lambda e^t)^x}{x!} = e^{-\lambda}e^{\lambda e^t} = e^{\lambda(e^t-1)}$, all $t$.`, src: 'HW5 A3' }),
P({ k: 'd', lvl: 3, q: R`$X\sim N(\mu,\sigma^2)$. Find $\psi_X(t)$.`, h: [R`Write $X = \mu + \sigma Z$; then $\psi_X(t) = e^{\mu t}\psi_Z(\sigma t)$. So find $\psi_Z$ first.`, R`$tz - \frac{z^2}2 = -\frac12(z-t)^2 + \frac{t^2}2$.`],
  a: [[R`$\psi_X(t)$`, 'exp(mu*t+sigma^2*t^2/2)', { mu: [-2, 2], sigma: [0.5, 2], t: [-1, 1] }]],
  s: R`For $Z\sim N(0,1)$: $\psi_Z(t) = \int\frac{1}{\sqrt{2\pi}}e^{tz - z^2/2}\dd z = e^{t^2/2}\int\frac{1}{\sqrt{2\pi}}e^{-(z-t)^2/2}\dd z = e^{t^2/2}$, since the last integrand is the $N(t,1)$ density.

Then $\psi_X(t) = E(e^{t(\mu+\sigma Z)}) = e^{\mu t}\psi_Z(\sigma t) = \exp\left(\mu t + \frac{\sigma^2t^2}2\right)$.`, src: 'HW5 A3' }),
H('Moments from derivatives'),
THM('Moments', R`$$\psi_X(0) = 1,\qquad\psi_X'(0) = E(X),\qquad\psi_X''(0) = E(X^2),\qquad\psi_X^{(k)}(0) = E(X^k).$$
*Why:* $\frac{\mathrm d^k}{\mathrm dt^k}E(e^{tX}) = E(X^ke^{tX})$, which equals $E(X^k)$ at $t=0$.`),
P({ k: 'e', lvl: 2, q: R`From $\psi_X(t) = (1-\beta t)^{-1}$, compute $E(X)$, $E(X^2)$ and $\operatorname{var}(X)$; enter them for $\beta = 3$.`,
  h: [R`$\psi'(t) = \beta(1-\beta t)^{-2}$, $\psi''(t) = 2\beta^2(1-\beta t)^{-3}$.`],
  a: [['$E(X)$', '3'], ['$E(X^2)$', '18'], [R`$\operatorname{var}(X)$`, '9']],
  s: R`$\psi'(0) = \beta$, $\psi''(0) = 2\beta^2$, so $\operatorname{var}(X) = 2\beta^2 - \beta^2 = \beta^2$. With $\beta = 3$: $3$, $18$, $9$.` }),
P({ k: 'f', lvl: 2, q: R`A random variable has $\psi_X(t) = e^{2t+3t^2}$. Find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`Compare with the normal MGF $e^{\mu t+\sigma^2t^2/2}$, or differentiate.`],
  a: [['$E(X)$', '2'], [R`$\operatorname{var}(X)$`, '6']],
  s: R`Matching $\mu t + \frac{\sigma^2}{2}t^2$ gives $\mu = 2$ and $\sigma^2 = 6$, so $X\sim N(2,6)$. (By uniqueness: same MGF means same distribution.)` }),
DEF('Cumulant generating function (CGF)', R`$\varphi_X(t) = \log\psi_X(t)$. Then $\varphi_X(0) = 0$, $\varphi_X'(0) = E(X)$, $\varphi_X''(0) = \operatorname{var}(X)$. This is often quicker for the variance.

(Careful: in these slides $\varphi$ is the CGF, *not* the characteristic function.)`),
P({ k: 'g', lvl: 2, q: R`Use the CGF to find the mean and variance of $X\sim\operatorname{Poisson}(\lambda)$ (enter them as expressions in $\lambda$).`, h: [R`$\varphi(t) = \lambda(e^t-1)$.`],
  a: [['$E(X)$', 'lambda', { lambda: [0.5, 5] }], [R`$\operatorname{var}(X)$`, 'lambda', { lambda: [0.5, 5] }]],
  s: R`$\varphi(t) = \lambda(e^t-1)$, $\varphi'(t) = \lambda e^t$, $\varphi''(t) = \lambda e^t$. At $0$: mean $=\lambda$, variance $=\lambda$.` }),
H('Linear transformations and sums'),
THM('MGF of $aX+b$ and of independent sums', R`<ol><li>If $Y = aX+b$: $\psi_Y(t) = e^{bt}\psi_X(at)$.</li><li>If $X_1,\dots,X_n$ are <b>independent</b> and $Y = \sum_iX_i$: $\psi_Y(t) = \prod_{i=1}^n\psi_{X_i}(t)$.</li></ol>
*Proof of 2:* $E\left(e^{t\sum X_i}\right) = E\left(\prod e^{tX_i}\right) = \prod E\left(e^{tX_i}\right)$, using independence.`),
THM('Uniqueness', R`If $\psi_X(t) = \psi_Y(t)$ for all $t$ in an open interval around 0, then $X\overset{d}{=}Y$ (same distribution).

So to identify a distribution: compute its MGF, then **match it against the table** of known MGFs.`),
R`<table><tr><th>Distribution</th><th>$\psi_X(t)$</th></tr><tr><td>$\operatorname{Ber}(p)$</td><td>$1-p(1-e^t)$</td></tr><tr><td>$\operatorname{Bin}(n,p)$</td><td>$(1-p(1-e^t))^n$</td></tr><tr><td>$\operatorname{Poisson}(\lambda)$</td><td>$e^{\lambda(e^t-1)}$</td></tr><tr><td>$N(\mu,\sigma^2)$</td><td>$e^{\mu t+\sigma^2t^2/2}$</td></tr><tr><td>$\operatorname{Exp}(\beta)$</td><td>$(1-\beta t)^{-1},\ t<1/\beta$</td></tr><tr><td>$\operatorname{Gamma}(\alpha,\beta)$</td><td>$(1-\beta t)^{-\alpha},\ t<1/\beta$</td></tr><tr><td>$\chi^2_p$</td><td>$(1-2t)^{-p/2},\ t<1/2$</td></tr></table>`,
P({ k: 'h', lvl: 4, q: R`(Midterm 2025, Ex.3(a) second half.) $X_1,\dots,X_n\iid\operatorname{Exp}(\beta)$ and $\bar X_n = \frac1n\sum X_i$. Derive $\psi_{\bar X_n}(t)$, justifying each step.`,
  h: [R`$e^{t\bar X_n} = \prod_i e^{(t/n)X_i}$.`, R`Independence turns $E(\prod)$ into $\prod E$; identical distribution makes every factor $\psi_X(t/n)$.`],
  a: [[R`$\psi_{\bar X_n}(t)$`, '(1-beta*t/n)^(-n)', { beta: [0.5, 2], n: [2, 8, 'int'], t: [-0.2, 0.2] }]],
  s: R`$$\psi_{\bar X_n}(t) = E\left(e^{t\frac1n\sum_iX_i}\right) = E\left(\prod_{i=1}^ne^{\frac tnX_i}\right) \underset{X_i\text{ indep.}}{=} \prod_{i=1}^nE\left(e^{\frac tnX_i}\right) \underset{X_i\text{ ident. distr.}}{=} \left[\psi_X\!\left(\frac tn\right)\right]^n = \left(1 - \frac\beta nt\right)^{-n},$$
valid for $t<n/\beta$. In the exam, write the justifications under the equal signs as above.`, src: 'Midterm 2025 Ex.3(a)' }),
P({ k: 'i', lvl: 4, q: R`(Midterm 2025, Ex.3(b)–(c).) Using $\psi_{\bar X_n}(t) = (1-\frac\beta nt)^{-n}$: (b) deduce $E(\bar X_n)$ and $\operatorname{var}(\bar X_n)$; (c) show $\bar X_n$ is Gamma and give its parameters $(\alpha,\beta')$. Enter the parameters for $n = 5$, $\beta = 10$.`,
  h: [R`$\psi'(t) = \beta\left(1-\frac\beta nt\right)^{-n-1}$ and $\psi''(t) = \beta^2\frac{n+1}{n}\left(1-\frac\beta nt\right)^{-n-2}$.`, R`Match with $(1-\beta't)^{-\alpha}$.`],
  a: [[R`shape $\alpha$`, '5'], [R`scale $\beta'$`, '2']],
  s: R`**(b)** $\psi'_{\bar X_n}(0) = \frac{\beta n}{n}(1-0)^{-n-1} = \beta$, so $E(\bar X_n) = \beta$.
$\psi''_{\bar X_n}(0) = \beta^2\frac{n+1}{n}$, so $E(\bar X_n^2) = \beta^2\frac{n+1}n$ and
$$\operatorname{var}(\bar X_n) = \beta^2\frac{n+1}{n} - \beta^2 = \frac{\beta^2}{n}.$$
**(c)** $(1-\frac\beta nt)^{-n}$ is the MGF of a $\operatorname{Gamma}(\tilde\alpha,\tilde\beta)$ with $\tilde\alpha = n$ and $\tilde\beta = \beta/n$. By uniqueness of MGFs, $\bar X_n\sim\operatorname{Gamma}(n, \beta/n)$. With $n=5,\beta=10$: $\operatorname{Gamma}(5,2)$.`, src: 'Midterm 2025 Ex.3(b),(c)' }),
P({ k: 'j', lvl: 2, q: R`$X\sim\operatorname{Poisson}(\lambda)$, $Y\sim\operatorname{Poisson}(\mu)$ independent. Use MGFs to identify the distribution of $X+Y$. Enter $P(X+Y = 0)$ for $\lambda = 1$, $\mu = 2$.`, h: [R`Multiply the MGFs.`], a: 'exp(-3)',
  s: R`$\psi_{X+Y}(t) = e^{\lambda(e^t-1)}e^{\mu(e^t-1)} = e^{(\lambda+\mu)(e^t-1)}$, the $\operatorname{Poisson}(\lambda+\mu)$ MGF. By uniqueness $X+Y\sim\operatorname{Poisson}(\lambda+\mu)$, and $P(X+Y = 0) = e^{-3}$.` }),
P({ k: 'k', lvl: 2, q: R`$X\sim N(1,4)$ and $Y\sim N(2,5)$ independent. Identify the distribution of $X+Y$: enter its mean and variance.`, h: [R`$e^{t+2t^2}\cdot e^{2t+2.5t^2}$.`],
  a: [['mean', '3'], ['variance', '9']], s: R`$\psi_{X+Y}(t) = e^{3t + \frac92t^2}$, the $N(3,9)$ MGF.` }),
P({ k: 'l', lvl: 3, q: R`$X_1,\dots,X_n\iid\operatorname{Exp}(\beta)$. Prove $\sum_iX_i\sim\operatorname{Gamma}(n,\beta)$. Then, for independent $X\sim\operatorname{Gamma}(\alpha_1,\beta)$ and $Y\sim\operatorname{Gamma}(\alpha_2,\beta)$, identify $X+Y$; enter its shape for $\alpha_1 = 2.5$, $\alpha_2 = 1.5$.`,
  h: [R`$\prod(1-\beta t)^{-1} = (1-\beta t)^{-n}$.`],
  a: '4',
  s: R`$\psi_{\sum X_i}(t) = \prod_{i=1}^n(1-\beta t)^{-1} = (1-\beta t)^{-n}$ for $t<1/\beta$, the $\operatorname{Gamma}(n,\beta)$ MGF. Same idea: $(1-\beta t)^{-\alpha_1}(1-\beta t)^{-\alpha_2} = (1-\beta t)^{-(\alpha_1+\alpha_2)}$, so $X+Y\sim\operatorname{Gamma}(\alpha_1+\alpha_2,\beta)$, shape $4$. Gammas with the **same scale** add their shapes.`, src: 'HW5 B2 (Wasserman 3.8.24)' }),
P({ k: 'm', lvl: 3, q: R`$X$ has MGF $\psi(t) = (1-2t)^{-r/2}\exp\left(\frac{t\theta}{1-2t}\right)$, $t<\tfrac12$ (noncentral $\chi^2$). Find $E(X)$ and $\operatorname{var}(X)$ for $r = 3$, $\theta = 2$.`,
  h: [R`Use the CGF: $\varphi(t) = -\frac r2\log(1-2t) + \frac{t\theta}{1-2t}$.`, R`$\varphi'(t) = \frac{r}{1-2t} + \frac{\theta}{(1-2t)^2}$.`],
  a: [['$E(X)$', '5'], [R`$\operatorname{var}(X)$`, '14']],
  s: R`$\varphi'(t) = \frac{r}{1-2t} + \frac{\theta(1-2t)+2t\theta}{(1-2t)^2} = \frac{r}{1-2t} + \frac{\theta}{(1-2t)^2}$, so $E(X) = \varphi'(0) = r+\theta$.
$\varphi''(t) = \frac{2r}{(1-2t)^2} + \frac{4\theta}{(1-2t)^3}$, so $\operatorname{var}(X) = 2r+4\theta$.
With $r=3$, $\theta=2$: mean $5$, variance $14$.`, src: 'HW5 B3(a)' }),
P({ k: 'n', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$ and $Y = 2X+3$. Find $\psi_Y(t)$.`, h: [R`$e^{bt}\psi_X(at)$.`],
  a: [[R`$\psi_Y(t)$`, 'exp(3*t)/(1-2*t)', { t: [-0.4, 0.4] }]], s: R`$\psi_Y(t) = e^{3t}\psi_X(2t) = \frac{e^{3t}}{1-2t}$ for $t<\tfrac12$.` }),
]);

DRILLS('3.7', [
  { k: '01', lvl: 2, q: R`$\psi_X(t) = (0.4 + 0.6e^t)^5$. Find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`Match the binomial MGF $(1-p+pe^t)^n$.`], a: [['$E(X)$', '3'], [R`$\operatorname{var}(X)$`, '1.2']],
    s: R`$X\sim\operatorname{Bin}(5,0.6)$: $E = 3$, $\operatorname{var} = 5\cdot0.6\cdot0.4 = 1.2$.` },
  { k: '02', lvl: 1, q: R`$\psi_X(t) = e^{3(e^t-1)}$. Find $P(X=0)$.`, h: [R`Poisson(3).`], a: 'exp(-3)', s: R`$X\sim\operatorname{Poisson}(3)$, so $P(X=0) = e^{-3}$.` },
  { k: '03', lvl: 2, q: R`$\psi_X(t) = (1-2t)^{-3}$, $t<\tfrac12$. Find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`$\operatorname{Gamma}(\alpha=3,\beta=2)$.`], a: [['$E(X)$', '6'], [R`$\operatorname{var}(X)$`, '12']],
    s: R`$\operatorname{Gamma}(3,2)$: mean $\alpha\beta = 6$, variance $\alpha\beta^2 = 12$. (Also $\chi^2_6$.)` },
  { k: '04', lvl: 1, q: R`$\psi_X(t) = e^{-t+2t^2}$. Find $E(X)$ and $\operatorname{var}(X)$.`, h: [R`$\mu t + \frac{\sigma^2}2t^2$.`], a: [['$E(X)$', '-1'], [R`$\operatorname{var}(X)$`, '4']], s: R`$N(-1,4)$.` },
  { k: '05', lvl: 2, q: R`$\psi_X(t) = (1-t)^{-2}$. Compute $E(X^2)$ by differentiating twice.`, h: [R`$\psi''(t) = 6(1-t)^{-4}$.`], a: '6',
    s: R`$\psi'(t) = 2(1-t)^{-3}$, $\psi''(t) = 6(1-t)^{-4}$, so $E(X^2) = 6$. (Check: $\operatorname{Gamma}(2,1)$ has $\operatorname{var}+\text{mean}^2 = 2 + 4 = 6$ ✓.)` },
  { k: '06', lvl: 1, q: R`$X_1,\dots,X_4\iid\operatorname{Ber}(\tfrac12)$. Find the MGF of $S = \sum X_i$.`, h: [R`Product of identical MGFs.`], a: [[R`$\psi_S(t)$`, '(1/2+exp(t)/2)^4', { t: [-1, 1] }]],
    s: R`$\psi_S(t) = \left(\tfrac12 + \tfrac12e^t\right)^4$, the $\operatorname{Bin}(4,\tfrac12)$ MGF.` },
  { k: '07', lvl: 2, q: R`$X\sim N(0,1)$ and $Y = 3X - 1$. Find $\psi_Y(t)$.`, h: [R`$e^{-t}\psi_X(3t)$.`], a: [[R`$\psi_Y(t)$`, 'exp(-t+9*t^2/2)', { t: [-1, 1] }]], s: R`$e^{-t}e^{9t^2/2}$, i.e. $N(-1,9)$.` },
  { k: '08', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$. Find $\psi_X(t)$ for $t\ne0$.`, h: [R`$\int_0^1e^{tx}\dd x$.`], a: [[R`$\psi_X(t)$`, '(exp(t)-1)/t', { t: [0.1, 2] }]],
    s: R`$\psi_X(t) = \frac{e^t-1}{t}$ for $t\ne0$, and $\psi_X(0) = 1$.` },
  { k: '09', lvl: 2, q: R`$X_1,X_2,X_3\iid\operatorname{Exp}(2)$. $S = X_1+X_2+X_3\sim\operatorname{Gamma}(\alpha,\beta)$. Enter $\alpha$ and $\beta$.`, h: [R`$(1-2t)^{-3}$.`], a: [[R`$\alpha$`, '3'], [R`$\beta$`, '2']], s: R`$\psi_S(t) = (1-2t)^{-3}$: $\operatorname{Gamma}(3,2)$.` },
  { k: '10', lvl: 2, q: R`$X_1,\dots,X_4\iid\operatorname{Exp}(\beta = 8)$. $\bar X\sim\operatorname{Gamma}(\alpha,\beta')$. Find $\alpha$, $\beta'$ and $\operatorname{var}(\bar X)$.`, h: [R`$\operatorname{Gamma}(n,\beta/n)$.`],
    a: [[R`$\alpha$`, '4'], [R`$\beta'$`, '2'], ['variance', '16']], s: R`$\bar X\sim\operatorname{Gamma}(4,2)$, so $\operatorname{var}(\bar X) = 4\cdot2^2 = 16 = \beta^2/n$ ✓.` },
  { k: '11', lvl: 2, q: R`Find the CGF $\varphi(t)$ of $N(\mu,\sigma^2)$ and $\varphi''(0)$.`, h: [R`$\log$ of the MGF.`], a: [[R`$\varphi(t)$`, 'mu*t+sigma^2*t^2/2', { mu: [-2, 2], sigma: [0.5, 2], t: [-1, 1] }]],
    s: R`$\varphi(t) = \mu t + \frac{\sigma^2t^2}{2}$, a quadratic. So $\varphi''(0) = \sigma^2$, and all higher cumulants are 0.` },
  { k: '12', lvl: 1, q: R`$X\sim\operatorname{Poisson}(2)$ and $Y\sim\operatorname{Poisson}(3)$ independent. Find $P(X+Y=0)$.`, h: [R`$X+Y\sim\operatorname{Poisson}(5)$.`], a: 'exp(-5)', s: R`$e^{-5}$.` },
  { k: '13', lvl: 2, q: R`Using $\chi^2_p = \operatorname{Gamma}(p/2,2)$, find the mean and variance of $\chi^2_5$.`, h: [R`$\alpha\beta$ and $\alpha\beta^2$.`], a: [['mean', '5'], ['variance', '10']], s: R`$\frac52\cdot2 = 5$ and $\frac52\cdot4 = 10$.` },
  { k: '14', lvl: 3, q: R`$X\sim\operatorname{Geom}(p)$, $P(X=k) = (1-p)^{k-1}p$, $k\ge1$. Find $\psi_X(t)$ for $t<-\log(1-p)$; enter it for $p = \tfrac13$.`,
    h: [R`$\sum_{k\ge1}e^{tk}(1-p)^{k-1}p = pe^t\sum_{j\ge0}[(1-p)e^t]^j$.`], a: [[R`$\psi_X(t)$`, '(1/3)*exp(t)/(1-(2/3)*exp(t))', { t: [-0.3, 0.3] }]],
    s: R`Geometric series with ratio $(1-p)e^t<1$: $\psi_X(t) = \frac{pe^t}{1-(1-p)e^t}$. Differentiating at 0 gives $E(X) = 1/p$.` },
  { k: '15', lvl: 4, q: R`$X_1,\dots,X_n\iid\operatorname{Gamma}(\alpha,\beta)$. Show $\bar X_n\sim\operatorname{Gamma}(n\alpha,\beta/n)$. Enter the parameters for $n = 5$, $\alpha = 2$, $\beta = 1$.`,
    h: [R`$\psi_{\bar X}(t) = [\psi_X(t/n)]^n = (1-\beta t/n)^{-n\alpha}$.`], a: [['shape', '10'], ['scale', '0.2']],
    s: R`$\psi_{\bar X_n}(t) = \prod_i\psi_{X_i}(t/n) = \left(1-\frac\beta nt\right)^{-n\alpha}$, the $\operatorname{Gamma}(n\alpha,\beta/n)$ MGF. Here $\operatorname{Gamma}(10, 0.2)$.` },
  { k: '16', lvl: 2, q: R`Does the standard Cauchy distribution have an MGF (finite in a neighbourhood of 0)?`, h: [R`Its mean is not even defined.`], a: { choice: ['Yes', 'No'], v: 1 },
    s: R`No. For any $t\ne0$, $E(e^{tX}) = \infty$ because $e^{tx}$ grows exponentially in one tail while the density only decays like $1/x^2$. A finite MGF near 0 would imply that all moments exist.` },
]);
