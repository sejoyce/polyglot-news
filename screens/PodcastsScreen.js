/*import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, StyleSheet } from 'react-native';
import { getItem } from '../utils/storage';
import { fetchArticlesFromFeed } from '../utils/rss';

const podcastFeeds = {
  'https://rss.dw.com/rdf/rss-de-langsam': 'DW German Slow',
  'https://feeds.npr.org/500005/podcast.xml': 'NPR News Now',
};

export default function PodcastsScreen() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await Promise.all(Object.entries(podcastFeeds).map(async ([url, name]) => {
        const items = await fetchArticlesFromFeed(url);
        return items.map(ep => ({ ...ep, source: name }));
      }));
      setEpisodes(all.flat());
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Podcasts</Text>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.episode} onPress={() => Linking.openURL(item.link)}>
            🎙 {item.source} — {item.title}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  episode: {
    fontSize: 16,
    marginBottom: 10,
    textDecorationLine: 'underline',
    color: '#1e90ff',
  },
});*/