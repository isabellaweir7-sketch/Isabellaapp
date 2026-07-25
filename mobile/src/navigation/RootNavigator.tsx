import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { useSession } from '../context/SessionContext';
import { AppDataProvider } from '../context/AppDataContext';

export function RootNavigator() {
  const { isSignedIn } = useSession();

  if (!isSignedIn) {
    return (
      <NavigationContainer>
        <OnboardingNavigator />
      </NavigationContainer>
    );
  }

  return (
    <AppDataProvider>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </AppDataProvider>
  );
}
