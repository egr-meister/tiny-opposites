# Tiny Opposites

A calm, offline opposites learning app for children ages **3–6**, built with React Native and Expo. Children learn opposite concepts (big/small, hot/cold, day/night, and more) through friendly cards and two gentle mini-games.

There are no ads, no purchases, no accounts, no timers, no leaderboards, and no data collection. Everything runs offline and is stored only on the device.

## Features

- Learn opposite cards grouped into five topics: Size, Weather, Emotions, Objects, Time.
- Two calm mini-games: **Find the Opposite** and **Choose the Correct Pair**.
- Three difficulty levels: Easy (2 choices), Medium (3 choices), Hard (4 choices).
- Soft, short answer animation — no flashing, no pressure.
- Local progress tracking by topic, with simple badges and stars.
- Parent settings: sound, default difficulty, answer animation, and clear-data controls.
- Portrait-only, fullscreen sticky immersive experience with safe-area handling.

## Age range

Designed for children **3–6 years** old. All text is in English and kept short, clear, and friendly.

## Child safety

Tiny Opposites is a calm offline opposites learning app for children ages 3–6. It does not use ads, purchases, accounts, social sharing, or personal data collection. It never requests camera, microphone, location, contacts, or photo-gallery access.

There are no coins, bonuses, jackpots, or real money rewards, and no gambling-style mechanics of any kind. Badges and stars are simple local learning markers with **no money value**.

## Opposites learning rules

- Easy keeps simple, common opposites inside one topic with large, clear cards.
- Medium mixes examples inside one category with simple distractors.
- Hard mixes examples across categories while staying child-friendly.
- Question generation never produces duplicate answer choices and never builds an ambiguous opposite pair.

## No timer / no pressure

There are no timers, countdowns, or penalties. A wrong answer simply shows the correct word with gentle encouragement such as "Good try." Children can try again at their own pace.

## Screen behavior

- **Portrait only** — orientation is locked to portrait.
- **Fullscreen sticky immersive** — the status bar and navigation bar are hidden via `react-native-edge-to-edge` `SystemBars`. System bars may appear briefly after an edge swipe.
- **Safe area handling** — content uses safe-area insets so it never overlaps notches, camera cutouts, or rounded corners.
- **Keep awake only on the active game screen** — `expo-keep-awake` is activated when the game screen mounts and released when it unmounts. It is never active on settings, progress, card, or static screens.

## Privacy

Tiny Opposites does not collect, store, or share personal information. The app works offline. Topic progress, answer statistics, achievements, and settings are stored only on the device using `AsyncStorage`. No names, age, location, device identifiers, financial data, or behavioral tracking are stored.

## Achievements and progress

Achievements are local learning markers only:

1. First Opposite Badge — answer 1 question correctly.
2. Size Helper Badge — answer 5 Size questions correctly.
3. Weather Buddy Badge — answer 5 Weather questions correctly.
4. Emotion Learner Badge — answer 5 Emotions questions correctly.
5. Time Pair Badge — answer 5 Time questions correctly.
6. Opposite Star Badge — answer 25 questions correctly.

There are no rankings, leaderboards, or social sharing.

## App icon and splash screen

Custom branding is configured in `app.json`:

- `assets/icon.png` — two friendly opposite cards (sun/moon pair) on a soft light background.
- `assets/adaptive-icon.png` — Android adaptive foreground with safe padding.
- `assets/splash.png` — centered opposite cards with the app name on a pastel background (`#FFF8EC`).

The default Expo icon and splash are **not** used.

---

## Project setup (official Expo template)

This project targets the latest stable Expo SDK (SDK 53 / React Native 0.79).

To scaffold a matching project from scratch with the official template:

```bash
npx create-expo-app tiny-opposites --template blank
```

Then copy the `src/`, `assets/`, `App.js`, and `app.json` files from this repository into the new project.

## Install dependencies

Always install packages with `expo install` so versions match the SDK:

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo install --check
```

Direct dependencies used by the app:

- `expo`, `react`, `react-native`
- `@react-navigation/native`, `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`
- `@react-native-async-storage/async-storage`
- `react-native-edge-to-edge`
- `expo-keep-awake`
- `expo-asset`, `expo-constants`, `expo-font`, `expo-modules-core`

## Run locally

```bash
npx expo start
```

Or build and run a development build on a connected Android device/emulator:

```bash
npx expo run:android
```

## Build Android (local)

```bash
npx expo prebuild --platform android --no-install
node scripts/configure-android-release.js
cd android
./gradlew assembleRelease   # APK
./gradlew bundleRelease     # AAB
```

Outputs:

- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## Generate a PKCS12 keystore

Use the **same password** for the keystore and the key (different passwords can break PKCS12 signing):

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore tiny-opposites-release-key.p12 \
  -alias tiny_opposites_key \
  -keyalg RSA -keysize 2048 -validity 10000
```

Convert it to base64 for GitHub Secrets:

```bash
# macOS / Linux
base64 -i tiny-opposites-release-key.p12 -o keystore.base64.txt
```

## Add GitHub Secrets

In your repository: **Settings → Secrets and variables → Actions → New repository secret**. Add:

- `ANDROID_KEYSTORE_BASE64` — contents of `keystore.base64.txt`
- `ANDROID_KEYSTORE_PASSWORD` — the keystore password
- `ANDROID_KEY_ALIAS` — `tiny_opposites_key`
- `ANDROID_KEY_PASSWORD` — the key password (same as the keystore password)

Never commit the keystore or passwords to the repository.

## GitHub Actions build

`.github/workflows/android-build.yml` runs on push to `main` (and manual dispatch). It:

1. Installs Node.js and Java 17.
2. Installs the Android SDK, then `sdkmanager "platforms;android-35" "build-tools;35.0.0"`.
3. Runs `npm install`, `npx expo install --fix`, `npx expo-doctor`, `npx expo install --check`.
4. Runs `expo prebuild` to generate the native Android project.
5. Decodes the keystore (`scripts/decode-keystore.sh`) and injects release signing (`scripts/configure-android-release.js`).
6. Builds a signed release APK and AAB with Gradle.
7. Uploads `tiny-opposites-release.apk` and `tiny-opposites-release.aab` as artifacts.

The emulator smoke test is intentionally **not** part of CI (free runners can be slow/unstable for emulator startup). Launch verification is a local pre-release step (below).

## Google Play compatibility

- Targets **Android API 35** (`compileSdkVersion 35`, `targetSdkVersion 35`) via Expo SDK 53.
- `minSdkVersion` satisfies React Native 0.79 (24+).
- The release AAB supports Android 15+ **16 KB memory page sizes** (provided by RN 0.79 + a current Android Gradle Plugin).
- No Firebase, ads, analytics, payment, or external native SDKs are included.

This avoids the Play Console errors:

- "Your app currently targets API level 34 and must target at least API level 35"
- "Your app does not support 16 KB memory page sizes"

## Release optimization (staged)

1. First build and verify a **non-minified** release (`minifyEnabled false`, `shrinkResources false`) — this is the default produced by `configure-android-release.js`.
2. After confirming the non-minified release launches, enable standard R8/Proguard minification and resource shrinking in `android/app/build.gradle`:

   ```gradle
   release {
       minifyEnabled true
       shrinkResources true
       proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
   }
   ```

   A ready `proguard-rules.pro` is provided in `config/` and copied into `android/app/` by the configure script.
3. Re-test the app launch locally after enabling minification.

## Local launch verification checklist

A successful CI build is **not** proof the app launches. Before release:

1. Build the release APK.
2. Install it on a real device or emulator: `adb install -r app-release.apk`.
3. Launch the app.
4. Capture logs: `adb logcat | grep -i "tinyopposites\|ReactNative\|Expo"`.
5. Confirm there are **no** errors such as:
   - "Cannot find native module"
   - "Module has not been registered"
   - "Invariant Violation"
   - "theme.fonts.regular is undefined"

The app must actually open successfully in release mode.

## Commands summary

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo install --check
npx expo start
npx expo run:android
```
