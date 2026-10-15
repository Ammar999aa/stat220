TOPIC({ id: '2.9', ch: 2, title: 'Transformations of one random variable', summary: 'Y = t(X): CDF method, the monotone formula, the 3-step method for non-monotone t.' }, [
R`A very common exam task: "$X$ has this distribution, and $Y = t(X)$. Find the PDF of $Y$." For example $Y = X^2$, $Y = e^X$, $Y = 1/X$, or $Y = -\log X$.

There is **one method that always works**: compute the CDF of $Y$ by turning the event $\{Y\le y\}$ into an event about $X$, and then differentiate. Everything else on this page is a shortcut for special cases.`,
H('Discrete case'),
R`If $X$ is discrete, just collect all the $x$'s that map to the same $y$:
$$f_Y(y) = P(Y = y) = P(t(X) = y) = \sum_{x:\ t(x) = y} f_X(x).$$`,
P({ k: 'a', lvl: 1,
  q: R`$X$ is uniform on $\{-1, 0, 1\}$ and $Y = X^2$. Find $P(Y = 1)$.`,
  h: [R`Which values of $X$ give $X^2 = 1$?`],
  a: '2/3',
  s: R`$P(Y=1) = P(X=-1) + P(X=1) = \tfrac13+\tfrac13 = \tfrac23$ (and $P(Y=0) = \tfrac13$).` }),

H('The CDF method (always works)'),
THM('CDF method', R`To find the density of $Y = t(X)$ for continuous $X$:
<ol><li>Write $F_Y(y) = P(Y\le y) = P(t(X)\le y)$.</li><li>Rewrite $\{t(X)\le y\}$ as an event about $X$ alone (solve the inequality!) and compute its probability using $F_X$ or $f_X$.</li><li>Differentiate: $f_Y(y) = F_Y'(y)$. State the support of $Y$.</li></ol>`),
EX(R`$Y = 1 - X$ with $X\sim\operatorname{Unif}(0,1)$`, R`For $0<y<1$: $F_Y(y) = P(1 - X\le y) = P(X\ge 1-y) = 1 - (1-y) = y$. So $Y\sim\operatorname{Unif}(0,1)$ too. Note how the inequality **flipped** when we solved for $X$ (we multiplied by $-1$).`),
P({ k: 'b', lvl: 1,
  q: R`$X\sim\operatorname{Unif}(0,1)$ and $Y = 2X + 3$. Find $f_Y(y)$ on its support $(3,5)$.`,
  h: [R`$F_Y(y) = P(2X+3\le y) = P(X\le \frac{y-3}{2}) = \frac{y-3}2$.`],
  a: [['$f_Y(y)$', '1/2', { y: [3, 5] }]],
  s: R`For $3<y<5$: $F_Y(y) = P\left(X\le\frac{y-3}{2}\right) = \frac{y-3}{2}$, so $f_Y(y) = \frac12$. $Y\sim\operatorname{Unif}(3,5)$: a linear map stretches and shifts a uniform.` }),
EX(R`$Y = e^X$ with $X\sim\operatorname{Exp}(\beta)$`, R`$X>0$ so $Y>1$. For $y>1$:
$$F_Y(y) = P(e^X\le y) = P(X\le\log y) = 1 - e^{-\log(y)/\beta} = 1 - y^{-1/\beta},$$
$$f_Y(y) = \tfrac1\beta\,y^{-1/\beta - 1},\quad y > 1.$$
This is a **Pareto** distribution (slides, Ch.2).`),
P({ k: 'c', lvl: 2,
  q: R`$X\sim\operatorname{Exp}(1)$ and $Y = X^2$. Find $F_Y(y)$ and $f_Y(y)$ for $y > 0$.`,
  h: [R`$X>0$, so $X^2\le y\iff X\le\sqrt y$.`, R`$\frac{d}{dy}e^{-\sqrt y} = -\frac{1}{2\sqrt y}e^{-\sqrt y}$.`],
  a: [['$F_Y(y)$', '1-exp(-sqrt(y))', { y: [0.1, 5] }], ['$f_Y(y)$', 'exp(-sqrt(y))/(2*sqrt(y))', { y: [0.1, 5] }]],
  s: R`Since $X>0$: $F_Y(y) = P(X\le\sqrt y) = 1 - e^{-\sqrt y}$ for $y>0$. Differentiating,
$$f_Y(y) = \frac{e^{-\sqrt y}}{2\sqrt y},\quad y>0.$$` }),

H('Shortcut: monotone transformations'),
THM('Change of variables, monotone case', R`If $t$ is strictly increasing or strictly decreasing on the support of $X$, with inverse $s = t^{-1}$ (so $x = s(y)$), then
$$f_Y(y) = f_X\big(s(y)\big)\,\left|\frac{\mathrm d s(y)}{\mathrm dy}\right|.$$`),
R`**Where it comes from.** If $t$ is increasing, $F_Y(y) = P(X\le s(y)) = F_X(s(y))$. Differentiate with the chain rule to get $f_X(s(y))\,s'(y)$.

If $t$ is decreasing, $F_Y(y) = P(X\ge s(y)) = 1 - F_X(s(y))$, whose derivative is $-f_X(s(y))s'(y)$. Here $s'<0$, so this equals $f_X(s(y))\,|s'(y)|$. The absolute value covers both cases.`,
P({ k: 'd', lvl: 2,
  q: R`$X\sim\operatorname{Unif}(0,1)$ and $Y = -\log X$. Find $f_Y(y)$ for $y>0$ using the monotone formula. What distribution is this?`,
  h: [R`Inverse: $y = -\log x \iff x = s(y) = e^{-y}$.`, R`$|s'(y)| = e^{-y}$, and $f_X = 1$ on $(0,1)$.`],
  a: [['$f_Y(y)$', 'exp(-y)', { y: [0, 5] }]],
  s: R`$t(x) = -\log x$ is decreasing on $(0,1)$ with inverse $s(y) = e^{-y}$, $|s'(y)| = e^{-y}$. As $x$ runs over $(0,1)$, $y$ runs over $(0,\infty)$. So
$$f_Y(y) = f_X(e^{-y})\,e^{-y} = 1\cdot e^{-y},\quad y>0,$$
i.e. $Y\sim\operatorname{Exp}(1)$.` }),
P({ k: 'e', lvl: 2,
  q: R`$X\sim N(0,1)$ and $Y = 1 + 2X$. Find $f_Y(y)$.`,
  h: [R`$s(y) = \frac{y-1}{2}$, $|s'(y)| = \frac12$.`],
  a: [['$f_Y(y)$', '1/(2*sqrt(2*pi))*exp(-(y-1)^2/8)', { y: [-3, 5] }]],
  s: R`$f_Y(y) = \frac{1}{\sqrt{2\pi}}e^{-\frac12\left(\frac{y-1}{2}\right)^2}\cdot\frac12 = \frac{1}{2\sqrt{2\pi}}\exp\left(-\frac{(y-1)^2}{8}\right)$. This is $N(1, 4)$, consistent with the slide property "$X = \mu+\sigma Z\sim N(\mu,\sigma^2)$".` }),
P({ k: 'f', lvl: 3,
  q: R`(Probability integral transform.) $X$ has a continuous, strictly increasing CDF $F$. Show that $Y = F(X)\sim\operatorname{Unif}(0,1)$. Then: if $U\sim\operatorname{Unif}(0,1)$ and $\beta = 2$, the value $X = -\beta\log(1-U)$ is an $\operatorname{Exp}(2)$ draw. Compute $X$ when $U = 0.5$.`,
  h: [R`For $0<y<1$: $P(F(X)\le y) = P(X\le F^{-1}(y))$.`, R`For the second part just plug in: $-2\log(0.5)$.`],
  a: '2*log(2)',
  s: R`For $y\in(0,1)$: $F_Y(y) = P(F(X)\le y) = P(X\le F^{-1}(y)) = F(F^{-1}(y)) = y$, which is the $\operatorname{Unif}(0,1)$ CDF.

Conversely, $X = F^{-1}(U)$ has CDF $F$: $P(F^{-1}(U)\le x) = P(U\le F(x)) = F(x)$. For $\operatorname{Exp}(\beta)$, $F^{-1}(q) = -\beta\log(1-q)$. With $U=0.5$: $X = -2\log 0.5 = 2\log 2 \approx 1.386$, the median of $\operatorname{Exp}(2)$.`,
  src: 'HW2 C1 (Wasserman 2.14.15)' }),

H('Non-monotone transformations: the 3-step method'),
R`When $t$ is not monotone (e.g. $Y = X^2$ on an interval that contains negative numbers), the formula above does not apply. Go back to the CDF method and be careful about **which set of $x$'s** gives $t(x)\le y$.`,
THM('3 steps', R`<ol><li>For each $y$, find $A_y = \{x : t(x)\le y\}$.</li><li>$F_Y(y) = P(X\in A_y) = \int_{A_y} f_X(x)\dd x$.</li><li>$f_Y(y) = F_Y'(y)$.</li></ol>`),
EX(R`$Y = X^2$ with $X\sim\operatorname{Unif}(-1,3)$`, R`$f_X = \tfrac14$ on $(-1,3)$, so $Y\in[0,9)$.

- If $0\le y\le1$: $A_y = [-\sqrt y,\sqrt y]$, which lies inside $(-1,3)$. So $F_Y(y) = \tfrac14\cdot2\sqrt y = \tfrac12\sqrt y$.
- If $1<y<9$: $A_y = [-\sqrt y, \sqrt y]\cap(-1,3) = (-1,\sqrt y]$. So $F_Y(y) = \tfrac14(\sqrt y + 1)$.

Differentiating: $f_Y(y) = \dfrac{1}{4\sqrt y}$ on $(0,1)$ and $\dfrac1{8\sqrt y}$ on $(1,9)$. The density is larger near 0 because two $x$-values ($\pm\sqrt{y}$) land on each $y\in(0,1)$.`),
P({ k: 'g', lvl: 2,
  q: R`Continuing the example ($X\sim\operatorname{Unif}(-1,3)$, $Y=X^2$), find $P(Y\le 4)$.`,
  h: [R`$F_Y(4) = \tfrac14(\sqrt4 + 1)$. Or directly: $P(-2\le X\le 2)$.`],
  a: '3/4',
  s: R`$P(Y\le4) = P(-2\le X\le2) = P(-1< X\le 2) = \tfrac34$. This matches $F_Y(4) = \tfrac14(2+1)$.` }),
P({ k: 'h', lvl: 3,
  q: R`$X\sim N(0,1)$ and $Y = X^2$. Find $f_Y(y)$ for $y>0$.`,
  h: [R`$F_Y(y) = P(-\sqrt y\le X\le\sqrt y) = \Phi(\sqrt y) - \Phi(-\sqrt y)$.`, R`Differentiate with the chain rule: $\frac{d}{dy}\Phi(\sqrt y) = \phi(\sqrt y)\frac{1}{2\sqrt y}$.`],
  a: [['$f_Y(y)$', 'exp(-y/2)/sqrt(2*pi*y)', { y: [0.1, 6] }]],
  s: R`$F_Y(y) = \Phi(\sqrt y) - \Phi(-\sqrt y)$, so
$$f_Y(y) = \phi(\sqrt y)\frac{1}{2\sqrt y} + \phi(-\sqrt y)\frac{1}{2\sqrt y} = \frac{\phi(\sqrt y)}{\sqrt y} = \frac{1}{\sqrt{2\pi y}}e^{-y/2},\quad y>0.$$
This is the $\chi^2_1$ density ($=\operatorname{Gamma}(\tfrac12, 2)$).` }),
P({ k: 'i', lvl: 3,
  q: R`$X$ has density $f_X(x) = \tfrac14$ on $(0,1)$, $\tfrac38$ on $(3,5)$, and $0$ otherwise. Let $Y = 1/X$. Find $f_Y(2)$ and $f_Y(\tfrac14)$.`,
  h: [R`$t(x) = 1/x$ is decreasing on $(0,\infty)$, with $s(y) = 1/y$ and $|s'(y)| = 1/y^2$.`, R`$y = 2$ comes from $x = \tfrac12\in(0,1)$; $y = \tfrac14$ comes from $x = 4\in(3,5)$.`],
  a: [['$f_Y(2)$', '1/16'], ['$f_Y(1/4)$', '6']],
  s: R`Monotone formula: $f_Y(y) = f_X(1/y)\cdot\frac1{y^2}$. So
$f_Y(y) = \frac{1}{4y^2}$ for $y>1$ (from $x\in(0,1)$), and $f_Y(y) = \frac{3}{8y^2}$ for $\tfrac15<y<\tfrac13$ (from $x\in(3,5)$), else 0.

$f_Y(2) = \frac{1}{16}$ and $f_Y(\tfrac14) = \frac{3}{8}\cdot16 = 6$.`,
  src: 'HW2 A3 (Wasserman 2.14.4)' }),

H('Mixed results: indicators and truncation'),
P({ k: 'j', lvl: 2,
  q: R`$X\sim N(0,1)$ and $Y = \max\{0, X\}$ (written $X^+$). Find $P(Y = 0)$ and $F_Y(1)$ given $\Phi(1)\approx0.8413$.`,
  h: [R`$Y = 0$ exactly when $X\le0$.`, R`For $y\ge0$: $\{Y\le y\} = \{X\le y\}$.`],
  a: [['$P(Y=0)$', '1/2'], ['$F_Y(1)$', '0.8413']],
  s: R`$P(Y=0) = P(X\le0) = \tfrac12$. $Y$ is neither discrete nor continuous: it has a point mass at 0. For $y\ge0$, $F_Y(y) = P(X\le y) = \Phi(y)$, and $F_Y(y) = 0$ for $y<0$. So $F_Y(1) = 0.8413$.`,
  src: 'HW3 A2 (Wasserman 2.14.8)' }),
P({ k: 'k', lvl: 4,
  q: R`$X$ is standard Cauchy: $f_X(x) = \frac{1}{\pi(1+x^2)}$. Show $Y = 1/X$ is also standard Cauchy. Enter $f_Y(y)$.`,
  h: [R`$t(x) = 1/x$ is decreasing on each of $(-\infty,0)$ and $(0,\infty)$, and $s(y) = 1/y$ on each piece.`, R`$f_X(1/y)\frac{1}{y^2} = \frac{1}{\pi(1+1/y^2)y^2}$.`],
  a: [['$f_Y(y)$', '1/(pi*(1+y^2))', { y: [-4, 4] }]],
  s: R`On each branch the map is monotone with $|s'(y)| = 1/y^2$, and each $y\ne0$ comes from exactly one $x = 1/y$. Hence
$$f_Y(y) = f_X(1/y)\frac1{y^2} = \frac{1}{\pi\left(1+\frac{1}{y^2}\right)y^2} = \frac{1}{\pi(y^2 + 1)},$$
the standard Cauchy density. (HW2 C2 does the same with scale $\alpha$: if $X\sim\text{Cauchy}(\alpha)$ then $1/X\sim\text{Cauchy}(1/\alpha)$.)`,
  src: 'HW2 C2' }),
]);

DRILLS('2.9', [
  { k: '01', lvl: 1, q: R`$X\sim\operatorname{Unif}(0,1)$, $Y = X^2$. Find $f_Y(y)$ on $(0,1)$.`,
    h: [R`$F_Y(y) = P(X\le\sqrt y) = \sqrt y$.`], a: [['$f_Y(y)$', '1/(2*sqrt(y))', { y: [0.05, 1] }]],
    s: R`$F_Y(y) = \sqrt y$ for $0<y<1$, so $f_Y(y) = \frac{1}{2\sqrt y}$.` },
  { k: '02', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$, $Y = -2\log X$. Find $f_Y(y)$, $y>0$, and name it.`,
    h: [R`$s(y) = e^{-y/2}$.`], a: [['$f_Y(y)$', '1/2*exp(-y/2)', { y: [0, 6] }]],
    s: R`$s(y) = e^{-y/2}$, $|s'(y)| = \tfrac12e^{-y/2}$, so $f_Y(y) = \tfrac12e^{-y/2}$, $y>0$: $\operatorname{Exp}(\beta=2)$, which is also $\chi^2_2$.` },
  { k: '03', lvl: 1, q: R`$X\sim\operatorname{Exp}(\beta=2)$, $Y = 3X$. Find $f_Y(y)$, $y>0$.`,
    h: [R`Scaling an exponential multiplies its mean.`], a: [['$f_Y(y)$', '1/6*exp(-y/6)', { y: [0, 10] }]],
    s: R`$F_Y(y) = P(X\le y/3) = 1 - e^{-y/6}$, so $f_Y(y) = \tfrac16e^{-y/6}$: $Y\sim\operatorname{Exp}(6)$.` },
  { k: '04', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$, $Y = \sqrt X$. Find $f_Y(y)$, $y>0$.`,
    h: [R`$F_Y(y) = P(X\le y^2)$.`], a: [['$f_Y(y)$', '2*y*exp(-y^2)', { y: [0, 3] }]],
    s: R`$F_Y(y) = 1 - e^{-y^2}$, so $f_Y(y) = 2ye^{-y^2}$ for $y>0$ (a Rayleigh/Weibull distribution).` },
  { k: '05', lvl: 1, q: R`$X\sim\operatorname{Unif}(-1,1)$, $Y = |X|$. Find $f_Y(y)$ on $(0,1)$.`,
    h: [R`$P(|X|\le y) = P(-y\le X\le y)$.`], a: [['$f_Y(y)$', '1', { y: [0, 1] }]],
    s: R`$F_Y(y) = \frac{2y}{2} = y$, so $f_Y = 1$ on $(0,1)$: $Y\sim\operatorname{Unif}(0,1)$.` },
  { k: '06', lvl: 3, q: R`$X\sim\operatorname{Unif}(-1,2)$ and $Y = X^2$. Find $f_Y(\tfrac14)$ and $f_Y(\tfrac94)$.`,
    h: [R`For $0<y<1$, $A_y = [-\sqrt y,\sqrt y]$. For $1<y<4$, $A_y = (-1,\sqrt y]$.`, R`$F_Y = \frac{2\sqrt y}{3}$ on $(0,1)$ and $\frac{\sqrt y + 1}{3}$ on $(1,4)$.`],
    a: [['$f_Y(1/4)$', '2/3'], ['$f_Y(9/4)$', '1/9']],
    s: R`$f_X = \tfrac13$. For $0<y<1$: $F_Y = \tfrac13\cdot2\sqrt y$, so $f_Y = \frac1{3\sqrt y}$. For $1<y<4$: $F_Y = \tfrac13(\sqrt y+1)$, so $f_Y = \frac1{6\sqrt y}$. Then $f_Y(\tfrac14) = \frac{1}{3\cdot\frac12} = \frac23$ and $f_Y(\tfrac94) = \frac{1}{6\cdot\frac32} = \frac19$.` },
  { k: '07', lvl: 1, q: R`$X\sim\operatorname{Bin}(3,\tfrac12)$ and $Y = (X-1)^2$. Find $P(Y = 1)$.`,
    h: [R`$(x-1)^2 = 1\iff x\in\{0,2\}$.`], a: '1/2',
    s: R`$P(X=0) + P(X=2) = \tfrac18 + \tfrac38 = \tfrac12$.` },
  { k: '08', lvl: 2, q: R`$X$ has CDF $F(x) = 1 - 1/x$ for $x>1$ (Pareto). Find the density of $Y = \log X$ for $y > 0$.`,
    h: [R`$P(\log X\le y) = P(X\le e^y)$.`], a: [['$f_Y(y)$', 'exp(-y)', { y: [0, 5] }]],
    s: R`$F_Y(y) = 1 - e^{-y}$ for $y>0$, so $Y\sim\operatorname{Exp}(1)$: $f_Y(y) = e^{-y}$.` },
  { k: '09', lvl: 2, q: R`$Y$ has CDF $F_Y(y) = 1 - y^{-2}$ for $y\ge1$ (0 otherwise). Let $Z = 10(Y-1)$. Find $F_Z(z)$ for $z\ge0$ and $P(Z\le10)$.`,
    h: [R`$P(10(Y-1)\le z) = P(Y\le 1+z/10)$.`],
    a: [['$F_Z(z)$', '1-1/(z/10+1)^2', { z: [0, 30] }], [R`$P(Z\le 10)$`, '3/4']],
    s: R`$F_Z(z) = F_Y(1 + z/10) = 1 - (1+z/10)^{-2}$ for $z\ge0$, and $0$ for $z<0$. $P(Z\le10) = 1 - 2^{-2} = \tfrac34$.`, src: 'HW2 B2' },
  { k: '10', lvl: 2, q: R`$X\sim N(0,1)$. Using $\Phi(1) = 0.8413$, find $P(X^2\le1)$.`,
    h: [R`$P(-1\le X\le1) = 2\Phi(1) - 1$.`], a: '2*0.8413-1',
    s: R`$P(X^2\le1) = P(|X|\le1) = \Phi(1) - \Phi(-1) = 2\Phi(1) - 1 = 0.6826$.` },
  { k: '11', lvl: 2, q: R`$X$ has CDF $F(x) = x^3$ on $[0,1]$. To simulate $X$ from $U\sim\operatorname{Unif}(0,1)$ you set $X = F^{-1}(U)$. What $X$ do you get from $U = 0.125$?`,
    h: [R`$F^{-1}(u) = u^{1/3}$.`], a: '0.5', s: R`$F^{-1}(u) = u^{1/3}$, and $0.125^{1/3} = 0.5$.` },
  { k: '12', lvl: 2, q: R`$X$ has density $2x$ on $(0,1)$ and $Y = 1/X$. Find $f_Y(y)$ for $y>1$.`,
    h: [R`$s(y) = 1/y$, $|s'| = 1/y^2$.`], a: [['$f_Y(y)$', '2/y^3', { y: [1, 5] }]],
    s: R`$f_Y(y) = f_X(1/y)\cdot\frac{1}{y^2} = \frac{2}{y}\cdot\frac1{y^2} = \frac{2}{y^3}$, $y>1$.` },
  { k: '13', lvl: 4, q: R`$X\sim\operatorname{Unif}(0,\pi)$ and $Y = \sin X$. Find $F_Y(y)$ and $f_Y(y)$ for $0<y<1$.`,
    h: [R`$\sin x\le y$ on $(0,\pi)$ happens near both ends: $x\le\arcsin y$ or $x\ge\pi - \arcsin y$.`, R`$\frac{d}{dy}\arcsin y = \frac{1}{\sqrt{1-y^2}}$.`],
    a: [['$F_Y(y)$', '2*asin(y)/pi', { y: [0, 0.95] }], ['$f_Y(y)$', '2/(pi*sqrt(1-y^2))', { y: [0, 0.95] }]],
    s: R`$A_y = (0, \arcsin y]\cup[\pi-\arcsin y,\pi)$, total length $2\arcsin y$. So $F_Y(y) = \frac{2\arcsin y}{\pi}$ and $f_Y(y) = \frac{2}{\pi\sqrt{1-y^2}}$ for $0<y<1$.` },
  { k: '14', lvl: 3, q: R`$X\sim\operatorname{Exp}(\beta)$ and $Y = e^X$. Show $Y$ is Pareto and find $P(Y > 4)$ when $\beta = \tfrac12$.`,
    h: [R`$P(Y>y) = P(X>\log y) = e^{-\log(y)/\beta} = y^{-1/\beta}$.`], a: '1/16',
    s: R`$P(Y>y) = y^{-1/\beta}$ for $y>1$, so $f_Y(y) = \frac1\beta y^{-1/\beta-1}$ (Pareto). With $\beta = \tfrac12$: $P(Y>4) = 4^{-2} = \tfrac1{16}$.`, src: 'Slides Ch.2' },
]);
