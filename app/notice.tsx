import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

export default function NoticeScreen() {
  const router = useRouter();
  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ফায়ারবেস থেকে লাইভ নোটিশ ফেচ করা
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notices"));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // চাইলে নতুন নোটিশগুলো আগে দেখানোর জন্য সর্ট করতে পারেন
        setNoticesList(list);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching notices:", error);
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* ব্যাক বাটন */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* হেডার */}
        <View style={styles.header}>
          <Text style={styles.heading}>জরুরি বিজ্ঞপ্তি</Text>
          <Text style={styles.subtitle}>দরবার শরীফের সাম্প্রতিক ঘোষণা ও খবর</Text>
        </View>

        {/* লোডিং অথবা ডেটা লিস্ট */}
        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={{ color: '#fff', marginTop: 10 }}>লোড হচ্ছে...</Text>
          </View>
        ) : noticesList.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#fff', marginTop: 20 }}>কোনো বিজ্ঞপ্তি পাওয়া যায়নি।</Text>
        ) : (
          noticesList.map((item: any) => (
            <View key={item.id} style={styles.noticeCard}>
              {item.imageUrl && (
                <View style={styles.imageBox}>
                  <Image source={{ uri: item.imageUrl }} style={styles.noticeImage} resizeMode="cover" />
                </View>
              )}
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeDesc}>{item.description}</Text>
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
  container: { padding: 16, paddingBottom: 100 },
  backButton: { alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginBottom: 10 },
  backText: { color: '#fff', fontWeight: '700' },
  header: { marginBottom: 18, backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' },
  heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#eaf7ee', marginTop: 5, fontSize: 13, textAlign: 'center' },
  noticeCard: { backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 16, padding: 16, marginBottom: 14, borderLeftWidth: 5, borderLeftColor: '#f9bf3a', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 3 },
  imageBox: { width: '100%', height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 12, backgroundColor: '#eee' },
  noticeImage: { width: '100%', height: '100%' },
  noticeTitle: { color: '#0f562a', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  noticeDesc: { color: '#333', fontSize: 14, lineHeight: 22 },
});