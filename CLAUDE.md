# CLAUDE.md

Project-specific working notes for future agent sessions.

## Android APK packaging

This project is already wired for Capacitor Android packaging.

Key files:

- `package.json`
- `capacitor.config.json`
- `android/app/src/main/java/com/martinaecc/tests/MainActivity.java`

Required local environment:

- JDK 21
- Android SDK
- Accepted Android SDK licenses

Daily packaging flow:

```bash
npm.cmd run build:android
cd android
.\gradlew.bat clean assembleDebug
```

Why this works:

- `build:android` runs `vite build --base ./ && cap sync android`
- `--base ./` is required for Capacitor WebView asset loading
- APK output path is `android/app/build/outputs/apk/debug/app-debug.apk`

Useful commands:

```bash
npm.cmd run android
```

This opens the Android project in Android Studio.

## In-app external links

Goal:

- external links stay inside the app
- back gesture does not immediately close the app
- a native back affordance is available on external pages

Current solution has 4 parts.

### 1. Allow WebView navigation to external hosts

`capacitor.config.json` contains a business-host allowlist:

```json
{
  "server": {
    "allowNavigation": [
      "m.udataai.com",
      "qixun.udataai.com",
      "m.gzzdcredit.com",
      "a8-im.7x24cc.com",
      "m.shuzhigui.com"
    ]
  }
}
```

Do not widen this to `"*"` again. A wildcard keeps ordinary H5 pages in-app, but it can also prevent external payment flows from reaching the system `Intent` layer.

### 2. Do not use `_blank` for native-platform external links

`src/pages/AppPrototypePage.jsx` uses:

```jsx
const nativeLinkProps = Capacitor.isNativePlatform()
  ? { rel: "noreferrer" }
  : { target: "_blank", rel: "noreferrer" }
```

Reason:

- browser build should keep normal web behavior
- Capacitor build should navigate in the same WebView so history remains usable

If future external links are added, reuse `nativeLinkProps` instead of hardcoding `target="_blank"`.

### 3. Back handling lives in `MainActivity.java`

`MainActivity.java` uses AndroidX `OnBackPressedDispatcher`, not only legacy `onBackPressed()`.

Current behavior:

- if `webView.canGoBack()` -> go back in WebView history
- else if current URL is external -> load `bridge.getAppUrl()` and return to the app home
- else -> allow normal app exit

This is important because `targetSdkVersion` is modern and gesture back may bypass legacy-only implementations.

### 4. Floating back button is native, not DOM-injected

The stable solution is a native overlay in `MainActivity.java`.

Do not reintroduce a strategy that injects a back button into third-party page DOM.

Reason:

- third-party pages can block, restyle, or remove injected elements
- native overlay is independent of page scripts and layout

Current native overlay behavior:

- button text: `<- 返回`
- shown only when page is external or WebView can go back
- click uses the same native back logic as the system gesture

## Capacitor gotchas for this repo

- Do not replace Capacitor's `BridgeWebViewClient` with a plain `WebViewClient`
- If you need page load hooks, prefer `bridge.addWebViewListener(...)`
- If Android build suddenly fails on Java version, check `android/gradle.properties`
- If assets load in browser but not in APK, verify `npm.cmd run build:android` was used instead of plain `npm.cmd run build`

## Quick diagnosis checklist

If APK packaging breaks:

1. Verify `java -version` is 21
2. Verify Android SDK path is configured
3. Run `npm.cmd run build:android`
4. Run `cd android && .\gradlew.bat clean assembleDebug`

If external links jump out of app again:

1. Check `capacitor.config.json` still has the business-host `allowNavigation` whitelist and was not widened to `*`
2. Check new external links are not forcing `_blank` on native
3. Check `MainActivity.java` still contains the AndroidX back callback
4. Check native floating back button overlay is still installed in `onCreate`
