import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import * as Haptics from 'expo-haptics';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'What does a red octagonal sign indicate?',
    options: ['Yield', 'Stop', 'Slow Down', 'No Entry'],
    correctAnswer: 1,
  },
  {
    id: '2',
    question: 'Yellow diamond-shaped signs typically indicate:',
    options: ['Directions', 'Services', 'Warning', 'Regulation'],
    correctAnswer: 2,
  },
];

export default function LessonSectionScreen() {
  const { id, sectionId } = useLocalSearchParams<{ id: string; sectionId: string }>();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(-1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const progressValue = useRef(new Animated.Value(0)).current;

  const handleAnswer = (questionIndex: number, selectedAnswer: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (selectedAnswer === QUIZ_QUESTIONS[questionIndex].correctAnswer) {
      setScore(prev => prev + 1);
      // Show success feedback
    }
    
    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(questionIndex + 1);
    } else {
      completeSection();
    }
  };

  const handleStartQuiz = () => {
    router.push(`/lesson/${id}/section/${sectionId}/quiz`);
  };

  const completeSection = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Animated.timing(progressValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Save progress and navigate back
    setTimeout(() => router.back(), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.progressBar, { 
        transform: [{ scaleX: progressValue }] 
      }]} />
      
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={8}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2E3A59" />
        </Pressable>
        <Text style={styles.title}>Traffic Signs</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Understanding Traffic Signs</Text>
        
        <Text style={styles.paragraph}>
          Traffic signs are essential for road safety. They are divided into three main categories:
        </Text>

        <View style={styles.signCategory}>
          <Text style={styles.categoryTitle}>1. Regulatory Signs</Text>
          <Text style={styles.categoryDescription}>
            These signs give orders and must be obeyed. They typically use red and white colors.
          </Text>
          <View style={styles.examples}>
            <View style={styles.signExample}>
              <View style={styles.signPlaceholder}>
                <FontAwesome5 name="stop" size={24} color="#FF4444" />
              </View>
              <Text style={styles.signLabel}>Stop Sign</Text>
            </View>
            <View style={styles.signExample}>
              <View style={styles.signPlaceholder}>
                <FontAwesome5 name="ban" size={24} color="#FF4444" />
              </View>
              <Text style={styles.signLabel}>No Entry</Text>
            </View>
          </View>
        </View>

        <View style={styles.signCategory}>
          <Text style={styles.categoryTitle}>2. Warning Signs</Text>
          <Text style={styles.categoryDescription}>
            These signs alert drivers to potential hazards. They are usually yellow with black symbols.
          </Text>
          <View style={styles.examples}>
            <View style={styles.signExample}>
              <View style={[styles.signPlaceholder, { backgroundColor: '#FFF3BF' }]}>
                <FontAwesome5 name="exclamation-triangle" size={24} color="#FAB005" />
              </View>
              <Text style={styles.signLabel}>Danger Ahead</Text>
            </View>
            <View style={styles.signExample}>
              <View style={[styles.signPlaceholder, { backgroundColor: '#FFF3BF' }]}>
                <FontAwesome5 name="car" size={24} color="#FAB005" />
              </View>
              <Text style={styles.signLabel}>Slippery Road</Text>
            </View>
          </View>
        </View>

        <View style={styles.signCategory}>
          <Text style={styles.categoryTitle}>3. Guide Signs</Text>
          <Text style={styles.categoryDescription}>
            These signs provide information and directions. They are typically blue or green.
          </Text>
          <View style={styles.examples}>
            <View style={styles.signExample}>
              <View style={[styles.signPlaceholder, { backgroundColor: '#E7F5FF' }]}>
                <FontAwesome5 name="parking" size={24} color="#339AF0" />
              </View>
              <Text style={styles.signLabel}>Parking</Text>
            </View>
            <View style={styles.signExample}>
              <View style={[styles.signPlaceholder, { backgroundColor: '#E7F5FF' }]}>
                <FontAwesome5 name="hospital" size={24} color="#339AF0" />
              </View>
              <Text style={styles.signLabel}>Hospital</Text>
            </View>
          </View>
        </View>

        <Pressable 
          style={styles.startQuizButton}
          onPress={handleStartQuiz}
        >
          <Text style={styles.startQuizText}>Test Your Knowledge</Text>
        </Pressable>
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
    gap: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E3A59',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#4C566A',
    lineHeight: 24,
    marginBottom: 24,
  },
  signCategory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E3A59',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#4C566A',
    lineHeight: 20,
  },
  examples: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  signExample: {
    alignItems: 'center',
    gap: 8,
  },
  signPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signLabel: {
    fontSize: 14,
    color: '#4C566A',
  },
  nextButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 3,
    backgroundColor: '#4C6EF5',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  quizContainer: {
    marginTop: 32,
    gap: 16,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    color: '#2E3A59',
    fontWeight: '600',
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  optionButtonPressed: {
    backgroundColor: '#E7F5FF',
    borderColor: '#4C6EF5',
  },
  optionText: {
    fontSize: 15,
    color: '#4C566A',
  },
  startQuizButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  startQuizText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 