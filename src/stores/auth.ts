import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  initAuth: () => Promise<void>;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  initAuth: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        set({ isAuthenticated: true, user: JSON.parse(user) });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ isAuthenticated: true, user });
    } catch (error) {
      console.error('Login error:', error);
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
})); 