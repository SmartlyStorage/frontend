import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Search, Folder, Image, Video } from 'lucide-react-native';

export const ScanProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentFolder, setCurrentFolder] = useState('DCIM/Camera');
  const [stats, setStats] = useState({
    folders: 0,
    photos: 0,
    videos: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        
        const newProgress = prev + 2;
        
        // Update current folder being scanned
        if (newProgress < 25) {
          setCurrentFolder('DCIM/Camera');
        } else if (newProgress < 50) {
          setCurrentFolder('Pictures');
        } else if (newProgress < 75) {
          setCurrentFolder('Downloads');
        } else {
          setCurrentFolder('WhatsApp/Media');
        }

        // Update stats
        setStats({
          folders: Math.floor(newProgress / 25) + 1,
          photos: Math.floor(newProgress * 8.9),
          videos: Math.floor(newProgress * 0.45),
        });

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Search size={48} color="#2196F3" />
      <Text style={styles.title}>Scanning Device...</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
      </View>

      <Text style={styles.currentFolder}>
        Currently scanning: {currentFolder}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Folder size={20} color="#FF9800" />
          <Text style={styles.statValue}>{stats.folders}</Text>
          <Text style={styles.statLabel}>Folders</Text>
        </View>
        <View style={styles.stat}>
          <Image size={20} color="#4CAF50" />
          <Text style={styles.statValue}>{stats.photos}</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
        <View style={styles.stat}>
          <Video size={20} color="#F44336" />
          <Text style={styles.statValue}>{stats.videos}</Text>
          <Text style={styles.statLabel}>Videos</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginTop: 12,
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  currentFolder: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
});