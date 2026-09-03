import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';
import BottomNav from '../components/BottomNav';
import FontSizeControl from '../components/FontSizeControl';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };
type Gazal = { id: string; authorName?: string; title?: string; description?: string; imageUrl?: string; order?: number };

export default function GazalBook() {
  const router = useRouter(); 
  const [items, setItems] = useState<Gazal[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [fontSize, setFontSize] = useState(15);

  useEffect(() => { 
    let isMounted = true;
    (async () => { 
      try { 
        const cached = await AsyncStorage.getItem('@gazalsList'); 
        if (cached && isMounted) { setItems(JSON.parse(cached)); setLoading(false); } 
        
        const snap = await getDocs(collection(db, 'gazals')); // Admin Panel এর gazals কালেকশন
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Gazal[]; 
        list.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
        
        if (isMounted) {
          setItems(list); 
          await AsyncStorage.setItem('@gazalsList', JSON.stringify(list)); 
          setLoading(false);
        }
      } catch (e) { 
        console.warn('Gazals offline', e); 
        if (isMounted) setLoading(false);
      } 
    })(); 
    return () => { isMounted = false; };
  }, []);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <FontSizeControl size={fontSize} onChange={setFontSize} />
        </View>

        <View style={styles.header}>
          <Text style={styles.heading}>গজল সমূহ</Text>
          <Text style={styles.subtitle}>ইসলামিক গজল ও নাত</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#0f562a" size="large" style={{marginTop: 40}} />
        ) : items.length === 0 ? (
          <Text style={styles.empty}>কোনো গজল পাওয়া যায়নি।</Text>
        ) : (
          items.map(item => (
            <View key={item.id} style={styles.card}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
              ) : null}
              
              {/* Author Name */}
              {item.authorName ? (
                <Text style={styles.author}>✍️ {item.authorName}</Text>
              ) : null}
              
              {/* Title */}
              <Text style={[styles.cardTitle, { fontSize: fontSize + 4 }]}>{item.title || 'গজল'}</Text>
              
              {/* Lyrics */}
              {item.description ? (
                <Text style={[styles.description, { fontSize, lineHeight: fontSize * 1.7 }]}>{item.description}</Text>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
      <BottomNav activeTab="book" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({ 
  background: { flex: 1 }, 
  container: { padding: 16, paddingBottom: 100 }, 
  topRow: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, 
  back: { backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18, borderWidth: 1, borderColor: '#f9bf3a' }, 
  backText: { color: '#fff', fontWeight: '700', fontSize: 13 }, 
  header: { backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a', marginBottom: 16 }, 
  heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800' }, 
  subtitle: { color: '#eaf7ee', fontSize: 13, marginTop: 5 }, 
  card: { backgroundColor: '#fffdf9', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1.5, borderColor: '#d4af37', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, elevation: 4 }, 
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12, backgroundColor: '#eee' },
  author: { color: '#e91e63', fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  cardTitle: { color: '#0f562a', fontWeight: '900', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 }, 
  description: { color: '#2c2c2c', textAlign: 'left' }, 
  empty: { color: '#0f562a', textAlign: 'center', marginTop: 30, fontSize: 16, fontWeight: 'bold' } 
});