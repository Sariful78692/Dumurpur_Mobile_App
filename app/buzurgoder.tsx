import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';
import FontSizeControl from '../components/FontSizeControl';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage à¦¯à§à¦•à§à¦¤ à¦•à¦°à¦¾ à¦¹à¦²à§‹

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };
const safeAuthor = (value: any) => { const fixed = fixText(value); return typeof fixed === 'string' && /[àâÃÂ]/.test(fixed) ? 'চিশতিয়া বুজুর্গগণ' : fixed; };
const fixText = (value: any) => { if (typeof value !== "string") return value; try { return decodeURIComponent(escape(value)); } catch { return value.replace(/â€œ|â€|â€™|â€“|â€”/g, ""); } };

const LOCAL_QUOTES = [
  { id: 'local-q1', order: 1, authorName: 'খাজা মইনুদ্দীন চিশতী (রহ.)', title: 'ভালোবাসা', bani: 'যে মানুষকে ভালোবাসে, আল্লাহর রহমত তার অন্তরে নেমে আসে।' },
  { id: 'local-q2', order: 2, authorName: 'হযরত নিজামুদ্দীন আউলিয়া (রহ.)', title: 'মানুষের খেদমত', bani: 'মানুষের সেবা করো; মানুষের দোয়াই আল্লাহর দরবারে পৌঁছানোর সেরা পথ।' },
  { id: 'local-q3', order: 3, authorName: 'চিশতিয়া বুজুর্গদের বাণী', title: 'আত্মশুদ্ধি', bani: 'জিকিরে অন্তরকে জীবিত রাখো, বিনয়ে নিজেকে সুন্দর করো।' },
];

export default function Buzurgoder() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [quotesList, setQuotesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(15);

  // à¦«à¦¾à¦¯à¦¼à¦¾à¦°à¦¬à§‡à¦¸ à¦¥à§‡à¦•à§‡ à¦à¦¬à¦‚ à¦…à¦«à¦²à¦¾à¦‡à¦¨ à¦®à§‡à¦®à§‹à¦°à¦¿ à¦¥à§‡à¦•à§‡ à¦¬à¦¾à¦£à§€ à¦«à§‡à¦š à¦•à¦°à¦¾
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // à§§. à¦ªà§à¦°à¦¥à¦®à§‡ à¦²à§‹à¦•à¦¾à¦² à¦®à§‡à¦®à§‹à¦°à¦¿ à¦¥à§‡à¦•à§‡ à¦šà§‡à¦• à¦•à¦°à¦¬à§‡ (à¦…à¦«à¦²à¦¾à¦‡à¦¨ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ)
        const cachedQuotes = await AsyncStorage.getItem('@quotesList');
        if (cachedQuotes) {
          setQuotesList(JSON.parse(cachedQuotes));
          setLoading(false);
        }

        // à§¨. à¦‡à¦¨à§à¦Ÿà¦¾à¦°à¦¨à§‡à¦Ÿ à¦¥à¦¾à¦•à¦²à§‡ à¦«à¦¾à§Ÿà¦¾à¦°à¦¬à§‡à¦¸ à¦¥à§‡à¦•à§‡ à¦¨à¦¤à§à¦¨ à¦¡à§‡à¦Ÿà¦¾ à¦†à¦¨à¦¬à§‡
        const querySnapshot = await getDocs(collection(db, "quotes"));
        const list = querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          let cleanAuthor = data.authorName ? data.authorName.trim() : "à¦…à¦¨à§à¦¯à¦¾à¦¨à§à¦¯ à¦¬à§à¦œà§à¦°à§à¦—à¦—à¦£";
          if (cleanAuthor.endsWith(':')) {
            cleanAuthor = cleanAuthor.slice(0, -1).trim();
          }
          return { id: doc.id, ...data, title: fixText(data.title), bani: fixText(data.bani), cleanAuthor: fixText(cleanAuthor) };
        });
        
        if (!list.length) { setQuotesList(LOCAL_QUOTES as any); await AsyncStorage.setItem('@quotesList', JSON.stringify(LOCAL_QUOTES)); setLoading(false); return; }
        list.sort((a: any, b: any) => (Number(a.order) || 999) - (Number(b.order) || 999));

        // à§©. à¦¨à¦¤à§à¦¨ à¦¡à§‡à¦Ÿà¦¾ à¦¸à§à¦Ÿà§‡à¦Ÿà§‡ à¦¸à§‡à¦­ à¦•à¦°à¦¬à§‡ à¦à¦¬à¦‚ à¦²à§‹à¦•à¦¾à¦² à¦®à§‡à¦®à§‹à¦°à¦¿à¦¤à§‡ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à§‡ à¦°à¦¾à¦–à¦¬à§‡
        setQuotesList(list);
        await AsyncStorage.setItem('@quotesList', JSON.stringify(list));
        setLoading(false);

      } catch (error) {
        console.log("Error or Offline:", error);
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const groupedQuotes = quotesList.reduce((acc: any, item: any) => {
    const author = safeAuthor(item.cleanAuthor);
    if (!acc[author]) acc[author] = [];
    acc[author].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedQuotes).map(author => ({
    title: author,
    quotes: groupedQuotes[author]
  }));

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <FontSizeControl size={fontSize} onChange={setFontSize} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← ফিরে যান</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.heading}>বুজুর্গদের বাণী</Text>
          <Text style={styles.subtitle}>আলোকিত জীবনের জন্য মূল্যবান উপদেশ</Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={{ color: '#0f562a', marginTop: 10 }}>লোড হচ্ছে...</Text>
          </View>
        ) : sections.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#0f562a', marginTop: 20 }}>কোনো বাণী পাওয়া যায়নি।</Text>
        ) : (
          sections.map((section, sectionIndex) => {
            const authorImage = section.quotes.find((q: any) => q.imageUrl)?.imageUrl;

            return (
              <View key={section.title} style={styles.section}>
                <TouchableOpacity
                  style={styles.sectionTouch}
                  activeOpacity={0.7}
                  hitSlop={8} 
                  onPress={() => setExpandedSection(current => current === sectionIndex ? null : sectionIndex)}
                >
                  <View style={styles.sectionTitleRow}>
                    {authorImage ? (
                      <View style={styles.imageBox}>
                        <Image source={{ uri: authorImage }} style={styles.contactImage} resizeMode="cover" />
                      </View>
                    ) : null}
                    <Text style={[styles.sectionTitle, !authorImage && { marginLeft: 4 }]}>{section.title}</Text>
                    <Text style={styles.chevron}>{expandedSection === sectionIndex ? '−' : '+'}</Text>
                  </View>
                </TouchableOpacity>

                {expandedSection === sectionIndex && section.quotes.map((item: any) => (
                  <View key={item.id} style={styles.quoteCard}>
                    <Text style={[styles.label, { fontSize }]}>{fixText(item.title) || "উপদেশ"}</Text>
                    <Text style={[styles.quote, { fontSize, lineHeight: fontSize * 1.6 }]}>“{fixText(item.bani)}”</Text>
                  </View>
                ))}
              </View>
            );
          })
        )}

      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 16, paddingBottom: 100 },
  backButton: { marginTop: 0, alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18, marginBottom: 10 },
  backText: { color: '#fff', fontWeight: '700' },
  header: { marginBottom: 18, backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' },
  heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#eaf7ee', marginTop: 5, fontSize: 13, textAlign: 'center' },
  section: { marginBottom: 14 },
  sectionTouch: { width: '100%' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f562a', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#f9bf3a' },
  imageBox: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#f9bf3a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  contactImage: { width: '100%', height: '100%' },
  sectionTitle: { color: '#fff', flex: 1, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  chevron: { color: '#f9bf3a', fontSize: 24, fontWeight: '700', marginLeft: 8 },
  quoteCard: { backgroundColor: 'rgba(255,255,255,0.96)', marginTop: 8, borderRadius: 14, padding: 14, borderLeftWidth: 5, borderLeftColor: '#f9bf3a', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 3 },
  label: { color: '#0f562a', fontSize: 14, fontWeight: '800', marginBottom: 5 },
  quote: { color: '#303030', fontSize: 15, lineHeight: 24, textAlign: 'justify' },
});








