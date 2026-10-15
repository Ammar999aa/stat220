TOPIC({ id: '1.4', ch: 1, title: 'Independent events', summary: 'P(A∩B) = P(A)P(B); disjoint ≠ independent; complements; several events.' }, [
R`Two events are independent when one happening doesn't change the chance of the other. With separate coin tosses, getting heads on the first says nothing about the second. In probability language, "and" becomes "multiply".`,
DEF('Independent events', R`$A$ and $B$ are **independent**, written $A\indep B$, if
$$P(A\cap B) = P(A)P(B).$$
A collection $\{A_i\}$ is (mutually) independent if $P\left(\bigcap_{i\in J}A_i\right) = \prod_{i\in J}P(A_i)$ for **every** finite sub-collection $J$.`),
EX('Slides: a die', R`$A = \{2,4,6\}$ (even), $B = \{1,2,3,4\}$. $P(A\cap B) = P(\{2,4\}) = \frac13 = \frac12\cdot\frac23 = P(A)P(B)$. So $A\indep B$, even though both concern the same roll! Independence is about probabilities, not about "physically separate" experiments.`),
P({ k: 'a', lvl: 1, q: R`$A\indep B$ with $P(A) = 0.3$, $P(B) = 0.4$. Find $P(A\cap B)$ and $P(A\cup B)$.`, h: [R`Multiply, then inclusion–exclusion.`], a: [[R`$P(A\cap B)$`, '0.12'], [R`$P(A\cup B)$`, '0.58']], s: R`$0.12$ and $0.3 + 0.4 - 0.12 = 0.58$.` }),
P({ k: 'b', lvl: 1, q: R`A fair coin is tossed 10 times independently. $P(\text{at least one head})$?`, h: [R`Complement: all tails, $\prod P(T_i)$.`], a: '1-2^(-10)', s: R`$1 - (\frac12)^{10} = 1 - \frac1{1024}\approx0.999$.`, src: 'Slides Ch.1' }),
WARN('Disjoint is NOT independent', R`If $A\cap B = \emptyset$ with $P(A)>0$ and $P(B)>0$, then $P(A\cap B) = 0\ne P(A)P(B)$. Disjoint events are strongly *dependent*: if one happens, the other certainly doesn't. They can only be independent if one of them has probability 0.`),
P({ k: 'c', lvl: 1, q: R`$A, B$ are disjoint with $P(A) = 0.2$ and $P(B) = 0.5$. Are they independent?`, h: [R`Compare $P(A\cap B)$ with $P(A)P(B)$.`], a: { choice: ['Yes', 'No'], v: 1 }, s: R`$P(A\cap B) = 0\ne0.1$. No.` }),
P({ k: 'd', lvl: 2, q: R`Prove that if $A\indep B$, then $A^c\indep B^c$. Then compute $P(A^c\cap B^c)$ for $P(A) = 0.4$, $P(B) = 0.3$.`, h: [R`$A^c\cap B^c = (A\cup B)^c$.`], a: '0.42',
  s: R`$P(A^c\cap B^c) = 1 - P(A\cup B) = 1 - P(A) - P(B) + P(A)P(B) = (1-P(A))(1-P(B)) = P(A^c)P(B^c)$. Numerically $0.6\cdot0.7 = 0.42$.`, src: 'HW1 A3 (Wasserman 1.10.11)' }),
P({ k: 'e', lvl: 3, q: R`A box has 4 red and 6 blue balls. Draw **with replacement** until both colours have appeared. Find $P(\text{exactly 3 draws})$ and $P(\text{more than 3 draws})$.`,
  h: [R`Exactly 3 draws: RRB or BBR. Draws are independent with $P(R) = \frac25$.`, R`More than 3: the first three are the same colour (RRR or BBB).`],
  a: [['exactly 3', '6/25'], ['more than 3', '7/25']],
  s: R`$P(RRB) + P(BBR) = (\tfrac25)^2\tfrac35 + (\tfrac35)^2\tfrac25 = \tfrac{12}{125} + \tfrac{18}{125} = \tfrac{30}{125} = \tfrac{6}{25}$.

More than 3 draws means the first 3 draws have the same colour: $P(RRR) + P(BBB) = \tfrac{8}{125} + \tfrac{27}{125} = \tfrac{35}{125} = \tfrac7{25}$.`, src: 'HW1 B1' }),
P({ k: 'f', lvl: 3, q: R`Two fair coin tosses. $A$ = first is H, $B$ = second is H, $C$ = both tosses agree. Are $A,B,C$ pairwise independent? Mutually independent?`, h: [R`$P(A\cap C) = P(HH) = \frac14$. $P(A\cap B\cap C) = \frac14$ vs $\frac18$.`],
  a: [['pairwise?', { choice: ['Yes', 'No'], v: 0 }], ['mutually?', { choice: ['Yes', 'No'], v: 1 }]],
  s: R`Each event has probability $\frac12$ and each pairwise intersection is $\{HH\}$ or $\{TT\}$-type with probability $\frac14$, so they are pairwise independent. But $P(A\cap B\cap C) = P(HH) = \frac14\ne\frac18$. They are not mutually independent.` }),
P({ k: 'g', lvl: 2, q: R`Three components work independently with probability 0.9 each. Find the reliability of a series system (all must work) and of a parallel system (at least one works).`, h: [R`Series: product. Parallel: complement of "all fail".`], a: [['series', '0.729'], ['parallel', '0.999']], s: R`$0.9^3 = 0.729$; $1 - 0.1^3 = 0.999$.` }),
]);

DRILLS('1.4', [
  { k: '01', lvl: 1, q: R`$A\indep B$, $P(A) = 0.5$, $P(B) = 0.2$. $P(A\cap B)$?`, h: [R`Multiply.`], a: '0.1', s: R`$0.1$.` },
  { k: '02', lvl: 1, q: R`$A\indep B$, $P(A) = 0.5$, $P(B) = 0.2$. $P(A\cap B^c)$?`, h: [R`$A$ is independent of $B^c$ too.`], a: '0.4', s: R`$0.5\cdot0.8 = 0.4$.` },
  { k: '03', lvl: 1, q: R`$A\indep B$, $P(A) = 0.6$, $P(A\cap B) = 0.3$. $P(B)$?`, h: [R`Divide.`], a: '0.5', s: R`$0.5$.` },
  { k: '04', lvl: 2, q: R`Two dice: $A$ = first die even, $B$ = sum is 7. Independent?`, h: [R`$P(A\cap B) = \frac{3}{36}$.`], a: { choice: ['Yes', 'No'], v: 0 }, s: R`$\frac1{12} = \frac12\cdot\frac16$. Yes.` },
  { k: '05', lvl: 2, q: R`Two dice: $A$ = first die is 6, $B$ = sum is 12. Independent?`, h: [R`$P(A\cap B) = \frac1{36}$.`], a: { choice: ['Yes', 'No'], v: 1 }, s: R`$\frac1{36}\ne\frac16\cdot\frac1{36}$. No.` },
  { k: '06', lvl: 1, q: R`5 independent trials with success probability 0.2. $P(\text{at least one success})$?`, h: [R`Complement.`], a: '1-0.8^5', s: R`$1 - 0.8^5 = 0.67232$.` },
  { k: '07', lvl: 1, q: R`3 independent alarms each work with probability 0.95. $P(\text{at least one works})$?`, h: [R`Complement.`], a: '1-0.05^3', s: R`$1 - 0.000125 = 0.999875$.` },
  { k: '08', lvl: 2, q: R`Same box as HW1 B1 (4 red, 6 blue, with replacement until both colours seen). $P(\text{exactly 4 draws})$?`, h: [R`RRRB or BBBR.`], a: '78/625', s: R`$(\tfrac25)^3\tfrac35 + (\tfrac35)^3\tfrac25 = \tfrac{24 + 54}{625} = \tfrac{78}{625}$.` },
]);
