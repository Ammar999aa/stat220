# STAT 220 Study App

A browser study app for STAT 220 (KAUST, Fall 2026) Midterm 1, which covers Chapters 1–4 and Homeworks 1–6. It has:

- 29 topic pages with practice problems woven into the explanations;
- 320 numbered drills;
- all homework problems with solutions;
- the real 2025 midterm and 4 mock exams, each with an 80-minute timed mode;
- a 2-page A4 cheat sheet;
- progress tracking, XP and a leaderboard shared with friends.

No build step: plain HTML, CSS and JS.

## Run it locally

```bash
cd app
python3 tools/serve.py        # then open http://localhost:8220
```

`tools/serve.py` is a tiny static server with caching disabled. You can also use `python3 -m http.server 8220`, but Chrome may keep stale files after updates.

Progress is saved in your browser (`localStorage`). Several people can share one computer: use **Settings → Switch** to change player.

## Shared leaderboard (Firebase, about 5 minutes, free)

Without this step the app works fully, but the leaderboard only shows players on the same device.

1. Go to <https://console.firebase.google.com> → **Add project** (Google Analytics is not needed).
2. **Build → Firestore Database → Create database** (production mode, any region).
3. **Firestore → Rules**: paste the contents of `firestore.rules` and click **Publish**.
4. **Project settings (gear) → General → Your apps → Web (</>)**: register an app (no hosting needed), then copy the `firebaseConfig` object.
5. Paste it into `firebase-config.js`:
   ```js
   window.FIREBASE_CONFIG = { apiKey: "...", authDomain: "...", projectId: "...", storageBucket: "...", messagingSenderId: "...", appId: "..." };
   ```
   The web API key is not a secret: access is controlled by the rules.
6. Reload. Each friend opens the same site and picks a nickname. Progress syncs automatically, and picking your nickname on another device restores your progress.

There is no login; it's an honour system among friends, as requested. Anyone with the link could edit any player's entry.

## Put it online (GitHub Pages)

1. Create a GitHub repository and push this folder. The `app/` folder alone is enough.
2. Repository → **Settings → Pages** → deploy from branch, choosing the folder that contains `index.html`.
3. Share the `https://<you>.github.io/<repo>/` link with your friends.

After changing files, bump the `?v=N` numbers in `index.html` so browsers fetch the new versions.

## Content

| Folder | What's in it |
|---|---|
| `content/topics/*.js` | One file per topic: the explanation, inline practice (`P`), and that topic's drills (`DRILLS`). |
| `content/homework/*.js` | HW1–HW6. `ref:` reuses an identical topic problem, so progress is shared. |
| `content/exams/*.js` | The 2025 midterm and mocks 1–4. |
| `content/cheatsheet.js`, `content/studyplan.js`, `content/technique.js` | The cheat sheet, the study plan, and the exam-technique page. |

Problem IDs are stable, so editing a problem keeps everyone's progress.

To check content after editing (needs the `katex` and `mathjs` npm packages on `NODE_PATH`):

```bash
NODE_PATH=/path/to/node_modules node tools/validate.cjs --counts
```

It checks for duplicate IDs, missing fields, answers that don't parse or don't match themselves, and math that fails to render.

### Answer checking

- Numeric answers accept fractions and expressions (`3/8`, `e^3`, `sqrt(2)/pi`), and decimals with at least 3 significant figures.
- Expression answers (e.g. a density in `x`) are compared at random points, so `2(1-x)` and `2-2x` are both accepted.
- Proofs are self-graded: Got it / Partly / Missed.

### XP

| Level | XP |
|---|---|
| Warm-up | 5 |
| Practice | 10 |
| Challenge | 20 |
| Exam-style | 30 |

- **Partly** earns half the XP; **Missed** earns 1.
- **Improving** a result later awards the difference.
- **Daily bonus:** +10 XP on each day you study.
- **Timed exam:** your score is added as XP, once per exam.
