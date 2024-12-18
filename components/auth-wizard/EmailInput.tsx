import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, useColorScheme, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../constants/Colors';

interface EmailInputProps {
  onEmailChange: (email: string) => void;
}

export function EmailInput({ onEmailChange }: EmailInputProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const colorScheme = useColorScheme();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    const valid = validateEmail(email);
    setIsValid(valid);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { borderColor: isValid ? Colors[colorScheme ?? 'light'].accent : '#FFCCCC' },
          ]}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            onEmailChange(text);
          }}
          onBlur={handleBlur}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValid && (
          <Text style={styles.errorText}>Invalid email address</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  }
}); 