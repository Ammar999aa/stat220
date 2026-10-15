TECHNIQUE({ title: 'Exam technique: writing full-credit answers', summary: 'How this instructor grades, answer templates for each question type, standard tricks, common mistakes.', blocks: [
R`The midterm is **not** multiple choice. Each 10-point part asks you to *derive* or *show* something, and the instructor's solutions (see the 2025 exam) justify every step in small words under the equals signs. The goal of this page: turn knowledge into points.`,
H('The format'),
R`<ul><li><b>3 exercises: 40 + 30 + 30 points</b>, each split into 10-point parts. 80 minutes.</li><li>The instructor solved the 2025 exam in about <b>40 minutes</b> (20 + 10 + 10). Budget roughly 30 / 20 / 20 minutes and keep 10 for checking.</li><li><b>Answer the questions in order, starting each exercise on a new page</b>, as the rules in the exam announcement require. Write clearly: illegible work is not graded.</li><li>Parts build on each other: (b) often says "using (a)". If you're stuck on (a), <b>assume its result</b> (it's usually stated, e.g. "show that…") and do (b) anyway.</li></ul>`,
H('Answer templates'),
NOTE('"Find $c$ such that $f$ is a valid PDF"', R`<ol><li>"$f\ge0$ for all $x,y$ $\Rightarrow c>0$."</li><li>"$\iint f = 1$": <b>draw the support</b>, write the limits explicitly, integrate.</li><li>Solve for $c$ and box it.</li></ol>`),
NOTE('"Find the marginal(s)"', R`$f_X(x) = \int f_{X,Y}(x,y)\dd y$ with the $y$-limits **for fixed $x$**. Always finish with the support: "$f_X(x) = 2x$, $0<x<1$".`),
NOTE('"Are $X$ and $Y$ independent? Justify"', R`Either (i) show $f_X(x)f_Y(y)\ne f_{X,Y}(x,y)$ (one point suffices for "no"), or (ii) note that the support is not a product set. Give both if you can, as the 2025 solution does. For "yes", you need factorization **and** a product support.`),
NOTE('"Find the distribution / density of $Y = t(X)$ or $Z = t(X,Y)$"', R`Start with the CDF: $F_Z(z) = P(Z\le z)$. Turn the event into one about $X$ (and $Y$). **Watch for sign flips** when dividing by something that may be negative (split on its sign!). Compute the probability, often by conditioning on one variable ("$= E[P(\cdot\mid Y)]$"). Differentiate, then state the support.`),
NOTE(R`"Compute $E(\cdot)$"`, R`Write "by the rule of the lazy statistician" and integrate against the right density with the right limits. For means of things like $Y$ in a hierarchy, use $E(Y) = E[E(Y|X)]$. If asked whether a mean exists, check $\int|x|f<\infty$ (Cauchy: $\infty-\infty$, not well-defined).`),
NOTE('"Derive the MGF / identify the distribution"', R`$\psi(t) = E(e^{tX})$ by the lazy statistician rule. **State the range of $t$** where it's finite (e.g. $t<1/\beta$). For sums and means: write "$X_i$ independent" under the step $E\prod = \prod E$, and "identically distributed" under $\prod\psi_{X_i} = \psi_X^n$. Moments: $\psi'(0)$, $\psi''(0)$. To identify a distribution, match the MGF with a known one and **name the uniqueness theorem**.`),
NOTE(R`"Bound $P(\ldots)$" (Chapter 4)`, R`Name the inequality and check its hypotheses out loud: Markov needs $X\ge0$ and $E(X)<\infty$; Chebyshev needs finite variance; Hoeffding needs independence and bounded variables. Show the event inclusion you use, e.g. $\{X\ge2\lambda\}\subseteq\{|X-\lambda|\ge\lambda\}$.`),
H('Standard tricks'),
R`<ul>
<li><b>Recognize a density, skip the integral.</b> $\int_0^\infty x^{\alpha-1}e^{-x/\beta}\dd x = \beta^\alpha\Gamma(\alpha)$; $\int_0^1x^{a-1}(1-x)^{b-1}\dd x = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$; $\int_{\R}e^{-(x-m)^2/(2\sigma^2)}\dd x = \sigma\sqrt{2\pi}$.</li>
<li><b>Complete the square</b> for anything like $E(e^{aX})$ with normal $X$.</li>
<li><b>$\int f_Z F_Z = \frac12$</b>: $\frac{d}{dy}\frac12F(y)^2 = f(y)F(y)$ (2025 Ex.1).</li>
<li><b>Condition on one variable</b> for sums, ratios and products: $P(X+Y\le z) = \int F_X(z-y)f_Y(y)\dd y$.</li>
<li><b>Max and min</b>: $P(\max\le y) = F(y)^n$, $P(\min>y) = (1-F(y))^n$.</li>
<li><b>Complement</b> for "at least one".</li>
<li><b>Symmetry</b>: $f(-x) = f(x)$ lets you fold $\int_{-\infty}^0$ onto $\int_0^\infty$ (2025 Ex.2a).</li>
<li><b>Differentiate under the integral</b> in $z$: $\frac{\partial}{\partial z}F_X(yz) = yf_X(yz)$.</li>
<li><b>Indicators</b>: $E(\mathbb 1_A) = P(A)$; write counts as sums of indicators and use linearity.</li>
<li><b>Factorial moments</b> for discrete distributions: $E[X(X-1)]$ cancels the $x!$.</li>
<li><b>Tower and total-variance rules</b> for two-stage models.</li>
</ul>`,
H('Common mistakes that cost points'),
WARN('Avoid these', R`<ul>
<li>Integrating over $[0,1]^2$ when the support is a triangle. Draw it!</li>
<li>Forgetting to state the support of a marginal, a transformed variable, or where an MGF exists.</li>
<li>Saying the Cauchy mean is 0 "by symmetry". It's **not well-defined**.</li>
<li>$\operatorname{var}(X-Y) = \operatorname{var}X - \operatorname{var}Y$. Wrong: variances **add** (plus $-2\operatorname{cov}$).</li>
<li>Rate vs scale: in this course $\operatorname{Exp}(\beta)$ has **mean $\beta$**, and $\operatorname{Gamma}(\alpha,\beta)$ has MGF $(1-\beta t)^{-\alpha}$.</li>
<li>Geometric support: $\{1,2,\dots\}$ (number of trials), mean $1/p$.</li>
<li>Dividing an inequality by $Y$ without splitting on the sign of $Y$.</li>
<li>Forgetting the absolute value $|ds/dy|$ in the change-of-variables formula.</li>
<li>Confusing $<$ and $\le$ for discrete variables: $P(X<x) = F(x^-)$.</li>
<li>"Uncorrelated ⇒ independent". False in general (true only for multivariate normal).</li>
<li>Applying Markov to a variable that can be negative, or whose mean doesn't exist.</li>
</ul>`),
H('Your cheat sheet (one double-sided A4)'),
R`The **Cheat sheet** page in this app is laid out to fit exactly two A4 sides. Use it as a model, but **write your own by hand**: photocopies are not allowed, and writing it is great revision. Prioritize what you can't re-derive quickly: the distribution table (with MGFs, means and variances), the Gamma/Beta/Gaussian integrals, the max/min formulas, the change-of-variables formula, the iterated expectation/variance rules, and all of Chapter 4's inequalities with their conditions.`,
] });
