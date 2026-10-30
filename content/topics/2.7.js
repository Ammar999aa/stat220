TOPIC({ id: '2.7', ch: 2, title: 'Independence of random variables', summary: 'Factorization f(x,y)=f_X(x)f_Y(y), the product-support rule, iid samples.' }, [
R`Two random variables are **independent** when learning the value of one tells you *nothing* about the other. Rolling two separate dice: the first result does not change the odds for the second. Height and weight of a person: clearly related, so *not* independent.

For events we said $A \indep B$ when $P(A\cap B) = P(A)P(B)$. For random variables we ask for the same thing for *every* pair of values.`,
DEF('Independent random variables', R`$X$ and $Y$ are **independent**, written $X \indep Y$, if
$$f_{X,Y}(x,y) = f_X(x)\,f_Y(y) \quad\text{for all } x, y.$$
Here $f$ is the PMF in the discrete case and the PDF in the continuous case. Equivalently, $P(X\in A, Y\in B) = P(X\in A)P(Y\in B)$ for all sets $A, B$.`),
R`**Why this definition?** In the discrete case take the events $A = \{X = x\}$ and $B = \{Y = y\}$. Event independence says $P(X=x, Y=y) = P(X=x)P(Y=y)$, which is exactly $f_{X,Y} = f_Xf_Y$.

In the continuous case take $A=\{X\le x\}$, $B=\{Y\le y\}$. Then $F_{X,Y}(x,y) = F_X(x)F_Y(y)$. Differentiate in $x$ and $y$ to get $f_{X,Y} = f_X f_Y$.`,
H('Checking a table'),
R`To test independence from a joint PMF table: compute the marginals (row and column sums), then check **every** cell against (row total) × (column total). One failing cell is enough to say "not independent".`,
P({ k: 'a', lvl: 1,
  q: R`Joint PMF: $f(0,0) = 1/9$, $f(0,1) = 2/9$, $f(1,0) = 2/9$, $f(1,1) = 4/9$. Are $X$ and $Y$ independent?`,
  h: [R`Marginals: $P(X=0) = 3/9$, $P(X=1) = 6/9$, and the same for $Y$.`, R`Check each cell: e.g. $\tfrac39\cdot\tfrac39 = \tfrac19$ ✓.`],
  a: { choice: ['Independent', 'Not independent'], v: 0 },
  s: R`$f_X(0) = f_Y(0) = \tfrac13$, $f_X(1) = f_Y(1) = \tfrac23$. Then
$f_X(0)f_Y(0) = \tfrac19$ ✓, $f_X(0)f_Y(1) = \tfrac29$ ✓, $f_X(1)f_Y(0) = \tfrac29$ ✓, $f_X(1)f_Y(1) = \tfrac49$ ✓.
All four cells factor, so $X \indep Y$.`,
  src: 'Slides Ch.2' }),
EX('Same marginals, not independent', R`$f(0,0) = 0,\ f(0,1) = \tfrac12,\ f(1,0) = \tfrac12,\ f(1,1) = 0$. All marginals equal $\tfrac12$. But $f(0,0) = 0 \ne \tfrac12\cdot\tfrac12$. **Not independent**: if $X = 0$ you know for sure that $Y = 1$.`),
P({ k: 'b', lvl: 2,
  q: R`Joint PMF: $f(0,0) = 0.1$, $f(0,1) = 0.3$, $f(1,0) = 0.2$, $f(1,1) = 0.4$. Are $X$ and $Y$ independent? Also enter $P(X=0)P(Y=0)$.`,
  h: [R`$P(X=0) = 0.1 + 0.3$, $P(Y=0) = 0.1 + 0.2$.`],
  a: [['Independent?', { choice: ['Yes', 'No'], v: 1 }], ['$P(X=0)P(Y=0)$', '0.12']],
  s: R`$P(X=0) = 0.4$, $P(Y=0) = 0.3$, so $P(X=0)P(Y=0) = 0.12 \ne 0.1 = f(0,0)$. **Not independent.** One cell is enough.` }),

H('The factorization shortcut (continuous case)'),
R`Computing marginals just to test independence is slow. Two quick rules do most of the work.`,
THM('Factorization + product support', R`Suppose the joint PDF can be written as
$$f_{X,Y}(x,y) = g(x)\,h(y)\qquad \text{for } (x,y) \in A\times B,$$
and it is $0$ outside a **rectangle (product set)** $A \times B$. Then $X \indep Y$, with $f_X \propto g$ on $A$ and $f_Y \propto h$ on $B$.`),
WARN('Non-product support ⇒ NOT independent', R`If the support is **not** a rectangle, e.g. a triangle $\{0 < y < x < 1\}$, a disk, or $\{x < y\}$, then $X$ and $Y$ **cannot** be independent, even if the formula looks like $g(x)h(y)$.

Reason: pick a point $(x_0,y_0)$ outside the support where $f_X(x_0) > 0$ and $f_Y(y_0) > 0$. Then $f_{X,Y}(x_0,y_0) = 0 \ne f_X(x_0)f_Y(y_0)$.

This is exactly the justification in the 2025 midterm: *"the domain of $f_{X,Y}$ is not a product space, so they cannot be independent."*`),
P({ k: 'c', lvl: 1,
  q: R`$f(x,y) = 4xy$ for $0<x<1$, $0<y<1$. Are $X$ and $Y$ independent?`,
  h: [R`Is the support a rectangle? Does the formula split as $g(x)h(y)$?`],
  a: { choice: ['Yes', 'No'], v: 0 },
  s: R`The support $(0,1)\times(0,1)$ is a product set, and $4xy = (2x)(2y)$. So $X\indep Y$, with $f_X(x) = 2x$ and $f_Y(y) = 2y$ on $(0,1)$.` }),
P({ k: 'd', lvl: 2,
  q: R`$f(x,y) = x + y$ on $[0,1]^2$. Are $X$ and $Y$ independent? Enter also $f_X(\tfrac12)f_Y(\tfrac12)$ and compare with $f(\tfrac12,\tfrac12)$.`,
  h: [R`$x + y$ does not split as a product. Use the marginals $f_X(x) = x + \tfrac12$, $f_Y(y) = y+\tfrac12$.`],
  a: [['Independent?', { choice: ['Yes', 'No'], v: 1 }], [R`$f_X(\tfrac12)f_Y(\tfrac12)$`, '1']],
  s: R`$f_X(x) = x + \tfrac12$ and $f_Y(y) = y + \tfrac12$. At $(\tfrac12,\tfrac12)$: $f_X f_Y = 1\cdot 1 = 1$, and $f(\tfrac12,\tfrac12) = 1$ too. That one point happens to match! Try $(0,0)$: $f_Xf_Y = \tfrac14 \ne 0 = f(0,0)$. **Not independent.**

Lesson: one matching point proves nothing. You need equality *everywhere* for independence, but just one failure for dependence.` }),
P({ k: 'e', lvl: 2,
  q: R`$f(x,y) = 2$ on $0 < y < x < 1$. Are $X$ and $Y$ independent? Write a one-line justification on paper, then check.`,
  h: [R`Look at the support.`, R`Marginals were $f_X(x) = 2x$ and $f_Y(y) = 2(1-y)$. Try the point $(x,y) = (0.2, 0.8)$.`],
  a: { choice: ['Yes', 'No'], v: 1 },
  s: R`**No.** The support $\{0<y<x<1\}$ is a triangle, not a product set. Concretely, at $(0.2, 0.8)$: $f(0.2,0.8) = 0$ but $f_X(0.2)f_Y(0.8) = 0.4\cdot 0.4 = 0.16 \neq 0$.

Alternatively, $f_X(x)f_Y(y) = 4x(1-y) \ne 2$ on the support.`,
  src: 'HW3 A4(c)' }),
P({ k: 'f', lvl: 2,
  q: R`$f(x,y) = e^{-(x+y)}$ for $x>0$, $y>0$. Show $X\indep Y$ and compute $P(X < 1,\ Y > 2)$.`,
  h: [R`$e^{-(x+y)} = e^{-x}e^{-y}$ on the quadrant $(0,\infty)^2$, a product set. Each marginal is $\operatorname{Exp}(1)$.`, R`$P(X<1) = 1 - e^{-1}$, $P(Y>2) = e^{-2}$.`],
  a: '(1-exp(-1))*exp(-2)',
  s: R`On the product set $(0,\infty)\times(0,\infty)$, $f(x,y) = e^{-x}\cdot e^{-y}$, so $X\indep Y$ with $X, Y \iid \operatorname{Exp}(1)$. By independence,
$$P(X<1, Y>2) = P(X<1)P(Y>2) = (1 - e^{-1})\,e^{-2} \approx 0.0855.$$` }),

H('Functions of independent variables'),
THM('Functions preserve independence', R`If $X \indep Y$, then $g(X) \indep h(Y)$ for any functions $g, h$.

*Proof.* $P(g(X)\in A, h(Y)\in B) = P(X \in g^{-1}(A),\, Y\in h^{-1}(B)) = P(X\in g^{-1}(A))\,P(Y\in h^{-1}(B)) = P(g(X)\in A)\,P(h(Y)\in B)$. Here $g^{-1}(A) = \{x : g(x)\in A\}$ is the preimage.`),
P({ k: 'g', lvl: 2,
  q: R`$X \indep Y$ with $X \sim \operatorname{Unif}(0,1)$ and $Y \sim \operatorname{Unif}(0,1)$. Find $P(X^2 < 1/4,\ e^{Y} > e^{1/2})$.`,
  h: [R`$X^2<1/4 \iff X < 1/2$ here. And $e^Y > e^{1/2} \iff Y > 1/2$.`],
  a: '1/4',
  s: R`$X^2$ and $e^Y$ are independent (functions of independent variables). $P(X^2 < \tfrac14) = P(X<\tfrac12) = \tfrac12$ and $P(e^Y > e^{1/2}) = P(Y>\tfrac12) = \tfrac12$, so the answer is $\tfrac14$.`,
  src: 'HW3 A3 idea' }),

H('IID samples'),
DEF('IID', R`$X_1, \dots, X_n$ are **independent and identically distributed (iid)** with CDF $F$, written $X_1,\dots,X_n \iid F$, if they are mutually independent and each has the same distribution $F$. Then the joint density is the product:
$$f(x_1,\dots,x_n) = \prod_{i=1}^n f(x_i).$$
An iid sample is the standard model for "data" in statistics.`),
P({ k: 'h', lvl: 1,
  q: R`$X_1, X_2, X_3 \iid \operatorname{Unif}(0,1)$. Find $P(X_1 < \tfrac12,\ X_2<\tfrac12,\ X_3 < \tfrac12)$.`,
  h: [R`Independence lets you multiply.`],
  a: '1/8',
  s: R`$\prod_{i=1}^3 P(X_i < \tfrac12) = (\tfrac12)^3 = \tfrac18$.` }),
P({ k: 'i', lvl: 3,
  q: R`$X \sim \operatorname{Exp}(\beta = 1)$ and $Y\sim\operatorname{Exp}(\beta = 2)$ are independent (recall: $\operatorname{Exp}(\beta)$ has mean $\beta$, $P(Y > y) = e^{-y/\beta}$). Find $P(X < Y)$.`,
  h: [R`Condition on $X$: $P(X<Y) = \int_0^\infty P(Y > x) f_X(x)\dd x$.`, R`$\int_0^\infty e^{-x/2}e^{-x}\dd x = \frac{1}{3/2}$.`],
  a: '2/3',
  s: R`Using independence, integrate the joint density $f_X(x)f_Y(y)$ over $\{x<y\}$, doing the $y$-integral first:
$$P(X<Y) = \int_0^\infty f_X(x)\,P(Y > x)\dd x = \int_0^\infty e^{-x}e^{-x/2}\dd x = \frac{1}{3/2} = \frac23.$$
In general, $P(X<Y) = \dfrac{\beta_Y}{\beta_X + \beta_Y}$ for independent exponentials with means $\beta_X$, $\beta_Y$. The one with the larger mean tends to be bigger.` }),
P({ k: 'j', lvl: 4,
  q: R`(Exam style, 10 pt.) $f_{X,Y}(x,y) = 2f_Z(x)f_Z(y)$ if $x < y$, and $0$ otherwise, where $f_Z$ is a PDF with CDF $F_Z$. You found $f_X(x) = 2f_Z(x)[1-F_Z(x)]$ and $f_Y(y) = 2f_Z(y)F_Z(y)$. Are $X$ and $Y$ independent? Write a full justification on paper.`,
  h: [R`Compute $f_X(x)f_Y(y)$ and compare with $f_{X,Y}$.`, R`Also comment on the support.`],
  a: { choice: ['Independent', 'Not independent'], v: 1 },
  s: R`$$f_X(x)f_Y(y) = 4f_Z(x)[1-F_Z(x)]\,f_Z(y)F_Z(y) \;\ne\; f_{X,Y}(x,y) = \begin{cases}2f_Z(x)f_Z(y), & x<y\\ 0, & \text{otherwise.}\end{cases}$$
For example, take $x > y$ with $f_Z(x), f_Z(y) > 0$ and $0 < F_Z < 1$. The joint density is $0$ there, but the product of the marginals is positive. Hence **$X$ and $Y$ are not independent.**

Also, the support $\{x<y\}$ is not a product space, so they cannot be independent.`,
  src: 'Midterm 2025 Ex.1(c)' }),
]);

DRILLS('2.7', [
  { k: '01', lvl: 1, q: R`Joint PMF: $f(0,0) = 0.12$, $f(0,1) = 0.28$, $f(1,0) = 0.18$, $f(1,1) = 0.42$. Independent?`,
    h: [R`Marginals: $P(X=0) = 0.4$, $P(Y=0) = 0.3$.`], a: { choice: ['Yes', 'No'], v: 0 },
    s: R`$P(X=0)=0.4$, $P(X=1)=0.6$, $P(Y=0)=0.3$, $P(Y=1)=0.7$. Products: $0.12, 0.28, 0.18, 0.42$, all equal to the table. **Independent.**` },
  { k: '02', lvl: 1, q: R`Joint PMF: $f(0,0) = 0.25$, $f(0,1) = 0.25$, $f(1,0) = 0.35$, $f(1,1) = 0.15$. Independent?`,
    h: [R`Check one cell, e.g. $(1,1)$.`], a: { choice: ['Yes', 'No'], v: 1 },
    s: R`$P(X=1) = 0.5$, $P(Y=1) = 0.4$, product $0.2 \ne 0.15 = f(1,1)$. **Not independent.**` },
  { k: '03', lvl: 2, q: R`$f(x,y) = c\,xy^2$ on $[0,1]^2$. Find $c$ and the marginal $f_Y(y)$. Are $X, Y$ independent?`,
    h: [R`$\int_0^1 x\dd x\int_0^1 y^2\dd y = \tfrac12\cdot\tfrac13$.`],
    a: [['$c$', '6'], ['$f_Y(y)$', '3*y^2', { y: [0, 1] }], ['Independent?', { choice: ['Yes', 'No'], v: 0 }]],
    s: R`$c\cdot\tfrac16 = 1\Rightarrow c = 6$. Factorization on a product set: $6xy^2 = (2x)(3y^2)$, so $X\indep Y$ with $f_X = 2x$ and $f_Y = 3y^2$ on $(0,1)$.` },
  { k: '04', lvl: 2, q: R`$f(x,y) = 8xy$ on $0 < x < y < 1$. The formula factors as $(8x)(y)$... Are $X$ and $Y$ independent?`,
    h: [R`Look at the support before the formula.`], a: { choice: ['Yes', 'No'], v: 1 },
    s: R`**No.** The support $\{0<x<y<1\}$ is a triangle, not a product set. E.g. $f(0.9, 0.1) = 0$, but $f_X(0.9) > 0$ and $f_Y(0.1) > 0$. (Indeed $f_X(x) = 4x(1-x^2)$, $f_Y(y) = 4y^3$.)` },
  { k: '05', lvl: 2, q: R`$f(x,y) = e^{-y}$ for $0<x<1$, $y>0$. Find $P(X < \tfrac12,\ Y > 1)$.`,
    h: [R`Product support, and $f = 1\cdot e^{-y}$: $X\sim\operatorname{Unif}(0,1)$, $Y\sim\operatorname{Exp}(1)$, independent.`],
    a: '0.5*exp(-1)',
    s: R`Independent with $X\sim\operatorname{Unif}(0,1)$ and $Y\sim\operatorname{Exp}(1)$. So $P = \tfrac12\cdot e^{-1} \approx 0.184$.` },
  { k: '06', lvl: 1, q: R`$X, Y \iid$ continuous. Find $P(X < Y)$.`,
    h: [R`Symmetry: $P(X<Y) = P(Y<X)$, and $P(X=Y) = 0$.`], a: '1/2',
    s: R`By symmetry $P(X<Y) = P(Y<X)$. Since $P(X=Y) = 0$ for continuous variables, the two probabilities sum to 1, so each equals $\tfrac12$.` },
  { k: '07', lvl: 3, q: R`$X\sim\operatorname{Exp}(\beta=3)$, $Y\sim\operatorname{Exp}(\beta=1)$, independent. Find $P(X<Y)$.`,
    h: [R`$P(X<Y) = \int_0^\infty \tfrac13 e^{-x/3}e^{-x}\dd x$.`], a: '1/4',
    s: R`$\int_0^\infty \tfrac13e^{-x/3}\,P(Y>x)\dd x = \tfrac13\int_0^\infty e^{-4x/3}\dd x = \tfrac13\cdot\tfrac34 = \tfrac14$. (Formula: $\beta_Y/(\beta_X+\beta_Y) = 1/4$.)` },
  { k: '08', lvl: 3, q: R`$X, Y\iid\operatorname{Unif}(0,1)$. Find $P(|X - Y| < \tfrac12)$.`,
    h: [R`Complement: two corner triangles where $|x-y|\ge\tfrac12$.`], a: '3/4',
    s: R`The region $|x-y|\ge \tfrac12$ consists of two right triangles with legs $\tfrac12$, each of area $\tfrac18$. So $P(|X-Y|<\tfrac12) = 1 - \tfrac14 = \tfrac34$.` },
  { k: '09', lvl: 1, q: R`$X_1,\dots,X_4 \iid \operatorname{Ber}(0.3)$. Find $P(X_1 = X_2 = X_3 = X_4 = 0)$.`,
    h: [R`Multiply.`], a: '0.7^4', s: R`$(1-0.3)^4 = 0.7^4 = 0.2401$.` },
  { k: '10', lvl: 3, q: R`$f(x,y) = c(1 + xy)$ on $[-1,1]^2$. Find $c$ and $f_X(x)$. Are $X,Y$ independent?`,
    h: [R`$\iint xy = 0$ by symmetry, so $\iint (1+xy) = 4$.`, R`$f_X(x) = \int_{-1}^1 \tfrac14(1+xy)\dd y = \tfrac12$.`],
    a: [['$c$', '1/4'], ['$f_X(x)$', '1/2', { x: [-1, 1] }], ['Independent?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`$c\cdot 4 = 1$, so $c=\tfrac14$ (and $1+xy\ge0$ on the square). The marginals are uniform: $f_X(x) = \tfrac12$, $f_Y(y) = \tfrac12$ on $[-1,1]$. But $f_Xf_Y = \tfrac14 \ne \tfrac14(1+xy)$ whenever $xy\neq0$. **Not independent**, even though the support is a square. The formula does not factor.` },
  { k: '11', lvl: 3, q: R`Joint PMF on $\{0,1\}^2$: $f(0,0) = a$, $f(0,1) = 0.2$, $f(1,0) = 0.3$, $f(1,1) = b$. Find $a$ (assume $a < b$) such that $X\indep Y$.`,
    h: [R`Total probability: $a + b = 0.5$.`, R`For a $2\times2$ table, independence $\iff f(0,0)f(1,1) = f(0,1)f(1,0)$, i.e. $ab = 0.06$.`],
    a: '0.2',
    s: R`$a+b = 0.5$ and $ab = 0.06$, so $a, b$ are roots of $t^2 - 0.5t + 0.06 = 0$, i.e. $t = 0.2$ or $0.3$. With $a<b$: $a = 0.2$, $b = 0.3$. Check: $P(X=0) = 0.4$, $P(Y=0) = 0.5$, $0.4\cdot0.5 = 0.2 = a$ ✓; $P(X=1)P(Y=1) = 0.6\cdot0.5 = 0.3 = b$ ✓.` },
  { k: '12', lvl: 2, q: R`$X \indep Y$ with $X\sim\operatorname{Ber}(0.5)$ and $Y \sim \operatorname{Poisson}(2)$. Find $P(X = 1, Y = 0)$.`,
    h: [R`$P(Y=0) = e^{-2}$.`], a: '0.5*exp(-2)', s: R`$P(X=1)P(Y=0) = 0.5\,e^{-2} \approx 0.0677$.` },
  { k: '13', lvl: 4, q: R`(10 pt) $f(x,y) = c\,e^{-x}$ on $0 < y < x$. Find $c$ and decide whether $X\indep Y$, with justification.`,
    h: [R`$\int_0^\infty\int_0^x e^{-x}\dd y\dd x = \int_0^\infty xe^{-x}\dd x = 1$.`],
    a: [['$c$', '1'], ['Independent?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`$\int_0^\infty\int_0^x c e^{-x}\dd y\dd x = c\int_0^\infty xe^{-x}\dd x = c\,\Gamma(2) = c = 1$.

Marginals: $f_X(x) = xe^{-x}$ ($x>0$, a $\operatorname{Gamma}(2,1)$), $f_Y(y) = \int_y^\infty e^{-x}\dd x = e^{-y}$ ($y>0$). Then $f_Xf_Y = xe^{-x}e^{-y} \ne e^{-x}\mathbb 1\{0<y<x\}$. Also, the support is not a product set. **Not independent.**` },
  { k: '14', lvl: 3, q: R`Two fair dice are rolled. $X$ = first die, $Y$ = second die, $S = X + Y$, and $Z = S \bmod 6$ (the remainder of $S$ after division by 6, so $Z\in\{0,1,\dots,5\}$). Find $P(X = 1, Z = 0)$. Are $X$ and $Z$ independent? Are $X$ and $S$ independent?`,
    h: [R`$Z$ is computed from $X$, so it is tempting to say "dependent". Don't guess: check the factorization $P(X = x, Z = r) = P(X = x)P(Z = r)$ cell by cell.`, R`Fix $X = x$. As $Y$ runs through $1,\dots,6$, the sum $x + Y$ runs through 6 consecutive integers, and 6 consecutive integers hit every remainder mod 6 exactly once. So $P(Z = r\mid X = x) = \tfrac16$ for every $x$ and $r$.`, R`For $X$ and $S$, one failing cell is enough. Try $P(X = 1, S = 12)$.`],
    a: [['$P(X=1, Z=0)$', '1/36'], ['$X$, $Z$ independent?', { choice: ['Yes', 'No'], v: 0 }], ['$X$, $S$ independent?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**$P(X = 1, Z = 0)$.** With $X = 1$ we need $1 + Y$ to be a multiple of 6, i.e. $Y = 5$. So $P(X=1, Z=0) = P(X=1)P(Y=5) = \tfrac16\cdot\tfrac16 = \tfrac1{36}$.

**$X$ and $Z$.** Fix any $x\in\{1,\dots,6\}$. The values $x+1, x+2, \dots, x+6$ are 6 consecutive integers, so they have 6 different remainders mod 6: each $r\in\{0,\dots,5\}$ comes from exactly one value of $Y$. Hence
$$P(X = x, Z = r) = P(X = x)\,P(Y = \text{that one value}) = \tfrac16\cdot\tfrac16 = \tfrac1{36}.$$
Summing over $x$: $P(Z = r) = 6\cdot\tfrac1{36} = \tfrac16$, so $Z$ is uniform on $\{0,\dots,5\}$, and every cell satisfies $P(X=x, Z=r) = \tfrac1{36} = P(X=x)P(Z=r)$. **$X\indep Z$**, even though $Z$ is computed from $X$.

**$X$ and $S$.** $P(X = 1, S = 12) = 0$ (you need both dice to be 6), but $P(X=1)P(S=12) = \tfrac16\cdot\tfrac1{36} > 0$. **Not independent.**

Lesson: "$Z$ is a function of $X$ (and something else)" does not imply dependence. Independence is a statement about probabilities, and you must check it with the factorization.` },
  { k: '15', lvl: 4, q: R`(Exam style, 10 pt.) $X, Y\iid\operatorname{Exp}(1)$. Let $U = \min(X,Y)$ and $W = |X - Y|$.

(a) For $u, w\ge0$, compute the joint survival function $P(U > u,\ W > w)$.

(b) Deduce the distributions of $U$ and $W$.

(c) Are $U$ and $W$ independent? Justify.`,
    h: [R`$P(X = Y) = 0$, so split into $\{X<Y\}$ and $\{Y<X\}$. By symmetry the two pieces are equal: $P(U>u, W>w) = 2P(X<Y,\ X>u,\ Y > X + w)$.`, R`Condition on $X = x$ (with $x > u$): you need $Y > x + w$, which has probability $e^{-(x+w)}$. So the piece is $\int_u^\infty e^{-x}e^{-(x+w)}\dd x$.`, R`For (b) put $w = 0$ (then $\{W > 0\}$ has probability 1) or $u = 0$.`, R`For (c): if the joint survival function factors for all $u, w$, then so does the joint CDF, because $F_{U,W}(u,w) = 1 - P(U>u) - P(W>w) + P(U>u, W>w)$.`],
    a: [[R`$P(U>u, W>w)$`, 'exp(-2*u-w)', { u: [0, 2], w: [0, 2] }], [R`$P(W>w)$`, 'exp(-w)', { w: [0, 3] }], ['Independent?', { choice: ['Yes', 'No'], v: 0 }]],
    s: R`**(a)** Since $P(X=Y) = 0$ and the roles of $X, Y$ are symmetric,
$$P(U>u, W>w) = 2P(X<Y,\ X>u,\ Y-X>w) = 2\int_u^\infty e^{-x}\,P(Y > x + w)\dd x = 2\int_u^\infty e^{-x}e^{-x-w}\dd x.$$
(On $\{X<Y\}$: $U = X$ and $W = Y - X$.) Then
$$= 2e^{-w}\left[-\tfrac12e^{-2x}\right]_u^\infty = e^{-2u}\,e^{-w},\qquad u, w\ge0.$$
**(b)** $u$ any, $w = 0$: $P(U>u) = e^{-2u}$, so $U\sim\operatorname{Exp}(\tfrac12)$ (mean $\tfrac12$; the rates add). $u = 0$: $P(W>w) = e^{-w}$, so $W\sim\operatorname{Exp}(1)$.

**(c)** $P(U>u, W>w) = e^{-2u}e^{-w} = P(U>u)P(W>w)$ for all $u, w\ge0$. Then the joint CDF also factors:
$$F_{U,W}(u,w) = 1 - e^{-2u} - e^{-w} + e^{-2u}e^{-w} = (1 - e^{-2u})(1 - e^{-w}) = F_U(u)F_W(w).$$
So **$U\indep W$**. (Intuition: memorylessness. Once the first of the two clocks rings at time $U$, the other one starts afresh and needs an extra $\operatorname{Exp}(1)$ time, whatever $U$ was.)` },
]);
