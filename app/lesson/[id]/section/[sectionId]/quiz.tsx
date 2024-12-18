import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import * as Haptics from 'expo-haptics';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'What shape and color is typically used for stop signs?',
    options: [
      'Circular Red',
      'Octagonal Red',
      'Triangle Yellow',
      'Square Blue'
    ],
    correctAnswer: 1,
    explanation: 'Stop signs are octagonal (8-sided) and red with white lettering for maximum visibility and instant recognition.'
  },
  {
    id: '2',
    question: 'Which color is primarily used for warning signs?',
    options: [
      'Red',
      'Blue',
      'Yellow',
      'Green'
    ],
    correctAnswer: 2,
    explanation: 'Warning signs typically use yellow backgrounds with black symbols or text to alert drivers of potential hazards.'
  },
  {
    id: '3',
    question: 'What do blue signs typically indicate?',
    options: [
      'Warnings',
      'Regulations',
      'Construction',
      'Services'
    ],
    correctAnswer: 3,
    explanation: 'Blue signs typically indicate services available to motorists, such as rest areas, hospitals, and food.'
  },
  {
    id: '4',
    question: 'Which sign shape is most commonly used for yield signs?',
    options: [
      'Triangle',
      'Circle',
      'Rectangle',
      'Pentagon'
    ],
    correctAnswer: 0,
    explanation: 'Yield signs are triangular (downward pointing) to be easily distinguished from other regulatory signs.'
  },
  {
    id: '5',
    question: 'What do brown signs typically indicate?',
    options: [
      'Construction zones',
      'Recreational areas',
      'School zones',
      'Speed limits'
    ],
    correctAnswer: 1,
    explanation: 'Brown signs typically indicate recreational and cultural interest areas such as parks, historic sites, and scenic areas.'
  }
];

export default function QuizScreen() {
  const { id, sectionId } = useLocalSearchParams<{ id: string; sectionId: string }>();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const progressValue = useRef(new Animated.Value(0)).current;

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(answer);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (answer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push({
      pathname: `/lesson/${id}/section/${sectionId}/results`,
      params: { score }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#2E3A59" />
        </Pressable>
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.progress}>{currentQuestion + 1}/{QUIZ_QUESTIONS.length}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>
          {QUIZ_QUESTIONS[currentQuestion].question}
        </Text>

        <View style={styles.options}>
          {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                showExplanation && index === QUIZ_QUESTIONS[currentQuestion].correctAnswer && styles.correctOption,
                showExplanation && selectedAnswer === index && selectedAnswer !== QUIZ_QUESTIONS[currentQuestion].correctAnswer && styles.wrongOption
              ]}
              onPress={() => handleAnswer(index)}
              disabled={showExplanation}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>
              {QUIZ_QUESTIONS[currentQuestion].explanation}
            </Text>
          </View>
        )}

        {showExplanation && (
          <Pressable onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#007bff',
  },
  correctOption: {
    borderColor: '#4caf50',
  },
  wrongOption: {
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  explanationCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  explanationText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 