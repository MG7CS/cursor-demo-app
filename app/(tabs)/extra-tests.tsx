import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

interface TestCategory {
  id: string;
  title: string;
  description: string;
  numberOfQuestions: number;
  icon: keyof typeof FontAwesome5['glyphMap'];
}

const testCategories: TestCategory[] = [
  {
    id: '1',
    title: 'Road Signs',
    description: 'Practice identifying and understanding different road signs',
    numberOfQuestions: 20,
    icon: 'sign',
  },
  {
    id: '2',
    title: 'Traffic Rules',
    description: 'Test your knowledge of traffic laws and regulations',
    numberOfQuestions: 25,
    icon: 'traffic-light',
  },
  {
    id: '3',
    title: 'Parking Rules',
    description: 'Learn about parking regulations and restrictions',
    numberOfQuestions: 15,
    icon: 'parking',
  },
  {
    id: '4',
    title: 'Vehicle Safety',
    description: 'Questions about vehicle maintenance and safety measures',
    numberOfQuestions: 18,
    icon: 'car',
  },
];

export default function ExtraTestsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Extra Tests</Text>
        <Text style={styles.subtitle}>Practice specific topics to improve your knowledge</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {testCategories.map((category) => (
          <Pressable 
            key={category.id}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryCardPressed
            ]}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 
                name={category.icon} 
                size={24} 
                color="#4C6EF5"
              />
            </View>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.questionCount}>
                {category.numberOfQuestions} questions
              </Text>
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
  subtitle: {
    fontSize: 16,
    color: '#4C566A',
    textAlign: 'center',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#4C566A',
    marginBottom: 8,
  },
  questionCount: {
    fontSize: 13,
    color: '#4C6EF5',
    fontWeight: '500',
  },
}); 