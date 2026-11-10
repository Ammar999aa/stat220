TOPIC({ id: '5.4', ch: 5, title: 'Continuous mapping, Slutsky and the delta method', summary: 'Pass limits through functions, sums and products (Thm 5.5); asymptotic normality of g(X̄) via the delta method.' }, [
R`The LLN and the CLT are about $\bar X_n$ itself. But estimators are usually *functions* of sample means: $1/\bar X_n$, $\log\bar X_n$, $\hat p_n(1-\hat p_n)$, $\bar X_n/\bar Y_n$, or a mean divided by an estimated standard deviation. This page gives the three tools that carry limits through such functions:
<ol><li>**Theorem 5.5** (continuous mapping and Slutsky): where $g(X_n)$, $X_n + Y_n$ and $X_nY_n$ converge;</li><li>the **delta method**: the normal approximation for $g(\bar X_n)$;</li><li>the **multivariate delta method** for functions of several means.</li></ol>`,
THM('Wasserman Theorem 5.5', R`Let $X_n, X, Y_n, Y$ be random variables and $g$ a continuous function, $c$ a constant.
<ol type="a"><li>$X_n\xrightarrow{P}X$ and $Y_n\xrightarrow{P}Y$ $\Rightarrow$ $X_n + Y_n\xrightarrow{P}X + Y$.</li>
<li>$X_n\xrightarrow{2}X$ and $Y_n\xrightarrow{2}Y$ $\Rightarrow$ $X_n + Y_n\xrightarrow{2}X + Y$.</li>
<li>$X_n\xrightarrow{D}X$ and $Y_n\xrightarrow{D}c$ $\Rightarrow$ $X_n + Y_n\xrightarrow{D}X + c$.</li>
<li>$X_n\xrightarrow{P}X$ and $Y_n\xrightarrow{P}Y$ $\Rightarrow$ $X_nY_n\xrightarrow{P}XY$.</li>
<li>$X_n\xrightarrow{D}X$ and $Y_n\xrightarrow{D}c$ $\Rightarrow$ $X_nY_n\xrightarrow{D}cX$.</li>
<li>$X_n\xrightarrow{P}X$ $\Rightarrow$ $g(X_n)\xrightarrow{P}g(X)$.</li>
<li>$X_n\xrightarrow{D}X$ $\Rightarrow$ $g(X_n)\xrightarrow{D}g(X)$.</li></ol>
Parts (c) and (e) are **Slutsky's theorem**; (f) and (g) are the **continuous mapping theorem**. Deterministic sequences count too: e.g. $\frac{n}{n-1}\to1$ can be treated as a $Y_n\xrightarrow{P}1$.`),
R`In practice: once you know $\bar X_n\xrightarrow{P}\mu$ (LLN), any continuous function of sample means converges in probability to the same function of the true means. That is exactly how the slides prove $\operatorname{logit}(\hat p_n)\xrightarrow{P}\operatorname{logit}(p)$ (topic 6.3).`,
P({ k: 'a', lvl: 1, q: R`$X_1,X_2,\dots$ iid with mean $3$ and finite variance. Where does $\bar X_n^2 + 2\bar X_n$ converge in probability?`,
  h: [R`LLN: $\bar X_n\xrightarrow{P}3$. Then apply (f) with $g(x) = x^2 + 2x$.`],
  a: '15',
  s: R`By the weak LLN $\bar X_n\xrightarrow{P}3$, and $g(x) = x^2 + 2x$ is continuous, so by Theorem 5.5(f) $g(\bar X_n)\xrightarrow{P}g(3) = 9 + 6 = 15$.` }),
P({ k: 'b', lvl: 2, q: R`$X_n\xrightarrow{D}N(0,1)$ and $Y_n\xrightarrow{P}2$. Give the mean and variance of the limiting distribution of $X_nY_n + 1$.`,
  h: [R`$\xrightarrow{P}$ a constant is the same as $\xrightarrow{D}$ that constant. Slutsky (e) then (c).`],
  a: [[R`mean`, '1'], [R`variance`, '4']],
  s: R`$Y_n\xrightarrow{P}2$ implies $Y_n\xrightarrow{D}2$. By Slutsky (e), $X_nY_n\xrightarrow{D}2Z$ with $Z\sim N(0,1)$; by (c) (adding the constant sequence $1$), $X_nY_n + 1\xrightarrow{D}2Z + 1\sim N(1, 4)$.` }),
P({ k: 'c', lvl: 2, q: R`$X_1,\dots,X_n\iid\Exp(\beta)$. Where does $1/\bar X_n$ converge in probability? (Answer in terms of $\beta$.)`,
  h: [R`$g(x) = 1/x$ is continuous at $\beta>0$.`],
  a: { expr: '1/beta', vars: { beta: [0.5, 4] } },
  s: R`LLN: $\bar X_n\xrightarrow{P}\beta$. $g(x) = 1/x$ is continuous on $(0,\infty)$, which contains $\beta$, so $1/\bar X_n\xrightarrow{P}1/\beta$ (the rate $\lambda$ in the slides' example). Careful: this does **not** mean $E(1/\bar X_n) = 1/\beta$; that estimator is biased (topic 6.2).` }),
WARN('Convergence in distribution does not add up', R`If $X_n\xrightarrow{D}X$ and $Y_n\xrightarrow{D}Y$, you **cannot** conclude $X_n + Y_n\xrightarrow{D}X + Y$ (or $X_nY_n\xrightarrow{D}XY$). Distributional limits know nothing about how $X_n$ and $Y_n$ depend on each other. Slutsky only works when one of the two limits is a **constant**.

Counterexample: $Z\sim N(0,1)$, $X_n = Z$ and $Y_n = -Z$. Both converge in distribution to $N(0,1)$ (since $-Z\sim N(0,1)$ too), yet $X_n + Y_n = 0$ for every $n$.`),
P({ k: 'd', lvl: 2, q: R`In the counterexample above ($X_n = Z$, $Y_n = -Z$), does $X_n + Y_n\xrightarrow{D}N(0,2)$?`,
  h: [R`Compute $X_n + Y_n$ exactly.`],
  a: { choice: ['Yes', 'No'], v: 1 },
  s: R`**No.** $X_n + Y_n = 0$ for every $n$, so it converges to the point mass at $0$. If instead $Y_n = Z$, the sum would be $2Z\sim N(0,4)$. Neither is $N(0,2)$, which is what "adding the limits as if independent" would suggest.` }),
H('Slutsky in action: replacing σ by an estimate'),
R`Theorem 5.10 (topic 5.3) says $\frac{\sqrt n(\bar X_n - \mu)}{S_n}\xrightarrow{D}N(0,1)$. Proof:
$$\frac{\sqrt n(\bar X_n - \mu)}{S_n} = \underbrace{\frac{\sqrt n(\bar X_n - \mu)}{\sigma}}_{\xrightarrow{D}N(0,1)\text{ (CLT)}}\cdot\underbrace{\frac{\sigma}{S_n}}_{\xrightarrow{P}1}.$$
$S_n^2\xrightarrow{P}\sigma^2$ (LLN plus Theorem 5.5, as in HW7 A1), so $\sigma/S_n\xrightarrow{P}1$ by continuous mapping, and Slutsky (e) finishes the proof.`,
P({ k: 'e', lvl: 3, q: R`$X_1,\dots,X_n\iid\Ber(p)$ with $0<p<1$ and $\hat p_n = \bar X_n$. Prove that
$$\frac{\sqrt n(\hat p_n - p)}{\sqrt{\hat p_n(1-\hat p_n)}}\xrightarrow{D}N(0,1).$$
Name every theorem you use.`,
  h: [R`Split into $\frac{\sqrt n(\hat p_n - p)}{\sqrt{p(1-p)}}\cdot\sqrt{\frac{p(1-p)}{\hat p_n(1-\hat p_n)}}$.`, R`The first factor is the CLT; for the second use the LLN and continuous mapping with $g(x) = \sqrt{p(1-p)/(x(1-x))}$, continuous at $x = p$.`],
  s: R`Write
$$\frac{\sqrt n(\hat p_n - p)}{\sqrt{\hat p_n(1-\hat p_n)}} = A_n\cdot B_n,\quad A_n = \frac{\sqrt n(\hat p_n - p)}{\sqrt{p(1-p)}},\quad B_n = \sqrt{\frac{p(1-p)}{\hat p_n(1-\hat p_n)}}.$$
- **CLT:** the $X_i$ are iid with mean $p$ and variance $p(1-p)\in(0,\infty)$, so $A_n\xrightarrow{D}N(0,1)$.
- **WLLN:** $\hat p_n\xrightarrow{P}p$.
- **Continuous mapping (Thm 5.5(f)):** $g(x) = \sqrt{p(1-p)/(x(1-x))}$ is continuous at $x = p\in(0,1)$, so $B_n = g(\hat p_n)\xrightarrow{P}g(p) = 1$.
- **Slutsky (Thm 5.5(e)):** $A_n\xrightarrow{D}Z$ and $B_n\xrightarrow{P}1$ give $A_nB_n\xrightarrow{D}1\cdot Z\sim N(0,1)$. $\blacksquare$

This is what justifies the usual interval $\hat p_n\pm z_{\alpha/2}\sqrt{\hat p_n(1-\hat p_n)/n}$ (slides Ch.6).` }),
H('The delta method'),
R`Suppose $\bar X_n\approx N(\mu, \sigma^2/n)$ and we look at $g(\bar X_n)$. Since $\bar X_n$ is very close to $\mu$, a first-order Taylor expansion is accurate:
$$g(\bar X_n)\approx g(\mu) + g'(\mu)(\bar X_n - \mu).$$
The right side is a linear function of an approximately normal variable, so it is approximately $N\big(g(\mu), g'(\mu)^2\sigma^2/n\big)$.`,
THM('Delta method (Wasserman Thm 5.13)', R`Suppose $\frac{\sqrt n(Y_n - \mu)}{\sigma}\xrightarrow{D}N(0,1)$ and $g$ is differentiable with $g'(\mu)\ne0$. Then
$$\frac{\sqrt n\big(g(Y_n) - g(\mu)\big)}{|g'(\mu)|\,\sigma}\xrightarrow{D}N(0,1),\qquad\text{i.e.}\qquad\sqrt n\big(g(Y_n) - g(\mu)\big)\xrightarrow{D}N\big(0,\ g'(\mu)^2\sigma^2\big).$$
So $g(Y_n)\approx N\left(g(\mu), \frac{g'(\mu)^2\sigma^2}{n}\right)$.`),
R`**Recipe.** (1) Find $\mu$ and $\sigma^2$ of one observation, and state the CLT for $\bar X_n$. (2) Compute $g'(\mu)$ and check it is $\ne0$. (3) Asymptotic variance $= g'(\mu)^2\sigma^2$.`,
P({ k: 'f', lvl: 1, q: R`$X_i$ iid with $\mu = 2$, $\sigma^2 = 1$, and $g(x) = x^2$. Find the variance of the normal limit of $\sqrt n(\bar X_n^2 - 4)$.`,
  h: [R`$g'(x) = 2x$, so $g'(2) = 4$.`],
  a: '16',
  s: R`$g'(\mu)^2\sigma^2 = (2\cdot2)^2\cdot1 = 16$. So $\sqrt n(\bar X_n^2 - 4)\xrightarrow{D}N(0, 16)$.` }),
P({ k: 'g', lvl: 2, q: R`$X_1,\dots,X_n\iid\Exp(\beta)$. Find the asymptotic variance of $\sqrt n(\log\bar X_n - \log\beta)$.`,
  h: [R`$\mu = \beta$, $\sigma^2 = \beta^2$, $g'(x) = 1/x$.`],
  a: '1',
  s: R`CLT: $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0,\beta^2)$. With $g = \log$, $g'(\beta) = \frac1\beta\ne0$, so the limit is $N\left(0, \frac{1}{\beta^2}\beta^2\right) = N(0,1)$.

The variance no longer depends on $\beta$: the log is a **variance-stabilizing** transformation for the exponential. So $\log\bar X_n\pm\frac{1.96}{\sqrt n}$ is an approximate 95% interval for $\log\beta$.` }),
P({ k: 'h', lvl: 2, q: R`$X_1,\dots,X_n\iid\Exp(\beta)$ and $\hat\lambda_n = 1/\bar X_n$ estimates the rate $\lambda = 1/\beta$. Find the asymptotic variance of $\sqrt n(\hat\lambda_n - 1/\beta)$, in terms of $\beta$.`,
  h: [R`$g(x) = 1/x$, $g'(x) = -1/x^2$.`],
  a: { expr: '1/beta^2', vars: { beta: [0.5, 4] } },
  s: R`$g'(\beta) = -\frac1{\beta^2}$, so $g'(\beta)^2\sigma^2 = \frac{1}{\beta^4}\cdot\beta^2 = \frac1{\beta^2} = \lambda^2$. Hence $\sqrt n(\hat\lambda_n - \lambda)\xrightarrow{D}N(0, \lambda^2)$.`, src: 'Slides Ch.6 (Exp estimators)' }),
P({ k: 'i', lvl: 3, q: R`$X_1,\dots,X_n\iid\Ber(p)$, $0<p<1$, and $\hat\psi_n = \operatorname{logit}(\hat p_n) = \log\frac{\hat p_n}{1 - \hat p_n}$ (slides Ch.6). Find the asymptotic variance of $\sqrt n(\hat\psi_n - \psi)$ in terms of $p$.`,
  h: [R`$\frac{\dd}{\dd p}\log\frac{p}{1-p} = \frac1p + \frac1{1-p} = \frac{1}{p(1-p)}$.`],
  a: { expr: '1/(p*(1-p))', vars: { p: [0.1, 0.9] } },
  s: R`CLT: $\sqrt n(\hat p_n - p)\xrightarrow{D}N(0, p(1-p))$. $g(p) = \log p - \log(1-p)$ has $g'(p) = \frac{1}{p(1-p)}\ne0$. Delta method:
$$\sqrt n(\hat\psi_n - \psi)\xrightarrow{D}N\left(0, \frac{p(1-p)}{p^2(1-p)^2}\right) = N\left(0, \frac{1}{p(1-p)}\right).$$` }),
P({ k: 'j', lvl: 3, q: R`$X_1,\dots,X_n\iid\Pois(\lambda)$. Find the asymptotic variance of $\sqrt n\big(\sqrt{\bar X_n} - \sqrt\lambda\big)$.`,
  h: [R`$\mu = \sigma^2 = \lambda$; $g'(x) = \frac1{2\sqrt x}$.`],
  a: '1/4',
  s: R`$g'(\lambda)^2\sigma^2 = \frac{1}{4\lambda}\cdot\lambda = \frac14$. The square root stabilizes the Poisson variance.` }),
H('When g′(μ) = 0: go to second order'),
R`If $g'(\mu) = 0$, the delta method only gives $\sqrt n(g(\bar X_n) - g(\mu))\xrightarrow{D}N(0,0)$, i.e. convergence to $0$: true but useless. The fluctuations are of smaller order, so magnify by $n$ instead of $\sqrt n$. A second-order expansion gives
$$g(\bar X_n) - g(\mu)\approx\tfrac12g''(\mu)(\bar X_n - \mu)^2\quad\Longrightarrow\quad n\big(g(\bar X_n) - g(\mu)\big)\xrightarrow{D}\tfrac12g''(\mu)\sigma^2\,\chi^2_1,$$
because $\left(\frac{\sqrt n(\bar X_n - \mu)}{\sigma}\right)^2\xrightarrow{D}Z^2\sim\chi^2_1$ by the continuous mapping theorem (Thm 5.5(g)). When $g$ is exactly quadratic (as in HW7 B3), you can complete the square and use only continuous mapping.`,
P({ k: 'k', lvl: 3, q: R`$X_1,\dots,X_n\iid\Unif(-3,3)$ (so $\mu = 0$, $\sigma^2 = 3$), and $g(x) = x^2$.
(a) Does $\sqrt n\,\bar X_n^2$ have a non-degenerate normal limit?
(b) $n\bar X_n^2\xrightarrow{D}c\,\chi^2_1$. Find $c$.`,
  h: [R`$g'(0) = 0$: the delta method degenerates.`, R`$n\bar X_n^2 = \left(\sqrt n\,\bar X_n\right)^2$ and $\sqrt n\,\bar X_n\xrightarrow{D}N(0, 3)$.`],
  a: [[R`(a)`, { choice: ['Yes', 'No'], v: 1 }], [R`(b) $c$`, '3']],
  s: R`$\var(X_i) = \frac{6^2}{12} = 3$.

**(a)** No: $g'(0) = 0$, and indeed $\sqrt n\,\bar X_n^2 = \frac{1}{\sqrt n}\left(\sqrt n\,\bar X_n\right)^2\xrightarrow{P}0$ (Slutsky: a $\xrightarrow{D}$ variable times $\frac1{\sqrt n}\to0$).

**(b)** CLT: $\frac{\sqrt n\,\bar X_n}{\sqrt3}\xrightarrow{D}Z\sim N(0,1)$. Continuous mapping with $x\mapsto x^2$: $\frac{n\bar X_n^2}{3}\xrightarrow{D}Z^2\sim\chi^2_1$, so $n\bar X_n^2\xrightarrow{D}3\chi^2_1$: $c = 3$. (Check with the formula: $\frac12g''(0)\sigma^2 = \frac12\cdot2\cdot3 = 3$.)`, src: 'like HW7 B3(3)' }),
H('The multivariate delta method'),
THM('Multivariate delta method (Wasserman Thm 5.15)', R`Suppose $\sqrt n(\bar{\mathbf Y}_n - \boldsymbol\mu)\xrightarrow{D}N_k(\mathbf 0, \Sigma)$ (multivariate CLT, topic 5.3), and $g:\R^k\to\R$ has gradient $\nabla g(\boldsymbol\mu)\ne\mathbf 0$. Then
$$\sqrt n\big(g(\bar{\mathbf Y}_n) - g(\boldsymbol\mu)\big)\xrightarrow{D}N\big(0,\ \nabla g(\boldsymbol\mu)^T\,\Sigma\,\nabla g(\boldsymbol\mu)\big).$$`),
R`For $k = 2$ with $\nabla g(\boldsymbol\mu) = (a, b)^T$: the asymptotic variance is $a^2\sigma_{11} + 2ab\,\sigma_{12} + b^2\sigma_{22}$.`,
P({ k: 'l', lvl: 3, q: R`Pairs $(X_i,Y_i)$ iid with mean $(1, 2)$ and covariance $\Sigma = \begin{pmatrix}1&0.5\\0.5&2\end{pmatrix}$. Find the asymptotic variance of $\sqrt n(\bar X_n\bar Y_n - 2)$.`,
  h: [R`$g(x,y) = xy$, $\nabla g = (y, x)$, so $\nabla g(1,2) = (2, 1)$.`],
  a: '8',
  s: R`$\nabla g(\boldsymbol\mu) = (2,1)^T$, so
$$\nabla g^T\Sigma\nabla g = 2^2\cdot1 + 2\cdot2\cdot1\cdot0.5 + 1^2\cdot2 = 4 + 2 + 2 = 8.$$` }),
P({ k: 'm', lvl: 4, q: R`$X_1,\dots,X_n\iid\Exp(\beta)$. We estimate $\theta = P(X>1) = e^{-1/\beta}$ by $\hat\theta_n = e^{-1/\bar X_n}$.
(a) Where does $\hat\theta_n$ converge in probability?
(b) Asymptotic variance of $\sqrt n(\hat\theta_n - \theta)$, in terms of $\beta$.
(c) With $\beta = 1$, $n = 100$: the approximate standard deviation of $\hat\theta_n$.`,
  h: [R`(a) continuous mapping; (b) $g(x) = e^{-1/x}$, $g'(x) = \frac{e^{-1/x}}{x^2}$.`],
  a: [[R`(a)`, { expr: 'exp(-1/beta)', vars: { beta: [0.5, 4] } }], [R`(b)`, { expr: 'exp(-2/beta)/beta^2', vars: { beta: [0.5, 4] } }], [R`(c)`, 'exp(-1)/10']],
  s: R`**(a)** WLLN: $\bar X_n\xrightarrow{P}\beta$; $g(x) = e^{-1/x}$ is continuous on $(0,\infty)$, so $\hat\theta_n\xrightarrow{P}e^{-1/\beta} = \theta$: consistent.

**(b)** CLT: $\sqrt n(\bar X_n - \beta)\xrightarrow{D}N(0, \beta^2)$. $g'(\beta) = \frac{e^{-1/\beta}}{\beta^2}\ne0$. Delta method:
$$\sqrt n(\hat\theta_n - \theta)\xrightarrow{D}N\left(0, \frac{e^{-2/\beta}}{\beta^4}\beta^2\right) = N\left(0, \frac{e^{-2/\beta}}{\beta^2}\right).$$

**(c)** $\sd(\hat\theta_n)\approx\sqrt{\frac{e^{-2}}{100}} = \frac{e^{-1}}{10}\approx0.0368$. An approximate 95% interval would be $\hat\theta_n\pm1.96\cdot0.0368$ (with $\beta$ replaced by $\bar X_n$ in practice).` }),
]);

DRILLS('5.4', [
  { k: '01', lvl: 1, q: R`$\bar X_n\xrightarrow{P}4$. Where does $\sqrt{\bar X_n}$ converge in probability?`, h: [R`Continuous mapping.`], a: '2', s: R`$\sqrt{\cdot}$ is continuous at 4, so $\sqrt{\bar X_n}\xrightarrow{P}2$ (Thm 5.5(f)).` },
  { k: '02', lvl: 1, q: R`$X_n\xrightarrow{D}N(0,1)$ and $Y_n\xrightarrow{P}3$. Variance of the limit of $Y_nX_n$?`, h: [R`Slutsky: $Y_nX_n\xrightarrow{D}3Z$.`], a: '9', s: R`$3Z\sim N(0,9)$.` },
  { k: '03', lvl: 2, q: R`$\mu = 1$, $\sigma^2 = 2$, $g(x) = x^3$. Asymptotic variance of $\sqrt n(\bar X_n^3 - 1)$?`, h: [R`$g'(1) = 3$.`], a: '18', s: R`$g'(\mu)^2\sigma^2 = 9\cdot2 = 18$.` },
  { k: '04', lvl: 2, q: R`$\mu = 0$, $\sigma^2 = 4$, $g(x) = e^x$. Asymptotic variance of $\sqrt n(e^{\bar X_n} - 1)$?`, h: [R`$g'(0) = 1$.`], a: '4', s: R`$1^2\cdot4 = 4$.` },
  { k: '05', lvl: 2, q: R`$X_i\iid\Pois(\lambda)$. Asymptotic variance of $\sqrt n(1/\bar X_n - 1/\lambda)$, in terms of $\lambda$?`, h: [R`$g'(\lambda) = -1/\lambda^2$, $\sigma^2 = \lambda$.`], a: { expr: '1/lambda^3', vars: { lambda: [0.5, 5] } }, s: R`$\frac{1}{\lambda^4}\cdot\lambda = \frac1{\lambda^3}$.` },
  { k: '06', lvl: 2, q: R`$X_i\iid\Ber(p)$. Asymptotic variance of $\sqrt n(\hat p_n^2 - p^2)$, in terms of $p$?`, h: [R`$g'(p) = 2p$, $\sigma^2 = p(1-p)$.`], a: { expr: '4*p^3*(1-p)', vars: { p: [0.1, 0.9] } }, s: R`$(2p)^2p(1-p) = 4p^3(1-p)$, valid for $p>0$ (so $g'(p)\ne0$).` },
  { k: '07', lvl: 2, q: R`$X_i\iid\Exp(\beta)$. Asymptotic variance of $\sqrt n(\bar X_n^2 - \beta^2)$, in terms of $\beta$?`, h: [R`$g'(\beta) = 2\beta$, $\sigma^2 = \beta^2$.`], a: { expr: '4*beta^4', vars: { beta: [0.5, 3] } }, s: R`$(2\beta)^2\beta^2 = 4\beta^4$.` },
  { k: '08', lvl: 2, q: R`True or false: if $X_n\xrightarrow{D}X$ and $Y_n\xrightarrow{D}Y$, then $X_nY_n\xrightarrow{D}XY$.`, h: [R`Slutsky needs one limit to be a constant.`], a: { choice: ['Always true', 'Not true in general'], v: 1 }, s: R`Not in general. Take $Z\sim N(0,1)$, $X_n = Z$, $Y_n = -Z$: both $\xrightarrow{D}N(0,1)$, but $X_nY_n = -Z^2\le0$, while for *independent* $X, Y\sim N(0,1)$ the product $XY$ is symmetric about 0. Distributional limits do not determine the joint behaviour.` },
  { k: '09', lvl: 3, q: R`$X_i$ iid with $\mu = 0$, $\sigma^2 = 2$, and $g(x) = \cos x$. Then $n(\cos\bar X_n - 1)\xrightarrow{D}W$. Give $E(W)$ and $\var(W)$.`, h: [R`$g'(0) = 0$, $g''(0) = -1$: second order. $W = \frac12g''(0)\sigma^2\chi^2_1$.`, R`$E(\chi^2_1) = 1$, $\var(\chi^2_1) = 2$.`], a: [[R`$E(W)$`, '-1'], [R`$\var(W)$`, '2']],
    s: R`$\cos x = 1 - \frac{x^2}{2} + O(x^4)$, so $n(\cos\bar X_n - 1)\approx-\frac12\left(\sqrt n\,\bar X_n\right)^2$. CLT: $\sqrt n\,\bar X_n\xrightarrow{D}N(0,2)$, so $\left(\sqrt n\bar X_n\right)^2\xrightarrow{D}2\chi^2_1$ (continuous mapping). Hence $W = -\chi^2_1$: $E(W) = -1$, $\var(W) = 2$.` },
  { k: '10', lvl: 3, q: R`$X_i\iid\Unif(0,1)$ and $g(x) = x(1-x)$. Show $n\left[\frac14 - \bar X_n(1-\bar X_n)\right]\xrightarrow{D}c\,\chi^2_1$ and find $c$.`, h: [R`Complete the square: $\frac14 - x(1-x) = \left(x - \frac12\right)^2$.`, R`$\mu = \frac12$, $\sigma^2 = \frac1{12}$.`], a: '1/12',
    s: R`$\frac14 - \bar X_n(1-\bar X_n) = \left(\bar X_n - \frac12\right)^2$. CLT: $\sqrt{12n}\left(\bar X_n - \frac12\right)\xrightarrow{D}Z\sim N(0,1)$. Continuous mapping with $x\mapsto x^2$: $12n\left(\bar X_n - \frac12\right)^2\xrightarrow{D}\chi^2_1$, so $n\left[\frac14 - \bar X_n(1-\bar X_n)\right]\xrightarrow{D}\frac1{12}\chi^2_1$: $c = \frac1{12}$.

(The first-order delta method fails because $g'(\frac12) = 0$.)`, src: 'like HW7 B3(3)' },
  { k: '11', lvl: 3, q: R`Pairs $(X_i,Y_i)$ iid with means $(2,4)$, $\var X = 1$, $\var Y = 4$, $\cov(X,Y) = 0$. Asymptotic variance of $\sqrt n\left(\frac{\bar X_n}{\bar Y_n} - \frac12\right)$?`, h: [R`$\nabla g = \left(\frac1{\mu_2}, -\frac{\mu_1}{\mu_2^2}\right) = \left(\frac14, -\frac18\right)$.`], a: '1/8',
    s: R`$\nabla g^T\Sigma\nabla g = \frac1{16}\cdot1 + \frac{1}{64}\cdot4 = \frac1{16} + \frac1{16} = \frac18$. (General formula, as in HW7 C1: $\frac{\sigma_{11}}{\mu_2^2} - \frac{2\mu_1\sigma_{12}}{\mu_2^3} + \frac{\mu_1^2\sigma_{22}}{\mu_2^4}$.)` },
  { k: '12', lvl: 3, q: R`$X_i\iid\Exp(\beta)$. Find the variance of the limit of $\frac{\sqrt n(\bar X_n - \beta)}{\bar X_n}$.`, h: [R`Multiply and divide by $\beta$: CLT times something $\xrightarrow{P}1$.`], a: '1',
    s: R`$\frac{\sqrt n(\bar X_n - \beta)}{\bar X_n} = \frac{\sqrt n(\bar X_n - \beta)}{\beta}\cdot\frac{\beta}{\bar X_n}$. The first factor $\xrightarrow{D}N(0,1)$ (CLT, since $\sigma = \beta$); the second $\xrightarrow{P}1$ (LLN + continuous mapping). Slutsky: the product $\xrightarrow{D}N(0,1)$, variance $1$.` },
  { k: '13', lvl: 4, q: R`$X_1,\dots,X_n\iid\Geom(p)$ on $\{1,2,\dots\}$ (mean $1/p$, variance $(1-p)/p^2$), and $\hat p_n = 1/\bar X_n$.
(a) Where does $\hat p_n$ converge in probability?
(b) Asymptotic variance of $\sqrt n(\hat p_n - p)$.
(c) With $n = 100$ and $\bar x = 4$, the half-width of the approximate 95% interval $\hat p\pm1.96\,\widehat{\text{se}}$ (plug $\hat p$ into the variance).`,
    h: [R`$g(x) = 1/x$, $g'(1/p) = -p^2$.`, R`(c): $\hat p = 0.25$, $\widehat{\text{se}} = \sqrt{\hat p^2(1-\hat p)/n}$.`],
    a: [[R`(a)`, { expr: 'p', vars: { p: [0.1, 0.9] } }], [R`(b)`, { expr: 'p^2*(1-p)', vars: { p: [0.1, 0.9] } }], [R`(c)`, '1.96*sqrt(0.0625*0.75/100)']],
    s: R`**(a)** WLLN: $\bar X_n\xrightarrow{P}\frac1p$; $x\mapsto1/x$ is continuous at $\frac1p>0$, so $\hat p_n\xrightarrow{P}p$ (consistent).

**(b)** CLT: $\sqrt n\left(\bar X_n - \frac1p\right)\xrightarrow{D}N\left(0, \frac{1-p}{p^2}\right)$. $g'(x) = -\frac1{x^2}$, so $g'(1/p) = -p^2\ne0$. Delta method: asymptotic variance $p^4\cdot\frac{1-p}{p^2} = p^2(1-p)$.

**(c)** $\hat p = 0.25$, $\widehat{\text{se}} = \sqrt{\frac{0.0625\cdot0.75}{100}}\approx0.02165$, half-width $1.96\cdot0.02165\approx0.0424$, giving $(0.208, 0.292)$. (Using $\hat p$ in place of $p$ is justified by Slutsky.)` },
  { k: '14', lvl: 4, q: R`Pairs $(X_i,Y_i)$ are iid, with $X_i\sim\Ber(p)$ and $Y_i\sim\Pois(\lambda)$ independent of each other. We estimate $\theta = p\lambda$ by $\hat\theta_n = \bar X_n\bar Y_n$.
(a) Asymptotic variance of $\sqrt n(\hat\theta_n - \theta)$ in terms of $p,\lambda$.
(b) For $p = 0.5$, $\lambda = 2$, $n = 200$: approximate standard deviation of $\hat\theta_n$.`,
    h: [R`$\Sigma = \operatorname{diag}(p(1-p), \lambda)$; $\nabla g(p,\lambda) = (\lambda, p)$.`],
    a: [[R`(a)`, { expr: 'lambda^2*p*(1-p)+p^2*lambda', vars: { p: [0.1, 0.9], lambda: [0.5, 4] } }], [R`(b)`, 'sqrt(1.5/200)']],
    s: R`**(a)** Multivariate CLT: $\sqrt n\big((\bar X_n,\bar Y_n) - (p,\lambda)\big)\xrightarrow{D}N_2(\mathbf 0, \Sigma)$, $\Sigma = \begin{pmatrix}p(1-p)&0\\0&\lambda\end{pmatrix}$ (independent components). $g(x,y) = xy$, $\nabla g(p,\lambda) = (\lambda, p)^T\ne\mathbf 0$. Multivariate delta method:
$$\nabla g^T\Sigma\nabla g = \lambda^2p(1-p) + p^2\lambda.$$

**(b)** $4\cdot0.25 + 0.25\cdot2 = 1.5$, so $\sd(\hat\theta_n)\approx\sqrt{1.5/200}\approx0.0866$.` },
  { k: '15', lvl: 3, q: R`(Variance stabilization) For $X_i\iid\Pois(\lambda)$, find $g$ with $g(0) = 0$ such that $\sqrt n\big(g(\bar X_n) - g(\lambda)\big)\xrightarrow{D}N(0,1)$ for every $\lambda>0$. Enter $g(4)$.`, h: [R`Need $g'(\lambda)^2\lambda = 1$.`], a: '4',
    s: R`$g'(\lambda) = \lambda^{-1/2}$, so $g(\lambda) = 2\sqrt\lambda$ and $g(4) = 4$. Then $2\sqrt{\bar X_n}\pm\frac{1.96}{\sqrt n}$ is an approximate 95% interval for $2\sqrt\lambda$, with no unknown in the width.` },
]);
