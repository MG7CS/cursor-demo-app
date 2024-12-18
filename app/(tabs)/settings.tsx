import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuthStore } from '@/src/stores/auth';
import { useState } from 'react';

interface SettingItem {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5['glyphMap'];
  type: 'toggle' | 'link' | 'button';
  value?: boolean;
  onPress?: () => void;
  description?: string;
  color?: string;
}

interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

export default function SettingsScreen() {
  const logout = useAuthStore((state) => state.logout);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const settingSections: SettingSection[] = [
    {
      id: '1',
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          icon: 'bell',
          type: 'toggle',
          value: notifications,
          onPress: () => setNotifications(!notifications),
          description: 'Receive reminders and updates',
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          icon: 'moon',
          type: 'toggle',
          value: darkMode,
          onPress: () => setDarkMode(!darkMode),
          description: 'Switch between light and dark theme',
        },
        {
          id: 'offlineMode',
          title: 'Offline Mode',
          icon: 'cloud-download-alt',
          type: 'toggle',
          value: offlineMode,
          onPress: () => setOfflineMode(!offlineMode),
          description: 'Download content for offline use',
        },
      ],
    },
    {
      id: '2',
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          icon: 'user-edit',
          type: 'link',
          description: 'Update your personal information',
        },
        {
          id: 'password',
          title: 'Change Password',
          icon: 'lock',
          type: 'link',
          description: 'Update your security credentials',
        },
        {
          id: 'language',
          title: 'Language',
          icon: 'language',
          type: 'link',
          description: 'Change app language',
        },
      ],
    },
    {
      id: '3',
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          icon: 'question-circle',
          type: 'link',
          description: 'FAQs and support resources',
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          icon: 'comment-alt',
          type: 'link',
          description: 'Help us improve the app',
        },
        {
          id: 'about',
          title: 'About',
          icon: 'info-circle',
          type: 'link',
          description: 'App version and information',
        },
      ],
    },
    {
      id: '4',
      title: 'Account Actions',
      items: [
        {
          id: 'logout',
          title: 'Log Out',
          icon: 'sign-out-alt',
          type: 'button',
          onPress: logout,
          color: '#DC3545',
        },
      ],
    },
  ];

  function renderSettingItem(item: SettingItem) {
    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.settingItem,
          pressed && item.type === 'link' && styles.settingItemPressed,
        ]}
        onPress={item.onPress}
      >
        <View style={styles.settingItemContent}>
          <View style={[styles.iconContainer, item.color && { backgroundColor: `${item.color}15` }]}>
            <FontAwesome5
              name={item.icon}
              size={16}
              color={item.color || '#4C6EF5'}
            />
          </View>
          <View style={styles.settingItemText}>
            <Text style={[styles.settingItemTitle, item.color && { color: item.color }]}>
              {item.title}
            </Text>
            {item.description && (
              <Text style={styles.settingItemDescription}>{item.description}</Text>
            )}
          </View>
        </View>
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#D1D1D1', true: '#4C6EF5' }}
            thumbColor="#FFFFFF"
          />
        )}
        {item.type === 'link' && (
          <FontAwesome5
            name="chevron-right"
            size={16}
            color="#9AA1B9"
          />
        )}
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingSections.map(section => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2E3A59',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C566A',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  settingItemPressed: {
    backgroundColor: '#F8F9FB',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingItemText: {
    flex: 1,
    marginRight: 12,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2E3A59',
    marginBottom: 4,
  },
  settingItemDescription: {
    fontSize: 13,
    color: '#9AA1B9',
  },
  version: {
    textAlign: 'center',
    color: '#9AA1B9',
    fontSize: 13,
    marginTop: 24,
    marginBottom: 16,
  },
}); 