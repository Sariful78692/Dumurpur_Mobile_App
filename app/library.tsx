import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import PdfReader from '../components/PdfReader';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

const Book = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.headerCard}>
              <Text style={styles.title}>Dumurpur Chistiya Dorbar Sharif</Text>
            </View>

            <View style={styles.bookCard}>
              <Image
                source={require('../assets/images/BookLogo.png')}
                style={styles.bookLogo}
                resizeMode="contain"
              />
              <Text style={styles.bookTitle}>Sunni Porichoy</Text>
              <Text style={styles.description}>
                Read the spiritual and educational resource with guidance, values, and Islamic knowledge.
              </Text>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={() => router.push('/pdf-reader?book=sunni' as never)}
              >
                <Text style={styles.buttonText}>Read PDF</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bookCard}>
              <Image
                source={require('../assets/images/BookLogo.png')}
                style={styles.bookLogo}
                resizeMode="contain"
              />
              <Text style={styles.bookTitle}>Murider Koroniyo</Text>
              <Text style={styles.description}>
                Read the spiritual and educational resource with guidance, values, and Islamic knowledge.
              </Text>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={() => router.push('/pdf-reader?book=murider' as never)}
              >
                <Text style={styles.buttonText}>Read PDF</Text>
              </TouchableOpacity>
            </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Creator Sariful Basir Chisti @ 2026</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomNav activeTab="book" />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4efe7',
  },
  backgroundImage: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 92,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: 'rgba(15, 86, 42, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f9bf3a',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  brandBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f9bf3a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0f562a',
  },
  brandBadgeText: {
    color: '#0f562a',
    fontWeight: '800',
    fontSize: 20,
  },
  headerCard: {
    backgroundColor: 'rgba(15, 86, 42, 0.9)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: {
    color: '#f9bf3a',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  bookCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    padding: 22,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  bookLogo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1d5a2b',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#3d3d3d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 22,
  },
  button: {
    backgroundColor: '#0f562a',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 26,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
 toggleButton: {
  backgroundColor: '#0f562a',
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 8,
  alignItems: 'center', // ভেতরের টেক্সট সেন্টারে রাখার জন্য
},
  toggleButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  footerContainer: {
    marginTop: 26,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff9ef',
    fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
});


// import React, { useState, useEffect } from 'react';
// import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, Linking, SafeAreaView, Image } from 'react-native';
// import { useRouter } from 'expo-router';
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import BottomNav from '../components/BottomNav';

// const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

// export default function LibraryScreen() {
//   const router = useRouter();
//   const [pdfsList, setPdfsList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPdfs = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "pdfs"));
//         const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setPdfsList(list);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching PDFs:", error);
//         setLoading(false);
//       }
//     };
//     fetchPdfs();
//   }, []);

//   // ব্রাউজারে পিডিএফ ওপেন করার ফিক্সড ফাংশন
//   const openPDF = async (url: string) => {
//     try {
//       let fixedUrl = url;
//       if (url.includes('image/upload')) {
//         fixedUrl = url.replace('image/upload', 'raw/upload');
//       }
//       await Linking.openURL(fixedUrl);
//     } catch (err) {
//       Alert.alert("দুঃখিত", "পিডিএফ ফাইলটি ওপেন করা সম্ভব হচ্ছে না।");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
//         <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
//           <View style={styles.headerCard}>
//             <Text style={styles.title}>Dumurpur Chistiya Dorbar Sharif</Text>
//           </View>

//           {loading ? (
//             <View style={{ marginTop: 40, alignItems: 'center' }}>
//               <ActivityIndicator size="large" color="#f9bf3a" />
//               <Text style={{ color: '#fff', marginTop: 10 }}>বইগুলো লোড হচ্ছে...</Text>
//             </View>
//           ) : pdfsList.length === 0 ? (
//             <Text style={{ textAlign: 'center', color: '#fff', marginTop: 30, fontSize: 16 }}>কোনো বই বা পিডিএফ পাওয়া যায়নি।</Text>
//           ) : (
//             pdfsList.map((item: any) => (
//               <View key={item.id} style={styles.bookCard}>
//                 <Image
//                   source={require('../assets/images/BookLogo.png')}
//                   style={styles.bookLogo}
//                   resizeMode="contain"
//                 />
//                 <Text style={styles.bookTitle}>{item.title}</Text>
//                 <Text style={styles.description}>
//                   Read the spiritual and educational resource with guidance, values, and Islamic knowledge.
//                 </Text>

//                 <TouchableOpacity
//                   style={styles.button}
//                   activeOpacity={0.9}
//                   onPress={() => openPDF(item.url)}
//                 >
//                   <Text style={styles.buttonText}>Read PDF</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           )}

//           <View style={styles.footerContainer}>
//             <Text style={styles.footerText}>Creator Sariful Basir Chisti @ 2026</Text>
//           </View>

//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
//             <Text style={styles.backButtonText}>← Back</Text>
//           </TouchableOpacity>

//         </ScrollView>
//         <BottomNav activeTab="book" />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f4efe7' },
//   backgroundImage: { flex: 1 },
//   scrollContent: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 92 },
//   backButton: {
//     alignSelf: 'center',
//     marginTop: 18,
//     marginBottom: 10,
//     backgroundColor: 'rgba(15, 86, 42, 0.95)',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#f9bf3a',
//   },
//   backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
//   headerCard: {
//     backgroundColor: 'rgba(15, 86, 42, 0.9)',
//     borderRadius: 18,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     elevation: 4,
//   },
//   title: { color: '#f9bf3a', fontSize: 22, fontWeight: '700', textAlign: 'center' },
//   bookCard: {
//     backgroundColor: 'rgba(255,255,255,0.92)',
//     borderRadius: 22,
//     padding: 22,
//     marginTop: 24,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   bookLogo: { width: 120, height: 120, marginBottom: 12 },
//   bookTitle: { fontSize: 22, fontWeight: '800', color: '#1d5a2b', marginBottom: 10, textAlign: 'center' },
//   description: { fontSize: 15, color: '#3d3d3d', textAlign: 'center', lineHeight: 22, marginBottom: 22 },
//   button: { backgroundColor: '#0f562a', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 26, width: '100%', alignItems: 'center' },
//   buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
//   footerContainer: { marginTop: 26, alignItems: 'center' },
//   footerText: { color: '#fff9ef', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
// });