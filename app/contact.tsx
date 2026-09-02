import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage যুক্ত করা হলো
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

const openLink = async (url: string) => {
  try {
    if (url.startsWith('http')) {
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      });
    } else {
      await Linking.openURL(url);
    }
  } catch {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open', 'Your device could not open this link. Please try again.');
    }
  }
};

const Contact = () => {
  const router = useRouter();
  const [contactsList, setContactsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // ১. ক্যাশ থেকে লোড
        const cachedContacts = await AsyncStorage.getItem('@contactsList');
        if (cachedContacts) {
          setContactsList(JSON.parse(cachedContacts));
          setLoading(false);
        }

        // ২. ফায়ারবেস থেকে নতুন ডেটা আনা
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setContactsList(list);
        await AsyncStorage.setItem('@contactsList', JSON.stringify(list));
        setLoading(false);
      } catch (error) {
        console.log("Error or Offline:", error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.title}>Contact & Connect</Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={{ color: '#fff', marginTop: 10 }}>কন্টাক্ট লোড হচ্ছে...</Text>
          </View>
        ) : contactsList.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#fff', marginTop: 20, fontSize: 16 }}>কোনো কন্টাক্ট পাওয়া যায়নি।</Text>
        ) : (
          <View style={styles.listContainer}>
            {contactsList.map((item: any) => {
              const phoneNumber = item.phone || item.value;
              const contactName = item.name || item.label;
              const hasImage = item.imageUrl;

              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.contactCard} 
                  onPress={() => phoneNumber && openLink(`tel:${phoneNumber}`)} 
                  activeOpacity={0.8}
                >
                  {hasImage ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.icon} resizeMode="cover" />
                  ) : (
                    <View style={styles.locationIcon}>
                      <MaterialCommunityIcons name="phone" size={28} color="#fff" />
                    </View>
                  )}
                  
                  <View style={styles.textBox}>
                    <Text style={styles.label}>{contactName}</Text>
                    <Text style={styles.value}>নম্বর: {phoneNumber}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

      </ScrollView>
      <BottomNav activeTab="contact" />
    </ImageBackground>
  );
};

export default Contact;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { padding: 16, paddingBottom: 90 },
  topBar: { marginBottom: 14 },
  backButton: { alignSelf: 'flex-start', backgroundColor: 'rgba(15, 86, 42, 0.95)', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#f9bf3a' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  headerCard: { backgroundColor: 'rgba(15,86,42,0.90)', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#f9bf3a' },
  title: { color: '#f9bf3a', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  listContainer: { gap: 12 },
  contactCard: { backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d8d8d8', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  icon: { width: 48, height: 48, borderRadius: 24, marginRight: 12, borderWidth: 1.5, borderColor: '#0f562a' },
  locationIcon: { width: 48, height: 48, marginRight: 12, borderRadius: 24, backgroundColor: '#0f562a', alignItems: 'center', justifyContent: 'center' },
  textBox: { flex: 1 },
  label: { color: '#0f562a', fontSize: 16, fontWeight: '700' },
  value: { color: '#333', fontSize: 14, marginTop: 4, fontWeight: '600' },
});