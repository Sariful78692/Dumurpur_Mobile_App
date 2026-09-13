import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };
const formatTime = (time: string) => { const clean = time?.replace(/\s*\([^)]*\)/, ''); const match = clean?.match(/^(\d{1,2}):(\d{2})/); if (!match) return '--:--'; const hour = Number(match[1]); return (hour % 12 || 12) + ':' + match[2] + ' ' + (hour >= 12 ? 'PM' : 'AM'); };
const fallback = { Fajr: '04:00', Dhuhr: '12:00', Asr: '15:30', Maghrib: '18:00', Isha: '19:30', Sunrise: '05:30', Sunset: '18:00' };
const prayerConfig = [['Fajr', 'Fajr', 'weather-sunset-up'], ['Dhuhr', 'Dhuhr', 'white-balance-sunny'], ['Asr', 'Asr', 'weather-partly-cloudy'], ['Maghrib', 'Maghrib', 'weather-sunset-down'], ['Isha', 'Isha', 'moon-waning-crescent']] as const;

export default function PrayerTimes() {
  const router = useRouter();
  const [timings, setTimings] = React.useState(fallback);
  const [locationName, setLocationName] = React.useState('Dumurpur, India');
  const [status, setStatus] = React.useState('Current location based');
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  const nextPrayer = prayerConfig.find(([, key]) => { const match = timings[key]?.match(/^(\d{1,2}):(\d{2})/); return match && Number(match[1]) * 60 + Number(match[2]) > now.getHours() * 60 + now.getMinutes(); }) || prayerConfig[0];
  React.useEffect(() => {
    let active = true;
    (async () => { try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') { if (active) setStatus('Location permission denied - showing fallback'); return; }
      const { latitude, longitude } = (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })).coords;
      const d = new Date();
      const response = await fetch(`https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=1&school=1`);
      const json = await response.json();
      if (!response.ok || json.code !== 200) throw new Error('Prayer API failed');
      if (active) { setTimings(json.data.timings); setLocationName(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`); setStatus('Current location based'); }
    } catch { if (active) setStatus('Unable to load timings'); }
    })();
    return () => { active = false; };
  }, []);
  return <SafeAreaView style={s.safe}><ImageBackground source={backgroundImage} resizeMode="cover" style={s.background}><ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
    <TouchableOpacity style={s.back} onPress={() => router.back()}><Text style={s.backText}>Back</Text></TouchableOpacity>
    <View style={s.heading}><Text style={s.title}>Prayer Times</Text><Text style={s.subtitle}>{locationName} - {status}</Text></View><View style={s.dateCard}><Text style={s.dateTitle}>{now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</Text><Text style={s.hijri}>Next: {nextPrayer[0]} at {formatTime(timings[nextPrayer[1]])}</Text></View>
    <View style={[s.sun, { flexDirection: 'row', gap: 8 }]}><View style={[s.sunBox, { flex: 1, backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' }]}><MaterialCommunityIcons name="weather-sunset-up" size={28} color="#f39c12" /><Text style={s.sunLabel}>Sunrise</Text><Text style={s.sunText}>{formatTime(timings.Sunrise)}</Text></View><View style={[s.sunBox, { flex: 1, backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' }]}><MaterialCommunityIcons name="weather-sunset-down" size={28} color="#e67e22" /><Text style={s.sunLabel}>Sunset</Text><Text style={s.sunText}>{formatTime(timings.Sunset)}</Text></View></View>
    <View style={s.list}>{prayerConfig.map(([name, key, icon]) => <View style={s.row} key={name}><MaterialCommunityIcons name={icon} size={25} color="#0e6b35" /><Text style={s.name}>{name}</Text><Text style={s.time}>{formatTime(timings[key])}</Text></View>)}</View>
  </ScrollView></ImageBackground></SafeAreaView>;
}

const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f5efe6' }, background: { flex: 1 }, content: { paddingHorizontal: 11, paddingTop: 12, paddingBottom: 32 }, back: { alignSelf: 'flex-start', backgroundColor: '#12612f', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 8 }, backText: { color: '#fff', fontSize: 13, fontWeight: '700' }, heading: { backgroundColor: 'rgba(14,96,47,.94)', borderRadius: 13, alignItems: 'center', paddingVertical: 13, marginBottom: 13 }, title: { color: '#f9bf3a', fontSize: 21, fontWeight: '800' }, subtitle: { color: '#eaf7ee', fontSize: 10, marginTop: 4 }, sun: { paddingHorizontal: 6, marginBottom: 12 }, sunBox: { flex: 1 }, sunLabel: { color: '#0e6b35', fontWeight: '800', fontSize: 12 }, sunText: { color: '#222', fontSize: 11, lineHeight: 17 }, location: { color: '#0e6b35', textAlign: 'center', fontSize: 12, fontWeight: '700', marginTop: 16 }, list: { gap: 7 }, dateCard: { backgroundColor: 'rgba(255,255,255,.92)', borderRadius: 14, padding: 14, alignItems: 'center', marginBottom: 12 }, dateTitle: { color: '#222', fontSize: 16, fontWeight: '800' }, hijri: { color: '#7b32a8', fontSize: 13, marginTop: 5 }, row: { minHeight: 43, backgroundColor: 'rgba(255,255,255,.86)', borderLeftWidth: 3, borderLeftColor: '#f9bf3a', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11 }, name: { color: '#15552d', fontSize: 13, fontWeight: '700', flex: 1, marginLeft: 9 }, time: { color: '#222', fontSize: 12, fontWeight: '700' } });
