import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { authAPI } from '../services/api';

export default function AppEntry() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAppStatus();
  }, []);

  const checkAppStatus = async () => {
    try {
      // Check onboarding status
      const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
      const hasSeenOnboardingValue = onboardingStatus === 'true';
      setHasSeenOnboarding(hasSeenOnboardingValue);

      // Check authentication status
      const isAuth = await authAPI.isAuthenticated();
      setIsAuthenticated(isAuth);

      console.log('App Status:', {
        hasSeenOnboarding: hasSeenOnboardingValue,
        isAuthenticated: isAuth
      });

    } catch (error) {
      console.error('Error checking app status:', error);
      setHasSeenOnboarding(false);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while checking status
  if (isLoading || hasSeenOnboarding === null || isAuthenticated === null) {
    return null; // You can add a loading component here
  }

  // Redirect based on app status
  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}