import { View, Text, TextInput, Alert, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/src/components/ui/Button';
import { FontAwesome } from '@expo/vector-icons';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface SignUpForm {
  email: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignUpForm>({ email: '', password: '' });

  function handleSignUp() {
    try {
      signUpSchema.parse(form);
      console.log('Sign up:', form);
      router.push('/(auth)/welcome');
    } catch (error) {
      if (error instanceof z.ZodError) {
        Alert.alert('Validation Error', error.errors[0].message);
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    }
  }

  function handleGoogleSignUp() {
    console.log('Google sign up');
  }

  function handleAppleSignUp() {
    console.log('Apple sign up');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
            </View>

            <Button label="Sign Up" onPress={handleSignUp} variant="primary" />
          </View>

          {/* Social Sign-Up */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <Button
                label="Google"
                onPress={handleGoogleSignUp}
                variant="secondary"
                leftIcon={<FontAwesome name="google" size={18} color="#DB4437" />}
              />
              <Button
                label="Apple"
                onPress={handleAppleSignUp}
                variant="secondary"
                leftIcon={<FontAwesome name="apple" size={18} color="#000" />}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Button
              label="Log In"
              onPress={() => router.push('/(auth)/login')}
              variant="secondary"
              style={styles.loginButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333333',
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  loginButton: {
    marginLeft: 6,
  },
});