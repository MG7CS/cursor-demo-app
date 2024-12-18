import { useState, useEffect } from 'react';
import { useAuthStore } from '@/src/stores/auth';

export function useAuthInitialization() {
  const [isLoading, setIsLoading] = useState(true);
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    async function initialize() {
      await initAuth();
      setIsLoading(false);
    }
    initialize();
  }, []);

  return { isLoading };
} 