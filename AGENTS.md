# AGENTS.md

## Commands

```bash
npm.cmd run dev       # dev server
npm.cmd run build     # production build → dist/
npm.cmd run build:android # Android WebView build + Capacitor sync
npm.cmd run android   # open Android Studio project
npm.cmd run preview   # preview production build
```

For the standalone React Native app under `native/`, use `native/AGENTS.md` instead. The root Vite/Capacitor Android commands do not package `native/android`.

No linter, no typecheck, no test suite in this project.

## Architecture

React SPA built with Vite, deployed to GitHub Pages via Actions (`deploy.yml`). Static-only, no backend.

Android packaging is handled via Capacitor. The repo already contains a working `android/` project and `capacitor.config.json`.

### Routing (`src/App.jsx`)

Every test needs a route. Current routes:

| Path | Page | testId |
|------|------|--------|
| `/` | HomePage | — |
| `/pdp` | TestPage | `pdp` |
| `/bfti` | TestPage | `bfti` |
| `/mbti` | TestPage | `mbti` |
| `/wuxing` | TestPage | `wuxing` |
| `/daily-fortune` | DailyFortunePage | — |
| `*` | Redirect to `/` | — |

### Test data system

Tests are data-driven. Registry: `src/data/tests.js`. Each test is a separate file in `src/data/`.

**Two test modes** handled by `TestPage`:

| Mode | Test property | Has `questions[]`? | `calculateScores()` receives |
|------|-------------|-------------------|---------------------------|
| Standard quiz | `hasForm` absent or `false` | Yes | `answers[]` |
| Form-based | `hasForm: true` | Optional / may be missing | form values object |

## Adding a new test — mandatory 4 steps

1. Create `src/data/{test-id}.js` — export test object with standard shape (see `martinaecc-dev` skill for full spec)
2. Add entry to `src/data/tests.js` array
3. **Add route to `src/App.jsx`** — the most commonly forgotten step; missing route = white page
4. Verify interaction rules: auto-advance on option click, `scale(0.98)` press feedback, `fadeIn` transition, last question requires manual submit

## Critical gotchas

- **`lunar-javascript` API lies** — the library's documented method names are wrong. Use these instead:
  - `Solar.fromYmdHms(y, m, d, h, min, s)` (6 args required, not 4)
  - `baZi.getTime()` (hour pillar) — NOT `getHour()`
  - `lunar.getYearShengXiao()` (zodiac) — NOT `getZodiac()`
  - `lunar.getYun(gender).getDaYun()` (fortune periods) — NOT `baZi.getDaYun()`
  
  Full reference in the `martinaecc-dev` skill.

- **`test?.questions || []` fallback is mandatory** — form-mode tests (like wuxing) have no questions array. Direct access to `test.questions.length` crashes.

- **Mobile: hide hero illustration at ≤768px** — otherwise it fills the entire viewport and users can't scroll to the test cards.

- **APK builds must use `npm.cmd run build:android`** — plain `npm.cmd run build` keeps Vite `base: "/"`, which is fine for GitHub Pages but wrong for Capacitor WebView asset loading. Android packaging needs `vite build --base ./`.

- **Android requires JDK 21** — if Gradle complains about Java version or `source release 21`, check `java -version` and `android/gradle.properties`.

- **Do not replace Capacitor's `BridgeWebViewClient`** — if Android link/navigation behavior needs customization, prefer `bridge.addWebViewListener(...)` or native activity-level handling. Replacing it with a plain `WebViewClient` breaks Capacitor's navigation chain.

- **Native-platform external links must not force `_blank`** — use the `nativeLinkProps` pattern in `src/pages/AppPrototypePage.jsx` so browser builds keep `_blank`, but Capacitor builds navigate in the same WebView.

- **In-app external link behavior is implemented natively** — `capacitor.config.json` uses a domain allowlist in `server.allowNavigation` (do not use `*`, it can break Alipay / payment app handoff), and `android/app/src/main/java/com/martinaecc/tests/MainActivity.java` owns back gesture handling plus the native floating back button overlay.

## Repo notes

- `dist/`, `node_modules/`, `.opencode/`, `docs/` are also gitignored.
- `preview.log` in root is not gitignored (Vite preview output).
- CI deploys on push to `main` using Node 22.
- `404.html` is auto-copied from `index.html` at build time for SPA routing on GitHub Pages.
- Project skill at `.opencode/skills/martinaecc-dev/SKILL.md` has the full new-test checklist and crash patterns.
- Debug APK output path: `android/app/build/outputs/apk/debug/app-debug.apk`
- React Native APK packaging notes live in `native/AGENTS.md`; release APK output path is `native/android/app/build/outputs/apk/release/app-release.apk`.
