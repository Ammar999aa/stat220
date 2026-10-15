TOPIC({ id: '2.8', ch: 2, title: 'Conditional distributions', summary: 'f(x|y) = f(x,y)/f_Y(y), slicing the joint density, hierarchical models.' }, [
R`Suppose you already know $Y = y$. What does that tell you about $X$? The answer is a whole new distribution for $X$, the **conditional distribution of $X$ given $Y = y$**.

Picture the joint density as a mountain over the plane. Fixing $Y = y$ means **slicing** the mountain along the horizontal line at height $y$. The slice has the right *shape* for $X$, but its area is not 1. Dividing by the slice's area, $f_Y(y)$, rescales it into a proper density.`,
DEF('Conditional PMF / PDF', R`If $f_Y(y) > 0$,
$$f_{X|Y}(x\,|\,y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}.$$
Discrete case: this is exactly $P(X = x\mid Y=y) = \frac{P(X=x,Y=y)}{P(Y=y)}$.

Continuous case: it is a density in $x$ (for fixed $y$), and
$$P(X\in A\mid Y = y) = \int_A f_{X|Y}(x\,|\,y)\dd x.$$`),
R`In words: **conditional = joint / marginal of what you condition on.** The variable after the bar ($y$) is treated as a fixed number. The result must integrate to 1 in the variable before the bar ($x$). That is a good check.`,
P({ k: 'a', lvl: 1,
  q: R`Joint PMF: $f(0,0) = 1/9$, $f(0,1) = 2/9$, $f(1,0) = 2/9$, $f(1,1) = 4/9$. Find $P(X = 1\mid Y = 1)$.`,
  h: [R`$P(Y=1) = 2/9 + 4/9$.`],
  a: '2/3',
  s: R`$P(X=1\mid Y=1) = \dfrac{f(1,1)}{f_Y(1)} = \dfrac{4/9}{6/9} = \dfrac23.$` }),
EX('Slides example', R`$f(x,y) = x + y$ on $[0,1]^2$, so $f_Y(y) = y + \tfrac12$. Then
$$f_{X|Y}(x\,|\,y) = \frac{x+y}{y + \tfrac12},\quad 0\le x\le 1.$$
With $y = \tfrac13$: $f_{X|Y}(x\,|\,\tfrac13) = \frac{x+1/3}{5/6} = \frac65\left(x+\tfrac13\right)$, so
$$P\left(X < \tfrac14\,\middle|\, Y = \tfrac13\right) = \int_0^{1/4}\tfrac65\left(x + \tfrac13\right)\dd x = \tfrac65\left(\tfrac1{32} + \tfrac1{12}\right) = \tfrac{11}{80}.$$`),
P({ k: 'b', lvl: 2,
  q: R`$f(x,y) = 2$ on $0<y<x<1$ (so $f_X(x) = 2x$). Find $f_{Y|X}(y\,|\,x)$ for $0 < y < x$. What named distribution is it?`,
  h: [R`Divide the joint by $f_X(x)$. The support in $y$ (for fixed $x$) is $(0,x)$.`],
  a: [['$f_{Y|X}(y|x)$', '1/x', { x: [0.2, 1], y: [0, 0.2] }]],
  s: R`$f_{Y|X}(y\,|\,x) = \dfrac{2}{2x} = \dfrac1x$ for $0<y<x$. This is the $\operatorname{Unif}(0,x)$ distribution: given $X = x$, $Y$ is uniform on $(0,x)$.`,
  src: 'HW3 A4(b)' }),
P({ k: 'c', lvl: 2,
  q: R`$f(x,y) = \tfrac65(x + y^2)$ on $[0,1]^2$. Find $P(X < \tfrac12 \mid Y = \tfrac12)$.`,
  h: [R`$f_Y(y) = \tfrac65\left(\tfrac12 + y^2\right)$, so $f_Y(\tfrac12) = \tfrac65\cdot\tfrac34$.`, R`$f_{X|Y}(x\,|\,\tfrac12) = \dfrac{x + 1/4}{3/4}$.`],
  a: '1/3',
  s: R`$f_Y(y) = \int_0^1\tfrac65(x+y^2)\dd x = \tfrac65\left(\tfrac12 + y^2\right)$. At $y=\tfrac12$:
$$f_{X|Y}(x\,|\,\tfrac12) = \frac{\tfrac65(x+\tfrac14)}{\tfrac65\cdot\tfrac34} = \frac{4x+1}{3},\quad 0\le x\le 1.$$
$$P(X<\tfrac12\mid Y=\tfrac12) = \int_0^{1/2}\frac{4x+1}{3}\dd x = \frac13\left[2x^2 + x\right]_0^{1/2} = \frac13\cdot 1 = \frac13.$$`,
  src: 'HW2 A5 (Wasserman 2.14.17)' }),
THM('Independence and conditioning', R`If $X\indep Y$, then $f_{X|Y}(x\,|\,y) = f_X(x)$. Knowing $Y$ does not change the distribution of $X$. (Proof: $f_{X,Y}/f_Y = f_Xf_Y/f_Y = f_X$.)`),
P({ k: 'd', lvl: 1,
  q: R`$f(x,y) = 4xy$ on $[0,1]^2$. Find $f_{X|Y}(x\,|\,y)$.`,
  h: [R`They are independent, so the conditional equals the marginal $f_X(x) = 2x$.`],
  a: [['$f_{X|Y}(x|y)$', '2*x', { x: [0, 1], y: [0.1, 1] }]],
  s: R`$f_Y(y) = 2y$, so $f_{X|Y}(x\,|\,y) = \frac{4xy}{2y} = 2x = f_X(x)$, as expected for independent variables.` }),

H('Building a joint from a conditional (hierarchical models)'),
R`Very often a problem gives you the distribution in **two stages**: first $X$, then $Y$ *given* $X$. Rearranging the definition gives the joint:
$$f_{X,Y}(x,y) = f_{Y|X}(y\,|\,x)\,f_X(x).$$
Then integrate out $x$ to get the marginal of $Y$. This is the continuous version of the law of total probability.`,
EX('Uniform, then uniform', R`$X\sim\operatorname{Unif}(0,1)$ and $Y\mid X=x \sim \operatorname{Unif}(x,1)$. Then $f_{X,Y}(x,y) = \frac{1}{1-x}\cdot 1$ for $0<x<y<1$, and
$$f_Y(y) = \int_0^y \frac{1}{1-x}\dd x = \big[-\log(1-x)\big]_0^y = -\log(1-y),\quad 0<y<1.$$`),
P({ k: 'e', lvl: 3,
  q: R`$X\sim\operatorname{Unif}(0,1)$ and, given $X = x$, $Y\sim\operatorname{Unif}(0,x)$. Find $f_Y(y)$ for $0<y<1$, then $P(Y < \tfrac12)$.`,
  h: [R`Joint: $f(x,y) = \frac1x$ on $0<y<x<1$.`, R`$f_Y(y) = \int_y^1 \frac1x\dd x$.`, R`$\int -\log y\dd y = y - y\log y$.`],
  a: [['$f_Y(y)$', '-log(y)', { y: [0.05, 1] }], ['$P(Y<1/2)$', '1/2+log(2)/2']],
  s: R`$f_{X,Y}(x,y) = f_{Y|X}(y|x)f_X(x) = \frac1x$ for $0 < y < x < 1$. So
$$f_Y(y) = \int_y^1 \frac{1}{x}\dd x = -\log y,\quad 0<y<1.$$
$$P(Y<\tfrac12) = \int_0^{1/2}(-\log y)\dd y = \big[y - y\log y\big]_0^{1/2} = \tfrac12 - \tfrac12\log\tfrac12 = \tfrac12 + \tfrac12\log 2 \approx 0.847.$$
(The limit $y\log y\to 0$ as $y\to0$.)` }),
P({ k: 'f', lvl: 3,
  q: R`$N\sim\operatorname{Poisson}(\lambda)$ coins are tossed, each landing heads with probability $p$ independently. So given $N = n$, the number of heads $X\sim\operatorname{Bin}(n,p)$. With $\lambda = 2$, $p = \tfrac12$, find $P(X = 0)$.`,
  h: [R`$P(X=0) = \sum_{n\ge0} P(X=0\mid N=n)P(N=n) = \sum_n (1-p)^n e^{-\lambda}\lambda^n/n!$.`, R`Recognize the exponential series: $\sum_n \frac{(\lambda(1-p))^n}{n!} = e^{\lambda(1-p)}$.`],
  a: 'exp(-1)',
  s: R`$$P(X=0) = \sum_{n=0}^\infty (1-p)^n\,\frac{e^{-\lambda}\lambda^n}{n!} = e^{-\lambda}e^{\lambda(1-p)} = e^{-\lambda p} = e^{-1}.$$
More generally $X\sim\operatorname{Poisson}(\lambda p)$ ("Poisson thinning"). HW2 B3 also shows that heads and tails counts are then *independent* Poissons.`,
  src: 'HW2 B3 idea' }),
P({ k: 'g', lvl: 3,
  q: R`$X\sim\operatorname{Poisson}(\lambda)$, $Y\sim\operatorname{Poisson}(\mu)$ independent. It is known that $X+Y\sim\operatorname{Poisson}(\lambda+\mu)$. With $\lambda = 1$, $\mu = 2$, find $P(X = 1\mid X + Y = 3)$.`,
  h: [R`$P(X=1\mid X+Y=3) = \frac{P(X=1)P(Y=2)}{P(X+Y=3)}$.`, R`In general the answer is $\operatorname{Bin}\left(n, \frac{\lambda}{\lambda+\mu}\right)$.`],
  a: '4/9',
  s: R`$$P(X=x\mid X+Y=n) = \frac{\frac{e^{-\lambda}\lambda^x}{x!}\frac{e^{-\mu}\mu^{n-x}}{(n-x)!}}{\frac{e^{-(\lambda+\mu)}(\lambda+\mu)^n}{n!}} = \binom nx\left(\frac{\lambda}{\lambda+\mu}\right)^x\left(\frac{\mu}{\lambda+\mu}\right)^{n-x}.$$
So $X\mid X+Y=n\sim\operatorname{Bin}(n, \frac{\lambda}{\lambda+\mu})$. Here $n=3$, $p = \tfrac13$: $P = 3\cdot\tfrac13\cdot\left(\tfrac23\right)^2 = \tfrac49$.`,
  src: 'HW3 B1 (Wasserman 2.14.16)' }),

H('Conditioning on an event instead of a value'),
R`If you condition on an *event* $\{Y\in B\}$ with positive probability, just use the ordinary definition of conditional probability:
$$P(X\in A\mid Y\in B) = \frac{P(X\in A, Y\in B)}{P(Y\in B)} = \frac{\int_B\int_A f_{X,Y}(x,y)\dd x\dd y}{\int_B f_Y(y)\dd y}.$$`,
P({ k: 'h', lvl: 2,
  q: R`$f(x,y) = 2$ on $0<y<x<1$. Find $P(X > \tfrac12\mid Y < \tfrac12)$.`,
  h: [R`$P(Y<\tfrac12) = \int_0^{1/2}2(1-y)\dd y = \tfrac34$.`, R`$P(X>\tfrac12, Y<\tfrac12)$: for $y<\tfrac12$ and $x>\tfrac12$, all such points satisfy $y<x$. It's a $\tfrac12\times\tfrac12$ square with density 2.`],
  a: '2/3',
  s: R`$P(Y<\tfrac12) = \int_0^{1/2} 2(1-y)\dd y = 1 - \tfrac14 = \tfrac34$. The set $\{x>\tfrac12, y<\tfrac12\}$ lies entirely in the support, with area $\tfrac14$, so $P(X>\tfrac12, Y<\tfrac12) = 2\cdot\tfrac14 = \tfrac12$. Ratio: $\frac{1/2}{3/4} = \frac23$.` }),
]);

DRILLS('2.8', [
  { k: '01', lvl: 1, q: R`$f(x,y) = (x+y)/9$ for $x\in\{0,1,2\}$, $y\in\{0,1\}$. Find $P(Y = 1\mid X = 2)$.`,
    h: [R`$P(X=2) = 5/9$.`], a: '3/5', s: R`$\frac{f(2,1)}{f_X(2)} = \frac{3/9}{5/9} = \frac35$.` },
  { k: '02', lvl: 2, q: R`$f(x,y) = 2$ on $0<y<x<1$. Find $f_{X|Y}(x|y)$ and $P(X > \tfrac34\mid Y = \tfrac12)$.`,
    h: [R`$f_Y(y) = 2(1-y)$. Given $Y=y$, $X$ is uniform on $(y,1)$.`],
    a: [['$f_{X|Y}(x|y)$', '1/(1-y)', { x: [0.6, 1], y: [0, 0.5] }], [R`$P(X>3/4\mid Y=1/2)$`, '1/2']],
    s: R`$f_{X|Y}(x|y) = \frac{2}{2(1-y)} = \frac1{1-y}$ on $(y,1)$, i.e. $\operatorname{Unif}(y,1)$. With $y=\tfrac12$: $X\sim\operatorname{Unif}(\tfrac12,1)$, so $P(X>\tfrac34) = \frac{1/4}{1/2} = \tfrac12$.` },
  { k: '03', lvl: 2, q: R`$f(x,y) = x+y$ on $[0,1]^2$. Find $P(Y < \tfrac12\mid X = 0)$.`,
    h: [R`$f_{Y|X}(y|0) = \frac{0 + y}{0 + 1/2} = 2y$.`], a: '1/4',
    s: R`$f_X(0) = \tfrac12$, so $f_{Y|X}(y|0) = 2y$ on $[0,1]$. Then $\int_0^{1/2}2y\dd y = \tfrac14$.` },
  { k: '04', lvl: 3, q: R`$f(x,y) = 2e^{-(x+y)}$ on $0<x<y$. Find $f_{Y|X}(y|x)$ for $y>x$, and $P(Y > X + 1\mid X = x)$.`,
    h: [R`$f_X(x) = 2e^{-2x}$.`], a: [['$f_{Y|X}(y|x)$', 'exp(x-y)', { x: [0, 1], y: [1.2, 3] }], [R`$P(Y>x+1\mid X=x)$`, 'exp(-1)']],
    s: R`$f_{Y|X}(y|x) = \frac{2e^{-x-y}}{2e^{-2x}} = e^{-(y-x)}$ for $y > x$: a shifted $\operatorname{Exp}(1)$. So $P(Y - x > 1\mid X = x) = e^{-1}$, whatever $x$ is.` },
  { k: '05', lvl: 3, q: R`$X\sim \operatorname{Unif}(0,1)$, $Y\mid X=x\sim\operatorname{Unif}(x, 1)$. Find $f_Y(y)$ for $0<y<1$.`,
    h: [R`Joint: $\frac1{1-x}$ on $0<x<y<1$. Integrate $x$ from $0$ to $y$.`], a: [['$f_Y(y)$', '-log(1-y)', { y: [0, 0.95] }]],
    s: R`$f_Y(y) = \int_0^y \frac{1}{1-x}\dd x = -\log(1-y)$, $0<y<1$.`, src: 'Slides Ch.3 (example used for iterated expectation)' },
  { k: '06', lvl: 3, q: R`$X\sim\operatorname{Ber}(\tfrac12)$. Given $X=0$, $Y\sim\operatorname{Unif}(0,1)$; given $X = 1$, $Y\sim\operatorname{Unif}(0,2)$. Find $P(Y<\tfrac12)$ and $P(X = 1\mid Y < \tfrac12)$.`,
    h: [R`Total probability: $\tfrac12\cdot\tfrac12 + \tfrac12\cdot\tfrac14$.`, R`Bayes: $P(X=1, Y<\tfrac12)/P(Y<\tfrac12)$.`],
    a: [['$P(Y<1/2)$', '3/8'], [R`$P(X=1\mid Y<1/2)$`, '1/3']],
    s: R`$P(Y<\tfrac12) = \tfrac12\cdot\tfrac12 + \tfrac12\cdot\tfrac14 = \tfrac38$. $P(X=1, Y<\tfrac12) = \tfrac12\cdot\tfrac14 = \tfrac18$, so $P(X=1\mid Y<\tfrac12) = \frac{1/8}{3/8} = \tfrac13$.` },
  { k: '07', lvl: 2, q: R`$X\sim\operatorname{Poisson}(2)$, $Y\sim\operatorname{Poisson}(3)$ independent. Find $P(X = 2\mid X+Y = 4)$.`,
    h: [R`$X\mid X+Y=4\sim\operatorname{Bin}(4, 2/5)$.`], a: '6*0.4^2*0.6^2',
    s: R`$\binom42(0.4)^2(0.6)^2 = 6\cdot0.16\cdot0.36 = 0.3456$.` },
  { k: '08', lvl: 3, q: R`$N\sim\operatorname{Poisson}(4)$, and $X\mid N = n\sim\operatorname{Bin}(n, \tfrac14)$. Find $P(X=0)$ and name the distribution of $X$.`,
    h: [R`Poisson thinning: $X\sim\operatorname{Poisson}(\lambda p)$.`], a: [['$P(X=0)$', 'exp(-1)']],
    s: R`$P(X=0) = \sum_n (3/4)^n e^{-4}4^n/n! = e^{-4}e^{3} = e^{-1}$. In general $X\sim\operatorname{Poisson}(4\cdot\tfrac14) = \operatorname{Poisson}(1)$.` },
  { k: '09', lvl: 3, q: R`$f(x,y) = 3x$ on $0<y<x<1$ (so $f_Y(y) = \tfrac32(1-y^2)$). Find $f_{X|Y}(x|y)$ on $y<x<1$.`,
    h: [R`Divide.`], a: [['$f_{X|Y}(x|y)$', '2*x/(1-y^2)', { x: [0.6, 1], y: [0, 0.5] }]],
    s: R`$f_{X|Y}(x|y) = \frac{3x}{\tfrac32(1-y^2)} = \frac{2x}{1-y^2}$, $y<x<1$. Check: $\int_y^1 \frac{2x}{1-y^2}\dd x = \frac{1-y^2}{1-y^2} = 1$ ✓.` },
  { k: '10', lvl: 3, q: R`$f(x,y) = \tfrac65$ on $\{0<y<1,\ y<x<2-\sqrt y\}$. For $1\le x<2$, find $f_{Y|X}(y|x)$ and $P(Y<\tfrac18\mid X=\tfrac32)$.`,
    h: [R`For fixed $x\in[1,2)$: $y<x$ always holds since $y<1$. The condition $x<2-\sqrt y$ means $y<(2-x)^2$.`, R`So $f_X(x) = \tfrac65(2-x)^2$ and the conditional is uniform.`],
    a: [['$f_{Y|X}(y|x)$', '1/(2-x)^2', { x: [1, 1.9], y: [0, 0.01] }], [R`$P(Y<1/8\mid X=3/2)$`, '1/2']],
    s: R`For $1\le x<2$ the $y$-range is $(0,(2-x)^2)$, so $f_X(x) = \tfrac65(2-x)^2$ and $f_{Y|X}(y|x) = \frac{1}{(2-x)^2}$ there: $\operatorname{Unif}(0,(2-x)^2)$. At $x = \tfrac32$: $Y\sim\operatorname{Unif}(0,\tfrac14)$, so $P(Y<\tfrac18) = \tfrac12$.`, src: 'HW3 B3' },
  { k: '11', lvl: 3, q: R`$X$ is uniform on $\{1,2,3\}$. Given $X = x$, $Y\sim\operatorname{Bin}(x,\tfrac12)$. Find $P(Y=0)$ and $P(X = 1\mid Y=0)$.`,
    h: [R`$P(Y=0\mid X=x) = 2^{-x}$.`], a: [['$P(Y=0)$', '7/24'], [R`$P(X=1\mid Y=0)$`, '4/7']],
    s: R`$P(Y=0) = \tfrac13\left(\tfrac12+\tfrac14+\tfrac18\right) = \tfrac13\cdot\tfrac78 = \tfrac7{24}$. $P(X=1\mid Y=0) = \frac{\tfrac13\cdot\tfrac12}{7/24} = \frac{1/6}{7/24} = \frac47$.` },
  { k: '12', lvl: 2, q: R`$f(x,y) = \tfrac{21}4x^2y$ on $x^2\le y\le1$, with $f_Y(y) = \tfrac72y^{5/2}$. Find $f_{X|Y}(x|y)$ for $-\sqrt y\le x\le\sqrt y$.`,
    h: [R`Divide and simplify powers of $y$.`], a: [['$f_{X|Y}(x|y)$', '3/2*x^2*y^(-3/2)', { x: [-0.3, 0.3], y: [0.2, 1] }]],
    s: R`$f_{X|Y}(x|y) = \frac{\tfrac{21}4x^2y}{\tfrac72y^{5/2}} = \frac32\,x^2y^{-3/2}$, $|x|\le\sqrt y$. Check: $\int_{-\sqrt y}^{\sqrt y}\tfrac32x^2y^{-3/2}\dd x = \tfrac32\cdot\tfrac23y^{3/2}y^{-3/2} = 1$ ✓.` },
]);
