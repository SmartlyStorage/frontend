
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

const mockSearchResults = {
  device: [
    { id: 1, name: 'Vacation photos', size: '12 MB', type: 'Image', icon: 'photo.fill', color: '#007AFF' },
    { id: 2, name: 'Family gathering', size: '5 MB', type: 'Video', icon: 'play.rectangle.fill', color: '#FF8A50' },
  ],
  googleDrive: [
    { id: 3, name: 'Project report', size: '20 MB', type: 'Document', icon: 'doc.text.fill', color: '#2D5A3D' },
    { id: 4, name: 'Sales pitch', size: '8 MB', type: 'Presentation', icon: 'doc.text.fill', color: '#FF8A50' },
  ],
  archives: [
    { id: 5, name: 'Old memories', size: '15 MB', type: 'Image', icon: 'photo.fill', color: '#007AFF' },
  ],
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('Photos');

  const handleBack = () => {
    router.back();
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderFileItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.fileItem}>
      <View style={[styles.fileIcon, { backgroundColor: item.color }]}>
        <IconSymbol name={item.icon} size={24} color="#FFF" />
      </View>
      <View style={styles.fileDetails}>
        <Text style={styles.fileName}>{item.name}</Text>
        <Text style={styles.fileInfo}>{item.size} • {item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconSymbol name="arrow.left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search files..."
            placeholderTextColor="#8E8E93"
          />
          {searchQuery && (
            <TouchableOpacity onPress={clearSearch}>
              <IconSymbol name="xmark.circle.fill" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>File type</Text>
          <IconSymbol name="chevron.down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Size</Text>
          <IconSymbol name="chevron.down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Date</Text>
          <IconSymbol name="chevron.down" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device</Text>
          <FlatList
            data={mockSearchResults.device}
            renderItem={renderFileItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Google Drive</Text>
          <FlatList
            data={mockSearchResults.googleDrive}
            renderItem={renderFileItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Archives</Text>
          <FlatList
            data={mockSearchResults.archives}
            renderItem={renderFileItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  resultsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  fileInfo: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
