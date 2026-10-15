HW({ id: 'hw6', title: 'Homework 6', summary: 'Inequalities (Ch.4). B due Oct 21: no official solutions, written here.',
  intro: R`Topics: Chapter 4. The B problems are **due Oct 21, 8:30** on Blackboard, the same morning as the midterm. **There are no official solutions**, so these were written from scratch. The B problems are graded work: attempt them on your own first, and only then compare with these solutions. The course policy says solutions must not be copied. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', ref: 't4.1-f' },
  { k: 'A2', ref: 't4.3-a' },
  { k: 'A3', ref: 't4.5-f' },
  { k: 'B1', ref: 't4.1-i' },
  { k: 'B2', ref: 't4.2-e' },
  { k: 'B3 (a)', ref: 't4.5-c' },
  { k: 'B3 (b)–(c)', ref: 't4.5-d' },
  { k: 'B3 (d)', ref: 't4.5-e' },
  { k: 'C1', ref: 't4.3-e' },
  { k: 'C2', ref: 't4.4-f' },
  { k: 'C3', topic: '4.4', lvl: 4, q: R`Let $a<b$ and $Y = a\,\mathbb 1(X<a) + X\,\mathbb 1(a\le X\le b) + b\,\mathbb 1(X>b)$: "$X$ clipped to $[a,b]$". If $E|X|<\infty$, prove that for $1\le p<\infty$:
$$E|X - EX|^p\ \ge\ E|Y-EY|^p.$$`,
    h: [R`Write $Y = g(X)$ with $g(x) = \min(\max(x,a),b)$. Then $g$ is non-decreasing **and** $x - g(x)$ is non-decreasing (check the three pieces).`, R`Let $U = Y - EY$ and $W = (X - EX) - (Y - EY)$, so $X - EX = U + W$ with $E(W) = 0$. Both $U$ and $W$ are non-decreasing functions of $X$.`, R`$\varphi(u) = |u|^p$ is convex: $\varphi(u+w)\ge\varphi(u) + \varphi'(u)w$, where $\varphi'$ is a non-decreasing (sub)derivative.`, R`Chebyshev's association inequality: if $f, h$ are both non-decreasing, $E[f(X)h(X)]\ge E[f(X)]E[h(X)]$. Proof: $E[(f(X)-f(X'))(h(X)-h(X'))]\ge0$ for an iid copy $X'$.`],
    s: R`**Setup.** $Y = g(X)$ with $g(x) = \min(\max(x,a),b)$. $Y$ is bounded, so all its moments exist. Note:
<ul><li>$g$ is non-decreasing;</li><li>$x - g(x)$ equals $x - a$ for $x<a$, $0$ on $[a,b]$, and $x - b$ for $x>b$. So it is also non-decreasing.</li></ul>
Let $U = Y - EY$ and $W = (X - EX) - (Y-EY) = \big(X - g(X)\big) - E\big(X - g(X)\big)$. Then $X - EX = U + W$, $E(W) = 0$, and $U$, $W$ are both non-decreasing functions of $X$.

**Convexity.** $\varphi(u) = |u|^p$ is convex for $p\ge1$, with a non-decreasing subderivative $\varphi'(u) = p|u|^{p-1}\operatorname{sign}(u)$. The tangent-line inequality gives, pointwise,
$$|U + W|^p\ \ge\ |U|^p + \varphi'(U)\,W.$$
Take expectations ($E|X|<\infty$ and boundedness of $Y$ make the terms well-defined; if $E|X - EX|^p = \infty$ there is nothing to prove):
$$E|X-EX|^p\ \ge\ E|Y - EY|^p + E\big[\varphi'(U)W\big].$$

**The last term is $\ge0$.** $\varphi'(U) = \varphi'(g(X) - EY)$ and $W$ are both non-decreasing functions of $X$. By Chebyshev's association inequality,
$$E[\varphi'(U)W]\ \ge\ E[\varphi'(U)]\,E[W] = 0.$$
(Proof of association: with $X'$ an independent copy of $X$, $(f(X) - f(X'))(h(X) - h(X'))\ge0$ always, since both factors have the sign of $X - X'$. Taking expectations gives $2E[fh] - 2E[f]E[h]\ge0$.)

Hence $E|X - EX|^p\ge E|Y - EY|^p$. $\blacksquare$

*Intuition:* clipping pulls extreme values toward the middle, so every measure of spread around the mean shrinks. For $p = 2$ there is a one-line proof: $\operatorname{var}(Y)\le E[(Y - g(\mu))^2]\le E[(X-\mu)^2]$, because $|g(x) - g(\mu)|\le|x-\mu|$.`, src: 'HW6 C3 (solution written for this app)' },
]);
