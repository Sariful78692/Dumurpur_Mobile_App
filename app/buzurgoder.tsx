// import React, { useState } from 'react';
// import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useRouter } from 'expo-router';
// import BottomNav from '../components/BottomNav';

// const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

// const sections = [
//   { title: 'রসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর সুমহান বাণী', quotes: [
//     ['উত্তম চরিত্র', 'তোমাদের মধ্যে সেই ব্যক্তিই সবচেয়ে উত্তম, যার চরিত্র সবচেয়ে সুন্দর। (সহীহ বুখারী)'],
//     ['দয়া ও সহমর্মিতা', 'যে ব্যক্তি মানুষের প্রতি দয়া করে না, আল্লাহ তাআলাও তার প্রতি দয়া করেন না। (সহীহ মুসলিম)'],
//     ['প্রকৃত মুসলিম', 'প্রকৃত মুসলিম সে-ই, যার মুখ ও হাতের ক্ষতি থেকে অন্য মানুষ নিরাপদ থাকে। (সহীহ বুখারী)'],
//     ['জ্ঞান অর্জন', 'জ্ঞান অর্জন করা প্রতিটি মুসলিমের ওপর ফরজ। (ইবনে মাজাহ)'],
//     ['পবিত্রতা', 'পবিত্রতা ঈমানের অর্ধেক। (সহীহ মুসলিম)'],
//     ['অন্তর ও আমল', 'আল্লাহ তাআলা তোমাদের চেহারা বা ধন-সম্পদ দেখেন না, বরং তিনি দেখেন তোমাদের অন্তর ও কাজ। (সহীহ মুসলিম)'],
//     ['সহজ পথ প্রদর্শন', 'সহজ করো, কঠিন করো না; সুসংবাদ দাও, বিদ্বেষ সৃষ্টি করো না। (সহীহ বুখারী)'],
//   ] },
//   { title: 'হযরত আলী (রাঃ) এর শিক্ষণীয় বাণী', quotes: [
//     ['জ্ঞানের গুরুত্ব', 'জ্ঞানের মতো কোনো সম্পদ নেই এবং মূর্খতার মতো কোনো দারিদ্র্য নেই।'],
//     ['ধৈর্য ও সফলতা', 'বিপদ এলে ধৈর্য ধারণ করো, কারণ ধৈর্যই হলো সকল সফলতার চাবিকাঠি।'],
//     ['আত্মমর্যাদা', 'যে নিজের সম্মান ও মর্যাদা বোঝে না, অন্যরাও তাকে মর্যাদা দেয় না।'],
//   ] },
//   { title: 'বড়পীর হযরত আব্দুল কাদির জিলানী (রহঃ) এর উপদেশ', quotes: [
//     ['আত্মশুদ্ধি', 'তুমি যদি আল্লাহকে চিনতে চাও, তবে সবার আগে নিজের অন্তরকে পরিষ্কার করো।'],
//     ['দুনিয়া ও আখেরাত', 'দুনিয়া হলো আখেরাতের শস্যক্ষেত্র। এখানে তুমি যেমন বীজ বুনবে, পরকালে ঠিক তেমনই ফল কাটবে।'],
//     ['পরিপূর্ণ তাওয়াক্কুল', 'যে ব্যক্তি আল্লাহর ওপর পূর্ণ ভরসা রাখে, আল্লাহ তার জন্য যথেষ্ট হয়ে যান।'],
//   ] },
//   { title: 'খাজা মইনুদ্দীন চিশতী (রহঃ) এর আধ্যাত্মিক বাণী', quotes: [
//     ['শ্রেষ্ঠ মানবসেবা', 'যে ব্যক্তি ক্ষুধার্তকে খাবার দেয় এবং অসহায়কে সাহায্য করে, আল্লাহ তার ওপর সবচেয়ে বেশি সন্তুষ্ট হন।'],
//     ['প্রকৃত দরবেশ', 'প্রকৃত দরবেশ সে-ই, যার অন্তরে আল্লাহর প্রেম ও সৃষ্টির প্রতি ভালোবাসা ছাড়া আর কিছুই নেই।'],
//     ['উদারতা ও বিনয়', 'সূর্যের মতো উদার হও, নদীর মতো দানশীল হও এবং মাটির মতো বিনয়ী হও।'],
//   ] },
//   { title: 'ইমাম গাজ্জালী (রহঃ) এর বাণী', quotes: [
//     ['ইমাম গাজ্জালী (রহঃ)', 'রাগ হলো এমন একটি আগুন, যা অন্যের ক্ষতি করার আগে নিজের অন্তরকে পুড়িয়ে ছাই করে দেয়।'],
//   ] },
//     { title: 'মাওলানা রুমি (রহঃ) এর বাণী', quotes: [
//     ['মাওলানা রুমি (রহঃ)', 'যে হৃদয় দিয়ে তুমি আল্লাহর সন্ধান করবে, সেই পবিত্র হৃদয় একদিন তোমাকে আল্লাহর কাছে পৌঁছে দেবে।'],
//   ] },
//   { title: 'হযরত নিজামুদ্দীন আউলিয়া (রহ.)', quotes: [
//     ['প্রেম ও মানবসেবা', 'আল্লাহর সৃষ্টিকে ভালোবাসা এবং মানুষের হৃদয়ে আনন্দ জোগানোই হলো আল্লাহর সান্নিধ্য লাভের সবচেয়ে বড় উপায়।'],
//   ] },
//   { title: 'হযরত হাসান বসরী (রহ.)', quotes: [
//     ['সময়ের মূল্য', 'হে আদম সন্তান! তুমি তো কেবল কিছু দিনের সমষ্টি। একটি দিন চলে যাওয়া মানে তোমার জীবনের একাংশ ঝরে যাওয়া।'],
//     ['অন্তর বিশুদ্ধতা', 'তুমি যা গোপন করো, তা দিয়ে তোমার প্রকাশ্য রূপকে সংশোধন করো; আল্লাহ তোমার পরকাল সুন্দর করে দেবেন।'],
//   ] },
//   { title: 'ইমাম শাফেয়ী (রহ.)', quotes: [
//     ['সময়ের গুরুত্ব', 'সময় হলো ধারালো তরবারির মতো; তুমি যদি একে সঠিক কাজে ব্যবহার না করো, তবে এটি তোমাকেই কেটে ফেলবে।'],
//     ['প্রকৃত জ্ঞানী', 'জ্ঞান কেবল মুখস্থ করার নাম নয়, জ্ঞান হলো তা-ই যা মানুষের কাজে আসে।'],
//   ] },
//   { title: 'হযরত বায়েজীদ বোস্তামী (রহ.)', quotes: [
//     ['মা-বাবার সেবা', 'মা-বাবার দোয়াই হলো আল্লাহর দরবারে পৌঁছানোর সবচেয়ে সহজ ও বড় ওসিলা।'],
//   ] },
//   { title: 'ইমাম আবু হানিফা (রহ.)', quotes: [
//     ['বিনয় ও নম্রতা', 'সঠিক জ্ঞান মানুষকে অহংকারী করে না, বরং মানুষের অন্তরে বিনয় ও স্রষ্টার ভয় বাড়িয়ে দেয়।'],
//   ] },
// ];

// export default function Buzurgoder() {
//   const router = useRouter();
//   const [expandedSection, setExpandedSection] = useState<number | null>(null);
//   return <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
//     <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
//       <View style={styles.header}><Text style={styles.heading}>বুজুর্গদের বাণী</Text><Text style={styles.subtitle}>আলোকিত জীবনের জন্য মূল্যবান উপদেশ</Text></View>
//       {sections.map((section, sectionIndex) => <View key={section.title} style={styles.section}>
//         <TouchableOpacity activeOpacity={0.85} onPress={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}>
//           <View style={styles.sectionTitleRow}>
//             <Text style={styles.sectionTitle}>{section.title}</Text>
//             <Text style={styles.chevron}>{expandedSection === sectionIndex ? '−' : '+'}</Text>
//           </View>
//         </TouchableOpacity>
//         {expandedSection === sectionIndex && section.quotes.map(([label, quote]) => <View key={label} style={styles.quoteCard}>
//           <Text style={styles.label}>{label}</Text><Text style={styles.quote}>“{quote}”</Text>
//         </View>)}
//       </View>)}
//     </ScrollView>
//     <BottomNav activeTab="home" />
//   </ImageBackground>;
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 16, paddingBottom: 100 },
//   backButton: { alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
//   backText: { color: '#fff', fontWeight: '700' },
//   header: { marginTop: 14, marginBottom: 18, backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' },
//   heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800', textAlign: 'center' },
//   subtitle: { color: '#eaf7ee', marginTop: 5, fontSize: 13 },
//   section: { marginBottom: 18 },
//   sectionTitleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f562a', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
//   sectionTitle: { color: '#fff', flex: 1, fontSize: 17, fontWeight: '800', lineHeight: 24 },
//   chevron: { color: '#f9bf3a', fontSize: 27, fontWeight: '700', marginLeft: 8 },
//   quoteCard: { backgroundColor: 'rgba(255,255,255,0.96)', marginTop: 8, borderRadius: 14, padding: 14, borderLeftWidth: 5, borderLeftColor: '#f9bf3a' },
//   label: { color: '#0f562a', fontSize: 14, fontWeight: '800', marginBottom: 5 },
//   quote: { color: '#303030', fontSize: 15, lineHeight: 24 },
// });



import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';

const backgroundImage = { uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg' };

export default function Buzurgoder() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [quotesList, setQuotesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ফায়ারবেস থেকে লাইভ বাণী ফেচ করা এবং সিরিয়াল অনুযায়ী সাজানো
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quotes"));
        const list = querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          // লেখকের নামের শেষের অতিরিক্ত কোলন (:) বা স্পেস থাকলে তা ক্লিন করে নেওয়া
          let cleanAuthor = data.authorName ? data.authorName.trim() : "অন্যান্য বুজুর্গগণ";
          if (cleanAuthor.endsWith(':')) {
            cleanAuthor = cleanAuthor.slice(0, -1).trim();
          }
          return { id: doc.id, ...data, cleanAuthor };
        });
        
        // সিরিয়াল বা order অনুযায়ী ছোট থেকে বড় সাজানো
        list.sort((a: any, b: any) => (Number(a.order) || 999) - (Number(b.order) || 999));

        setQuotesList(list);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching quotes:", error);
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  // ক্লিন করা লেখকের নাম দিয়ে ডেটা গ্রুপ করা
  const groupedQuotes = quotesList.reduce((acc: any, item: any) => {
    const author = item.cleanAuthor;
    if (!acc[author]) {
      acc[author] = [];
    }
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
        
        {/* ব্যাক বাটন */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* হেডার */}
        <View style={styles.header}>
          <Text style={styles.heading}>বুজুর্গদের বাণী</Text>
          <Text style={styles.subtitle}>আলোকিত জীবনের জন্য মূল্যবান উপদেশ</Text>
        </View>

        {/* লোডিং অথবা ডেটা লিস্ট */}
        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={{ color: '#fff', marginTop: 10 }}>লোড হচ্ছে...</Text>
          </View>
        ) : sections.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#fff', marginTop: 20 }}>কোনো বাণী পাওয়া যায়নি।</Text>
        ) : (
          sections.map((section, sectionIndex) => {
            const authorImage = section.quotes.find((q: any) => q.imageUrl)?.imageUrl;

            return (
              <View key={section.title} style={styles.section}>
                <TouchableOpacity 
                  activeOpacity={0.85} 
                  onPress={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
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
                    <Text style={styles.label}>{item.title || "উপদেশ"}</Text>
                    <Text style={styles.quote}>“{item.bani}”</Text>
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
  backButton: { alignSelf: 'flex-start', backgroundColor: '#0f562a', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginBottom: 10 },
  backText: { color: '#fff', fontWeight: '700' },
  header: { marginBottom: 18, backgroundColor: '#0f562a', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#f9bf3a' },
  heading: { color: '#f9bf3a', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#eaf7ee', marginTop: 5, fontSize: 13, textAlign: 'center' },
  section: { marginBottom: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f562a', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#f9bf3a' },
  imageBox: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#f9bf3a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  contactImage: { width: '100%', height: '100%' },
  sectionTitle: { color: '#fff', flex: 1, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  chevron: { color: '#f9bf3a', fontSize: 24, fontWeight: '700', marginLeft: 8 },
  quoteCard: { backgroundColor: 'rgba(255,255,255,0.96)', marginTop: 8, borderRadius: 14, padding: 14, borderLeftWidth: 5, borderLeftColor: '#f9bf3a', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 3 },
  label: { color: '#0f562a', fontSize: 14, fontWeight: '800', marginBottom: 5 },
  quote: { color: '#303030', fontSize: 15, lineHeight: 24, textAlign: 'justify' },
});
