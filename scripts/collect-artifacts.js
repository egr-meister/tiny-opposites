#!/usr/bin/env node
/**
 * collect-artifacts.js
 * Copies the freshly built release APK and AAB into an artifacts/ folder with
 * stable, predictable names for the CI upload step.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "artifacts");
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  {
    from: path.join(root, "android", "app", "build", "outputs", "apk", "release", "app-release.apk"),
    to: path.join(outDir, "tiny-opposites-release.apk"),
  },
  {
    from: path.join(root, "android", "app", "build", "outputs", "bundle", "release", "app-release.aab"),
    to: path.join(outDir, "tiny-opposites-release.aab"),
  },
];

let copied = 0;
targets.forEach((t) => {
  if (fs.existsSync(t.from)) {
    fs.copyFileSync(t.from, t.to);
    console.log("[collect-artifacts] Copied " + t.from + " -> " + t.to);
    copied += 1;
  } else {
    console.warn("[collect-artifacts] Missing build output: " + t.from);
  }
});

console.log("[collect-artifacts] Done. " + copied + " artifact(s) collected.");
