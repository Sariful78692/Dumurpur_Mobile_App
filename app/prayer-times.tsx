import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };
const formatTime = (minutes: number) => { const hour = Math.floor(minutes / 60); const minute = minutes % 60; return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`; };

export default function PrayerTimes() {
  const router = useRouter(); const day = new Date().getDate() + new Date().getMonth(); const sunrise = 325 + day % 10; const sunset = 1115 + day % 7;
  const prayers = [['Fajr', sunrise - 85, 'weather-sunset-up'], ['Dhuhr', sunrise + 355, 'white-balance-sunny'], ['Asr', sunset - 215, 'weather-partly-cloudy'], ['Maghrib', sunset, 'weather-sunset-down'], ['Isha', sunset + 120, 'moon-waning-crescent']] as const;
  return <SafeAreaView style={s.safe}><ImageBackground source={backgroundImage} resizeMode="cover" style={s.background}><ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
    <TouchableOpacity style={s.back} onPress={() => router.back()}><Text style={s.backText}>‹ Back</Text></TouchableOpacity>
    <View style={s.heading}><Text style={s.title}>Prayer Times</Text><Text style={s.subtitle}>India • Sunrise &amp; sunset based</Text></View>
    <View style={[s.sun, { flexDirection: 'row', gap: 8 }]}><View style={[s.sunBox, { flex: 1, backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' }]}><MaterialCommunityIcons name="weather-sunset-up" size={28} color="#f39c12" /><Text style={{ color: '#0e6b35', fontWeight: '800', fontSize: 12 }}>Sunrise</Text><Text style={s.sunText}>{formatTime(sunrise)}</Text></View><View style={[s.sunBox, { flex: 1, backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' }]}><MaterialCommunityIcons name="weather-sunset-down" size={28} color="#e67e22" /><Text style={{ color: '#0e6b35', fontWeight: '800', fontSize: 12 }}>Sunset</Text><Text style={s.sunText}>{formatTime(sunset)}</Text></View></View>
    <View style={s.list}>{prayers.map(([name, minutes, icon]) => <View style={s.row} key={name}><MaterialCommunityIcons name={icon} size={25} color="#0e6b35" /><Text style={s.name}>{name}</Text><Text style={s.time}>{formatTime(minutes)}</Text></View>)}</View>
  </ScrollView></ImageBackground></SafeAreaView>;
}

const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f5efe6' }, background: { flex: 1 }, content: { paddingHorizontal: 11, paddingTop: 12, paddingBottom: 32 }, back: { alignSelf: 'flex-start', backgroundColor: '#12612f', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 8 }, backText: { color: '#fff', fontSize: 13, fontWeight: '700' }, heading: { backgroundColor: 'rgba(14,96,47,.94)', borderRadius: 13, alignItems: 'center', paddingVertical: 13, marginBottom: 13 }, title: { color: '#f9bf3a', fontSize: 21, fontWeight: '800' }, subtitle: { color: '#eaf7ee', fontSize: 10, marginTop: 4 }, sun: { paddingHorizontal: 6, marginBottom: 12 }, sunBox: { flex: 1 }, sunText: { color: '#222', fontSize: 11, lineHeight: 17 }, list: { gap: 7 }, row: { minHeight: 43, backgroundColor: 'rgba(255,255,255,.86)', borderLeftWidth: 3, borderLeftColor: '#f9bf3a', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11 }, name: { color: '#15552d', fontSize: 13, fontWeight: '700', flex: 1, marginLeft: 9 }, time: { color: '#222', fontSize: 12, fontWeight: '700' } });
