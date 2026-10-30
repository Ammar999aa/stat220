TOPIC({ id: '2.4', ch: 2, title: 'Important discrete distributions', summary: 'Point mass, discrete uniform, Bernoulli, Binomial, Geometric, Poisson, Hypergeometric; Poisson as a limit.' }, [
R`A handful of named distributions show up again and again. For each one, know the **story** (what it counts), the **PMF**, and the **support**. The means and variances come in Chapter 3. Watch the support of the Geometric in this course: it starts at 1.`,
DEF('Point mass and discrete uniform', R`**Point mass at $a$:** $P(X = a) = 1$. CDF $F(x) = \mathbb 1\{x\ge a\}$.

**Discrete uniform on $\{1,\dots,k\}$:** $f(x) = \frac1k$ for $x = 1,\dots,k$. CDF $F(x) = \frac{\lfloor x\rfloor}{k}$ for $1\le x<k$.`),
P({ k: 'a', lvl: 1, q: R`$X$ is uniform on $\{1,\dots,10\}$. Find $P(X\le3)$ and $F(3.7)$.`, h: [R`$F(x) = \lfloor x\rfloor/k$.`], a: [[R`$P(X\le3)$`, '0.3'], ['$F(3.7)$', '0.3']], s: R`Both equal $\frac3{10}$: the CDF is flat between integers.` }),
DEF(R`Bernoulli and Binomial`, R`**Bernoulli$(p)$:** one trial with success probability $p$. $f(1) = p$, $f(0) = 1-p$, i.e. $f(x) = p^x(1-p)^{1-x}$, $x\in\{0,1\}$.

**Binomial$(n,p)$:** the number of successes in $n$ **independent** Bernoulli$(p)$ trials:
$$f(x) = \binom nx p^x(1-p)^{n-x},\quad x = 0,1,\dots,n.$$
$\binom nx$ counts which $x$ of the $n$ trials are the successes. Equivalently $X = \sum_{i=1}^nX_i$ with $X_i\iid\operatorname{Ber}(p)$.`),
P({ k: 'b', lvl: 1, q: R`$X\sim\operatorname{Bin}(5,\tfrac12)$. Find $P(X = 2)$.`, h: [R`$\binom52 = 10$.`], a: '10/32', s: R`$\binom52\left(\frac12\right)^5 = \frac{10}{32} = \frac5{16}$.` }),
P({ k: 'c', lvl: 1, q: R`10 independent trials with success probability 0.1. Find $P(\text{at least one success})$.`, h: [R`Complement: no successes.`], a: '1-0.9^10', s: R`$1 - 0.9^{10}\approx0.651$.` }),
THM('Binomial additivity', R`If $X_1\sim\operatorname{Bin}(n_1,p)$ and $X_2\sim\operatorname{Bin}(n_2,p)$ are independent, then $X_1+X_2\sim\operatorname{Bin}(n_1+n_2,p)$. (Same $p$ needed: it's just counting successes in $n_1+n_2$ trials.)`),
P({ k: 'd', lvl: 2, q: R`$X_1\sim\operatorname{Bin}(3,\frac12)$ and $X_2\sim\operatorname{Bin}(4,\frac12)$ independent. Find $P(X_1+X_2 = 7)$.`, h: [R`$X_1+X_2\sim\operatorname{Bin}(7,\frac12)$.`], a: '1/128', s: R`All 7 trials succeed: $2^{-7} = \frac1{128}$.` }),
DEF('Geometric', R`$X\sim\operatorname{Geom}(p)$ is the **number of trials until the first success** (including that success):
$$f(x) = (1-p)^{x-1}p,\quad x = 1,2,3,\dots$$
Tail: $P(X>k) = (1-p)^k$ (the first $k$ trials all fail).`),
P({ k: 'e', lvl: 1, q: R`$X\sim\operatorname{Geom}(0.2)$. Find $P(X>3)$.`, h: [R`First three trials fail.`], a: '0.512', s: R`$0.8^3 = 0.512$.` }),
P({ k: 'f', lvl: 2, q: R`$X\sim\operatorname{Geom}(p)$. Show $P(X>m+k\mid X>m) = P(X>k)$ (memoryless). Evaluate for $p = \tfrac12$, $m = 2$, $k = 3$.`, h: [R`$\frac{(1-p)^{m+k}}{(1-p)^m}$.`], a: '1/8',
  s: R`$P(X>m+k\mid X>m) = \frac{P(X>m+k)}{P(X>m)} = \frac{(1-p)^{m+k}}{(1-p)^m} = (1-p)^k = P(X>k)$. With $p=\frac12$, $k=3$: $\frac18$.` }),
DEF('Poisson', R`$X\sim\operatorname{Poisson}(\lambda)$, $\lambda>0$, counts rare events (calls per hour, typos per page):
$$f(x) = e^{-\lambda}\frac{\lambda^x}{x!},\quad x = 0,1,2,\dots$$
It sums to 1 because $\sum_x\frac{\lambda^x}{x!} = e^\lambda$.`),
P({ k: 'g', lvl: 1, q: R`$X\sim\operatorname{Poisson}(2)$. Find $P(X = 3)$.`, h: [R`$e^{-2}2^3/3!$.`], a: '8/6*exp(-2)', s: R`$e^{-2}\frac{8}{6} = \frac43e^{-2}\approx0.180$.` }),
THM('Law of small numbers', R`If $X_n\sim\operatorname{Bin}(n,p_n)$ with $n\to\infty$, $p_n\to0$ and $np_n\to\lambda>0$, then $P(X_n = x)\to e^{-\lambda}\frac{\lambda^x}{x!}$. Many trials, each very unlikely: the count is approximately Poisson with $\lambda = np$.`),
P({ k: 'h', lvl: 2, q: R`$X\sim\operatorname{Bin}(1000, 0.002)$. Use the Poisson approximation for $P(X = 0)$.`, h: [R`$\lambda = np = 2$.`], a: 'exp(-2)', s: R`$P(X = 0)\approx e^{-2}\approx0.135$ (exact: $0.998^{1000}\approx0.1351$).` }),
P({ k: 'i', lvl: 3, q: R`Prove the law of small numbers for $x = 0$: with $p_n = \lambda/n$, show $P(X_n = 0)\to e^{-\lambda}$. Then enter $\lim_{n\to\infty}P(X_n = 1)$ for $\lambda = 3$.`,
  h: [R`$(1 - \lambda/n)^n\to e^{-\lambda}$.`, R`$P(X_n=1) = n\frac\lambda n(1-\frac\lambda n)^{n-1}$.`], a: '3*exp(-3)',
  s: R`$P(X_n = 0) = (1-\frac\lambda n)^n\to e^{-\lambda}$. $P(X_n = 1) = \lambda(1-\frac\lambda n)^{n-1}\to\lambda e^{-\lambda} = 3e^{-3}$, the Poisson PMF at 1.` }),
DEF('Hypergeometric', R`Draw $n$ items **without replacement** from $N$ items, of which $K$ are "special". The number of special items drawn has
$$P(X = x) = \frac{\binom Kx\binom{N-K}{n-x}}{\binom Nn}.$$
(Without replacement, the draws are *not* independent, so this is not binomial.)`),
P({ k: 'j', lvl: 2, q: R`30 microwave ovens, 5 defective. You pick 4 at random without replacement. Find $P(X = 1)$, where $X$ = number of defective ones picked.`, h: [R`$\binom51\binom{25}3/\binom{30}4$, with $\binom{25}{3} = 2300$ and $\binom{30}4 = 27405$.`], a: '5*2300/27405',
  s: R`$P(X=1) = \frac{5\cdot2300}{27405} = \frac{11500}{27405}\approx0.420$.`, src: 'HW2 A1' }),
]);

DRILLS('2.4', [
  { k: '01', lvl: 1, q: R`$X\sim\operatorname{Bin}(4,0.3)$. Find $P(X=0)$.`, h: [R`$0.7^4$.`], a: '0.7^4', s: R`$0.2401$.` },
  { k: '02', lvl: 2, q: R`$X\sim\operatorname{Bin}(6,\frac12)$. Find $P(X\ge5)$.`, h: [R`$\binom65 + \binom66$ over $64$.`], a: '7/64', s: R`$\frac{6+1}{64} = \frac7{64}$.` },
  { k: '03', lvl: 1, q: R`Roll a fair die until the first six. Probability the first six is on roll 3?`, h: [R`$\operatorname{Geom}(\frac16)$.`], a: '25/216', s: R`$\left(\frac56\right)^2\frac16 = \frac{25}{216}$.` },
  { k: '04', lvl: 1, q: R`$X\sim\operatorname{Poisson}(3)$. Find $P(X\le1)$.`, h: [R`$e^{-3}(1+3)$.`], a: '4*exp(-3)', s: R`$4e^{-3}\approx0.199$.` },
  { k: '05', lvl: 2, q: R`$X\sim\operatorname{Bin}(500, 0.004)$. Poisson approximation of $P(X = 2)$?`, h: [R`$\lambda = 2$.`], a: '2*exp(-2)', s: R`$e^{-2}\frac{2^2}{2!} = 2e^{-2}\approx0.271$.` },
  { k: '06', lvl: 2, q: R`10 cards, 4 red. Draw 3 without replacement. $P(\text{exactly 2 red})$?`, h: [R`Hypergeometric.`], a: '3/10', s: R`$\frac{\binom42\binom61}{\binom{10}3} = \frac{36}{120} = \frac3{10}$.` },
  { k: '07', lvl: 1, q: R`$X\sim\operatorname{Geom}(\frac12)$. Find $P(X>5\mid X>2)$.`, h: [R`Memoryless.`], a: '1/8', s: R`$P(X>3) = \frac18$.` },
  { k: '08', lvl: 1, q: R`$X\sim\operatorname{Ber}(0.7)$. Find $F(0.5)$.`, h: [R`$P(X\le0.5) = P(X=0)$.`], a: '0.3', s: R`$0.3$.` },
  { k: '09', lvl: 2, q: R`$X\sim\operatorname{Poisson}(\lambda)$ with $P(X=1) = P(X=2)$. Find $\lambda$.`, h: [R`$\lambda e^{-\lambda} = \frac{\lambda^2}{2}e^{-\lambda}$.`], a: '2', s: R`$\lambda = \frac{\lambda^2}2\Rightarrow\lambda = 2$.` },
  { k: '10', lvl: 1, q: R`$X\sim\operatorname{Bin}(5,\frac12)$ and $Y\sim\operatorname{Bin}(5,\frac12)$ independent. $P(X+Y = 10)$?`, h: [R`$\operatorname{Bin}(10,\frac12)$.`], a: '1/1024', s: R`$2^{-10}$.` },
  { k: '11', lvl: 1, q: R`$X$ is a point mass at 3. Find $F(2.9)$ and $F(3)$.`, h: [R`Right-continuous step at 3.`], a: [['$F(2.9)$', '0'], ['$F(3)$', '1']], s: R`$0$ and $1$.` },
  { k: '12', lvl: 3, q: R`A box has 4 red and 6 blue balls. Draw **with** replacement 5 times. $P(\text{exactly 2 red})$?`, h: [R`$\operatorname{Bin}(5, 0.4)$.`], a: '10*0.4^2*0.6^3', s: R`$\binom52(0.4)^2(0.6)^3 = 10\cdot0.16\cdot0.216 = 0.3456$.` },
  { k: '13', lvl: 3, q: R`Roll a fair die until the first six; $X$ = number of rolls. Find $P(X\text{ is even})$ and $P(X\le4\mid X\text{ even})$.`,
    h: [R`$X\sim\operatorname{Geom}(\frac16)$ on $\{1,2,\dots\}$: $P(X = k) = \left(\frac56\right)^{k-1}\frac16$.`, R`$P(X\text{ even}) = \sum_{m\ge1}\left(\frac56\right)^{2m-1}\frac16$ is a geometric series with ratio $\left(\frac56\right)^2$.`, R`$\{X\le4\}\cap\{X\text{ even}\} = \{X\in\{2,4\}\}$.`],
    a: [[R`$P(X\text{ even})$`, '5/11'], [R`$P(X\le4\mid X\text{ even})$`, '671/1296']],
    s: R`**Even.** With $q = \frac56$, $p = \frac16$:
$$P(X\text{ even}) = \sum_{m\ge1}q^{2m-1}p = \frac{qp}{1-q^2} = \frac{q\,p}{(1-q)(1+q)} = \frac{q}{1+q} = \frac{5/6}{11/6} = \frac5{11}.$$
(Slightly less than $\frac12$: odd values, starting with $X = 1$, are a bit more likely.)

**Conditional.** $P(X\in\{2,4\}) = \frac56\cdot\frac16 + \left(\frac56\right)^3\frac16 = \frac{5}{36} + \frac{125}{1296} = \frac{305}{1296}$. So
$$P(X\le4\mid X\text{ even}) = \frac{305/1296}{5/11} = \frac{305\cdot11}{1296\cdot5} = \frac{671}{1296}\approx0.518.$$` },
  { k: '14', lvl: 4, q: R`The number of flaws in a 4 m piece of cable is $\operatorname{Poisson}(2)$, independently from piece to piece. A piece is accepted if it has at most one flaw. (a) Find $p = P(\text{a piece is accepted})$. (b) Five pieces are inspected: find $P(\text{at least 2 accepted})$. (c) Pieces are inspected one by one: find $P(\text{the first rejected piece is the 3rd})$. (d) Given that a piece is rejected, find the probability that it has exactly 2 flaws.`,
    h: [R`(a) $P(N\le1) = e^{-2}(1 + 2)$.`, R`(b) The number accepted among 5 independent pieces is $\operatorname{Bin}(5,p)$. Use the complement: $1 - P(0) - P(1)$.`, R`(c) The index of the first rejected piece is $\operatorname{Geom}(1-p)$: "success" now means *rejected*.`, R`(d) $P(N = 2\mid N\ge2) = \frac{P(N=2)}{1 - P(N\le1)}$.`],
    a: [['$p$', '3*exp(-2)'], ['(b)', '1-(1-3*exp(-2))^5-5*3*exp(-2)*(1-3*exp(-2))^4'], ['(c)', '(3*exp(-2))^2*(1-3*exp(-2))'], ['(d)', '2*exp(-2)/(1-3*exp(-2))']],
    s: R`Let $N\sim\operatorname{Poisson}(2)$ be the flaws in one piece.

**(a)** $p = P(N = 0) + P(N = 1) = e^{-2} + 2e^{-2} = 3e^{-2}\approx0.406$.

**(b)** Pieces are independent, each accepted w.p. $p$, so $A\sim\operatorname{Bin}(5,p)$ accepted pieces:
$$P(A\ge2) = 1 - (1-p)^5 - 5p(1-p)^4\approx1 - 0.0739 - 0.2527 = 0.673.$$

**(c)** The first rejection is at piece 3 iff pieces 1 and 2 are accepted and piece 3 is rejected. With $R\sim\operatorname{Geom}(1-p)$:
$$P(R = 3) = p^2(1-p) = 9e^{-4}(1 - 3e^{-2})\approx0.098.$$
(Trap: $(1-p)^2p$ would be "first *acceptance* at piece 3".)

**(d)** Rejected means $N\ge2$, and $\{N = 2\}\subseteq\{N\ge2\}$:
$$P(N = 2\mid N\ge2) = \frac{e^{-2}2^2/2!}{1 - 3e^{-2}} = \frac{2e^{-2}}{1 - 3e^{-2}}\approx0.456.$$` },
]);
