import React, { useEffect, useMemo, useState } from 'react';
import { Asset } from 'expo-asset';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pdf, { PdfRef } from 'react-native-pdf';

type PdfReaderProps = {
  pdfSource?: number;
  pdfUrl?: string;
  title?: string;
};

export default function PdfReader({ pdfSource, pdfUrl, title = 'Reading View' }: PdfReaderProps) {
  const pdfAsset = useMemo(
    () => Asset.fromModule(pdfSource ?? require('../assets/PDF/SunniPorichoy.pdf')),
    [pdfSource],
  );
  const [sourceUri, setSourceUri] = useState(pdfAsset.localUri ?? pdfAsset.uri);
  const [zoomLevel, setZoomLevel] = useState(1);
  const pdfRef = React.useRef<PdfRef>(null);

  useEffect(() => {
    setSourceUri(pdfAsset.localUri ?? pdfAsset.uri);
    setCurrentPage(1);
    setTotalPages(1);
    pdfAsset.downloadAsync()
      .then((asset) => setSourceUri(asset.localUri ?? asset.uri))
      .catch(() => undefined);
  }, [pdfAsset]);

  const pdfViewerSource = useMemo(() => ({ uri: sourceUri, cache: true }), [sourceUri]);
  const [readerExpanded, setReaderExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadFailed, setLoadFailed] = useState(false);

  const pdfHeight = useMemo(() => (readerExpanded ? 720 : 520), [readerExpanded]);

  const zoomIn = () => setZoomLevel((value) => Math.min(value + 0.2, 2.5));
  const zoomOut = () => setZoomLevel((value) => Math.max(value - 0.2, 0.8));
  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(totalPages, page));
    pdfRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
  };

  return (
    <View style={[styles.pdfCard, readerExpanded && styles.pdfCardExpanded]}>
      <View style={styles.readerBar}>
        <Text style={styles.pdfTitle}>{title}</Text>
        <View style={styles.readerActions}>
          <TouchableOpacity style={styles.smallButton} onPress={() => setReaderExpanded((prev) => !prev)}>
            <Text style={styles.smallButtonText}>{readerExpanded ? 'Short View' : 'Full Screen'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.zoomToolbar}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut} activeOpacity={0.8}>
          <Text style={styles.zoomText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.zoomValue}>{zoomLevel.toFixed(1)}x</Text>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn} activeOpacity={0.8}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
      </View>

      <Pdf
        key={sourceUri}
        ref={pdfRef}
        source={pdfViewerSource}
        trustAllCerts={false}
        style={[styles.pdfViewer, { height: pdfHeight }]}
        scale={zoomLevel}
        minScale={0.8}
        maxScale={2.5}
        spacing={8}
        singlePage={false}
        enableAntialiasing={true}
        renderActivityIndicator={() => <Text style={styles.loadingText}>Loading PDF...</Text>}
        onLoadComplete={(numberOfPages: number) => setTotalPages(numberOfPages)}
        onPageChanged={(page: number) => setCurrentPage(page)}
        onError={() => {
          setLoadFailed(true);
          Alert.alert('PDF could not load', 'Use the Google Drive fallback below.');
        }}
      />
      <View style={styles.pageToolbar}>
        <TouchableOpacity style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]} onPress={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Page {currentPage} / {totalPages}</Text>
        <TouchableOpacity style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]} onPress={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {loadFailed && pdfUrl && (
        <TouchableOpacity style={styles.fallbackButton} onPress={() => Linking.openURL(pdfUrl)}>
          <Text style={styles.fallbackButtonText}>Open from Google Drive</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pdfCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  pdfCardExpanded: {
    borderRadius: 0,
  },
  readerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  pdfTitle: {
    color: '#0f562a',
    fontSize: 16,
    fontWeight: '800',
  },
  readerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#0f562a',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  pageToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#eef6f0',
    borderBottomWidth: 1,
    borderBottomColor: '#dfeae1',
  },
  pageButton: {
    backgroundColor: '#0f562a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pageButtonDisabled: {
    opacity: 0.45,
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  pageText: {
    color: '#1d4d2a',
    fontWeight: '700',
    fontSize: 12,
  },
  zoomToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f8f4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebefeb',
  },
  zoomButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#0f562a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 22,
  },
  zoomValue: {
    color: '#1d4d2a',
    fontWeight: '700',
    fontSize: 12,
  },
  pdfViewer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    color: '#0f562a',
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 16,
  },
  fallbackButton: {
    margin: 12,
    backgroundColor: '#0f562a',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fallbackButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
