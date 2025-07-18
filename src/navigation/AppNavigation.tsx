import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import TabNavigation from './TabNavigation';
import { useAuth } from '../context/AuthContext'; 

const AppNavigation = () => {
  const { isLoggedIn } = useAuth();


  if (isLoggedIn === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
