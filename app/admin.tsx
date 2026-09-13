import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'expo-router';

const CONTENT_TYPES = [
  { key: 'jiboni', label: 'জীবনী', collectionName: 'jiboni' },
  { key: 'quotes', label: 'বাণী', collectionName: 'quotes' },
  { key: 'gazals', label: 'গজল', collectionName: 'gazals' },
  { key: 'namazShiksha', label: 'নামাজ শিক্ষা', collectionName: 'namazShiksha' },
];

export default function Admin() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(CONTENT_TYPES[0].key);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim() || !content.trim()) {
      Alert.alert('তথ্য দিন', 'নাম এবং content লিখুন।');
      return;
    }

    setSaving(true);
    try {
      const current = CONTENT_TYPES.find(t => t.key === selectedType)!;
      const base: any = {
        authorName: name.trim(),
        title: title.trim() || 'বিস্তারিত',
        description: content.trim(),
        createdAt: serverTimestamp(),
      };

      if (current.key === 'quotes') base.bani = content.trim();
      if (current.key === 'gazals') base.lyrics = content.trim();

      await addDoc(collection(db, current.collectionName), base);

      Alert.alert('সফল', 'নতুন content save হয়েছে।');
      setName('');
      setTitle('');
      setContent('');
    } catch (e) {
      Alert.alert('সমস্যা', 'Save করা যায়নি। Internet/Firebase permission পরীক্ষা করুন।');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.body}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>← ফিরে যান</Text>
        </TouchableOpacity>

        <Text style={s.heading}>Admin Panel</Text>
        <Text style={s.help}>নতুন content যোগ করুন</Text>

        <View style={s.tabs}>
          {CONTENT_TYPES.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[s.tab, selectedType === t.key && s.active]}
              onPress={() => setSelectedType(t.key)}
            >
              <Text style={[s.tabText, selectedType === t.key && s.activeTabText]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={s.input}
          placeholder="বুজুর্গ/শিল্পীর নাম"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={s.input}
          placeholder="Title (যেমন: জন্ম ও বংশপরিচয়)"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[s.input, s.area]}
          placeholder="বিস্তারিত লেখা"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={s.save} onPress={save} disabled={saving}>
          <Text style={s.saveText}>
            {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4efe7' },
  body: { padding: 20 },
  back: { alignSelf: 'flex-start', backgroundColor: '#0f562a', padding: 9, borderRadius: 18, marginBottom: 18 },
  backText: { color: '#fff', fontWeight: '700' },
  heading: { fontSize: 28, fontWeight: '800', color: '#0f562a' },
  help: { color: '#666', marginTop: 5, marginBottom: 18 },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  tab: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#ddd', alignItems: 'center', minWidth: 90 },
  active: { backgroundColor: '#0f562a' },
  tabText: { fontWeight: '800', color: '#222' },
  activeTabText: { color: '#fff' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 13, marginBottom: 12, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  area: { height: 180 },
  save: { backgroundColor: '#d89b00', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 17 },
});