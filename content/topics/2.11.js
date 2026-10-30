TOPIC({ id: '2.11', ch: 2, title: 'Multinomial and multivariate normal', summary: 'Counts in k categories; the multivariate normal, its marginals, conditionals and quadratic form.' }, [
R`These are the two most important distributions of a **random vector** $X = (X_1,\dots,X_k)$. The Multinomial generalizes the Binomial to more than two categories. The multivariate Normal generalizes $N(\mu,\sigma^2)$ to correlated vectors.`,
DEF('Multinomial$(n, p)$', R`Run $n$ independent trials, each landing in one of $k$ categories with probabilities $p = (p_1,\dots,p_k)$, $\sum p_j = 1$. Let $X_j$ = number of trials in category $j$. Then
$$f(x_1,\dots,x_k) = \binom{n}{x_1\,\cdots\,x_k}p_1^{x_1}\cdots p_k^{x_k},\qquad\binom{n}{x_1\cdots x_k} = \frac{n!}{x_1!\cdots x_k!},$$
for $x_j\in\{0,\dots,n\}$ with $\sum x_j = n$.

**Marginals:** $X_j\sim\operatorname{Bin}(n,p_j)$: lump everything else into "not $j$". Also $\operatorname{cov}(X_i,X_j) = -np_ip_j$ for $i\ne j$. If one count is high, the others must be lower.`),
P({ k: 'a', lvl: 1, q: R`A fair die is rolled 6 times. Probability that each face appears exactly once?`, h: [R`Multinomial with all $x_j = 1$: $\frac{6!}{1!\cdots1!}(\frac16)^6$.`], a: '720/46656', s: R`$\frac{6!}{6^6} = \frac{720}{46656}\approx0.0154$.` }),
P({ k: 'b', lvl: 2, q: R`$X\sim\text{Multinomial}(5, (0.5, 0.3, 0.2))$. Find $P(X = (2,2,1))$.`, h: [R`$\frac{5!}{2!2!1!} = 30$.`], a: '30*0.25*0.09*0.2', s: R`$30\cdot0.5^2\cdot0.3^2\cdot0.2 = 30\cdot0.0045 = 0.135$.` }),
P({ k: 'c', lvl: 2, q: R`Same multinomial. Find $E(X_2)$ and $\operatorname{cov}(X_1,X_2)$.`, h: [R`$X_2\sim\operatorname{Bin}(5,0.3)$; $\operatorname{cov} = -np_1p_2$.`], a: [['$E(X_2)$', '1.5'], [R`$\operatorname{cov}(X_1,X_2)$`, '-0.75']], s: R`$E(X_2) = 5\cdot0.3 = 1.5$; $\operatorname{cov}(X_1,X_2) = -5\cdot0.5\cdot0.3 = -0.75$.` }),
DEF(R`Multivariate normal $N_k(\mu,\Sigma)$`, R`$\mu\in\R^k$ and $\Sigma$ a symmetric positive-definite $k\times k$ matrix:
$$f(x) = \frac{1}{(2\pi)^{k/2}|\Sigma|^{1/2}}\exp\left(-\frac12(x-\mu)^T\Sigma^{-1}(x-\mu)\right),\quad x\in\R^k.$$
$\mu$ is the mean vector, and $\Sigma$ the covariance matrix: $\Sigma_{ij} = \operatorname{cov}(X_i,X_j)$, $\Sigma_{jj} = \sigma_j^2$.`),
THM('Properties of the multivariate normal', R`<ol><li>$Z\sim N_k(0,I)\Rightarrow X = \mu + \Sigma^{1/2}Z\sim N_k(\mu,\Sigma)$; conversely $\Sigma^{-1/2}(X-\mu)\sim N_k(0,I)$.</li><li><b>Marginals are normal:</b> $X_j\sim N(\mu_j,\Sigma_{jj})$; more generally a sub-vector $X_1\sim N(\mu_1,\Sigma_{11})$.</li><li><b>Conditionals are normal:</b> $X_2\mid X_1 = x_1\sim N\big(\mu_2 + \Sigma_{21}\Sigma_{11}^{-1}(x_1-\mu_1),\ \Sigma_{22}-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12}\big)$.</li><li>$(X-\mu)^T\Sigma^{-1}(X-\mu)\sim\chi^2_k$.</li><li>Linear combinations: $a^TX\sim N(a^T\mu, a^T\Sigma a)$.</li><li>For the multivariate normal (only!), <b>uncorrelated ⇔ independent</b>.</li></ol>`),
P({ k: 'd', lvl: 1, q: R`$X\sim N_2\left(\begin{pmatrix}1\\2\end{pmatrix},\begin{pmatrix}4&1\\1&9\end{pmatrix}\right)$. What is the distribution of $X_2$? Enter its variance.`, h: [R`Read the diagonal.`], a: '9', s: R`$X_2\sim N(2, 9)$.` }),
P({ k: 'e', lvl: 3, q: R`Same $X$. Find the mean and variance of $X_2\mid X_1 = 3$.`, h: [R`Scalar version: mean $\mu_2 + \frac{\sigma_{12}}{\sigma_1^2}(x_1-\mu_1)$, variance $\sigma_2^2 - \frac{\sigma_{12}^2}{\sigma_1^2}$.`], a: [['mean', '2.5'], ['variance', '8.75']],
  s: R`Mean $= 2 + \frac14(3-1) = 2.5$; variance $= 9 - \frac{1}{4} = 8.75$. Knowing $X_1$ reduces uncertainty about $X_2$ only slightly, because the correlation $\frac{1}{2\cdot3} = \frac16$ is small.` }),
P({ k: 'f', lvl: 2, q: R`Same $X$. Find the distribution of $X_1 + X_2$ (mean and variance).`, h: [R`$a = (1,1)$: $a^T\Sigma a = 4 + 9 + 2\cdot1$.`], a: [['mean', '3'], ['variance', '15']], s: R`$N(3, 15)$.` }),
P({ k: 'g', lvl: 2, q: R`$X\sim N_3(\mu,\Sigma)$. What is $E\left[(X-\mu)^T\Sigma^{-1}(X-\mu)\right]$?`, h: [R`It is $\chi^2_3$.`], a: '3', s: R`$\chi^2_3$ has mean $3$.` }),
]);

DRILLS('2.11', [
  { k: '01', lvl: 1, q: R`4 trials with category probabilities $(\frac12,\frac14,\frac14)$. $P(X = (2,1,1))$?`, h: [R`$\frac{4!}{2!1!1!} = 12$.`], a: '3/16', s: R`$12\cdot\frac14\cdot\frac14\cdot\frac14 = \frac{12}{64} = \frac3{16}$.` },
  { k: '02', lvl: 1, q: R`Multinomial with $n=10$, $p_1 = 0.2$. Find $\operatorname{var}(X_1)$.`, h: [R`$X_1\sim\operatorname{Bin}(10,0.2)$.`], a: '1.6', s: R`$10\cdot0.2\cdot0.8 = 1.6$.` },
  { k: '03', lvl: 2, q: R`$X\sim N_2\left(0,\begin{pmatrix}1&0.5\\0.5&1\end{pmatrix}\right)$. Find $\operatorname{var}(X_1 - X_2)$.`, h: [R`$1 + 1 - 2(0.5)$.`], a: '1', s: R`$1$.` },
  { k: '04', lvl: 3, q: R`Same $X$. Find $E(X_2\mid X_1 = 2)$ and $\operatorname{var}(X_2\mid X_1=2)$.`, h: [R`$\rho = 0.5$.`], a: [['mean', '1'], ['variance', '0.75']], s: R`Mean $0.5\cdot2 = 1$, variance $1 - 0.25 = 0.75$.` },
  { k: '05', lvl: 1, q: R`$X\sim N_2(\mu,\Sigma)$ with $\Sigma$ diagonal. Are $X_1$ and $X_2$ independent?`, h: [R`Normal + uncorrelated.`], a: { choice: ['Yes', 'Not necessarily'], v: 0 }, s: R`Yes. For the multivariate normal, zero covariance implies independence: the density factorizes.` },
  { k: '06', lvl: 2, q: R`$X\sim N_2\left(0,\begin{pmatrix}2&1\\1&3\end{pmatrix}\right)$. Find $\operatorname{var}(2X_1 - X_2)$.`, h: [R`$4\cdot2 + 3 - 2\cdot2\cdot1$.`], a: '7', s: R`$8 + 3 - 4 = 7$.` },
  { k: '07', lvl: 2, q: R`For $\Sigma = \begin{pmatrix}2&1\\1&3\end{pmatrix}$, find the normalizing constant $\frac{1}{2\pi|\Sigma|^{1/2}}$ of the bivariate normal density.`, h: [R`$|\Sigma| = 6 - 1$.`], a: '1/(2*pi*sqrt(5))', s: R`$|\Sigma| = 5$, so the constant is $\frac{1}{2\pi\sqrt5}\approx0.0712$.` },
  { k: '08', lvl: 3, q: R`A fair die is rolled 6 times. Let $X_1$ = number of 1s and $X_2$ = number of 2s. Find $P(X_1 = 2\mid X_2 = 1)$ and $\operatorname{var}(X_1 + X_2)$.`,
    h: [R`Conditioning: given $X_2 = 1$, the other 5 rolls are known **not** to be 2s. Each of them is a 1 with probability $\frac{1/6}{5/6} = \frac15$, independently.`, R`So $X_1\mid X_2 = 1\sim\operatorname{Bin}(5,\tfrac15)$. (Trap: it is not $\operatorname{Bin}(6,\tfrac16)$.)`, R`$X_1 + X_2$ counts rolls showing 1 or 2: $\operatorname{Bin}(6,\tfrac13)$. Or use $\operatorname{var}(X_1)+\operatorname{var}(X_2)+2\operatorname{cov}(X_1,X_2)$ with $\operatorname{cov} = -np_1p_2$.`],
    a: [[R`$P(X_1=2\mid X_2=1)$`, '128/625'], [R`$\operatorname{var}(X_1+X_2)$`, '4/3']],
    s: R`**Conditional probability.** Given $X_2 = 1$, the remaining $5$ rolls are iid and each lands in $\{1,3,4,5,6\}$ uniformly, so each is a 1 with probability $\tfrac15$. Hence $X_1\mid X_2=1\sim\operatorname{Bin}(5,\tfrac15)$ and
$$P(X_1 = 2\mid X_2 = 1) = \binom52\left(\tfrac15\right)^2\left(\tfrac45\right)^3 = 10\cdot\frac{1}{25}\cdot\frac{64}{125} = \frac{128}{625}\approx0.205.$$
(Check with the definition: $\frac{P(X=(2,1,3))}{P(X_2=1)}$ with the multinomial for (1s, 2s, other) gives $\frac{\frac{6!}{2!1!3!}(\frac16)^3(\frac46)^3}{6\cdot\frac16(\frac56)^5} = \frac{128}{625}$ ✓.)

**Variance.** $X_1 + X_2$ counts the rolls showing 1 or 2, so it is $\operatorname{Bin}(6,\tfrac13)$ with variance $6\cdot\tfrac13\cdot\tfrac23 = \tfrac43$. Via covariances: $\operatorname{var}(X_i) = 6\cdot\tfrac16\cdot\tfrac56 = \tfrac56$ and $\operatorname{cov}(X_1,X_2) = -6\cdot\tfrac16\cdot\tfrac16 = -\tfrac16$, so $\tfrac56 + \tfrac56 - \tfrac13 = \tfrac43$ ✓. Forgetting the negative covariance gives the wrong $\tfrac53$.` },
  { k: '09', lvl: 4, q: R`(Exam style, 20 pt.) $X = (X_1, X_2)^T\sim N_2(\mu,\Sigma)$ with $\mu = \begin{pmatrix}1\\-1\end{pmatrix}$ and $\Sigma = \begin{pmatrix}4&2\\2&3\end{pmatrix}$.

(a) Find the constant $a$ such that $Y = X_2 - aX_1$ is independent of $X_1$. Then give the mean and variance of $Y$.

(b) Find $E(X_2\mid X_1 = 3)$ and $\operatorname{var}(X_2\mid X_1 = 3)$.

(c) Let $Q = (X-\mu)^T\Sigma^{-1}(X-\mu)$. Find $P(Q > 4)$.`,
    h: [R`(a) $(X_1, Y)$ is a linear transformation of a normal vector, so it is jointly normal. For jointly normal variables, independent ⇔ uncorrelated. Solve $\operatorname{cov}(X_1, X_2 - aX_1) = 2 - 4a = 0$.`, R`$\operatorname{var}(Y) = \operatorname{var}(X_2) - 2a\operatorname{cov}(X_1,X_2) + a^2\operatorname{var}(X_1)$.`, R`(b) Write $X_2 = aX_1 + Y$ with $Y\indep X_1$. Given $X_1 = 3$, only $Y$ is still random. (Or use the conditional-normal formula.)`, R`(c) $Q\sim\chi^2_2$, and $\chi^2_2$ is $\operatorname{Exp}(\beta = 2)$: $P(Q>q) = e^{-q/2}$.`],
    a: [['$a$', '1/2'], [R`$E(Y)$`, '-3/2'], [R`$\operatorname{var}(Y)$`, '2'], [R`$E(X_2\mid X_1=3)$`, '0'], [R`$\operatorname{var}(X_2\mid X_1=3)$`, '2'], ['$P(Q>4)$', 'exp(-2)']],
    s: R`**(a)** $(X_1, Y)^T = \begin{pmatrix}1&0\\-a&1\end{pmatrix}X$ is a linear map of a multivariate normal, so it is bivariate normal. Then $Y\indep X_1\iff\operatorname{cov}(X_1,Y) = 0$:
$$\operatorname{cov}(X_1, X_2 - aX_1) = \Sigma_{12} - a\Sigma_{11} = 2 - 4a = 0\ \Rightarrow\ a = \tfrac12.$$
$E(Y) = \mu_2 - \tfrac12\mu_1 = -1 - \tfrac12 = -\tfrac32$, and
$$\operatorname{var}(Y) = 3 - 2\cdot\tfrac12\cdot2 + \tfrac14\cdot4 = 3 - 2 + 1 = 2.$$
**(b)** $X_2 = \tfrac12X_1 + Y$ with $Y\indep X_1$. Given $X_1 = 3$: $X_2 = \tfrac32 + Y$ with $Y\sim N(-\tfrac32, 2)$ unchanged by the conditioning. So $X_2\mid X_1 = 3\sim N(0, 2)$:
$$E(X_2\mid X_1=3) = 0,\qquad\operatorname{var}(X_2\mid X_1=3) = 2.$$
Check with the formula: mean $\mu_2 + \frac{\Sigma_{21}}{\Sigma_{11}}(3 - \mu_1) = -1 + \tfrac24\cdot2 = 0$ ✓; variance $\Sigma_{22} - \frac{\Sigma_{21}^2}{\Sigma_{11}} = 3 - 1 = 2$ ✓.

**(c)** $Q\sim\chi^2_2$. The $\chi^2_2$ density is $\tfrac12e^{-q/2}$, i.e. $\operatorname{Exp}(\beta=2)$, so
$$P(Q>4) = e^{-4/2} = e^{-2}\approx0.135.$$
(For example, at $x = (3,0)$: $x - \mu = (2,1)^T$, $\Sigma^{-1} = \frac18\begin{pmatrix}3&-2\\-2&4\end{pmatrix}$, so $Q = \frac18(12 - 8 + 4) = 1$. The contours $Q = q$ are ellipses, and $P(Q > 4) = e^{-2}$ is the mass outside the ellipse $Q = 4$.)` },
]);
