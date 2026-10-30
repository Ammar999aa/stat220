TOPIC({ id: '2.2', ch: 2, title: 'PMFs, PDFs and checking validity', summary: 'Discrete vs continuous, PMF/PDF ↔ CDF, normalizing constants, truncated densities.' }, [
H('Discrete random variables: the PMF'),
DEF('Probability mass function', R`$X$ is **discrete** if it takes countably many values $\{x_1,x_2,\dots\}$. Its PMF is $f_X(x) = P(X = x)$. It satisfies the "minimal conditions":
$$f_X(x)\ge0\ \text{ for all } x,\qquad\sum_i f_X(x_i) = 1.$$
From PMF to CDF: $F_X(x) = \sum_{x_i\le x}f_X(x_i)$. From CDF to PMF: $f_X(x) = F_X(x) - F_X(x^-)$ = jump size.`),
P({ k: 'a', lvl: 1, q: R`$f(x) = c\,x$ for $x\in\{1,2,3,4\}$. Find $c$.`, h: [R`$c(1+2+3+4) = 1$.`], a: '1/10', s: R`$10c = 1\Rightarrow c = \frac1{10}$.` }),
P({ k: 'b', lvl: 2, q: R`$P(X = k) = c\left(\tfrac12\right)^k$ for $k = 0,1,2,\dots$ Find $c$ and $P(X\ge2)$.`, h: [R`Geometric series $\sum_{k\ge0}r^k = \frac{1}{1-r}$.`], a: [['$c$', '1/2'], [R`$P(X\ge2)$`, '1/4']],
  s: R`$c\cdot\frac{1}{1-1/2} = 2c = 1\Rightarrow c = \frac12$. $P(X\ge2) = 1 - P(X=0) - P(X=1) = 1 - \frac12 - \frac14 = \frac14$.` }),
H('Continuous random variables: the PDF'),
DEF('Probability density function', R`$X$ is **continuous** if there is a function $f_X$ with $f_X(x)\ge0$, $\int_{-\infty}^\infty f_X(x)\dd x = 1$, and
$$P(a<X<b) = \int_a^bf_X(x)\dd x\quad\text{for all } a\le b.$$
Then $F_X(x) = \int_{-\infty}^xf_X(t)\dd t$ and $f_X(x) = F_X'(x)$ wherever $F$ is differentiable.`),
WARN('A density is not a probability', R`For continuous $X$, $P(X = x) = 0$ for every single $x$. The value $f_X(x)$ is a probability *per unit length*, so it **can exceed 1**. For example, $f(x) = 4$ on $(0,\frac14)$ is a perfectly valid density.`),
R`**Checking a candidate density** (slides): you need non-negativity and total integral exactly 1.
<ul><li>$f(x) = \frac{1}{1+x}$, $x\ge0$: $\int_0^\infty\frac{\dd x}{1+x} = [\log(1+x)]_0^\infty = \infty$. <b>Not valid</b>, and no constant can fix it.</li><li>$f(x) = \frac{1}{(1+x)^2}$, $x\ge0$: $\int_0^\infty = \left[-\frac1{1+x}\right]_0^\infty = 1$. <b>Valid</b>.</li><li>$f(x) = \frac1{1+x^2}$, $x\ge0$: $\int_0^\infty = [\arctan x]_0^\infty = \frac\pi2$. Not valid as is, but $\frac2\pi f$ is.</li></ul>`,
P({ k: 'c', lvl: 1, q: R`$f(x) = c\,x^2$ for $0<x<3$. Find $c$.`, h: [R`$\int_0^3x^2\dd x = 9$.`], a: '1/9', s: R`$9c = 1\Rightarrow c = \frac19$.` }),
P({ k: 'd', lvl: 2, q: R`$f(x) = \frac{c}{(1+x)^3}$ for $x\ge0$. Find $c$.`, h: [R`$\int_0^\infty(1+x)^{-3}\dd x = \left[-\frac{1}{2(1+x)^2}\right]_0^\infty$.`], a: '2', s: R`$\int_0^\infty(1+x)^{-3}\dd x = \frac12$, so $c = 2$.` }),
P({ k: 'e', lvl: 2, q: R`$f(x) = c\,e^{-|x|}$ for $x\in\R$. Find $c$.`, h: [R`By symmetry, $\int_{\R}e^{-|x|}\dd x = 2\int_0^\infty e^{-x}\dd x$.`], a: '1/2', s: R`$2c = 1$, so $c = \frac12$ (the Laplace density).` }),
P({ k: 'f', lvl: 2, q: R`$X$ has CDF $F(x) = 1 - (1+x)e^{-x}$ for $x\ge0$. Find its PDF.`, h: [R`Product rule: $\frac{d}{dx}(1+x)e^{-x} = e^{-x} - (1+x)e^{-x}$.`], a: [['$f(x)$', 'x*exp(-x)', { x: [0, 5] }]],
  s: R`$f(x) = F'(x) = -[e^{-x} - (1+x)e^{-x}] = xe^{-x}$, $x\ge0$. That is $\operatorname{Gamma}(2,1)$.` }),
H('Piecewise densities'),
P({ k: 'g', lvl: 3, q: R`$f(x) = kx$ on $[0,1)$, $k$ on $[1,2)$, $-kx+3k$ on $[2,3)$, $0$ otherwise. (a) Find $k$. (b) Find $F(1.5)$. (c) Three independent observations: find $P(\text{exactly one exceeds }1.5)$.`,
  h: [R`The graph is a trapezoid of height $k$: area $= \frac k2 + k + \frac k2$.`, R`$F(1.5) = \int_0^1kx\dd x + \int_1^{1.5}k\dd x$.`, R`The number exceeding 1.5 is $\operatorname{Bin}(3, P(X>1.5))$.`],
  a: [['$k$', '1/2'], ['$F(1.5)$', '1/2'], ['P(exactly one)', '3/8']],
  s: R`**(a)** $\int_0^1kx\dd x + \int_1^2k\dd x + \int_2^3(3k-kx)\dd x = \frac k2 + k + \frac k2 = 2k = 1$, so $k = \frac12$.

**(b)** The CDF is $F(x) = \frac{x^2}{4}$ on $[0,1)$, $\frac{2x-1}{4}$ on $[1,2)$, $-\frac{x^2}4 + \frac{3x}2 - \frac54$ on $[2,3)$, and $1$ for $x\ge3$. So $F(1.5) = \frac{2}{4} = \frac12$. This is also clear from symmetry of the trapezoid about $1.5$.

**(c)** $p = P(X>1.5) = \frac12$, so the count is $\operatorname{Bin}(3,\frac12)$, and $P(\text{exactly one}) = \binom31\frac12\left(\frac12\right)^2 = \frac38$.`, src: 'HW2 B1' }),
P({ k: 'h', lvl: 2, q: R`$f_X = \frac14$ on $(0,1)$, $\frac38$ on $(3,5)$, $0$ otherwise. Find $F_X(2)$ and $F_X(4)$.`, h: [R`The CDF is flat on $[1,3]$.`], a: [['$F_X(2)$', '1/4'], ['$F_X(4)$', '5/8']],
  s: R`$F(2) = \int_0^1\frac14 = \frac14$ (no mass on $(1,3)$). $F(4) = \frac14 + \frac38\cdot1 = \frac58$. In general $F = \frac x4$ on $[0,1)$, $\frac14$ on $[1,3)$, $\frac{3x}{8} - \frac78$ on $[3,5)$, $1$ after.`, src: 'HW2 A3(a)' }),
H('Truncated densities'),
P({ k: 'i', lvl: 2, q: R`$X$ has density $f$ and CDF $F$, with $F(x_0)<1$. Show $g(x) = \frac{f(x)}{1-F(x_0)}$ for $x\ge x_0$ (0 otherwise) is a density. For $X\sim\operatorname{Exp}(1)$ and $x_0 = 1$, compute $\int_2^\infty g(x)\dd x$.`,
  h: [R`$\int_{x_0}^\infty f = 1 - F(x_0)$.`, R`$g(x) = e^{-x}/e^{-1} = e^{-(x-1)}$.`], a: 'exp(-1)',
  s: R`$g\ge0$ and $\int_{x_0}^\infty g = \frac{1-F(x_0)}{1-F(x_0)} = 1$ ✓. It is the density of $X$ *given* $X\ge x_0$.

For $\operatorname{Exp}(1)$, $x_0 = 1$: $g(x) = e^{-(x-1)}$ for $x\ge1$, and $\int_2^\infty g = e^{-1} = P(X>2\mid X>1) = P(X>1)$. This is the memoryless property.`, src: 'HW2 A2' }),
]);

DRILLS('2.2', [
  { k: '01', lvl: 1, q: R`$P(X = x) = \frac cx$ for $x\in\{1,2,3\}$. Find $c$.`, h: [R`$1 + \frac12 + \frac13 = \frac{11}6$.`], a: '6/11', s: R`$c\cdot\frac{11}{6} = 1\Rightarrow c = \frac6{11}$.` },
  { k: '02', lvl: 1, q: R`$f(x) = c\,x(1-x)$ on $(0,1)$. Find $c$.`, h: [R`$\int_0^1x - x^2 = \frac16$.`], a: '6', s: R`$c/6 = 1$, $c = 6$.` },
  { k: '03', lvl: 1, q: R`$f(x) = c\,e^{-3x}$ for $x>0$. Find $c$.`, h: [R`$\int_0^\infty e^{-3x} = \frac13$.`], a: '3', s: R`$c = 3$: $\operatorname{Exp}(\beta = \frac13)$.` },
  { k: '04', lvl: 2, q: R`$f(x) = \frac{c}{x^2}$ for $x>2$. Find $c$.`, h: [R`$\int_2^\infty x^{-2} = \frac12$.`], a: '2', s: R`$c\cdot\frac12 = 1$, $c = 2$.` },
  { k: '05', lvl: 2, q: R`$f(x) = c\sin x$ on $(0,\pi)$. Find $c$ and $P(X<\pi/2)$.`, h: [R`$\int_0^\pi\sin x = 2$.`], a: [['$c$', '1/2'], [R`$P(X<\pi/2)$`, '1/2']], s: R`$c = \frac12$; by symmetry $P(X<\pi/2) = \frac12$.` },
  { k: '06', lvl: 1, q: R`$F(x) = \frac{x^2}{4}$ on $[0,2]$. Find the PDF and $P(X>1)$.`, h: [R`Differentiate.`], a: [['$f(x)$', 'x/2', { x: [0, 2] }], ['$P(X>1)$', '3/4']], s: R`$f(x) = \frac x2$ on $(0,2)$, and $P(X>1) = 1 - \frac14 = \frac34$.` },
  { k: '07', lvl: 2, q: R`$f(x) = c(4 - x^2)$ on $(-2,2)$. Find $c$.`, h: [R`$\int_{-2}^2(4-x^2)\dd x = 16 - \frac{16}3$.`], a: '3/32', s: R`$\int = \frac{32}{3}$, so $c = \frac3{32}$.` },
  { k: '08', lvl: 2, q: R`$f(x) = c\,xe^{-x^2}$ for $x>0$. Find $c$.`, h: [R`Substitute $u = x^2$.`], a: '2', s: R`$\int_0^\infty xe^{-x^2}\dd x = \frac12$, so $c = 2$.` },
  { k: '09', lvl: 1, q: R`Is $f(x) = \frac{1}{1+x}$, $x\ge0$, a valid PDF after multiplying by some constant?`, h: [R`Does the integral converge?`], a: { choice: ['Yes', 'No'], v: 1 },
    s: R`$\int_0^\infty\frac{\dd x}{1+x} = \infty$, so no constant can normalize it.`, src: 'Slides Ch.2' },
  { k: '10', lvl: 2, q: R`$f(x) = \frac{c}{1+x^2}$ for $x\ge0$. Find $c$ and $P(X\le1)$.`, h: [R`$\arctan 1 = \frac\pi4$.`], a: [['$c$', '2/pi'], [R`$P(X\le1)$`, '1/2']], s: R`$c = \frac2\pi$ and $P(X\le1) = \frac2\pi\cdot\frac\pi4 = \frac12$.` },
  { k: '11', lvl: 2, q: R`$f(x) = 4$ on $(0,\frac14)$. Is it a valid PDF, even though $f>1$?`, h: [R`Integral?`], a: { choice: ['Yes', 'No'], v: 0 }, s: R`$\int_0^{1/4}4\dd x = 1$ and $f\ge0$. Valid: densities can exceed 1.` },
  { k: '12', lvl: 3, q: R`$X$ has the trapezoid density from HW2 B1 ($k = \tfrac12$). Find $P(X>2.5)$.`, h: [R`$\int_{2.5}^3\frac12(3-x)\dd x$.`], a: '1/16',
    s: R`$\int_{2.5}^3\frac{3-x}{2}\dd x = \frac12\cdot\frac{(0.5)^2}{2} = \frac1{16}$.` },
  { k: '13', lvl: 3, q: R`$P(X = k) = \dfrac{c}{k(k+1)}$ for $k = 1, 2, 3, \dots$ Find $c$, $P(X\ge10)$, and $P(X\text{ is even})$.`,
    h: [R`Partial fractions: $\frac{1}{k(k+1)} = \frac1k - \frac1{k+1}$. The sum telescopes.`, R`$P(X\ge n) = c\sum_{k\ge n}\left(\frac1k - \frac1{k+1}\right)$ also telescopes.`, R`Even $k = 2m$: $\sum_{m\ge1}\left(\frac1{2m} - \frac1{2m+1}\right) = \frac12 - \frac13 + \frac14 - \frac15 + \cdots$. Compare with $\log 2 = 1 - \frac12 + \frac13 - \frac14 + \cdots$.`],
    a: [['$c$', '1'], [R`$P(X\ge10)$`, '1/10'], [R`$P(X\text{ even})$`, '1-log(2)']],
    s: R`**$c$.** $\sum_{k=1}^{n}\left(\frac1k - \frac1{k+1}\right) = 1 - \frac1{n+1}\to1$, so $c = 1$ (and $c>0$ makes the PMF non-negative).

**Tail.** $P(X\ge n) = \sum_{k\ge n}\left(\frac1k - \frac1{k+1}\right) = \frac1n$, so $P(X\ge10) = \frac1{10}$.

**Even.** $P(X\text{ even}) = \sum_{m\ge1}\left(\frac1{2m} - \frac1{2m+1}\right) = \frac12 - \frac13 + \frac14 - \frac15 + \cdots$. The alternating harmonic series is $1 - \frac12 + \frac13 - \cdots = \log2$, so $\frac12 - \frac13 + \frac14 - \cdots = 1 - \log2$. Hence $P(X\text{ even}) = 1 - \log2\approx0.307$.` },
  { k: '14', lvl: 4, q: R`Let $f(x) = c\,(1+x)^{-\theta}$ for $x\ge0$ (0 otherwise), where $\theta$ is a real parameter. (a) For which $\theta$ can $f$ be made a valid PDF by choosing $c$? (b) For those $\theta$, find $c$ and the median of $X$. (c) For $\theta = 4$, find $P(X>3\mid X>1)$.`,
    h: [R`Non-negativity needs $c>0$. The real question is when $\int_0^\infty(1+x)^{-\theta}\dd x<\infty$. Treat $\theta = 1$ separately (antiderivative $\log$).`, R`For $\theta\ne1$: $\int_0^\infty(1+x)^{-\theta}\dd x = \left[\frac{(1+x)^{1-\theta}}{1-\theta}\right]_0^\infty$. When is the limit at $\infty$ finite?`, R`$P(X>x) = \int_x^\infty c(1+t)^{-\theta}\dd t = (1+x)^{-(\theta-1)}$. Set it equal to $\frac12$ for the median.`, R`Conditional: $\frac{P(X>3)}{P(X>1)}$.`],
    a: [[R`(a) values of $\theta$`, { choice: ['θ > 0', 'θ > 1', 'θ ≥ 1', 'θ > 2'], v: 1 }], ['$c$', 'theta-1', { theta: [1.5, 5] }], ['median', '2^(1/(theta-1))-1', { theta: [1.5, 5] }], [R`$P(X>3\mid X>1)$, $\theta=4$`, '1/8']],
    s: R`**(a)** We need $c>0$ and $\int_0^\infty(1+x)^{-\theta}\dd x$ finite.
- $\theta = 1$: $\int_0^\infty\frac{\dd x}{1+x} = [\log(1+x)]_0^\infty = \infty$.
- $\theta\ne1$: $\int_0^\infty(1+x)^{-\theta}\dd x = \left[\frac{(1+x)^{1-\theta}}{1-\theta}\right]_0^\infty$. If $\theta<1$ the exponent $1-\theta>0$ and this is $\infty$. If $\theta>1$ it equals $0 - \frac{1}{1-\theta} = \frac{1}{\theta-1}$.

So a valid density exists **iff $\theta>1$**. (For $\theta\le1$ no constant can fix it, like $\frac1{1+x}$ in the slides.)

**(b)** $c\cdot\frac{1}{\theta-1} = 1\Rightarrow c = \theta-1$. Survival function: $P(X>x) = \int_x^\infty(\theta-1)(1+t)^{-\theta}\dd t = (1+x)^{-(\theta-1)}$. Median: $(1+m)^{-(\theta-1)} = \frac12\iff 1+m = 2^{1/(\theta-1)}$, so
$$m = 2^{1/(\theta-1)} - 1.$$

**(c)** With $\theta = 4$, $P(X>x) = (1+x)^{-3}$, and $\{X>3\}\subseteq\{X>1\}$:
$$P(X>3\mid X>1) = \frac{4^{-3}}{2^{-3}} = \frac{8}{64} = \frac18.$$
(Unlike the exponential, this is **not** memoryless: $P(X>2) = 3^{-3} = \frac1{27}\ne\frac18$.)` },
]);
