HW({ id: 'hw1', title: 'Homework 1', summary: 'Axioms, conditional probability, independence, Bayes (Ch.1).',
  intro: R`Topics: Chapter 1. Problems marked ↗ also appear on a topic page; your progress on them is shared.` }, [
  { k: 'A1', topic: '1.5', lvl: 2, q: R`Fix $B$ with $P(B)>0$. Show that $P(\cdot\mid B)$ satisfies the three axioms of probability.`,
    h: [R`Check (1) non-negativity, (2) $P(\Omega\mid B) = 1$, (3) countable additivity.`, R`For (3): if the $A_i$ are disjoint, so are the $A_i\cap B$, and $\left(\bigcup A_i\right)\cap B = \bigcup(A_i\cap B)$.`],
    s: R`(1) $P(A\mid B) = \frac{P(A\cap B)}{P(B)}\ge0$, since a probability is $\ge0$ and $P(B)>0$.

(2) $P(\Omega\mid B) = \frac{P(\Omega\cap B)}{P(B)} = \frac{P(B)}{P(B)} = 1$.

(3) If $A_1,A_2,\dots$ are disjoint, then the sets $A_i\cap B$ are disjoint too, and
$$P\Big(\bigcup_iA_i\,\Big|\,B\Big) = \frac{P\left(\bigcup_i(A_i\cap B)\right)}{P(B)} = \frac{\sum_iP(A_i\cap B)}{P(B)} = \sum_iP(A_i\mid B).\ \blacksquare$$`, src: 'HW1 A1 (Wasserman 1.10.9)' },
  { k: 'A2', ref: 't1.5-f' },
  { k: 'A3', ref: 't1.4-d' },
  { k: 'A4', topic: '1.5', lvl: 1, q: R`Show that $P(ABC) = P(A\mid BC)\,P(B\mid C)\,P(C)$ (assuming $P(BC)>0$).`,
    h: [R`Start from the right: $P(A\mid BC)P(BC)$ and $P(BC) = P(B\mid C)P(C)$.`],
    s: R`By definition $P(A\mid BC) = \frac{P(ABC)}{P(BC)}$ and $P(B\mid C) = \frac{P(BC)}{P(C)}$. Multiplying:
$$P(A\mid BC)P(B\mid C)P(C) = \frac{P(ABC)}{P(BC)}\cdot\frac{P(BC)}{P(C)}\cdot P(C) = P(ABC).\ \blacksquare$$`, src: 'HW1 A4 (Wasserman 1.10.17)' },
  { k: 'B1 (1)', ref: 't1.1-g' },
  { k: 'B1 (2)–(3)', ref: 't1.4-e' },
  { k: 'B2', ref: 't1.6-i' },
  { k: 'B3 (a)', ref: 't1.6-e' },
  { k: 'B3 (b)', ref: 't1.6-f' },
  { k: 'B3 (c)', ref: 't1.6-g' },
  { k: 'C1', ref: 't1.6-h' },
  { k: 'C2', ref: 't1.3-g' },
]);
