import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

export const MediaScanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Search size={32} color="#2196F3" />
      <Text style={styles.title}>Media Scanner</Text>
      <Text style={styles.description}>
        Scanning device for photos and videos...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});