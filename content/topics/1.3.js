TOPIC({ id: '1.3', ch: 1, title: 'Equally likely outcomes and counting', summary: 'P(A) = |A|/|Ω|; permutations, combinations, the birthday problem.' }, [
R`When every outcome in a finite $\Omega$ is **equally likely** (fair dice, well-shuffled cards, random draws), probability is just counting:`,
DEF('Uniform probability on a finite Ω', R`If $\Omega = \{\omega_1,\dots,\omega_n\}$ and $P(\{\omega_i\}) = \frac1n$, then
$$P(A) = \frac{|A|}{|\Omega|} = \frac{\#\text{favourable outcomes}}{\#\text{possible outcomes}}.$$`),
P({ k: 'a', lvl: 1, q: R`Two fair dice. $P(\text{sum} = 7)$?`, h: [R`6 favourable out of 36.`], a: '1/6', s: R`$\frac{6}{36} = \frac16$.` }),
DEF('Counting tools', R`<ul><li>Number of orderings of $n$ distinct objects: $n! = n(n-1)\cdots1$.</li><li>Ordered selections of $k$ from $n$ without replacement: $\frac{n!}{(n-k)!}$.</li><li>Unordered selections ("$n$ choose $k$"): $\binom nk = \frac{n!}{k!(n-k)!}$.</li><li>Ordered selections with replacement: $n^k$.</li></ul>`),
P({ k: 'b', lvl: 1, q: R`How many ways to choose 3 people out of 10 (order irrelevant)?`, h: [R`$\binom{10}3$.`], a: '120', s: R`$\frac{10\cdot9\cdot8}{6} = 120$.` }),
P({ k: 'c', lvl: 2, q: R`A committee of 3 is chosen at random from 5 men and 4 women. $P(\text{exactly 2 women})$?`, h: [R`$\binom42\binom51/\binom93$.`], a: '5/14', s: R`$\frac{6\cdot5}{84} = \frac{30}{84} = \frac5{14}$.` }),
P({ k: 'd', lvl: 2, q: R`Five cards are dealt from a standard deck. $P(\text{all hearts})$?`, h: [R`$\binom{13}5/\binom{52}5$.`], a: '1287/2598960', s: R`$\frac{1287}{2598960}\approx0.000495$.` }),
P({ k: 'e', lvl: 2, q: R`4 balls are placed independently and uniformly into 4 boxes. $P(\text{every box gets exactly one ball})$?`, h: [R`Favourable: $4!$ orderings; total $4^4$.`], a: '3/32', s: R`$\frac{4!}{4^4} = \frac{24}{256} = \frac3{32}$.` }),
P({ k: 'f', lvl: 2, q: R`10 people sit in a random order in a row. $P(\text{Ann and Bob sit next to each other})$?`, h: [R`Glue Ann and Bob into one block: $9!$ arrangements, times 2 internal orders.`], a: '1/5', s: R`$\frac{2\cdot9!}{10!} = \frac{2}{10} = \frac15$.` }),
P({ k: 'g', lvl: 3, q: R`(Birthday problem.) 30 children, birthdays independent and uniform over 365 days. Find $P(\text{at least two share a birthday})$.`,
  h: [R`Complement: all different. Chain rule: $\frac{365}{365}\cdot\frac{364}{365}\cdots\frac{336}{365}$.`],
  a: '0.706316',
  s: R`$$P(\text{all different}) = \prod_{i=1}^{30}\frac{365 - (i-1)}{365} = \frac{365!}{335!\,365^{30}}\approx0.2937,$$
so $P(\text{shared}) \approx 0.7063$. Surprisingly large: there are $\binom{30}2 = 435$ pairs that could match.`, src: 'HW1 C2' }),
]);

DRILLS('1.3', [
  { k: '01', lvl: 1, q: R`Three dice. $P(\text{sum} = 3)$?`, h: [R`Only (1,1,1).`], a: '1/216', s: R`$\frac1{216}$.` },
  { k: '02', lvl: 1, q: R`$\binom83$?`, h: [R`$\frac{8\cdot7\cdot6}{6}$.`], a: '56', s: R`$56$.` },
  { k: '03', lvl: 2, q: R`4 people: $P(\text{all birthdays different})$ (365 days)?`, h: [R`$\frac{365\cdot364\cdot363\cdot362}{365^4}$.`], a: '365*364*363*362/365^4', s: R`$\approx0.9836$.` },
  { k: '04', lvl: 2, q: R`Lottery: choose 6 of 49. Probability of matching all six?`, h: [R`$1/\binom{49}6$.`], a: '1/13983816', s: R`$\binom{49}6 = 13{,}983{,}816$.` },
  { k: '05', lvl: 2, q: R`Number of distinct arrangements of the letters of MISSISSIPPI?`, h: [R`$\frac{11!}{4!4!2!}$.`], a: '34650', s: R`$\frac{39916800}{24\cdot24\cdot2} = 34650$.` },
  { k: '06', lvl: 1, q: R`Urn with 4 red, 6 blue. Draw 2 without replacement. $P(\text{both red})$?`, h: [R`$\binom42/\binom{10}2$.`], a: '2/15', s: R`$\frac{6}{45} = \frac2{15}$.` },
  { k: '07', lvl: 1, q: R`$P(\text{at least one 6 in 4 rolls of a die})$?`, h: [R`Complement.`], a: '1-(5/6)^4', s: R`$1 - (5/6)^4\approx0.518$.` },
  { k: '08', lvl: 2, q: R`Two dice. $P(\max = 4)$?`, h: [R`$P(\max\le4) - P(\max\le3)$.`], a: '7/36', s: R`$\frac{16 - 9}{36} = \frac7{36}$.` },
]);
