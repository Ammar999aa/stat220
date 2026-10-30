TOPIC({ id: '3.2', ch: 3, title: 'Moments, linearity, and products', summary: 'k-th moments, the Gamma function trick, E is linear, E(XY)=E(X)E(Y) under independence.' }, [
H('Moments'),
DEF('$k$-th moment', R`The $k$-th moment of $X$ is $m_k = E(X^k)$, assuming $E|X|^k<\infty$. The first moment is the mean, and the second moment $E(X^2)$ feeds into the variance.`),
THM('Lower moments exist', R`If the $k$-th moment exists and is finite, then so does the $j$-th moment for every $j<k$.

*Proof sketch:* $E|X|^j = \int_{|x|\le1}|x|^jf(x)\dd x + \int_{|x|>1}|x|^jf(x)\dd x \le 1 + \int_{|x|>1}|x|^kf(x)\dd x \le 1 + E|X|^k<\infty$, because $|x|^j\le1$ when $|x|\le1$, and $|x|^j\le|x|^k$ when $|x|>1$.`),
P({ k: 'a', lvl: 1, q: R`$X\sim\operatorname{Unif}(0,1)$. Find $E(X^4)$.`, h: [R`$\int_0^1x^4\dd x$.`], a: '1/5',
  s: R`$E(X^4) = \frac15$. In general $E(X^k) = \frac1{k+1}$ for $\operatorname{Unif}(0,1)$.` }),
NOTE('The Gamma function: your best friend for moments', R`$$\Gamma(\alpha) = \int_0^\infty t^{\alpha-1}e^{-t}\dd t,\qquad \Gamma(\alpha+1) = \alpha\Gamma(\alpha),\quad\Gamma(n) = (n-1)!,\quad\Gamma(\tfrac12) = \sqrt\pi.$$
Any integral of the form $\int_0^\infty x^{a}e^{-x/\beta}\dd x$ equals $\beta^{a+1}\Gamma(a+1)$ (substitute $t = x/\beta$). This is equivalent to "recognize a Gamma density, which integrates to 1".`),
P({ k: 'b', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$. Find $E(X^3)$.`, h: [R`$\int_0^\infty x^3e^{-x}\dd x = \Gamma(4)$.`], a: '6',
  s: R`$E(X^3) = \int_0^\infty x^3e^{-x}\dd x = \Gamma(4) = 3! = 6$. In general $E(X^k) = k!\,\beta^k$ for $\operatorname{Exp}(\beta)$.` }),
P({ k: 'c', lvl: 3, q: R`$X\sim\operatorname{Gamma}(\alpha,\beta)$ with density $\frac{1}{\beta^\alpha\Gamma(\alpha)}x^{\alpha-1}e^{-x/\beta}$, $x>0$. Show $E(X^k) = \beta^k\frac{\Gamma(\alpha+k)}{\Gamma(\alpha)}$, and evaluate it for $\alpha = 2$, $\beta = 3$, $k = 2$.`,
  h: [R`$E(X^k) = \frac{1}{\beta^\alpha\Gamma(\alpha)}\int_0^\infty x^{\alpha+k-1}e^{-x/\beta}\dd x$, and the integral is $\beta^{\alpha+k}\Gamma(\alpha+k)$.`],
  a: '54',
  s: R`$$E(X^k) = \frac{1}{\beta^\alpha\Gamma(\alpha)}\int_0^\infty x^{\alpha+k-1}e^{-x/\beta}\dd x = \frac{\beta^{\alpha+k}\Gamma(\alpha+k)}{\beta^\alpha\Gamma(\alpha)} = \beta^k\frac{\Gamma(\alpha+k)}{\Gamma(\alpha)}.$$
With $\alpha=2,\beta=3,k=2$: $9\cdot\frac{\Gamma(4)}{\Gamma(2)} = 9\cdot\frac{6}{1} = 54$. (Check: $E(X) = \alpha\beta$, and $k=1$ gives $\beta\frac{\Gamma(\alpha+1)}{\Gamma(\alpha)} = \alpha\beta$ ✓.)` }),

H('Linearity of expectation'),
THM('Linearity', R`For any random variables $X_1,\dots,X_n$ and constants $a_1,\dots,a_n$:
$$E\left(\sum_{i=1}^n a_iX_i\right) = \sum_{i=1}^n a_iE(X_i).$$
**No independence needed.** In particular $E(aX+b) = aE(X)+b$.`),
P({ k: 'd', lvl: 1, q: R`$E(X) = 2$ and $E(Y) = 5$ ($X,Y$ possibly dependent). Find $E(3X - 2Y + 1)$.`, h: [R`Linearity.`], a: '-3',
  s: R`$3\cdot2 - 2\cdot5 + 1 = -3$.` }),
EX('Binomial mean via indicators', R`$X\sim\operatorname{Bin}(n,p)$ counts successes in $n$ trials. Write $X = \sum_{i=1}^nX_i$ where $X_i = 1$ if trial $i$ succeeds, so $X_i\sim\operatorname{Ber}(p)$. Then $E(X) = \sum E(X_i) = np$. No messy sum with binomial coefficients needed.`),
P({ k: 'e', lvl: 2, q: R`$n = 6$ people each throw their hat in a box, and the hats are handed back in a uniformly random order. Find the expected number of people who get their own hat back.`,
  h: [R`Let $I_i = 1$ if person $i$ gets their own hat. $P(I_i = 1) = \frac1n$.`],
  a: '1',
  s: R`The number of matches is $M = \sum_{i=1}^n I_i$ with $E(I_i) = \frac1n$, so $E(M) = n\cdot\frac1n = 1$ for every $n$. The $I_i$ are dependent, but linearity does not care.` }),
P({ k: 'f', lvl: 2, q: R`Random walk: $X_0 = 0$ and at each step you move $+2$ with probability $p$ or $-1$ with probability $1-p$, independently. Find $E(X_n)$ for $n = 10$, $p = \tfrac12$. For which $p$ is $E(X_n) = 0$ for all $n$?`,
  h: [R`$X_n = \sum_{i=1}^nZ_i$ with $E(Z_i) = 2p - (1-p) = 3p - 1$.`],
  a: [[R`$E(X_{10})$, $p=\tfrac12$`, '5'], ['$p$ with zero mean', '1/3']],
  s: R`$E(Z_i) = 3p-1$, so $E(X_n) = n(3p-1)$. With $n = 10$, $p = \tfrac12$: $10\cdot\tfrac12 = 5$. Zero for all $n$ iff $p = \tfrac13$.`, src: 'HW4 A1' }),

H('Products of independent variables'),
THM('Expectation of a product', R`If $X_1,\dots,X_n$ are **independent**, then
$$E\left(\prod_{i=1}^nX_i\right) = \prod_{i=1}^nE(X_i).$$
*Proof (two variables):* $E(XY) = \iint xyf_X(x)f_Y(y)\dd x\dd y = \int xf_X\dd x\int yf_Y\dd y$.`),
WARN('Independence is essential', R`Take $X\sim\operatorname{Ber}(\tfrac12)$ and $Y = X$. Then $E(XY) = E(X^2) = E(X) = \tfrac12$, but $E(X)E(Y) = \tfrac14$.`),
P({ k: 'g', lvl: 1, q: R`$X\indep Y$ with $X\sim\operatorname{Unif}(0,1)$ and $Y\sim\operatorname{Exp}(\beta=2)$. Find $E(X^2Y)$.`, h: [R`$X^2$ and $Y$ are independent.`], a: '2/3',
  s: R`$E(X^2Y) = E(X^2)E(Y) = \tfrac13\cdot2 = \tfrac23$.` }),
P({ k: 'h', lvl: 2, q: R`$f(x,y) = x+y$ on $[0,1]^2$. You know $E(XY) = \tfrac13$. Find $E(X)$ and check whether $E(XY) = E(X)E(Y)$.`,
  h: [R`$f_X(x) = x+\tfrac12$.`],
  a: [['$E(X)$', '7/12']],
  s: R`$E(X) = \int_0^1x\left(x+\tfrac12\right)\dd x = \tfrac13 + \tfrac14 = \tfrac7{12}$, and $E(Y) = \tfrac7{12}$ by symmetry. $E(X)E(Y) = \tfrac{49}{144}\ne\tfrac{48}{144} = \tfrac13$, consistent with $X,Y$ being dependent.` }),
P({ k: 'i', lvl: 3, q: R`$X\sim\operatorname{Beta}(\alpha,\beta)$. Using $\int_0^1x^{a-1}(1-x)^{b-1}\dd x = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$, show $E(X) = \frac{\alpha}{\alpha+\beta}$. Evaluate for $\alpha = 2$, $\beta = 3$.`,
  h: [R`$E(X) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\int_0^1x^{\alpha}(1-x)^{\beta-1}\dd x$.`, R`Use $\Gamma(\alpha+1) = \alpha\Gamma(\alpha)$.`],
  a: '2/5',
  s: R`$$E(X) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\cdot\frac{\Gamma(\alpha+1)\Gamma(\beta)}{\Gamma(\alpha+\beta+1)} = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha+\beta+1)}\cdot\frac{\Gamma(\alpha+1)}{\Gamma(\alpha)} = \frac{\alpha}{\alpha+\beta}.$$
For $\operatorname{Beta}(2,3)$: $\frac25$.`, src: 'HW4 C3' }),
]);

DRILLS('3.2', [
  { k: '01', lvl: 1, q: R`$X\sim\operatorname{Unif}(-1,1)$. Find $E(X^2)$.`, h: [R`$\int_{-1}^1x^2\cdot\tfrac12\dd x$.`], a: '1/3', s: R`$\tfrac12\cdot\tfrac23 = \tfrac13$.` },
  { k: '02', lvl: 3, q: R`$X\sim N(0,1)$. Find $E(X^4)$.`, h: [R`$E(X^4) = 2\int_0^\infty x^4\frac{e^{-x^2/2}}{\sqrt{2\pi}}\dd x$. Substitute $u = x^2/2$.`, R`You get $\frac{4}{\sqrt\pi}\Gamma(5/2)$, and $\Gamma(5/2) = \tfrac32\cdot\tfrac12\sqrt\pi$.`], a: '3',
    s: R`With $u = x^2/2$, $x = \sqrt{2u}$, $\dd x = \frac{\dd u}{\sqrt{2u}}$: $E(X^4) = \frac{2}{\sqrt{2\pi}}\int_0^\infty 4u^2e^{-u}\frac{\dd u}{\sqrt{2u}} = \frac{4}{\sqrt\pi}\Gamma(\tfrac52) = \frac4{\sqrt\pi}\cdot\frac34\sqrt\pi = 3$.` },
  { k: '03', lvl: 1, q: R`$E(X) = 1$, $E(Y) = -2$, $E(Z) = 4$. Find $E(2X + 3Y - Z + 5)$.`, h: [R`Linearity.`], a: '-3', s: R`$2 - 6 - 4 + 5 = -3$.` },
  { k: '04', lvl: 1, q: R`A fair die is rolled 12 times. Expected number of sixes?`, h: [R`$\operatorname{Bin}(12,\tfrac16)$.`], a: '2', s: R`$np = 12\cdot\tfrac16 = 2$.` },
  { k: '05', lvl: 2, q: R`3 balls are thrown independently and uniformly into 3 boxes. Expected number of empty boxes?`, h: [R`Box $j$ is empty with probability $(2/3)^3$.`], a: '8/9',
    s: R`Let $I_j$ indicate box $j$ is empty: $E(I_j) = (\tfrac23)^3 = \tfrac8{27}$. By linearity $E(\#\text{empty}) = 3\cdot\tfrac8{27} = \tfrac89$.` },
  { k: '06', lvl: 1, q: R`$X\sim\operatorname{Poisson}(2)$ and $Y\sim\operatorname{Unif}(0,4)$ independent. Find $E(XY)$.`, h: [R`Independence.`], a: '4', s: R`$E(X)E(Y) = 2\cdot2 = 4$.` },
  { k: '07', lvl: 2, q: R`$X\sim\operatorname{Exp}(\beta = 2)$. Find $E(X^2)$.`, h: [R`$E(X^k) = k!\beta^k$.`], a: '8', s: R`$2!\cdot2^2 = 8$.` },
  { k: '08', lvl: 2, q: R`$X\sim\operatorname{Gamma}(3,2)$ (scale $\beta=2$). Find $E(X)$ and $E(X^2)$.`, h: [R`$E(X^k) = \beta^k\Gamma(\alpha+k)/\Gamma(\alpha)$.`],
    a: [['$E(X)$', '6'], ['$E(X^2)$', '48']], s: R`$E(X) = 2\cdot3 = 6$. $E(X^2) = 4\cdot\frac{\Gamma(5)}{\Gamma(3)} = 4\cdot\frac{24}{2} = 48$.` },
  { k: '09', lvl: 2, q: R`$X\sim\operatorname{Beta}(3,1)$, density $3x^2$ on $(0,1)$. Find $E(X)$ and $E(X^2)$.`, h: [R`Direct integration.`],
    a: [['$E(X)$', '3/4'], ['$E(X^2)$', '3/5']], s: R`$\int_0^13x^3\dd x = \tfrac34$, $\int_0^13x^4\dd x = \tfrac35$.` },
  { k: '10', lvl: 2, q: R`$X,Y\iid\operatorname{Unif}(0,1)$. Find $E[(X+Y)^2]$.`, h: [R`Expand: $E(X^2) + 2E(XY) + E(Y^2)$.`], a: '7/6',
    s: R`$\tfrac13 + 2\cdot\tfrac12\cdot\tfrac12 + \tfrac13 = \tfrac76$.` },
  { k: '11', lvl: 3, q: R`Random walk with steps $+2$ (prob $\tfrac13$) or $-1$ (prob $\tfrac23$), $X_0 = 0$. Find $E(X_5^2)$.`, h: [R`$E(X_n) = 0$, so $E(X_n^2) = \operatorname{var}(X_n) = n\operatorname{var}(Z_1)$.`, R`$E(Z_1^2) = 4\cdot\tfrac13 + 1\cdot\tfrac23 = 2$.`], a: '10',
    s: R`$E(Z_i) = 0$ and $E(Z_i^2) = 2$, so $\operatorname{var}(Z_i) = 2$. Steps are independent, so $\operatorname{var}(X_n) = 2n$, and $E(X_n^2) = 2n + 0 = 10$ for $n = 5$.`, src: 'HW4 A1(c)' },
  { k: '12', lvl: 1, q: R`If $E|X|^3<\infty$, must $E(X^2)$ be finite?`, h: [R`Theorem on lower moments.`], a: { choice: ['Yes', 'No', 'Not necessarily'], v: 0 },
    s: R`Yes: a finite $k$-th moment implies all lower moments are finite.` },
  { k: '13', lvl: 3, q: R`$X\sim\operatorname{Bin}(5, 0.4)$. Find $E[X(X-1)]$.`, h: [R`$E[X(X-1)] = \sum_x x(x-1)\binom nx p^x(1-p)^{n-x} = n(n-1)p^2$.`], a: '3.2',
    s: R`Pull out $n(n-1)p^2$ and the rest is a $\operatorname{Bin}(n-2,p)$ PMF summing to 1: $E[X(X-1)] = n(n-1)p^2 = 20\cdot0.16 = 3.2$.` },
  { k: '14', lvl: 3, q: R`A coin with $P(\text{H}) = p$ is tossed $10$ times. A **run** is a maximal block of equal consecutive outcomes (e.g. HHTHTT has 4 runs: HH, T, H, TT). Find the expected number of runs for $p = 0.3$, and for a fair coin.`,
    h: [R`Count where runs **start**. Toss 1 always starts a run. Toss $i\ge2$ starts a new run exactly when it differs from toss $i-1$.`, R`So $R = 1 + \sum_{i=2}^{10}I_i$ with $I_i = \mathbb 1\{\text{toss } i\ne\text{toss } i-1\}$, and $P(I_i = 1) = P(\text{HT or TH})$.`, R`The $I_i$ are dependent ($I_2$ and $I_3$ share toss 2). Does linearity care?`],
    a: [[R`$p = 0.3$`, '4.78'], ['fair coin', '5.5']],
    s: R`Write $R = 1 + \sum_{i=2}^{10}I_i$, where $I_i = 1$ if toss $i$ differs from toss $i-1$. Then $E(I_i) = P(\text{HT}) + P(\text{TH}) = 2p(1-p)$. By linearity (no independence needed, which is good, because neighbouring $I_i$ are dependent):
$$E(R) = 1 + 9\cdot2p(1-p).$$
For $p = 0.3$: $1 + 9\cdot0.42 = 4.78$. For $p = \tfrac12$: $1 + \tfrac92 = 5.5$.

Common traps: forgetting the $+1$ for the first run, or using 10 indicators instead of 9 (there are only 9 adjacent pairs).` },
  { k: '15', lvl: 4, q: R`(Exam style.) $X\sim\operatorname{Exp}(\beta = 2)$ and $Y\sim\operatorname{Gamma}(3,1)$ (shape 3, scale 1, density $\tfrac12y^2e^{-y}$, $y>0$) are independent, and $R = X/Y$.
(a) Show that $E(Y^k) = \frac{\Gamma(3+k)}{\Gamma(3)}$ for every real $k>-3$, and that $E(Y^k) = \infty$ for $k\le-3$.
(b) Find $E(1/Y)$, $E(R)$, $E(R^2)$ and $\operatorname{var}(R)$.
(c) Is $E(Y^{-3})$ finite?`,
    h: [R`$E(Y^k) = \frac{1}{2}\int_0^\infty y^{k+2}e^{-y}\dd y$. Near $y = 0$, $e^{-y}\approx1$, so it converges iff $k+2>-1$. When it converges it is a Gamma integral.`, R`$X$ and $1/Y$ are functions of independent variables, so they are independent: $E(X/Y) = E(X)E(1/Y)$ and $E(X^2/Y^2) = E(X^2)E(Y^{-2})$.`, R`$E(X^2) = 2\beta^2 = 8$. Trap: $E(X/Y)$ is **not** $E(X)/E(Y)$.`],
    a: [['$E(1/Y)$', '1/2'], ['$E(R)$', '1'], ['$E(R^2)$', '4'], [R`$\operatorname{var}(R)$`, '3'], [R`$E(Y^{-3})$ finite?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** By LOTUS, $E(Y^k) = \frac{1}{\Gamma(3)}\int_0^\infty y^{k+2}e^{-y}\dd y$. The integrand is fine at $\infty$ (the exponential wins). Near $0$ it behaves like $y^{k+2}$, which is integrable iff $k+2>-1$, i.e. $k>-3$. Then the integral is $\Gamma(k+3)$, so $E(Y^k) = \frac{\Gamma(3+k)}{\Gamma(3)} = \frac{\Gamma(3+k)}2$. For $k\le-3$ the integral diverges at 0.

**(b)** $E(1/Y) = \frac{\Gamma(2)}{2} = \frac12$ and $E(Y^{-2}) = \frac{\Gamma(1)}{2} = \frac12$.
By independence of $X$ and $Y$ (hence of $X$ and $1/Y$):
$$E(R) = E(X)\,E(1/Y) = 2\cdot\tfrac12 = 1,\qquad E(R^2) = E(X^2)\,E(Y^{-2}) = 8\cdot\tfrac12 = 4,$$
so $\operatorname{var}(R) = 4 - 1 = 3$.

Note $E(R) = 1\ne\frac{E(X)}{E(Y)} = \frac23$: in general $E(1/Y)\ne1/E(Y)$ (here $\tfrac12>\tfrac13$).

**(c)** No: $k = -3$ is exactly the boundary, $E(Y^{-3}) = \frac12\int_0^\infty y^{-1}e^{-y}\dd y = \infty$. So $E(R^3) = \infty$ too. Negative moments can fail to exist even when all positive moments are finite.` },
]);
