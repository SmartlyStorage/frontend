
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const handleScanStorage = () => {
    router.push('/scan-results');
  };

  const handleSearchFiles = () => {
    router.push('/(tabs)/search');
  };

  const handleViewArchives = () => {
    router.push('/(tabs)/archive');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smartly Storage</Text>
        <TouchableOpacity onPress={handleSettings}>
          <IconSymbol name="gearshape.fill" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Local Storage Card */}
      <View style={styles.storageCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Local Storage</Text>
            <Text style={styles.storageAmount}>128 GB / 256 GB</Text>
            <Text style={styles.storageDesc}>Photos, videos, apps, and more</Text>
          </View>
          <View style={styles.phoneIcon}>
            <IconSymbol name="iphone" size={40} color="#FF8A50" />
          </View>
        </View>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      {/* Cloud Storage Card */}
      <View style={styles.storageCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Cloud Storage</Text>
            <Text style={styles.storageAmount}>15 GB / 15 GB</Text>
            <Text style={styles.storageDesc}>Files, documents, backups, and more</Text>
          </View>
          <View style={styles.cloudIcon}>
            <IconSymbol name="icloud.fill" size={40} color="#FFF" />
          </View>
        </View>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      {/* Potential Savings */}
      <View style={styles.savingsCard}>
        <View style={styles.folderIcon}>
          <IconSymbol name="folder.fill" size={60} color="#FFF" />
        </View>
        <Text style={styles.savingsTitle}>Potential Savings</Text>
        <Text style={styles.savingsAmount}>15 GB</Text>
        <Text style={styles.savingsDesc}>Identify and archive large or duplicate files to free up space.</Text>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.reviewButtonText}>Review & Archive</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleScanStorage}>
            <Text style={styles.actionButtonText}>Scan Storage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSearchFiles}>
            <Text style={styles.actionButtonText}>Search Files</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.archiveButton} onPress={handleViewArchives}>
          <Text style={styles.archiveButtonText}>View Archives</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  storageCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  storageAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  storageDesc: {
    fontSize: 14,
    color: '#8E8E93',
  },
  phoneIcon: {
    backgroundColor: '#F4D4C7',
    borderRadius: 8,
    padding: 12,
  },
  cloudIcon: {
    backgroundColor: '#2D5A3D',
    borderRadius: 8,
    padding: 12,
  },
  viewDetailsButton: {
    marginBottom: 12,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#007AFF',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  savingsCard: {
    backgroundColor: '#2D5A3D',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  folderIcon: {
    marginBottom: 16,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  savingsDesc: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  reviewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  reviewButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#E5E5EA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
  },
  archiveButton: {
    backgroundColor: '#E5E5EA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  archiveButtonText: {
    fontSize: 14,
    color: '#000',
  },
});
