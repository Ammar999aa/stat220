TOPIC({ id: '1.5', ch: 1, title: 'Conditional probability', summary: 'P(A|B) = P(A∩B)/P(B), the chain rule, P(A|B) ≠ P(B|A).' }, [
R`Conditioning means **updating** probabilities when you learn something. If you learn that $B$ happened, the world shrinks to $B$, and the chance of $A$ becomes the fraction of $B$ that is also in $A$.`,
DEF('Conditional probability', R`If $P(B)>0$,
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)}.$$
For fixed $B$, $P(\cdot\mid B)$ is itself a probability measure: it satisfies all three axioms (HW1 A1).`),
P({ k: 'a', lvl: 1, q: R`Roll a die. $P(\text{even}\mid\text{result}\le3)$?`, h: [R`Within $\{1,2,3\}$ only 2 is even.`], a: '1/3', s: R`$\frac{P(\{2\})}{P(\{1,2,3\})} = \frac{1/6}{1/2} = \frac13$.` }),
P({ k: 'b', lvl: 2, q: R`A family has two children (each independently a boy or a girl with probability $\frac12$). Given at least one is a boy, what is $P(\text{both are boys})$?`, h: [R`Conditioning event: $\{BB, BG, GB\}$.`], a: '1/3', s: R`$\frac{P(BB)}{P(\text{at least one boy})} = \frac{1/4}{3/4} = \frac13$. Not $\frac12$!` }),
WARN(R`$P(A\mid B)\ne P(B\mid A)$`, R`In the slides' medical example, $P(+\mid D) = 0.9$ (the test catches 90% of the sick), but $P(D\mid+)\approx0.08$ (only 8% of positives are sick, because the disease is rare). Confusing the two is the "prosecutor's fallacy".`),
EX('Medical test (slides)', R`<table><tr><th></th><th>$D$</th><th>$D^c$</th></tr><tr><th>$+$</th><td>.009</td><td>.099</td></tr><tr><th>$-$</th><td>.001</td><td>.891</td></tr></table>
$P(+\mid D) = \frac{.009}{.009+.001} = .90$, $P(-\mid D^c) = \frac{.891}{.990} = .90$, but $P(D\mid+) = \frac{.009}{.009+.099} = \frac{.009}{.108}\approx.08$.`),
P({ k: 'c', lvl: 2, q: R`Using the table above, find $P(D^c\mid -)$.`, h: [R`$P(-) = .001 + .891$.`], a: '.891/.892', s: R`$\frac{.891}{.892}\approx0.9989$. A negative result is very reassuring.` }),
THM('Multiplication rule (chain rule)', R`$P(A\cap B) = P(A\mid B)P(B)$, and more generally
$$P(A\cap B\cap C) = P(A\mid B\cap C)\,P(B\mid C)\,P(C).$$
(Apply the definition twice; HW1 A4.)`),
P({ k: 'd', lvl: 2, q: R`Draw 3 cards without replacement. $P(\text{all three are aces})$?`, h: [R`$\frac4{52}\cdot\frac3{51}\cdot\frac2{50}$.`], a: '4/52*3/51*2/50', s: R`$\frac{24}{132600} = \frac1{5525}\approx0.00018$.` }),
THM('Independence via conditioning', R`If $A\indep B$ and $P(B)>0$, then $P(A\mid B) = P(A)$: learning $B$ doesn't change $A$'s chance.`),
P({ k: 'e', lvl: 1, q: R`$P(A\mid B) = 0.5$ and $P(B) = 0.4$. Find $P(A\cap B)$.`, h: [R`Multiplication rule.`], a: '0.2', s: R`$0.5\cdot0.4 = 0.2$.` }),
P({ k: 'f', lvl: 3, q: R`(Monty Hall.) A prize is behind one of 3 doors. You pick door 1. Monty, who knows where the prize is, opens one of the other two doors that has no prize (choosing at random if both are empty). Should you switch? Enter $P(\text{win if you switch})$.`,
  h: [R`Outcome $(\omega_1,\omega_2)$ = (prize door, door Monty opens). $P(\omega_1 = 1) = \frac13$, and if the prize is behind 1, staying wins.`, R`Switching wins exactly when the prize is NOT behind door 1.`],
  a: '2/3',
  s: R`Staying wins iff the prize is behind door 1: probability $\frac13$. If the prize is behind door 2, Monty must open 3; if behind 3, he must open 2. Either way switching wins. So $P(\text{win by switching}) = P(\omega_1 = 2,\omega_2 = 3) + P(\omega_1 = 3,\omega_2 = 2) = \frac13 + \frac13 = \frac23$. **Switch.**`, src: 'HW1 A2 (Wasserman 1.10.10)' }),
]);

DRILLS('1.5', [
  { k: '01', lvl: 1, q: R`$P(A\cap B) = 0.12$, $P(B) = 0.4$. $P(A\mid B)$?`, h: [R`Divide.`], a: '0.3', s: R`$0.3$.` },
  { k: '02', lvl: 1, q: R`Die: $P(6\mid\text{even})$?`, h: [R`Three even faces.`], a: '1/3', s: R`$\frac13$.` },
  { k: '03', lvl: 1, q: R`Two dice: $P(\text{sum} = 8\mid\text{first} = 3)$?`, h: [R`Second must be 5.`], a: '1/6', s: R`$\frac16$.` },
  { k: '04', lvl: 1, q: R`$P(\text{second card is an ace}\mid\text{first is an ace})$ (no replacement)?`, h: [R`3 aces left in 51.`], a: '3/51', s: R`$\frac3{51} = \frac1{17}$.` },
  { k: '05', lvl: 2, q: R`$P(B\mid A) = 0.8$, $P(A) = 0.3$, $P(B) = 0.6$. $P(A\mid B)$?`, h: [R`$P(A\cap B) = 0.24$.`], a: '0.4', s: R`$\frac{0.24}{0.6} = 0.4$.` },
  { k: '06', lvl: 1, q: R`Urn: 3 red, 2 blue. Draw 2 without replacement. $P(\text{both red})$?`, h: [R`Chain rule.`], a: '3/10', s: R`$\frac35\cdot\frac24 = \frac3{10}$.` },
  { k: '07', lvl: 1, q: R`$P(A\mid B) = 0.3$. $P(A^c\mid B)$?`, h: [R`$P(\cdot\mid B)$ is a probability.`], a: '0.7', s: R`$0.7$.` },
  { k: '08', lvl: 2, q: R`Two children. $P(\text{both girls}\mid\text{the older is a girl})$?`, h: [R`Only the younger is unknown.`], a: '1/2', s: R`$\frac12$ (compare with the "at least one" version, which gives $\frac13$).` },
  { k: '09', lvl: 3, q: R`A family has two children. Each child is independently a boy or a girl with probability $\frac12$, and born on each of the 7 days of the week with probability $\frac17$, independently. Given that **at least one of the children is a boy born on a Tuesday**, find $P(\text{both are boys})$.`,
    h: [R`Each child is one of $2\times7 = 14$ equally likely types (sex, day), so there are $14^2 = 196$ equally likely ordered pairs.`, R`Let $T$ = "at least one is a Tuesday boy". Complement: neither child is a Tuesday boy, $13^2$ pairs. So $|T| = 196 - 169 = 27$.`, R`Count pairs in $T$ that are both boys: complement within the $7\times7 = 49$ boy–boy pairs, i.e. remove those with no Tuesday boy ($6\times6$).`],
    a: '13/27',
    s: R`Each child's type (sex, weekday) is uniform over 14 types, independently, so the $196$ ordered pairs are equally likely.

$T$ = "at least one Tuesday boy": $|T| = 14^2 - 13^2 = 196 - 169 = 27$.
$BB\cap T$: both boys, at least one born on Tuesday: $7^2 - 6^2 = 49 - 36 = 13$.

$$P(BB\mid T) = \frac{13/196}{27/196} = \frac{13}{27}\approx0.481.$$
Compare: given "at least one boy", the answer is $\frac13$; given "the older is a boy", it is $\frac12$. The extra detail "Tuesday" makes the condition almost identify a specific child, so the answer moves close to $\frac12$. Lesson: always condition on exactly the event you were told, and count carefully.` },
  { k: '10', lvl: 4, q: R`(Exam-style, Pólya urn.) An urn contains 2 red and 3 blue balls. A ball is drawn at random, its colour is noted, and it is returned **together with 2 more balls of the same colour**. This is repeated. Let $R_i$ = "the $i$-th draw is red".

(a) Find $P(R_2)$.

(b) Find $P(R_1\mid R_2)$.

(c) Find $P(R_1\cap R_2\cap R_3)$.

(d) Are $R_1$ and $R_2$ independent?`,
    h: [R`The urn changes after each draw, so condition on what happened before. After $R_1$: 4 red, 3 blue. After $R_1^c$: 2 red, 5 blue.`, R`(a) Total probability over $\{R_1, R_1^c\}$. (b) Bayes: $P(R_1\mid R_2) = \frac{P(R_2\mid R_1)P(R_1)}{P(R_2)}$.`, R`(c) Chain rule: $P(R_1\cap R_2\cap R_3) = P(R_1)\,P(R_2\mid R_1)\,P(R_3\mid R_1\cap R_2)$.`],
    a: [['(a) P(R2)', '2/5'], ['(b) P(R1|R2)', '4/7'], ['(c) P(R1R2R3)', '16/105'], ['(d) independent?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** $P(R_1) = \frac25$. Given $R_1$ the urn has 4 red, 3 blue, so $P(R_2\mid R_1) = \frac47$. Given $R_1^c$ it has 2 red, 5 blue, so $P(R_2\mid R_1^c) = \frac27$. Total probability:
$$P(R_2) = \frac47\cdot\frac25 + \frac27\cdot\frac35 = \frac{8}{35} + \frac{6}{35} = \frac{14}{35} = \frac25.$$
Surprise: the same as $P(R_1)$. (In a Pólya urn every draw has the same marginal probability of red.)

**(b)** $P(R_1\mid R_2) = \frac{P(R_1\cap R_2)}{P(R_2)} = \frac{8/35}{2/5} = \frac{8}{14} = \frac47$. Note $P(R_1\mid R_2) = P(R_2\mid R_1) = \frac47$, because $P(R_1) = P(R_2)$. Information flows "backwards in time" too: seeing red later makes red earlier more likely.

**(c)** After two reds the urn has 6 red, 3 blue. Chain rule:
$$P(R_1R_2R_3) = \frac25\cdot\frac47\cdot\frac69 = \frac{48}{315} = \frac{16}{105}\approx0.152.$$

**(d)** $P(R_1\cap R_2) = \frac8{35}\approx0.229$, but $P(R_1)P(R_2) = \frac4{25} = 0.16$. **Not independent** (positively related): a red draw adds red balls, which makes more red more likely. Same marginals do not imply independence.` },
]);
