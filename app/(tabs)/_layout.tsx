import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(229, 233, 240, 0.5)',
          height: Platform.OS === 'ios' ? 100 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: '#4C6EF5',
        tabBarInactiveTintColor: '#9AA1B9',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Road Map',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="road" 
              size={18} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="extra-tests"
        options={{
          title: 'Extra Tests',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="clipboard-list" 
              size={18} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="handbook"
        options={{
          title: 'Handbook',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="book" 
              size={18} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="chart-bar" 
              size={18} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="cog" 
              size={18} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
