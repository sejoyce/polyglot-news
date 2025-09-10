// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to store:', key, e);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Failed to load:', key, e);
    return null;
  }
};