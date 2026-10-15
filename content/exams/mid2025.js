EXAM({ id: 'mid2025', title: 'Midterm 1 — Fall 2025 (real exam)', summary: 'The actual 2025 midterm: joint PDF, ratio → Cauchy, MGF → Gamma. The instructor solved it in about 40 minutes.',
  intro: R`October 15, 2025. 80 minutes. One double-sided A4 formula sheet and a simple calculator are allowed. The instructor's own solve time was about 40 minutes (Ex.1: 20 min, Ex.2: 10 min, Ex.3: 10 min).` }, [
  { k: '1', pts: 40, intro: R`Consider the random variables $X$ and $Y$ with joint PDF
$$f_{X,Y}(x,y) = \begin{cases}c\,f_Z(x)f_Z(y) & \text{if } x<y,\\ 0 & \text{otherwise,}\end{cases}$$
where $f_Z$ denotes the PDF of another random variable $Z$ (with CDF $F_Z$).`, parts: [
    { k: 'a', pts: 10, topic: '2.6', q: R`Find $c$ such that $f_{X,Y}(x,y)$ is a valid joint PDF.`,
      h: [R`Two conditions: non-negativity and total integral 1.`, R`Do the inner integral over $x$ from $-\infty$ to $y$: you get $F_Z(y)$.`],
      a: '2',
      s: R`- $f_{X,Y}(x,y)\ge0$ for all $x,y$ requires $c>0$.
- $\iint f_{X,Y}(x,y)\dd x\dd y = 1$:
$$\int_{-\infty}^{\infty}\!\int_{-\infty}^{y}c f_Z(x)f_Z(y)\dd x\dd y = c\int_{-\infty}^\infty f_Z(y)\Big[F_Z(x)\Big]_{-\infty}^{y}\dd y = c\int_{-\infty}^\infty f_Z(y)F_Z(y)\dd y$$
because $F_Z(-\infty) = 0$. Then
$$= c\left[\tfrac12F_Z(y)^2\right]_{-\infty}^{\infty} = \frac c2,$$
because $F_Z(+\infty) = 1$ and $F_Z(-\infty) = 0$. Setting $\frac c2 = 1$: $\boxed{c = 2}$.` },
    { k: 'b', pts: 10, topic: '2.6', q: R`Find the marginal distributions of $X$ and $Y$.`,
      h: [R`$f_X(x) = \int f_{X,Y}(x,y)\dd y$; on the support $y$ runs from $x$ to $\infty$.`],
      s: R`$$f_X(x) = \int_x^{\infty}2f_Z(x)f_Z(y)\dd y = 2f_Z(x)\Big[F_Z(y)\Big]_x^\infty = 2f_Z(x)\big[1 - F_Z(x)\big],\quad x\in\R.$$
$$f_Y(y) = \int_{-\infty}^{y}2f_Z(x)f_Z(y)\dd x = 2f_Z(y)\Big[F_Z(x)\Big]_{-\infty}^{y} = 2f_Z(y)F_Z(y),\quad y\in\R.$$
(Interpretation: $X$ and $Y$ are distributed like the min and the max of two iid copies of $Z$.)` },
    { k: 'c', pts: 10, topic: '2.7', q: R`Are $X$ and $Y$ independent? Justify your answer.`,
      h: [R`Compare $f_X(x)f_Y(y)$ with $f_{X,Y}(x,y)$; look at the support.`],
      a: { choice: ['Independent', 'Not independent'], v: 1 },
      s: R`$$f_X(x)f_Y(y) = 4f_Z(x)[1 - F_Z(x)]f_Z(y)F_Z(y)\ \ne\ f_{X,Y}(x,y) = \begin{cases}2f_Z(x)f_Z(y), & x<y\\0, & \text{otherwise}.\end{cases}$$
So $X$ and $Y$ are **not** independent. Also, the domain of $f_{X,Y}$ is not a product space, so they cannot be independent.` },
    { k: 'd', pts: 10, topic: '3.1', q: R`Derive $E(X)$ and $E(Y)$, under the assumption that $Z\sim\operatorname{Unif}(0,1)$.`,
      h: [R`For $\operatorname{Unif}(0,1)$: $f_Z = 1$ and $F_Z(x) = x$ on $(0,1)$.`],
      a: [['$E(X)$', '1/3'], ['$E(Y)$', '2/3']],
      s: R`With $Z\sim\operatorname{Unif}(0,1)$: $f_X(x) = 2(1-x)$ and $f_Y(y) = 2y$ on $(0,1)$.
$$E(X) = \int_0^1x\cdot2(1-x)\dd x = 2\int_0^1(x - x^2)\dd x = 2\left[\tfrac12x^2 - \tfrac13x^3\right]_0^1 = 2\cdot\tfrac16 = \tfrac13.$$
$$E(Y) = \int_0^1y\cdot2y\dd y = \left[\tfrac23y^3\right]_0^1 = \tfrac23.$$` },
  ] },
  { k: '2', pts: 30, intro: R`Let $X$ and $Y$ be two independent random variables with PDFs $f_X$, $f_Y$, respectively, supported over the entire $\R$ and symmetric about 0.`, parts: [
    { k: 'a', pts: 10, topic: '2.10', q: R`Show that the density of $Z = X/Y$ may be expressed as
$$f_Z(z) = 2\int_0^{+\infty}y\,f_X(yz)f_Y(y)\dd y,\quad z\in\R.$$`,
      h: [R`Start from the CDF, split on the sign of $Y$: $P(X/Y\le z) = P(X\le Yz, Y>0) + P(X\ge Yz, Y<0)$.`, R`Condition on $Y$, then differentiate in $z$. Substitute $y\to-y$ in the negative part and use symmetry.`],
      s: R`**CDF of $Z$:**
$$F_Z(z) = P\left(\tfrac XY\le z\right) = P\left(\tfrac XY\le z, Y>0\right) + P\left(\tfrac XY\le z, Y<0\right) = P(X\le Yz, Y>0) + P(X\ge Yz, Y<0)$$
$$= E\big[P(X\le Yz, Y>0\mid Y)\big] + E\big[P(X\ge Yz, Y<0\mid Y)\big] = \int_0^{+\infty}F_X(yz)f_Y(y)\dd y + \int_{-\infty}^0\big(1-F_X(yz)\big)f_Y(y)\dd y.$$
**PDF of $Z$:**
$$f_Z(z) = \frac{\mathrm d}{\mathrm dz}F_Z(z) = \int_0^{+\infty}yf_X(yz)f_Y(y)\dd y - \int_{-\infty}^0yf_X(yz)f_Y(y)\dd y.$$
In the second integral substitute $y\to-y$: it becomes $+\int_0^{+\infty}y\,f_X(-yz)f_Y(-y)\dd y$, and by symmetry $f_X(-yz) = f_X(yz)$ and $f_Y(-y) = f_Y(y)$. Therefore
$$f_Z(z) = 2\int_0^{+\infty}y\,f_X(yz)f_Y(y)\dd y,\quad z\in\R.$$` },
    { k: 'b', pts: 10, topic: '2.10', q: R`For $X, Y\iid N(0,1)$, use (a) to show that $Z = X/Y\sim$ Cauchy, with PDF $f_Z(z) = \frac{1}{\pi(1+z^2)}$, $z\in\R$.`,
      h: [R`Plug in the normal densities and combine the exponents: $-\frac12y^2(1+z^2)$.`, R`$\int_0^\infty ye^{-ay^2/2}\dd y = \frac1a$.`],
      a: [['$f_Z(z)$', '1/(pi*(1+z^2))', { z: [-4, 4] }]],
      s: R`$f_X(x) = \frac{1}{\sqrt{2\pi}}e^{-\frac12x^2}$ and $f_Y(y) = \frac{1}{\sqrt{2\pi}}e^{-\frac12y^2}$. So
$$f_Z(z) = 2\int_0^{+\infty}y\frac{1}{\sqrt{2\pi}}e^{-\frac12y^2z^2}\frac{1}{\sqrt{2\pi}}e^{-\frac12y^2}\dd y = \frac1\pi\int_0^{+\infty}y\,e^{-\frac12y^2(1+z^2)}\dd y$$
$$= \frac1\pi\left[-\frac{1}{1+z^2}e^{-\frac12y^2(1+z^2)}\right]_0^{+\infty} = \frac1\pi\left[0 - \left(-\frac{1}{1+z^2}\right)\right] = \frac{1}{\pi(1+z^2)},\quad z\in\R.$$
So $Z$ is Cauchy.` },
    { k: 'c', pts: 10, topic: '3.1', q: R`For $Z\sim$ Cauchy, show that the mean $E(Z)$ is not well-defined.`,
      h: [R`$\frac{2z}{1+z^2}$ is the derivative of $\log(1+z^2)$.`],
      a: { choice: ['E(Z) = 0', 'E(Z) is not well-defined'], v: 1 },
      s: R`$$E(Z) = \int_{-\infty}^{+\infty}z\frac{1}{\pi(1+z^2)}\dd z = \frac{1}{2\pi}\int_{-\infty}^{+\infty}\frac{2z}{1+z^2}\dd z = \frac1{2\pi}\Big[\log(1+z^2)\Big]_{-\infty}^{+\infty} = +\infty - (+\infty).$$
This is **not well-defined**.` },
  ] },
  { k: '3', pts: 30, intro: R`Let $X_1,\dots,X_n$ be independent and identically distributed copies of an exponential random variable $X$ with CDF $F_X(x) = 1 - \exp(-x/\beta)$, $x>0$. Let $\bar X_n = \frac1n\sum_{i=1}^nX_i$ be the sample average.`, parts: [
    { k: 'a', pts: 10, topic: '3.7', q: R`Derive the moment generating function (MGF) of $X$, $\psi_X(t)$, and that of $\bar X_n$, $\psi_{\bar X_n}(t)$.`,
      h: [R`$\psi_X(t) = E(e^{tX}) = \int_0^\infty e^{tx}\frac1\beta e^{-x/\beta}\dd x$ (rule of the lazy statistician). Needs $t<1/\beta$.`, R`$\psi_{\bar X_n}(t) = E\left(\prod_ie^{\frac tnX_i}\right)$; use independence, then identical distribution.`],
      a: [[R`$\psi_X(t)$`, '1/(1-beta*t)', { beta: [0.5, 2], t: [-0.3, 0.2] }], [R`$\psi_{\bar X_n}(t)$`, '(1-beta*t/n)^(-n)', { beta: [0.5, 2], n: [1, 8, 'int'], t: [-0.3, 0.2] }]],
      s: R`$$\psi_X(t) = E(e^{tX}) = \int_0^\infty e^{tx}\frac1\beta e^{-x/\beta}\dd x\quad\text{(rule of the lazy statistician)}$$
$$= \frac1\beta\int_0^\infty e^{x(t - 1/\beta)}\dd x = \frac1\beta\left[\frac{e^{x(t-1/\beta)}}{t - 1/\beta}\right]_0^{+\infty} \underset{t<1/\beta}{=} \frac1\beta\left[0 - \frac{1}{t-1/\beta}\right] = \frac{1}{1-\beta t} = (1-\beta t)^{-1},\quad t<\frac1\beta.$$
$$\psi_{\bar X_n}(t) = E\left(e^{t\frac1n\sum_iX_i}\right) = E\left(\prod_{i=1}^ne^{\frac tnX_i}\right) \underset{X_i\ \text{indep.}}{=} \prod_{i=1}^nE\left(e^{\frac tnX_i}\right) \underset{X_i\ \text{ident. distr.}}{=} \left[\psi_X\left(\tfrac tn\right)\right]^n = \left(1 - \tfrac\beta nt\right)^{-n},\quad t<\frac n\beta.$$` },
    { k: 'b', pts: 10, topic: '3.7', q: R`Using (a), deduce that $E(\bar X_n) = \beta$ and $\operatorname{var}(\bar X_n) = \beta^2/n$.`,
      h: [R`$E(\bar X_n) = \psi'_{\bar X_n}(0)$ and $E(\bar X_n^2) = \psi''_{\bar X_n}(0)$.`],
      s: R`$$\psi'_{\bar X_n}(0) = \frac{\beta n}{n}\left(1 - \tfrac\beta nt\right)^{-n-1}\Big|_{t=0} = \beta\ \Rightarrow\ E(\bar X_n) = \beta.$$
$$\psi''_{\bar X_n}(0) = \beta^2\frac{n+1}{n}\left(1-\tfrac\beta nt\right)^{-n-2}\Big|_{t=0} = \beta^2\frac{n+1}{n}\ \Rightarrow\ E(\bar X_n^2) = \beta^2\frac{n+1}n.$$
$$\Rightarrow\operatorname{var}(\bar X_n) = E(\bar X_n^2) - E(\bar X_n)^2 = \beta^2\frac{n+1}{n} - \beta^2 = \beta^2\left(\frac{n+1}{n} - 1\right) = \frac{\beta^2}{n}.$$` },
    { k: 'c', pts: 10, topic: '3.7', q: R`Using (a), show that the distribution of $\bar X_n$ is Gamma, and find its parameters. *Hint: the MGF of the $\operatorname{Gamma}(\alpha,\beta)$ distribution is $\psi(t) = (1-\beta t)^{-\alpha}$, $t<1/\beta$.* Enter the shape and scale as expressions in $n$ and $\beta$.`,
      h: [R`Match $(1 - \frac\beta nt)^{-n}$ with $(1-\tilde\beta t)^{-\tilde\alpha}$.`],
      a: [['shape', 'n', { n: [1, 9, 'int'] }], ['scale', 'beta/n', { beta: [0.5, 3], n: [1, 9, 'int'] }]],
      s: R`The MGF of $\bar X_n$ is $\psi_{\bar X_n}(t) = (1 - \frac\beta nt)^{-n}$, $t<\frac n\beta$. This is the MGF of a $\operatorname{Gamma}(\tilde\alpha,\tilde\beta)$ with parameters $\tilde\alpha := n$ and $\tilde\beta := \frac\beta n$. By uniqueness of MGFs, $\bar X_n\sim\operatorname{Gamma}\left(n,\frac\beta n\right)$.` },
  ] },
]);
