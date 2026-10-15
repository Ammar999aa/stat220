TOPIC({ id: '2.6', ch: 2, title: 'Joint & marginal distributions', summary: 'Two random variables at once: joint PMF/PDF, normalizing constants, regions, marginals.' }, [
R`So far each random variable lived alone. On the exam, though, the most common question starts with **two** random variables $X$ and $Y$ described *together*. This is "Exercise 1" of the 2025 midterm, worth 40 points.

The idea is simple. Instead of asking "how likely is $X = x$?", we ask "how likely is it that $X = x$ **and** $Y = y$ at the same time?". The answer to that question, for every pair $(x,y)$, is the **joint distribution**.`,

H('Discrete case: the joint PMF'),
R`Toss two coins (they can be biased or related). Let $X$ = result of coin 1 and $Y$ = result of coin 2, with 1 meaning heads. A table tells you everything:

<table><tr><th></th><th>$Y=0$</th><th>$Y=1$</th></tr><tr><th>$X=0$</th><td>$1/9$</td><td>$2/9$</td></tr><tr><th>$X=1$</th><td>$2/9$</td><td>$4/9$</td></tr></table>

Each cell is a probability like $P(X=0, Y=1) = 2/9$. The comma means "and". All cells together must add to 1.`,
DEF('Joint PMF', R`For discrete $X, Y$, the **joint probability mass function** is
$$f_{X,Y}(x,y) = P(X = x, Y = y).$$
It must satisfy $f_{X,Y}(x,y) \ge 0$ and $\sum_x \sum_y f_{X,Y}(x,y) = 1$.`),
P({ k: 'a', lvl: 1,
  q: R`Using the table above, what is $P(X = 1, Y = 1)$?`,
  h: [R`Just read the cell in row $X=1$, column $Y=1$.`],
  a: '4/9',
  s: R`Read it off the table: $P(X=1,Y=1) = f_{X,Y}(1,1) = 4/9$.`,
  src: 'Slides Ch.2 (joint PMF table)' }),
P({ k: 'b', lvl: 2,
  q: R`A joint PMF is given by $f(x,y) = c\,(x + y)$ for $x \in \{0,1,2\}$ and $y \in \{0, 1\}$ (and 0 otherwise). Find $c$.`,
  h: [R`List all 6 pairs $(x,y)$ and add up $x+y$ over them.`, R`The sum of $x+y$ over the 6 pairs is $0+1+1+2+2+3$.`],
  a: '1/9',
  s: R`The total probability must be 1:
$$\sum_{x=0}^{2}\sum_{y=0}^{1} c(x+y) = c\,[(0+0)+(0+1)+(1+0)+(1+1)+(2+0)+(2+1)] = 9c = 1,$$
so $c = 1/9$.` }),

H('Continuous case: the joint PDF'),
R`For continuous variables, single points have probability 0, just like in one dimension. Instead we have a **density surface** $f_{X,Y}(x,y)$ floating above the $(x,y)$-plane. Probability is **volume under the surface**: to get $P((X,Y) \in A)$, integrate the density over the region $A$.

Think of the plane as a map and the density as how thickly sand is piled on it. The total amount of sand is 1. The probability of a region is how much sand sits on that region.`,
DEF('Joint PDF', R`$(X,Y)$ is (jointly) continuous with **joint PDF** $f_{X,Y}$ if
<ol><li>$f_{X,Y}(x,y) \ge 0$ for all $(x,y)$,</li><li>$\displaystyle\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} f_{X,Y}(x,y)\dd x\dd y = 1$,</li><li>for any (nice) set $A \subseteq \R^2$: $\displaystyle P\big((X,Y)\in A\big) = \iint_A f_{X,Y}(x,y)\dd x\dd y.$</li></ol>`),
R`Conditions 1 and 2 are exactly what you check when an exam says "**find $c$ such that $f$ is a valid joint PDF**". Condition 1 usually forces $c>0$. Condition 2 gives an equation for $c$.`,
EX('Uniform on the unit square', R`$f(x,y) = 1$ for $0 \le x \le 1$, $0 \le y \le 1$ (0 elsewhere). It is $\ge 0$, and $\int_0^1\int_0^1 1 \dd x \dd y = 1$ ✓. Then $P(X < \tfrac12, Y < \tfrac12) = \int_0^{1/2}\int_0^{1/2} 1\dd x\dd y = \tfrac14$, which is just the area of the little square.`),
P({ k: 'c', lvl: 1,
  q: R`Let $f(x,y) = c$ for $0 < x < 2$ and $0 < y < 1$, and $0$ otherwise. Find $c$.`,
  h: [R`A constant density: the integral is $c \times$ (area of the rectangle).`],
  a: '1/2',
  s: R`$\int_0^1\int_0^2 c\dd x\dd y = c \cdot 2 \cdot 1 = 2c = 1 \Rightarrow c = 1/2$. (And $c = 1/2 > 0$, so condition 1 holds.)` }),
P({ k: 'd', lvl: 2,
  q: R`Let $f(x,y) = c\,(x + y^2)$ for $0 \le x \le 1$, $0 \le y \le 1$, and 0 otherwise. Find $c$.`,
  h: [R`Integrate over the unit square. Split it: $\int\!\!\int x$ and $\int\!\!\int y^2$.`, R`$\int_0^1\int_0^1 x\dd x\dd y = 1/2$ and $\int_0^1\int_0^1 y^2 \dd x\dd y = 1/3$.`],
  a: '6/5',
  s: R`We need $f \ge 0$ (true if $c > 0$, since $x + y^2 \ge 0$ on the square) and
$$\int_0^1\!\!\int_0^1 c(x+y^2)\dd x\dd y = c\left(\tfrac12 + \tfrac13\right) = \tfrac{5c}{6} = 1 \Rightarrow c = \tfrac65.$$`,
  src: 'HW2 A5 (Wasserman 2.14.17)' }),

H('Non-rectangular supports'),
R`The exam loves densities that live on a **triangle** or a curved region, such as "$f(x,y) = c$ if $x < y$". The integrals are the same idea, but the **limits** now depend on the other variable. A reliable recipe:
<ol><li><b>Draw the support.</b> Shade the region where $f > 0$.</li><li><b>Pick an order.</b> E.g. outer integral in $y$, inner in $x$.</li><li><b>Read the limits off the picture.</b> For a fixed $y$, which $x$ values are in the region? Those are the inner limits (they may depend on $y$). Then the outer limits are the full range of $y$.</li></ol>`,
R`<figure class="fig"><svg viewBox="0 0 220 200" width="220" height="200" role="img" aria-label="Triangle 0<y<x<1"><polygon class="reg" points="30,170 180,170 180,20"/><line class="ax" x1="30" y1="170" x2="205" y2="170"/><line class="ax" x1="30" y1="170" x2="30" y2="8"/><line class="hl" x1="105" y1="170" x2="105" y2="95"/><text x="208" y="174">x</text><text x="20" y="12">y</text><text x="176" y="186">1</text><text x="18" y="24">1</text><text class="t-warn" x="112" y="140">fix x: 0&lt;y&lt;x</text><text class="t-acc" x="120" y="80">y = x</text></svg><figcaption>Support $0 < y < x < 1$: for a fixed $x$, $y$ runs from $0$ up to the diagonal $y = x$.</figcaption></figure>`,
EX('Constant on a triangle', R`$f(x,y) = c$ on $0 < y < x < 1$. For fixed $x \in (0,1)$, $y$ ranges over $(0, x)$:
$$\int_0^1\!\!\int_0^{x} c \dd y\dd x = \int_0^1 c\,x\dd x = \frac{c}{2} = 1 \Rightarrow c = 2.$$
Sanity check: the triangle has area $1/2$, and a constant density must be $1/\text{area}$.`),
P({ k: 'e', lvl: 2,
  q: R`Let $f(x,y) = c\,(x + y)$ for $0 < y < x < 1$, and 0 otherwise. Find $c$.`,
  h: [R`Inner integral over $y$ from $0$ to $x$: $\int_0^x (x+y)\dd y = x^2 + x^2/2$.`, R`Then integrate $\tfrac32 x^2$ from 0 to 1.`],
  a: '2',
  s: R`On the support $x+y>0$, so we need $c > 0$. Then
$$\int_0^1\!\!\int_0^x c(x+y)\dd y\dd x = c\int_0^1 \Big[xy + \tfrac{y^2}{2}\Big]_0^x \dd x = c\int_0^1 \tfrac32 x^2 \dd x = \tfrac{c}{2} = 1 \Rightarrow c = 2.$$`,
  src: 'HW4 B2(a)' }),
P({ k: 'f', lvl: 3,
  q: R`Let $f(x,y) = c\,x^2 y$ for $x^2 \le y \le 1$ (and 0 otherwise). Find $c$.`,
  h: [R`Draw the region: it lies above the parabola $y = x^2$ and below $y = 1$. So $x$ runs over $[-1, 1]$.`, R`Inner integral over $y$ from $x^2$ to $1$: $\int_{x^2}^1 y \dd y = \tfrac12(1 - x^4)$.`, R`Then $\int_{-1}^1 \tfrac12 x^2(1-x^4)\dd x = \tfrac12\left(\tfrac23 - \tfrac27\right)$.`],
  a: '21/4',
  s: R`For fixed $x \in [-1,1]$, $y$ goes from $x^2$ to $1$:
$$\int_{-1}^1\!\int_{x^2}^1 c\,x^2 y \dd y\dd x = c\int_{-1}^1 x^2\,\frac{1-x^4}{2}\dd x = \frac c2\left[\frac{x^3}{3} - \frac{x^7}{7}\right]_{-1}^{1} = \frac c2\left(\frac23 - \frac27\right) = \frac{4c}{21}.$$
Setting $\frac{4c}{21} = 1$ gives $c = \frac{21}{4}$.`,
  src: 'Slides Ch.2 (Wasserman Example 2.38)' }),

H('Probabilities of regions'),
R`To find $P((X,Y) \in A)$, integrate the joint density over the **overlap of $A$ with the support**. Draw both regions, then set up the limits from the overlap.`,
EX(R`$P(X + Y \le 1)$`, R`If $f(x,y) = 4xy$ on the unit square, then $\{x + y \le 1\}$ is the triangle under the line $y = 1 - x$:
$$P(X+Y\le 1) = \int_0^1\!\int_0^{1-x} 4xy\dd y\dd x = \int_0^1 2x(1-x)^2\dd x = 2\left(\tfrac12 - \tfrac23 + \tfrac14\right) = \tfrac16.$$`),
P({ k: 'g', lvl: 2,
  q: R`$(X, Y)$ is uniform on the unit square, so $f(x,y) = 1$ on $[0,1]^2$. Find $P(X < Y^2)$.`,
  h: [R`For a fixed $y$, which $x$ satisfy $x < y^2$? Integrate $x$ from 0 to $y^2$.`],
  a: '1/3',
  s: R`$P(X < Y^2) = \int_0^1 \int_0^{y^2} 1 \dd x\dd y = \int_0^1 y^2\dd y = \tfrac13.$` }),
P({ k: 'h', lvl: 2,
  q: R`With $f(x,y) = 2$ on $0 < y < x < 1$, find $P(X < 1/2)$.`,
  h: [R`The region $\{x < 1/2\}$ cuts the triangle. For $x \in (0, 1/2)$, $y \in (0, x)$.`],
  a: '1/4',
  s: R`$P(X < 1/2) = \int_0^{1/2}\int_0^x 2\dd y\dd x = \int_0^{1/2} 2x\dd x = \left[x^2\right]_0^{1/2} = \tfrac14.$` }),

H('The joint CDF'),
DEF('Joint CDF', R`$F_{X,Y}(x,y) = P(X \le x,\ Y \le y)$. For continuous variables, $f_{X,Y}(x,y) = \dfrac{\partial^2 F_{X,Y}(x,y)}{\partial x\,\partial y}$.`),
P({ k: 'i', lvl: 2,
  q: R`Suppose $F_{X,Y}(x,y) = (1 - e^{-x})(1 - e^{-2y})$ for $x, y > 0$. Find the joint PDF $f_{X,Y}(x,y)$ for $x, y > 0$.`,
  h: [R`Differentiate in $x$, then in $y$.`],
  a: [['$f_{X,Y}(x,y)$', '2*exp(-x-2*y)', { x: [0.1, 3], y: [0.1, 3] }]],
  s: R`$\dfrac{\partial F}{\partial x} = e^{-x}(1-e^{-2y})$, and then $\dfrac{\partial^2 F}{\partial y\,\partial x} = e^{-x}\cdot 2e^{-2y} = 2e^{-x-2y}$ for $x,y>0$.` }),

H('Marginal distributions'),
R`Often you are given the joint distribution and asked about **just one** variable. The marginal distribution of $X$ is what you get when you "forget" $Y$: you add up (or integrate) over every possible value of $Y$.

In the table, the marginal of $X$ is just the **row sums**. They are written in the margin of the table, which is where the name comes from.

<table><tr><th></th><th>$Y=0$</th><th>$Y=1$</th><th>$f_X(x)$</th></tr><tr><th>$X=0$</th><td>$1/9$</td><td>$2/9$</td><td><b>$3/9$</b></td></tr><tr><th>$X=1$</th><td>$2/9$</td><td>$4/9$</td><td><b>$6/9$</b></td></tr><tr><th>$f_Y(y)$</th><td><b>$3/9$</b></td><td><b>$6/9$</b></td><td>1</td></tr></table>`,
DEF('Marginal PMF / PDF', R`Discrete: $f_X(x) = P(X = x) = \sum_y f_{X,Y}(x,y)$, and $f_Y(y) = \sum_x f_{X,Y}(x,y)$.

Continuous: $$f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)\dd y, \qquad f_Y(y) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)\dd x.$$`),
P({ k: 'j', lvl: 1,
  q: R`For the joint PMF $f(x,y) = (x+y)/9$ with $x \in \{0,1,2\}$, $y \in \{0,1\}$, find $P(X = 2)$.`,
  h: [R`$P(X=2) = f(2,0) + f(2,1)$.`],
  a: '5/9',
  s: R`$P(X = 2) = \sum_y f(2,y) = \frac{2+0}{9} + \frac{2+1}{9} = \frac59.$` }),
EX('Marginals of $f(x,y)=x+y$ on the unit square', R`$f_X(x) = \int_0^1 (x+y)\dd y = x + \tfrac12$ for $0\le x\le 1$. By symmetry, $f_Y(y) = y + \tfrac12$ for $0 \le y \le 1$. Check: $\int_0^1 (x+\tfrac12)\dd x = 1$ ✓.`),
WARN('Limits and supports', R`With a non-rectangular support, the limits of the integral **depend on the variable you keep**. With $f = 2$ on $0<y<x<1$: for fixed $x$, $y \in (0,x)$, so $f_X(x) = \int_0^x 2\dd y = 2x$. Writing $\int_0^1 2\dd y = 2$ would be wrong.

Always state the support of the marginal, e.g. "$f_X(x) = 2x$, $0 < x < 1$". The instructor's solutions always do.`),
P({ k: 'k', lvl: 2,
  q: R`Let $f(x,y) = 2$ on $0 < y < x < 1$. Find the marginal PDFs $f_X(x)$ (for $0<x<1$) and $f_Y(y)$ (for $0<y<1$).`,
  h: [R`For $f_X$: fix $x$, integrate over $y \in (0, x)$.`, R`For $f_Y$: fix $y$, now $x$ runs from $y$ to $1$.`],
  a: [['$f_X(x)$', '2*x', { x: [0, 1] }], ['$f_Y(y)$', '2*(1-y)', { y: [0, 1] }]],
  s: R`$f_X(x) = \int_0^x 2\dd y = 2x$ for $0 < x < 1$.

$f_Y(y) = \int_y^1 2\dd x = 2(1-y)$ for $0 < y < 1$.

Check: both integrate to 1 over $(0,1)$ ✓.`,
  src: 'HW3 A4(a)' }),
P({ k: 'l', lvl: 3,
  q: R`For $f(x,y) = \frac{21}{4}x^2 y$ on $x^2 \le y \le 1$, find the marginal $f_Y(y)$ for $0 < y < 1$.`,
  h: [R`Fix $y$. Which $x$ satisfy $x^2 \le y$? Answer: $-\sqrt y \le x \le \sqrt y$.`, R`$\int_{-\sqrt y}^{\sqrt y} x^2\dd x = \tfrac23 y^{3/2}$.`],
  a: [['$f_Y(y)$', '7/2*y^(5/2)', { y: [0, 1] }]],
  s: R`For fixed $y \in (0,1)$ the support condition $x^2 \le y$ means $-\sqrt{y} \le x \le \sqrt{y}$. So
$$f_Y(y) = \int_{-\sqrt y}^{\sqrt y}\frac{21}{4}x^2 y\dd x = \frac{21}{4}\,y\cdot\frac{2y^{3/2}}{3} = \frac72\,y^{5/2},\quad 0<y<1.$$
(You may recognize this as a $\operatorname{Beta}(7/2, 1)$ density.)`,
  src: 'Slides Ch.2 (Wasserman Example 2.38)' }),
P({ k: 'm', lvl: 4,
  q: R`Let $Z$ be a continuous random variable with PDF $f_Z$ and CDF $F_Z$. Define
$$f_{X,Y}(x,y) = \begin{cases} c\, f_Z(x) f_Z(y) & \text{if } x > y,\\ 0 & \text{otherwise.}\end{cases}$$
(a) Find $c$. (b) Find the marginal of $X$ in terms of $f_Z, F_Z$. Enter $c$, and $E(X)$ when $Z \sim \operatorname{Unif}(0,1)$.`,
  h: [R`Same trick as the 2025 midterm. In $\int\!\!\int_{x>y}$, do the inner integral in $y$ from $-\infty$ to $x$: it equals $F_Z(x)$.`, R`$\int f_Z(x)F_Z(x)\dd x = \big[\tfrac12 F_Z(x)^2\big]_{-\infty}^{\infty} = \tfrac12$.`, R`$f_X(x) = c f_Z(x) F_Z(x)$. For $\operatorname{Unif}(0,1)$: $f_X(x) = 2x$ on $(0,1)$.`],
  a: [['$c$', '2'], ['$E(X)$ (Unif case)', '2/3']],
  s: R`**(a)** $f_{X,Y} \ge 0$ requires $c > 0$. Then
$$1 = \int_{-\infty}^{\infty}\!\int_{-\infty}^{x} c f_Z(x) f_Z(y)\dd y\dd x = c\int_{-\infty}^{\infty} f_Z(x) F_Z(x)\dd x = c\left[\tfrac12 F_Z(x)^2\right]_{-\infty}^{\infty} = \frac c2,$$
since $F_Z(\infty) = 1$ and $F_Z(-\infty) = 0$. Hence $c = 2$.

**(b)** $f_X(x) = \int_{-\infty}^x 2 f_Z(x) f_Z(y)\dd y = 2 f_Z(x) F_Z(x)$, $x \in \R$.

(Similarly $f_Y(y) = \int_y^\infty 2f_Z(x)f_Z(y)\dd x = 2 f_Z(y)[1 - F_Z(y)]$.)

**Uniform case:** $f_Z = 1$, $F_Z(x) = x$ on $(0,1)$, so $f_X(x) = 2x$ and $E(X) = \int_0^1 x\cdot 2x\dd x = \frac23$.

Interpretation: $X$ behaves like the **larger** of two independent copies of $Z$.`,
  src: 'Variant of Midterm 2025 Ex.1' }),
]);

DRILLS('2.6', [
  { k: '01', lvl: 1, q: R`Find $c$ so that $f(x,y) = c\,xy$ for $0<x<1$, $0<y<1$ is a valid joint PDF.`,
    h: [R`$\int_0^1 x\dd x = \tfrac12$, and the double integral factorizes.`], a: '4',
    s: R`$c\int_0^1 x\dd x\int_0^1 y\dd y = c\cdot\tfrac12\cdot\tfrac12 = \tfrac c4 = 1 \Rightarrow c = 4$ (and $c>0$ makes $f\ge0$).` },
  { k: '02', lvl: 2, q: R`Find $c$ so that $f(x,y) = c\,(x + 2y)$ on the unit square $[0,1]^2$ is a valid joint PDF.`,
    h: [R`$\iint x = \tfrac12$, $\iint 2y = 1$.`], a: '2/3',
    s: R`$c\left(\iint x + \iint 2y\right) = c\left(\tfrac12 + 1\right) = \tfrac{3c}{2} = 1 \Rightarrow c = \tfrac23$.` },
  { k: '03', lvl: 2, q: R`Let $f(x,y) = c\,x$ for $0 < y < x < 1$. Find $c$ and the marginal $f_Y(y)$, $0<y<1$.`,
    h: [R`For $c$: inner integral over $y\in(0,x)$ gives $cx\cdot x$.`, R`For $f_Y$: fix $y$; $x$ runs from $y$ to 1.`],
    a: [['$c$', '3'], ['$f_Y(y)$', '3/2*(1-y^2)', { y: [0, 1] }]],
    s: R`$\int_0^1\int_0^x cx\dd y\dd x = c\int_0^1 x^2\dd x = \tfrac c3 = 1 \Rightarrow c = 3$.

$f_Y(y) = \int_y^1 3x\dd x = \tfrac32(1 - y^2)$ for $0 < y < 1$.` },
  { k: '04', lvl: 1, q: R`$(X,Y)$ is uniform on the triangle $0 < x < y < 2$. What is the (constant) value of the joint PDF on the triangle?`,
    h: [R`Uniform means density $= 1/\text{area}$. The triangle has legs of length 2.`], a: '1/2',
    s: R`Area $= \tfrac12\cdot 2\cdot 2 = 2$, so $f(x,y) = \tfrac12$ on the triangle.` },
  { k: '05', lvl: 2, q: R`$(X,Y)$ is uniform on $0 < x < y < 2$ (density $1/2$). Find $f_Y(y)$ for $0<y<2$ and $f_X(x)$ for $0<x<2$.`,
    h: [R`Fix $y$: $x\in(0,y)$. Fix $x$: $y \in (x, 2)$.`],
    a: [['$f_Y(y)$', 'y/2', { y: [0, 2] }], ['$f_X(x)$', '(2-x)/2', { x: [0, 2] }]],
    s: R`$f_Y(y) = \int_0^y \tfrac12\dd x = \tfrac y2$, $0<y<2$. $f_X(x) = \int_x^2\tfrac12\dd y = \tfrac{2-x}{2}$, $0<x<2$. Both integrate to 1 ✓.` },
  { k: '06', lvl: 3, q: R`Let $f(x,y) = c\,e^{-(x+y)}$ for $0 < x < y < \infty$. Find $c$, then $f_X(x)$ for $x>0$.`,
    h: [R`Inner integral in $y$ from $x$ to $\infty$: $\int_x^\infty e^{-y}\dd y = e^{-x}$.`, R`Then $\int_0^\infty c\,e^{-2x}\dd x = c/2$.`],
    a: [['$c$', '2'], ['$f_X(x)$', '2*exp(-2*x)', { x: [0, 3] }]],
    s: R`$\int_0^\infty\int_x^\infty c e^{-x}e^{-y}\dd y\dd x = c\int_0^\infty e^{-2x}\dd x = \tfrac c2 = 1 \Rightarrow c=2$.

$f_X(x) = \int_x^\infty 2e^{-x-y}\dd y = 2e^{-2x}$, $x>0$, so $X \sim \operatorname{Exp}(\beta = 1/2)$.` },
  { k: '07', lvl: 3, q: R`Same density $f(x,y) = 2e^{-(x+y)}$ on $0<x<y$. Find $f_Y(y)$ for $y > 0$.`,
    h: [R`Fix $y$: $x$ runs from 0 to $y$.`], a: [['$f_Y(y)$', '2*exp(-y)*(1-exp(-y))', { y: [0, 3] }]],
    s: R`$f_Y(y) = \int_0^y 2e^{-x}e^{-y}\dd x = 2e^{-y}(1 - e^{-y})$, $y>0$.` },
  { k: '08', lvl: 2, q: R`For $f(x,y) = \tfrac65(x + y^2)$ on $[0,1]^2$, find the marginal $f_X(x)$, $0\le x\le 1$.`,
    h: [R`Integrate out $y$ over $[0,1]$.`], a: [['$f_X(x)$', '6/5*(x+1/3)', { x: [0, 1] }]],
    s: R`$f_X(x) = \int_0^1 \tfrac65(x+y^2)\dd y = \tfrac65\left(x + \tfrac13\right) = \tfrac{6x+2}{5}$, $0\le x\le1$.` },
  { k: '09', lvl: 1, q: R`$X, Y$ are independent $\operatorname{Unif}(0,1)$, so $f(x,y) = 1$ on $[0,1]^2$. Find $P(X + Y < 1/2)$.`,
    h: [R`The region is a small triangle with legs $1/2$.`], a: '1/8',
    s: R`$\{x+y<1/2\}$ inside the square is a right triangle with legs $\tfrac12$: area $= \tfrac12\cdot\tfrac12\cdot\tfrac12 = \tfrac18$.` },
  { k: '10', lvl: 2, q: R`For $f(x,y) = 4xy$ on $[0,1]^2$, find $P(X < Y^2)$.`,
    h: [R`Inner integral: $x$ from 0 to $y^2$.`], a: '1/3',
    s: R`$\int_0^1\int_0^{y^2} 4xy\dd x\dd y = \int_0^1 2y\cdot y^4\dd y = \int_0^1 2y^5\dd y = \tfrac13$.` },
  { k: '11', lvl: 2, q: R`For $f(x,y) = \tfrac32(x^2 + y^2)$ on $[0,1]^2$ (check it is valid!), find $P(X < 1/2)$.`,
    h: [R`First integrate $y$ over $[0,1]$: $f_X(x) = \tfrac32(x^2 + \tfrac13)$.`], a: '5/16',
    s: R`Validity: $\tfrac32\left(\tfrac13+\tfrac13\right) = 1$ ✓. Marginal $f_X(x) = \tfrac32x^2 + \tfrac12$. Then $P(X<\tfrac12) = \int_0^{1/2}\left(\tfrac32x^2+\tfrac12\right)\dd x = \tfrac{1}{16} + \tfrac14 = \tfrac{5}{16}$.` },
  { k: '12', lvl: 2, q: R`Let $f(x,y) = c\,x$ on the triangle $x>0,\ y>0,\ x+y<1$. Find $c$ and $f_X(x)$, $0<x<1$.`,
    h: [R`For fixed $x$, $y\in(0,1-x)$.`], a: [['$c$', '6'], ['$f_X(x)$', '6*x*(1-x)', { x: [0, 1] }]],
    s: R`$f_X(x) = \int_0^{1-x}cx\dd y = c\,x(1-x)$. Total: $c\int_0^1 x(1-x)\dd x = \tfrac c6 = 1 \Rightarrow c=6$, so $f_X(x) = 6x(1-x)$ on $(0,1)$, a $\operatorname{Beta}(2,2)$.` },
  { k: '13', lvl: 3, q: R`For $f(x,y) = \tfrac{21}{4}x^2y$ on $x^2\le y\le 1$, find $f_X(x)$ for $-1\le x\le 1$.`,
    h: [R`Fix $x$: $y\in[x^2,1]$.`], a: [['$f_X(x)$', '21/8*x^2*(1-x^4)', { x: [-1, 1] }]],
    s: R`$f_X(x) = \int_{x^2}^1 \tfrac{21}{4}x^2y\dd y = \tfrac{21}{4}x^2\cdot\tfrac{1-x^4}{2} = \tfrac{21}{8}x^2(1-x^4)$, $-1\le x\le 1$.` },
  { k: '14', lvl: 3, q: R`For $f(x,y) = \tfrac{21}{4}x^2y$ on $x^2\le y\le 1$, find $P(Y \ge X)$.`,
    h: [R`For $x\le 0$, $y\ge x$ always holds on the support. For $0<x<1$, $x^2 \le x$, so the constraint $y\ge x$ is the binding one.`, R`$P = \int_{-1}^0 f_X(x)\dd x + \int_0^1\int_x^1 \tfrac{21}{4}x^2y\dd y\dd x$. The first piece is $1/2$ by symmetry of $f_X$.`],
    a: '1-3/20',
    s: R`Split by the sign of $x$. For $-1\le x\le0$, every $y\in[x^2,1]$ is $\ge x$, contributing $\int_{-1}^0 f_X = \tfrac12$ (since $f_X$ is even). For $0<x<1$, $x^2 < x$, so we need $y \in [x,1]$:
$$\int_0^1\int_x^1\tfrac{21}{4}x^2y\dd y\dd x = \tfrac{21}{8}\int_0^1 x^2(1-x^2)\dd x = \tfrac{21}{8}\cdot\tfrac{2}{15} = \tfrac{7}{20}.$$
Total: $\tfrac12 + \tfrac{7}{20} = \tfrac{17}{20}$.` },
  { k: '15', lvl: 2, q: R`A joint PMF is $f(x,y) = c\,xy$ for $x\in\{1,2,3\}$, $y\in\{1,2\}$. Find $c$ and $P(X = Y)$.`,
    h: [R`$\sum_x\sum_y xy = (\sum_x x)(\sum_y y)$.`, R`$X=Y$ happens at $(1,1)$ and $(2,2)$.`],
    a: [['$c$', '1/18'], ['$P(X=Y)$', '5/18']],
    s: R`$\sum xy = (1+2+3)(1+2) = 18$, so $c = \tfrac1{18}$. $P(X=Y) = f(1,1)+f(2,2) = \tfrac{1+4}{18} = \tfrac5{18}$.` },
  { k: '16', lvl: 4, q: R`Let $Z \sim \operatorname{Exp}(1)$ and $f_{X,Y}(x,y) = c\,f_Z(x)f_Z(y)$ if $x>y$, 0 otherwise. Find $c$ and $E(X)$.`,
    h: [R`$c = 2$ for any continuous $Z$ (inner integral gives $F_Z$).`, R`$f_X(x) = 2f_Z(x)F_Z(x) = 2e^{-x}(1-e^{-x})$, $x>0$.`, R`$\int_0^\infty x e^{-ax}\dd x = 1/a^2$.`],
    a: [['$c$', '2'], ['$E(X)$', '3/2']],
    s: R`As in the 2025 midterm: $1 = c\int f_Z(x)F_Z(x)\dd x = c/2$, so $c = 2$. Then $f_X(x) = 2f_Z(x)F_Z(x) = 2e^{-x}(1-e^{-x}) = 2e^{-x} - 2e^{-2x}$ for $x>0$, and
$$E(X) = \int_0^\infty x(2e^{-x} - 2e^{-2x})\dd x = 2\cdot1 - 2\cdot\tfrac14 = \tfrac32.$$
($X$ is the maximum of two independent $\operatorname{Exp}(1)$ variables.)` },
]);
