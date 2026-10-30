TOPIC({ id: '2.3', ch: 2, title: 'Quantiles, median and quartiles', summary: 'The quantile function F⁻¹(q) = inf{x : F(x) ≥ q}, including for step CDFs.' }, [
R`The CDF maps a value $x$ to a probability $q = F(x)$. The **quantile function** goes the other way: given a probability $q$, which value $x$ has a fraction $q$ of the distribution below it? The median ($q=\frac12$) is the most famous quantile.`,
DEF('Quantile function (generalized inverse)', R`$$F^{-1}(q) = \inf\{x : F(x)\ge q\},\qquad q\in[0,1].$$
If $F$ is continuous and strictly increasing, this is the ordinary inverse function: solve $F(x) = q$ for $x$.
<ul><li><b>Median:</b> $F^{-1}(\frac12)$.</li><li><b>First and third quartiles:</b> $F^{-1}(\frac14)$ and $F^{-1}(\frac34)$.</li></ul>`),
EX(R`Quantiles of $\operatorname{Exp}(\beta)$`, R`Solve $1 - e^{-x/\beta} = q$: $e^{-x/\beta} = 1-q$, so $x = -\beta\log(1-q)$. Hence $F^{-1}(q) = -\beta\log(1-q)$, and the median is $\beta\log2\approx0.69\beta$. That is *less* than the mean $\beta$, because the long right tail pulls the mean up.`),
P({ k: 'a', lvl: 1, q: R`Find the median of $\operatorname{Exp}(\beta = 2)$.`, h: [R`$F^{-1}(\frac12) = -\beta\log\frac12$.`], a: '2*log(2)', s: R`$-2\log\frac12 = 2\log2\approx1.386$.` }),
P({ k: 'b', lvl: 1, q: R`$X\sim\operatorname{Unif}(2,10)$. Find the third quartile.`, h: [R`$F(x) = \frac{x-2}{8}$; solve $F(x) = \frac34$.`], a: '8', s: R`$\frac{x-2}{8} = \frac34\Rightarrow x = 8$. In general $F^{-1}(q) = a + q(b-a)$.` }),
P({ k: 'c', lvl: 2, q: R`$F(x) = x^2$ on $[0,1]$. Find the median and the 0.9-quantile.`, h: [R`Solve $x^2 = q$.`], a: [['median', '1/sqrt(2)'], ['0.9-quantile', 'sqrt(0.9)']], s: R`$F^{-1}(q) = \sqrt q$: median $\frac1{\sqrt2}\approx0.707$, 0.9-quantile $\sqrt{0.9}\approx0.949$.` }),
H('Step CDFs: why "inf"?'),
R`For a discrete variable the CDF is flat between jumps, so $F(x) = q$ may have **no** solution, or a whole interval of solutions. The definition with $\inf$ settles it: take the smallest $x$ at which the CDF reaches (or passes) level $q$.`,
EX('Slides example', R`$F(x) = 0$ for $x<1$, $\frac13$ for $1\le x<2$, $1$ for $x\ge2$ (mass $\frac13$ at 1, $\frac23$ at 2).
<ul><li>$q\in(0,\frac13]$: the CDF first reaches $q$ at $x = 1$, so $F^{-1}(q) = 1$.</li><li>$q\in(\frac13,1]$: the first $x$ with $F(x)\ge q$ is $x = 2$, so $F^{-1}(q) = 2$.</li><li>$F^{-1}(0) = \inf\R = -\infty$.</li></ul>`),
P({ k: 'd', lvl: 2, q: R`For the step CDF above, find $F^{-1}(0.2)$, $F^{-1}(\tfrac13)$ and $F^{-1}(0.5)$.`, h: [R`Look for the first $x$ with $F(x)\ge q$. For $q = \frac13$ that's already $x=1$, since $F(1) = \frac13\ge\frac13$.`],
  a: [['$F^{-1}(0.2)$', '1'], [R`$F^{-1}(1/3)$`, '1'], ['$F^{-1}(0.5)$', '2']], s: R`$1$, $1$ and $2$.` }),
P({ k: 'e', lvl: 2, q: R`$X\sim\operatorname{Bin}(2,\frac12)$. Find the median $F^{-1}(\frac12)$.`, h: [R`$F(0) = \frac14$, $F(1) = \frac34$.`], a: '1', s: R`The first $x$ with $F(x)\ge\frac12$ is $x = 1$ (where $F = \frac34$).` }),
H('More continuous quantiles'),
P({ k: 'f', lvl: 2, q: R`Pareto: $F(x) = 1 - \frac1x$ for $x\ge1$. Find the median and the 90th percentile.`, h: [R`$1 - \frac1x = q\Rightarrow x = \frac1{1-q}$.`], a: [['median', '2'], ['90th percentile', '10']], s: R`$F^{-1}(q) = \frac{1}{1-q}$: median $2$, 90th percentile $10$. That is a heavy right tail; recall the mean is infinite!` }),
P({ k: 'g', lvl: 2, q: R`$X\sim N(10,4)$. Given $\Phi^{-1}(0.975) = 1.96$, find the 0.975-quantile of $X$.`, h: [R`$X = \mu + \sigma Z$, and quantiles transform the same way.`], a: '13.92', s: R`$10 + 2\cdot1.96 = 13.92$.` }),
P({ k: 'h', lvl: 3, q: R`Standard Cauchy: $F(x) = \frac12 + \frac1\pi\arctan x$. Find the quartiles.`, h: [R`$\arctan x = \pi(q - \frac12)$.`], a: [['first quartile', '-1'], ['third quartile', '1']], s: R`$F^{-1}(q) = \tan\left(\pi(q-\frac12)\right)$. $q = \frac14$: $\tan(-\frac\pi4) = -1$; $q = \frac34$: $1$. The interquartile range is $2$, even though the mean doesn't exist.` }),
]);

DRILLS('2.3', [
  { k: '01', lvl: 1, q: R`Median of $\operatorname{Exp}(1)$?`, h: [R`$-\log\frac12$.`], a: 'log(2)', s: R`$\log2\approx0.693$.` },
  { k: '02', lvl: 1, q: R`Interquartile range (Q3 − Q1) of $\operatorname{Unif}(0,4)$?`, h: [R`Quartiles are 1 and 3.`], a: '2', s: R`$3 - 1 = 2$.` },
  { k: '03', lvl: 2, q: R`$F(x) = 1 - e^{-x^2}$, $x\ge0$. Find the median.`, h: [R`$e^{-x^2} = \frac12$.`], a: 'sqrt(log(2))', s: R`$x^2 = \log2$, so the median is $\sqrt{\log2}\approx0.833$.` },
  { k: '04', lvl: 1, q: R`$X$ uniform on $\{1,2,3,4,5\}$. Find $F^{-1}(0.4)$ and $F^{-1}(0.5)$.`, h: [R`$F(2) = 0.4$, $F(3) = 0.6$.`], a: [['$F^{-1}(0.4)$', '2'], ['$F^{-1}(0.5)$', '3']], s: R`$F(2) = 0.4\ge0.4$, so $F^{-1}(0.4) = 2$. The first $x$ with $F\ge0.5$ is 3.` },
  { k: '05', lvl: 1, q: R`$F(x) = x^3$ on $[0,1]$. Find $F^{-1}(0.064)$.`, h: [R`Cube root.`], a: '0.4', s: R`$0.064^{1/3} = 0.4$.` },
  { k: '06', lvl: 2, q: R`For which $\beta$ does $\operatorname{Exp}(\beta)$ have median 1?`, h: [R`$\beta\log2 = 1$.`], a: '1/log(2)', s: R`$\beta = \frac1{\log2}\approx1.443$.` },
  { k: '07', lvl: 2, q: R`$F(x) = 1 - x^{-2}$, $x\ge1$. Find the median.`, h: [R`$x^{-2} = \frac12$.`], a: 'sqrt(2)', s: R`$x = \sqrt2$.` },
  { k: '08', lvl: 2, q: R`$X\sim N(5,9)$. With $\Phi^{-1}(0.95) = 1.645$, find the 95th percentile of $X$.`, h: [R`$\mu + \sigma z$.`], a: '9.935', s: R`$5 + 3(1.645) = 9.935$.` },
  { k: '09', lvl: 2, q: R`$X\sim\operatorname{Poisson}(1)$. Find the median.`, h: [R`$F(0) = e^{-1}\approx0.368$, $F(1) = 2e^{-1}\approx0.736$.`], a: '1', s: R`$F(0)<\frac12\le F(1)$, so the median is 1.` },
  { k: '10', lvl: 3, q: R`Logistic: $F(x) = \frac1{1+e^{-x}}$. Find $F^{-1}(0.9)$.`, h: [R`Solve: $e^{-x} = \frac1q - 1$.`], a: 'log(9)', s: R`$F^{-1}(q) = \log\frac{q}{1-q}$ (the logit). $\log9\approx2.197$.` },
  { k: '11', lvl: 3, q: R`A device has lifetime $T\sim\operatorname{Exp}(\beta = 2)$ (in years), but it is replaced at age 2 if still working. Let $X = \min(T, 2)$ be the time in service. Find the first quartile, the median, and the 0.7-quantile of $X$.`,
    h: [R`Find $F_X$. For $x<2$: $\{X\le x\} = \{T\le x\}$. For $x\ge2$: $X\le2$ always.`, R`So $F_X(x) = 1 - e^{-x/2}$ on $[0,2)$ and $F_X(x) = 1$ for $x\ge2$. There is a jump at 2: how big is it, and what is $F_X(2^-)$?`, R`For a level $q$: if $q\le F_X(2^-)$, solve $1 - e^{-x/2} = q$; otherwise the CDF first reaches $q$ at the jump, $x = 2$.`],
    a: [['first quartile', '2*log(4/3)'], ['median', '2*log(2)'], ['0.7-quantile', '2']],
    s: R`**CDF.** $F_X(x) = 0$ for $x<0$, $1 - e^{-x/2}$ for $0\le x<2$, and $1$ for $x\ge2$. At $x = 2$ it jumps from $F_X(2^-) = 1 - e^{-1}\approx0.632$ to $1$: $P(X = 2) = P(T\ge2) = e^{-1}$, the devices that are replaced.

**Quantiles.** For $q\le1 - e^{-1}$ we can solve $1 - e^{-x/2} = q$: $F^{-1}(q) = -2\log(1-q)$.
- $q = \frac14$: $-2\log\frac34 = 2\log\frac43\approx0.575$.
- $q = \frac12$: $2\log2\approx1.386$.
- $q = 0.7>1-e^{-1}$: solving would give $-2\log0.3\approx2.41$, but that is outside $[0,2)$, a trap. Since $F_X(x)<0.7$ for all $x<2$ and $F_X(2) = 1\ge0.7$, $F^{-1}(0.7) = \inf\{x: F_X(x)\ge0.7\} = 2$.

In fact every $q\in(1-e^{-1}, 1]$ has quantile 2.` },
  { k: '12', lvl: 4, q: R`$X$ has density
$$f(x) = \begin{cases}c\,e^{x} & x<0,\\ c\,e^{-x/2} & x\ge0.\end{cases}$$
(a) Find $c$. (b) Find the CDF $F$. (c) Find the first quartile, the median and the third quartile of $X$.`,
    h: [R`$\int_{-\infty}^0e^x\dd x = 1$ and $\int_0^\infty e^{-x/2}\dd x = 2$.`, R`Compute $F$ separately on $x<0$ and $x\ge0$; for $x\ge0$ it is $F(0) + \int_0^x f$. What is $F(0)$?`, R`Before solving $F(x) = q$, decide which piece the quantile lies on by comparing $q$ with $F(0)$.`],
    a: [['$c$', '1/3'], ['first quartile', 'log(3/4)'], ['median', '2*log(4/3)'], ['third quartile', '2*log(8/3)']],
    s: R`**(a)** $f\ge0$ needs $c>0$, and $c\left(\int_{-\infty}^0e^x\dd x + \int_0^\infty e^{-x/2}\dd x\right) = c(1 + 2) = 3c = 1$, so $c = \frac13$.

**(b)** For $x<0$: $F(x) = \int_{-\infty}^x\frac13e^t\dd t = \frac13e^x$. In particular $F(0) = \frac13$. For $x\ge0$:
$$F(x) = \frac13 + \int_0^x\frac13e^{-t/2}\dd t = \frac13 + \frac23\left(1 - e^{-x/2}\right) = 1 - \frac23e^{-x/2}.$$

**(c)** $F$ is continuous and strictly increasing, so solve $F(x) = q$, on the left piece if $q<\frac13$ and on the right piece if $q\ge\frac13$.
- $q = \frac14<\frac13$: $\frac13e^x = \frac14\Rightarrow x = \log\frac34\approx-0.288$.
- $q = \frac12$: $1 - \frac23e^{-x/2} = \frac12\Rightarrow e^{-x/2} = \frac34\Rightarrow x = 2\log\frac43\approx0.575$.
- $q = \frac34$: $e^{-x/2} = \frac38\Rightarrow x = 2\log\frac83\approx1.962$.

The quartiles are not symmetric around the median ($0.86$ below, $1.39$ above) because the right tail is longer.` },
]);
