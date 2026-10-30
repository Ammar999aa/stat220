TOPIC({ id: '2.10', ch: 2, title: 'Transformations of two random variables', summary: 'Distribution of max, min, X+Y, X−Y, X/Y, XY: 3-step method and conditioning.' }, [
R`Now $Z$ is built from **two** random variables: $Z = X+Y$, $Z = \max(X,Y)$, $Z = X/Y$ and so on. Exercise 2 of the 2025 midterm (30 points) was exactly this: find the density of $Z = X/Y$.

The good news: the method is the **same** as before. Find the CDF $F_Z(z) = P(Z\le z)$ by integrating the joint density over the right region, then differentiate.`,
THM('3-step method for $Z = t(X,Y)$', R`<ol><li>For each $z$, find the region $A_z = \{(x,y): t(x,y)\le z\}$. <b>Draw it!</b></li><li>$F_Z(z) = P\big((X,Y)\in A_z\big) = \displaystyle\iint_{A_z} f_{X,Y}(x,y)\dd x\dd y$.</li><li>$f_Z(z) = F_Z'(z)$.</li></ol>`),
H('Maximum and minimum: the easiest case'),
R`For the maximum there is a beautiful trick: **the max is $\le y$ exactly when every one of them is $\le y$.** With independence, that probability is a product:
$$P(\max_i X_i\le y) = P(X_1\le y,\dots,X_n\le y) = \prod_{i=1}^n P(X_i\le y).$$`,
THM('Max and min of iid variables', R`If $X_1,\dots,X_n\iid F$ with density $f$:
$$F_{\max}(y) = [F(y)]^n,\qquad f_{\max}(y) = n[F(y)]^{n-1}f(y).$$
For the minimum, use the **survival function**. The min is $>z$ exactly when all of them are $>z$:
$$P(\min_i X_i > z) = [1-F(z)]^n,\qquad f_{\min}(z) = n[1-F(z)]^{n-1}f(z).$$`),
P({ k: 'a', lvl: 1,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$. Find $P(\max(X,Y)\le\tfrac12)$.`,
  h: [R`Both must be $\le\tfrac12$.`],
  a: '1/4',
  s: R`$P(X\le\tfrac12)P(Y\le\tfrac12) = \tfrac14$.` }),
P({ k: 'b', lvl: 2,
  q: R`$X_1, X_2, X_3\iid\operatorname{Unif}(0,1)$ and $Y = \max_i X_i$. Find $f_Y(y)$ on $(0,1)$.`,
  h: [R`$F_Y(y) = y^3$.`],
  a: [['$f_Y(y)$', '3*y^2', { y: [0, 1] }]],
  s: R`$F_Y(y) = y^3$, so $f_Y(y) = 3y^2$ on $(0,1)$. In general $f_Y(y) = ny^{n-1}$ for the max of $n$ uniforms (slides).` }),
P({ k: 'c', lvl: 2,
  q: R`$X_1,\dots,X_n\iid\operatorname{Exp}(\beta)$ and $Y = \max_iX_i$. Find $f_Y$. Enter it for $n = 2$, $\beta = 1$.`,
  h: [R`$F(y) = 1-e^{-y/\beta}$ for $y\ge0$.`],
  a: [['$f_Y(y)$', '2*(1-exp(-y))*exp(-y)', { y: [0, 5] }]],
  s: R`$F_Y(y) = (1 - e^{-y/\beta})^n$, so
$$f_Y(y) = n(1-e^{-y/\beta})^{n-1}\,\frac{1}{\beta}e^{-y/\beta},\quad y\ge0.$$
For $n=2$, $\beta = 1$: $f_Y(y) = 2(1-e^{-y})e^{-y}$.`,
  src: 'HW2 B4 (Wasserman 2.14.21)' }),
P({ k: 'd', lvl: 2,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$ and $Z = \min\{X,Y\}$. Find $f_Z(z)$ on $(0,1)$.`,
  h: [R`$P(Z>z) = (1-z)^2$.`],
  a: [['$f_Z(z)$', '2-2*z', { z: [0, 1] }]],
  s: R`$P(Z>z) = P(X>z)P(Y>z) = (1-z)^2$, so $F_Z(z) = 1-(1-z)^2 = 2z - z^2$ and $f_Z(z) = 2-2z$ on $(0,1)$.`,
  src: 'HW2 A4 (Wasserman 2.14.7)' }),
P({ k: 'e', lvl: 2,
  q: R`$X_1,\dots,X_4\iid\operatorname{Exp}(\beta = 2)$. Find $P(\min_iX_i > 1)$. What is the distribution of the minimum?`,
  h: [R`$P(X_i>1) = e^{-1/2}$.`],
  a: 'exp(-2)',
  s: R`$P(\min > z) = (e^{-z/2})^4 = e^{-2z}$, so $\min\sim\operatorname{Exp}(\beta = \tfrac12)$ (in general $\operatorname{Exp}(\beta/n)$). At $z=1$: $e^{-2}\approx0.135$.` }),

H('Sums'),
R`For $Z = X+Y$ the region $A_z = \{x+y\le z\}$ is a half-plane below a line of slope $-1$. A clean way to do the integral is to **condition on $Y$**, which is the law of total probability:
$$F_Z(z) = \int P(X + y\le z\mid Y=y)\,f_Y(y)\dd y \overset{\indep}{=} \int F_X(z-y)\,f_Y(y)\dd y.$$
Differentiating under the integral gives the **convolution** formula $f_Z(z) = \int f_X(z-y)f_Y(y)\dd y$.`,
EX('Sum of two uniforms', R`$X,Y\iid\operatorname{Unif}(0,1)$, $Z = X+Y\in(0,2)$. The region under $x+y = z$ inside the unit square is a triangle (for $z\le1$) or the square minus a triangle (for $z>1$):
$$F_Z(z) = \begin{cases}\tfrac{z^2}{2}, & 0\le z\le1\\ 1-\tfrac{(2-z)^2}{2}, & 1< z\le2\end{cases}\qquad f_Z(z) = \begin{cases} z, & 0\le z\le1\\ 2-z, & 1<z\le2.\end{cases}$$
A "tent" (triangular) density.`),
P({ k: 'f', lvl: 1,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$. Find $P(X+Y\le\tfrac12)$ and $f_{X+Y}(1.5)$.`,
  h: [R`Use the formulas in the example.`],
  a: [[R`$P(X+Y\le 1/2)$`, '1/8'], ['$f_{X+Y}(1.5)$', '1/2']],
  s: R`$F_Z(\tfrac12) = \frac{(1/2)^2}{2} = \frac18$, and $f_Z(1.5) = 2 - 1.5 = \frac12$.` }),
EX('Sum of two exponentials (slides)', R`$X,Y\iid\operatorname{Exp}(\beta)$, $Z = X+Y$. Conditioning on $Y$:
$$F_Z(z) = \int_0^z\left(1-e^{-(z-y)/\beta}\right)\frac1\beta e^{-y/\beta}\dd y = 1 - e^{-z/\beta} - \frac z\beta e^{-z/\beta},$$
$$f_Z(z) = \frac{z}{\beta^2}e^{-z/\beta},\quad z>0,$$
which is $\operatorname{Gamma}(2,\beta)$. (Later, MGFs give this in two lines.)`),
P({ k: 'g', lvl: 2,
  q: R`$X, Y\iid\operatorname{Exp}(1)$. Find $P(X+Y\le 1)$.`,
  h: [R`$F_Z(z) = 1 - e^{-z} - ze^{-z}$.`],
  a: '1-2*exp(-1)',
  s: R`$F_Z(1) = 1 - e^{-1} - e^{-1} = 1-2e^{-1}\approx0.264$.` }),
P({ k: 'h', lvl: 2,
  q: R`$X\sim\operatorname{Poisson}(1)$ and $Y\sim\operatorname{Poisson}(1)$, independent. Find $P(X+Y = 2)$ by direct summation (discrete convolution).`,
  h: [R`$P(X+Y=2) = \sum_{k=0}^2 P(X=k)P(Y=2-k)$.`],
  a: '2*exp(-2)',
  s: R`$\sum_{k=0}^2 \frac{e^{-1}}{k!}\frac{e^{-1}}{(2-k)!} = e^{-2}\left(\tfrac12 + 1 + \tfrac12\right) = 2e^{-2}$. This equals the $\operatorname{Poisson}(2)$ probability $e^{-2}2^2/2!$, as it should.` }),

H('Differences, ratios and products'),
P({ k: 'i', lvl: 3,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$ and $Z = X - Y$. Find $f_Z(z)$ for $-1<z<1$, then $P(Z > \tfrac12)$.`,
  h: [R`$\{x - y\le z\}$ is the region above the line $y = x - z$. By symmetry, $f_Z$ is even.`, R`For $0\le z<1$: $P(Z>z)$ is a triangle with legs $1-z$.`],
  a: [['$f_Z(z)$', '1-abs(z)', { z: [-1, 1] }], ['$P(Z>1/2)$', '1/8']],
  s: R`For $0\le z<1$: $P(X-Y>z)$ is the triangle $\{x>y+z\}$ with legs $1-z$, so it has area $\frac{(1-z)^2}2$, and $F_Z(z) = 1-\frac{(1-z)^2}2$, $f_Z(z) = 1-z$. By symmetry ($X-Y$ and $Y-X$ have the same distribution) $f_Z(z) = 1+z$ on $(-1,0)$. So $f_Z(z) = 1-|z|$.

$P(Z>\tfrac12) = \frac{(1/2)^2}2 = \frac18$.`,
  src: 'HW3 B2 (Wasserman 2.14.20)' }),
P({ k: 'j', lvl: 3,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$ and $W = X/Y$. Find $F_W(w)$ for $0<w<1$ and for $w\ge1$, then $P(W\le2)$.`,
  h: [R`$\{x/y\le w\} = \{x\le wy\}$. Condition on $Y = y$: $P(X\le wy) = \min(wy,1)$.`, R`For $w\ge1$, $wy\ge1$ when $y\ge1/w$.`],
  a: [['$F_W(w)$, $0<w<1$', 'w/2', { w: [0, 1] }], [R`$P(W\le2)$`, '3/4']],
  s: R`Condition on $Y=y$: $P(W\le w\mid Y=y) = P(X\le wy) = \min(wy, 1)$.

For $0<w<1$: $F_W(w) = \int_0^1 wy\dd y = \frac w2$.

For $w\ge1$: $F_W(w) = \int_0^{1/w}wy\dd y + \int_{1/w}^1 1\dd y = \frac{1}{2w} + 1 - \frac1w = 1 - \frac{1}{2w}$.

So $f_W(w) = \tfrac12$ on $(0,1)$ and $\frac{1}{2w^2}$ for $w\ge1$. $P(W\le2) = 1 - \tfrac14 = \tfrac34$.`,
  src: 'HW3 B2 (Wasserman 2.14.20)' }),
P({ k: 'k', lvl: 3,
  q: R`$X, Y\iid\operatorname{Unif}(0,1)$ and $Z = XY$. Find $F_Z(z)$ and $f_Z(z)$ on $(0,1)$.`,
  h: [R`$P(XY\le z\mid Y = y) = P(X\le z/y) = \min(z/y, 1)$.`, R`Split the $y$-integral at $y = z$.`],
  a: [['$F_Z(z)$', 'z-z*log(z)', { z: [0.05, 1] }], ['$f_Z(z)$', '-log(z)', { z: [0.05, 1] }]],
  s: R`$F_Z(z) = \int_0^z 1\dd y + \int_z^1\frac zy\dd y = z + z(-\log z) = z - z\log z$. Then $f_Z(z) = 1 - (\log z + 1) = -\log z$ on $(0,1)$.` }),

H('The ratio $X/Y$ for symmetric densities (2025 midterm)'),
R`When $Y$ can be negative, dividing by $Y$ **flips** inequalities. So split on the sign of $Y$:
$$P\left(\frac XY\le z\right) = P(X\le zY,\ Y>0) + P(X\ge zY,\ Y<0).$$
Then condition on $Y$ (tower property) and differentiate under the integral sign.`,
P({ k: 'l', lvl: 4,
  q: R`(Midterm 2025, Ex. 2(a)–(b), 20 pt.) $X, Y$ are independent with densities $f_X, f_Y$ on $\R$, both symmetric about 0.

(a) Show $f_Z(z) = 2\int_0^{\infty}y\,f_X(yz)f_Y(y)\dd y$ for $Z = X/Y$.

(b) For $X,Y\iid N(0,1)$, use (a) to show $Z$ is Cauchy. Enter $f_Z(z)$.`,
  h: [R`$F_Z(z) = \int_0^\infty F_X(yz)f_Y(y)\dd y + \int_{-\infty}^0[1-F_X(yz)]f_Y(y)\dd y$.`, R`Differentiate in $z$: $\frac{\partial}{\partial z}F_X(yz) = yf_X(yz)$. In the second integral substitute $y\to-y$ and use symmetry: $f_X(-u) = f_X(u)$.`, R`(b): $2\int_0^\infty y\frac{1}{2\pi}e^{-y^2(1+z^2)/2}\dd y$, and $\int_0^\infty ye^{-ay^2/2}\dd y = 1/a$.`],
  a: [['$f_Z(z)$', '1/(pi*(1+z^2))', { z: [-4, 4] }]],
  s: R`**(a)** Split on the sign of $Y$ and condition on $Y$:
$$F_Z(z) = P(X\le Yz, Y>0) + P(X\ge Yz, Y<0) = \int_0^\infty F_X(yz)f_Y(y)\dd y + \int_{-\infty}^0\big(1-F_X(yz)\big)f_Y(y)\dd y.$$
Differentiate in $z$:
$$f_Z(z) = \int_0^\infty yf_X(yz)f_Y(y)\dd y - \int_{-\infty}^0 yf_X(yz)f_Y(y)\dd y.$$
In the second integral substitute $u = -y$: it becomes $-\int_0^\infty u f_X(-uz)f_Y(-u)\dd u = -\int_0^\infty uf_X(uz)f_Y(u)\dd u$ by symmetry. Hence
$$f_Z(z) = 2\int_0^\infty y\,f_X(yz)f_Y(y)\dd y,\quad z\in\R.$$
**(b)** With standard normal densities:
$$f_Z(z) = 2\int_0^\infty y\frac{1}{2\pi}e^{-\frac12y^2z^2}e^{-\frac12y^2}\dd y = \frac1\pi\int_0^\infty ye^{-\frac12y^2(1+z^2)}\dd y = \frac1\pi\left[-\frac{e^{-\frac12y^2(1+z^2)}}{1+z^2}\right]_0^\infty = \frac{1}{\pi(1+z^2)},$$
the Cauchy density.`,
  src: 'Midterm 2025 Ex.2(a),(b)' }),
]);

DRILLS('2.10', [
  { k: '01', lvl: 1, q: R`$X, Y\iid\operatorname{Unif}(0,2)$. Find $P(\max(X,Y)\le1)$.`, h: [R`$P(X\le1) = \tfrac12$.`], a: '1/4',
    s: R`$(\tfrac12)^2 = \tfrac14$.` },
  { k: '02', lvl: 2, q: R`$X_1,\dots,X_5\iid\operatorname{Unif}(0,1)$. Find $P(\max_iX_i > 0.9)$.`, h: [R`Complement: all $\le 0.9$.`], a: '1-0.9^5',
    s: R`$1 - 0.9^5 = 1 - 0.59049 = 0.40951$.` },
  { k: '03', lvl: 2, q: R`$X_1,X_2,X_3\iid\operatorname{Unif}(0,1)$, $Z = \min_iX_i$. Find $f_Z(z)$ on $(0,1)$ and $P(Z>\tfrac12)$.`,
    h: [R`$P(Z>z) = (1-z)^3$.`], a: [['$f_Z(z)$', '3*(1-z)^2', { z: [0, 1] }], ['$P(Z>1/2)$', '1/8']],
    s: R`$P(Z>z) = (1-z)^3$, so $f_Z(z) = 3(1-z)^2$. $P(Z>\tfrac12) = \tfrac18$.` },
  { k: '04', lvl: 2, q: R`$X\sim\operatorname{Exp}(\beta=1)$ and $Y\sim\operatorname{Exp}(\beta=2)$ independent. Find the mean of $\min(X,Y)$.`,
    h: [R`$P(\min>t) = e^{-t}e^{-t/2}$.`], a: '2/3',
    s: R`$P(\min > t) = e^{-3t/2}$, so $\min\sim\operatorname{Exp}(\beta = \tfrac23)$ with mean $\tfrac23$. In general the rates $1/\beta$ add.` },
  { k: '05', lvl: 2, q: R`$X, Y\iid\operatorname{Exp}(1)$, $Z = X+Y$. Find $P(Z>2)$.`, h: [R`$Z\sim\operatorname{Gamma}(2,1)$: $P(Z>z) = e^{-z}(1+z)$.`], a: '3*exp(-2)',
    s: R`$1 - F_Z(2) = e^{-2} + 2e^{-2} = 3e^{-2}\approx 0.406$.` },
  { k: '06', lvl: 2, q: R`$X, Y\iid\operatorname{Unif}(0,1)$, $Z = X+Y$. Find $P(\tfrac12< Z<\tfrac32)$.`, h: [R`Complement: two corner triangles of area $\tfrac18$ each.`], a: '3/4',
    s: R`$P(Z\le\tfrac12) = \tfrac18$ and $P(Z\ge\tfrac32) = \tfrac18$, so the answer is $1 - \tfrac14 = \tfrac34$.` },
  { k: '07', lvl: 2, q: R`$X, Y\iid\operatorname{Unif}(0,1)$, $W = X/Y$. Find $P(W\le\tfrac12)$.`, h: [R`$F_W(w) = w/2$ for $w<1$.`], a: '1/4',
    s: R`$P(X\le Y/2) = \int_0^1\frac y2\dd y = \frac14$.` },
  { k: '08', lvl: 3, q: R`$X, Y\iid\operatorname{Unif}(0,1)$, $Z = XY$. Find $P(Z\le\tfrac14)$.`, h: [R`$F_Z(z) = z - z\log z$.`], a: '1/4+log(2)/2',
    s: R`$F_Z(\tfrac14) = \tfrac14 - \tfrac14\log\tfrac14 = \tfrac14 + \tfrac12\log2\approx0.597$.` },
  { k: '09', lvl: 3, q: R`$X, Y\iid\operatorname{Exp}(1)$, $Z = X - Y$. Find $f_Z(z)$ and $P(Z>1)$.`,
    h: [R`For $z>0$: $P(X - Y > z) = \int_0^\infty P(X>y+z)e^{-y}\dd y$.`],
    a: [['$f_Z(z)$', 'exp(-abs(z))/2', { z: [-3, 3] }], ['$P(Z>1)$', 'exp(-1)/2']],
    s: R`For $z\ge0$: $P(Z>z) = \int_0^\infty e^{-(y+z)}e^{-y}\dd y = \tfrac12e^{-z}$. By symmetry $f_Z(z) = \tfrac12e^{-|z|}$ (Laplace). $P(Z>1) = \tfrac12e^{-1}\approx0.184$.` },
  { k: '10', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$ and $Y\sim\operatorname{Exp}(1)$ independent. Find $P(Y<X)$.`,
    h: [R`$\int_0^1 P(Y<x)\dd x = \int_0^1(1-e^{-x})\dd x$.`], a: 'exp(-1)',
    s: R`$\int_0^1(1-e^{-x})\dd x = 1 - (1-e^{-1}) = e^{-1}\approx0.368$.` },
  { k: '11', lvl: 3, q: R`$X, Y\iid N(0,1)$. Using that $X/Y$ is standard Cauchy with CDF $F(z) = \tfrac12 + \tfrac1\pi\arctan z$, find $P(X/Y\le1)$.`,
    h: [R`$\arctan 1 = \pi/4$.`], a: '3/4', s: R`$F(1) = \tfrac12 + \tfrac1\pi\cdot\tfrac\pi4 = \tfrac34$.` },
  { k: '12', lvl: 4, q: R`$X, Y\iid\operatorname{Exp}(1)$. Show $W = \frac{X}{X+Y}\sim\operatorname{Unif}(0,1)$ by computing $F_W(w)$, $0<w<1$.`,
    h: [R`$\frac{X}{X+Y}\le w\iff X(1-w)\le wY\iff X\le\frac{w}{1-w}Y$.`, R`Condition on $Y$: $E\left[1 - e^{-cY}\right] = 1 - \frac{1}{1+c}$ with $c = \frac{w}{1-w}$.`],
    a: [['$F_W(w)$', 'w', { w: [0.05, 0.95] }]],
    s: R`With $c = \frac{w}{1-w}$: $F_W(w) = P(X\le cY) = \int_0^\infty(1-e^{-cy})e^{-y}\dd y = 1 - \frac{1}{1+c} = 1 - (1-w) = w$. So $W\sim\operatorname{Unif}(0,1)$.` },
  { k: '13', lvl: 2, q: R`$X, Y\iid\operatorname{Unif}(-1,1)$. Find $P(X^2 + Y^2\le1)$.`, h: [R`Area of the unit disk over the area of the square.`], a: 'pi/4',
    s: R`The joint density is $\tfrac14$ on the square $[-1,1]^2$. The disk has area $\pi$, so $P = \pi/4\approx0.785$.` },
  { k: '14', lvl: 3, q: R`$X_1,\dots,X_n\iid$ with CDF $F$. Let $Y = \max_iX_i$, $Z = \min_iX_i$. For $n = 2$ and $F$ = $\operatorname{Unif}(0,1)$, find $P(Y\le\tfrac12, Z > \tfrac14)$.`,
    h: [R`$\{Y\le\tfrac12, Z>\tfrac14\}$ = all $X_i\in(\tfrac14,\tfrac12]$.`], a: '1/16',
    s: R`Both must lie in $(\tfrac14,\tfrac12]$: $(\tfrac14)^2 = \tfrac1{16}$.` },
  { k: '15', lvl: 3, q: R`$X\sim\operatorname{Exp}(\beta = 1)$ and $Y\sim\operatorname{Exp}(\beta = \tfrac12)$ are independent, and $Z = X + Y$. Find $f_Z(z)$ for $z>0$ and $P(Z > 1)$.`,
    h: [R`Read the scale carefully: $\beta = \tfrac12$ means mean $\tfrac12$, so $f_Y(y) = 2e^{-2y}$, not $\tfrac12e^{-y/2}$. Different scales, so $Z$ is **not** a Gamma.`, R`Convolution: $f_Z(z) = \int f_X(x)f_Y(z-x)\dd x$. Both densities must be positive, so $x>0$ and $z - x>0$: integrate $x$ from $0$ to $z$.`, R`$\int_0^z e^{-x}\,2e^{-2(z-x)}\dd x = 2e^{-2z}\int_0^z e^{x}\dd x$.`],
    a: [['$f_Z(z)$', '2*(exp(-z)-exp(-2*z))', { z: [0, 4] }], ['$P(Z>1)$', '2*exp(-1)-exp(-2)']],
    s: R`$f_X(x) = e^{-x}$ and $f_Y(y) = 2e^{-2y}$ for positive arguments. For $z>0$:
$$f_Z(z) = \int_0^z e^{-x}\cdot2e^{-2(z-x)}\dd x = 2e^{-2z}\int_0^ze^{x}\dd x = 2e^{-2z}(e^z - 1) = 2\left(e^{-z} - e^{-2z}\right).$$
Check: $\int_0^\infty 2(e^{-z}-e^{-2z})\dd z = 2(1 - \tfrac12) = 1$ ✓.
$$P(Z>1) = \int_1^\infty2\left(e^{-z} - e^{-2z}\right)\dd z = 2e^{-1} - e^{-2}\approx0.600.$$` },
  { k: '16', lvl: 4, q: R`(Exam style, 20 pt.) $X, Y\iid\operatorname{Exp}(\beta)$ and $R = X/Y$.

(a) Find $F_R(r)$ for $r>0$. Show it does not depend on $\beta$.

(b) Find $f_R(r)$.

(c) Find $P(X > 2Y)$.

(d) Is $E(R)$ finite?`,
    h: [R`(a) $\{X/Y\le r\} = \{X\le rY\}$ because $Y>0$. Condition on $Y = y$: $P(X\le ry) = 1 - e^{-ry/\beta}$.`, R`$\int_0^\infty e^{-ry/\beta}\frac1\beta e^{-y/\beta}\dd y = \frac{1}{1+r}$.`, R`(c) is $1 - F_R(2)$.`, R`(d) $E(R) = \int_0^\infty\frac{r}{(1+r)^2}\dd r$. How does the integrand behave for large $r$?`],
    a: [['$F_R(r)$', 'r/(1+r)', { r: [0, 5] }], ['$f_R(r)$', '1/(1+r)^2', { r: [0, 5] }], ['$P(X>2Y)$', '1/3'], [R`$E(R)$ finite?`, { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** Since $Y>0$, $\{R\le r\} = \{X\le rY\}$. Condition on $Y$ (independence lets us use the marginal of $X$):
$$F_R(r) = \int_0^\infty P(X\le ry)\,f_Y(y)\dd y = \int_0^\infty\left(1 - e^{-ry/\beta}\right)\frac1\beta e^{-y/\beta}\dd y = 1 - \frac1\beta\int_0^\infty e^{-(1+r)y/\beta}\dd y = 1 - \frac{1}{1+r} = \frac{r}{1+r}.$$
$\beta$ cancels. That makes sense: $X/Y$ does not change if both are measured in different units, and $\beta$ is just a unit of time.

**(b)** $f_R(r) = \frac{d}{dr}\left(1 - \frac1{1+r}\right) = \frac{1}{(1+r)^2}$, $r>0$.

**(c)** $P(X>2Y) = P(R>2) = 1 - \frac23 = \frac13$.

**(d)** $E(R) = \int_0^\infty\frac{r}{(1+r)^2}\dd r$. For large $r$ the integrand behaves like $\frac1r$, whose integral diverges. Explicitly, $\int_0^M\frac{r}{(1+r)^2}\dd r = \log(1+M) + \frac{1}{1+M} - 1\to\infty$. So **$E(R) = \infty$**, even though $E(X) = \beta$ is finite. The culprit is $E(1/Y) = \int_0^\infty\frac1y\frac1\beta e^{-y/\beta}\dd y = \infty$: $Y$ is too often close to 0.` },
]);
