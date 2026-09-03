import AsyncStorage from '@react-native-async-storage/async-storage';
export async function readCache<T>(key: string): Promise<T | null> { try { const value = await AsyncStorage.getItem(key); return value ? JSON.parse(value) : null; } catch { return null; } }
export async function writeCache(key: string, value: unknown) { try { await AsyncStorage.setItem(key, JSON.stringify(value)); } catch {} }
