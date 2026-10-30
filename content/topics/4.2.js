TOPIC({ id: '4.2', ch: 4, title: 'Hoeffding’s inequality', summary: 'Exponential tail bounds for sums of bounded variables; Bernoulli version and confidence intervals.' }, [
R`Chebyshev's bound for a sample mean decays like $1/n$. For **bounded** random variables we can do dramatically better: the bound decays **exponentially** in $n$. That is Hoeffding's inequality, the workhorse behind confidence intervals in machine learning.`,
THM('Hoeffding’s inequality (general form)', R`Let $Y_1,\dots,Y_n$ be independent with $E(Y_i) = 0$ and $a_i\le Y_i\le b_i$. For any $\varepsilon>0$ and any $t>0$:
$$P\left(\sum_{i=1}^nY_i\ge\varepsilon\right)\le e^{-t\varepsilon}\prod_{i=1}^ne^{t^2(b_i-a_i)^2/8}.$$`),
R`**Proof idea (slides).**
<ol><li>Exponentiate and use Markov: $P(\sum Y_i\ge\varepsilon) = P(e^{t\sum Y_i}\ge e^{t\varepsilon})\le e^{-t\varepsilon}E(e^{t\sum Y_i}) = e^{-t\varepsilon}\prod E(e^{tY_i})$, using independence.</li><li>Write $Y_i = \alpha b_i + (1-\alpha)a_i$ with $\alpha = \frac{Y_i-a_i}{b_i-a_i}$. Convexity of $y\mapsto e^{ty}$ gives $e^{tY_i}\le\alpha e^{tb_i}+(1-\alpha)e^{ta_i}$.</li><li>Take expectations (using $E(Y_i) = 0$). A Taylor argument on $g(u) = -\gamma u + \log(1-\gamma+\gamma e^u)$ shows $E(e^{tY_i})\le e^{t^2(b_i-a_i)^2/8}$.</li></ol>
Then choose $t$ to make the bound as small as possible.`,
THM('Hoeffding for Bernoulli means', R`If $X_1,\dots,X_n\iid\operatorname{Ber}(p)$ and $\bar X_n = \frac1n\sum X_i$, then for any $\varepsilon>0$:
$$P\big(|\bar X_n - p|>\varepsilon\big)\le2e^{-2n\varepsilon^2}.$$`),
R`*Derivation from the general form.* Put $Y_i = \frac{X_i - p}{n}$. Then $E(Y_i) = 0$ and $-\frac pn\le Y_i\le\frac{1-p}n$, so $b_i - a_i = \frac1n$, and $\sum Y_i = \bar X_n - p$. The bound becomes $e^{-t\varepsilon}e^{t^2/(8n)} = e^{h(t)}$ with $h(t) = \frac{t^2}{8n} - t\varepsilon$. Minimizing, $h'(t) = 0$ at $t^* = 4n\varepsilon$, so $h(t^*) = 2n\varepsilon^2 - 4n\varepsilon^2 = -2n\varepsilon^2$. That gives $P(\bar X_n - p\ge\varepsilon)\le e^{-2n\varepsilon^2}$. The same bound holds for the lower tail by symmetry, which explains the factor 2.`,
P({ k: 'a', lvl: 1, q: R`$n = 100$ coin flips, $\varepsilon = 0.2$. Hoeffding bound for $P(|\bar X_n - p|>0.2)$?`, h: [R`$2e^{-2n\varepsilon^2}$ with $2n\varepsilon^2 = 8$.`], a: '2*exp(-8)', s: R`$2e^{-8}\approx0.00067$.`, src: 'Slides Ch.4' }),
P({ k: 'b', lvl: 2, q: R`Same setting ($n = 100$, $\varepsilon = 0.2$). What does Chebyshev give, using $p(1-p)\le\frac14$?`, h: [R`$\frac{p(1-p)}{n\varepsilon^2}$.`], a: '0.0625', s: R`$\frac{1/4}{100\cdot0.04} = \frac1{16} = 0.0625$. Hoeffding ($0.00067$) is about 100 times smaller.`, src: 'Slides Ch.4' }),
H('Confidence intervals from Hoeffding'),
R`We want an interval $C_n = (\bar X_n - \varepsilon_n, \bar X_n + \varepsilon_n)$ that contains the unknown $p$ with probability at least $1-\alpha$ (e.g. $\alpha = 0.05$). Since $P(p\notin C_n) = P(|\bar X_n - p|\ge\varepsilon_n)\le2e^{-2n\varepsilon_n^2}$, it suffices to set the bound equal to $\alpha$:
$$2e^{-2n\varepsilon_n^2} = \alpha\iff\varepsilon_n = \sqrt{\frac{1}{2n}\log\frac2\alpha}.$$
Then $C_n$ is a $1-\alpha$ confidence interval for $p$, valid for **every** $n$ (not just asymptotically).`,
P({ k: 'c', lvl: 2, q: R`$n = 200$, $\alpha = 0.05$. Compute the Hoeffding half-width $\varepsilon_n$.`, h: [R`$\sqrt{\frac{\log40}{400}}$.`], a: 'sqrt(log(40)/400)', s: R`$\varepsilon_n = \sqrt{\frac{\log 40}{400}}\approx\sqrt{\frac{3.689}{400}}\approx0.096$.` }),
P({ k: 'd', lvl: 2, q: R`How many observations guarantee (by Hoeffding) $P(|\bar X_n - p|>0.1)\le0.05$?`, h: [R`$2e^{-0.02n}\le0.05\iff n\ge\frac{\log40}{0.02}$.`], a: '185', s: R`$n\ge\frac{\log40}{0.02}\approx184.4$, so $n = 185$. Compare Chebyshev's $n = 500$ for the same guarantee (topic 4.1).` }),
P({ k: 'e', lvl: 3, q: R`(HW6 B2) $X_1,\dots,X_n\iid\operatorname{Ber}(p)$. Bound $P(|\bar X_n - p|>\varepsilon)$ with Chebyshev and with Hoeffding. With $p = \frac12$, $\varepsilon = 0.1$: which bound is smaller at $n = 100$? At $n = 1000$?`,
  h: [R`Chebyshev: $\frac{p(1-p)}{n\varepsilon^2}$. Hoeffding: $2e^{-2n\varepsilon^2}$.`, R`At $n = 100$: $0.25$ vs $2e^{-2}\approx0.271$.`],
  a: [['smaller at n = 100', { choice: ['Chebyshev', 'Hoeffding'], v: 0 }], ['smaller at n = 1000', { choice: ['Chebyshev', 'Hoeffding'], v: 1 }]],
  s: R`Chebyshev: $P(|\bar X_n - p|>\varepsilon)\le\frac{\operatorname{var}(\bar X_n)}{\varepsilon^2} = \frac{p(1-p)}{n\varepsilon^2}$. Hoeffding: $\le2e^{-2n\varepsilon^2}$.

With $p = \frac12$, $\varepsilon = 0.1$: at $n = 100$, Chebyshev $= 0.25$ and Hoeffding $= 2e^{-2}\approx0.271$, so **Chebyshev is (slightly) smaller**. At $n = 1000$: Chebyshev $= 0.025$, Hoeffding $= 2e^{-20}\approx4\times10^{-9}$, so **Hoeffding is far smaller**.

In general the ratio $\frac{2e^{-2n\varepsilon^2}}{p(1-p)/(n\varepsilon^2)} = \frac{2n\varepsilon^2e^{-2n\varepsilon^2}}{p(1-p)}\to0$ as $n\to\infty$, because the exponential beats the linear factor. So Hoeffding is eventually smaller (here for $n\ge108$).`, src: 'HW6 B2 (Wasserman 4.5.3)' }),
P({ k: 'f', lvl: 3, q: R`$Y_1,\dots,Y_{50}$ independent, uniform on $[-1,1]$ (mean 0). Optimize $t$ in the general Hoeffding bound to bound $P\left(\sum Y_i\ge10\right)$.`, h: [R`$\sum(b_i-a_i)^2 = 50\cdot4 = 200$. Minimizing $-t\varepsilon + \frac{t^2}{8}\sum(b_i-a_i)^2$ gives $\exp\left(-\frac{2\varepsilon^2}{\sum(b_i-a_i)^2}\right)$.`], a: 'exp(-1)',
  s: R`Exponent $h(t) = -t\varepsilon + \frac{t^2}{8}S$ with $S = \sum(b_i-a_i)^2 = 200$. Minimum at $t^* = \frac{4\varepsilon}{S}$, giving $h = -\frac{2\varepsilon^2}{S} = -\frac{200}{200} = -1$. Bound: $e^{-1}\approx0.37$.` }),
]);

DRILLS('4.2', [
  { k: '01', lvl: 1, q: R`Hoeffding bound for $P(|\bar X_n - p|>0.1)$ with $n = 50$?`, h: [R`$2n\varepsilon^2 = 1$.`], a: '2*exp(-1)', s: R`$2e^{-1}\approx0.736$, not very informative at this $n$.` },
  { k: '02', lvl: 1, q: R`Hoeffding bound with $n = 500$, $\varepsilon = 0.05$?`, h: [R`$2n\varepsilon^2 = 2.5$.`], a: '2*exp(-2.5)', s: R`$2e^{-2.5}\approx0.164$.` },
  { k: '03', lvl: 2, q: R`Hoeffding 95% half-width for $n = 100$?`, h: [R`$\sqrt{\log(40)/200}$.`], a: 'sqrt(log(40)/200)', s: R`$\approx0.136$.` },
  { k: '04', lvl: 2, q: R`Smallest $n$ with Hoeffding guaranteeing $P(|\bar X_n - p|>0.05)\le0.05$?`, h: [R`$n\ge\frac{\log40}{2\cdot0.0025}$.`], a: '738', s: R`$\frac{3.689}{0.005}\approx737.8\Rightarrow n = 738$.` },
  { k: '05', lvl: 2, q: R`$n = 100$, $\varepsilon = 0.2$, $p = \frac12$: Chebyshev bound vs Hoeffding bound.`, h: [R`$\frac{0.25}{4}$ and $2e^{-8}$.`], a: [['Chebyshev', '0.0625'], ['Hoeffding', '2*exp(-8)']], s: R`$0.0625$ vs $0.00067$.` },
  { k: '06', lvl: 2, q: R`400 coin-flip results give $\bar x = 0.3$. Upper end of the 95% Hoeffding confidence interval for $p$?`, h: [R`$0.3 + \sqrt{\log40/800}$.`], a: '0.3+sqrt(log(40)/800)', s: R`$\varepsilon = \sqrt{3.689/800}\approx0.068$, so the interval is about $(0.232, 0.368)$.` },
  { k: '07', lvl: 3, q: R`$Y_1,\dots,Y_{10}$ independent, mean zero, with $-1\le Y_i\le2$. Optimized Hoeffding bound for $P(\sum Y_i\ge15)$?`, h: [R`$\exp\left(-\frac{2\varepsilon^2}{\sum(b_i-a_i)^2}\right)$ with $\sum = 90$.`], a: 'exp(-5)', s: R`$\exp\left(-\frac{2\cdot225}{90}\right) = e^{-5}\approx0.0067$.` },
  { k: '08', lvl: 2, q: R`In the Bernoulli Hoeffding derivation, $h(t) = \frac{t^2}{8n} - t\varepsilon$. Find the minimizer $t^*$ for $n = 10$, $\varepsilon = 0.3$.`, h: [R`$t^* = 4n\varepsilon$.`], a: '12', s: R`$h'(t) = \frac{t}{4n} - \varepsilon = 0\Rightarrow t^* = 4n\varepsilon = 12$.` },
  { k: '09', lvl: 3, q: R`You roll a fair die $n$ times and let $\bar X_n$ be the average roll ($\mu = 3.5$). (a) Using Hoeffding (general form, optimized), find the smallest $n$ that guarantees $P(|\bar X_n - 3.5|\ge0.5)\le0.05$. (b) Find the smallest $n$ that Chebyshev guarantees for the same thing, using the exact variance of a die roll.`,
    h: [R`The Bernoulli formula $2e^{-2n\varepsilon^2}$ assumes values in $[0,1]$. Here each roll lies in $[1,6]$: the width is $b - a = 5$, not 6. Put $Y_i = \frac{X_i - 3.5}{n}$, so $b_i - a_i = \frac5n$ and $\sum Y_i = \bar X_n - 3.5$.`, R`The optimized general bound is $\exp\left(-\frac{2\varepsilon^2}{\sum(b_i-a_i)^2}\right)$, here with $\sum(b_i-a_i)^2 = n\cdot\frac{25}{n^2} = \frac{25}{n}$. Double it for the two-sided event.`, R`Die variance: $E(X^2) - \mu^2 = \frac{91}{6} - \frac{49}{4} = \frac{35}{12}$, so $\operatorname{var}(\bar X_n) = \frac{35}{12n}$.`],
    a: [['(a) Hoeffding n', '185'], ['(b) Chebyshev n', '234']],
    s: R`**(a)** With $Y_i = (X_i - 3.5)/n$: $E(Y_i) = 0$, $Y_i\in\left[-\frac{2.5}{n}, \frac{2.5}{n}\right]$, so $(b_i - a_i)^2 = \frac{25}{n^2}$ and $S = \sum(b_i-a_i)^2 = \frac{25}{n}$. The optimized Hoeffding bound is
$$P(\bar X_n - 3.5\ge\varepsilon)\le\exp\left(-\frac{2\varepsilon^2}{S}\right) = \exp\left(-\frac{2n\varepsilon^2}{25}\right).$$
The same holds for the lower tail (apply it to $-Y_i$), so $P(|\bar X_n - 3.5|\ge\varepsilon)\le2e^{-2n\varepsilon^2/25}$. With $\varepsilon = 0.5$: $2e^{-n/50}\le0.05\iff n\ge50\log40\approx184.4$, so $n = 185$.

(Trap: using width 6 gives $n\ge72\log40\approx266$, a valid but needlessly large answer. The width of $\{1,\dots,6\}$ is 5.)

**(b)** $\operatorname{var}(X_i) = \frac{35}{12}$, so Chebyshev gives $P(|\bar X_n - 3.5|\ge0.5)\le\frac{35/12}{0.25n} = \frac{35}{3n}$. We need $\frac{35}{3n}\le0.05$, i.e. $n\ge\frac{700}{3}\approx233.3$, so $n = 234$.

Hoeffding still wins, but by less than for coin flips: it only uses the range, and a die's variance $\frac{35}{12}\approx2.92$ is not far below the largest variance possible on $[1,6]$, which is $\frac{25}{4} = 6.25$.` },
  { k: '10', lvl: 4, q: R`(A/B test) $X_1,\dots,X_n\iid\operatorname{Ber}(p_1)$ and, independently, $Z_1,\dots,Z_n\iid\operatorname{Ber}(p_2)$. Let $D = \bar X_n - \bar Z_n$ and $\delta = p_1 - p_2$.
(a) Use the general Hoeffding inequality (optimize over $t$) to show $P(|D - \delta|\ge\varepsilon)\le2e^{-n\varepsilon^2}$. Enter the one-sided bound for $n = 500$, $\varepsilon = 0.1$.
(b) Give the half-width $\varepsilon_n$ of a 95% confidence interval $D\pm\varepsilon_n$ for $\delta$ when $n = 400$.
(c) With $n = 400$ you observe $\bar x = 0.42$ and $\bar z = 0.35$. Does the interval rule out $\delta = 0$?`,
    h: [R`Write $D - \delta$ as a sum of $2n$ independent, mean-zero terms: $\frac{X_i - p_1}{n}$ for $i\le n$, and $-\frac{Z_j - p_2}{n}$ for $j\le n$.`, R`Each term has range width $\frac1n$, so $\sum(b_i-a_i)^2 = 2n\cdot\frac{1}{n^2} = \frac2n$, twice what a single sample gives.`, R`Optimizing $-t\varepsilon + \frac{t^2}{8}S$ gives $e^{-2\varepsilon^2/S}$. Then set $2e^{-n\varepsilon^2} = \alpha$ and solve for $\varepsilon$.`],
    a: [['(a) one-sided bound', 'exp(-5)'], ['(b) half-width', 'sqrt(log(40)/400)'], ['(c) rules out δ = 0?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** Define $Y_i = \frac{X_i - p_1}{n}$ for $i = 1,\dots,n$ and $Y_{n+j} = -\frac{Z_j - p_2}{n}$ for $j = 1,\dots,n$. These $2n$ variables are independent with mean 0, and $\sum_{i=1}^{2n}Y_i = \bar X_n - \bar Z_n - (p_1 - p_2) = D - \delta$. Each lies in an interval of width $\frac1n$ (e.g. $Y_i\in[-\frac{p_1}{n}, \frac{1-p_1}{n}]$), so $S = \sum(b_i - a_i)^2 = \frac{2n}{n^2} = \frac2n$.

General Hoeffding: $P(D - \delta\ge\varepsilon)\le\exp\left(-t\varepsilon + \frac{t^2S}{8}\right)$. The exponent is minimized at $t^* = \frac{4\varepsilon}{S}$, giving $-\frac{2\varepsilon^2}{S} = -n\varepsilon^2$. So $P(D - \delta\ge\varepsilon)\le e^{-n\varepsilon^2}$. Applying the same argument to $-Y_i$ bounds the lower tail, hence $P(|D-\delta|\ge\varepsilon)\le2e^{-n\varepsilon^2}$.

With $n = 500$, $\varepsilon = 0.1$: one-sided bound $e^{-5}\approx0.0067$.

Note the exponent is $n\varepsilon^2$, not $2n\varepsilon^2$: the difference of two means is noisier than one mean, because both samples contribute.

**(b)** $2e^{-n\varepsilon_n^2} = 0.05\iff\varepsilon_n = \sqrt{\frac{\log40}{n}} = \sqrt{\frac{\log40}{400}}\approx0.096$.

**(c)** $D = 0.07$, so the interval is about $(-0.026, 0.166)$. It contains 0, so this data **cannot** rule out $p_1 = p_2$ at the 95% level, even though $\bar x>\bar z$.` },
]);
