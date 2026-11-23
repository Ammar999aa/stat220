EXAM({ id: 'mid2y2025', title: 'Midterm 2 — Fall 2025 (real exam)', summary: 'Last year\'s actual Midterm 2: copulas via the probability integral transform and empirical CDFs, MLE + Fisher information + delta method for the exponential, and MoM vs MLE for F(x) = (x/θ)².',
  intro: R`December 3, 2025. 80 minutes (08:30–09:50). Two double-sided A4 sheets of handwritten formulae (no photocopies) and a simple calculator were allowed. Points: 30 / 30 / 40. Solutions follow the instructor's own handwritten solutions, with the steps written out in full.

**What it tells you about this year's paper:** every exercise is from Chapters 7–9 (empirical CDF, method of moments, maximum likelihood), using Chapter 5 tools (LLN, CLT, CMT, delta method) as justification. Exercise 1 is a "prove it" question on a new object (copulas) that only needs the probability integral transform and the LLN.` }, [
  { k: '1', pts: 30, intro: R`Let $(X_1, Y_1)^T, (X_2, Y_2)^T,\dots$ be independent random vectors with joint distribution $F$ and marginal distributions $F_X$ and $F_Y$, respectively, such that
$$F(x,y) = C\big(F_X(x), F_Y(y)\big)$$
for some continuous function $C(\cdot,\cdot):[0,1]^2\to[0,1]$, known as the "copula" of $(X, Y)^T$.`, parts: [
    { k: 'a', pts: 10, topic: '2.9', q: R`Show that
<ol type="i"><li>if $F_X$ and $F_Y$ are continuous, then $U = F_X(X)\sim\Unif(0,1)$ and $V = F_Y(Y)\sim\Unif(0,1)$;</li>
<li>the vector $(U, V)^T$ has distribution $C(u,v)$, which can be expressed as $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$.</li></ol>`,
      h: [R`(i) Compute $P(U\le u) = P(F_X(X)\le u)$ for $u\in(0,1)$ and apply $F_X^{-1}$ inside the event ($F_X$ continuous and increasing).`, R`(ii) $P(U\le u, V\le v) = P(X\le F_X^{-1}(u), Y\le F_Y^{-1}(v))$. Then use the definition $F(x,y) = C(F_X(x), F_Y(y))$ with $x = F_X^{-1}(u)$, $y = F_Y^{-1}(v)$.`],
      s: R`**(i)** For $u\in(0,1)$, since $F_X$ is continuous and monotone increasing,
$$P(U\le u) = P\big(F_X(X)\le u\big) = P\big(X\le F_X^{-1}(u)\big) = F_X\big(F_X^{-1}(u)\big) = u,$$
which is the $\Unif(0,1)$ CDF. So $U\sim\Unif(0,1)$, and the same argument gives $V = F_Y(Y)\sim\Unif(0,1)$. (This is the *probability integral transform*.)

**(ii)** The joint CDF of $(U,V)$:
$$P(U\le u, V\le v) = P\big(F_X(X)\le u, F_Y(Y)\le v\big) = P\big(X\le F_X^{-1}(u), Y\le F_Y^{-1}(v)\big) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big).\quad(\star)$$
Furthermore, by definition $F(x,y) = C\big(F_X(x), F_Y(y)\big)$. Setting $u = F_X(x)$ and $v = F_Y(y)$, i.e. $x = F_X^{-1}(u)$, $y = F_Y^{-1}(v)$:
$$F\big(F_X^{-1}(u), F_Y^{-1}(v)\big) = C(u,v).\quad(\star\star)$$
From $(\star)$ and $(\star\star)$, $(U,V)^T\sim C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$. So the copula is the joint CDF of the two "uniformized" coordinates: it keeps the dependence and throws away the marginals.` },
    { k: 'b', pts: 10, topic: '7.1', q: R`Prove the following consistency results, as $n\to\infty$, where $I(\cdot)$ is the indicator function:
$$\begin{aligned}&\text{Margin 1:} && \hat F_{X,n}(x) = \frac1n\sum_{j=1}^nI(X_j\le x)\xrightarrow{P}F_X(x),\\
&\text{Margin 2:} && \hat F_{Y,n}(y) = \frac1n\sum_{j=1}^nI(Y_j\le y)\xrightarrow{P}F_Y(y),\\
&\text{Joint, copula known:} && \tilde F_n(x,y) = C\big(\hat F_{X,n}(x), \hat F_{Y,n}(y)\big)\xrightarrow{P}F(x,y),\\
&\text{Joint, copula unknown:} && \hat F_n(x,y) = \frac1n\sum_{j=1}^nI(X_j\le x, Y_j\le y)\xrightarrow{P}F(x,y).\end{aligned}$$`,
      h: [R`Each empirical CDF is an average of iid indicators. What is the expectation of an indicator?`, R`For the third line: you already have the first two, and $C$ is continuous. Which theorem lets you push convergence in probability through a continuous function?`],
      s: R`**Margins.** $E\{I(X_j\le x)\} = P(X_j\le x) = F_X(x)$ and $E\{I(Y_j\le y)\} = P(Y_j\le y) = F_Y(y)$. The indicators are iid and bounded (finite mean), so by the **law of large numbers**
$$\hat F_{X,n}(x) = \frac1n\sum_{j=1}^nI(X_j\le x)\xrightarrow{P}F_X(x),\qquad\hat F_{Y,n}(y)\xrightarrow{P}F_Y(y).$$
**Copula known.** $C$ is a continuous function, and $\big(\hat F_{X,n}(x), \hat F_{Y,n}(y)\big)\xrightarrow{P}\big(F_X(x), F_Y(y)\big)$ (each coordinate converges in probability). By the **continuous mapping theorem**,
$$\tilde F_n(x,y) = C\big(\hat F_{X,n}(x), \hat F_{Y,n}(y)\big)\xrightarrow{P}C\big(F_X(x), F_Y(y)\big) = F(x,y).$$
**Copula unknown.** $E\{I(X_j\le x, Y_j\le y)\} = P(X_j\le x, Y_j\le y) = F(x,y)$, and the pairs are iid, so by the **law of large numbers**
$$\hat F_n(x,y) = \frac1n\sum_{j=1}^nI(X_j\le x, Y_j\le y)\xrightarrow{P}F(x,y).$$ ∎` },
    { k: 'c', pts: 10, topic: '7.1', q: R`Propose a "meaningful" empirical copula estimator, $\hat C_n(u,v)$, which depends on the data only (but not on the knowledge of $F$, $C$, $F_X$, or $F_Y$), and justify your proposal. Explain why it is a good estimator.`,
      h: [R`Plug in: part (a) says $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$. Replace every unknown CDF by its empirical version.`, R`$X_j\le\hat F_{X,n}^{-1}(u)$ is (roughly) the same as $\hat F_{X,n}(X_j)\le u$, and $\hat F_{X,n}(X_j) = \operatorname{rank}(X_j)/n$.`],
      a: [['Ĉₙ(u,v) is built from', { choice: ['the ranks of the Xⱼ and of the Yⱼ', 'the sample means of X and Y', 'the true marginals F_X and F_Y'], v: 0 }]],
      s: R`**Plug-in principle** applied to $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$ from (a)(ii): replace $F$, $F_X$, $F_Y$ by $\hat F_n$, $\hat F_{X,n}$, $\hat F_{Y,n}$:
$$\begin{aligned}\hat C_n(u,v) &= \hat F_n\big(\hat F_{X,n}^{-1}(u), \hat F_{Y,n}^{-1}(v)\big) = \frac1n\sum_{j=1}^nI\big(X_j\le\hat F_{X,n}^{-1}(u),\ Y_j\le\hat F_{Y,n}^{-1}(v)\big)\\
&\approx\frac1n\sum_{j=1}^nI\big(\hat F_{X,n}(X_j)\le u,\ \hat F_{Y,n}(Y_j)\le v\big)\approx\frac1n\sum_{j=1}^nI\left(\frac{\operatorname{rank}(X_j)}{n+1}\le u,\ \frac{\operatorname{rank}(Y_j)}{n+1}\le v\right).\end{aligned}$$
It uses only the data (in fact only the **ranks**), not $F$, $C$, $F_X$ or $F_Y$.

**Why it is good:** since $\hat F_n$, $\hat F_{X,n}$ and $\hat F_{Y,n}$ are consistent (part (b)), $\hat C_n$ should also be consistent for the copula $C$ (though more complicated proofs are necessary, given that $\hat F_n$, $\hat F_{X,n}$, $\hat F_{Y,n}$ are not continuous). Using ranks is natural: the copula does not change under increasing transformations of $X$ or $Y$, and neither do ranks. (Dividing by $n+1$ instead of $n$ keeps the pseudo-observations strictly inside $(0,1)$.)` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X_1, X_2,\dots,X_n$ be independent and identically distributed random variables following the Exponential distribution with PDF parametrized as
$$f(x) = \lambda\exp(-\lambda x),\qquad x>0,\ \lambda>0.$$
(Note: this is the **rate** parametrization, mean $1/\lambda$, not the course's usual scale $\beta$.)`, parts: [
    { k: 'a', pts: 10, topic: '9.2', q: R`Derive the likelihood function, and the maximum likelihood estimator (MLE) $\hat\lambda$.`,
      h: [R`$L_n(\lambda) = \prod_j\lambda e^{-\lambda X_j}$: collect the powers of $\lambda$ and the exponents.`, R`Log, differentiate, set the score to 0.`],
      a: [[R`$\hat\lambda$ (use xbar)`, '1/xbar', { xbar: [0.2, 5] }]],
      s: R`**Likelihood:**
$$L_n(\lambda) = \prod_{j=1}^nf(X_j) = \prod_{j=1}^n\lambda\exp(-\lambda X_j) = \lambda^n\exp\Big(-\lambda\sum_{j=1}^nX_j\Big).$$
**Log-likelihood:** $\ell_n(\lambda) = n\log\lambda - \lambda\sum_{j=1}^nX_j$.
**Score equation:**
$$\frac{\mathrm d\ell_n(\lambda)}{\mathrm d\lambda} = \frac n\lambda - \sum_{j=1}^nX_j = 0\iff\hat\lambda = \frac n{\sum_jX_j} = \Big(\frac1n\sum_{j=1}^nX_j\Big)^{-1} = \left(\bar X_n\right)^{-1}.\quad\text{(MLE)}$$
It is a maximum since $\ell_n''(\lambda) = -n/\lambda^2<0$.` },
    { k: 'b', pts: 10, topic: '9.3', q: R`Find the Fisher information $I_n(\lambda)$, and the asymptotic distribution of $\hat\lambda$.`,
      h: [R`$I_n(\lambda) = E\left(-\frac{\mathrm d^2\ell_n(\lambda)}{\mathrm d\lambda^2}\right)$.`, R`MLE theory: $(\hat\lambda - \lambda)/\sqrt{1/I_n(\lambda)}\xrightarrow{D}N(0,1)$.`],
      a: [[R`$I_n(\lambda)$ (use n, lambda)`, 'n/lambda^2', { n: [1, 50, 'int'], lambda: [0.2, 5] }], [R`avar of $\sqrt n(\hat\lambda-\lambda)$ (use lambda)`, 'lambda^2', { lambda: [0.2, 5] }]],
      s: R`$$\frac{\mathrm d^2\ell_n(\lambda)}{\mathrm d\lambda^2} = -\frac n{\lambda^2}\ \Rightarrow\ I_n(\lambda) = E\left(-\frac{\mathrm d^2\ell_n(\lambda)}{\mathrm d\lambda^2}\right) = \frac n{\lambda^2}.\quad\text{(Fisher information)}$$
**Asymptotic distribution of $\hat\lambda$** (asymptotic normality of the MLE):
$$\frac{\hat\lambda - \lambda}{\sqrt{1/I_n(\lambda)}}\xrightarrow{D}N(0,1)\quad\text{as }n\to\infty,$$
equivalently $\sqrt n(\hat\lambda - \lambda)\xrightarrow{D}N(0,\lambda^2)$, i.e. $\hat\lambda\overset{\text{approx}}{\sim}N\left(\lambda, \frac{\lambda^2}n\right)$.` },
    { k: 'c', pts: 10, topic: '9.3', q: R`Find the MLE of $\psi = \log(\lambda)$ and its asymptotic distribution.`,
      h: [R`Equivariance of the MLE.`, R`Delta method with $g(\lambda) = \log\lambda$.`],
      a: [[R`$\hat\psi$ (use xbar)`, '-log(xbar)', { xbar: [0.2, 5] }], [R`avar of $\sqrt n(\hat\psi-\psi)$`, '1']],
      s: R`**By equivariance**, the MLE of $\psi = \log\lambda$ is
$$\hat\psi = \log\hat\lambda = \log\left(\bar X_n^{-1}\right) = -\log\bar X_n.$$
Let $g(\lambda) = \log\lambda$, so $g'(\lambda) = \frac1\lambda\ne0$. From (b), $\sqrt n(\hat\lambda - \lambda)\xrightarrow{D}N(0,\lambda^2)$, so by the **delta method**
$$\sqrt n\big(\log\hat\lambda - \log\lambda\big)\xrightarrow{D}N\left(0, g'(\lambda)^2\lambda^2\right) = N\left(0, \frac1{\lambda^2}\lambda^2\right) = N(0,1)\quad\text{as }n\to\infty,$$
i.e. $\hat\psi\overset{\text{approx}}{\sim}N\left(\psi, \frac1n\right)$.` },
  ] },
  { k: '3', pts: 40, intro: R`Let $X_1, X_2,\dots,X_n\iid F(x) = (x/\theta)^2$, $x\in[0,\theta]$, $\theta>0$.`, parts: [
    { k: 'a', pts: 10, topic: '9.1', q: R`Show that the method-of-moments estimator of $\theta$ is $\hat\theta_{\text{MOM}} = 3\bar X_n/2$, where $\bar X_n = n^{-1}\sum_{i=1}^nX_i$, and derive its asymptotic distribution.`,
      h: [R`First the PDF: $f(x) = F'(x) = \frac{2x}{\theta^2}$ on $[0,\theta]$.`, R`$E(X) = \frac23\theta$ and $E(X^2) = \frac{\theta^2}2$, so $\var(X) = \frac{\theta^2}{18}$. Then the CLT for $\bar X_n$, multiplied by $\frac32$.`],
      a: [[R`avar of $\sqrt n(\hat\theta_{\text{MOM}}-\theta)$ (use theta)`, 'theta^2/8', { theta: [0.3, 5] }]],
      s: R`**PDF:** $f(x) = F'(x) = \frac{2x}{\theta^2}$, $x\in[0,\theta]$.
**First moment:**
$$E(X) = \int_0^\theta x\frac{2x}{\theta^2}\dd x = \frac2{\theta^2}\left[\frac{x^3}3\right]_0^\theta = \frac23\theta.$$
**MoM:** set $\frac23\hat\theta = \bar X_n$, so $\hat\theta_{\text{MOM}} = \frac32\bar X_n$.
**Second moment and variance:**
$$E(X^2) = \int_0^\theta x^2\frac{2x}{\theta^2}\dd x = \frac2{\theta^2}\cdot\frac{\theta^4}4 = \frac{\theta^2}2,\qquad\var(X) = \frac{\theta^2}2 - \frac49\theta^2 = \frac{\theta^2}{18}.$$
**CLT:** $\sqrt n\left(\bar X_n - \frac23\theta\right)\xrightarrow{D}N\left(0, \frac{\theta^2}{18}\right)$. Multiply by $\frac32$ (variance $\times\frac94$):
$$\sqrt n\left(\hat\theta_{\text{MOM}} - \theta\right)\xrightarrow{D}N\left(0, \frac94\cdot\frac{\theta^2}{18}\right) = N\left(0, \frac{\theta^2}8\right),\quad\text{i.e. }\hat\theta_{\text{MOM}}\overset{\text{approx}}{\sim}N\left(\theta, \frac{\theta^2}{8n}\right).$$` },
    { k: 'b', pts: 10, topic: '6.2', q: R`Find the mean squared error of $\hat\theta_{\text{MOM}}$.`,
      h: [R`$\text{MSE} = \text{bias}^2 + \var$. Is $\hat\theta_{\text{MOM}}$ unbiased? Its variance is exact, not only asymptotic: $\var(\frac32\bar X_n) = \frac94\cdot\frac{\var X}{n}$.`],
      a: [['MSE (use theta, n)', 'theta^2/(8*n)', { theta: [0.3, 5], n: [1, 50, 'int'] }]],
      s: R`$E(\hat\theta_{\text{MOM}}) = \frac32E(\bar X_n) = \frac32\cdot\frac23\theta = \theta$, so the bias is 0. $\var(\hat\theta_{\text{MOM}}) = \frac94\cdot\frac{\var X}n = \frac94\cdot\frac{\theta^2}{18n} = \frac{\theta^2}{8n}$. Hence
$$\text{MSE}(\hat\theta_{\text{MOM}}) = \text{bias}(\hat\theta_{\text{MOM}})^2 + \var(\hat\theta_{\text{MOM}}) = \big(E(\hat\theta_{\text{MOM}}) - \theta\big)^2 + \frac{\theta^2}{8n} = 0 + \frac{\theta^2}{8n} = \frac{\theta^2}{8n}.$$` },
    { k: 'c', pts: 10, topic: '9.2', q: R`Show that the maximum likelihood estimator of $\theta$ is $\hat\theta_{\text{ML}} = \max(X_1,\dots,X_n)$.`,
      h: [R`Write the indicator of the support into the likelihood: $f(x) = \frac{2x}{\theta^2}I(x\in[0,\theta])$.`, R`Do not differentiate: describe $L(\theta)$ below and above $\max_jX_j$.`],
      s: R`**Likelihood:**
$$L(\theta) = \prod_{j=1}^nf(X_j) = \prod_{j=1}^n\frac{2X_j}{\theta^2}I\big(X_j\in[0,\theta]\big) = \theta^{-2n}\,2^n\Big(\prod_{j=1}^nX_j\Big)\,I\Big(\max_{j=1,\dots,n}X_j\le\theta\Big).$$
The likelihood function is identically 0 over the interval $(-\infty, \max_jX_j)$ and is monotonically decreasing (like $\theta^{-2n}$) over $[\max_jX_j, +\infty)$. Thus the MLE is
$$\hat\theta_{\text{ML}} = \max(X_1,\dots,X_n).$$
(The score equation $-2n/\theta = 0$ has no solution: the maximum sits at the jump.)` },
    { k: 'd', pts: 10, topic: '9.3', q: R`Show that both $\hat\theta_{\text{MOM}}$ and $\hat\theta_{\text{ML}}$ are consistent as $n\to\infty$.`,
      h: [R`MoM: law of large numbers for $\bar X_n$ (then multiply by $\frac32$).`, R`MLE: compute $F_{\hat\theta_{\text{ML}}}(x) = P(\max_jX_j\le x) = \{F(x)\}^n$ and let $n\to\infty$.`],
      s: R`**MoM.** By the law of large numbers,
$$\hat\theta_{\text{MOM}} = \frac32\bar X_n\xrightarrow{P}\frac32E(X) = \frac32\cdot\frac23\theta = \theta,$$
so $\hat\theta_{\text{MOM}}$ is consistent for $\theta$. (Alternatively: MSE $= \frac{\theta^2}{8n}\to0$.)

**MLE.** Its CDF is
$$F_{\hat\theta_{\text{ML}}}(x) = P(\hat\theta_{\text{ML}}\le x) = P\big(\max_jX_j\le x\big) = P(X_1\le x,\dots,X_n\le x) \overset{\text{iid}}{=} \{F(x)\}^n = \begin{cases}0, & x<0,\\ (x/\theta)^{2n}, & x\in[0,\theta],\\ 1, & x>\theta.\end{cases}$$
As $n\to\infty$ this tends to $0$ for $x<\theta$ and $1$ for $x\ge\theta$: the CDF of a point mass at $x = \theta$. Hence $\hat\theta_{\text{ML}}\xrightarrow{D}\theta$, and therefore $\hat\theta_{\text{ML}}\xrightarrow{P}\theta$ (because $\theta$ is a fixed constant). So $\hat\theta_{\text{ML}}$ is consistent for $\theta$. ∎` },
  ] },
]);
