import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from '@/src/components/ui/ProgressBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface StatMetric {
  id: string;
  label: string;
  value: string;
  icon: keyof typeof FontAwesome5['glyphMap'];
  color: string;
}

interface ProgressMetric {
  id: string;
  title: string;
  progress: number;
  total: number;
  completed: number;
}

const statMetrics: StatMetric[] = [
  {
    id: '1',
    label: 'Tests Taken',
    value: '24',
    icon: 'clipboard-check',
    color: '#4C6EF5',
  },
  {
    id: '2',
    label: 'Avg. Score',
    value: '86%',
    icon: 'percentage',
    color: '#40C057',
  },
  {
    id: '3',
    label: 'Study Time',
    value: '12.5h',
    icon: 'clock',
    color: '#F59F00',
  },
  {
    id: '4',
    label: 'Streak',
    value: '5 days',
    icon: 'fire',
    color: '#FA5252',
  },
];

const progressMetrics: ProgressMetric[] = [
  {
    id: '1',
    title: 'Road Signs',
    progress: 0.8,
    total: 50,
    completed: 40,
  },
  {
    id: '2',
    title: 'Traffic Rules',
    progress: 0.65,
    total: 75,
    completed: 49,
  },
  {
    id: '3',
    title: 'Vehicle Safety',
    progress: 0.45,
    total: 40,
    completed: 18,
  },
];

export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.subtitle}>Track your learning progress</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metricsGrid}>
          {statMetrics.map((metric) => (
            <View key={metric.id} style={styles.metricCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${metric.color}15` }]}>
                <FontAwesome5 
                  name={metric.icon} 
                  size={20} 
                  color={metric.color}
                />
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Topic Progress</Text>
        
        {progressMetrics.map((metric) => (
          <View key={metric.id} style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>{metric.title}</Text>
              <Text style={styles.progressCount}>
                {metric.completed}/{metric.total}
              </Text>
            </View>
            <ProgressBar 
              progress={metric.progress}
              width={SCREEN_WIDTH - 64}
              style={styles.progressBar}
            />
            <Text style={styles.progressPercentage}>
              {Math.round(metric.progress * 100)}% Complete
            </Text>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Summary</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <FontAwesome5 
                name="star" 
                size={16} 
                color="#F59F00"
                solid
              />
              <Text style={styles.summaryText}>Best Score: 95%</Text>
            </View>
            <View style={styles.summaryItem}>
              <FontAwesome5 
                name="chart-line" 
                size={16} 
                color="#4C6EF5"
              />
              <Text style={styles.summaryText}>Improvement: +12%</Text>
            </View>
          </View>
        </View>
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
    gap: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  metricCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E3A59',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#4C566A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3A59',
  },
  progressCount: {
    fontSize: 14,
    color: '#4C566A',
  },
  progressBar: {
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 13,
    color: '#4C6EF5',
    textAlign: 'right',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryText: {
    fontSize: 15,
    color: '#4C566A',
  },
}); 