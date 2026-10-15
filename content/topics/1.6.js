TOPIC({ id: '1.6', ch: 1, title: 'Law of total probability and Bayes’ theorem', summary: 'Break a probability over a partition; reverse the conditioning with Bayes.' }, [
R`Often the probability of an event is easiest to compute **case by case**: "what's the chance the wall gets built? It depends on the weather…". The law of total probability makes this precise. Bayes' theorem then lets you reason **backwards**, from an observed effect to its likely cause.`,
THM('Law of total probability', R`If $A_1,\dots,A_k$ is a partition of $\Omega$, then for any event $B$:
$$P(B) = \sum_{i=1}^kP(B\mid A_i)P(A_i).$$
*Proof.* $B = \bigcup_i(B\cap A_i)$ is a disjoint union, so $P(B) = \sum_iP(B\cap A_i) = \sum_iP(B\mid A_i)P(A_i)$.`),
EX('Building a wall (slides)', R`Weather: sun ($0.50$), rain ($0.40$), snow ($0.05$), hail ($0.05$). $P(\text{done}\mid\cdot) = 0.90, 0.60, 0.10, 0$. Then
$$P(\text{done}) = 0.5(0.9) + 0.4(0.6) + 0.05(0.1) + 0.05(0) = 0.45 + 0.24 + 0.005 = 0.695.$$`),
P({ k: 'a', lvl: 1, q: R`Two urns: urn 1 has 2 red, 3 blue; urn 2 has 4 red, 1 blue. Pick an urn by a fair coin, then draw a ball. $P(\text{red})$?`, h: [R`$\frac12\cdot\frac25 + \frac12\cdot\frac45$.`], a: '3/5', s: R`$\frac12\left(\frac25 + \frac45\right) = \frac35$.` }),
THM('Bayes’ theorem', R`If $A_1,\dots,A_k$ is a partition with $P(A_i)>0$ and $P(B)>0$:
$$P(A_i\mid B) = \frac{P(B\mid A_i)P(A_i)}{\sum_jP(B\mid A_j)P(A_j)}.$$
Numerator: the joint probability $P(A_i\cap B)$. Denominator: $P(B)$ by total probability. Vocabulary: $P(A_i)$ is the **prior**, $P(A_i\mid B)$ the **posterior**.`),
P({ k: 'b', lvl: 2, q: R`Wall example: given that the job was done, what is $P(\text{it was sunny})$?`, h: [R`$\frac{0.45}{0.695}$.`], a: '0.45/0.695', s: R`$\frac{0.45}{0.695}\approx0.647$. Observing success raises the probability of sun from $0.5$ to $0.65$.` }),
P({ k: 'c', lvl: 2, q: R`(Spam filter, slides.) Emails are spam (prior 0.7), low priority (0.2) or high priority (0.1). The word "free" appears with probability 0.9 in spam and 0.01 in the others. An email contains "free". $P(\text{spam}\mid\text{free})$?`, h: [R`Numerator $0.9\cdot0.7 = 0.63$.`], a: '0.63/0.633', s: R`$\frac{0.63}{0.63 + 0.002 + 0.001} = \frac{0.63}{0.633}\approx0.995$.`, src: 'Slides Ch.1 (Wasserman Ex. 1.18)' }),
P({ k: 'd', lvl: 2, q: R`A disease has prevalence $1\%$. The test detects it with probability $0.9$ and gives a false positive with probability $0.1$. $P(D\mid+)$?`, h: [R`$P(+) = 0.9(0.01) + 0.1(0.99)$.`], a: '0.009/0.108', s: R`$\frac{0.009}{0.009 + 0.099} = \frac{0.009}{0.108}\approx0.083$. Most positives are false positives, because the disease is rare.`, src: 'Slides Ch.1' }),
H('HW1 B3: five coins'),
R`There are five coins with $P(H) = p_i$: $p_1 = 0$, $p_2 = \frac14$, $p_3 = \frac12$, $p_4 = \frac34$, $p_5 = 1$. One coin $C$ is chosen uniformly at random.`,
P({ k: 'e', lvl: 3, q: R`The chosen coin is tossed once and lands heads. Find $P(C_i\mid H)$ in general, and enter $P(C_4\mid H)$.`, h: [R`$P(H) = \frac15\sum p_i = \frac12$.`], a: '3/10',
  s: R`$P(H) = \sum_i\frac15p_i = \frac15\cdot\frac52 = \frac12$. So $P(C_i\mid H) = \frac{p_i/5}{1/2} = \frac{2p_i}{5}$: $0, \frac1{10}, \frac15, \frac3{10}, \frac25$. Coins that land heads more often become more likely.`, src: 'HW1 B3(a)' }),
P({ k: 'f', lvl: 3, q: R`Same setup: the coin is tossed again. Find $P(H_2\mid H_1)$.`, h: [R`$P(H_1\cap H_2) = \frac15\sum p_i^2$. Tosses are independent *given the coin*.`], a: '3/4',
  s: R`$P(H_1\cap H_2) = \sum_i\frac15p_i^2 = \frac15\left(0 + \frac1{16} + \frac14 + \frac9{16} + 1\right) = \frac15\cdot\frac{15}{8} = \frac38$. So $P(H_2\mid H_1) = \frac{3/8}{1/2} = \frac34$.

Note $H_1$ and $H_2$ are **not** independent ($\frac34\ne\frac12$): the first toss gives information about which coin we have.`, src: 'HW1 B3(b)' }),
P({ k: 'g', lvl: 3, q: R`Same setup: toss the chosen coin until the first head; let $B_4$ = "first head on toss 4". Find $P(C_2\mid B_4)$.`, h: [R`$P(B_4\mid C_i) = (1-p_i)^3p_i$.`, R`The nonzero terms: $(\tfrac34)^3\tfrac14 = \tfrac{27}{256}$, $(\tfrac12)^3\tfrac12 = \tfrac{16}{256}$, $(\tfrac14)^3\tfrac34 = \tfrac{3}{256}$.`], a: '27/46',
  s: R`$P(B_4\mid C_i) = (1-p_i)^3p_i$: $0$, $\frac{27}{256}$, $\frac{16}{256}$, $\frac{3}{256}$, $0$, summing to $\frac{46}{256}$. With equal priors, $P(C_i\mid B_4) = \frac{(1-p_i)^3p_i}{46/256}$, giving $0, \frac{27}{46}, \frac{8}{23}, \frac{3}{46}, 0$. So $P(C_2\mid B_4) = \frac{27}{46}$.`, src: 'HW1 B3(c)' }),
P({ k: 'h', lvl: 2, q: R`Three cards: green/green, red/red, green/red. A random card is placed on the table showing a random side, and it is green. $P(\text{other side is green})$?`, h: [R`Bayes over the 3 cards: $P(\text{green up}\mid GG) = 1$, $\mid RR = 0$, $\mid GR = \frac12$.`], a: '2/3',
  s: R`$P(GG\mid\text{green up}) = \frac{\frac13\cdot1}{\frac13\cdot1 + \frac13\cdot0 + \frac13\cdot\frac12} = \frac{1/3}{1/2} = \frac23$. Intuition: there are 3 green faces, and 2 of them belong to the GG card.`, src: 'HW1 C1 (Wasserman 1.10.12)' }),
P({ k: 'i', lvl: 3, q: R`$A_1,\dots,A_k$ partition $\Omega$ and $P(B)>0$. Prove: if $P(A_1\mid B)<P(A_1)$, then $P(A_i\mid B)>P(A_i)$ for some $i\in\{2,\dots,k\}$.`, h: [R`$\sum_iP(A_i\mid B) = 1 = \sum_iP(A_i)$.`, R`Suppose not: $P(A_i\mid B)\le P(A_i)$ for all $i\ge2$, and add up.`],
  s: R`By contradiction, suppose $P(A_i\mid B)\le P(A_i)$ for all $i = 2,\dots,k$. Adding these to the strict inequality for $i = 1$:
$$1 = \sum_{i=1}^kP(A_i\mid B)<\sum_{i=1}^kP(A_i) = 1,$$
a contradiction. Both sums equal 1 because $P(\cdot\mid B)$ and $P$ are probability measures on a partition. $\blacksquare$`, src: 'HW1 B2 (Wasserman 1.10.18)' }),
]);

DRILLS('1.6', [
  { k: '01', lvl: 2, q: R`Urn 1: 2 red, 3 blue; urn 2: 4 red, 1 blue; urn chosen by a fair coin. Given a red ball was drawn, $P(\text{urn 2})$?`, h: [R`$\frac{\frac12\cdot\frac45}{3/5}$.`], a: '2/3', s: R`$\frac{0.4}{0.6} = \frac23$.` },
  { k: '02', lvl: 2, q: R`Machine A makes 60% of items (2% defective); B makes 40% (5% defective). $P(\text{defective})$ and $P(B\mid\text{defective})$?`, h: [R`Total probability, then Bayes.`], a: [['P(def)', '0.032'], ['P(B|def)', '0.625']], s: R`$0.6(0.02) + 0.4(0.05) = 0.032$; $\frac{0.02}{0.032} = 0.625$.` },
  { k: '03', lvl: 2, q: R`Prevalence $0.1\%$, sensitivity $0.99$, false-positive rate $0.01$. $P(D\mid+)$?`, h: [R`$\frac{0.001(0.99)}{0.001(0.99) + 0.999(0.01)}$.`], a: '0.00099/(0.00099+0.00999)', s: R`$\approx0.090$.` },
  { k: '04', lvl: 3, q: R`Same test, applied twice with results independent given disease status; both positive. $P(D\mid++)$?`, h: [R`Likelihoods square: $0.99^2$ and $0.01^2$.`], a: '0.001*0.99^2/(0.001*0.99^2+0.999*0.01^2)', s: R`$\frac{0.0009801}{0.0009801 + 0.0000999}\approx0.9075$. A second positive changes everything.` },
  { k: '05', lvl: 1, q: R`(HW1 coins) $P(C_5\mid H)$?`, h: [R`$\frac{2p_i}{5}$.`], a: '2/5', s: R`$\frac25$.` },
  { k: '06', lvl: 2, q: R`Of three coins, one is two-headed and two are fair. Pick one at random and toss it: heads. $P(\text{two-headed})$?`, h: [R`$\frac{1/3}{1/3 + \frac23\cdot\frac12}$.`], a: '1/2', s: R`$\frac{1/3}{2/3} = \frac12$.` },
  { k: '07', lvl: 1, q: R`$P(B\mid A) = 0.5$, $P(B\mid A^c) = 0.2$, $P(A) = 0.4$. Find $P(B)$.`, h: [R`Total probability over $\{A, A^c\}$.`], a: '0.32', s: R`$0.5(0.4) + 0.2(0.6) = 0.32$.` },
  { k: '08', lvl: 2, q: R`Same numbers. Find $P(A\mid B)$.`, h: [R`Bayes.`], a: '0.625', s: R`$\frac{0.2}{0.32} = 0.625$.` },
]);
