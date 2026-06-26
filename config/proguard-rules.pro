# Tiny Opposites - ProGuard / R8 rules
# Used only in the later, minified release stage. Keep React Native, Hermes,
# and Expo runtime classes so the release build launches correctly.

# --- React Native core ---
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**

# --- Expo modules ---
-keep class expo.modules.** { *; }
-keep class versioned.host.exp.exponent.** { *; }
-dontwarn expo.modules.**

# --- Keep annotated native methods / JS-exposed members ---
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# --- AsyncStorage ---
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-dontwarn com.reactnativecommunity.asyncstorage.**

# --- General safety ---
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
-dontwarn okio.**
-dontwarn javax.annotation.**
