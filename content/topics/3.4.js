TOPIC({ id: '3.4', ch: 3, title: 'Sample mean and sample variance', summary: 'X̄ is unbiased with variance σ²/n; S² with n−1 is unbiased for σ².' }, [
R`In statistics we observe data $X_1,\dots,X_n\iid F$ and want to learn about $F$'s mean $\mu$ and variance $\sigma^2$. The two most natural summaries of the data are the sample mean and sample variance. Here we study them as **random variables**: they change from sample to sample.`,
DEF('Sample mean and sample variance', R`$$\bar X_n = \frac1n\sum_{i=1}^nX_i,\qquad S_n^2 = \frac1{n-1}\sum_{i=1}^n\left(X_i - \bar X_n\right)^2.$$`),
THM(R`Mean and variance of $\bar X_n$; unbiasedness of $S_n^2$`, R`If $X_1,\dots,X_n$ are iid with mean $\mu$ and variance $\sigma^2$:
$$E(\bar X_n) = \mu,\qquad \operatorname{var}(\bar X_n) = \frac{\sigma^2}{n},\qquad E(S_n^2) = \sigma^2.$$
An estimator whose expectation equals the target is called **unbiased**. $\bar X_n$ is unbiased for $\mu$, and $S_n^2$ is unbiased for $\sigma^2$.`),
R`*Why?* $E(\bar X_n) = \frac1n\sum E(X_i) = \mu$ by linearity. By independence, $\operatorname{var}(\bar X_n) = \frac1{n^2}\sum\operatorname{var}(X_i) = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}n$.

The variance shrinks like $1/n$: averaging more data gives a more precise estimate. Quadruple the sample size and the standard deviation halves.`,
P({ k: 'a', lvl: 1, q: R`$X_1,\dots,X_{25}$ iid with $\sigma^2 = 100$. Find $\operatorname{var}(\bar X)$ and $\operatorname{sd}(\bar X)$.`, h: [R`$\sigma^2/n$.`], a: [[R`$\operatorname{var}(\bar X)$`, '4'], [R`$\operatorname{sd}(\bar X)$`, '2']],
  s: R`$\operatorname{var}(\bar X) = \frac{100}{25} = 4$, so $\operatorname{sd}(\bar X) = 2$ (that is, $\sigma/\sqrt n = 10/5$).` }),
P({ k: 'b', lvl: 1, q: R`Data: $2, 4, 4, 6$. Compute $\bar X$ and $S^2$.`, h: [R`Deviations from the mean: $-2, 0, 0, 2$.`, R`Divide by $n - 1 = 3$.`], a: [[R`$\bar X$`, '4'], ['$S^2$', '8/3']],
  s: R`$\bar X = 16/4 = 4$. $\sum(X_i - \bar X)^2 = 4 + 0 + 0 + 4 = 8$, so $S^2 = 8/3$.` }),
P({ k: 'c', lvl: 3, q: R`Prove that $E(S_n^2) = \sigma^2$. (Write the proof, then compare.) Afterwards, enter $E\left[\sum_{i=1}^n(X_i-\bar X)^2\right]$ as a function of $n$ when $\sigma^2 = 1$.`,
  h: [R`Algebra first: $\sum(X_i - \bar X)^2 = \sum X_i^2 - n\bar X^2$.`, R`$E(X_i^2) = \sigma^2+\mu^2$ and $E(\bar X^2) = \operatorname{var}(\bar X) + \mu^2 = \frac{\sigma^2}n + \mu^2$.`],
  a: [[R`$E\sum(X_i-\bar X)^2$`, 'n-1', { n: [2, 30, 'int'] }]],
  s: R`Expanding, $\sum(X_i-\bar X)^2 = \sum X_i^2 - 2\bar X\sum X_i + n\bar X^2 = \sum X_i^2 - n\bar X^2$, because $\sum X_i = n\bar X$. Take expectations:
$$E\left[\sum(X_i-\bar X)^2\right] = n(\sigma^2 + \mu^2) - n\left(\frac{\sigma^2}{n} + \mu^2\right) = (n-1)\sigma^2.$$
Dividing by $n-1$: $E(S_n^2) = \sigma^2$. With $\sigma^2 = 1$ the expectation is $n-1$.

This is why we divide by $n - 1$. Using $\bar X$ instead of the true $\mu$ makes the squared deviations systematically a bit too small, and $n-1$ corrects for that.`,
  src: 'Slides Ch.3 ("Show:" exercise)' }),
P({ k: 'd', lvl: 2, q: R`Someone uses $\hat\sigma^2 = \frac1n\sum(X_i - \bar X)^2$ instead of $S^2$. With $n=5$ and $\sigma^2 = 10$, find $E(\hat\sigma^2)$.`, h: [R`$\hat\sigma^2 = \frac{n-1}{n}S^2$.`], a: '8',
  s: R`$E(\hat\sigma^2) = \frac{n-1}n\sigma^2 = \frac45\cdot10 = 8$. This estimator is biased downward, by $-\sigma^2/n$.` }),
P({ k: 'e', lvl: 2, q: R`Each measurement has $\sigma = 2$. How many iid measurements $n$ do you need so that $\operatorname{sd}(\bar X)\le0.1$?`, h: [R`$\frac{2}{\sqrt n}\le0.1$.`], a: '400',
  s: R`$\sqrt n\ge20\Rightarrow n\ge400$.` }),
P({ k: 'f', lvl: 2, q: R`$X_1,\dots,X_n\iid\operatorname{Exp}(\beta)$. Find $E(\bar X_n)$ and $\operatorname{var}(\bar X_n)$ for $n = 10$, $\beta = 2$.`, h: [R`$\mu = \beta$, $\sigma^2 = \beta^2$.`], a: [[R`$E(\bar X)$`, '2'], [R`$\operatorname{var}(\bar X)$`, '0.4']],
  s: R`$E(\bar X_n) = \beta = 2$, $\operatorname{var}(\bar X_n) = \beta^2/n = 4/10 = 0.4$. (The 2025 midterm Ex.3(b) asks you to derive exactly this, but from the MGF. See topic 3.7.)` }),
P({ k: 'g', lvl: 2, q: R`$X_1, X_2$ iid with mean $\mu$, variance $\sigma^2 = 9$. Consider $T = \frac{X_1 + 2X_2}{3}$. Is $T$ unbiased for $\mu$? Find $\operatorname{var}(T)$ and compare to $\operatorname{var}(\bar X_2)$.`,
  h: [R`$E(T) = \frac{\mu + 2\mu}3$. $\operatorname{var}(T) = \frac{1 + 4}{9}\sigma^2$.`],
  a: [['Unbiased?', { choice: ['Yes', 'No'], v: 0 }], [R`$\operatorname{var}(T)$`, '5']],
  s: R`$E(T) = \mu$, so $T$ is unbiased. $\operatorname{var}(T) = \frac{1}{9}(\sigma^2 + 4\sigma^2) = \frac59\cdot9 = 5$, larger than $\operatorname{var}(\bar X_2) = \frac92 = 4.5$. Equal weights give the smallest variance among unbiased weighted averages.` }),
]);

DRILLS('3.4', [
  { k: '01', lvl: 1, q: R`$X_1,\dots,X_{16}$ iid with $\sigma = 8$. Find $\operatorname{sd}(\bar X)$.`, h: [R`$\sigma/\sqrt n$.`], a: '2', s: R`$8/4 = 2$.` },
  { k: '02', lvl: 1, q: R`Data: $1, 3, 5, 7$. Find $\bar X$ and $S^2$.`, h: [R`Deviations $-3,-1,1,3$.`], a: [[R`$\bar X$`, '4'], ['$S^2$', '20/3']], s: R`$\bar X = 4$, $\sum d_i^2 = 20$, $S^2 = 20/3$.` },
  { k: '03', lvl: 1, q: R`$X_1,\dots,X_{100}\iid\operatorname{Ber}(0.3)$. Find $E(\bar X)$ and $\operatorname{var}(\bar X)$.`, h: [R`$\sigma^2 = p(1-p) = 0.21$.`], a: [[R`$E(\bar X)$`, '0.3'], [R`$\operatorname{var}(\bar X)$`, '0.0021']], s: R`$E = 0.3$, $\operatorname{var} = 0.21/100 = 0.0021$.` },
  { k: '04', lvl: 1, q: R`$X_1,\dots,X_n\iid\operatorname{Poisson}(5)$. Find $E(S^2)$.`, h: [R`$S^2$ is unbiased for $\sigma^2$.`], a: '5', s: R`$E(S^2) = \sigma^2 = \lambda = 5$.` },
  { k: '05', lvl: 2, q: R`iid sample with $\mu = 2$, $\sigma^2 = 4$, $n = 8$. Find $E(\bar X^2)$.`, h: [R`$E(\bar X^2) = \operatorname{var}(\bar X) + E(\bar X)^2$.`], a: '4.5', s: R`$\frac48 + 4 = 4.5$.` },
  { k: '06', lvl: 2, q: R`$X_i\iid\operatorname{Unif}(0,1)$. Smallest $n$ with $\operatorname{var}(\bar X)\le0.01$?`, h: [R`$\frac{1}{12n}\le0.01$.`], a: '9', s: R`$n\ge\frac{100}{12}\approx8.33$, so $n = 9$.` },
  { k: '07', lvl: 2, q: R`$X_1,\dots,X_5\iid N(1,4)$. Find $E\left(\sum_iX_i^2\right)$.`, h: [R`$E(X_i^2) = \sigma^2 + \mu^2$.`], a: '25', s: R`$5(4+1) = 25$.` },
  { k: '08', lvl: 2, q: R`iid with variance $\sigma^2 = 8$. $T = \tfrac12X_1 + \tfrac14X_2 + \tfrac14X_3$. Find $\operatorname{var}(T)$.`, h: [R`$\sigma^2\sum a_i^2$.`], a: '3', s: R`$8\left(\tfrac14+\tfrac1{16}+\tfrac1{16}\right) = 8\cdot\tfrac38 = 3$.` },
  { k: '09', lvl: 1, q: R`For an iid sample of size $n = 10$, find $E\left[\frac{(n-1)S^2}{\sigma^2}\right]$.`, h: [R`$E(S^2) = \sigma^2$.`], a: '9', s: R`$(n-1)\cdot1 = 9$.` },
  { k: '10', lvl: 3, q: R`$X_i\iid\operatorname{Unif}(0,\theta)$. Show $2\bar X$ is unbiased for $\theta$ and find $\operatorname{var}(2\bar X)$ for $\theta = 6$, $n = 3$.`, h: [R`$E(X_i) = \theta/2$, $\operatorname{var}(X_i) = \theta^2/12$.`], a: '4',
    s: R`$E(2\bar X) = 2\cdot\frac\theta2 = \theta$ ✓. $\operatorname{var}(2\bar X) = 4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n} = \frac{36}{9} = 4$.` },
  { k: '11', lvl: 1, q: R`$X_1,\dots,X_9\iid\operatorname{Exp}(3)$. Find $\operatorname{var}(\bar X)$.`, h: [R`$\beta^2/n$.`], a: '1', s: R`$9/9 = 1$.` },
  { k: '12', lvl: 3, q: R`$X_1,\dots,X_8$ iid with mean $\mu = 3$ and variance $\sigma^2 = 4$. The natural estimate of $\mu^2$ is $\bar X^2$.
(a) Find $E(\bar X^2)$ and the bias $E(\bar X^2) - \mu^2$.
(b) Find the constant $c$ such that $\bar X^2 - cS^2$ is unbiased for $\mu^2$ **for every** $\mu$ and $\sigma^2$.`,
    h: [R`$E(\bar X^2) = \operatorname{var}(\bar X) + E(\bar X)^2$.`, R`The bias is $\sigma^2/n$, which depends on the unknown $\sigma^2$. Which statistic has expectation $\sigma^2$?`],
    a: [[R`$E(\bar X^2)$`, '19/2'], ['bias', '1/2'], ['$c$', '1/8']],
    s: R`**(a)** $E(\bar X^2) = \operatorname{var}(\bar X) + \mu^2 = \frac{\sigma^2}n + \mu^2 = \frac48 + 9 = \frac{19}2$. The bias is $\frac{\sigma^2}{n} = \frac12$: $\bar X^2$ overestimates $\mu^2$ on average. (Squaring is not linear, so unbiasedness of $\bar X$ does not carry over to $\bar X^2$.)

**(b)** We can't subtract $\sigma^2/n$ because $\sigma^2$ is unknown, but $E(S^2) = \sigma^2$. So
$$E\left(\bar X^2 - cS^2\right) = \mu^2 + \frac{\sigma^2}n - c\sigma^2 = \mu^2\ \text{ for all }\sigma^2\iff c = \frac1n = \frac18.$$` },
  { k: '13', lvl: 4, q: R`(Exam style.) $X_1,\dots,X_n$ are iid with mean $\mu$ and variance $\sigma^2$.
(a) Write $X_1 - \bar X_n$ as a linear combination of the **independent** $X_i$ and show $\operatorname{var}(X_1 - \bar X_n) = \frac{n-1}{n}\sigma^2$.
(b) Show $E(X_1\bar X_n) = \frac{\sigma^2}{n} + \mu^2$.
(c) Use (a) to give a second proof that $E(S_n^2) = \sigma^2$.
Enter the values for $n = 5$, $\mu = 2$, $\sigma^2 = 10$.`,
    h: [R`$X_1 - \bar X_n = \left(1-\frac1n\right)X_1 - \frac1n\sum_{j=2}^nX_j$. Now use $\operatorname{var}(\sum a_iX_i) = \sum a_i^2\operatorname{var}(X_i)$ for independent terms.`, R`$X_1\bar X_n = \frac1n X_1^2 + \frac1n\sum_{j\ge2}X_1X_j$. Use $E(X_1^2) = \sigma^2+\mu^2$ and independence for $j\ne1$.`, R`$E(X_i - \bar X_n) = 0$, so $E[(X_i - \bar X_n)^2] = \operatorname{var}(X_i - \bar X_n)$, and by symmetry this is the same for every $i$.`],
    a: [[R`$\operatorname{var}(X_1-\bar X)$`, '8'], [R`$E(X_1\bar X)$`, '6'], [R`$E\sum_i(X_i-\bar X)^2$`, '40']],
    s: R`**(a)** $X_1 - \bar X_n = \left(1-\frac1n\right)X_1 - \frac1n\sum_{j=2}^nX_j$, a linear combination of independent variables, so
$$\operatorname{var}(X_1-\bar X_n) = \left(1-\frac1n\right)^2\sigma^2 + (n-1)\frac{\sigma^2}{n^2} = \frac{(n-1)\sigma^2}{n^2}\big[(n-1) + 1\big] = \frac{n-1}{n}\sigma^2.$$
(Trap: $X_1$ and $\bar X_n$ are **not** independent, since $X_1$ is part of $\bar X_n$; so $\operatorname{var}(X_1)+\operatorname{var}(\bar X_n) = \sigma^2(1+\frac1n)$ is wrong.)

**(b)** $E(X_1\bar X_n) = \frac1nE(X_1^2) + \frac1n\sum_{j=2}^nE(X_1)E(X_j) = \frac{\sigma^2+\mu^2}{n} + \frac{n-1}n\mu^2 = \frac{\sigma^2}{n} + \mu^2.$

**(c)** $E(X_i - \bar X_n) = \mu - \mu = 0$, so $E[(X_i-\bar X_n)^2] = \operatorname{var}(X_i - \bar X_n) = \frac{n-1}n\sigma^2$, the same for every $i$ by symmetry (relabel the sample). Summing,
$$E\left[\sum_{i=1}^n(X_i-\bar X_n)^2\right] = n\cdot\frac{n-1}{n}\sigma^2 = (n-1)\sigma^2\quad\Longrightarrow\quad E(S_n^2) = \sigma^2.$$
With $n = 5$, $\mu = 2$, $\sigma^2 = 10$: $\operatorname{var}(X_1-\bar X) = \frac45\cdot10 = 8$, $E(X_1\bar X) = 2 + 4 = 6$, and $E\sum(X_i-\bar X)^2 = 4\cdot10 = 40$.` },
]);
