import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { db } from '../firebase';
import BottomNav from '../components/BottomNav';
import FontSizeControl from '../components/FontSizeControl';

type NamazShikshaItem = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

export default function NamazShikshaScreen() {
  const router = useRouter();

  const [items, setNamazShikshaItemsList] = useState<NamazShikshaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [expandedItemId, setExpandedNamazShikshaItemId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const cachedItems = await AsyncStorage.getItem('@items');

        if (cachedItems) {
          setNamazShikshaItemsList(JSON.parse(cachedItems));
          setLoading(false);
        }

        const querySnapshot = await getDocs(collection(db, 'namazShiksha'));

        const list: NamazShikshaItem[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<NamazShikshaItem, 'id'>),
        }));

        setNamazShikshaItemsList(list);
        await AsyncStorage.setItem('@items', JSON.stringify(list));
        setLoading(false);
      } catch (error) {
        console.log('Error or Offline:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const toggleItem = (id: string) => {
    setExpandedNamazShikshaItemId(currentId => (currentId === id ? null : id));
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <FontSizeControl size={fontSize} onChange={setFontSize} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>Ã¢â€ Â Ã Â¦Â«Ã Â¦Â¿Ã Â¦Â°Ã Â§â€¡ Ã Â¦Â¯Ã Â¦Â¾Ã Â¦Â¨</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.heading}>Ã Â¦Å“Ã Â¦Â°Ã Â§ÂÃ Â¦Â°Ã Â¦Â¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Å“Ã Â§ÂÃ Â¦Å¾Ã Â¦ÂªÃ Â§ÂÃ Â¦Â¤Ã Â¦Â¿</Text>
          <Text style={styles.subtitle}>
            Ã Â¦Â¦Ã Â¦Â°Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â° Ã Â¦Â¶Ã Â¦Â°Ã Â§â‚¬Ã Â¦Â«Ã Â§â€¡Ã Â¦Â° Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â®Ã Â§ÂÃ Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦â€¢ Ã Â¦ËœÃ Â§â€¹Ã Â¦Â·Ã Â¦Â£Ã Â¦Â¾ Ã Â¦â€œ Ã Â¦â€“Ã Â¦Â¬Ã Â¦Â°
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#f9bf3a" />
            <Text style={styles.loadingText}>Ã Â¦Â²Ã Â§â€¹Ã Â¦Â¡ Ã Â¦Â¹Ã Â¦Å¡Ã Â§ÂÃ Â¦â€ºÃ Â§â€¡...</Text>
          </View>
        ) : items.length === 0 ? (
          <Text style={styles.emptyText}>
            Ã Â¦â€¢Ã Â§â€¹Ã Â¦Â¨Ã Â§â€¹ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Å“Ã Â§ÂÃ Â¦Å¾Ã Â¦ÂªÃ Â§ÂÃ Â¦Â¤Ã Â¦Â¿ Ã Â¦ÂªÃ Â¦Â¾Ã Â¦â€œÃ Â¦Â¯Ã Â¦Â¼Ã Â¦Â¾ Ã Â¦Â¯Ã Â¦Â¾Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Â¨Ã Â¦Â¿Ã Â¥Â¤
          </Text>
        ) : (
          items.map(item => {
            const isExpanded = expandedItemId === item.id;

            return (
              <View key={item.id} style={styles.itemWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.itemTitleBar}
                  onPress={() => toggleItem(item.id)}
                >
                  <View style={styles.titleLeft}>
                    {item.imageUrl && (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.roundImage}
                      />
                    )}

                    <Text
                      numberOfLines={2}
                      style={[
                        styles.itemTitle,
                        { fontSize: fontSize + 3 },
                      ]}
                    >
                      {item.title || 'Ã Â¦Â¶Ã Â¦Â¿Ã Â¦Â°Ã Â§â€¹Ã Â¦Â¨Ã Â¦Â¾Ã Â¦Â® Ã Â¦Â¨Ã Â§â€¡Ã Â¦â€¡'}
                    </Text>
                  </View>

                  <Text style={styles.plusIcon}>
                    {isExpanded ? 'Ã¢Ë†â€™' : '+'}
                  </Text>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.detailsBox}>
                    {item.imageUrl && (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.detailsImage}
                        resizeMode="cover"
                      />
                    )}

                    <Text
                      style={[
                        styles.itemDescription,
                        {
                          fontSize,
                          lineHeight: fontSize * 1.6,
                        },
                      ]}
                    >
                      {item.description ||
                        'Ã Â¦ÂÃ Â¦â€¡ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Å“Ã Â§ÂÃ Â¦Å¾Ã Â¦ÂªÃ Â§ÂÃ Â¦Â¤Ã Â¦Â¿Ã Â¦Â° Ã Â¦â€¢Ã Â§â€¹Ã Â¦Â¨Ã Â§â€¹ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¤Ã Â¦Â¾Ã Â¦Â°Ã Â¦Â¿Ã Â¦Â¤ Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦Â¨Ã Â§â€¡Ã Â¦â€¡Ã Â¥Â¤'}
                    </Text>
                  </View>
                )}
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
  background: {
    flex: 1,
  },

  container: {
    padding: 16,
    paddingBottom: 110,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f562a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },

  backText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },

  header: {
    backgroundColor: '#0f562a',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f9bf3a',
  },

  heading: {
    color: '#f9bf3a',
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },

  loadingBox: {
    marginTop: 40,
    alignItems: 'center',
  },

  loadingText: {
    color: '#0f562a',
    marginTop: 10,
    fontSize: 15,
  },

  emptyText: {
    color: '#0f562a',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 16,
    fontWeight: '600',
  },

  itemWrapper: {
    marginBottom: 14,
    borderRadius: 16,
    overflow: 'hidden',
  },

  itemTitleBar: {
    minHeight: 66,
    backgroundColor: '#0f562a',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f9bf3a',
  },

  titleLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#f9bf3a',
  },

  itemTitle: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '800',
  },

  plusIcon: {
    color: '#f9bf3a',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 10,
    width: 28,
    textAlign: 'center',
  },

  detailsBox: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    padding: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#0f562a',
  },

  detailsImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  itemDescription: {
    color: '#333333',
    textAlign: 'justify',
  },
});