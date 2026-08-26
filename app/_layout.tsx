import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" backgroundColor="#0f562a" translucent={false} />
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.screenContent }} />
      <View pointerEvents="none" style={styles.globalHeader} />
      <View pointerEvents="none" style={styles.pageFrame} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  screenContent: { paddingTop: 48 },
  globalHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 48,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f562a',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomWidth: 2,
    borderBottomColor: '#f9bf3a',
  },
  pageFrame: { ...StyleSheet.absoluteFillObject, borderWidth: 5, borderColor: '#0f562a' },
});
