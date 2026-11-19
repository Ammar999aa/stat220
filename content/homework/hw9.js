HW({ id: 'hw9', title: 'Homework 9', summary: 'Empirical CDF and plug-in (Ch.7), the nonparametric bootstrap (Ch.8).',
  intro: R`Topics: Chapter 7 (empirical CDF, plug-in estimators) and Chapter 8 (the bootstrap). The B problems were **due Nov 18, 8:30** on Blackboard. **There are no official solutions**: these were written for this app. The R results were computed with <code>set.seed(220)</code> and the code shown; a different order of random calls gives slightly different numbers.

"Textbook 7.4.1" means Wasserman, *All of Statistics*, Section 7.4 (Exercises), exercise 1. A2, A4, B2, C1 and C2 are the same problems as on the 7.2 / 8.1 topic pages and drills, so solving them in either place counts for both.` }, [
  { k: 'A1', topic: '7.1', lvl: 3, q: R`(Textbook 7.4.1) Prove Theorem 7.3: for any fixed $x$, (1) $\E[\hat F_n(x)] = F(x)$; (2) $\var[\hat F_n(x)] = \frac{F(x)(1 - F(x))}{n}$; (3) $\operatorname{MSE}\big(\hat F_n(x)\big) = \frac{F(x)(1 - F(x))}{n}\to0$; (4) $\hat F_n(x)\xrightarrow{P}F(x)$.`,
    h: [R`$Y_i = \1(X_i\le x)$ are iid. What is their distribution?`, R`(4): MSE $\to0$ means convergence in quadratic mean, which implies convergence in probability.`],
    s: R`Fix $x$ and put $Y_i = \1(X_i\le x)$. The $Y_i$ are iid (functions of iid variables) with $P(Y_i = 1) = F(x)$, so $Y_i\sim\Ber(F(x))$: $\E Y_i = F(x)$, $\var Y_i = F(x)(1 - F(x))$. Then $\hat F_n(x) = \bar Y_n$.

(1) Linearity: $\E\hat F_n(x) = \frac1n\sum\E Y_i = F(x)$. Unbiased.

(2) Independence: $\var\hat F_n(x) = \frac1{n^2}\sum\var Y_i = \frac{F(x)(1 - F(x))}{n}$.

(3) $\operatorname{MSE} = \text{bias}^2 + \var = 0 + \frac{F(x)(1-F(x))}{n}\le\frac1{4n}\to0$.

(4) MSE $= \E[(\hat F_n(x) - F(x))^2]\to0$ is convergence in quadratic mean, which implies convergence in probability (Markov: $P(|\hat F_n(x) - F(x)|>\varepsilon)\le\frac{\operatorname{MSE}}{\varepsilon^2}\to0$). Hence $\hat F_n(x)$ is consistent. ∎`,
    src: 'HW9 A1 (Wasserman 7.4.1; solution written for this app)' },
  { k: 'A2', ref: 'd7.2-11' },
  { k: 'A3', topic: '8.1', lvl: 3, q: R`(Textbook 8.6.4) Let $X_1,\dots,X_n$ be distinct observations (no ties). Show that there are $\binom{2n-1}{n}$ distinct bootstrap samples. Then give the number for $n = 6$.`, h: [R`A bootstrap sample (as a multiset) is determined by the counts $c_i$ = number of times $X_i$ is drawn.`, R`Count solutions of $c_1 + \dots + c_n = n$, $c_i\ge0$: $n$ balls in $n$ buckets.`],
    a: [[R`$n = 6$`, '462']],
    s: R`The order of draws does not change the sample's statistics, so a bootstrap sample is the vector of counts $(c_1,\dots,c_n)$ with $c_i\ge0$ and $\sum c_i = n$. Since the observations are distinct, different count vectors give different samples.

**Stars and bars.** Write the $n$ draws as $n$ stars and separate the $n$ buckets with $n - 1$ bars, e.g. for $n = 3$: $\star\star\,|\,|\,\star$ means $(c_1,c_2,c_3) = (2,0,1)$. Every arrangement of $n$ stars and $n-1$ bars in a row of $2n - 1$ slots corresponds to exactly one count vector, and vice versa. Choosing which $n$ of the $2n-1$ slots hold stars gives
$$\binom{2n-1}{n}$$
distinct bootstrap samples. ∎ For $n = 6$: $\binom{11}{6} = 462$.

(They are not equally likely: $(c_1,\dots,c_n)$ has multinomial probability $\frac{n!}{c_1!\cdots c_n!}\,n^{-n}$.)`,
    src: 'HW9 A3 (Wasserman 8.6.4; solution written for this app)' },
  { k: 'A4', ref: 't8.1-i' },
  { k: 'B1', topic: '7.2', lvl: 3, q: R`(Textbook 7.4.2) Let $X_1,\dots,X_n\iid\Ber(p)$ and $Y_1,\dots,Y_m\iid\Ber(q)$, independent samples. Find the plug-in estimator and estimated standard error for $p$, and an approximate 90% confidence interval for $p$. Then do the same for $p - q$. Enter the standard errors using <code>ph</code> $=\hat p$, <code>qh</code> $=\hat q$, <code>n</code>, <code>m</code>.`,
    h: [R`$p = \E X = \int x\dd F(x)$, a linear functional: plug-in $\hat p = \bar X_n$.`, R`$\var(\bar X_n) = \frac{p(1-p)}{n}$; plug in $\hat p$. For a difference of **independent** estimators, variances add.`, R`90%: $z_{0.05} = \Phi^{-1}(0.95) = 1.645$.`],
    a: [[R`$\widehat{\operatorname{se}}(\hat p)$`, 'sqrt(ph*(1-ph)/n)', { ph: [0.05, 0.95], n: [5, 200, 'int'] }], [R`$\widehat{\operatorname{se}}(\hat p - \hat q)$`, 'sqrt(ph*(1-ph)/n+qh*(1-qh)/m)', { ph: [0.05, 0.95], qh: [0.05, 0.95], n: [5, 200, 'int'], m: [5, 200, 'int'] }]],
    s: R`**For $p$.** $p = T(F) = \int x\dd F(x)$ is linear, so the plug-in estimator is $\hat p = T(\hat F_n) = \frac1n\sum X_i = \bar X_n$. Since $\var(\hat p) = \frac{p(1-p)}{n}$,
$$\widehat{\operatorname{se}}(\hat p) = \sqrt{\frac{\hat p(1-\hat p)}{n}}.$$
By the CLT $\frac{\hat p - p}{\widehat{\operatorname{se}}}\xrightarrow{D}N(0,1)$ (Slutsky, since $\hat p\xrightarrow{P}p$), so an approximate 90% CI is
$$\hat p\pm1.645\sqrt{\frac{\hat p(1-\hat p)}{n}}.$$
**For $p - q$.** Plug-in $\hat\theta = \hat p - \hat q = \bar X_n - \bar Y_m$. The samples are independent, so $\var(\hat p - \hat q) = \frac{p(1-p)}{n} + \frac{q(1-q)}{m}$ and
$$\widehat{\operatorname{se}}(\hat p - \hat q) = \sqrt{\frac{\hat p(1-\hat p)}{n} + \frac{\hat q(1-\hat q)}{m}},\qquad\text{90\% CI: }\ \hat p - \hat q\pm1.645\,\widehat{\operatorname{se}}.$$
The interval is approximate (CLT for each sample, $n, m$ large). Example: textbook 7.4.9 on the topic page.`,
    src: 'HW9 B1 (Wasserman 7.4.2; solution written for this app)' },
  { k: 'B2', ref: 'd8.1-11' },
  { k: 'B3', topic: '8.2', lvl: 3, q: R`Let $X_1,\dots,X_n\iid\Exp(\lambda)$ ($\lambda$ = **rate**), $\theta = e^\lambda$, and $\hat\theta = e^{1/\bar X_n}$. In R: generate $n = 100$ observations with $\lambda = 2$, seed 220, $B = 2000$ bootstrap replications. (a) Compute $\hat\theta$. (b) Describe and implement the bootstrap. (c) Bootstrap standard error. (d) 95% Normal bootstrap CI for $\theta$; does it contain $e^2$?`,
    h: [R`$\hat\theta$ is the plug-in estimator: $\lambda = 1/\E X$, so $\hat\lambda = 1/\bar X_n$ and $\hat\theta = e^{\hat\lambda}$.`, R`Each replicate: resample the 100 values with replacement and recompute $e^{1/\bar X^*}$.`],
    a: [[R`(a) $\hat\theta$`, '10.545'], [R`(c) $\widehat{\operatorname{se}}_{\text{boot}}$`, '2.922'], [R`(d) lower`, '4.819'], [R`(d) upper`, '16.271']],
    s: R`**(b) Procedure.** (1) Compute $\hat\theta = e^{1/\bar X_n}$ from the data. (2) For $b = 1,\dots,B$: draw $X_1^*,\dots,X_n^*$ from the data with replacement and compute $\hat\theta^*_b = e^{1/\bar X^*_b}$. (3) $\widehat{\operatorname{se}}_{\text{boot}} = \sqrt{\frac{1}{B-1}\sum_b(\hat\theta^*_b - \bar\theta^*)^2}$ (R's <code>sd</code>; $\frac1B$ makes no visible difference). (4) Normal CI: $\hat\theta\pm1.96\,\widehat{\operatorname{se}}_{\text{boot}}$.

<pre class="no-math"><code>set.seed(220)
n = 100; B = 2000
x = rexp(n, rate = 2)
theta_hat = exp(1/mean(x))
boot = replicate(B, exp(1/mean(sample(x, n, replace = TRUE))))
se_boot = sd(boot)
c(theta_hat - qnorm(0.975)*se_boot, theta_hat + qnorm(0.975)*se_boot)</code></pre>

**Results.** $\bar X = 0.4245$ (so $\hat\lambda = 2.356$), (a) $\hat\theta = 10.545$, (c) $\widehat{\operatorname{se}}_{\text{boot}} = 2.922$, (d) $(4.82, 16.27)$, which **contains** $e^2 = 7.389$.

**Comment.** This sample's mean is below $\frac12$, so $\hat\theta$ overshoots. The bootstrap distribution is right-skewed (95% percentile interval $(7.11, 17.99)$), since $u\mapsto e^{1/u}$ is convex, so the symmetric Normal interval is only rough here. The delta-method se $\frac{\hat\lambda\hat\theta}{\sqrt n}\approx2.48$ is smaller than the bootstrap se for the same reason.`,
    src: 'HW9 B3 (solution and R output written for this app)' },
  { k: 'C1', ref: 'd8.1-12' },
  { k: 'C2', ref: 't8.1-f' },
]);
