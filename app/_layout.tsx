import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthInitialization } from '@/src/hooks/useAuthInitialization';

export default function RootLayout() {
  const { isLoading } = useAuthInitialization();

  if (isLoading) {
    return null; // Or return a splash screen component
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'fade',
        // Disable gestures for auth flow
        gestureEnabled: false,
      }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
