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
import { Clock, Shield, FolderX, Battery, Bell, Trash2, TriangleAlert as AlertTriangle, ChevronRight } from 'lucide-react-native';

export default function SettingsTab() {
  const [archiveThreshold, setArchiveThreshold] = useState(30);
  const [autoDelete, setAutoDelete] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [excludedFolders, setExcludedFolders] = useState([
    'Screenshots',
    'App-private',
    'System',
  ]);

  const thresholdOptions = [
    { value: 7, label: '7 days' },
    { value: 30, label: '30 days' },
    { value: 60, label: '60 days' },
    { value: 90, label: '90 days' },
    { value: 180, label: '6 months' },
  ];

  const handleThresholdChange = (days: number) => {
    setArchiveThreshold(days);
  };

  const handleExcludedFolders = () => {
    Alert.alert(
      'Excluded Folders',
      `Current exclusions:\n\n${excludedFolders.map(folder => `• ${folder}`).join('\n')}\n\nThese folders will never be scanned or archived.`,
      [
        { text: 'OK' },
        { 
          text: 'Manage', 
          onPress: () => {
            Alert.alert('Manage Exclusions', 'This would open folder selection interface');
          }
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to their default values. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setArchiveThreshold(30);
            setAutoDelete(false);
            setNotifications(true);
            setBatteryOptimization(true);
            Alert.alert('Settings Reset', 'All settings have been restored to defaults');
          }
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached scan data. You may need to rescan your device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: () => {
            Alert.alert('Cache Cleared', 'Application cache has been cleared');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your storage optimizer</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#FF9800" />
            <Text style={styles.sectionTitle}>Archive Threshold</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Files older than this will be considered for archiving
          </Text>
          <View style={styles.thresholdOptions}>
            {thresholdOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.thresholdOption,
                  archiveThreshold === option.value && styles.selectedThreshold
                ]}
                onPress={() => handleThresholdChange(option.value)}
              >
                <Text style={[
                  styles.thresholdText,
                  archiveThreshold === option.value && styles.selectedThresholdText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Safety Settings</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto-delete after upload</Text>
              <Text style={styles.settingDescription}>
                Automatically delete files after successful cloud backup
              </Text>
            </View>
            <Switch
              value={autoDelete}
              onValueChange={setAutoDelete}
              trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
              thumbColor={autoDelete ? '#F44336' : '#9E9E9E'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleExcludedFolders}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Excluded Folders</Text>
              <Text style={styles.settingDescription}>
                {excludedFolders.length} folders excluded from scanning
              </Text>
            </View>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                Get notified about scan results and uploads
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={notifications ? '#2196F3' : '#9E9E9E'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Battery size={24} color="#FF9800" />
            <Text style={styles.sectionTitle}>Performance</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Battery Optimization</Text>
              <Text style={styles.settingDescription}>
                Reduce background activity to save battery
              </Text>
            </View>
            <Switch
              value={batteryOptimization}
              onValueChange={setBatteryOptimization}
              trackColor={{ false: '#E0E0E0', true: '#FFE0B2' }}
              thumbColor={batteryOptimization ? '#FF9800' : '#9E9E9E'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color="#F44336" />
            <Text style={styles.sectionTitle}>Advanced</Text>
          </View>
          
          <TouchableOpacity style={styles.dangerButton} onPress={handleClearCache}>
            <Trash2 size={20} color="#F44336" />
            <Text style={styles.dangerButtonText}>Clear Cache</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dangerButton} onPress={handleResetSettings}>
            <AlertTriangle size={20} color="#F44336" />
            <Text style={styles.dangerButtonText}>Reset All Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.version}>
          <Text style={styles.versionText}>Storage Optimizer v1.0.0</Text>
          <Text style={styles.versionText}>Built with React Native & Expo</Text>
        </View>
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
    backgroundColor: '#FF9800',
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
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
    lineHeight: 20,
  },
  thresholdOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  thresholdOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedThreshold: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  thresholdText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  selectedThresholdText: {
    color: 'white',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
    lineHeight: 18,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
    marginVertical: 4,
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
  version: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 2,
  },
});