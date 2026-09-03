import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
export default function Admin(){return <SafeAreaView style={s.container}><View style={s.card}><Text style={s.title}>Admin Panel</Text><Text style={s.text}>Manage books, notices and devotional content.</Text></View></SafeAreaView>} const s=StyleSheet.create({container:{flex:1,backgroundColor:'#f4efe7'},card:{margin:20,padding:24,backgroundColor:'#fff',borderRadius:18},title:{color:'#0f562a',fontSize:26,fontWeight:'800',marginBottom:12},text:{color:'#555',fontSize:16}});
