import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

interface LessonSection {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

const BASIC_CONTROLS_SECTIONS: LessonSection[] = [
  {
    id: '1',
    title: 'Steering Wheel',
    content: 'Learn the proper hand positions and steering techniques for safe driving.',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Pedal Control',
    content: 'Master the three pedals: accelerator, brake, and clutch (for manual transmission).',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Gear Shifting',
    content: 'Understanding gear patterns and when to shift for optimal vehicle control.',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Dashboard Indicators',
    content: 'Learn to read and understand essential dashboard warning lights and indicators.',
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Mirror Adjustment',
    content: 'Proper positioning of rear-view and side mirrors for maximum visibility.',
    isCompleted: false,
  }
];

const TRAFFIC_RULES_SECTIONS: LessonSection[] = [
  {
    id: '1',
    title: 'Traffic Signs',
    content: 'Learn to identify and respond to regulatory, warning, and guide signs.',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Right of Way',
    content: 'Understand who has priority at intersections, roundabouts, and merging situations.',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Speed Limits',
    content: 'Master speed regulations for different road types and conditions.',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Traffic Signals',
    content: 'Understand traffic lights, lane signals, and hand signals from authorities.',
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Road Markings',
    content: 'Learn about lane markings, stop lines, crosswalks, and other road symbols.',
    isCompleted: false,
  },
  {
    id: '6',
    title: 'Special Zones',
    content: 'Navigate school zones, construction areas, and emergency vehicle protocols.',
    isCompleted: false,
  }
];

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const sections = id === '2' ? TRAFFIC_RULES_SECTIONS : BASIC_CONTROLS_SECTIONS;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#2E3A59" />
        </Pressable>
        <Text style={styles.title}>Basic Controls</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Master the fundamental controls of your vehicle to build a strong foundation for safe driving.
        </Text>

        {sections.map((section, index) => (
          <Pressable
            key={section.id}
            style={({ pressed }) => [
              styles.sectionCard,
              pressed && styles.sectionCardPressed
            ]}
            onPress={() => router.push(`/lesson/${id}/section/${section.id}`)}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNumberContainer}>
                <Text style={styles.sectionNumber}>{index + 1}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDescription}>{section.content}</Text>
              </View>
              <View>
                {section.isCompleted ? (
                  <FontAwesome5 name="check-circle" size={20} color="#40C057" solid />
                ) : (
                  <FontAwesome5 name="chevron-right" size={16} color="#9AA1B9" />
                )}
              </View>
            </View>
          </Pressable>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  description: {
    fontSize: 16,
    color: '#4C566A',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionCardPressed: {
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sectionNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C6EF5',
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#4C566A',
  },
}); 