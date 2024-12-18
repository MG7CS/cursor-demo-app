import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/src/components/ui/Button';
import { useRouter } from 'expo-router';
import { styles } from '@/src/styles/auth';

export default function WelcomePage() {
  const router = useRouter();

  function handleGetStarted() {
    console.log('Navigating to signup');
    router.push('/(auth)/signup');
  }

  function handleLogin() {
    console.log('Navigating to login');
    router.push('/(auth)/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="GAMO Logo"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to GAMO</Text>
          <Text style={styles.subtitle}>
            Your journey to getting your driver's license starts here
          </Text>
          <Text style={styles.description}>
            Learn, practice, and master everything you need to pass your driver's test with confidence
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleGetStarted}
            variant="primary"
            label="Get Started"
            accessibilityLabel="Get Started with GAMO"
            accessibilityHint="Navigate to sign up page"
          />
          <Button 
            onPress={handleLogin}
            variant="link"
            label="I Already Have an Account"
            accessibilityLabel="Log in to existing account"
            accessibilityHint="Navigate to login page"
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 