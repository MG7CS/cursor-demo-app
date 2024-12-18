import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressBarProps {
  progress: number;
  width: number;
  style?: ViewStyle;
}

export function ProgressBar({ progress, width, style }: ProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progress,
      useNativeDriver: false,
      tension: 20,
      friction: 7
    }).start();
  }, [progress]);

  return (
    <View style={[styles.container, { width }, style]}>
      <Animated.View 
        style={[
          styles.progressWrapper, 
          { 
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]} 
      >
        <LinearGradient
          colors={['#4C6EF5', '#3B5BDB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.shine} />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,  // Slightly thinner
    backgroundColor: 'rgba(0,0,0,0.05)',  // Very subtle background
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressWrapper: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 8,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  }
}); 