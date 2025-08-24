
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

const mockArchives = [
  {
    id: 1,
    name: 'Photos from 2023',
    size: '1.2 GB',
    date: '2024-01-15',
    files: '12 files',
  },
  {
    id: 2,
    name: 'Old Documents',
    size: '850 MB',
    date: '2023-12-20',
    files: '8 files',
  },
  {
    id: 3,
    name: 'Project X Files',
    size: '500 MB',
    date: '2023-11-10',
    files: '5 files',
  },
  {
    id: 4,
    name: 'Videos from Trip to Italy',
    size: '2.5 GB',
    date: '2023-10-05',
    files: '25 files',
  },
  {
    id: 5,
    name: 'Financial Records',
    size: '300 MB',
    date: '2023-09-15',
    files: '3 files',
  },
];

export default function ArchiveScreen() {
  const handleBack = () => {
    router.back();
  };

  const renderArchiveItem = (archive: any) => (
    <TouchableOpacity key={archive.id} style={styles.archiveItem}>
      <View style={styles.archiveInfo}>
        <Text style={styles.archiveName}>{archive.name}</Text>
        <Text style={styles.archiveDetails}>
          {archive.size} • {archive.date} • {archive.files}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>•••</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconSymbol name="arrow.left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Archive</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Archived files</Text>
        
        {mockArchives.map(renderArchiveItem)}
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
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  archiveItem: {
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
  archiveInfo: {
    flex: 1,
  },
  archiveName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  archiveDetails: {
    fontSize: 14,
    color: '#8E8E93',
  },
  moreButton: {
    padding: 8,
  },
  moreText: {
    fontSize: 20,
    color: '#8E8E93',
    fontWeight: 'bold',
  },
});
