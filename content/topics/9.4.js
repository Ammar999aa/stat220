TOPIC({ id: '9.4', ch: 9, title: 'Asymptotic variance: one recipe for every estimator', summary: 'Which variance goes where (Var Xᵢ, Var X̄, Var θ̂, avar), what the mean is, when the delta method applies and when it fails. One recipe: write θ̂ = g(average), CLT, delta. MLE shortcut 1/I₁(θ).' }, [
R`Every "find the asymptotic variance" question (MoM, MLE, empirical CDF, plug-in, functions of them) is the **same three-step recipe**. This page gives the recipe, sorts out the four variances that get mixed up, and then drills it from easy to exam level.`,

DEF('The four variances, and which one is the "asymptotic variance"', R`<table>
<tr><th>Symbol</th><th>What it is</th><th>Size</th></tr>
<tr><td>$\var(X) = \var(X_i) = \sigma^2$</td><td>spread of **one observation**. All $X_i$ are iid, so $\var(X_i)$ and $\var(X)$ are the same number.</td><td>does not shrink with $n$</td></tr>
<tr><td>$\var(\bar X_n) = \sigma^2/n$</td><td>spread of the **average** of $n$ observations</td><td>$\to0$</td></tr>
<tr><td>$\var(\hat\theta_n) = \operatorname{se}^2$</td><td>spread of the **estimator** at a fixed $n$. Usually you can only approximate it.</td><td>$\approx\text{avar}/n\to0$</td></tr>
<tr><td>$\text{avar}$ (often written $\sigma^2_\theta$ or $\tau^2$)</td><td>the $\tau^2$ in $\sqrt n(\hat\theta_n - \theta)\xrightarrow{D}N(0,\tau^2)$</td><td>a fixed number, **no $n$ in it**</td></tr>
</table>
**"Asymptotic variance" is the same thing as "the variance of the limiting distribution"**, provided you mean the limit of the **scaled** quantity $\sqrt n(\hat\theta_n - \theta)$. Unscaled, $\hat\theta_n\to\theta$ is a point mass with variance $0$, which tells you nothing. Multiplying by $\sqrt n$ is what makes the limit an actual normal distribution.

**The two forms you should write on every answer:**
$$\sqrt n(\hat\theta_n - \theta)\xrightarrow{D}N(0,\ \tau^2)\qquad\Longleftrightarrow\qquad\hat\theta_n\ \overset{\text{approx}}{\sim}\ N\left(\theta,\ \frac{\tau^2}{n}\right).$$
Some texts call $\tau^2/n$ "the asymptotic variance of $\hat\theta_n$". Writing both forms keeps you right whichever convention the grader uses.`),

NOTE(R`Where $S_n^2$ and se fit`, R`<ul>
<li>**$S_n^2 = \frac1{n-1}\sum(X_i - \bar X_n)^2$ estimates $\var(X)$**, the spread of **one** observation. It does **not** estimate $\var(\bar X_n)$: it does not shrink with $n$, because $S_n^2\to\sigma^2$.</li>
<li>**$\operatorname{se}(\hat\theta_n) = \sqrt{\var(\hat\theta_n)}\approx\sqrt{\tau^2/n}$.** For $\hat\theta = \bar X_n$ this is $\sigma/\sqrt n$, i.e. $\sqrt{\var(\bar X_n)}$.</li>
<li>**$\widehat{\operatorname{se}}$ plugs estimates into that formula:** for the mean, $\widehat{\operatorname{se}} = S_n/\sqrt n$. In general, $\widehat{\operatorname{se}} = \sqrt{\hat\tau^2/n}$ with $\hat\tau^2 = \tau^2$ evaluated at $\hat\theta$, e.g. $\sqrt{\hat p(1-\hat p)/n}$ or $\sqrt{1/I_n(\hat\theta)}$.</li>
</ul>
Chain for the mean: $S_n^2\approx\var(X) = \tau^2$, then $\div n$ gives $\var(\bar X_n)$, then $\sqrt{\ }$ gives $\operatorname{se}$. The CI is $\bar X_n\pm1.96\,S_n/\sqrt n$.`),
DEF('What is the mean?', R`<ul>
<li>The limit of $\sqrt n(\hat\theta_n - \theta)$ always has **mean $0$**.</li>
<li>The approximate distribution of $\hat\theta_n$ is **centred at what $\hat\theta_n$ converges to**: the true $\theta$ for a consistent estimator.</li>
<li>In the CLT step the centre is $\E\,r(X)$, the mean of **one** observation of the thing being averaged. Example: $\sqrt n\big(\bar X_n - \E X\big)$ and $\sqrt n\big(\hat F_n(x) - F(x)\big)$.</li>
</ul>
**Rule:** in $\sqrt n(\text{estimator} - c)$, $c$ must be the probability limit of the estimator. Any other $c$ makes the expression blow up.`),

THM('The recipe (works for MoM, plug-in, the empirical CDF, and functions of them)', R`<ol>
<li>**Write the estimator as a function of an average:** $\hat\theta_n = g(\bar R_n)$ with $\bar R_n = \frac1n\sum_{i=1}^n r(X_i)$. Often $r(x) = x$, or $r(x) = \1\{x\le t\}$ for the empirical CDF.</li>
<li>**CLT on the average,** using the variance of **one** term:
$$\sqrt n\big(\bar R_n - \mu_r\big)\xrightarrow{D}N\big(0,\ \var r(X_1)\big),\qquad\mu_r = \E\,r(X_1).$$</li>
<li>**Delta method through $g$** (skip this step if $g(u) = u$):
$$\sqrt n\big(g(\bar R_n) - g(\mu_r)\big)\xrightarrow{D}N\big(0,\ g'(\mu_r)^2\,\var r(X_1)\big),\qquad\text{provided }g'(\mu_r)\ne0.$$</li>
<li>**Express everything in $\theta$:** $g(\mu_r) = \theta$, and $\tau^2 = g'(\mu_r)^2\var r(X_1)$ written as a function of $\theta$.</li>
</ol>
**MLE shortcut:** under regularity conditions $\tau^2 = 1/I_1(\theta)$ directly, with no average or $g$ to find. For a function $\psi = h(\theta)$ of the MLE, apply the delta method once more: $\tau^2 = h'(\theta)^2/I_1(\theta)$.

**Answer to "Var(X), Var(X̄), Var(Xᵢ) or Var(θ̂)?":** the formula uses **$\var r(X_1)$, the variance of one term** (the same as $\var(X)$ when $r(x) = x$). Never put $\var(\bar X_n)$ into the CLT step: the $\sqrt n$ already accounts for the division by $n$.`),

THM('Cheat table: the same recipe, case by case', R`<table>
<tr><th>Estimator</th><th>$r$, $g$</th><th>$\tau^2$ in $\sqrt n(\hat\theta - \theta)\to N(0,\tau^2)$</th></tr>
<tr><td>$\bar X_n$</td><td>$r(x) = x$, $g(u) = u$</td><td>$\var(X)$</td></tr>
<tr><td>$\hat F_n(x)$</td><td>$r = \1\{\cdot\le x\}$, $g(u) = u$</td><td>$F(x)\big(1 - F(x)\big)$ (a Bernoulli variance)</td></tr>
<tr><td>linear functional $\frac1n\sum r(X_i)$</td><td>$r$, $g(u) = u$</td><td>$\var r(X)$</td></tr>
<tr><td>$g(\bar X_n)$</td><td>$r(x) = x$, $g$</td><td>$g'(\mu)^2\var(X)$</td></tr>
<tr><td>MoM, one parameter ($\E X = \mu(\theta)$)</td><td>$g = \mu^{-1}$</td><td>$\dfrac{\var_\theta(X)}{\mu'(\theta)^2}$, since $(\mu^{-1})' = 1/\mu'$</td></tr>
<tr><td>MLE (regular model)</td><td>none needed</td><td>$1/I_1(\theta)$</td></tr>
<tr><td>$h(\hat\theta)$, $\hat\theta$ with avar $\tau^2$</td><td>delta</td><td>$h'(\theta)^2\,\tau^2$</td></tr>
<tr><td>$h(\hat F_n(x))$</td><td>delta</td><td>$h'(F)^2F(1-F)$</td></tr>
<tr><td>$\max X_i$ or $\min X_i$ (support depends on $\theta$)</td><td>not an average</td><td>**no** $\sqrt n$-normal limit: use the CDF of the max (rate $n$, exponential limit)</td></tr>
</table>`),

WARN('When the delta method is wrong, or gives nothing', R`It needs **$\sqrt n(T_n - \mu)\to N(0,\sigma^2)$ first**, and then **$g$ differentiable at $\mu$ with $g'(\mu)\ne0$**. It fails when:
<ol>
<li>**$g'(\mu) = 0$.** It returns $N(0,0)$, which is true but useless. Example: $\hat\theta = \bar X_n(1-\bar X_n)$ for $\Ber(\frac12)$. The real limit is at rate $n$ and is not normal (a second-order Taylor expansion gives a $\chi^2_1$ shape).</li>
<li>**$g$ is not differentiable at $\mu$**, e.g. $|\bar X_n|$ when $\mu = 0$.</li>
<li>**The estimator is not a smooth function of averages:** $\max X_i$, $\min X_i$. Do not apply the CLT or the delta method; compute $P(\max\le x) = F(x)^n$.</li>
<li>**The CLT does not apply:** $\var r(X) = \infty$ (e.g. Cauchy), or the support depends on $\theta$ for the MLE shortcut.</li>
</ol>
Also note: the delta method gives the variance **of the limit**, not the exact $\var(\hat\theta_n)$. Example: $\var(1/X_1)$ is infinite for one exponential observation, yet $\sqrt n(1/\bar X_n - \lambda)\to N(0,\lambda^2)$ is still correct.`),

NOTE('Exam write-up template', R`"$\hat\theta = g(\bar X_n)$ with $g(u) = \dots$. By the CLT, $\sqrt n(\bar X_n - \mu)\xrightarrow{D}N(0,\sigma^2)$ with $\mu = \dots$, $\sigma^2 = \var(X) = \dots$. Since $g$ is differentiable at $\mu$ with $g'(\mu) = \dots\ne0$, the delta method gives $\sqrt n(\hat\theta - \theta)\xrightarrow{D}N\big(0, g'(\mu)^2\sigma^2\big) = N(0,\ \dots)$, i.e. $\hat\theta\approx N(\theta, \dots/n)$."`),

H('Level 1: which variance, which mean'),
P({ k: 'a', lvl: 1, q: R`$X_i\iid\Exp(\beta)$ (mean $\beta$, variance $\beta^2$). Give (i) $\var(X_3)$, (ii) $\var(\bar X_n)$, (iii) the asymptotic variance $\tau^2$ of $\sqrt n(\bar X_n - \beta)$.`, a: [['(i) (use beta)', 'beta^2', { beta: [0.3, 4] }], ['(ii) (use beta, n)', 'beta^2/n', { beta: [0.3, 4], n: [1, 50, 'int'] }], ['(iii) (use beta)', 'beta^2', { beta: [0.3, 4] }]],
  s: R`(i) One observation: $\beta^2$. (ii) The average: $\beta^2/n$. (iii) $\sqrt n(\bar X_n - \beta)$ has variance $n\cdot\beta^2/n = \beta^2$ for every $n$, and its limit is $N(0,\beta^2)$. So $\tau^2 = \var(X_i)$, not $\var(\bar X_n)$. The $\sqrt n$ scaling cancels the $1/n$.` }),
P({ k: 'b', lvl: 1, q: R`In step 2 of the recipe (the CLT for $\bar R_n = \frac1n\sum r(X_i)$), which variance goes in?`, a: { choice: [R`$\var r(X_1)$, the variance of one term`, R`$\var(\bar R_n)$`, R`$\var(\hat\theta_n)$`, R`$\var(\bar R_n)/n$`], v: 0 },
  s: R`$\sqrt n(\bar R_n - \mu_r)\to N(0,\var r(X_1))$. If you used $\var(\bar R_n) = \var r(X_1)/n$, you would be dividing by $n$ twice.` }),
P({ k: 'c', lvl: 1, q: R`$X_i\iid\Unif(0,\theta)$. For which constant $c$ does $\sqrt n(\bar X_n - c)$ have a normal limit? What is the mean of that limit?`, a: [['c (use theta)', 'theta/2', { theta: [0.5, 4] }], ['mean of the limit', '0']],
  s: R`$c$ must be the probability limit of $\bar X_n$, which is $\E X = \theta/2$ (LLN). The limit $N(0, \theta^2/12)$ has mean $0$. With any other $c$, $\sqrt n(\bar X_n - c) = \sqrt n(\bar X_n - \theta/2) + \sqrt n(\theta/2 - c)\to\pm\infty$.` }),
P({ k: 'd', lvl: 1, q: R`Suppose $\sqrt n(\hat\theta_n - \theta)\xrightarrow{D}N(0, \theta^2/3)$. (i) What is the variance of the limiting distribution of the **unscaled** $\hat\theta_n$? (ii) With $\theta = 3$, $n = 100$, what is the approximate $\var(\hat\theta_n)$?`, a: [['(i)', '0'], ['(ii)', '3/100']],
  s: R`(i) $\hat\theta_n\xrightarrow{P}\theta$, a point mass, so the variance is $0$. That is why we scale by $\sqrt n$. (ii) $\hat\theta_n\approx N(\theta, \tau^2/n)$, so $\var\approx\frac{9/3}{100} = 0.03$, se $\approx0.173$.` }),

H('Level 2: the recipe in each setting'),
P({ k: 'e', lvl: 2, q: R`**Empirical CDF.** $X_i\iid\Exp(\beta)$, mean $\beta$. Asymptotic variance of $\sqrt n\big(\hat F_n(\beta) - F(\beta)\big)$? (A number.)`, h: [R`$\hat F_n(\beta)$ is the average of $r(X_i) = \1\{X_i\le\beta\}$, a Bernoulli with $p = F(\beta)$.`, R`$F(\beta) = 1 - e^{-1}$.`], a: '(1-exp(-1))*exp(-1)',
  s: R`Step 1: $r = \1\{\cdot\le\beta\}$, $g(u) = u$. Step 2: $r(X_1)\sim\Ber(F(\beta))$, so $\var r(X_1) = F(1-F)$. No delta step. $F(\beta) = 1 - e^{-1}$, so $\tau^2 = (1 - e^{-1})e^{-1}\approx0.2325$. Mean $F(\beta)$ in the CLT, $0$ for the limit.` }),
P({ k: 'f', lvl: 2, q: R`**MoM, linear $g$.** $X_i\iid\Unif(0,\theta)$, $\hat\theta_{\text{MoM}} = 2\bar X_n$. Find $\tau^2$ in $\sqrt n(\hat\theta - \theta)\to N(0,\tau^2)$.`, h: [R`$\var(X) = \theta^2/12$, and $g(u) = 2u$ has $g' = 2$.`], a: [['τ² (use theta)', 'theta^2/3', { theta: [0.5, 4] }]],
  s: R`$\sqrt n(\bar X_n - \theta/2)\to N(0, \theta^2/12)$. With $g(u) = 2u$: $g(\theta/2) = \theta$, $g' = 2$, so $\tau^2 = 4\cdot\theta^2/12 = \theta^2/3$. Equivalently $\hat\theta\approx N(\theta, \theta^2/(3n))$.` }),
P({ k: 'g', lvl: 2, q: R`**MLE shortcut.** $X_i\iid\Pois(\lambda)$, $\hat\lambda = \bar X_n$. Find $\tau^2$ two ways (CLT, and $1/I_1$). With $\lambda = 2$, $n = 50$, give the approximate se of $\hat\lambda$.`, a: [['τ² (use lambda)', 'lambda', { lambda: [0.2, 5] }], ['se', 'sqrt(2/50)']],
  s: R`CLT: $\var(X) = \lambda$. Fisher: $I_1 = 1/\lambda$, so $1/I_1 = \lambda$. The two agree, as they must when the MLE is an average. se $= \sqrt{\tau^2/n} = \sqrt{2/50} = 0.2$.` }),
P({ k: 'h', lvl: 2, q: R`**Nonlinear $g$: you need the delta method.** $X_i\iid$ exponential with **rate** $\lambda$, $\hat\lambda = 1/\bar X_n$. Find $\tau^2$ by the recipe.`, h: [R`$\mu = 1/\lambda$, $\var X = 1/\lambda^2$, $g(u) = 1/u$.`, R`$g'(u) = -1/u^2$, so $g'(\mu) = -\lambda^2$.`], a: [['τ² (use lambda)', 'lambda^2', { lambda: [0.2, 5] }]],
  s: R`CLT: $\sqrt n(\bar X_n - 1/\lambda)\to N(0, 1/\lambda^2)$. Delta: $g'(1/\lambda)^2 = \lambda^4\ne0$, so $\tau^2 = \lambda^4\cdot\frac1{\lambda^2} = \lambda^2$. Check with Fisher: $I_1 = 1/\lambda^2$ gives the same answer. **Rule of thumb:** use the delta method whenever the estimator is a *nonlinear* function of an average. When it *is* the average (or a constant times it), $g'$ is a constant and you can skip it.` }),

H('Level 3: MoM through the shortcut formula, and spotting failures'),
P({ k: 'i', lvl: 3, q: R`$f(x;\theta) = \theta x^{\theta-1}$ on $(0,1)$. $\mu(\theta) = \frac{\theta}{\theta+1}$, $\E X^2 = \frac{\theta}{\theta+2}$. Use $\tau^2_{\text{MoM}} = \var_\theta(X)/\mu'(\theta)^2$.`, h: [R`$\mu'(\theta) = \frac1{(\theta+1)^2}$.`, R`$\var X = \frac{\theta}{\theta+2} - \frac{\theta^2}{(\theta+1)^2} = \frac{\theta}{(\theta+2)(\theta+1)^2}$.`], a: [['τ² (use theta)', 'theta*(theta+1)^2/(theta+2)', { theta: [0.3, 4] }]],
  s: R`$\hat\theta = \mu^{-1}(\bar X_n)$, and $(\mu^{-1})'(\mu) = 1/\mu'(\theta) = (\theta+1)^2$. So
$$\tau^2 = (\theta+1)^4\cdot\frac{\theta}{(\theta+2)(\theta+1)^2} = \frac{\theta(\theta+1)^2}{\theta+2}.$$
This is the same as solving $\hat\theta = \bar X/(1-\bar X)$ and differentiating $g(u) = u/(1-u)$, but you never have to write $g$ down.` }),
P({ k: 'j', lvl: 3, q: R`$X_i\iid\Ber(\frac12)$, $\hat\theta = \bar X_n(1-\bar X_n)$. What does the delta method give for $\sqrt n(\hat\theta - \frac14)$, and is it useful?`, a: { choice: [R`$N(0,0)$: $g'(\frac12) = 0$, so it is degenerate and useless; the real limit is at rate $n$ and not normal`, R`$N(0,\frac14)$`, R`$N(0,\frac1{16})$`], v: 0 },
  s: R`$g(u) = u(1-u)$, $g'(u) = 1 - 2u$, $g'(\frac12) = 0$. The first-order term vanishes, so $\sqrt n(\hat\theta - \frac14)\to0$. A second-order expansion gives $n(\hat\theta - \frac14) = -n(\bar X_n - \frac12)^2\to-\frac14\chi^2_1$. **Always check $g'(\mu)\ne0$ and say so in your answer.**` }),
P({ k: 'k', lvl: 3, q: R`$X_i\iid\Unif(0,\theta)$, $\hat\theta_{\text{ML}} = \max X_i$. Can you get its asymptotic variance from $1/I_1(\theta)$ or from the delta method?`, a: { choice: ['No: it is not a function of an average and the support depends on θ. Use P(max ≤ x) = (x/θ)ⁿ instead', 'Yes, 1/I₁(θ) = θ²', 'Yes, by the delta method on X̄'], v: 0 },
  s: R`Neither tool applies. The max converges at rate $n$: $n(\theta - \hat\theta)/\theta\to\Exp(1)$ (page 9.3). Questions about a max or min want the exact CDF $F(x)^n$, not $\tau^2$.` }),

H('Level 4: exam level'),
P({ k: 'l', lvl: 4, q: R`**(Same model as 2025 Midterm 2, Ex. 3.)** $F(x) = (x/\theta)^2$ on $[0,\theta]$. (i) Find $\E X$ and $\var X$. (ii) Find $\hat\theta_{\text{MoM}}$ and $\tau^2$ in $\sqrt n(\hat\theta_{\text{MoM}} - \theta)\to N(0,\tau^2)$.`, h: [R`Density $f(x) = 2x/\theta^2$. $\E X = \int_0^\theta 2x^2/\theta^2\dd x$, $\E X^2 = \int_0^\theta 2x^3/\theta^2\dd x$.`, R`$\E X = 2\theta/3$, so $\hat\theta = \frac32\bar X_n$ and $g' = \frac32$.`],
  a: [['E X (use theta)', '2*theta/3', { theta: [0.5, 4] }], ['Var X (use theta)', 'theta^2/18', { theta: [0.5, 4] }], ['τ² (use theta)', 'theta^2/8', { theta: [0.5, 4] }]],
  s: R`(i) $\E X = \frac{2\theta}3$, $\E X^2 = \frac{\theta^2}2$, $\var X = \frac{\theta^2}2 - \frac{4\theta^2}9 = \frac{\theta^2}{18}$.
(ii) $\bar X_n = \frac{2\theta}3$ gives $\hat\theta = \frac32\bar X_n$. CLT: $\sqrt n(\bar X_n - \frac{2\theta}3)\to N(0, \frac{\theta^2}{18})$. $g(u) = \frac32u$, $g' = \frac32$:
$$\tau^2 = \frac94\cdot\frac{\theta^2}{18} = \frac{\theta^2}8,\qquad\hat\theta_{\text{MoM}}\approx N\left(\theta, \frac{\theta^2}{8n}\right).$$
(The MLE here is the max, which falls under Level 3 (k): no $1/I_1$.)` }),
P({ k: 'm', lvl: 4, q: R`**Function of the empirical CDF.** Fix $x$ with $0<F(x)<1$. Find $\tau^2$ for $\sqrt n\big(\log\hat F_n(x) - \log F(x)\big)$ in terms of $F = F(x)$, then for $\sqrt n\big(\hat F_n(x)^2 - F^2\big)$.`, h: [R`Start from $\tau^2 = F(1-F)$ for $\hat F_n(x)$, then multiply by $h'(F)^2$.`],
  a: [['log: τ² (use F)', '(1-F)/F', { F: [0.05, 0.95] }], ['square: τ² (use F)', '4*F^3*(1-F)', { F: [0.05, 0.95] }]],
  s: R`Step 2 (CLT on indicators): $\sqrt n(\hat F_n(x) - F)\to N(0, F(1-F))$.
Log: $h' = 1/F\ne0$, so $\tau^2 = \frac{F(1-F)}{F^2} = \frac{1-F}F$.
Square: $h' = 2F\ne0$, so $\tau^2 = 4F^2\cdot F(1-F) = 4F^3(1-F)$.` }),
P({ k: 'n', lvl: 4, q: R`**Function of an MLE.** $X_i\iid\Pois(\lambda)$, $\psi = P(X = 0) = e^{-\lambda}$. Give the MLE $\hat\psi$, its $\tau^2$, and the approximate distribution of $\hat\psi$ for $n$ observations.`, h: [R`Equivariance: $\hat\psi = e^{-\bar X_n}$. Then $h(\lambda) = e^{-\lambda}$ and $1/I_1 = \lambda$.`],
  a: [['τ² (use lambda)', 'lambda*exp(-2*lambda)', { lambda: [0.2, 4] }]],
  s: R`$\hat\psi = e^{-\bar X_n}$. $\sqrt n(\hat\lambda - \lambda)\to N(0,\lambda)$ (from $1/I_1$, or the CLT). $h'(\lambda) = -e^{-\lambda}\ne0$, so
$$\sqrt n(\hat\psi - \psi)\to N\big(0,\ \lambda e^{-2\lambda}\big),\qquad\hat\psi\approx N\left(e^{-\lambda}, \frac{\lambda e^{-2\lambda}}n\right).$$
The mean of the approximation is the true $\psi = e^{-\lambda}$, because $\hat\psi$ is consistent.` }),
]);
