TOPIC({ id: '2.1', ch: 2, title: 'Random variables and the CDF', summary: 'X : Ω → ℝ, the cumulative distribution function and the three properties that characterize it.' }, [
R`A **random variable** turns the outcome of an experiment into a number. Toss a coin 10 times: the outcome is a whole sequence like HTTHHHTHTT, but we often care only about a number computed from it, such as "how many heads?". That number is a random variable.`,
DEF('Random variable', R`A random variable is a function $X:\Omega\to\R$ that assigns a real number $X(\omega)$ to each outcome $\omega\in\Omega$.

For $A\subseteq\R$ we write $X^{-1}(A) = \{\omega\in\Omega: X(\omega)\in A\}$ (the outcomes that land in $A$) and
$$P(X\in A) = P\big(X^{-1}(A)\big) = P(\{\omega: X(\omega)\in A\}).$$`),
EX('Two fair coins', R`$\Omega = \{HH, HT, TH, TT\}$, each with probability $\frac14$, and $X$ = number of heads:
<table><tr><th>$\omega$</th><td>HH</td><td>HT</td><td>TH</td><td>TT</td></tr><tr><th>$X(\omega)$</th><td>2</td><td>1</td><td>1</td><td>0</td></tr></table>
Then $P(X = 1) = P(\{HT, TH\}) = \frac12$ and $P(X\in[1,2]) = P(\{HH,HT,TH\}) = \frac34$.`),
P({ k: 'a', lvl: 1, q: R`Toss a fair coin 3 times and let $X$ = number of heads. Find $P(X = 2)$.`, h: [R`List the outcomes with exactly two heads: HHT, HTH, THH.`], a: '3/8',
  s: R`Out of $2^3 = 8$ equally likely outcomes, 3 have exactly two heads: $P(X=2) = \frac38$.` }),
H('The cumulative distribution function'),
DEF('CDF', R`The **cumulative distribution function** of $X$ is $F_X:\R\to[0,1]$,
$$F_X(x) = P(X\le x).$$`),
R`The CDF answers the question "what is the chance $X$ is at most $x$?" for *every* $x$. It contains *all* the information about the distribution:`,
THM('The CDF determines the distribution', R`If $F_X(x) = F_Y(x)$ for all $x$, then $P(X\in A) = P(Y\in A)$ for all (measurable) $A$.`),
EX('CDF of the number of heads in two tosses', R`$$F_X(x) = \begin{cases}0 & x<0\\ \tfrac14 & 0\le x<1\\ \tfrac34 & 1\le x<2\\ 1 & x\ge2.\end{cases}$$
It is a **step function**. It jumps at each possible value, by the probability of that value, and is flat in between. Note that it is defined for *all* real $x$, e.g. $F_X(1.5) = \frac34$.`),
R`<figure class="fig"><svg viewBox="0 0 300 150" width="300" height="150" role="img" aria-label="Step CDF"><line class="ax" x1="20" y1="130" x2="290" y2="130"/><line class="ax" x1="60" y1="140" x2="60" y2="10"/><line class="curve" x1="20" y1="130" x2="100" y2="130"/><line class="curve" x1="100" y1="100" x2="170" y2="100"/><line class="curve" x1="170" y1="40" x2="240" y2="40"/><line class="curve" x1="240" y1="20" x2="290" y2="20"/><circle class="dot" cx="100" cy="100" r="3.5"/><circle class="odot" cx="100" cy="130" r="3.5"/><circle class="dot" cx="170" cy="40" r="3.5"/><circle class="odot" cx="170" cy="100" r="3.5"/><circle class="dot" cx="240" cy="20" r="3.5"/><circle class="odot" cx="240" cy="40" r="3.5"/><text x="96" y="145">0</text><text x="166" y="145">1</text><text x="236" y="145">2</text><text x="30" y="104">1/4</text><text x="30" y="44">3/4</text><text x="40" y="24">1</text></svg><figcaption>Filled dots show the value <i>at</i> the jump: the CDF is right-continuous.</figcaption></figure>`,
P({ k: 'b', lvl: 1, q: R`For $X$ = number of heads in two fair tosses, find $F_X(1.5)$ and $F_X(-3)$.`, h: [R`$F_X(1.5) = P(X\le1.5) = P(X\in\{0,1\})$.`], a: [['$F_X(1.5)$', '3/4'], ['$F_X(-3)$', '0']],
  s: R`$F_X(1.5) = P(X = 0) + P(X=1) = \frac14 + \frac12 = \frac34$. $F_X(-3) = P(X\le-3) = 0$.` }),
THM('Characterization of a CDF', R`A function $F:\R\to[0,1]$ is the CDF of some probability distribution **if and only if**:
<ol><li><b>Non-decreasing:</b> $x_1<x_2\Rightarrow F(x_1)\le F(x_2)$.</li><li><b>Normalized:</b> $\lim_{x\to-\infty}F(x) = 0$ and $\lim_{x\to+\infty}F(x) = 1$.</li><li><b>Right-continuous:</b> $F(x) = \lim_{y\downarrow x}F(y)$ for every $x$.</li></ol>`),
R`**Proof of the "only if" part.**

(i) If $x_1<x_2$ then $\{X\le x_1\}\subseteq\{X\le x_2\}$, so $P(X\le x_1)\le P(X\le x_2)$ (monotonicity of $P$).

(ii) Take $x_n\downarrow-\infty$. The events $A_n = \{X\le x_n\}$ decrease to $\emptyset$, so by **continuity of probabilities** $F(x_n) = P(A_n)\to P(\emptyset) = 0$. Similarly $x_n\uparrow\infty$ gives $A_n\uparrow\Omega$ and $F(x_n)\to1$.

(iii) Take $y_n\downarrow x$. Then $\{X\le y_n\}\downarrow\{X\le x\}$, a decreasing sequence whose intersection is $\{X\le x\}$. By continuity of probabilities, $F(y_n)\to F(x)$.

(The slides leave (iii) and the converse as exercises at home.)`,
P({ k: 'c', lvl: 2, q: R`Is $F(y) = 1 - \frac{1}{y^2}$ for $y\ge1$ (and $0$ for $y<1$) a valid CDF? Check all three properties.`, h: [R`Derivative $2/y^3>0$; limits $0$ and $1$; any jumps?`], a: { choice: ['Valid', 'Not valid'], v: 0 },
  s: R`(i) For $y\ge1$, $F'(y) = 2y^{-3}>0$, and $F(1) = 0$ matches the value $0$ to its left, so there is no downward jump: non-decreasing ✓. (ii) $F = 0$ for $y<1$, and $F(y)\to1$ as $y\to\infty$ ✓. (iii) $F$ is continuous everywhere, so in particular right-continuous ✓. **Valid** (a Pareto CDF).`, src: 'HW2 B2(a)' }),
P({ k: 'd', lvl: 2, q: R`Is $G(x) = 0$ for $x\le0$ and $G(x) = 1$ for $x>0$ a valid CDF?`, h: [R`Check right-continuity at $x = 0$.`], a: { choice: ['Valid', 'Not valid'], v: 1 },
  s: R`$\lim_{y\downarrow0}G(y) = 1\ne G(0) = 0$, so $G$ is **not right-continuous** at 0. Not a CDF. (The point mass at 0 has CDF $F(x) = \mathbb 1\{x\ge0\}$: the jump belongs to the right piece.)` }),
P({ k: 'e', lvl: 2, q: R`Is $H(x) = \frac{x^2}{2}$ on $[0,2]$, $0$ for $x<0$, $1$ for $x>2$, a valid CDF?`, h: [R`What is $H(2)$? And what happens just to the right of 2?`], a: { choice: ['Valid', 'Not valid'], v: 1 },
  s: R`$H(2) = 2 > 1$, so it is not even a map into $[0,1]$. It is also not monotone: it drops from $2$ to $1$ after $x=2$. Not a CDF. (The fix would be $x^2/4$ on $[0,2]$.)` }),
H('Reading probabilities off a CDF'),
THM('CDF lemma', R`Let $F$ be the CDF of $X$ and $F(x^-) = \lim_{y\uparrow x}F(y)$. Then
<ol><li>$P(X = x) = F(x) - F(x^-)$ (the size of the jump at $x$),</li><li>$P(x<X\le y) = F(y) - F(x)$,</li><li>$P(X>x) = 1 - F(x)$,</li><li>if $X$ is continuous: $P(a<X<b) = P(a\le X<b) = P(a<X\le b) = P(a\le X\le b) = F(b)-F(a)$.</li></ol>`),
P({ k: 'f', lvl: 2, q: R`$F(x) = 0$ for $x<0$; $\frac x2$ for $0\le x<1$; $\frac34$ for $1\le x<2$; $1$ for $x\ge2$. Find $P(X = 1)$, $P(X = 2)$ and $P(\tfrac12 < X\le 2)$.`,
  h: [R`Jumps: at 1, from $\tfrac12$ to $\tfrac34$; at 2, from $\tfrac34$ to 1.`, R`$P(\tfrac12<X\le2) = F(2) - F(\tfrac12)$.`],
  a: [['$P(X=1)$', '1/4'], ['$P(X=2)$', '1/4'], [R`$P(\tfrac12<X\le2)$`, '3/4']],
  s: R`$P(X=1) = F(1) - F(1^-) = \frac34 - \frac12 = \frac14$. $P(X=2) = 1 - \frac34 = \frac14$. $P(\frac12<X\le2) = F(2) - F(\frac12) = 1 - \frac14 = \frac34$.

This $X$ is **mixed**: continuous (uniform-ish) on $[0,1)$ with total mass $\frac12$, plus point masses of $\frac14$ at 1 and at 2.` }),
P({ k: 'g', lvl: 1, q: R`$X$ has CDF $F(x) = 1 - e^{-2x}$ for $x\ge0$. Find $P(1<X\le2)$.`, h: [R`$F(2) - F(1)$.`], a: 'exp(-2)-exp(-4)', s: R`$F(2)-F(1) = (1-e^{-4}) - (1-e^{-2}) = e^{-2} - e^{-4}\approx0.117$.` }),
P({ k: 'h', lvl: 3, q: R`$X$ is any random variable, and $A$ a set with $P(X\in A) = 0.4$. Let $Y = I_A(X)$ (1 if $X\in A$, else 0). Find $F_Y(y)$ for $y = -1, 0.5, 2$.`, h: [R`$Y\sim\operatorname{Ber}(0.4)$.`],
  a: [['$F_Y(-1)$', '0'], ['$F_Y(0.5)$', '0.6'], ['$F_Y(2)$', '1']],
  s: R`$Y$ takes value 1 w.p. $0.4$ and 0 w.p. $0.6$, so $F_Y(y) = 0$ for $y<0$, $0.6$ for $0\le y<1$, and $1$ for $y\ge1$.`, src: 'HW3 A1 (Wasserman 2.14.6)' }),
]);

DRILLS('2.1', [
  { k: '01', lvl: 1, q: R`$X$ = number of heads in 3 fair tosses. Find $F_X(1)$.`, h: [R`$P(X=0) + P(X=1)$.`], a: '1/2', s: R`$\frac18 + \frac38 = \frac12$.` },
  { k: '02', lvl: 1, q: R`A discrete $X$ has $F(1) = 0.2$, $F(2) = 0.5$, $F(3) = 1$, and is supported on $\{1,2,3\}$. Find $P(X = 2)$.`, h: [R`Jump at 2.`], a: '0.3', s: R`$F(2) - F(1) = 0.3$.` },
  { k: '03', lvl: 1, q: R`$F(x) = x^3$ on $[0,1]$. Find $P(X>\tfrac12)$.`, h: [R`$1 - F(\tfrac12)$.`], a: '7/8', s: R`$1 - \frac18 = \frac78$.` },
  { k: '04', lvl: 2, q: R`Is $F(x) = \frac{1 + \tanh x}{2}$ (for all $x\in\R$) a valid CDF?`, h: [R`$\tanh$ is increasing, continuous, with limits $\pm1$.`], a: { choice: ['Valid', 'Not valid'], v: 0 },
    s: R`Increasing ✓, limits $\frac{1-1}{2} = 0$ and $\frac{1+1}2 = 1$ ✓, continuous ✓. Valid (the logistic distribution with scale $\tfrac12$).` },
  { k: '05', lvl: 2, q: R`$F(x) = 1 - \frac1x$ for $x\ge1$. Find $P(X>4)$ and $P(X = 1)$.`, h: [R`Is there a jump at 1?`], a: [['$P(X>4)$', '1/4'], ['$P(X=1)$', '0']], s: R`$1 - F(4) = \frac14$. $F(1) = 0 = F(1^-)$, so no jump: $P(X=1) = 0$.` },
  { k: '06', lvl: 2, q: R`$F(x) = 0$ for $x<0$ and $F(x) = 0.3 + 0.7(1 - e^{-x})$ for $x\ge0$. Find $P(X=0)$ and $P(X\le1)$.`, h: [R`Jump at 0.`], a: [['$P(X=0)$', '0.3'], [R`$P(X\le1)$`, '0.3+0.7*(1-exp(-1))']],
    s: R`Jump at 0: $F(0) - F(0^-) = 0.3$. $P(X\le1) = F(1) = 0.3 + 0.7(1-e^{-1})\approx0.742$. (E.g. "waiting time" that is 0 with probability $0.3$.)` },
  { k: '07', lvl: 2, q: R`Find $c$ so that $F(x) = \frac12 + c\arctan x$ is a CDF.`, h: [R`$\arctan x\to\pm\frac\pi2$.`], a: '1/pi', s: R`Need $\frac12 + c\frac\pi2 = 1$, so $c = \frac1\pi$ (the Cauchy CDF).` },
  { k: '08', lvl: 1, q: R`Roll two fair dice; $X$ = the larger value. Find $F_X(3)$.`, h: [R`Both dice $\le3$.`], a: '1/4', s: R`$P(\max\le3) = \left(\frac36\right)^2 = \frac14$.` },
  { k: '09', lvl: 2, q: R`$X\sim\operatorname{Poisson}(1)$. Find $P(X<1)$ and $P(X\le1)$.`, h: [R`For discrete variables, $<$ and $\le$ differ.`], a: [['$P(X<1)$', 'exp(-1)'], [R`$P(X\le1)$`, '2*exp(-1)']],
    s: R`$P(X<1) = P(X=0) = e^{-1}$. $P(X\le1) = e^{-1} + e^{-1} = 2e^{-1}$. In terms of the CDF: $P(X<x) = F(x^-)$.` },
  { k: '10', lvl: 3, q: R`Using continuity of probability, show $P(X<x) = \lim_{n\to\infty}F(x - \tfrac1n)$. For $F$ from the "mixed" example ($\frac x2$ on $[0,1)$, $\frac34$ on $[1,2)$, $1$ after), compute $P(X<1)$.`,
    h: [R`$\{X\le x - \frac1n\}\uparrow\{X<x\}$.`], a: '1/2',
    s: R`The events $\{X\le x-\frac1n\}$ increase to $\{X<x\}$, so $P(X<x) = \lim F(x-\frac1n) = F(x^-)$. Here $F(1^-) = \frac12$.` },
]);
