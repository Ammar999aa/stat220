TOPIC({ id: '3.5', ch: 3, title: 'Covariance and correlation', summary: 'cov = E(XY) − E(X)E(Y), correlation in [−1,1], variance of sums, uncorrelated ≠ independent.' }, [
R`Covariance measures whether two variables **move together**. If $X$ above its mean tends to come with $Y$ above its mean, the products $(X-\mu_X)(Y-\mu_Y)$ are mostly positive, and the covariance is positive. If one goes up when the other goes down, it's negative.`,
DEF('Covariance and correlation', R`$$\operatorname{cov}(X,Y) = E\big[(X-\mu_X)(Y-\mu_Y)\big],\qquad \operatorname{corr}(X,Y) = \rho_{X,Y} = \frac{\operatorname{cov}(X,Y)}{\sigma_X\sigma_Y}.$$
Correlation is covariance rescaled to be unit-free, always in $[-1,1]$.`),
THM('Properties', R`<ol><li>$\operatorname{var}(X) = \operatorname{cov}(X,X)$.</li><li>$\operatorname{cov}(X,Y) = E(XY) - E(X)E(Y)$. This is the formula you compute with.</li><li>$-1\le\operatorname{corr}(X,Y)\le1$ (proof via Cauchy–Schwarz, Ch.4).</li><li>$\operatorname{var}\left(\sum_ia_iX_i\right) = \sum_ia_i^2\operatorname{var}(X_i) + 2\sum_{i<j}a_ia_j\operatorname{cov}(X_i,X_j)$.</li><li>If $X\indep Y$ then $\operatorname{cov}(X,Y) = \operatorname{corr}(X,Y) = 0$. <b>The converse is false!</b></li></ol>
Covariance is also <b>bilinear</b>: $\operatorname{cov}(aX + bY, Z) = a\operatorname{cov}(X,Z) + b\operatorname{cov}(Y,Z)$, and constants don't matter: $\operatorname{cov}(X + c, Y) = \operatorname{cov}(X,Y)$.`),
P({ k: 'a', lvl: 1, q: R`$E(XY) = 5$, $E(X) = 2$, $E(Y) = 2$. Find $\operatorname{cov}(X,Y)$.`, h: [R`Property 2.`], a: '1', s: R`$5 - 4 = 1$.` }),
P({ k: 'b', lvl: 1, q: R`$\operatorname{var}(X) = 2$, $\operatorname{var}(Y) = 3$, $\operatorname{cov}(X,Y) = -1$. Find $\operatorname{var}(X+Y)$ and $\operatorname{var}(X-Y)$.`, h: [R`$\operatorname{var}(X\pm Y) = \operatorname{var}X+\operatorname{var}Y\pm2\operatorname{cov}$.`],
  a: [[R`$\operatorname{var}(X+Y)$`, '3'], [R`$\operatorname{var}(X-Y)$`, '7']],
  s: R`$\operatorname{var}(X+Y) = 2+3-2 = 3$; $\operatorname{var}(X-Y) = 2 + 3 + 2 = 7$.` }),
H('A full exam-style computation'),
P({ k: 'c', lvl: 3, q: R`$f(x,y) = 2(x+y)$ on $0<y<x<1$. Find $E(X)$, $E(Y)$, $E(XY)$ and $\operatorname{cov}(X,Y)$.`,
  h: [R`Marginals: $f_X(x) = \int_0^x2(x+y)\dd y = 3x^2$, $f_Y(y) = \int_y^12(x+y)\dd x = 1+2y-3y^2$.`, R`$E(XY) = \int_0^1\int_0^x 2xy(x+y)\dd y\dd x = \int_0^1 2x\left(\tfrac{x^3}{2}+\tfrac{x^3}{3}\right)\dd x$.`],
  a: [['$E(X)$', '3/4'], ['$E(Y)$', '5/12'], ['$E(XY)$', '1/3'], [R`$\operatorname{cov}(X,Y)$`, '1/48']],
  s: R`$E(X) = \int_0^1 3x^3\dd x = \tfrac34$. $E(Y) = \int_0^1y(1+2y-3y^2)\dd y = \tfrac12 + \tfrac23 - \tfrac34 = \tfrac5{12}$.

$E(XY) = \int_0^1 2x\cdot\tfrac56x^3\dd x = \tfrac53\cdot\tfrac15 = \tfrac13$.

$\operatorname{cov}(X,Y) = \tfrac13 - \tfrac34\cdot\tfrac5{12} = \tfrac{16}{48} - \tfrac{15}{48} = \tfrac1{48}$.`, src: 'HW4 B2(b),(c)' }),
P({ k: 'd', lvl: 3, q: R`Same density. Find $\operatorname{var}(X)$, $\operatorname{var}(Y)$ and $\operatorname{var}(2X - Y)$.`,
  h: [R`$E(X^2) = \tfrac35$, $E(Y^2) = \int_0^1y^2(1+2y-3y^2)\dd y = \tfrac7{30}$.`, R`$\operatorname{var}(2X-Y) = 4\operatorname{var}X + \operatorname{var}Y - 4\operatorname{cov}(X,Y)$.`],
  a: [[R`$\operatorname{var}(X)$`, '3/80'], [R`$\operatorname{var}(Y)$`, '43/720'], [R`$\operatorname{var}(2X-Y)$`, '91/720']],
  s: R`$\operatorname{var}(X) = \tfrac35 - \tfrac9{16} = \tfrac3{80}$. $\operatorname{var}(Y) = \tfrac7{30} - \tfrac{25}{144} = \tfrac{43}{720}$.
$$\operatorname{var}(2X-Y) = 4\cdot\tfrac3{80} + \tfrac{43}{720} - 4\cdot\tfrac1{48} = \tfrac{108 + 43 - 60}{720} = \tfrac{91}{720}.$$`, src: 'HW4 B2(d)' }),
H('Uncorrelated does not mean independent'),
EX('The parabola', R`$X\sim\operatorname{Unif}(-1,1)$ and $Y = X^2$. $Y$ is a *function* of $X$, so they are as dependent as can be. Yet
$$\operatorname{cov}(X,Y) = E(X^3) - E(X)E(X^2) = 0 - 0 = 0.$$
Covariance only detects **linear** association; the parabola is symmetric, so the positive and negative trends cancel.`),
P({ k: 'e', lvl: 3, q: R`$X$ has $E(X) = 0$, $E(X^2) = 1$, $E(X^3) = 0$, $E(X^4) = 3$ (e.g. $N(0,1)$), and $Y = X^2 - 1$. (a) Find $\operatorname{cov}(X,Y)$. (b) Explain why $X,Y$ are not independent. (c) Find $\operatorname{var}(aX+bY)$; enter it for $a = b = 1$.`,
  h: [R`$\operatorname{cov}(X,Y) = E(X^3 - X) - E(X)E(Y)$.`, R`$\operatorname{var}(Y) = 2$ (since $E(Y^2) = E(X^4) - 2E(X^2) + 1$).`],
  a: [[R`$\operatorname{cov}(X,Y)$`, '0'], [R`$\operatorname{var}(X+Y)$`, '3']],
  s: R`(a) $E(Y) = 0$, $\operatorname{cov}(X,Y) = E(X^3) - E(X) - 0 = 0$.

(b) $Y$ is a deterministic, non-constant function of $X$. For instance $P(Y>3)>0$, yet $P(Y>3\mid |X|<1) = 0$. So knowing $X$ changes $Y$'s distribution: dependent, though uncorrelated.

(c) $\operatorname{var}(aX+bY) = a^2\cdot1 + b^2\cdot2 + 2ab\cdot0 = a^2+2b^2$; with $a=b=1$: $3$.`, src: 'HW4 B3' }),
H('Correlation measures linear relationships'),
P({ k: 'f', lvl: 1, q: R`Find $\operatorname{corr}(X, -2X + 3)$ (assume $\operatorname{var}(X)>0$).`, h: [R`$\operatorname{cov}(X,-2X+3) = -2\operatorname{var}(X)$, $\operatorname{sd}(-2X+3) = 2\operatorname{sd}(X)$.`], a: '-1',
  s: R`$\frac{-2\sigma^2}{\sigma\cdot2\sigma} = -1$. A perfect decreasing linear relationship has correlation $-1$.` }),
P({ k: 'g', lvl: 2, q: R`$\operatorname{cov}(X,Y) = 2$, $\operatorname{var}(X) = 4$, $\operatorname{var}(Y) = 9$. Find $\operatorname{corr}(X,Y)$.`, h: [R`$2/(2\cdot3)$.`], a: '1/3', s: R`$\frac{2}{\sqrt4\sqrt9} = \frac13$.` }),
P({ k: 'h', lvl: 2, q: R`$X, Y$ iid with variance $\sigma^2$. Find $\operatorname{cov}(X+Y, X-Y)$ and $\operatorname{corr}(X, X+Y)$.`, h: [R`Bilinearity: $\operatorname{cov}(X+Y,X-Y) = \operatorname{var}X - \operatorname{var}Y$.`, R`$\operatorname{cov}(X,X+Y) = \sigma^2$, $\operatorname{sd}(X+Y) = \sqrt2\sigma$.`],
  a: [[R`$\operatorname{cov}(X+Y,X-Y)$`, '0'], [R`$\operatorname{corr}(X,X+Y)$`, '1/sqrt(2)']],
  s: R`$\operatorname{cov}(X+Y,X-Y) = \sigma^2 - \operatorname{cov}(X,Y) + \operatorname{cov}(Y,X) - \sigma^2 = 0$. And $\operatorname{corr}(X,X+Y) = \frac{\sigma^2}{\sigma\cdot\sqrt2\sigma} = \frac1{\sqrt2}\approx0.707$.` }),
]);

DRILLS('3.5', [
  { k: '01', lvl: 1, q: R`$E(XY) = 3$, $E(X) = 1$, $E(Y) = 2$. Find $\operatorname{cov}(X,Y)$.`, h: [R`$E(XY) - E(X)E(Y)$.`], a: '1', s: R`$3 - 2 = 1$.` },
  { k: '02', lvl: 1, q: R`$\operatorname{var}(X) = 4$, $\operatorname{var}(Y) = 1$, $\operatorname{cov}(X,Y) = 1.5$. Find $\operatorname{var}(X-Y)$.`, h: [R`$4 + 1 - 2(1.5)$.`], a: '2', s: R`$4 + 1 - 3 = 2$.` },
  { k: '03', lvl: 2, q: R`$f(x,y) = 2$ on $0<y<x<1$. Find $\operatorname{cov}(X,Y)$.`, h: [R`$E(XY) = \int_0^1\int_0^x2xy\dd y\dd x = \int_0^1x^3\dd x$. $E(X) = \tfrac23$, $E(Y) = \tfrac13$.`], a: '1/36',
    s: R`$E(XY) = \tfrac14$, so $\operatorname{cov} = \tfrac14 - \tfrac29 = \tfrac{9-8}{36} = \tfrac1{36}$.` },
  { k: '04', lvl: 3, q: R`Same density ($2$ on $0<y<x<1$). Find $\operatorname{corr}(X,Y)$.`, h: [R`$\operatorname{var}(X) = \tfrac12-\tfrac49$, $E(Y^2) = \int_0^12y^2(1-y)\dd y = \tfrac16$.`], a: '1/2',
    s: R`$\operatorname{var}(X) = \tfrac1{18}$, $\operatorname{var}(Y) = \tfrac16 - \tfrac19 = \tfrac1{18}$. $\operatorname{corr} = \frac{1/36}{1/18} = \frac12$.` },
  { k: '05', lvl: 2, q: R`Joint PMF: $f(0,0) = 0.1$, $f(0,1) = 0.3$, $f(1,0) = 0.2$, $f(1,1) = 0.4$. Find $\operatorname{cov}(X,Y)$.`, h: [R`$E(XY) = f(1,1)$.`], a: '-0.02',
    s: R`$E(XY) = 0.4$, $E(X) = 0.6$, $E(Y) = 0.7$. $\operatorname{cov} = 0.4 - 0.42 = -0.02$.` },
  { k: '06', lvl: 1, q: R`$\operatorname{cov}(X,Y) = 0.5$. Find $\operatorname{cov}(2X+1, 3Y-4)$.`, h: [R`Bilinearity, constants drop.`], a: '3', s: R`$2\cdot3\cdot0.5 = 3$.` },
  { k: '07', lvl: 2, q: R`$X\sim\operatorname{Unif}(-1,1)$, $Y = X^2$. Find $\operatorname{cov}(X,Y)$. Are they independent?`, h: [R`$E(X^3) = 0$ by symmetry.`],
    a: [[R`$\operatorname{cov}(X,Y)$`, '0'], ['Independent?', { choice: ['Yes', 'No'], v: 1 }]], s: R`$\operatorname{cov} = E(X^3) - E(X)E(X^2) = 0$, but $Y$ is a function of $X$: dependent.` },
  { k: '08', lvl: 2, q: R`$X, Y$ iid with variance 1. Find $\operatorname{cov}(X+Y, X+2Y)$.`, h: [R`Expand by bilinearity.`], a: '3', s: R`$\operatorname{var}X + 2\operatorname{cov}(X,Y) + \operatorname{cov}(Y,X) + 2\operatorname{var}Y = 1 + 0 + 0 + 2 = 3$.` },
  { k: '09', lvl: 2, q: R`$\operatorname{var}(X) = \operatorname{var}(Y)$. Find $\operatorname{corr}(X+Y, X-Y)$ (assume both sums have positive variance).`, h: [R`Covariance is $\operatorname{var}X - \operatorname{var}Y$.`], a: '0', s: R`$\operatorname{cov}(X+Y,X-Y) = \operatorname{var}X - \operatorname{var}Y = 0$, so the correlation is 0.` },
  { k: '10', lvl: 1, q: R`$X\sim\operatorname{Bin}(n,p)$ and $Y = n - X$ (number of failures). Find $\operatorname{corr}(X,Y)$.`, h: [R`$Y$ is a decreasing linear function of $X$.`], a: '-1', s: R`$Y = -X + n$, so $\operatorname{corr} = -1$.` },
  { k: '11', lvl: 2, q: R`$X_1,X_2,X_3$ each have variance 1 and every pair has covariance 0.5. Find $\operatorname{var}(X_1+X_2+X_3)$.`, h: [R`$\sum\operatorname{var} + 2\sum_{i<j}\operatorname{cov}$.`], a: '6', s: R`$3 + 2\cdot3\cdot0.5 = 6$.` },
  { k: '12', lvl: 1, q: R`With $\operatorname{var}(X) = 1$, $\operatorname{var}(Y) = 2$, $\operatorname{cov}(X,Y) = 0$, find $\operatorname{var}(2X + 3Y)$.`, h: [R`$a^2 + 2b^2$.`], a: '22', s: R`$4\cdot1 + 9\cdot2 = 22$.`, src: 'HW4 B3(d)' },
  { k: '13', lvl: 3, q: R`$X, Y$ have mean 0, variance 1 and correlation $\rho = 0.6$. Find $\operatorname{var}(Y - \rho X)$ and $\operatorname{cov}(X, Y - \rho X)$.`, h: [R`$\operatorname{var}(Y) + \rho^2\operatorname{var}(X) - 2\rho\operatorname{cov}(X,Y)$.`],
    a: [['variance', '0.64'], ['covariance', '0']], s: R`$1 + 0.36 - 2\cdot0.6\cdot0.6 = 0.64 = 1-\rho^2$. $\operatorname{cov}(X,Y-\rho X) = \rho - \rho = 0$: the residual after removing the linear part of $X$ is uncorrelated with $X$.` },
]);
