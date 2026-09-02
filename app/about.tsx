import React from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

const About = () => {
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCard}>
          <Image source={require('../assets/images/Dumurpur_logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>About Dumurpur Chistiya Dorbar Sharif</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>আমাদের উদ্দেশ্য</Text>
          <Text style={styles.text}>
            ডুমুরপুর চিশতিয়া দরবার শরীফ কেবল একটি প্রতিষ্ঠান নয়, 
            বরং স্রষ্টার প্রেম ও মানবসেবায় নিবেদিত এক প্রশান্তির মোহনা। 
            এটি এমন এক পবিত্র রুহানি পুণ্যভূমি, যেখানে এসে ক্লান্ত হৃদয় পায় 
            পরম জ্ঞান, সুদৃঢ় ঈমান, সঠিক আধ্যাত্মিক দিকনির্দেশনা এবং 
            আত্মশুদ্ধির এক সুন্দর নৈতিক পথের সন্ধান।
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>আমাদের লক্ষ্য</Text>
          <Text style={styles.text}>
            মহান রবের প্রতি ঐকান্তিক ভক্তি, প্রকৃত দ্বীনি শিক্ষা এবং 
            সৃষ্টির প্রতি নিঃস্বার্থ খেদমতের মাধ্যমে মানুষের অন্তরে ঈমানের 
            জ্যোতি প্রজ্জ্বলিত করা। পাশাপাশি, সমাজে দয়া ও সহমর্মিতার 
            সুবাস ছড়িয়ে দেওয়া, সুমহান ইসলামী মূল্যবোধের চর্চা এবং সকল 
            ভেদাভেদ ভুলে ভ্রাতৃত্বের অটুট বন্ধনকে আরও সুদৃঢ় করাই আমাদের 
            পরম ব্রত।
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>আমাদের আদর্শ</Text>
          <Text style={styles.text}>
            {'• ঐক্য ও ভ্রাতৃত্ববোধ: সকল ভেদাভেদ ভুলে সাম্য, সম্প্রীতি ও ঐক্যের সুদৃঢ় মেলবন্ধন।\n• ইবাদত ও রুহানিয়াত: স্রষ্টার নৈকট্য লাভে নিরন্তর সাধনা, প্রার্থনা ও আত্মশুদ্ধি।\n• জ্ঞান ও প্রজ্ঞা: সুশিক্ষার মাধ্যমে অজ্ঞতার আঁধার দূর করে হৃদয়ে আলোর সঞ্চার।\n• খেদমত ও সহমর্মিতা: সৃষ্টির সেবায় নিজেকে বিলিয়ে দেওয়া এবং আর্তের কল্যাণে কাজ করা।\n• আদব ও শৃঙ্খলা: পারস্পরিক শ্রদ্ধা, বিনয়, নম্রতা এবং সুশৃঙ্খল জীবনবোধ।'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>ডুমুরপুর চিশতিয়া নিজামিয়া দরবার</Text>
          <Text style={styles.text}>
            ডুমুরপুর চিশতিয়া নিজামিয়া দরবার এবং এর মহান প্রতিষ্ঠাতা পীরে তরিকত মাওলানা বশির আল হাসান চিশতী-কে নিয়ে হৃদয়গ্রাহী এবং আধ্যাত্মিক ভাবগাম্ভীর্যপূর্ণ কিছু কথা নিচে তুলে ধরা হলো:

ডুমুরপুর চিশতিয়া নিজামিয়া দরবার: আধ্যাত্মিক প্রেমের এক পুণ্যভূমি
পৃথিবীতে এমন কিছু পবিত্র স্থান রয়েছে, যেখানে পা রাখলে মনের সমস্ত ক্লান্তি, জাগতিক মোহ ও অস্থিরতা দূর হয়ে যায়। ডুমুরপুর চিশতিয়া নিজামিয়া দরবার ঠিক তেমনই এক আধ্যাত্মিক শান্তির নীড়। এটি কেবল ইট-পাথরের কোনো স্থাপনা নয়, বরং আল্লাহ ও তাঁর রাসূলের (সা.) প্রেমের এক অনন্ত স্রোতধারা, যেখানে তৃষ্ণার্ত হৃদয় এসে প্রশান্তি লাভ করে। চিশতিয়া ও নিজামিয়া তরিকতের সুমহান আদর্শে গড়ে ওঠা এই দরবারটি অহংকার ও ভেদাভেদ ভুলে মানুষকে এক সুতোয় বাঁধার এক অনন্য কেন্দ্র।

পীরে তরিকত মাওলানা বশির আল হাসান চিশতীর রুহানি আলো
এই পবিত্র দরবারের প্রাণপুরুষ এবং প্রতিষ্ঠাতা হলেন পীরে তরিকত মাওলানা বশির আল হাসান চিশতী। তিনি ছিলেন আধ্যাত্মিকতা, প্রেম ও মানবতার এক উজ্জ্বল নক্ষত্র।

পথপ্রদর্শক: তাঁর নূরানী উপস্থিতি এবং মায়াবী কথায় অসংখ্য পথহারা মানুষ আলোর দিশা পেয়েছে। তিনি তাঁর অনুসারীদের আত্মশুদ্ধি ও স্রষ্টার নৈকট্য লাভের পথ দেখিয়েছেন।

প্রেমের সাধক: চিশতিয়া তরিকতের মূল সুরই হলো— "স্রষ্টার সৃষ্টির প্রতি নিঃস্বার্থ ভালোবাসা"। মাওলানা বশির আল হাসান চিশতী তাঁর আপন কর্ম ও সাধনায় এই মহান ব্রতকে ধারণ করেছিলেন এবং মানুষের মাঝে ছড়িয়ে দিয়েছেন।

উদারতা ও বিনয়: তাঁর দরবারে ধনী-গরিব, শিক্ষিত-অশিক্ষিত কোনো ভেদাভেদ ছিল না। তিনি সকলকে সমান আদরে বুকে টেনে নিয়েছেন, ঠিক যেমন একজন দরদী চিকিৎসক রোগীর সেবা করেন।

দরবার শরীফের স্নিগ্ধ পরিবেশ
ডুমুরপুর দরবারের বাতাসে কান পাতলে যেন আজও শোনা যায় জিকির ও দরুদের সুমধুর ধ্বনি। এখানে এলে ধূলিসাৎ হয়ে যায় মানুষের ভেতরের যাবতীয় অহমিকা।

জিকির ও ফিকির: জিকিরের ধ্বনিতে এখানকার পরিবেশ সর্বদা মুখরিত থাকে, যা মানুষের অন্তরকে পরিশুদ্ধ করে।

সাম্য ও সম্প্রীতি: এই দরবার যেন সাম্যের এক বাস্তব উদাহরণ। লঙ্গরখানা থেকে শুরু করে মাহফিল—সব জায়গায় মানুষের কাঁধে কাঁধ মিলিয়ে চলার এক অপূর্ব দৃশ্য চোখে পড়ে।

রুহানি ফয়েজ: বিশ্বাস করা হয়, পীরে তরিকত মাওলানা বশির আল হাসান চিশতীর রুহানি ফয়েজ ও বরকত আজও এই দরবারের আশেকানদের হৃদয়কে সিক্ত করে চলেছে।

পরিশেষে:
ডুমুরপুর চিশতিয়া নিজামিয়া দরবার শরীফ হলো অন্ধকারের বুকে জ্বলে থাকা এমন এক প্রদীপ, যার আলো যুগ যুগ ধরে মানুষকে সত্য, ন্যায় ও প্রেমের পথ দেখাবে। মহান প্রতিষ্ঠাতা পীরে তরিকত মাওলানা বশির আল হাসান চিশতীর রেখে যাওয়া আদর্শ ও শিক্ষা কিয়ামত পর্যন্ত জারি থাকুক— এটাই সকল আশেকান ও ভক্তবৃন্দের একান্ত প্রার্থনা।
          </Text>
        </View>

      </ScrollView>
      <BottomNav activeTab="about" /> {/* Custom bottom tab bar */}
    </ImageBackground>
  );
};

export default About;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 90,
  },
  topBar: {
    marginBottom: 14,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 86, 42, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f9bf3a',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerCard: {
    backgroundColor: 'rgba(15,86,42,0.90)',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 12,
  },
  title: {
    color: '#f9bf3a',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  heading: {
    color: '#0f562a',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  text: {
    color: '#2d2d2d',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  bottomPadding: {
    height: 80, // Adjust this value to create space for the bottom tab bar
  },
});
