import React, { useEffect, useMemo, useState } from 'react';
import { Asset } from 'expo-asset';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PdfReaderWebProps = {
  pdfUrl?: string;
  pdfSource?: number;
  title?: string;
};

const Iframe = 'iframe' as unknown as React.ComponentType<{
  src: string;
  title: string;
  style: React.CSSProperties;
  onError: () => void;
}>;

export default function PdfReaderWeb({ pdfUrl, pdfSource, title = 'Reading View' }: PdfReaderWebProps) {
  const asset = useMemo(() => (pdfSource ? Asset.fromModule(pdfSource) : null), [pdfSource]);
  const [sourceUri, setSourceUri] = useState(asset?.localUri ?? asset?.uri);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setSourceUri(asset?.localUri ?? asset?.uri);
    setLoadFailed(false);

    if (!asset) return;

    asset.downloadAsync()
      .then((downloadedAsset) => setSourceUri(downloadedAsset.localUri ?? downloadedAsset.uri))
      .catch(() => setLoadFailed(true));
  }, [asset]);

  return (
    <View style={styles.pdfCard}>
      <View style={styles.header}>
        <Text style={styles.pdfTitle}>{title}</Text>
        <TouchableOpacity
          style={[styles.button, !sourceUri && styles.buttonDisabled]}
          onPress={() => {
            if (sourceUri) Linking.openURL(sourceUri);
          }}
          disabled={!sourceUri}
        >
          <Text style={styles.buttonText}>Open in new tab</Text>
        </TouchableOpacity>
      </View>
      {sourceUri ? (
        <>
          <TouchableOpacity activeOpacity={0.9} onPress={() => Linking.openURL(sourceUri)}>
            <Iframe src={sourceUri} title={title} onError={() => setLoadFailed(true)} style={{ width: '100%', height: 680, border: 'none', backgroundColor: '#f5f5f5' }} />
          </TouchableOpacity>
          <View style={styles.pageToolbar}>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(sourceUri)}><Text style={styles.buttonText}>Prev</Text></TouchableOpacity>
            <Text style={styles.pageText}>Touch PDF to open full page</Text>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(sourceUri)}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading PDF...</Text>
      )}
      {loadFailed && pdfUrl && (
        <TouchableOpacity style={styles.fallbackButton} onPress={() => Linking.openURL(pdfUrl)}>
          <Text style={styles.buttonText}>Open from Google Drive</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pdfCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  pdfTitle: {
    color: '#0f562a',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f562a',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  loadingText: {
    color: '#0f562a',
    fontWeight: '700',
    padding: 24,
    textAlign: 'center',
  },
  fallbackButton: {
    alignSelf: 'center',
    margin: 14,
    backgroundColor: '#0f562a',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pageToolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#eef6f0' },
  pageText: { color: '#1d4d2a', fontWeight: '700', fontSize: 12 },
});
