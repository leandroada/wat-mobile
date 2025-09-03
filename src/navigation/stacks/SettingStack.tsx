import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../../screens/Setting/SettingScreen';
import AboutScreen from '../../screens/Setting/AboutScreen';
import AudioScreen from '../../screens/Setting/AudioScreen';
import NotificationScreen from '../../screens/Setting/NotificationScreen';
import ProfileScreen from '../../screens/Setting/ProfileScreen';
import SupportScreen from '../../screens/Setting/SupportScreen';
import GeneralScreen from '../../screens/Setting/PlayAndTutorialScreen';
import PrivacyScreen from '../../screens/Setting/PrivacyScreen';
import PlayAndTutorialScreen from '../../screens/Setting/PlayAndTutorialScreen';
const Stack = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false ,animation: 'slide_from_right'  }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen}  />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="playtutorial" component={PlayAndTutorialScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  )
}

export default SettingStack