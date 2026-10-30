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
  { k: '01', lvl: 1, q: R`Die: $A = \{1,2,3\}$, $B = \{3,4\}$. How many outcomes are in $A\cup B$? (This count is written $|A\cup B|$.) Answer with a number.`, h: [R`First write out $A\cup B$, then count it.`, R`Don't double-count 3.`], a: '4', s: R`$A\cup B = \{1,2,3,4\}$, so $|A\cup B| = 4$. Bars $|\cdot|$ around a set mean "how many elements it has", so the answer is a number, not the set itself. Check: $|A|+|B|-|A\cap B| = 3+2-1 = 4$.` },
  { k: '02', lvl: 1, q: R`$A\cap A^c = ?$`, h: [R`Can an outcome be both in and not in $A$?`], a: { choice: ['∅', 'Ω', 'A'], v: 0 }, s: R`$\emptyset$.` },
  { k: '03', lvl: 1, q: R`Three coin tosses: $|\Omega|$ and the number of outcomes with exactly two heads?`, h: [R`$2^3$; choose positions of heads.`], a: [[R`$|\Omega|$`, '8'], ['two heads', '3']], s: R`$8$ and $\binom32 = 3$.` },
  { k: '04', lvl: 2, q: R`$A_i = [\tfrac1i, 1]$. $\bigcup_iA_i = ?$`, h: [R`Is 0 ever included?`], a: { choice: ['[0,1]', '(0,1]', '{1}'], v: 1 }, s: R`$(0,1]$: every $x>0$ eventually enters, 0 never does.` },
  { k: '05', lvl: 1, q: R`Which equals $(A\cap B)^c$?`, h: [R`De Morgan.`], a: { choice: [R`$A^c\cup B^c$`, R`$A^c\cap B^c$`], v: 0 }, s: R`$A^c\cup B^c$.` },
  { k: '06', lvl: 1, q: R`Two dice: number of outcomes, and number with sum 7?`, h: [R`$(1,6),(2,5),\dots$`], a: [['outcomes', '36'], ['sum 7', '6']], s: R`$36$ and $6$.` },
  { k: '07', lvl: 1, q: R`True or false: $A\setminus B = A\cap B^c$.`, h: [R`Definition.`], a: { choice: ['True', 'False'], v: 0 }, s: R`True.` },
  { k: '08', lvl: 2, q: R`Is $\{A, A^c\}$ always a partition of $\Omega$ (for $A\ne\emptyset,\Omega$)?`, h: [R`Disjoint? Covers $\Omega$?`], a: { choice: ['Yes', 'No'], v: 0 }, s: R`Yes: disjoint and $A\cup A^c = \Omega$.` },
  { k: '09', lvl: 3, q: R`Pick $n\in\Omega = \{1,2,\dots,100\}$. Let $A$, $B$, $C$ be the events "$n$ is divisible by 2", "by 3", "by 5". Find $|A\cup B\cup C|$, $|A\cap B^c\cap C^c|$ (even, but divisible by neither 3 nor 5), and $|A^c\cap B^c\cap C^c|$.`,
    h: [R`$A\cap B$ = "divisible by 6", $A\cap C$ = "by 10", $B\cap C$ = "by 15", $A\cap B\cap C$ = "by 30". Count each with $\lfloor 100/m\rfloor$.`, R`Inclusion–exclusion for three sets: add singles, subtract pairs, add back the triple.`, R`$A\cap B^c\cap C^c = A\setminus(B\cup C)$, so $|A\cap B^c\cap C^c| = |A| - |A\cap(B\cup C)| = |A| - |A\cap B| - |A\cap C| + |A\cap B\cap C|$. For the last one use De Morgan: $A^c\cap B^c\cap C^c = (A\cup B\cup C)^c$.`],
    a: [[R`$|A\cup B\cup C|$`, '74'], [R`$|A\cap B^c\cap C^c|$`, '27'], [R`$|A^c\cap B^c\cap C^c|$`, '26']],
    s: R`Counts: $|A| = 50$, $|B| = 33$, $|C| = 20$; $|A\cap B| = \lfloor100/6\rfloor = 16$, $|A\cap C| = 10$, $|B\cap C| = \lfloor100/15\rfloor = 6$; $|A\cap B\cap C| = \lfloor100/30\rfloor = 3$.

**Union.** $|A\cup B\cup C| = (50 + 33 + 20) - (16 + 10 + 6) + 3 = 103 - 32 + 3 = 74$. (Trap: $50 + 33 + 20 = 103 > 100$ counts the multiples of 6, 10, 15 twice and the multiples of 30 three times.)

**Even but not divisible by 3 or 5.** $A\cap B^c\cap C^c = A\setminus(B\cup C)$, and $A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$ has $16 + 10 - 3 = 23$ elements. So $|A\cap B^c\cap C^c| = 50 - 23 = 27$.

**None of them.** By De Morgan, $A^c\cap B^c\cap C^c = (A\cup B\cup C)^c$, so it has $100 - 74 = 26$ elements (these are $1$ and the numbers whose prime factors are all $\ge7$, like $7, 49, 77, 91, 97$).` },
  { k: '10', lvl: 4, q: R`(Exam-style.) Let $A_k = \left[0,\ 1 + \frac{(-1)^k}{k}\right]$ for $k\ge1$, so $A_1 = [0,0]$, $A_2 = [0,\tfrac32]$, $A_3 = [0,\tfrac23]$, $A_4 = [0,\tfrac54]$, … Define $B_n = \bigcup_{k\ge n}A_k$ and $C_n = \bigcap_{k\ge n}A_k$.

(a) Is $(A_k)$ a monotone sequence?

(b) $B_5 = [0, b]$ and $C_5 = [0, c]$. Find $b$ and $c$.

(c) $(B_n)$ is decreasing and $(C_n)$ is increasing. Find $\lim B_n = \bigcap_nB_n$ and $\lim C_n = \bigcup_nC_n$.

(d) Does $\lim_k A_k$ exist (i.e. are the two limits in (c) equal)?`,
    h: [R`Split by parity: odd $k$ give $[0, 1 - \frac1k]$ (just below 1), even $k$ give $[0, 1 + \frac1k]$ (just above 1).`, R`$B_n$ is the union, so its right endpoint is the **largest** right endpoint among $k\ge n$: the first even $k\ge n$. $C_n$ is the intersection, so its right endpoint is the **smallest**: the first odd $k\ge n$.`, R`For (c): is $x = 1$ in every $B_n$? Is it in any $C_n$? What about $x = 1 + \varepsilon$ or $x = 1-\varepsilon$?`],
    a: [['(a) monotone?', { choice: ['Yes, increasing', 'Yes, decreasing', 'No'], v: 2 }], ['(b) b', '7/6'], ['(b) c', '4/5'], [R`(c) $\bigcap_nB_n$`, { choice: ['[0,1)', '[0,1]', '[0,2]'], v: 1 }], [R`(c) $\bigcup_nC_n$`, { choice: ['[0,1)', '[0,1]', '{0}'], v: 0 }], ['(d) limit exists?', { choice: ['Yes', 'No'], v: 1 }]],
    s: R`**(a)** The right endpoints $0, \tfrac32, \tfrac23, \tfrac54, \tfrac45, \dots$ go up and down, so the sets neither keep growing nor keep shrinking: **not monotone**.

**(b)** For $k\ge5$: odd $k$ give $[0, 1 - \frac1k]$, even $k$ give $[0, 1 + \frac1k]$. All the sets start at 0, so a union is $[0,\text{largest endpoint}]$ and an intersection is $[0,\text{smallest endpoint}]$.
Largest endpoint for $k\ge5$: $k = 6$, giving $1 + \frac16$. So $B_5 = [0, \frac76]$, $b = \frac76$.
Smallest endpoint for $k\ge5$: $k = 5$, giving $1 - \frac15$. So $C_5 = [0, \frac45]$, $c = \frac45$.

**(c)** In general $B_n = [0, 1 + \frac1{m}]$ with $m$ the first even number $\ge n$, and $C_n = [0, 1 - \frac1{m'}]$ with $m'$ the first odd number $\ge n$.

$\bigcap_nB_n$: $x = 1$ is in every $B_n$; any $x>1$ drops out once $1 + \frac1m < x$. So $\bigcap_nB_n = [0,1]$.

$\bigcup_nC_n$: any $x<1$ enters once $1 - \frac1{m'}\ge x$, but $x = 1$ is never in any $C_n$. So $\bigcup_nC_n = [0,1)$.

**(d)** The two limits differ by the single point $1$: it belongs to infinitely many $A_k$ (all even $k$) but is missed by infinitely many too (all odd $k$). So $\lim A_k$ does **not** exist. In general $\bigcap_nB_n$ = "in infinitely many $A_k$" and $\bigcup_nC_n$ = "in all but finitely many $A_k$", and $\lim A_k$ exists exactly when these agree. For monotone sequences they always agree, which is why the topic defines limits for monotone sequences.` },
]);
