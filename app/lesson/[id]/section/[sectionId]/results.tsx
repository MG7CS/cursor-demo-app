import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ResultsScreen() {
  const { id, sectionId, score } = useLocalSearchParams<{ 
    id: string; 
    sectionId: string;
    score: string;
  }>();
  const router = useRouter();
  const percentage = (parseInt(score) / 5) * 100;

  const handleContinue = () => {
    router.push(`/lesson/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.scoreCard}>
          <FontAwesome5 
            name={percentage >= 80 ? "trophy" : "star"} 
            size={48} 
            color="#F59F00" 
          />
          <Text style={styles.scoreTitle}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>{score}/5 Correct</Text>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>

        <Text style={styles.feedbackText}>
          {percentage >= 80 
            ? "Great job! You've mastered this section." 
            : "Keep practicing! Review the section and try again."}
        </Text>

        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E3A59',
    marginTop: 8,
  },
  scoreText: {
    fontSize: 20,
    color: '#4C566A',
  },
  percentageText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#4C6EF5',
  },
  feedbackText: {
    fontSize: 16,
    color: '#4C566A',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 