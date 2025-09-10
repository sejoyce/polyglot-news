import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SubscriptionContext } from '../context/SubscriptionContext';
import { LanguageContext } from '../context/LanguageContext';

export default function SubscriptionsScreen() {
  const { subscriptions, setSubscriptions } = useContext(SubscriptionContext);
  const { languages } = useContext(LanguageContext);
  const newsSourcesByLanguage = {
    Spanish: [
      { name: 'El País (English)', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/english.elpais.com/portada' },
    ],
    French: [
      { name: 'Le Monde (English)', url: 'https://www.lemonde.fr/en/rss/une.xml' },
    ],
    German: [
      { name: 'Deutsche Welle', url: 'https://rss.dw.com/rdf/rss-en-all' },
    ],
    English: [
      { name: 'New York Times - World', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
    ],
    Chinese: [
      // add Chinese sources
    ],
    Japanese: [
      // add Japanese sources
    ],
  };

  const availableSources = [];
  languages.forEach((lang) => {
    if (newsSourcesByLanguage[lang.language]) {
      availableSources.push(...newsSourcesByLanguage[lang.language]);
    }
  })

  const handleToggleSubscribe = (url) => {
    if (subscriptions.includes(url)) {
      // Unsubscribe
      setSubscriptions((prev = []) => prev.filter((s) => s !== url));
    } else {
      // Subscribe
      setSubscriptions((prev = []) => [...prev, url]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={availableSources}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          const isSubscribed = subscriptions.includes(item.url);
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => handleToggleSubscribe(item.url)}
                style={[styles.button, isSubscribed && styles.unsubscribeButton]}
              >
                <Text style={styles.buttonText}>
                  {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text>No sources available for your selected languages.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '500', flex: 1, marginRight: 10 },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  unsubscribeButton: { 
    backgroundColor: '#ff3b30' 
  }, // red for unsubscribe
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});