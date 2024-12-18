import { View, ScrollView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoadmapItem } from '@/src/components/RoadmapItem';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';

interface LevelInfo {
  currentLevel: number;
  totalLessons: number;
  completedLessons: number;
  streakDays: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  progress: number;
  isActive: boolean;
  isLocked: boolean;
}

export default function HomeScreen() {
  const router = useRouter();
  const [levelInfo, setLevelInfo] = useState<LevelInfo>({
    currentLevel: 2,
    totalLessons: 32,
    completedLessons: 7,
    streakDays: 5,
  });

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: "Basic Controls",
      description: "Learn about steering, pedals, and basic car controls",
      progress: 1,
      isActive: false,
      isLocked: false,
    },
    {
      id: '2',
      title: "Traffic Rules",
      description: "Master essential traffic signs and regulations",
      progress: 0.6,
      isActive: true,
      isLocked: false,
    },
    {
      id: '3',
      title: "Parking Techniques",
      description: "Practice different parking methods and maneuvers",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '4',
      title: "City Driving",
      description: "Navigate urban traffic, intersections, and busy streets",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '5',
      title: "Highway Driving",
      description: "Master merging, lane changes, and highway safety",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '6',
      title: "Night Driving",
      description: "Learn techniques for safe driving in low-light conditions",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '7',
      title: "Adverse Weather",
      description: "Handle rain, snow, fog, and difficult weather conditions",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '8',
      title: "Emergency Maneuvers",
      description: "Practice emergency braking and evasive techniques",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '9',
      title: "Vehicle Maintenance",
      description: "Learn basic car maintenance and safety checks",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '10',
      title: "Eco-Driving",
      description: "Master fuel-efficient driving techniques",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '11',
      title: "Defensive Driving",
      description: "Anticipate and avoid potential hazards on the road",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '12',
      title: "Advanced Maneuvers",
      description: "Learn advanced driving techniques and skills",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '13',
      title: "Road Trip Planning",
      description: "Prepare for long-distance driving and journey planning",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '14',
      title: "Sharing the Road",
      description: "Interact safely with cyclists, pedestrians, and trucks",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '15',
      title: "Insurance & Documentation",
      description: "Understand driving laws, insurance, and required documents",
      progress: 0,
      isActive: false,
      isLocked: true,
    },
    {
      id: '16',
      title: "Test Preparation",
      description: "Final preparation for your driving test",
      progress: 0,
      isActive: false,
      isLocked: true,
    }
  ]);

  const [sortOrder, setSortOrder] = useState<'default' | 'progress' | 'locked'>('default');

  const handleLessonPress = useCallback((lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;

    if (lesson.isLocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        "Lesson Locked",
        "Complete the previous lessons to unlock this one.",
        [{ text: "OK" }]
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/lesson/${lessonId}`);
  }, [lessons, router]);

  const handleFilterPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "Sort Lessons",
      "Choose sorting order",
      [
        {
          text: "Default",
          onPress: () => setSortOrder('default'),
        },
        {
          text: "By Progress",
          onPress: () => setSortOrder('progress'),
        },
        {
          text: "Show Locked Last",
          onPress: () => setSortOrder('locked'),
        },
      ]
    );
  }, []);

  const sortedLessons = useCallback(() => {
    switch (sortOrder) {
      case 'progress':
        return [...lessons].sort((a, b) => b.progress - a.progress);
      case 'locked':
        return [...lessons].sort((a, b) => {
          if (a.isLocked === b.isLocked) return 0;
          return a.isLocked ? 1 : -1;
        });
      default:
        return lessons;
    }
  }, [lessons, sortOrder]);

  const handleStatsPress = useCallback((statType: 'level' | 'lessons' | 'streak') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    switch (statType) {
      case 'level':
        router.push('/statistics?tab=level');
        break;
      case 'lessons':
        router.push('/statistics?tab=lessons');
        break;
      case 'streak':
        router.push('/statistics?tab=streak');
        break;
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Pressable 
          style={styles.statsCard}
          onPress={() => handleStatsPress('level')}
        >
          <View style={styles.statsIconContainer}>
            <FontAwesome5 name="layer-group" size={20} color="#4C6EF5" />
          </View>
          <View>
            <Text style={styles.statsValue}>Level {levelInfo.currentLevel}</Text>
            <Text style={styles.statsLabel}>Current Level</Text>
          </View>
        </Pressable>

        <Pressable 
          style={styles.statsCard}
          onPress={() => handleStatsPress('lessons')}
        >
          <View style={[styles.statsIconContainer, { backgroundColor: '#E9FAF1' }]}>
            <FontAwesome5 name="check-circle" size={20} color="#40C057" />
          </View>
          <View>
            <Text style={styles.statsValue}>{levelInfo.completedLessons}/{levelInfo.totalLessons}</Text>
            <Text style={styles.statsLabel}>Lessons Done</Text>
          </View>
        </Pressable>

        <Pressable 
          style={styles.statsCard}
          onPress={() => handleStatsPress('streak')}
        >
          <View style={[styles.statsIconContainer, { backgroundColor: '#FFF4E6' }]}>
            <FontAwesome5 name="fire" size={20} color="#F59F00" />
          </View>
          <View>
            <Text style={styles.statsValue}>{levelInfo.streakDays} Days</Text>
            <Text style={styles.statsLabel}>Study Streak</Text>
          </View>
        </Pressable>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.roadmapContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Learning Path</Text>
          <Pressable 
            style={styles.filterButton}
            onPress={handleFilterPress}
          >
            <FontAwesome5 name="sliders-h" size={16} color="#4C6EF5" />
          </Pressable>
        </View>
        
        {sortedLessons().map((lesson) => (
          <RoadmapItem
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            progress={lesson.progress}
            isActive={lesson.isActive}
            isLocked={lesson.isLocked}
            onPress={() => handleLessonPress(lesson.id)}
          />
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    gap: 8,
    opacity: 1,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E3A59',
    textAlign: 'center',
  },
  statsLabel: {
    fontSize: 12,
    color: '#4C566A',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  roadmapContainer: {
    padding: 20,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    letterSpacing: -0.3,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
