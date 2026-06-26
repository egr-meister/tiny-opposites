#!/usr/bin/env node
/**
 * configure-android-release.js
 *
 * Runs AFTER `expo prebuild` generates the native android/ project.
 * It injects a release signing config that reads from environment variables
 * (provided by GitHub Secrets in CI) and points the release build type at it.
 *
 * Staged optimization: this script keeps the release build NON-minified
 * (Expo's default), matching the "verify non-minified release first" rule.
 * A proguard-rules.pro file is also copied into place for the later,
 * minified stage.
 *
 * This is a plain Node script (no shell heredocs) so the CI YAML stays simple.
 */
const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const gradlePath = path.join(projectRoot, "android", "app", "build.gradle");
const proguardSrc = path.join(projectRoot, "config", "proguard-rules.pro");
const proguardDest = path.join(projectRoot, "android", "app", "proguard-rules.pro");

function fail(message) {
  console.error("[configure-android-release] " + message);
  process.exit(1);
}

if (!fs.existsSync(gradlePath)) {
  fail("android/app/build.gradle not found. Run `expo prebuild` first.");
}

let gradle = fs.readFileSync(gradlePath, "utf8");

// 1) Inject a release signingConfig if it is not already present.
if (gradle.indexOf("signingConfigs.release") === -1) {
  const releaseSigningBlock = [
    "        release {",
    '            if (System.getenv("ANDROID_KEYSTORE_PATH") != null) {',
    '                storeFile file(System.getenv("ANDROID_KEYSTORE_PATH"))',
    '                storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")',
    '                keyAlias System.getenv("ANDROID_KEY_ALIAS")',
    '                keyPassword System.getenv("ANDROID_KEY_PASSWORD")',
    "            }",
    "        }",
    "",
  ].join("\n");

  // Insert the release block right after the opening of `signingConfigs {`.
  const signingConfigsMatch = gradle.match(/signingConfigs\s*\{/);
  if (!signingConfigsMatch) {
    fail("Could not find signingConfigs block in build.gradle.");
  }
  const insertAt = signingConfigsMatch.index + signingConfigsMatch[0].length;
  gradle =
    gradle.slice(0, insertAt) +
    "\n" +
    releaseSigningBlock +
    gradle.slice(insertAt);

  // Point the release buildType at the new release signing config.
  gradle = gradle.replace(
    /(release\s*\{[\s\S]*?signingConfig\s+signingConfigs\.)debug/,
    "$1release"
  );

  fs.writeFileSync(gradlePath, gradle, "utf8");
  console.log("[configure-android-release] Release signing config injected.");
} else {
  console.log("[configure-android-release] Release signing config already present.");
}

// 2) Ensure a proguard-rules.pro exists in the native project.
try {
  if (fs.existsSync(proguardSrc)) {
    fs.copyFileSync(proguardSrc, proguardDest);
    console.log("[configure-android-release] proguard-rules.pro copied into android/app.");
  }
} catch (e) {
  console.warn("[configure-android-release] Could not copy proguard-rules.pro: " + e.message);
}

console.log("[configure-android-release] Done.");
