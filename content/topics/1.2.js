TOPIC({ id: '1.2', ch: 1, title: 'Axioms and properties of probability', summary: 'The three axioms, derived rules (complement, monotonicity, inclusion–exclusion), continuity of P.' }, [
R`A **probability** assigns to each event a number between 0 and 1 measuring how likely it is. Everything in this course follows from just three rules.`,
DEF('Probability measure (axioms)', R`$P$ assigns a real number $P(A)$ to every event $A$ such that
<ol><li>$P(A)\ge0$ for every $A$;</li><li>$P(\Omega) = 1$;</li><li>if $A_1,A_2,\dots$ are disjoint, then $P\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty P(A_i)$ (countable additivity).</li></ol>`),
THM('Consequences', R`<ol><li>$P(\emptyset) = 0$.</li><li>$A\subseteq B\Rightarrow P(A)\le P(B)$.</li><li>$0\le P(A)\le1$.</li><li>$P(A^c) = 1-P(A)$.</li><li>$A\cap B = \emptyset\Rightarrow P(A\cup B) = P(A) + P(B)$.</li><li>(Inclusion–exclusion) $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.</li></ol>`),
R`*Sample proofs.* (1) Take $A_i = \emptyset$ for all $i$ in axiom 3: $c = \sum c$ forces $c = P(\emptyset) = 0$. (5) Take $A_1 = A$, $A_2 = B$, $A_3 = A_4 = \dots = \emptyset$. (4) $A$ and $A^c$ are disjoint with union $\Omega$, so $P(A) + P(A^c) = 1$. (6) Write $A\cup B$ as the disjoint union $A\cup(B\setminus A)$, and $B$ as $(A\cap B)\cup(B\setminus A)$.`,
P({ k: 'a', lvl: 1, q: R`$P(A) = 0.3$, $P(B) = 0.5$, $P(A\cap B) = 0.1$. Find $P(A\cup B)$.`, h: [R`Inclusion–exclusion.`], a: '0.7', s: R`$0.3 + 0.5 - 0.1 = 0.7$.` }),
P({ k: 'b', lvl: 1, q: R`Same events. Find $P(A^c)$ and $P(A\setminus B)$.`, h: [R`$P(A\setminus B) = P(A) - P(A\cap B)$.`], a: [['$P(A^c)$', '0.7'], [R`$P(A\setminus B)$`, '0.2']], s: R`$1 - 0.3 = 0.7$; $0.3 - 0.1 = 0.2$.` }),
P({ k: 'c', lvl: 2, q: R`Can $A$ and $B$ be disjoint if $P(A) = 0.6$ and $P(B) = 0.7$?`, h: [R`Disjoint would force $P(A\cup B) = 1.3$.`], a: { choice: ['Yes', 'No'], v: 1 }, s: R`No: $P(A\cup B) = 1.3>1$ is impossible. In fact $P(A\cap B)\ge0.6 + 0.7 - 1 = 0.3$.` }),
P({ k: 'd', lvl: 2, q: R`Three events, each with probability $0.3$, every pairwise intersection $0.1$, triple intersection $0.05$. Find $P(A\cup B\cup C)$.`, h: [R`$\sum P - \sum P(\text{pairs}) + P(\text{triple})$.`], a: '0.65', s: R`$0.9 - 0.3 + 0.05 = 0.65$.` }),
H('Continuity of probabilities'),
THM('Continuity of probabilities', R`If $A_n\to A$ (increasing with $A = \bigcup A_n$, or decreasing with $A = \bigcap A_n$), then $P(A_n)\to P(A)$. In words: **$P$ and $\lim$ can be swapped.**`),
R`*Proof (increasing case, slides).* Set $B_1 = A_1$, $B_2 = A_2\setminus A_1$, $B_3 = A_3\setminus A_2$, … These are disjoint, $\bigcup_{i\le n}B_i = A_n$, and $\bigcup_iB_i = A$. By axiom 3,
$$P(A) = \sum_{i=1}^\infty P(B_i) = \lim_{n\to\infty}\sum_{i=1}^nP(B_i) = \lim_nP\left(\bigcup_{i=1}^nB_i\right) = \lim_nP(A_n).$$
The decreasing case follows by taking complements.`,
P({ k: 'e', lvl: 2, q: R`Toss a fair coin forever. $A_n$ = "at least one head among the first $n$ tosses". Find $P(A_n)$ for $n = 10$, and use continuity to find $P(\text{at least one head ever})$.`, h: [R`$P(A_n) = 1 - 2^{-n}$. The $A_n$ increase.`], a: [['$P(A_{10})$', '1-2^(-10)'], ['P(ever)', '1']],
  s: R`$P(A_n) = 1 - (\frac12)^n$; for $n = 10$: $1 - \frac1{1024}\approx0.999$. Since $A_n\uparrow\bigcup A_n$ = "a head eventually", continuity gives $P = \lim(1 - 2^{-n}) = 1$.` }),
P({ k: 'f', lvl: 3, q: R`Show $P(A\cap B)\ge P(A) + P(B) - 1$ (Bonferroni). Apply it with $P(A) = 0.6$, $P(B) = 0.7$.`, h: [R`$P(A\cup B)\le1$ in inclusion–exclusion.`], a: '0.3', s: R`$1\ge P(A\cup B) = P(A) + P(B) - P(A\cap B)$, so $P(A\cap B)\ge P(A)+P(B)-1 = 0.3$.` }),
]);

DRILLS('1.2', [
  { k: '01', lvl: 1, q: R`$A, B$ disjoint with $P(A) = 0.4$, $P(B) = 0.3$. $P(A\cup B)$?`, h: [R`Add.`], a: '0.7', s: R`$0.7$.` },
  { k: '02', lvl: 1, q: R`$P(A) = 0.5$, $P(B) = 0.4$, $P(A\cup B) = 0.7$. $P(A\cap B)$?`, h: [R`Rearrange inclusion–exclusion.`], a: '0.2', s: R`$0.5 + 0.4 - 0.7 = 0.2$.` },
  { k: '03', lvl: 1, q: R`$P(A\cup B) = 0.7$. Find $P(A^c\cap B^c)$.`, h: [R`De Morgan.`], a: '0.3', s: R`$P((A\cup B)^c) = 0.3$.` },
  { k: '04', lvl: 2, q: R`Lower bound for $P(A\cap B)$ when $P(A) = 0.8$, $P(B) = 0.9$?`, h: [R`Bonferroni.`], a: '0.7', s: R`$0.8 + 0.9 - 1 = 0.7$.` },
  { k: '05', lvl: 2, q: R`$X\sim\operatorname{Unif}(0,1)$ and $A_n = \{X\le1 - \frac1n\}$. Find $\lim_nP(A_n)$ and $P(X<1)$.`, h: [R`$A_n\uparrow\{X<1\}$.`], a: [['limit', '1'], ['$P(X<1)$', '1']], s: R`$P(A_n) = 1 - \frac1n\to1 = P(X<1)$.` },
  { k: '06', lvl: 1, q: R`$B\subseteq A$, $P(A) = 0.5$, $P(B) = 0.2$. $P(A\setminus B)$?`, h: [R`$A$ = $B$ ∪ $(A\setminus B)$ disjointly.`], a: '0.3', s: R`$0.3$.` },
  { k: '07', lvl: 2, q: R`$P(A) = 0.4$, $P(B) = 0.5$, $P(A\cap B^c) = 0.3$. Find $P(A\cup B)$.`, h: [R`$P(A\cap B) = P(A) - P(A\cap B^c)$.`], a: '0.8', s: R`$P(A\cap B) = 0.1$, so $P(A\cup B) = 0.4 + 0.5 - 0.1 = 0.8$.` },
  { k: '08', lvl: 2, q: R`Fair coin forever: $B_n$ = "first $n$ tosses all tails". Find $\lim P(B_n)$ = P(never a head).`, h: [R`Decreasing sequence.`], a: '0', s: R`$P(B_n) = 2^{-n}\to0$, and $B_n\downarrow$ "never a head", so that event has probability 0.` },
  { k: '09', lvl: 3, q: R`$P(A) = 0.5$, $P(B) = 0.4$, $P(C) = 0.3$, $P(A\cap B) = 0.2$, $P(A\cap C) = P(B\cap C) = 0.1$, $P(A\cap B\cap C) = 0.05$. Find $P(\text{exactly one of } A,B,C)$ and $P(\text{at least two of } A,B,C)$.`,
    h: [R`Draw a 3-circle Venn diagram and fill it from the inside out: start with the triple overlap, then "exactly these two", then "only this one".`, R`"$A\cap B$ only" $= P(A\cap B) - P(A\cap B\cap C)$. "$A$ only" $= P(A) - P(A\cap B) - P(A\cap C) + P(A\cap B\cap C)$.`, R`Check: "exactly one" + "at least two" must equal $P(A\cup B\cup C)$ from inclusion–exclusion.`],
    a: [['exactly one', '0.55'], ['at least two', '0.3']],
    s: R`Fill the Venn diagram from the centre out.

Triple: $0.05$.

Exactly two: $A\cap B$ only $= 0.2 - 0.05 = 0.15$; $A\cap C$ only $= 0.1 - 0.05 = 0.05$; $B\cap C$ only $= 0.05$.

Exactly one: $A$ only $= 0.5 - 0.15 - 0.05 - 0.05 = 0.25$; $B$ only $= 0.4 - 0.15 - 0.05 - 0.05 = 0.15$; $C$ only $= 0.3 - 0.05 - 0.05 - 0.05 = 0.15$.

So $P(\text{exactly one}) = 0.25 + 0.15 + 0.15 = 0.55$ and $P(\text{at least two}) = 0.15 + 0.05 + 0.05 + 0.05 = 0.30$.

General formulas: $P(\text{exactly one}) = \sum P(A_i) - 2\sum P(A_i\cap A_j) + 3P(A\cap B\cap C) = 1.2 - 0.8 + 0.15 = 0.55$ and $P(\text{at least two}) = \sum P(A_i\cap A_j) - 2P(A\cap B\cap C) = 0.4 - 0.1 = 0.3$. (Trap: $\sum P(A_i\cap A_j) = 0.4$ counts the triple region three times, but it should count once.)

Check: $0.55 + 0.3 = 0.85 = 1.2 - 0.4 + 0.05 = P(A\cup B\cup C)$ ✓. All regions are $\ge0$, so these numbers really are consistent.` },
  { k: '10', lvl: 4, q: R`(Exam-style.) Events $A_1, A_2, \dots$ satisfy $P(A_n) = 1 - 3^{-n}$.

(a) Prove Boole's inequality $P\left(\bigcup_{i=1}^\infty E_i\right)\le\sum_{i=1}^\infty P(E_i)$ from the axioms, for any events $E_i$.

(b) Use it on the complements to give a lower bound for $P(A_1\cap A_2\cap A_3)$.

(c) Same for $P\left(\bigcap_{n=1}^\infty A_n\right)$.

(d) Now suppose in addition that $A_1\subseteq A_2\subseteq\cdots$. Find $P\left(\bigcup_nA_n\right)$ and $P\left(\bigcap_nA_n\right)$ exactly.`,
    h: [R`(a) Make the events disjoint: $D_1 = E_1$, $D_i = E_i\setminus(E_1\cup\cdots\cup E_{i-1})$. Then $\bigcup D_i = \bigcup E_i$ and $D_i\subseteq E_i$.`, R`(b, c) De Morgan: $\left(\bigcap A_n\right)^c = \bigcup A_n^c$, so $P\left(\bigcap A_n\right) = 1 - P\left(\bigcup A_n^c\right)\ge1 - \sum P(A_n^c)$. Here $P(A_n^c) = 3^{-n}$.`, R`(d) For an increasing sequence the union is the limit, so continuity applies. And the intersection of an increasing sequence is just its smallest set.`],
    a: [['(b) bound', '14/27'], ['(c) bound', '1/2'], [R`(d) $P(\bigcup A_n)$`, '1'], [R`(d) $P(\bigcap A_n)$`, '2/3']],
    s: R`**(a)** Let $D_1 = E_1$ and $D_i = E_i\setminus(E_1\cup\cdots\cup E_{i-1})$ for $i\ge2$. Each $D_i$ is "in $E_i$ but in no earlier $E_j$", so the $D_i$ are disjoint, $D_i\subseteq E_i$, and $\bigcup_iD_i = \bigcup_iE_i$ (every outcome in the union has a first $E_i$ that contains it). By axiom 3 and monotonicity,
$$P\Big(\bigcup_iE_i\Big) = P\Big(\bigcup_iD_i\Big) = \sum_iP(D_i)\le\sum_iP(E_i).\ \blacksquare$$

**(b)** By De Morgan $(A_1\cap A_2\cap A_3)^c = A_1^c\cup A_2^c\cup A_3^c$, so
$$P(A_1\cap A_2\cap A_3)\ge1 - \left(\tfrac13 + \tfrac19 + \tfrac1{27}\right) = 1 - \tfrac{13}{27} = \tfrac{14}{27}.$$

**(c)** Same argument with the countable union (this is where you need (a) for countably many events):
$$P\Big(\bigcap_nA_n\Big)\ge1 - \sum_{n=1}^\infty3^{-n} = 1 - \frac{1/3}{1 - 1/3} = 1 - \frac12 = \frac12.$$

**(d)** If $A_n\uparrow$, then $A_n\to\bigcup_nA_n$, so by continuity $P\left(\bigcup A_n\right) = \lim_n(1 - 3^{-n}) = 1$. The trap is the intersection: every $A_n$ contains $A_1$, so $\bigcap_nA_n = A_1$ and $P\left(\bigcap A_n\right) = P(A_1) = 1 - \frac13 = \frac23$. This is consistent with (c): the bound $\frac12$ is valid but not attained here. (The union bound is tight only when the complements $A_n^c$ are disjoint.)` },
]);
