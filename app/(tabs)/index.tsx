import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Search, FolderOpen, Calendar, HardDrive } from 'lucide-react-native';
import { MediaScanner } from '@/components/MediaScanner';
import { ScanProgress } from '@/components/ScanProgress';
import { MediaFile, ScanResult } from '@/types/media';

export default function ScannerTab() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const startScan = async () => {
    setIsScanning(true);
    try {
      // In a real app, this would access device storage
      // For now, we'll simulate the scanning process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: ScanResult = {
        totalFiles: 1234,
        totalSize: 5.8 * 1024 * 1024 * 1024, // 5.8 GB
        oldFiles: 456,
        oldFilesSize: 2.3 * 1024 * 1024 * 1024, // 2.3 GB
        folders: [
          { name: 'DCIM/Camera', count: 892, size: 4.2 * 1024 * 1024 * 1024 },
          { name: 'Pictures', count: 234, size: 0.8 * 1024 * 1024 * 1024 },
          { name: 'Downloads', count: 78, size: 0.5 * 1024 * 1024 * 1024 },
          { name: 'WhatsApp/Media', count: 30, size: 0.3 * 1024 * 1024 * 1024 },
        ],
      };
      
      setScanResult(mockResult);
    } catch (error) {
      Alert.alert('Scan Error', 'Failed to scan device storage');
    } finally {
      setIsScanning(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (scanResult) {
      await startScan();
    }
    setRefreshing(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Storage Optimizer</Text>
        <Text style={styles.subtitle}>Scan and manage your media files</Text>
      </View>

      {!scanResult && !isScanning && (
        <View style={styles.scanPrompt}>
          <HardDrive size={64} color="#2196F3" />
          <Text style={styles.promptTitle}>Ready to Optimize</Text>
          <Text style={styles.promptText}>
            Scan your device for photos and videos that can be archived to free up space
          </Text>
          <TouchableOpacity style={styles.scanButton} onPress={startScan}>
            <Search size={20} color="white" />
            <Text style={styles.scanButtonText}>Start Scan</Text>
          </TouchableOpacity>
        </View>
      )}

      {isScanning && <ScanProgress />}

      {scanResult && !isScanning && (
        <View style={styles.results}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Scan Results</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Files:</Text>
              <Text style={styles.summaryValue}>{scanResult.totalFiles.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Size:</Text>
              <Text style={styles.summaryValue}>{formatBytes(scanResult.totalSize)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: '#FF9800' }]}>Files to Archive:</Text>
              <Text style={[styles.summaryValue, { color: '#FF9800' }]}>{scanResult.oldFiles.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: '#FF9800' }]}>Space to Free:</Text>
              <Text style={[styles.summaryValue, { color: '#FF9800' }]}>{formatBytes(scanResult.oldFilesSize)}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Folders Scanned</Text>
          {scanResult.folders.map((folder, index) => (
            <View key={index} style={styles.folderCard}>
              <View style={styles.folderHeader}>
                <FolderOpen size={24} color="#2196F3" />
                <View style={styles.folderInfo}>
                  <Text style={styles.folderName}>{folder.name}</Text>
                  <Text style={styles.folderStats}>
                    {folder.count.toLocaleString()} files • {formatBytes(folder.size)}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.processButton}>
            <Calendar size={20} color="white" />
            <Text style={styles.processButtonText}>Process Old Files</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: '#2196F3',
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
  scanPrompt: {
    alignItems: 'center',
    padding: 32,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 16,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  results: {
    padding: 16,
  },
  summaryCard: {
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    marginTop: 8,
  },
  folderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  folderStats: {
    fontSize: 14,
    color: '#757575',
  },
  processButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  processButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});