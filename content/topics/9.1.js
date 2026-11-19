TOPIC({ id: '9.1', ch: 9, title: 'Method of moments', summary: 'Match the first k theoretical moments μⱼ(θ) to the sample moments (1/n)ΣXᵢʲ and solve for θ. Consistent and asymptotically normal (LLN + CMT + delta method).' }, [
R`Back to **parametric** models $\{f(x;\theta):\theta\in\Theta\subseteq\R^k\}$. The question: given data, how do we *find* an estimator of $\theta$? The oldest recipe is the **method of moments (MoM)**: set the theoretical moments equal to the sample moments and solve. It is the plug-in principle again, applied to moments.

(Source: Chapter 9 lecture notes, pp. 1–4. The notes released so far cover only the method of moments.)`,
DEF('Method of moments estimator', R`For $\theta = (\theta_1,\dots,\theta_k)$, write the theoretical and sample moments
$$\mu_j(\theta) = \E_\theta(X^j),\qquad\hat\mu_j = \frac1n\sum_{i=1}^nX_i^j,\qquad j = 1,\dots,k.$$
The MoM estimator $\hat\theta_{\text{MoM}}$ solves the (possibly nonlinear) system
$$\mu_1(\hat\theta) = \hat\mu_1,\quad\mu_2(\hat\theta) = \hat\mu_2,\quad\dots,\quad\mu_k(\hat\theta) = \hat\mu_k.$$
Use as many equations as there are unknown parameters, starting from $j = 1$.`),
R`**Recipe:** (1) compute $\E X$ (and $\E X^2$ if there are two parameters) as functions of $\theta$; (2) replace them by $\bar X_n$ and $\frac1n\sum X_i^2$; (3) solve for the parameters. With two parameters it is usually easiest to match the mean and the **variance**: $\E X^2 = \hat\mu_2$ together with $\E X = \hat\mu_1$ is equivalent to $\var X = \hat\mu_2 - \hat\mu_1^2 = \hat\sigma^2 := \frac1n\sum(X_i - \bar X_n)^2$.`,
EX('Bernoulli and normal (notes)', R`**Bernoulli($p$):** $\mu_1(p) = p$, so $\hat p_{\text{MoM}} = \bar X_n$.

**$N(\mu, \sigma^2)$:** $\mu_1 = \mu$, $\mu_2 = \sigma^2 + \mu^2$. Solve $\hat\mu = \bar X_n$, $\hat\sigma^2 + \hat\mu^2 = \frac1n\sum X_i^2$:
$$\hat\mu_{\text{MoM}} = \bar X_n,\qquad\hat\sigma^2_{\text{MoM}} = \frac1n\sum X_i^2 - \bar X_n^2 = \frac1n\sum_{i=1}^n(X_i - \bar X_n)^2.$$
(Divisor $n$: the same as the plug-in variance, slightly biased.)`),
P({ k: 'a', lvl: 1, q: R`$X_i\iid\Pois(\lambda)$, data $2, 0, 3, 1, 4$. $\hat\lambda_{\text{MoM}}$?`, h: [R`$\E X = \lambda$.`], a: '2', s: R`$\hat\lambda = \bar x = 10/5 = 2$.` }),
P({ k: 'b', lvl: 1, q: R`$X_i\iid\Unif(0,\theta)$. Find $\hat\theta_{\text{MoM}}$ for data $0.2, 0.9, 0.4, 0.5$.`, h: [R`$\E X = \theta/2$.`], a: '1', s: R`$\frac\theta2 = \bar X$ ⇒ $\hat\theta = 2\bar X = 2(0.5) = 1$.` }),
P({ k: 'c', lvl: 1, q: R`$X_i\iid\Exp(\beta)$ (mean $\beta$). $\hat\beta_{\text{MoM}}$ for data $1, 3, 2, 6$? And the MoM estimate of the rate $\lambda = 1/\beta$?`, a: [[R`$\hat\beta$`, '3'], [R`$\hat\lambda$`, '1/3']], s: R`$\hat\beta = \bar x = 3$, and $\hat\lambda = 1/\bar x = \frac13$ (solving $\E X = 1/\lambda$ for $\lambda$).` }),
P({ k: 'd', lvl: 2, q: R`$X_i\iid\Geom(p)$ on $\{1,2,\dots\}$ ($\E X = 1/p$). Data $1, 4, 2, 1$. $\hat p_{\text{MoM}}$?`, a: '1/2', s: R`$\frac1p = \bar x = 2$ ⇒ $\hat p = \frac12$.` }),
H('Two parameters'),
EX(R`Gamma($\alpha, \beta$)`, R`$\E X = \alpha\beta$, $\var X = \alpha\beta^2$. Match: $\alpha\beta = \bar X_n$ and $\alpha\beta^2 = \hat\sigma^2$. Dividing, $\hat\beta = \frac{\hat\sigma^2}{\bar X_n}$, then $\hat\alpha = \frac{\bar X_n}{\hat\beta} = \frac{\bar X_n^2}{\hat\sigma^2}$.`),
P({ k: 'e', lvl: 2, q: R`Gamma$(\alpha,\beta)$ data: $1, 2, 3, 6$. Compute $\hat\alpha_{\text{MoM}}$ and $\hat\beta_{\text{MoM}}$.`, h: [R`$\bar x = 3$, $\hat\sigma^2 = \frac{4 + 1 + 0 + 9}{4} = 3.5$.`], a: [[R`$\hat\alpha$`, '9/3.5'], [R`$\hat\beta$`, '3.5/3']], s: R`$\hat\beta = \frac{3.5}{3}\approx1.167$, $\hat\alpha = \frac{9}{3.5}\approx2.571$. Check: $\hat\alpha\hat\beta = 3$ ✓.` }),
P({ k: 'f', lvl: 2, q: R`$X_i\iid\Unif(a,b)$, $a<b$. Find MoM estimators of $a$ and $b$ in terms of $\bar X$ and $\hat\sigma$; evaluate for $\bar X = 5$, $\hat\sigma^2 = 3$.`, h: [R`$\E X = \frac{a+b}2$, $\var X = \frac{(b-a)^2}{12}$, so $b - a = \sqrt{12}\hat\sigma = 2\sqrt3\hat\sigma$.`], a: [[R`$\hat a$`, '5-3'], [R`$\hat b$`, '5+3']],
  s: R`$\frac{a+b}{2} = \bar X$ and $b - a = 2\sqrt3\,\hat\sigma$, so $\hat a = \bar X - \sqrt3\hat\sigma$, $\hat b = \bar X + \sqrt3\hat\sigma$. With $\hat\sigma = \sqrt3$: $\sqrt3\hat\sigma = 3$, so $(\hat a, \hat b) = (2, 8)$.` }),
P({ k: 'g', lvl: 3, q: R`$X_i\iid\Bin(k, p)$ with **both** $k$ and $p$ unknown. Find the MoM estimators. Evaluate for $\bar X = 6$, $\hat\sigma^2 = 4.2$.`, h: [R`$kp = \bar X$, $kp(1-p) = \hat\sigma^2$. Divide: $1 - p = \hat\sigma^2/\bar X$.`], a: [[R`$\hat p$`, '0.3'], [R`$\hat k$`, '20']],
  s: R`$1 - \hat p = \frac{\hat\sigma^2}{\bar X}$, so $\hat p = 1 - \frac{\hat\sigma^2}{\bar X} = 1 - 0.7 = 0.3$ and $\hat k = \frac{\bar X}{\hat p} = \frac{\bar X^2}{\bar X - \hat\sigma^2} = 20$. If $\hat\sigma^2>\bar X$ (over-dispersed data) the "estimates" are negative: MoM can leave the parameter space.` }),
H('Properties'),
THM('Consistency and asymptotic normality (notes p. 3)', R`Under conditions on the model (e.g. $\E|X|^{2k}<\infty$ and $\mu(\theta) = (\mu_1(\theta),\dots,\mu_k(\theta))$ invertible with differentiable inverse):
<ol><li>$\hat\theta_{\text{MoM}}$ exists with probability tending to 1;</li>
<li>it is **consistent**: $\hat\theta_{\text{MoM}}\xrightarrow{P}\theta$ (LLN for each $\hat\mu_j$, then CMT for $\mu^{-1}$);</li>
<li>it is **asymptotically normal**: $\sqrt n(\hat\theta_{\text{MoM}} - \theta)\xrightarrow{D}N_k(0, \Sigma)$, $\Sigma = g\,\E[(Y - \mu)(Y - \mu)^T]\,g^T$, where $Y = (X, X^2,\dots,X^k)^T$ and $g = \nabla_\theta\mu^{-1}$ (multivariate CLT + delta method).</li></ol>
**One parameter:** $\hat\theta = h(\bar X_n)$ with $h = \mu_1^{-1}$, and $h'(\mu_1(\theta)) = 1/\mu_1'(\theta)$, so
$$\sqrt n(\hat\theta_{\text{MoM}} - \theta)\xrightarrow{D}N\left(0,\ \frac{\var_\theta(X)}{\mu_1'(\theta)^2}\right).$$`),
P({ k: 'h', lvl: 2, q: R`$\Unif(0,\theta)$, $\hat\theta = 2\bar X_n$. Asymptotic variance of $\sqrt n(\hat\theta - \theta)$?`, h: [R`$\var X = \theta^2/12$, $\mu_1'(\theta) = \frac12$.`], a: [['use theta', 'theta^2/3', { theta: [0.5, 4] }]], s: R`$\frac{\theta^2/12}{1/4} = \frac{\theta^2}{3}$. (It is exact here: $\var(2\bar X) = \frac{\theta^2}{3n}$.)` }),
P({ k: 'i', lvl: 3, q: R`$\Geom(p)$, $\hat p = 1/\bar X_n$. Asymptotic variance of $\sqrt n(\hat p - p)$? Then a 95% CI for $p$ when $n = 100$, $\bar X = 4$.`, h: [R`$\var X = \frac{1-p}{p^2}$, $\mu_1(p) = \frac1p$, $\mu_1'(p) = -\frac1{p^2}$.`, R`Plug $\hat p = 0.25$ into $p^2(1-p)$.`],
  a: [['avar (use p)', 'p^2*(1-p)', { p: [0.05, 0.95] }], ['lower', '0.25-1.96*sqrt(0.0625*0.75/100)'], ['upper', '0.25+1.96*sqrt(0.0625*0.75/100)']],
  s: R`$\frac{(1-p)/p^2}{1/p^4} = p^2(1-p)$. With $\hat p = 0.25$: $\widehat{\operatorname{se}} = \sqrt{\frac{0.0625\cdot0.75}{100}}\approx0.0217$, CI $0.25\pm0.0424 = (0.208, 0.292)$.` }),
P({ k: 'j', lvl: 4, q: R`$X_1,\dots,X_n$ iid with density $f(x;\theta) = \theta x^{\theta-1}$ on $(0,1)$, $\theta>0$. (a) Find $\hat\theta_{\text{MoM}}$. (b) Show it is consistent. (c) Find the asymptotic variance of $\sqrt n(\hat\theta_{\text{MoM}} - \theta)$. (d) 95% CI when $n = 100$, $\bar X = 0.6$.`,
  h: [R`$\E X = \frac{\theta}{\theta+1}$, $\E X^2 = \frac{\theta}{\theta+2}$.`, R`Solve $\frac{\theta}{\theta+1} = \bar X$: $\hat\theta = \frac{\bar X}{1 - \bar X}$. Delta with $h(u) = \frac{u}{1-u}$, $h'(u) = \frac1{(1-u)^2}$.`],
  a: [[R`(c) avar (use theta)`, 'theta*(theta+1)^2/(theta+2)', { theta: [0.3, 4] }], ['(d) lower', '1.5-1.96*sqrt(1.5*6.25/3.5/100)'], ['(d) upper', '1.5+1.96*sqrt(1.5*6.25/3.5/100)']],
  s: R`(a) $\E X = \int_0^1\theta x^\theta\dd x = \frac{\theta}{\theta+1}$. Setting $\frac{\theta}{\theta+1} = \bar X_n$ gives $\hat\theta = \frac{\bar X_n}{1 - \bar X_n}$.

(b) WLLN: $\bar X_n\xrightarrow{P}\frac{\theta}{\theta+1}<1$. $h(u) = \frac u{1-u}$ is continuous on $[0,1)$, so by the CMT $\hat\theta\xrightarrow{P}h\left(\frac\theta{\theta+1}\right) = \theta$.

(c) $\E X^2 = \frac{\theta}{\theta+2}$, so $\var X = \frac{\theta}{\theta+2} - \frac{\theta^2}{(\theta+1)^2} = \frac{\theta}{(\theta+2)(\theta+1)^2}$. CLT: $\sqrt n(\bar X - \mu_1)\xrightarrow{D}N(0,\var X)$. At $\mu_1 = \frac\theta{\theta+1}$, $1 - \mu_1 = \frac1{\theta+1}$, so $h'(\mu_1) = (\theta+1)^2\ne0$. Delta method:
$$\sqrt n(\hat\theta - \theta)\xrightarrow{D}N\left(0, (\theta+1)^4\frac{\theta}{(\theta+2)(\theta+1)^2}\right) = N\left(0, \frac{\theta(\theta+1)^2}{\theta+2}\right).$$
(d) $\hat\theta = \frac{0.6}{0.4} = 1.5$; avar $\approx\frac{1.5\cdot6.25}{3.5} = 2.679$; $\widehat{\operatorname{se}} = \sqrt{2.679/100} = 0.164$; CI $1.5\pm0.321 = (1.179, 1.821)$.` }),
]);

DRILLS('9.1', [
  { k: '01', lvl: 1, q: R`$\Ber(p)$ data: $1, 0, 1, 1, 0$. $\hat p_{\text{MoM}}$?`, a: '3/5', s: R`$\bar x = 0.6$.` },
  { k: '02', lvl: 1, q: R`$N(\mu,\sigma^2)$ data $2, 4, 6$. MoM estimates of $\mu$ and $\sigma^2$?`, a: [[R`$\hat\mu$`, '4'], [R`$\hat\sigma^2$`, '8/3']], s: R`$\hat\mu = 4$; $\hat\sigma^2 = \frac{4 + 0 + 4}{3} = \frac83$ (divisor $n$).` },
  { k: '03', lvl: 1, q: R`$\Unif(0,\theta)$ data $1, 5, 3$. $\hat\theta_{\text{MoM}}$? Is it a sensible estimate?`, a: [[R`$\hat\theta$`, '6'], ['sensible?', { choice: ['Yes', 'No'], v: 0 }]], s: R`$2\bar x = 6\ge\max = 5$, so it is at least consistent with the data. (With data $1, 1, 7$ it would give $6<7$: impossible.)` },
  { k: '04', lvl: 2, q: R`$\Unif(0,\theta)$ data $1, 1, 7$. $\hat\theta_{\text{MoM}}$? What is wrong with it?`, a: '6', s: R`$2\bar x = 6$, but an observation of 7 proves $\theta\ge7$. MoM ignores the support constraint (the maximum does not).` },
  { k: '05', lvl: 2, q: R`Gamma$(\alpha,\beta)$ with $\bar X = 4$, $\hat\sigma^2 = 8$. $\hat\alpha$, $\hat\beta$?`, a: [[R`$\hat\alpha$`, '2'], [R`$\hat\beta$`, '2']], s: R`$\hat\beta = 8/4 = 2$, $\hat\alpha = 16/8 = 2$.` },
  { k: '06', lvl: 2, q: R`$X$ has density $f(x;\theta) = \frac{2x}{\theta^2}$ on $(0,\theta)$. $\E X = \frac{2\theta}3$. MoM estimator for data mean $\bar X = 1.2$?`, a: '1.8', s: R`$\hat\theta = \frac32\bar X = 1.8$.` },
  { k: '07', lvl: 2, q: R`$\Exp$ with rate $\lambda$, $\hat\lambda = 1/\bar X_n$. Asymptotic variance of $\sqrt n(\hat\lambda - \lambda)$?`, h: [R`$\mu_1(\lambda) = 1/\lambda$, $\var X = 1/\lambda^2$.`], a: [['use lambda', 'lambda^2', { lambda: [0.3, 4] }]], s: R`$\frac{1/\lambda^2}{1/\lambda^4} = \lambda^2$.` },
  { k: '08', lvl: 2, q: R`$\Pois(\lambda)$: one MoM uses $\E X = \lambda$, another uses $\var X = \lambda$. Data $0, 1, 1, 2, 6$: give both estimates.`, a: [[R`from mean`, '2'], [R`from variance`, '4.4']], s: R`$\bar x = 2$. $\hat\sigma^2 = \frac{4 + 1 + 1 + 0 + 16}{5} = 4.4$. MoM is not unique; the standard choice uses the lowest moments, here $\bar X$.` },
  { k: '09', lvl: 3, q: R`$\Bet(\theta, 1)$, i.e. $f(x) = \theta x^{\theta-1}$ on $(0,1)$. Data mean $\bar X = 0.75$. $\hat\theta_{\text{MoM}}$?`, a: '3', s: R`$\frac{\theta}{\theta+1} = 0.75$ ⇒ $\hat\theta = \frac{0.75}{0.25} = 3$.` },
  { k: '10', lvl: 3, q: R`$\Unif(-\theta,\theta)$. Why can't you use the first moment? Find the MoM estimator from the second moment.`, h: [R`$\E X = 0$ for every $\theta$. $\E X^2 = \theta^2/3$.`], a: [['use m2 (mean of X^2)', 'sqrt(3*m2)', { m2: [0.1, 5] }]], s: R`$\E X = 0$ carries no information about $\theta$. $\E X^2 = \frac{\theta^2}{3} = \hat\mu_2$ ⇒ $\hat\theta = \sqrt{3\hat\mu_2}$.` },
  { k: '11', lvl: 4, q: R`$X_i\iid\Pois(\lambda)$ and $\theta = P(X = 0) = e^{-\lambda}$. (a) MoM-based estimator of $\theta$ via $\hat\lambda = \bar X$. (b) Its asymptotic variance. (c) Compare with the nonparametric $\tilde\theta = \hat F_n(0)$, whose asymptotic variance is $\theta(1-\theta)$.`, h: [R`$g(\lambda) = e^{-\lambda}$, $g'(\lambda) = -e^{-\lambda}$.`],
    a: [['(b) avar (use lambda)', 'lambda*exp(-2*lambda)', { lambda: [0.2, 4] }]],
    s: R`(a) $\hat\theta = e^{-\bar X_n}$. (b) $\sqrt n(\bar X - \lambda)\xrightarrow{D}N(0,\lambda)$; delta: $e^{-2\lambda}\lambda$. (c) $\theta(1-\theta) = e^{-\lambda}(1 - e^{-\lambda})$. Since $e^\lambda - 1\ge\lambda$, $e^{-\lambda}(1 - e^{-\lambda}) = e^{-2\lambda}(e^\lambda - 1)\ge\lambda e^{-2\lambda}$: the parametric estimator is more efficient **if** the Poisson model is right; the nonparametric one is valid whatever $F$ is.` },
  { k: '12', lvl: 4, q: R`$\Unif(0,\theta)$. Compare $\hat\theta_{\text{MoM}} = 2\bar X$ (MSE $\frac{\theta^2}{3n}$) with $\tilde\theta = \frac{n+1}{n}X_{(n)}$ (unbiased, variance $\frac{\theta^2}{n(n+2)}$). Ratio of MSEs $\frac{\text{MSE}(\hat\theta)}{\text{MSE}(\tilde\theta)}$ as a function of $n$? What does it tell you?`, a: [['ratio (use n)', '(n+2)/3', { n: [1, 50, 'int'] }]],
    s: R`$\frac{\theta^2/(3n)}{\theta^2/(n(n+2))} = \frac{n+2}{3}$, which grows linearly in $n$. MoM is consistent but far from optimal here: its MSE is $O(1/n)$, the maximum's is $O(1/n^2)$. (Chapter 9 continues with maximum likelihood, which picks the maximum.)` },
]);
