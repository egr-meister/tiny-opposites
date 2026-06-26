// Gentle sound feedback helper.
// This app intentionally avoids heavy audio libraries and never requests
// microphone permission. Sound is a soft, optional extra; visual feedback
// always works regardless of whether sound plays.
//
// To keep dependencies minimal and child-safe, no audio package is bundled.
// This function honors the parent "Sound" setting and is a safe no-op when
// no sound engine is present. It never throws and never blocks the game.

export function playCorrectSoundIfEnabled(settings) {
  try {
    const enabled = settings?.soundEnabled ?? true;
    if (!enabled) {
      return;
    }
    // No audio engine is bundled in this build, so there is nothing to play.
    // Visual answer feedback and animation still run for the child.
    // This is intentionally a safe, silent no-op.
    return;
  } catch (e) {
    // Never let optional feedback break the learning flow.
    return;
  }
}
