import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from '../../screens/info/TutorialScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false ,animation: 'slide_from_right' }}>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen}  />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  )
}

export default NotificationStack;