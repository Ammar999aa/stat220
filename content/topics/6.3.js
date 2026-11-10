TOPIC({ id: '6.3', ch: 6, title: 'Consistency', summary: 'θ̂ₙ → θ in probability. Prove it with the LLN, with MSE → 0, or with the continuous mapping theorem.' }, [
R`Unbiasedness asks whether an estimator is right **on average** for a fixed $n$. Consistency asks a different question: as you collect more and more data, does the estimator **close in on the truth**? You want this from any sensible estimator, and on the exam you will usually prove it in one of three ways: the law of large numbers, $\operatorname{MSE}\to0$, or the continuous mapping theorem.`,
DEF('Consistent estimator', R`An estimator $\hat\theta_n = g(X_1,\dots,X_n)$ of $\theta$ is **consistent** if
$$\hat\theta_n\xrightarrow{P}\theta\quad\text{as } n\to\infty,\qquad\text{i.e.}\quad P\big(|\hat\theta_n - \theta|>\varepsilon\big)\to0\ \text{ for every }\varepsilon>0.$$`),
P({ k: 'a', lvl: 1, q: R`$X_1,\dots,X_n\iid F$ with mean $\mu$ and finite variance. Is $\bar X_n$ a consistent estimator of $\mu$?`, h: [R`The weak law of large numbers says exactly what happens to $\bar X_n$.`], a: { choice: ['Yes', 'No'], v: 0 },
  s: R`Yes. By the weak law of large numbers, $\bar X_n\xrightarrow{P}\mu$, which is the definition of consistency.`, src: 'Slides Ch.6' }),
H('Biased ≠ inconsistent'),
R`The slides compare four estimators of the mean $\mu = E(X_1)$, with $\var(X_1)<\infty$. Bias is computed with linearity of expectation; consistency with the LLN ($\frac1n\sum X_i\xrightarrow{P}\mu$).
<table><tr><th>Estimator</th><th>$E(\hat\theta_n)$</th><th>Bias</th><th>Limit in probability</th></tr>
<tr><td>$\hat\theta^1_n = \frac1n\sum X_i$</td><td>$\mu$</td><td>unbiased</td><td>$\mu$: consistent</td></tr>
<tr><td>$\hat\theta^2_n = \frac1n\left(1 + \sum X_i\right)$</td><td>$\mu + \frac1n$</td><td>biased</td><td>$0 + \mu$: consistent</td></tr>
<tr><td>$\hat\theta^3_n = \frac1n\sum(X_i+1)$</td><td>$\mu + 1$</td><td>biased</td><td>$1 + \mu$: inconsistent</td></tr>
<tr><td>$\hat\theta^4_n = X_1$</td><td>$\mu$</td><td>unbiased</td><td>does not move with $n$: inconsistent</td></tr></table>
So all four combinations occur. **A consistent estimator can be biased** (as long as the bias dies out), and an unbiased one can be inconsistent (it never uses the extra data).`,
P({ k: 'b', lvl: 2, q: R`For $\hat\theta^2_n = \frac1n\left(1 + \sum_{i=1}^nX_i\right)$, give the bias as a function of $n$.`, h: [R`$E(\hat\theta_n^2) = \frac1n\big(1 + n\mu\big)$.`], a: [[R`$\operatorname{bias}(\hat\theta^2_n)$`, '1/n', { n: [1, 50, 'int'] }]],
  s: R`$E(\hat\theta^2_n) = \frac1n + \frac1n\sum E(X_i) = \frac1n + \mu$, so $\operatorname{bias} = \frac1n$. It goes to 0, which is why this biased estimator is still consistent.`, src: 'Slides Ch.6' }),
P({ k: 'c', lvl: 2, q: R`For $\hat\theta^3_n = \frac1n\sum_{i=1}^n(X_i + 1)$: (a) what does it converge to in probability? (b) Is $\hat\theta^4_n = X_1$ consistent?`, h: [R`Split $\hat\theta^3_n = 1 + \bar X_n$ and apply the LLN.`, R`$X_1$ has the same distribution for every $n$: $P(|X_1 - \mu|>\varepsilon)$ is a fixed positive number (unless $X_1$ is constant).`],
  a: [[R`(a) limit`, 'mu+1', { mu: [-3, 3] }], [R`(b) $X_1$ consistent?`, { choice: ['Yes', 'No'], v: 1 }]],
  s: R`(a) $\hat\theta^3_n = 1 + \bar X_n\xrightarrow{P}1 + \mu\ne\mu$: inconsistent.

(b) $P(|X_1 - \mu|>\varepsilon)$ does not depend on $n$, so it does not tend to 0 (for a non-degenerate $F$). $X_1$ is unbiased but **inconsistent**: it throws away $X_2,\dots,X_n$.`, src: 'Slides Ch.6' }),
H('MSE → 0 implies consistency'),
THM('Sufficient condition for consistency', R`If $\operatorname{MSE}(\hat\theta_n) = E\big[(\hat\theta_n - \theta)^2\big]\to0$, then $\hat\theta_n$ is consistent. Since $\operatorname{MSE} = \operatorname{bias}^2 + \var$, the following is equivalent and usually easier to check:
$$\operatorname{bias}(\hat\theta_n)\to0\quad\text{and}\quad\var(\hat\theta_n)\to0\quad\Longrightarrow\quad\hat\theta_n\xrightarrow{P}\theta.$$`),
R`**Proof.** $\operatorname{MSE}\to0$ means $\hat\theta_n\xrightarrow{2}\theta$ (convergence in quadratic mean), and quadratic-mean convergence implies convergence in probability. Concretely, by Markov's inequality applied to $(\hat\theta_n - \theta)^2$:
$$P(|\hat\theta_n - \theta|>\varepsilon) = P\big((\hat\theta_n - \theta)^2>\varepsilon^2\big)\le\frac{E(\hat\theta_n - \theta)^2}{\varepsilon^2} = \frac{\operatorname{MSE}(\hat\theta_n)}{\varepsilon^2}\to0.\ \blacksquare$$`,
P({ k: 'd', lvl: 1, q: R`$X_i\iid\Ber(0.3)$, $n = 100$, $\hat p = \bar X_n$. Use $P(|\hat p - p|>\varepsilon)\le\operatorname{MSE}/\varepsilon^2$ with $\varepsilon = 0.1$.`, h: [R`$\hat p$ is unbiased, so $\operatorname{MSE} = \var(\hat p) = \frac{p(1-p)}{n}$.`], a: '0.21',
  s: R`$\operatorname{MSE} = \frac{0.3\cdot0.7}{100} = 0.0021$, so the bound is $\frac{0.0021}{0.01} = 0.21$.` }),
P({ k: 'e', lvl: 2, q: R`$X_i$ iid with mean $\mu$ and variance $\sigma^2$. Consider the "shrunk" mean $\hat\theta_n = \frac{1}{n+2}\sum_{i=1}^nX_i$. Find its bias and variance. Is it consistent?`, h: [R`$E(\hat\theta_n) = \frac{n\mu}{n+2}$ and $\var(\hat\theta_n) = \frac{n\sigma^2}{(n+2)^2}$.`, R`Both the bias and the variance tend to 0.`],
  a: [[R`bias`, '-2*mu/(n+2)', { mu: [-3, 3], n: [1, 40, 'int'] }], [R`variance`, 'n*sigma^2/(n+2)^2', { sigma: [0.5, 3], n: [1, 40, 'int'] }], [R`consistent?`, { choice: ['Yes', 'No'], v: 0 }]],
  s: R`$E(\hat\theta_n) = \frac{n\mu}{n+2}$, so $\operatorname{bias} = \frac{n\mu}{n+2} - \mu = -\frac{2\mu}{n+2}$.

By independence, $\var(\hat\theta_n) = \frac{1}{(n+2)^2}\cdot n\sigma^2$.

Both $\to0$, so $\operatorname{MSE} = \frac{4\mu^2 + n\sigma^2}{(n+2)^2}\to0$ and $\hat\theta_n$ is **consistent** (though biased for every $n$).` }),
WARN('The converse is false', R`Consistency does **not** require $\operatorname{MSE}\to0$. Example: $\hat\theta_n = \bar X_n$ with probability $1 - \frac1n$ and $\hat\theta_n = n^2$ with probability $\frac1n$. Then $P(\hat\theta_n\ne\bar X_n) = \frac1n\to0$, so $\hat\theta_n\xrightarrow{P}\mu$, but the rare huge value makes the MSE blow up (same mechanism as HW7 A3).`),
H('Plug-in estimators and the continuous mapping theorem'),
THM('Continuous mapping theorem', R`If $\hat\theta_n\xrightarrow{P}\theta$ and $g$ is continuous at $\theta$, then $g(\hat\theta_n)\xrightarrow{P}g(\theta)$.`),
R`So once you have a consistent $\hat\theta_n$, **any continuous function of it is consistent for the same function of $\theta$**. But bias does not survive: $E[g(\hat\theta_n)]\ne g(E\hat\theta_n)$ unless $g$ is linear.

*Slide example.* $X_i\iid\Ber(p)$ and $\psi = \operatorname{logit}(p) = \log\frac{p}{1-p}$. Then $\hat p_n = \bar X_n\xrightarrow{P}p$ (consistent and unbiased) and
$$\hat\psi_n = \log\frac{\hat p_n}{1-\hat p_n}\xrightarrow{P}\log\frac p{1-p} = \psi$$
by continuous mapping, so $\hat\psi_n$ is consistent. Yet $E(\hat\psi_n)\ne\psi$ because logit is not linear: $\hat\psi_n$ is **biased**.`,
P({ k: 'f', lvl: 2, q: R`$X_i\iid\Ber(p)$. To estimate $p^2$ you use $\bar X_n^2$. (a) Is it consistent? (b) Find its bias.`, h: [R`(a) $x\mapsto x^2$ is continuous.`, R`(b) $E(\bar X_n^2) = \var(\bar X_n) + (E\bar X_n)^2$.`],
  a: [[R`(a) consistent?`, { choice: ['Yes', 'No'], v: 0 }], [R`(b) bias`, 'p*(1-p)/n', { p: [0.1, 0.9], n: [1, 50, 'int'] }]],
  s: R`(a) $\bar X_n\xrightarrow{P}p$ (LLN) and $x^2$ is continuous, so $\bar X_n^2\xrightarrow{P}p^2$: consistent.

(b) $E(\bar X_n^2) = \frac{p(1-p)}{n} + p^2$, so the bias is $\frac{p(1-p)}{n}>0$. It vanishes as $n\to\infty$, as it must.` }),
EX('Slide example: estimating the rate of an exponential', R`$X_i\iid\Exp(\beta)$ with $\beta = \frac1\lambda$, so $E(X_1) = \beta = \frac1\lambda$. Three candidate estimators of $\lambda$:
<ul><li>$\hat\lambda^1 = \frac1{X_1}$: uses one observation, so it is **inconsistent** (its distribution never changes with $n$). Worse, $E\left(\frac1{X_1}\right) = \int_0^\infty\frac1x\cdot\frac1\beta e^{-x/\beta}\dd x = \infty$ (the integrand behaves like $\frac1{\beta x}$ near 0).</li>
<li>$\hat\lambda^2_n = \frac1{\bar X_n}$: $\bar X_n\xrightarrow{P}\beta$ and $x\mapsto\frac1x$ is continuous at $\beta>0$, so $\hat\lambda^2_n\xrightarrow{P}\frac1\beta = \lambda$: **consistent**.</li>
<li>$\hat\lambda^3_n = \frac1n\sum\frac1{X_i}$: the LLN needs $E\left(\frac1{X_1}\right)<\infty$, which fails. In fact the average of iid non-negative variables with infinite mean goes to $+\infty$: **inconsistent**.</li></ul>`),
P({ k: 'g', lvl: 3, q: R`Continue the example: $\hat\lambda^2_n = 1/\bar X_n$. Using $\bar X_n\sim\Gam(n, \beta/n)$, find $E(1/\bar X_n)$ for $n\ge2$ and hence the bias of $\hat\lambda^2_n$ in terms of $\lambda$ and $n$.`, h: [R`For $Y\sim\Gam(\alpha, b)$ (scale $b$): $E(1/Y) = \int_0^\infty\frac1y\frac{y^{\alpha-1}e^{-y/b}}{b^\alpha\Gamma(\alpha)}\dd y = \frac{b^{\alpha-1}\Gamma(\alpha-1)}{b^\alpha\Gamma(\alpha)} = \frac{1}{b(\alpha-1)}$.`, R`With $\alpha = n$, $b = \beta/n$: $E(1/\bar X_n) = \frac{n}{\beta(n-1)} = \frac{n\lambda}{n-1}$.`],
  a: [[R`bias`, 'lambda/(n-1)', { lambda: [0.2, 4], n: [2, 30, 'int'] }]],
  s: R`Recognize a Gamma kernel: for $Y\sim\Gam(\alpha,b)$,
$$E\left(\frac1Y\right) = \frac{1}{b^\alpha\Gamma(\alpha)}\int_0^\infty y^{(\alpha-1)-1}e^{-y/b}\dd y = \frac{b^{\alpha-1}\Gamma(\alpha-1)}{b^\alpha\Gamma(\alpha)} = \frac1{b(\alpha-1)},\quad\alpha>1.$$
With $\bar X_n\sim\Gam(n,\beta/n)$: $E(\hat\lambda^2_n) = \frac{n}{\beta(n-1)} = \frac{n}{n-1}\lambda$, so
$$\operatorname{bias} = \frac{n\lambda}{n-1} - \lambda = \frac{\lambda}{n-1}.$$
Biased, but the bias $\to0$: consistent, as continuous mapping already told us. Multiplying by $\frac{n-1}{n}$ gives the unbiased estimator $\frac{n-1}{n\bar X_n}$.`, src: 'Slides Ch.6 (worked out)' }),
P({ k: 'h', lvl: 2, q: R`Same model. (a) Is $E(1/X_1)$ finite? (b) Is $\hat\lambda^3_n = \frac1n\sum 1/X_i$ consistent for $\lambda$?`, h: [R`Near $x = 0$, $\frac1x\cdot\frac1\beta e^{-x/\beta}\approx\frac{1}{\beta x}$, and $\int_0^1\frac{\dd x}{x} = \infty$.`],
  a: [[R`(a) finite?`, { choice: ['Yes', 'No'], v: 1 }], [R`(b) consistent?`, { choice: ['Yes', 'No'], v: 1 }]],
  s: R`(a) $E(1/X_1) = \frac1\beta\int_0^\infty\frac{e^{-x/\beta}}{x}\dd x\ge\frac{e^{-1/\beta}}{\beta}\int_0^1\frac{\dd x}x = \infty$.

(b) The LLN requires a finite mean, so it gives nothing. Each $1/X_i$ has infinite mean, and averages of such non-negative variables drift to $+\infty$: $\hat\lambda^3_n$ is **not** consistent.`, src: 'Slides Ch.6' }),
H('Proving consistency directly'),
R`Sometimes $P(|\hat\theta_n - \theta|>\varepsilon)$ can be computed exactly. The classic case is the maximum of uniforms: for $X_i\iid\Unif(0,\theta)$ and $M_n = \max_iX_i$, since $M_n\le\theta$ always,
$$P(|M_n - \theta|>\varepsilon) = P(M_n<\theta - \varepsilon) = \prod_{i=1}^nP(X_i<\theta-\varepsilon) = \left(1 - \frac\varepsilon\theta\right)^n\to0\quad(0<\varepsilon<\theta).$$`,
P({ k: 'i', lvl: 2, q: R`$X_i\iid\Unif(0,2)$, $n = 50$. Compute $P(|M_n - 2|>0.1)$ for $M_n = \max_iX_i$.`, h: [R`$(1 - \varepsilon/\theta)^n$.`], a: '0.95^50',
  s: R`$\left(1 - \frac{0.1}{2}\right)^{50} = 0.95^{50}\approx0.077$.` }),
P({ k: 'j', lvl: 3, q: R`$X_i\iid\Unif(0,\theta)$ and $\tilde\theta_n = \frac{n+1}{n}M_n$, with $M_n = \max_iX_i$. Show that $\tilde\theta_n$ is unbiased, find its variance, and conclude it is consistent.`, h: [R`$M_n$ has density $\frac{nm^{n-1}}{\theta^n}$ on $(0,\theta)$.`, R`$E(M_n) = \frac{n\theta}{n+1}$ and $E(M_n^2) = \frac{n\theta^2}{n+2}$.`],
  a: [[R`$\var(\tilde\theta_n)$`, 'theta^2/(n*(n+2))', { theta: [0.5, 5], n: [1, 40, 'int'] }]],
  s: R`$F_{M_n}(m) = (m/\theta)^n$, so $f_{M_n}(m) = \frac{nm^{n-1}}{\theta^n}$ on $(0,\theta)$.
$$E(M_n) = \int_0^\theta\frac{nm^n}{\theta^n}\dd m = \frac{n\theta}{n+1},\qquad E(M_n^2) = \int_0^\theta\frac{nm^{n+1}}{\theta^n}\dd m = \frac{n\theta^2}{n+2}.$$
So $E(\tilde\theta_n) = \frac{n+1}n\cdot\frac{n\theta}{n+1} = \theta$: **unbiased**.
$$\var(M_n) = \frac{n\theta^2}{n+2} - \frac{n^2\theta^2}{(n+1)^2} = \frac{n\theta^2}{(n+1)^2(n+2)},\qquad\var(\tilde\theta_n) = \frac{(n+1)^2}{n^2}\var(M_n) = \frac{\theta^2}{n(n+2)}.$$
$\operatorname{MSE} = \var\to0$, so $\tilde\theta_n$ is **consistent**. Note the variance decays like $1/n^2$, much faster than the usual $1/n$.` }),
P({ k: 'k', lvl: 4, q: R`$X_i\iid\Pois(\lambda)$. You want $\theta = P(X = 0) = e^{-\lambda}$. Compare (I) the plug-in $e^{-\bar X_n}$ and (II) the fraction of zeros $Z_n = \frac1n\sum\1(X_i = 0)$.
(a) Compute $E\left(e^{-\bar X_n}\right)$ using the Poisson MGF. (b) Give $\var(Z_n)$. (c) Which of the two is consistent?`, h: [R`$n\bar X_n = \sum X_i\sim\Pois(n\lambda)$ with MGF $\psi(t) = e^{n\lambda(e^t - 1)}$. Evaluate at $t = -\frac1n$.`, R`$\1(X_i = 0)\iid\Ber(e^{-\lambda})$.`],
  a: [[R`(a) $E(e^{-\bar X_n})$`, 'exp(n*lambda*(exp(-1/n)-1))', { lambda: [0.2, 4], n: [1, 30, 'int'] }], [R`(b) $\var(Z_n)$`, 'exp(-lambda)*(1-exp(-lambda))/n', { lambda: [0.2, 4], n: [1, 30, 'int'] }], [R`(c) consistent`, { choice: ['Only (I)', 'Only (II)', 'Both', 'Neither'], v: 2 }]],
  s: R`(a) $E\left(e^{-\bar X_n}\right) = E\left(e^{-\frac1n\sum X_i}\right) = \psi_{\sum X_i}\left(-\tfrac1n\right) = \exp\left\{n\lambda\left(e^{-1/n} - 1\right)\right\}$. Since $n(e^{-1/n} - 1)\to-1$, this tends to $e^{-\lambda}$, but it is not equal to $e^{-\lambda}$ for finite $n$: (I) is **biased**.

(b) $Z_n$ is a mean of iid $\Ber(e^{-\lambda})$ variables: $E(Z_n) = e^{-\lambda}$ (unbiased) and $\var(Z_n) = \frac{e^{-\lambda}(1-e^{-\lambda})}{n}$.

(c) **Both.** (I): $\bar X_n\xrightarrow{P}\lambda$ by the LLN and $x\mapsto e^{-x}$ is continuous, so $e^{-\bar X_n}\xrightarrow{P}e^{-\lambda}$. (II): unbiased with variance $\to0$, so $\operatorname{MSE}\to0$.` }),
]);

DRILLS('6.3', [
  { k: '01', lvl: 1, q: R`$X_i$ iid with mean $\mu$. Estimator $\hat\theta_n = \bar X_n + \frac5n$. Give the bias, and say if it is consistent.`, h: [R`$\frac5n\to0$.`], a: [[R`bias`, '5/n', { n: [1, 50, 'int'] }], [R`consistent?`, { choice: ['Yes', 'No'], v: 0 }]], s: R`Bias $= \frac5n$. $\hat\theta_n = \bar X_n + \frac5n\xrightarrow{P}\mu + 0$: consistent.` },
  { k: '02', lvl: 1, q: R`$X_i$ iid with mean $\mu$. What does $\hat\theta_n = \bar X_n + 1$ converge to in probability?`, h: [R`LLN.`], a: [[R`limit`, 'mu+1', { mu: [-3, 3] }]], s: R`$\mu + 1$, so it is inconsistent for $\mu$.` },
  { k: '03', lvl: 1, q: R`$X_i$ iid with mean $\mu$, $n\ge2$. Is $\hat\theta_n = \frac{X_1 + X_n}{2}$ unbiased? Consistent?`, h: [R`Its variance is $\sigma^2/2$ for every $n$.`], a: [[R`unbiased?`, { choice: ['Yes', 'No'], v: 0 }], [R`consistent?`, { choice: ['Yes', 'No'], v: 1 }]], s: R`$E = \mu$: unbiased. But it uses only two observations: its distribution does not concentrate as $n$ grows, so it is not consistent.` },
  { k: '04', lvl: 2, q: R`$X_i$ iid, mean $\mu$, variance $\sigma^2$. $\hat\theta_n = \frac{1}{n+1}\sum_{i=1}^nX_i$. Bias and variance?`, h: [R`Same method as dividing by $n+2$.`], a: [[R`bias`, '-mu/(n+1)', { mu: [-3, 3], n: [1, 40, 'int'] }], [R`variance`, 'n*sigma^2/(n+1)^2', { sigma: [0.5, 3], n: [1, 40, 'int'] }]], s: R`$E = \frac{n\mu}{n+1}$, bias $-\frac{\mu}{n+1}$; $\var = \frac{n\sigma^2}{(n+1)^2}$. Both $\to0$: consistent.` },
  { k: '05', lvl: 2, q: R`An estimator has $\operatorname{MSE} = 0.02$. Bound $P(|\hat\theta - \theta|>0.5)$.`, h: [R`Markov on the square: $\operatorname{MSE}/\varepsilon^2$.`], a: '0.08', s: R`$\frac{0.02}{0.25} = 0.08$.` },
  { k: '06', lvl: 2, q: R`$X_i\iid\Ber(p)$. Estimate $p(1-p)$ by $\bar X_n(1 - \bar X_n)$. Find the bias. Is it consistent?`, h: [R`$E(\bar X_n^2) = \frac{p(1-p)}n + p^2$.`], a: [[R`bias`, '-p*(1-p)/n', { p: [0.1, 0.9], n: [1, 40, 'int'] }], [R`consistent?`, { choice: ['Yes', 'No'], v: 0 }]],
    s: R`$E[\bar X_n - \bar X_n^2] = p - \frac{p(1-p)}n - p^2 = p(1-p)\left(1 - \frac1n\right)$, so bias $= -\frac{p(1-p)}{n}$. Consistent by the LLN and continuity of $x(1-x)$.` },
  { k: '07', lvl: 2, q: R`$X_i\iid\Unif(0,1)$, $M_n = \max_iX_i$, $n = 100$. Compute $P(|M_n - 1|>0.05)$.`, h: [R`$(1-\varepsilon)^n$.`], a: '0.95^100', s: R`$0.95^{100}\approx0.0059$.` },
  { k: '08', lvl: 2, q: R`$X_i\iid\Unif(0,\theta)$, $M_n = \max_iX_i$. Smallest $n$ with $P(|M_n - \theta|>0.01\theta)\le0.05$?`, h: [R`$0.99^n\le0.05\iff n\ge\frac{\log0.05}{\log0.99}$.`], a: '299', s: R`$\frac{\log 0.05}{\log0.99} = \frac{-2.996}{-0.01005}\approx298.1$, so $n = 299$.` },
  { k: '09', lvl: 3, q: R`$X_i\iid\Exp(\beta)$ (mean $\beta$). Consider $\hat\beta_n = n\min_iX_i$. Find $E(\hat\beta_n)$ and $\var(\hat\beta_n)$. Is it consistent?`, h: [R`$P(\min_iX_i>x) = e^{-nx/\beta}$: the minimum is $\Exp(\beta/n)$.`], a: [[R`$E(\hat\beta_n)$`, 'beta', { beta: [0.5, 4] }], [R`$\var(\hat\beta_n)$`, 'beta^2', { beta: [0.5, 4] }], [R`consistent?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`$P(\min X_i>x) = \prod P(X_i>x) = e^{-nx/\beta}$, so $\min X_i\sim\Exp(\beta/n)$ and $n\min X_i\sim\Exp(\beta)$ for **every** $n$. Unbiased ($E = \beta$), but $\var = \beta^2$ never shrinks; its distribution is fixed, so $P(|\hat\beta_n - \beta|>\varepsilon)$ is a positive constant: **inconsistent**.` },
  { k: '10', lvl: 3, q: R`$X_i\iid\Exp(\beta)$, $\lambda = 1/\beta$, $n\ge3$. Using $E(1/\bar X_n) = \frac{n\lambda}{n-1}$ and $E(1/\bar X_n^2) = \frac{n^2\lambda^2}{(n-1)(n-2)}$, find $\operatorname{MSE}(1/\bar X_n)$ in simplified form.`, h: [R`$\var = E(1/\bar X^2) - [E(1/\bar X)]^2$; bias $= \frac{\lambda}{n-1}$.`], a: [[R`MSE`, 'lambda^2*(n+2)/((n-1)*(n-2))', { lambda: [0.2, 4], n: [3, 30, 'int'] }]],
    s: R`$\var = \frac{n^2\lambda^2}{(n-1)(n-2)} - \frac{n^2\lambda^2}{(n-1)^2} = \frac{n^2\lambda^2}{(n-1)^2(n-2)}$. Adding $\operatorname{bias}^2 = \frac{\lambda^2}{(n-1)^2}$:
$$\operatorname{MSE} = \frac{\lambda^2(n^2 + n - 2)}{(n-1)^2(n-2)} = \frac{\lambda^2(n+2)(n-1)}{(n-1)^2(n-2)} = \frac{\lambda^2(n+2)}{(n-1)(n-2)}\to0.$$
So $1/\bar X_n$ is consistent, again.` },
  { k: '11', lvl: 3, q: R`$X_i\iid\Ber(0.2)$. What does $\hat\psi_n = \log\frac{\bar X_n}{1-\bar X_n}$ converge to in probability? Is $\hat\psi_n$ unbiased?`, h: [R`Continuous mapping. For unbiasedness: is logit linear? (Also $\bar X_n = 0$ has positive probability.)`], a: [[R`limit`, 'log(0.25)'], [R`unbiased?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`$\bar X_n\xrightarrow{P}0.2$ and logit is continuous at 0.2, so $\hat\psi_n\xrightarrow{P}\log\frac{0.2}{0.8} = \log0.25\approx-1.386$. It is biased: logit is nonlinear (and $\hat\psi_n = -\infty$ with probability $0.8^n>0$, so its mean is not even finite).` },
  { k: '12', lvl: 4, q: R`$X_i$ iid with mean $\mu$ and variance $\sigma^2$. Weighted estimator $T_n = \frac{2}{n(n+1)}\sum_{i=1}^n i\,X_i$.
(a) Show $T_n$ is unbiased. (b) Find $\var(T_n)$. (c) Is it consistent? Compare with $\var(\bar X_n)$.`, h: [R`$\sum_{i=1}^ni = \frac{n(n+1)}2$, $\sum i^2 = \frac{n(n+1)(2n+1)}6$.`],
    a: [[R`(b) $\var(T_n)$`, '2*sigma^2*(2*n+1)/(3*n*(n+1))', { sigma: [0.5, 3], n: [1, 40, 'int'] }], [R`(c) consistent?`, { choice: ['Yes', 'No'], v: 0 }]],
    s: R`(a) $E(T_n) = \frac{2}{n(n+1)}\mu\sum i = \mu$.

(b) Independence: $\var(T_n) = \frac{4\sigma^2}{n^2(n+1)^2}\sum i^2 = \frac{4\sigma^2}{n^2(n+1)^2}\cdot\frac{n(n+1)(2n+1)}{6} = \frac{2\sigma^2(2n+1)}{3n(n+1)}$.

(c) $\var\approx\frac{4\sigma^2}{3n}\to0$ and it is unbiased, so $\operatorname{MSE}\to0$: consistent. But its variance is about $\frac43$ times that of $\bar X_n$: unequal weights waste information.` },
  { k: '13', lvl: 4, q: R`$X_i\iid\Unif(\theta,\theta+1)$. Two estimators of $\theta$: $A_n = \bar X_n - \frac12$ and $B_n = \min_iX_i$.
(a) $\operatorname{MSE}(A_n)$? (b) $\operatorname{MSE}(B_n)$? (c) Which has the smaller MSE at $n = 20$? (d) At $n = 100$?`, h: [R`$B_n - \theta$ is the minimum of $n$ Unif(0,1): $P(B_n - \theta>x) = (1-x)^n$, so $E(B_n - \theta) = \frac{1}{n+1}$ and $\var = \frac{n}{(n+1)^2(n+2)}$.`, R`Compare $\frac1{12n}$ with $\frac{2}{(n+1)(n+2)}$.`],
    a: [[R`(a)`, '1/(12*n)', { n: [1, 50, 'int'] }], [R`(b)`, '2/((n+1)*(n+2))', { n: [1, 50, 'int'] }], [R`(c) n = 20`, { choice: ['A (mean)', 'B (min)'], v: 0 }], [R`(d) n = 100`, { choice: ['A (mean)', 'B (min)'], v: 1 }]],
    s: R`(a) $A_n$ is unbiased with $\var = \frac{1}{12n}$.

(b) $U = B_n - \theta$ is the min of $n$ iid Unif(0,1): $f_U(u) = n(1-u)^{n-1}$, $E(U) = \frac1{n+1}$, $\var(U) = \frac{n}{(n+1)^2(n+2)}$. So $\operatorname{MSE}(B_n) = \frac{n}{(n+1)^2(n+2)} + \frac{1}{(n+1)^2} = \frac{2n+2}{(n+1)^2(n+2)} = \frac{2}{(n+1)(n+2)}$.

(c) $n = 20$: $\frac1{240}\approx0.00417$ vs $\frac{2}{462}\approx0.00433$: **A**.
(d) $n = 100$: $0.00083$ vs $0.00019$: **B**. ($B$ wins once $n^2 - 21n + 2>0$, i.e. $n\ge21$.) Both are consistent; $B$'s MSE decays like $1/n^2$.` },
  { k: '14', lvl: 4, q: R`$X_i\iid N(\mu,1)$ and, independently, $B_n\sim\Ber(1/n)$. Let $\hat\theta_n = \bar X_n + nB_n$. (a) Is $\hat\theta_n$ consistent for $\mu$? (b) Compute $\operatorname{MSE}(\hat\theta_n)$.`, h: [R`$P(\hat\theta_n\ne\bar X_n) = P(B_n = 1) = \frac1n$.`, R`bias $= nE(B_n) = 1$; $\var = \frac1n + n^2\cdot\frac1n(1-\frac1n)$.`],
    a: [[R`(a) consistent?`, { choice: ['Yes', 'No'], v: 0 }], [R`(b) MSE`, 'n+1/n', { n: [1, 50, 'int'] }]],
    s: R`(a) For $\varepsilon>0$: $P(|\hat\theta_n - \mu|>\varepsilon)\le P(|\bar X_n - \mu|>\varepsilon) + P(B_n = 1)\to0 + 0$. **Consistent.**

(b) Bias $= E(nB_n) = 1$. By independence, $\var = \frac1n + n^2\cdot\frac1n\left(1 - \frac1n\right) = \frac1n + n - 1$. $\operatorname{MSE} = \frac1n + n - 1 + 1 = n + \frac1n\to\infty$. So "MSE → 0" is sufficient, not necessary.` },
]);
