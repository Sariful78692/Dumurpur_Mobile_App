import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};


const Donation = () => {
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCard}>
          <Image source={require('../assets/images/Dumurpur_logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Donation for the Dorbar</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Support the Cause</Text>
          <Text style={styles.text}>
            Your donation helps with community welfare, education, charity, prayer services, and daily spiritual support.
          </Text>
        </View>

        <View style={styles.phonePeCard}>
          <Text style={styles.paymentTitle}>Donate via</Text>
          <View style={styles.phonePeLogoRow}>
            <View style={styles.phonePeMark}>
              <MaterialCommunityIcons name="currency-inr" size={31} color="#fff" />
            </View>
            <Text style={styles.phonePeWordmark}>PhonePe</Text>
          </View>
          <Image source={require('../assets/images/QR.png')} style={styles.qrCode} resizeMode="contain" />
          <Text style={styles.numberLabel}>PhonePe Number</Text>
                    <Text selectable style={styles.phonePeNumber}>6296429997</Text>
          <Text style={styles.accountName}>SEKH BASIR HOSSAIN SARKAR</Text>

          <Text style={styles.paymentHint}>Use this number in your PhonePe app to make a donation.</Text>
        </View>
      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
};

export default Donation;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { padding: 16, paddingBottom: 90 },
  topBar: { marginBottom: 12 },
  backButton: { marginTop: 0, 
    alignSelf: 'flex-start', backgroundColor: 'rgba(15, 86, 42, 0.95)', paddingHorizontal: 12,
    paddingVertical: 7, borderRadius: 18, borderWidth: 1, borderColor: '#f9bf3a',
  },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  headerCard: {
    backgroundColor: 'rgba(15, 86, 42, 0.9)', borderRadius: 18, padding: 18, alignItems: 'center', marginBottom: 16,
  },
  logo: { width: 110, height: 110, marginBottom: 12 },
  title: { color: '#f9bf3a', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  card: { backgroundColor: 'rgba(255,255,255,0.93)', borderRadius: 16, padding: 18, marginBottom: 16 },
  heading: { color: '#0f562a', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  text: { color: '#2d2d2d', fontSize: 15, lineHeight: 24 },
  phonePeCard: {
    backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 18, padding: 22, alignItems: 'center', borderWidth: 2, borderColor: '#5f259f',
  },
  paymentTitle: { color: '#4b1d7a', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  phonePeLogoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  phonePeMark: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#5f259f', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  phonePeWordmark: { color: '#5f259f', fontSize: 29, fontWeight: '900' },
  numberLabel: { color: '#5f259f', fontSize: 13, fontWeight: '700' },
  phonePeNumber: { color: '#2e0f4f', fontSize: 28, fontWeight: '900', letterSpacing: 1.5, marginTop: 5 },
  accountName: { color: '#0f562a', fontSize: 14, fontWeight: '800', textAlign: 'center', marginTop: 6 },
  qrCode: { width: 190, height: 190, marginTop: 14 },
  paymentHint: { color: '#5b5263', fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 12 },
});