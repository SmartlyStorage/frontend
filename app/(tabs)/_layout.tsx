import { Tabs } from 'expo-router';
import { Camera, Archive, Settings, Cloud } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ size, color }) => (
            <Camera size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="archives"
        options={{
          title: 'Archives',
          tabBarIcon: ({ size, color }) => (
            <Archive size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cloud"
        options={{
          title: 'Cloud',
          tabBarIcon: ({ size, color }) => (
            <Cloud size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}