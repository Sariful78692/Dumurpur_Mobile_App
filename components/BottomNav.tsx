import React from 'react';
import { useRouter } from 'expo-router';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BottomNavProps = {
  activeTab: 'home' | 'book' | 'about' | 'contact' | 'location';
};

const items = [
  { label: 'Home', route: '/', icon: '⌂', key: 'home', color: '#f9bf3a', action: 'route' },
  { label: 'PDF Book', route: '/library', icon: '📖', key: 'book', color: '#58c2ff', action: 'route' },
  { label: 'About', route: '/about', icon: 'ℹ', key: 'about', color: '#7ee081', action: 'route' },
  { label: 'Location', route: 'https://maps.app.goo.gl/m7EBbzA2Rwksh6oA7?g_st=ac', icon: '📍', key: 'location', color: '#ff7a59', action: 'link' },
  { label: 'Contact', route: '/contact', icon: '✉', key: 'contact', color: '#ffb703', action: 'route' },
] as const;

const BottomNav = ({ activeTab }: BottomNavProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeTab;

        const handlePress = async () => {
          if (item.action === 'link') {
            await Linking.openURL(item.route);
            return;
          }
          router.push(item.route as never);
        };

        return (
          <TouchableOpacity
            key={item.label}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.8}
            onPress={handlePress}
          >
            <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
              <Text style={[styles.icon, { color: item.color }, isActive && styles.activeText]}>{item.icon}</Text>
            </View>
            <Text style={[styles.label, { color: isActive ? item.color : '#f5f5f5' }]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 86, 42, 0.96)',
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
  },
  activeText: {
    color: '#f9bf3a',
  },
});
