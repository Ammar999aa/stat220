TOPIC({ id: '4.4', ch: 4, title: 'Jensen’s inequality', summary: 'E g(X) ≥ g(E X) for convex g; consequences incl. HM ≤ GM ≤ AM.' }, [
R`A function is **convex** if it curves upward like a bowl ($x^2$, $e^x$, $1/x$ on $x>0$, $|x|$). Jensen's inequality says that for convex $g$, **averaging after applying $g$ gives more than applying $g$ after averaging**.

Picture two points on the bowl: the midpoint of the chord between them lies *above* the curve.`,
DEF('Convex and concave', R`$g$ is **convex** if $g(\lambda x + (1-\lambda)y)\le\lambda g(x) + (1-\lambda)g(y)$ for all $x,y$ and $\lambda\in[0,1]$ (the chord lies above the graph). If $g$ is twice differentiable, convex $\iff g''\ge0$. $g$ is **concave** if $-g$ is convex ($\log x$, $\sqrt x$).`),
THM('Jensen’s inequality', R`If $g$ is convex, then $E\big(g(X)\big)\ge g\big(E(X)\big)$.
If $g$ is concave, then $E\big(g(X)\big)\le g\big(E(X)\big)$.`),
R`*Proof (slides).* Let $\mu = E(X)$ and let $L(x) = a + bx$ be the **tangent line** to $g$ at $\mu$. Convexity means $g$ lies above all its tangents: $g(x)\ge L(x)$ for all $x$. Hence
$$E(g(X))\ge E(L(X)) = a + bE(X) = L(\mu) = g(\mu),$$
using that $E$ is linear and that the tangent touches $g$ at $\mu$.`,
R`<figure class="fig"><svg viewBox="0 0 260 160" width="260" height="160" role="img" aria-label="Convex function above its tangent"><line class="ax" x1="10" y1="145" x2="250" y2="145"/><path class="curve" d="M20,20 Q130,250 240,20"/><line class="hl" x1="20" y1="120" x2="240" y2="120"/><circle class="dot" cx="130" cy="135" r="3.5"/><text x="135" y="115" class="t-warn">tangent L at μ</text><text x="185" y="40" class="t-acc">g convex</text></svg><figcaption>A convex $g$ stays above its tangent at $\mu = E(X)$, so $E\,g(X)\ge E\,L(X) = g(\mu)$.</figcaption></figure>`,
P({ k: 'a', lvl: 1, q: R`$E(X) = 3$. What lower bound does Jensen give for $E(X^2)$?`, h: [R`$x^2$ is convex.`], a: '9', s: R`$E(X^2)\ge(E X)^2 = 9$, which is equivalent to $\operatorname{var}(X)\ge0$.` }),
P({ k: 'b', lvl: 2, q: R`$X\sim\operatorname{Unif}(1,3)$. Check Jensen for $g(x) = 1/x$: compute $E(1/X)$ and compare to $1/E(X)$.`, h: [R`$E(1/X) = \frac12\log3$.`], a: [['$E(1/X)$', 'log(3)/2'], ['$1/E(X)$', '1/2']],
  s: R`$E(1/X) = \frac12\int_1^3\frac{\dd x}{x} = \frac{\log3}2\approx0.549\ge\frac12 = \frac{1}{E(X)}$ ✓, since $1/x$ is convex on $x>0$.` }),
P({ k: 'c', lvl: 1, q: R`$X>0$ with $E(X) = 4$. Upper bound for $E(\sqrt X)$?`, h: [R`$\sqrt x$ is concave.`], a: '2', s: R`$E\sqrt X\le\sqrt{E X} = 2$.` }),
P({ k: 'd', lvl: 2, q: R`Slides example: $g(x) = -\log x$ is convex on $x>0$. What does Jensen say about $E(\log X)$? If $E(X) = e^2$, give the bound on $E(\log X)$.`, h: [R`$E(-\log X)\ge-\log E(X)$.`], a: '2', s: R`$E(\log X)\le\log E(X) = 2$.` }),
P({ k: 'e', lvl: 2, q: R`$X\sim N(0,1)$. Compare $E(e^X) = e^{1/2}$ with $e^{E(X)}$. Which is bigger, and why?`, h: [R`$e^x$ is convex.`], a: { choice: ['E(e^X) is bigger', 'e^{E X} is bigger', 'Equal'], v: 0 }, s: R`$e^{1/2}\approx1.65 > e^0 = 1$, as Jensen predicts for the convex $e^x$.` }),
P({ k: 'f', lvl: 4, q: R`(HW6 C2) For positive $a_1,\dots,a_n$, prove with Jensen:
$$\underbrace{\frac{n}{\sum_i 1/a_i}}_{\text{HM}}\le\underbrace{\Big(\prod_ia_i\Big)^{1/n}}_{\text{GM}}\le\underbrace{\frac1n\sum_ia_i}_{\text{AM}}.$$
Then compute HM, GM and AM for $(1, 4)$.`,
  h: [R`Let $X$ take each value $a_i$ with probability $\frac1n$. Then AM $= E(X)$ and $\log\text{GM} = E(\log X)$.`, R`GM ≤ AM: $\log$ is concave, so $E\log X\le\log EX$.`, R`HM ≤ GM: apply GM ≤ AM to the numbers $1/a_i$.`],
  a: [['HM', '1.6'], ['GM', '2'], ['AM', '2.5']],
  s: R`Let $X$ be uniform on $\{a_1,\dots,a_n\}$.

**GM ≤ AM.** $\log$ is concave, so by Jensen $\frac1n\sum\log a_i = E(\log X)\le\log E(X) = \log\left(\frac1n\sum a_i\right)$. The left side is $\log\left(\prod a_i\right)^{1/n}$. Exponentiating (an increasing map) gives GM ≤ AM.

**HM ≤ GM.** Apply GM ≤ AM to $b_i = 1/a_i>0$: $\left(\prod\frac1{a_i}\right)^{1/n}\le\frac1n\sum\frac1{a_i}$, i.e. $\frac{1}{\text{GM}}\le\frac1{\text{HM}}$, so HM ≤ GM.

For $(1,4)$: HM $= \frac{2}{1 + 1/4} = 1.6$, GM $= 2$, AM $= 2.5$.`, src: 'HW6 C2' }),
WARN('Equality case', R`If $g$ is *strictly* convex, equality $E g(X) = g(EX)$ holds only when $X$ is constant (with probability 1).`),
]);

DRILLS('4.4', [
  { k: '01', lvl: 1, q: R`$E(X) = 2$. Jensen lower bound for $E(X^4)$?`, h: [R`$x^4$ is convex.`], a: '16', s: R`$E(X^4)\ge2^4 = 16$.` },
  { k: '02', lvl: 1, q: R`$X>0$ with $E(X) = 5$. Lower bound for $E(1/X)$?`, h: [R`$1/x$ convex on $(0,\infty)$.`], a: '1/5', s: R`$E(1/X)\ge\frac15$.` },
  { k: '03', lvl: 1, q: R`$X>0$ with $E(X) = e$. Upper bound for $E(\log X)$?`, h: [R`$\log$ concave.`], a: '1', s: R`$E\log X\le\log e = 1$.` },
  { k: '04', lvl: 2, q: R`$X\sim\operatorname{Exp}(1)$. Compute $E(e^{X/2})$ and compare with $e^{E(X)/2}$.`, h: [R`$\int_0^\infty e^{x/2}e^{-x}\dd x$.`], a: [[R`$E(e^{X/2})$`, '2'], [R`$e^{E(X)/2}$`, 'exp(1/2)']], s: R`$E(e^{X/2}) = 2\ge e^{1/2}\approx1.65$ ✓.` },
  { k: '05', lvl: 2, q: R`For the numbers $2$ and $8$, compute HM, GM, AM.`, h: [R`HM $= \frac{2}{1/2+1/8}$.`], a: [['HM', '3.2'], ['GM', '4'], ['AM', '5']], s: R`$3.2\le4\le5$ ✓.` },
  { k: '06', lvl: 1, q: R`Is $g(x) = -\sqrt x$ convex or concave on $(0,\infty)$?`, h: [R`$\sqrt x$ is concave.`], a: { choice: ['Convex', 'Concave'], v: 0 }, s: R`Convex (minus a concave function).` },
  { k: '07', lvl: 2, q: R`$E(X) = -1$. Lower bound for $E(\max(X,0))$ from Jensen?`, h: [R`$\max(x,0)$ is convex.`], a: '0', s: R`$E\max(X,0)\ge\max(EX,0) = 0$. (Trivial here, but with $E(X) = 2$ you'd get $\ge2$.)` },
  { k: '08', lvl: 1, q: R`If $g$ is strictly convex and $E g(X) = g(E X)$, what can you conclude about $X$?`, h: [R`Equality case.`], a: { choice: ['X is constant (a.s.)', 'X is symmetric', 'Nothing'], v: 0 }, s: R`$X$ is almost surely constant.` },
  { k: '09', lvl: 2, q: R`Show $E|X|\ge|E(X)|$. If $X$ takes values $-3$ and $1$ with probability $\frac12$ each, compute both sides.`, h: [R`$|x|$ is convex.`], a: [['$E|X|$', '2'], ['$|E X|$', '1']], s: R`Jensen with $g = |\cdot|$. Here $E|X| = 2\ge|{-1}| = 1$.` },
  { k: '10', lvl: 3, q: R`$X_1,\dots,X_n$ iid with variance $\sigma^2$, and $S^2 = \frac1{n-1}\sum(X_i - \bar X)^2$ is unbiased: $E(S^2) = \sigma^2$. (a) Is the sample standard deviation $S$ an unbiased estimator of $\sigma$? Use Jensen. (b) For $n = 2$ and $X_i\sim N(0,1)$, compute $E(S)$ exactly.`,
    h: [R`$S = \sqrt{S^2}$ and $\sqrt{\cdot}$ is **strictly** concave. Jensen: $E\sqrt{S^2}\le\sqrt{E(S^2)}$. When is it an equality?`, R`For $n = 2$: $\bar X = \frac{X_1+X_2}2$, so $(X_1 - \bar X)^2 + (X_2 - \bar X)^2 = \frac{(X_1 - X_2)^2}{2}$ and $S = \frac{|X_1 - X_2|}{\sqrt2}$.`, R`$X_1 - X_2\sim N(0,2)$, and for $W\sim N(0,\tau^2)$, $E|W| = \tau\sqrt{2/\pi}$.`],
    a: [['(a)', { choice: ['Unbiased: E(S) = σ', 'Biased downward: E(S) < σ', 'Biased upward: E(S) > σ'], v: 1 }], ['(b) E(S)', 'sqrt(2/pi)']],
    s: R`**(a)** Since $\sqrt{\cdot}$ is concave, Jensen gives $E(S) = E\sqrt{S^2}\le\sqrt{E(S^2)} = \sigma$. Because $\sqrt{\cdot}$ is strictly concave, equality would need $S^2$ to be constant, which it is not (for any non-degenerate distribution). So $E(S)<\sigma$: $S$ **underestimates** $\sigma$ on average, even though $S^2$ is unbiased for $\sigma^2$. Unbiasedness is not preserved by nonlinear maps.

**(b)** With $n = 2$, $X_1 - \bar X = \frac{X_1 - X_2}{2} = -(X_2 - \bar X)$, so $S^2 = \frac{1}{1}\cdot2\cdot\frac{(X_1 - X_2)^2}{4} = \frac{(X_1-X_2)^2}{2}$ and $S = \frac{|X_1 - X_2|}{\sqrt2}$. Now $W = X_1 - X_2\sim N(0,2)$, i.e. $W = \sqrt2Z$, and $E|Z| = 2\int_0^\infty z\frac{e^{-z^2/2}}{\sqrt{2\pi}}\dd z = \sqrt{\frac2\pi}$. Hence
$$E(S) = \frac{\sqrt2\,E|Z|}{\sqrt2} = \sqrt{\frac2\pi}\approx0.798<1 = \sigma.$$` },
  { k: '11', lvl: 4, q: R`(Gibbs' inequality) Let $p = (p_1,\dots,p_k)$ and $q = (q_1,\dots,q_k)$ be pmfs on $\{1,\dots,k\}$ with all entries positive. The Kullback–Leibler divergence is $D(p\,\|\,q) = \sum_ip_i\log\frac{p_i}{q_i}$.
(a) Prove $D(p\,\|\,q)\ge0$, with equality iff $p = q$.
(b) Compute $D(p\,\|\,q)$ and $D(q\,\|\,p)$ for $p = \left(\frac12,\frac14,\frac14\right)$ and $q = \left(\frac13,\frac13,\frac13\right)$.
(c) As a corollary of (a) with $q$ uniform, what is the largest possible value of the entropy $H(p) = -\sum p_i\log p_i$ when $k = 3$?`,
    h: [R`Define a random variable: let $I\sim p$ (so $P(I = i) = p_i$) and $X = \frac{q_I}{p_I}$. Then $-D(p\,\|\,q) = E(\log X)$.`, R`$\log$ is concave, so $E(\log X)\le\log E(X)$. Compute $E(X) = \sum_ip_i\frac{q_i}{p_i}$.`, R`Equality: $\log$ is strictly concave, so $X$ must be constant, i.e. $q_i = cp_i$ for all $i$; summing over $i$ forces $c = 1$.`, R`For (c): with $q_i = \frac1k$, $D(p\,\|\,q) = \log k - H(p)$.`],
    a: [[R`$D(p\,\|\,q)$`, 'log(3)-1.5*log(2)'], [R`$D(q\,\|\,p)$`, 'log(32/27)/3'], ['(c) max entropy', 'log(3)']],
    s: R`**(a)** Let $I$ take value $i$ with probability $p_i$, and $X = q_I/p_I>0$. Then
$$-D(p\,\|\,q) = \sum_ip_i\log\frac{q_i}{p_i} = E(\log X)\le\log E(X) = \log\sum_ip_i\frac{q_i}{p_i} = \log\sum_iq_i = \log1 = 0,$$
by Jensen ($\log$ concave). So $D(p\,\|\,q)\ge0$. Since $\log$ is strictly concave, equality requires $X$ to be constant: $q_i = cp_i$ for all $i$. Summing, $1 = c\cdot1$, so $c = 1$ and $p = q$. Conversely $p = q$ clearly gives 0.

**(b)** $D(p\,\|\,q) = \sum p_i\log(3p_i) = \log3 + \sum p_i\log p_i = \log3 + \frac12\log\frac12 + 2\cdot\frac14\log\frac14 = \log3 - \frac32\log2\approx0.0589$.

$D(q\,\|\,p) = \frac13\left[\log\frac{1/3}{1/2} + 2\log\frac{1/3}{1/4}\right] = \frac13\log\left(\frac23\cdot\frac{16}{9}\right) = \frac13\log\frac{32}{27}\approx0.0566$.

Both are positive, but they differ: KL divergence is **not symmetric**, so it is not a distance.

**(c)** With $q$ uniform, $D(p\,\|\,q) = \sum p_i\log(kp_i) = \log k - H(p)\ge0$, so $H(p)\le\log k$, with equality iff $p$ is uniform. For $k = 3$: $\max H = \log3\approx1.099$.` },
]);
