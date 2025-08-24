import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Cloud, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Settings, Wifi } from 'lucide-react-native';

export default function CloudTab() {
  const [isConnected, setIsConnected] = useState(false);
  const [autoUpload, setAutoUpload] = useState(true);
  const [uploadQuality, setUploadQuality] = useState('high');

  const handleConnect = () => {
    Alert.alert(
      'Connect Cloud Service',
      'Choose your preferred cloud storage provider:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Google Drive', onPress: () => connectToService('Google Drive') },
        { text: 'Google Photos', onPress: () => connectToService('Google Photos') },
      ]
    );
  };

  const connectToService = (service: string) => {
    // In a real app, this would handle OAuth authentication
    Alert.alert(
      'Authentication Required',
      `Please sign in to your ${service} account to continue.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign In', 
          onPress: () => {
            setIsConnected(true);
            Alert.alert('Connected!', `Successfully connected to ${service}`);
          }
        },
      ]
    );
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Cloud Service',
      'Are you sure you want to disconnect? This will stop automatic uploads.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Disconnect', 
          style: 'destructive',
          onPress: () => {
            setIsConnected(false);
            Alert.alert('Disconnected', 'Cloud service has been disconnected');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cloud Storage</Text>
        <Text style={styles.subtitle}>Manage your cloud backup settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.connectionCard}>
          <View style={styles.connectionHeader}>
            <Cloud size={32} color={isConnected ? '#4CAF50' : '#757575'} />
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionTitle}>
                {isConnected ? 'Google Drive Connected' : 'No Service Connected'}
              </Text>
              <Text style={styles.connectionSubtitle}>
                {isConnected 
                  ? 'Ready to backup your files' 
                  : 'Connect a cloud service to start backing up'
                }
              </Text>
            </View>
            {isConnected ? (
              <CheckCircle size={24} color="#4CAF50" />
            ) : (
              <AlertCircle size={24} color="#FF9800" />
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.connectButton, isConnected && styles.disconnectButton]}
            onPress={isConnected ? handleDisconnect : handleConnect}
          >
            <Text style={[styles.connectButtonText, isConnected && styles.disconnectButtonText]}>
              {isConnected ? 'Disconnect' : 'Connect Service'}
            </Text>
          </TouchableOpacity>
        </View>

        {isConnected && (
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Backup Settings</Text>
            
            <View style={styles.settingCard}>
              <View style={styles.settingHeader}>
                <Wifi size={24} color="#2196F3" />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Auto Upload</Text>
                  <Text style={styles.settingDescription}>
                    Automatically upload archives when connected to Wi-Fi
                  </Text>
                </View>
                <Switch
                  value={autoUpload}
                  onValueChange={setAutoUpload}
                  trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
                  thumbColor={autoUpload ? '#2196F3' : '#9E9E9E'}
                />
              </View>
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingHeader}>
                <Settings size={24} color="#2196F3" />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Upload Quality</Text>
                  <Text style={styles.settingDescription}>
                    Choose compression level for uploads
                  </Text>
                </View>
              </View>
              <View style={styles.qualityOptions}>
                {['high', 'medium', 'low'].map((quality) => (
                  <TouchableOpacity
                    key={quality}
                    style={[
                      styles.qualityOption,
                      uploadQuality === quality && styles.selectedQuality
                    ]}
                    onPress={() => setUploadQuality(quality)}
                  >
                    <Text style={[
                      styles.qualityText,
                      uploadQuality === quality && styles.selectedQualityText
                    ]}>
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {isConnected && (
          <View style={styles.storageInfo}>
            <Text style={styles.sectionTitle}>Storage Usage</Text>
            <View style={styles.storageCard}>
              <View style={styles.storageStats}>
                <Text style={styles.storageLabel}>Used Space:</Text>
                <Text style={styles.storageValue}>2.4 GB / 15 GB</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '16%' }]} />
              </View>
              <View style={styles.storageStats}>
                <Text style={styles.storageLabel}>Archives Stored:</Text>
                <Text style={styles.storageValue}>27 files</Text>
              </View>
            </View>
          </View>
        )}

        {!isConnected && (
          <View style={styles.featuresCard}>
            <Text style={styles.featuresTitle}>Cloud Backup Features</Text>
            <View style={styles.featureList}>
              <View style={styles.feature}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Automatic backup of old files</Text>
              </View>
              <View style={styles.feature}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Secure encryption in transit</Text>
              </View>
              <View style={styles.feature}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Verify uploads with checksums</Text>
              </View>
              <View style={styles.feature}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Easy recovery of archived files</Text>
              </View>
            </View>
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
    backgroundColor: '#009688',
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
  connectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    marginBottom: 16,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  connectionSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  connectButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disconnectButton: {
    backgroundColor: '#F44336',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disconnectButtonText: {
    color: 'white',
  },
  settingsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
  },
  qualityOptions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  qualityOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  selectedQuality: {
    backgroundColor: '#2196F3',
  },
  qualityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  selectedQualityText: {
    color: 'white',
  },
  storageInfo: {
    marginBottom: 16,
  },
  storageCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 1,
  },
  storageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageLabel: {
    fontSize: 16,
    color: '#757575',
  },
  storageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  featuresCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#757575',
    flex: 1,
  },
});