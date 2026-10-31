EXAM({ id: 'quiz1', quiz: true, minutes: 45, title: 'Chapter 1 pop quiz', summary: 'Mixed Chapter 1: counting PINs, a die-then-coins Bayes problem, independence proofs and continuity.',
  intro: R`Original questions, not taken from the homework, drills or mocks. Topics are mixed on purpose, as on the exam: work out which tool each part needs. 45 minutes, paper, simple calculator.` }, [
  { k: '1', pts: 30, intro: R`A 4-digit PIN is chosen uniformly at random from all $10^4$ strings $0000,\dots,9999$ (repeats allowed, leading zeros allowed).`, parts: [
    { k: 'a', pts: 10, topic: '1.3', q: R`Find $P(\text{all four digits are different})$.`,
      h: [R`Equally likely outcomes: count the favourable strings and divide by $10^4$.`, R`Fill the positions one at a time: 10 choices, then 9, then …`],
      a: '0.504',
      s: R`All $10^4$ PINs are equally likely, so $P(A) = |A|/10^4$. Fill the digits left to right: 10 choices for the first, 9 for the second (anything but the first), 8, then 7. So
$$P = \frac{10\cdot9\cdot8\cdot7}{10^4} = \frac{5040}{10000} = 0.504.$$
Order matters here (1234 and 4321 are different PINs), so it is a permutation count $10!/6!$, not $\binom{10}{4}$.` },
    { k: 'b', pts: 10, topic: '1.2', q: R`Find $P(\text{the PIN contains at least one } 0 \text{ and at least one } 9)$.`,
      h: [R`"At least one" is awkward directly. Write $Z$ = "no 0" and $N$ = "no 9". The event you want is $Z^c\cap N^c = (Z\cup N)^c$ (De Morgan).`, R`$P(Z) = 0.9^4$, $P(Z\cap N) = 0.8^4$. Use inclusion–exclusion for $P(Z\cup N)$.`],
      a: '0.0974',
      s: R`Let $Z$ = "no 0 appears" and $N$ = "no 9 appears". We want $Z^c\cap N^c = (Z\cup N)^c$ by De Morgan, so
$$P = 1 - P(Z\cup N) = 1 - P(Z) - P(N) + P(Z\cap N).$$
"No 0": each digit has 9 options, so $P(Z) = 9^4/10^4 = 0.6561$. Likewise $P(N) = 0.6561$. "No 0 and no 9": 8 options per digit, so $P(Z\cap N) = 0.8^4 = 0.4096$. Then
$$P = 1 - 2(0.6561) + 0.4096 = 0.0974.$$
**Common mistake:** $1 - P(Z) - P(N)$ forgets the overlap: PINs with neither digit are subtracted twice.` },
    { k: 'c', pts: 10, topic: '1.3', q: R`Find the probability that the PIN uses exactly two distinct digits, each appearing exactly twice (like $3883$ or $0505$).`,
      h: [R`Build such a PIN in two steps: choose *which* two digits, then choose *where* the smaller one goes.`, R`$\binom{10}{2}$ pairs of digits; then $\binom42$ ways to place the smaller digit.`],
      a: '0.027',
      s: R`Build the PIN in two steps.
1. Choose the set of two digits: $\binom{10}{2} = 45$ ways. (A set, so $\{3,8\}$ is counted once.)
2. Choose the 2 positions (out of 4) of the smaller digit: $\binom42 = 6$ ways. The other digit fills the rest.

Each PIN of this type comes from exactly one choice in each step, so there are $45\cdot6 = 270$ of them, and
$$P = \frac{270}{10^4} = 0.027.$$
**Watch out:** choosing an *ordered* pair of digits ($10\cdot9 = 90$) and then $\binom42$ positions for "the first" counts $3883$ twice: once as (3,8) with 3 in positions 1 and 4, and once as (8,3) with 8 in positions 2 and 3.` },
  ] },
  { k: '2', pts: 40, intro: R`A fair die is rolled. If it shows $k$, a fair coin is then tossed $k$ times. Let $D_k$ = "the die shows $k$", $H$ = "all the tosses are heads", and $E$ = "the die shows an even number".`, parts: [
    { k: 'a', pts: 10, topic: '1.6', q: R`Find $P(H)$.`,
      h: [R`The die roll splits $\Omega$ into the partition $D_1,\dots,D_6$. Use the law of total probability.`, R`$P(H\mid D_k) = 2^{-k}$, and $\sum_{k=1}^6 2^{-k} = 1 - 2^{-6}$ (geometric sum).`],
      a: '21/128',
      s: R`The events $D_1,\dots,D_6$ partition $\Omega$, each with probability $\frac16$. Given $D_k$, the $k$ tosses are independent, so $P(H\mid D_k) = (\frac12)^k$. By total probability,
$$P(H) = \sum_{k=1}^6 P(H\mid D_k)P(D_k) = \frac16\sum_{k=1}^6 2^{-k} = \frac16\left(1 - \frac1{64}\right) = \frac16\cdot\frac{63}{64} = \frac{21}{128}\approx0.164.$$` },
    { k: 'b', pts: 10, topic: '1.6', q: R`Given that all the tosses were heads, find the probability that the die showed $1$.`,
      h: [R`Bayes: $P(D_1\mid H) = \frac{P(H\mid D_1)P(D_1)}{P(H)}$, with $P(H)$ from (a).`],
      a: '32/63',
      s: R`By Bayes,
$$P(D_1\mid H) = \frac{P(H\mid D_1)P(D_1)}{P(H)} = \frac{\frac12\cdot\frac16}{21/128} = \frac{1}{12}\cdot\frac{128}{21} = \frac{32}{63}\approx0.508.$$
**Sanity check:** the prior was $\frac16$. Seeing "all heads" is far more likely with few tosses, so the posterior shifts toward small $k$, and $D_1$ alone gets more than half.` },
    { k: 'c', pts: 10, topic: '1.6', q: R`Now suppose instead that exactly one head was observed. Find the probability that the die showed $2$.`,
      h: [R`Given $D_k$, $P(\text{exactly one head}\mid D_k) = k\cdot2^{-k}$: choose which toss is the head, and every sequence has probability $2^{-k}$.`, R`$\sum_{k=1}^6 k\,2^{-k} = \frac{120}{64}$. The $\frac16$ priors cancel in Bayes.`],
      a: '4/15',
      s: R`Let $O$ = "exactly one head". Given $D_k$, there are $k$ sequences with exactly one head, each with probability $2^{-k}$, so $P(O\mid D_k) = k\,2^{-k}$. The values for $k = 1,\dots,6$ are
$$\tfrac12,\ \tfrac24,\ \tfrac38,\ \tfrac4{16},\ \tfrac5{32},\ \tfrac6{64},\quad\text{which sum to }\tfrac{32+32+24+16+10+6}{64} = \tfrac{120}{64}.$$
All priors equal $\frac16$, so they cancel in Bayes:
$$P(D_2\mid O) = \frac{P(O\mid D_2)}{\sum_k P(O\mid D_k)} = \frac{1/2}{120/64} = \frac{32}{120} = \frac4{15}.$$
(Note that $D_1$ gets the same value, $\frac4{15}$: one toss gives a single head with probability $\frac12$, and so do two tosses.)` },
    { k: 'd', pts: 10, topic: '1.4', q: R`Are $E$ ("die even") and $H$ ("all heads") independent? Justify with numbers.`,
      h: [R`Compute $P(E\cap H) = \frac16\left(P(H\mid D_2) + P(H\mid D_4) + P(H\mid D_6)\right)$ and compare it with $P(E)P(H)$.`],
      a: [[R`$P(E\cap H)$`, '7/128'], ['independent?', { choice: ['Yes', 'No'], v: 1 }]],
      s: R`$P(E\cap H) = \frac16\left(\frac14 + \frac1{16} + \frac1{64}\right) = \frac16\cdot\frac{21}{64} = \frac{7}{128}$.

On the other hand, $P(E)P(H) = \frac12\cdot\frac{21}{128} = \frac{21}{256}$, while $P(E\cap H) = \frac{14}{256}$. These differ, so **not independent**.

**Intuition:** an even die means at least 2 tosses, so "all heads" becomes less likely: $P(H\mid E) = \frac{7/128}{1/2} = \frac7{64}<P(H) = \frac{21}{128}$.` },
  ] },
  { k: '3', pts: 30, intro: R`Independence and the axioms.`, parts: [
    { k: 'a', pts: 10, topic: '1.4', q: R`Let $A\indep B$ and $A\indep C$, where $B$ and $C$ are **disjoint**. Prove that $A\indep(B\cup C)$.`,
      h: [R`Distribute: $A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$. Are these two pieces disjoint?`, R`Use additivity (Axiom 3), then independence on each piece, then additivity again for $P(B\cup C)$.`],
      s: R`$A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$, and the two pieces are disjoint because $B\cap C = \emptyset$. By additivity and then independence,
$$P(A\cap(B\cup C)) = P(A\cap B) + P(A\cap C) = P(A)P(B) + P(A)P(C) = P(A)\big(P(B) + P(C)\big) = P(A)P(B\cup C),$$
where the last step uses additivity again ($B$, $C$ disjoint). This is the definition of $A\indep(B\cup C)$. $\blacksquare$

**Grading points:** state that the pieces are disjoint (that is why the sum is allowed); use independence on each piece; finish with $P(B\cup C) = P(B) + P(C)$.` },
    { k: 'b', pts: 10, topic: '1.4', q: R`Show the disjointness in (a) is needed. Take $\Omega = \{1,2,3,4\}$ with equally likely outcomes, $A = \{1,4\}$, $B = \{1,2\}$, $C = \{1,3\}$. Check that $A\indep B$ and $A\indep C$, then compute $P(A\mid B\cup C)$.`,
      h: [R`$P(A\cap B) = P(\{1\})$. Compare it with $P(A)P(B)$.`, R`$B\cup C = \{1,2,3\}$ and $A\cap(B\cup C) = \{1\}$.`],
      a: '1/3',
      s: R`Each of $A$, $B$, $C$ has probability $\frac12$.
- $A\cap B = \{1\}$, so $P(A\cap B) = \frac14 = \frac12\cdot\frac12$ ✓, hence $A\indep B$.
- $A\cap C = \{1\}$, so $P(A\cap C) = \frac14 = \frac12\cdot\frac12$ ✓, hence $A\indep C$.

But $B\cup C = \{1,2,3\}$ and $A\cap(B\cup C) = \{1\}$, so
$$P(A\mid B\cup C) = \frac{1/4}{3/4} = \frac13\ne\frac12 = P(A).$$
So $A$ is **not** independent of $B\cup C$. The proof in (a) fails because $B\cap C = \{1\}\ne\emptyset$: the outcome 1 would be counted twice.` },
    { k: 'c', pts: 10, topic: '1.2', q: R`Let $A_1, A_2, \dots$ be events with $P(A_n) = 1$ for every $n$. Prove that $P\left(\bigcap_{n=1}^\infty A_n\right) = 1$. You may use Boole's inequality.`,
      h: [R`Pass to complements: $\left(\bigcap_n A_n\right)^c = \bigcup_n A_n^c$ (De Morgan).`, R`Each $P(A_n^c) = 0$. Boole: $P\left(\bigcup_n A_n^c\right)\le\sum_n P(A_n^c)$.`],
      s: R`By De Morgan, $\left(\bigcap_n A_n\right)^c = \bigcup_n A_n^c$. Each $P(A_n^c) = 1 - P(A_n) = 0$. By Boole's inequality,
$$0\le P\left(\bigcup_n A_n^c\right)\le\sum_{n=1}^\infty P(A_n^c) = \sum_{n=1}^\infty 0 = 0.$$
So $P\left(\bigcup_n A_n^c\right) = 0$, and by the complement rule $P\left(\bigcap_n A_n\right) = 1 - 0 = 1$. $\blacksquare$

**Takeaway:** countably many probability-1 events happen *together* with probability 1. The same is **not** true for uncountably many events. For $X\sim\operatorname{Unif}(0,1)$, each event $\{X\ne x\}$ has probability 1, but their intersection over all $x\in(0,1)$ is empty.` },
  ] },
]);
