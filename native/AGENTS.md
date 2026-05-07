# AGENTS.md

Runbook for the standalone React Native project in `native/`.

## Scope

`native/` is a separate React Native app. Do not use the root Vite/Capacitor Android commands for this project.

- Root project Android chain: Vite + Capacitor, lives in root `android/`
- Native project Android chain: React Native, lives in `native/android/`

If the task is to package `native/`, stay inside `native/` unless there is a clear reason not to.

## Commands

Run from `native/` unless noted.

```bash
npm install                 # install RN dependencies
npm start                   # start Metro for debug APKs
npm run ts:check            # TypeScript check
npm run build:android       # release APK via android/gradlew.bat assembleRelease
```

Run from `native/android/`:

```bash
.\gradlew.bat assembleDebug    # debug APK, expects Metro at runtime
.\gradlew.bat assembleRelease  # release APK, embeds JS bundle
```

## APK Outputs

```text
native/android/app/build/outputs/apk/debug/app-debug.apk
native/android/app/build/outputs/apk/release/app-release.apk
```

Use `app-release.apk` when handing an APK to a user for normal installation. It includes the JS bundle and does not require Metro.

## Debug vs Release

### Debug APK

Debug APKs normally do not embed `assets/index.android.bundle`. They load JavaScript from Metro at runtime.

If the app opens with:

```text
Unable to load script
Make sure you're running Metro or that your bundle is packaged correctly
```

the APK is usually not broken. It is a debug build that cannot reach Metro.

For USB device debugging:

```bash
npm start
adb reverse tcp:8081 tcp:8081
```

The second argument is `tcp:8081`, not `tco:8081`.

### Release APK

Release APKs run standalone. Build with:

```bash
cd native/android
.\gradlew.bat assembleRelease
```

Verify that the bundle is embedded:

```bash
cd native/android/app/build/outputs/apk/release
tar -tf app-release.apk
```

Expected entry:

```text
assets/index.android.bundle
```

If that entry is present, the APK should not need Metro and should not fail with `Unable to load script` for bundle-loading reasons.

## Known Build Fixes

### Missing `project.android.packageName`

Observed failure:

```text
Execution failed for task ':app:generateAutolinkingPackageList'.
> RNGP - Autolinking: Could not find project.android.packageName in react-native config output!
```

Root cause found in this repo: `@react-native-community/cli` was missing, so `npx react-native config` did not output valid React Native config JSON.

Fixed by adding:

```json
"devDependencies": {
  "@react-native-community/cli": "^20.0.2"
}
```

Confirm with:

```bash
npx react-native config
```

Expected JSON path:

```json
{
  "project": {
    "android": {
      "packageName": "com.martinaecc.app",
      "applicationId": "com.martinaecc.app"
    }
  }
}
```

### Package Name

The legal Android package name is:

```text
com.martinaecc.app
```

Do not reintroduce `com.martinaecc.native`. `native` is a Java/Kotlin keyword context hazard and was already replaced.

Relevant files:

```text
native/android/app/build.gradle
native/android/app/src/main/java/com/martinaecc/app/MainActivity.kt
native/android/app/src/main/java/com/martinaecc/app/MainApplication.kt
```

## Environment Notes

Current known-good local paths:

```properties
org.gradle.java.home=C:\\Program Files\\Microsoft\\jdk-21.0.11.10-hotspot
sdk.dir=D:\\Android\\android-sdk
ndk.dir=C:\\Users\\admin\\Desktop\\android-ndk-r27d-windows\\android-ndk-r27d
```

If Gradle complains about Java or Android toolchains, check:

```bash
java -version
```

and then inspect:

```text
native/android/gradle.properties
native/android/local.properties
```

## Practical Packaging Checklist

1. Work from `native/`, not the repo root.
2. Run `npm install` if dependencies changed.
3. Run `npm run ts:check`.
4. Run `cd android && .\gradlew.bat assembleRelease`.
5. Confirm `BUILD SUCCESSFUL`.
6. Confirm `native/android/app/build/outputs/apk/release/app-release.apk` exists.
7. Confirm `tar -tf app-release.apk` includes `assets/index.android.bundle`.
8. Give users the release APK, not the debug APK.

## Do Not Do

- Do not use root `npm.cmd run build:android` for this React Native app.
- Do not edit the root Capacitor `android/` project for `native/` packaging issues.
- Do not treat `Unable to load script` in a debug APK as a business-code bug before checking Metro/bundle packaging.
- Do not blindly downgrade Gradle before checking the actual first failing task.
