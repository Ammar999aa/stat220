TOPIC({ id: '4.1', ch: 4, title: 'Markov and Chebyshev inequalities', summary: 'Bounding tail probabilities from the mean or the variance alone; one-sided Chebyshev (Cantelli).' }, [
R`Often you know only a few facts about $X$, such as its mean or variance, but not its full distribution. Can you still say something about how likely extreme values are? Yes. **Inequalities** give guaranteed upper bounds on tail probabilities that hold for *every* distribution with those moments.

The bounds are often loose, but they are universal, and they are the engine behind the law of large numbers.`,
THM('Markov’s inequality', R`If $X\ge0$ and $E(X)$ exists and is finite, then for every $t>0$:
$$P(X>t)\le\frac{E(X)}{t}.$$`),
R`*Proof.* For a continuous $X\ge0$,
$$E(X) = \int_0^tx f(x)\dd x + \int_t^\infty xf(x)\dd x\ \ge\ \int_t^\infty xf(x)\dd x\ \ge\ t\int_t^\infty f(x)\dd x = t\,P(X>t).$$
The first step drops a non-negative term; the second uses $x\ge t$ on the region of integration.

*Intuition:* if the average is 2, at most 20% of the population can be above 10. Otherwise those people alone would push the average above 2.`,
P({ k: 'a', lvl: 1, q: R`$X\ge0$ with $E(X) = 2$. Bound $P(X>10)$.`, h: [R`Markov: $E(X)/t$.`], a: '0.2', s: R`$P(X>10)\le\frac{2}{10} = 0.2$.` }),
P({ k: 'b', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$. Give Markov's bound for $P(X>3)$, and the exact value.`, h: [R`$E(X) = 1$; exact tail $e^{-3}$.`], a: [['Markov bound', '1/3'], ['exact', 'exp(-3)']],
  s: R`Markov: $\frac13\approx0.333$. Exact: $e^{-3}\approx0.0498$. The bound is valid but loose, because it uses only the mean.` }),
WARN('Check the conditions', R`Markov needs $X\ge0$ **and** a finite mean. In the slides' Generalized Pareto example with shape $\xi>1$, $E(X)$ does not exist, so Markov **cannot** be applied. Always state "since $X\ge0$ and $E(X)<\infty$, by Markov…" in an exam.`),
P({ k: 'c', lvl: 2, q: R`$E(X^2) = 4$ ($X$ can be negative). Use Markov on $X^2$ to bound $P(|X|>4)$.`, h: [R`$\{|X|>4\} = \{X^2>16\}$, and $X^2\ge0$.`], a: '1/4', s: R`$P(|X|>4) = P(X^2>16)\le\frac{E(X^2)}{16} = \frac14$.` }),
THM('Chebyshev’s inequality', R`If $\mu = E(X)$ and $\sigma^2 = \operatorname{var}(X)<\infty$, then for every $t>0$:
$$P(|X-\mu|>t)\le\frac{\sigma^2}{t^2}.\qquad\text{Equivalently, with } t = k\sigma:\ P(|X-\mu|>k\sigma)\le\frac1{k^2}.$$`),
R`*Proof.* Apply Markov to the non-negative variable $(X-\mu)^2$ with threshold $t^2$:
$$P(|X-\mu|>t) = P\big((X-\mu)^2>t^2\big)\le\frac{E[(X-\mu)^2]}{t^2} = \frac{\sigma^2}{t^2}.$$
(The same bound holds with $\ge$ instead of $>$.)`,
P({ k: 'd', lvl: 1, q: R`$X$ has mean 50 and standard deviation 5. Bound $P(|X-50|>10)$.`, h: [R`$t = 10 = 2\sigma$.`], a: '1/4', s: R`$\frac{25}{100} = \frac14$.` }),
P({ k: 'e', lvl: 1, q: R`For any distribution with finite variance, at least what fraction of the probability lies within 3 standard deviations of the mean?`, h: [R`$1 - \frac1{k^2}$.`], a: '8/9', s: R`$P(|X-\mu|<3\sigma)\ge1 - \frac19 = \frac89\approx0.889$.` }),
P({ k: 'f', lvl: 2, q: R`$X\sim\operatorname{Poisson}(\lambda)$. Use Chebyshev to show $P(X\ge2\lambda)\le\frac1\lambda$. Evaluate the bound for $\lambda = 5$.`, h: [R`$\{X\ge2\lambda\}\subseteq\{|X-\lambda|\ge\lambda\}$.`, R`Mean and variance of Poisson are both $\lambda$.`], a: '0.2',
  s: R`$X\ge2\lambda$ implies $X - \lambda\ge\lambda$, hence $|X-\lambda|\ge\lambda$. So
$$P(X\ge2\lambda)\le P(|X-\lambda|\ge\lambda)\le\frac{\operatorname{var}(X)}{\lambda^2} = \frac{\lambda}{\lambda^2} = \frac1\lambda.$$
For $\lambda = 5$: $0.2$.`, src: 'HW6 A1 (Wasserman 4.5.2)' }),
P({ k: 'g', lvl: 2, q: R`$Z\sim N(0,1)$. Chebyshev bound for $P(|Z|>2)$ vs the true value ($\Phi(2) = 0.9772$)?`, h: [R`$\sigma^2/t^2$ and $2(1-\Phi(2))$.`], a: [['Chebyshev', '1/4'], ['exact', '0.0456']], s: R`Bound: $\frac14 = 0.25$. Exact: $2(1-0.9772) = 0.0456\approx0.05$. For a normal, Chebyshev is very conservative.`, src: 'Slides Ch.4' }),
P({ k: 'h', lvl: 3, q: R`$X_1,\dots,X_n\iid\operatorname{Ber}(p)$, $p$ unknown. Using Chebyshev and $p(1-p)\le\frac14$, how large must $n$ be to guarantee $P(|\bar X_n - p|>0.1)\le0.05$?`, h: [R`$\operatorname{var}(\bar X_n) = \frac{p(1-p)}{n}\le\frac1{4n}$.`], a: '500',
  s: R`$P(|\bar X_n-p|>0.1)\le\frac{p(1-p)}{n(0.1)^2}\le\frac{1}{4n\cdot0.01} = \frac{25}{n}$. We need $\frac{25}{n}\le0.05$, i.e. $n\ge500$.` }),
H('One-sided Chebyshev (Cantelli)'),
THM('Cantelli’s inequality', R`If $E(X) = 0$ and $\operatorname{var}(X) = \sigma^2$, then for $t>0$:
$$P(X\ge t)\le\frac{\sigma^2}{\sigma^2 + t^2}.$$`),
P({ k: 'i', lvl: 4, q: R`(HW6 B1) Prove Cantelli's inequality. Hint: for any $u\ge0$, $P(X\ge t)\le P\big((X+u)^2\ge(t+u)^2\big)$. Then compare the Cantelli and Chebyshev bounds for $P(X\ge2)$ when $\sigma^2 = 1$.`,
  h: [R`$X\ge t\Rightarrow X + u\ge t+u>0\Rightarrow(X+u)^2\ge(t+u)^2$.`, R`Markov: $\le\frac{E(X+u)^2}{(t+u)^2} = \frac{\sigma^2+u^2}{(t+u)^2}$.`, R`Minimize over $u$: derivative zero at $u = \sigma^2/t$.`],
  a: [['Cantelli bound', '1/5'], ['Chebyshev bound', '1/4']],
  s: R`For $u\ge0$, $X\ge t$ implies $X+u\ge t+u>0$, so $(X+u)^2\ge(t+u)^2$. By Markov applied to $(X+u)^2\ge0$:
$$P(X\ge t)\le\frac{E[(X+u)^2]}{(t+u)^2} = \frac{\sigma^2+u^2}{(t+u)^2},$$
using $E(X) = 0$. Let $g(u) = \frac{\sigma^2+u^2}{(t+u)^2}$. Then $g'(u) = \frac{2u(t+u) - 2(\sigma^2+u^2)}{(t+u)^3} = \frac{2(ut - \sigma^2)}{(t+u)^3}$, which is zero at $u^* = \sigma^2/t$. Plugging in:
$$g(u^*) = \frac{\sigma^2 + \sigma^4/t^2}{(t + \sigma^2/t)^2} = \frac{\sigma^2(t^2+\sigma^2)/t^2}{(t^2+\sigma^2)^2/t^2} = \frac{\sigma^2}{\sigma^2+t^2}.$$
With $\sigma^2 = 1$, $t = 2$: Cantelli gives $\frac15$. Chebyshev only gives $P(X\ge2)\le P(|X|\ge2)\le\frac14$. Cantelli wins for one-sided tails.`, src: 'HW6 B1' }),
]);

DRILLS('4.1', [
  { k: '01', lvl: 1, q: R`$X\ge0$, $E(X) = 5$. Markov bound for $P(X\ge20)$?`, h: [R`$5/20$.`], a: '1/4', s: R`$\frac14$.` },
  { k: '02', lvl: 1, q: R`$\operatorname{var}(X) = 9$. Chebyshev bound for $P(|X-\mu|\ge6)$?`, h: [R`$9/36$.`], a: '1/4', s: R`$\frac14$.` },
  { k: '03', lvl: 1, q: R`Lower bound for $P(\mu - 2\sigma<X<\mu+2\sigma)$ valid for every distribution?`, h: [R`$1 - 1/k^2$.`], a: '3/4', s: R`$1 - \frac14 = \frac34$.` },
  { k: '04', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$. Markov bound for $P(X>0.8)$, and exact value?`, h: [R`$E(X) = 0.5$.`], a: [['bound', '0.625'], ['exact', '0.2']], s: R`$\frac{0.5}{0.8} = 0.625$; exact $0.2$.` },
  { k: '05', lvl: 1, q: R`Can Markov's inequality be applied to a standard Cauchy $X$?`, h: [R`Two conditions.`], a: { choice: ['Yes', 'No'], v: 1 }, s: R`No: $X$ is not non-negative, and its mean is not defined. (Even $|X|$ has $E|X| = \infty$, so the bound would be useless.)` },
  { k: '06', lvl: 2, q: R`$X\sim\operatorname{Poisson}(4)$. Chebyshev bound for $P(X\ge8)$?`, h: [R`$P(|X-4|\ge4)\le4/16$.`], a: '1/4', s: R`$\frac{\lambda}{\lambda^2} = \frac14$.` },
  { k: '07', lvl: 2, q: R`$X\sim\operatorname{Bin}(100,\frac12)$. Chebyshev bound for $P(|X-50|\ge10)$?`, h: [R`$\operatorname{var} = 25$.`], a: '1/4', s: R`$\frac{25}{100} = \frac14$.` },
  { k: '08', lvl: 2, q: R`iid sample with $\sigma^2 = 4$. Smallest $n$ such that Chebyshev guarantees $P(|\bar X - \mu|\ge0.5)\le0.1$?`, h: [R`$\frac{4}{n\cdot0.25}\le0.1$.`], a: '160', s: R`$\frac{16}{n}\le0.1\Rightarrow n\ge160$.` },
  { k: '09', lvl: 2, q: R`$E(X) = 0$, $\operatorname{var}(X) = 4$. Cantelli bound for $P(X\ge4)$?`, h: [R`$\frac{\sigma^2}{\sigma^2+t^2}$.`], a: '0.2', s: R`$\frac{4}{4+16} = 0.2$.`, src: 'HW6 B1' },
  { k: '10', lvl: 2, q: R`$Z\sim N(0,1)$, so $E(Z^4) = 3$. Use Markov on $Z^4$ to bound $P(|Z|>2)$.`, h: [R`$P(Z^4>16)$.`], a: '3/16', s: R`$\frac{3}{16}\approx0.1875$, better than Chebyshev's $0.25$. Higher moments give sharper bounds.` },
  { k: '11', lvl: 2, q: R`$X\sim\operatorname{Exp}(\beta = 2)$. Chebyshev bound for $P(|X-2|>4)$, and the exact probability.`, h: [R`$\operatorname{var} = 4$. $|X-2|>4\iff X>6$ (as $X>0$).`], a: [['bound', '1/4'], ['exact', 'exp(-3)']], s: R`Bound $\frac4{16} = \frac14$. Exact: $P(X>6) = e^{-3}\approx0.0498$.` },
  { k: '12', lvl: 3, q: R`$X$ takes values $0$ and $10$ with $P(X = 10) = 0.1$. Compute Markov's bound for $P(X\ge10)$ and compare with the truth.`, h: [R`$E(X) = 1$.`], a: '0.1', s: R`$\frac{E(X)}{10} = 0.1$, exactly the true probability. Markov's inequality cannot be improved in general: it is attained by two-point distributions like this one.` },
  { k: '13', lvl: 3, q: R`$X\ge0$ has $E(X) = 10$ and $\operatorname{var}(X) = 4$. (a) Use Chebyshev to give a lower bound for $P(6<X<16)$. (b) Use Cantelli (one-sided Chebyshev) to bound $P(X\ge16)$. (c) Use Cantelli on each tail separately, $P(X\le6)$ and $P(X\ge16)$, and combine them into a second lower bound for $P(6<X<16)$.`,
    h: [R`Chebyshev only controls intervals **symmetric** about $\mu = 10$. The interval $(6,16)$ is not symmetric, so use the largest symmetric interval inside it: $(6,14)$. Since $(6,14)\subseteq(6,16)$, a lower bound for the smaller interval is also one for the bigger.`, R`Cantelli is stated for mean 0. Apply it to $Y = X - 10$ for the upper tail, and to $Y = 10 - X$ for the lower tail: $P(Y\ge t)\le\frac{\sigma^2}{\sigma^2+t^2}$, with $t = 6$ and $t = 4$.`, R`For (c): $P(6<X<16) = 1 - P(X\le6) - P(X\ge16)$, so subtract both upper bounds from 1. Then compare with (a). Using more targeted tools piece by piece does not always win.`],
    a: [['(a) Chebyshev lower bound', '3/4'], [R`(b) Cantelli bound on $P(X\ge16)$`, '1/10'], ['(c) combined lower bound', '7/10']],
    s: R`**(a)** The trap is to plug in $t = 6$, the distance to the far endpoint. Chebyshev controls $|X - 10|$, so we need an interval symmetric about 10 that fits inside $(6,16)$; the largest is $(6,14)$, with $t = 4$:
$$P(6<X<16)\ge P(|X-10|<4) = 1 - P(|X-10|\ge4)\ge1 - \frac{4}{16} = \frac34.$$
**(b)** $Y = X - 10$ has mean 0 and variance 4. By Cantelli, $P(X\ge16) = P(Y\ge6)\le\frac{4}{4+36} = \frac1{10}$. (Two-sided Chebyshev would give $\frac{4}{36} = \frac19$, and Markov $\frac{10}{16}$. Cantelli is the sharpest of the three.)

**(c)** $Y' = 10 - X$ also has mean 0 and variance 4, so $P(X\le6) = P(Y'\ge4)\le\frac{4}{4+16} = \frac15$. Hence
$$P(6<X<16) = 1 - P(X\le6) - P(X\ge16)\ge1 - \frac15 - \frac1{10} = \frac{7}{10}.$$
This is **weaker** than (a): $\frac{7}{10}<\frac34$. Adding two one-sided bounds wastes accuracy (on the symmetric interval, two Cantelli bounds give $1 - \frac25 = \frac35$, much worse than Chebyshev's $\frac34$). Use Cantelli for a single tail and Chebyshev for a two-sided interval.` },
  { k: '14', lvl: 4, q: R`(Chernoff bound) Let $X = X_1 + X_2$ with $X_1, X_2\iid\operatorname{Exp}(\beta = 1)$.
(a) Show that for every $0<s<1$ and $t>0$: $P(X\ge t)\le e^{-st}\,\psi_X(s)$, and find $\psi_X(s)$.
(b) For $t = 10$, choose $s$ to minimize the bound. Give the optimal $s$ and the resulting bound.
(c) Compare with Chebyshev's bound and with the exact value of $P(X\ge10)$.`,
    h: [R`Same trick as in the proof of Hoeffding: for $s>0$, $\{X\ge t\} = \{e^{sX}\ge e^{st}\}$, and $e^{sX}\ge0$, so Markov applies to $e^{sX}$.`, R`The MGF of $\operatorname{Exp}(\beta)$ is $\frac{1}{1-\beta s}$ for $s<1/\beta$. For a sum of independent variables, the MGFs multiply: $\psi_X(s) = (1-s)^{-2}$.`, R`Minimize $\log$ of the bound, $-st - 2\log(1-s)$: the derivative is $-t + \frac{2}{1-s} = 0$, so $1 - s = \frac2t$.`, R`Chebyshev: $E(X) = 2$, $\operatorname{var}(X) = 2$, and $\{X\ge10\}\subseteq\{|X-2|\ge8\}$. Exact: $X\sim\operatorname{Gamma}(2,1)$, so $P(X\ge t) = \int_t^\infty xe^{-x}\dd x$ (integrate by parts).`],
    a: [['optimal s', '4/5'], ['Chernoff bound', '25*exp(-8)'], ['Chebyshev bound', '1/32'], ['exact', '11*exp(-10)']],
    s: R`**(a)** For $s>0$ the map $x\mapsto e^{sx}$ is increasing, so $\{X\ge t\} = \{e^{sX}\ge e^{st}\}$. Since $e^{sX}\ge0$ and (for $s<1$) $E(e^{sX})<\infty$, Markov gives
$$P(X\ge t) = P(e^{sX}\ge e^{st})\le\frac{E(e^{sX})}{e^{st}} = e^{-st}\psi_X(s).$$
Each $X_i$ has MGF $\psi(s) = \int_0^\infty e^{sx}e^{-x}\dd x = \frac1{1-s}$ for $s<1$. By independence, $\psi_X(s) = \psi(s)^2 = \frac{1}{(1-s)^2}$.

**(b)** Minimize $g(s) = -st - 2\log(1-s)$ over $0<s<1$: $g'(s) = -t + \frac{2}{1-s} = 0\Rightarrow s^* = 1 - \frac2t$, and $g'' = \frac{2}{(1-s)^2}>0$, so it is a minimum. With $t = 10$: $s^* = \frac45$, and
$$P(X\ge10)\le e^{-8}\cdot\frac{1}{(1/5)^2} = 25e^{-8}\approx0.0084.$$
(In general the bound is $\left(\frac t2\right)^2e^{-(t-2)}$.)

**(c)** $E(X) = 2$ and $\operatorname{var}(X) = 1 + 1 = 2$. Since $X\ge10\Rightarrow|X - 2|\ge8$, Chebyshev gives $P(X\ge10)\le\frac{2}{64} = \frac1{32}\approx0.031$. (Markov would give $\frac{2}{10} = 0.2$.)

Exact: $X\sim\operatorname{Gamma}(2,1)$ with density $xe^{-x}$, so
$$P(X\ge10) = \int_{10}^\infty xe^{-x}\dd x = \Big[-xe^{-x} - e^{-x}\Big]_{10}^\infty = 11e^{-10}\approx0.0005.$$
Ranking: exact $0.0005<$ Chernoff $0.0084<$ Chebyshev $0.031<$ Markov $0.2$. Using the whole MGF (all moments) gives an exponentially decaying bound, which is why it beats the polynomial bounds far in the tail.` },
]);
