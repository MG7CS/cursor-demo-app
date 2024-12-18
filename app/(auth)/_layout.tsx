import { Stack } from 'expo-router';

export type AuthStackParamList = {
  welcome: undefined;
  login: undefined;
  signup: undefined;
  'profile-setup': undefined;
};

export default function AuthLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        // Prevent going back in auth flow
        gestureEnabled: false,
      }}
      // Set welcome as initial screen
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="profile-setup" />
    </Stack>
  );
} 