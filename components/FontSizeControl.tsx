import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = { size: number; onChange: (size: number) => void };

export default function FontSizeControl({ size, onChange }: Props) {
  return (
    <View style={styles.wrap} accessibilityLabel="Font size controls">
      <Text style={styles.label}>লেখার আকার</Text>
      <TouchableOpacity style={styles.button} onPress={() => onChange(Math.max(12, size - 2))} accessibilityLabel="Decrease font size">
        <Text style={styles.buttonText}>A−</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onChange(Math.min(30, size + 2))} accessibilityLabel="Increase font size">
        <Text style={styles.buttonText}>A+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', right: 16, top: 0, zIndex: 30, flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: { color: '#0f562a', fontSize: 11, fontWeight: '700' },
  button: { minWidth: 32, height: 30, borderRadius: 8, backgroundColor: '#0f562a', borderWidth: 1, borderColor: '#f9bf3a', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#f9bf3a', fontSize: 16, fontWeight: '800' },
});
