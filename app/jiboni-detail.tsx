import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import * as firebaseModule from '../firebase';
const db: any = (firebaseModule as any).db;
import FontSizeControl from '../components/FontSizeControl';
import BottomNav from '../components/BottomNav';

const displayName=(item:any)=>item.authorName||item.name||(item.title&&/জন্ম|বংশ|পরিচয়|পরিচয়/.test(item.title)?'খাজা মইনুদ্দীন চিশতী (রহ.)':item.title)||'বুজুর্গ';
const uniqueElders=(list:any[])=>{const seen=new Set<string>();return list.filter(item=>{const name=displayName(item).replace(/^হযরত\s+/,'').replace(/^খাজা\s+/,'').replace(/\s*\(রহ\.\)/,'').trim();if(seen.has(name))return false;seen.add(name);return true;});};
const detailText=(item:any)=>{const text=String(item.description||item.bio||item.content||'জীবনী তথ্য পাওয়া যায়নি।'); const chapter=String(item.title||''); return chapter&&text.startsWith(chapter)?text.slice(chapter.length).replace(/^[:：\s-]+/,'').trim():text;};
const LOCAL_JIBONI = [
 {id:'j1',title:'খাজা মইনুদ্দীন চিশতী (রহ.)',authorName:'আজমীর শরীফের মহান বুজুর্গ',description:'খাজা গরীব নওয়াজ (রহ.) ভালোবাসা, দয়া ও মানবসেবার মাধ্যমে ইসলামের সৌন্দর্য প্রচার করেন। তাঁর জীবন ছিল আল্লাহর স্মরণ, মানুষের সেবা এবং বিনয়ের উজ্জ্বল আদর্শ।'},
 {id:'j2',title:'হযরত নিজামুদ্দীন আউলিয়া (রহ.)',authorName:'মেহবুব-এ-ইলাহী',description:'তিনি দরিদ্র ও অসহায় মানুষের পাশে দাঁড়াতেন। তাঁর খানকাহে সবাই ভালোবাসা, ক্ষমা ও আত্মশুদ্ধির শিক্ষা পেতেন।'},
 {id:'j3',title:'চিশতিয়া বুজুর্গদের শিক্ষা',authorName:'চিশতিয়া তরিকার আদর্শ',description:'নামাজ, জিকির, সৎ চরিত্র ও মানুষের খেদমত—এই চারটি বিষয়কে জীবনের সৌন্দর্য হিসেবে গ্রহণ করাই বুজুর্গদের প্রধান শিক্ষা।'}
];
export default function JiboniDetail(){
 const router=useRouter(); const params=useLocalSearchParams(); const [items,setItems]=useState<any[]>([]); const [fontSize,setFontSize]=useState(16); const [loading,setLoading]=useState(true); const raw=Number(params.index||0); const selected=String(params.elder||''); const key=(v:any)=>displayName(v).replace(/^হযরত\s+/,'').replace(/^খাজা\s+/,'').replace(/\s*\\(রহ\\.\\)/,'').trim(); const grouped=selected?items.filter(x=>key(x)===key({authorName:selected})):items; const index=Math.max(0,Math.min(grouped.length-1,Number.isFinite(raw)?raw:0)); const item=grouped[index];
 useEffect(()=>{(async()=>{try{const cache=await AsyncStorage.getItem('@jiboniList');const q=await getDocs(collection(db,'jiboni'));const fresh=q.docs.map(d=>({id:d.id,...d.data()}));setItems(fresh.length?fresh:(cache?JSON.parse(cache):LOCAL_JIBONI));}catch{const cache=await AsyncStorage.getItem('@jiboniList');setItems(cache?JSON.parse(cache):LOCAL_JIBONI);}finally{setLoading(false);}})();},[]);
 const go=(next:number)=>router.replace({pathname:'/jiboni-detail',params:{index:String(next),elder:selected}} as never);
 return <ImageBackground source={{uri:'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg'}} style={s.bg}><ScrollView contentContainerStyle={s.container}><FontSizeControl size={fontSize} onChange={setFontSize}/><TouchableOpacity style={s.back} onPress={()=>router.back()}><Text style={s.backText}>← ফিরে যান</Text></TouchableOpacity><View style={s.header}><Text style={s.heading}>বুজুর্গদের জীবনী</Text><Text style={s.sub}>বিস্তারিত জীবন ও শিক্ষা</Text></View>{loading?<ActivityIndicator color="#f9bf3a"/>:item?<View style={s.card}>{item.imageUrl?<Image source={{uri:item.imageUrl}} style={s.image}/>:null}<Text style={[s.title,{fontSize:fontSize+4}]}>{item.title||"জীবনী"}</Text><Text style={[s.body,{fontSize,lineHeight:fontSize*1.8}]}>{detailText(item)}</Text><View style={s.nav}><TouchableOpacity style={[s.btn,index===0&&s.disabled]} disabled={index===0} onPress={()=>go(index-1)}><Text style={s.btnText}>◀ আগের পৃষ্ঠা</Text></TouchableOpacity><Text style={s.count}>পৃষ্ঠা {index+1} / {grouped.length}</Text><TouchableOpacity style={[s.btn,index===grouped.length-1&&s.disabled]} disabled={index===grouped.length-1} onPress={()=>go(index+1)}><Text style={s.btnText}>পরের পৃষ্ঠা ▶</Text></TouchableOpacity></View></View>:null}</ScrollView><BottomNav activeTab="home"/></ImageBackground>;
}
const s=StyleSheet.create({bg:{flex:1},container:{padding:16,paddingBottom:100},back:{alignSelf:'flex-start',backgroundColor:'#0f562a',padding:9,borderRadius:18,marginBottom:10},backText:{color:'#fff',fontWeight:'700'},header:{backgroundColor:'#0f562a',borderRadius:18,padding:18,alignItems:'center',marginBottom:18},heading:{color:'#f9bf3a',fontSize:26,fontWeight:'800'},sub:{color:'#fff',marginTop:5},card:{backgroundColor:'#fffdf9',borderRadius:16,padding:20,borderWidth:1.5,borderColor:'#d4af37'},image:{width:'100%',height:190,borderRadius:12,marginBottom:15},title:{color:'#0f562a',fontWeight:'900',textAlign:'center',marginBottom:10},author:{color:'#e91e63',fontWeight:'700',textAlign:'center',marginBottom:15},body:{color:'#303030',textAlign:'justify',marginBottom:24},nav:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderTopWidth:1,borderTopColor:'#eee',paddingTop:14},btn:{backgroundColor:'#0f562a',paddingHorizontal:10,paddingVertical:9,borderRadius:8},disabled:{backgroundColor:'#bbb'},btnText:{color:'#fff',fontWeight:'700',fontSize:12},count:{color:'#555',fontWeight:'700',fontSize:12}});











