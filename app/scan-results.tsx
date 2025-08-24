
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

const mockFiles = [
  {
    id: 1,
    name: 'Report.pdf',
    tag: 'Documents',
    size: '12 MB',
    lastAccessed: '2023-08-15',
    icon: 'doc.text.fill',
    color: '#2D5A3D',
  },
  {
    id: 2,
    name: 'Vacation Photos',
    tag: 'Images',
    size: '8 MB',
    lastAccessed: '2023-07-22',
    icon: 'photo.fill',
    color: '#007AFF',
  },
  {
    id: 3,
    name: 'Family Video',
    tag: 'Videos',
    size: '5 MB',
    lastAccessed: '2023-06-10',
    icon: 'play.rectangle.fill',
    color: '#FF8A50',
  },
  {
    id: 4,
    name: 'Meeting Recording',
    tag: 'Audio',
    size: '3 MB',
    lastAccessed: '2023-05-05',
    icon: 'mic.fill',
    color: '#FF8A50',
  },
];

export default function ScanResultsScreen() {
  const [selectedTab, setSelectedTab] = useState('Large Files');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const handleBack = () => {
    router.back();
  };

  const handleCompressArchive = () => {
    router.push('/archiving-loader');
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const renderFileItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.fileItem}
      onPress={() => toggleFileSelection(item.id)}
    >
      <View style={styles.fileInfo}>
        <View style={[styles.fileIcon, { backgroundColor: item.color }]}>
          <IconSymbol name={item.icon} size={24} color="#FFF" />
        </View>
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{item.name}</Text>
          <Text style={styles.fileTag}>AI Tag: {item.tag}</Text>
          <Text style={styles.fileSize}>{item.size} • Last accessed {item.lastAccessed}</Text>
        </View>
      </View>
      <View style={[
        styles.checkbox,
        selectedFiles.includes(item.id) && styles.checkboxSelected
      ]}>
        {selectedFiles.includes(item.id) && (
          <IconSymbol name="checkmark" size={16} color="#FFF" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconSymbol name="arrow.left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        {['Large Files', 'Unused', 'All'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={mockFiles}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.fileList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.compressButton} onPress={handleCompressArchive}>
        <Text style={styles.compressButtonText}>Compress & Archive</Text>
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFF',
  },
  tabText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  fileList: {
    flex: 1,
    marginBottom: 20,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    width: 48,
    height: 48,
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
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  fileTag: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#8E8E93',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  compressButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  compressButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
