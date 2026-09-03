import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Platform } from "react-native"; // Platform যুক্ত করা হয়েছে

// নোটিফিকেশনের জন্য ইমপোর্ট
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  
  // চেক করবে ডিভাইসটি মোবাইল কি না এবং ওয়েব ব্রাউজার যেন না হয়
  if (Platform.OS !== 'web') {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default', importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250], lightColor: '#f9bf3a',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('নোটিফিকেশন পারমিশন দেওয়া হয়নি!');
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId || 'fc05220f-16a3-44c0-a9e4-6a9e59379298',
      })).data;
      
    } else {
      console.log('Push notification ফিজিক্যাল মোবাইল ছাড়া কাজ করবে না');
    }
  } else {
    console.log('ওয়েব ব্রাউজারে Push Notification স্কিপ করা হয়েছে।');
  }

  return token;
}

export default function RootLayout() {
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        AsyncStorage.setItem('@pushToken', token);
        setDoc(doc(db, 'push_tokens', token), {
          token: token,
          platform: Platform.OS,
          dateAdded: new Date(),
          updatedAt: new Date(),
          active: true,
        }, { merge: true }).catch(err => console.log("Token Save Error: ", err));
      }
    }).catch(err => console.log('Push registration error:', err));
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="light" backgroundColor="#0f562a" translucent={false} />
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.screenContent }} />
      <View pointerEvents="none" style={styles.globalHeader} />
      <View pointerEvents="none" style={styles.pageFrame} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  screenContent: { paddingTop: 48 },
  globalHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 48,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f562a',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomWidth: 2,
    borderBottomColor: '#f9bf3a',
  },
  pageFrame: { ...StyleSheet.absoluteFillObject, borderWidth: 5, borderColor: '#0f562a' },
});
