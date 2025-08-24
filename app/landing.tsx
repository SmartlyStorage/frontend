
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function LandingScreen() {
  const handleConnectGoogleDrive = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="arrow.left" size={24} color="#000" />
        <Text style={styles.headerTitle}>Smartly Storage</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.illustrationContainer}>
        <View style={styles.artFrame}>
          <View style={styles.orangeCircle1} />
          <View style={styles.orangeCircle2} />
          <View style={styles.frameBox}>
            <View style={styles.orangeRect} />
            <View style={styles.plantContainer}>
              <IconSymbol name="leaf.fill" size={60} color="#2D5A3D" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Connect your Google Drive and optimize your storage.</Text>
      </View>

      <TouchableOpacity style={styles.connectButton} onPress={handleConnectGoogleDrive}>
        <Text style={styles.connectButtonText}>Connect Google Drive</Text>
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
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  artFrame: {
    width: 280,
    height: 350,
    backgroundColor: '#F4D4C7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  orangeCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#FF8A50',
    borderRadius: 60,
    top: 20,
    right: 20,
  },
  orangeCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#FF8A50',
    borderRadius: 40,
    bottom: 40,
    left: 20,
  },
  frameBox: {
    width: 140,
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orangeRect: {
    width: '100%',
    height: '70%',
    backgroundColor: '#FF8A50',
    borderRadius: 4,
  },
  plantContainer: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  textContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 32,
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
