import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../components/BottomNav';
import FontSizeControl from '../components/FontSizeControl';

const LOCAL_JIBONI = [
 { id:'j1', order:1, title:'খাজা মইনুদ্দীন চিশতী (রহ.)', authorName:'আজমীর শরীফের মহান বুজুর্গ', description:'খাজা গরীব নওয়াজ (রহ.) ভালোবাসা, দয়া ও মানবসেবার মাধ্যমে ইসলামের সৌন্দর্য প্রচার করেন। তাঁর জীবন ছিল আল্লাহর স্মরণ, মানুষের সেবা এবং বিনয়ের উজ্জ্বল আদর্শ।' },
 { id:'j2', order:2, title:'হযরত নিজামুদ্দীন আউলিয়া (রহ.)', authorName:'মেহবুব-এ-ইলাহী', description:'তিনি দরিদ্র ও অসহায় মানুষের পাশে দাঁড়াতেন। তাঁর খানকাহে সবাই ভালোবাসা, ক্ষমা ও আত্মশুদ্ধির শিক্ষা পেতেন।' },
 { id:'j3', order:3, title:'চিশতিয়া বুজুর্গদের শিক্ষা', authorName:'চিশতিয়া তরিকার আদর্শ', description:'নামাজ, জিকির, সৎ চরিত্র ও মানুষের খেদমত—এই চারটি বিষয়কে জীবনের সৌন্দর্য হিসেবে গ্রহণ করাই বুজুর্গদের প্রধান শিক্ষা।' }
];
const clean=(v:any)=>typeof v==='string'?v.trim():v; const elderName=(item:any)=>clean(item.authorName||item.name||(item.title&&/জন্ম|বংশ|পরিচয়|পরিচয়/.test(item.title)?'খাজা মইনুদ্দীন চিশতী (রহ.)':item.title)||'বুজুর্গ');
const uniqueElders=(list:any[])=>{const seen=new Set<string>();return list.filter(item=>{const name=elderName(item).replace(/^হযরত\s+/,'').replace(/^খাজা\s+/,'').replace(/\s*\(রহ\.\)/,'').trim();if(seen.has(name))return false;seen.add(name);return true;});};
export default function JiboniScreen(){
 const router=useRouter(); const [items,setItems]=useState<any[]>([]); const [open,setOpen]=useState<number|null>(null); const [fontSize,setFontSize]=useState(15); const [loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{try{const cache=await AsyncStorage.getItem('@jiboniList'); const q=await getDocs(collection(db,'jiboni')); const fresh=q.docs.map(d=>({id:d.id,...d.data()})); const data=fresh.length?fresh:(cache?JSON.parse(cache):LOCAL_JIBONI); setItems(uniqueElders(data)); await AsyncStorage.setItem('@jiboniList',JSON.stringify(data));}catch{const cache=await AsyncStorage.getItem('@jiboniList');setItems(uniqueElders(cache?JSON.parse(cache):LOCAL_JIBONI));}finally{setLoading(false);}})();},[]);
 return <ImageBackground source={{uri:'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg'}} style={s.bg}><ScrollView contentContainerStyle={s.container}><FontSizeControl size={fontSize} onChange={setFontSize}/><TouchableOpacity style={s.back} onPress={()=>router.back()}><Text style={s.backText}>← ফিরে যান</Text></TouchableOpacity><View style={s.header}><Text style={s.heading}>বুজুর্গদের জীবনী</Text><Text style={s.sub}>মহান বুজুর্গদের জীবন ও শিক্ষা</Text></View>{loading?<ActivityIndicator color="#f9bf3a"/>:items.map((item,i)=><View key={item.id||i} style={s.section}><TouchableOpacity style={s.row} onPress={()=>router.push({ pathname: '/jiboni-detail', params: { index: String(i), elder: elderName(item) } } as never)}>{item.imageUrl?<Image source={{uri:item.imageUrl}} style={s.thumb}/>:null}<Text style={s.name}>{elderName(item)}</Text><Text style={s.plus}>{open===i?'−':'+'}</Text></TouchableOpacity>{open===i&&<View style={s.card}>{item.imageUrl?<Image source={{uri:item.imageUrl}} style={s.image}/>:null}<Text style={[s.author,{fontSize}]}>{clean(item.authorName||'জীবনী')}</Text><Text style={[s.body,{fontSize,lineHeight:fontSize*1.7}]}>{clean(item.description||item.bio||item.content||'জীবনী তথ্য পাওয়া যায়নি।')}</Text></View>}</View>)}</ScrollView><BottomNav activeTab="home"/></ImageBackground>;
}
const s=StyleSheet.create({bg:{flex:1},container:{padding:16,paddingBottom:100},back:{alignSelf:'flex-start',backgroundColor:'#0f562a',padding:9,borderRadius:18,marginBottom:10},backText:{color:'#fff',fontWeight:'700'},header:{backgroundColor:'#0f562a',borderRadius:18,padding:18,alignItems:'center',marginBottom:18},heading:{color:'#f9bf3a',fontSize:26,fontWeight:'800'},sub:{color:'#fff',marginTop:5},section:{marginBottom:12},row:{flexDirection:'row',alignItems:'center',backgroundColor:'#0f562a',borderRadius:14,padding:14,borderWidth:1,borderColor:'#f9bf3a'},thumb:{width:44,height:44,borderRadius:22,marginRight:12,borderWidth:1,borderColor:'#f9bf3a'},name:{color:'#fff',flex:1,fontSize:17,fontWeight:'800'},plus:{color:'#f9bf3a',fontSize:26,fontWeight:'700'},card:{backgroundColor:'#fffdf9',borderRadius:14,padding:16,marginTop:8,borderLeftWidth:5,borderLeftColor:'#f9bf3a'},image:{width:'100%',height:180,borderRadius:12,marginBottom:12},author:{color:'#0f562a',fontWeight:'800',textAlign:'center',marginBottom:10},body:{color:'#303030',textAlign:'justify'}});








