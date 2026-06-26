#!/usr/bin/env bash
# verify-release-signing.sh
# Fails the build if the release APK is signed with the Android DEBUG key.
# Google Play rejects debug-signed uploads, so this is a hard safety gate.
set -euo pipefail

APK="$(find android/app/build/outputs/apk/release -name '*.apk' | head -n1 || true)"
if [ -z "$APK" ]; then
  echo "verify-release-signing: no release APK found."
  exit 1
fi

# Locate apksigner from the installed build-tools (35.0.0).
SIGNER=""
for d in "${ANDROID_HOME:-}" "${ANDROID_SDK_ROOT:-}"; do
  if [ -n "$d" ] && [ -x "$d/build-tools/35.0.0/apksigner" ]; then
    SIGNER="$d/build-tools/35.0.0/apksigner"
    break
  fi
done
if [ -z "$SIGNER" ]; then
  SIGNER="$(find "${ANDROID_HOME:-/usr/local/lib/android/sdk}" -name apksigner -type f 2>/dev/null | sort | tail -n1 || true)"
fi
if [ -z "$SIGNER" ]; then
  echo "verify-release-signing: apksigner not found."
  exit 1
fi

echo "verify-release-signing: checking $APK"
CERTS="$("$SIGNER" verify --print-certs "$APK")"
echo "$CERTS"

if echo "$CERTS" | grep -qi "CN=Android Debug"; then
  echo "ERROR: release APK is signed with the DEBUG key. Google Play would reject it."
  exit 1
fi

echo "OK: release APK is signed with a release key (not the debug key)."
