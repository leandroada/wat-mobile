import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import StartScreen from '../screens/Auth/StartScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import { useAuth } from '../context/AuthContext';
import PasswordRecoveryScreen from '../screens/Auth/PasswordRecoveryScreen';
import UsernameRecoveryScreen from '../screens/Auth/UsernameRecoveryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
  Register: undefined;
  Verification: undefined;
  Login: undefined;
  passwordrecovery : undefined;
  usernamerecovery : undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const { isSplash } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false ,animation: 'slide_from_right'}}
      initialRouteName={isSplash ? 'Splash' : 'Login'}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="passwordrecovery" component={PasswordRecoveryScreen} />
      <Stack.Screen name="usernamerecovery" component={UsernameRecoveryScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
