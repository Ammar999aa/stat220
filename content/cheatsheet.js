CHEATSHEET({
  intro: R`Everything for Chapters 1–4 on **two A4 sides**, in the instructor's notation. Press **Print** to get a paper copy you can learn from. The exam allows one double-sided A4 sheet but **no photocopies**, so copy what you need **by hand**. Writing it is half the revision.`,
  pages: [
R`<div class="wide"><h3>Distributions (this course uses the scale β: Exp(β) has mean β)</h3>
<table>
<tr><th>Dist.</th><th>PMF/PDF, support</th><th>Mean</th><th>Var</th><th>MGF $\psi(t)$</th></tr>
<tr><td>$\delta_a$</td><td>$P(X=a)=1$</td><td>$a$</td><td>0</td><td>$e^{at}$</td></tr>
<tr><td>Unif$\{1..k\}$</td><td>$\frac1k$</td><td>$\frac{k+1}2$</td><td>$\frac{k^2-1}{12}$</td><td></td></tr>
<tr><td>Ber$(p)$</td><td>$p^x(1-p)^{1-x}$, $\{0,1\}$</td><td>$p$</td><td>$p(1-p)$</td><td>$1-p+pe^t$</td></tr>
<tr><td>Bin$(n,p)$</td><td>$\binom nxp^x(1-p)^{n-x}$</td><td>$np$</td><td>$np(1-p)$</td><td>$(1-p+pe^t)^n$</td></tr>
<tr><td>Geom$(p)$</td><td>$(1-p)^{x-1}p$, $x\ge1$</td><td>$\frac1p$</td><td>$\frac{1-p}{p^2}$</td><td>$\frac{pe^t}{1-(1-p)e^t}$</td></tr>
<tr><td>Pois$(\lambda)$</td><td>$e^{-\lambda}\frac{\lambda^x}{x!}$, $x\ge0$</td><td>$\lambda$</td><td>$\lambda$</td><td>$e^{\lambda(e^t-1)}$</td></tr>
<tr><td>Hypergeo</td><td>$\binom Kx\binom{N-K}{n-x}/\binom Nn$</td><td>$\frac{nK}N$</td><td></td><td></td></tr>
<tr><td>Unif$(a,b)$</td><td>$\frac1{b-a}$</td><td>$\frac{a+b}2$</td><td>$\frac{(b-a)^2}{12}$</td><td>$\frac{e^{tb}-e^{ta}}{t(b-a)}$</td></tr>
<tr><td>Exp$(\beta)$</td><td>$\frac1\beta e^{-x/\beta}$, $x>0$</td><td>$\beta$</td><td>$\beta^2$</td><td>$(1-\beta t)^{-1}$</td></tr>
<tr><td>Gamma$(\alpha,\beta)$</td><td>$\frac{x^{\alpha-1}e^{-x/\beta}}{\beta^\alpha\Gamma(\alpha)}$</td><td>$\alpha\beta$</td><td>$\alpha\beta^2$</td><td>$(1-\beta t)^{-\alpha}$, $t<\frac1\beta$</td></tr>
<tr><td>Beta$(\alpha,\beta)$</td><td>$\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1}$</td><td>$\frac\alpha{\alpha+\beta}$</td><td>$\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$</td><td></td></tr>
<tr><td>$N(\mu,\sigma^2)$</td><td>$\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$</td><td>$\mu$</td><td>$\sigma^2$</td><td>$e^{\mu t+\sigma^2t^2/2}$</td></tr>
<tr><td>$\chi^2_p$</td><td>Gamma$(\frac p2,2)$; $\sum_1^pZ_i^2$</td><td>$p$</td><td>$2p$</td><td>$(1-2t)^{-p/2}$</td></tr>
<tr><td>Cauchy</td><td>$\frac1{\pi(1+x^2)}$ ($=t_1$)</td><td>undef.</td><td>—</td><td>none</td></tr>
<tr><td>Pareto$(\alpha)$</td><td>$\alpha x^{-\alpha-1}$, $x>1$; $P(X>x)=x^{-\alpha}$</td><td>$\frac{\alpha}{\alpha-1}$ ($\alpha>1$)</td><td></td><td></td></tr>
</table></div>
<h3>Ch.1 Probability</h3>
<div class="k"><b>Axioms</b>: $P(A)\ge0$, $P(\Omega)=1$, $P(\cup A_i)=\sum P(A_i)$ for disjoint $A_i$. ⇒ $P(\emptyset)=0$, $P(A^c)=1-P(A)$, $A\subseteq B\Rightarrow P(A)\le P(B)$, $P(A\cup B)=P(A)+P(B)-P(AB)$; $P(AB)\ge P(A)+P(B)-1$.</div>
<div class="k"><b>Continuity</b>: $A_n\uparrow A$ or $A_n\downarrow A\Rightarrow P(A_n)\to P(A)$. Proof: $B_1=A_1$, $B_i=A_i\setminus A_{i-1}$ disjoint.</div>
<div class="k"><b>De Morgan</b>: $(A\cup B)^c=A^cB^c$, $(AB)^c=A^c\cup B^c$. Partition: disjoint, union $=\Omega$.</div>
<div class="k"><b>Uniform finite Ω</b>: $P(A)=|A|/|\Omega|$; $n!$; $\binom nk=\frac{n!}{k!(n-k)!}$; with replacement $n^k$.</div>
<div class="k"><b>Conditional</b>: $P(A|B)=\frac{P(AB)}{P(B)}$; $P(\cdot|B)$ is a probability. Chain: $P(ABC)=P(A|BC)P(B|C)P(C)$. $P(A|B)\ne P(B|A)$!</div>
<div class="k"><b>Independent</b>: $P(AB)=P(A)P(B)$ ⇔ $P(A|B)=P(A)$. Then $A^c\indep B^c$ etc. Disjoint & both $P>0$ ⇒ NOT indep. Mutual: every sub-collection factorizes.</div>
<div class="k"><b>Total prob.</b> ($A_i$ partition): $P(B)=\sum_iP(B|A_i)P(A_i)$. <b>Bayes</b>: $P(A_i|B)=\frac{P(B|A_i)P(A_i)}{\sum_jP(B|A_j)P(A_j)}$.</div>
<h3>Ch.2 Random variables</h3>
<div class="k"><b>CDF</b> $F(x)=P(X\le x)$: non-decreasing, $F(-\infty)=0$, $F(\infty)=1$, right-continuous (these 3 ⇔ valid CDF). $P(X=x)=F(x)-F(x^-)$, $P(x<X\le y)=F(y)-F(x)$, $P(X>x)=1-F(x)$, $P(X<x)=F(x^-)$.</div>
<div class="k"><b>PMF</b> $f(x)=P(X=x)$, $\sum f=1$. <b>PDF</b> $f\ge0$, $\int f=1$, $P(a<X<b)=\int_a^bf$, $F'=f$; $P(X=x)=0$; $f$ may exceed 1.</div>
<div class="k"><b>Quantile</b> $F^{-1}(q)=\inf\{x:F(x)\ge q\}$; median $F^{-1}(\frac12)$. $X=F^{-1}(U)\sim F$; $F(X)\sim U(0,1)$. Exp: $-\beta\log(1-q)$.</div>
<div class="k"><b>Joint</b>: $P((X,Y)\in A)=\iint_Af$. <b>Marginal</b> $f_X(x)=\int f(x,y)\dd y$ (limits for fixed $x$!). <b>Conditional</b> $f_{X|Y}(x|y)=\frac{f(x,y)}{f_Y(y)}$; $f(x,y)=f_{Y|X}(y|x)f_X(x)$.</div>
<div class="k"><b>Indep.</b> $f(x,y)=f_X(x)f_Y(y)\ \forall x,y$. Shortcut: $f=g(x)h(y)$ on a <b>product</b> support ⇒ indep. Non-product support (triangle, $x<y$) ⇒ NOT indep. $X\indep Y\Rightarrow g(X)\indep h(Y)$, $f_{X|Y}=f_X$.</div>
<div class="k"><b>Transform $Y=t(X)$</b>: CDF method $F_Y(y)=P(t(X)\le y)$, solve for $X$, differentiate. Monotone: $f_Y(y)=f_X(s(y))\,|s'(y)|$, $s=t^{-1}$. Non-monotone: $A_y=\{x:t(x)\le y\}$, $F_Y=\int_{A_y}f_X$. Discrete: $f_Y(y)=\sum_{x:t(x)=y}f_X(x)$.</div>
<div class="k"><b>$Z=t(X,Y)$</b>: $F_Z(z)=\iint_{t\le z}f$; or condition: $P(Z\le z)=\int P(t(X,y)\le z|Y=y)f_Y(y)\dd y$. Sum (indep.): $f_{X+Y}(z)=\int f_X(z-y)f_Y(y)\dd y$. U+U: tent $z$ / $2-z$. Exp+Exp: Gamma(2,β).</div>
<div class="k"><b>Max/min iid</b>: $F_{\max}=F^n$, $f_{\max}=nF^{n-1}f$; $P(\min>z)=(1-F)^n$, $f_{\min}=n(1-F)^{n-1}f$. Max of $n$ Unif(0,1): $ny^{n-1}$. Min of Exp(β): Exp(β/n).</div>
<div class="k"><b>Ratio</b> $Z=X/Y$: split $Y>0$ / $Y<0$ (flip!). If $f_X,f_Y$ symmetric: $f_Z(z)=2\int_0^\infty yf_X(yz)f_Y(y)\dd y$. $N/N$ ⇒ Cauchy. U/U: $\frac12$ on (0,1), $\frac1{2w^2}$ for $w\ge1$.</div>
<div class="k"><b>Multinomial</b> $\frac{n!}{\prod x_j!}\prod p_j^{x_j}$, $X_j\sim\Bin(n,p_j)$, $\cov=-np_ip_j$. <b>MVN</b> $N_k(\mu,\Sigma)$: $\frac{e^{-\frac12(x-\mu)^T\Sigma^{-1}(x-\mu)}}{(2\pi)^{k/2}|\Sigma|^{1/2}}$; marginals normal; $X_2|X_1\sim N(\mu_2+\Sigma_{21}\Sigma_{11}^{-1}(x_1-\mu_1),\Sigma_{22}-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12})$; $a^TX\sim N(a^T\mu,a^T\Sigma a)$; $(X-\mu)^T\Sigma^{-1}(X-\mu)\sim\chi^2_k$; uncorrelated ⇔ indep.</div>
<h3>Integrals &amp; series</h3>
<div class="k">$\int_0^\infty x^{\alpha-1}e^{-x/\beta}\dd x=\beta^\alpha\Gamma(\alpha)$; $\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$, $\Gamma(n)=(n-1)!$, $\Gamma(\frac12)=\sqrt\pi$.</div>
<div class="k">$\int_0^1x^{a-1}(1-x)^{b-1}\dd x=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$. $\int_{\R}e^{-\frac{(x-m)^2}{2\sigma^2}}\dd x=\sigma\sqrt{2\pi}$. $\int_0^\infty xe^{-ax^2/2}\dd x=\frac1a$.</div>
<div class="k">$\sum_{k\ge0}r^k=\frac1{1-r}$, $\sum_{k\ge1}kr^{k-1}=\frac1{(1-r)^2}$, $\sum\frac{\lambda^k}{k!}=e^\lambda$, $(1-\frac\lambda n)^n\to e^{-\lambda}$. $\int\frac{2x}{1+x^2}=\log(1+x^2)$, $\int\frac{1}{1+x^2}=\arctan x$. $\int f_ZF_Z=\frac12F_Z^2$.</div>

<div class="k">$t_\nu$: $\propto(1+\frac{x^2}\nu)^{-\frac{\nu+1}2}$, $\to N(0,1)$. Exp memoryless: $P(X>s+t|X>s)=P(X>t)$; Geom too. $\Bin(n,p_n)$, $np_n\to\lambda$ ⇒ Pois$(\lambda)$. $Z=\frac{X-\mu}\sigma$. CLT: $\sum X_i\approx N(n\mu,n\sigma^2)$.</div>
<div class="k"><b>Closure (indep.)</b>: Bin$(n_1,p)$+Bin$(n_2,p)$=Bin$(n_1{+}n_2,p)$; Pois+Pois: λ's add; $N$+$N$: means & variances add; Gamma$(\alpha_i,\beta)$ sum: Gamma$(\sum\alpha_i,\beta)$; $\sum$Exp$(\beta)$=Gamma$(n,\beta)$; $\bar X_n$ of Exp$(\beta)$ = Gamma$(n,\beta/n)$. $X|X{+}Y{=}n\sim\Bin(n,\frac\lambda{\lambda+\mu})$ for Poissons. Thinning: $\Bin(N,p)$, $N\sim$Pois$(\lambda)$ ⇒ Pois$(\lambda p)$.</div>`,
R`<h3>Ch.3 Expectation</h3>
<div class="k"><b>Mean</b> $E(X)=\int x\dd F$, defined iff $E|X|<\infty$. Cauchy: $\frac1{2\pi}[\log(1+x^2)]_{-\infty}^\infty=\infty-\infty$ <b>undefined</b>; Pareto(1): $+\infty$.</div>
<div class="k"><b>Lazy statistician</b>: $E\,t(X)=\int t(x)f(x)\dd x$; $E\,t(X,Y)=\iint t f$. $E\,\1_A(X)=P(X\in A)$. Tail: $X\ge0\Rightarrow E(X)=\int_0^\infty P(X>x)\dd x$.</div>
<div class="k"><b>Moments</b> $m_k=E(X^k)$; $k$-th finite ⇒ $j$-th finite ($j<k$). Exp: $E X^k=k!\beta^k$; Gamma: $\beta^k\frac{\Gamma(\alpha+k)}{\Gamma(\alpha)}$; $U(0,1)$: $\frac1{k+1}$; $N(0,1)$: $E Z^4=3$.</div>
<div class="k"><b>Linearity</b> $E\sum a_iX_i=\sum a_iEX_i$ (always). <b>Indep.</b> ⇒ $E\prod X_i=\prod EX_i$. Indicator trick: count $=\sum\1_{A_i}$.</div>
<div class="k"><b>Var</b> $=E(X-\mu)^2=E X^2-(EX)^2$; $\var(aX+b)=a^2\var X$; $\sd=\sqrt{\var}$. Discrete: $E[X(X-1)]$ (Pois: $\lambda^2$). $\min_aE(X-a)^2$ at $a=EX$: $E(X-a)^2=\var X+(a-EX)^2$.</div>
<div class="k"><b>Cov</b> $=E[(X-\mu_X)(Y-\mu_Y)]=E XY-EXEY$; bilinear; $\cov(X,X)=\var X$. $\corr=\frac{\cov}{\sigma_X\sigma_Y}\in[-1,1]$; $\pm1$ iff linear. Indep ⇒ cov $=0$, NOT conversely ($Y=X^2$, $X\sim U(-1,1)$).</div>
<div class="k">$\var(\sum a_iX_i)=\sum a_i^2\var X_i+2\sum_{i<j}a_ia_j\cov(X_i,X_j)$. Indep: $\var(X\pm Y)=\var X+\var Y$.</div>
<div class="k"><b>Sample</b> $\bar X_n=\frac1n\sum X_i$: $E=\mu$, $\var=\frac{\sigma^2}n$. $S_n^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$, $E S^2=\sigma^2$ (use $\sum(X_i-\bar X)^2=\sum X_i^2-n\bar X^2$, $E\bar X^2=\frac{\sigma^2}n+\mu^2$).</div>
<div class="k"><b>Conditional</b> $E(X|Y=y)=\int xf_{X|Y}(x|y)\dd x$; $E(X|Y)$ is a r.v. $g(Y)$. <b>Tower</b> $EX=E[E(X|Y)]$. $E[r(X)s(Y)|X]=r(X)E[s(Y)|X]$. $E(X|Y)\equiv c\Rightarrow\cov=0$.</div>
<div class="k"><b>Total var.</b> $\var X=E[\var(X|Y)]+\var[E(X|Y)]$; $\var(X|Y)=E(X^2|Y)-E(X|Y)^2$. Total cov: $\cov(X,Y)=E\cov(X,Y|Z)+\cov(E(X|Z),E(Y|Z))$. Random sum $S=\sum_1^NX_i$: $ES=EN\,EX$, $\var S=EN\var X+\var N(EX)^2$.</div>
<div class="k"><b>MGF</b> $\psi(t)=E e^{tX}$ ($t$ near 0). $\psi(0)=1$, $\psi^{(k)}(0)=E X^k$. $\psi_{aX+b}(t)=e^{bt}\psi_X(at)$. Indep: $\psi_{\sum X_i}=\prod\psi_{X_i}$; $\psi_{\bar X_n}(t)=[\psi_X(t/n)]^n$ (iid). <b>Uniqueness</b>: equal MGFs near 0 ⇒ same distribution. <b>CGF</b> $\varphi=\log\psi$: $\varphi'(0)=E X$, $\varphi''(0)=\var X$.</div>
<div class="k box-mini"><b>MGF exam template</b>: $\psi_{\bar X_n}(t)=E e^{\frac tn\sum X_i}=E\prod e^{\frac tnX_i}\overset{\text{indep}}=\prod Ee^{\frac tnX_i}\overset{\text{iid}}=\psi_X(\frac tn)^n$. Exp(β): $\psi=(1-\beta t)^{-1}$ for $t<\frac1\beta$ ⇒ $\bar X_n\sim$Gamma$(n,\frac\beta n)$, $E=\beta$, $\var=\frac{\beta^2}n$.</div>
<h3>Ch.4 Inequalities</h3>
<div class="k"><b>Markov</b>: $X\ge0$, $EX<\infty$: $P(X>t)\le\frac{EX}t$. (Proof: $E X\ge\int_t^\infty xf\ge tP(X>t)$.) Also $P(|X|>t)\le\frac{E|X|^k}{t^k}$.</div>
<div class="k"><b>Chebyshev</b>: $P(|X-\mu|>t)\le\frac{\sigma^2}{t^2}$; $P(|X-\mu|>k\sigma)\le\frac1{k^2}$. (Markov on $(X-\mu)^2$.) $\bar X_n$: $\le\frac{\sigma^2}{nt^2}$; Bernoulli: $\le\frac{p(1-p)}{n\varepsilon^2}\le\frac1{4n\varepsilon^2}$. Pois: $P(X\ge2\lambda)\le\frac1\lambda$.</div>
<div class="k"><b>Cantelli</b> ($EX=0$): $P(X\ge t)\le\frac{\sigma^2}{\sigma^2+t^2}$. (Markov on $(X+u)^2$, $u=\sigma^2/t$.)</div>
<div class="k"><b>Hoeffding</b>: $Y_i$ indep, $EY_i=0$, $a_i\le Y_i\le b_i$: $P(\sum Y_i\ge\varepsilon)\le e^{-t\varepsilon}\prod e^{t^2(b_i-a_i)^2/8}$; best $t$: $\exp(-\frac{2\varepsilon^2}{\sum(b_i-a_i)^2})$. <b>Bernoulli</b>: $P(|\bar X_n-p|>\varepsilon)\le2e^{-2n\varepsilon^2}$ ($Y_i=\frac{X_i-p}n$, $t^*=4n\varepsilon$). <b>CI</b>: $\bar X_n\pm\varepsilon_n$, $\varepsilon_n=\sqrt{\frac1{2n}\log\frac2\alpha}$.</div>
<div class="k"><b>Mill</b> $Z\sim N(0,1)$: $P(|Z|>t)\le\sqrt{\frac2\pi}\frac{e^{-t^2/2}}t=\frac2tf_Z(t)$. (Use $\frac xt>1$ on $x>t$.) $P(|Z|>t)=2(1-\Phi(t))$.</div>
<div class="k"><b>Jensen</b>: $g$ convex ⇒ $Eg(X)\ge g(EX)$; concave ⇒ $\le$. (Tangent line at $EX$.) $EX^2\ge(EX)^2$, $E\frac1X\ge\frac1{EX}$, $E\log X\le\log EX$, $E|X|\ge|EX|$. HM ≤ GM ≤ AM.</div>
<div class="k"><b>Cauchy–Schwarz</b>: $E|XY|\le\sqrt{EX^2EY^2}$ ⇒ $|\cov|\le\sigma_X\sigma_Y$. <b>Young</b>: $ab\le\frac{a^p}p+\frac{b^q}q$, $\frac1p+\frac1q=1$ (log concave). <b>Hölder</b>: $E|XY|\le\|X\|_p\|Y\|_q$ (normalize + Young). <b>Lyapunov</b>: $\|X\|_r\le\|X\|_s$, $r<s$ (Hölder with $p=s/r$ on $|X|^r\cdot1$). <b>Minkowski</b>: $\|X+Y\|_p\le\|X\|_p+\|Y\|_p$ (split $|X+Y|^p$, Hölder, divide). <b>Association</b>: $f,g\uparrow$ ⇒ $E f(X)g(X)\ge Ef\,Eg$.</div>
<h3>Exam checklist</h3>
<div class="k box-mini"><b>Find $c$</b>: $f\ge0\Rightarrow c>0$; draw support; integrate with explicit limits. <b>Marginal</b>: limits for fixed $x$; state support. <b>Indep?</b> $f_Xf_Y\ne f$ at a point, or non-product support. <b>Transform</b>: start from CDF; flip inequality for negative divisors; differentiate; support. <b>$E$</b>: say "lazy statistician"; check existence. <b>MGF</b>: domain of $t$; justify indep/ident.; "by uniqueness". <b>Bounds</b>: check $X\ge0$, finite moments.</div>
<div class="k"><b>Pitfalls</b>: triangle supports; Cauchy mean ≠ 0; $\var(X-Y)$ adds; Exp(β) has mean β (scale); Geom starts at 1; $|s'(y)|$; $<$ vs $\le$ for discrete; uncorrelated ⇏ indep.</div>`,
  ],
});
