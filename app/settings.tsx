
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

const SettingItem = ({title, onPress, showChevron = true}: {
  title: string, 
  onPress?: () => void, 
  showChevron?: boolean
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={styles.settingText}>{title}</Text>
    {showChevron && <IconSymbol name="chevron.right" size={16} color="#8E8E93" />}
  </TouchableOpacity>
);

const SettingWithSwitch = ({ title, value, onValueChange }: {title: string, value: boolean, onValueChange: (value: boolean) => void}) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingText}>{title}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
      thumbColor="#FFF"
    />
  </View>
);

export default function SettingsScreen() {
  const [deleteAfterArchiving, setDeleteAfterArchiving] = useState(false);

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account & Cloud */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Cloud</Text>
          <View style={styles.accountCard}>
            <View style={styles.accountInfo}>
              <View style={styles.accountAvatar}>
                <IconSymbol name="person.fill" size={24} color="#FFF" />
              </View>
              <View>
                <Text style={styles.accountName}>Google Account</Text>
                <Text style={styles.accountStatus}>Connected</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.disconnectButton}>
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Storage Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Preferences</Text>
          <View style={styles.settingsCard}>
            <View style={styles.sliderSetting}>
              <Text style={styles.settingText}>Large file threshold</Text>
              <Text style={styles.sliderValue}>100 MB</Text>
            </View>
            <View style={styles.slider} />
          </View>
        </View>

        {/* Archiving Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Archiving Options</Text>
          <View style={styles.settingsCard}>
            <SettingWithSwitch
              title="Delete originals after archiving"
              value={deleteAfterArchiving}
              onValueChange={setDeleteAfterArchiving}
            />
          </View>
        </View>

        {/* App & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App & Privacy</Text>
          <View style={styles.settingsCard}>
          </View>
        </View>

        {/* General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>App version</Text>
              <Text style={styles.versionText}>1.2.3</Text>
            </View>
          </View>
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
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
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
  accountCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4D4C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  accountStatus: {
    fontSize: 14,
    color: '#007AFF',
  },
  disconnectButton: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disconnectText: {
    fontSize: 14,
    color: '#000',
  },
  settingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
  sliderSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sliderValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  slider: {
    height: 4,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 2,
    position: 'relative',
  },
  versionText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
