import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';
import BottomNav from '../components/BottomNav';
import FontSizeControl from '../components/FontSizeControl';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };
type ShikshaItem = { id: string; title?: string; description?: string; imageUrl?: string; order?: number };

export default function namaz_shiksha() {
  const router = useRouter(); 
  const [items, setItems] = useState<ShikshaItem[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [fontSize, setFontSize] = useState(15);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => { 
    let isMounted = true;
    (async () => { 
      try { 
        // ক্যাশ ফ্রেশ করার জন্য নাম পরিবর্তন করে _v2 দেওয়া হয়েছে
        const cached = await AsyncStorage.getItem('@namaz_shikshaList_v2'); 
        if (cached && isMounted) { 
            setItems(JSON.parse(cached)); 
            setLoading(false); 
        } 
        
        console.log("ফায়ারবেস থেকে ডাটা খোঁজা হচ্ছে...");
        
        // কালেকশনের নাম 'namaz_shiksha' (s ছোটহাতের, S বড়হাতের)
        const snap = await getDocs(collection(db, 'namaz_shiksha')); 
        console.log("মোট ডাটা পাওয়া গেছে:", snap.docs.length, "টি");

        const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ShikshaItem[]; 
        list.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
        
        if (isMounted) {
          setItems(list); 
          await AsyncStorage.setItem('@namaz_shikshaList_v2', JSON.stringify(list)); 
          setLoading(false);
        }
      } catch (e) { 
        console.error('ফায়ারবেস এরর:', e); 
        if (isMounted) setLoading(false);
      } 
    })(); 
    return () => { isMounted = false; };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← ফিরে যান</Text>
          </TouchableOpacity>
          <FontSizeControl size={fontSize} onChange={setFontSize} />
        </View>

        <View style={styles.header}>
          <Text style={styles.heading}>নামায শিক্ষা</Text>
          <Text style={styles.subtitle}>নামাযের প্রয়োজনীয় নিয়ম ও দোয়া</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#0f562a" size="large" style={{marginTop: 40}} />
        ) : items.length === 0 ? (
          <Text style={styles.empty}>কোনো তথ্য পাওয়া যায়নি।</Text>
        ) : (
          items.map(item => (
            <View key={item.id} style={styles.noticeWrapper}>
              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.noticeTitleBar}
                onPress={() => toggleExpand(item.id)}
              >
                <View style={styles.titleLeft}>
                  {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.roundImage} />
                  ) : null}
                  <Text style={[styles.noticeTitle, { fontSize: fontSize + 2 }]}>
                    {item.title || 'বিষয়'}
                  </Text>
                </View>
                <Text style={styles.plusIcon}>
                  {expandedId === item.id ? '-' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedId === item.id && item.description ? (
                <View style={styles.detailsBox}>
                  <Text style={[styles.noticeDescription, { fontSize, lineHeight: fontSize * 1.6 }]}>
                    {item.description}
                  </Text>
                </View>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({ 
  background: { flex: 1 }, 
  container: { padding: 16, paddingBottom: 110 }, 
  topRow: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, 
  back: { backgroundColor: '#0f562a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#f9bf3a' }, 
  backText: { color: '#fff', fontWeight: '700', fontSize: 13 }, 
  header: { backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a', marginBottom: 16 }, 
  heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800' }, 
  subtitle: { color: '#eaf7ee', fontSize: 13, marginTop: 5 }, 
  
  noticeWrapper: { marginBottom: 14, borderRadius: 16, overflow: 'hidden' },
  noticeTitleBar: { 
    minHeight: 66, backgroundColor: '#0f562a', borderRadius: 16, 
    paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', 
    borderWidth: 1, borderColor: '#f9bf3a' 
  },
  titleLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  roundImage: { width: 45, height: 45, borderRadius: 23, marginRight: 12, borderWidth: 2, borderColor: '#f9bf3a' },
  noticeTitle: { flex: 1, color: '#ffffff', fontWeight: '800' },
  plusIcon: { color: '#f9bf3a', fontSize: 28, fontWeight: '700', marginLeft: 10, width: 28, textAlign: 'center' },
  
  detailsBox: { 
    backgroundColor: 'rgba(255,255,255,0.96)', padding: 15, 
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16, 
    borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 3, 
    borderColor: '#0f562a', marginTop: -5 
  },
  noticeDescription: { color: '#333333', textAlign: 'justify' },
  empty: { color: '#0f562a', textAlign: 'center', marginTop: 30, fontSize: 16, fontWeight: 'bold' } 
});