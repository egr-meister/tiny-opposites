#!/usr/bin/env bash
# decode-keystore.sh
# Decodes the base64 release keystore from a GitHub Secret into a file and
# prints the absolute path on stdout via the ANDROID_KEYSTORE_PATH file write.
# Keeps the workflow YAML free of multiline inline scripts.
set -euo pipefail

if [ -z "${ANDROID_KEYSTORE_BASE64:-}" ]; then
  echo "ANDROID_KEYSTORE_BASE64 is not set. Skipping keystore decode."
  exit 0
fi

KEYSTORE_DIR="${GITHUB_WORKSPACE:-$(pwd)}/android-keystore"
mkdir -p "$KEYSTORE_DIR"
KEYSTORE_PATH="$KEYSTORE_DIR/tiny-opposites-release-key.p12"

echo "$ANDROID_KEYSTORE_BASE64" | base64 --decode > "$KEYSTORE_PATH"
echo "Keystore decoded to: $KEYSTORE_PATH"

# Export for subsequent workflow steps.
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "ANDROID_KEYSTORE_PATH=$KEYSTORE_PATH" >> "$GITHUB_ENV"
fi
