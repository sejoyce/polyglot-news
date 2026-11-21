import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { fetchTodaysArticles } from '../utils/rss.js';
import { SubscriptionContext } from '../context/SubscriptionContext.js';

export default function HomeScreen() {
  const { subscriptions } = useContext(SubscriptionContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (subscriptions.length === 0) {
      setArticles([]);
      return;
    }

    fetchTodaysArticles(subscriptions).then(setArticles);
  }, [subscriptions]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's News</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={styles.card}>
              <Text style={styles.source}>{item.source}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.pubDate ? new Date(item.pubDate).toLocaleString() : ''}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {subscriptions.length === 0
              ? 'You have no subscriptions yet.'
              : "No articles from your subscribed sources today."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#c4dec3' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  source: { fontSize: 14, fontWeight: '600', color: '#555' },
  title: { fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  date: { fontSize: 12, color: '#777' },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});