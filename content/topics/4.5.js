TOPIC({ id: '4.5', ch: 4, title: 'Cauchy–Schwarz, Hölder and friends', summary: 'Cauchy–Schwarz and |corr| ≤ 1; Young → Hölder → Cauchy–Schwarz and Lyapunov; Minkowski.' }, [
R`These inequalities bound expectations of **products** and **sums**. HW6 B3 chains them together, Young → Hölder → Cauchy–Schwarz and Lyapunov, so learn them as a family. Notation: $\|X\|_p = (E|X|^p)^{1/p}$.`,
THM('Cauchy–Schwarz', R`If $X, Y$ have finite variances, then
$$E|XY|\le\sqrt{E(X^2)\,E(Y^2)}.$$`),
R`*A self-contained proof.* For any real $t$, $0\le E\big[(|X| - t|Y|)^2\big] = E(X^2) - 2tE|XY| + t^2E(Y^2)$. This quadratic in $t$ is never negative, so its discriminant is $\le0$: $4(E|XY|)^2 - 4E(X^2)E(Y^2)\le0$.`,
P({ k: 'a', lvl: 1, q: R`$E(X^2) = 4$ and $E(Y^2) = 9$. Upper bound for $E|XY|$?`, h: [R`$\sqrt{4\cdot9}$.`], a: '6', s: R`$E|XY|\le6$.` }),
THM(R`Consequence: $|\operatorname{corr}|\le1$ (slides)`, R`Apply Cauchy–Schwarz to $X - EX$ and $Y - EY$, plus Jensen for $|\cdot|$:
$$|\operatorname{cov}(X,Y)| = |E[(X-EX)(Y-EY)]|\le E|(X-EX)(Y-EY)|\le\sqrt{\operatorname{var}(X)}\sqrt{\operatorname{var}(Y)}.$$
Dividing gives $-1\le\operatorname{corr}(X,Y)\le1$. Equality holds iff $Y$ is a linear function of $X$.`),
P({ k: 'b', lvl: 2, q: R`Could $\operatorname{var}(X) = 4$, $\operatorname{var}(Y) = 4$ and $\operatorname{cov}(X,Y) = 5$?`, h: [R`$|\operatorname{cov}|\le\sigma_X\sigma_Y = 4$.`], a: { choice: ['Possible', 'Impossible'], v: 1 }, s: R`Impossible: it would mean $\operatorname{corr} = 1.25>1$.` }),
H('Young → Hölder → Cauchy–Schwarz, Lyapunov (HW6 B3)'),
THM('Young’s inequality', R`For $a,b>0$ and $p,q>1$ with $\frac1p+\frac1q = 1$:
$$ab\le\frac{a^p}{p}+\frac{b^q}{q},$$
with equality iff $a^p = b^q$.`),
P({ k: 'c', lvl: 3, q: R`Prove Young's inequality using the concavity of $\log$. Then check it numerically for $a = 2$, $b = 3$, $p = q = 2$ (enter the right-hand side).`,
  h: [R`$\log(ab) = \frac1p\log a^p + \frac1q\log b^q$: a convex combination with weights $\frac1p,\frac1q$.`, R`Concavity: $\lambda\log u + (1-\lambda)\log v\le\log(\lambda u + (1-\lambda)v)$.`],
  a: '6.5',
  s: R`Since $\frac1p+\frac1q = 1$, concavity of $\log$ gives
$$\log(ab) = \frac1p\log(a^p) + \frac1q\log(b^q)\le\log\left(\frac{a^p}p + \frac{b^q}q\right).$$
Exponentiate: $ab\le\frac{a^p}{p}+\frac{b^q}{q}$. Equality in Jensen for strictly concave $\log$ requires $a^p = b^q$.

Check: $\frac{4}{2} + \frac92 = 6.5\ge6$ ✓.`, src: 'HW6 B3(a)' }),
THM('Hölder’s inequality', R`For $p,q>1$ with $\frac1p+\frac1q = 1$:
$$|E(XY)|\le E|XY|\le\left(E|X|^p\right)^{1/p}\left(E|Y|^q\right)^{1/q} = \|X\|_p\|Y\|_q.$$
Cauchy–Schwarz is the case $p = q = 2$.`),
P({ k: 'd', lvl: 4, q: R`Prove Hölder from Young. Then use it with $p = 3$, $q = \frac32$ to bound $E|XY|$ when $E|X|^3 = 8$ and $E|Y|^{3/2} = 1$.`,
  h: [R`Normalize: $A = \frac{|X|}{\|X\|_p}$, $B = \frac{|Y|}{\|Y\|_q}$, so that $E(A^p) = E(B^q) = 1$.`, R`Young pointwise: $AB\le\frac{A^p}p + \frac{B^q}q$. Take expectations.`],
  a: '2',
  s: R`(If $\|X\|_p = 0$ or $\|Y\|_q = 0$, both sides are 0.) Let $A = |X|/\|X\|_p$ and $B = |Y|/\|Y\|_q$. By Young, pointwise $AB\le\frac{A^p}{p} + \frac{B^q}{q}$. Taking expectations:
$$\frac{E|XY|}{\|X\|_p\|Y\|_q} = E(AB)\le\frac{E(A^p)}{p} + \frac{E(B^q)}{q} = \frac1p + \frac1q = 1.$$
So $E|XY|\le\|X\|_p\|Y\|_q$. Also $|E(XY)|\le E|XY|$ (Jensen with $|\cdot|$).

Numerically: $8^{1/3}\cdot1^{2/3} = 2$.`, src: 'HW6 B3(b),(c)' }),
THM('Lyapunov’s inequality', R`For $0<r<s$: $\left(E|X|^r\right)^{1/r}\le\left(E|X|^s\right)^{1/s}$, i.e. $\|X\|_r\le\|X\|_s$. Higher "norms" are bigger.`),
P({ k: 'e', lvl: 4, q: R`Prove Lyapunov from Hölder. Then verify it for $X\sim\operatorname{Unif}(0,1)$, $r = 1$, $s = 2$: enter $\|X\|_1$ and $\|X\|_2$.`,
  h: [R`Write $E|X|^r = E(|X|^r\cdot1)$ and apply Hölder with $p = s/r>1$.`, R`$\|1\|_q = 1$.`],
  a: [[R`$\|X\|_1$`, '1/2'], [R`$\|X\|_2$`, '1/sqrt(3)']],
  s: R`Hölder with $p = \frac sr$ and $q = \frac{p}{p-1}$, applied to $|X|^r$ and $1$:
$$E|X|^r = E(|X|^r\cdot1)\le\left(E|X|^{rp}\right)^{1/p}(E1^q)^{1/q} = \left(E|X|^s\right)^{r/s}.$$
Taking the power $1/r$: $\|X\|_r\le\|X\|_s$.

For $\operatorname{Unif}(0,1)$: $\|X\|_1 = \frac12$, $\|X\|_2 = \sqrt{1/3}\approx0.577$ ✓.`, src: 'HW6 B3(d)' }),
THM(R`Minkowski’s inequality (triangle inequality for $\|\cdot\|_p$)`, R`For $1\le p<\infty$: $\left(E|X+Y|^p\right)^{1/p}\le\left(E|X|^p\right)^{1/p} + \left(E|Y|^p\right)^{1/p}$.`),
P({ k: 'f', lvl: 4, q: R`(HW6 A3) Prove Minkowski for $p>1$. Then: if $\|X\|_2 = 3$ and $\|Y\|_2 = 4$, what is the Minkowski bound on $\|X+Y\|_2$, and what is $\|X+Y\|_2$ exactly if $X, Y$ are independent with mean 0?`,
  h: [R`$|X+Y|^p\le|X||X+Y|^{p-1} + |Y||X+Y|^{p-1}$.`, R`Apply Hölder to each term with $q = \frac{p}{p-1}$: $E|X||X+Y|^{p-1}\le\|X\|_p\left(E|X+Y|^p\right)^{(p-1)/p}$.`, R`Divide both sides by $\left(E|X+Y|^p\right)^{(p-1)/p}$.`],
  a: [['bound', '7'], ['exact (indep., mean 0)', '5']],
  s: R`By the triangle inequality, $|X+Y|^p = |X+Y|\,|X+Y|^{p-1}\le|X|\,|X+Y|^{p-1} + |Y|\,|X+Y|^{p-1}$. Take expectations and apply Hölder with $q = \frac p{p-1}$ (so $(p-1)q = p$):
$$E|X+Y|^p\le\big(\|X\|_p + \|Y\|_p\big)\left(E|X+Y|^p\right)^{\frac{p-1}{p}}.$$
If $E|X+Y|^p = 0$ there is nothing to prove. Otherwise divide by $\left(E|X+Y|^p\right)^{(p-1)/p}$ to get $\left(E|X+Y|^p\right)^{1/p}\le\|X\|_p + \|Y\|_p$. (For $p=1$ it's just the triangle inequality.)

Numbers: bound $3+4 = 7$. If independent with mean 0, $E(X+Y)^2 = 9 + 16 = 25$, so $\|X+Y\|_2 = 5$.`, src: 'HW6 A3' }),
]);

DRILLS('4.5', [
  { k: '01', lvl: 1, q: R`$E(X^2) = 2$, $E(Y^2) = 8$. Cauchy–Schwarz bound on $E|XY|$?`, h: [R`$\sqrt{16}$.`], a: '4', s: R`$4$.` },
  { k: '02', lvl: 1, q: R`$\operatorname{var}(X) = 9$, $\operatorname{var}(Y) = 16$. Largest possible $|\operatorname{cov}(X,Y)|$?`, h: [R`$\sigma_X\sigma_Y$.`], a: '12', s: R`$3\cdot4 = 12$.` },
  { k: '03', lvl: 2, q: R`Hölder with $p = 3$, $q = \frac32$: $E|X|^3 = 27$ and $E|Y|^{3/2} = 8$. Bound $E|XY|$.`, h: [R`$27^{1/3}\cdot8^{2/3}$.`], a: '12', s: R`$3\cdot4 = 12$.` },
  { k: '04', lvl: 2, q: R`$E|X|^4 = 16$. Lyapunov bounds on $E|X|^2$ and $E|X|$?`, h: [R`$\|X\|_r\le\|X\|_4 = 2$.`], a: [[R`$E|X|^2\le$`, '4'], [R`$E|X|\le$`, '2']], s: R`$\|X\|_4 = 16^{1/4} = 2$, so $E X^2\le4$ and $E|X|\le2$.` },
  { k: '05', lvl: 1, q: R`Young with $p = q = 2$, $a = 2$, $b = 3$: right-hand side?`, h: [R`$\frac{a^2+b^2}2$.`], a: '6.5', s: R`$6.5\ge ab = 6$ ✓.` },
  { k: '06', lvl: 2, q: R`$\|X\|_2 = 3$, $\|Y\|_2 = 4$, and $\operatorname{corr}(X,Y) = 1$ with mean 0. Find $\|X+Y\|_2$.`, h: [R`Perfectly correlated: Minkowski holds with equality.`], a: '7', s: R`$E(X+Y)^2 = 9 + 16 + 2\cdot12 = 49$, so $\|X+Y\|_2 = 7$, equality in Minkowski.` },
  { k: '07', lvl: 1, q: R`When does Cauchy–Schwarz hold with equality?`, h: [R`Discriminant zero.`], a: { choice: ['When X and Y are independent', 'When one is a.s. a constant multiple of the other', 'Never'], v: 1 }, s: R`Equality iff $|X| = t|Y|$ a.s. for some constant $t$ (linear dependence).` },
  { k: '08', lvl: 2, q: R`$\operatorname{var}(X) = 1$, $\operatorname{var}(Y) = 4$, $\operatorname{cov}(X,Y) = 2$. What is $\operatorname{corr}(X,Y)$, and what does it imply?`, h: [R`$2/(1\cdot2)$.`], a: [[R`$\operatorname{corr}$`, '1']], s: R`$\operatorname{corr} = 1$: equality in Cauchy–Schwarz, so $Y = 2X + c$ almost surely.` },
  { k: '09', lvl: 3, q: R`(Second-moment method) Let $X\ge0$ with $E(X) = 2$ and $E(X^2) = 5$. (a) Use Cauchy–Schwarz to find a lower bound for $P(X>0)$. (b) The bound is attained by a two-point distribution $P(X = 0) = 1 - \pi$, $P(X = c) = \pi$. Find $c$.`,
    h: [R`Since $X\ge0$, $X = X\cdot\mathbb 1(X>0)$ (where $X = 0$ both sides are 0).`, R`Cauchy–Schwarz on the product $X\cdot\mathbb 1(X>0)$: $E(X)\le\sqrt{E(X^2)\,E\left(\mathbb 1(X>0)^2\right)}$, and $\mathbb 1^2 = \mathbb 1$, whose expectation is $P(X>0)$.`, R`Square and rearrange: $P(X>0)\ge\frac{(EX)^2}{E(X^2)}$. For (b), match $\pi c = 2$ and $\pi c^2 = 5$, with $\pi$ equal to the bound.`],
    a: [['(a) lower bound', '4/5'], ['(b) c', '5/2']],
    s: R`**(a)** Because $X\ge0$, $X = X\,\mathbb 1(X>0)$. By Cauchy–Schwarz,
$$E(X) = E\big(X\cdot\mathbb 1(X>0)\big)\le\sqrt{E(X^2)}\sqrt{E\big(\mathbb 1(X>0)\big)} = \sqrt{E(X^2)\,P(X>0)}.$$
Squaring: $P(X>0)\ge\frac{(EX)^2}{E(X^2)} = \frac45$.

This is a *lower* bound on a probability. Markov and Chebyshev only give upper bounds on tails, so this is a genuinely different tool: a large second moment relative to the squared mean means $X$ might be 0 most of the time.

**(b)** Equality in Cauchy–Schwarz needs $X$ to be proportional to $\mathbb 1(X>0)$, i.e. $X$ is constant ($= c$) on $\{X>0\}$. Then $E(X) = \pi c = 2$ and $E(X^2) = \pi c^2 = 5$, so $c = \frac{5}{2}$ and $\pi = \frac45$, which matches the bound exactly. So the bound $\frac45$ cannot be improved.` },
  { k: '10', lvl: 4, q: R`(a) Prove the three-factor Hölder inequality
$$E|XYZ|\le\|X\|_3\,\|Y\|_3\,\|Z\|_3,\qquad\|W\|_3 = \left(E|W|^3\right)^{1/3},$$
using Hölder once and Cauchy–Schwarz once.
(b) Let $U\sim\operatorname{Unif}(0,1)$ and take $X = Y = U$, $Z = 1 - U$. Compute the bound from (a) and the exact value of $E(XYZ)$.`,
    h: [R`Group as $|X|\cdot|YZ|$ and use Hölder with $p = 3$, $q = \frac32$: $E|X||YZ|\le\|X\|_3\left(E|YZ|^{3/2}\right)^{2/3}$.`, R`Now $E|YZ|^{3/2} = E\left(|Y|^{3/2}|Z|^{3/2}\right)$. Apply Cauchy–Schwarz: $\le\sqrt{E|Y|^3\,E|Z|^3}$.`, R`Raise to the power $\frac23$: $\left(\sqrt{E|Y|^3E|Z|^3}\right)^{2/3} = \|Y\|_3\|Z\|_3$.`, R`$E(U^3) = E\left((1-U)^3\right) = \frac14$, and $E\left(U^2(1-U)\right) = \frac13 - \frac14$.`],
    a: [['bound', '1/4'], ['exact', '1/12']],
    s: R`**(a)** Hölder with $p = 3$, $q = \frac32$ (so $\frac13 + \frac23 = 1$) applied to $|X|$ and $|YZ|$:
$$E|XYZ|\le\left(E|X|^3\right)^{1/3}\left(E|YZ|^{3/2}\right)^{2/3}.$$
Cauchy–Schwarz applied to $|Y|^{3/2}$ and $|Z|^{3/2}$:
$$E|YZ|^{3/2} = E\left(|Y|^{3/2}|Z|^{3/2}\right)\le\sqrt{E|Y|^3}\sqrt{E|Z|^3}.$$
Raising to the power $\frac23$ gives $\left(E|YZ|^{3/2}\right)^{2/3}\le\left(E|Y|^3\right)^{1/3}\left(E|Z|^3\right)^{1/3} = \|Y\|_3\|Z\|_3$. Combining the two steps, $E|XYZ|\le\|X\|_3\|Y\|_3\|Z\|_3$. $\blacksquare$

(The general rule: $E|XYZ|\le\|X\|_p\|Y\|_q\|Z\|_r$ whenever $\frac1p + \frac1q + \frac1r = 1$.)

**(b)** $\|U\|_3^3 = \int_0^1u^3\dd u = \frac14$, and $1 - U\sim\operatorname{Unif}(0,1)$ too, so $\|1-U\|_3^3 = \frac14$. Bound: $\left(\frac14\right)^{1/3}\left(\frac14\right)^{1/3}\left(\frac14\right)^{1/3} = \frac14$.

Exact: $E\left(U^2(1-U)\right) = \int_0^1(u^2 - u^3)\dd u = \frac13 - \frac14 = \frac1{12}$.

The bound is 3 times too big. Hölder is tight only when $|X|^3, |Y|^3, |Z|^3$ are proportional, but here $U$ and $1 - U$ peak at opposite ends of $(0,1)$.` },
]);
