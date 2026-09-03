import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PdfReader from '../components/PdfReader';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

export default function PdfReaderPage() {
  const router = useRouter();
  const { book } = useLocalSearchParams<{ book?: string }>();
  const isMurider = book === 'murider';
  const details = isMurider
    ? { source: require('../assets/PDF/MuriderKoroniyo.pdf'), title: 'Murider Koroniyo', pdfUrl: 'https://drive.google.com/file/d/1I7QfAcugY7D5hHxt8XBMrnjXSr5rf-n2/view?usp=sharing' }
    : { source: require('../assets/PDF/SunniPorichoy.pdf'), title: 'Sunni Porichoy', pdfUrl: 'https://drive.google.com/file/d/1UVBwm0wrVcpNbmRe8vTEjAFYQIGV0jQj/view?usp=sharing' };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
          <View style={styles.titleCard}><Text style={styles.title}>{details.title}</Text></View>
          <PdfReader pdfSource={details.source} title={details.title} pdfUrl={details.pdfUrl} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  content: { padding: 16, paddingBottom: 30 },
  backButton: { marginTop: 0, alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18 },
  backText: { color: '#fff', fontWeight: '700' },
  titleCard: { marginTop: 14, backgroundColor: '#0f562a', borderRadius: 14, padding: 14, alignItems: 'center' },
  title: { color: '#f9bf3a', fontSize: 20, fontWeight: '800' },
});
