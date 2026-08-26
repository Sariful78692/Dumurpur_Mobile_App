import React from 'react';
import { Platform } from 'react-native';

const NativePdfReader = Platform.OS === 'web'
  ? require('./PdfReader.web').default
  : require('./PdfReader.native').default;

export default function PdfReader(props: { pdfUrl?: string; pdfSource?: number; title?: string }) {
  return <NativePdfReader {...props} />;
}
