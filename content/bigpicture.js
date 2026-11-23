BIGPICTURE({ title: 'The big picture: how Chapters 5–9 fit together', summary: 'Why we study convergence, estimators, plug-in, the bootstrap and the MLE, and the few ideas that repeat across all of them.', blocks: [
R`Chapters 5–9 all answer **one question**:

<blockquote class="bp-question">You have data $X_1,\dots,X_n$ from an unknown distribution $F$. You want a number $\theta = T(F)$ that describes $F$ (a mean, a median, a rate, a correlation…). <b>How do you estimate $\theta$, and how wrong might your estimate be?</b></blockquote>

Every chapter gives part of that answer: either a way to **build** an estimate $\hat\theta$, or a way to **measure its error** (the standard error $\operatorname{se}$, and from it a confidence interval).`,

H('How the chapters fit together'),
R`<div class="bp-map">
<a class="bp-node ch5" href="#/learn/5.1"><span class="bp-tag">Chapter 5 · the math tools</span><b>LLN · CLT · continuous mapping · Slutsky · delta method</b><span class="bp-sub">Used to prove everything below.</span></a>
<div class="bp-arrow">↓ used to prove properties of estimators</div>
<a class="bp-node ch6" href="#/learn/6.1"><span class="bp-tag">Chapter 6 · how to grade an estimator</span><b>bias · se · MSE · consistency · asymptotic normality</b><span class="bp-sub">Payoff: the confidence interval $\hat\theta\pm z_{\alpha/2}\,\widehat{\operatorname{se}}$.</span></a>
<div class="bp-arrow">↑ each method below is graded with these criteria</div>
<div class="bp-row">
<a class="bp-node ch7" href="#/learn/7.1"><span class="bp-tag">Chapter 7 · plug-in</span><b>No model assumed.</b><span class="bp-sub">Replace $F$ by the empirical CDF $\hat F_n$ and compute $T(\hat F_n)$.</span></a>
<a class="bp-node ch8" href="#/learn/8.1"><span class="bp-tag">Chapter 8 · bootstrap</span><b>No model, no se formula.</b><span class="bp-sub">Resample from $\hat F_n$ to simulate the spread of $\hat\theta$.</span></a>
<a class="bp-node ch9" href="#/learn/9.1"><span class="bp-tag">Chapter 9 · parametric</span><b>Assume a family $f(x;\theta)$.</b><span class="bp-sub">Method of moments, then the MLE. Fisher information gives the se.</span></a>
</div>
</div>`,

NOTE('Chapter 5 is the toolkit', R`On its own it looks like abstract probability. It's there because every later chapter needs it:
<ul>
<li>The <a href="#/learn/5.2">LLN</a> shows an estimate **converges to the right answer**.</li>
<li>The <a href="#/learn/5.3">CLT</a> tells you **how it scatters** around that answer.</li>
<li>The <a href="#/learn/5.4">continuous mapping theorem, Slutsky and the delta method</a> carry both results **through functions** of averages.</li>
</ul>`),
NOTE('Chapter 6 is the grading scheme', R`It defines what an <a href="#/learn/6.1">estimator</a> is and how to judge one: <a href="#/learn/6.2">bias, se and MSE</a>, <a href="#/learn/6.3">consistency</a>, and <a href="#/learn/6.4">asymptotic normality</a>. It ends with the main payoff: the confidence interval $\hat\theta\pm z_{\alpha/2}\,\widehat{\operatorname{se}}$.`),
NOTE('Chapters 7, 8 and 9 are ways to build estimators', R`Each one is then graded with Chapter 6's criteria, using Chapter 5's tools.
<ul>
<li><b>Chapter 7 (no model assumed):</b> estimate $F$ by the <a href="#/learn/7.1">empirical CDF</a> $\hat F_n$, then compute $T(\hat F_n)$.</li>
<li><b>Chapter 8 (no model, and no formula for the se):</b> reuse Chapter 7's idea. <a href="#/learn/8.1">Resample from $\hat F_n$</a> to simulate how $\hat\theta$ varies, and build <a href="#/learn/8.2">bootstrap intervals</a>.</li>
<li><b>Chapter 9 (model assumed):</b> assume a family $f(x;\theta)$. <a href="#/learn/9.1">Match moments</a> (MoM) or <a href="#/learn/9.2">maximize the likelihood</a> (MLE). <a href="#/learn/9.3">Fisher information</a> then gives the se directly.</li>
</ul>`),

H('Five ideas that run through all of it'),
THM('1 · Almost every estimator is an average, or a smooth function of averages', R`That's why the same two theorems keep coming back.
<div class="bp-scroll"><table>
<tr><th>Estimator</th><th>The average behind it</th></tr>
<tr><td>$\bar X_n$</td><td>itself</td></tr>
<tr><td>$\hat F_n(x)$ (Ch 7)</td><td>average of the indicators $\1\{X_i\le x\}$</td></tr>
<tr><td>Linear functional $\int r\dd F$ (Ch 7)</td><td>$\frac1n\sum r(X_i)$</td></tr>
<tr><td>Plug-in variance or skewness (Ch 7)</td><td>a function of several averages</td></tr>
<tr><td>Bootstrap mean $\bar X_n^*$ (Ch 8)</td><td>an average of a resample</td></tr>
<tr><td>MoM (Ch 9)</td><td>$g(\text{sample moments})$</td></tr>
<tr><td>MLE (Ch 9)</td><td>the score $\ell_n'(\theta) = \sum_i \partial_\theta\log f(X_i;\theta)$ is a sum of iid terms</td></tr>
</table></div>
Because each is an average: the **LLN gives consistency** and the **CLT gives normality**.`),

THM('2 · The same three-step argument works almost everywhere', R`<ol>
<li><b>Consistency:</b> apply the LLN to the averages, then the continuous mapping theorem to the function of them.</li>
<li><b>Asymptotic normality:</b> apply the CLT to the averages, then the delta method to the function. Use Slutsky to swap the unknown se for an estimated one.</li>
<li><b>Confidence interval:</b> $\hat\theta\pm z_{\alpha/2}\,\widehat{\operatorname{se}}$, with $z_{0.025} = 1.96$.</li>
</ol>
Most exam questions are this argument applied to a new estimator. The full write-ups are on the <a href="#/technique">exam technique</a> page.`),

THM('3 · The chapters differ mainly in how they get the se', R`<div class="bp-scroll"><table>
<tr><th>Where</th><th>How you get the se</th></tr>
<tr><td>Ch 5 delta method, $g(\bar X_n)$</td><td>$\lvert g'(\mu)\rvert\,\sigma/\sqrt n$</td></tr>
<tr><td>Ch 7 linear functional</td><td>$\sqrt{\var r(X)/n}$, with the variance estimated by plug-in</td></tr>
<tr><td>Ch 8 bootstrap</td><td>standard deviation of the $B$ bootstrap replicates</td></tr>
<tr><td>Ch 9 MLE</td><td>$1/\sqrt{I_n(\hat\theta)}$, with $I_n = n\,I_1$</td></tr>
<tr><td>Ch 9 MLE of $g(\theta)$</td><td>$\lvert g'(\hat\theta)\rvert/\sqrt{I_n(\hat\theta)}$ (equivariance + delta method)</td></tr>
</table></div>
The estimate itself is usually easy. **Most of the work in each chapter goes into the se.**`),

THM('4 · The plug-in principle: when something is unknown, replace it with its estimate', R`<ul>
<li><b>Ch 7:</b> use $\hat F_n$ in place of $F$.</li>
<li><b>Ch 8:</b> use the sampling distribution under $\hat F_n$ in place of the one under $F$.</li>
<li><b>Ch 6 and 9:</b> a se like $\sigma/\sqrt n$ or $1/\sqrt{I_n(\theta)}$ contains the unknown $\theta$, so you put $\hat\theta$ inside it. **Slutsky's theorem** is what makes this legal.</li>
<li><b>MLE equivariance:</b> the MLE of $g(\theta)$ is just $g(\hat\theta)$.</li>
</ul>`),

WARN('5 · The uniform maximum is the standard exception', R`When the support depends on $\theta$ (e.g. $\Unif(0,\theta)$), the natural estimator is $\max_i X_i$. That is **not an average**, so the usual results break:
<ul>
<li><b>Ch 6:</b> it is biased, but its MSE shrinks like $1/n^2$ instead of the usual $1/n$.</li>
<li><b>Ch 8:</b> the bootstrap fails for it.</li>
<li><b>Ch 9:</b> calculus doesn't find the MLE (it sits at the boundary), Fisher-information theory doesn't apply, and $n(\theta-\hat\theta)/\theta$ has an $\Exp(1)$ limit rather than a normal one.</li>
</ul>
So if a problem has a $\theta$-dependent support, expect the usual results to break.`),

H('Parametric vs nonparametric'),
R`Assuming a model (Chapter 9) buys you **efficiency**: under the usual regularity conditions the MLE has the smallest possible asymptotic variance, $1/I_n(\theta)$. The risk is that the model is wrong. Chapters 7–8 make **no model assumption** and work for any $F$, but they can give wider intervals. The MoM-vs-MLE comparison by MSE on the 2025 midterm (Ex 3) tests exactly this kind of comparison inside one model.`,

H('How the 2025 Midterm 2 maps onto this'),
R`<div class="bp-scroll"><table>
<tr><th>Exercise</th><th>What it is in big-picture terms</th></tr>
<tr><td>Ex 1 · copula / empirical CDF (30)</td><td>Chapter 7 plug-in</td></tr>
<tr><td>Ex 2 · Exp-rate MLE + Fisher info + delta (30)</td><td>Chapter 9 estimate, with the Chapter 5 tool for the se</td></tr>
<tr><td>Ex 3 · MoM vs MLE (40)</td><td>Chapter 9 estimators, graded with Chapter 6's MSE</td></tr>
</table></div>`,

NOTE('For any new problem, ask three questions', R`<ol>
<li><b>What builds the estimator?</b> Plug-in, MoM, or MLE.</li>
<li><b>Why is it consistent?</b> LLN + continuous mapping (or MSE $\to0$).</li>
<li><b>What is its se?</b> Delta method, plug-in variance, bootstrap, or Fisher information.</li>
</ol>
Then the interval is $\hat\theta\pm z_{\alpha/2}\,\widehat{\operatorname{se}}$.`),
] });
