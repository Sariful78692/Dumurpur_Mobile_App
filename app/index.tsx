// import React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import {
//   Alert,
//   Image,
//   ImageBackground,
//   Linking,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   useWindowDimensions,
// } from 'react-native';
// import BottomNav from '../components/BottomNav';

// const backgroundImage = {
//   uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
// };

// const openLink = async (url: string) => {
//   try {
//     await WebBrowser.openBrowserAsync(url, {
//       presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
//     });
//   } catch {
//     try {
//       await Linking.openURL(url);
//     } catch {
//       Alert.alert('Unable to open', 'Your device could not open this link. Please try again.');
//     }
//   }
// };

// const renderActionIcon = (title: string) => {
//   switch (title) {
//     case 'Location':
//       return <MaterialCommunityIcons name="map-marker" size={54} color="#ff4d4f" />;
//     case 'Bengali Calendar':
//       return <MaterialCommunityIcons name="calendar-month" size={54} color="#ff9f1c" />;
//     case 'Islamic Calendar':
//       return <MaterialCommunityIcons name="calendar-star" size={54} color="#64d8ff" />;
//     case 'Donation':
//       return <MaterialCommunityIcons name="hand-heart" size={54} color="#f9bf3a" />;
//     case 'Prayer':
//       return <MaterialCommunityIcons name="mosque" size={54} color="#ffffff" />;
//     case 'Buzurgoder':
//       return <MaterialCommunityIcons name="book-open-page-variant" size={54} color="#f9bf3a" />;
//     case 'Namaz Shiksha':
//       return <MaterialCommunityIcons name="mosque" size={54} color="#f9bf3a" />;
//     default:
//       return null;
//   }
// };
// const Homescreen = () => {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const columnCount = width < 430 ? 2 : 3;
//   const cardWidth = Math.min((width - 32 - (14 * (columnCount - 1))) / columnCount, 160);

//   const actions = [
//     { title: 'Call Now', image: require('../assets/images/Babajaan1.png'), onPress: () => openLink('tel:6296429997') },
//     { title: 'Book', image: { uri: 'https://img.magnific.com/free-vector/books-stack-realistic_1284-4735.jpg?semt=ais_hybrid&w=740&q=80' }, onPress: () => router.push('/library') },
//     { title: 'Location', image: { uri: 'https://static-00.iconduck.com/assets.00/location-position-icon-1640x2048-6jqx3f7e.png' }, onPress: () => openLink('https://maps.app.goo.gl/m7EBbzA2Rwksh6oA7?g_st=ac') },
//     { title: 'YouTube', image: { uri: 'https://static.vecteezy.com/system/resources/thumbnails/023/986/480/small/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png' }, onPress: () => openLink('https://www.youtube.com/@DUMURPURCHISTIYADARBARSHARIF') },
//     { title: 'Facebook', image: { uri: 'https://static.vecteezy.com/system/resources/previews/042/127/218/non_2x/round-circle-blue-facebook-logo-with-long-shadow-on-a-transparent-background-free-png.png' }, onPress: () => openLink('https://www.facebook.com/groups/1304852206304267') },
//     { title: 'WhatsApp', image: { uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/398/617/small/whatsapp-logo-icon-isolated-on-transparent-background-free-png.png' }, onPress: () => openLink('https://chat.whatsapp.com/IDy4rB5lj7RCnZDEMQqUDa') },
//     { title: 'About', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2307/2307741.png' }, onPress: () => router.push('/about') },
//     { title: 'Contact', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3240/3240031.png' }, onPress: () => router.push('/contact') },
//     { title: 'Bengali Calendar', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3048/3048248.png' }, onPress: () => router.push('/bengali-calendar' as never) },
//     { title: 'Islamic Calendar', image: { uri: 'https://cdn-icons-png.flaticon.com/512/5204/5204518.png' }, onPress: () => router.push('/ramadan-calendar' as never) },
//     { title: 'Donation', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2970/2970287.png' }, onPress: () => router.push('/donation' as never) },
//     { title: 'Prayer', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2905/2905154.png' }, onPress: () => router.push('/prayer-times' as never) },
//     { title: 'Buzurgoder Bani', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png' }, onPress: () => router.push('/buzurgoder' as never) },
//     { title: 'Namaz Shiksha', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2905/2905154.png' }, onPress: () => router.push('/namaz-shiksha' as never) },
//   ];

//   return (
    
//     <SafeAreaView style={styles.container}>
//       <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >

//           <View style={styles.headerCard}>
//             <Text style={styles.title}>Dumurpur Chistiya Dorbar Sharif</Text>
//             <Text style={styles.subtitle}>Hooghly, Pandua, Chistiya Nagar</Text>
//             <Image source={require('../assets/images/KhankahSarif.jpg')} style={styles.heroImage} resizeMode="cover" />
//           </View>

//           <View style={styles.grid}>
//             {actions.map((item) => (
//               <TouchableOpacity key={item.title} style={[styles.card, { width: cardWidth }]} activeOpacity={0.8} onPress={item.onPress}>
//                 {renderActionIcon(item.title) ?? (
//                   <Image source={item.image} style={styles.cardIcon} resizeMode="contain" />
//                 )}
//                 <Text style={styles.cardText}>{item.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View style={styles.footerContainer}>
//             <Text style={styles.footerText}>Creator Sariful Basir Chisti @ 2026</Text>
//           </View>
//         </ScrollView>

//         <BottomNav activeTab="home" />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default Homescreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5efe6',
//   },
//   backgroundImage: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingVertical: 18,
//     paddingBottom: 92,
//     marginTop: 8,
//   },
//   headerCard: {
//     backgroundColor: 'rgba(14, 77, 36, 0.9)',
//     borderRadius: 22,
//     padding: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#f9bf3a',
//     textAlign: 'center',
//     marginBottom: 6,
//   },
//   subtitle: {
//     color: '#eaf7ee',
//     fontSize: 13,
//     letterSpacing: 0.5,
//     marginBottom: 14,
//   },
//   heroImage: {
//     width: '100%',
//     height: 180,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: '#f9bf3a',
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 24,
//     gap: 14,
//   },
//   card: {
//     minHeight: 120,
//     backgroundColor: 'rgba(18, 94, 43, 0.93)',
//     borderRadius: 18,
//     paddingVertical: 14,
//     paddingHorizontal: 8,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 2,
//     borderColor: '#f9bf3a',
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 4,
//   },
//   cardIcon: {
//     width: 52,
//     height: 52,
//   },
//   cardText: {
//     backgroundColor: '#f9bf3a',
//     color: '#123b1d',
//     width: '90%',
//     textAlign: 'center',
//     borderRadius: 10,
//     paddingVertical: 5,
//     fontWeight: '700',
//     fontSize: 12,
//     overflow: 'hidden',
//   },
//   footerContainer: {
//     marginTop: 26,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   footerText: {
//     color: '#fff8e1',
//     fontWeight: '700',
//     backgroundColor: 'rgba(0,0,0,0.25)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//   },
// });




import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

const openLink = async (url: string) => {
  try {
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    });
  } catch {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open', 'Your device could not open this link. Please try again.');
    }
  }
};

const renderActionIcon = (title: string) => {
  switch (title) {
    case 'Location':
      return <MaterialCommunityIcons name="map-marker" size={54} color="#ff4d4f" />;
    case 'Bengali Calendar':
      return <MaterialCommunityIcons name="calendar-month" size={54} color="#ff9f1c" />;
    case 'Islamic Calendar':
      return <MaterialCommunityIcons name="calendar-star" size={54} color="#64d8ff" />;
    case 'Donation':
      return <MaterialCommunityIcons name="hand-heart" size={54} color="#f9bf3a" />;
    case 'Prayer':
      return <MaterialCommunityIcons name="mosque" size={54} color="#ffffff" />;
    case 'Buzurgoder Bani':
      return <MaterialCommunityIcons name="book-open-page-variant" size={54} color="#f9bf3a" />;
    case 'Jiboni':
      return <MaterialCommunityIcons name="book-account" size={54} color="#f9bf3a" />;
    case 'Namaz Shiksha':
      return <MaterialCommunityIcons name="mosque" size={54} color="#f9bf3a" />;
    case 'Notice':
      return <MaterialCommunityIcons name="bullhorn" size={54} color="#ff9f1c" />;
    default:
      return null;
  }
};

const Homescreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const columnCount = width < 430 ? 2 : 3;
  const cardWidth = Math.min((width - 32 - (14 * (columnCount - 1))) / columnCount, 160);

  const actions = [
    { title: 'Call Now', image: require('../assets/images/Babajaan1.png'), onPress: () => openLink('tel:6296429997') },
    { title: 'Book', image: { uri: 'https://img.magnific.com/free-vector/books-stack-realistic_1284-4735.jpg?semt=ais_hybrid&w=740&q=80' }, onPress: () => router.push('/library') },
    { title: 'Location', image: { uri: 'https://static-00.iconduck.com/assets.00/location-position-icon-1640x2048-6jqx3f7e.png' }, onPress: () => openLink('https://maps.app.goo.gl/m7EBbzA2Rwksh6oA7?g_st=ac') },
    { title: 'YouTube', image: { uri: 'https://static.vecteezy.com/system/resources/thumbnails/023/986/480/small/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png' }, onPress: () => openLink('https://www.youtube.com/@DUMURPURCHISTIYADARBARSHARIF') },
    { title: 'Facebook', image: { uri: 'https://static.vecteezy.com/system/resources/previews/042/127/218/non_2x/round-circle-blue-facebook-logo-with-long-shadow-on-a-transparent-background-free-png.png' }, onPress: () => openLink('https://www.facebook.com/groups/1304852206304267') },
    { title: 'WhatsApp', image: { uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/398/617/small/whatsapp-logo-icon-isolated-on-transparent-background-free-png.png' }, onPress: () => openLink('https://chat.whatsapp.com/IDy4rB5lj7RCnZDEMQqUDa') },
    { title: 'About', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2307/2307741.png' }, onPress: () => router.push('/about') },
    { title: 'Contact', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3240/3240031.png' }, onPress: () => router.push('/contact') },
    { title: 'Bengali Calendar', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3048/3048248.png' }, onPress: () => router.push('/bengali-calendar' as never) },
    { title: 'Islamic Calendar', image: { uri: 'https://cdn-icons-png.flaticon.com/512/5204/5204518.png' }, onPress: () => router.push('/ramadan-calendar' as never) },
    { title: 'Donation', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2970/2970287.png' }, onPress: () => router.push('/donation' as never) },
    { title: 'Prayer', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2905/2905154.png' }, onPress: () => router.push('/prayer-times' as never) },
    { title: 'Buzurgoder Bani', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png' }, onPress: () => router.push('/buzurgoder' as never) },
    { title: 'Jiboni', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png' }, onPress: () => router.push('/jiboni' as never) },
    { title: 'Namaz Shiksha', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2905/2905154.png' }, onPress: () => router.push('/namaz-shiksha' as never) },
    { title: 'Notice', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2665/2665038.png' }, onPress: () => router.push('/notice' as never) },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.headerCard}>
            <Text style={styles.title}>Dumurpur Chistiya Dorbar Sharif</Text>
            <Text style={styles.subtitle}>Hooghly, Pandua, Chistiya Nagar</Text>
            <Image source={require('../assets/images/KhankahSarif.jpg')} style={styles.heroImage} resizeMode="cover" />
          </View>

          <View style={styles.grid}>
            {actions.map((item) => (
              <TouchableOpacity key={item.title} style={[styles.card, { width: cardWidth }]} activeOpacity={0.8} onPress={item.onPress}>
                {renderActionIcon(item.title) ?? (
                  <Image source={item.image} style={styles.cardIcon} resizeMode="contain" />
                )}
                <Text style={styles.cardText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Creator Sariful Basir Chisti @ 2026</Text>
          </View>
        </ScrollView>

        <BottomNav activeTab="home" />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe6',
  },
  backgroundImage: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingBottom: 92,
    marginTop: 8,
  },
  headerCard: {
    backgroundColor: 'rgba(14, 77, 36, 0.9)',
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f9bf3a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#eaf7ee',
    fontSize: 13,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f9bf3a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 14,
  },
  card: {
    minHeight: 120,
    backgroundColor: 'rgba(18, 94, 43, 0.93)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#f9bf3a',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardIcon: {
    width: 52,
    height: 52,
  },
  cardText: {
    backgroundColor: '#f9bf3a',
    color: '#123b1d',
    width: '90%',
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    fontWeight: '700',
    fontSize: 12,
    overflow: 'hidden',
  },
  footerContainer: {
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff8e1',
    fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
});