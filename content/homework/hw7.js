HW({ id: 'hw7', title: 'Homework 7', summary: 'Convergence (Ch.5): modes of convergence, LLN, CLT, delta method.',
  intro: R`Topics: Chapter 5 (convergence of random variables). The B problems were **due Nov 4, 8:30** on Blackboard and have been submitted. **Official solutions exist**: the solutions below follow them, with extra steps and explanations added. Notation: $\xrightarrow{P}$ in probability, $\xrightarrow{D}$ in distribution, $\xrightarrow{\text{qm}}$ (also written $\xrightarrow{2}$) in quadratic mean. "Theorem 5.5" is the textbook's list of rules for combining limits (sums, products, continuous functions).` }, [
  { k: 'A1 (a)', topic: '3.4', lvl: 2, q: R`Let $X_1,\dots,X_n$ be iid with finite mean $\mu$ and finite variance $\sigma^2$, and let $S_n^2 = \frac{1}{n-1}\sum_{i=1}^n(X_i - \bar X_n)^2$. Show that $\E[S_n^2] = \sigma^2$.`,
    h: [R`First simplify the sum of squares: expand $(X_i - \bar X)^2$ and use $\sum_i X_i = n\bar X$. You should get $\sum(X_i-\bar X)^2 = \sum X_i^2 - n\bar X^2$.`, R`$\E[X_i^2] = \var(X_i) + (\E X_i)^2 = \sigma^2 + \mu^2$. The same trick works for $\bar X$: $\E[\bar X^2] = \var(\bar X) + \mu^2 = \frac{\sigma^2}{n} + \mu^2$.`],
    s: R`**Step 1: simplify.** Expanding the square and using $\sum_i X_i = n\bar X$:
$$\sum_{i=1}^n(X_i - \bar X)^2 = \sum X_i^2 - 2\bar X\sum X_i + n\bar X^2 = \sum X_i^2 - 2n\bar X^2 + n\bar X^2 = \sum_{i=1}^n X_i^2 - n\bar X^2.$$

**Step 2: the two expectations.** For each $i$, $\E[X_i^2] = \var(X_i) + (\E X_i)^2 = \sigma^2 + \mu^2$. Because the $X_i$ are independent, $\var(\bar X) = \frac{\sigma^2}{n}$, so $\E[\bar X^2] = \var(\bar X) + (\E\bar X)^2 = \frac{\sigma^2}{n} + \mu^2$.

**Step 3: combine** (linearity of expectation):
$$\E[S_n^2] = \frac{1}{n-1}\left\{n(\mu^2 + \sigma^2) - n\left(\mu^2 + \frac{\sigma^2}{n}\right)\right\} = \frac{1}{n-1}\big(n\sigma^2 - \sigma^2\big) = \sigma^2.$$
So $S_n^2$ is **unbiased** for $\sigma^2$. (This is why we divide by $n-1$: dividing by $n$ would give expectation $\frac{n-1}{n}\sigma^2$.)`,
    src: 'HW7 A1(a) (Wasserman 5.8.1)' },
  { k: 'A1 (b)', topic: '5.2', lvl: 3, q: R`Same setting as A1 (a): $X_1,\dots,X_n$ iid with mean $\mu$ and finite variance $\sigma^2$. Show that $S_n^2\xrightarrow{P}\sigma^2$.`,
    h: [R`Write $S_n^2$ in terms of two sample averages: $S_n^2 = \frac{n}{n-1}\cdot\frac1n\sum X_i^2 - \frac{n}{n-1}\bar X_n^2$.`, R`The weak law of large numbers applies to **any** iid sequence with finite mean. Apply it twice: to the $X_i$ and to the $X_i^2$ (their mean is $\E X_1^2 = \mu^2 + \sigma^2<\infty$).`, R`Then use the rules for combining limits in probability (Theorem 5.5): continuous functions, products and differences of convergent sequences converge to the function / product / difference of the limits.`],
    s: R`**Rewrite.** From A1 (a), $\sum(X_i - \bar X)^2 = \sum X_i^2 - n\bar X^2$, so
$$S_n^2 = \frac{n}{n-1}\cdot\underbrace{\frac1n\sum_{i=1}^nX_i^2}_{A_n} - \frac{n}{n-1}\cdot\bar X_n^2.$$

**WLLN twice.** The $X_i$ are iid with finite mean, so $\bar X_n\xrightarrow{P}\mu$. The $X_i^2$ are also iid, with finite mean $\E X_1^2 = \mu^2 + \sigma^2$, so $A_n\xrightarrow{P}\mu^2 + \sigma^2$.

**Combine (Theorem 5.5).**
- $x\mapsto x^2$ is continuous, so $\bar X_n^2\xrightarrow{P}\mu^2$ (continuous mapping).
- $\frac{n}{n-1}\to1$ is a deterministic sequence, so $\frac{n}{n-1}A_n\xrightarrow{P}\mu^2+\sigma^2$ and $\frac{n}{n-1}\bar X_n^2\xrightarrow{P}\mu^2$.
- The difference of two sequences converging in probability converges to the difference of the limits:
$$S_n^2\xrightarrow{P}(\mu^2+\sigma^2) - \mu^2 = \sigma^2.$$
So $S_n^2$ is **consistent** for $\sigma^2$ (in addition to unbiased).`,
    src: 'HW7 A1(b) (Wasserman 5.8.1)' },
  { k: 'A2', topic: '5.1', lvl: 3, q: R`Let $X_1, X_2,\dots$ be random variables and $b$ a constant. Show that $X_n\xrightarrow{\text{qm}}b$ if and only if
$$\lim_{n\to\infty}\E[X_n] = b\quad\text{and}\quad\lim_{n\to\infty}\var(X_n) = 0.$$`,
    h: [R`Everything follows from one identity. Write $\mu_n = \E X_n$ and add and subtract it inside $(X_n - b)^2$.`, R`You should find $\E[(X_n - b)^2] = \var(X_n) + (\E X_n - b)^2$: "mean squared error = variance + bias²". The cross term vanishes because $\E[X_n - \mu_n] = 0$.`, R`For "⇒": both terms on the right are $\ge0$, so each is at most their sum.`],
    s: R`**Key identity.** Let $\mu_n = \E[X_n]$. Then
$$\E[(X_n - b)^2] = \E\big[\big((X_n - \mu_n) + (\mu_n - b)\big)^2\big] = \E[(X_n-\mu_n)^2] + 2(\mu_n - b)\,\underbrace{\E[X_n - \mu_n]}_{=0} + (\mu_n - b)^2,$$
so
$$\E[(X_n - b)^2] = \var(X_n) + (\E[X_n] - b)^2.\qquad(1)$$
(Expected squared error = variance + squared bias. The same identity gives $\text{MSE} = \text{bias}^2 + \var$ in Chapter 6.)

**(⇐)** If $\E X_n\to b$ and $\var(X_n)\to0$, both terms on the right of (1) tend to 0. So $\E[(X_n - b)^2]\to0$, i.e. $X_n\xrightarrow{\text{qm}}b$.

**(⇒)** If $\E[(X_n-b)^2]\to0$: both terms in (1) are non-negative, so each is squeezed:
$$0\le\var(X_n)\le\E[(X_n - b)^2]\to0,\qquad0\le(\E X_n - b)^2\le\E[(X_n-b)^2]\to0.$$
Hence $\var(X_n)\to0$ and $\E X_n\to b$. $\blacksquare$`,
    src: 'HW7 A2 (Wasserman 5.8.2)' },
  { k: 'A3', topic: '5.1', lvl: 3, q: R`Let $P(X = 1) = P(X = -1) = \frac12$ and define
$$X_n = \begin{cases}X & \text{with probability } 1 - \frac1n,\\ e^n & \text{with probability } \frac1n.\end{cases}$$
Does $X_n$ converge to $X$ in probability? In distribution? Does $\E[(X_n - X)^2]$ converge to 0?`,
    h: [R`In probability: on the event $\{X_n = X\}$ the difference is exactly 0. So $P(|X_n - X|>\varepsilon)\le P(X_n\ne X)$. What is that?`, R`In distribution: convergence in probability always implies convergence in distribution.`, R`Second moment: condition on which case happens. In the rare case $(X_n - X)^2 = (e^n\mp1)^2$, which is huge. Multiply by its probability $\frac1n$: does $\frac{e^{2n}}{n}$ go to 0?`],
    a: [['in probability?', { choice: ['Yes', 'No'], v: 0 }], ['in distribution?', { choice: ['Yes', 'No'], v: 0 }], [R`$\E[(X_n-X)^2]\to0$?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**In probability: yes.** On $\{X_n = X\}$ (probability $1 - \frac1n$), $X_n - X = 0$. So for every $\varepsilon>0$,
$$P(|X_n - X|>\varepsilon)\le P(X_n\ne X) = \frac1n\longrightarrow0.$$
Hence $X_n\xrightarrow{P}X$.

**In distribution: yes.** Convergence in probability implies convergence in distribution. Directly: $F_{X_n}(t) = \left(1 - \frac1n\right)F_X(t) + \frac1n\1\{t\ge e^n\}$. For fixed $t$ the indicator is 0 once $e^n>t$, and $1-\frac1n\to1$, so $F_{X_n}(t)\to F_X(t)$ for every $t$.

**Quadratic mean: no.** Condition on the two cases (and on $X = \pm1$, each with probability $\frac12$):
$$\E[(X_n - X)^2] = \frac1n\cdot\frac{(e^n - 1)^2 + (e^n+1)^2}{2} + \left(1 - \frac1n\right)\cdot0 = \frac{e^{2n} + 1}{n}\longrightarrow+\infty.$$

**Lesson.** Convergence in probability only cares about *how likely* a large deviation is ($\frac1n\to0$), not *how large* it is. Quadratic mean also weighs the size, and $e^{2n}$ beats $\frac1n$. So $\xrightarrow{P}$ does **not** imply $\xrightarrow{\text{qm}}$.`,
    src: 'HW7 A3 (Wasserman 5.8.9)' },
  { k: 'B1', topic: '5.1', lvl: 4, q: R`Let $X, X_1, X_2,\dots$ be random variables taking values in the positive integers $\{1,2,\dots\}$. Show that $X_n\xrightarrow{D}X$ if and only if
$$\lim_{n\to\infty}P(X_n = k) = P(X = k)\quad\text{for every integer } k.$$`,
    h: [R`The CDFs are step functions that only jump at integers. So every **non-integer** $t$ is a continuity point of $F$, and $F_n(t) = F_n(\lfloor t\rfloor)$.`, R`(⇒) Write $P(X_n = k) = F_n(k) - F_n(k-1) = F_n(k+\tfrac12) - F_n(k - \tfrac12)$, and $k\pm\frac12$ are continuity points.`, R`(⇐) For a continuity point $t\ge1$ with $m = \lfloor t\rfloor$: $F_n(t) = \sum_{k=1}^mP(X_n = k)$, a **finite** sum, so you can take the limit term by term.`],
    s: R`Write $F_n(t) = P(X_n\le t)$ and $F(t) = P(X\le t)$. All variables are integer-valued, so for every integer $k\ge1$,
$$F_n(t) = F_n(k)\ \text{ and }\ F(t) = F(k)\qquad\text{for all } t\in[k, k+1).$$
In particular $F$ is continuous at every non-integer $t$. Those are the only continuity points we will use.

**(⇒) Convergence in distribution gives convergence of the point masses.** Fix $k\ge1$. The points $k-\frac12$ and $k+\frac12$ are not integers, so they are continuity points of $F$. Since the CDFs are constant on $[k-1,k)$ and $[k,k+1)$:
$$F_n(k-1) = F_n(k-\tfrac12)\longrightarrow F(k-\tfrac12) = F(k-1),\qquad F_n(k) = F_n(k+\tfrac12)\longrightarrow F(k+\tfrac12) = F(k).$$
Subtracting,
$$P(X_n = k) = F_n(k) - F_n(k-1)\longrightarrow F(k) - F(k-1) = P(X = k).$$

**(⇐) Convergence of the point masses gives convergence in distribution.** Let $t$ be a continuity point of $F$. If $t<1$, then $F_n(t) = 0 = F(t)$ for all $n$. If $t\ge1$, put $m = \lfloor t\rfloor\ge1$. Since $X_n$ is integer-valued, $\{X_n\le t\} = \{X_n\le m\}$, so
$$F_n(t) = \sum_{k=1}^mP(X_n = k)\longrightarrow\sum_{k=1}^mP(X = k) = P(X\le m) = F(t).$$
The limit can be taken term by term because the sum is **finite** ($m$ terms). The last equality holds because $X$ has no mass in $(m, t]$.

So $F_n(t)\to F(t)$ at every continuity point of $F$, i.e. $X_n\xrightarrow{D}X$. $\blacksquare$`,
    src: 'HW7 B1 (Wasserman 5.8.12)' },
  { k: 'B2', topic: '5.4', lvl: 4, q: R`Let $Z_1, Z_2,\dots$ be iid with density $f$, with $P(Z_i>0) = 1$ and $\lambda = \lim_{x\downarrow0}f(x)>0$. Let $X_n = n\min\{Z_1,\dots,Z_n\}$. Show that $X_n\xrightarrow{D}Z$ where $Z$ is exponential with mean $\frac1\lambda$. Enter the limit of $P(X_n>x)$ for $x>0$.`,
    h: [R`For a minimum, work with the **survival function**: $\min>c$ iff every $Z_i>c$. Use independence.`, R`You get $P(X_n>x) = \left(1 - \int_0^{x/n}f(y)\dd y\right)^n$. Call $a_n = n\int_0^{x/n}f(y)\dd y$. What is $\lim a_n$? (L'Hôpital, or "the integral over a tiny interval ≈ length × height".)`, R`$\left(1 - \frac{a_n}{n}\right)^n\to e^{-\lim a_n}$ when $a_n$ converges.`],
    a: { expr: 'exp(-lambda*x)', vars: { lambda: [0.3, 3], x: [0.1, 3] } },
    s: R`**Survival function of $X_n$.** For $x>0$,
$$P(X_n>x) = P\left(\min_i Z_i>\frac xn\right) = P\left(Z_1>\frac xn,\dots,Z_n>\frac xn\right) = P\left(Z_1>\frac xn\right)^n = \left(1 - \int_0^{x/n}f(y)\dd y\right)^n.$$
The third equality uses independence and identical distribution. The last uses $P(Z_1>0) = 1$, so $P(Z_1\le c) = \int_0^cf$.

**The limit of $a_n := n\int_0^{x/n}f(y)\dd y$.** Put $t = \frac1n\downarrow0$. By L'Hôpital (differentiate numerator and denominator in $t$):
$$\lim_{n\to\infty}a_n = \lim_{t\downarrow0}\frac{\int_0^{xt}f(y)\dd y}{t} = \lim_{t\downarrow0}\frac{x\,f(xt)}{1} = x\lambda.$$
(Intuition: on the tiny interval $[0, x/n]$ the density is about $\lambda$, so the integral is about $\lambda\frac xn$.)

**Conclude.** $P(X_n>x) = \left(1 - \frac{a_n}{n}\right)^n = \exp\left\{n\log\left(1 - \frac{a_n}n\right)\right\}$, and using $\log(1-u) = -u + O(u^2)$:
$$n\log\left(1 - \frac{a_n}{n}\right) = -a_n + O\left(\frac{a_n^2}{n}\right)\longrightarrow-\lambda x.$$
Hence $P(X_n>x)\to e^{-\lambda x}$ for every $x>0$ (and $P(X_n>x) = 1$ for $x\le0$). So $F_{X_n}(x)\to1 - e^{-\lambda x}$ at every $x$, which is the CDF of an exponential with mean $\frac1\lambda$.

**Notation.** In this course's scale parameterization, the limit is $Z\sim\Exp(\beta)$ with $\beta = \frac1\lambda$ (the official solution writes "Exp(rate $\lambda$)"; same distribution).`,
    src: 'HW7 B2 (Wasserman 5.8.13)' },
  { k: 'B3 (1)', topic: '5.3', lvl: 3, q: R`Let $X_1, X_2,\dots\iid\Ber(p)$ with $p\in(0,1)$, and $Y_n = \frac1n\sum_{i=1}^nX_i$. Show that $\sqrt n(Y_n - p)\xrightarrow{D}N(0, p(1-p))$. Enter the limiting variance.`,
    h: [R`Write $\sqrt n(Y_n - p) = \frac1{\sqrt n}\sum_{i=1}^n(X_i - p)$: a scaled sum of iid, mean-zero terms.`, R`The CLT needs: iid, finite mean, finite variance. What are $\E X_i$ and $\var X_i$ for a Bernoulli?`],
    a: { expr: 'p*(1-p)', vars: { p: [0.05, 0.95] } },
    s: R`$X_i\sim\Ber(p)$ gives $\E X_i = p$ and $\var(X_i) = p(1-p)<\infty$. Now
$$\sqrt n(Y_n - p) = \frac{1}{\sqrt n}\sum_{i=1}^n(X_i - p)$$
is a scaled sum of iid, centred terms with finite variance. By the (Lindeberg–Lévy) central limit theorem,
$$\sqrt n(Y_n - p)\xrightarrow{D}N\big(0, \var(X_1)\big) = N\big(0, p(1-p)\big).$$`,
    src: 'HW7 B3(1)' },
  { k: 'B3 (2)', topic: '5.4', lvl: 4, q: R`Same setting as B3 (1). Show that for $p\ne\frac12$,
$$\sqrt n\big[Y_n(1 - Y_n) - p(1-p)\big]\xrightarrow{D}N\big(0, (1-2p)^2p(1-p)\big).$$
Enter the asymptotic variance as a function of $p$.`,
    h: [R`This is $g(Y_n) - g(p)$ for $g(x) = x(1-x)$. Use the delta method.`, R`Delta method: if $\sqrt n(Y_n - p)\xrightarrow{D}N(0,\sigma^2)$ and $g'(p)\ne0$, then $\sqrt n(g(Y_n) - g(p))\xrightarrow{D}N(0, g'(p)^2\sigma^2)$.`, R`$g'(x) = 1 - 2x$. Where does $p\ne\frac12$ come in?`],
    a: { expr: '(1-2*p)^2*p*(1-p)', vars: { p: [0.05, 0.95] } },
    s: R`Let $g(x) = x(1-x)$, so $g'(x) = 1 - 2x$ and $g'(p) = 1 - 2p\ne0$ because $p\ne\frac12$. From B3 (1), $\sqrt n(Y_n - p)\xrightarrow{D}N(0, p(1-p))$, and $g$ is continuously differentiable at $p$. The **delta method** gives
$$\sqrt n\big[g(Y_n) - g(p)\big]\xrightarrow{D}N\big(0, g'(p)^2p(1-p)\big) = N\big(0, (1-2p)^2p(1-p)\big).$$

*Why it works (Taylor):* $g(Y_n) = g(p) + g'(p)(Y_n - p) + o_P(|Y_n - p|)$. Multiply by $\sqrt n$: the main term is $g'(p)\cdot\sqrt n(Y_n-p)$, a constant times an asymptotically normal variable, and the remainder vanishes.

*Why $p\ne\frac12$:* at $p = \frac12$, $g'(p) = 0$ and the limit would be $N(0,0)$, i.e. degenerate. The first-order term disappears and you need the second-order expansion: that is part (3).`,
    src: 'HW7 B3(2)' },
  { k: 'B3 (3)', topic: '5.4', lvl: 4, q: R`Same setting, now with $p = \frac12$. Show that $4n\left[\frac14 - Y_n(1 - Y_n)\right]\xrightarrow{D}\chi^2_1$.`,
    h: [R`Complete the square: $\frac14 - y(1-y) = y^2 - y + \frac14 = \left(y - \frac12\right)^2$.`, R`By part (1) with $p = \frac12$: $\sqrt n(Y_n - \frac12)\xrightarrow{D}N(0,\frac14)$, so $2\sqrt n(Y_n - \frac12)\xrightarrow{D}N(0,1)$.`, R`Square it: continuous mapping theorem, and $Z^2\sim\chi^2_1$ for $Z\sim N(0,1)$.`],
    a: { choice: [R`$N(0,1)$`, R`$\chi^2_1$`, R`$N(0,\frac14)$`, R`degenerate at 0`], v: 1 },
    s: R`**Complete the square:**
$$\frac14 - Y_n(1 - Y_n) = Y_n^2 - Y_n + \frac14 = \left(Y_n - \frac12\right)^2.$$
So the quantity is $4n\left(Y_n - \frac12\right)^2 = \left[2\sqrt n\left(Y_n - \frac12\right)\right]^2$.

**CLT.** From (1) with $p = \frac12$: $\sqrt n(Y_n - \frac12)\xrightarrow{D}N(0, \frac14)$. Multiplying by 2 (variance times 4): $2\sqrt n(Y_n - \frac12)\xrightarrow{D}N(0,1)$.

**Continuous mapping.** $x\mapsto x^2$ is continuous, so
$$4n\left(Y_n - \frac12\right)^2 = \left[2\sqrt n\left(Y_n - \frac12\right)\right]^2\xrightarrow{D}Z^2\sim\chi^2_1,$$
because the square of a standard normal is $\chi^2_1$. Therefore $4n\left[\frac14 - Y_n(1 - Y_n)\right]\xrightarrow{D}\chi^2_1$.

*Note the scaling:* here we multiply by $n$, not $\sqrt n$. When $g'(p) = 0$ the error $g(Y_n) - g(p)$ is of order $\frac1n$, so a larger factor is needed to see a non-trivial limit.`,
    src: 'HW7 B3(3)' },
  { k: 'C1', topic: '5.4', lvl: 4, q: R`Let $(X_{11}, X_{21})^T,\dots,(X_{1n}, X_{2n})^T$ be iid random vectors with mean $\mu = (\mu_1,\mu_2)^T$ and covariance matrix $\Sigma = (\sigma_{jk})_{j,k=1,2}$. Let $\bar X_1 = \frac1n\sum_iX_{1i}$, $\bar X_2 = \frac1n\sum_iX_{2i}$ and $Y_n = \bar X_1/\bar X_2$. Find the limiting distribution of $Y_n$ (assume $\mu_2\ne0$).`,
    h: [R`Step 1: the **multivariate CLT** gives $\sqrt n\big((\bar X_1,\bar X_2)^T - \mu\big)\xrightarrow{D}N(0,\Sigma)$.`, R`Step 2: $Y_n = g(\bar X_1,\bar X_2)$ with $g(s_1,s_2) = s_1/s_2$. Compute the gradient $\nabla g$ at $\mu$.`, R`Step 3: **multivariate delta method**: $\sqrt n(g(\bar X) - g(\mu))\xrightarrow{D}N(0, \nabla g(\mu)^T\Sigma\nabla g(\mu))$. Expand the quadratic form.`],
    s: R`Assume $\mu_2\ne0$, so $Y_n$ is well defined with probability tending to one.

**Step 1: joint CLT.** The vectors are iid with finite covariance, so by the multivariate CLT
$$\sqrt n\begin{pmatrix}\bar X_1 - \mu_1\\ \bar X_2 - \mu_2\end{pmatrix}\xrightarrow{D}N(0,\Sigma),\qquad\Sigma = \begin{pmatrix}\sigma_{11} & \sigma_{12}\\ \sigma_{12} & \sigma_{22}\end{pmatrix}.$$

**Step 2: gradient.** With $g(s_1,s_2) = \frac{s_1}{s_2}$:
$$\nabla g(s_1,s_2) = \begin{pmatrix}1/s_2\\ -s_1/s_2^2\end{pmatrix},\qquad\nabla g(\mu) = \begin{pmatrix}1/\mu_2\\ -\mu_1/\mu_2^2\end{pmatrix}.$$
$g$ is continuously differentiable near $\mu$ because $\mu_2\ne0$.

**Step 3: multivariate delta method.**
$$\sqrt n\big(Y_n - g(\mu)\big)\xrightarrow{D}N\big(0,\ \nabla g(\mu)^T\Sigma\nabla g(\mu)\big),$$
with
$$\nabla g(\mu)^T\Sigma\nabla g(\mu) = \frac{\sigma_{11}}{\mu_2^2} - \frac{2\mu_1\sigma_{12}}{\mu_2^3} + \frac{\mu_1^2\sigma_{22}}{\mu_2^4}.$$
(Expand $a^T\Sigma a = a_1^2\sigma_{11} + 2a_1a_2\sigma_{12} + a_2^2\sigma_{22}$ with $a_1 = \frac1{\mu_2}$, $a_2 = -\frac{\mu_1}{\mu_2^2}$.)

Therefore
$$\sqrt n\left(Y_n - \frac{\mu_1}{\mu_2}\right)\xrightarrow{D}N\left(0,\ \frac{\sigma_{11}}{\mu_2^2} - \frac{2\mu_1\sigma_{12}}{\mu_2^3} + \frac{\mu_1^2\sigma_{22}}{\mu_2^4}\right).$$
In particular $Y_n\xrightarrow{P}\mu_1/\mu_2$, with error of order $1/\sqrt n$.`,
    src: 'HW7 C1 (Wasserman 5.8.15)' },
  { k: 'C2', topic: '5.3', lvl: 4, q: R`$\bar X$ is the mean of $n = 100$ observations from a population with mean $\mu$ and variance $\sigma^2 = 9$. Find limits $\pm c$ between which $\bar X - \mu$ lies with probability at least $0.90$, (i) by Chebyshev's inequality and (ii) by the central limit theorem ($z_{0.95} = \Phi^{-1}(0.95) = 1.6449$). Compare and comment.`,
    h: [R`$\var(\bar X) = \frac{9}{100}$, so $\sd(\bar X) = 0.3$.`, R`Chebyshev: $P(|\bar X - \mu|\ge k\cdot0.3)\le\frac1{k^2}$. Choose $k$ so that $\frac1{k^2} = 0.10$.`, R`CLT: $\frac{\bar X - \mu}{0.3}\approx N(0,1)$, and $P(|Z|<z_{0.95}) = 0.90$.`],
    a: [['(i) Chebyshev half-width', '0.3*sqrt(10)'], ['(ii) CLT half-width', '0.3*1.6449']],
    s: R`With $n = 100$ and $\sigma^2 = 9$: $\var(\bar X) = \frac{9}{100}$ and $\sd(\bar X) = 0.3$.

**(i) Chebyshev.** For any $k>0$,
$$P\big(|\bar X - \mu|\ge0.3k\big)\le\frac{\var(\bar X)}{(0.3k)^2} = \frac1{k^2}.$$
We need $1 - \frac1{k^2}\ge0.90$, i.e. $k\ge\sqrt{10}\approx3.162$. With $k = \sqrt{10}$:
$$P\big(|\bar X - \mu|<0.3\sqrt{10}\big)\ge0.90,\qquad0.3\sqrt{10}\approx0.9487.$$
So $\bar X - \mu\in(-0.9487, 0.9487)$ with probability at least $0.90$.

**(ii) CLT.** $n = 100$ is large, so $\frac{\bar X - \mu}{0.3}\approx N(0,1)$. Then
$$0.90\approx P\left(\frac{|\bar X - \mu|}{0.3}<1.6449\right) = P\big(|\bar X - \mu|<0.4935\big).$$
So $\bar X - \mu\in(-0.4935, 0.4935)$, approximately.

**Comparison.**
- The Chebyshev interval is about $0.9487/0.4935\approx1.92$ times wider.
- Chebyshev is **exact and universal**: it holds for every $n$ and every distribution with finite variance. The price is width: it is essentially the worst case (attained by a two-point distribution).
- The CLT answer is only **approximate** (asymptotic), but much sharper. With $n = 100$ it is quite reliable, so it is the one to report; Chebyshev is the safe fallback if you distrust the normal approximation.`,
    src: 'HW7 C2' },
  { k: 'C3', topic: '5.2', lvl: 4, q: R`Let $X_1, X_2,\dots$ be iid with mean $\mu$ and finite variance $\sigma^2$. Show that
$$\frac{1}{\binom n2}\sum_{1\le i<j\le n}X_iX_j\xrightarrow{P}\mu^2.$$
Justify every step.`,
    h: [R`Algebra first: $\left(\sum X_i\right)^2 = \sum X_i^2 + 2\sum_{i<j}X_iX_j$. Solve for the pair sum.`, R`Divide by $2\binom n2 = n(n-1)$ and write everything with sample averages: $\frac{n}{n-1}\bar X_n^2 - \frac{1}{n-1}\cdot\frac1n\sum X_i^2$.`, R`WLLN for $\bar X_n$ and for $\frac1n\sum X_i^2$, then Theorem 5.5 (continuous mapping, products with deterministic sequences, differences).`],
    s: R`**Step 1: algebraic identity.** Expanding the square of the sum,
$$\Big(\sum_{i=1}^nX_i\Big)^2 = \sum_{i=1}^nX_i^2 + 2\sum_{1\le i<j\le n}X_iX_j\ \Longrightarrow\ 2\sum_{i<j}X_iX_j = \Big(\sum X_i\Big)^2 - \sum X_i^2.$$
Dividing by $2\binom n2 = n(n-1)$:
$$\frac{1}{\binom n2}\sum_{i<j}X_iX_j = \underbrace{\frac{n}{n-1}\Big(\frac1n\sum_{i=1}^nX_i\Big)^2}_{T_{1,n}} - \underbrace{\frac{1}{n-1}\cdot\frac1n\sum_{i=1}^nX_i^2}_{T_{2,n}}.$$

**Step 2: weak law of large numbers.** The $X_i$ are iid with finite second moment, so
$$\frac1n\sum X_i\xrightarrow{P}\mu,\qquad\frac1n\sum X_i^2\xrightarrow{P}\E X_1^2 = \mu^2 + \sigma^2.$$
(The second needs $\E X_1^2<\infty$, which holds because $\sigma^2<\infty$.)

**Step 3: continuous mapping and products.** $x\mapsto x^2$ is continuous, so $\left(\frac1n\sum X_i\right)^2\xrightarrow{P}\mu^2$. The deterministic factors satisfy $\frac{n}{n-1}\to1$ and $\frac1{n-1}\to0$, so by Theorem 5.5
$$T_{1,n}\xrightarrow{P}1\cdot\mu^2 = \mu^2,\qquad T_{2,n}\xrightarrow{P}0\cdot(\mu^2 + \sigma^2) = 0.$$

**Step 4: conclude.** By Theorem 5.5 (differences),
$$\frac{1}{\binom n2}\sum_{i<j}X_iX_j = T_{1,n} - T_{2,n}\xrightarrow{P}\mu^2.\qquad\blacksquare$$
*Sanity check:* each $X_iX_j$ with $i\ne j$ has mean $\E X_i\,\E X_j = \mu^2$ by independence, so the average of the $\binom n2$ pairs is unbiased for $\mu^2$; the result says it is also consistent.`,
    src: 'HW7 C3' },
]);
