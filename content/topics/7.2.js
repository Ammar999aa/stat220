TOPIC({ id: '7.2', ch: 7, title: 'Linear functionals: plug-in, consistency, normality', summary: 'Linear T(F) = ∫r dF ⟶ (1/n)Σr(Xᵢ): consistent and asymptotically normal with variance var r(X)/n. Variance and skewness as functions of linear functionals; Cov(F̂ₙ(x), F̂ₙ(y)); two-sample intervals.' }, [
R`Topic 7.1 introduced the plug-in estimator $T(\hat F_n)$. The second half of the Chapter 7 notes asks **when it works**: for *linear* functionals it is just a sample average, so the LLN gives consistency and the CLT gives a confidence interval for free. Non-linear functionals such as the variance and skewness are built from linear ones, and the continuous mapping theorem finishes the job.

(Source: Chapter 7 lecture notes, pp. 7–11; textbook 7.4.2, 7.4.5; HW9 A2, B1.)`,
DEF('Linear functional', R`A statistical functional $T$ is **linear** if for all CDFs $F, G$ and all $a\in[0,1]$
$$T\big(aF + (1-a)G\big) = a\,T(F) + (1-a)\,T(G).$$
Every $T(F) = \int r(x)\dd F(x)$ is linear (the integral is linear in $F$). Its plug-in estimator is
$$T(\hat F_n) = \int r(x)\dd\hat F_n(x) = \frac1n\sum_{i=1}^nr(X_i),$$
because $\hat F_n$ puts mass $\frac1n$ on each $X_i$.`),
R`The mean ($r(x) = x$), any raw moment ($r(x) = x^k$) and any probability $P(X\in A) = \E[\1_A(X)]$ ($r = \1_A$) are linear. The **median is not**, and the **variance is not**, but the variance is a continuous function of two linear functionals.`,
P({ k: 'a', lvl: 1, q: R`Data: $1, 2, 3, 6$. Plug-in estimate of $\theta = \E(X^2) = \int x^2\dd F(x)$?`, h: [R`Linear functional with $r(x) = x^2$: average the $X_i^2$.`], a: '12.5', s: R`$\frac{1 + 4 + 9 + 36}{4} = \frac{50}{4} = 12.5$.` }),
P({ k: 'b', lvl: 1, q: R`Data: $1, 2, 3, 6$. Plug-in estimate of $\theta = P(X>2.5)$?`, h: [R`$r(x) = \1(x>2.5)$: the fraction of observations above 2.5.`], a: '1/2', s: R`Two of the four values (3 and 6) exceed 2.5: $\hat\theta = \frac12$.` }),
P({ k: 'c', lvl: 2, q: R`Show the median $T(F) = F^{-1}(\frac12) = \inf\{x: F(x)\ge\frac12\}$ is not linear. Take $F = \delta_0$ (point mass at 0), $G = \delta_1$, $a = 0.3$. Compute $T\big(0.3F + 0.7G\big)$ and $0.3\,T(F) + 0.7\,T(G)$.`, h: [R`$0.3\delta_0 + 0.7\delta_1$ is the $\Ber(0.7)$ distribution. Its CDF at 0 is $0.3$.`],
  a: [[R`$T(0.3F + 0.7G)$`, '1'], [R`$0.3T(F) + 0.7T(G)$`, '0.7']],
  s: R`The mixture is $\Ber(0.7)$: its CDF is $0.3$ on $[0,1)$ and $1$ from $1$ on, so the first $x$ with CDF $\ge\frac12$ is $x = 1$: $T = 1$. But $0.3\cdot0 + 0.7\cdot1 = 0.7\ne1$. One counterexample is enough: the median is **not** linear.` }),
H('Variance and skewness: functions of linear functionals'),
EX('Variance', R`$\sigma^2 = \int x^2\dd F - \left(\int x\dd F\right)^2 = a\big(T_1(F), T_2(F)\big)$ with $T_1 = \int x\dd F$, $T_2 = \int x^2\dd F$ (both linear) and $a(t_1, t_2) = t_2 - t_1^2$ (continuous). The plug-in estimator is
$$\hat\sigma^2 = a\big(T_1(\hat F_n), T_2(\hat F_n)\big) = \frac1n\sum X_i^2 - \bar X_n^2 = \frac1n\sum_{i=1}^n(X_i - \bar X_n)^2.$$
**Consistency:** by the LLN $T_1(\hat F_n)\xrightarrow{P}T_1(F)$ and $T_2(\hat F_n)\xrightarrow{P}T_2(F)$ (needs $\E X^2<\infty$), and $a$ is continuous, so the continuous mapping theorem gives $\hat\sigma^2\xrightarrow{P}\sigma^2$.`),
EX('Skewness', R`$$\kappa = \E\left[\left(\frac{X-\mu}{\sigma}\right)^3\right] = \frac{\int(x-\mu)^3\dd F(x)}{\left(\int(x-\mu)^2\dd F(x)\right)^{3/2}}$$
is a continuous function $a(T_1, T_2, T_3)$ of the first three raw moments (expand $(x-\mu)^3$). Its plug-in estimator is
$$\hat\kappa = \frac{\frac1n\sum(X_i - \bar X_n)^3}{\left(\frac1n\sum(X_i - \bar X_n)^2\right)^{3/2}},$$
consistent provided $\E|X|^3<\infty$ (LLN + CMT again).`),
P({ k: 'd', lvl: 2, q: R`Data: $0, 0, 0, 4$. Compute the plug-in variance and the plug-in skewness $\hat\kappa$.`, h: [R`$\bar x = 1$; deviations $-1, -1, -1, 3$.`, R`$\frac1n\sum d^2 = \frac{12}4$, $\frac1n\sum d^3 = \frac{-3 + 27}{4}$.`],
  a: [[R`$\hat\sigma^2$`, '3'], [R`$\hat\kappa$`, '6/3^1.5']],
  s: R`$\bar x = 1$, deviations $-1, -1, -1, 3$. $\hat\sigma^2 = \frac{1 + 1 + 1 + 9}{4} = 3$; third central moment $\frac{-1 - 1 - 1 + 27}{4} = 6$. So $\hat\kappa = \frac{6}{3^{3/2}} = \frac{2}{\sqrt3}\approx1.155$: right-skewed (one large value), as expected.` }),
H('Consistency and asymptotic normality'),
THM('Plug-in for linear functionals', R`Let $X_1,\dots,X_n\iid F$ and $\theta = T(F) = \int r(x)\dd F(x)$ with $\E[r(X)^2]<\infty$. Then $\hat\theta_n = \frac1n\sum r(X_i)$ satisfies
$$\hat\theta_n\xrightarrow{P}\theta\quad\text{and}\quad\frac{\sqrt n(\hat\theta_n - \theta)}{\sqrt{\var r(X)}}\xrightarrow{D}N(0,1),\qquad\text{so}\quad\hat\theta_n\approx N\left(\theta, \frac{\var r(X)}{n}\right).$$
**Proof.** The $Y_i = r(X_i)$ are iid with mean $\E r(X) = \theta$ and finite variance. LLN ⇒ $\bar Y_n\xrightarrow{P}\theta$; CLT ⇒ the normal limit. ∎

**Consequence:** an approximate $1-\alpha$ CI is $\hat\theta_n\pm z_{\alpha/2}\,\hat\sigma_n$ where $\hat\sigma_n^2 = \frac1n\cdot\frac1n\sum\big(r(X_i) - \hat\theta_n\big)^2$ (the plug-in estimate of $\var r(X)/n$).`),
P({ k: 'e', lvl: 2, q: R`$X\sim\Exp(\beta)$ (mean $\beta$) and $\theta = \E(X^2) = 2\beta^2$. Find the asymptotic variance of $\sqrt n(\hat\theta_n - \theta)$ for $\hat\theta_n = \frac1n\sum X_i^2$. (Use $\E X^k = k!\,\beta^k$.)`, h: [R`It is $\var(X^2) = \E X^4 - (\E X^2)^2$.`],
  a: [[R`asymptotic variance (use beta)`, '20*beta^4', { beta: [0.3, 3] }]], s: R`$\var(X^2) = 24\beta^4 - (2\beta^2)^2 = 20\beta^4$.` }),
P({ k: 'f', lvl: 2, q: R`$n = 200$ observations give $\frac1n\sum X_i^2 = 1.1$ and the plug-in variance of the $X_i^2$ values, $\frac1n\sum(X_i^2 - 1.1)^2$, is $2.4$. Give a 95% CI for $\theta = \E(X^2)$.`, h: [R`$\hat\sigma_n = \sqrt{2.4/200}$.`],
  a: [[R`lower`, '1.1-1.96*sqrt(2.4/200)'], [R`upper`, '1.1+1.96*sqrt(2.4/200)']], s: R`$\hat\sigma_n = \sqrt{0.012}\approx0.1095$, so $1.1\pm0.215 = (0.885, 1.315)$.` }),
H('Two points, two samples'),
THM('Covariance of the EDF at two points (textbook 7.4.5)', R`For fixed $x, y$:
$$\cov\big(\hat F_n(x), \hat F_n(y)\big) = \frac{F(\min(x,y)) - F(x)F(y)}{n}.$$
**Proof.** $\cov\big(\frac1n\sum_i\1(X_i\le x), \frac1n\sum_j\1(X_j\le y)\big) = \frac1{n^2}\sum_i\cov\big(\1(X_i\le x), \1(X_i\le y)\big)$, since terms with $i\ne j$ vanish by independence. For one observation, $\E[\1(X\le x)\1(X\le y)] = P(X\le\min(x,y)) = F(\min(x,y))$, so the covariance is $F(\min(x,y)) - F(x)F(y)$; there are $n$ equal terms. ∎ (With $x = y$ it gives back $\frac{F(1-F)}{n}$.)`),
P({ k: 'g', lvl: 2, q: R`$F(x) = 0.3$, $F(y) = 0.7$ with $x<y$, and $n = 10$. Compute $\cov\big(\hat F_n(x), \hat F_n(y)\big)$ and the correlation.`, h: [R`$\frac{0.3 - 0.21}{10}$. Each variance is $\frac{0.21}{10}$.`],
  a: [['cov', '0.009'], ['corr', '0.09/0.21']], s: R`$\cov = \frac{0.3 - 0.3\cdot0.7}{10} = 0.009$. Both variances are $\frac{0.21}{10} = 0.021$, so $\rho = \frac{0.009}{0.021} = \frac37\approx0.43$: positive, since a large $\hat F_n(x)$ pushes $\hat F_n(y)$ up.` }),
R`**Two independent samples** $X_1,\dots,X_n\iid\Ber(p)$, $Y_1,\dots,Y_m\iid\Ber(q)$ (textbook 7.4.2): plug-in $\hat p = \bar X_n$, $\hat q = \bar Y_m$, and
$$\widehat{\operatorname{se}}(\hat p - \hat q) = \sqrt{\frac{\hat p(1-\hat p)}{n} + \frac{\hat q(1-\hat q)}{m}},$$
because variances of independent estimators **add** (even for a difference).`,
P({ k: 'h', lvl: 2, q: R`Standard antibiotic: 90 of 100 recover. New antibiotic: 85 of 100 recover. Estimate $\theta = p_1 - p_2$, its standard error, and an 80% CI ($z_{0.1} = 1.282$).`, h: [R`$\hat\theta = 0.05$; $\widehat{\operatorname{se}} = \sqrt{\frac{0.9\cdot0.1}{100} + \frac{0.85\cdot0.15}{100}}$.`],
  a: [[R`$\widehat{\operatorname{se}}$`, 'sqrt(0.09/100+0.1275/100)'], [R`lower`, '0.05-1.282*sqrt(0.002175)'], [R`upper`, '0.05+1.282*sqrt(0.002175)']],
  s: R`$\widehat{\operatorname{se}} = \sqrt{0.0009 + 0.001275} = \sqrt{0.002175}\approx0.0466$. 80% CI: $0.05\pm1.282\cdot0.0466 = 0.05\pm0.0598 = (-0.010, 0.110)$. It contains 0, so the data do not clearly favour either drug. (Textbook 7.4.9.)`, src: 'Wasserman 7.4.9' }),
P({ k: 'i', lvl: 4, q: R`Let $X_1,\dots,X_n$ iid with $\E X^4<\infty$, $\mu = \E X$, $\sigma^2 = \var X$. Show that the plug-in variance $\hat\sigma^2 = \frac1n\sum(X_i - \bar X_n)^2$ is consistent, naming each theorem. Then explain in one sentence why the "linear functional" theorem does **not** directly give its asymptotic normality.`, h: [R`Write $\hat\sigma^2 = T_2(\hat F_n) - T_1(\hat F_n)^2$.`, R`$\hat\sigma^2$ is not of the form $\frac1n\sum r(X_i)$ because $\bar X_n$ appears inside every term.`],
  s: R`$\hat\sigma^2 = \frac1n\sum X_i^2 - \bar X_n^2$. By the WLLN, $\frac1n\sum X_i^2\xrightarrow{P}\E X^2 = \sigma^2 + \mu^2$ (needs $\E X^2<\infty$) and $\bar X_n\xrightarrow{P}\mu$. The map $a(t_1,t_2) = t_2 - t_1^2$ is continuous, so by the continuous mapping theorem (Theorem 5.5) $\hat\sigma^2\xrightarrow{P}(\sigma^2 + \mu^2) - \mu^2 = \sigma^2$. ∎

The theorem needs $\hat\theta = \frac1n\sum r(X_i)$ with a **fixed** $r$; here the summand $(X_i - \bar X_n)^2$ depends on all the data, so the CLT does not apply directly. Asymptotic normality instead follows from the multivariate delta method applied to $(\bar X_n, \frac1n\sum X_i^2)$, which is where $\E X^4<\infty$ is needed.` }),
]);

DRILLS('7.2', [
  { k: '01', lvl: 1, q: R`Which of these functionals is linear: (A) the mean, (B) the median, (C) the variance?`, a: { choice: ['Only A', 'A and B', 'A and C', 'All three'], v: 0 }, s: R`Only the mean, $\int x\dd F$. The median fails (topic example) and the variance is $T_2 - T_1^2$, a non-linear function of linear functionals.` },
  { k: '02', lvl: 1, q: R`Data: $2, 4, 4, 10$. Plug-in estimate of $\E(X^2)$?`, h: [R`Average the squares.`], a: '34', s: R`$\frac{4 + 16 + 16 + 100}{4} = 34$.` },
  { k: '03', lvl: 1, q: R`$\theta = P(X\le3) = \int\1(x\le3)\dd F$. Data $1, 5, 2, 7, 3$: plug-in $\hat\theta$?`, a: '3/5', s: R`Three values are $\le3$: $\frac35 = \hat F_5(3)$.` },
  { k: '04', lvl: 2, q: R`Data: $2, 4, 4, 10$. Plug-in variance and plug-in skewness?`, h: [R`$\bar x = 5$, deviations $-3, -1, -1, 5$.`], a: [[R`$\hat\sigma^2$`, '9'], [R`$\hat\kappa$`, '24/27']],
    s: R`$\hat\sigma^2 = \frac{9 + 1 + 1 + 25}{4} = 9$. Third central moment $\frac{-27 - 1 - 1 + 125}{4} = 24$. $\hat\kappa = \frac{24}{9^{3/2}} = \frac{24}{27}\approx0.889$.` },
  { k: '05', lvl: 2, q: R`$X\sim\Ber(p)$ and $\theta = \E X = p$. Asymptotic variance of $\sqrt n(\hat\theta - \theta)$ from the linear-functional theorem?`, a: [[R`use p`, 'p*(1-p)', { p: [0.05, 0.95] }]], s: R`$r(x) = x$, $\var r(X) = p(1-p)$.` },
  { k: '06', lvl: 2, q: R`$X\sim N(0,\sigma^2)$, $\theta = \E X^2 = \sigma^2$, $\hat\theta = \frac1n\sum X_i^2$. Asymptotic variance of $\sqrt n(\hat\theta - \theta)$? ($\E X^4 = 3\sigma^4$.)`, a: [[R`use sigma`, '2*sigma^4', { sigma: [0.3, 3] }]], s: R`$\var(X^2) = 3\sigma^4 - \sigma^4 = 2\sigma^4$.` },
  { k: '07', lvl: 2, q: R`$x<y$, $F(x) = 0.2$, $F(y) = 0.5$, $n = 40$. $\cov(\hat F_n(x), \hat F_n(y))$?`, a: '(0.2-0.1)/40', s: R`$\frac{0.2 - 0.2\cdot0.5}{40} = 0.0025$.` },
  { k: '08', lvl: 2, q: R`Two independent Bernoulli samples: 30 successes out of $n = 50$, and 20 out of $m = 50$. 90% CI for $p - q$?`, h: [R`$\hat p - \hat q = 0.2$; se $= \sqrt{\frac{0.24}{50} + \frac{0.24}{50}}$.`], a: [['lower', '0.2-1.645*sqrt(0.48/50)'], ['upper', '0.2+1.645*sqrt(0.48/50)']], s: R`se $= \sqrt{0.0096}\approx0.098$; $0.2\pm0.161 = (0.039, 0.361)$.`, src: 'original (like textbook 7.4.2)' },
  { k: '09', lvl: 3, q: R`For $x<y$, find $\var\big(\hat F_n(y) - \hat F_n(x)\big)$ from the covariance formula, in terms of $F_x = F(x)$, $F_y = F(y)$, $n$. Simplify.`, h: [R`$\var(A - B) = \var A + \var B - 2\cov(A,B)$.`],
    a: [['variance', '(Fy-Fx)*(1-(Fy-Fx))/n', { Fx: [0.05, 0.4], Fy: [0.5, 0.95], n: [1, 40, 'int'] }]],
    s: R`$\frac1n\left[F_y(1-F_y) + F_x(1-F_x) - 2(F_x - F_xF_y)\right] = \frac1n\left[(F_y - F_x) - (F_y - F_x)^2\right]$, i.e. $\frac{\theta(1-\theta)}n$ with $\theta = F_y - F_x$: the fraction in $(x, y]$ is binomial.` },
  { k: '10', lvl: 3, q: R`Delta method on a linear functional: $X\sim\Exp(\beta)$, $\hat\beta = \bar X_n$. Asymptotic variance of $\sqrt n\big(\hat\beta^2 - \beta^2\big)$?`, h: [R`$\sqrt n(\bar X - \beta)\to N(0, \beta^2)$; $g(u) = u^2$, $g'(\beta) = 2\beta$.`], a: [[R`use beta`, '4*beta^4', { beta: [0.3, 3] }]], s: R`$(2\beta)^2\beta^2 = 4\beta^4$.` },
  { k: '11', lvl: 4, q: R`Prove $\cov\big(\hat F_n(x), \hat F_n(y)\big) = \frac{F(\min(x,y)) - F(x)F(y)}{n}$ (textbook 7.4.5).`, h: [R`Bilinearity, then independence kills $i\ne j$ terms.`],
    s: R`$\cov\big(\hat F_n(x), \hat F_n(y)\big) = \frac{1}{n^2}\sum_{i,j}\cov\big(\1(X_i\le x), \1(X_j\le y)\big)$. For $i\ne j$ the two indicators are independent, so the covariance is 0. For $i = j$: $\E[\1(X_i\le x)\1(X_i\le y)] = P(X_i\le x, X_i\le y) = F(\min(x,y))$, so $\cov = F(\min(x,y)) - F(x)F(y)$. There are $n$ such terms:
$$\cov = \frac{n\left[F(\min(x,y)) - F(x)F(y)\right]}{n^2} = \frac{F(\min(x,y)) - F(x)F(y)}{n}.\ ∎$$`, src: 'Wasserman 7.4.5 (HW9 A2)' },
  { k: '12', lvl: 4, q: R`$X_1,\dots,X_n\iid F$ with $\E X^6<\infty$. Explain, naming theorems, why the plug-in skewness $\hat\kappa$ is consistent for $\kappa$. Where is a moment condition used?`,
    s: R`Expand $\frac1n\sum(X_i - \bar X)^3 = m_3 - 3\bar Xm_2 + 2\bar X^3$ and $\frac1n\sum(X_i - \bar X)^2 = m_2 - \bar X^2$ with $m_k = \frac1n\sum X_i^k$. So $\hat\kappa = a(\bar X, m_2, m_3)$ with
$$a(t_1,t_2,t_3) = \frac{t_3 - 3t_1t_2 + 2t_1^3}{(t_2 - t_1^2)^{3/2}},$$
continuous wherever $t_2 - t_1^2>0$. The WLLN gives $m_k\xrightarrow{P}\E X^k$ for $k = 1,2,3$ (needs $\E|X|^3<\infty$), and the CMT gives $\hat\kappa\xrightarrow{P}a(\E X, \E X^2, \E X^3) = \kappa$, using $\sigma^2>0$. (Finite sixth moment would be needed for asymptotic normality of $\hat\kappa$, not for consistency.)` },
]);
