---
name: martinaecc-app-resolution
description: Use when adding, routing, or modifying any user-visible page in martinaecc.github.io where mobile App-style resolution, fixed bottom tabs, or route-level page layout may be affected.
---

# Martinaecc App Resolution

## Overview

Every user-visible page in this project should render as a mobile App-style page, not a desktop-width web page. The fixed bottom tab bar is part of the product shell and content must scroll inside the phone-sized viewport.

## When To Use

Use before changing:

- `src/App.jsx` routes
- `src/pages/*.jsx`
- test pages, result pages, or daily fortune pages
- any page linked from 首页, 报告, 福利, 我的, or 优测小宇宙

Also use when the user says: App 分辨率, 仿 App, 保留 tab, 移动端壳, 底部导航, or 全站移动端化.

## Required Pattern

1. Inspect `src/App.jsx` and list every reachable route.
2. Wrap every route-level page with `AppShell` unless it is an external link.
3. Use an `.app-screen` scroll area. Do not return to wide `.container` as the page root.
4. Keep the fixed bottom tab visible on primary and secondary pages.
5. Give secondary pages an `activeTab` matching their parent entry. Tests and daily fortune belong to `home`.
6. Add bottom padding so long forms/results are not hidden behind the tab bar.
7. Keep `test?.questions || []` in `TestPage`; form tests such as `wuxing` may not have questions.
8. After route/page work, run `npm.cmd run build`.

## Route Ownership

| Route | Active tab | Notes |
|---|---|---|
| `/` | `home` | Main App homepage |
| `/reports` | `reports` | Report list |
| `/benefits` | `benefits` | Welfare/member benefits |
| `/me` | `me` | Account center |
| `/assessments` | `home` | 优测小宇宙 secondary page |
| `/pdp`, `/bfti`, `/mbti`, `/wuxing` | `home` | Test-taking secondary pages |
| `/daily-fortune` | `home` | Fortune secondary page |

## App Page Checklist

- Page root uses `AppShell`.
- Page content is inside an App-specific class such as `test-app-page` or `daily-fortune-app-page`.
- Back links point to `/assessments` for test/fortune flows.
- Buttons and selectable cards keep `scale(0.98)` press feedback.
- Mobile layout is readable at 375px width.
- No content is blocked by `.app-tabbar` or floating CTA.
- `refer/` screenshots are never committed unless explicitly requested.

## Common Mistakes

| Mistake | Impact | Fix |
|---|---|---|
| Leaving `<main className="container">` as route root | Page renders as desktop web inside the App site | Replace root with `AppShell` |
| Forgetting bottom padding | Last form buttons hide behind tab bar | Add App page bottom padding |
| Making `/assessments` App-style but not `/pdp` | Users jump between App and desktop layouts | Convert all linked secondary routes |
| Removing `questions` fallback | Wuxing crashes on load | Keep `const questions = test?.questions || []` |

## Verification

Run:

```powershell
npm.cmd run build
```

Manually inspect at least:

`/`, `/benefits`, `/assessments`, `/pdp`, `/wuxing`, `/daily-fortune`.
