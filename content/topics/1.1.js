TOPIC({ id: '1.1', ch: 1, title: 'Sample spaces, events and set operations', summary: 'Ω, outcomes, events; union, intersection, complement, partitions, monotone sequences of sets.' }, [
R`**Probability** goes from a known data-generating process to predictions about data ("if the coin is fair, how likely are 7 heads in 10 tosses?"). **Statistics** goes the other way: from observed data back to the process. This course builds the probability side first (Chapters 1–5), then uses it for statistics.

Everything starts with a precise description of *what can happen*.`,
DEF('Sample space, outcomes, events', R`The **sample space** $\Omega$ is the set of all possible outcomes of an experiment. Its elements $\omega\in\Omega$ are **outcomes** (or realizations). An **event** is a subset $A\subseteq\Omega$. We say "$A$ happens" when the outcome lands in $A$.`),
EX('Slides examples', R`<ul><li>Toss a coin twice: $\Omega = \{HH, HT, TH, TT\}$. "First toss is heads" is the event $A = \{HH, HT\}$.</li><li>Room temperature (Kelvin): $\Omega = [0,\infty)$. An event: $A = [280, 290]$.</li><li>Toss a coin forever: $\Omega = \{\omega = (\omega_1,\omega_2,\dots): \omega_i\in\{H,T\}\}$, an uncountable set.</li></ul>`),
P({ k: 'a', lvl: 1, q: R`Toss a coin twice. How many outcomes are in the event "at least one head"?`, h: [R`List $\Omega$ and cross out TT.`], a: '3', s: R`$\{HH, HT, TH\}$: 3 outcomes.` }),
H('Set operations'),
DEF('Operations on events', R`<ul><li>Complement $A^c = \{\omega\in\Omega:\omega\notin A\}$: "not $A$".</li><li>Union $A\cup B$: "$A$ or $B$ (or both)".</li><li>Intersection $A\cap B$ (also $AB$): "$A$ and $B$".</li><li>Difference $A\setminus B = A\cap B^c$: "$A$ but not $B$".</li><li>Empty set $\emptyset = \Omega^c$.</li><li>$A_1,A_2,\dots$ are <b>disjoint</b> (mutually exclusive) if $A_i\cap A_j = \emptyset$ for $i\ne j$.</li><li>A <b>partition</b> of $\Omega$ is a disjoint sequence with $\bigcup_iA_i = \Omega$.</li></ul>
**De Morgan's laws:** $(A\cup B)^c = A^c\cap B^c$ and $(A\cap B)^c = A^c\cup B^c$. In words, "not (A or B)" = "not A and not B".`),
P({ k: 'b', lvl: 1, q: R`Roll a die. $A = \{2,4,6\}$, $B = \{1,2,3\}$. Find $|A\cap B|$, $|A\cup B|$ and $|A\setminus B|$.`, h: [R`$A\cap B = \{2\}$.`], a: [[R`$|A\cap B|$`, '1'], [R`$|A\cup B|$`, '5'], [R`$|A\setminus B|$`, '2']],
  s: R`$A\cap B = \{2\}$, $A\cup B = \{1,2,3,4,6\}$, $A\setminus B = \{4,6\}$.` }),
P({ k: 'c', lvl: 1, q: R`Which set equals $(A\cup B)^c$?`, h: [R`De Morgan.`], a: { choice: [R`$A^c\cup B^c$`, R`$A^c\cap B^c$`, R`$A\cap B$`], v: 1 }, s: R`$(A\cup B)^c = A^c\cap B^c$: neither happens.` }),
H('Sequences of sets'),
DEF('Countable unions/intersections; monotone sequences', R`$\bigcup_{i=1}^\infty A_i$ = outcomes in **at least one** $A_i$; $\bigcap_{i=1}^\infty A_i$ = outcomes in **every** $A_i$.

$A_1\subseteq A_2\subseteq\cdots$ is **monotone increasing**, and then $\lim A_n = \bigcup_iA_i$. $A_1\supseteq A_2\supseteq\cdots$ is **monotone decreasing**, and then $\lim A_n = \bigcap_iA_i$. These limits are what "continuity of probability" (next topic) is about.`),
EX('Slides', R`$A_i = [0, 1/i)$ is decreasing: $\bigcup_iA_i = [0,1)$ and $\bigcap_iA_i = \{0\}$ ($0$ is in every set; any $x>0$ drops out once $1/i\le x$).
$A_i = (0,1/i)$: $\bigcup = (0,1)$, but $\bigcap = \emptyset$.`),
P({ k: 'd', lvl: 2, q: R`Let $A_i = [0, 1 - \tfrac1i]$ for $i\ge1$. What is $\bigcup_{i=1}^\infty A_i$?`, h: [R`Is 1 ever included? Is $0.999$?`], a: { choice: ['[0,1]', '[0,1)', '{0}', '∅'], v: 1 }, s: R`Every $x<1$ is in $A_i$ once $1 - \frac1i\ge x$, but $1$ is never included: $\bigcup A_i = [0,1)$.` }),
P({ k: 'e', lvl: 2, q: R`$A_i = (-\tfrac1i,\tfrac1i)$. What is $\bigcap_i A_i$?`, h: [R`Which points survive in every interval?`], a: { choice: ['{0}', '∅', '(−1,1)'], v: 0 }, s: R`Only $0$ lies in every interval, so $\bigcap A_i = \{0\}$.` }),
P({ k: 'f', lvl: 1, q: R`$\Omega$ has 3 outcomes. How many events (subsets) are there?`, h: [R`Each outcome is in or out.`], a: '8', s: R`$2^3 = 8$, including $\emptyset$ and $\Omega$.` }),
P({ k: 'g', lvl: 2, q: R`A box has red and blue balls; you draw with replacement until both colours have appeared. Which describes $\Omega$?`, h: [R`The sequence ends the first time the other colour appears.`],
  a: { choice: [R`$\{R^kB : k\ge1\}\cup\{B^kR: k\ge1\}$`, R`$\{R,B\}^n$ for fixed $n$`, R`$\{RB, BR\}$`], v: 0 },
  s: R`An outcome is a run of one colour (length $k\ge1$) followed by the first draw of the other colour: $\Omega = \{R^kB\}_{k\ge1}\cup\{B^kR\}_{k\ge1}$, e.g. $RRB$, $BBBR$.`, src: 'HW1 B1(1)' }),
]);

DRILLS('1.1', [
  { k: '01', lvl: 1, q: R`Die: $A = \{1,2,3\}$, $B = \{3,4\}$. $|A\cup B|$?`, h: [R`Don't double-count 3.`], a: '4', s: R`$\{1,2,3,4\}$.` },
  { k: '02', lvl: 1, q: R`$A\cap A^c = ?$`, h: [R`Can an outcome be both in and not in $A$?`], a: { choice: ['∅', 'Ω', 'A'], v: 0 }, s: R`$\emptyset$.` },
  { k: '03', lvl: 1, q: R`Three coin tosses: $|\Omega|$ and the number of outcomes with exactly two heads?`, h: [R`$2^3$; choose positions of heads.`], a: [[R`$|\Omega|$`, '8'], ['two heads', '3']], s: R`$8$ and $\binom32 = 3$.` },
  { k: '04', lvl: 2, q: R`$A_i = [\tfrac1i, 1]$. $\bigcup_iA_i = ?$`, h: [R`Is 0 ever included?`], a: { choice: ['[0,1]', '(0,1]', '{1}'], v: 1 }, s: R`$(0,1]$: every $x>0$ eventually enters, 0 never does.` },
  { k: '05', lvl: 1, q: R`Which equals $(A\cap B)^c$?`, h: [R`De Morgan.`], a: { choice: [R`$A^c\cup B^c$`, R`$A^c\cap B^c$`], v: 0 }, s: R`$A^c\cup B^c$.` },
  { k: '06', lvl: 1, q: R`Two dice: number of outcomes, and number with sum 7?`, h: [R`$(1,6),(2,5),\dots$`], a: [['outcomes', '36'], ['sum 7', '6']], s: R`$36$ and $6$.` },
  { k: '07', lvl: 1, q: R`True or false: $A\setminus B = A\cap B^c$.`, h: [R`Definition.`], a: { choice: ['True', 'False'], v: 0 }, s: R`True.` },
  { k: '08', lvl: 2, q: R`Is $\{A, A^c\}$ always a partition of $\Omega$ (for $A\ne\emptyset,\Omega$)?`, h: [R`Disjoint? Covers $\Omega$?`], a: { choice: ['Yes', 'No'], v: 0 }, s: R`Yes: disjoint and $A\cup A^c = \Omega$.` },
]);
