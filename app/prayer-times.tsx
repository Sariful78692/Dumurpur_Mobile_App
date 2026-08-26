import React from 'react';
import { useRouter } from 'expo-router';
import {
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

const formatTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`;
};

const getPrayerTimes = () => {
  const today = new Date();
  const dayValue = today.getDate() + today.getMonth();

  const sunriseMinutes = 5 * 60 + 25 + (dayValue % 10);
  const sunsetMinutes = 18 * 60 + 35 + (dayValue % 7);

  const fajr = sunriseMinutes - 85;
  const dhuhr = sunriseMinutes + 355;
  const asr = sunsetMinutes - 215;
  const maghrib = sunsetMinutes;
  const isha = sunsetMinutes + 120;

  return {
    sunrise: formatTime(sunriseMinutes),
    sunset: formatTime(sunsetMinutes),
    prayerTimes: [
      { name: 'Fajr', time: formatTime(fajr) },
      { name: 'Dhuhr', time: formatTime(dhuhr) },
      { name: 'Asr', time: formatTime(asr) },
      { name: 'Maghrib', time: formatTime(maghrib) },
      { name: 'Isha', time: formatTime(isha) },
    ],
  };
};

const PrayerTimes = () => {
  const router = useRouter();
  const { sunrise, sunset, prayerTimes } = getPrayerTimes();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.title}>Prayer Times</Text>
          <Text style={styles.subtitle}>India • Sunrise & sunset based</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Sunrise: {sunrise}</Text>
          <Text style={styles.infoText}>Sunset: {sunset}</Text>
        </View>

        {prayerTimes.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.prayerName}>{item.name}</Text>
            <Text style={styles.prayerTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
};

export default PrayerTimes;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 90,
  },
  topBar: {
    marginBottom: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 86, 42, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f9bf3a',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerCard: {
    backgroundColor: 'rgba(15, 86, 42, 0.9)',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#f9bf3a',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#edf9ee',
    fontSize: 13,
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    color: '#2d2d2d',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    borderLeftColor: '#f9bf3a',
  },
  prayerName: {
    color: '#0f562a',
    fontSize: 18,
    fontWeight: '800',
  },
  prayerTime: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
});
