import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet, useColorScheme, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant: 'primary' | 'secondary' | 'link';
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  style?: object;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant,
  leftIcon,
  isLoading,
  disabled,
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const colorScheme = useColorScheme();
  const currentColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, styles[variant], style]}
        disabled={disabled || isLoading}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator color={currentColors.text} />
          ) : (
            <>
              {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
              <Text style={[styles.label, { color: variant === 'primary' ? '#FFFFFF' : currentColors.accent }]}>
                {label}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primary: {
    backgroundColor: Colors.light.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: Colors.light.accent,
    borderWidth: 1,
  },
  link: {
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
}); 