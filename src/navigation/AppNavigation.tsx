import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import TabNavigation from './TabNavigation';
import { useAuth } from '../redux/AuthContext'; // assuming your context is in redux/AuthContext

const AppNavigation = () => {
  const { isLoggedIn } = useAuth();

  // Optional: Show loading screen or null while login status is checking
  if (isLoggedIn === null) {
    return null; // or <SplashScreen />
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
