TOPIC({ id: '9.2', ch: 9, title: 'Maximum likelihood: finding the MLE', summary: 'Likelihood Lₙ(θ) = ∏f(Xᵢ;θ), log-likelihood ℓₙ = Σ log f, solve the score equation ℓₙ′(θ̂) = 0, check ℓₙ″ < 0. When the support depends on θ (uniform-type models), calculus fails and the MLE is the max (or min).' }, [
R`The method of moments matched moments. **Maximum likelihood** asks a different question: *which value of $\theta$ makes the data we actually saw the most probable?* It is the most important estimation method in the course: the 2025 Midterm 2 asked for an MLE in two of its three exercises.

(Source: Chapter 9 lecture notes, pp. 5–9 and 11–17.)`,
DEF('Likelihood and log-likelihood', R`Let $X_1,\dots,X_n\iid f(x;\theta)$. The **likelihood function** is the joint PDF/PMF of the data, viewed as a function of $\theta$ with the data held fixed:
$$L_n(\theta) = f(X_1,\dots,X_n;\theta) \overset{\text{iid}}{=} \prod_{i=1}^nf(X_i;\theta).$$
The **log-likelihood** is $\ell_n(\theta) = \log L_n(\theta) = \sum_{i=1}^n\log f(X_i;\theta)$.`),
R`The notes' picture: data from $N(\mu, 1)$ clustered around 3. Then $L_n(1) = \prod f(X_i; 1)$ is a product of tiny densities (very small), $L_n(2)$ is larger, and $L_n(3)$ is much larger. The likelihood is a score for each candidate $\theta$; the MLE is the winner.`,
P({ k: 'a', lvl: 1, q: R`One coin flip $X\sim\Ber(p)$ came up $X = 1$. Compute $L(p)$ at $p = 0.2$ and at $p = 0.9$. Which value of $p$ explains the data better?`, h: [R`For one Bernoulli observation, $L(p) = p^X(1-p)^{1-X}$.`], a: [[R`$L(0.2)$`, '0.2'], [R`$L(0.9)$`, '0.9'], ['better', { choice: ['p = 0.2', 'p = 0.9'], v: 1 }]], s: R`$L(p) = p^1(1-p)^0 = p$. So $L(0.2) = 0.2<L(0.9) = 0.9$: a head is more likely when $p = 0.9$. (The MLE pushes all the way to $\hat p = 1$ for a single head.)` }),
P({ k: 'b', lvl: 1, q: R`Data $1, 0, 1$ from $\Ber(p)$. Write $L(p)$ and evaluate it at $p = \frac12$ and $p = \frac23$.`, h: [R`$L(p) = p^{\sum X_i}(1-p)^{n - \sum X_i}$ with $\sum X_i = 2$, $n = 3$.`], a: [[R`$L(1/2)$`, '1/8'], [R`$L(2/3)$`, '4/27']], s: R`$L(p) = p^2(1-p)$. $L(\frac12) = \frac18 = 0.125$; $L(\frac23) = \frac49\cdot\frac13 = \frac4{27}\approx0.148$. The value $\frac23 = \bar x$ wins, and it is in fact the maximum.` }),
DEF('Maximum likelihood estimator', R`The **MLE** $\hat\theta_{\text{ML},n}$ is the value of $\theta$ that maximizes $L_n(\theta)$, or equivalently $\ell_n(\theta)$ ($\log$ is increasing, so both have the same maximizer).

The derivative $\frac{\mathrm d\ell_n}{\mathrm d\theta}$ is called the **score**; the **score equation** is $\frac{\mathrm d\ell_n(\theta)}{\mathrm d\theta}\Big|_{\theta = \hat\theta} = 0$.`),
R`**Recipe (write every line on the exam, the instructor labels them):**<ol><li>Likelihood $L_n(\theta) = \prod f(X_i;\theta)$; simplify (products of powers become powers of sums).</li><li>Log-likelihood $\ell_n(\theta) = \sum\log f(X_i;\theta)$.</li><li>Score $\ell_n'(\theta)$; solve the score equation $\ell_n'(\hat\theta) = 0$.</li><li>Check it is a maximum: $\ell_n''(\theta)<0$.</li></ol>

Why the log? A product of $n$ terms becomes a sum, and sums are easy to differentiate.`,
EX('Bernoulli (notes p. 6)', R`$f(x;p) = p^x(1-p)^{1-x}$, $x\in\{0,1\}$. With $S = \sum X_i$:
$$L_n(p) = \prod_{i=1}^np^{X_i}(1-p)^{1-X_i} = p^S(1-p)^{n-S},\qquad\ell_n(p) = S\log p + (n-S)\log(1-p).$$
Score: $\ell_n'(p) = \frac Sp - \frac{n-S}{1-p}$. Setting it to 0: $S(1-\hat p) = (n-S)\hat p$, so $S = n\hat p$ and
$$\hat p_{\text{ML}} = \frac Sn = \bar X_n.$$
Check: $\ell_n''(p) = -\frac S{p^2} - \frac{n-S}{(1-p)^2}\le0$, so it is a maximum.`),
P({ k: 'c', lvl: 1, q: R`$\Ber(p)$ data: $1, 1, 0, 1, 0, 1, 1, 1$. $\hat p_{\text{ML}}$?`, a: '6/8', s: R`$\hat p = S/n = 6/8 = 0.75$.` }),
P({ k: 'd', lvl: 2, q: R`$X_i\iid\Pois(\lambda)$. Find the MLE. Evaluate it for data $3, 1, 4, 0, 2$.`, h: [R`$f(x;\lambda) = e^{-\lambda}\frac{\lambda^x}{x!}$, so $\ell_n(\lambda) = -n\lambda + \left(\sum X_i\right)\log\lambda - \sum\log X_i!$.`, R`The last term does not depend on $\lambda$: it disappears when you differentiate.`], a: [[R`$\hat\lambda$ (use xbar)`, 'xbar', { xbar: [0.2, 5] }], ['estimate', '2']],
  s: R`$L_n(\lambda) = \prod e^{-\lambda}\frac{\lambda^{X_i}}{X_i!} = e^{-n\lambda}\lambda^{\sum X_i}\Big/\prod X_i!$.
$\ell_n(\lambda) = -n\lambda + \left(\sum X_i\right)\log\lambda - \sum\log X_i!$.
Score: $\ell_n'(\lambda) = -n + \frac{\sum X_i}{\lambda} = 0$ ⇒ $\hat\lambda = \bar X_n$.
Check: $\ell_n''(\lambda) = -\frac{\sum X_i}{\lambda^2}\le0$ ✓. Data: $\hat\lambda = 10/5 = 2$.` }),
EX('Exponential, scale β (notes p. 13)', R`$f(x;\beta) = \frac1\beta e^{-x/\beta}$, $x>0$ (mean $\beta$).
$$L_n(\beta) = \prod\frac1\beta e^{-X_i/\beta} = \beta^{-n}\exp\Big(-\frac1\beta\sum X_i\Big),\qquad\ell_n(\beta) = -n\log\beta - \frac1\beta\sum X_i.$$
Score: $\ell_n'(\beta) = -\frac n\beta + \frac1{\beta^2}\sum X_i = 0$ ⇔ $\hat\beta = \frac1n\sum X_i = \bar X_n$.`),
P({ k: 'e', lvl: 2, q: R`**(2025 Midterm 2, Ex. 2a.)** $X_i\iid$ Exponential with **rate** $\lambda$: $f(x) = \lambda e^{-\lambda x}$, $x>0$. Derive the likelihood and the MLE $\hat\lambda$.`, h: [R`$L_n(\lambda) = \lambda^n\exp(-\lambda\sum X_j)$.`, R`$\ell_n(\lambda) = n\log\lambda - \lambda\sum X_j$.`], a: [[R`$\hat\lambda$ (use xbar)`, '1/xbar', { xbar: [0.2, 5] }]],
  s: R`**Likelihood:** $L_n(\lambda) = \prod_{j=1}^n\lambda e^{-\lambda X_j} = \lambda^n\exp\big(-\lambda\sum_{j}X_j\big)$.
**Log-likelihood:** $\ell_n(\lambda) = n\log\lambda - \lambda\sum_jX_j$.
**Score equation:** $\frac{\mathrm d\ell_n}{\mathrm d\lambda} = \frac n\lambda - \sum_jX_j = 0$ ⇔ $\hat\lambda = \frac{n}{\sum X_j} = \left(\bar X_n\right)^{-1}$.
**Max:** $\ell_n''(\lambda) = -\frac n{\lambda^2}<0$ ✓.
Note $\hat\lambda = 1/\hat\beta$: the MLE does not care how you parametrize (equivariance, next page).` }),
P({ k: 'f', lvl: 2, q: R`$X_i\iid\Geom(p)$ on $\{1, 2,\dots\}$: $f(x;p) = p(1-p)^{x-1}$. Find $\hat p_{\text{ML}}$; evaluate for data $1, 4, 2, 1$.`, h: [R`$\ell_n(p) = n\log p + \left(\sum X_i - n\right)\log(1-p)$.`], a: [[R`$\hat p$ (use xbar)`, '1/xbar', { xbar: [1.1, 6] }], ['estimate', '1/2']],
  s: R`$\ell_n(p) = n\log p + (\sum X_i - n)\log(1-p)$. Score: $\frac np - \frac{\sum X_i - n}{1-p} = 0$ ⇒ $n(1-p) = p(\sum X_i - n)$ ⇒ $n = p\sum X_i$ ⇒ $\hat p = \frac{1}{\bar X_n}$. Data: $\bar x = 2$, $\hat p = \frac12$ (same as MoM here).` }),
P({ k: 'g', lvl: 3, q: R`$X_i\iid f(x;\theta) = \theta x^{\theta-1}$ on $(0,1)$, $\theta>0$. Find $\hat\theta_{\text{ML}}$. Evaluate for $n = 4$ with $\sum\log X_i = -2$. (Compare with the MoM $\frac{\bar X}{1-\bar X}$ from 9.1.)`, h: [R`$\ell_n(\theta) = n\log\theta + (\theta - 1)\sum\log X_i$.`], a: [[R`$\hat\theta$ (use s = Σ log Xᵢ, n)`, '-n/s', { n: [2, 30, 'int'], s: [-20, -0.5] }], ['estimate', '2']],
  s: R`$L_n(\theta) = \theta^n\prod X_i^{\theta-1}$, $\ell_n(\theta) = n\log\theta + (\theta-1)\sum\log X_i$. Score: $\frac n\theta + \sum\log X_i = 0$ ⇒
$$\hat\theta_{\text{ML}} = -\frac{n}{\sum_{i=1}^n\log X_i}\ (>0\text{ since }\log X_i<0).$$
Check: $\ell_n'' = -\frac n{\theta^2}<0$ ✓. Here $\hat\theta = -4/(-2) = 2$. MoM and MLE are **different** estimators for this model; the next page shows the MLE has smaller asymptotic variance.` }),
H('Two parameters: the normal'),
EX(R`$N(\mu,\sigma^2)$ (notes pp. 7–8)`, R`$\theta = (\mu,\sigma^2)$.
$$\ell_n(\mu,\sigma^2) = -\frac n2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_{i=1}^n(X_i-\mu)^2.$$
Two partial derivatives, both set to 0 (treat $\sigma^2$ as one variable):
$$\frac{\partial\ell_n}{\partial\mu} = \frac1{\sigma^2}\sum(X_i - \mu) = 0,\qquad\frac{\partial\ell_n}{\partial\sigma^2} = -\frac n{2\sigma^2} + \frac1{2(\sigma^2)^2}\sum(X_i-\mu)^2 = 0.$$
The first gives $\hat\mu = \bar X_n$; plugging it into the second, $\sum(X_i - \hat\mu)^2 = n\hat\sigma^2$:
$$\hat\mu_{\text{ML}} = \bar X_n,\qquad\hat\sigma^2_{\text{ML}} = \frac1n\sum_{i=1}^n(X_i - \bar X_n)^2\quad(\text{divisor }n\text{, biased; same as MoM}).$$`),
P({ k: 'h', lvl: 2, q: R`$N(\mu,\sigma^2)$ data: $2, 4, 9$. Give $\hat\mu_{\text{ML}}$ and $\hat\sigma^2_{\text{ML}}$.`, a: [[R`$\hat\mu$`, '5'], [R`$\hat\sigma^2$`, '26/3']], s: R`$\hat\mu = 15/3 = 5$; $\hat\sigma^2 = \frac{9 + 1 + 16}{3} = \frac{26}3\approx8.67$ (divide by $n = 3$, not 2).` }),
P({ k: 'i', lvl: 3, q: R`$X_i\iid N(0,\sigma^2)$ (mean known to be 0). Find $\hat\sigma^2_{\text{ML}}$. Evaluate for data $1, -2, 3$.`, h: [R`Same log-likelihood with $\mu = 0$; only the $\sigma^2$ derivative remains.`], a: [['estimate', '14/3']], s: R`$\ell_n = -\frac n2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum X_i^2$; score $-\frac n{2\sigma^2} + \frac{\sum X_i^2}{2\sigma^4} = 0$ ⇒ $\hat\sigma^2 = \frac1n\sum X_i^2 = \frac{1 + 4 + 9}{3} = \frac{14}3$.` }),
H('When calculus fails: the support depends on θ'),
R`If the set where $f(x;\theta)>0$ depends on $\theta$, the likelihood contains an **indicator**, and it jumps to 0. Do not differentiate blindly: **draw $L_n(\theta)$**.`,
EX(R`$\Unif(0,\theta)$ (notes pp. 8–9)`, R`$f(x;\theta) = \frac1\theta\1(0\le x\le\theta)$. Then
$$L_n(\theta) = \prod_{i=1}^n\frac1\theta\1(X_i\in[0,\theta]) = \theta^{-n}\,\1\Big(\max(X_1,\dots,X_n)\le\theta\Big),$$
because all $X_i\le\theta$ ⇔ the largest one is $\le\theta$. So:<ul><li>for $\theta<\max X_i$: $L_n(\theta) = 0$ (some observation would be impossible);</li><li>for $\theta\ge\max X_i$: $L_n(\theta) = \theta^{-n}$, **decreasing** in $\theta$.</li></ul>

The maximum is at the jump: $\hat\theta_{\text{ML}} = \max(X_1,\dots,X_n) = X_{(n)}$. The score equation $-n/\theta = 0$ has no solution: that is the warning sign.`),
P({ k: 'j', lvl: 1, q: R`$\Unif(0,\theta)$ data: $0.4, 1.7, 0.9, 1.2$. $\hat\theta_{\text{ML}}$? And $\hat\theta_{\text{MoM}} = 2\bar X$?`, a: [[R`$\hat\theta_{\text{ML}}$`, '1.7'], [R`$\hat\theta_{\text{MoM}}$`, '2.1']], s: R`MLE $= \max = 1.7$. MoM $= 2\cdot1.05 = 2.1$. The MLE can never be impossible (it is always $\ge$ every data point); the MoM can.` }),
P({ k: 'k', lvl: 3, q: R`**(2025 Midterm 2, Ex. 3c.)** $X_i\iid F(x) = (x/\theta)^2$, $x\in[0,\theta]$. Show that $\hat\theta_{\text{ML}} = \max(X_1,\dots,X_n)$. Then evaluate it for data $0.5, 2.6, 1.9$.`, h: [R`Differentiate the CDF: $f(x) = \frac{2x}{\theta^2}$ on $[0,\theta]$.`, R`$L_n(\theta) = \theta^{-2n}2^n\left(\prod X_j\right)\1(\max X_j\le\theta)$. Where is it 0, and where is it decreasing?`], a: [['estimate', '2.6']],
  s: R`PDF: $f(x) = F'(x) = \frac{2x}{\theta^2}$, $x\in[0,\theta]$.
$$L_n(\theta) = \prod_{j=1}^n\frac{2X_j}{\theta^2}\1(X_j\in[0,\theta]) = \theta^{-2n}\,2^n\Big(\prod_{j=1}^nX_j\Big)\,\1\Big(\max_jX_j\le\theta\Big).$$
The likelihood is identically 0 on $(-\infty, \max_jX_j)$ and monotonically decreasing ($\propto\theta^{-2n}$) on $[\max_jX_j, +\infty)$. Thus $\hat\theta_{\text{ML}} = \max(X_1,\dots,X_n)$. Data: $2.6$.` }),
P({ k: 'l', lvl: 3, q: R`Shifted exponential: $f(x;\theta) = e^{-(x-\theta)}$ for $x\ge\theta$. Find the MLE; evaluate for data $3.2, 2.5, 4.1$.`, h: [R`$L_n(\theta) = e^{-\sum X_i + n\theta}\,\1(\min X_i\ge\theta)$. Is it increasing or decreasing in $\theta$ where it is positive?`], a: [['estimate', '2.5']], s: R`$L_n(\theta) = \exp(n\theta - \sum X_i)\1(\theta\le\min X_i)$: **increasing** in $\theta$ up to $\min X_i$, then 0. So $\hat\theta = \min(X_1,\dots,X_n) = 2.5$.` }),
P({ k: 'm', lvl: 4, q: R`$X_i\iid\Unif(a, b)$, both unknown. Find the MLEs. Evaluate for data $3, 7, 4, 5$.`, h: [R`$L_n(a,b) = (b-a)^{-n}\1(a\le\min X_i)\1(\max X_i\le b)$. Make $b - a$ as small as allowed.`], a: [[R`$\hat a$`, '3'], [R`$\hat b$`, '7']], s: R`$L_n(a,b) = (b-a)^{-n}$ when $a\le X_{(1)}$ and $b\ge X_{(n)}$, else 0. It grows as $b - a$ shrinks, so push $a$ up to $X_{(1)}$ and $b$ down to $X_{(n)}$: $\hat a = \min = 3$, $\hat b = \max = 7$. (Compare MoM: $\bar X\mp\sqrt3\hat\sigma$.)` }),
]);

DRILLS('9.2', [
  { k: '01', lvl: 1, q: R`$\Ber(p)$, 20 trials with 7 successes. $\hat p_{\text{ML}}$?`, a: '7/20', s: R`$\hat p = S/n = 0.35$.` },
  { k: '02', lvl: 1, q: R`$\Pois(\lambda)$ data $0, 2, 2, 5, 1$. $\hat\lambda_{\text{ML}}$?`, a: '2', s: R`$\hat\lambda = \bar x = 10/5 = 2$.` },
  { k: '03', lvl: 1, q: R`$\Exp(\beta)$ (mean $\beta$) data $1, 2, 6$. $\hat\beta_{\text{ML}}$? And the MLE of the rate $\lambda = 1/\beta$?`, a: [[R`$\hat\beta$`, '3'], [R`$\hat\lambda$`, '1/3']], s: R`$\hat\beta = \bar x = 3$; $\hat\lambda = 1/\bar x = \frac13$.` },
  { k: '04', lvl: 1, q: R`$\Unif(0,\theta)$ data $2.2, 0.3, 3.9, 1.0$. $\hat\theta_{\text{ML}}$?`, a: '3.9', s: R`The maximum: $3.9$.` },
  { k: '05', lvl: 2, q: R`$\Ber(p)$, $n = 10$, $S = 4$. Write $\ell_n(p)$ and evaluate the score $\ell_n'(p)$ at $p = 0.5$. Is the MLE above or below 0.5?`, h: [R`$\ell_n'(p) = \frac Sp - \frac{n-S}{1-p}$.`], a: [['score at 0.5', '4/0.5-6/0.5'], ['MLE is', { choice: ['above 0.5', 'below 0.5'], v: 1 }]], s: R`$\ell_n'(0.5) = 8 - 12 = -4<0$: the log-likelihood is decreasing at 0.5, so the maximum is to the left. Indeed $\hat p = 0.4$.` },
  { k: '06', lvl: 2, q: R`$X_i\iid\Bin(m, p)$ with $m$ known. MLE of $p$? Evaluate for $m = 5$ and data $2, 3, 1$.`, h: [R`$\ell_n(p) = \left(\sum X_i\right)\log p + \left(nm - \sum X_i\right)\log(1-p) + \text{const}$.`], a: '6/15', s: R`Score: $\frac{\sum X_i}{p} - \frac{nm - \sum X_i}{1-p} = 0$ ⇒ $\hat p = \frac{\sum X_i}{nm} = \frac{\bar X}{m} = \frac6{15} = 0.4$.` },
  { k: '07', lvl: 2, q: R`$N(\mu, 1)$ ($\sigma^2 = 1$ known). Show $\hat\mu_{\text{ML}} = \bar X_n$ and give it for data $-1, 0, 4$.`, a: '1', s: R`$\ell_n(\mu) = -\frac n2\log(2\pi) - \frac12\sum(X_i - \mu)^2$; score $\sum(X_i - \mu) = 0$ ⇒ $\hat\mu = \bar X = 1$. $\ell_n'' = -n<0$ ✓.` },
  { k: '08', lvl: 2, q: R`$f(x;\theta) = \frac{x}{\theta}e^{-x^2/(2\theta)}$, $x>0$ (Rayleigh). Find $\hat\theta_{\text{ML}}$; evaluate for data $1, 2, 3$.`, h: [R`$\ell_n(\theta) = \sum\log X_i - n\log\theta - \frac1{2\theta}\sum X_i^2$.`], a: '14/6', s: R`Score: $-\frac n\theta + \frac{\sum X_i^2}{2\theta^2} = 0$ ⇒ $\hat\theta = \frac{\sum X_i^2}{2n} = \frac{14}{6}\approx2.33$.` },
  { k: '09', lvl: 3, q: R`$f(x;\theta) = \frac{2x}{\theta^2}$ on $[0,\theta]$ (2025 Midterm 2, Ex. 3). Data $1.2, 0.4, 2.0, 1.4$. Compute $\hat\theta_{\text{ML}}$ and $\hat\theta_{\text{MoM}} = \frac32\bar X$.`, a: [[R`$\hat\theta_{\text{ML}}$`, '2'], [R`$\hat\theta_{\text{MoM}}$`, '1.5*1.25']], s: R`MLE $= \max = 2.0$. $\bar x = 5/4 = 1.25$, MoM $= 1.875<2.0$: impossible, since an observation equals 2.0.` },
  { k: '10', lvl: 3, q: R`Laplace location: $f(x;\theta) = \frac12e^{-|x-\theta|}$. The MLE minimizes $\sum|X_i - \theta|$. What is it for data $1, 2, 7$?`, h: [R`$\sum|X_i - \theta|$ is minimized by a median.`], a: '2', s: R`Maximizing $\ell_n = -n\log2 - \sum|X_i - \theta|$ means minimizing $\sum|X_i - \theta|$, achieved at the sample median: $\hat\theta = 2$. (Not differentiable at data points: think, don't differentiate.)` },
  { k: '11', lvl: 3, q: R`$X_i\iid\Unif(\theta, \theta + 1)$. Show that **any** $\theta$ in $[\max X_i - 1, \min X_i]$ is an MLE. For data $2.3, 2.9, 2.5$, give the lower and upper ends of that interval.`, a: [['lower', '1.9'], ['upper', '2.3']], s: R`$L_n(\theta) = \1(\theta\le\min X_i)\1(\max X_i\le\theta + 1)$: equal to 1 on $[\max - 1, \min] = [1.9, 2.3]$ and 0 elsewhere. The MLE need not be unique.` },
  { k: '12', lvl: 4, q: R`$X_i\iid$ Pareto: $f(x;\alpha) = \alpha x^{-\alpha-1}$ for $x\ge1$, $\alpha>0$. Find $\hat\alpha_{\text{ML}}$; evaluate for $n = 5$ with $\sum\log X_i = 2.5$.`, h: [R`$\ell_n(\alpha) = n\log\alpha - (\alpha+1)\sum\log X_i$.`], a: [['use n, s = Σ log Xᵢ', 'n/s', { n: [2, 30, 'int'], s: [0.5, 20] }], ['estimate', '2']], s: R`Score: $\frac n\alpha - \sum\log X_i = 0$ ⇒ $\hat\alpha = \frac{n}{\sum\log X_i} = \frac5{2.5} = 2$. $\ell_n'' = -n/\alpha^2<0$ ✓.` },
]);
