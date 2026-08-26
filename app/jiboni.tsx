import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

export default function JiboniScreen() {
  const router = useRouter();
  const [jiboniList, setJiboniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchJiboni = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jiboni"));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        list.sort((a: any, b: any) => (Number(a.order) || 999) - (Number(b.order) || 999));
        setJiboniList(list);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching jiboni:", error);
        setLoading(false);
      }
    };
    fetchJiboni();
  }, []);

  const handleNext = () => {
    if (currentIndex < jiboniList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem: any = jiboniList[currentIndex];

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* ব্যাক বাটন */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* শুধু 'বুজুর্গদের জীবনী' হেডার */}
        <View style={styles.header}>
          <Text style={styles.heading}>বুজুর্গদের জীবনী</Text>
        </View>

        {/* লোডিং অথবা বুক পেজ ভিউ */}
        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={{ color: '#fff', marginTop: 10 }}>লোড হচ্ছে...</Text>
          </View>
        ) : jiboniList.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#fff', marginTop: 20 }}>কোনো জীবনী পাওয়া যায়নি।</Text>
        ) : (
          <View style={styles.bookPage}>
            {currentItem.imageUrl && (
              <View style={styles.imageBox}>
                <Image source={{ uri: currentItem.imageUrl }} style={styles.jiboniImage} resizeMode="cover" />
              </View>
            )}

            <Text style={styles.bookTitle}>{currentItem.title || currentItem.name}</Text>
            <Text style={styles.bookContent}>{currentItem.description || currentItem.bio}</Text>

            {/* পেজ পরিবর্তন বাটন */}
            <View style={styles.paginationContainer}>
              <TouchableOpacity 
                style={[styles.pageBtn, currentIndex === 0 && styles.disabledBtn]} 
                onPress={handlePrev}
                disabled={currentIndex === 0}
              >
                <Text style={styles.pageBtnText}>◀ পেছনের পাতা</Text>
              </TouchableOpacity>

              <Text style={styles.pageIndicator}>
                পাতা {currentIndex + 1} / {jiboniList.length}
              </Text>

              <TouchableOpacity 
                style={[styles.pageBtn, currentIndex === jiboniList.length - 1 && styles.disabledBtn]} 
                onPress={handleNext}
                disabled={currentIndex === jiboniList.length - 1}
              >
                <Text style={styles.pageBtnText}>পরের পাতা ▶</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 16, paddingBottom: 100 },
  backButton: { alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginBottom: 14, borderWidth: 1, borderColor: '#f9bf3a' },
  backText: { color: '#fff', fontWeight: '700' },
  
  // হেডার স্টাইল
  header: { 
    marginBottom: 18, 
    backgroundColor: '#0f562a', 
    borderRadius: 18, 
    padding: 14, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#f9bf3a' 
  },
  heading: { 
    color: '#f9bf3a', 
    fontSize: 24, 
    fontWeight: '800', 
    textAlign: 'center' 
  },

  // বইয়ের পাতার ডিজাইন
  bookPage: { 
    backgroundColor: '#fffdf9', 
    borderRadius: 16, 
    padding: 20, 
    borderWidth: 1.5, 
    borderColor: '#d4af37', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    elevation: 5,
    minHeight: 350,
    justifyContent: 'space-between'
  },
  imageBox: { width: '100%', height: 200, borderRadius: 12, overflow: 'hidden', marginBottom: 16, backgroundColor: '#eee' },
  jiboniImage: { width: '100%', height: '100%' },
  bookTitle: { color: '#0f562a', fontSize: 20, fontWeight: '900', marginBottom: 10, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 },
  bookContent: { color: '#2c2c2c', fontSize: 15, lineHeight: 26, textAlign: 'justify', marginBottom: 20 },

  // পেজ উল্টানোর নেভিগেশন বার
  paginationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 14, marginTop: 10 },
  pageBtn: { backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  disabledBtn: { backgroundColor: '#ccc' },
  pageBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  pageIndicator: { color: '#555', fontWeight: '700', fontSize: 13 }
});