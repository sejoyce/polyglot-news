// components/ArticleCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArticleCard({ article }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>
        {article.language.toUpperCase()} • Level: {article.level}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: '600' },
  meta: { fontSize: 14, color: '#777', marginTop: 4 },
});
