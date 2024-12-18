import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

interface HandbookSection {
  id: string;
  title: string;
  description: string;
  estimatedReadTime: number;
  icon: keyof typeof FontAwesome5['glyphMap'];
  isNew?: boolean;
}

const handbookSections: HandbookSection[] = [
  {
    id: '1',
    title: 'Getting Started',
    description: 'Essential information for new drivers',
    estimatedReadTime: 15,
    icon: 'flag',
    isNew: true,
  },
  {
    id: '2',
    title: 'Road Rules & Regulations',
    description: 'Comprehensive guide to traffic laws',
    estimatedReadTime: 25,
    icon: 'road',
  },
  {
    id: '3',
    title: 'Road Signs & Signals',
    description: 'Understanding traffic signs and signals',
    estimatedReadTime: 20,
    icon: 'traffic-light',
  },
  {
    id: '4',
    title: 'Safe Driving Practices',
    description: 'Tips and techniques for safe driving',
    estimatedReadTime: 30,
    icon: 'shield-alt',
  },
  {
    id: '5',
    title: 'Emergency Procedures',
    description: 'What to do in case of accidents or breakdowns',
    estimatedReadTime: 15,
    icon: 'exclamation-triangle',
  },
  {
    id: '6',
    title: 'Vehicle Maintenance',
    description: 'Basic vehicle care and maintenance guide',
    estimatedReadTime: 18,
    icon: 'tools',
  },
];

export default function HandbookScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Handbook</Text>
        <Text style={styles.subtitle}>Your complete guide to driving rules and regulations</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {handbookSections.map((section) => (
          <Pressable 
            key={section.id}
            style={({ pressed }) => [
              styles.sectionCard,
              pressed && styles.sectionCardPressed
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <FontAwesome5 
                  name={section.icon} 
                  size={20} 
                  color="#4C6EF5"
                />
              </View>
              {section.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionDescription}>{section.description}</Text>
            
            <View style={styles.readTimeContainer}>
              <FontAwesome5 
                name="clock" 
                size={12} 
                color="#4C566A"
                style={styles.clockIcon}
              />
              <Text style={styles.readTime}>
                {section.estimatedReadTime} min read
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    backgroundColor: '#4C6EF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#4C566A',
    marginBottom: 12,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 6,
  },
  readTime: {
    fontSize: 13,
    color: '#4C566A',
  },
}); 