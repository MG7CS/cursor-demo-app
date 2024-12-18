import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ProgressBar } from './ui/ProgressBar';

interface RoadmapItemProps {
  title: string;
  description: string;
  progress: number;
  isActive: boolean;
  isLocked: boolean;
  onPress: () => void;
}

export function RoadmapItem({ 
  title, 
  description, 
  progress, 
  isActive,
  isLocked,
  onPress 
}: RoadmapItemProps) {
  return (
    <Pressable 
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isActive && styles.activeText]}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
        <ProgressBar 
          progress={progress}
          width={280}
          style={styles.progressBar}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeContainer: {
    borderColor: '#4C6EF5',
    borderWidth: 2,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
  },
  activeText: {
    color: '#4C6EF5',
  },
  description: {
    fontSize: 14,
    color: '#4C566A',
  },
  progressBar: {
    marginTop: 8,
  },
}); 