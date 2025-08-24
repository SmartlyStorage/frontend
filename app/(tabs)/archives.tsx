import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Package, Download, Trash2, Eye, Calendar } from 'lucide-react-native';
import { ArchiveItem } from '@/types/media';

export default function ArchivesTab() {
  const [archives] = useState<ArchiveItem[]>([
    {
      id: '1',
      name: 'Photos_Dec_2024.zip',
      fileCount: 234,
      size: 1.2 * 1024 * 1024 * 1024,
      createdDate: new Date('2024-12-15'),
      uploadStatus: 'completed',
      cloudPath: '/archives/2024/Photos_Dec_2024.zip',
    },
    {
      id: '2',
      name: 'Videos_Nov_2024.zip',
      fileCount: 45,
      size: 2.8 * 1024 * 1024 * 1024,
      createdDate: new Date('2024-11-30'),
      uploadStatus: 'completed',
      cloudPath: '/archives/2024/Videos_Nov_2024.zip',
    },
    {
      id: '3',
      name: 'Camera_Oct_2024.zip',
      fileCount: 189,
      size: 890 * 1024 * 1024,
      createdDate: new Date('2024-10-28'),
      uploadStatus: 'uploading',
      cloudPath: '/archives/2024/Camera_Oct_2024.zip',
    },
  ]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'uploading':
        return '#FF9800';
      case 'failed':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const handleDownload = (archive: ArchiveItem) => {
    Alert.alert(
      'Download Archive',
      `Download ${archive.name} (${formatBytes(archive.size)}) from cloud storage?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => {
          // Implementation would download from cloud
          Alert.alert('Download Started', 'Archive download has begun');
        }},
      ]
    );
  };

  const handlePreview = (archive: ArchiveItem) => {
    Alert.alert(
      'Archive Contents',
      `${archive.name} contains ${archive.fileCount} files.\n\nThis would show a preview of files in the archive.`
    );
  };

  const handleDelete = (archive: ArchiveItem) => {
    Alert.alert(
      'Delete Archive',
      `Are you sure you want to delete ${archive.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Archive Deleted', 'The archive has been removed from cloud storage');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Archive Manager</Text>
        <Text style={styles.subtitle}>Browse and manage your archived files</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Archive Summary</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Archives:</Text>
            <Text style={styles.statValue}>{archives.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Size:</Text>
            <Text style={styles.statValue}>
              {formatBytes(archives.reduce((sum, archive) => sum + archive.size, 0))}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Files Archived:</Text>
            <Text style={styles.statValue}>
              {archives.reduce((sum, archive) => sum + archive.fileCount, 0).toLocaleString()}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Archives</Text>

        {archives.map((archive) => (
          <View key={archive.id} style={styles.archiveCard}>
            <View style={styles.archiveHeader}>
              <Package size={24} color="#2196F3" />
              <View style={styles.archiveInfo}>
                <Text style={styles.archiveName}>{archive.name}</Text>
                <Text style={styles.archiveDetails}>
                  {archive.fileCount.toLocaleString()} files • {formatBytes(archive.size)}
                </Text>
                <View style={styles.archiveMeta}>
                  <Calendar size={14} color="#757575" />
                  <Text style={styles.archiveDate}>{formatDate(archive.createdDate)}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(archive.uploadStatus) }]}>
                    <Text style={styles.statusText}>{archive.uploadStatus}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.archiveActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handlePreview(archive)}
              >
                <Eye size={18} color="#2196F3" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDownload(archive)}
                disabled={archive.uploadStatus !== 'completed'}
              >
                <Download 
                  size={18} 
                  color={archive.uploadStatus === 'completed' ? '#4CAF50' : '#BDBDBD'} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(archive)}
              >
                <Trash2 size={18} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {archives.length === 0 && (
          <View style={styles.emptyState}>
            <Package size={64} color="#BDBDBD" />
            <Text style={styles.emptyTitle}>No Archives Yet</Text>
            <Text style={styles.emptyText}>
              Start scanning your device to create your first archive
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#9C27B0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 16,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#757575',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    marginTop: 8,
  },
  archiveCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  archiveHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  archiveInfo: {
    flex: 1,
  },
  archiveName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  archiveDetails: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 6,
  },
  archiveMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  archiveDate: {
    fontSize: 12,
    color: '#757575',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  archiveActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#757575',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 22,
  },
});