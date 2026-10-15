TOPIC({ id: '4.3', ch: 4, title: 'Mill’s inequality', summary: 'A sharp Gaussian tail bound: P(|Z|>t) ≤ √(2/π) e^{−t²/2}/t.' }, [
R`For the normal distribution we can do much better than Chebyshev, because we know the exact density. Mill's inequality shows that normal tails decay like $e^{-t^2/2}$, which is incredibly fast.`,
THM('Mill’s inequality', R`If $Z\sim N(0,1)$, then for every $t>0$:
$$P(|Z|>t)\le\sqrt{\frac2\pi}\,\frac{e^{-t^2/2}}{t} = \frac2t\,f_Z(t),$$
where $f_Z(t) = \frac{1}{\sqrt{2\pi}}e^{-t^2/2}$ is the standard normal density.`),
R`Useful identity (slides): by symmetry $F_Z(-t) = 1 - F_Z(t)$, so
$$P(|Z|>t) = P(Z>t) + P(Z<-t) = 2\big(1 - F_Z(t)\big) = 2P(Z>t).$$`,
P({ k: 'a', lvl: 4, q: R`(HW6 A2) Prove Mill's inequality. Hint: on $\{x>t\}$ we have $x/t>1$.`, h: [R`$P(|Z|>t) = 2\int_t^\infty f_Z(x)\dd x$.`, R`Insert the factor $x/t>1$: $\int_t^\infty f_Z(x)\dd x\le\int_t^\infty\frac xtf_Z(x)\dd x$.`, R`$\int_t^\infty xe^{-x^2/2}\dd x = e^{-t^2/2}$.`],
  s: R`By symmetry, $P(|Z|>t) = 2P(Z>t) = 2\int_t^\infty\frac{1}{\sqrt{2\pi}}e^{-x^2/2}\dd x$. On the range of integration $x>t$, so $\frac xt>1$ and
$$P(|Z|>t)\le2\int_t^\infty\frac xt\frac{1}{\sqrt{2\pi}}e^{-x^2/2}\dd x = \frac{2}{t\sqrt{2\pi}}\Big[-e^{-x^2/2}\Big]_t^\infty = \frac{2}{t\sqrt{2\pi}}e^{-t^2/2} = \sqrt{\frac2\pi}\frac{e^{-t^2/2}}{t}.\ \blacksquare$$`, src: 'HW6 A2 (Wasserman 4.5.5)' }),
P({ k: 'b', lvl: 2, q: R`Compute Mill's bound for $P(|Z|>2)$ and compare with the truth ($\approx0.0455$) and with Chebyshev.`, h: [R`$\sqrt{2/\pi}\approx0.7979$, $e^{-2}\approx0.1353$.`], a: [['Mill bound', 'sqrt(2/pi)*exp(-2)/2']],
  s: R`$\sqrt{2/\pi}\,e^{-2}/2\approx0.7979\cdot0.1353/2\approx0.054$. Truth $0.0455$; Chebyshev $0.25$. Mill is close to the truth.` }),
P({ k: 'c', lvl: 2, q: R`Mill's bound for $P(|Z|>3)$?`, h: [R`$\sqrt{2/\pi}e^{-4.5}/3$.`], a: 'sqrt(2/pi)*exp(-4.5)/3', s: R`$\approx0.00295$ (truth $\approx0.0027$; Chebyshev gives $\frac19\approx0.111$).` }),
P({ k: 'd', lvl: 2, q: R`Evaluate Mill's bound at $t = 0.5$. Is it informative?`, h: [R`Compare with 1.`], a: [['bound', 'sqrt(2/pi)*exp(-0.125)/0.5'], ['informative?', { choice: ['Yes', 'No'], v: 1 }]],
  s: R`$\approx1.41>1$. A probability bound above 1 tells you nothing. Mill is useful for large $t$; Chebyshev can even be better near the center.` }),
P({ k: 'e', lvl: 3, q: R`(HW6 C1) $X_1,\dots,X_n\iid N(0,1)$. Bound $P(|\bar X_n|>t)$ with Mill's inequality and with Chebyshev. Evaluate both for $n = 100$, $t = 0.2$.`,
  h: [R`$\bar X_n\sim N(0,\frac1n)$, so $\sqrt n\bar X_n = Z\sim N(0,1)$ and $P(|\bar X_n|>t) = P(|Z|>\sqrt nt)$.`],
  a: [['Mill', 'sqrt(2/pi)*exp(-2)/2'], ['Chebyshev', '0.25']],
  s: R`Since $\bar X_n\sim N(0,1/n)$:
$$P(|\bar X_n|>t) = P(|Z|>\sqrt nt)\le\sqrt{\frac2\pi}\frac{e^{-nt^2/2}}{\sqrt n\,t}\quad\text{(Mill)},\qquad P(|\bar X_n|>t)\le\frac{\operatorname{var}(\bar X_n)}{t^2} = \frac{1}{nt^2}\quad\text{(Chebyshev)}.$$
With $n = 100$, $t = 0.2$ ($\sqrt nt = 2$): Mill $\approx0.054$, Chebyshev $= 0.25$. Mill's bound decays exponentially in $n$; Chebyshev only like $1/n$.`, src: 'HW6 C1 (Wasserman 4.5.7)' }),
]);

DRILLS('4.3', [
  { k: '01', lvl: 1, q: R`Mill's bound for $P(|Z|>2.5)$?`, h: [R`$\sqrt{2/\pi}e^{-3.125}/2.5$.`], a: 'sqrt(2/pi)*exp(-3.125)/2.5', s: R`$\approx0.0140$ (truth $\approx0.0124$).` },
  { k: '02', lvl: 1, q: R`Mill's bound in the form $\frac2tf_Z(t)$ at $t = 1$, with $f_Z(1)\approx0.242$?`, h: [R`$2\cdot0.242$.`], a: '0.484', s: R`$0.484$ (truth $2(1-0.8413) = 0.3174$).` },
  { k: '03', lvl: 2, q: R`$X_1,\dots,X_{25}\iid N(0,1)$. Mill's bound for $P(|\bar X|>0.4)$?`, h: [R`$\sqrt n t = 2$.`], a: 'sqrt(2/pi)*exp(-2)/2', s: R`Same as $P(|Z|>2)$: $\approx0.054$.` },
  { k: '04', lvl: 1, q: R`$\Phi(1.5) = 0.9332$. Compute $P(|Z|>1.5)$ exactly.`, h: [R`$2(1-\Phi(t))$.`], a: '0.1336', s: R`$2(0.0668) = 0.1336$.` },
  { k: '05', lvl: 2, q: R`Compare Mill and Chebyshev for $P(|Z|>4)$.`, h: [R`Mill: $\sqrt{2/\pi}e^{-8}/4$.`], a: [['Mill', 'sqrt(2/pi)*exp(-8)/4'], ['Chebyshev', '1/16']], s: R`Mill $\approx6.7\times10^{-5}$; Chebyshev $0.0625$, about a thousand times larger.` },
  { k: '06', lvl: 3, q: R`$X\sim N(\mu,\sigma^2)$. Use Mill's inequality to bound $P(|X-\mu|>3\sigma)$.`, h: [R`Standardize: it's $P(|Z|>3)$.`], a: 'sqrt(2/pi)*exp(-4.5)/3', s: R`$P(|X-\mu|>3\sigma) = P(|Z|>3)\le\sqrt{2/\pi}e^{-4.5}/3\approx0.003$.` },
]);
